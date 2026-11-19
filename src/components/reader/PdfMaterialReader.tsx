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

  // Always ensure reading begins at the top of the document
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [metadata.id]);

  return (
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] pb-12">
      {/* 1. TOP STATIS/STICKY BAR: Navigasi cepat & Theme Switcher */}
      <div className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-indigo-500/25 shadow-xs">
        {!isDark && <NatureFocusHeaderAccent />}

        <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
          {/* Tombol kembali ke silabus subtes */}
          <button
            type="button"
            onClick={onBackToSubtest}
            className="relative z-10 flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
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

          {/* Actions: Mode Fokus & Theme Toggle */}
          <div className="relative z-10 flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/70 hover:bg-indigo-100 dark:hover:bg-cyan-900/60 transition cursor-pointer border border-indigo-100 dark:border-cyan-800/40"
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
      <div className={isFocusMode ? 'py-2 px-1 sm:px-2' : 'py-4 sm:py-6 px-2 sm:px-4'}>
        <ThreeZoneMaterialViewer
          material={material}
          theme={theme}
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
