import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  BookOpen,
  Zap,
  Search,
  X,
  Flame,
  BookMarked,
  Sparkles,
  Check,
} from 'lucide-react';
import type { SubtestItem, SubtestCategory } from '../../types/material';
import { SYLLABUS_DATA } from '../../data/syllabus';
import { AdBanner } from '../content/AdBanner';

interface SubtestDetailViewProps {
  subtest: SubtestItem;
  activeTab: 'materi' | 'drilling';
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
  onTabChange,
  onBackToHome,
  onSelectSubtest,
  onSelectMaterial,
  onStartDrilling,
}) => {
  // Category state (TPS vs Literasi)
  const [activeCategory, setActiveCategory] = useState<SubtestCategory>(
    subtest.category || 'TPS'
  );

  // Sync category if subtest changes externally
  useEffect(() => {
    if (subtest.category) {
      setActiveCategory(subtest.category);
    }
  }, [subtest.category, subtest.code]);

  // Load completed subtopics from localStorage ('web_tka_progress')
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem('web_tka_progress');
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return new Set(parsed);
      if (typeof parsed === 'object') {
        return new Set(Object.keys(parsed).filter((k) => parsed[k] === true));
      }
    } catch (e) {
      console.warn('Failed to parse web_tka_progress from localStorage', e);
    }
    return new Set();
  });

  // Accordion state: Set of open module IDs (first module open by default)
  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    const firstMod = subtest.modules?.[0]?.id;
    return new Set(firstMod ? [firstMod] : []);
  });

  // Keep first module open when subtest changes
  useEffect(() => {
    const firstMod = subtest.modules?.[0]?.id;
    setOpenModules(new Set(firstMod ? [firstMod] : []));
  }, [subtest.code]);

  // Filter & Search states
  const [filterPriority, setFilterPriority] = useState<'ALL' | 'High-Yield' | 'INCOMPLETE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-select state for drilling
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

  // Toggle subtopic completion state & sync with localStorage ('web_tka_progress')
  const toggleSubtopicCompletion = (subtopicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedSubtopics((prev) => {
      const next = new Set(prev);
      if (next.has(subtopicId)) {
        next.delete(subtopicId);
      } else {
        next.add(subtopicId);
      }
      try {
        const map: Record<string, boolean> = {};
        next.forEach((id) => {
          map[id] = true;
        });
        localStorage.setItem('web_tka_progress', JSON.stringify(map));
      } catch (err) {
        console.warn('Failed to save progress to localStorage', err);
      }
      return next;
    });
  };

  // Toggle subtopic selection for drilling
  const toggleSubchapterSelect = (id: string) => {
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

  // Select all subtopics in entire subtest for drilling
  const selectAllSubtest = () => {
    const allIds = (subtest.modules || []).flatMap((m) => m.subtopics.map((s) => s.id));
    setSelectedSubchapters(new Set(allIds));
  };

  const clearAllSubtest = () => {
    setSelectedSubchapters(new Set());
  };

  // Filtered modules based on priority and search query
  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (subtest.modules || []).filter((mod) => {
      // Priority filter
      if (filterPriority === 'High-Yield' && mod.priority !== 'High-Yield') {
        return false;
      }
      if (filterPriority === 'INCOMPLETE') {
        const allDone = mod.subtopics.every((s) => completedSubtopics.has(s.id));
        if (allDone && mod.subtopics.length > 0) return false;
      }

      // Search query
      if (q) {
        const matchesTitle = mod.title.toLowerCase().includes(q);
        const matchesSubtopics = mod.subtopics.some((s) => s.title.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtopics) return false;
      }

      return true;
    });
  }, [subtest.modules, filterPriority, searchQuery, completedSubtopics]);

  // Overall subtest progress
  const totalSubtopics = useMemo(() => {
    return (subtest.modules || []).reduce((acc, m) => acc + m.subtopics.length, 0);
  }, [subtest.modules]);

  const totalCompletedSubtopics = useMemo(() => {
    return (subtest.modules || [])
      .flatMap((m) => m.subtopics)
      .filter((s) => completedSubtopics.has(s.id)).length;
  }, [subtest.modules, completedSubtopics]);

  const overallPercentage = totalSubtopics > 0
    ? Math.round((totalCompletedSubtopics / totalSubtopics) * 100)
    : 0;

  return (
    <div className="w-full pb-28">
      {/* 1. STICKY TOP APP BAR + STICKY MODE SWITCHER */}
      <div className="sticky top-0 z-40 w-full shadow-sm">
        {/* Baris 1: Top App Bar Berwarna Biru Solid */}
        <div className="bg-blue-600 text-white w-full">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3 font-semibold text-lg">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-1.5 -ml-1 rounded-xl text-white hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer flex items-center justify-center"
              aria-label="Kembali ke Beranda"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="font-semibold text-lg text-white truncate">
              {subtest.title || subtest.name}
            </h1>
          </div>
        </div>

        {/* Baris 2: Sticky Segmented Tab Materi & Drilling Soal */}
        <div className="bg-white border-b border-slate-200 w-full px-4 py-2.5">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/90 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onTabChange('materi')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'materi'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📖 Materi & Silabus</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('drilling')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'drilling'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 cursor-pointer transition"
                >
                  Pilih Semua Topik
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Baris 3: Category & Subtest Switcher (TPS vs Literasi) */}
        <div className="bg-slate-50 border-b border-slate-200/80 w-full px-4 py-2">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            {/* Category Switcher Tabs */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg border border-slate-300/70 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('TPS');
                  if (subtest.category !== 'TPS' && onSelectSubtest) {
                    onSelectSubtest('pu');
                  }
                }}
                className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'TPS'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎯 TPS</span>
                <span className="text-[10px] text-slate-400 font-normal">(4 Subtes)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('Literasi');
                  if (subtest.category !== 'Literasi' && onSelectSubtest) {
                    onSelectSubtest('lbi');
                  }
                }}
                className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeCategory === 'Literasi'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📚 Literasi</span>
                <span className="text-[10px] text-slate-400 font-normal">(3 Subtes)</span>
              </button>
            </div>

            {/* Subtest Pills in the active category */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {SYLLABUS_DATA.filter((s) => s.category === activeCategory).map((item) => {
                const isCurrent = item.code.toLowerCase() === subtest.code.toLowerCase();
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onSelectSubtest && onSelectSubtest(item.code.toLowerCase())}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{item.code}</span>
                    <span className="hidden sm:inline font-normal text-[11px] opacity-90">
                      • {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {/* Ad slot */}
        <AdBanner
          slotId={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          routeKey={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          className="mb-4"
        />

        {/* 2. FILTER & SEARCH BAR + OVERALL MASTERY CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 mb-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setFilterPriority('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  filterPriority === 'ALL'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Modul ({subtest.modules?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setFilterPriority('High-Yield')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  filterPriority === 'High-Yield'
                    ? 'bg-amber-500 text-white shadow-xs font-bold'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>
                  High-Yield ({(subtest.modules || []).filter((m) => m.priority === 'High-Yield').length})
                </span>
              </button>
              <button
                type="button"
                onClick={() => setFilterPriority('INCOMPLETE')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  filterPriority === 'INCOMPLETE'
                    ? 'bg-slate-800 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Belum Selesai</span>
              </button>
            </div>

            {/* Real-time Subtopic Keyword Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari subtopik atau materi..."
                className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Overall Subtest Mastery progress info */}
          <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Progress Belajar: <strong>{totalCompletedSubtopics} dari {totalSubtopics} Subtopik Selesai</strong> ({overallPercentage}%)
              </span>
            </div>
            <div className="w-full sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. ACCORDION MODULE CARDS */}
        <div className="space-y-3.5">
          {filteredModules.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
              Tidak ada modul yang cocok dengan filter atau kata kunci "{searchQuery}".
            </div>
          ) : (
            filteredModules.map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);
              const completedInMod = mod.subtopics.filter((s) => completedSubtopics.has(s.id)).length;
              const modTotal = mod.subtopics.length;
              const modPct = modTotal > 0 ? Math.round((completedInMod / modTotal) * 100) : 0;
              const isAllModDone = modTotal > 0 && completedInMod === modTotal;

              return (
                <div
                  key={mod.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs overflow-hidden ${
                    isAllModDone ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200/90'
                  }`}
                >
                  {/* Module Card Header */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Module Number Squircle */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                          isAllModDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {isAllModDone ? <Check className="w-5 h-5 text-emerald-700" /> : `M${modIdx + 1}`}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Modul {modIdx + 1}
                          </span>

                          {/* Priority Badge */}
                          {mod.priority === 'High-Yield' && (
                            <span className="bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 shadow-2xs">
                              <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                              <span>High-Yield</span>
                            </span>
                          )}
                          {mod.priority === 'Core' && (
                            <span className="bg-blue-50 text-blue-900 border border-blue-200 font-semibold px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1">
                              <BookMarked className="w-3 h-3 text-blue-600" />
                              <span>Core</span>
                            </span>
                          )}
                          {mod.priority === 'Standard' && (
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 font-medium px-2 py-0.5 rounded-md text-[11px]">
                              Standard
                            </span>
                          )}

                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{mod.estimatedMinutes} Menit</span>
                          </span>
                        </div>

                        <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {mod.title}
                        </h2>
                      </div>
                    </div>

                    {/* Right side: Progress Bar & Chevron */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-20 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 rounded-full ${
                              isAllModDone ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${modPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 shrink-0">
                          {completedInMod}/{modTotal} Selesai
                        </span>
                      </div>

                      <div className="p-1 rounded-lg text-slate-400">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* 4. INTERACTIVE SUBTOPIC CHECKLIST */}
                  {isOpen && (
                    <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5 animate-in fade-in duration-150">
                      {mod.subtopics.map((sub, sIdx) => {
                        const isDone = completedSubtopics.has(sub.id);
                        const isSelectedForDrill = selectedSubchapters.has(sub.id);

                        return (
                          <div
                            key={sub.id}
                            className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isDone
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : 'bg-white border-slate-200/80 hover:border-blue-200'
                            }`}
                          >
                            {/* Left: Interactive Checkbox + Title */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Completion toggle checkbox (synced to localStorage) */}
                              <button
                                type="button"
                                onClick={(e) => toggleSubtopicCompletion(sub.id, e)}
                                className="p-1 text-slate-400 hover:text-emerald-600 transition cursor-pointer shrink-0 rounded-lg"
                                title={isDone ? 'Tandai belum selesai' : 'Tandai sudah selesai dipelajari'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                                )}
                              </button>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-slate-400">
                                    {modIdx + 1}.{sIdx + 1}
                                  </span>
                                  <span
                                    className={`text-xs sm:text-sm font-semibold leading-snug ${
                                      isDone ? 'text-slate-600 line-through decoration-slate-400' : 'text-slate-900'
                                    }`}
                                  >
                                    {sub.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Action Buttons [ 📖 Baca Materi ] and [ ⚡ Latihan Soal ] */}
                            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                              {activeTab === 'drilling' ? (
                                <button
                                  type="button"
                                  onClick={() => toggleSubchapterSelect(sub.id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                    isSelectedForDrill
                                      ? 'bg-blue-600 text-white shadow-2xs'
                                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  {isSelectedForDrill ? (
                                    <>
                                      <CheckSquare className="w-4 h-4" />
                                      <span>Terpilih</span>
                                    </>
                                  ) : (
                                    <>
                                      <Square className="w-4 h-4" />
                                      <span>Pilih Topik</span>
                                    </>
                                  )}
                                </button>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => onSelectMaterial(sub.id)}
                                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition cursor-pointer flex items-center gap-1 border border-blue-200/80 shadow-2xs active:scale-95"
                                  >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Baca Materi</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onStartDrilling([sub.id], 10, 15)}
                                    className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition cursor-pointer flex items-center gap-1 border border-amber-200/80 shadow-2xs active:scale-95"
                                  >
                                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Latihan Soal</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* STICKY BOTTOM CONTROL BAR FOR DRILLING */}
      {activeTab === 'drilling' && selectedSubchapters.size > 0 && (
        <aside
          aria-label="Konfigurasi Sesi Latihan Soal"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-200"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {selectedSubchapters.size}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {selectedSubchapters.size} Subtopik Terpilih
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Lintas Modul {subtest.code}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={clearAllSubtest}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 underline md:hidden"
              >
                Batal Semua
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto text-xs">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                {[10, 15, 20, 30].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                      questionCount === count
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {count} Soal
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTimerMinutes(null)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
                    timerMinutes === null
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Tanpa batasan waktu"
                >
                  <span>Santai</span>
                </button>
                {[15, 20, 30].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimerMinutes(mins)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
                      timerMinutes === mins
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{mins}m</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onStartDrilling(
                  Array.from(selectedSubchapters),
                  questionCount,
                  timerMinutes
                )
              }
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Mulai Drilling Sekarang</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
