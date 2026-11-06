import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import type { SmaSubject } from '../../lib/smaSyllabusData';
import { ThemeToggle } from '../common/ThemeToggle';

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
      {/* Header */}
      <div className="mb-4 bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1 text-xs sm:text-sm font-semibold"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Kembali</span>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${subject.color.badge}`}>
                  SMA
                </span>
                <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {subject.name}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {subject.chapters.length} Bab • {totalTopics} Sub-materi Kurikulum SMA
              </p>
            </div>
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
        </div>
      </div>

      {/* Chapters Accordion */}
      <div className="space-y-3">
        {subject.chapters.map((chapter) => {
          const isOpen = openChapters.has(chapter.chapter_num);

          return (
            <div
              key={chapter.chapter_num}
              className="bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-colors"
            >
              <div
                onClick={() => toggleChapter(chapter.chapter_num)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {chapter.chapter_num}
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      Bab {chapter.chapter_num}: {chapter.chapter_title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {chapter.topics.length} Topik Pembahasan
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-slate-400">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'rotate-0 text-slate-400'
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
                  <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-subtopic-slide">
                    {chapter.topics.map((topic, tIdx) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => onSelectTopic(topic.id)}
                        style={{ animationDelay: `${tIdx * 30}ms` }}
                        className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/70 hover:bg-indigo-50/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-500/50 flex items-center justify-between group transition-all duration-200 active:scale-[0.985] cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-2">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition mt-0.5">
                            {topic.topic_num}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-950 dark:group-hover:text-indigo-200 leading-snug">
                              {topic.title}
                            </h3>
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              {topic.status === 'ready' ? 'Siap Baca' : 'Segera Hadir'}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0 flex items-center gap-1">
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
