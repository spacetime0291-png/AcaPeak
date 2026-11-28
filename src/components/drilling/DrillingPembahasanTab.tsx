import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Trash2,
  Play,
  History,
  Layers,
  Award,
} from 'lucide-react';
import {
  getDrillingHistory,
  deleteDrillingSession,
  clearDrillingHistory,
  formatSessionTimestamp,
  formatSessionDuration,
  DRILLING_HISTORY_CHANGED_EVENT,
  type DrillingSessionRecord,
} from '../../lib/drillingHistory';
import type { ThemeId } from '../../lib/theme';

const LazyDrillingReviewView = lazy(() =>
  import('./DrillingReviewView').then((m) => ({ default: m.DrillingReviewView }))
);

interface DrillingPembahasanTabProps {
  subtestCode: string;
  subtestName: string;
  theme: ThemeId;
  onGoToDrilling: () => void;
  onReviewOpenChange?: (isOpen: boolean) => void;
}

function getQuestionTypeShortLabel(questionType: string): string {
  switch (questionType) {
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

export const DrillingPembahasanTab: React.FC<DrillingPembahasanTabProps> = ({
  subtestCode,
  subtestName,
  theme,
  onGoToDrilling,
  onReviewOpenChange,
}) => {
  const isCosmic = theme === 'dark';
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  // Start empty for SSR/hydration safety, populate from localStorage in useEffect
  const [allSessions, setAllSessions] = useState<DrillingSessionRecord[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scopeFilter, setScopeFilter] = useState<'subtest' | 'all'>('subtest');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    const syncHistory = () => {
      setAllSessions(getDrillingHistory());
      setHasLoaded(true);
    };
    syncHistory();
    window.addEventListener(DRILLING_HISTORY_CHANGED_EVENT, syncHistory);
    return () => window.removeEventListener(DRILLING_HISTORY_CHANGED_EVENT, syncHistory);
  }, []);

  // Reset selected session if subtest changes
  useEffect(() => {
    setSelectedSessionId(null);
    setScopeFilter('subtest');
  }, [subtestCode]);

  const normalizedCode = subtestCode.toUpperCase();

  const subtestSessions = useMemo(() => {
    return allSessions.filter(
      (s) =>
        s.primarySubtest.toUpperCase() === normalizedCode ||
        s.subtests.some((code) => code.toUpperCase() === normalizedCode)
    );
  }, [allSessions, normalizedCode]);

  const filteredSessions = scopeFilter === 'subtest' ? subtestSessions : allSessions;

  const selectedSession = useMemo(
    () => allSessions.find((s) => s.id === selectedSessionId) || null,
    [allSessions, selectedSessionId]
  );

  useEffect(() => {
    onReviewOpenChange?.(Boolean(selectedSession));
  }, [selectedSession, onReviewOpenChange]);

  const summaryStats = useMemo(() => {
    const totalSessions = filteredSessions.length;
    const totalAnswered = filteredSessions.reduce((acc, s) => acc + s.answeredCount, 0);
    const totalCorrect = filteredSessions.reduce((acc, s) => acc + s.correctCount, 0);
    const avgAccuracy =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return { totalSessions, totalAnswered, avgAccuracy };
  }, [filteredSessions]);

  const handleDeleteOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      typeof window === 'undefined' ||
      window.confirm('Hapus riwayat sesi drilling ini?')
    ) {
      if (selectedSessionId === id) {
        setSelectedSessionId(null);
      }
      deleteDrillingSession(id);
    }
  };

  const handleClearScope = () => {
    const label =
      scopeFilter === 'subtest' ? `subtes ${normalizedCode}` : 'semua subtes';
    if (
      typeof window === 'undefined' ||
      window.confirm(`Hapus seluruh riwayat sesi drilling untuk ${label}?`)
    ) {
      setSelectedSessionId(null);
      clearDrillingHistory(scopeFilter === 'subtest' ? normalizedCode : undefined);
    }
  };

  // Opened session Pembahasan viewer (Lazy-loaded so vendor-markdown stays deferred)
  if (selectedSession) {
    return (
      <Suspense
        fallback={
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Membuka pembahasan sesi...
            </p>
          </div>
        }
      >
        <LazyDrillingReviewView
          items={selectedSession.items}
          totalConfigured={selectedSession.totalConfigured}
          sessionSummaryLabel={`${selectedSession.subtests.join(' • ')} • ${formatSessionTimestamp(
            selectedSession.createdAt
          )}`}
          theme={theme}
          backLabel="Daftar Sesi"
          footerBackLabel="Daftar Sesi"
          onBack={() => setSelectedSessionId(null)}
          embedded={true}
        />
      </Suspense>
    );
  }

  return (
    <div className="space-y-3.5 animate-page-enter">
      {/* 1. Header, Scope Filter & Overall Stats */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-2xs space-y-4 ${
          isVelvet
            ? 'bg-[#2B1723]/92 border-[#EB8A78]/20'
            : isCosmic
            ? 'bg-[#0c1326]/90 border-slate-800'
            : isPrism
            ? 'bg-white/80 backdrop-blur-md border-white/95'
            : 'bg-white border-stone-200/90'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <History
                className={`w-4 h-4 shrink-0 ${
                  isVelvet ? 'text-[#FF8A6B]' : 'text-indigo-600 dark:text-cyan-400'
                }`}
              />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Riwayat &amp; Pembahasan Drilling
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Setiap sesi drilling dibungkus terpisah sesuai sesi yang dikerjakan. Hanya soal yang dijawab yang dihitung.
            </p>
          </div>

          {filteredSessions.length > 0 && (
            <button
              type="button"
              onClick={handleClearScope}
              className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 transition cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Riwayat</span>
            </button>
          )}
        </div>

        {/* Scope Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setScopeFilter('subtest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              scopeFilter === 'subtest'
                ? isVelvet
                  ? 'bg-[#E27B60] text-[#1E0F17] border-[#E27B60]'
                  : isCosmic
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-500/40'
                  : 'bg-indigo-600 text-white border-indigo-600'
                : isVelvet
                ? 'bg-[#1F1020] text-[#EBD6DC] border-[#EB8A78]/20'
                : 'bg-stone-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Subtes {normalizedCode}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/15">
              {subtestSessions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setScopeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              scopeFilter === 'all'
                ? isVelvet
                  ? 'bg-[#E27B60] text-[#1E0F17] border-[#E27B60]'
                  : isCosmic
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-500/40'
                  : 'bg-indigo-600 text-white border-indigo-600'
                : isVelvet
                ? 'bg-[#1F1020] text-[#EBD6DC] border-[#EB8A78]/20'
                : 'bg-stone-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Semua Subtes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/15">
              {allSessions.length}
            </span>
          </button>
        </div>

        {/* Summary Strip */}
        {summaryStats.totalSessions > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
            <div
              className={`p-2.5 sm:p-3 rounded-xl border ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/20'
                  : 'bg-stone-50/90 dark:bg-slate-900/90 border-stone-200/80 dark:border-slate-800'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Total Sesi
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {summaryStats.totalSessions}
              </div>
            </div>
            <div
              className={`p-2.5 sm:p-3 rounded-xl border ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/20'
                  : 'bg-stone-50/90 dark:bg-slate-900/90 border-stone-200/80 dark:border-slate-800'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Soal Dikerjakan
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {summaryStats.totalAnswered}
              </div>
            </div>
            <div
              className={`p-2.5 sm:p-3 rounded-xl border ${
                isVelvet
                  ? 'bg-[#22121D] border-[#EB8A78]/20'
                  : 'bg-stone-50/90 dark:bg-slate-900/90 border-stone-200/80 dark:border-slate-800'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Rata-rata Akurasi
              </div>
              <div
                className={`text-base sm:text-lg font-black mt-0.5 ${
                  isVelvet ? 'text-[#FFBE98]' : 'text-indigo-600 dark:text-cyan-400'
                }`}
              >
                {summaryStats.avgAccuracy}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Session Cards List or Empty State */}
      {!hasLoaded ? (
        <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
          Memuat riwayat sesi...
        </div>
      ) : filteredSessions.length === 0 ? (
        <div
          className={`rounded-2xl border p-6 sm:p-10 text-center space-y-4 ${
            isVelvet
              ? 'bg-[#2B1723]/88 border-[#EB8A78]/20'
              : isCosmic
              ? 'bg-[#0c1326]/85 border-slate-800'
              : isPrism
              ? 'bg-white/80 border-white/95'
              : 'bg-white border-stone-200/90'
          }`}
        >
          <div
            className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border ${
              isVelvet
                ? 'bg-[#3A1F31] border-[#EB8A78]/30 text-[#FFBE98]'
                : 'bg-indigo-50 dark:bg-cyan-950/60 border-indigo-200/80 dark:border-cyan-800/60 text-indigo-600 dark:text-cyan-400'
            }`}
          >
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {scopeFilter === 'subtest'
                ? `Belum Ada Riwayat Sesi ${normalizedCode}`
                : 'Belum Ada Riwayat Sesi Drilling'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Kerjakan latihan pada tab <strong>Drilling Soal</strong> untuk {subtestName}. Setelah selesai, pembahasan dan skor per sesi akan otomatis tersimpan rapi di sini.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2.5 flex-wrap pt-1">
            <button
              type="button"
              onClick={onGoToDrilling}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer flex items-center gap-2 ${
                isVelvet
                  ? 'bg-gradient-to-r from-[#E27B60] to-[#D4954B] text-[#1E0F17] font-extrabold'
                  : isPrism
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600 text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mulai Drilling {normalizedCode}</span>
            </button>
            {scopeFilter === 'subtest' && allSessions.length > 0 && (
              <button
                type="button"
                onClick={() => setScopeFilter('all')}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-stone-50 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Lihat Semua Subtes ({allSessions.length})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSessions.map((session, sIdx) => {
            const uniqueTopics = Array.from(
              new Set(
                session.items
                  .map((i) => i.question.variation_name)
                  .filter(Boolean)
              )
            );
            const topicPreview =
              uniqueTopics.length > 2
                ? `${uniqueTopics.slice(0, 2).join(', ')} +${uniqueTopics.length - 2} topik`
                : uniqueTopics.join(', ') || `Sesi ${session.primarySubtest}`;

            const uniqueTypes = Array.from(
              new Set(
                session.items.map((i) =>
                  getQuestionTypeShortLabel(i.question.question_type)
                )
              )
            );

            const accuracyBadgeClass =
              session.accuracy >= 80
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/70'
                : session.accuracy >= 50
                ? 'bg-amber-100 dark:bg-amber-950/75 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/70'
                : 'bg-rose-100 dark:bg-rose-950/75 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700/70';

            return (
              <div
                key={session.id}
                onClick={() => setSelectedSessionId(session.id)}
                className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 shadow-2xs transition-all duration-200 cursor-pointer group ${
                  isVelvet
                    ? 'bg-[#2B1723]/92 border-[#EB8A78]/20 hover:border-[#FF8A6B]/60'
                    : isCosmic
                    ? 'bg-[#0e1736]/90 border-slate-800 hover:border-cyan-500/50'
                    : isPrism
                    ? 'bg-white/82 border-white/95 hover:border-sky-300 hover:shadow-md'
                    : 'bg-white border-stone-200/90 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Row 1: Subtest badge, Date, Topic & Accuracy */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-extrabold border ${
                          isVelvet
                            ? 'bg-[#4A222B] text-[#FFBE98] border-[#EB8A78]/25'
                            : 'bg-indigo-50 dark:bg-cyan-950/70 text-indigo-700 dark:text-cyan-300 border-indigo-200/80 dark:border-cyan-800/60'
                        }`}
                      >
                        {session.subtests.join(' • ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        Sesi #{filteredSessions.length - sIdx}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        • {formatSessionTimestamp(session.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white leading-snug truncate group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                      {topicPreview}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold shrink-0 inline-flex items-center gap-1 ${accuracyBadgeClass}`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{session.accuracy}%</span>
                  </span>
                </div>

                {/* Row 2: 4 Compact Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div
                    className={`px-3 py-2 rounded-xl border ${
                      isVelvet
                        ? 'bg-[#22121D] border-[#EB8A78]/18'
                        : 'bg-stone-50/90 dark:bg-slate-900/80 border-stone-200/70 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>Dikerjakan</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                      {session.answeredCount} Soal
                      {session.answeredCount < session.totalConfigured && (
                        <span className="font-normal text-[11px] text-slate-400 ml-1">
                          / {session.totalConfigured}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-3 py-2 rounded-xl border bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/50">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Benar</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">
                      {session.correctCount} Soal
                    </div>
                  </div>

                  <div className="px-3 py-2 rounded-xl border bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/50">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>Salah</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-300 mt-0.5">
                      {session.wrongCount} Soal
                    </div>
                  </div>

                  <div
                    className={`px-3 py-2 rounded-xl border ${
                      isVelvet
                        ? 'bg-[#22121D] border-[#EB8A78]/18'
                        : 'bg-stone-50/90 dark:bg-slate-900/80 border-stone-200/70 dark:border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Durasi</span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                      {formatSessionDuration(session.durationSeconds)}
                    </div>
                  </div>
                </div>

                {/* Row 3: Question Type Pills + Open Pembahasan CTA */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    {uniqueTypes.map((typeLabel) => (
                      <span
                        key={typeLabel}
                        className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {typeLabel}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteOne(session.id, e)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                      title="Hapus sesi ini"
                      aria-label="Hapus sesi ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span
                      className={`inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
                        isVelvet
                          ? 'bg-[#E27B60] text-[#1E0F17] font-extrabold group-hover:brightness-110'
                          : isPrism
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                          : 'bg-indigo-600 dark:bg-cyan-600 text-white group-hover:bg-indigo-700 dark:group-hover:bg-cyan-500'
                      }`}
                    >
                      <span>Buka Pembahasan</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
