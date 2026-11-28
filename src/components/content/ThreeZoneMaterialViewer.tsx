import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  CheckCircle2,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Award,
  X,
} from 'lucide-react';
import type {
  Material,
  ThreeZoneMaterial,
  VariasiInti,
  SoalUjiPemahaman,
  VisualData,
} from '../../types/material';
import {
  isSubchapterCompleted,
  toggleSubchapterCompleted,
} from '../../lib/contentLoader';
import { AdSlot } from '../common/AdSlot';
import { VisualRenderer } from './VisualRenderer';
import { DetailMateriAccordion } from './DetailMateriAccordion';
import { formatMarkdownMath } from '../../lib/markdownUtils';
import type { ThemeId } from '../../lib/theme';

const REMARK_PLUGINS = [remarkMath, remarkGfm];
const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

const MARKDOWN_COMPONENTS = {
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="w-full overflow-x-auto my-4 max-w-full rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
      <table className="w-full min-w-full text-left border-collapse text-[15px] sm:text-[15.5px] leading-relaxed" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
    <th className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 text-[15px] sm:text-[15.5px] align-top" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 text-[15px] sm:text-[15.5px] leading-relaxed align-top" {...props}>
      {children}
    </td>
  ),
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-0 mb-3.5 last:mb-0 leading-[1.85] text-slate-800 dark:text-slate-200 text-[15px] sm:text-[15.5px] break-words [overflow-wrap:anywhere] max-w-full" {...props}>
      {children}
    </p>
  ),
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-[1.85] text-slate-800 dark:text-slate-200 text-[15px] sm:text-[15.5px] break-words [overflow-wrap:anywhere] max-w-full my-1.5" {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-outside pl-5 my-2.5 space-y-2 text-slate-800 dark:text-slate-200 text-[15px] sm:text-[15.5px] break-words [overflow-wrap:anywhere] max-w-full" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-outside pl-5 my-2.5 space-y-2 text-slate-800 dark:text-slate-200 text-[15px] sm:text-[15.5px] break-words [overflow-wrap:anywhere] max-w-full" {...props}>
      {children}
    </ol>
  ),
  strong: ({ children, ...props }: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold text-slate-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.ComponentPropsWithoutRef<'em'>) => (
    <em className="italic text-inherit" {...props}>
      {children}
    </em>
  ),
  code: ({ inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono text-[0.9em] break-all" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block overflow-x-auto max-w-full ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) => (
    <div className="w-full overflow-x-auto my-3 max-w-full rounded-xl bg-slate-900 text-slate-100 p-4">
      <pre {...props}>{children}</pre>
    </div>
  ),
};

const INLINE_MARKDOWN_COMPONENTS = {
  p: ({ children }: any) => <span className="inline leading-[1.85]">{children}</span>,
  strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
  em: ({ children }: any) => <em className="italic text-inherit">{children}</em>,
  code: ({ children }: any) => (
    <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono text-[0.9em]">
      {children}
    </code>
  ),
};

const MemoMarkdown = memo<{ text?: string }>(({ text }) => {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={KATEX_REHYPE_PLUGINS}
      components={MARKDOWN_COMPONENTS}
    >
      {formatMarkdownMath(text)}
    </ReactMarkdown>
  );
});
MemoMarkdown.displayName = 'MemoMarkdown';

const MemoInlineMarkdown = memo<{ text?: string }>(({ text }) => {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={KATEX_REHYPE_PLUGINS}
      components={INLINE_MARKDOWN_COMPONENTS}
    >
      {formatMarkdownMath(text, { inlineOnly: true })}
    </ReactMarkdown>
  );
});
MemoInlineMarkdown.displayName = 'MemoInlineMarkdown';

const renderMarkdownStable = (text?: string) => (text ? <MemoMarkdown text={text} /> : null);
const renderInlineMarkdownStable = (text?: string) =>
  text ? <MemoInlineMarkdown text={text} /> : null;

interface ThreeZoneMaterialViewerProps {
  material: Material;
  theme?: ThemeId;
  fontScale?: number;
  onBackToSubtest?: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  prevHref?: string;
  nextHref?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
  onProgressChange?: (percentage: number) => void;
}

export const ThreeZoneMaterialViewer: React.FC<ThreeZoneMaterialViewerProps> = ({
  material,
  theme = 'light',
  fontScale = 1.0,
  onBackToSubtest: _onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  prevHref,
  nextHref,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
  onProgressChange,
}) => {
  const { metadata } = material;
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Extract 3 zones with fallback
  const rawData = material as unknown as Partial<ThreeZoneMaterial>;
  const zona1 = rawData.zona_1_peta_taktis;
  const variasiList: VariasiInti[] = rawData.zona_2_variasi_inti || [];
  const soalList: SoalUjiPemahaman[] = rawData.zona_3_uji_pemahaman || [];

  // State: Active tab in Zona 2
  const [activeVariasiIndex, setActiveVariasiIndex] = useState<number>(0);

  // State: Set of visited / read tabs
  const [readTabs, setReadTabs] = useState<Set<number>>(new Set([0]));

  // State: Exam Hook (Interactive Quiz in Zona 1)
  const [examHookAnswer, setExamHookAnswer] = useState<number | null>(null);

  // State: User answers in Zona 3 { [nomor_soal]: selectedOptionKey }
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  // State: Short answer inputs for fill-in questions
  const [shortAnswers, setShortAnswers] = useState<Record<number, string>>({});

  // State: Open Accordions for Pembahasan in Zona 3 { [nomor_soal]: boolean }
  const [openPembahasan, setOpenPembahasan] = useState<Record<number, boolean>>({});

  // State: Learning progress completion status
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // State: Tap-to-Zoom modal for SVG illustrations
  const [zoomSvg, setZoomSvg] = useState<VisualData | null>(null);

  // Reset tab and answers when material changes
  useEffect(() => {
    setActiveVariasiIndex(0);
    setReadTabs(new Set([0]));
    setExamHookAnswer(null);
    setUserAnswers({});
    setShortAnswers({});
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

  // Track tab reading
  const handleSelectTab = (idx: number) => {
    setActiveVariasiIndex(idx);
    setReadTabs((prev) => new Set([...prev, idx]));
  };

  const handleNextTab = () => {
    if (activeVariasiIndex < variasiList.length - 1) {
      handleSelectTab(activeVariasiIndex + 1);
    }
  };

  const handlePrevTab = () => {
    if (activeVariasiIndex > 0) {
      handleSelectTab(activeVariasiIndex - 1);
    }
  };

  // Calculate real-time progress
  const progressPercentage = useMemo(() => {
    if (isCompleted) return 100;
    const totalTabs = Math.max(1, variasiList.length);
    const totalSoal = Math.max(1, soalList.length);

    let score = 10; // Base reading start
    if (examHookAnswer !== null) score += 15;

    const tabsRatio = readTabs.size / totalTabs;
    score += Math.round(tabsRatio * 55);

    const answeredCount = Object.keys(userAnswers).length + Object.keys(shortAnswers).length;
    const soalRatio = Math.min(1, answeredCount / totalSoal);
    score += Math.round(soalRatio * 20);

    return Math.min(100, Math.max(10, score));
  }, [isCompleted, examHookAnswer, readTabs.size, variasiList.length, soalList.length, userAnswers, shortAnswers]);

  // Notify parent of progress percentage change
  useEffect(() => {
    onProgressChange?.(progressPercentage);
  }, [progressPercentage, onProgressChange]);

  const handleToggleCompletion = () => {
    const nextState = toggleSubchapterCompleted(metadata.id);
    setIsCompleted(nextState);
  };

  const handleSelectQuizAnswer = (nomorSoal: number, key: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [nomorSoal]: key,
    }));
    // Auto open explanation accordion once answered
    setOpenPembahasan((prev) => ({
      ...prev,
      [nomorSoal]: true,
    }));
  };

  const togglePembahasan = (nomorSoal: number) => {
    setOpenPembahasan((prev) => ({
      ...prev,
      [nomorSoal]: !prev[nomorSoal],
    }));
  };

  const renderMarkdown = useCallback(renderMarkdownStable, []);
  const renderInlineMarkdown = useCallback(renderInlineMarkdownStable, []);

  const activeVariasi = variasiList[activeVariasiIndex];

  return (
    <article
      className="w-full max-w-[720px] mx-auto space-y-8 sm:space-y-10 pb-20 px-2.5 sm:px-6 reader-scalable-content transition-all"
      style={{
        '--reader-font-scale': fontScale,
        fontSize: `calc(0.96875rem * ${fontScale})`,
      } as React.CSSProperties}
    >
      {/* =====================================================================
          ZONA 1: PETA TAKTIS SUB-BAB (TAMPIL STATIS DI BAGIAN ATAS)
          ===================================================================== */}
      <section aria-labelledby="subbab-title" className="space-y-5 sm:space-y-6">
        {/* Header Sub-Bab: Breadcrumb, Judul, Frekuensi UTBK */}
        <div className="space-y-2.5 px-1 sm:px-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            <span>{metadata.subtest}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold">
              Bab {metadata.chapter_num}: {metadata.chapter_title}
            </span>
          </nav>

          {/* Judul Utama */}
          <h1 id="subbab-title" className="text-xl sm:text-2xl font-extrabold text-[#1E293B] dark:text-white leading-tight tracking-tight">
            {metadata.title}
          </h1>

          {/* Badge Metadata: HANYA SISAKAN FREKUENSI MUNCUL DI UTBK */}
          {zona1?.frekuensi_utbk && (
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span
                className={`inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium px-3 py-1 rounded-full border shadow-2xs ${
                  isVelvet
                    ? 'bg-[#2B1723] border-[#EB8A78]/35 text-[#EBD6DC]'
                    : isPrism
                    ? 'bg-white/85 border-white/90 text-slate-700'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Frekuensi UTBK:</span>
                <strong className="font-bold text-slate-900 dark:text-white">
                  {zona1.frekuensi_utbk}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* 1. PEMANTIK LOGIKA (EXAM HOOK) - DITARUH PERTAMA */}
        {zona1?.exam_hook && (
          <div
            className={`rounded-2xl border p-3.5 sm:p-6 shadow-xs space-y-4 max-w-full overflow-x-clip ${
              isVelvet
                ? 'bg-[#2B1723] border-[#EB8A78]/35'
                : isPrism
                ? 'bg-white/85 border-white/90'
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isVelvet ? 'bg-[#FF8A6B]' : 'bg-[#3B82F6]'}`}></span>
                Pemantik Logika
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono">
                Tebak Dulu
              </span>
            </div>

            {/* Stimulus Ringkas / Pertanyaan Pemantik di dalam Kartu Estetik */}
            <div
              className={`rounded-2xl border border-l-4 p-3.5 sm:p-5 max-w-full overflow-x-clip ${
                isVelvet
                  ? 'bg-[#1F1020] border-[#EB8A78]/25 border-l-[#FF8A6B]'
                  : isPrism
                  ? 'bg-sky-50/70 border-sky-200/70 border-l-sky-500'
                  : 'bg-slate-50/90 dark:bg-slate-800/50 border-slate-200/90 dark:border-slate-700/60 border-l-slate-400 dark:border-l-slate-500'
              }`}
            >
              <div className="text-[15px] sm:text-[15.5px] text-slate-800 dark:text-[#FBF1F2] leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 font-normal max-w-full">
                {renderMarkdown(zona1.exam_hook.pertanyaan_pemantik)}
              </div>
            </div>

            {/* Tombol Pilihan Opsi Cepat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {zona1.exam_hook.opsi_cepat.map((opsi, idx) => {
                const isSelected = examHookAnswer === idx;
                const isCorrect = idx === zona1.exam_hook?.jawaban_benar_index;

                let buttonClass = isVelvet
                  ? 'border-2 border-[#EB8A78]/30 bg-[#23121E] text-[#FBF1F2] hover:border-[#FF8A6B]'
                  : 'border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500';

                if (isSelected) {
                  if (isCorrect) {
                    buttonClass = 'border-2 border-[#10B981] bg-[#ECFDF5] dark:bg-emerald-950/75 text-emerald-950 dark:text-emerald-100 shadow-2xs';
                  } else {
                    buttonClass = 'border-2 border-[#F59E0B] bg-[#FFFBEB] dark:bg-amber-950/75 text-amber-950 dark:text-amber-100 shadow-2xs';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setExamHookAnswer(idx)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center text-center gap-2 ${buttonClass}`}
                  >
                    <span>{renderInlineMarkdown(opsi)}</span>
                  </button>
                );
              })}
            </div>

            {/* Umpan Balik Instan / Penjelasan Kilat */}
            {examHookAnswer !== null && (
              <div
                className={`rounded-xl p-4 border-l-4 fade-in text-[15.5px] leading-relaxed ${
                  examHookAnswer === zona1.exam_hook.jawaban_benar_index
                    ? 'bg-[#ECFDF5] dark:bg-emerald-950/50 border-l-[#10B981] text-emerald-950 dark:text-emerald-100'
                    : 'bg-[#FFFBEB] dark:bg-amber-950/50 border-l-[#F59E0B] text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  {examHookAnswer === zona1.exam_hook.jawaban_benar_index ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Tepat Sekali!</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                      <span>Penjelasan Kilat:</span>
                    </>
                  )}
                </div>
                <div className="max-w-full leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0">{renderMarkdown(zona1.exam_hook.penjelasan_kilat)}</div>
              </div>
            )}
          </div>
        )}

        {/* PEMISAH ESTETIK ANTARA HOOK & KONSEP INTI */}
        <div className="relative flex items-center justify-center my-6 select-none">
          <div className={`w-full border-t border-dashed ${isVelvet ? 'border-[#EB8A78]/35' : 'border-slate-300 dark:border-slate-700/80'}`} />
          <div
            className={`absolute px-3.5 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 shadow-2xs ${
              isVelvet
                ? 'bg-[#2B1723] text-[#FBF1F2] border-[#EB8A78]/40'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            <span>📘 Fondasi Konsep Inti</span>
          </div>
        </div>

        {/* 2. KARTU KONSEP INTI */}
        {zona1?.konsep_inti_markdown && (
          <div
            className={`rounded-2xl border border-l-4 p-3.5 sm:p-6 space-y-3.5 max-w-full overflow-x-clip shadow-xs ${
              isVelvet
                ? 'bg-[#2B1723]/95 border-[#EB8A78]/40 border-l-[#FF8A6B]'
                : isPrism
                ? 'bg-[#EFF6FF]/88 border-sky-400/50 border-l-blue-600'
                : 'bg-[#EFF6FF] dark:bg-blue-950/25 border-[#3B82F6]/50 border-l-blue-600 dark:border-l-blue-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">📘</span>
              <h2
                className={`text-[17px] sm:text-lg font-extrabold ${
                  isVelvet ? 'text-[#FFBE98]' : 'text-blue-950 dark:text-blue-100'
                }`}
              >
                Kartu Konsep Inti: Ringkasan Teori & Rumus
              </h2>
            </div>

            <div className="text-[15px] sm:text-[15.5px] leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 text-slate-900 dark:text-[#FBF1F2] max-w-full">
              {renderMarkdown(zona1.konsep_inti_markdown)}
            </div>
          </div>
        )}

        {/* Visual Grafis Zona 1 (Infografis Peta Taktis Full Width Sama Rata) */}
        {zona1?.visual && (
          <div className="max-w-full overflow-x-auto">
            <VisualRenderer
              visual={zona1.visual}
              onZoom={setZoomSvg}
            />
          </div>
        )}

        {/* 2B. DETAIL MATERI LENGKAP (ZONA 1B ACCORDION) */}
        {zona1?.detail_materi_lengkap && (
          <DetailMateriAccordion
            data={zona1.detail_materi_lengkap}
            theme={theme}
            renderMarkdown={renderMarkdown}
            renderInlineMarkdown={renderInlineMarkdown}
            onZoomVisual={setZoomSvg}
          />
        )}

        {/* 3. RADAR JEBAKAN UTBK (Box Kuning/Oranye: #FFFBEB / border #F59E0B) */}
        {zona1?.radar_jebakan_utbk && zona1.radar_jebakan_utbk.length > 0 && (
          <div
            className={`rounded-2xl border border-l-4 p-3.5 sm:p-6 space-y-3.5 max-w-full overflow-x-clip shadow-xs ${
              isVelvet
                ? 'bg-[#361D1E]/90 border-[#F5B041]/40 border-l-[#F5B041]'
                : 'bg-[#FFFBEB] dark:bg-amber-950/25 border-[#F59E0B]/50 border-l-[#F59E0B]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">⚠️</span>
              <h2 className="text-[17px] sm:text-lg font-extrabold text-amber-950 dark:text-amber-100">
                Radar Jebakan UTBK (1–2 Kesalahan Fatal Peserta)
              </h2>
            </div>

            <ol className="space-y-3.5 text-[15px] sm:text-[15.5px] max-w-full">
              {zona1.radar_jebakan_utbk.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 max-w-full">
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-amber-300 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 mt-1 shrink-0 shadow-2xs">
                    0{idx + 1}
                  </span>
                  <div className="text-slate-900 dark:text-slate-100 leading-[1.85] flex-1 min-w-0 max-w-full">
                    {renderInlineMarkdown(trap)}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* PEMBATAS HALUS ANTARA ZONA 1 & ZONA 2 */}
      <div className="relative flex items-center justify-center my-8 select-none">
        <div className={`w-full border-t ${isVelvet ? 'border-[#EB8A78]/25' : 'border-slate-200 dark:border-slate-700/75'}`} />
        <div
          className={`absolute px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-2xs ${
            isVelvet
              ? 'bg-[#2B1723] text-[#FFBE98] border-[#EB8A78]/35'
              : 'bg-[#F8FAFC] dark:bg-[#0D1426] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80'
          }`}
        >
          Zona 2 • Bedah Pola Soal
        </div>
      </div>

      {/* SLOT IKLAN AMAN 1 (ANTARA ZONA 1 & ZONA 2) */}
      <AdSlot slotId="material-between-z1-z2" format="in-article" />

      {/* =====================================================================
          ZONA 2: EKSPLORASI VARIASI INTI (KOMPONEN TAB HORIZONTAL INTERAKTIF)
          ===================================================================== */}
      {variasiList.length > 0 && (
        <section aria-labelledby="zona2-title" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1 sm:px-0">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Zona 2 • Bedah Pola Soal
              </span>
              <h2 id="zona2-title" className="text-[17px] sm:text-xl font-extrabold text-[#1E293B] dark:text-white mt-0.5">
                Eksplorasi {variasiList.length} Variasi Inti
              </h2>
            </div>
            <span
              className={`inline-flex items-center self-start sm:self-auto font-mono text-xs font-semibold px-3 py-1 rounded-full border ${
                isVelvet
                  ? 'bg-[#2B1723] text-[#FFBE98] border-[#EB8A78]/35'
                  : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300/60 dark:border-slate-700'
              }`}
            >
              {readTabs.size}/{variasiList.length} Variasi Dibaca
            </span>
          </div>

          {/* Navigasi Tab Horizontal dalam Segmented Tray agar Pemisah Antar Tab Tegas & Nyaman */}
          <div
            className={`rounded-2xl border p-1.5 shadow-2xs ${
              isVelvet
                ? 'bg-[#22121D] border-[#EB8A78]/30'
                : isPrism
                ? 'bg-white/75 border-white/90'
                : 'bg-slate-100/90 dark:bg-[#0B1222] border-slate-200/90 dark:border-slate-700/80'
            }`}
          >
            <div
              role="tablist"
              aria-label="Daftar Variasi Soal"
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
            >
              {variasiList.map((v, idx) => {
                const isActive = activeVariasiIndex === idx;
                const isRead = readTabs.has(idx);

                return (
                  <React.Fragment key={v.nomor_variasi || idx}>
                    {idx > 0 && (
                      <span
                        className="h-5 w-px bg-slate-300/70 dark:bg-slate-700/70 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectTab(idx)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                        isActive
                          ? isVelvet
                            ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B] shadow-xs font-extrabold'
                            : isPrism
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-sky-500 shadow-xs font-extrabold'
                            : 'bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 border-sky-600 dark:border-sky-400 shadow-xs font-extrabold'
                          : isVelvet
                          ? 'bg-[#2E1826] border-[#EB8A78]/25 text-[#EBD6DC] hover:bg-[#3A1F30] hover:text-white'
                          : 'bg-white/80 dark:bg-slate-800/65 border-slate-200/90 dark:border-slate-700/75 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {isRead && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${
                            isActive ? 'bg-white dark:bg-slate-950' : 'bg-[#10B981]'
                          }`}
                          title="Sudah dibaca"
                        />
                      )}
                      <span>Variasi {v.nomor_variasi || idx + 1}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Kontainer Kartu Konten Tab (Hanya 1 Variasi Aktif) */}
          {activeVariasi && (
            <div
              className={`rounded-2xl border border-t-2 shadow-xs overflow-x-clip max-w-full ${
                isVelvet
                  ? 'bg-[#2B1723] border-[#EB8A78]/35 border-t-[#FF8A6B]'
                  : isPrism
                  ? 'bg-white/88 border-white/95 border-t-sky-500'
                  : 'bg-white dark:bg-[#0F172A] border-slate-200/90 dark:border-slate-700/80 border-t-sky-500/80 dark:border-t-sky-400/70'
              }`}
            >
              {/* Area Isi Variasi Aktif */}
              <div key={activeVariasiIndex} role="tabpanel" className="p-3.5 sm:p-6 space-y-5 animate-tab-slide max-w-full overflow-x-clip">
                {/* Header Variasi */}
                <div className={`space-y-2 border-b pb-4 ${isVelvet ? 'border-[#EB8A78]/20' : 'border-slate-200/90 dark:border-slate-700/70'}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded border ${
                        isVelvet
                          ? 'bg-[#4A222B] text-[#FFBE98] border-[#EB8A78]/40'
                          : 'bg-sky-100 dark:bg-sky-900/60 text-sky-900 dark:text-sky-200 border-sky-300/80 dark:border-sky-700/80'
                      }`}
                    >
                      Variasi {activeVariasi.nomor_variasi || activeVariasiIndex + 1}
                    </span>
                    {activeVariasi.kategori_variasi && (
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded font-bold border ${
                          isVelvet
                            ? 'bg-[#381C2C] text-[#F5B041] border-[#F5B041]/35'
                            : 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        {activeVariasi.kategori_variasi}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[17px] sm:text-lg font-extrabold text-slate-950 dark:text-white leading-snug">
                    {renderInlineMarkdown(activeVariasi.nama_variasi)}
                  </h3>
                </div>

                {/* Stimulus Mini (jika tersedia) */}
                {activeVariasi.stimulus_mini && (
                  <blockquote
                    className={`p-3.5 sm:p-4 rounded-xl border border-l-4 text-[15px] sm:text-[15.5px] leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 max-w-full ${
                      isVelvet
                        ? 'bg-[#1F1020] border-[#EB8A78]/25 border-l-[#FF8A6B] text-[#FBF1F2]'
                        : 'bg-slate-50 dark:bg-[#141E36] border-slate-200/80 dark:border-slate-700/60 border-l-slate-400 dark:border-l-slate-500 text-[#1E293B] dark:text-slate-200'
                    }`}
                  >
                    {renderMarkdown(activeVariasi.stimulus_mini)}
                  </blockquote>
                )}

                {/* Visual / Gambar SVG (jika ada) */}
                {activeVariasi.visual && (
                  <div className="max-w-full overflow-x-auto pt-1">
                    <VisualRenderer
                      visual={activeVariasi.visual}
                      onZoom={setZoomSvg}
                    />
                  </div>
                )}

                {/* Bedah Pola & Langkah Eksekusi */}
                {activeVariasi.bedah_pola_markdown && (
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/90 max-w-full">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Bedah Pola & Langkah Eksekusi
                    </h4>
                    <div className="text-[15px] sm:text-[15.5px] leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 text-slate-800 dark:text-slate-200 max-w-full">
                      {renderMarkdown(activeVariasi.bedah_pola_markdown)}
                    </div>
                  </div>
                )}

                {/* Kunci Pembeda (Semantic Box Hijau: #ECFDF5 / border #10B981) */}
                {activeVariasi.kunci_pembeda && (
                  <div className="rounded-xl bg-[#ECFDF5] dark:bg-emerald-950/25 border border-[#10B981]/50 border-l-4 border-l-[#10B981] p-3.5 sm:p-4 text-[15px] sm:text-[15.5px] leading-[1.85] text-emerald-950 dark:text-emerald-100 space-y-1.5 max-w-full overflow-x-clip">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200">
                      <Sparkles className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Kunci Pembeda Variasi Ini:</span>
                    </div>
                    <div className="max-w-full leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0">{renderMarkdown(activeVariasi.kunci_pembeda)}</div>
                  </div>
                )}
              </div>

              {/* Footer Navigasi Antar-Variasi */}
              <div
                className={`border-t px-5 sm:px-7 py-4 flex items-center justify-between gap-3 ${
                  isVelvet
                    ? 'bg-[#22121D] border-[#EB8A78]/25'
                    : 'bg-slate-50/90 dark:bg-[#0B1222] border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <button
                  type="button"
                  onClick={handlePrevTab}
                  disabled={activeVariasiIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer ${
                    isVelvet
                      ? 'border-[#EB8A78]/30 bg-[#2B1723] text-[#FBF1F2] hover:bg-[#3A1F30]'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Indikator Dots Mini */}
                <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
                  {variasiList.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`h-2 rounded-full transition-all ${
                        activeVariasiIndex === dotIdx
                          ? isVelvet
                            ? 'w-5 bg-[#FF8A6B]'
                            : 'w-5 bg-[#3B82F6]'
                          : readTabs.has(dotIdx)
                          ? 'w-2 bg-[#10B981]'
                          : 'w-2 bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextTab}
                  disabled={activeVariasiIndex === variasiList.length - 1}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer ${
                    isVelvet
                      ? 'bg-[#FF8A6B] text-[#1E0F17] font-bold hover:brightness-110'
                      : 'bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600'
                  }`}
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* PEMBATAS HALUS ANTARA ZONA 2 & ZONA 3 */}
      <div className="relative flex items-center justify-center my-8 select-none">
        <div className={`w-full border-t ${isVelvet ? 'border-[#EB8A78]/25' : 'border-slate-200 dark:border-slate-700/75'}`} />
        <div
          className={`absolute px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-2xs ${
            isVelvet
              ? 'bg-[#2B1723] text-[#FFBE98] border-[#EB8A78]/35'
              : 'bg-[#F8FAFC] dark:bg-[#0D1426] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80'
          }`}
        >
          Zona 3 • Uji Pemahaman
        </div>
      </div>

      {/* SLOT IKLAN AMAN 2 (ANTARA ZONA 2 & ZONA 3) */}
      <AdSlot slotId="material-between-z2-z3" format="in-article" />

      {/* =====================================================================
          ZONA 3: ARENA UJI PEMAHAMAN INSTAN (ACTIVE RECALL)
          ===================================================================== */}
      {soalList.length > 0 && (
        <section aria-labelledby="zona3-title" className="space-y-6">
          <div className="px-1 sm:px-0">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Zona 3 • Active Recall
            </span>
            <h2 id="zona3-title" className="text-[17px] sm:text-xl font-extrabold text-[#1E293B] dark:text-white mt-0.5">
              Arena Uji Pemahaman Instan
            </h2>
            <p className="text-[15px] sm:text-[15.5px] text-slate-600 dark:text-slate-300 mt-1">
              Uji ketajaman pemahamanmu pada {soalList.length} soal simulasi UTBK berikut sebelum menyelesaikan sub-bab.
            </p>
          </div>

          {/* Kontainer Daftar Soal Mini */}
          <div className="space-y-5 sm:space-y-6">
            {soalList.map((soal) => {
              const nomor = soal.nomor_soal;
              const selectedAnswer = userAnswers[nomor];
              const isAnswered = Boolean(selectedAnswer || shortAnswers[nomor]);
              const isOpen = openPembahasan[nomor] ?? false;

              // Check if user answer is correct
              const isCorrectMC = selectedAnswer && soal.kunci_jawaban && selectedAnswer.trim().toUpperCase() === soal.kunci_jawaban.trim().toUpperCase();
              const isCorrectShort = shortAnswers[nomor] && soal.kunci_jawaban && shortAnswers[nomor].trim().toLowerCase() === soal.kunci_jawaban.trim().toLowerCase();
              const isCorrect = isCorrectMC || isCorrectShort;

              return (
                <div
                  key={nomor}
                  className={`rounded-2xl border p-3.5 sm:p-6 shadow-xs space-y-4 sm:space-y-5 max-w-full overflow-x-clip ${
                    isVelvet
                      ? 'bg-[#2B1723] border-[#EB8A78]/35'
                      : isPrism
                      ? 'bg-white/88 border-white/95'
                      : 'bg-white dark:bg-[#0F172A] border-slate-200/90 dark:border-slate-700/80'
                  }`}
                >
                  {/* Header Soal */}
                  <div className={`flex items-center justify-between gap-2 border-b pb-3 ${isVelvet ? 'border-[#EB8A78]/20' : 'border-slate-200/80 dark:border-slate-700/70'}`}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded border ${
                          isVelvet
                            ? 'bg-[#381C2C] text-[#FBF1F2] border-[#EB8A78]/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        Soal {nomor}
                      </span>
                      {soal.tipe_soal_utbk && (
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded font-bold border ${
                            isVelvet
                              ? 'bg-[#4A222B] text-[#FFBE98] border-[#EB8A78]/40'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          {soal.tipe_soal_utbk}
                        </span>
                      )}
                    </div>

                    {isAnswered && (
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950/85 text-emerald-800 dark:text-emerald-200 border border-emerald-400/50'
                            : 'bg-amber-100 dark:bg-amber-950/85 text-amber-800 dark:text-amber-200 border border-amber-400/50'
                        }`}
                      >
                        {isCorrect ? '✓ Tepat' : '💡 Analisis'}
                      </span>
                    )}
                  </div>

                  {/* Pertanyaan Markdown */}
                  <div className="text-[16px] leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 text-slate-800 dark:text-[#FBF1F2] max-w-full">
                    {renderMarkdown(soal.pertanyaan_markdown)}
                  </div>

                  {/* SVG Visual Soal (jika ada) */}
                  {soal.visual && (
                    <VisualRenderer
                      visual={soal.visual}
                      onZoom={setZoomSvg}
                    />
                  )}

                  {/* Pilihan Ganda (Standard MC / Pilihan Ganda Kompleks) */}
                  {soal.opsi_jawaban && soal.opsi_jawaban.length > 0 ? (
                    <div className={`space-y-2.5 pt-3 border-t ${isVelvet ? 'border-[#EB8A78]/20' : 'border-slate-100 dark:border-slate-800/80'}`}>
                      {soal.opsi_jawaban.map((opsiText, optIdx) => {
                        // Match key (e.g., 'A', 'B', 'C' or index fallback)
                        const keyMatch = opsiText.match(/^([A-Ea-e])\.\s*(.*)/);
                        const optionKey = keyMatch ? keyMatch[1].toUpperCase() : String.fromCharCode(65 + optIdx);
                        const cleanText = keyMatch ? keyMatch[2] : opsiText;

                        const isSelected = selectedAnswer === optionKey;
                        const isThisKeyCorrect = soal.kunci_jawaban && optionKey === soal.kunci_jawaban.trim().toUpperCase();

                        let optClass = isVelvet
                          ? 'border border-[#EB8A78]/25 bg-[#22121D] hover:border-[#FF8A6B] text-[#FBF1F2]'
                          : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200';
                        let badgeClass = isVelvet
                          ? 'bg-[#381C2C] text-[#FFBE98]'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

                        if (isSelected) {
                          if (isThisKeyCorrect) {
                            optClass = 'border-2 border-[#10B981] bg-[#ECFDF5] dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 shadow-2xs';
                            badgeClass = 'bg-[#10B981] text-white';
                          } else {
                            optClass = isVelvet
                              ? 'border-2 border-rose-400 bg-[#4A121D] text-rose-100 shadow-2xs'
                              : 'border-2 border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 shadow-2xs';
                            badgeClass = 'bg-rose-500 text-white';
                          }
                        } else if (selectedAnswer && isThisKeyCorrect) {
                          // Show which one was correct if user picked wrong
                          optClass = 'border-2 border-emerald-400/80 bg-emerald-50/50 dark:bg-emerald-950/45 text-emerald-950 dark:text-emerald-100';
                          badgeClass = 'bg-[#10B981] text-white';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectQuizAnswer(nomor, optionKey)}
                            className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${optClass}`}
                          >
                            <span className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${badgeClass}`}>
                              {optionKey}
                            </span>
                            <span className="text-[15px] sm:text-[15.5px] leading-relaxed flex-1 mt-0.5">
                              {renderInlineMarkdown(cleanText)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Isian Singkat Input */
                    <div className="flex items-center gap-2 max-w-sm pt-1">
                      <input
                        type="text"
                        placeholder="Ketik jawaban singkat..."
                        value={shortAnswers[nomor] || ''}
                        onChange={(e) => setShortAnswers((prev) => ({ ...prev, [nomor]: e.target.value }))}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-mono focus:outline-hidden focus:border-[#3B82F6]"
                      />
                      <button
                        type="button"
                        onClick={() => togglePembahasan(nomor)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
                      >
                        Periksa
                      </button>
                    </div>
                  )}

                  {/* Accordion Bedah Cepat & Analisis Opsi */}
                  {soal.bedah_cepat_markdown && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => togglePembahasan(nomor)}
                        className={`flex items-center justify-between w-full p-3.5 rounded-xl border text-sm font-bold transition cursor-pointer ${
                          isVelvet
                            ? 'bg-[#22121D] hover:bg-[#341B2B] border-[#EB8A78]/30 text-[#FBF1F2]'
                            : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>Bedah Cepat & Analisis Opsi</span>
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {isOpen && (
                        <div
                          className={`mt-2 p-3.5 sm:p-4 rounded-xl border text-[15px] sm:text-[15.5px] leading-[1.85] fade-in max-w-full overflow-x-clip ${
                            isVelvet
                              ? 'bg-[#1F1020] border-[#EB8A78]/25 text-[#FBF1F2]'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {soal.kunci_jawaban && (
                            <div className="font-bold text-slate-900 dark:text-white mb-2">
                              Kunci Jawaban: <span className="font-mono text-[#10B981]">{soal.kunci_jawaban}</span>
                            </div>
                          )}
                          <div className="max-w-full leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0">{renderMarkdown(soal.bedah_cepat_markdown)}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bagian Penutup: Tombol Selesai & Ringkasan Penguasaan */}
          <div className="pt-4 space-y-4">
            <button
              type="button"
              onClick={handleToggleCompletion}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-[17px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                isCompleted
                  ? 'bg-[#10B981] text-white hover:bg-emerald-600'
                  : isVelvet
                  ? 'bg-[#FF8A6B] hover:brightness-110 text-[#1E0F17] font-extrabold'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white'
                  : 'bg-[#1E293B] hover:bg-slate-800 text-white'
              }`}
            >
              <span>{isCompleted ? 'Sub-bab Selesai Dipelajari ✓' : 'Tandai Sub-bab Selesai ✓'}</span>
            </button>

            {/* Ringkasan Penguasaan Sub-Bab (Muncul saat tombol diklik / selesai) */}
            {isCompleted && (
              <div className="rounded-2xl bg-[#ECFDF5] dark:bg-emerald-950/25 border border-[#10B981]/50 border-l-4 border-l-[#10B981] p-5 sm:p-6 space-y-3 fade-in">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-100 text-lg">
                    🎉 Status: Selesai Dipelajari
                  </span>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200">
                    100% Tuntas
                  </span>
                </div>
                <p className="text-[16px] text-emerald-950 dark:text-emerald-200 leading-relaxed">
                  Kamu telah mempelajari seluruh konsep, bedah variasi pola soal, dan uji active recall untuk sub-bab <strong>{metadata.id}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => onStartDrillingThisTopic(metadata.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition cursor-pointer shadow-xs"
                  >
                    <Award className="w-4 h-4" />
                    <span>Lanjut Drilling Soal Topik Ini</span>
                  </button>
                  {hasPrev && (prevHref ? (
                    <Link
                      to={prevHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Materi Sebelumnya</span>
                    </Link>
                  ) : onPrevSubchapter ? (
                    <button
                      type="button"
                      onClick={onPrevSubchapter}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Materi Sebelumnya</span>
                    </button>
                  ) : null)}
                  {hasNext && (nextHref ? (
                    <Link
                      to={nextHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-900 text-white transition cursor-pointer"
                    >
                      <span>Materi Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : onNextSubchapter ? (
                    <button
                      type="button"
                      onClick={onNextSubchapter}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-900 text-white transition cursor-pointer"
                    >
                      <span>Materi Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null)}
                </div>
              </div>
            )}

            {/* Navigasi Crawl-Friendly Sub-bab Sebelumnya & Berikutnya */}
            {(hasPrev || hasNext) && (
              <nav
                aria-label="Navigasi Sub-bab"
                className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200/80 dark:border-slate-800/80"
              >
                {hasPrev && prevHref ? (
                  <Link
                    to={prevHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sub-bab Sebelumnya</span>
                  </Link>
                ) : (
                  <span />
                )}

                {hasNext && nextHref && (
                  <Link
                    to={nextHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-indigo-600 dark:text-cyan-300 hover:bg-indigo-50 dark:hover:bg-cyan-950/40 bg-white dark:bg-slate-900/60 border border-indigo-200 dark:border-cyan-800/50 transition-colors ml-auto"
                  >
                    <span>Sub-bab Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>
      )}

      {/* Modal Tap-to-Zoom SVG Graphics */}
      {zoomSvg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setZoomSvg(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-auto bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Visualisasi Model (Mode Diperbesar)</span>
              </span>
              <button
                type="button"
                onClick={() => setZoomSvg(null)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                aria-label="Tutup Pratinjau Gambar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full overflow-auto flex justify-center py-4">
              <VisualRenderer
                visual={zoomSvg}
                showZoomButton={false}
                className="my-0 border-0 bg-transparent w-full"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
