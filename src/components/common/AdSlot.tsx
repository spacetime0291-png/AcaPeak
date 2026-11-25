import React, { useEffect, useState } from 'react';

export interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-article';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __skolaceAdSenseLoaded?: boolean;
  }
}

const ADSENSE_CLIENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID) || '';

const isConfiguredClient = (client: string): boolean =>
  Boolean(client && client.startsWith('ca-pub-') && !client.includes('XXXX') && !client.includes('000000'));

let adsenseScriptPromise: Promise<void> | null = null;

function loadAdSenseScriptOnce(clientId: string): Promise<void> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve();
  }
  if (window.__skolaceAdSenseLoaded) {
    return Promise.resolve();
  }
  if (adsenseScriptPromise) {
    return adsenseScriptPromise;
  }

  adsenseScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );
    if (existing) {
      window.__skolaceAdSenseLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
      clientId
    )}`;
    script.onload = () => {
      window.__skolaceAdSenseLoaded = true;
      resolve();
    };
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return adsenseScriptPromise;
}

/**
 * AdSlot: Google AdSense wrapper with strict CLS=0 height reservation,
 * transparent "Iklan" / "Advertisement" label, and idle/post-hydration script deferral.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'default-ad-slot',
  format = 'in-article',
  className = '',
}) => {
  const [isAdInitialized, setIsAdInitialized] = useState(false);

  const minHeightClass =
    format === 'horizontal'
      ? 'min-h-[100px]'
      : 'min-h-[250px]';

  // Defer AdSense initialization until main-thread hydration is idle,
  // 1500ms timeout elapses, or the user first interacts with the page.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const activate = () => {
      if (cancelled) return;
      cleanup();
      setIsAdInitialized(true);

      if (isConfiguredClient(ADSENSE_CLIENT_ID)) {
        loadAdSenseScriptOnce(ADSENSE_CLIENT_ID).then(() => {
          if (cancelled) return;
          try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
          } catch {
            // Ignore duplicate or blocked ad push errors
          }
        });
      }
    };

    const cleanup = () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      window.removeEventListener('scroll', activate);
    };

    window.addEventListener('pointerdown', activate, { once: true, passive: true });
    window.addEventListener('keydown', activate, { once: true, passive: true });
    window.addEventListener('scroll', activate, { once: true, passive: true });

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => activate(), { timeout: 1500 });
    } else {
      timeoutId = setTimeout(activate, 1500);
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [slotId]);

  const hasLiveClient = isConfiguredClient(ADSENSE_CLIENT_ID);

  return (
    <aside
      aria-label="Iklan"
      className={`w-full max-w-full my-6 flex flex-col items-center justify-center ${className}`}
      data-ad-slot-id={slotId}
      data-ad-ready={isAdInitialized ? 'true' : 'false'}
    >
      <div
        className={`w-full ${minHeightClass} rounded-2xl border border-dashed border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-900/40 flex flex-col items-center justify-center p-4 transition-colors overflow-hidden`}
      >
        <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500 dark:text-slate-400 mb-1.5 select-none">
          Iklan • Advertisement
        </span>

        {hasLiveClient && isAdInitialized ? (
          <ins
            className="adsbygoogle block w-full text-center"
            style={{ display: 'block', minHeight: format === 'horizontal' ? '90px' : '220px' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format={format === 'in-article' ? 'fluid' : 'auto'}
            data-ad-layout={format === 'in-article' ? 'in-article' : undefined}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-xs text-stone-400/80 dark:text-slate-500 font-mono select-none">
            [Ruang Iklan • CLS Reserved]
          </div>
        )}
      </div>
    </aside>
  );
};
