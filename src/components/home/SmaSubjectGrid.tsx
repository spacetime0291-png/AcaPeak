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
import { PottedPlantDecor, LeafCornerDecor } from '../decorations/NatureDecorations';

interface SmaSubjectGridProps {
  theme?: 'light' | 'dark';
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

// Neon borders & halos for SMA Subjects in Dark Mode
const SMA_DARK_THEME_MAP: Record<string, { border: string; halo: string; text: string }> = {
  matematika: { border: 'neon-border-blue', halo: 'icon-halo-blue', text: 'text-blue-300' },
  fisika: { border: 'neon-border-purple', halo: 'icon-halo-purple', text: 'text-purple-300' },
  kimia: { border: 'neon-border-amber', halo: 'icon-halo-amber', text: 'text-amber-300' },
  biologi: { border: 'neon-border-emerald', halo: 'icon-halo-emerald', text: 'text-emerald-300' },
  ekonomi: { border: 'neon-border-cyan', halo: 'icon-halo-cyan', text: 'text-cyan-300' },
  sosiologi: { border: 'neon-border-coral', halo: 'icon-halo-coral', text: 'text-rose-300' },
  geografi: { border: 'neon-border-emerald', halo: 'icon-halo-emerald', text: 'text-teal-300' },
  informatika: { border: 'neon-border-cyan', halo: 'icon-halo-cyan', text: 'text-cyan-300' },
};

export const SmaSubjectGrid: React.FC<SmaSubjectGridProps> = ({ theme = 'light', onSelectSubject }) => {
  const isDark = theme === 'dark';
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
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Kurikulum Mata Pelajaran SMA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pilih mata pelajaran untuk memperdalam materi kurikulum merdeka & nasional.
          </p>
        </div>

        {/* Filters: Category & Grade */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs sm:text-sm">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-stone-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-2xs">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('saintek')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                categoryFilter === 'saintek'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              MIPA
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('soshum')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                categoryFilter === 'soshum'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              IPS
            </button>
          </div>

          {/* Grade Pills Filter */}
          <div className="flex items-center gap-1 bg-stone-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-2xs">
            <button
              type="button"
              onClick={() => setGradeFilter('all')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                gradeFilter === 'all'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Semua Kelas
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('10')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                gradeFilter === '10'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 10
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('11')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                gradeFilter === '11'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 11
            </button>
            <button
              type="button"
              onClick={() => setGradeFilter('12')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                gradeFilter === '12'
                  ? 'bg-white dark:bg-[#0e244d] text-slate-900 dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Kelas 12
            </button>
          </div>
        </div>
      </div>

      {/* Grid of SMA Subjects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {filteredSubjects.map((subj, sIdx) => {
          const totalTopics = subj.chapters.reduce((acc, c) => acc + c.topics.length, 0);
          const darkStyle = SMA_DARK_THEME_MAP[subj.id] || {
            border: 'neon-border-blue',
            halo: 'icon-halo-blue',
            text: 'text-blue-300',
          };

          const cardStyle = isDark
            ? `bg-[#0e1634]/90 backdrop-blur-md ${darkStyle.border} shadow-[0_4px_24px_rgba(0,0,0,0.45)]`
            : `${subj.color.border} ${subj.color.bg} shadow-xs`;

          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => onSelectSubject(subj.id)}
              className={`group flex flex-col p-4 sm:p-5 rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-pointer text-left relative overflow-hidden border ${cardStyle}`}
            >
              {/* Light Mode Decorative corner */}
              {!isDark && (
                <div>
                  {sIdx % 2 === 0 ? (
                    <LeafCornerDecor position="top-left" />
                  ) : (
                    <PottedPlantDecor position="bottom-right" />
                  )}
                </div>
              )}

              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className="relative">
                  {/* Glowing halo in Dark Mode */}
                  {isDark && (
                    <div
                      className={`absolute -inset-2 rounded-full ${darkStyle.halo} blur-sm pointer-events-none group-hover:scale-125 transition-transform`}
                    />
                  )}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 border ${
                      isDark
                        ? 'bg-slate-900/90 text-cyan-200 border-white/10'
                        : `bg-white/90 ${subj.color.text} border-black/5`
                    }`}
                  >
                    {ICON_MAP[subj.icon] || <BookOpen className="w-7 h-7" />}
                  </div>
                </div>

                <span
                  className={`text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-white/80 text-slate-600 border border-slate-200/60'
                  }`}
                >
                  {subj.category}
                </span>
              </div>

              <div className="flex-1 min-h-[42px] flex flex-col justify-center relative z-10">
                <h3
                  className={`text-sm sm:text-base font-bold transition-colors leading-snug line-clamp-2 ${
                    isDark
                      ? 'text-white group-hover:text-cyan-300'
                      : 'text-slate-800 group-hover:text-blue-600'
                  }`}
                >
                  {subj.name}
                </h3>
              </div>

              <div
                className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-xs sm:text-sm relative z-10 ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200/50 text-slate-500'
                }`}
              >
                <span
                  className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${
                    isDark ? 'bg-slate-800 text-slate-300' : subj.color.badge
                  }`}
                >
                  {subj.chapters.length} Bab • {totalTopics} Materi
                </span>
                <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-transform group-hover:translate-x-1 duration-150">
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
