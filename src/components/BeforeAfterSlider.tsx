import React, { useCallback, useRef, useState } from 'react';
import { formatBytes } from '../lib/compression-types';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl?: string;
  beforeLabel: string;
  afterLabel: string;
  sliderAriaLabel: string;
  originalSize: number;
  compressedSize?: number;
  originalSizeLabel: string;
  compressedSizeLabel: string;
  savedLabel: string;
  largerWarning: string;
  dimensionsText?: string;
  outputMime?: string;
  isProcessing: boolean;
  processingText: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeUrl,
  afterUrl,
  beforeLabel,
  afterLabel,
  sliderAriaLabel,
  originalSize,
  compressedSize,
  originalSizeLabel,
  compressedSizeLabel,
  savedLabel,
  largerWarning,
  dimensionsText,
  outputMime,
  isProcessing,
  processingText,
}) => {
  const [splitPercent, setSplitPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(100, Math.max(0, Math.round(pct))));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPercent((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPercent((prev) => Math.min(100, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSplitPercent(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSplitPercent(100);
    }
  };

  const savedPercent =
    compressedSize !== undefined && originalSize > 0
      ? ((originalSize - compressedSize) / originalSize) * 100
      : 0;
  const isLarger = compressedSize !== undefined && compressedSize > originalSize;
  const displayMime = outputMime ? outputMime.replace('image/', '').replace('+xml', '').toUpperCase() : '';

  return (
    <div className="rounded-2xl border border-line bg-page p-3 sm:p-4">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-64 sm:h-80 w-full select-none overflow-hidden rounded-xl border border-line checkerboard-bg touch-none cursor-ew-resize"
      >
        {/* After (Compressed) Layer */}
        <img
          src={afterUrl || beforeUrl}
          alt={afterLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        />

        {/* Before (Original) Layer Clipped */}
        <img
          src={beforeUrl}
          alt={beforeLabel}
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        />

        {/* Top Labels */}
        <span className="pointer-events-none absolute top-3 left-3 rounded-lg bg-[#242236]/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-lg bg-[#FFC7C7] px-2.5 py-1 text-xs font-bold text-[#242236] shadow-sm">
          {afterLabel}
        </span>

        {/* Processing Overlay Pulse */}
        {isProcessing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#242236] px-4 py-2 text-xs font-semibold text-white shadow-soft">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#FFC7C7] border-t-transparent animate-spin-smooth" />
              <span>{processingText}</span>
            </div>
          </div>
        )}

        {/* Interactive Split Divider */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={sliderAriaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={splitPercent}
          aria-valuetext={`${splitPercent}%`}
          onKeyDown={handleKeyDown}
          style={{ left: `${splitPercent}%` }}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center focus-visible:outline-none group"
        >
          <div className="h-full w-0.5 bg-[#242236] dark:bg-[#FFC7C7] shadow-[0_0_0_1px_rgba(255,255,255,0.7)]" />
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#242236] bg-[#FFC7C7] text-[#242236] shadow-md group-focus-visible:ring-4 group-focus-visible:ring-[#8785A2]/50 transition-transform group-hover:scale-105">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18-6-6 6-6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Live Original vs Compressed Metrics */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-3 tabular-nums">
          <span className="inline-flex items-center gap-1.5 text-inkmuted">
            <span className="font-medium">{originalSizeLabel}:</span>
            <strong className="text-ink">{formatBytes(originalSize)}</strong>
          </span>
          <span aria-hidden="true" className="text-slateink">→</span>
          <span className="inline-flex items-center gap-1.5 text-inkmuted">
            <span className="font-medium">{compressedSizeLabel}:</span>
            <strong className="text-ink">
              {compressedSize !== undefined ? formatBytes(compressedSize) : '—'}
            </strong>
          </span>
          {dimensionsText && (
            <span className="rounded-md border border-line bg-card px-2 py-0.5 text-xs font-medium text-inkmuted">
              {dimensionsText}
            </span>
          )}
          {displayMime && (
            <span className="rounded-md border border-line bg-card px-2 py-0.5 text-xs font-bold text-ink">
              {displayMime}
            </span>
          )}
        </div>

        <div>
          {compressedSize !== undefined && !isLarger && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC7C7] px-3 py-1 text-xs font-extrabold text-[#242236] tabular-nums">
              -{Math.max(0, savedPercent).toFixed(1)}% {savedLabel}
            </span>
          )}
          {isLarger && (
            <span className="inline-flex items-center rounded-full bg-subtle px-3 py-1 text-xs font-semibold text-ink">
              {largerWarning}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
