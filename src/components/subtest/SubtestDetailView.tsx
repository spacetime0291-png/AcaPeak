import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  CheckSquare,
  Square,
  Clock,
  Play,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import type { SyllabusSubtestItem } from '../../types/material';
import { AdBanner } from '../content/AdBanner';

interface SubtestDetailViewProps {
  subtest: SyllabusSubtestItem;
  activeTab: 'materi' | 'drilling';
  onTabChange: (tab: 'materi' | 'drilling') => void;
  onBackToHome: () => void;
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
  // Accordion state: Set of open chapter numbers (all open by default for immediate discoverability)
  const [openChapters, setOpenChapters] = useState<Set<number>>(
    new Set(subtest.chapters.map((c) => c.chapter_num))
  );

  // Multi-select state for drilling: Set of selected subchapter IDs
  const [selectedSubchapters, setSelectedSubchapters] = useState<Set<string>>(
    new Set()
  );

  // Drilling configuration states
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(15); // null = Santai / Tanpa timer

  // Toggle single chapter accordion
  const toggleChapter = (chapterNum: number) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterNum)) {
        next.delete(chapterNum);
      } else {
        next.add(chapterNum);
      }
      return next;
    });
  };

  // Toggle all chapters
  const toggleAllChapters = () => {
    if (openChapters.size === subtest.chapters.length) {
      setOpenChapters(new Set());
    } else {
      setOpenChapters(new Set(subtest.chapters.map((c) => c.chapter_num)));
    }
  };

  // Toggle individual subchapter in multi-select
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

  // Select / Deselect all subchapters in a specific chapter
  const toggleChapterSelectAll = (chapterNum: number) => {
    const chapter = subtest.chapters.find((c) => c.chapter_num === chapterNum);
    if (!chapter) return;

    const chapterSubIds = chapter.subchapters.map((s) => s.id);
    const allSelected = chapterSubIds.every((id) => selectedSubchapters.has(id));

    setSelectedSubchapters((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        chapterSubIds.forEach((id) => next.delete(id));
      } else {
        chapterSubIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  // Select all subchapters in the entire subtest
  const selectAllSubtest = () => {
    const allIds = subtest.chapters.flatMap((c) => c.subchapters.map((s) => s.id));
    setSelectedSubchapters(new Set(allIds));
  };

  const clearAllSubtest = () => {
    setSelectedSubchapters(new Set());
  };

  const totalTopicsCount = subtest.chapters.reduce(
    (acc, c) => acc + c.subchapters.length,
    0
  );

  return (
    <div className="w-full pb-28">
      {/* 1. TOP BAR NAVIGASI: Tombol Back, Judul Subtes, & 2 Tab Segmented Control */}
      <div className="mb-4 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Kembali ke Beranda"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-600" />
              <span>Beranda</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-indigo-100 text-indigo-800">
                  {subtest.code}
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {subtest.name}
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {subtest.chapters.length} Bab • {totalTopicsCount} Sub-materi Terstandar
              </p>
            </div>
          </div>

          {/* 2 Tab Segmented Control: [ 📖 Materi ] vs [ ⚡ Drilling Soal ] */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => onTabChange('materi')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === 'materi'
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>📖 Materi</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('drilling')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeTab === 'drilling'
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>⚡ Drilling Soal</span>
            </button>
          </div>
        </div>

        {/* Tab Context Brief Banner */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            {activeTab === 'materi' ? (
              <>
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  Klik sub-bab untuk membuka <strong>Buku Materi & Playbook Akademis</strong>.
                </span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Centang sub-bab yang ingin dilatih, lalu atur jumlah soal & timer di bilah bawah.
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {activeTab === 'drilling' && (
              <>
                <button
                  type="button"
                  onClick={selectAllSubtest}
                  className="px-2 py-1 rounded-md text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50 border border-indigo-200 cursor-pointer"
                >
                  Pilih Semua Topik
                </button>
                {selectedSubchapters.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAllSubtest}
                    className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-500 hover:bg-slate-200 cursor-pointer"
                  >
                    Batal
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              onClick={toggleAllChapters}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline ml-1 cursor-pointer"
            >
              {openChapters.size === subtest.chapters.length ? 'Tutup Semua Bab' : 'Buka Semua Bab'}
            </button>
          </div>
        </div>
      </div>

      {/* Ad slot for Subtest Detail */}
      <AdBanner
        slotId={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
        routeKey={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
        className="mb-4"
      />

      {/* 2. STRUKTUR ACCORDION BAB & SUB-BAB */}
      <div className="space-y-3">
        {subtest.chapters.map((chapter) => {
          const isOpen = openChapters.has(chapter.chapter_num);
          const chapterSubIds = chapter.subchapters.map((s) => s.id);
          const selectedInChapterCount = chapterSubIds.filter((id) =>
            selectedSubchapters.has(id)
          ).length;
          const isAllChapterSelected =
            chapterSubIds.length > 0 &&
            selectedInChapterCount === chapterSubIds.length;

          return (
            <div
              key={chapter.chapter_num}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
            >
              {/* Chapter Accordion Header */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/60 transition select-none">
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.chapter_num)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {chapter.chapter_num}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      Bab {chapter.chapter_num}: {chapter.chapter_title}
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {chapter.subchapters.length} Sub-bab
                      {activeTab === 'drilling' && selectedInChapterCount > 0 && (
                        <span className="ml-1.5 text-indigo-700 font-bold">
                          • {selectedInChapterCount} terpilih
                        </span>
                      )}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  {/* "Pilih Semua" button in chapter header (Active when Drilling tab) */}
                  {activeTab === 'drilling' && (
                    <button
                      type="button"
                      onClick={() => toggleChapterSelectAll(chapter.chapter_num)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition cursor-pointer flex items-center gap-1.5 ${
                        isAllChapterSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {isAllChapterSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Semua Terpilih</span>
                        </>
                      ) : (
                        <span>Pilih Semua</span>
                      )}
                    </button>
                  )}

                  {/* Accordion expand/collapse chevron */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.chapter_num)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
                    aria-label={isOpen ? 'Tutup Bab' : 'Buka Bab'}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Subchapters List (Collapsible Accordion Body) */}
              {isOpen && (
                <div className="p-2 sm:p-3 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-150">
                  {chapter.subchapters.map((sub) => {
                    const isSelected = selectedSubchapters.has(sub.id);

                    if (activeTab === 'materi') {
                      // Tab Materi: Clickable to PDF-Style Reader
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => onSelectMaterial(sub.id)}
                          className="w-full text-left p-3 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 flex items-center justify-between group transition cursor-pointer"
                        >
                          <div className="flex items-start gap-3 min-w-0 pr-2">
                            <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                              {sub.subchapter_num}
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-950 leading-snug">
                                {sub.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                  <Sparkles className="w-3 h-3" />
                                  {sub.variations_count ? `${sub.variations_count} Variasi Soal` : 'Playbook & Variasi'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0 flex items-center gap-1">
                            <span>Baca Materi</span>
                            <span>→</span>
                          </span>
                        </button>
                      );
                    }

                    // Tab Drilling: Multi-select Checkbox Row
                    return (
                      <div
                        key={sub.id}
                        onClick={() => toggleSubchapterSelect(sub.id)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950 font-medium shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-2">
                          <div className="mt-0.5 shrink-0">
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-indigo-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold font-mono text-slate-400">
                                {sub.subchapter_num}
                              </span>
                              <h3 className="text-xs sm:text-sm font-semibold leading-snug">
                                {sub.title}
                              </h3>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {sub.variations_count || 4} bank variasi soal tersedia
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {isSelected ? 'Terpilih' : 'Pilih'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. STICKY BOTTOM CONTROL BAR (Appears when activeTab === 'drilling' and >= 1 sub-bab selected) */}
      {activeTab === 'drilling' && selectedSubchapters.size > 0 && (
        <aside
          aria-label="Konfigurasi Sesi Latihan Soal"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-200"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Left: Selected Topics Count */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {selectedSubchapters.size}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {selectedSubchapters.size} Sub-bab Terpilih
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Lintas Bab {subtest.code}
                  </p>
                </div>
              </div>

              {/* Reset selection link */}
              <button
                type="button"
                onClick={clearAllSubtest}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 underline md:hidden"
              >
                Batal Semua
              </button>
            </div>

            {/* Center: Question Count & Timer Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto text-xs">
              {/* Jumlah Soal Pills: 10, 15, 20, 30 */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                {[10, 15, 20, 30].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                      questionCount === count
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {count} Soal
                  </button>
                ))}
              </div>

              {/* Timer Mode Pills: Santai, 15m, 20m, 30m */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTimerMinutes(null)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
                    timerMinutes === null
                      ? 'bg-white text-indigo-700 shadow-2xs'
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
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{mins}m</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Primary Action Button */}
            <button
              type="button"
              onClick={() =>
                onStartDrilling(
                  Array.from(selectedSubchapters),
                  questionCount,
                  timerMinutes
                )
              }
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
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
