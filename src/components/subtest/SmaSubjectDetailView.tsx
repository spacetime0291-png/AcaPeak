import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import type { SmaSubject } from '../../lib/smaSyllabusData';
import { ThemeToggle } from '../common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../decorations/NatureDecorations';

interface SmaSubjectDetailViewProps {
  subject: SmaSubject;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onBackToHome: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const SmaSubjectDetailView: React.FC<SmaSubjectDetailViewProps> = ({
  subject,
  theme = 'light',
  onToggleTheme = () => {},
  onBackToHome,
  onSelectTopic,
}) => {
  const isDark = theme === 'dark';
  const [openChapters, setOpenChapters] = useState<Set<number>>(
    new Set(subject.chapters.map((c) => c.chapter_num))
  );

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

  const totalTopics = subject.chapters.reduce((acc, c) => acc + c.topics.length, 0);

  return (
    <div className="w-full pb-20">
      {/* Header with clean Focus-mode styling */}
      <div className="relative overflow-hidden mb-4 bg-white/95 dark:bg-[#070913]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-indigo-500/35 p-4 sm:p-5 shadow-sm transition-all duration-300">
        {!isDark && <NatureFocusHeaderAccent />}

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1 text-xs sm:text-sm font-semibold"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              <span>Kembali</span>
            </button>
            <div className="h-5 w-px bg-stone-200 dark:bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${subject.color.badge} dark:bg-indigo-950/80 dark:text-cyan-300 dark:border dark:border-cyan-500/40`}>
                  SMA
                </span>
                <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {subject.name}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-cyan-300/80 mt-0.5 font-medium">
                {subject.chapters.length} Bab • {totalTopics} Sub-materi Kurikulum SMA
              </p>
            </div>
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
        </div>
      </div>

      {/* Chapters Accordion: Standalone Cards */}
      <div className="space-y-4">
        {subject.chapters.map((chapter) => {
          const isOpen = openChapters.has(chapter.chapter_num);

          return (
            <div
              key={chapter.chapter_num}
              className={`rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden ${
                isDark
                  ? 'bg-[#0e1736]/90 backdrop-blur-md border border-indigo-500/40 hover:border-cyan-400/60 shadow-[0_6px_24px_rgba(0,0,0,0.45)]'
                  : 'bg-white border border-stone-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div
                onClick={() => toggleChapter(chapter.chapter_num)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 transition cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 dark:bg-gradient-to-tr dark:from-blue-600 dark:to-cyan-500 text-indigo-800 dark:text-white font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-indigo-200 dark:border-cyan-400/40 shadow-xs dark:shadow-[0_0_12px_rgba(0,242,254,0.4)]">
                    {chapter.chapter_num < 10 ? `0${chapter.chapter_num}` : chapter.chapter_num}
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      Bab {chapter.chapter_num}: {chapter.chapter_title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-cyan-300/80 mt-0.5 font-medium">
                      {chapter.topics.length} Topik Pembahasan
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : 'rotate-0 text-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-3.5 sm:p-5 border-t border-stone-100 dark:border-indigo-500/25 space-y-2.5 animate-subtopic-slide bg-[#fffdf9] dark:bg-[#080d21]/80">
                    {chapter.topics.map((topic, tIdx) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => onSelectTopic(topic.id)}
                        style={{ animationDelay: `${tIdx * 30}ms` }}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl flex items-center justify-between group transition-all duration-200 active:scale-[0.985] cursor-pointer shadow-2xs border ${
                          isDark
                            ? 'bg-[#0f1b3b]/90 hover:bg-[#152754] border-slate-700/80 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                            : 'bg-white hover:bg-[#fff9eb] border-stone-200/80 hover:border-amber-200'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-2">
                          <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-cyan-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950 transition mt-0.5 border border-transparent dark:border-slate-700">
                            {topic.topic_num}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-950 dark:group-hover:text-cyan-200 leading-snug">
                              {topic.title}
                            </h3>
                            <span className="text-xs text-emerald-600 dark:text-cyan-400 font-medium flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              {topic.status === 'ready' ? 'Siap Baca' : 'Segera Hadir'}
                            </span>
                          </div>
                        </div>

                        <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1 group-hover:translate-x-1 ${
                          isDark
                            ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/50 group-hover:bg-cyan-500 group-hover:text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                            : 'bg-blue-50 text-blue-700 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                          <span>Buka Materi</span>
                          <span>→</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
