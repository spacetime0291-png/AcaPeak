import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
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
} from 'lucide-react';
import type { WorkedExample } from '../../types/material';
import { ThemeToggle } from '../common/ThemeToggle';

const KATEX_REHYPE_PLUGINS = [rehypeKatex as any];

interface ActiveDrillingViewProps {
  questions: WorkedExample[];
  currentQuestionIndex: number;
  timerMinutes: number | null; // null = santai
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onNavigateQuestion: (index: number) => void;
  onExitDrilling: () => void;
}

export const ActiveDrillingView: React.FC<ActiveDrillingViewProps> = ({
  questions,
  currentQuestionIndex,
  timerMinutes,
  theme = 'light',
  onToggleTheme = () => {},
  onNavigateQuestion,
  onExitDrilling,
}) => {
  const isDark = theme === 'dark';

  // Answers state: { [questionId]: selectedKey }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Flagged questions: Set of question indices
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  // Show palette modal on mobile
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  // Exit confirmation modal
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  // Finished / Results state
  const [isFinished, setIsFinished] = useState(false);
  // Open solutions in review mode
  const [openReviews, setOpenReviews] = useState<Set<string>>(new Set());
  // Open hints per question
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});

  const toggleHint = (exampleId: string) => {
    setOpenHints((prev) => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  // Timer states
  const initialSeconds = timerMinutes ? timerMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Soal Latihan Belum Tersedia</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Belum ada bank soal untuk topik yang dipilih karena materi baru saja dirombak. Silakan kembali untuk membaca materi.
        </p>
        <button
          type="button"
          onClick={onExitDrilling}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
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
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setSecondsElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished, timerMinutes]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionKey: string) => {
    if (isFinished) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.example_id]: optionKey,
    }));
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
    setIsFinished(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const toggleReviewSolution = (exampleId: string) => {
    setOpenReviews((prev) => {
      const next = new Set(prev);
      if (next.has(exampleId)) {
        next.delete(exampleId);
      } else {
        next.add(exampleId);
      }
      return next;
    });
  };

  // Calculate score
  const correctCount = questions.filter(
    (q) => answers[q.example_id] === q.correct_answer
  ).length;
  const answeredCount = Object.keys(answers).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Custom markdown component styling for KaTeX & high contrast
  const markdownComponents = {
    p: ({ children }: any) => <p className="my-1.5 leading-relaxed text-inherit">{children}</p>,
    strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
  };

  // -------------------------------------------------------------
  // VIEW: RESULTS SUMMARY (When isFinished === true)
  // -------------------------------------------------------------
  if (isFinished) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6 pb-20 animate-page-enter">
        {/* Results Header Card */}
        <div className="bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 text-center shadow-xs transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-cyan-950/70 border border-indigo-100 dark:border-cyan-800 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            Sesi Drilling Selesai!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Berikut ringkasan evaluasi hasil latihan variasi soal Anda.
          </p>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="bg-stone-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-800">
              <div className="text-[11px] font-bold uppercase text-slate-400">Skor Akurasi</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-cyan-400 mt-1">{accuracy}%</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80">
              <div className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Jawaban Benar</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{correctCount} / {totalQuestions}</div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/60 p-3.5 rounded-2xl border border-rose-200/80 dark:border-rose-800/80">
              <div className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-400">Salah / Kosong</div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{totalQuestions - correctCount}</div>
            </div>
            <div className="bg-stone-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-800">
              <div className="text-[11px] font-bold uppercase text-slate-400">Durasi</div>
              <div className="text-2xl font-black text-slate-700 dark:text-slate-200 mt-1">
                {timerMinutes
                  ? formatTimer(initialSeconds - secondsRemaining)
                  : formatTimer(secondsElapsed)}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onExitDrilling}
              className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-indigo-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              Kembali ke Daftar Subtes
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setFlaggedIndices(new Set());
                setIsFinished(false);
                setSecondsRemaining(initialSeconds);
                setSecondsElapsed(0);
                onNavigateQuestion(0);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Ulangi Drilling Ini</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 px-1 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-600 dark:text-cyan-400" />
            <span>Pembahasan Rinci Per Nomor Soal</span>
          </h3>

          {questions.map((q, idx) => {
            const userAnswer = answers[q.example_id];
            const isCorrect = userAnswer === q.correct_answer;
            const isAnswered = !!userAnswer;
            const isReviewOpen = openReviews.has(q.example_id);

            return (
              <div
                key={q.example_id}
                className="bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-colors"
              >
                {/* Review Header Bar */}
                <div
                  onClick={() => toggleReviewSolution(q.example_id)}
                  className="p-4 flex items-center justify-between gap-3 bg-stone-50/60 dark:bg-slate-850/60 hover:bg-stone-100/60 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center text-white shrink-0 ${
                        !isAnswered
                          ? 'bg-slate-400'
                          : isCorrect
                          ? 'bg-emerald-600'
                          : 'bg-rose-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                        {q.variation_name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">
                          Jawaban Anda: <strong>{userAnswer || 'Tidak Dijawab'}</strong>
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                          Kunci: <strong>{q.correct_answer}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Benar
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Salah
                      </span>
                    )}
                    {isReviewOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Review Body & Solution */}
                {isReviewOpen && (
                  <div className="p-4 sm:p-5 border-t border-stone-100 dark:border-slate-800 space-y-4 text-sm sm:text-base">
                    {/* Stimulus / Context */}
                    {q.context_markdown && (
                      <div className="p-3.5 sm:p-4 bg-stone-50 dark:bg-slate-900 rounded-xl border border-stone-200/80 dark:border-slate-800 text-[15px] sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed italic">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={KATEX_REHYPE_PLUGINS}
                          components={markdownComponents}
                        >
                          {q.context_markdown}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Question text */}
                    <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={KATEX_REHYPE_PLUGINS}
                        components={markdownComponents}
                      >
                        {q.question_markdown}
                      </ReactMarkdown>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2 pl-1">
                      {q.options.map((opt) => (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border flex items-start gap-3 ${
                            opt.key === q.correct_answer
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 font-semibold text-emerald-950 dark:text-emerald-100'
                              : opt.key === userAnswer
                              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                              : 'bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-sm w-6">{opt.key}.</span>
                          <div className="flex-1 text-[15px] sm:text-base leading-relaxed">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath, remarkGfm]}
                              rehypePlugins={KATEX_REHYPE_PLUGINS}
                              components={markdownComponents}
                            >
                              {opt.text_markdown}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hint / Petunjuk Soal */}
                    <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 space-y-1">
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Petunjuk / Hint Soal:</span>
                      </div>
                      <div className="text-sm sm:text-[15px] leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={KATEX_REHYPE_PLUGINS}
                          components={markdownComponents}
                        >
                          {q.hint_markdown ||
                            '💡 **Petunjuk:** Cermati kata kunci dan batas cakupan wacana, lalu eliminasi opsi yang menggunakan kata mutlak.'}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {/* Conceptual solution */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-indigo-950 dark:text-slate-200 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-cyan-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                        <span>Solusi Konseptual:</span>
                      </div>
                      <ReactMarkdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={KATEX_REHYPE_PLUGINS}
                        components={markdownComponents}
                      >
                        {q.conceptual_solution_markdown}
                      </ReactMarkdown>
                    </div>

                    {/* Quick trick */}
                    {q.quick_trick_markdown && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 space-y-1">
                        <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          ⚡ Trik Cepat / Eliminasi Kilat:
                        </div>
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={KATEX_REHYPE_PLUGINS}
                          components={markdownComponents}
                        >
                          {q.quick_trick_markdown}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: ACTIVE DRILLING QUESTION (During Test - Distraction-Free)
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-3xl mx-auto pb-28 animate-page-enter">
      {/* 1. STICKY TOP STATUS BAR */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0c1224]/90 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-cyan-500/25 shadow-sm p-3.5 sm:p-4 mb-4 transition-all duration-300">
        <div className="flex items-center justify-between gap-2">
          {/* Exit drilling button */}
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white py-1.5 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Keluar</span>
          </button>

          {/* Question index indicator */}
          <div className="text-center">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Soal {currentQuestionIndex + 1}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500"> dari {totalQuestions}</span>
          </div>

          {/* Timer Display, Palette & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold ${
                timerMinutes && secondsRemaining < 120
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse border border-rose-300 dark:border-rose-800'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-stone-200/80 dark:border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
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
              className="p-2 rounded-xl border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
              title="Daftar Nomor Soal"
            >
              <span>#{currentQuestionIndex + 1}</span>
            </button>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-stone-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className="bg-indigo-600 dark:bg-cyan-400 h-full transition-all duration-300 shadow-[0_0_8px_rgba(0,242,254,0.5)]"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Popover / Collapsible Palette Grid */}
      {isPaletteOpen && (
        <div className="mb-4 bg-white dark:bg-[#0c1326] rounded-2xl border border-stone-200 dark:border-slate-800 p-4 shadow-md animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Navigasi Nomor Soal ({answeredCount}/{totalQuestions} Dijawab)
            </span>
            <button
              type="button"
              onClick={() => setIsPaletteOpen(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Tutup
            </button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = !!answers[q.example_id];
              const isFlagged = flaggedIndices.has(idx);

              let badgeClass = 'bg-stone-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-stone-200 dark:border-slate-800 hover:bg-stone-100';
              if (isCurrent) {
                badgeClass = isDark
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,254,0.5)] ring-2 ring-cyan-300'
                  : 'bg-indigo-600 text-white font-bold shadow-xs ring-2 ring-indigo-300';
              } else if (isFlagged) {
                badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-bold';
              } else if (isAnswered) {
                badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold';
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

      {/* 2. QUESTION CARD (Zero Clutter, High Contrast) */}
      <div className="bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-8 space-y-6 transition-colors">
        {/* Topic & Variation header */}
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-stone-100 dark:border-slate-800">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/70 px-3 py-1 rounded-xl border border-indigo-100 dark:border-cyan-800/60">
            {currentQuestion.variation_name}
          </span>
          <button
            type="button"
            onClick={toggleFlagCurrent}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
              flaggedIndices.has(currentQuestionIndex)
                ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-bold'
                : 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Flag className={`w-4 h-4 ${flaggedIndices.has(currentQuestionIndex) ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{flaggedIndices.has(currentQuestionIndex) ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
          </button>
        </div>

        {/* Reading Context / Stimulus Text if available (Diperbesar agar jelas dibaca) */}
        {currentQuestion.context_markdown && (
          <div className="p-4 sm:p-6 bg-stone-50/90 dark:bg-slate-900 rounded-2xl border border-stone-200/90 dark:border-slate-800 text-base sm:text-[17px] text-slate-800 dark:text-slate-200 leading-[1.8] italic">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={KATEX_REHYPE_PLUGINS}
              components={markdownComponents}
            >
              {currentQuestion.context_markdown}
            </ReactMarkdown>
          </div>
        )}

        {/* Question Text (Ukuran soal di Drilling diperbesar) */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 leading-relaxed tracking-tight">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={KATEX_REHYPE_PLUGINS}
            components={markdownComponents}
          >
            {currentQuestion.question_markdown}
          </ReactMarkdown>
        </div>

        {/* Hint Toggle & Display */}
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
            <span>{openHints[currentQuestion.example_id] ? 'Sembunyikan Hint' : '💡 Butuh Hint / Petunjuk?'}</span>
          </button>

          {openHints[currentQuestion.example_id] && (
            <div className="mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/80 text-amber-950 dark:text-amber-200 shadow-2xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Petunjuk Pengerjaan (Hint):</span>
              </div>
              <div className="text-sm sm:text-[15px] leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={KATEX_REHYPE_PLUGINS}
                  components={markdownComponents}
                >
                  {currentQuestion.hint_markdown ||
                    '💡 **Petunjuk:** Cermati data dan kata kunci pada teks wacana, lalu eliminasi pilihan yang menggunakan kata kuantor ekstrem (*semua*, *selalu*, *pasti*) jika terdapat batasan data.'}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Options list A, B, C, D, E */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.example_id] === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelectOption(option.key)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-[#0f1d3c] border-cyan-400 text-cyan-100 font-medium shadow-[0_0_14px_rgba(0,242,254,0.25)]'
                      : 'bg-indigo-50/90 border-indigo-400 text-indigo-950 font-medium shadow-xs ring-1 ring-indigo-300'
                    : isDark
                    ? 'bg-[#070c18] hover:bg-[#0f1730] border-slate-800 hover:border-cyan-500/40 text-slate-200'
                    : 'bg-white hover:bg-stone-50 border-stone-200/90 text-slate-800'
                }`}
              >
                {/* Option Letter Circle */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center shrink-0 mt-0.5 transition ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700'
                  }`}
                >
                  {option.key}
                </div>

                <div className="flex-1 text-base sm:text-[17px] leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={KATEX_REHYPE_PLUGINS}
                    components={markdownComponents}
                  >
                    {option.text_markdown}
                  </ReactMarkdown>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. STICKY BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c1224]/90 backdrop-blur-md border-t border-stone-200/90 dark:border-cyan-500/30 shadow-2xl p-3.5 sm:p-5 transition-all duration-300">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => onNavigateQuestion(currentQuestionIndex - 1)}
            className="px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-stone-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleFinishDrilling}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
          >
            Selesai & Kumpulkan
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => onNavigateQuestion(currentQuestionIndex + 1)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-cyan-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md dark:shadow-[0_0_15px_rgba(0,242,254,0.35)] transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishDrilling}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Kumpulkan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-subtopic-slide">
          <div className="bg-white dark:bg-[#0c1326] rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4 border border-stone-200 dark:border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Keluar dari Sesi Drilling?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Jawaban Anda pada sesi latihan ini akan dihitung hingga nomor yang telah diselesaikan. Yakin ingin mengakhiri sesi?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onExitDrilling();
                }}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
