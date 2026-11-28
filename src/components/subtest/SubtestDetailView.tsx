import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  RotateCcw,
  Layers,
  Shuffle,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import type { SubtestItem } from '../../types/material';
import { UTBK_SYLLABUS } from '../../lib/syllabusData';
import {
  fetchDrillingIndex,
  isSubchapterCompleted,
  type DrillingIndexData,
} from '../../lib/contentLoader';
import {
  getSeenStats,
  resetSeenQuestions,
  type OrderMode,
} from '../../lib/drillingRotationEngine';
import { ModuleIcon } from './ModuleIcon';
import { ThemeToggle } from '../common/ThemeToggle';
import type { ThemeId } from '../../lib/theme';
import {
  NatureFocusHeaderAccent,
  VelvetFocusHeaderAccent,
  PrismFocusHeaderAccent,
} from '../decorations/LazyDecorations';

interface SubtestDetailViewProps {
  subtest: SubtestItem;
  activeTab: 'materi' | 'drilling';
  initialSelectedTopicId?: string;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onTabChange?: (tab: 'materi' | 'drilling') => void;
  onBackToHome?: () => void;
  onSelectSubtest?: (subtestCode: string) => void;
  onSelectMaterial?: (materialId: string) => void;
  onStartDrilling: (
    selectedSubchapterIds: string[],
    questionCount: number,
    timerMinutes: number | null,
    orderMode?: OrderMode
  ) => void;
}

export const SubtestDetailView: React.FC<SubtestDetailViewProps> = ({
  subtest,
  activeTab,
  initialSelectedTopicId,
  theme = 'light',
  onSelectTheme = () => {},
  onTabChange,
  onBackToHome,
  onSelectMaterial,
  onStartDrilling,
}) => {
  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Multi-select state strictly for the dedicated Drilling tab
  const [selectedSubchapters, setSelectedSubchapters] = useState<Set<string>>(() => {
    return initialSelectedTopicId ? new Set([initialSelectedTopicId]) : new Set();
  });

  // Accordion state: Set of open module IDs
  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    if (initialSelectedTopicId && subtest.modules) {
      const parentMod = subtest.modules.find((m) =>
        m.subtopics.some((s) => s.id === initialSelectedTopicId)
      );
      if (parentMod) {
        return new Set([parentMod.id]);
      }
    }
    const firstMod = subtest.modules?.[0]?.id;
    return new Set(firstMod ? [firstMod] : []);
  });

  // Reset or keep first module open when subtest changes or topic is selected
  useEffect(() => {
    if (initialSelectedTopicId) {
      setSelectedSubchapters(new Set([initialSelectedTopicId]));
      const parentMod = subtest.modules?.find((m) =>
        m.subtopics.some((s) => s.id === initialSelectedTopicId)
      );
      if (parentMod) {
        setOpenModules((prev) => new Set([...prev, parentMod.id]));
      }
    } else {
      const firstMod = subtest.modules?.[0]?.id;
      setOpenModules(new Set(firstMod ? [firstMod] : []));
    }
  }, [subtest.code, initialSelectedTopicId]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(15);
  const [drillingSubtestCode, setDrillingSubtestCode] = useState<string>(subtest.code);
  const [orderMode, setOrderMode] = useState<OrderMode>('blocking');
  const [showDrillingSettings, setShowDrillingSettings] = useState<boolean>(false);
  const [seenStatsVersion, setSeenStatsVersion] = useState<number>(0);
  const [progressVersion, setProgressVersion] = useState<number>(0);
  const [drillingIndex, setDrillingIndex] = useState<DrillingIndexData | null>(null);

  // Load lightweight 4,240-question drilling index when drilling tab is active
  useEffect(() => {
    if (activeTab !== 'drilling') return;
    let mounted = true;
    fetchDrillingIndex().then((idx) => {
      if (mounted && idx) setDrillingIndex(idx);
    });
    return () => {
      mounted = false;
    };
  }, [activeTab]);

  // Sync completion progress state
  useEffect(() => {
    const handleProgress = () => setProgressVersion((v) => v + 1);
    window.addEventListener('utbk_progress_changed', handleProgress);
    return () => window.removeEventListener('utbk_progress_changed', handleProgress);
  }, []);

  // Completed subtopics count
  const completedCount = useMemo(() => {
    void progressVersion;
    let count = 0;
    (subtest.modules || []).forEach((m) => {
      m.subtopics.forEach((s) => {
        if (isSubchapterCompleted(s.id)) count++;
      });
    });
    return count;
  }, [subtest, progressVersion]);

  // Sync drilling subtest code when subtest prop changes
  useEffect(() => {
    setDrillingSubtestCode(subtest.code);
  }, [subtest.code]);

  // Active subtest for drilling selector
  const currentDrillingSubtest = useMemo(() => {
    return (
      UTBK_SYLLABUS.find(
        (s) => s.code.toLowerCase() === drillingSubtestCode.toLowerCase()
      ) || subtest
    );
  }, [drillingSubtestCode, subtest]);

  // Compute question IDs and seen stats from the 4,240-question drilling index
  const { allAvailableExampleIds, selectedExampleIds } = useMemo(() => {
    const allIds: string[] = [];
    const selIds: string[] = [];

    if (drillingIndex?.subchapters) {
      for (const [subId, qIds] of Object.entries(drillingIndex.subchapters)) {
        for (const qId of qIds) {
          allIds.push(qId);
          if (selectedSubchapters.has(subId)) {
            selIds.push(qId);
          }
        }
      }
    }
    return { allAvailableExampleIds: allIds, selectedExampleIds: selIds };
  }, [drillingIndex, selectedSubchapters, seenStatsVersion]);

  const activeSeenStats = useMemo(() => {
    const targetPool =
      selectedExampleIds.length > 0 ? selectedExampleIds : allAvailableExampleIds;
    return getSeenStats(targetPool);
  }, [selectedExampleIds, allAvailableExampleIds, seenStatsVersion]);

  const handleResetSeen = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset riwayat pengerjaan soal? Seluruh status Seen akan kembali 0.')) {
      resetSeenQuestions();
      setSeenStatsVersion((v) => v + 1);
    }
  };

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

  const selectAllInActiveSubtest = () => {
    const allIds = (currentDrillingSubtest.modules || []).flatMap((m) =>
      m.subtopics.map((s) => s.id)
    );
    setSelectedSubchapters((prev) => {
      const next = new Set(prev);
      allIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const selectAll7Subtests = () => {
    const all7Ids = UTBK_SYLLABUS.flatMap((s) =>
      (s.modules || []).flatMap((m) => m.subtopics.map((sub) => sub.id))
    );
    setSelectedSubchapters(new Set(all7Ids));
  };

  const clearAllSubtest = () => {
    setSelectedSubchapters(new Set());
  };

  // Helper count selected per subtest
  const getSelectedCountForSubtest = (code: string) => {
    const sub = UTBK_SYLLABUS.find((s) => s.code.toLowerCase() === code.toLowerCase());
    if (!sub) return 0;
    const ids = (sub.modules || []).flatMap((m) => m.subtopics.map((s) => s.id));
    return ids.filter((id) => selectedSubchapters.has(id)).length;
  };

  // Total subtopics count
  const totalSubtopics = (subtest.modules || []).reduce((acc, m) => acc + m.subtopics.length, 0);

  // Harmonized Subtest Theme Accents (Senada dengan Tampilan Beranda)
  const subtestTheme = (() => {
    const code = subtest.code.toUpperCase();
    if (isVelvet) {
      return {
        border: 'border-[#EB8A78]/35 hover:border-[#FF8A6B]/70',
        glow: 'shadow-[0_6px_24px_rgba(10,4,8,0.45)]',
        squircle: 'bg-[#381C2C] border border-[#EB8A78]/45 text-[#FFBE98] shadow-xs',
        babBadge: 'bg-[#4A222B]/90 text-[#FFBE98] border border-[#EB8A78]/45',
        numChip: 'bg-gradient-to-tr from-[#FF8A6B] to-[#F5B041] text-[#1E0F17] border border-[#FFBE98]/50 shadow-xs',
        actionPill: 'bg-[#FF8A6B]/12 text-[#FFBE98] border border-[#FF8A6B]/45 group-hover/sub:bg-[#FF8A6B] group-hover/sub:text-[#1E0F17]',
        highlightText: 'text-[#FFBE98]',
      };
    }
    if (isCosmic) {
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
    <div className={`w-full ${activeTab === 'drilling' ? 'pb-36 sm:pb-24' : 'pb-12'}`}>
      {/* 1. STICKY TOP APP BAR (Native App Feel, Unified Cosmic/Nature/Velvet/Prism Header) */}
      <div className="sticky top-0 z-40 w-full shadow-xs">
        {/* Baris 1: Top Navigation Bar */}
        <div
          className={`relative w-full shadow-sm transition-all duration-300 backdrop-blur-md border-b ${
            isVelvet
              ? 'bg-[#1B0F1D]/92 border-[#EB8A78]/25'
              : isCosmic
              ? 'bg-[#070913]/90 border-indigo-500/35'
              : isPrism
              ? 'bg-white/70 border-white/85'
              : 'bg-white/95 border-stone-200/90'
          }`}
        >
          {/* Decorative Watermark Accent (isolated overflow-hidden so ThemeToggle popover is never clipped) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {theme === 'light' && <NatureFocusHeaderAccent />}
            {isVelvet && <VelvetFocusHeaderAccent />}
            {isPrism && <PrismFocusHeaderAccent />}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-3.5 sm:px-5 h-16 sm:h-18 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-3.5 min-w-0">
              <Link
                to="/"
                onClick={() => onBackToHome?.()}
                className="p-2 -ml-1 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800/80 active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Kembali ke Beranda"
              >
                <ArrowLeft
                  className={`w-6 h-6 ${
                    isVelvet
                      ? 'text-[#FF8A6B]'
                      : isPrism
                      ? 'text-blue-600'
                      : 'text-indigo-600 dark:text-cyan-400'
                  }`}
                />
              </Link>
              <h1 className="font-bold text-base sm:text-xl text-slate-900 dark:text-[#FBF1F2] truncate tracking-tight">
                {subtest.title || subtest.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Subtest Information Badge */}
              {totalSubtopics > 0 && (
                <div
                  className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs ${
                    isVelvet
                      ? 'bg-[#2B1723]/90 border-[#EB8A78]/35 text-[#FBF1F2]'
                      : isCosmic
                      ? 'bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-cyan-500/40 shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                      : isPrism
                      ? 'bg-white/80 border-sky-200/80'
                      : 'bg-stone-100/90 border-stone-200'
                  }`}
                >
                  <span
                    className={`font-bold ${
                      isVelvet
                        ? 'text-[#FFBE98]'
                        : isCosmic
                        ? 'text-cyan-200'
                        : 'text-slate-900'
                    }`}
                  >
                    {subtest.modules?.length || 0} Bab
                  </span>
                  <span className="text-slate-400 text-xs">• {totalSubtopics} Sub-bab</span>
                  {completedCount > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">• {completedCount} Selesai</span>
                  )}
                </div>
              )}
              <ThemeToggle
                theme={theme}
                onSelectTheme={onSelectTheme}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Baris 2: Sticky Segmented Tab (Materi vs Drilling Soal) */}
        <div
          className={`backdrop-blur-md border-b w-full px-3.5 sm:px-5 py-2.5 transition-colors ${
            isVelvet
              ? 'bg-[#170D19]/92 border-[#EB8A78]/20'
              : isCosmic
              ? 'bg-[#080d21]/90 border-slate-800/80'
              : isPrism
              ? 'bg-white/55 border-white/75'
              : 'bg-[#fcfbf9]/95 border-stone-200/90'
          }`}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div
              className={`flex items-center p-1.5 rounded-2xl border w-full sm:w-auto shadow-2xs ${
                isVelvet
                  ? 'bg-[#261420] border-[#EB8A78]/25'
                  : isCosmic
                  ? 'bg-[#0a1024] border-slate-800'
                  : isPrism
                  ? 'bg-white/70 border-white/90'
                  : 'bg-stone-100 border-stone-200'
              }`}
            >
              <Link
                to={`/utbk/${subtest.code.toLowerCase()}`}
                onClick={() => onTabChange?.('materi')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'materi'
                    ? isVelvet
                      ? 'bg-[#FF8A6B] text-[#1E0F17] font-extrabold shadow-[0_0_16px_rgba(255,138,107,0.3)]'
                      : isCosmic
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(0,242,254,0.5)] border border-cyan-400/50'
                      : isPrism
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-sm'
                      : 'bg-white text-blue-700 shadow-xs border border-stone-200/80'
                    : isVelvet
                    ? 'text-[#C9A9B0] hover:text-[#FBF1F2]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>📖 Materi</span>
              </Link>
              <Link
                to={`/utbk/${subtest.code.toLowerCase()}?tab=drilling`}
                onClick={() => onTabChange?.('drilling')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'drilling'
                    ? isVelvet
                      ? 'bg-[#FF8A6B] text-[#1E0F17] font-extrabold shadow-[0_0_16px_rgba(255,138,107,0.3)]'
                      : isCosmic
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(0,242,254,0.5)] border border-cyan-400/50'
                      : isPrism
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-sm'
                      : 'bg-white text-blue-700 shadow-xs border border-stone-200/80'
                    : isVelvet
                    ? 'text-[#C9A9B0] hover:text-[#FBF1F2]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>⚡ Drilling Soal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Separated Standalone Bab Cards (Senada dengan Beranda) */}
      <div className="max-w-4xl mx-auto px-1.5 sm:px-4 py-3 sm:py-5">
        {/* ========================================================
            TAB 1: MATERI (Standalone Cosmic/Nature/Velvet/Prism Bab Cards)
            ======================================================== */}
        {activeTab === 'materi' && (
          <div className="space-y-3 sm:space-y-3.5">
            {(subtest.modules || []).map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);

              return (
                <div
                  key={mod.id}
                  className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
                    isVelvet
                      ? `bg-[#2B1723]/92 border ${subtestTheme.border} ${subtestTheme.glow}`
                      : isCosmic
                      ? `bg-[#0e1736]/90 backdrop-blur-md border ${subtestTheme.border} ${subtestTheme.glow}`
                      : isPrism
                      ? `bg-white/78 backdrop-blur-md border border-white/90 shadow-xs hover:shadow-md`
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

                    {/* Right: Actions & Rotating Chevron */}
                    <div className="flex items-center gap-2 shrink-0">
                      {(() => {
                        const firstSub = mod.subtopics[0]?.id || '';
                        const parts = firstSub.split('-');
                        const kodeBab = (parts.length >= 2 ? `${parts[0]}-${parts[1]}` : mod.id).toLowerCase();
                        return (
                          <Link
                            to={`/rangkuman/${kodeBab}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-600/50 transition-all hover:scale-105 shadow-2xs cursor-pointer"
                            title="Buka Lembar Rangkuman / Cheat Sheet Bab ini"
                          >
                            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="hidden xs:inline sm:inline">Rangkuman Bab</span>
                          </Link>
                        );
                      })()}
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
                      <div
                        className={`px-3 sm:px-4 py-2.5 border-t space-y-2 animate-subtopic-slide ${
                          isVelvet
                            ? 'bg-[#1D101D]/90 border-[#EB8A78]/20'
                            : isCosmic
                            ? 'bg-[#080d21]/80 border-indigo-500/25'
                            : isPrism
                            ? 'bg-sky-50/40 border-white/80'
                            : 'bg-[#fffdf9] border-stone-100'
                        }`}
                      >
                        {/* Pinned Cheat Sheet Banner inside expanded Bab */}
                        <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 mb-2.5">
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                                Cheat Sheet Bab {modIdx + 1}: {mod.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                1 Teori = 1 Contoh Padat • Review Cepat ~4 mnt
                              </p>
                            </div>
                          </div>
                          {(() => {
                            const firstSub = mod.subtopics[0]?.id || '';
                            const parts = firstSub.split('-');
                            const kodeBab = (parts.length >= 2 ? `${parts[0]}-${parts[1]}` : mod.id).toLowerCase();
                            return (
                              <Link
                                to={`/rangkuman/${kodeBab}`}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 active:scale-95 transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Buka Cheat Sheet</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            );
                          })()}
                        </div>
                        {mod.subtopics.map((sub, sIdx) => {
                          const indexNum = sIdx + 1 < 10 ? `0${sIdx + 1}` : `${sIdx + 1}`;
                          const materiHref = `/utbk/${subtest.code.toLowerCase()}/${sub.id.toLowerCase()}`;

                          return (
                            <Link
                              key={sub.id}
                              to={materiHref}
                              onClick={() => onSelectMaterial?.(sub.id)}
                              style={{ animationDelay: `${sIdx * 30}ms` }}
                              className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs border ${
                                isVelvet
                                  ? 'bg-[#341B2B]/90 hover:bg-[#3F2134] border-[#EB8A78]/25 hover:border-[#FF8A6B]'
                                  : isCosmic
                                  ? 'bg-[#0f1b3b]/90 hover:bg-[#152754] border-slate-700/80 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(0,242,254,0.3)]'
                                  : isPrism
                                  ? 'bg-white/90 hover:bg-sky-50/85 border-white hover:border-sky-300'
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

                              {/* Right: Clean Read Action Pill & Completion Status */}
                              <div className="shrink-0 ml-2 flex items-center gap-1.5">
                                {isSubchapterCompleted(sub.id) && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                    <span className="hidden sm:inline">Selesai</span>
                                  </span>
                                )}
                                <span
                                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-2xs group-hover/sub:translate-x-1 ${subtestTheme.actionPill}`}
                                >
                                  <span>Baca Materi</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </Link>
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
            TAB 2: DRILLING SOAL (Clean Topic-First Layout)
            ======================================================== */}
        {activeTab === 'drilling' && (
          <div className="space-y-3">
            {/* 1. Scope & Subtest Selector Card (Front-loaded) */}
            <div
              className={`backdrop-blur-md p-3 sm:p-4 rounded-2xl border shadow-2xs space-y-2.5 ${
                isVelvet
                  ? 'bg-[#2B1723]/90 border-[#EB8A78]/30'
                  : isCosmic
                  ? 'bg-[#0c1326]/85 border-slate-800'
                  : isPrism
                  ? 'bg-white/78 border-white/90'
                  : 'bg-white/90 border-stone-200/90'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isVelvet ? 'text-[#FF8A6B]' : 'text-slate-600 dark:text-cyan-400/90'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pilih Subtes</span>
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedSubchapters.size > 0
                      ? isVelvet
                        ? 'bg-[#FF8A6B]/20 text-[#FFBE98]'
                        : 'bg-blue-50 dark:bg-cyan-950/70 text-blue-700 dark:text-cyan-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {selectedSubchapters.size > 0
                    ? `${selectedSubchapters.size} sub-bab dipilih`
                    : 'Belum ada dipilih'}
                </span>
              </div>

              {/* Horizontal Subtest Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                {UTBK_SYLLABUS.map((st) => {
                  const isActive = st.code.toLowerCase() === drillingSubtestCode.toLowerCase();
                  const selectedCount = getSelectedCountForSubtest(st.code);

                  return (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => setDrillingSubtestCode(st.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border shrink-0 ${
                        isActive
                          ? isVelvet
                            ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B] font-extrabold shadow-xs'
                            : isCosmic
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                            : isPrism
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-sky-400 shadow-xs'
                            : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : isVelvet
                          ? 'bg-[#1F1020] text-[#EBD6DC] hover:text-white border-[#EB8A78]/25 hover:border-[#EB8A78]/50'
                          : isCosmic
                          ? 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                          : isPrism
                          ? 'bg-white/85 text-slate-700 hover:bg-white border-white/90'
                          : 'bg-stone-50 text-slate-700 hover:bg-stone-100 border-stone-200/80'
                      }`}
                    >
                      <span>{st.code}</span>
                      {selectedCount > 0 && (
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                            isActive
                              ? isVelvet
                                ? 'bg-[#1E0F17]/20 text-[#1E0F17]'
                                : 'bg-white/25 text-white'
                              : isVelvet
                              ? 'bg-[#4A222B] text-[#FFBE98]'
                              : 'bg-blue-100 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300'
                          }`}
                        >
                          {selectedCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Compact Quick Select Bar */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <button
                  type="button"
                  onClick={selectAllInActiveSubtest}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                    isVelvet
                      ? 'text-[#FFBE98] bg-[#1F1020]/70 hover:bg-[#3A1D2E] border-[#EB8A78]/35'
                      : 'text-blue-700 dark:text-cyan-300 bg-blue-50/70 dark:bg-cyan-950/40 hover:bg-blue-100 dark:hover:bg-cyan-950/70 border-blue-200/80 dark:border-cyan-500/40'
                  }`}
                >
                  Pilih Semua {currentDrillingSubtest.code}
                </button>
                <button
                  type="button"
                  onClick={selectAll7Subtests}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                    isVelvet
                      ? 'text-[#EBD6DC] bg-[#1F1020]/70 hover:bg-[#3A1D2E] border-[#EB8A78]/25'
                      : 'text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/70 border-indigo-200/80 dark:border-indigo-500/40'
                  }`}
                >
                  Campur 7 Subtes
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer transition ml-auto"
                  >
                    Reset ({selectedSubchapters.size})
                  </button>
                )}
              </div>
            </div>

            {/* 2. Collapsible Compact Session Settings Strip (Progressive Disclosure) */}
            <div
              className={`rounded-2xl border shadow-2xs overflow-hidden transition-colors ${
                isVelvet
                  ? 'bg-[#2B1723]/85 border-[#EB8A78]/25'
                  : isCosmic
                  ? 'bg-[#0c1326]/85 border-slate-800'
                  : isPrism
                  ? 'bg-white/75 border-white/90'
                  : 'bg-white/90 border-stone-200/90'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowDrillingSettings((prev) => !prev)}
                aria-expanded={showDrillingSettings}
                className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
              >
                <div className="flex items-center gap-2 min-w-0 text-xs">
                  <SlidersHorizontal
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isVelvet ? 'text-[#FF8A6B]' : 'text-blue-600 dark:text-cyan-400'
                    }`}
                  />
                  <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                    {orderMode === 'blocking' ? 'Urutan: Blocking' : 'Urutan: Campuran'}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-500 dark:text-slate-400 truncate">
                    {activeSeenStats.totalCount > 0
                      ? `${activeSeenStats.unseenCount.toLocaleString('id-ID')} soal baru`
                      : 'Memuat bank...'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 shrink-0">
                  <span>{showDrillingSettings ? 'Tutup' : 'Atur'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      showDrillingSettings ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>

              {showDrillingSettings && (
                <div
                  className={`px-3.5 pb-3.5 pt-2 border-t space-y-3 ${
                    isVelvet
                      ? 'border-[#EB8A78]/20'
                      : 'border-stone-100 dark:border-slate-800'
                  }`}
                >
                  {/* Segmented Order Mode */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Urutan Soal
                    </div>
                    <div
                      className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl border ${
                        isVelvet
                          ? 'bg-[#1D101D] border-[#EB8A78]/20'
                          : 'bg-stone-100 dark:bg-slate-900 border-stone-200/80 dark:border-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOrderMode('blocking')}
                        className={`px-2.5 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          orderMode === 'blocking'
                            ? isVelvet
                              ? 'bg-[#FF8A6B] text-[#1E0F17] shadow-2xs'
                              : isCosmic
                              ? 'bg-cyan-500 text-slate-950 shadow-2xs'
                              : 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-300 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Blocking (Urut)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderMode('interleaved')}
                        className={`px-2.5 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          orderMode === 'interleaved'
                            ? isVelvet
                              ? 'bg-[#FF8A6B] text-[#1E0F17] shadow-2xs'
                              : isCosmic
                              ? 'bg-cyan-500 text-slate-950 shadow-2xs'
                              : 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-300 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Shuffle className="w-3.5 h-3.5 shrink-0" />
                        <span>Campuran (Acak)</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Question Count Presets */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Preset Jumlah Soal
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[5, 10, 15, 20, 30, 50].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQuestionCount(preset)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            questionCount === preset
                              ? isVelvet
                                ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B]'
                                : 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 border-transparent'
                              : isVelvet
                              ? 'bg-[#1F1020] text-[#EBD6DC] border-[#EB8A78]/25'
                              : 'bg-stone-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-100'
                          }`}
                        >
                          {preset} Soal
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compact Seen Tracker Row */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 dark:border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">
                        Dikerjakan:{' '}
                        <strong>{activeSeenStats.seenCount.toLocaleString('id-ID')}</strong> /{' '}
                        {activeSeenStats.totalCount.toLocaleString('id-ID')} ({activeSeenStats.percentage}%)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetSeen}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-stone-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Topic / Bab Section Header */}
            <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base truncate">
                {currentDrillingSubtest.name || currentDrillingSubtest.title} ({currentDrillingSubtest.code})
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">
                Tap untuk memilih
              </span>
            </div>

            {/* Standalone Bab Cards for Drilling */}
            <div className="space-y-2.5 sm:space-y-3">
              {(currentDrillingSubtest.modules || []).map((mod, modIdx) => {
                const isOpen = openModules.has(mod.id);
                const selectedInMod = mod.subtopics.filter((s) => selectedSubchapters.has(s.id)).length;
                const allSelectedInMod = mod.subtopics.length > 0 && selectedInMod === mod.subtopics.length;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
                      isVelvet
                        ? `bg-[#2B1723]/92 border ${subtestTheme.border} ${subtestTheme.glow}`
                        : isCosmic
                        ? `bg-[#0e1736]/90 backdrop-blur-md border ${subtestTheme.border} ${subtestTheme.glow}`
                        : isPrism
                        ? `bg-white/78 backdrop-blur-md border border-white/90 shadow-xs hover:shadow-md`
                        : `bg-white border ${subtestTheme.border} ${subtestTheme.glow}`
                    }`}
                  >
                    {/* Module Header Row */}
                    <div
                      onClick={() => toggleModule(mod.id)}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 transition cursor-pointer select-none group"
                    >
                      {/* Left: Module Squircle Icon */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${subtestTheme.squircle} transition-transform duration-200 group-hover:scale-105`}
                      >
                        <ModuleIcon moduleId={mod.id} className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Middle: Title & Concise Count */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider ${subtestTheme.babBadge}`}>
                            BAB {modIdx + 1 < 10 ? `0${modIdx + 1}` : modIdx + 1}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {selectedInMod > 0 ? (
                              <strong className={subtestTheme.highlightText}>
                                {selectedInMod}/{mod.subtopics.length} dipilih
                              </strong>
                            ) : (
                              `${mod.subtopics.length} Sub-bab`
                            )}
                          </span>
                        </div>
                        <h2 className="text-sm sm:text-[15px] font-bold text-slate-800 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          {mod.title}
                        </h2>
                      </div>

                      {/* Right: Quick Select / Deselect Module & Chevron */}
                      <div className="flex items-center gap-1.5 shrink-0">
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
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer shadow-2xs ${
                            allSelectedInMod
                              ? isVelvet
                                ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B] font-black'
                                : isCosmic
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                                : 'bg-blue-600 text-white border-blue-600'
                              : isVelvet
                              ? 'text-[#FFBE98] hover:bg-[#3A1D2E] border-[#EB8A78]/45'
                              : isCosmic
                              ? 'text-cyan-300 hover:bg-cyan-950/60 border-cyan-400/50'
                              : 'text-blue-600 hover:bg-blue-50 border-blue-200'
                          }`}
                        >
                          {allSelectedInMod ? 'Batal' : 'Pilih'}
                        </button>

                        <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          <ChevronDown
                            className={`w-4.5 h-4.5 transition-transform duration-300 ease-out ${
                              isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : 'rotate-0 text-slate-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Sub-bab List */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`px-2.5 sm:px-4 py-2 border-t space-y-1.5 animate-subtopic-slide ${
                            isVelvet
                              ? 'bg-[#1D101D]/90 border-[#EB8A78]/20'
                              : isCosmic
                              ? 'bg-[#080d21]/80 border-indigo-500/25'
                              : isPrism
                              ? 'bg-sky-50/40 border-white/80'
                              : 'bg-[#fffdf9] border-stone-100'
                          }`}
                        >
                          {mod.subtopics.map((sub, sIdx) => {
                            const isSelected = selectedSubchapters.has(sub.id);

                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => toggleSubchapterSelect(sub.id)}
                                style={{ animationDelay: `${sIdx * 20}ms` }}
                                className={`w-full text-left flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all duration-150 active:scale-[0.99] cursor-pointer group/sub border ${
                                  isSelected
                                    ? isVelvet
                                      ? 'bg-[#3D1F2E] border-[#FF8A6B] text-[#FBF1F2]'
                                      : isCosmic
                                      ? 'bg-[#0c2448] border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                                      : 'bg-sky-50/90 border-sky-300 shadow-2xs'
                                    : isVelvet
                                    ? 'bg-[#341B2B]/80 hover:bg-[#3F2134] border-[#EB8A78]/20 text-[#FBF1F2]'
                                    : isCosmic
                                    ? 'bg-[#0f1b3b]/80 hover:bg-[#152754] border-slate-700/70 text-slate-200'
                                    : isPrism
                                    ? 'bg-white/90 hover:bg-sky-50/80 border-white text-slate-800'
                                    : 'bg-white hover:bg-stone-50 border-stone-200/80 text-slate-800'
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors border ${
                                    isSelected
                                      ? isVelvet
                                        ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B]'
                                        : isCosmic
                                        ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                                        : 'bg-blue-600 text-white border-blue-600'
                                      : isVelvet
                                      ? 'bg-[#22121D] border-[#EB8A78]/40'
                                      : 'bg-stone-50 dark:bg-slate-900 border-stone-300 dark:border-slate-600'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>

                                <span
                                  className={`text-xs sm:text-sm font-semibold leading-snug break-words whitespace-normal flex-1 ${
                                    isSelected
                                      ? isVelvet
                                        ? 'text-[#FFBE98] font-bold'
                                        : isCosmic
                                        ? 'text-cyan-100 font-bold'
                                        : 'text-blue-950 font-bold'
                                      : isVelvet
                                      ? 'text-[#FBF1F2]'
                                      : isCosmic
                                      ? 'text-slate-200'
                                      : 'text-slate-800'
                                  }`}
                                >
                                  {sub.title}
                                </span>
                              </button>
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

      {/* SLIM & ERGONOMIC STICKY BOTTOM BAR FOR DRILLING SESSION */}
      {activeTab === 'drilling' && (
        <aside
          aria-label="Konfigurasi Sesi Drilling"
          className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t shadow-2xl px-2.5 py-2 sm:px-4 sm:py-3 transition-all duration-300 ${
            isVelvet
              ? 'bg-[#1B0F1D]/95 border-[#EB8A78]/35 shadow-[0_-8px_30px_rgba(0,0,0,0.65)]'
              : isCosmic
              ? 'bg-[#0c1228]/95 border-cyan-500/40 shadow-[0_-8px_30px_rgba(0,0,0,0.75)]'
              : isPrism
              ? 'bg-white/88 border-white/95 shadow-[0_-8px_25px_rgba(15,23,42,0.08)]'
              : 'bg-white/95 border-stone-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.06)]'
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
            {/* Compact 2-Column Steppers (Soal & Waktu side-by-side on mobile) */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2 flex-1 min-w-0">
              {/* Stepper Jumlah Soal (steps by 5 for effortless adjustment) */}
              <div className="flex items-center justify-between gap-1 bg-stone-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-stone-200/90 dark:border-slate-800 sm:min-w-[170px]">
                <button
                  type="button"
                  onClick={() =>
                    setQuestionCount((prev) => (prev <= 5 ? Math.max(1, prev - 1) : prev - 5))
                  }
                  disabled={questionCount <= 1}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer shrink-0"
                  title="Kurangi Soal"
                  aria-label="Kurangi Soal"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="px-1 text-center select-none font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {questionCount} Soal
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setQuestionCount((prev) =>
                      prev < 5 ? 5 : Math.min(100, prev + 5)
                    )
                  }
                  disabled={questionCount >= 100}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer shrink-0"
                  title="Tambah Soal"
                  aria-label="Tambah Soal"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Stepper Batas Waktu */}
              <div className="flex items-center justify-between gap-1 bg-stone-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-stone-200/90 dark:border-slate-800 sm:min-w-[205px]">
                {timerMinutes !== null ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setTimerMinutes((prev) => {
                          const cur = prev ?? 15;
                          return cur <= 5 ? Math.max(1, cur - 1) : cur - 5;
                        })
                      }
                      disabled={(timerMinutes ?? 15) <= 1}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer shrink-0"
                      title="Kurangi Waktu"
                      aria-label="Kurangi Waktu"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="px-1 text-center select-none font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {timerMinutes} Mnt
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setTimerMinutes((prev) => {
                          const cur = prev ?? 15;
                          return cur < 5 ? 5 : Math.min(180, cur + 5);
                        })
                      }
                      disabled={(timerMinutes ?? 15) >= 180}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 flex items-center justify-center transition disabled:opacity-30 shadow-2xs border border-stone-200/60 dark:border-slate-700 cursor-pointer shrink-0"
                      title="Tambah Waktu"
                      aria-label="Tambah Waktu"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimerMinutes(null)}
                      className="px-1.5 py-1 text-[10px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-md transition cursor-pointer shrink-0"
                      title="Nonaktifkan Timer"
                    >
                      Off
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimerMinutes(15)}
                    className="flex-1 h-7 px-2 flex items-center justify-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-stone-200/80 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-200 text-xs font-bold transition cursor-pointer truncate"
                    title="Aktifkan Timer 15 Menit"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Tanpa Timer</span>
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
                    timerMinutes,
                    orderMode
                  );
                }
              }}
              className={`w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shrink-0 select-none cursor-pointer ${
                selectedSubchapters.size > 0
                  ? isVelvet
                    ? 'bg-gradient-to-r from-[#FF8A6B] to-[#F5B041] hover:brightness-110 active:scale-95 text-[#1E0F17] font-extrabold shadow-[0_0_20px_rgba(255,138,107,0.35)]'
                    : isCosmic
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white shadow-[0_0_24px_rgba(0,242,254,0.6)] border border-cyan-400/50'
                    : isPrism
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 active:scale-95 text-white shadow-sky-500/30'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 active:scale-95 text-white shadow-blue-500/25'
                  : 'bg-stone-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {selectedSubchapters.size > 0 ? 'Mulai Drilling' : 'Pilih Topik Dulu'}
              </span>
              {selectedSubchapters.size > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-white/20 dark:bg-black/25">
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
