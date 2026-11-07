import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Play,
  BookOpen,
  Zap,
  Minus,
  Plus,
  Clock,
} from 'lucide-react';
import type { SubtestItem } from '../../types/material';
import { ModuleIcon } from './ModuleIcon';
import { ThemeToggle } from '../common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../decorations/NatureDecorations';

interface SubtestDetailViewProps {
  subtest: SubtestItem;
  activeTab: 'materi' | 'drilling';
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onTabChange: (tab: 'materi' | 'drilling') => void;
  onBackToHome: () => void;
  onSelectSubtest?: (subtestCode: string) => void;
  onSelectMaterial: (materialId: string) => void;
  onStartDrilling: (
    selectedSubchapterIds: string[],
    questionCount: number,
    timerMinutes: number | null
  ) => void;
}

export const SubtestDetailView: React.FC<SubtestDetailViewProps> = ({
  subtest,
  activeTab,
  theme = 'light',
  onToggleTheme = () => {},
  onTabChange,
  onBackToHome,
  onSelectMaterial,
  onStartDrilling,
}) => {
  const isDark = theme === 'dark';

  // Accordion state: Set of open module IDs (first module open by default)
  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    const firstMod = subtest.modules?.[0]?.id;
    return new Set(firstMod ? [firstMod] : []);
  });

  // Reset or keep first module open when subtest changes
  useEffect(() => {
    const firstMod = subtest.modules?.[0]?.id;
    setOpenModules(new Set(firstMod ? [firstMod] : []));
  }, [subtest.code]);

  // Multi-select state strictly for the dedicated Drilling tab
  const [selectedSubchapters, setSelectedSubchapters] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(15);

  // Toggle single module accordion
  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Drilling selection helpers
  const toggleSubchapterSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedSubchapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllSubtest = () => {
    const allIds = (subtest.modules || []).flatMap((m) => m.subtopics.map((s) => s.id));
    setSelectedSubchapters(new Set(allIds));
  };

  const clearAllSubtest = () => {
    setSelectedSubchapters(new Set());
  };

  // Total subtopics count
  const totalSubtopics = (subtest.modules || []).reduce((acc, m) => acc + m.subtopics.length, 0);

  // Squircle background color per subtest in Light Mode
  const squircleBg = (() => {
    switch (subtest.code.toUpperCase()) {
      case 'PU':
        return 'bg-purple-100 text-purple-900';
      case 'PPU':
        return 'bg-amber-100 text-amber-900';
      case 'PBM':
        return 'bg-rose-100 text-rose-900';
      case 'PK':
        return 'bg-sky-100 text-sky-900';
      case 'LBI':
        return 'bg-rose-100 text-rose-900';
      case 'LBE':
        return 'bg-purple-100 text-purple-900';
      case 'PM':
        return 'bg-emerald-100 text-emerald-900';
      default:
        return 'bg-sky-100 text-sky-900';
    }
  })();

  return (
    <div className="w-full pb-28">
      {/* 1. STICKY TOP APP BAR (Native App Feel, Distraction-Free Header) */}
      <div className="sticky top-0 z-40 w-full shadow-xs">
        {/* Baris 1: Top Navigation Bar */}
        <div className="relative overflow-hidden bg-white/95 dark:bg-[#070913]/95 border-b border-stone-200/90 dark:border-indigo-500/25 w-full shadow-sm transition-all duration-300 backdrop-blur-md">
          {/* Light Mode Subtle Watermark Foliage Accent (opacity 0.18 - 0.25) */}
          {!isDark && <NatureFocusHeaderAccent />}

          <div className="relative z-10 max-w-4xl mx-auto px-3.5 sm:px-5 h-16 sm:h-18 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-3.5 min-w-0">
              <button
                type="button"
                onClick={onBackToHome}
                className="p-2 -ml-1 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800/80 active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Kembali ke Beranda"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="font-bold text-base sm:text-xl text-slate-900 dark:text-slate-50 truncate tracking-tight">
                {subtest.title || subtest.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Subtest Information Badge */}
              {totalSubtopics > 0 && (
                <div className="flex items-center gap-1.5 bg-stone-100/90 dark:bg-[#121930] border border-stone-200 dark:border-indigo-500/30 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs">
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{subtest.modules?.length || 0} Bab</span>
                  <span className="text-slate-400 dark:text-slate-400 text-xs">• {totalSubtopics} Sub-bab</span>
                </div>
              )}
              <ThemeToggle
                theme={theme}
                onToggle={onToggleTheme}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Baris 2: Sticky Segmented Tab (Materi vs Drilling Soal) */}
        <div className="bg-[#fcfbf9]/95 dark:bg-[#090d1d]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-slate-800/80 w-full px-3.5 sm:px-5 py-2.5 transition-colors">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center bg-stone-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 w-full sm:w-auto shadow-2xs">
              <button
                type="button"
                onClick={() => onTabChange('materi')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'materi'
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.5)]'
                      : 'bg-white text-blue-700 shadow-xs border border-stone-200/80'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>📖 Materi</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('drilling')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'drilling'
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.5)]'
                      : 'bg-white text-blue-700 shadow-xs border border-stone-200/80'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>⚡ Drilling Soal</span>
              </button>
            </div>

            {activeTab === 'drilling' && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 border border-blue-200 dark:border-cyan-500/40 cursor-pointer transition shadow-2xs"
                >
                  Pilih Semua
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area: Distraction-free (clean content area) */}
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-3 sm:py-5">
        {/* ========================================================
            TAB 1: MATERI (Accordion Bab & Sub-bab Minim Hiasan)
            ======================================================== */}
        {activeTab === 'materi' && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-sm border border-stone-200/90 dark:border-[rgba(99,102,241,0.25)] divide-y divide-stone-100 dark:divide-slate-800/80 overflow-hidden transition-all duration-300">
            {(subtest.modules || []).map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);

              return (
                <div key={mod.id} className="transition-colors">
                  {/* Module Header Row */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3.5 hover:bg-stone-50/80 dark:hover:bg-slate-800/60 transition cursor-pointer select-none group"
                  >
                    {/* Left: Module Squircle Icon */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center shrink-0 shadow-xs ${
                        isDark ? 'bg-slate-900/90 border border-indigo-500/30' : squircleBg
                      } transition-transform duration-200 group-hover:scale-105`}
                    >
                      <ModuleIcon moduleId={mod.id} className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>

                    {/* Middle: Title & Meta Info */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        Bab {modIdx + 1}: {mod.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-slate-400 dark:text-slate-400 font-medium">
                        <span>{mod.subtopics.length} Sub-bab</span>
                        <span>•</span>
                        <span>~{mod.estimatedMinutes} mnt</span>
                      </div>
                    </div>

                    {/* Right: Smooth Rotating Chevron */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                      <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-300 ease-out ${
                            isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : 'rotate-0 text-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sub-bab List: Minim Hiasan Accordion */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-[#fcfbf9] dark:bg-[#090e1f] px-3.5 sm:px-6 py-3 border-t border-stone-100 dark:border-slate-800/80 space-y-2 animate-subtopic-slide">
                        {mod.subtopics.map((sub, sIdx) => {
                          return (
                            <div
                              key={sub.id}
                              onClick={() => onSelectMaterial(sub.id)}
                              style={{ animationDelay: `${sIdx * 30}ms` }}
                              className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0f172a] hover:bg-[#fffbeb] dark:hover:bg-[#131d36] border border-stone-200/90 dark:border-slate-800 hover:border-amber-200 dark:hover:border-cyan-500/40 hover:shadow-xs dark:hover:shadow-[0_0_12px_rgba(0,242,254,0.15)] transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs"
                            >
                              {/* Left: Book Icon + Full Sub-bab Title */}
                              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1 py-0.5">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-indigo-950/70 text-blue-600 dark:text-indigo-300 border border-blue-100 dark:border-indigo-800/60 flex items-center justify-center shrink-0 group-hover/sub:bg-blue-600 group-hover/sub:text-white transition-colors shadow-2xs mt-0.5 sm:mt-0">
                                  <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                                </div>

                                <span className="text-sm sm:text-base font-semibold leading-relaxed break-words whitespace-normal flex-1 text-slate-800 dark:text-slate-100 group-hover/sub:text-blue-700 dark:group-hover/sub:text-cyan-300 transition-colors">
                                  {sub.title}
                                </span>
                              </div>

                              {/* Right: Clean Read Action */}
                              <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 shrink-0 ml-2 group-hover/sub:translate-x-1 transition-transform">
                                <span className="hidden sm:inline">Baca</span>
                                <ChevronRight className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            TAB 2: DRILLING SOAL (Setup Latihan Minim Hiasan)
            ======================================================== */}
        {activeTab === 'drilling' && (
          <div className="space-y-4">
            {/* Quick Header Bar */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg">
                  Pilih Materi Latihan
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Ketuk sub-bab yang ingin diujikan dalam sesi latihan ini.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 border border-blue-200 dark:border-cyan-500/40 cursor-pointer transition shadow-2xs"
                >
                  Pilih Semua
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>

            {/* Accordion identical to Materi view */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-sm border border-stone-200/90 dark:border-[rgba(99,102,241,0.25)] divide-y divide-stone-100 dark:divide-slate-800/80 overflow-hidden transition-all duration-300">
              {(subtest.modules || []).map((mod, modIdx) => {
                const isOpen = openModules.has(mod.id);
                const selectedInMod = mod.subtopics.filter((s) => selectedSubchapters.has(s.id)).length;
                const allSelectedInMod = mod.subtopics.length > 0 && selectedInMod === mod.subtopics.length;

                return (
                  <div key={mod.id} className="transition-colors">
                    {/* Module Header Row */}
                    <div
                      onClick={() => toggleModule(mod.id)}
                      className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3.5 hover:bg-stone-50/80 dark:hover:bg-slate-800/60 transition cursor-pointer select-none group"
                    >
                      {/* Left: Module Squircle Icon */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center shrink-0 shadow-xs ${
                          isDark ? 'bg-slate-900/90 border border-indigo-500/30' : squircleBg
                        } transition-transform duration-200 group-hover:scale-105`}
                      >
                        <ModuleIcon moduleId={mod.id} className="w-8 h-8 sm:w-9 sm:h-9" />
                      </div>

                      {/* Middle: Title & Meta Info */}
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          Bab {modIdx + 1}: {mod.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-slate-400 dark:text-slate-400 font-medium">
                          <span>{mod.subtopics.length} Sub-bab</span>
                          <span>•</span>
                          <span>~{mod.estimatedMinutes} mnt</span>
                        </div>
                      </div>

                      {/* Right: Quick Select / Deselect Module & Chevron */}
                      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const modSubIds = mod.subtopics.map((s) => s.id);
                            setSelectedSubchapters((prev) => {
                              const next = new Set(prev);
                              if (allSelectedInMod) {
                                modSubIds.forEach((id) => next.delete(id));
                              } else {
                                modSubIds.forEach((id) => next.add(id));
                              }
                              return next;
                            });
                          }}
                          className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer shadow-2xs ${
                            allSelectedInMod
                              ? isDark
                                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_10px_rgba(0,242,254,0.4)]'
                                : 'bg-blue-600 text-white border-blue-600'
                              : isDark
                              ? 'text-cyan-400 hover:bg-cyan-950/60 border-cyan-500/40'
                              : 'text-blue-600 hover:bg-blue-50 border-blue-200'
                          }`}
                        >
                          {allSelectedInMod ? 'Batal' : 'Pilih'}
                        </button>

                        <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          <ChevronDown
                            className={`w-6 h-6 transition-transform duration-300 ease-out ${
                              isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : 'rotate-0 text-slate-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Sub-bab List: Smooth Animated Accordion */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="bg-[#fcfbf9] dark:bg-[#090e1f] px-3.5 sm:px-6 py-3 border-t border-stone-100 dark:border-slate-800/80 space-y-2 animate-subtopic-slide">
                          {mod.subtopics.map((sub, sIdx) => {
                            const isSelected = selectedSubchapters.has(sub.id);

                            return (
                              <div
                                key={sub.id}
                                onClick={() => toggleSubchapterSelect(sub.id)}
                                style={{ animationDelay: `${sIdx * 30}ms` }}
                                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs border ${
                                  isSelected
                                    ? isDark
                                      ? 'bg-[#0e2142] border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                                      : 'bg-blue-50/90 border-blue-300 shadow-xs'
                                    : isDark
                                    ? 'bg-[#0f172a] hover:bg-[#131d36] border-slate-800 hover:border-cyan-500/40 text-slate-200'
                                    : 'bg-white hover:bg-[#fffbeb] border-stone-200/90 hover:border-amber-200 text-slate-800'
                                }`}
                              >
                                {/* Left: Icon Zap + Judul Lengkap */}
                                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1 py-0.5">
                                  {/* Icon Sub-bab */}
                                  <div
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs border mt-0.5 sm:mt-0 ${
                                      isSelected
                                        ? isDark
                                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.6)] font-bold'
                                          : 'bg-blue-600 text-white border-blue-600'
                                        : isDark
                                        ? 'bg-slate-800 text-cyan-300 border-slate-700 group-hover/sub:bg-cyan-600 group-hover/sub:text-white'
                                        : 'bg-blue-50 text-blue-600 border-blue-100 group-hover/sub:bg-blue-600 group-hover/sub:text-white'
                                    }`}
                                  >
                                    <Zap className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                                  </div>

                                  {/* Judul Sub-bab */}
                                  <span
                                    className={`text-sm sm:text-base font-semibold leading-relaxed break-words whitespace-normal flex-1 ${
                                      isSelected
                                        ? isDark
                                          ? 'text-cyan-200 font-bold'
                                          : 'text-blue-950 font-bold'
                                        : isDark
                                        ? 'text-slate-200 group-hover/sub:text-cyan-300'
                                        : 'text-slate-800 group-hover/sub:text-blue-700'
                                    }`}
                                  >
                                    {sub.title}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM BAR FOR DRILLING SESSION (Frosted Glass per Theme) */}
      {activeTab === 'drilling' && (
        <aside
          aria-label="Konfigurasi Sesi Drilling"
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t shadow-2xl p-3.5 sm:p-5 transition-all duration-300 bg-white/95 dark:bg-[#0c1224]/90 border-stone-200/90 dark:border-cyan-500/30 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5">
            {/* Left: Selected count info */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm sm:text-base shadow-sm shrink-0 border border-blue-400/30">
                  {selectedSubchapters.size}
                </span>
                <div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {selectedSubchapters.size} Sub-bab Terpilih
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedSubchapters.size === 0
                      ? 'Pilih minimal 1 sub-bab di atas'
                      : 'Siap untuk drilling latihan'}
                  </div>
                </div>
              </div>

              {selectedSubchapters.size === 0 && (
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer sm:hidden"
                >
                  Pilih Semua
                </button>
              )}
            </div>

            {/* Right: Steppers (+1/-1 Fleksibel) with Nonaktifkan Timer & Start Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Jumlah Soal Stepper (+1 / -1) */}
              <div
                className="flex items-center bg-stone-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200/90 dark:border-slate-800 shadow-2xs"
                title="Jumlah Soal (+1 / -1)"
              >
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.max(1, prev - 1))}
                  disabled={questionCount <= 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-100 flex items-center justify-center transition cursor-pointer font-bold disabled:opacity-40 shadow-2xs border border-stone-200/60 dark:border-slate-700"
                  aria-label="Kurangi 1 Soal"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="px-2.5 min-w-[50px] text-center select-none">
                  <div className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {questionCount}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-none">
                    Soal
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.min(100, prev + 1))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-100 flex items-center justify-center transition cursor-pointer font-bold shadow-2xs border border-stone-200/60 dark:border-slate-700"
                  aria-label="Tambah 1 Soal"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Batas Waktu Stepper dengan Opsi Nonaktifkan Timer */}
              {timerMinutes !== null ? (
                <div
                  className="flex items-center bg-stone-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200/90 dark:border-slate-800 shadow-2xs"
                  title="Batas Waktu Pengerjaan (+1 / -1 Menit)"
                >
                  <button
                    type="button"
                    onClick={() => setTimerMinutes((prev) => Math.max(1, (prev ?? 15) - 1))}
                    disabled={(timerMinutes ?? 15) <= 1}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-100 flex items-center justify-center transition cursor-pointer font-bold disabled:opacity-40 shadow-2xs border border-stone-200/60 dark:border-slate-700"
                    aria-label="Kurangi 1 Menit"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="px-2 min-w-[46px] text-center select-none">
                    <div className="text-sm font-black text-slate-900 dark:text-slate-100 leading-tight">
                      {timerMinutes}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-none">
                      Menit
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTimerMinutes((prev) => Math.min(180, (prev ?? 15) + 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-100 flex items-center justify-center transition cursor-pointer font-bold shadow-2xs border border-stone-200/60 dark:border-slate-700"
                    aria-label="Tambah 1 Menit"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {/* Tombol Minimalis Nonaktifkan Timer */}
                  <button
                    type="button"
                    onClick={() => setTimerMinutes(null)}
                    className="ml-1 px-2 py-1 text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 active:scale-95 rounded-lg transition cursor-pointer"
                    title="Nonaktifkan Timer"
                  >
                    Off
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimerMinutes(15)}
                  className="h-11 px-3.5 flex items-center gap-2 bg-stone-100 dark:bg-slate-900/90 hover:bg-blue-50 dark:hover:bg-slate-800 border border-stone-200/80 dark:border-slate-800 hover:border-blue-200 dark:hover:border-cyan-500 rounded-2xl text-slate-600 dark:text-slate-200 hover:text-blue-700 dark:hover:text-cyan-300 transition cursor-pointer shadow-2xs select-none"
                  title="Klik untuk mengaktifkan timer"
                >
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs sm:text-sm font-bold">Tanpa Timer</span>
                </button>
              )}

              {/* Mulai Drilling Button dengan Cyber Glow di Dark Mode */}
              <button
                type="button"
                disabled={selectedSubchapters.size === 0}
                onClick={() => {
                  if (selectedSubchapters.size > 0) {
                    onStartDrilling(
                      Array.from(selectedSubchapters),
                      questionCount,
                      timerMinutes
                    );
                  }
                }}
                className={`px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shrink-0 select-none ${
                  selectedSubchapters.size > 0
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.45)]'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 active:scale-95 text-white cursor-pointer shadow-blue-500/25'
                    : 'bg-stone-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <Play className="w-4.5 h-4.5 fill-current" />
                <span>Mulai Drilling</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
