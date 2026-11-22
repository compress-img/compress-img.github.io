declare module 'upng-js' {
  const UPNG: {
    encode(
      imgs: ArrayBuffer[],
      w: number,
      h: number,
      cnum: number,
      dels?: number[]
    ): ArrayBuffer;
    decode(buff: ArrayBuffer): {
      width: number;
      height: number;
      depth: number;
      ctype: number;
      frames: Array<{ delay: number }>;
    };
    toRGBA8(img: unknown): ArrayBuffer[];
  };
  export default UPNG;
}

declare module 'omggif' {
  export class GifReader {
    width: number;
    height: number;
    constructor(buf: Uint8Array);
    numFrames(): number;
    loopCount(): number | null;
    frameInfo(frame_num: number): {
      x: number;
      y: number;
      width: number;
      height: number;
      has_local_palette: boolean;
      palette_offset: number | null;
      palette_size: number | null;
      data_offset: number;
      data_length: number;
      transparent_index: number | null;
      interlaced: boolean;
      delay: number;
      disposal: number;
    };
    decodeAndBlitFrameRGBA(frame_num: number, pixels: Uint8Array | Uint8ClampedArray): void;
  }
}

declare module 'gifenc' {
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    options?: {
      format?: 'rgb565' | 'rgb444' | 'rgba4444';
      oneBitAlpha?: boolean | number;
      clearAlpha?: boolean;
      clearAlphaThreshold?: number;
      clearAlphaColor?: number;
      useSqrt?: boolean;
    }
  ): number[][];

  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: number[][],
    format?: 'rgb565' | 'rgb444' | 'rgba4444'
  ): Uint8Array;

  export function GIFEncoder(options?: {
    auto?: boolean;
    initialCapacity?: number;
  }): {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options?: {
        palette?: number[][];
        delay?: number;
        repeat?: number;
        transparent?: boolean;
        transparentIndex?: number;
        dispose?: number;
        first?: boolean;
      }
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };
}
