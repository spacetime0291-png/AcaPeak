import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  Zap,
} from 'lucide-react';
import type { Material } from '../../types/material';
import type { ThemeId } from '../../lib/theme';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  NatureFocusHeaderAccent,
  VelvetFocusHeaderAccent,
  PrismFocusHeaderAccent,
} from '../decorations/LazyDecorations';
import { ThreeZoneMaterialViewer } from '../content/ThreeZoneMaterialViewer';

interface PdfMaterialReaderProps {
  material: Material;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onBackToSubtest?: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  prevHref?: string;
  nextHref?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
}

export const PdfMaterialReader: React.FC<PdfMaterialReaderProps> = ({
  material,
  theme = 'light',
  onSelectTheme = () => {},
  onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  prevHref,
  nextHref,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
}) => {
  const { metadata } = material;
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';
  const isCosmic = theme === 'dark';
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

  const containerClass = isVelvet
    ? 'text-[#FBF1F2] bg-transparent'
    : isCosmic
    ? 'text-[#f8fafc] bg-[#070913]'
    : isPrism
    ? 'text-[#0F172A] bg-transparent'
    : 'text-slate-800 bg-[#F8FAFC]';

  const headerClass = isVelvet
    ? 'bg-[#1B0F1D]/92 border-[#EB8A78]/15'
    : isCosmic
    ? 'bg-[#0c1224]/95 border-slate-800/80'
    : isPrism
    ? 'bg-white/75 border-white/85'
    : 'bg-[#F8FAFC]/95 border-slate-200/80';

  const controlPillClass = isVelvet
    ? 'bg-[#2B1723] border-[#EB8A78]/20 text-[#FBF1F2]'
    : isPrism
    ? 'bg-white/85 border-sky-200/80 text-slate-700'
    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';

  return (
    <div className={`min-h-screen pb-12 transition-colors ${containerClass}`}>
      {/* 1. TOP STATIS/STICKY BAR: Identitas Sub-Bab, Progress Real-Time, Ukuran Teks Fleksibel & Theme Switcher */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all shadow-2xs ${headerClass}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {theme === 'light' && <NatureFocusHeaderAccent />}
          {isVelvet && <VelvetFocusHeaderAccent />}
          {isPrism && <PrismFocusHeaderAccent />}
        </div>

        <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Identitas Sub-bab & Tombol Kembali */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <Link
              to={`/utbk/${metadata.subtest.toLowerCase()}`}
              onClick={() => onBackToSubtest?.()}
              className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              title="Kembali ke Silabus Subtes"
              aria-label="Kembali ke Silabus"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            <span
              className={`font-mono text-[11px] sm:text-xs font-semibold tracking-wide px-1.5 sm:px-2.5 py-1 rounded-md shrink-0 uppercase ${
                isVelvet
                  ? 'bg-[#3A1F31] text-[#FFBE98] border border-[#EB8A78]/35'
                  : isPrism
                  ? 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white'
                  : 'bg-slate-800 dark:bg-slate-700 text-white'
              }`}
            >
              {metadata.id}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate hidden sm:inline max-w-[180px] md:max-w-[220px]">
              {metadata.title}
            </span>
          </div>

          {/* Indikator Progres Real-Time & Kontrol Fleksibel */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Tombol Pill Subtle Rangkuman Cepat Bab Ini */}
            {kodeBab && (
              <Link
                to={`/rangkuman/${kodeBab}#${metadata.id.toLowerCase()}`}
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold border transition shrink-0 shadow-2xs ${
                  isVelvet
                    ? 'text-[#F5B041] bg-[#482E1A]/80 hover:bg-[#5A3920] border-[#F5B041]/40'
                    : 'text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30'
                }`}
                title={`Buka Rangkuman & Rumus Cepat Bab ${kodeBab.toUpperCase()}`}
              >
                <Zap className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Rangkuman Bab</span>
                <span className="sm:hidden">Rangkuman</span>
              </Link>
            )}
            {/* Progress Bar */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[26px] sm:min-w-[32px] text-right">
                {progressPercentage}%
              </span>
              <div
                className={`hidden sm:block w-16 sm:w-20 h-2 rounded-full overflow-hidden ${
                  isVelvet ? 'bg-[#3A1F31]' : 'bg-slate-200 dark:bg-slate-700'
                }`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
              >
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full ${
                    isVelvet
                      ? 'bg-[#FF8A6B]'
                      : isPrism
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500'
                      : 'bg-[#3B82F6]'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Pengatur Ukuran Font Fleksibel (A- / % / A+) */}
            <div className={`flex items-center rounded-xl p-0.5 border shadow-2xs ${controlPillClass}`}>
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale - 0.1)}
                disabled={fontScale <= 0.85}
                className="px-1 sm:px-1.5 py-1 text-[11px] sm:text-xs font-black hover:bg-white/60 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perkecil Ukuran Teks (A-)"
                aria-label="Perkecil Ukuran Teks"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(1.0)}
                className={`px-1 sm:px-1.5 py-1 text-[10px] sm:text-[11px] font-bold hover:underline cursor-pointer ${
                  isVelvet ? 'text-[#FF8A6B]' : 'text-blue-600 dark:text-blue-400'
                }`}
                title="Reset Ukuran Normal (100%)"
                aria-label="Reset Ukuran Normal"
              >
                {Math.round(fontScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale + 0.1)}
                disabled={fontScale >= 1.4}
                className="px-1 sm:px-1.5 py-1 text-[11px] sm:text-xs font-black hover:bg-white/60 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
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
              className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${controlPillClass}`}
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

            <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
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
          prevHref={prevHref}
          nextHref={nextHref}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onStartDrillingThisTopic={onStartDrillingThisTopic}
          onProgressChange={setProgressPercentage}
        />
      </main>
    </div>
  );
};
