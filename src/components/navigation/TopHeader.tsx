import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ChevronRight, Zap } from 'lucide-react';
import { ALL_UTBK_SUBCHAPTERS } from '../../lib/contentLoader';
import { SMA_SUBJECTS } from '../../lib/smaSyllabusData';
import { ENABLE_SMA_MODE } from '../../lib/featureFlags';
import type { ThemeId } from '../../lib/theme';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  NatureHeaderBanner,
  VelvetHeaderBanner,
  PrismHeaderBanner,
} from '../decorations/LazyDecorations';

export type AppMode = 'utbk' | 'sma';

interface TopHeaderProps {
  mode: AppMode;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onModeChange?: (newMode: AppMode) => void;
  onSelectUtbkMaterial?: (subtestCode: string, materialId: string) => void;
  onSelectSmaSubject?: (subjectId: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  mode,
  theme = 'light',
  onSelectTheme = () => {},
  onModeChange,
  onSelectUtbkMaterial,
  onSelectSmaSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter UTBK subchapters and SMA topics
  const filteredUtbk = searchQuery.trim().length > 1
    ? ALL_UTBK_SUBCHAPTERS.filter(
        (sub) =>
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.subtestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.subtestCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.id.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const filteredSma = (ENABLE_SMA_MODE && searchQuery.trim().length > 1)
    ? SMA_SUBJECTS.flatMap((subj) =>
        subj.chapters.flatMap((ch) =>
          ch.topics
            .filter((t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              subj.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((t) => ({ ...t, subjectName: subj.name, subjectId: subj.id }))
        )
      ).slice(0, 4)
    : [];

  const hasResults = filteredUtbk.length > 0 || filteredSma.length > 0;

  const headerBgClass = isVelvet
    ? 'bg-[#1B0F1D]/88 border-b border-[#EB8A78]/20'
    : isCosmic
    ? 'bg-[#070913]/90 border-b border-cyan-500/15'
    : isPrism
    ? 'bg-white/60 border-b border-white/80'
    : 'bg-[#fdfbf7]/90 border-b border-stone-200/80';

  const logoClass = isVelvet
    ? 'bg-[#3A1F31] text-[#FBF1F2] border border-[#EB8A78]/35 shadow-[0_4px_14px_rgba(255,138,107,0.18)]'
    : isPrism
    ? 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white border border-sky-300/50 shadow-md shadow-sky-500/25'
    : 'bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-500 text-white border border-purple-400/30 shadow-md shadow-indigo-500/25';

  const brandTextClass = isVelvet
    ? 'text-[#FBF1F2]'
    : isCosmic
    ? 'text-slate-50'
    : 'text-slate-900';

  const subtitleClass = isVelvet
    ? 'text-[#C9A9B0]'
    : isPrism
    ? 'text-slate-600'
    : 'text-slate-500 dark:text-slate-400';

  const modeTrayClass = isVelvet
    ? 'bg-[#24121D]/90 border-[#EB8A78]/25'
    : isPrism
    ? 'bg-white/60 backdrop-blur-md border-white/85'
    : 'bg-stone-100/90 dark:bg-slate-900/90 border-stone-200/90 dark:border-slate-800';

  const cheatSheetBtnClass = isVelvet
    ? 'text-[#F5B041] bg-[#482E1A]/80 hover:bg-[#5A3920]/90 border border-[#F5B041]/45'
    : isPrism
    ? 'text-amber-800 bg-amber-100/75 hover:bg-amber-100/95 border border-amber-300/85'
    : 'text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30';

  return (
    <header className={`relative w-full ${headerBgClass} z-40 backdrop-blur-md shadow-xs transition-all duration-300`}>
      {/* Theme-specific Decorative Header Banner */}
      {theme === 'light' && <NatureHeaderBanner />}
      {isVelvet && <VelvetHeaderBanner />}
      {isPrism && <PrismHeaderBanner />}

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-5 py-3 sm:py-4">
        {/* Top Row: App Brand, Segmented Mode Switcher, & Theme Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo SkolAce Squircle */}
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight group-hover:scale-105 transition-transform ${logoClass}`}>
                SA
              </div>
              <div>
                <h1 className={`font-bold text-base sm:text-lg tracking-tight leading-none ${brandTextClass}`}>
                  SkolAce
                </h1>
                <p className={`text-xs font-medium mt-0.5 ${subtitleClass}`}>
                  Pusat Kurikulum &amp; Drilling Soal Nasional
                </p>
              </div>
            </Link>

            {/* Mobile Theme Toggle */}
            <div className="sm:hidden">
              <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Segmented Toggle / Pill Switcher [ 🎯 UTBK-SNBT ] dan [ 🏫 Materi SMA ] */}
            <div className={`flex items-center p-1.5 rounded-2xl border shadow-2xs w-full sm:w-auto ${modeTrayClass}`}>
              {/* Tab UTBK-SNBT */}
              <Link
                to="/"
                onClick={() => onModeChange?.('utbk')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative overflow-hidden select-none ${
                  mode === 'utbk'
                    ? isVelvet
                      ? 'bg-[#3A1B27]/90 text-[#FFD0C2] border border-[#FF8A6B]/70 shadow-[0_0_14px_rgba(255,138,107,0.22)]'
                      : isCosmic
                      ? 'bg-[#0e162f] text-cyan-200 border border-cyan-400 shadow-[0_0_16px_rgba(0,242,254,0.4)]'
                      : isPrism
                      ? 'bg-sky-100/85 text-sky-900 border border-sky-300/90 shadow-xs'
                      : 'bg-[#ffe4e6] text-rose-900 border border-rose-300 shadow-xs'
                    : isVelvet
                    ? 'text-[#C9A9B0] hover:text-[#FBF1F2]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Pilih Mode UTBK-SNBT"
              >
                {theme === 'light' && mode === 'utbk' && (
                  <span className="absolute top-0 right-0 w-3 h-3 text-rose-400/70 pointer-events-none">
                    🍃
                  </span>
                )}
                <span>🎯</span>
                <span>UTBK-SNBT</span>
              </Link>

              {/* Tab Materi SMA (Hidden when ENABLE_SMA_MODE is false) */}
              {ENABLE_SMA_MODE && (
                <Link
                  to="/sma"
                  onClick={() => onModeChange?.('sma')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative overflow-hidden select-none ${
                    mode === 'sma'
                      ? isVelvet
                        ? 'bg-[#482E1A]/90 text-[#F5B041] border border-[#F5B041]/60 shadow-xs'
                        : isCosmic
                        ? 'bg-[#1e170d] text-amber-200 border border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.4)]'
                        : isPrism
                        ? 'bg-amber-100/85 text-amber-900 border border-amber-300 shadow-xs'
                        : 'bg-[#ffedd5] text-amber-900 border border-amber-300 shadow-xs'
                      : isVelvet
                      ? 'text-[#C9A9B0] hover:text-[#FBF1F2]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label="Pilih Mode Materi SMA"
                >
                  {theme === 'light' && mode === 'sma' && (
                    <span className="absolute top-0 right-0 w-3 h-3 text-amber-500/70 pointer-events-none">
                      🌿
                    </span>
                  )}
                  <span>🏫</span>
                  <span>Materi SMA</span>
                </Link>
              )}
            </div>

            {/* Cheat Sheet Rangkuman Link */}
            <Link
              to="/rangkuman"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-2xs shrink-0 ${cheatSheetBtnClass}`}
              title="Buka Lembar Rangkuman / Cheat Sheet per Bab"
            >
              <Zap className={`w-3.5 h-3.5 ${isVelvet ? 'fill-[#F5B041] text-[#F5B041]' : 'fill-amber-500 text-amber-500'}`} />
              <span className="hidden md:inline">Cheat Sheet Bab</span>
              <span className="md:hidden">Cheat Sheet</span>
            </Link>

            {/* Desktop Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} />
            </div>
          </div>
        </div>

        {/* Minimalist Search Bar ("Cari sub-bab atau materi...") */}
        <div ref={searchContainerRef} className="relative mt-3.5">
          <div className="relative flex items-center">
            <Search
              className={`w-4.5 h-4.5 absolute left-3.5 pointer-events-none transition-colors ${
                isVelvet
                  ? 'text-[#C9A9B0]'
                  : isCosmic
                  ? 'text-cyan-400'
                  : isPrism
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Cari sub-bab, bab, atau materi..."
              className={`w-full text-sm pl-11 pr-10 py-3 rounded-2xl outline-none transition-all shadow-sm ${
                isVelvet
                  ? 'velvet-input placeholder-[#C9A9B0]/70'
                  : isCosmic
                  ? 'cyber-grid-input text-slate-100 placeholder-slate-400 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.3)] focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/40'
                  : isPrism
                  ? 'bg-white/80 backdrop-blur-md text-slate-900 placeholder-slate-400 border border-white/90 focus:border-sky-400 focus:ring-2 focus:ring-sky-200/70'
                  : 'bg-white text-slate-800 placeholder-slate-400 border border-slate-200/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 1 && (
            <div
              className={`absolute left-0 right-0 top-full mt-2 rounded-2xl shadow-2xl overflow-hidden z-50 animate-subtopic-slide max-h-80 overflow-y-auto ${
                isVelvet
                  ? 'bg-[#25131F]/95 border border-[#EB8A78]/35 backdrop-blur-md text-[#FBF1F2]'
                  : isCosmic
                  ? 'bg-[#0c1224]/95 border border-cyan-500/30 backdrop-blur-md text-slate-100'
                  : isPrism
                  ? 'bg-white/95 border border-white backdrop-blur-md text-slate-900'
                  : 'bg-white border border-slate-200/90 text-slate-800'
              }`}
            >
              {hasResults ? (
                <div className="p-2.5 space-y-1">
                  {filteredUtbk.length > 0 && (
                    <div>
                      <div className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                        isVelvet ? 'text-[#FF8A6B]' : 'text-slate-400 dark:text-cyan-400/80'
                      }`}>
                        Topik UTBK-SNBT
                      </div>
                      {filteredUtbk.map((item) => (
                        <Link
                          key={item.id}
                          to={`/utbk/${item.subtestCode.toLowerCase()}/${item.id.toLowerCase()}`}
                          onClick={() => {
                            onSelectUtbkMaterial?.(item.subtestCode.toLowerCase(), item.id);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between group transition cursor-pointer ${
                            isVelvet
                              ? 'hover:bg-[#3A1D2E]/80 border border-transparent hover:border-[#EB8A78]/35'
                              : isCosmic
                              ? 'hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30'
                              : 'hover:bg-blue-50/70'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-start gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 mt-0.5 ${
                                  isVelvet
                                    ? 'bg-[#4A222B] text-[#FFBE98] border border-[#EB8A78]/40'
                                    : isCosmic
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {item.subtestCode}
                              </span>
                              <span className={`text-sm font-semibold break-words flex-1 ${
                                isVelvet
                                  ? 'text-[#FBF1F2] group-hover:text-[#FF8A6B]'
                                  : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-300'
                              }`}>
                                {item.title}
                              </span>
                            </div>
                            <p className={`text-xs truncate mt-0.5 ${isVelvet ? 'text-[#C9A9B0]' : 'text-slate-400'}`}>
                              Bab {item.chapterNum}: {item.chapterTitle}
                            </p>
                          </div>
                          <ChevronRight className={`w-4.5 h-4.5 shrink-0 ${
                            isVelvet
                              ? 'text-[#C9A9B0] group-hover:text-[#FF8A6B]'
                              : 'text-slate-300 dark:text-cyan-600 group-hover:text-blue-600 dark:group-hover:text-cyan-300'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  )}

                  {filteredSma.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-amber-400/80">
                        Topik SMA
                      </div>
                      {filteredSma.map((item) => (
                        <Link
                          key={item.id}
                          to={`/sma/${item.subjectId}`}
                          onClick={() => {
                            onSelectSmaSubject?.(item.subjectId);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between group transition cursor-pointer ${
                            isVelvet
                              ? 'hover:bg-[#3A1D2E]/80 border border-transparent hover:border-[#F5B041]/35'
                              : isCosmic
                              ? 'hover:bg-amber-950/40 border border-transparent hover:border-amber-500/30'
                              : 'hover:bg-emerald-50/70'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold ${
                                  isVelvet
                                    ? 'bg-[#482E1A] text-[#F5B041] border border-[#F5B041]/40'
                                    : isCosmic
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {item.subjectName}
                              </span>
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300 truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 group-hover:text-amber-600 dark:group-hover:text-amber-300 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 text-center text-sm text-slate-500 dark:text-slate-400">
                  Tidak ditemukan materi dengan kata kunci &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
