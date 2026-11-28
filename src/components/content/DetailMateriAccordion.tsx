import React, { useState, useRef, memo } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';
import type { DetailMateriLengkap, KelompokDetailMateri, LabelKolomDetailMateri, VisualData } from '../../types/material';
import type { ThemeId } from '../../lib/theme';
import { VisualRenderer } from './VisualRenderer';

export interface DetailMateriAccordionProps {
  data: DetailMateriLengkap;
  theme?: ThemeId;
  renderMarkdown: (text?: string) => React.ReactNode;
  renderInlineMarkdown?: (text?: string) => React.ReactNode;
  onZoomVisual?: (visual: VisualData) => void;
}

function getBadgeLabel(count: number, groupName: string, judulBlok?: string) {
  const lower = (groupName + ' ' + (judulBlok || '')).toLowerCase();
  if (lower.includes('aturan') || lower.includes('kaidah')) return `${count} Aturan`;
  if (lower.includes('rumus')) return `${count} Rumus`;
  if (lower.includes('sifat')) return `${count} Sifat`;
  if (lower.includes('pola')) return `${count} Pola`;
  if (lower.includes('kategori')) return `${count} Kategori`;
  return `${count} Butir`;
}

interface KelompokCardProps {
  kelompok: KelompokDetailMateri;
  isOpen: boolean;
  onToggle: () => void;
  judulBlok?: string;
  labelKolom?: LabelKolomDetailMateri;
  theme?: ThemeId;
  renderMarkdown: (text?: string) => React.ReactNode;
  onZoomVisual?: (visual: VisualData) => void;
}

/**
 * Single responsive DOM tree for both Desktop (3-column grid table) and Mobile (stacked cards),
 * eliminating 2x HTML/hydration overhead while keeping all educational content crawlable.
 */
const KelompokCard = memo<KelompokCardProps>(
  ({ kelompok, isOpen, onToggle, judulBlok, labelKolom, theme = 'light', renderMarkdown, onZoomVisual }) => {
    const butirList = kelompok.butir || [];
    const badgeText = getBadgeLabel(butirList.length, kelompok.nama_kelompok, judulBlok);
    const cardRef = useRef<HTMLDivElement>(null);
    const isVelvet = theme === 'velvet';
    const isPrism = theme === 'prism';

    const handleCloseFromBottom = () => {
      const rect = cardRef.current?.getBoundingClientRect();
      onToggle();
      if (rect && rect.top < 72 && typeof window !== 'undefined') {
        window.scrollTo({
          top: Math.max(0, window.scrollY + rect.top - 76),
          behavior: 'smooth',
        });
      }
    };

    return (
      <div
        ref={cardRef}
        className={`rounded-xl border overflow-hidden transition-all ${
          isOpen
            ? isVelvet
              ? 'border-[#EB8A78]/50 bg-[#2B1723] shadow-xs'
              : 'border-sky-300/90 dark:border-sky-500/40 bg-white dark:bg-[#0D1425] shadow-xs dark:shadow-none'
            : isVelvet
            ? 'border-[#EB8A78]/25 bg-[#25131E] hover:border-[#EB8A78]/45'
            : 'border-slate-200/90 dark:border-slate-700/75 bg-white dark:bg-[#10182B] hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-3 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-2.5 sm:gap-3 text-left transition-all cursor-pointer border-l-4 ${
            isOpen
              ? isVelvet
                ? 'bg-[#381C2C] text-[#FBF1F2] border-b border-[#EB8A78]/30 border-l-[#FF8A6B]'
                : 'bg-sky-50/85 dark:bg-[#172540] text-slate-950 dark:text-white border-b border-sky-200/80 dark:border-slate-700/90 border-l-sky-500 dark:border-l-sky-400'
              : isVelvet
              ? 'bg-[#2B1723] hover:bg-[#341B2B] text-[#FBF1F2] border-l-[#EB8A78]/45'
              : 'bg-white dark:bg-[#111A2E] hover:bg-slate-50 dark:hover:bg-[#16213A] text-slate-900 dark:text-slate-100 border-l-slate-300 dark:border-l-slate-700'
          }`}
          aria-expanded={isOpen}
        >
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[15px] sm:text-base leading-snug tracking-tight ${
                  isOpen
                    ? isVelvet
                      ? 'font-extrabold text-[#FBF1F2]'
                      : 'font-extrabold text-sky-950 dark:text-white'
                    : isVelvet
                    ? 'font-bold text-[#FBF1F2]'
                    : 'font-bold text-slate-900 dark:text-slate-100'
                }`}
              >
                {kelompok.nama_kelompok}
              </span>
              <span
                className={`inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full ${
                  isOpen
                    ? isVelvet
                      ? 'bg-[#FF8A6B] text-[#1E0F17] font-bold shadow-2xs'
                      : 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 font-bold shadow-2xs'
                    : isVelvet
                    ? 'bg-[#3F2132] text-[#FFBE98] border border-[#EB8A78]/35 font-semibold'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800/90 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold'
                }`}
              >
                {badgeText}
              </span>
            </div>
          </div>

          <div
            className={`shrink-0 p-1.5 rounded-lg border transition-colors ${
              isOpen
                ? isVelvet
                  ? 'bg-[#FF8A6B] text-[#1E0F17] border-[#FF8A6B] shadow-2xs'
                  : 'bg-sky-600 text-white border-sky-600 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400 shadow-2xs'
                : isVelvet
                ? 'bg-[#381C2C] text-[#FFBE98] border-[#EB8A78]/30'
                : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 text-current transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className={`px-1.5 py-3 sm:p-4 md:p-5 ${isVelvet ? 'bg-[#1B0F1B]' : 'bg-slate-50/75 dark:bg-[#090F1D]'}`}>
              <div
                className={`md:rounded-xl md:border md:overflow-hidden ${
                  isVelvet
                    ? 'md:border-[#EB8A78]/30 md:bg-[#2B1723]'
                    : 'md:border-slate-200/90 md:dark:border-slate-700/70 md:bg-white md:dark:bg-[#111A2E]'
                }`}
              >
                {/* Desktop Column Header (md+ only) */}
                <div
                  className={`hidden md:grid md:grid-cols-[38%_34%_28%] border-b text-xs font-mono uppercase tracking-wider font-extrabold divide-x ${
                    isVelvet
                      ? 'border-[#EB8A78]/30 bg-[#381C2C] text-[#FFBE98] divide-[#EB8A78]/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-100/95 dark:bg-[#17233B] text-slate-800 dark:text-slate-100 divide-slate-200/70 dark:divide-slate-700/60'
                  }`}
                >
                  <div className="py-3 px-4">{labelKolom?.kolom_1 || 'Sifat / Rumus / Konsep'}</div>
                  <div className="py-3 px-4">{labelKolom?.kolom_2 || 'Contoh Penerapan'}</div>
                  <div className="py-3 px-4">{labelKolom?.kolom_3 || 'Jebakan / Catatan'}</div>
                </div>

                {/* Unified Responsive Rows: Mobile Card -> Desktop 3-Column Row (Wider horizontal reading, clear vertical separation) */}
                <div className={`space-y-4 md:space-y-0 md:divide-y-2 ${isVelvet ? 'md:divide-[#EB8A78]/20' : 'md:divide-slate-200/80 md:dark:divide-slate-800'}`}>
                  {butirList.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className={`rounded-xl md:rounded-none border md:border-0 px-3 py-4 sm:p-4 md:p-0 shadow-xs md:shadow-none grid grid-cols-1 md:grid-cols-[38%_34%_28%] gap-3.5 md:gap-0 md:divide-x transition-colors max-w-full overflow-x-clip ${
                        isVelvet
                          ? 'bg-[#2B1723] md:bg-transparent md:odd:bg-[#2B1723] md:even:bg-[#311A27] md:hover:bg-[#3A1F2F] border-[#EB8A78]/30 md:divide-[#EB8A78]/20'
                          : isPrism
                          ? 'bg-white/95 md:bg-transparent md:odd:bg-white/95 md:even:bg-sky-50/50 md:hover:bg-sky-50/80 border-slate-200 md:divide-slate-200/60'
                          : 'bg-white dark:bg-[#131C32] md:dark:bg-transparent md:odd:bg-white md:even:bg-slate-50/55 md:dark:odd:bg-[#111A2E] md:dark:even:bg-[#141F36] md:hover:bg-sky-50/40 md:dark:hover:bg-[#192744] border-slate-200 dark:border-slate-700/75 md:divide-slate-200/60 md:dark:divide-slate-700/45'
                      }`}
                    >
                      {/* Kolom 1: Judul Poin + Penjelasan Singkat + Mini-SVG */}
                      <div className="md:py-4 md:px-4 min-w-0 max-w-full space-y-2.5">
                        <div className="flex items-start gap-2.5 pb-2.5 md:pb-0 border-b border-slate-200/80 dark:border-slate-700/60 md:border-b-0">
                          <span className="font-mono text-xs font-extrabold md:font-bold px-2 md:px-1.5 py-0.5 rounded-md md:rounded bg-sky-600 text-white md:bg-sky-100 md:text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-400/35 md:border md:border-sky-200/80 shrink-0 mt-0.5">
                            {String(bIdx + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-bold text-slate-950 dark:text-white text-[15.5px] sm:text-base leading-snug">
                            {b.judul_poin}
                          </h4>
                        </div>
                        <div className="space-y-1.5">
                          <div className="md:hidden text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                            {labelKolom?.kolom_1 || 'Konsep / Rumus'}
                          </div>
                          <div className="text-slate-800 dark:text-slate-200 leading-[1.85] [&_p]:mb-3 [&_p:last-child]:mb-0 text-[15px] max-w-full">
                            {renderMarkdown(b.penjelasan_singkat)}
                          </div>
                        </div>
                        {b.visual && (
                          <div className="mt-2 max-w-full overflow-x-auto">
                            <VisualRenderer visual={b.visual} isMini={true} onZoom={onZoomVisual} />
                          </div>
                        )}
                      </div>

                      {/* Kolom 2: Contoh Penerapan */}
                      <div className="md:py-4 md:px-4 min-w-0 max-w-full">
                        <div className="px-3 py-3 sm:p-3.5 rounded-lg bg-emerald-50/70 md:bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/35 border-l-[3px] border-l-emerald-500 dark:border-l-emerald-400/80 text-slate-800 md:text-slate-700 dark:text-slate-200 leading-[1.85] [&_p]:mb-3 [&_p:last-child]:mb-0 text-[15px] max-w-full space-y-1.5">
                          <div className="md:hidden text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            {labelKolom?.kolom_2 || 'Contoh Penerapan'}
                          </div>
                          {renderMarkdown(b.contoh_penerapan)}
                        </div>
                      </div>

                      {/* Kolom 3: Jebakan atau Catatan */}
                      <div className="md:py-4 md:px-4 min-w-0 max-w-full">
                        <div className="px-3 py-3 md:p-3.5 rounded-lg md:rounded-xl bg-amber-50/85 md:bg-amber-50/90 dark:bg-amber-950/25 md:dark:bg-amber-950/30 border border-amber-300/75 md:border-amber-300/80 dark:border-amber-700/50 md:dark:border-amber-700/55 border-l-[3px] md:border-l text-amber-950 dark:text-amber-100 text-[14.5px] sm:text-[15px] leading-[1.85] [&_p]:mb-3 [&_p:last-child]:mb-0 space-y-1.5 max-w-full overflow-x-clip">
                          <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-mono text-xs uppercase md:normal-case tracking-wider md:tracking-normal">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span className="md:hidden">{labelKolom?.kolom_3 || 'Catatan / Jebakan UTBK'}</span>
                            <span className="hidden md:inline">Catatan UTBK</span>
                          </div>
                          <div className="max-w-full">{renderMarkdown(b.jebakan_atau_catatan)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-700/60 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseFromBottom}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-sky-800 dark:text-sky-200 bg-sky-100/80 hover:bg-sky-200/80 dark:bg-sky-900/40 dark:hover:bg-sky-800/60 border border-sky-200/90 dark:border-sky-700/60 transition-colors cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4 shrink-0" />
                  <span>Tutup Tab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

KelompokCard.displayName = 'KelompokCard';

export const DetailMateriAccordion: React.FC<DetailMateriAccordionProps> = memo(
  ({ data, theme = 'light', renderMarkdown, onZoomVisual }) => {
    const isVelvet = theme === 'velvet';
    const isPrism = theme === 'prism';
    const [openGroups, setOpenGroups] = useState<Record<number, boolean>>(() => {
      const initial: Record<number, boolean> = {};
      if (Array.isArray(data.kelompok)) {
        data.kelompok.forEach((kelompok, idx) => {
          initial[idx] = kelompok.buka_default === true;
        });
        if (!Object.values(initial).some(Boolean) && data.kelompok.length > 0) {
          initial[0] = true;
        }
      }
      return initial;
    });

    const toggleGroup = (index: number) => {
      setOpenGroups((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };

    if (!data || !Array.isArray(data.kelompok) || data.kelompok.length === 0) {
      return null;
    }

    return (
      <div
        className={`rounded-2xl border shadow-xs overflow-x-clip max-w-full transition-all ${
          isVelvet
            ? 'bg-[#2B1723] border-[#EB8A78]/35'
            : isPrism
            ? 'bg-white/88 border-white/95'
            : 'bg-white dark:bg-[#0E1526] border-slate-200/90 dark:border-slate-700/80'
        }`}
      >
        <div
          className={`px-3.5 py-4 sm:p-6 space-y-2 border-b ${
            isVelvet
              ? 'border-[#EB8A78]/25 bg-gradient-to-r from-[#381C2C] via-[#2B1723] to-[#23121E]'
              : 'border-slate-200 dark:border-slate-700/80 bg-gradient-to-r from-sky-50/70 via-white to-white dark:from-sky-950/30 dark:via-[#11192D] dark:to-[#0E1526]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-2xs border ${
                isVelvet
                  ? 'text-[#FFBE98] bg-[#4A222B] border-[#EB8A78]/40'
                  : 'text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/60 border-sky-300/80 dark:border-sky-700/80'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isVelvet ? 'text-[#FF8A6B]' : 'text-sky-600 dark:text-sky-400'}`} />
              <span>Zona 1B • Detail Materi Lengkap</span>
            </span>
          </div>
          <h2 className="text-[17px] sm:text-lg font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight">
            {data.judul_blok}
          </h2>
        </div>

        <div className={`px-1.5 py-3 sm:p-4 space-y-4 ${isVelvet ? 'bg-[#1B0F1B]' : 'bg-slate-100/75 dark:bg-[#080D1A]'}`}>
          {data.kelompok.map((kelompok, kIdx) => (
            <KelompokCard
              key={kIdx}
              kelompok={kelompok}
              isOpen={openGroups[kIdx] ?? false}
              onToggle={() => toggleGroup(kIdx)}
              judulBlok={data.judul_blok}
              labelKolom={data.label_kolom}
              theme={theme}
              renderMarkdown={renderMarkdown}
              onZoomVisual={onZoomVisual}
            />
          ))}
        </div>
      </div>
    );
  }
);

DetailMateriAccordion.displayName = 'DetailMateriAccordion';

export default DetailMateriAccordion;
