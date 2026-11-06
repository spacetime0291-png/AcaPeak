import React, { useEffect, useRef } from 'react';

export interface AdBannerProps {
  slotId?: string;
  className?: string;
  routeKey?: string;
  contextKey?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = 'banner-top-responsive',
  className = '',
  routeKey,
  contextKey,
}) => {
  const effectiveKey = routeKey || contextKey || 'default';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fired on each mount / remount when effectiveKey changes
    const timestamp = Date.now();

    // If Google AdSense or another ad script is loaded, trigger push
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // Ignore ad-blocker or script errors gracefully
    }

    // Custom impression event logger for ad analytics
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('ad_impression_logged', {
          detail: { slotId, routeKey: effectiveKey, timestamp },
        })
      );
    }
  }, [effectiveKey, slotId]);

  return (
    <div
      aria-label="Sponsor Pendidikan"
      data-ad-slot={slotId}
      data-route-key={effectiveKey}
      className={`min-h-[100px] sm:min-h-[110px] w-full overflow-hidden rounded-xl border border-dashed border-slate-200/90 bg-slate-50/70 p-3 sm:p-4 flex flex-col justify-center items-center relative transition-all duration-200 shadow-2xs ${className}`}
    >
      <div className="absolute top-1.5 right-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 select-none">
        Sponsor Pendidikan • Akses Rp0
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 max-w-lg">
        <p className="font-semibold text-slate-700 mb-0.5 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Belajar Mandiri UTBK-SNBT & Materi SMA Gratis
        </p>
        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
          Platform edukasi bebas biaya tanpa paywall. Didukung infrastruktur edge berkecepatan tinggi.
        </p>
      </div>

      {/* Target container for script injection (AdSense / MediaNet / Custom) */}
      <div
        ref={containerRef}
        id={`ad-target-${slotId}`}
        className="w-full flex justify-center items-center empty:hidden mt-1"
      />
    </div>
  );
};
