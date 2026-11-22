export type CompressionMode = 'quality' | 'target';
export type OutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

export interface CompressionOptions {
  mode: CompressionMode;
  quality: number; // 10 - 100
  targetKb: number; // e.g., 20, 50, 100, 200, or custom
  outputFormat: OutputFormat;
}

export interface WorkerRequest {
  id: string;
  fileBuffer: ArrayBuffer;
  fileName: string;
  fileType: string;
  options: CompressionOptions;
}

export interface WorkerSuccessResponse {
  id: string;
  ok: true;
  compressedBuffer: ArrayBuffer;
  outputMime: string;
  outputName: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

export interface WorkerErrorResponse {
  id: string;
  ok: false;
  error: string;
}

export type WorkerResponse = WorkerSuccessResponse | WorkerErrorResponse;

export interface CompressedQueueItem {
  id: string;
  file: File;
  originalName: string;
  originalSize: number;
  originalType: string;
  originalUrl: string;
  status: 'processing' | 'done' | 'error';
  compressedBlob?: Blob;
  compressedUrl?: string;
  compressedSize?: number;
  outputName?: string;
  outputMime?: string;
  width?: number;
  height?: number;
  originalWidth?: number;
  originalHeight?: number;
  errorMessage?: string;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb < 10 ? kb.toFixed(2) : kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

export function getExtensionFromMime(mime: string, originalName: string): string {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    default: {
      const parts = originalName.split('.');
      return parts.length > 1 ? parts.pop()!.toLowerCase() : 'png';
    }
  }
}

export function buildOutputFileName(originalName: string, outputMime: string): string {
  const ext = getExtensionFromMime(outputMime, originalName);
  const dotIdx = originalName.lastIndexOf('.');
  const base = dotIdx > 0 ? originalName.slice(0, dotIdx) : originalName;
  return `${base}-compressed.${ext}`;
}

export function isSupportedImageFile(file: File): boolean {
  const validMimes = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ]);
  if (validMimes.has(file.type.toLowerCase())) return true;
  return /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);
}

export function normalizeMimeType(file: File): string {
  const raw = file.type.toLowerCase();
  if (raw === 'image/jpg') return 'image/jpeg';
  if (raw) return raw;
  const name = file.name.toLowerCase();
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg';
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.webp')) return 'image/webp';
  if (name.endsWith('.gif')) return 'image/gif';
  if (name.endsWith('.svg')) return 'image/svg+xml';
  return 'image/png';
}
