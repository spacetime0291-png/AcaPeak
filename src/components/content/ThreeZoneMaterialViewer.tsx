import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Target,
  Sparkles,
  HelpCircle,
  Flame,
  Award,
} from 'lucide-react';
import type {
  Material,
  ThreeZoneMaterial,
  VariasiInti,
  SoalUjiPemahaman,
} from '../../types/material';
import {
  isSubchapterCompleted,
  toggleSubchapterCompleted,
} from '../../lib/contentLoader';

const KATEX_REHYPE_PLUGINS = [rehypeKatex as any];

interface ThreeZoneMaterialViewerProps {
  material: Material;
  theme?: 'light' | 'dark';
  onBackToSubtest: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
}

export const ThreeZoneMaterialViewer: React.FC<ThreeZoneMaterialViewerProps> = ({
  material,
  onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
}) => {
  const { metadata } = material;

  // Extract 3 zones with fallback
  const rawData = material as unknown as Partial<ThreeZoneMaterial>;
  const zona1 = rawData.zona_1_peta_taktis;
  const variasiList: VariasiInti[] = rawData.zona_2_variasi_inti || [];
  const soalList: SoalUjiPemahaman[] = rawData.zona_3_uji_pemahaman || [];

  // State: Active tab in Zona 2
  const [activeVariasiIndex, setActiveVariasiIndex] = useState<number>(0);

  // State: Exam Hook (Interactive Quiz in Zona 1)
  const [examHookAnswer, setExamHookAnswer] = useState<number | null>(null);

  // State: User answers in Zona 3 { [nomor_soal]: selectedOptionKey }
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  // State: Open Accordions for Pembahasan in Zona 3 { [nomor_soal]: boolean }
  const [openPembahasan, setOpenPembahasan] = useState<Record<number, boolean>>({});

  // State: Learning progress completion status
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset tab and answers when material changes
  useEffect(() => {
    setActiveVariasiIndex(0);
    setExamHookAnswer(null);
    setUserAnswers({});
    setOpenPembahasan({});
    setIsCompleted(isSubchapterCompleted(metadata.id));
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [metadata.id]);

  // Listen to global progress updates
  useEffect(() => {
    const handleProgress = () => {
      setIsCompleted(isSubchapterCompleted(metadata.id));
    };
    window.addEventListener('utbk_progress_changed', handleProgress);
    return () => window.removeEventListener('utbk_progress_changed', handleProgress);
  }, [metadata.id]);

  const handleToggleCompletion = () => {
    const nextState = toggleSubchapterCompleted(metadata.id);
    setIsCompleted(nextState);
  };

  const handleSelectQuizAnswer = (nomorSoal: number, key: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [nomorSoal]: key,
    }));
  };

  const togglePembahasan = (nomorSoal: number) => {
    setOpenPembahasan((prev) => ({
      ...prev,
      [nomorSoal]: !prev[nomorSoal],
    }));
  };

  // Markdown styling components
  const markdownComponents = {
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="w-full overflow-x-auto my-4 max-w-full rounded-xl border border-stone-200/90 dark:border-slate-800">
        <table className="w-full min-w-full text-left border-collapse text-sm sm:text-[15px] leading-relaxed" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead className="bg-stone-100/90 dark:bg-slate-800/90 border-b border-stone-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
      <tbody className="divide-y divide-stone-200/80 dark:divide-slate-800/80 bg-white/70 dark:bg-slate-900/50" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
      <tr className="hover:bg-stone-50/70 dark:hover:bg-slate-800/40 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm align-top" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed align-top" {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p className="my-2 leading-relaxed text-slate-800 dark:text-slate-200 text-sm sm:text-[15px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc list-outside pl-5 my-2 space-y-1.5 text-slate-800 dark:text-slate-200 text-sm sm:text-[15px]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal list-outside pl-5 my-2 space-y-1.5 text-slate-800 dark:text-slate-200 text-sm sm:text-[15px]" {...props}>
        {children}
      </ol>
    ),
    strong: ({ children, ...props }: React.ComponentPropsWithoutRef<'strong'>) => (
      <strong className="font-bold text-slate-900 dark:text-white" {...props}>
        {children}
      </strong>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-stone-100 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={markdownComponents}
      >
        {text}
      </ReactMarkdown>
    );
  };

  const activeVariasi = variasiList[activeVariasiIndex];

  return (
    <article className="w-full max-w-4xl mx-auto space-y-8 pb-16">
      {/* =============================================================
          ZONA 1: PETA TAKTIS SUB-BAB (ESTIMASI BACA: 45 DETIK)
          ============================================================= */}
      <section className="space-y-4">
        {/* Header Metadata */}
        <header className="bg-white dark:bg-[#0d1428] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Accent Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Breadcrumb & Subtest Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs">
              {metadata.subtest}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Bab {metadata.chapter_num}: {metadata.chapter_title}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
              Sub-bab {metadata.subchapter_num}
            </span>

            {/* Klasifikasi Badge */}
            <span
              className={`ml-auto px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                rawData.klasifikasi_materi === 'INTI' || (metadata as any).classification === 'INTI'
                  ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60'
                  : 'bg-purple-50 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700/60'
              }`}
            >
              ★ {rawData.indikator_klasifikasi_web || (rawData.klasifikasi_materi === 'INTI' ? 'Materi Inti (Wajib)' : 'Pengayaan (700+)')}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {metadata.title}
          </h1>

          {/* Metrics Row: Estimasi Waktu, Frekuensi UTBK, Status Penguasaan */}
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Estimasi Waktu Baca */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-cyan-300 border border-blue-200/80 dark:border-blue-800/60 font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Estimasi Baca: ~{zona1?.estimasi_menit_baca ? `${zona1.estimasi_menit_baca} Menit` : '45 Detik'}</span>
            </div>

            {/* Tingkat Frekuensi Kemunculan di UTBK */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60 font-semibold">
              <Flame className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>Frekuensi UTBK: {zona1?.frekuensi_utbk || 'Sangat Tinggi'}</span>
            </div>

            {/* Indikator Progres Penguasaan */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Status: Selesai Dipelajari</span>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-pulse" />
                  <span>Status: Belum Selesai</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 1-Minute Cheat Sheet (Kartu Konsep Inti Kotak Biru) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/90 dark:bg-[#0c1e3d]/80 border-2 border-blue-200 dark:border-blue-700/60 shadow-xs relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 dark:bg-cyan-500 flex items-center justify-center text-white dark:text-slate-950 shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-blue-950 dark:text-cyan-200">
                Kartu Konsep Inti (1-Minute Cheat Sheet)
              </h2>
              <p className="text-[11px] text-blue-700 dark:text-cyan-400/80">
                Fondasi teori sub-bab dalam rangkuman ringkas padat konsep
              </p>
            </div>
          </div>

          <div className="text-slate-800 dark:text-slate-100 text-sm sm:text-[15px] leading-relaxed">
            {renderMarkdown(zona1?.konsep_inti_markdown || material.content?.tactical_overview || '')}
          </div>

          {/* Interactive Exam Hook (Mini-Poll Pemantik Otak) */}
          {zona1?.exam_hook && (
            <div className="mt-4 pt-4 border-t border-blue-200/80 dark:border-blue-800/60 bg-white/70 dark:bg-slate-900/60 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-cyan-300 uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Uji Cepat Pemantik Konsep:</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
                {zona1.exam_hook.pertanyaan_pemantik}
              </p>

              <div className="flex flex-wrap gap-2">
                {zona1.exam_hook.opsi_cepat.map((opsi, idx) => {
                  const isSelected = examHookAnswer === idx;
                  const isCorrect = idx === zona1.exam_hook?.jawaban_benar_index;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setExamHookAnswer(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opsi}
                    </button>
                  );
                })}
              </div>

              {examHookAnswer !== null && (
                <div className="mt-3 p-3 rounded-lg bg-blue-100/70 dark:bg-blue-950/70 text-xs sm:text-sm text-blue-950 dark:text-cyan-200 animate-fadeIn">
                  <span className="font-bold">
                    {examHookAnswer === zona1.exam_hook.jawaban_benar_index ? '✓ Tepat! ' : '💡 Penjelasan: '}
                  </span>
                  {zona1.exam_hook.penjelasan_kilat}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Radar Jebakan Utama (Kotak Peringatan Kuning/Oranye) */}
        {zona1?.radar_jebakan_utbk && zona1.radar_jebakan_utbk.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/60 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5 text-amber-950 dark:text-amber-200 font-bold text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Radar Jebakan Utama (1–2 Kesalahan Fatal Peserta)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-100">
              {zona1.radar_jebakan_utbk.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-500 dark:text-rose-400 font-black shrink-0">✕</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* =============================================================
          ZONA 2: EKSPLORASI VARIASI INTI BERBASIS TAB HORIZONTAL
          ============================================================= */}
      {variasiList.length > 0 && (
        <section className="bg-white dark:bg-[#0d1428] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-5">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300">
                  ZONA 2
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Eksplorasi Variasi Inti Materi
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Semua variasi dibahas tuntas satu per satu agar mata tidak cepat lelah
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              Variasi {activeVariasiIndex + 1} dari {variasiList.length}
            </span>
          </div>

          {/* Tab Navigasi Horizontal */}
          <div className="w-full overflow-x-auto pb-1.5 scrollbar-thin">
            <div className="flex items-center gap-1.5 min-w-max">
              {variasiList.map((v, idx) => {
                const isActive = activeVariasiIndex === idx;

                return (
                  <button
                    key={v.nomor_variasi || idx}
                    type="button"
                    onClick={() => setActiveVariasiIndex(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 border-blue-600 dark:border-cyan-400 shadow-xs'
                        : 'bg-stone-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-950'
                          : 'bg-stone-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {v.nomor_variasi || idx + 1}
                    </span>
                    <span>{v.nama_variasi}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Variation Card (Pola Mikro 3 Langkah) */}
          {activeVariasi && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              {/* Variation Title Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/40 border border-blue-100 dark:border-indigo-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {activeVariasi.nomor_variasi || activeVariasiIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {activeVariasi.nama_variasi}
                    </h3>
                    <span className="text-[11px] text-blue-700 dark:text-cyan-400 font-semibold">
                      Kategori: {activeVariasi.kategori_variasi || 'Inti UTBK'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pola Mikro 1: Contoh Kasus / Mini-Soal Pemantik */}
              {activeVariasi.stimulus_mini && (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    <Target className="w-4 h-4 text-rose-500" />
                    <span>Contoh Kasus / Mini-Soal Pemantik</span>
                  </div>
                  <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-serif">
                    {renderMarkdown(activeVariasi.stimulus_mini)}
                  </div>
                </div>
              )}

              {/* Pola Mikro 2: Bedah Pola & Langkah Eksekusi */}
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/40 space-y-2 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-cyan-300 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                  <span>Bedah Pola & Langkah Eksekusi Taktis</span>
                </div>
                <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {renderMarkdown(activeVariasi.bedah_pola_markdown)}
                </div>
              </div>

              {/* Pola Mikro 3: Catatan Khusus Variasi (Kunci Pembeda) */}
              {activeVariasi.kunci_pembeda && (
                <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">
                      Catatan Khusus & Kunci Pembeda:
                    </span>{' '}
                    {activeVariasi.kunci_pembeda}
                  </div>
                </div>
              )}

              {/* Step Navigation Inside Tabs */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActiveVariasiIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeVariasiIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Variasi Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveVariasiIndex((prev) => Math.min(variasiList.length - 1, prev + 1))
                  }
                  disabled={activeVariasiIndex === variasiList.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
                >
                  <span>Variasi Selanjutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =============================================================
          ZONA 3: ARENA UJI PEMAHAMAN & CHECKLIST PENGUASAAN
          ============================================================= */}
      <section className="space-y-6">
        <div className="bg-white dark:bg-[#0d1428] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-6">
          {/* Header Zona 3 */}
          <div className="border-b border-stone-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  ZONA 3
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Arena Uji Pemahaman & Active Recall
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Uji langsung pemahamanmu pada variasi di atas sebelum membuka pembahasan
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              {soalList.length} Soal Mini
            </span>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {soalList.map((soal, sIdx) => {
              const nomor = soal.nomor_soal || sIdx + 1;
              const selectedOption = userAnswers[nomor];
              const isAnswered = !!selectedOption;
              const isRight = selectedOption === soal.kunci_jawaban;
              const isPembahasanOpen = !!openPembahasan[nomor];

              return (
                <div
                  key={nomor}
                  className="rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-[#fffdfa] dark:bg-[#0a1024] p-4 sm:p-5 space-y-4"
                >
                  {/* Soal Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
                        {nomor}
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        Menguji Variasi {Array.isArray(soal.menguji_variasi_ke) ? soal.menguji_variasi_ke.join(', ') : 'Inti'}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
                      {soal.tipe_soal_utbk || 'Standard MC'}
                    </span>
                  </div>

                  {/* Pertanyaan */}
                  <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-[15px] font-medium leading-relaxed">
                    {renderMarkdown(soal.pertanyaan_markdown)}
                  </div>

                  {/* Opsi Jawaban (A-E) */}
                  <div className="space-y-2">
                    {soal.opsi_jawaban.map((opsiText, optIdx) => {
                      const optKeyMatch = opsiText.match(/^([A-E])\.\s*(.+)/s);
                      const key = optKeyMatch ? optKeyMatch[1] : String.fromCharCode(65 + optIdx);
                      const text = optKeyMatch ? optKeyMatch[2] : opsiText;

                      const isThisSelected = selectedOption === key;
                      const isThisCorrect = key === soal.kunci_jawaban;

                      let btnStyle =
                        'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700';

                      if (isAnswered) {
                        if (isThisSelected) {
                          btnStyle = isRight
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold'
                            : 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-900 dark:text-rose-100 font-bold';
                        } else if (isThisCorrect) {
                          btnStyle =
                            'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-semibold';
                        }
                      }

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSelectQuizAnswer(nomor, key)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition cursor-pointer ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isAnswered && isThisSelected
                                ? isRight
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {key}
                          </span>
                          <span className="flex-1 pt-0.5 leading-relaxed">{text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Bar & Accordion Button "Lihat Pembahasan" */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100 dark:border-slate-800">
                    <div>
                      {isAnswered && (
                        <div
                          className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                            isRight ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isRight ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Jawaban Tepat! Kunci: ({soal.kunci_jawaban})</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>Kurang Tepat. Kunci Jawaban yang Benar: ({soal.kunci_jawaban})</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePembahasan(nomor)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 border border-indigo-200/80 dark:border-slate-700 hover:bg-indigo-100 dark:hover:bg-slate-700 transition cursor-pointer"
                    >
                      <span>{isPembahasanOpen ? 'Tutup Pembahasan' : 'Lihat Pembahasan'}</span>
                      {isPembahasanOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Accordion Content Pembahasan */}
                  {isPembahasanOpen && (
                    <div className="mt-3 p-4 rounded-xl bg-blue-50/70 dark:bg-slate-900/90 border border-blue-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-blue-950 dark:text-cyan-300 uppercase tracking-wide text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        <span>Bedah Cepat & Konsep Solusi:</span>
                      </div>
                      <div className="leading-relaxed">
                        {renderMarkdown(soal.bedah_cepat_markdown)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CHECKLIST PENGUASAAN: Tombol Centang "Tandai Sub-bab Selesai" */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all duration-300 text-center space-y-3 ${
            isCompleted
              ? 'bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/60 dark:border-emerald-500/40 shadow-md shadow-emerald-500/10'
              : 'bg-white dark:bg-[#0d1428] border-stone-200 dark:border-slate-800 shadow-xs'
          }`}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shadow-2xs mb-1">
            <Award className="w-6 h-6" />
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {isCompleted ? '🎉 Selamat! Sub-bab Ini Telah Dikuasai' : 'Checklist Penguasaan Sub-Bab'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {isCompleted
              ? 'Progres belajarmu telah dicatat. Kamu siap melanjutkan ke sub-bab berikutnya atau melatih kecepatan di mode drilling.'
              : 'Sudah memahami seluruh fondasi teori dan variasi inti di atas? Tandai sub-bab selesai untuk memperbarui riwayat progres belajarmu.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleToggleCompletion}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer shadow-md active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-4 ring-emerald-500/20'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isCompleted ? '✓ Ditandai Selesai (Klik untuk Batal)' : 'Tandai Sub-bab Selesai'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM NAVIGATION: Sub-bab Sebelumnya | Latihan Drilling | Sub-bab Selanjutnya */}
        <footer className="pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onPrevSubchapter}
            disabled={!hasPrev}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sub-bab Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={() => onStartDrillingThisTopic(metadata.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
          >
            <Zap className="w-4 h-4" />
            <span>Latihan Drilling Sub-bab Ini</span>
          </button>

          <button
            type="button"
            onClick={onNextSubchapter}
            disabled={!hasNext}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <span>Sub-bab Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onBackToSubtest}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Silabus {metadata.subtest}</span>
          </button>
        </div>
      </section>
    </article>
  );
};
