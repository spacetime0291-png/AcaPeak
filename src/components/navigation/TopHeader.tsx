import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { ALL_UTBK_SUBCHAPTERS } from '../../lib/contentLoader';
import { SMA_SUBJECTS } from '../../lib/smaSyllabusData';

export type AppMode = 'utbk' | 'sma';

interface TopHeaderProps {
  mode: AppMode;
  onModeChange: (newMode: AppMode) => void;
  onSelectUtbkMaterial: (subtestCode: string, materialId: string) => void;
  onSelectSmaSubject: (subjectId: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  mode,
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
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-3.5">
        {/* Top Row: App Brand & Segmented Mode Pill Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
              Edu
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-none">
                  Portal Belajar
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Rp0 Gratis
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Pusat Kurikulum & Drilling Soal Nasional
              </p>
            </div>
          </div>

          {/* Segmented Toggle / Pill Switcher [ 🎯 UTBK-SNBT ] dan [ 🏫 Materi SMA ] */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => onModeChange('utbk')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                mode === 'utbk'
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Pilih Mode UTBK-SNBT"
            >
              <span>🎯</span>
              <span>UTBK-SNBT</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('sma')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                mode === 'sma'
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Pilih Mode Materi SMA"
            >
              <span>🏫</span>
              <span>Materi SMA</span>
            </button>
          </div>
        </div>

        {/* Minimalist Search Bar ("Cari sub-bab atau materi...") */}
        <div ref={searchContainerRef} className="relative mt-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Cari sub-bab atau materi..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-80 overflow-y-auto">
              {hasResults ? (
                <div className="p-2 space-y-1">
                  {filteredUtbk.length > 0 && (
                    <div>
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center justify-between group transition cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                                {item.subtestCode} {item.subchapter_num}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900 truncate">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              Bab {item.chapterNum}: {item.chapterTitle}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredSma.length > 0 && (
                    <div className="pt-1 border-t border-slate-100">
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 flex items-center justify-between group transition cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {item.subjectName}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
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
