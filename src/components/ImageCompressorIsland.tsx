import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import JSZip from 'jszip';
import {
  formatBytes,
  isSupportedImageFile,
  normalizeMimeType,
  type CompressedQueueItem,
  type CompressionMode,
  type CompressionOptions,
  type OutputFormat,
} from '../lib/compression-types';
import { compressImageClient, createSampleImageFile, getWorker } from '../lib/compressor-client';
import type { TranslationBundle } from '../i18n/translations';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ImageCompressorIslandProps {
  t: TranslationBundle['compressor'];
  privacyNote: string;
}

const KB_PRESETS = [20, 50, 100, 200] as const;

const OUTPUT_FORMATS: Array<{ value: OutputFormat; labelKey: 'formatOriginal' | null; staticLabel?: string }> = [
  { value: 'original', labelKey: 'formatOriginal' },
  { value: 'image/jpeg', labelKey: null, staticLabel: 'JPG' },
  { value: 'image/png', labelKey: null, staticLabel: 'PNG' },
  { value: 'image/webp', labelKey: null, staticLabel: 'WebP' },
];

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    key in vars ? String(vars[key]) : ''
  );
}

export const ImageCompressorIsland: React.FC<ImageCompressorIslandProps> = ({
  t,
  privacyNote,
}) => {
  const [items, setItems] = useState<CompressedQueueItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<CompressionMode>('quality');
  const [quality, setQuality] = useState<number>(80);
  const [targetKb, setTargetKb] = useState<number>(50);
  const [customKbText, setCustomKbText] = useState<string>('50');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('original');
  const [isDragging, setIsDragging] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<CompressedQueueItem[]>([]);
  const jobGenerationRef = useRef(0);
  const debounceTimerRef = useRef<number | null>(null);

  itemsRef.current = items;

  // Pre-warm inline Web Worker for instant compression & offline PWA caching, and cleanup URLs on unmount
  useEffect(() => {
    void getWorker();
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl);
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
      });
    };
  }, []);

  const currentOptions: CompressionOptions = useMemo(
    () => ({
      mode,
      quality,
      targetKb,
      outputFormat,
    }),
    [mode, quality, targetKb, outputFormat]
  );

  const runCompressionBatch = useCallback(
    async (targetItems: CompressedQueueItem[], opts: CompressionOptions) => {
      if (targetItems.length === 0) return;
      const gen = ++jobGenerationRef.current;

      setItems((prev) =>
        prev.map((it) =>
          targetItems.some((tItem) => tItem.id === it.id)
            ? { ...it, status: 'processing', errorMessage: undefined }
            : it
        )
      );

      let completedCount = 0;
      let totalOrig = 0;
      let totalComp = 0;
      let lastSingleName = '';
      let lastSingleOrig = 0;
      let lastSingleComp = 0;

      await Promise.all(
        targetItems.map(async (item) => {
          const jobId = `${item.id}-${gen}`;
          const res = await compressImageClient(jobId, item.file, opts);

          // Discard stale response if user changed controls mid-flight
          if (jobGenerationRef.current !== gen) return;

          if (res.ok) {
            const compressedBlob = new Blob([res.compressedBuffer], { type: res.outputMime });
            const compressedUrl = URL.createObjectURL(compressedBlob);
            completedCount++;
            totalOrig += item.originalSize;
            totalComp += compressedBlob.size;
            lastSingleName = item.originalName;
            lastSingleOrig = item.originalSize;
            lastSingleComp = compressedBlob.size;

            setItems((prev) =>
              prev.map((it) => {
                if (it.id !== item.id) return it;
                if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
                return {
                  ...it,
                  status: 'done',
                  compressedBlob,
                  compressedUrl,
                  compressedSize: compressedBlob.size,
                  outputName: res.outputName,
                  outputMime: res.outputMime,
                  width: res.width,
                  height: res.height,
                  originalWidth: res.originalWidth,
                  originalHeight: res.originalHeight,
                };
              })
            );
          } else {
            setItems((prev) =>
              prev.map((it) =>
                it.id === item.id
                  ? { ...it, status: 'error', errorMessage: res.error }
                  : it
              )
            );
            setLiveMessage(interpolate(t.liveError, { name: item.originalName }));
          }
        })
      );

      if (jobGenerationRef.current !== gen || completedCount === 0) return;

      if (completedCount === 1) {
        const savedPct = Math.max(
          0,
          Math.round(((lastSingleOrig - lastSingleComp) / Math.max(1, lastSingleOrig)) * 100)
        );
        setLiveMessage(
          interpolate(t.liveProcessedSingle, {
            name: lastSingleName,
            before: formatBytes(lastSingleOrig),
            after: formatBytes(lastSingleComp),
            saved: savedPct,
          })
        );
      } else {
        const savedPct = Math.max(
          0,
          Math.round(((totalOrig - totalComp) / Math.max(1, totalOrig)) * 100)
        );
        setLiveMessage(
          interpolate(t.liveProcessedBatch, {
            count: completedCount,
            before: formatBytes(totalOrig),
            after: formatBytes(totalComp),
            saved: savedPct,
          })
        );
      }
    },
    [t.liveError, t.liveProcessedBatch, t.liveProcessedSingle]
  );

  const enqueueFiles = useCallback(
    (incomingFiles: FileList | File[]) => {
      const fileArray = Array.from(incomingFiles);
      const validFiles: File[] = [];

      for (const f of fileArray) {
        if (isSupportedImageFile(f)) {
          validFiles.push(f);
        } else {
          setLiveMessage(interpolate(t.unsupportedFile, { name: f.name }));
        }
      }

      if (validFiles.length === 0) return;

      const newItems: CompressedQueueItem[] = validFiles.map((file, idx) => ({
        id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        originalName: file.name,
        originalSize: file.size,
        originalType: normalizeMimeType(file),
        originalUrl: URL.createObjectURL(file),
        status: 'processing',
      }));

      const merged = [...itemsRef.current, ...newItems];
      setItems(merged);
      setSelectedId((prev) => prev ?? newItems[0].id);

      // Re-run compression on newly added items immediately
      void runCompressionBatch(newItems, currentOptions);
    },
    [currentOptions, runCompressionBatch, t.unsupportedFile]
  );

  // Paste image files from clipboard anywhere on page
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const files = e.clipboardData?.files;
      if (files && files.length > 0) {
        enqueueFiles(files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [enqueueFiles]);

  const scheduleRecompress = useCallback(
    (nextOpts: CompressionOptions, immediate = false) => {
      if (itemsRef.current.length === 0) return;
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);

      if (immediate) {
        void runCompressionBatch(itemsRef.current, nextOpts);
      } else {
        debounceTimerRef.current = window.setTimeout(() => {
          void runCompressionBatch(itemsRef.current, nextOpts);
        }, 140);
      }
    },
    [runCompressionBatch]
  );

  const handleModeSwitch = (nextMode: CompressionMode) => {
    setMode(nextMode);
    scheduleRecompress({ ...currentOptions, mode: nextMode }, true);
  };

  const handleQualityChange = (nextQuality: number) => {
    setQuality(nextQuality);
    scheduleRecompress({ ...currentOptions, mode: 'quality', quality: nextQuality }, false);
  };

  const handlePresetKb = (kb: number) => {
    setMode('target');
    setTargetKb(kb);
    setCustomKbText(String(kb));
    scheduleRecompress({ ...currentOptions, mode: 'target', targetKb: kb }, true);
  };

  const handleApplyCustomKb = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    const parsed = Math.round(Number(customKbText));
    const safeKb = Number.isFinite(parsed) ? Math.min(10240, Math.max(5, parsed)) : 50;
    setMode('target');
    setTargetKb(safeKb);
    setCustomKbText(String(safeKb));
    scheduleRecompress({ ...currentOptions, mode: 'target', targetKb: safeKb }, true);
  };

  const handleFormatChange = (fmt: OutputFormat) => {
    setOutputFormat(fmt);
    scheduleRecompress({ ...currentOptions, outputFormat: fmt }, true);
  };

  const handleTrySample = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const sampleFile = await createSampleImageFile();
    enqueueFiles([sampleFile]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
      }
      const next = prev.filter((it) => it.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  const handleClearAll = () => {
    jobGenerationRef.current++;
    itemsRef.current.forEach((it) => {
      URL.revokeObjectURL(it.originalUrl);
      if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
    });
    setItems([]);
    setSelectedId(null);
    setLiveMessage('');
  };

  const handleDownloadSingle = (item: CompressedQueueItem) => {
    if (!item.compressedBlob || !item.outputName) return;
    triggerBlobDownload(item.compressedBlob, item.outputName);
  };

  const handleDownloadAllZip = async () => {
    const readyItems = items.filter((it) => it.status === 'done' && it.compressedBlob && it.outputName);
    if (readyItems.length === 0 || isZipping) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      const usedNames = new Map<string, number>();

      for (const item of readyItems) {
        const rawName = item.outputName!;
        const count = usedNames.get(rawName) ?? 0;
        usedNames.set(rawName, count + 1);

        let uniqueName = rawName;
        if (count > 0) {
          const dotIdx = rawName.lastIndexOf('.');
          uniqueName =
            dotIdx > 0
              ? `${rawName.slice(0, dotIdx)}-${count + 1}${rawName.slice(dotIdx)}`
              : `${rawName}-${count + 1}`;
        }

        zip.file(uniqueName, item.compressedBlob!);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      triggerBlobDownload(zipBlob, 'compressimg-batch.zip');
      setLiveMessage(interpolate(t.liveZipReady, { count: readyItems.length }));
    } finally {
      setIsZipping(false);
    }
  };

  const selectedItem =
    items.find((it) => it.id === selectedId) ?? items[0] ?? null;

  const doneItems = items.filter((it) => it.status === 'done' && it.compressedSize !== undefined);
  const totalOrigBytes = doneItems.reduce((acc, it) => acc + it.originalSize, 0);
  const totalCompBytes = doneItems.reduce((acc, it) => acc + (it.compressedSize ?? 0), 0);
  const totalSavedPct =
    totalOrigBytes > 0 ? Math.max(0, ((totalOrigBytes - totalCompBytes) / totalOrigBytes) * 100) : 0;
  const anyProcessing = items.some((it) => it.status === 'processing');

  return (
    <section
      aria-label="Interactive image compressor workspace"
      className="mx-auto w-full max-w-5xl rounded-3xl border border-line bg-card p-4 sm:p-6 md:p-8 shadow-soft"
    >
      {/* Hidden Multi-File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) enqueueFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* Screen Reader Status Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>

      {/* Mode & Settings Controls */}
      <div className="mb-5 rounded-2xl border border-line bg-page p-3.5 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Mode Toggle */}
          <div className="inline-flex rounded-xl border border-line bg-card p-1 self-start">
            <button
              type="button"
              aria-pressed={mode === 'quality'}
              onClick={() => handleModeSwitch('quality')}
              className={`rounded-lg px-4 py-2 text-sm font-bold spring-transition ${
                mode === 'quality'
                  ? 'bg-[#FFC7C7] text-[#242236] shadow-sm'
                  : 'text-inkmuted hover:text-ink'
              }`}
            >
              {t.modeQuality}
            </button>
            <button
              type="button"
              aria-pressed={mode === 'target'}
              onClick={() => handleModeSwitch('target')}
              className={`rounded-lg px-4 py-2 text-sm font-bold spring-transition ${
                mode === 'target'
                  ? 'bg-[#FFC7C7] text-[#242236] shadow-sm'
                  : 'text-inkmuted hover:text-ink'
              }`}
            >
              {t.modeTargetKb}
            </button>
          </div>

          {/* Output Format Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-inkmuted mr-1">
              {t.outputFormatLabel}:
            </span>
            <div className="inline-flex flex-wrap gap-1.5">
              {OUTPUT_FORMATS.map((fmt) => {
                const isActive = outputFormat === fmt.value;
                return (
                  <button
                    key={fmt.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleFormatChange(fmt.value)}
                    className={`rounded-xl border px-3 py-1.5 text-xs sm:text-sm font-bold spring-transition ${
                      isActive
                        ? 'border-[#242236]/20 bg-[#FFC7C7] text-[#242236] shadow-sm'
                        : 'border-line bg-card text-inkmuted hover:bg-subtle hover:text-ink'
                    }`}
                  >
                    {fmt.labelKey ? t[fmt.labelKey] : fmt.staticLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mode-Specific Interactive Controls */}
        <div className="mt-4 border-t border-line pt-4">
          {mode === 'quality' ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <label
                htmlFor="quality-slider"
                className="flex items-center justify-between sm:w-52 text-sm font-semibold text-ink"
              >
                <span>{t.qualityLabel}</span>
                <span className="ml-2 rounded-lg bg-[#FFE2E2] px-2.5 py-0.5 text-sm font-extrabold text-[#242236] tabular-nums">
                  {quality}%
                </span>
              </label>
              <input
                id="quality-slider"
                type="range"
                min={10}
                max={100}
                step={1}
                value={quality}
                aria-label={t.qualityLabel}
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={quality}
                aria-valuetext={`${quality}%`}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="rose-slider w-full flex-1"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink mr-1">{t.targetSizeLabel}:</span>
                {KB_PRESETS.map((preset) => {
                  const isActive = targetKb === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handlePresetKb(preset)}
                      className={`min-w-[66px] rounded-xl border px-3.5 py-2 text-sm font-extrabold tabular-nums spring-hover ${
                        isActive
                          ? 'border-[#242236]/20 bg-[#FFC7C7] text-[#242236] shadow-sm'
                          : 'border-line bg-card text-ink hover:bg-subtle'
                      }`}
                    >
                      {preset}
                      {t.kbUnit}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleApplyCustomKb} className="flex items-center gap-2">
                <label htmlFor="custom-kb-input" className="text-xs font-bold uppercase tracking-wide text-inkmuted">
                  {t.customKbLabel}:
                </label>
                <div className="flex items-center rounded-xl border border-line bg-card px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-slateink">
                  <input
                    id="custom-kb-input"
                    type="number"
                    min={5}
                    max={10240}
                    value={customKbText}
                    placeholder={t.customKbPlaceholder}
                    aria-label={t.customKbLabel}
                    onChange={(e) => setCustomKbText(e.target.value)}
                    className="w-20 bg-transparent text-sm font-bold text-ink tabular-nums focus:outline-none"
                  />
                  <span className="text-xs font-bold text-inkmuted">{t.kbUnit}</span>
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-[#FFC7C7] px-4 py-2 text-sm font-bold text-[#242236] hover:bg-[#F5B0B0] spring-transition"
                >
                  {t.applyCustomKb}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Dropzone (Full when empty, Compact bar when populated) */}
      {items.length === 0 ? (
        <div
          role="button"
          tabIndex={0}
          aria-label={t.dropAriaLabel}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) enqueueFiles(e.dataTransfer.files);
          }}
          className={`group flex min-h-[280px] sm:min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer spring-transition ${
            isDragging
              ? 'border-[#242236] bg-[#FFE2E2]/70 dark:bg-subtle scale-[1.01]'
              : 'border-line bg-page/70 hover:border-slateink hover:bg-subtle/40'
          }`}
        >
          {/* Creative Animated Image Compression Scene */}
          <div
            aria-hidden="true"
            className={`relative mb-4 flex h-28 w-44 items-center justify-center select-none spring-transition ${
              isDragging ? 'scale-110' : 'group-hover:scale-105'
            }`}
          >
            {/* Soft Ambient Rose Glow */}
            <div className="absolute h-24 w-24 rounded-full bg-[#FFC7C7]/45 dark:bg-[#FFC7C7]/20 blur-xl" />

            {/* Left Floating Stacked Photo Card */}
            <div className="animate-hero-float-left absolute left-4 top-5 flex h-14 w-12 flex-col items-center justify-center rounded-xl border border-[#EAD6D6] dark:border-line bg-[#FFE2E2] dark:bg-subtle p-1.5 shadow-sm">
              <svg className="h-7 w-7 text-[#242236] dark:text-[#F6F6F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="m21 15-4.5-4.5L7 20" />
              </svg>
            </div>

            {/* Right Floating Stacked Photo Card */}
            <div className="animate-hero-float-right absolute right-4 bottom-4 flex h-14 w-12 flex-col items-center justify-center rounded-xl border border-[#EAD6D6] dark:border-line bg-card p-1.5 shadow-sm">
              <svg className="h-7 w-7 text-[#8785A2] dark:text-[#FFC7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                <path d="m21 16-5-5L6 21" />
              </svg>
            </div>

            {/* Four Inward Compression Corner Arrows */}
            <svg className="animate-hero-arrow-tl absolute top-1.5 left-11 h-4 w-4 text-[#242236] dark:text-[#FFC7C7]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l9 9M13 6v7H6" />
            </svg>
            <svg className="animate-hero-arrow-tr absolute top-1.5 right-11 h-4 w-4 text-[#242236] dark:text-[#FFC7C7]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4l-9 9M7 6v7h7" />
            </svg>
            <svg className="animate-hero-arrow-bl absolute bottom-1.5 left-11 h-4 w-4 text-[#242236] dark:text-[#FFC7C7]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l9-9M6 7h7v7" />
            </svg>
            <svg className="animate-hero-arrow-br absolute bottom-1.5 right-11 h-4 w-4 text-[#242236] dark:text-[#FFC7C7]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 16l-9-9M14 7H7v7" />
            </svg>

            {/* Center Compressing Image Icon Card */}
            <div className="animate-hero-compress relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#242236] bg-[#FFC7C7] text-[#242236] shadow-rose">
              <div className="animate-hero-shine pointer-events-none absolute inset-y-0 w-7 bg-white/60 blur-[1px]" />
              <svg className="relative z-10 h-12 w-12" viewBox="0 0 48 48" fill="none">
                <rect x="5" y="7" width="38" height="34" rx="8" fill="#FFFFFF" stroke="#242236" strokeWidth="2.6" />
                <rect x="9" y="11" width="30" height="26" rx="5" fill="#FFE2E2" />
                <circle cx="17.5" cy="18.5" r="3" fill="#242236" />
                <path d="M10.5 32.5L18.5 24.5C19.3 23.7 20.6 23.7 21.4 24.5L26 29L30.5 24.5C31.3 23.7 32.6 23.7 33.4 24.5L38 29V33.5C38 34.9 36.9 36 35.5 36H12.5C11.1 36 10.5 34.9 10.5 33.5V32.5Z" fill="#8785A2" />
              </svg>
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink">
            {t.dropTitle}
          </p>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-inkmuted">
            {t.dropSubtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#FFC7C7] px-6 py-3.5 text-base font-extrabold text-[#242236] shadow-sm hover:bg-[#F5B0B0] spring-hover"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span>{t.selectImages}</span>
            </button>

            <button
              type="button"
              onClick={handleTrySample}
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-card px-5 py-3.5 text-sm font-bold text-ink hover:bg-subtle spring-hover"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.9 5.8L20 10.7l-5 3.6 1.9 5.7-4.9-3.5-4.9 3.5 1.9-5.7-5-3.6 6.1-1.9L12 3z" />
              </svg>
              <span>{t.trySample}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-up">
          {/* Compact Top Action Bar */}
          <div
            role="button"
            tabIndex={0}
            aria-label={t.dropAriaLabel}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files) enqueueFiles(e.dataTransfer.files);
            }}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-dashed p-3.5 cursor-pointer spring-transition ${
              isDragging ? 'border-[#242236] bg-subtle' : 'border-line bg-page/60 hover:border-slateink'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFC7C7] px-4 py-2 text-sm font-bold text-[#242236] hover:bg-[#F5B0B0] spring-hover"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>{t.addMoreImages}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2 text-sm font-semibold text-inkmuted hover:bg-subtle hover:text-ink spring-transition"
              >
                {t.clearAll}
              </button>
            </div>

            {doneItems.length > 0 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-wrap items-center gap-3"
              >
                <div className="text-xs sm:text-sm text-inkmuted tabular-nums">
                  <span className="font-semibold text-ink">{t.totalSummary}:</span>{' '}
                  {formatBytes(totalOrigBytes)} → <strong className="text-ink">{formatBytes(totalCompBytes)}</strong>{' '}
                  {totalCompBytes <= totalOrigBytes && (
                    <span className="ml-1 rounded-full bg-[#FFE2E2] px-2 py-0.5 text-xs font-extrabold text-[#242236]">
                      -{totalSavedPct.toFixed(1)}%
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={anyProcessing || isZipping}
                  onClick={handleDownloadAllZip}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#242236] px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 spring-hover"
                >
                  {isZipping ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-[#FFC7C7] border-t-transparent animate-spin-smooth" />
                      <span>{t.creatingZip}</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-[#FFC7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      <span>{t.downloadAllZip}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Active Processing Progress Bar */}
          {anyProcessing && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-subtle" aria-hidden="true">
              <div className="h-full w-1/3 rounded-full bg-[#FFC7C7] animate-progress-bar" />
            </div>
          )}

          {/* Before / After Interactive Inspector */}
          {selectedItem && (
            <BeforeAfterSlider
              beforeUrl={selectedItem.originalUrl}
              afterUrl={selectedItem.compressedUrl}
              beforeLabel={t.beforeLabel}
              afterLabel={t.afterLabel}
              sliderAriaLabel={t.sliderAriaLabel}
              originalSize={selectedItem.originalSize}
              compressedSize={selectedItem.compressedSize}
              originalSizeLabel={t.originalSizeLabel}
              compressedSizeLabel={t.compressedSizeLabel}
              savedLabel={t.savedLabel}
              largerWarning={t.largerWarning}
              dimensionsText={
                selectedItem.width && selectedItem.height
                  ? `${selectedItem.width} × ${selectedItem.height}`
                  : undefined
              }
              outputMime={selectedItem.outputMime}
              isProcessing={selectedItem.status === 'processing'}
              processingText={t.processingStatus}
            />
          )}

          {/* Batch Queue Items List */}
          <ul className="space-y-2.5" aria-label="Image batch queue">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const savedPct =
                item.compressedSize !== undefined && item.originalSize > 0
                  ? ((item.originalSize - item.compressedSize) / item.originalSize) * 100
                  : 0;
              const isSmaller =
                item.compressedSize !== undefined && item.compressedSize <= item.originalSize;

              return (
                <li
                  key={item.id}
                  className={`flex flex-col gap-3 rounded-2xl border p-3 sm:flex-row sm:items-center sm:justify-between spring-transition ${
                    isSelected
                      ? 'border-[#242236]/40 dark:border-[#FFC7C7]/60 bg-subtle/45'
                      : 'border-line bg-page/50 hover:bg-subtle/25'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.compressedUrl || item.originalUrl}
                      alt={item.originalName}
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0 rounded-xl border border-line object-cover checkerboard-bg"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink">
                        {item.outputName || item.originalName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-inkmuted tabular-nums">
                        <span>{formatBytes(item.originalSize)}</span>
                        <span aria-hidden="true">→</span>
                        {item.status === 'processing' ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                            <span className="h-3 w-3 rounded-full border-2 border-[#242236] dark:border-[#FFC7C7] border-t-transparent animate-spin-smooth" />
                            {t.processingStatus}
                          </span>
                        ) : item.status === 'error' ? (
                          <span className="font-semibold text-red-700 dark:text-red-300">
                            {item.errorMessage || 'Error'}
                          </span>
                        ) : (
                          <>
                            <strong className="text-ink">
                              {item.compressedSize !== undefined ? formatBytes(item.compressedSize) : '—'}
                            </strong>
                            {isSmaller && (
                              <span className="rounded-full bg-[#FFE2E2] px-2 py-0.5 font-extrabold text-[#242236]">
                                -{Math.max(0, savedPct).toFixed(1)}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold spring-transition ${
                        isSelected
                          ? 'border-[#242236]/20 bg-[#FFE2E2] text-[#242236]'
                          : 'border-line bg-card text-ink hover:bg-subtle'
                      }`}
                    >
                      {t.inspectBtn}
                    </button>

                    <button
                      type="button"
                      disabled={item.status !== 'done'}
                      onClick={() => handleDownloadSingle(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFC7C7] px-3.5 py-2 text-xs font-extrabold text-[#242236] hover:bg-[#F5B0B0] disabled:opacity-45 spring-hover"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      <span>{t.downloadBtn}</span>
                    </button>

                    <button
                      type="button"
                      aria-label={`${t.removeBtn}: ${item.originalName}`}
                      onClick={() => handleRemoveItem(item.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card text-inkmuted hover:bg-subtle hover:text-ink spring-transition"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Privacy Guarantee Pill */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-inkmuted">
        <svg className="h-4 w-4 shrink-0 text-slateink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{privacyNote}</span>
      </div>
    </section>
  );
};
