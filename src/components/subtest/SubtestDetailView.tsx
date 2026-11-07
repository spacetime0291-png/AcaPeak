import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Play,
  Zap,
  Minus,
  Plus,
  Clock,
  Sparkles,
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

  // Harmonized Subtest Theme Accents (Senada dengan Tampilan Beranda)
  const subtestTheme = (() => {
    const code = subtest.code.toUpperCase();
    if (isDark) {
      switch (code) {
        case 'PU':
          return {
            border: 'border-purple-500/40 hover:border-purple-400/80',
            glow: 'shadow-[0_4px_24px_rgba(168,85,247,0.18)]',
            squircle: 'bg-[#181136] border border-purple-500/60 text-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.4)]',
            babBadge: 'bg-purple-950/80 text-purple-300 border border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.3)]',
            numChip: 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)] border border-purple-400/40',
            actionPill: 'bg-purple-500/10 text-purple-300 border border-purple-400/50 group-hover/sub:bg-purple-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(168,85,247,0.5)]',
            highlightText: 'text-purple-300',
          };
        case 'PPU':
          return {
            border: 'border-cyan-500/40 hover:border-cyan-400/80',
            glow: 'shadow-[0_4px_24px_rgba(0,242,254,0.18)]',
            squircle: 'bg-[#0a2336] border border-cyan-500/60 text-cyan-300 shadow-[0_0_16px_rgba(0,242,254,0.4)]',
            babBadge: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-[0_0_8px_rgba(0,242,254,0.3)]',
            numChip: 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-[0_0_10px_rgba(0,242,254,0.4)] border border-cyan-400/40',
            actionPill: 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/50 group-hover/sub:bg-cyan-500 group-hover/sub:text-slate-950 group-hover/sub:shadow-[0_0_14px_rgba(0,242,254,0.5)]',
            highlightText: 'text-cyan-300',
          };
        case 'PBM':
          return {
            border: 'border-rose-500/40 hover:border-rose-400/80',
            glow: 'shadow-[0_4px_24px_rgba(244,63,94,0.18)]',
            squircle: 'bg-[#33111f] border border-rose-500/60 text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.4)]',
            babBadge: 'bg-rose-950/80 text-rose-300 border border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.3)]',
            numChip: 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)] border border-rose-400/40',
            actionPill: 'bg-rose-500/10 text-rose-300 border border-rose-400/50 group-hover/sub:bg-rose-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(244,63,94,0.5)]',
            highlightText: 'text-rose-300',
          };
        case 'PK':
          return {
            border: 'border-blue-500/40 hover:border-blue-400/80',
            glow: 'shadow-[0_4px_24px_rgba(59,130,246,0.18)]',
            squircle: 'bg-[#0d1d3d] border border-blue-500/60 text-blue-300 shadow-[0_0_16px_rgba(59,130,246,0.4)]',
            babBadge: 'bg-blue-950/80 text-blue-300 border border-blue-500/60 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
            numChip: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)] border border-blue-400/40',
            actionPill: 'bg-blue-500/10 text-blue-300 border border-blue-400/50 group-hover/sub:bg-blue-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(59,130,246,0.5)]',
            highlightText: 'text-blue-300',
          };
        case 'LBI':
          return {
            border: 'border-rose-500/40 hover:border-rose-400/80',
            glow: 'shadow-[0_4px_24px_rgba(244,63,94,0.18)]',
            squircle: 'bg-[#2a1322] border border-rose-500/60 text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.4)]',
            babBadge: 'bg-rose-950/80 text-rose-300 border border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.3)]',
            numChip: 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)] border border-rose-400/40',
            actionPill: 'bg-rose-500/10 text-rose-300 border border-rose-400/50 group-hover/sub:bg-rose-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(244,63,94,0.5)]',
            highlightText: 'text-rose-300',
          };
        case 'LBE':
          return {
            border: 'border-purple-500/40 hover:border-purple-400/80',
            glow: 'shadow-[0_4px_24px_rgba(168,85,247,0.18)]',
            squircle: 'bg-[#171638] border border-purple-500/60 text-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.4)]',
            babBadge: 'bg-purple-950/80 text-purple-300 border border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.3)]',
            numChip: 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)] border border-purple-400/40',
            actionPill: 'bg-purple-500/10 text-purple-300 border border-purple-400/50 group-hover/sub:bg-purple-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(168,85,247,0.5)]',
            highlightText: 'text-purple-300',
          };
        case 'PM':
          return {
            border: 'border-emerald-500/40 hover:border-emerald-400/80',
            glow: 'shadow-[0_4px_24px_rgba(16,185,129,0.18)]',
            squircle: 'bg-[#0a2920] border border-emerald-500/60 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.4)]',
            babBadge: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
            numChip: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)] border border-emerald-400/40',
            actionPill: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/50 group-hover/sub:bg-emerald-600 group-hover/sub:text-white group-hover/sub:shadow-[0_0_14px_rgba(16,185,129,0.5)]',
            highlightText: 'text-emerald-300',
          };
        default:
          return {
            border: 'border-indigo-500/40 hover:border-cyan-400/80',
            glow: 'shadow-[0_4px_24px_rgba(0,242,254,0.18)]',
            squircle: 'bg-[#0d1d3d] border border-blue-500/60 text-blue-300',
            babBadge: 'bg-indigo-950/80 text-cyan-300 border border-cyan-500/60',
            numChip: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-[0_0_10px_rgba(0,242,254,0.4)] border border-cyan-400/40',
            actionPill: 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/50 group-hover/sub:bg-cyan-500 group-hover/sub:text-slate-950',
            highlightText: 'text-cyan-300',
          };
      }
    } else {
      switch (code) {
        case 'PU':
          return {
            border: 'border-rose-200/90 hover:border-rose-300',
            glow: 'shadow-xs hover:shadow-md',
            squircle: 'bg-rose-100 text-rose-900 border border-rose-200/90',
            babBadge: 'bg-rose-50 text-rose-800 border border-rose-200',
            numChip: 'bg-rose-100 text-rose-800 border border-rose-200',
            actionPill: 'bg-rose-50 text-rose-700 border border-rose-200 group-hover/sub:bg-rose-600 group-hover/sub:text-white',
            highlightText: 'text-rose-700',
          };
        case 'PPU':
          return {
            border: 'border-amber-200/90 hover:border-amber-300',
            glow: 'shadow-xs hover:shadow-md',
            squircle: 'bg-amber-100 text-amber-900 border border-amber-200/90',
            babBadge: 'bg-amber-50 text-amber-800 border border-amber-200',
            numChip: 'bg-amber-100 text-amber-800 border border-amber-200',
            actionPill: 'bg-amber-50 text-amber-700 border border-amber-200 group-hover/sub:bg-amber-600 group-hover/sub:text-white',
            highlightText: 'text-amber-700',
          };
        case 'PBM':
          return {
            border: 'border-emerald-200/90 hover:border-emerald-300',
            glow: 'shadow-xs hover:shadow-md',
            squircle: 'bg-emerald-100 text-emerald-900 border border-emerald-200/90',
            babBadge: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
            numChip: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
            actionPill: 'bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover/sub:bg-emerald-600 group-hover/sub:text-white',
            highlightText: 'text-emerald-700',
          };
        default:
          return {
            border: 'border-sky-200/90 hover:border-sky-300',
            glow: 'shadow-xs hover:shadow-md',
            squircle: 'bg-sky-100 text-sky-900 border border-sky-200/90',
            babBadge: 'bg-sky-50 text-sky-800 border border-sky-200',
            numChip: 'bg-sky-100 text-sky-800 border border-sky-200',
            actionPill: 'bg-sky-50 text-sky-700 border border-sky-200 group-hover/sub:bg-blue-600 group-hover/sub:text-white',
            highlightText: 'text-blue-700',
          };
      }
    }
  })();

  return (
    <div className="w-full pb-28">
      {/* 1. STICKY TOP APP BAR (Native App Feel, Unified Cosmic/Nature Header) */}
      <div className="sticky top-0 z-40 w-full shadow-xs">
        {/* Baris 1: Top Navigation Bar */}
        <div className="relative overflow-hidden bg-white/95 dark:bg-[#070913]/90 border-b border-stone-200/90 dark:border-indigo-500/35 w-full shadow-sm transition-all duration-300 backdrop-blur-md">
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
                <ArrowLeft className="w-6 h-6 text-indigo-600 dark:text-cyan-400" />
              </button>
              <h1 className="font-bold text-base sm:text-xl text-slate-900 dark:text-white truncate tracking-tight">
                {subtest.title || subtest.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Subtest Information Badge */}
              {totalSubtopics > 0 && (
                <div className="flex items-center gap-1.5 bg-stone-100/90 dark:bg-gradient-to-r dark:from-blue-950/80 dark:to-indigo-950/80 border border-stone-200 dark:border-cyan-500/40 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs dark:shadow-[0_0_12px_rgba(0,242,254,0.25)]">
                  <span className="text-slate-900 dark:text-cyan-200 font-bold">{subtest.modules?.length || 0} Bab</span>
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
        <div className="bg-[#fcfbf9]/95 dark:bg-[#080d21]/90 backdrop-blur-md border-b border-stone-200/90 dark:border-slate-800/80 w-full px-3.5 sm:px-5 py-2.5 transition-colors">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center bg-stone-100 dark:bg-[#0a1024] p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 w-full sm:w-auto shadow-2xs">
              <button
                type="button"
                onClick={() => onTabChange('materi')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'materi'
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(0,242,254,0.5)] border border-cyan-400/50'
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
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(0,242,254,0.5)] border border-cyan-400/50'
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
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-cyan-950/60 border border-blue-200 dark:border-cyan-400/50 cursor-pointer transition shadow-2xs dark:shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                >
                  Pilih Semua
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area: Separated Standalone Bab Cards (Senada dengan Beranda) */}
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-3 sm:py-5">
        {/* ========================================================
            TAB 1: MATERI (Standalone Cosmic/Nature Bab Cards)
            ======================================================== */}
        {activeTab === 'materi' && (
          <div className="space-y-3 sm:space-y-3.5">
            {(subtest.modules || []).map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);

              return (
                <div
                  key={mod.id}
                  className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
                    isDark
                      ? `bg-[#0e1736]/90 backdrop-blur-md border ${subtestTheme.border} ${subtestTheme.glow}`
                      : `bg-white border ${subtestTheme.border} ${subtestTheme.glow}`
                  }`}
                >
                  {/* Module Header Row */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 transition cursor-pointer select-none group"
                  >
                    {/* Left: Module Squircle Icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${subtestTheme.squircle} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <ModuleIcon moduleId={mod.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Middle: Title & Meta Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`px-2 py-0.5 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-mono font-bold tracking-wider ${subtestTheme.babBadge}`}>
                          BAB {modIdx + 1 < 10 ? `0${modIdx + 1}` : modIdx + 1}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                          • {mod.subtopics.length} Sub-bab • ~{mod.estimatedMinutes} mnt
                        </span>
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        {mod.title}
                      </h2>
                    </div>

                    {/* Right: Smooth Rotating Chevron */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ease-out ${
                            isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : 'rotate-0 text-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sub-bab List: Rich Cosmic Cyber Cards */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-[#fffdf9] dark:bg-[#080d21]/80 px-3 sm:px-4 py-2.5 border-t border-stone-100 dark:border-indigo-500/25 space-y-2 animate-subtopic-slide">
                        {mod.subtopics.map((sub, sIdx) => {
                          const indexNum = sIdx + 1 < 10 ? `0${sIdx + 1}` : `${sIdx + 1}`;

                          return (
                            <div
                              key={sub.id}
                              onClick={() => onSelectMaterial(sub.id)}
                              style={{ animationDelay: `${sIdx * 30}ms` }}
                              className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs border ${
                                isDark
                                  ? 'bg-[#0f1b3b]/90 hover:bg-[#152754] border-slate-700/80 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(0,242,254,0.3)]'
                                  : 'bg-white hover:bg-[#fff9eb] border-stone-200/90 hover:border-amber-300/80 hover:shadow-xs'
                              }`}
                            >
                              {/* Left: Index badge + Title */}
                              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 py-0.5">
                                {/* Numbered Cyber Badge */}
                                <div
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl font-mono font-black text-[11px] sm:text-xs flex items-center justify-center shrink-0 transition-colors shadow-2xs ${subtestTheme.numChip}`}
                                >
                                  {indexNum}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <span className="text-xs sm:text-sm font-bold leading-snug break-words whitespace-normal block text-slate-800 dark:text-white group-hover/sub:text-blue-700 dark:group-hover/sub:text-cyan-200 transition-colors">
                                    {sub.title}
                                  </span>
                                  <div className="flex items-center gap-1 mt-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-cyan-400/80">
                                    <Sparkles className="w-3 h-3 text-amber-500 dark:text-cyan-400" />
                                    <span>Materi Inti UTBK</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Clean Read Action Pill */}
                              <div className="shrink-0 ml-2">
                                <span
                                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-2xs group-hover/sub:translate-x-1 ${subtestTheme.actionPill}`}
                                >
                                  <span>Baca Materi</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
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
        )}

        {/* ========================================================
            TAB 2: DRILLING SOAL (Setup Latihan Standalone Cards)
            ======================================================== */}
        {activeTab === 'drilling' && (
          <div className="space-y-3 sm:space-y-3.5">
            {/* Quick Header Bar */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">
                  Pilih Materi Latihan
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Ketuk sub-bab yang ingin diujikan dalam sesi latihan ini.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-cyan-950/60 border border-blue-200 dark:border-cyan-400/50 cursor-pointer transition shadow-2xs dark:shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                >
                  Pilih Semua
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>

            {/* Standalone Cards for Drilling */}
            <div className="space-y-3 sm:space-y-3.5">
              {(subtest.modules || []).map((mod, modIdx) => {
                const isOpen = openModules.has(mod.id);
                const selectedInMod = mod.subtopics.filter((s) => selectedSubchapters.has(s.id)).length;
                const allSelectedInMod = mod.subtopics.length > 0 && selectedInMod === mod.subtopics.length;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
                      isDark
                        ? `bg-[#0e1736]/90 backdrop-blur-md border ${subtestTheme.border} ${subtestTheme.glow}`
                        : `bg-white border ${subtestTheme.border} ${subtestTheme.glow}`
                    }`}
                  >
                    {/* Module Header Row */}
                    <div
                      onClick={() => toggleModule(mod.id)}
                      className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 transition cursor-pointer select-none group"
                    >
                      {/* Left: Module Squircle Icon */}
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${subtestTheme.squircle} transition-transform duration-200 group-hover:scale-105`}
                      >
                        <ModuleIcon moduleId={mod.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      {/* Middle: Title & Meta Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`px-2 py-0.5 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-mono font-bold tracking-wider ${subtestTheme.babBadge}`}>
                            BAB {modIdx + 1 < 10 ? `0${modIdx + 1}` : modIdx + 1}
                          </span>
                          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                            • {mod.subtopics.length} Sub-bab • ~{mod.estimatedMinutes} mnt
                          </span>
                        </div>
                        <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          {mod.title}
                        </h2>
                      </div>

                      {/* Right: Quick Select / Deselect Module & Chevron */}
                      <div className="flex items-center gap-2 shrink-0">
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
                          className={`text-xs font-bold px-3 py-1 rounded-lg sm:rounded-xl border transition cursor-pointer shadow-2xs ${
                            allSelectedInMod
                              ? isDark
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_14px_rgba(0,242,254,0.6)] font-black'
                                : 'bg-blue-600 text-white border-blue-600'
                              : isDark
                              ? 'text-cyan-300 hover:bg-cyan-950/60 border-cyan-400/50'
                              : 'text-blue-600 hover:bg-blue-50 border-blue-200'
                          }`}
                        >
                          {allSelectedInMod ? 'Batal' : 'Pilih'}
                        </button>

                        <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ease-out ${
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
                        <div className="bg-[#fffdf9] dark:bg-[#080d21]/80 px-3 sm:px-4 py-2.5 border-t border-stone-100 dark:border-indigo-500/25 space-y-2 animate-subtopic-slide">
                          {mod.subtopics.map((sub, sIdx) => {
                            const isSelected = selectedSubchapters.has(sub.id);

                            return (
                              <div
                                key={sub.id}
                                onClick={() => toggleSubchapterSelect(sub.id)}
                                style={{ animationDelay: `${sIdx * 30}ms` }}
                                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs border ${
                                  isSelected
                                    ? isDark
                                      ? 'bg-[#0c2448] border-cyan-400 text-cyan-100 shadow-[0_0_16px_rgba(0,242,254,0.35)]'
                                      : 'bg-sky-50/90 border-sky-300 shadow-xs'
                                    : isDark
                                    ? 'bg-[#0f1b3b]/90 hover:bg-[#152754] border-slate-700/80 hover:border-cyan-400/60 text-slate-200'
                                    : 'bg-white hover:bg-[#fff9eb] border-stone-200/90 hover:border-amber-200 text-slate-800'
                                }`}
                              >
                                {/* Left: Icon Zap + Judul Lengkap */}
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 py-0.5">
                                  {/* Icon Sub-bab */}
                                  <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs border ${
                                      isSelected
                                        ? isDark
                                          ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.6)] font-bold'
                                          : 'bg-blue-600 text-white border-blue-600'
                                        : isDark
                                        ? 'bg-slate-800 text-cyan-300 border-slate-700 group-hover/sub:bg-cyan-600 group-hover/sub:text-white'
                                        : 'bg-blue-50 text-blue-600 border-blue-100 group-hover/sub:bg-blue-600 group-hover/sub:text-white'
                                    }`}
                                  >
                                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </div>

                                  {/* Judul Sub-bab */}
                                  <span
                                    className={`text-xs sm:text-sm font-bold leading-snug break-words whitespace-normal flex-1 ${
                                      isSelected
                                        ? isDark
                                          ? 'text-cyan-100 font-bold'
                                          : 'text-blue-950 font-bold'
                                        : isDark
                                        ? 'text-slate-200 group-hover/sub:text-cyan-200'
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

      {/* STICKY BOTTOM BAR FOR DRILLING SESSION (Bertingkat Steppers with +/-5 & Direct Start) */}
      {activeTab === 'drilling' && (
        <aside
          aria-label="Konfigurasi Sesi Drilling"
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t shadow-2xl p-2.5 sm:p-3.5 transition-all duration-300 bg-white/95 dark:bg-[#0c1228]/95 border-stone-200/90 dark:border-cyan-500/40 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.75)]"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
            {/* Bertingkat Steppers (Jumlah Soal & Waktu Bertingkat dengan +5 / -5) */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {/* Tingkat 1: Stepper Jumlah Soal (-5, -1, [Count Soal], +1, +5) */}
              <div className="flex items-center gap-1.5 bg-stone-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-stone-200/90 dark:border-slate-800 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-500 dark:text-cyan-400/80 px-2 min-w-[48px]">
                  Soal
                </span>
                {/* -5 Soal */}
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.max(1, prev - 5))}
                  disabled={questionCount <= 1}
                  className="h-7 px-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-bold transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                  title="Kurangi 5 Soal"
                >
                  -5
                </button>
                {/* -1 Soal */}
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.max(1, prev - 1))}
                  disabled={questionCount <= 1}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                  title="Kurangi 1 Soal"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                {/* Display Count */}
                <div className="px-2 min-w-[62px] text-center select-none font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                  {questionCount} Soal
                </div>
                {/* +1 Soal */}
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.min(100, prev + 1))}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                  title="Tambah 1 Soal"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                {/* +5 Soal */}
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.min(100, prev + 5))}
                  className="h-7 px-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                  title="Tambah 5 Soal"
                >
                  +5
                </button>
              </div>

              {/* Tingkat 2: Stepper Batas Waktu (-5, -1, [Count Menit], +1, +5, Off) */}
              <div className="flex items-center gap-1.5 bg-stone-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-stone-200/90 dark:border-slate-800 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-500 dark:text-cyan-400/80 px-2 min-w-[48px]">
                  Waktu
                </span>
                {timerMinutes !== null ? (
                  <>
                    {/* -5 Menit */}
                    <button
                      type="button"
                      onClick={() => setTimerMinutes((prev) => Math.max(1, (prev ?? 15) - 5))}
                      disabled={(timerMinutes ?? 15) <= 1}
                      className="h-7 px-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-bold transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                      title="Kurangi 5 Menit"
                    >
                      -5
                    </button>
                    {/* -1 Menit */}
                    <button
                      type="button"
                      onClick={() => setTimerMinutes((prev) => Math.max(1, (prev ?? 15) - 1))}
                      disabled={(timerMinutes ?? 15) <= 1}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                      title="Kurangi 1 Menit"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    {/* Display Minutes */}
                    <div className="px-2 min-w-[62px] text-center select-none font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                      {timerMinutes} Mnt
                    </div>
                    {/* +1 Menit */}
                    <button
                      type="button"
                      onClick={() => setTimerMinutes((prev) => Math.min(180, (prev ?? 15) + 1))}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                      title="Tambah 1 Menit"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    {/* +5 Menit */}
                    <button
                      type="button"
                      onClick={() => setTimerMinutes((prev) => Math.min(180, (prev ?? 15) + 5))}
                      className="h-7 px-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer"
                      title="Tambah 5 Menit"
                    >
                      +5
                    </button>
                    {/* Off Button */}
                    <button
                      type="button"
                      onClick={() => setTimerMinutes(null)}
                      className="ml-auto px-2 py-1 text-[11px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition cursor-pointer"
                      title="Nonaktifkan Timer"
                    >
                      Off
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimerMinutes(15)}
                    className="flex-1 h-7 px-3 flex items-center justify-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-stone-200/80 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                    title="Klik untuk mengaktifkan timer 15 menit"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tanpa Timer (Aktifkan 15 Mnt)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mulai Drilling Button */}
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
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shrink-0 select-none cursor-pointer ${
                selectedSubchapters.size > 0
                  ? isDark
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white shadow-[0_0_24px_rgba(0,242,254,0.6)] border border-cyan-400/50'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 active:scale-95 text-white shadow-blue-500/25'
                  : 'bg-stone-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              <span>Mulai Drilling</span>
              {selectedSubchapters.size > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/25">
                  {selectedSubchapters.size}
                </span>
              )}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
