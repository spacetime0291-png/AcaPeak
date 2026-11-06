import React from 'react';
import {
  Brain,
  BookOpen,
  PenTool,
  Calculator,
  Languages,
  Globe,
  Binary,
  ArrowRight,
} from 'lucide-react';
import { UTBK_SYLLABUS } from '../../lib/syllabusData';

interface UtbkSubtestGridProps {
  onSelectSubtest: (code: string) => void;
}

interface SubtestVisualConfig {
  code: string;
  name: string;
  shortLabel: string;
  icon: React.ReactNode;
  bgPastel: string;
  hoverBorder: string;
  iconBg: string;
  textColor: string;
  badgeBg: string;
}

export const UtbkSubtestGrid: React.FC<UtbkSubtestGridProps> = ({ onSelectSubtest }) => {
  // Map syllabus stats to subtests
  const subtestStats = React.useMemo(() => {
    const stats: Record<string, { chapters: number; topics: number }> = {};
    for (const item of UTBK_SYLLABUS) {
      const chapters = item.chapters.length;
      const topics = item.chapters.reduce((acc, c) => acc + c.subchapters.length, 0);
      stats[item.code] = { chapters, topics };
    }
    return stats;
  }, []);

  const subtests: SubtestVisualConfig[] = [
    {
      code: 'PU',
      name: 'Penalaran Umum',
      shortLabel: 'Penalaran Umum',
      icon: <Brain className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-indigo-50/70 hover:bg-indigo-50',
      hoverBorder: 'hover:border-indigo-300 hover:shadow-indigo-100/50',
      iconBg: 'bg-indigo-100 text-indigo-700',
      textColor: 'text-indigo-950',
      badgeBg: 'bg-indigo-100/80 text-indigo-700',
    },
    {
      code: 'PPU',
      name: 'Pengetahuan & Pemahaman Umum',
      shortLabel: 'Pengetahuan Umum',
      icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-sky-50/70 hover:bg-sky-50',
      hoverBorder: 'hover:border-sky-300 hover:shadow-sky-100/50',
      iconBg: 'bg-sky-100 text-sky-700',
      textColor: 'text-sky-950',
      badgeBg: 'bg-sky-100/80 text-sky-700',
    },
    {
      code: 'PBM',
      name: 'Pemahaman Bacaan & Menulis',
      shortLabel: 'Bacaan & Menulis',
      icon: <PenTool className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-emerald-50/70 hover:bg-emerald-50',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-100/50',
      iconBg: 'bg-emerald-100 text-emerald-700',
      textColor: 'text-emerald-950',
      badgeBg: 'bg-emerald-100/80 text-emerald-700',
    },
    {
      code: 'PK',
      name: 'Pengetahuan Kuantitatif',
      shortLabel: 'Kuantitatif',
      icon: <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-amber-50/70 hover:bg-amber-50',
      hoverBorder: 'hover:border-amber-300 hover:shadow-amber-100/50',
      iconBg: 'bg-amber-100 text-amber-700',
      textColor: 'text-amber-950',
      badgeBg: 'bg-amber-100/80 text-amber-800',
    },
    {
      code: 'LBI',
      name: 'Literasi Bahasa Indonesia',
      shortLabel: 'Literasi Indo',
      icon: <Languages className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-rose-50/70 hover:bg-rose-50',
      hoverBorder: 'hover:border-rose-300 hover:shadow-rose-100/50',
      iconBg: 'bg-rose-100 text-rose-700',
      textColor: 'text-rose-950',
      badgeBg: 'bg-rose-100/80 text-rose-700',
    },
    {
      code: 'LBE',
      name: 'Literasi Bahasa Inggris',
      shortLabel: 'English Literacy',
      icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-blue-50/70 hover:bg-blue-50',
      hoverBorder: 'hover:border-blue-300 hover:shadow-blue-100/50',
      iconBg: 'bg-blue-100 text-blue-700',
      textColor: 'text-blue-950',
      badgeBg: 'bg-blue-100/80 text-blue-700',
    },
    {
      code: 'PM',
      name: 'Penalaran Matematika',
      shortLabel: 'Penalaran MTK',
      icon: <Binary className="w-6 h-6 sm:w-7 sm:h-7" />,
      bgPastel: 'bg-purple-50/70 hover:bg-purple-50',
      hoverBorder: 'hover:border-purple-300 hover:shadow-purple-100/50',
      iconBg: 'bg-purple-100 text-purple-700',
      textColor: 'text-purple-950',
      badgeBg: 'bg-purple-100/80 text-purple-700',
    },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            7 Subtes Standar UTBK-SNBT
          </h2>
          <p className="text-xs text-slate-500">
            Pilih subtes untuk membaca materi atau latihan drilling soal multi-bab.
          </p>
        </div>
        <span className="hidden sm:inline-flex text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
          Total 96 Topik Terstandar
        </span>
      </div>

      {/* Modern App-Style Grid: 4 columns desktop/tablet, 2 or 3-4 on mobile with rounded-2xl square icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {subtests.map((sub) => {
          const stats = subtestStats[sub.code] || { chapters: 3, topics: 9 };

          return (
            <button
              key={sub.code}
              type="button"
              onClick={() => onSelectSubtest(sub.code.toLowerCase())}
              className={`group flex flex-col p-4 sm:p-5 rounded-2xl border border-slate-200/80 ${sub.bgPastel} ${sub.hoverBorder} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-left relative overflow-hidden`}
              aria-label={`Buka Subtes ${sub.name}`}
            >
              {/* Top Row: Square rounded-2xl Icon + Code Badge */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${sub.iconBg} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0`}
                >
                  {sub.icon}
                </div>
                <span className="font-mono text-xs font-black tracking-wider text-slate-400 group-hover:text-slate-700 transition-colors">
                  {sub.code}
                </span>
              </div>

              {/* Subtest Name without fluff */}
              <div className="flex-1 min-h-[38px] flex flex-col justify-center">
                <h3 className={`text-sm sm:text-base font-bold ${sub.textColor} leading-tight line-clamp-2`}>
                  {sub.name}
                </h3>
              </div>

              {/* Bottom Row: Minimal Badge (Chapter count) + Action arrow */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${sub.badgeBg}`}>
                  {stats.chapters} Bab • {stats.topics} Topik
                </span>
                <span className="text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1 duration-150">
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
