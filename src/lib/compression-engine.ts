import UPNG from 'upng-js';
import { GIFEncoder, applyPalette, quantize } from 'gifenc';
import { GifReader } from 'omggif';
import {
  buildOutputFileName,
  type CompressionOptions,
  type WorkerRequest,
  type WorkerResponse,
} from './compression-types';
import { optimizeSvgText } from './svg-optimizer';

interface Surface {
  width: number;
  height: number;
  drawBitmap: (
    bitmap: ImageBitmap | HTMLImageElement | HTMLCanvasElement,
    fillOpaqueWhite: boolean
  ) => void;
  getImageData: () => ImageData;
  toBlob: (mime: string, quality?: number) => Promise<Blob>;
}

function createSurface(width: number, height: number): Surface {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not initialize 2D OffscreenCanvas context');
    return {
      width: w,
      height: h,
      drawBitmap(src, fillOpaqueWhite) {
        ctx.clearRect(0, 0, w, h);
        if (fillOpaqueWhite) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, w, h);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(src as CanvasImageSource, 0, 0, w, h);
      },
      getImageData() {
        return ctx.getImageData(0, 0, w, h);
      },
      toBlob(mime, quality) {
        return canvas.convertToBlob({ type: mime, quality });
      },
    };
  }

  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not initialize 2D Canvas context');
    return {
      width: w,
      height: h,
      drawBitmap(src, fillOpaqueWhite) {
        ctx.clearRect(0, 0, w, h);
        if (fillOpaqueWhite) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, w, h);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(src as CanvasImageSource, 0, 0, w, h);
      },
      getImageData() {
        return ctx.getImageData(0, 0, w, h);
      },
      toBlob(mime, quality) {
        return new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Canvas encoding returned empty blob'));
            },
            mime,
            quality
          );
        });
      },
    };
  }

  throw new Error('No Canvas encoder available in this browser');
}

function encodePngFromImageData(imageData: ImageData, cnum: number): Blob {
  const rgbaCopy = imageData.data.slice().buffer;
  const encoded = UPNG.encode([rgbaCopy], imageData.width, imageData.height, cnum);
  return new Blob([encoded], { type: 'image/png' });
}

async function compressLossyRaster(
  bitmap: ImageBitmap,
  targetMime: 'image/jpeg' | 'image/webp',
  options: CompressionOptions,
  originalBytes: number,
  isSameFormat: boolean
): Promise<{ blob: Blob | null; width: number; height: number }> {
  const fillWhite = targetMime === 'image/jpeg';
  const origW = bitmap.width;
  const origH = bitmap.height;

  if (options.mode === 'quality') {
    const surface = createSurface(origW, origH);
    surface.drawBitmap(bitmap, fillWhite);
    const q = Math.min(1, Math.max(0.05, options.quality / 100));
    const blob = await surface.toBlob(targetMime, q);

    if (isSameFormat && blob.size >= originalBytes) {
      // Already well-compressed input: try gentle adaptive quality steps inside a sharp floor
      // so we reduce size cleanly without bloating or degrading detail.
      if (options.quality < 98) {
        const floorQ = Math.max(0.45, q - 0.25);
        for (const candidateQ of [q * 0.88, q * 0.76, floorQ]) {
          if (candidateQ >= q || candidateQ < floorQ - 0.001) continue;
          const smaller = await surface.toBlob(targetMime, candidateQ);
          if (smaller.size < originalBytes) {
            return { blob: smaller, width: surface.width, height: surface.height };
          }
        }
      }
      // Keep exact original bytes if re-encoding cannot beat original size
      return { blob: null, width: origW, height: origH };
    }

    return { blob, width: surface.width, height: surface.height };
  }

  // Exact Target Size (KB) binary-search solver
  const targetBytes = Math.max(2048, Math.round(options.targetKb * 1024));
  if (isSameFormat && originalBytes <= targetBytes) {
    return { blob: null, width: origW, height: origH };
  }

  const fullSurface = createSurface(origW, origH);
  fullSurface.drawBitmap(bitmap, fillWhite);

  const highBlob = await fullSurface.toBlob(targetMime, 0.96);
  if (highBlob.size <= targetBytes) {
    return { blob: highBlob, width: origW, height: origH };
  }

  const minQ = 0.08;
  const lowBlob = await fullSurface.toBlob(targetMime, minQ);

  if (lowBlob.size <= targetBytes) {
    let low = minQ;
    let high = 0.96;
    let bestBlob = lowBlob;

    for (let i = 0; i < 8; i++) {
      const mid = (low + high) / 2;
      const candidate = await fullSurface.toBlob(targetMime, mid);
      if (candidate.size <= targetBytes) {
        bestBlob = candidate;
        low = mid;
      } else {
        high = mid;
      }
      if (Math.abs(targetBytes - bestBlob.size) <= targetBytes * 0.02 && bestBlob.size <= targetBytes) {
        break;
      }
    }
    return { blob: bestBlob, width: origW, height: origH };
  }

  // Stage 2: Smooth proportional downscaling when full-res minimum quality still exceeds targetBytes
  let lowScale = Math.max(0.05, Math.min(0.4, 48 / Math.max(origW, origH)));
  let highScale = 0.92;
  let scaleGuess = Math.min(
    highScale,
    Math.max(lowScale, Math.sqrt(targetBytes / Math.max(1, lowBlob.size)) * 0.94)
  );

  let bestBlob = lowBlob;
  let bestW = origW;
  let bestH = origH;

  // Quickly locate a working scale <= targetBytes
  for (let i = 0; i < 6; i++) {
    const testW = Math.max(32, Math.round(origW * scaleGuess));
    const testH = Math.max(32, Math.round(origH * scaleGuess));
    const s = createSurface(testW, testH);
    s.drawBitmap(bitmap, fillWhite);
    const b = await s.toBlob(targetMime, 0.55);

    if (b.size <= targetBytes) {
      bestBlob = b;
      bestW = testW;
      bestH = testH;
      lowScale = scaleGuess;
    } else {
      highScale = scaleGuess;
    }
    scaleGuess = (lowScale + highScale) / 2;
  }

  // If still slightly above targetBytes, drop quality at lowScale
  if (bestBlob.size > targetBytes) {
    const finalW = Math.max(32, Math.round(origW * lowScale));
    const finalH = Math.max(32, Math.round(origH * lowScale));
    const s = createSurface(finalW, finalH);
    s.drawBitmap(bitmap, fillWhite);
    let qLow = 0.08;
    let qHigh = 0.6;
    let qBest = await s.toBlob(targetMime, qLow);
    for (let i = 0; i < 5; i++) {
      const midQ = (qLow + qHigh) / 2;
      const candidate = await s.toBlob(targetMime, midQ);
      if (candidate.size <= targetBytes) {
        qBest = candidate;
        qLow = midQ;
      } else {
        qHigh = midQ;
      }
    }
    return { blob: qBest, width: finalW, height: finalH };
  }

  // Refine quality upward at bestW x bestH to maximize sharpness inside targetBytes
  const sharpSurface = createSurface(bestW, bestH);
  sharpSurface.drawBitmap(bitmap, fillWhite);
  let qLow = 0.5;
  let qHigh = 0.94;
  for (let i = 0; i < 5; i++) {
    const midQ = (qLow + qHigh) / 2;
    const candidate = await sharpSurface.toBlob(targetMime, midQ);
    if (candidate.size <= targetBytes) {
      bestBlob = candidate;
      qLow = midQ;
    } else {
      qHigh = midQ;
    }
  }

  return { blob: bestBlob, width: bestW, height: bestH };
}

async function compressPngRaster(
  bitmap: ImageBitmap,
  options: CompressionOptions,
  originalBytes: number,
  isSameFormat: boolean
): Promise<{ blob: Blob | null; width: number; height: number }> {
  const origW = bitmap.width;
  const origH = bitmap.height;

  if (options.mode === 'target') {
    const targetBytes = Math.max(2048, Math.round(options.targetKb * 1024));
    if (isSameFormat && originalBytes <= targetBytes) {
      return { blob: null, width: origW, height: origH };
    }
  }

  const fullSurface = createSurface(origW, origH);
  fullSurface.drawBitmap(bitmap, false);
  const fullData = fullSurface.getImageData();

  if (options.mode === 'quality') {
    const cnum =
      options.quality >= 96
        ? 0
        : Math.max(16, Math.round((options.quality / 95) * 256));
    const blob = encodePngFromImageData(fullData, cnum);

    if (isSameFormat && blob.size >= originalBytes) {
      if (options.quality < 96 && cnum > 32) {
        for (const nextCnum of [
          Math.max(24, Math.round(cnum * 0.6)),
          Math.max(16, Math.round(cnum * 0.35)),
        ]) {
          if (nextCnum >= cnum) continue;
          const smaller = encodePngFromImageData(fullData, nextCnum);
          if (smaller.size < originalBytes) {
            return { blob: smaller, width: origW, height: origH };
          }
        }
      }
      return { blob: null, width: origW, height: origH };
    }

    return { blob, width: origW, height: origH };
  }

  const targetBytes = Math.max(2048, Math.round(options.targetKb * 1024));
  const losslessBlob = encodePngFromImageData(fullData, 0);
  if (losslessBlob.size <= targetBytes) {
    return { blob: losslessBlob, width: origW, height: origH };
  }

  const maxColorsBlob = encodePngFromImageData(fullData, 256);
  if (maxColorsBlob.size <= targetBytes) {
    return { blob: maxColorsBlob, width: origW, height: origH };
  }

  const minColorsBlob = encodePngFromImageData(fullData, 16);
  if (minColorsBlob.size <= targetBytes) {
    let low = 16;
    let high = 256;
    let bestBlob = minColorsBlob;
    for (let i = 0; i < 6; i++) {
      const mid = Math.round((low + high) / 2);
      const candidate = encodePngFromImageData(fullData, mid);
      if (candidate.size <= targetBytes) {
        bestBlob = candidate;
        low = mid;
      } else {
        high = mid;
      }
      if (high - low <= 4) break;
    }
    return { blob: bestBlob, width: origW, height: origH };
  }

  // Stage 2: Downscale PNG dimensions proportionally until quantized output fits <= targetBytes
  let lowScale = Math.max(0.05, Math.min(0.4, 48 / Math.max(origW, origH)));
  let highScale = 0.92;
  let scaleGuess = Math.min(
    highScale,
    Math.max(lowScale, Math.sqrt(targetBytes / Math.max(1, minColorsBlob.size)) * 0.9)
  );
  let bestBlob = minColorsBlob;
  let bestW = origW;
  let bestH = origH;

  for (let i = 0; i < 6; i++) {
    const testW = Math.max(32, Math.round(origW * scaleGuess));
    const testH = Math.max(32, Math.round(origH * scaleGuess));
    const s = createSurface(testW, testH);
    s.drawBitmap(bitmap, false);
    const data = s.getImageData();
    const candidate = encodePngFromImageData(data, 96);
    if (candidate.size <= targetBytes) {
      bestBlob = candidate;
      bestW = testW;
      bestH = testH;
      lowScale = scaleGuess;
    } else {
      highScale = scaleGuess;
    }
    scaleGuess = (lowScale + highScale) / 2;
  }

  if (bestBlob.size > targetBytes) {
    const finalW = Math.max(32, Math.round(origW * lowScale));
    const finalH = Math.max(32, Math.round(origH * lowScale));
    const s = createSurface(finalW, finalH);
    s.drawBitmap(bitmap, false);
    const finalData = s.getImageData();
    const fallback = encodePngFromImageData(finalData, 32);
    return { blob: fallback, width: finalW, height: finalH };
  }

  return { blob: bestBlob, width: bestW, height: bestH };
}

function encodeGifFrames(
  reader: GifReader,
  maxColors: number,
  scale = 1
): { blob: Blob; width: number; height: number } {
  const srcW = reader.width;
  const srcH = reader.height;
  const numFrames = Math.max(1, reader.numFrames());
  const outW = Math.max(16, Math.round(srcW * scale));
  const outH = Math.max(16, Math.round(srcH * scale));

  const compositeBuffer = new Uint8ClampedArray(srcW * srcH * 4);
  let previousSnapshot: Uint8ClampedArray | null = null;
  const gif = GIFEncoder();

  const needsScale = outW !== srcW || outH !== srcH;

  for (let i = 0; i < numFrames; i++) {
    const info = reader.frameInfo(i);
    if (info.disposal === 3) {
      previousSnapshot = compositeBuffer.slice();
    }

    reader.decodeAndBlitFrameRGBA(i, new Uint8Array(compositeBuffer.buffer));

    let frameRgba: Uint8ClampedArray = compositeBuffer;
    if (needsScale && typeof ImageData !== 'undefined') {
      if (typeof OffscreenCanvas !== 'undefined') {
        const tmp = new OffscreenCanvas(srcW, srcH);
        const tctx = tmp.getContext('2d')!;
        tctx.putImageData(new ImageData(new Uint8ClampedArray(compositeBuffer), srcW, srcH), 0, 0);
        const dst = new OffscreenCanvas(outW, outH);
        const dctx = dst.getContext('2d')!;
        dctx.imageSmoothingEnabled = true;
        dctx.imageSmoothingQuality = 'high';
        dctx.drawImage(tmp, 0, 0, outW, outH);
        frameRgba = dctx.getImageData(0, 0, outW, outH).data;
      } else if (typeof document !== 'undefined') {
        const tmp = document.createElement('canvas');
        tmp.width = srcW;
        tmp.height = srcH;
        const tctx = tmp.getContext('2d')!;
        tctx.putImageData(new ImageData(new Uint8ClampedArray(compositeBuffer), srcW, srcH), 0, 0);
        const dst = document.createElement('canvas');
        dst.width = outW;
        dst.height = outH;
        const dctx = dst.getContext('2d')!;
        dctx.imageSmoothingEnabled = true;
        dctx.imageSmoothingQuality = 'high';
        dctx.drawImage(tmp, 0, 0, outW, outH);
        frameRgba = dctx.getImageData(0, 0, outW, outH).data;
      }
    }

    let hasAlpha = false;
    for (let p = 3; p < frameRgba.length; p += 4) {
      if (frameRgba[p] < 128) {
        hasAlpha = true;
        break;
      }
    }

    const palette = quantize(frameRgba, maxColors, {
      format: hasAlpha ? 'rgba4444' : 'rgb565',
      oneBitAlpha: hasAlpha,
    });
    const indexed = applyPalette(frameRgba, palette, hasAlpha ? 'rgba4444' : 'rgb565');
    const transparentIndex = hasAlpha
      ? palette.findIndex((c: number[]) => (c[3] ?? 255) < 128)
      : -1;

    gif.writeFrame(indexed, outW, outH, {
      palette,
      delay: Math.max(20, (info.delay || 10) * 10),
      transparent: transparentIndex >= 0,
      transparentIndex: transparentIndex >= 0 ? transparentIndex : 0,
      repeat: i === 0 ? (reader.loopCount() ?? 0) : undefined,
      dispose: info.disposal || 1,
    });

    if (info.disposal === 2) {
      for (let row = info.y; row < info.y + info.height; row++) {
        const start = (row * srcW + info.x) * 4;
        compositeBuffer.fill(0, start, start + info.width * 4);
      }
    } else if (info.disposal === 3 && previousSnapshot) {
      compositeBuffer.set(previousSnapshot);
    }
  }

  gif.finish();
  const bytes = gif.bytes();
  const safeCopy = new Uint8Array(bytes.byteLength);
  safeCopy.set(bytes);
  return {
    blob: new Blob([safeCopy.buffer], {
      type: 'image/gif',
    }),
    width: outW,
    height: outH,
  };
}

async function compressGif(
  buffer: ArrayBuffer,
  options: CompressionOptions
): Promise<{ blob: Blob | null; width: number; height: number; origW: number; origH: number }> {
  const reader = new GifReader(new Uint8Array(buffer));
  const origW = reader.width;
  const origH = reader.height;

  if (options.mode === 'quality') {
    const maxColors = Math.max(16, Math.min(256, Math.round((options.quality / 100) * 256)));
    const result = encodeGifFrames(reader, maxColors, 1);
    if (result.blob.size >= buffer.byteLength) {
      if (options.quality < 96 && maxColors > 32) {
        const smaller = encodeGifFrames(reader, Math.max(24, Math.round(maxColors * 0.5)), 1);
        if (smaller.blob.size < buffer.byteLength) {
          return { ...smaller, origW, origH };
        }
      }
      return { blob: null, width: origW, height: origH, origW, origH };
    }
    return { ...result, origW, origH };
  }

  const targetBytes = Math.max(2048, Math.round(options.targetKb * 1024));
  if (buffer.byteLength <= targetBytes) {
    return { blob: null, width: origW, height: origH, origW, origH };
  }
  for (const colors of [256, 128, 64, 32, 16]) {
    const candidate = encodeGifFrames(reader, colors, 1);
    if (candidate.blob.size <= targetBytes) {
      return { ...candidate, origW, origH };
    }
  }

  let scale = 0.75;
  for (let i = 0; i < 4; i++) {
    const candidate = encodeGifFrames(reader, 64, scale);
    if (candidate.blob.size <= targetBytes) {
      return { ...candidate, origW, origH };
    }
    scale *= 0.7;
  }

  const fallback = encodeGifFrames(reader, 32, Math.max(0.25, scale));
  return { ...fallback, origW, origH };
}

export async function processCompressionJob(req: WorkerRequest): Promise<WorkerResponse> {
  const { id, fileBuffer, fileName, fileType, options } = req;

  try {
    // 1. Native SVG Optimization when keeping original format
    if (fileType === 'image/svg+xml' && options.outputFormat === 'original') {
      const rawText = new TextDecoder('utf-8').decode(fileBuffer);
      let optimized = optimizeSvgText(rawText, 2);

      if (options.mode === 'target') {
        const targetBytes = Math.round(options.targetKb * 1024);
        if (new Blob([optimized]).size > targetBytes) {
          optimized = optimizeSvgText(rawText, 1);
        }
      }

      const vbMatch = optimized.match(/viewBox="[\d.\s-]+?\s+[\d.\s-]+?\s+([\d.]+)\s+([\d.]+)"/i);
      const wMatch = optimized.match(/\bwidth="([\d.]+)/i);
      const hMatch = optimized.match(/\bheight="([\d.]+)/i);
      const svgW = Math.round(Number(wMatch?.[1] || vbMatch?.[1] || 800)) || 800;
      const svgH = Math.round(Number(hMatch?.[1] || vbMatch?.[2] || 600)) || 600;

      const outBytes = new TextEncoder().encode(optimized);
      const finalBuffer =
        outBytes.byteLength < fileBuffer.byteLength ? outBytes.buffer : fileBuffer;
      return {
        id,
        ok: true,
        compressedBuffer: finalBuffer,
        outputMime: 'image/svg+xml',
        outputName: buildOutputFileName(fileName, 'image/svg+xml'),
        width: svgW,
        height: svgH,
        originalWidth: svgW,
        originalHeight: svgH,
      };
    }

    // 2. Native GIF Optimization when keeping original format
    if (fileType === 'image/gif' && options.outputFormat === 'original') {
      const gifResult = await compressGif(fileBuffer, options);
      const outBuffer = gifResult.blob
        ? await gifResult.blob.arrayBuffer()
        : fileBuffer;
      return {
        id,
        ok: true,
        compressedBuffer: outBuffer,
        outputMime: 'image/gif',
        outputName: buildOutputFileName(fileName, 'image/gif'),
        width: gifResult.width,
        height: gifResult.height,
        originalWidth: gifResult.origW,
        originalHeight: gifResult.origH,
      };
    }

    // 3. Raster Compression (JPG, PNG, WebP)
    const inputBlob = new Blob([fileBuffer], { type: fileType });
    const bitmap = await createImageBitmap(inputBlob);
    const originalWidth = bitmap.width;
    const originalHeight = bitmap.height;

    const resolvedMime: 'image/jpeg' | 'image/png' | 'image/webp' =
      options.outputFormat === 'original'
        ? fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/webp'
          ? fileType
          : 'image/webp'
        : options.outputFormat;

    const isSameFormat = resolvedMime === fileType;
    const result =
      resolvedMime === 'image/png'
        ? await compressPngRaster(bitmap, options, fileBuffer.byteLength, isSameFormat)
        : await compressLossyRaster(bitmap, resolvedMime, options, fileBuffer.byteLength, isSameFormat);

    bitmap.close();

    const compressedBuffer = result.blob
      ? await result.blob.arrayBuffer()
      : fileBuffer;
    return {
      id,
      ok: true,
      compressedBuffer,
      outputMime: resolvedMime,
      outputName: buildOutputFileName(fileName, resolvedMime),
      width: result.width,
      height: result.height,
      originalWidth,
      originalHeight,
    };
  } catch (err) {
    return {
      id,
      ok: false,
      error: err instanceof Error ? err.message : 'Compression failed',
    };
  }
}
