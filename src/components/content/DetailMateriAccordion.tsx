import React, { useState, useRef, memo } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';
import type { DetailMateriLengkap, KelompokDetailMateri, LabelKolomDetailMateri, VisualData } from '../../types/material';
import { VisualRenderer } from './VisualRenderer';

export interface DetailMateriAccordionProps {
  data: DetailMateriLengkap;
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
  renderMarkdown: (text?: string) => React.ReactNode;
  onZoomVisual?: (visual: VisualData) => void;
}

/**
 * Single responsive DOM tree for both Desktop (3-column grid table) and Mobile (stacked cards),
 * eliminating 2x HTML/hydration overhead while keeping all educational content crawlable.
 */
const KelompokCard = memo<KelompokCardProps>(
  ({ kelompok, isOpen, onToggle, judulBlok, labelKolom, renderMarkdown, onZoomVisual }) => {
    const butirList = kelompok.butir || [];
    const badgeText = getBadgeLabel(butirList.length, kelompok.nama_kelompok, judulBlok);
    const cardRef = useRef<HTMLDivElement>(null);

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
            ? 'border-sky-300/90 dark:border-sky-500/40 bg-white dark:bg-[#0D1425] shadow-xs dark:shadow-none'
            : 'border-slate-200/90 dark:border-slate-700/75 bg-white dark:bg-[#10182B] hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-left transition-all cursor-pointer border-l-4 ${
            isOpen
              ? 'bg-sky-50/85 dark:bg-[#172540] text-slate-950 dark:text-white border-b border-sky-200/80 dark:border-slate-700/90 border-l-sky-500 dark:border-l-sky-400'
              : 'bg-white dark:bg-[#111A2E] hover:bg-slate-50 dark:hover:bg-[#16213A] text-slate-900 dark:text-slate-100 border-l-slate-300 dark:border-l-slate-700'
          }`}
          aria-expanded={isOpen}
        >
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`text-sm sm:text-base leading-snug tracking-tight ${
                  isOpen
                    ? 'font-extrabold text-sky-950 dark:text-white'
                    : 'font-bold text-slate-900 dark:text-slate-100'
                }`}
              >
                {kelompok.nama_kelompok}
              </span>
              <span
                className={`inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full ${
                  isOpen
                    ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 font-bold shadow-2xs'
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
                ? 'bg-sky-600 text-white border-sky-600 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400 shadow-2xs'
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
            <div className="bg-slate-50/75 dark:bg-[#090F1D] p-3 sm:p-4 md:p-5">
              <div className="md:rounded-xl md:border md:border-slate-200/90 md:dark:border-slate-700/70 md:overflow-hidden md:bg-white md:dark:bg-[#111A2E]">
                {/* Desktop Column Header (md+ only) */}
                <div className="hidden md:grid md:grid-cols-[38%_34%_28%] border-b border-slate-200 dark:border-slate-700 bg-slate-100/95 dark:bg-[#17233B] text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-100 font-extrabold divide-x divide-slate-200/70 dark:divide-slate-700/60">
                  <div className="py-3 px-4">{labelKolom?.kolom_1 || 'Sifat / Rumus / Konsep'}</div>
                  <div className="py-3 px-4">{labelKolom?.kolom_2 || 'Contoh Penerapan'}</div>
                  <div className="py-3 px-4">{labelKolom?.kolom_3 || 'Jebakan / Catatan'}</div>
                </div>

                {/* Unified Responsive Rows: Mobile Card -> Desktop 3-Column Row */}
                <div className="space-y-3.5 md:space-y-0 md:divide-y-2 md:divide-slate-200/80 md:dark:divide-slate-800">
                  {butirList.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="rounded-xl md:rounded-none bg-white dark:bg-[#131C32] md:dark:bg-transparent md:odd:bg-white md:even:bg-slate-50/55 md:dark:odd:bg-[#111A2E] md:dark:even:bg-[#141F36] md:hover:bg-sky-50/40 md:dark:hover:bg-[#192744] border border-slate-200/90 dark:border-slate-700/65 md:border-0 p-4 md:p-0 shadow-2xs md:shadow-none grid grid-cols-1 md:grid-cols-[38%_34%_28%] gap-3.5 md:gap-0 md:divide-x md:divide-slate-200/60 md:dark:divide-slate-700/45 transition-colors max-w-full overflow-x-clip"
                    >
                      {/* Kolom 1: Judul Poin + Penjelasan Singkat + Mini-SVG */}
                      <div className="md:py-4 md:px-4 min-w-0 max-w-full space-y-2">
                        <div className="flex items-start gap-2.5 pb-2 md:pb-0 border-b border-slate-200/80 dark:border-slate-700/60 md:border-b-0">
                          <span className="font-mono text-xs md:text-[11px] font-extrabold md:font-bold px-2 md:px-1.5 py-0.5 rounded-md md:rounded bg-sky-600 text-white md:bg-sky-100 md:text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-400/35 md:border md:border-sky-200/80 shrink-0 mt-0.5">
                            {String(bIdx + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-extrabold text-slate-950 dark:text-white text-[15.5px] md:text-[15px] leading-snug">
                            {b.judul_poin}
                          </h4>
                        </div>
                        <div className="pl-3 md:pl-0.5 border-l-2 border-sky-500/70 dark:border-sky-400/70 md:border-l-0 space-y-1">
                          <div className="md:hidden text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                            {labelKolom?.kolom_1 || 'Konsep / Rumus'}
                          </div>
                          <div className="text-slate-800 dark:text-slate-200 leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 text-sm max-w-full">
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
                        <div className="p-3 rounded-lg bg-emerald-50/70 md:bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/35 border-l-[3px] border-l-emerald-500 dark:border-l-emerald-400/80 text-slate-800 md:text-slate-700 dark:text-slate-200 leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 text-sm max-w-full space-y-1.5">
                          <div className="md:hidden text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            {labelKolom?.kolom_2 || 'Contoh Penerapan'}
                          </div>
                          {renderMarkdown(b.contoh_penerapan)}
                        </div>
                      </div>

                      {/* Kolom 3: Jebakan atau Catatan */}
                      <div className="md:py-4 md:px-4 min-w-0 max-w-full">
                        <div className="p-3 md:p-3.5 rounded-lg md:rounded-xl bg-amber-50/85 md:bg-amber-50/90 dark:bg-amber-950/25 md:dark:bg-amber-950/30 border border-amber-300/75 md:border-amber-300/80 dark:border-amber-700/50 md:dark:border-amber-700/55 border-l-[3px] md:border-l text-amber-950 dark:text-amber-100 text-xs sm:text-sm leading-[1.85] [&_p]:mb-3.5 [&_p:last-child]:mb-0 space-y-1.5 max-w-full overflow-x-clip">
                          <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-mono text-[11px] md:text-xs uppercase md:normal-case tracking-wider md:tracking-normal">
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
  ({ data, renderMarkdown, onZoomVisual }) => {
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
      <div className="bg-white dark:bg-[#0E1526] rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-xs overflow-x-clip max-w-full transition-all">
        <div className="p-5 sm:p-6 space-y-2 border-b border-slate-200 dark:border-slate-700/80 bg-gradient-to-r from-sky-50/70 via-white to-white dark:from-sky-950/30 dark:via-[#11192D] dark:to-[#0E1526]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/60 border border-sky-300/80 dark:border-sky-700/80 px-2.5 py-1 rounded-md shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Zona 1B • Detail Materi Lengkap</span>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight">
            {data.judul_blok}
          </h2>
        </div>

        <div className="p-3 sm:p-4 space-y-3.5 bg-slate-100/75 dark:bg-[#080D1A]">
          {data.kelompok.map((kelompok, kIdx) => (
            <KelompokCard
              key={kIdx}
              kelompok={kelompok}
              isOpen={openGroups[kIdx] ?? false}
              onToggle={() => toggleGroup(kIdx)}
              judulBlok={data.judul_blok}
              labelKolom={data.label_kolom}
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
