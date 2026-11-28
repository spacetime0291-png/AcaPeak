import React, { useState, useEffect, useMemo, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  FileText,
  X,
} from 'lucide-react';
import type { WorkedExample, VisualData } from '../../types/material';
import type { DrillingSessionItem } from '../../lib/drillingHistory';
import { ThemeToggle } from '../common/ThemeToggle';
import { VisualRenderer } from '../content/VisualRenderer';
import { formatMarkdownMath } from '../../lib/markdownUtils';
import type { ThemeId } from '../../lib/theme';

const REMARK_PLUGINS = [remarkMath, remarkGfm];
const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

export const DRILLING_MARKDOWN_COMPONENTS = {
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="w-full overflow-x-auto my-3 max-w-full rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs">
      <table className="w-full min-w-full text-left border-collapse text-[15px] sm:text-base leading-relaxed" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/80" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
    <th className="py-2.5 px-3.5 font-bold text-inherit align-top" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="py-2.5 px-3.5 text-inherit leading-relaxed align-top" {...props}>
      {children}
    </td>
  ),
  p: ({ children }: any) => (
    <p className="mt-0 mb-3 last:mb-0 leading-[1.8] text-inherit break-words [overflow-wrap:anywhere]">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-outside pl-5 my-2.5 space-y-1.5 text-inherit break-words [overflow-wrap:anywhere]">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-outside pl-5 my-2.5 space-y-1.5 text-inherit break-words [overflow-wrap:anywhere]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-[1.8] text-inherit break-words [overflow-wrap:anywhere]">
      {children}
    </li>
  ),
  strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
  em: ({ children }: any) => <em className="italic text-inherit">{children}</em>,
  blockquote: ({ children }: any) => (
    <blockquote className="my-3 pl-4 border-l-3 border-slate-300 dark:border-slate-600 text-inherit opacity-90">
      {children}
    </blockquote>
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
  pre: ({ children }: any) => (
    <div className="w-full overflow-x-auto my-3 max-w-full rounded-xl bg-slate-900 text-slate-100 p-4 text-sm">
      <pre>{children}</pre>
    </div>
  ),
};

export const MemoDrillingMarkdown = memo<{ text?: string }>(({ text }) => {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={KATEX_REHYPE_PLUGINS}
      components={DRILLING_MARKDOWN_COMPONENTS}
    >
      {formatMarkdownMath(text)}
    </ReactMarkdown>
  );
});
MemoDrillingMarkdown.displayName = 'MemoDrillingMarkdown';

const REVIEW_MARKDOWN_COMPONENTS_DEFAULT = {
  ...DRILLING_MARKDOWN_COMPONENTS,
  strong: ({ children }: any) => (
    <strong className="font-extrabold text-indigo-950 dark:text-cyan-200 bg-amber-100/90 dark:bg-cyan-950/75 px-1 py-0.2 rounded">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-3 px-3.5 py-2.5 border-l-4 border-indigo-500 dark:border-cyan-400 bg-indigo-50/70 dark:bg-cyan-950/35 rounded-r-xl text-inherit font-medium">
      {children}
    </blockquote>
  ),
};

const REVIEW_MARKDOWN_COMPONENTS_VELVET = {
  ...DRILLING_MARKDOWN_COMPONENTS,
  strong: ({ children }: any) => (
    <strong className="font-extrabold text-[#FFBE98] bg-[#4A222B] px-1 py-0.2 rounded">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-3 px-3.5 py-2.5 border-l-4 border-[#FF8A6B] bg-[#381C2C] rounded-r-xl text-inherit font-medium">
      {children}
    </blockquote>
  ),
};

export const MemoReviewMarkdown = memo<{ text?: string; isVelvet?: boolean }>(({ text, isVelvet = false }) => {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={KATEX_REHYPE_PLUGINS}
      components={isVelvet ? REVIEW_MARKDOWN_COMPONENTS_VELVET : REVIEW_MARKDOWN_COMPONENTS_DEFAULT}
    >
      {formatMarkdownMath(text)}
    </ReactMarkdown>
  );
});
MemoReviewMarkdown.displayName = 'MemoReviewMarkdown';

export function getQuestionTypeBadgeLabel(q: WorkedExample): string {
  if (q.question_type_label) return q.question_type_label;
  switch (q.question_type) {
    case 'mc_complex_table':
      return 'PGK Tabel';
    case 'mc_complex_checkbox':
      return 'PGK Majemuk';
    case 'short_answer':
      return 'Isian Singkat';
    default:
      return 'Pilihan Ganda';
  }
}

export function getLevelBadgeLabel(q: WorkedExample): string {
  if (q.level_kognitif) return q.level_kognitif;
  return q.difficulty === 'hard' ? 'HOTS' : 'Standar';
}

export type ReviewFilter = 'all' | 'wrong' | 'correct';

interface DrillingReviewViewProps {
  items: DrillingSessionItem[];
  totalConfigured?: number;
  sessionSummaryLabel?: string;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  backLabel?: string;
  footerBackLabel?: string;
  onBack: () => void;
  embedded?: boolean;
}

export const DrillingReviewView: React.FC<DrillingReviewViewProps> = ({
  items,
  totalConfigured,
  sessionSummaryLabel,
  theme = 'light',
  onSelectTheme,
  backLabel = 'Skor',
  footerBackLabel = 'Ringkasan Skor',
  onBack,
  embedded = false,
}) => {
  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [isReviewPaletteOpen, setIsReviewPaletteOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [collapsedStimuli, setCollapsedStimuli] = useState<Record<string, boolean>>({});
  const [zoomSvg, setZoomSvg] = useState<VisualData | null>(null);

  useEffect(() => {
    setReviewIndex(0);
    setIsReviewPaletteOpen(false);
    setReviewFilter('all');
  }, [items]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [reviewIndex]);

  useEffect(() => {
    if (!items || items.length === 0 || zoomSvg) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowLeft' && reviewIndex > 0) {
        setReviewIndex((prev) => prev - 1);
      } else if (e.key === 'ArrowRight' && reviewIndex < items.length - 1) {
        setReviewIndex((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [items, reviewIndex, zoomSvg]);

  const correctCount = useMemo(
    () => items.filter((item) => item.isCorrect).length,
    [items]
  );
  const wrongCount = items.length - correctCount;

  const filteredItems = useMemo(() => {
    return items
      .map((item, idx) => ({ ...item, idx }))
      .filter((item) => {
        if (reviewFilter === 'correct') return item.isCorrect;
        if (reviewFilter === 'wrong') return !item.isCorrect;
        return true;
      });
  }, [items, reviewFilter]);

  if (!items || items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Belum ada soal yang dikerjakan pada sesi ini.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold cursor-pointer"
        >
          Kembali
        </button>
      </div>
    );
  }

  const totalCounted = items.length;
  const activeItem = items[reviewIndex] || items[0];
  const q = activeItem.question;
  const userAnswer = activeItem.userAnswer;
  const isCorrect = activeItem.isCorrect;
  const isReviewStimulusCollapsed = Boolean(collapsedStimuli[`rev_${q.example_id}`]);
  const isReviewLongStimulus = (q.context_markdown?.length || 0) > 450;

  let userAnswerLabel = '-';
  let keyAnswerLabel = String(q.correct_answer || '-');

  if (q.question_type === 'short_answer') {
    userAnswerLabel = String(userAnswer ?? '-');
    keyAnswerLabel = String(q.short_answer_key ?? q.correct_answer ?? '-');
  } else if (q.question_type === 'mc_complex_table' && q.complex_statements) {
    const ansMap = (userAnswer || {}) as Record<string, string>;
    const col0 = (q.table_headers || ['Benar', 'Salah'])[0];
    const col1 = (q.table_headers || ['Benar', 'Salah'])[1];
    const rowRight = q.complex_statements.filter((stmt) => {
      const correctChoice = stmt.is_true ? col0 : col1;
      return ansMap[stmt.id] === correctChoice;
    }).length;
    userAnswerLabel = `${rowRight}/${q.complex_statements.length} Tepat`;
    keyAnswerLabel = q.complex_statements
      .map((stmt, rIdx) => `${rIdx + 1}. ${stmt.is_true ? col0 : col1}`)
      .join(', ');
  } else if (q.question_type === 'mc_complex_checkbox') {
    userAnswerLabel = Array.isArray(userAnswer)
      ? [...userAnswer].sort().join(', ')
      : String(userAnswer ?? '-');
  } else {
    userAnswerLabel = String(userAnswer ?? '-');
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-28 animate-page-enter">
      {/* 1. REVIEW HEADER BAR */}
      <div
        className={`${embedded ? '' : 'sticky top-0 z-30'} backdrop-blur-md rounded-2xl border shadow-sm p-2.5 sm:p-3.5 mb-3 sm:mb-4 transition-all duration-300 ${
          isVelvet
            ? 'bg-[#1B0F1D]/92 border-[#EB8A78]/18'
            : isCosmic
            ? 'bg-[#0c1224]/92 border-slate-800'
            : isPrism
            ? 'bg-white/85 border-white/95'
            : 'bg-white/95 border-stone-200/90'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>{backLabel}</span>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
              Pembahasan {reviewIndex + 1} <span className="text-slate-400 font-normal">/ {totalCounted}</span>
            </span>
            {isCorrect ? (
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                <span>Benar</span>
              </span>
            ) : (
              <span
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold border flex items-center gap-1 shrink-0 ${
                  isVelvet
                    ? 'bg-[#4A121D] text-rose-200 border-rose-400/40'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
                }`}
              >
                <XCircle className="w-3 h-3" />
                <span>Salah</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsReviewPaletteOpen((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition ${
                isReviewPaletteOpen
                  ? isVelvet
                    ? 'bg-[#E27B60] text-[#1E0F17] border-[#E27B60]'
                    : 'bg-indigo-600 dark:bg-cyan-600 text-white border-transparent'
                  : isVelvet
                  ? 'border-[#EB8A78]/18 text-[#FBF1F2] hover:bg-[#3A1F30]'
                  : 'border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800'
              }`}
              title="Daftar Nomor Pembahasan"
              aria-expanded={isReviewPaletteOpen}
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Daftar</span>
            </button>

            {!embedded && onSelectTheme && (
              <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
            )}
          </div>
        </div>

        {(sessionSummaryLabel || (totalConfigured !== undefined && totalCounted < totalConfigured)) && (
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            {sessionSummaryLabel && <span>{sessionSummaryLabel}</span>}
            {totalConfigured !== undefined && totalCounted < totalConfigured && (
              <span>
                Menampilkan {totalCounted} soal dikerjakan ({totalConfigured - totalCounted} soal tidak dikerjakan tidak dihitung)
              </span>
            )}
          </div>
        )}

        <div className={`w-full h-1.5 rounded-full overflow-hidden mt-2 ${isVelvet ? 'bg-[#381C2C]' : 'bg-stone-100 dark:bg-slate-800'}`}>
          <div
            className={`h-full transition-all duration-300 ${
              isVelvet
                ? 'bg-[#E27B60]'
                : isPrism
                ? 'bg-gradient-to-r from-blue-600 to-sky-500'
                : 'bg-indigo-600 dark:bg-cyan-500'
            }`}
            style={{ width: `${((reviewIndex + 1) / totalCounted) * 100}%` }}
          />
        </div>

        {/* Review Palette Drawer */}
        {isReviewPaletteOpen && (
          <div
            className={`mt-3 pt-3 border-t space-y-3 max-h-[55vh] overflow-y-auto ${
              isVelvet ? 'border-[#EB8A78]/18' : 'border-stone-100 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all' as ReviewFilter, label: `Semua (${totalCounted})` },
                  { id: 'wrong' as ReviewFilter, label: `Salah (${wrongCount})` },
                  { id: 'correct' as ReviewFilter, label: `Benar (${correctCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                      reviewFilter === tab.id
                        ? isVelvet
                          ? 'bg-[#E27B60] text-[#1E0F17] border-[#E27B60]'
                          : 'bg-indigo-600 dark:bg-cyan-600 text-white border-transparent'
                        : isVelvet
                        ? 'bg-[#2B1723] text-[#EBD6DC] border-[#EB8A78]/18'
                        : 'bg-stone-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsReviewPaletteOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-2">
                Tidak ada soal pada kategori filter ini.
              </p>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pb-1">
                {filteredItems.map((item) => {
                  const isCurrent = item.idx === reviewIndex;
                  let badgeClass = item.isCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-bold'
                    : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60 font-bold';

                  if (isCurrent) {
                    badgeClass += isVelvet
                      ? ' ring-2 ring-[#EB8A78]/70'
                      : ' ring-2 ring-indigo-500 dark:ring-cyan-600/80';
                  }

                  return (
                    <button
                      key={`${item.question.example_id}-${item.idx}`}
                      type="button"
                      onClick={() => {
                        setReviewIndex(item.idx);
                        setIsReviewPaletteOpen(false);
                      }}
                      className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center cursor-pointer ${badgeClass}`}
                    >
                      {item.idx + 1}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. SINGLE-QUESTION REVIEW CARD */}
      <div
        className={`rounded-2xl sm:rounded-3xl border shadow-sm px-3.5 py-4 sm:p-6 space-y-4 sm:space-y-5 transition-colors ${
          isVelvet
            ? 'bg-[#2B1723] border-[#EB8A78]/18'
            : isPrism
            ? 'bg-white/90 border-white/95'
            : 'bg-white dark:bg-[#0c1326] border-stone-200/90 dark:border-slate-800'
        }`}
      >
        {/* Tags Row */}
        <div className={`flex flex-wrap items-center justify-between gap-2 pb-3 border-b ${isVelvet ? 'border-[#EB8A78]/15' : 'border-stone-100 dark:border-slate-800'}`}>
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                isVelvet
                  ? 'text-[#FFBE98] bg-[#4A222B] border-[#EB8A78]/20'
                  : 'text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/60 border-indigo-200/80 dark:border-cyan-900/50'
              }`}
            >
              {q.subtest_code ? `${q.subtest_code} • ` : ''}
              {q.variation_name}
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-1 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200/80 dark:border-slate-800">
              {getQuestionTypeBadgeLabel(q)}
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border ${
                getLevelBadgeLabel(q) === 'HOTS'
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
              }`}
            >
              {getLevelBadgeLabel(q)}
            </span>
          </div>
          {activeItem.originalIndex !== undefined && (
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Urutan Sesi #{activeItem.originalIndex + 1}
            </span>
          )}
        </div>

        {/* Highlighted Answer Comparison Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div
            className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs sm:text-sm ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/45 border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/45 border-rose-300 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
            }`}
          >
            <span className="font-semibold opacity-80">Jawaban Anda</span>
            <span className="font-extrabold">{userAnswerLabel}</span>
          </div>

          <div className="px-3.5 py-2.5 rounded-xl border bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400/70 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Kunci Jawaban</span>
            </span>
            <span className="font-black text-emerald-700 dark:text-emerald-300">{keyAnswerLabel}</span>
          </div>
        </div>

        {/* Stimulus / Context */}
        {q.context_markdown && (
          <div
            className={`p-3 sm:p-4 rounded-xl border border-l-4 text-[15px] sm:text-base leading-[1.8] ${
              isVelvet
                ? 'bg-[#1F1020] border-[#EB8A78]/15 border-l-[#EB8A78]/40 text-[#FBF1F2]'
                : 'bg-stone-50/90 dark:bg-slate-900 border-stone-200/80 dark:border-slate-800 border-l-slate-400 dark:border-l-slate-600/75 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Wacana / Stimulus</span>
              </span>
              {isReviewLongStimulus && (
                <button
                  type="button"
                  onClick={() =>
                    setCollapsedStimuli((prev) => ({
                      ...prev,
                      [`rev_${q.example_id}`]: !prev[`rev_${q.example_id}`],
                    }))
                  }
                  className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{isReviewStimulusCollapsed ? 'Tampilkan' : 'Sembunyikan'}</span>
                  {isReviewStimulusCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
            {!isReviewStimulusCollapsed && <MemoDrillingMarkdown text={q.context_markdown} />}
          </div>
        )}

        {/* SVG Illustration in Review */}
        {q.svg_illustration?.svg_code && (
          <div className="rounded-xl border border-stone-200 dark:border-slate-700 bg-white p-2.5 sm:p-4 overflow-hidden">
            <VisualRenderer
              visual={{ tipe: 'svg', kode: q.svg_illustration.svg_code }}
              onZoom={setZoomSvg}
              className="my-0"
            />
          </div>
        )}

        {/* Question text */}
        <div className="text-[15px] sm:text-base font-normal text-slate-900 dark:text-slate-100 leading-[1.8]">
          <MemoDrillingMarkdown text={q.question_markdown} />
        </div>

        {/* Answer Review for Complex Table */}
        {q.question_type === 'mc_complex_table' && q.complex_statements && (
          <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 dark:border-slate-800 shadow-2xs">
            <table className="w-full text-left border-collapse text-sm sm:text-[15px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 text-xs sm:text-sm">
                  <th className="px-2.5 py-2.5 sm:p-3 font-bold">Pernyataan</th>
                  <th className="px-2 py-2.5 sm:p-3 text-center font-bold w-16 sm:w-24">Anda</th>
                  <th className="px-2 py-2.5 sm:p-3 text-center font-bold text-emerald-600 dark:text-emerald-400 w-16 sm:w-24">Kunci</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800">
                {q.complex_statements.map((stmt) => {
                  const ansMap = (userAnswer || {}) as Record<string, string>;
                  const userChoice = ansMap[stmt.id] || '-';
                  const col0 = (q.table_headers || ['Benar', 'Salah'])[0];
                  const col1 = (q.table_headers || ['Benar', 'Salah'])[1];
                  const correctChoice = stmt.is_true ? col0 : col1;
                  const isRowCorrect = userChoice === correctChoice;

                  return (
                    <tr key={stmt.id} className="hover:bg-stone-50/50 dark:hover:bg-slate-800/40">
                      <td className="px-2.5 py-2.5 sm:p-3 text-[15px] text-slate-800 dark:text-slate-200 leading-[1.7]">
                        <MemoDrillingMarkdown text={stmt.statement_markdown} />
                      </td>
                      <td className={`px-2 py-2.5 sm:p-3 text-center font-bold text-xs sm:text-sm ${isRowCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {userChoice}
                      </td>
                      <td className="px-2 py-2.5 sm:p-3 text-center font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                        {correctChoice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Answer Review for Complex Checkbox */}
        {q.question_type === 'mc_complex_checkbox' && (
          <div className="space-y-2">
            {(q.complex_statements && q.complex_statements.length > 0
              ? q.complex_statements.map((s) => ({
                  id: s.id,
                  text: s.statement_markdown,
                  is_correct: s.is_true,
                }))
              : (q.options || []).map((o) => ({
                  id: o.key,
                  text: o.text_markdown,
                  is_correct: String(q.correct_answer || '')
                    .split(/[,;\s]+/)
                    .map((k) => k.trim().toUpperCase())
                    .includes(o.key.toUpperCase()),
                }))
            ).map((item) => {
              const userSelectedList: string[] = Array.isArray(userAnswer) ? userAnswer : [];
              const wasSelected = userSelectedList.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    item.is_correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                      : wasSelected
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                      : 'bg-white dark:bg-slate-900 border-stone-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-mono font-bold text-xs shrink-0 mt-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {item.id}
                  </span>
                  <div className="flex-1 text-[15px] sm:text-base leading-[1.75]">
                    <MemoDrillingMarkdown text={item.text} />
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1 text-xs font-bold">
                    {wasSelected && (
                      <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        Dipilih
                      </span>
                    )}
                    {item.is_correct && (
                      <span className="text-emerald-700 dark:text-emerald-400">✓ Kunci</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Answer Review for Standard Multiple Choice */}
        {q.question_type !== 'mc_complex_table' &&
          q.question_type !== 'mc_complex_checkbox' &&
          q.question_type !== 'short_answer' && (
            <div className="space-y-2">
              {(q.options || []).map((opt) => {
                const isKeyOpt = opt.key === q.correct_answer;
                const isUserOpt = opt.key === userAnswer;
                return (
                  <div
                    key={opt.key}
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 ${
                      isKeyOpt
                        ? 'bg-emerald-50 dark:bg-emerald-950/65 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-400/50'
                        : isUserOpt
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                        : isVelvet
                        ? 'bg-[#22121D] border-[#EB8A78]/20 text-[#EBD6DC]'
                        : 'bg-white dark:bg-slate-900 border-stone-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isKeyOpt
                          ? 'bg-emerald-600 text-white'
                          : isUserOpt
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <div className="flex-1 text-[15px] sm:text-base leading-[1.75]">
                      <MemoDrillingMarkdown text={opt.text_markdown} />
                    </div>
                    {isKeyOpt && (
                      <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                        ✓ Kunci
                      </span>
                    )}
                    {!isKeyOpt && isUserOpt && (
                      <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                        Pilihanmu
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        {/* HIGHLIGHTED PEMBAHASAN LENGKAP */}
        <div
          className={`p-3.5 sm:p-5 rounded-2xl border border-l-4 space-y-2.5 shadow-2xs ${
            isVelvet
              ? 'bg-[#22121D] border-[#EB8A78]/18 border-l-[#EB8A78]/45 text-[#FBF1F2]'
              : 'bg-indigo-50/70 dark:bg-[#0f1a34] border-indigo-200/80 dark:border-slate-800 border-l-indigo-600 dark:border-l-cyan-700/65 text-slate-800 dark:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                isVelvet
                  ? 'bg-[#4A222B] text-[#FFBE98]'
                  : 'bg-indigo-100 dark:bg-cyan-950/70 text-indigo-800 dark:text-cyan-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inti Pembahasan</span>
            </span>
          </div>
          <div className="text-[15px] sm:text-base leading-[1.8]">
            <MemoReviewMarkdown text={q.conceptual_solution_markdown} isVelvet={isVelvet} />
          </div>
        </div>

        {/* HIGHLIGHTED TRIK CEPAT */}
        {q.quick_trick_markdown && (
          <div
            className={`p-3.5 sm:p-5 rounded-2xl border border-l-4 space-y-2 shadow-2xs ${
              isVelvet
                ? 'bg-[#361D1E] border-[#EB8A78]/18 border-l-[#D4954B]/55 text-[#FBF1F2]'
                : 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-300/80 dark:border-amber-900/45 border-l-amber-500 dark:border-l-amber-700/60 text-amber-950 dark:text-amber-100'
            }`}
          >
            <span
              className={`inline-flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                isVelvet
                  ? 'bg-[#482E1A] text-[#F5B041]'
                  : 'bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200'
              }`}
            >
              ⚡ Trik Cepat / Eliminasi Kilat
            </span>
            <div className="text-[15px] sm:text-base leading-[1.8]">
              <MemoReviewMarkdown text={q.quick_trick_markdown} isVelvet={isVelvet} />
            </div>
          </div>
        )}

        {/* Optional Hint */}
        {q.hint_markdown && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 dark:bg-slate-900/80 border border-stone-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 space-y-1.5">
            <div className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Petunjuk Soal</span>
            </div>
            <div className="text-[15px] sm:text-base leading-[1.8]">
              <MemoReviewMarkdown text={q.hint_markdown} isVelvet={isVelvet} />
            </div>
          </div>
        )}
      </div>

      {/* 3. STICKY BOTTOM REVIEW NAVIGATION BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t shadow-2xl p-2.5 sm:p-3.5 transition-all duration-300 ${
          isVelvet
            ? 'bg-[#1B0F1D]/95 border-[#EB8A78]/18'
            : isCosmic
            ? 'bg-[#0c1224]/92 border-slate-800'
            : isPrism
            ? 'bg-white/85 border-white/95'
            : 'bg-white/95 border-stone-200/90'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            disabled={reviewIndex === 0}
            onClick={() => setReviewIndex((prev) => Math.max(0, prev - 1))}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer shadow-2xs ${
              isVelvet
                ? 'border-[#EB8A78]/30 bg-[#2B1723] text-[#FBF1F2] hover:bg-[#3A1F30]'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
          >
            {footerBackLabel}
          </button>

          {reviewIndex < totalCounted - 1 ? (
            <button
              type="button"
              onClick={() => setReviewIndex((prev) => Math.min(totalCounted - 1, prev + 1))}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isVelvet
                  ? 'bg-gradient-to-r from-[#FF8A6B] to-[#F5B041] text-[#1E0F17] font-extrabold'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-cyan-500 hover:from-blue-700 hover:to-indigo-700 text-white dark:shadow-[0_0_15px_rgba(0,242,254,0.35)]'
              }`}
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Selesai</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* SVG Zoom Modal */}
      {zoomSvg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomSvg(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-auto bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Ilustrasi Soal (Mode Diperbesar)</span>
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
            <div className="w-full overflow-auto flex justify-center py-4 bg-white rounded-xl">
              <VisualRenderer
                visual={zoomSvg}
                showZoomButton={false}
                className="my-0 border-0 bg-transparent w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
