import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { ALL_UTBK_SUBCHAPTERS } from '../../lib/contentLoader';
import { SMA_SUBJECTS } from '../../lib/smaSyllabusData';
import { ThemeToggle } from '../common/ThemeToggle';

export type AppMode = 'utbk' | 'sma';

interface TopHeaderProps {
  mode: AppMode;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onModeChange: (newMode: AppMode) => void;
  onSelectUtbkMaterial: (subtestCode: string, materialId: string) => void;
  onSelectSmaSubject: (subjectId: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  mode,
  theme = 'light',
  onToggleTheme = () => {},
  onModeChange,
  onSelectUtbkMaterial,
  onSelectSmaSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  const filteredSma = searchQuery.trim().length > 1
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

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-xs transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-3 sm:py-4">
        {/* Top Row: App Brand, Segmented Mode Switcher, & Theme Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/20">
                Edu
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight leading-none">
                    Portal Belajar
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border dark:border-emerald-700/50 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Rp0 Gratis
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                  Pusat Kurikulum & Drilling Soal Nasional
                </p>
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="sm:hidden">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Segmented Toggle / Pill Switcher [ 🎯 UTBK-SNBT ] dan [ 🏫 Materi SMA ] */}
            <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onModeChange('utbk')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  mode === 'utbk'
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-white shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Pilih Mode UTBK-SNBT"
              >
                <span>🎯</span>
                <span>UTBK-SNBT</span>
              </button>
              <button
                type="button"
                onClick={() => onModeChange('sma')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  mode === 'sma'
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-white shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Pilih Mode Materi SMA"
              >
                <span>🏫</span>
                <span>Materi SMA</span>
              </button>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>

        {/* Minimalist Search Bar ("Cari sub-bab atau materi...") */}
        <div ref={searchContainerRef} className="relative mt-3.5">
          <div className="relative flex items-center">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Cari sub-bab, bab, atau materi..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 pl-11 pr-10 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 outline-none transition-all shadow-2xs"
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
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden z-50 animate-subtopic-slide max-h-80 overflow-y-auto">
              {hasResults ? (
                <div className="p-2.5 space-y-1">
                  {filteredUtbk.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Topik UTBK-SNBT
                      </div>
                      {filteredUtbk.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectUtbkMaterial(item.subtestCode.toLowerCase(), item.id);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-blue-50/70 dark:hover:bg-slate-800/80 flex items-center justify-between group transition cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-start gap-2">
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 shrink-0 mt-0.5">
                                {item.subtestCode}
                              </span>
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 break-words flex-1">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-400 truncate mt-0.5">
                              Bab {item.chapterNum}: {item.chapterTitle}
                            </p>
                          </div>
                          <ChevronRight className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredSma.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Topik SMA
                      </div>
                      {filteredSma.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectSmaSubject(item.subjectId);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-slate-800/80 flex items-center justify-between group transition cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                {item.subjectName}
                              </span>
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 text-center text-sm text-slate-500 dark:text-slate-400">
                  Tidak ditemukan materi dengan kata kunci "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
