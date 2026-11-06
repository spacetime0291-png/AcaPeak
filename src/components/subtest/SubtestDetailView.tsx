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

  // Squircle background color per subtest
  const squircleBg = (() => {
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
  })();

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

            {/* Subtest Information Badge */}
            {totalSubtopics > 0 && (
              <div className="flex items-center gap-1.5 bg-blue-700/60 border border-blue-400/40 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
                <span className="text-white font-bold">{subtest.modules?.length || 0} Bab</span>
                <span className="text-blue-200 text-[11px]">• {totalSubtopics} Sub-bab</span>
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
        {/* ========================================================
            TAB 1: MATERI (Tanpa Centang, Pakai Icon, Desain Bersih)
            ======================================================== */}
        {activeTab === 'materi' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100/90 divide-y divide-slate-100 overflow-hidden">
            {(subtest.modules || []).map((mod, modIdx) => {
              const isOpen = openModules.has(mod.id);

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
                      </div>
                    </div>

                    {/* Right: Smooth Rotating Chevron */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ease-out ${
                            isOpen ? 'rotate-180 text-blue-600' : 'rotate-0 text-slate-400'
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
                      <div className="bg-slate-50/70 px-3 sm:px-6 py-2 border-t border-slate-100 space-y-1.5 animate-subtopic-slide">
                        {mod.subtopics.map((sub, sIdx) => {
                          return (
                            <div
                              key={sub.id}
                              onClick={() => onSelectMaterial(sub.id)}
                              style={{ animationDelay: `${sIdx * 30}ms` }}
                              className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs hover:shadow-xs"
                            >
                              {/* Left: Icon Buku (Menggantikan 1.1) + Judul Penuh */}
                              <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1 py-0.5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shrink-0 group-hover/sub:bg-blue-600 group-hover/sub:text-white transition-colors shadow-2xs mt-0.5 sm:mt-0">
                                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>

                                <span className="text-xs sm:text-sm font-medium leading-snug break-words whitespace-normal flex-1 text-slate-800 group-hover/sub:text-blue-700">
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            TAB 2: DRILLING SOAL (Desain Bersih, Tanpa Centang Kiri, Tanpa Teks Terpilih, Visual Warna)
            ======================================================== */}
        {activeTab === 'drilling' && (
          <div className="space-y-4">
            {/* Quick Header Bar */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  Pilih Materi Latihan
                </h3>
                <p className="text-xs text-slate-500">
                  Ketuk sub-bab yang ingin diujikan dalam sesi latihan ini.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 cursor-pointer transition"
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
            </div>

            {/* Accordion identical to Materi view */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100/90 divide-y divide-slate-100 overflow-hidden">
              {(subtest.modules || []).map((mod, modIdx) => {
                const isOpen = openModules.has(mod.id);
                const selectedInMod = mod.subtopics.filter((s) => selectedSubchapters.has(s.id)).length;
                const allSelectedInMod = mod.subtopics.length > 0 && selectedInMod === mod.subtopics.length;

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

                      {/* Middle: Title & Meta Info (Badge 2 terpilih dihilangkan agar tidak penuh) */}
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                          Bab {modIdx + 1}: {mod.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-medium">
                          <span>{mod.subtopics.length} Sub-bab</span>
                          <span>•</span>
                          <span>~{mod.estimatedMinutes} mnt</span>
                        </div>
                      </div>

                      {/* Right: Quick Select / Deselect Module & Chevron */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            allSelectedInMod
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'text-blue-600 hover:bg-blue-50 border-blue-200'
                          }`}
                        >
                          {allSelectedInMod ? 'Batal' : 'Pilih'}
                        </button>

                        <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ease-out ${
                              isOpen ? 'rotate-180 text-blue-600' : 'rotate-0 text-slate-400'
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
                        <div className="bg-slate-50/70 px-3 sm:px-6 py-2 border-t border-slate-100 space-y-1.5 animate-subtopic-slide">
                          {mod.subtopics.map((sub, sIdx) => {
                            const isSelected = selectedSubchapters.has(sub.id);

                            return (
                              <div
                                key={sub.id}
                                onClick={() => toggleSubchapterSelect(sub.id)}
                                style={{ animationDelay: `${sIdx * 30}ms` }}
                                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-200 active:scale-[0.985] cursor-pointer group/sub shadow-2xs border ${
                                  isSelected
                                    ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                                    : 'bg-white hover:bg-blue-50/50 border-slate-100 hover:border-blue-200'
                                }`}
                              >
                                {/* Left: Icon Zap + Judul Lengkap */}
                                <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1 py-0.5">
                                  {/* Icon Sub-bab (Visual warna menyesuaikan status terpilih) */}
                                  <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs border mt-0.5 sm:mt-0 ${
                                      isSelected
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-blue-50 text-blue-600 border-blue-100/80 group-hover/sub:bg-blue-600 group-hover/sub:text-white'
                                    }`}
                                  >
                                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </div>

                                  {/* Judul Sub-bab Tanpa Truncate */}
                                  <span
                                    className={`text-xs sm:text-sm font-medium leading-snug break-words whitespace-normal flex-1 ${
                                      isSelected
                                        ? 'text-blue-900 font-semibold'
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

      {/* STICKY BOTTOM BAR FOR DRILLING SESSION (Only in Drilling Tab) */}
      {activeTab === 'drilling' && (
        <aside
          aria-label="Konfigurasi Sesi Drilling"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-200"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Selected count info */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  {selectedSubchapters.size}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {selectedSubchapters.size} Sub-bab Terpilih
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {selectedSubchapters.size === 0
                      ? 'Pilih minimal 1 sub-bab di atas'
                      : 'Siap untuk drilling soal'}
                  </div>
                </div>
              </div>

              {selectedSubchapters.size === 0 && (
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer sm:hidden"
                >
                  Pilih Semua
                </button>
              )}
            </div>

            {/* Right: Minimalist Steppers (+1/-1 Fleksibel) with Minimalist Nonaktifkan Timer & Start Button */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              {/* Jumlah Soal Stepper (+1 / -1) */}
              <div
                className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/80 shadow-2xs"
                title="Jumlah Soal (+1 / -1)"
              >
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.max(1, prev - 1))}
                  disabled={questionCount <= 1}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer font-bold disabled:opacity-40 shadow-2xs"
                  aria-label="Kurangi 1 Soal"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="px-2 min-w-[46px] text-center select-none">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {questionCount}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-none">
                    Soal
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQuestionCount((prev) => Math.min(100, prev + 1))}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer font-bold shadow-2xs"
                  aria-label="Tambah 1 Soal"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Batas Waktu Stepper dengan Opsi Nonaktifkan Timer yang Minimalis & Hemat Ruang */}
              {timerMinutes !== null ? (
                <div
                  className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/80 shadow-2xs"
                  title="Batas Waktu Pengerjaan (+1 / -1 Menit)"
                >
                  <button
                    type="button"
                    onClick={() => setTimerMinutes((prev) => Math.max(1, (prev ?? 15) - 1))}
                    disabled={(timerMinutes ?? 15) <= 1}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer font-bold disabled:opacity-40 shadow-2xs"
                    aria-label="Kurangi 1 Menit"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="px-1.5 min-w-[42px] text-center select-none">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {timerMinutes}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-none">
                      Menit
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTimerMinutes((prev) => Math.min(180, (prev ?? 15) + 1))}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer font-bold shadow-2xs"
                    aria-label="Tambah 1 Menit"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  {/* Tombol Minimalis Nonaktifkan Timer */}
                  <button
                    type="button"
                    onClick={() => setTimerMinutes(null)}
                    className="ml-0.5 px-1.5 py-1 text-[10px] font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 rounded-md transition cursor-pointer"
                    title="Nonaktifkan Timer"
                  >
                    Off
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimerMinutes(15)}
                  className="h-9 px-3 flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 rounded-xl text-slate-600 hover:text-blue-700 transition cursor-pointer shadow-2xs select-none"
                  title="Klik untuk mengaktifkan timer"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold">Tanpa Timer</span>
                </button>
              )}

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
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 ${
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
