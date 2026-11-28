import React, { useState, useEffect, useMemo, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  Sparkles,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Check,
  LayoutGrid,
  FileText,
  X,
} from 'lucide-react';
import type { WorkedExample, VisualData } from '../../types/material';
import {
  isAnswerCorrect,
  recordQuestionsSeen,
} from '../../lib/drillingRotationEngine';
import { ThemeToggle } from '../common/ThemeToggle';
import { VisualRenderer } from '../content/VisualRenderer';
import { formatMarkdownMath } from '../../lib/markdownUtils';
import type { ThemeId } from '../../lib/theme';

const REMARK_PLUGINS = [remarkMath, remarkGfm];
const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

const DRILLING_MARKDOWN_COMPONENTS = {
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

const MemoDrillingMarkdown = memo<{ text?: string }>(({ text }) => {
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

const MemoReviewMarkdown = memo<{ text?: string; isVelvet?: boolean }>(({ text, isVelvet = false }) => {
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

function getQuestionTypeBadgeLabel(q: WorkedExample): string {
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

function getLevelBadgeLabel(q: WorkedExample): string {
  if (q.level_kognitif) return q.level_kognitif;
  return q.difficulty === 'hard' ? 'HOTS' : 'Standar';
}

interface ActiveDrillingViewProps {
  questions: WorkedExample[];
  currentQuestionIndex: number;
  timerMinutes: number | null; // null = santai
  isLoading?: boolean;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onNavigateQuestion: (index: number) => void;
  onExitDrilling: () => void;
}

type ReviewFilter = 'all' | 'wrong' | 'correct' | 'unanswered';
type DrillingViewPhase = 'active' | 'summary' | 'review';

export const ActiveDrillingView: React.FC<ActiveDrillingViewProps> = ({
  questions,
  currentQuestionIndex,
  timerMinutes,
  isLoading = false,
  theme = 'light',
  onSelectTheme = () => {},
  onNavigateQuestion,
  onExitDrilling,
}) => {
  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Answers state: { [questionId]: answerValue }
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [viewPhase, setViewPhase] = useState<DrillingViewPhase>('active');
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [isReviewPaletteOpen, setIsReviewPaletteOpen] = useState(false);
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [collapsedStimuli, setCollapsedStimuli] = useState<Record<string, boolean>>({});
  const [zoomSvg, setZoomSvg] = useState<VisualData | null>(null);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');

  const isFinished = viewPhase !== 'active';

  // Timer states
  const initialSeconds = timerMinutes ? timerMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Loading state while fetching drilling bank JSONs
  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div
          className={`rounded-3xl border p-8 shadow-sm ${
            isVelvet
              ? 'bg-[#2B1723] border-[#EB8A78]/35'
              : isPrism
              ? 'bg-white/85 border-white/95'
              : 'bg-white dark:bg-[#0c1326] border-stone-200 dark:border-slate-800'
          }`}
        >
          <div className="inline-block w-9 h-9 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-[15px] sm:text-base font-semibold text-slate-700 dark:text-slate-200">
            Menyiapkan paket soal drilling...
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Menyusun rotasi soal sesuai proporsi UTBK-SNBT.
          </p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Soal Latihan Belum Tersedia</h2>
        <p className="text-sm sm:text-[15px] text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Belum ada soal pada topik yang dipilih. Silakan kembali untuk memilih topik atau subtes lainnya.
        </p>
        <button
          type="button"
          onClick={onExitDrilling}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Subtes</span>
        </button>
      </div>
    );
  }

  // Timer effect
  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      if (timerMinutes) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            recordQuestionsSeen(questions.map((q) => q.example_id));
            setViewPhase('summary');
            setReviewIndex(0);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setSecondsElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished, timerMinutes, questions]);

  // Ensure interactive drilling sessions are never indexed by search engines
  useEffect(() => {
    if (typeof document === 'undefined') return;
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const originalContent = meta ? meta.getAttribute('content') : null;
    const created = !meta;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';

    return () => {
      if (created) {
        meta?.remove();
      } else if (meta && originalContent) {
        meta.content = originalContent;
      }
    };
  }, []);

  // Scroll smoothly to top when switching questions during active test or review
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentQuestionIndex, reviewIndex, viewPhase]);

  // Keyboard navigation (Left/Right arrows when not typing in input)
  useEffect(() => {
    if (viewPhase === 'summary' || showExitConfirm || showSubmitConfirm || zoomSvg) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (viewPhase === 'active') {
        if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
          onNavigateQuestion(currentQuestionIndex - 1);
        } else if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
          onNavigateQuestion(currentQuestionIndex + 1);
        }
      } else if (viewPhase === 'review') {
        if (e.key === 'ArrowLeft' && reviewIndex > 0) {
          setReviewIndex((prev) => prev - 1);
        } else if (e.key === 'ArrowRight' && reviewIndex < questions.length - 1) {
          setReviewIndex((prev) => prev + 1);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    viewPhase,
    showExitConfirm,
    showSubmitConfirm,
    zoomSvg,
    currentQuestionIndex,
    reviewIndex,
    questions.length,
    onNavigateQuestion,
  ]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;

  const toggleHint = (exampleId: string) => {
    setOpenHints((prev) => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  const toggleStimulusCollapse = (exampleId: string) => {
    setCollapsedStimuli((prev) => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  // Question Answer Handlers
  const handleSelectOption = (optionKey: string) => {
    if (isFinished) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.example_id]: optionKey,
    }));
  };

  const handleTableSelect = (stmtId: string, choice: string) => {
    if (isFinished) return;
    setAnswers((prev) => {
      const cur = (prev[currentQuestion.example_id] && typeof prev[currentQuestion.example_id] === 'object')
        ? { ...prev[currentQuestion.example_id] }
        : {};
      cur[stmtId] = choice;
      return {
        ...prev,
        [currentQuestion.example_id]: cur,
      };
    });
  };

  const handleCheckboxToggle = (itemId: string) => {
    if (isFinished) return;
    setAnswers((prev) => {
      const cur: string[] = Array.isArray(prev[currentQuestion.example_id])
        ? [...prev[currentQuestion.example_id]]
        : [];
      const idx = cur.indexOf(itemId);
      if (idx >= 0) {
        cur.splice(idx, 1);
      } else {
        cur.push(itemId);
      }
      return {
        ...prev,
        [currentQuestion.example_id]: cur,
      };
    });
  };

  const handleShortAnswerChange = (val: string) => {
    if (isFinished) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.example_id]: val,
    }));
  };

  const isQuestionAnswered = (q: WorkedExample): boolean => {
    const ans = answers[q.example_id];
    if (ans === undefined || ans === null) return false;
    if (q.question_type === 'mc_complex_table') {
      if (typeof ans !== 'object') return false;
      const totalRows = q.complex_statements?.length || 0;
      return totalRows > 0 ? Object.keys(ans).length === totalRows : Object.keys(ans).length > 0;
    }
    if (q.question_type === 'mc_complex_checkbox') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.question_type === 'short_answer') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    return typeof ans === 'string' && ans.length > 0;
  };

  const hasPartialAnswer = (q: WorkedExample): boolean => {
    const ans = answers[q.example_id];
    if (q.question_type === 'mc_complex_table' && ans && typeof ans === 'object') {
      return Object.keys(ans).length > 0;
    }
    return isQuestionAnswered(q);
  };

  const toggleFlagCurrent = () => {
    setFlaggedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestionIndex)) {
        next.delete(currentQuestionIndex);
      } else {
        next.add(currentQuestionIndex);
      }
      return next;
    });
  };

  const handleFinishDrilling = () => {
    setShowSubmitConfirm(false);
    setViewPhase('summary');
    setReviewIndex(0);
    setIsReviewPaletteOpen(false);
    setReviewFilter('all');
    recordQuestionsSeen(questions.map((q) => q.example_id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const correctCount = questions.filter((q) =>
    isAnswerCorrect(q, answers[q.example_id])
  ).length;
  const answeredCount = questions.filter((q) => isQuestionAnswered(q)).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const filteredReviewItems = useMemo(() => {
    return questions
      .map((q, idx) => ({
        q,
        idx,
        isCorrect: isAnswerCorrect(q, answers[q.example_id]),
        isAnswered: hasPartialAnswer(q),
      }))
      .filter((item) => {
        if (reviewFilter === 'correct') return item.isCorrect;
        if (reviewFilter === 'wrong') return item.isAnswered && !item.isCorrect;
        if (reviewFilter === 'unanswered') return !item.isAnswered;
        return true;
      });
  }, [questions, answers, reviewFilter]);

  // Shared SVG Zoom Modal
  const renderZoomModal = () =>
    zoomSvg && (
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
    );

  // -------------------------------------------------------------
  // VIEW 1: RESULTS SUMMARY ONLY (Skor Saja + Tombol Pembahasan)
  // -------------------------------------------------------------
  if (viewPhase === 'summary') {
    const wrongAnsweredCount = questions.filter(
      (q) => hasPartialAnswer(q) && !isAnswerCorrect(q, answers[q.example_id])
    ).length;
    const unansweredCount = totalQuestions - questions.filter((q) => hasPartialAnswer(q)).length;

    return (
      <div className="w-full max-w-2xl mx-auto py-4 sm:py-8 animate-page-enter">
        <div
          className={`rounded-3xl border p-5 sm:p-8 text-center shadow-sm transition-colors ${
            isVelvet
              ? 'bg-[#2B1723] border-[#EB8A78]/35'
              : isPrism
              ? 'bg-white/90 border-white/95'
              : 'bg-white dark:bg-[#0c1326] border-stone-200 dark:border-slate-800'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4 shadow-2xs ${
              isVelvet
                ? 'bg-[#3A1F31] border-[#EB8A78]/40 text-[#FFBE98]'
                : 'bg-indigo-50 dark:bg-cyan-950/70 border-indigo-100 dark:border-cyan-800 text-indigo-600 dark:text-cyan-400'
            }`}
          >
            <Trophy className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#FBF1F2] tracking-tight">
            Sesi Drilling Selesai!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {accuracy >= 80
              ? 'Hasil yang sangat kuat! Periksa pembahasan untuk mengunci konsep.'
              : accuracy >= 50
              ? 'Progres bagus! Buka pembahasan untuk menambal soal yang keliru.'
              : 'Setiap soal adalah bahan evaluasi. Pelajari pembahasan satu per satu.'}
          </p>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-6">
            <div
              className={`p-3.5 rounded-2xl border ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/30'
                  : 'bg-stone-50 dark:bg-slate-900 border-stone-200/80 dark:border-slate-800'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Akurasi
              </div>
              <div className={`text-2xl font-black mt-1 ${isVelvet ? 'text-[#FF8A6B]' : 'text-indigo-600 dark:text-cyan-400'}`}>
                {accuracy}%
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/75 p-3.5 rounded-2xl border border-emerald-300 dark:border-emerald-500/60">
              <div className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                Benar
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                {correctCount} / {totalQuestions}
              </div>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isVelvet
                  ? 'bg-[#4A121D] border-rose-400/65'
                  : 'bg-rose-50 dark:bg-rose-950/65 border-rose-300 dark:border-rose-700/80'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-rose-800 dark:text-rose-200">
                Salah / Kosong
              </div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">
                {totalQuestions - correctCount}
              </div>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/30'
                  : 'bg-stone-50 dark:bg-slate-900 border-stone-200/80 dark:border-slate-800'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Durasi
              </div>
              <div className="text-2xl font-black text-slate-700 dark:text-slate-200 mt-1">
                {timerMinutes
                  ? formatTimer(initialSeconds - secondsRemaining)
                  : formatTimer(secondsElapsed)}
              </div>
            </div>
          </div>

          {/* Detail Breakdown Strip */}
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount} Benar
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> {wrongAnsweredCount} Salah
            </span>
            <span>•</span>
            <span>{unansweredCount} Kosong</span>
          </div>

          {/* Action Buttons: Prominent Pembahasan CTA + Secondary Controls */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setReviewIndex(0);
                setReviewFilter('all');
                setIsReviewPaletteOpen(false);
                setViewPhase('review');
              }}
              className={`w-full px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                isVelvet
                  ? 'bg-gradient-to-r from-[#FF8A6B] to-[#F5B041] text-[#1E0F17] font-extrabold shadow-[0_0_20px_rgba(255,138,107,0.3)]'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                  : 'bg-indigo-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 hover:bg-indigo-700 text-white'
              }`}
            >
              <BookOpen className="w-4.5 h-4.5" />
              <span>Lihat Pembahasan ({totalQuestions} Soal)</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setFlaggedIndices(new Set());
                  setReviewFilter('all');
                  setViewPhase('active');
                  setReviewIndex(0);
                  setSecondsRemaining(initialSeconds);
                  setSecondsElapsed(0);
                  onNavigateQuestion(0);
                }}
                className="w-full px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Ulangi Sesi Ini</span>
              </button>
              <button
                type="button"
                onClick={onExitDrilling}
                className="w-full px-5 py-2.5 rounded-2xl bg-stone-100 dark:bg-slate-900 hover:bg-stone-200 dark:hover:bg-slate-800 border border-stone-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Kembali ke Daftar Subtes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: QUESTION-BY-QUESTION REVIEW (1 Soal per Halaman + Highlight)
  // -------------------------------------------------------------
  if (viewPhase === 'review') {
    const q = questions[reviewIndex] || questions[0];
    const userAnswer = answers[q.example_id];
    const isCorrect = isAnswerCorrect(q, userAnswer);
    const isAnswered = hasPartialAnswer(q);
    const isReviewStimulusCollapsed = Boolean(collapsedStimuli[`rev_${q.example_id}`]);
    const isReviewLongStimulus = (q.context_markdown?.length || 0) > 450;

    let userAnswerLabel = 'Tidak Dijawab';
    let keyAnswerLabel = String(q.correct_answer || '-');

    if (isAnswered) {
      if (q.question_type === 'short_answer') {
        userAnswerLabel = String(userAnswer);
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
          : String(userAnswer);
      } else {
        userAnswerLabel = String(userAnswer);
      }
    } else if (q.question_type === 'mc_complex_table' && q.complex_statements) {
      const col0 = (q.table_headers || ['Benar', 'Salah'])[0];
      const col1 = (q.table_headers || ['Benar', 'Salah'])[1];
      keyAnswerLabel = q.complex_statements
        .map((stmt, rIdx) => `${rIdx + 1}. ${stmt.is_true ? col0 : col1}`)
        .join(', ');
    }

    if (q.question_type === 'short_answer') {
      keyAnswerLabel = String(q.short_answer_key ?? q.correct_answer ?? '-');
    }

    const wrongAnsweredCount = questions.filter(
      (item) => hasPartialAnswer(item) && !isAnswerCorrect(item, answers[item.example_id])
    ).length;
    const unansweredCount = totalQuestions - questions.filter((item) => hasPartialAnswer(item)).length;

    return (
      <div className="w-full max-w-4xl mx-auto pb-28 animate-page-enter">
        {/* 1. STICKY TOP REVIEW BAR (includes Sticky Palette Drawer) */}
        <div
          className={`sticky top-0 z-30 backdrop-blur-md rounded-2xl border shadow-sm p-2.5 sm:p-3.5 mb-3 sm:mb-4 transition-all duration-300 ${
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
              onClick={() => setViewPhase('summary')}
              className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <span>Skor</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                Pembahasan {reviewIndex + 1} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
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
                  <span>{isAnswered ? 'Salah' : 'Kosong'}</span>
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

              <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
            </div>
          </div>

          <div className={`w-full h-1.5 rounded-full overflow-hidden mt-2 ${isVelvet ? 'bg-[#381C2C]' : 'bg-stone-100 dark:bg-slate-800'}`}>
            <div
              className={`h-full transition-all duration-300 ${
                isVelvet
                  ? 'bg-[#E27B60]'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500'
                  : 'bg-indigo-600 dark:bg-cyan-500'
              }`}
              style={{ width: `${((reviewIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Sticky Review Question Palette Drawer (Stays pinned with top bar!) */}
          {isReviewPaletteOpen && (
            <div
              className={`mt-3 pt-3 border-t space-y-3 max-h-[55vh] overflow-y-auto ${
                isVelvet ? 'border-[#EB8A78]/18' : 'border-stone-100 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all' as ReviewFilter, label: `Semua (${totalQuestions})` },
                    { id: 'wrong' as ReviewFilter, label: `Salah (${wrongAnsweredCount})` },
                    { id: 'correct' as ReviewFilter, label: `Benar (${correctCount})` },
                    { id: 'unanswered' as ReviewFilter, label: `Kosong (${unansweredCount})` },
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

              {filteredReviewItems.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-2">
                  Tidak ada soal pada kategori filter ini.
                </p>
              ) : (
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pb-1">
                  {filteredReviewItems.map((item) => {
                    const isCurrent = item.idx === reviewIndex;
                    let badgeClass = !item.isAnswered
                      ? 'bg-stone-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-800'
                      : item.isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-bold'
                      : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60 font-bold';

                    if (isCurrent) {
                      badgeClass += isVelvet
                        ? ' ring-2 ring-[#EB8A78]/70'
                        : ' ring-2 ring-indigo-500 dark:ring-cyan-600/80';
                    }

                    return (
                      <button
                        key={item.q.example_id}
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
          </div>

          {/* Highlighted Answer Comparison Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs sm:text-sm ${
                !isAnswered
                  ? isVelvet
                    ? 'bg-[#22121D] border-[#EB8A78]/18 text-[#C9A9B0]'
                    : 'bg-stone-50 dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                  : isCorrect
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

        {/* 3. STICKY BOTTOM REVIEW NAVIGATION BAR (Mirroring Active Drilling) */}
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
              onClick={() => setViewPhase('summary')}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
            >
              Ringkasan Skor
            </button>

            {reviewIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setReviewIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
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
                onClick={() => setViewPhase('summary')}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Selesai</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {renderZoomModal()}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: ACTIVE DRILLING QUESTION (Distraction-Free & Wider Layout)
  // -------------------------------------------------------------
  const isStimulusCollapsed = Boolean(collapsedStimuli[currentQuestion.example_id]);
  const isLongStimulus = (currentQuestion.context_markdown?.length || 0) > 450;
  const isCurrentFlagged = flaggedIndices.has(currentQuestionIndex);

  return (
    <div className="w-full max-w-4xl mx-auto pb-28 animate-page-enter">
      {/* 1. STICKY TOP STATUS BAR (includes Sticky Palette Drawer) */}
      <div
        className={`sticky top-0 z-30 backdrop-blur-md rounded-2xl border shadow-sm p-3 sm:p-3.5 mb-4 transition-all duration-300 ${
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
          {/* Exit drilling button */}
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Keluar</span>
          </button>

          {/* Question index indicator */}
          <div className="text-center">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Soal {currentQuestionIndex + 1}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400"> / {totalQuestions}</span>
            <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 ml-2">
              • {answeredCount} terjawab
            </span>
          </div>

          {/* Timer Display, Palette & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold ${
                timerMinutes && secondsRemaining < 120
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse border border-rose-300 dark:border-rose-800'
                  : isVelvet
                  ? 'bg-[#2B1723] text-[#FFBE98] border border-[#EB8A78]/18'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-stone-200/80 dark:border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400" />
              <span>
                {timerMinutes
                  ? formatTimer(secondsRemaining)
                  : formatTimer(secondsElapsed)}
              </span>
            </div>

            {/* Question grid palette button */}
            <button
              type="button"
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition ${
                isPaletteOpen
                  ? isVelvet
                    ? 'bg-[#E27B60] text-[#1E0F17] border-[#E27B60]'
                    : 'bg-indigo-600 dark:bg-cyan-600 text-white border-transparent'
                  : isVelvet
                  ? 'border-[#EB8A78]/18 text-[#FBF1F2] hover:bg-[#3A1F30]'
                  : 'border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800'
              }`}
              title="Daftar Nomor Soal"
              aria-expanded={isPaletteOpen}
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Daftar</span>
            </button>

            <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
          </div>
        </div>

        {/* Progress bar line */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden mt-2.5 ${isVelvet ? 'bg-[#381C2C]' : 'bg-stone-100 dark:bg-slate-800'}`}>
          <div
            className={`h-full transition-all duration-300 ${
              isVelvet
                ? 'bg-[#E27B60]'
                : isPrism
                ? 'bg-gradient-to-r from-blue-600 to-sky-500'
                : 'bg-indigo-600 dark:bg-cyan-500'
            }`}
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* Sticky Palette Grid (Stays pinned with top bar!) */}
        {isPaletteOpen && (
          <div
            className={`mt-3 pt-3 border-t max-h-[55vh] overflow-y-auto ${
              isVelvet ? 'border-[#EB8A78]/18' : 'border-stone-100 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Navigasi Soal ({answeredCount}/{totalQuestions} Dijawab)
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Dijawab
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Ragu
                </span>
                <button
                  type="button"
                  onClick={() => setIsPaletteOpen(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 ml-1 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pb-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = isQuestionAnswered(q);
                const isFlagged = flaggedIndices.has(idx);

                let badgeClass = isVelvet
                  ? 'bg-[#2B1723] text-[#EBD6DC] border-[#EB8A78]/18 hover:bg-[#381C2C]'
                  : 'bg-stone-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-stone-200 dark:border-slate-800 hover:bg-stone-100';
                if (isCurrent) {
                  badgeClass = isVelvet
                    ? 'bg-[#E27B60] text-[#1E0F17] font-bold ring-2 ring-[#EB8A78]/70'
                    : isCosmic
                    ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-500/60'
                    : 'bg-indigo-600 text-white font-bold shadow-xs ring-2 ring-indigo-300';
                } else if (isFlagged) {
                  badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 font-bold';
                } else if (isAnswered) {
                  badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-semibold';
                }

                return (
                  <button
                    key={q.example_id}
                    type="button"
                    onClick={() => {
                      onNavigateQuestion(idx);
                      setIsPaletteOpen(false);
                    }}
                    className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center cursor-pointer relative ${badgeClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && !isCurrent && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. QUESTION CARD (Uniform Font Scale text-[15px] sm:text-base, Wider Mobile Space) */}
      <div
        className={`rounded-2xl sm:rounded-3xl border shadow-sm px-3.5 py-4 sm:p-6 space-y-4 sm:space-y-5 transition-colors ${
          isVelvet
            ? 'bg-[#2B1723] border-[#EB8A78]/18'
            : isPrism
            ? 'bg-white/90 border-white/95'
            : 'bg-white dark:bg-[#0c1326] border-stone-200/90 dark:border-slate-800'
        }`}
      >
        {/* Topic, Type, Level & Flag header */}
        <div className={`flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b ${isVelvet ? 'border-[#EB8A78]/15' : 'border-stone-100 dark:border-slate-800'}`}>
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                isVelvet
                  ? 'text-[#FFBE98] bg-[#4A222B] border-[#EB8A78]/20'
                  : 'text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/60 border-indigo-200/80 dark:border-cyan-900/50'
              }`}
            >
              {currentQuestion.subtest_code ? `${currentQuestion.subtest_code} • ` : ''}
              {currentQuestion.variation_name}
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200/80 dark:border-slate-700">
              {getQuestionTypeBadgeLabel(currentQuestion)}
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border ${
                getLevelBadgeLabel(currentQuestion) === 'HOTS'
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/70'
                  : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/70'
              }`}
            >
              {getLevelBadgeLabel(currentQuestion)}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFlagCurrent}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition cursor-pointer shrink-0 ${
              isCurrentFlagged
                ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-bold'
                : 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{isCurrentFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}</span>
          </button>
        </div>

        {/* Reading Context / Stimulus Text (Uniform font, upright, collapsible for long passages) */}
        {currentQuestion.context_markdown && (
          <div
            className={`rounded-2xl border border-l-4 p-3 sm:p-4 transition-colors ${
              isVelvet
                ? 'bg-[#1F1020] border-[#EB8A78]/15 border-l-[#EB8A78]/40 text-[#FBF1F2]'
                : isPrism
                ? 'bg-sky-50/70 border-sky-200/80 border-l-sky-500 text-slate-800'
                : 'bg-stone-50/90 dark:bg-slate-900/90 border-stone-200/90 dark:border-slate-800 border-l-indigo-500 dark:border-l-slate-600/75 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Wacana / Stimulus</span>
              </span>
              {isLongStimulus && (
                <button
                  type="button"
                  onClick={() => toggleStimulusCollapse(currentQuestion.example_id)}
                  className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{isStimulusCollapsed ? 'Tampilkan Teks' : 'Sembunyikan Teks'}</span>
                  {isStimulusCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
            {!isStimulusCollapsed && (
              <div className="text-[15px] sm:text-base font-normal not-italic leading-[1.8]">
                <MemoDrillingMarkdown text={currentQuestion.context_markdown} />
              </div>
            )}
          </div>
        )}

        {/* SVG Illustration (if present in stimulus) */}
        {currentQuestion.svg_illustration?.svg_code && (
          <div className="rounded-2xl border border-stone-200/90 dark:border-slate-700 bg-white p-3 sm:p-4 overflow-hidden shadow-2xs">
            <VisualRenderer
              visual={{ tipe: 'svg', kode: currentQuestion.svg_illustration.svg_code }}
              onZoom={setZoomSvg}
              className="my-0"
            />
          </div>
        )}

        {/* Question Text (Uniform text-[15px] sm:text-base matching material reader) */}
        <div className="text-[15px] sm:text-base font-normal text-slate-900 dark:text-slate-100 leading-[1.8]">
          <MemoDrillingMarkdown text={currentQuestion.question_markdown} />
        </div>

        {/* Optional Hint Toggle & Display (shown only when hint_markdown exists) */}
        {currentQuestion.hint_markdown && (
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => toggleHint(currentQuestion.example_id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                openHints[currentQuestion.example_id]
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-2xs'
                  : 'bg-amber-50/70 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60'
              }`}
            >
              <Lightbulb className={`w-4 h-4 ${openHints[currentQuestion.example_id] ? 'text-amber-600 dark:text-amber-400 fill-amber-400' : 'text-amber-500'}`} />
              <span>{openHints[currentQuestion.example_id] ? 'Sembunyikan Hint' : 'Butuh Hint?'}</span>
            </button>

            {openHints[currentQuestion.example_id] && (
              <div className="mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/80 text-amber-950 dark:text-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Petunjuk Pengerjaan</span>
                </div>
                <div className="text-[15px] sm:text-base leading-[1.8]">
                  <MemoDrillingMarkdown text={currentQuestion.hint_markdown} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* INTERACTIVE QUESTION OPTIONS / INPUT / TABLE ACCORDING TO QUESTION TYPE */}
        <div className={`pt-3 border-t ${isVelvet ? 'border-[#EB8A78]/20' : 'border-stone-100 dark:border-slate-800'}`}>
          {/* TYPE 1: PGK COMPLEX TABLE (Tabel 2 Kolom Benar/Salah, True/False, Sesuai/Tidak Sesuai) */}
          {currentQuestion.question_type === 'mc_complex_table' && currentQuestion.complex_statements && (
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-cyan-400" />
                <span>Tentukan pilihan yang tepat untuk setiap pernyataan berikut:</span>
              </div>
              <div
                className={`w-full overflow-x-auto rounded-2xl border shadow-2xs ${
                  isVelvet ? 'border-[#EB8A78]/18' : 'border-stone-200/90 dark:border-slate-800'
                }`}
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className={`border-b text-xs sm:text-sm font-bold ${
                        isVelvet
                          ? 'bg-[#341B2B] border-[#EB8A78]/15 text-[#FBF1F2]'
                          : 'bg-stone-50/90 dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <th className="px-2 py-2.5 sm:p-3.5 font-bold w-7 sm:w-10 text-center">#</th>
                      <th className="px-2 py-2.5 sm:p-3.5 font-bold">Pernyataan</th>
                      <th className="px-1.5 py-2.5 sm:p-3.5 text-center w-14 sm:w-24 text-emerald-700 dark:text-emerald-400 font-bold">
                        {(currentQuestion.table_headers || ['Benar', 'Salah'])[0]}
                      </th>
                      <th className="px-1.5 py-2.5 sm:p-3.5 text-center w-14 sm:w-28 text-rose-700 dark:text-rose-400 font-bold">
                        {(currentQuestion.table_headers || ['Benar', 'Salah'])[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isVelvet
                        ? 'divide-[#EB8A78]/20 bg-[#22121D]'
                        : 'divide-stone-100 dark:divide-slate-800/80 bg-white dark:bg-[#080d21]'
                    }`}
                  >
                    {currentQuestion.complex_statements.map((stmt, rowIdx) => {
                      const ansMap = (answers[currentQuestion.example_id] || {}) as Record<string, string>;
                      const choice = ansMap[stmt.id];
                      const col0 = (currentQuestion.table_headers || ['Benar', 'Salah'])[0];
                      const col1 = (currentQuestion.table_headers || ['Benar', 'Salah'])[1];

                      return (
                        <tr
                          key={stmt.id}
                          className={`transition-colors ${
                            isVelvet ? 'hover:bg-[#341B2B]/60' : 'hover:bg-stone-50/60 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="px-2 py-3 sm:p-3.5 text-center text-xs sm:text-sm font-mono font-bold text-slate-400 align-top">
                            {rowIdx + 1}
                          </td>
                          <td className="px-2 py-3 sm:p-3.5 text-[15px] sm:text-base leading-[1.7] text-slate-800 dark:text-[#FBF1F2]">
                            <MemoDrillingMarkdown text={stmt.statement_markdown} />
                          </td>
                          <td className="px-1.5 py-3 sm:p-3.5 text-center align-middle">
                            <button
                              type="button"
                              onClick={() => handleTableSelect(stmt.id, col0)}
                              aria-label={`Pernyataan ${rowIdx + 1}: ${col0}`}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border mx-auto flex items-center justify-center transition cursor-pointer ${
                                choice === col0
                                  ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                                  : isVelvet
                                  ? 'bg-[#381C2C] border-[#EB8A78]/20 hover:border-emerald-500/60'
                                  : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700 hover:border-emerald-500/60'
                              }`}
                            >
                              {choice === col0 && <Check className="w-4 h-4 stroke-[3]" />}
                            </button>
                          </td>
                          <td className="px-1.5 py-3 sm:p-3.5 text-center align-middle">
                            <button
                              type="button"
                              onClick={() => handleTableSelect(stmt.id, col1)}
                              aria-label={`Pernyataan ${rowIdx + 1}: ${col1}`}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border mx-auto flex items-center justify-center transition cursor-pointer ${
                                choice === col1
                                  ? 'bg-rose-600 border-rose-500 text-white font-bold'
                                  : isVelvet
                                  ? 'bg-[#381C2C] border-[#EB8A78]/20 hover:border-rose-500/60'
                                  : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700 hover:border-rose-500/60'
                              }`}
                            >
                              {choice === col1 && <Check className="w-4 h-4 stroke-[3]" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TYPE 2: PGK COMPLEX CHECKBOX (Pilih Lebih Dari 1 Jawaban) */}
          {currentQuestion.question_type === 'mc_complex_checkbox' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-cyan-400" />
                  <span>Pilih lebih dari satu jawaban yang benar:</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {Array.isArray(answers[currentQuestion.example_id]) ? answers[currentQuestion.example_id].length : 0} dipilih
                </span>
              </div>
              <div className="space-y-2.5">
                {(currentQuestion.complex_statements && currentQuestion.complex_statements.length > 0
                  ? currentQuestion.complex_statements.map((s, idx) => ({
                      id: s.id,
                      label: String(idx + 1),
                      text: s.statement_markdown,
                    }))
                  : (currentQuestion.options || []).map((o) => ({
                      id: o.key,
                      label: o.key,
                      text: o.text_markdown,
                    }))
                ).map((item) => {
                  const userAnswers: string[] = Array.isArray(answers[currentQuestion.example_id])
                    ? answers[currentQuestion.example_id]
                    : [];
                  const isChecked = userAnswers.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCheckboxToggle(item.id)}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer ${
                        isChecked
                          ? isVelvet
                            ? 'bg-[#3E1E2E] border-[#EB8A78]/45 text-[#FBF1F2]'
                            : isCosmic
                            ? 'bg-[#0f1d3c] border-cyan-700/70 text-cyan-100'
                            : isPrism
                            ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-xs ring-1 ring-sky-300'
                            : 'bg-indigo-50/90 border-indigo-400 text-indigo-950 shadow-xs ring-1 ring-indigo-300'
                          : isVelvet
                          ? 'bg-[#22121D] hover:bg-[#341B2B] border-[#EB8A78]/15 hover:border-[#EB8A78]/35 text-[#FBF1F2]'
                          : isCosmic
                          ? 'bg-[#070c18] hover:bg-[#0f1730] border-slate-800 hover:border-slate-700 text-slate-200'
                          : 'bg-white hover:bg-stone-50 border-stone-200/90 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isChecked
                            ? isVelvet
                              ? 'bg-[#E27B60] border-[#E27B60] text-[#1E0F17] font-bold'
                              : isCosmic
                              ? 'bg-cyan-600 border-cyan-600 text-white font-bold'
                              : isPrism
                              ? 'bg-gradient-to-tr from-blue-600 to-sky-500 border-sky-500 text-white font-bold'
                              : 'bg-indigo-600 border-indigo-600 text-white font-bold'
                            : isVelvet
                            ? 'bg-[#381C2C] border-[#EB8A78]/20'
                            : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`w-7 h-7 rounded-lg font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked
                            ? isVelvet
                              ? 'bg-[#4A222B] text-[#FFBE98]'
                              : 'bg-indigo-100 dark:bg-cyan-950 text-indigo-700 dark:text-cyan-300'
                            : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                      </span>
                      <div className="flex-1 text-[15px] sm:text-base leading-[1.75]">
                        <MemoDrillingMarkdown text={item.text} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 3: SHORT ANSWER (Isian Singkat Angka / Kata Baku) */}
          {currentQuestion.question_type === 'short_answer' && (
            <div className="space-y-3">
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
                  isVelvet
                    ? 'bg-[#22121D] border-[#EB8A78]/30'
                    : 'bg-stone-50/90 dark:bg-slate-900 border-stone-200/90 dark:border-slate-800'
                }`}
              >
                <label
                  htmlFor="short-answer-input"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-cyan-300"
                >
                  Jawaban Isian Singkat
                  {currentQuestion.short_answer_instruction && (
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      {' '}
                      ({currentQuestion.short_answer_instruction})
                    </span>
                  )}
                </label>
                <input
                  id="short-answer-input"
                  type="text"
                  value={answers[currentQuestion.example_id] || ''}
                  onChange={(e) => handleShortAnswerChange(e.target.value)}
                  placeholder="Ketik jawaban di sini..."
                  className="w-full px-4 py-3 text-[15px] sm:text-base font-semibold bg-white dark:bg-[#080d21] border border-stone-300 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 text-slate-900 dark:text-white placeholder:font-normal placeholder:text-slate-400 transition"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Isikan angka atau kata baku sesuai instruksi. Sistem otomatis menyesuaikan spasi dan huruf besar/kecil.
                </p>
              </div>
            </div>
          )}

          {/* TYPE 4: STANDARD MULTIPLE CHOICE (Pilihan Ganda A-E) */}
          {currentQuestion.question_type !== 'mc_complex_table' &&
            currentQuestion.question_type !== 'mc_complex_checkbox' &&
            currentQuestion.question_type !== 'short_answer' && (
              <div className="space-y-2.5">
                {(currentQuestion.options || []).map((option) => {
                  const isSelected = answers[currentQuestion.example_id] === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSelectOption(option.key)}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3.5 cursor-pointer ${
                        isSelected
                          ? isVelvet
                            ? 'bg-[#3E1E2E] border-[#EB8A78]/45 text-[#FBF1F2]'
                            : isCosmic
                            ? 'bg-[#0f1d3c] border-cyan-700/70 text-cyan-100'
                            : isPrism
                            ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-xs ring-1 ring-sky-300'
                            : 'bg-indigo-50/90 border-indigo-400 text-indigo-950 shadow-xs ring-1 ring-indigo-300'
                          : isVelvet
                          ? 'bg-[#22121D] hover:bg-[#341B2B] border-[#EB8A78]/15 hover:border-[#EB8A78]/35 text-[#FBF1F2]'
                          : isCosmic
                          ? 'bg-[#070c18] hover:bg-[#0f1730] border-slate-800 hover:border-slate-700 text-slate-200'
                          : 'bg-white hover:bg-stone-50 border-stone-200/90 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isSelected
                            ? isVelvet
                              ? 'bg-[#E27B60] text-[#1E0F17] font-extrabold'
                              : isCosmic
                              ? 'bg-cyan-600 text-white font-bold'
                              : isPrism
                              ? 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-2xs'
                              : 'bg-indigo-600 text-white shadow-2xs'
                            : isVelvet
                            ? 'bg-[#381C2C] text-[#FFBE98] border border-[#EB8A78]/18'
                            : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700'
                        }`}
                      >
                        {option.key}
                      </div>

                      <div className="flex-1 text-[15px] sm:text-base leading-[1.75]">
                        <MemoDrillingMarkdown text={option.text_markdown} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* 3. STICKY BOTTOM NAVIGATION BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t shadow-2xl p-3 sm:p-4 transition-all duration-300 ${
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
            disabled={currentQuestionIndex === 0}
            onClick={() => onNavigateQuestion(currentQuestionIndex - 1)}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer shadow-2xs ${
              isVelvet
                ? 'border-[#EB8A78]/18 bg-[#2B1723] text-[#FBF1F2] hover:bg-[#3A1F30]'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSubmitConfirm(true)}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
          >
            Selesai & Kumpulkan
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => onNavigateQuestion(currentQuestionIndex + 1)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isVelvet
                  ? 'bg-gradient-to-r from-[#E27B60] to-[#D4954B] text-[#1E0F17] font-extrabold'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Kumpulkan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div
            className={`rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4 border ${
              isVelvet
                ? 'bg-[#2B1723] border-[#EB8A78]/35 text-[#FBF1F2]'
                : 'bg-white dark:bg-[#0c1326] border-stone-200 dark:border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Kumpulkan Jawaban Sekarang?
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/70">
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">{answeredCount}</div>
                <div className="text-xs text-emerald-800 dark:text-emerald-200 font-semibold">Dijawab</div>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700">
                <div className="text-lg font-black text-slate-700 dark:text-slate-200">{totalQuestions - answeredCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Kosong</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/70">
                <div className="text-lg font-black text-amber-700 dark:text-amber-300">{flaggedIndices.size}</div>
                <div className="text-xs text-amber-800 dark:text-amber-200 font-semibold">Ragu</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Setelah dikumpulkan, skor Anda akan ditampilkan beserta tombol untuk membuka pembahasan per soal.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Periksa Lagi
              </button>
              <button
                type="button"
                onClick={handleFinishDrilling}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs cursor-pointer"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div
            className={`rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4 border ${
              isVelvet
                ? 'bg-[#2B1723] border-[#EB8A78]/35 text-[#FBF1F2]'
                : 'bg-white dark:bg-[#0c1326] border-stone-200 dark:border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Keluar dari Sesi Drilling?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Progres jawaban pada sesi ini akan hilang jika Anda keluar tanpa mengumpulkan. Yakin ingin keluar?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onExitDrilling();
                }}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {renderZoomModal()}
    </div>
  );
};
