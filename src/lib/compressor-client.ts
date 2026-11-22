import {
  normalizeMimeType,
  type CompressionOptions,
  type WorkerRequest,
  type WorkerResponse,
} from './compression-types';

let workerInstance: Worker | null = null;
let workerInitPromise: Promise<Worker | null> | null = null;
const pendingJobs = new Map<
  string,
  { resolve: (res: WorkerResponse) => void; reject: (err: Error) => void }
>();

export async function getWorker(): Promise<Worker | null> {
  if (typeof window === 'undefined' || typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') {
    return null;
  }
  if (workerInstance) return workerInstance;
  if (workerInitPromise) return workerInitPromise;

  workerInitPromise = (async () => {
    try {
      const { default: CompressWorker } = await import(
        '../workers/compress.worker.ts?worker&inline'
      );
      const instance = new CompressWorker();
      instance.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const res = event.data;
        const job = pendingJobs.get(res.id);
        if (job) {
          pendingJobs.delete(res.id);
          job.resolve(res);
        }
      };
      instance.onerror = (err) => {
        for (const [jobId, job] of pendingJobs.entries()) {
          pendingJobs.delete(jobId);
          job.reject(new Error(err.message || 'Worker error'));
        }
        workerInstance?.terminate();
        workerInstance = null;
        workerInitPromise = null;
      };
      workerInstance = instance;
      return instance;
    } catch {
      workerInstance = null;
      workerInitPromise = null;
      return null;
    }
  })();

  return workerInitPromise;
}

async function rasterizeSvgOnMainThread(file: File): Promise<{ buffer: ArrayBuffer; mime: string }> {
  const text = await file.text();
  const svgBlob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Failed to decode SVG'));
      el.src = url;
    });

    const w = Math.max(1, img.naturalWidth || 1024);
    const h = Math.max(1, img.naturalHeight || 768);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');
    ctx.drawImage(img, 0, 0, w, h);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('SVG rasterization failed'))), 'image/png');
    });

    return { buffer: await pngBlob.arrayBuffer(), mime: 'image/png' };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function compressImageClient(
  jobId: string,
  file: File,
  options: CompressionOptions
): Promise<WorkerResponse> {
  const mime = normalizeMimeType(file);
  let fileBuffer: ArrayBuffer;
  let effectiveMime = mime;

  if (mime === 'image/svg+xml' && options.outputFormat !== 'original') {
    const raster = await rasterizeSvgOnMainThread(file);
    fileBuffer = raster.buffer;
    effectiveMime = raster.mime;
  } else {
    fileBuffer = await file.arrayBuffer();
  }

  const request: WorkerRequest = {
    id: jobId,
    fileBuffer,
    fileName: file.name,
    fileType: effectiveMime,
    options,
  };

  const worker = await getWorker();
  if (worker) {
    try {
      const res = await new Promise<WorkerResponse>((resolve, reject) => {
        pendingJobs.set(jobId, { resolve, reject });
        const transferCopy = request.fileBuffer.slice(0);
        worker.postMessage({ ...request, fileBuffer: transferCopy }, [transferCopy]);
      });
      if (res.ok) return res;
    } catch {
      // Fall through to main-thread fallback
    }
  }

  const { processCompressionJob } = await import('./compression-engine');
  return processCompressionJob(request);
}

/**
 * Generates a rich, detailed 1600x1066 sample photo locally on Canvas (zero network fetch).
 */
export async function createSampleImageFile(): Promise<File> {
  const w = 1600;
  const h = 1066;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  // Rich sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, '#242236');
  sky.addColorStop(0.42, '#8785A2');
  sky.addColorStop(0.76, '#F5B0B0');
  sky.addColorStop(1, '#FFE2E2');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Glowing sun disc
  const sun = ctx.createRadialGradient(w * 0.68, h * 0.34, 10, w * 0.68, h * 0.34, 240);
  sun.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  sun.addColorStop(0.28, 'rgba(255, 226, 226, 0.88)');
  sun.addColorStop(0.65, 'rgba(255, 199, 199, 0.32)');
  sun.addColorStop(1, 'rgba(255, 199, 199, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);

  // Subtle photographic stars & bokeh texture
  for (let i = 0; i < 160; i++) {
    const sx = ((i * 397) % w);
    const sy = ((i * 211) % (h * 0.45));
    const r = (i % 3) + 0.8;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.22 + (i % 5) * 0.14})`;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layered mountain silhouettes
  const drawRidge = (pts: Array<[number, number]>, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (const [x, y] of pts) ctx.lineTo(x, y);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  };

  drawRidge(
    [
      [0, h * 0.62],
      [220, h * 0.48],
      [480, h * 0.57],
      [760, h * 0.41],
      [1040, h * 0.54],
      [1340, h * 0.43],
      [w, h * 0.56],
    ],
    '#6B688A'
  );

  drawRidge(
    [
      [0, h * 0.72],
      [190, h * 0.59],
      [430, h * 0.67],
      [690, h * 0.51],
      [960, h * 0.66],
      [1260, h * 0.54],
      [w, h * 0.65],
    ],
    '#43405E'
  );

  drawRidge(
    [
      [0, h * 0.82],
      [260, h * 0.72],
      [560, h * 0.79],
      [880, h * 0.69],
      [1180, h * 0.78],
      [w, h * 0.71],
    ],
    '#242236'
  );

  // Foreground lake reflection & crisp fine detail texture
  const lake = ctx.createLinearGradient(0, h * 0.83, 0, h);
  lake.addColorStop(0, '#1D1B2C');
  lake.addColorStop(1, '#312E48');
  ctx.fillStyle = lake;
  ctx.fillRect(0, h * 0.83, w, h * 0.17);

  for (let i = 0; i < 42; i++) {
    const y = h * 0.85 + i * 3.8;
    const width = 180 + ((i * 47) % 240);
    const x = w * 0.68 - width / 2 + Math.sin(i) * 18;
    ctx.fillStyle = `rgba(255, 199, 199, ${0.32 - i * 0.006})`;
    ctx.fillRect(x, y, width, 1.8);
  }

  // Crisp subtle badge to showcase sharp detail preservation
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(64, 64, 340, 74, 18);
  } else {
    ctx.rect(64, 64, 340, 74);
  }
  ctx.fill();
  ctx.fillStyle = '#242236';
  ctx.font = '700 28px system-ui, sans-serif';
  ctx.fillText('CompressImg Sample', 90, 108);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Could not build sample image'))),
      'image/png'
    );
  });

  return new File([blob], 'sample-landscape.png', { type: 'image/png' });
}
