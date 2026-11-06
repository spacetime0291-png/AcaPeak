import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  CheckSquare,
  Square,
  Flame,
} from 'lucide-react';
import type { SubtestItem } from '../../types/material';
import { AdBanner } from '../content/AdBanner';
import { ModuleIcon } from './ModuleIcon';

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
  onSelectMaterial,
  onStartDrilling,
}) => {
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

  // Toggle subtopic completion state & sync with localStorage
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

  // Squircle background color per subtest
  const squircleBg = useMemo(() => {
    switch (subtest.code.toUpperCase()) {
      case 'PU':
        return 'bg-indigo-100';
      case 'PPU':
        return 'bg-sky-100';
      case 'PBM':
        return 'bg-rose-100';
      case 'PK':
        return 'bg-sky-100';
      case 'LBI':
        return 'bg-rose-100';
      case 'LBE':
        return 'bg-purple-100';
      case 'PM':
        return 'bg-emerald-100';
      default:
        return 'bg-sky-100';
    }
  }, [subtest.code]);

  return (
    <div className="w-full pb-28">
      {/* 1. STICKY TOP APP BAR (Native App Feel) */}
      <div className="sticky top-0 z-40 w-full shadow-xs">
        {/* Baris 1: Top Bar Berwarna Biru Solid */}
        <div className="bg-blue-600 text-white w-full">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={onBackToHome}
                className="p-1.5 -ml-1 rounded-xl text-white hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Kembali ke Beranda"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="font-bold text-base sm:text-lg text-white truncate">
                {subtest.title || subtest.name}
              </h1>
            </div>

            {/* Quick Progress Badge */}
            {totalSubtopics > 0 && (
              <div className="flex items-center gap-1.5 bg-blue-700/60 border border-blue-400/40 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
                <span className="text-emerald-300 font-bold">{overallPercentage}%</span>
                <span className="text-blue-100 text-[11px] hidden sm:inline">Selesai</span>
              </div>
            )}
          </div>
        </div>

        {/* Baris 2: Sticky Segmented Tab (Materi vs Drilling Soal) */}
        <div className="bg-white border-b border-slate-200/90 w-full px-3 sm:px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/90 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onTabChange('materi')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 sm:px-7 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'materi'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📖 Materi</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('drilling')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 sm:px-7 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
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
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 cursor-pointer transition"
                >
                  Pilih Semua
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-3 sm:py-5">
        {/* Ad slot */}
        <AdBanner
          slotId={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          routeKey={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          className="mb-3"
        />

        {/* ========================================================
            TAB 1: MATERI (Bersih, Simpel, Tanpa Drilling, Gaya Ruangbelajar)
            ======================================================== */}
        {activeTab === 'materi' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100/90 divide-y divide-slate-100 overflow-hidden">
            {(subtest.modules || []).map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);
              const completedInMod = mod.subtopics.filter((s) => completedSubtopics.has(s.id)).length;
              const modTotal = mod.subtopics.length;
              const modPct = modTotal > 0 ? Math.round((completedInMod / modTotal) * 100) : 0;
              const isAllDone = modTotal > 0 && completedInMod === modTotal;

              return (
                <div key={mod.id} className="transition-colors">
                  {/* Module Header Row */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition cursor-pointer select-none group"
                  >
                    {/* Left: Colorful Illustrated Squircle Icon */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${squircleBg} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <ModuleIcon moduleId={mod.id} className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    {/* Middle: Title & Meta Info */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                        Bab {modIdx + 1}: {mod.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-medium">
                        <span>{mod.subtopics.length} Sub-bab</span>
                        <span>•</span>
                        <span>~{mod.estimatedMinutes} mnt</span>
                        {mod.priority === 'High-Yield' && (
                          <span className="bg-amber-50 text-amber-800 border border-amber-200/80 font-bold px-1.5 py-0.2 rounded text-[10px] flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            <span>High-Yield</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Progress Indicator (e.g. 0% in green) & Chevron */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs sm:text-sm font-bold font-mono ${
                            isAllDone ? 'text-emerald-600' : 'text-emerald-500'
                          }`}
                        >
                          {modPct}%
                        </span>
                        <div className="w-12 sm:w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isAllDone ? 'bg-emerald-500' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${modPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sub-bab List: Clean, Indented, Directly Opens Material */}
                  {isOpen && (
                    <div className="bg-slate-50/70 px-3 sm:px-6 py-2 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-150">
                      {mod.subtopics.map((sub, sIdx) => {
                        const isDone = completedSubtopics.has(sub.id);

                        return (
                          <div
                            key={sub.id}
                            onClick={() => onSelectMaterial(sub.id)}
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition cursor-pointer group/sub shadow-2xs"
                          >
                            {/* Left: Completion Toggle Checkbox + Title */}
                            <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1 py-0.5">
                              <button
                                type="button"
                                onClick={(e) => toggleSubtopicCompletion(sub.id, e)}
                                className="p-0.5 text-slate-400 hover:text-emerald-600 transition cursor-pointer shrink-0 rounded-lg mt-0.5 sm:mt-0"
                                title={isDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                                aria-label="Tandai Selesai"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                                )}
                              </button>

                              <span className="text-xs font-mono font-bold text-slate-400 shrink-0 mt-0.5 sm:mt-0">
                                {modIdx + 1}.{sIdx + 1}
                              </span>

                              <span
                                className={`text-xs sm:text-sm font-medium leading-snug break-words whitespace-normal flex-1 ${
                                  isDone
                                    ? 'text-slate-500 line-through decoration-slate-300'
                                    : 'text-slate-800 group-hover/sub:text-blue-700'
                                }`}
                              >
                                {sub.title}
                              </span>
                            </div>

                            {/* Right: Clean Read Action */}
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 shrink-0 ml-2 group-hover/sub:translate-x-0.5 transition-transform">
                              <span className="hidden sm:inline">Baca</span>
                              <ChevronRight className="w-4 h-4 text-blue-500" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            TAB 2: DRILLING SOAL (Dedicated Practice Test Interface)
            ======================================================== */}
        {activeTab === 'drilling' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Pilih Bab untuk Latihan Soal
                  </h3>
                  <p className="text-xs text-slate-500">
                    Centang modul yang ingin diujikan dalam sesi drilling ini.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllSubtest}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Pilih Semua
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>

              {/* Subtopic Multi-Select List */}
              <div className="space-y-2">
                {(subtest.modules || []).map((mod, modIdx) => (
                  <div key={mod.id} className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                    <div className="font-bold text-xs text-slate-700 mb-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
                        {modIdx + 1}
                      </span>
                      <span>{mod.title}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {mod.subtopics.map((sub) => {
                        const isSelected = selectedSubchapters.has(sub.id);
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => toggleSubchapterSelect(sub.id, e)}
                            className={`flex items-start gap-2 p-2 rounded-lg text-left text-xs transition cursor-pointer border ${
                              isSelected
                                ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                            )}
                            <span className="break-words whitespace-normal flex-1 leading-snug">{sub.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM BAR FOR DRILLING SESSION (Only in Drilling Tab) */}
      {activeTab === 'drilling' && (
        <aside
          aria-label="Konfigurasi Sesi Drilling"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-200"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {selectedSubchapters.size}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {selectedSubchapters.size} Topik Terpilih
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {selectedSubchapters.size === 0
                      ? 'Pilih minimal 1 topik di atas'
                      : 'Siap untuk drilling soal'}
                  </div>
                </div>
              </div>

              {selectedSubchapters.size === 0 && (
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer md:hidden"
                >
                  Pilih Semua
                </button>
              )}
            </div>

            {/* Controls: Questions & Timer + Start Button */}
            <div className="flex items-center justify-between md:justify-end gap-2.5 w-full md:w-auto">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer"
                  aria-label="Jumlah Soal"
                >
                  <option value={5}>5 Soal</option>
                  <option value={10}>10 Soal</option>
                  <option value={15}>15 Soal</option>
                  <option value={20}>20 Soal</option>
                </select>
                <span className="text-slate-300">|</span>
                <select
                  value={timerMinutes ?? 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setTimerMinutes(v === 0 ? null : v);
                  }}
                  className="bg-transparent text-xs font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer"
                  aria-label="Batas Waktu"
                >
                  <option value={10}>10 Menit</option>
                  <option value={15}>15 Menit</option>
                  <option value={20}>20 Menit</option>
                  <option value={0}>Tanpa Waktu</option>
                </select>
              </div>

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
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  selectedSubchapters.size > 0
                    ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white cursor-pointer shadow-blue-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Mulai Drilling</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
