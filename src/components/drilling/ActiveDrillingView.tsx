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
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { WorkedExample } from '../../types/material';
import { AdBanner } from '../content/AdBanner';

interface ActiveDrillingViewProps {
  questions: WorkedExample[];
  currentQuestionIndex: number;
  timerMinutes: number | null; // null = santai
  onNavigateQuestion: (index: number) => void;
  onExitDrilling: () => void;
}

export const ActiveDrillingView: React.FC<ActiveDrillingViewProps> = ({
  questions,
  currentQuestionIndex,
  timerMinutes,
  onNavigateQuestion,
  onExitDrilling,
}) => {
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

  // Timer states
  const initialSeconds = timerMinutes ? timerMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

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

  // Custom markdown component styling
  const markdownComponents = {
    p: ({ children }: any) => <p className="my-2 leading-relaxed text-slate-800">{children}</p>,
    strong: ({ children }: any) => <strong className="font-bold text-slate-900">{children}</strong>,
  };

  // -------------------------------------------------------------
  // VIEW: RESULTS SUMMARY (When isFinished === true)
  // -------------------------------------------------------------
  if (isFinished) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6 pb-20">
        {/* Results Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Trophy className="w-8 h-8 text-indigo-600" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Sesi Drilling Selesai!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Berikut ringkasan evaluasi hasil latihan variasi soal Anda.
          </p>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase text-slate-400">Skor Akurasi</div>
              <div className="text-2xl font-black text-indigo-600 mt-1">{accuracy}%</div>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200/80">
              <div className="text-[11px] font-bold uppercase text-emerald-700">Jawaban Benar</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">{correctCount} / {totalQuestions}</div>
            </div>
            <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200/80">
              <div className="text-[11px] font-bold uppercase text-rose-700">Salah / Kosong</div>
              <div className="text-2xl font-black text-rose-600 mt-1">{totalQuestions - correctCount}</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase text-slate-400">Durasi</div>
              <div className="text-2xl font-black text-slate-700 mt-1">
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Ulangi Drilling Ini</span>
            </button>
          </div>
        </div>

        {/* Ad slot for Results page */}
        <AdBanner slotId="drilling-results" routeKey="drilling-results" />

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 px-1 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-indigo-600" />
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
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                {/* Review Header Bar */}
                <div
                  onClick={() => toggleReviewSolution(q.example_id)}
                  className="p-4 flex items-center justify-between gap-3 bg-slate-50/60 hover:bg-slate-100/60 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center text-white shrink-0 ${
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
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        {q.variation_name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="text-slate-500">
                          Jawaban Anda: <strong>{userAnswer || 'Tidak Dijawab'}</strong>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-700 font-semibold">
                          Kunci: <strong>{q.correct_answer}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Benar
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Salah
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
                  <div className="p-4 sm:p-5 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                    {/* Stimulus / Context */}
                    {q.context_markdown && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 italic">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeKatex]}
                          components={markdownComponents}
                        >
                          {q.context_markdown}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Question text */}
                    <div className="font-semibold text-slate-900">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                        components={markdownComponents}
                      >
                        {q.question_markdown}
                      </ReactMarkdown>
                    </div>

                    {/* Options list */}
                    <div className="space-y-1.5 pl-1">
                      {q.options.map((opt) => (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                            opt.key === q.correct_answer
                              ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-950'
                              : opt.key === userAnswer
                              ? 'bg-rose-50 border-rose-300 text-rose-950'
                              : 'bg-white border-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="font-bold text-xs w-5">{opt.key}.</span>
                          <div className="flex-1">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath, remarkGfm]}
                              rehypePlugins={[rehypeKatex]}
                              components={markdownComponents}
                            >
                              {opt.text_markdown}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Conceptual solution */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Solusi Konseptual:</span>
                      </div>
                      <ReactMarkdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                        components={markdownComponents}
                      >
                        {q.conceptual_solution_markdown}
                      </ReactMarkdown>
                    </div>

                    {/* Quick trick */}
                    {q.quick_trick_markdown && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-1">
                        <div className="font-bold text-xs uppercase tracking-wider text-amber-800">
                          ⚡ Trik Cepat / Eliminasi Kilat:
                        </div>
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeKatex]}
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
  // VIEW: ACTIVE DRILLING QUESTION (During Test)
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-3xl mx-auto pb-28">
      {/* 1. STICKY TOP STATUS BAR: Question progress, timer, exit button, palette toggle */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 mb-4">
        <div className="flex items-center justify-between gap-2">
          {/* Exit drilling button */}
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Keluar</span>
          </button>

          {/* Question index indicator */}
          <div className="text-center">
            <span className="text-xs font-bold text-slate-800">
              Soal {currentQuestionIndex + 1}
            </span>
            <span className="text-[11px] text-slate-400"> dari {totalQuestions}</span>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                timerMinutes && secondsRemaining < 120
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
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
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Daftar Nomor Soal"
            >
              <span>#{currentQuestionIndex + 1}</span>
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Popover / Collapsible Palette Grid */}
      {isPaletteOpen && (
        <div className="mb-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-md animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Navigasi Nomor Soal ({answeredCount}/{totalQuestions} Dijawab)
            </span>
            <button
              type="button"
              onClick={() => setIsPaletteOpen(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Tutup
            </button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = !!answers[q.example_id];
              const isFlagged = flaggedIndices.has(idx);

              let badgeClass = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
              if (isCurrent) {
                badgeClass = 'bg-indigo-600 text-white font-bold shadow-xs ring-2 ring-indigo-300';
              } else if (isFlagged) {
                badgeClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
              } else if (isAnswered) {
                badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold';
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

      {/* Ad slot for each question (Monetization Requirement 4) */}
      <AdBanner
        slotId={`drilling-q-${currentQuestionIndex + 1}`}
        routeKey={`drilling-active-no-${currentQuestionIndex + 1}`}
        className="mb-4"
      />

      {/* 2. QUESTION CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
        {/* Topic & Variation header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
            {currentQuestion.variation_name}
          </span>
          <button
            type="button"
            onClick={toggleFlagCurrent}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              flaggedIndices.has(currentQuestionIndex)
                ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedIndices.has(currentQuestionIndex) ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{flaggedIndices.has(currentQuestionIndex) ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
          </button>
        </div>

        {/* Reading Context / Stimulus Text if available */}
        {currentQuestion.context_markdown && (
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {currentQuestion.context_markdown}
            </ReactMarkdown>
          </div>
        )}

        {/* Question Text */}
        <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={markdownComponents}
          >
            {currentQuestion.question_markdown}
          </ReactMarkdown>
        </div>

        {/* Options list A, B, C, D, E */}
        <div className="space-y-2.5 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.example_id] === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelectOption(option.key)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-400 text-indigo-950 font-medium shadow-2xs ring-1 ring-indigo-300'
                    : 'bg-white hover:bg-slate-50/90 border-slate-200 text-slate-800'
                }`}
              >
                {/* Option Letter Circle */}
                <div
                  className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {option.key}
                </div>

                <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl p-3 sm:p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => onNavigateQuestion(currentQuestionIndex - 1)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleFinishDrilling}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            Selesai & Kumpulkan
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => onNavigateQuestion(currentQuestionIndex + 1)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishDrilling}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Kumpulkan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Keluar dari Sesi Drilling?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Jawaban Anda pada sesi latihan ini akan dihitung hingga nomor yang telah diselesaikan. Yakin ingin mengakhiri sesi?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onExitDrilling();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs"
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
