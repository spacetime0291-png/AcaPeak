import React from 'react';

export interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-article';
  className?: string;
}

/**
 * AdSlot: Google AdSense wrapper component with a fixed min-height to eliminate CLS (Cumulative Layout Shift).
 * Displays a clean, unobtrusive container ready for Google AdSense <ins class="adsbygoogle" ...> integration.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'default-ad-slot',
  format = 'in-article',
  className = '',
}) => {
  const minHeightClass =
    format === 'rectangle'
      ? 'min-h-[250px]'
      : format === 'horizontal'
      ? 'min-h-[100px]'
      : 'min-h-[120px] sm:min-h-[140px]';

  return (
    <div
      className={`w-full max-w-full my-6 flex flex-col items-center justify-center ${className}`}
      data-ad-slot-id={slotId}
    >
      <div
        className={`w-full ${minHeightClass} rounded-2xl border border-dashed border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-900/40 flex flex-col items-center justify-center p-4 transition-colors`}
      >
        <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 dark:text-slate-500 mb-1 select-none">
          Iklan Sponsor
        </span>
        {/* Placeholder comment for Google AdSense unit */}
        {/* <ins className="adsbygoogle" style={{ display: 'block', textAlign: 'center' }} data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot={slotId} /> */}
        <div className="text-xs text-stone-400/80 dark:text-slate-600 font-mono select-none">
          [Ruang Iklan Terverifikasi]
        </div>
      </div>
    </div>
  );
};
