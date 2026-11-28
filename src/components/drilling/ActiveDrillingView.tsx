import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
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
  FileText,
  X,
  Lock,
  History,
} from 'lucide-react';
import type { WorkedExample, VisualData } from '../../types/material';
import {
  isAnswerCorrect,
  recordQuestionsSeen,
} from '../../lib/drillingRotationEngine';
import {
  saveDrillingSession,
  type DrillingSessionItem,
  type DrillingSessionRecord,
} from '../../lib/drillingHistory';
import { ThemeToggle } from '../common/ThemeToggle';
import { VisualRenderer } from '../content/VisualRenderer';
import type { ThemeId } from '../../lib/theme';
import {
  DrillingReviewView,
  MemoDrillingMarkdown,
  getQuestionTypeBadgeLabel,
  getLevelBadgeLabel,
} from './DrillingReviewView';

interface ActiveDrillingViewProps {
  questions: WorkedExample[];
  currentQuestionIndex: number;
  timerMinutes: number | null; // null = santai
  primarySubtest?: string;
  isLoading?: boolean;
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onNavigateQuestion: (index: number) => void;
  onExitDrilling: () => void;
  onOpenPembahasanHistory?: () => void;
}

type DrillingViewPhase = 'active' | 'summary' | 'review';

export const ActiveDrillingView: React.FC<ActiveDrillingViewProps> = ({
  questions,
  currentQuestionIndex,
  timerMinutes,
  primarySubtest,
  isLoading = false,
  theme = 'light',
  onSelectTheme = () => {},
  onNavigateQuestion,
  onExitDrilling,
  onOpenPembahasanHistory,
}) => {
  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Answers state: { [questionId]: answerValue }
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [viewPhase, setViewPhase] = useState<DrillingViewPhase>('active');
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [collapsedStimuli, setCollapsedStimuli] = useState<Record<string, boolean>>({});
  const [zoomSvg, setZoomSvg] = useState<VisualData | null>(null);
  const hasSavedSessionRef = useRef<boolean>(false);

  const isFinished = viewPhase !== 'active';

  // Timer states
  const initialSeconds = timerMinutes ? timerMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

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

  // Only questions that were actually answered are counted in scoring, review, and history!
  const countedItems: DrillingSessionItem[] = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions
      .map((q, originalIndex) => ({ q, originalIndex }))
      .filter(({ q }) => isQuestionAnswered(q))
      .map(({ q, originalIndex }) => {
        const userAnswer = answers[q.example_id];
        return {
          question: q,
          userAnswer,
          isCorrect: isAnswerCorrect(q, userAnswer),
          originalIndex,
        };
      });
  }, [questions, answers]);

  // Timer effect
  useEffect(() => {
    if (isLoading || !questions || questions.length === 0 || isFinished) return;

    const interval = setInterval(() => {
      if (timerMinutes) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowSubmitConfirm(false);
            setShowExitConfirm(false);
            setViewPhase('summary');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setSecondsElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isFinished, timerMinutes, questions]);

  // Persist finished session & record seen questions ONLY for answered questions (once per session)
  useEffect(() => {
    if (viewPhase !== 'summary' || hasSavedSessionRef.current) return;
    hasSavedSessionRef.current = true;

    if (countedItems.length === 0) return;

    recordQuestionsSeen(countedItems.map((item) => item.question.example_id));

    const derivedSubtests = Array.from(
      new Set(
        countedItems
          .map((item) =>
            (item.question.subtest_code || item.question.example_id.split('-')[0] || 'PU').toUpperCase()
          )
          .filter(Boolean)
      )
    );
    const resolvedPrimary = (
      primarySubtest ||
      derivedSubtests[0] ||
      'PU'
    ).toUpperCase();
    const durationSecs = timerMinutes
      ? Math.max(0, initialSeconds - secondsRemaining)
      : secondsElapsed;
    const correct = countedItems.filter((item) => item.isCorrect).length;
    const total = countedItems.length;

    const record: DrillingSessionRecord = {
      id: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      primarySubtest: resolvedPrimary,
      subtests: derivedSubtests.length > 0 ? derivedSubtests : [resolvedPrimary],
      totalConfigured: questions.length,
      answeredCount: total,
      correctCount: correct,
      wrongCount: total - correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      durationSeconds: durationSecs,
      timerMinutes,
      items: countedItems,
    };

    saveDrillingSession(record);
  }, [
    viewPhase,
    countedItems,
    primarySubtest,
    timerMinutes,
    initialSeconds,
    secondsRemaining,
    secondsElapsed,
    questions.length,
  ]);

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

  // Scroll smoothly to top when advancing questions
  useEffect(() => {
    if (isLoading || !questions || questions.length === 0) return;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isLoading, questions.length, currentQuestionIndex, viewPhase]);

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

  const formatTimer = (totalSecs: number) => {
    const safe = Math.max(0, totalSecs);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;
  const isCurrentAnswered = isQuestionAnswered(currentQuestion);

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

  const handleFinishDrilling = () => {
    setShowSubmitConfirm(false);
    setViewPhase('summary');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAdvanceNext = () => {
    if (!isCurrentAnswered) return;
    if (currentQuestionIndex < totalQuestions - 1) {
      onNavigateQuestion(currentQuestionIndex + 1);
    } else {
      handleFinishDrilling();
    }
  };

  const handleRetrySession = () => {
    hasSavedSessionRef.current = false;
    setAnswers({});
    setOpenHints({});
    setCollapsedStimuli({});
    setViewPhase('active');
    setSecondsRemaining(initialSeconds);
    setSecondsElapsed(0);
    onNavigateQuestion(0);
  };

  const countedTotal = countedItems.length;
  const correctCount = countedItems.filter((item) => item.isCorrect).length;
  const wrongCount = countedTotal - correctCount;
  const skippedCount = Math.max(0, totalQuestions - countedTotal);
  const accuracy = countedTotal > 0 ? Math.round((correctCount / countedTotal) * 100) : 0;

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
  // VIEW 1: RESULTS SUMMARY ONLY (Hitung Soal yang Dikerjakan Saja)
  // -------------------------------------------------------------
  if (viewPhase === 'summary') {
    const durationSecs = timerMinutes
      ? Math.max(0, initialSeconds - secondsRemaining)
      : secondsElapsed;

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
            {countedTotal === 0
              ? 'Belum ada soal yang sempat dijawab pada sesi ini.'
              : accuracy >= 80
              ? 'Hasil yang sangat kuat! Periksa pembahasan untuk mengunci konsep.'
              : accuracy >= 50
              ? 'Progres bagus! Buka pembahasan untuk menambal soal yang keliru.'
              : 'Setiap soal adalah bahan evaluasi. Pelajari pembahasan satu per satu.'}
          </p>

          {/* Score Cards Grid (Strictly based on answered/worked questions) */}
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
                {correctCount} / {countedTotal}
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
                Salah
              </div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">
                {wrongCount}
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
                {formatTimer(durationSecs)}
              </div>
            </div>
          </div>

          {/* Detail Breakdown Strip */}
          <div className="flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200 font-bold">
              {countedTotal} Soal Dikerjakan
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount} Benar
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> {wrongCount} Salah
            </span>
            {skippedCount > 0 && (
              <>
                <span>•</span>
                <span className="text-slate-400 dark:text-slate-500">
                  {skippedCount} sisa tidak dikerjakan (tidak dihitung)
                </span>
              </>
            )}
          </div>

          {countedTotal > 0 && (
            <div
              className={`mb-5 px-3.5 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/25 text-[#EBD6DC]'
                  : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              <History className="w-3.5 h-3.5 shrink-0" />
              <span>Sesi ini otomatis tersimpan di tab Pembahasan.</span>
            </div>
          )}

          {/* Action Buttons: Prominent Pembahasan CTA + Secondary Controls */}
          <div className="space-y-2.5">
            {countedTotal > 0 && (
              <button
                type="button"
                onClick={() => setViewPhase('review')}
                className={`w-full px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                  isVelvet
                    ? 'bg-gradient-to-r from-[#FF8A6B] to-[#F5B041] text-[#1E0F17] font-extrabold shadow-[0_0_20px_rgba(255,138,107,0.3)]'
                    : isPrism
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                    : 'bg-indigo-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 hover:bg-indigo-700 text-white'
                }`}
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Lihat Pembahasan ({countedTotal} Soal)</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            )}

            <div className={`grid grid-cols-1 ${onOpenPembahasanHistory ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2.5`}>
              <button
                type="button"
                onClick={handleRetrySession}
                className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Ulangi Sesi Ini</span>
              </button>
              {onOpenPembahasanHistory && (
                <button
                  type="button"
                  onClick={onOpenPembahasanHistory}
                  className="w-full px-4 py-2.5 rounded-2xl bg-indigo-50 dark:bg-cyan-950/50 hover:bg-indigo-100 dark:hover:bg-cyan-950/80 border border-indigo-200/80 dark:border-cyan-800/60 text-indigo-700 dark:text-cyan-300 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <History className="w-4 h-4" />
                  <span>Riwayat Pembahasan</span>
                </button>
              )}
              <button
                type="button"
                onClick={onExitDrilling}
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-slate-900 hover:bg-stone-200 dark:hover:bg-slate-800 border border-stone-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Kembali ke Subtes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: QUESTION-BY-QUESTION REVIEW (Hanya Soal Dikerjakan)
  // -------------------------------------------------------------
  if (viewPhase === 'review') {
    return (
      <DrillingReviewView
        items={countedItems}
        totalConfigured={totalQuestions}
        theme={theme}
        onSelectTheme={onSelectTheme}
        backLabel="Skor"
        footerBackLabel="Ringkasan Skor"
        onBack={() => setViewPhase('summary')}
      />
    );
  }

  // -------------------------------------------------------------
  // VIEW: ACTIVE DRILLING QUESTION (Sequential, No Backtrack, No Skip)
  // -------------------------------------------------------------
  const isStimulusCollapsed = Boolean(collapsedStimuli[currentQuestion.example_id]);
  const isLongStimulus = (currentQuestion.context_markdown?.length || 0) > 450;
  const completedBeforeCurrent = countedTotal - (isCurrentAnswered ? 1 : 0);

  return (
    <div className="w-full max-w-4xl mx-auto pb-28 animate-page-enter">
      {/* 1. STICKY TOP STATUS BAR (Sequential indicator, no jump palette) */}
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
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Keluar</span>
          </button>

          {/* Question index & sequential mode indicator */}
          <div className="text-center min-w-0">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Soal {currentQuestionIndex + 1}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                / {totalQuestions}
              </span>
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ml-1 ${
                  isVelvet
                    ? 'bg-[#2B1723] text-[#EBD6DC] border border-[#EB8A78]/20'
                    : 'bg-stone-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <Lock className="w-3 h-3" />
                <span>Berurutan</span>
              </span>
            </div>
          </div>

          {/* Timer Display & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
        {/* Topic, Type, Level & Sequential badge */}
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

          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
            {countedTotal} dijawab
          </span>
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

      {/* 3. STICKY BOTTOM NAVIGATION BAR (No Back, Must Answer First, Early Finish Allowed) */}
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
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-3">
          {/* Early Finish / Selesai & Kumpulkan */}
          <button
            type="button"
            onClick={() => setShowSubmitConfirm(true)}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs shrink-0"
          >
            Selesai &amp; Kumpulkan
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {!isCurrentAnswered && (
              <span className="hidden sm:inline text-xs font-medium text-amber-600 dark:text-amber-400 truncate">
                Jawab soal ini untuk lanjut
              </span>
            )}

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                disabled={!isCurrentAnswered}
                onClick={handleAdvanceNext}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 shrink-0 ${
                  !isCurrentAnswered
                    ? 'bg-stone-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                    : isVelvet
                    ? 'bg-gradient-to-r from-[#E27B60] to-[#D4954B] text-[#1E0F17] font-extrabold cursor-pointer active:scale-95'
                    : isPrism
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white cursor-pointer active:scale-95'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer active:scale-95'
                }`}
              >
                <span>{isCurrentAnswered ? 'Selanjutnya' : 'Jawab Dulu'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!isCurrentAnswered}
                onClick={() => setShowSubmitConfirm(true)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 shrink-0 ${
                  !isCurrentAnswered
                    ? 'bg-stone-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                }`}
              >
                <span>{isCurrentAnswered ? 'Kumpulkan' : 'Jawab Dulu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
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
            <div className="grid grid-cols-2 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/70">
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">{countedTotal}</div>
                <div className="text-xs text-emerald-800 dark:text-emerald-200 font-semibold">Soal Dikerjakan</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700">
                <div className="text-lg font-black text-slate-700 dark:text-slate-200">{skippedCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tidak Dihitung</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {countedTotal === 0
                ? 'Anda belum menjawab satu pun soal. Jawab minimal 1 soal terlebih dahulu, atau pilih Keluar untuk membatalkan sesi.'
                : skippedCount > 0
                ? `Hanya ${countedTotal} soal yang sudah dikerjakan yang akan dihitung dalam skor dan pembahasan. Sisa ${skippedCount} soal tidak dianggap.`
                : completedBeforeCurrent >= 0
                ? `Seluruh ${countedTotal} soal akan dinilai dan disimpan ke riwayat sesi pembahasan.`
                : ''}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="button"
                disabled={countedTotal === 0}
                onClick={handleFinishDrilling}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
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
