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
  ZoomIn,
  X,
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

interface VisualData {
  tipe?: string;
  kode?: string;
  caption?: string;
}

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

  // State: Tap-to-Zoom modal for SVG illustrations
  const [zoomSvg, setZoomSvg] = useState<VisualData | null>(null);

  // Reset tab and answers when material changes
  useEffect(() => {
    setActiveVariasiIndex(0);
    setExamHookAnswer(null);
    setUserAnswers({});
    setOpenPembahasan({});
    setZoomSvg(null);
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

  // Helper component to render SVG graphics with Tap-to-Zoom
  const renderVisualElement = (visual?: VisualData | null, label?: string) => {
    if (!visual || !visual.kode) return null;

    return (
      <div className="my-3 sm:my-4 w-full flex flex-col items-center group">
        <div className="w-full flex items-center justify-between px-1 mb-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-blue-700 dark:text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{label || 'Visualisasi Grafis / Model'}</span>
          </span>
          <button
            type="button"
            onClick={() => setZoomSvg(visual)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700 transition cursor-pointer"
            title="Perbesar Grafik"
          >
            <ZoomIn className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
            <span>Perbesar</span>
          </button>
        </div>

        <div
          onClick={() => setZoomSvg(visual)}
          className="material-svg-card w-full max-w-lg overflow-x-auto rounded-xl p-2 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-2xs flex justify-center items-center cursor-zoom-in transition hover:border-blue-300 dark:hover:border-cyan-500/50"
          dangerouslySetInnerHTML={{ __html: visual.kode }}
        />

        {visual.caption && (
          <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400 italic px-2 max-w-md">
            {visual.caption}
          </p>
        )}
      </div>
    );
  };

  // Markdown styling components with strict overflow-containment
  const markdownComponents = {
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="w-full overflow-x-auto my-3 max-w-full rounded-xl border border-stone-200/90 dark:border-slate-800">
        <table className="w-full min-w-full text-left border-collapse text-xs sm:text-sm leading-relaxed" {...props}>
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
      <th className="py-2 px-2.5 font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm align-top" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="py-2 px-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed align-top" {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p className="my-1.5 leading-relaxed text-slate-800 dark:text-slate-200 text-xs sm:text-sm break-words [overflow-wrap:anywhere] max-w-full" {...props}>
        {children}
      </p>
    ),
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => (
      <li className="leading-relaxed break-words [overflow-wrap:anywhere] max-w-full" {...props}>
        {children}
      </li>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc list-outside pl-4 sm:pl-5 my-1.5 space-y-1 text-slate-800 dark:text-slate-200 text-xs sm:text-sm break-words [overflow-wrap:anywhere] max-w-full" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal list-outside pl-4 sm:pl-5 my-1.5 space-y-1 text-slate-800 dark:text-slate-200 text-xs sm:text-sm break-words [overflow-wrap:anywhere] max-w-full" {...props}>
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
          <code className="bg-stone-100 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 px-1 py-0.5 rounded text-[0.88em] font-mono break-all" {...props}>
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
    <article className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-16 px-0 sm:px-2">
      {/* =============================================================
          ZONA 1: PETA TAKTIS SUB-BAB (ESTIMASI BACA: 45 DETIK)
          ============================================================= */}
      <section className="space-y-3 sm:space-y-4">
        {/* Header Metadata */}
        <header className="bg-white dark:bg-[#0d1428] rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-slate-800 p-3.5 sm:p-5 shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Accent Gradient */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Breadcrumb & Subtest Badge */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs">
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
              className={`ml-auto px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border ${
                rawData.klasifikasi_materi === 'INTI' || (metadata as any).classification === 'INTI'
                  ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60'
                  : 'bg-purple-50 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700/60'
              }`}
            >
              ★ {rawData.indikator_klasifikasi_web || (rawData.klasifikasi_materi === 'INTI' ? 'Materi Inti (Wajib)' : 'Pengayaan (700+)')}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {metadata.title}
          </h1>

          {/* Metrics Row: Estimasi Waktu, Frekuensi UTBK, Status Penguasaan */}
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs">
            {/* Estimasi Waktu Baca */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-cyan-300 border border-blue-200/80 dark:border-blue-800/60 font-semibold">
              <Zap className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
              <span>Estimasi Baca: ~{zona1?.estimasi_menit_baca ? `${zona1.estimasi_menit_baca} Menit` : '45 Detik'}</span>
            </div>

            {/* Tingkat Frekuensi Kemunculan di UTBK */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60 font-semibold">
              <Flame className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <span>Frekuensi UTBK: {zona1?.frekuensi_utbk || 'Sangat Tinggi'}</span>
            </div>

            {/* Indikator Progres Penguasaan */}
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold border ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Status: Selesai Dipelajari</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                  <span>Status: Belum Selesai</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 1-Minute Cheat Sheet (Kartu Konsep Inti Kotak Biru) */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-blue-50/90 dark:bg-[#0c1e3d]/80 border-2 border-blue-200 dark:border-blue-700/60 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-600 dark:bg-cyan-500 flex items-center justify-center text-white dark:text-slate-950 shadow-xs shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-blue-950 dark:text-cyan-200">
                Kartu Konsep Inti (1-Minute Cheat Sheet)
              </h2>
              <p className="text-[10px] sm:text-[11px] text-blue-700 dark:text-cyan-400/80">
                Fondasi teori sub-bab dalam rangkuman ringkas padat konsep
              </p>
            </div>
          </div>

          <div className="text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-relaxed overflow-x-auto">
            {renderMarkdown(zona1?.konsep_inti_markdown || material.content?.tactical_overview || '')}
          </div>

          {/* SVG Visualisasi Konsep Inti Zona 1 jika ada */}
          {renderVisualElement(zona1?.visual, 'Diagram Konsep Inti Sub-Bab')}

          {/* Interactive Exam Hook (Mini-Poll Pemantik Otak) */}
          {zona1?.exam_hook && (
            <div className="mt-3 pt-3 border-t border-blue-200/80 dark:border-blue-800/60 bg-white/70 dark:bg-slate-900/60 p-3 sm:p-3.5 rounded-xl overflow-hidden">
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-900 dark:text-cyan-300 uppercase tracking-wider mb-1.5">
                <HelpCircle className="w-3 h-3 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span>Uji Cepat Pemantik Konsep:</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 mb-2.5 leading-snug">
                {zona1.exam_hook.pertanyaan_pemantik}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {zona1.exam_hook.opsi_cepat.map((opsi, idx) => {
                  const isSelected = examHookAnswer === idx;
                  const isCorrect = idx === zona1.exam_hook?.jawaban_benar_index;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setExamHookAnswer(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
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
                <div className="mt-2.5 p-2.5 rounded-lg bg-blue-100/70 dark:bg-blue-950/70 text-xs sm:text-sm text-blue-950 dark:text-cyan-200 animate-fadeIn">
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
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/60 shadow-xs overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2 text-amber-950 dark:text-amber-200 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Radar Jebakan Utama (1–2 Kesalahan Fatal Peserta)</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 dark:text-amber-100">
              {zona1.radar_jebakan_utbk.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
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
        <section className="bg-white dark:bg-[#0d1428] rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-slate-800 p-3 sm:p-5 shadow-xs space-y-4 overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-stone-100 dark:border-slate-800 pb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300">
                  ZONA 2
                </span>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Eksplorasi Variasi Inti Materi
                </h2>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Semua variasi dibahas tuntas satu per satu agar mata tidak cepat lelah
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              Variasi {activeVariasiIndex + 1} dari {variasiList.length}
            </span>
          </div>

          {/* Tab Navigasi Horizontal: Tombol Ringkas (Variasi 1, Variasi 2, dst.) */}
          <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
            <div className="flex items-center gap-1.5 min-w-max">
              {variasiList.map((v, idx) => {
                const isActive = activeVariasiIndex === idx;
                const label = `Variasi ${v.nomor_variasi || idx + 1}`;

                return (
                  <button
                    key={v.nomor_variasi || idx}
                    type="button"
                    onClick={() => setActiveVariasiIndex(idx)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 border-blue-600 dark:border-cyan-400 shadow-xs'
                        : 'bg-stone-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Variation Card (Pola Mikro 3 Langkah) */}
          {activeVariasi && (
            <div className="space-y-3 pt-1 animate-fadeIn overflow-hidden">
              {/* Variation Title Banner */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/40 border border-blue-100 dark:border-indigo-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {activeVariasi.nomor_variasi || activeVariasiIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                      Variasi {activeVariasi.nomor_variasi || activeVariasiIndex + 1}: {activeVariasi.nama_variasi}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] text-blue-700 dark:text-cyan-400 font-semibold">
                      Kategori: {activeVariasi.kategori_variasi || 'Inti UTBK'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pola Mikro 1: Contoh Kasus / Mini-Soal Pemantik */}
              {activeVariasi.stimulus_mini && (
                <div className="p-3 sm:p-4 rounded-xl bg-stone-50 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800 space-y-1 overflow-hidden">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Contoh Kasus / Mini-Soal Pemantik</span>
                  </div>
                  <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-serif">
                    {renderMarkdown(activeVariasi.stimulus_mini)}
                  </div>
                </div>
              )}

              {/* SVG Visualisasi Variasi jika ada */}
              {renderVisualElement(activeVariasi.visual, `Model Visual Variasi ${activeVariasi.nomor_variasi || activeVariasiIndex + 1}`)}

              {/* Pola Mikro 2: Bedah Pola & Langkah Eksekusi */}
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5 shadow-2xs overflow-hidden">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 dark:text-cyan-300 uppercase tracking-wider mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 shrink-0" />
                  <span>Bedah Pola & Langkah Eksekusi Taktis</span>
                </div>
                <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  {renderMarkdown(activeVariasi.bedah_pola_markdown)}
                </div>
              </div>

              {/* Pola Mikro 3: Catatan Khusus Variasi (Kunci Pembeda) */}
              {activeVariasi.kunci_pembeda && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2 overflow-hidden">
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
                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
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
                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
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
      <section className="space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-[#0d1428] rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-slate-800 p-3.5 sm:p-5 shadow-xs space-y-4 sm:space-y-5 overflow-hidden">
          {/* Header Zona 3 */}
          <div className="border-b border-stone-100 dark:border-slate-800 pb-2.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  ZONA 3
                </span>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Arena Uji Pemahaman & Active Recall
                </h2>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Uji langsung pemahamanmu pada variasi di atas sebelum membuka pembahasan
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              {soalList.length} Soal Mini
            </span>
          </div>

          {/* Questions List */}
          <div className="space-y-4 sm:space-y-5">
            {soalList.map((soal, sIdx) => {
              const nomor = soal.nomor_soal || sIdx + 1;
              const selectedOption = userAnswers[nomor];
              const isAnswered = !!selectedOption;
              const isRight = selectedOption === soal.kunci_jawaban;
              const isPembahasanOpen = !!openPembahasan[nomor];

              return (
                <div
                  key={nomor}
                  className="rounded-xl border border-stone-200/90 dark:border-slate-800 bg-[#fffdfa] dark:bg-[#0a1024] p-3 sm:p-4 space-y-3 overflow-hidden"
                >
                  {/* Soal Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                        {nomor}
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
                        Menguji Variasi {Array.isArray(soal.menguji_variasi_ke) ? soal.menguji_variasi_ke.join(', ') : 'Inti'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
                      {soal.tipe_soal_utbk || 'Standard MC'}
                    </span>
                  </div>

                  {/* Pertanyaan */}
                  <div className="text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium leading-relaxed">
                    {renderMarkdown(soal.pertanyaan_markdown)}
                  </div>

                  {/* SVG Visualisasi Soal jika ada */}
                  {renderVisualElement(soal.visual, `Diagram / Stimulus Soal ${nomor}`)}

                  {/* Opsi Jawaban (A-E) */}
                  <div className="space-y-1.5">
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
                          className={`w-full text-left p-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2 transition cursor-pointer ${btnStyle}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isAnswered && isThisSelected
                                ? isRight
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {key}
                          </span>
                          <span className="flex-1 pt-0.5 leading-relaxed break-words">{text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Bar & Accordion Button "Lihat Pembahasan" */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stone-100 dark:border-slate-800">
                    <div>
                      {isAnswered && (
                        <div
                          className={`inline-flex items-center gap-1 text-xs font-bold ${
                            isRight ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isRight ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Jawaban Tepat! Kunci: ({soal.kunci_jawaban})</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Kurang Tepat. Kunci Jawaban yang Benar: ({soal.kunci_jawaban})</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePembahasan(nomor)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 border border-indigo-200/80 dark:border-slate-700 hover:bg-indigo-100 dark:hover:bg-slate-700 transition cursor-pointer self-start sm:self-auto"
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
                    <div className="mt-2.5 p-3 rounded-lg bg-blue-50/70 dark:bg-slate-900/90 border border-blue-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 animate-fadeIn overflow-x-auto">
                      <div className="flex items-center gap-1 font-bold text-blue-950 dark:text-cyan-300 uppercase tracking-wide text-[11px]">
                        <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
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
          className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-center space-y-2.5 overflow-hidden ${
            isCompleted
              ? 'bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/60 dark:border-emerald-500/40 shadow-md shadow-emerald-500/10'
              : 'bg-white dark:bg-[#0d1428] border-stone-200 dark:border-slate-800 shadow-xs'
          }`}
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shadow-2xs mb-0.5">
            <Award className="w-5 h-5" />
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {isCompleted ? '🎉 Selamat! Sub-bab Ini Telah Dikuasai' : 'Checklist Penguasaan Sub-Bab'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {isCompleted
              ? 'Progres belajarmu telah dicatat. Kamu siap melanjutkan ke sub-bab berikutnya atau melatih kecepatan di mode drilling.'
              : 'Sudah memahami seluruh fondasi teori dan variasi inti di atas? Tandai sub-bab selesai untuk memperbarui riwayat progres belajarmu.'}
          </p>

          <div className="pt-1.5">
            <button
              type="button"
              onClick={handleToggleCompletion}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-4 ring-emerald-500/20'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? '✓ Ditandai Selesai (Klik untuk Batal)' : 'Tandai Sub-bab Selesai'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM NAVIGATION: Sub-bab Sebelumnya | Latihan Drilling | Sub-bab Selanjutnya */}
        <footer className="pt-3 border-t border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onPrevSubchapter}
            disabled={!hasPrev}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sub-bab Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={() => onStartDrillingThisTopic(metadata.id)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
          >
            <Zap className="w-4 h-4" />
            <span>Latihan Drilling Sub-bab Ini</span>
          </button>

          <button
            type="button"
            onClick={onNextSubchapter}
            disabled={!hasNext}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <span>Sub-bab Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>

        <div className="pt-1 text-center">
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

      {/* MODAL ZOOM SVG */}
      {zoomSvg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={() => setZoomSvg(null)}
        >
          <div
            className="relative bg-white dark:bg-[#0c1428] rounded-2xl p-4 sm:p-6 max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-stone-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomSvg(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="material-svg-card w-full flex justify-center items-center py-4"
              dangerouslySetInnerHTML={{ __html: zoomSvg.kode || '' }}
            />

            {zoomSvg.caption && (
              <p className="mt-3 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic font-medium">
                {zoomSvg.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default ThreeZoneMaterialViewer;
