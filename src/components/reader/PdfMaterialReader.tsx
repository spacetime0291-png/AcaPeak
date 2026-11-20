import React, { useState } from 'react';
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { Material } from '../../types/material';
import { ThemeToggle } from '../common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../decorations/NatureDecorations';
import { ThreeZoneMaterialViewer } from '../content/ThreeZoneMaterialViewer';

interface PdfMaterialReaderProps {
  material: Material;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onBackToSubtest: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
}

export const PdfMaterialReader: React.FC<PdfMaterialReaderProps> = ({
  material,
  theme = 'light',
  onToggleTheme = () => {},
  onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
}) => {
  const { metadata } = material;
  const isDark = theme === 'dark';

  // Focus Mode toggle
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Flexible Font Size Scale: 0.85 to 1.4 (Default 1.0)
  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('skolace_reader_font_scale');
      return saved ? Math.min(1.4, Math.max(0.85, parseFloat(saved))) : 1.0;
    } catch {
      return 1.0;
    }
  });

  const handleFontScaleChange = (newScale: number) => {
    const clamped = Math.min(1.4, Math.max(0.85, Number(newScale.toFixed(2))));
    setFontScale(clamped);
    try {
      localStorage.setItem('skolace_reader_font_scale', clamped.toString());
    } catch {}
  };

  // Always ensure reading begins at the top of the document
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [metadata.id]);

  return (
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] pb-12">
      {/* 1. TOP STATIS/STICKY BAR: Navigasi cepat, Ukuran Teks Fleksibel & Theme Switcher */}
      <div className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-indigo-500/25 shadow-xs">
        {!isDark && <NatureFocusHeaderAccent />}

        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Tombol kembali ke silabus subtes */}
          <button
            type="button"
            onClick={onBackToSubtest}
            className="relative z-10 flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Daftar Bab {metadata.subtest}</span>
            <span className="sm:hidden">Silabus</span>
          </button>

          {/* Judul sub bab materi di sticky bar */}
          <div className="relative z-10 min-w-0 flex-1 text-center px-1">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate sm:line-clamp-1 leading-tight">
              {metadata.title}
            </p>
          </div>

          {/* Actions: Kontrol Ukuran Teks Fleksibel, Mode Fokus & Theme Toggle */}
          <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Pengatur Ukuran Font Fleksibel (A- / % / A+) */}
            <div className="flex items-center bg-stone-100 dark:bg-slate-800/90 rounded-xl p-0.5 border border-stone-200 dark:border-slate-700 shadow-2xs">
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale - 0.1)}
                disabled={fontScale <= 0.85}
                className="px-1.5 sm:px-2 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perkecil Ukuran Teks (A-)"
                aria-label="Perkecil Ukuran Teks"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(1.0)}
                className="px-1 sm:px-1.5 py-1 text-[11px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
                title="Reset Ukuran Normal (100%)"
                aria-label="Reset Ukuran Normal"
              >
                {Math.round(fontScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale + 0.1)}
                disabled={fontScale >= 1.4}
                className="px-1.5 sm:px-2 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perbesar Ukuran Teks (A+)"
                aria-label="Perbesar Ukuran Teks"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/70 hover:bg-indigo-100 dark:hover:bg-cyan-900/60 transition cursor-pointer border border-indigo-100 dark:border-cyan-800/40"
              title="Beralih Mode Fokus"
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Biasa</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Fokus</span>
                </>
              )}
            </button>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </div>

      {/* 2. THREE-ZONE STANDAR BLUEPRINT CONTAINER */}
      <div className={isFocusMode ? 'py-1 px-0.5 sm:px-2 w-full' : 'py-1 sm:py-3 px-1 sm:px-3 w-full'}>
        <ThreeZoneMaterialViewer
          material={material}
          theme={theme}
          fontScale={fontScale}
          onBackToSubtest={onBackToSubtest}
          onPrevSubchapter={onPrevSubchapter}
          onNextSubchapter={onNextSubchapter}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onStartDrillingThisTopic={onStartDrillingThisTopic}
        />
      </div>
    </div>
  );
};
