import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import type { SmaSubject } from '../../lib/smaSyllabusData';

interface SmaSubjectDetailViewProps {
  subject: SmaSubject;
  onBackToHome: () => void;
  onSelectTopic: (topicId: string) => void;
}

export const SmaSubjectDetailView: React.FC<SmaSubjectDetailViewProps> = ({
  subject,
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
      <div className="mb-4 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-600" />
            <span>Kembali</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${subject.color.badge}`}>
                SMA
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {subject.name}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {subject.chapters.length} Bab • {totalTopics} Sub-materi Kurikulum SMA
            </p>
          </div>
        </div>
      </div>

      {/* Chapters Accordion */}
      <div className="space-y-3">
        {subject.chapters.map((chapter) => {
          const isOpen = openChapters.has(chapter.chapter_num);

          return (
            <div
              key={chapter.chapter_num}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
            >
              <div
                onClick={() => toggleChapter(chapter.chapter_num)}
                className="p-4 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/60 transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {chapter.chapter_num}
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      Bab {chapter.chapter_num}: {chapter.chapter_title}
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {chapter.topics.length} Topik Pembahasan
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-slate-400">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-indigo-600' : 'rotate-0 text-slate-400'
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
                  <div className="p-2 sm:p-3 border-t border-slate-100 space-y-1.5 animate-subtopic-slide">
                    {chapter.topics.map((topic, tIdx) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => onSelectTopic(topic.id)}
                        style={{ animationDelay: `${tIdx * 30}ms` }}
                        className="w-full text-left p-3 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 flex items-center justify-between group transition-all duration-200 active:scale-[0.985] cursor-pointer"
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-2">
                          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                            {topic.topic_num}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-950 leading-snug">
                              {topic.title}
                            </h3>
                            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-3 h-3" />
                              {topic.status === 'ready' ? 'Siap Baca' : 'Segera Hadir'}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0 flex items-center gap-1">
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
