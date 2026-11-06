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
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Kurikulum Mata Pelajaran SMA
          </h2>
          <p className="text-xs text-slate-500">
            Pilih mata pelajaran untuk memperdalam materi kurikulum merdeka & nasional.
          </p>
        </div>

        {/* Filters: Category & Grade */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                categoryFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('saintek')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                categoryFilter === 'saintek' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MIPA
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('soshum')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                categoryFilter === 'soshum' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              IPS
            </button>
          </div>

          {/* Grade Pills Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setGradeFilter('all')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                gradeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semua Kelas
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('10')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                gradeFilter === '10' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kelas 10
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('11')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                gradeFilter === '11' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kelas 11
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('12')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                gradeFilter === '12' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kelas 12
            </button>
          </div>
        </div>
      </div>

      {/* Grid of SMA Subjects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredSubjects.map((subj) => {
          const totalTopics = subj.chapters.reduce((acc, c) => acc + c.topics.length, 0);

          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => onSelectSubject(subj.id)}
              className={`group flex flex-col p-4 sm:p-5 rounded-2xl border ${subj.color.border} ${subj.color.bg} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-left relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shadow-2xs ${subj.color.text} group-hover:scale-105 transition-transform duration-200 shrink-0`}
                >
                  {ICON_MAP[subj.icon] || <BookOpen className="w-6 h-6" />}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-slate-600 border border-slate-200/60">
                  {subj.category}
                </span>
              </div>

              <div className="flex-1 min-h-[38px] flex flex-col justify-center">
                <h3 className={`text-sm sm:text-base font-bold ${subj.color.text} leading-tight line-clamp-2`}>
                  {subj.name}
                </h3>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${subj.color.badge}`}>
                  {subj.chapters.length} Bab • {totalTopics} Materi
                </span>
                <span className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1 duration-150">
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
