import React, { useState } from 'react';
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  TrendingUp,
  Users,
  Globe,
  Binary,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { SMA_SUBJECTS } from '../../lib/smaSyllabusData';

interface SmaSubjectGridProps {
  onSelectSubject: (subjectId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />,
  Atom: <Atom className="w-6 h-6 sm:w-7 sm:h-7" />,
  FlaskConical: <FlaskConical className="w-6 h-6 sm:w-7 sm:h-7" />,
  Dna: <Dna className="w-6 h-6 sm:w-7 sm:h-7" />,
  TrendingUp: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
  Users: <Users className="w-6 h-6 sm:w-7 sm:h-7" />,
  Globe: <Globe className="w-6 h-6 sm:w-7 sm:h-7" />,
  Binary: <Binary className="w-6 h-6 sm:w-7 sm:h-7" />,
};

export const SmaSubjectGrid: React.FC<SmaSubjectGridProps> = ({ onSelectSubject }) => {
  const [gradeFilter, setGradeFilter] = useState<'all' | '10' | '11' | '12'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'saintek' | 'soshum'>('all');

  const filteredSubjects = SMA_SUBJECTS.filter((subj) => {
    const matchGrade = gradeFilter === 'all' || subj.grade === 'all' || subj.grade === gradeFilter;
    const matchCat = categoryFilter === 'all' || subj.category === categoryFilter || subj.category === 'umum';
    return matchGrade && matchCat;
  });

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Kurikulum Mata Pelajaran SMA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pilih mata pelajaran untuk memperdalam materi kurikulum merdeka & nasional.
          </p>
        </div>

        {/* Filters: Category & Grade */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs sm:text-sm">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                categoryFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('saintek')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                categoryFilter === 'saintek' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              MIPA
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('soshum')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                categoryFilter === 'soshum' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              IPS
            </button>
          </div>

          {/* Grade Pills Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              type="button"
              onClick={() => setGradeFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gradeFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Semua Kelas
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('10')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gradeFilter === '10' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 10
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('11')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gradeFilter === '11' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 11
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('12')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                gradeFilter === '12' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 12
            </button>
          </div>
        </div>
      </div>

      {/* Grid of SMA Subjects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {filteredSubjects.map((subj) => {
          const totalTopics = subj.chapters.reduce((acc, c) => acc + c.topics.length, 0);

          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => onSelectSubject(subj.id)}
              className={`group flex flex-col p-4 sm:p-5 rounded-3xl border ${subj.color.border} dark:border-slate-800 ${subj.color.bg} dark:bg-slate-900/90 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer text-left relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-2xs ${subj.color.text} dark:text-white group-hover:scale-105 transition-transform duration-200 shrink-0`}
                >
                  {ICON_MAP[subj.icon] || <BookOpen className="w-7 h-7" />}
                </div>
                <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  {subj.category}
                </span>
              </div>

              <div className="flex-1 min-h-[42px] flex flex-col justify-center">
                <h3 className={`text-sm sm:text-base font-bold ${subj.color.text} dark:text-white leading-snug line-clamp-2`}>
                  {subj.name}
                </h3>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm">
                <span className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${subj.color.badge}`}>
                  {subj.chapters.length} Bab • {totalTopics} Materi
                </span>
                <span className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-transform group-hover:translate-x-1 duration-150">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
