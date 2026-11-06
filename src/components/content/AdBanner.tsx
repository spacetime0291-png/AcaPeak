import React, { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slotId?: string;
  className?: string;
  /**
   * contextKey can be material ID or example ID. Changing this triggers an attempted ad refresh.
   */
  contextKey?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = 'banner-top-responsive',
  className = '',
  contextKey = 'default',
}) => {
  const [adInstanceId, setAdInstanceId] = useState<number>(Date.now());
  const lastRefreshTimeRef = useRef<number>(Date.now());
  const COOLDOWN_MS = 30000; // 30 detik cooldown anti layout-thrashing

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;

    // Cooldown check: hanya perbarui jika sudah lebih dari 30 detik sejak refresh terakhir
    if (timeSinceLastRefresh >= COOLDOWN_MS) {
      lastRefreshTimeRef.current = now;
      setAdInstanceId(now);
    }
  }, [contextKey]);

  return (
    <div
      aria-label="Informasi Iklan & Dukungan"
      data-ad-slot={slotId}
      className={`min-h-[100px] sm:min-h-[120px] w-full overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-3 flex flex-col justify-center items-center relative transition-all ${className}`}
    >
      <div className="absolute top-1.5 right-2 text-[10px] uppercase font-mono tracking-wider text-slate-400">
        Sponsor Pendidikan • Bebas Biaya (Rp0)
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 max-w-md">
        <p className="font-semibold text-slate-700 mb-0.5">
          🎯 Persiapan UTBK-SNBT Mandiri & Gratis
        </p>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Platform edukasi bebas akses untuk seluruh pelajar Indonesia. Didukung serverless & arsitektur hemat sumber daya.
        </p>
      </div>

      {/* Placeholder identifier for AdSense / Carbon / Custom Ad Network script injection */}
      <div
        id={`ad-container-${slotId}-${adInstanceId}`}
        className="w-full flex justify-center items-center empty:hidden"
      />
    </div>
  );
};
