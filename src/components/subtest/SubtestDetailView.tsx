import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Clock,
  Play,
  CheckCircle2,
  Hash,
  Zap,
  CircleDot,
  Scale,
  TrendingUp,
  GitFork,
  ListOrdered,
  Grid,
  Compass,
  Box,
  BarChart2,
  Dice5,
  FileCheck2,
  GitCommit,
  Binary,
  LayoutList,
  Sparkles,
  Calculator,
  PieChart,
  BookOpen,
  Tag,
  Layers,
  AlignLeft,
  GitMerge,
  FileText,
  Feather,
  Key,
  Type,
  PenLine,
  HelpCircle,
  SpellCheck,
  Link2,
  Edit3,
  ListPlus,
  Search,
  Bookmark,
  ShieldAlert,
  Microscope,
  Users,
  BookOpenCheck,
  Target,
  Languages,
  Sliders,
  MessageSquare,
  FileSpreadsheet,
  Coins,
  Activity,
  LineChart,
  BarChart3,
  Book,
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

function getChapterIcon(code: string, chapterNum: number): React.ReactNode {
  const c = code.toUpperCase();
  if (c === 'PK') {
    switch (chapterNum) {
      case 1: return <Hash className="w-6 h-6 text-sky-700" />;
      case 2: return <Zap className="w-6 h-6 text-sky-700" />;
      case 3: return <CircleDot className="w-6 h-6 text-sky-700" />;
      case 4: return <Scale className="w-6 h-6 text-sky-700" />;
      case 5: return <TrendingUp className="w-6 h-6 text-sky-700" />;
      case 6: return <GitFork className="w-6 h-6 text-sky-700" />;
      case 7: return <ListOrdered className="w-6 h-6 text-sky-700" />;
      case 8: return <Grid className="w-6 h-6 text-sky-700" />;
      case 9: return <Compass className="w-6 h-6 text-sky-700" />;
      case 10: return <Box className="w-6 h-6 text-sky-700" />;
      case 11: return <BarChart2 className="w-6 h-6 text-sky-700" />;
      case 12: return <Dice5 className="w-6 h-6 text-sky-700" />;
      default: return <Calculator className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'PU') {
    switch (chapterNum) {
      case 1: return <FileCheck2 className="w-6 h-6 text-sky-700" />;
      case 2: return <GitCommit className="w-6 h-6 text-sky-700" />;
      case 3: return <Scale className="w-6 h-6 text-sky-700" />;
      case 4: return <Binary className="w-6 h-6 text-sky-700" />;
      case 5: return <CircleDot className="w-6 h-6 text-sky-700" />;
      case 6: return <LayoutList className="w-6 h-6 text-sky-700" />;
      case 7: return <Sparkles className="w-6 h-6 text-sky-700" />;
      case 8: return <Calculator className="w-6 h-6 text-sky-700" />;
      case 9: return <PieChart className="w-6 h-6 text-sky-700" />;
      default: return <Sparkles className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'PPU') {
    switch (chapterNum) {
      case 1: return <BookOpen className="w-6 h-6 text-sky-700" />;
      case 2: return <Tag className="w-6 h-6 text-sky-700" />;
      case 3: return <Layers className="w-6 h-6 text-sky-700" />;
      case 4: return <AlignLeft className="w-6 h-6 text-sky-700" />;
      case 5: return <GitMerge className="w-6 h-6 text-sky-700" />;
      case 6: return <FileText className="w-6 h-6 text-sky-700" />;
      case 7: return <Feather className="w-6 h-6 text-sky-700" />;
      case 8: return <Key className="w-6 h-6 text-sky-700" />;
      default: return <BookOpen className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'PBM') {
    switch (chapterNum) {
      case 1: return <Type className="w-6 h-6 text-sky-700" />;
      case 2: return <PenLine className="w-6 h-6 text-sky-700" />;
      case 3: return <HelpCircle className="w-6 h-6 text-sky-700" />;
      case 4: return <SpellCheck className="w-6 h-6 text-sky-700" />;
      case 5: return <Link2 className="w-6 h-6 text-sky-700" />;
      case 6: return <CheckCircle2 className="w-6 h-6 text-sky-700" />;
      case 7: return <Edit3 className="w-6 h-6 text-sky-700" />;
      case 8: return <ListPlus className="w-6 h-6 text-sky-700" />;
      default: return <Edit3 className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'LBI') {
    switch (chapterNum) {
      case 1: return <Search className="w-6 h-6 text-sky-700" />;
      case 2: return <Bookmark className="w-6 h-6 text-sky-700" />;
      case 3: return <Compass className="w-6 h-6 text-sky-700" />;
      case 4: return <ShieldAlert className="w-6 h-6 text-sky-700" />;
      case 5: return <Microscope className="w-6 h-6 text-sky-700" />;
      case 6: return <Users className="w-6 h-6 text-sky-700" />;
      case 7: return <BookOpenCheck className="w-6 h-6 text-sky-700" />;
      default: return <Book className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'LBE') {
    switch (chapterNum) {
      case 1: return <Target className="w-6 h-6 text-sky-700" />;
      case 2: return <CheckSquare className="w-6 h-6 text-sky-700" />;
      case 3: return <Languages className="w-6 h-6 text-sky-700" />;
      case 4: return <HelpCircle className="w-6 h-6 text-sky-700" />;
      case 5: return <Sliders className="w-6 h-6 text-sky-700" />;
      case 6: return <MessageSquare className="w-6 h-6 text-sky-700" />;
      case 7: return <FileSpreadsheet className="w-6 h-6 text-sky-700" />;
      default: return <BookOpen className="w-6 h-6 text-sky-700" />;
    }
  }
  if (c === 'PM') {
    switch (chapterNum) {
      case 1: return <Coins className="w-6 h-6 text-sky-700" />;
      case 2: return <Activity className="w-6 h-6 text-sky-700" />;
      case 3: return <TrendingUp className="w-6 h-6 text-sky-700" />;
      case 4: return <Calculator className="w-6 h-6 text-sky-700" />;
      case 5: return <LineChart className="w-6 h-6 text-sky-700" />;
      case 6: return <Compass className="w-6 h-6 text-sky-700" />;
      case 7: return <Box className="w-6 h-6 text-sky-700" />;
      case 8: return <BarChart3 className="w-6 h-6 text-sky-700" />;
      default: return <Calculator className="w-6 h-6 text-sky-700" />;
    }
  }
  return <BookOpen className="w-6 h-6 text-sky-700" />;
}

export const SubtestDetailView: React.FC<SubtestDetailViewProps> = ({
  subtest,
  activeTab,
  onTabChange,
  onBackToHome,
  onSelectMaterial,
  onStartDrilling,
}) => {
  // Accordion state: Set of open chapter numbers (first chapter open by default for clean discoverability)
  const [openChapters, setOpenChapters] = useState<Set<number>>(
    new Set([1])
  );

  // Multi-select state for drilling: Set of selected subchapter IDs
  const [selectedSubchapters, setSelectedSubchapters] = useState<Set<string>>(
    new Set()
  );

  // Drilling configuration states
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(15);

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

  return (
    <div className="w-full pb-28">
      {/* 2. STICKY TOP BAR + STICKY MODE SWITCHER (position: sticky; top: 0; z-index: 40) */}
      <div className="sticky top-0 z-40 w-full shadow-sm">
        {/* Baris 1: Top App Bar Berwarna Biru Solid seperti aplikasi native */}
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
              {subtest.name}
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
                <span>📖 Materi</span>
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
                  Pilih Semua Bab
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
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {/* Ad slot for Subtest Detail */}
        <AdBanner
          slotId={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          routeKey={`subtest-${subtest.code.toLowerCase()}-${activeTab}`}
          className="mb-4"
        />

        {/* 4. DAFTAR BAB TOPIK SPESIFIK */}
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
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
              >
                {/* Chapter Row Header */}
                <div
                  onClick={() => toggleChapter(chapter.chapter_num)}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-white hover:bg-slate-50/80 transition cursor-pointer select-none"
                >
                  {/* Left: Ikon Kotak Berwarna (w-12 h-12 rounded-xl bg-sky-100) bergambar simbol topik */}
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0 shadow-2xs">
                    {getChapterIcon(subtest.code, chapter.chapter_num)}
                  </div>

                  {/* Middle: Nama Bab di tengah */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h2 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                      {chapter.chapter_title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bab {chapter.chapter_num} • {chapter.subchapters.length} Sub-bab
                      {activeTab === 'drilling' && selectedInChapterCount > 0 && (
                        <span className="ml-1.5 text-blue-700 font-bold">
                          • {selectedInChapterCount} terpilih
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Right: Indikator panah / persentase / checkbox di kanan */}
                  <div className="flex items-center gap-2 shrink-0">
                    {activeTab === 'drilling' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapterSelectAll(chapter.chapter_num);
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                          isAllChapterSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isAllChapterSelected ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Semua Terpilih</span>
                          </>
                        ) : (
                          <span>Pilih Semua</span>
                        )}
                      </button>
                    )}

                    <div className="p-1 rounded-lg text-slate-400">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-500 transition-transform" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Subchapters List (Expand/Collapse 2 sampai 4 Sub-bab spesifik) */}
                {isOpen && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 border-t border-slate-100 bg-slate-50/40 space-y-2 animate-in fade-in duration-150">
                    {chapter.subchapters.map((sub) => {
                      const isSelected = selectedSubchapters.has(sub.id);

                      if (activeTab === 'materi') {
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => onSelectMaterial(sub.id)}
                            className="w-full text-left p-3 rounded-xl bg-white hover:bg-sky-50/70 border border-slate-200/80 hover:border-sky-300 flex items-center justify-between group transition cursor-pointer shadow-2xs"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                                {sub.subchapter_num}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-900 leading-snug">
                                {sub.title}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform shrink-0 flex items-center gap-1">
                              <span>Baca Materi</span>
                              <span>→</span>
                            </span>
                          </button>
                        );
                      }

                      // Drilling tab: Checkbox row
                      return (
                        <div
                          key={sub.id}
                          onClick={() => toggleSubchapterSelect(sub.id)}
                          className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-200 text-blue-950 font-medium shadow-2xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="shrink-0">
                              {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-blue-600" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                              {sub.subchapter_num}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold leading-snug">
                              {sub.title}
                            </span>
                          </div>

                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                              isSelected
                                ? 'bg-blue-600 text-white'
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
                    {selectedSubchapters.size} Sub-bab Terpilih
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Lintas Bab {subtest.code}
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
