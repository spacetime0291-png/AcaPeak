import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  Zap,
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
  const kodeBab = metadata.id ? metadata.id.split('-').slice(0, 2).join('-').toLowerCase() : '';

  // Focus Mode toggle
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Real-time progress percentage (10% to 100%)
  const [progressPercentage, setProgressPercentage] = useState<number>(10);

  // Flexible Font Size Scale: 0.85 to 1.4 (Default 1.0)
  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('skolace_reader_font_scale') : null;
      return saved ? Math.min(1.4, Math.max(0.85, parseFloat(saved))) : 1.0;
    } catch {
      return 1.0;
    }
  });

  const handleFontScaleChange = (newScale: number) => {
    const clamped = Math.min(1.4, Math.max(0.85, Number(newScale.toFixed(2))));
    setFontScale(clamped);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('skolace_reader_font_scale', clamped.toString());
      }
    } catch {}
  };

  // Always ensure reading begins at the top of the document
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [metadata.id]);

  return (
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] bg-[#F8FAFC] dark:bg-[#070913] pb-12 transition-colors">
      {/* 1. TOP STATIS/STICKY BAR: Identitas Sub-Bab, Progress Real-Time, Ukuran Teks Fleksibel & Theme Switcher */}
      <header className="sticky top-0 z-50 w-full bg-[#F8FAFC]/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-2xs">
        {!isDark && <NatureFocusHeaderAccent />}

        <div className="max-w-[720px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Identitas Sub-bab & Tombol Kembali */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onBackToSubtest}
              className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              title="Kembali ke Silabus Subtes"
              aria-label="Kembali ke Silabus"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs font-semibold tracking-wide px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 text-white shrink-0 uppercase">
              {metadata.id}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate hidden xs:inline max-w-[140px] sm:max-w-[200px]">
              {metadata.title}
            </span>
          </div>

          {/* Indikator Progres Real-Time & Kontrol Fleksibel */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Tombol Pill Subtle Rangkuman Cepat Bab Ini */}
            {kodeBab && (
              <Link
                to={`/rangkuman/${kodeBab}#${metadata.id.toLowerCase()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition shrink-0 shadow-2xs hover:scale-105"
                title={`Buka Rangkuman & Rumus Cepat Bab ${kodeBab.toUpperCase()}`}
              >
                <Zap className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Rangkuman Bab</span>
                <span className="sm:hidden">Rangkuman</span>
              </Link>
            )}
            {/* Progress Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[32px] text-right">
                {progressPercentage}%
              </span>
              <div
                className="w-14 sm:w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
              >
                <div
                  className="h-full bg-[#3B82F6] transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Pengatur Ukuran Font Fleksibel (A- / % / A+) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale - 0.1)}
                disabled={fontScale <= 0.85}
                className="px-1.5 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perkecil Ukuran Teks (A-)"
                aria-label="Perkecil Ukuran Teks"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(1.0)}
                className="px-1 sm:px-1.5 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                title="Reset Ukuran Normal (100%)"
                aria-label="Reset Ukuran Normal"
              >
                {Math.round(fontScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale + 0.1)}
                disabled={fontScale >= 1.4}
                className="px-1.5 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perbesar Ukuran Teks (A+)"
                aria-label="Perbesar Ukuran Teks"
              >
                A+
              </button>
            </div>

            {/* Mode Fokus Toggle */}
            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Beralih Mode Fokus"
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Biasa</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fokus</span>
                </>
              )}
            </button>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </header>

      {/* 2. THREE-ZONE STANDAR BLUEPRINT CONTAINER */}
      <main className={isFocusMode ? 'py-4 w-full' : 'py-6 sm:py-8 w-full'}>
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
          onProgressChange={setProgressPercentage}
        />
      </main>
    </div>
  );
};
