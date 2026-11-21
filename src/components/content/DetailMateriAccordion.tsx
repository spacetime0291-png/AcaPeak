import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';
import type { DetailMateriLengkap, VisualData } from '../../types/material';
import { VisualRenderer } from './VisualRenderer';

export interface DetailMateriAccordionProps {
  data: DetailMateriLengkap;
  renderMarkdown: (text?: string) => React.ReactNode;
  renderInlineMarkdown: (text?: string) => React.ReactNode;
  onZoomVisual?: (visual: VisualData) => void;
}

export const DetailMateriAccordion: React.FC<DetailMateriAccordionProps> = ({
  data,
  renderMarkdown,
  onZoomVisual,
}) => {
  // State: Tracking which accordion groups are open
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    if (Array.isArray(data.kelompok)) {
      data.kelompok.forEach((kelompok, idx) => {
        initial[idx] = kelompok.buka_default === true;
      });
      // Fallback: if none is open, open first
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

  // Helper to determine badge unit label (e.g. "4 Aturan", "5 Rumus", "4 Butir")
  const getBadgeLabel = (count: number, groupName: string) => {
    const lower = (groupName + ' ' + (data.judul_blok || '')).toLowerCase();
    if (lower.includes('aturan') || lower.includes('kaidah')) return `${count} Aturan`;
    if (lower.includes('rumus')) return `${count} Rumus`;
    if (lower.includes('sifat')) return `${count} Sifat`;
    if (lower.includes('pola')) return `${count} Pola`;
    if (lower.includes('kategori')) return `${count} Kategori`;
    return `${count} Butir`;
  };

  if (!data || !Array.isArray(data.kelompok) || data.kelompok.length === 0) {
    return null;
  }

  const { label_kolom } = data;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-all">
      {/* Header Blok Detail Materi (Zona 1B) */}
      <div className="p-5 sm:p-6 space-y-1.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md">
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>Zona 1B • Detail Materi Lengkap</span>
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] dark:text-white leading-snug">
          {data.judul_blok}
        </h2>
        {data.subjudul_ringkas && (
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {data.subjudul_ringkas}
          </p>
        )}
      </div>

      {/* Accordion List Kelompok */}
      <div className="divide-y divide-slate-200/90 dark:divide-slate-800">
        {data.kelompok.map((kelompok, kIdx) => {
          const isOpen = openGroups[kIdx] ?? false;
          const butirList = kelompok.butir || [];
          const badgeText = getBadgeLabel(butirList.length, kelompok.nama_kelompok);

          return (
            <div key={kIdx} className="transition-all">
              {/* Accordion Header / Trigger Button */}
              <button
                type="button"
                onClick={() => toggleGroup(kIdx)}
                className={`w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                  isOpen
                    ? 'bg-sky-50/40 dark:bg-sky-950/20 text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-900 dark:text-slate-100'
                }`}
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug">
                      {kelompok.nama_kelompok}
                    </span>
                    <span className="inline-flex items-center font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {badgeText}
                    </span>
                  </div>
                  {kelompok.ringkasan_kelompok && (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {kelompok.ringkasan_kelompok}
                    </p>
                  )}
                </div>

                <div className="shrink-0 p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-sky-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 fade-in">
                  {/* =========================================================
                      DESKTOP VIEW: Tabel 3 Kolom Rapi
                      ========================================================= */}
                  <div className="hidden md:block p-5 sm:p-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          <th className="py-3 px-3.5 rounded-tl-lg w-[38%]">
                            {label_kolom?.kolom_1 || 'Sifat / Rumus / Konsep'}
                          </th>
                          <th className="py-3 px-3.5 w-[34%]">
                            {label_kolom?.kolom_2 || 'Contoh Penerapan'}
                          </th>
                          <th className="py-3 px-3.5 rounded-tr-lg w-[28%]">
                            {label_kolom?.kolom_3 || 'Jebakan / Catatan'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 text-sm">
                        {butirList.map((b, bIdx) => (
                          <tr
                            key={bIdx}
                            className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors align-top"
                          >
                            {/* Kolom 1: Judul Poin + Penjelasan Singkat + Mini-SVG */}
                            <td className="py-3.5 px-3.5">
                              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-[15px] leading-snug">
                                {b.judul_poin}
                              </div>
                              <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                {renderMarkdown(b.penjelasan_singkat)}
                              </div>
                              {/* Mini-SVG jika ada */}
                              {b.visual && (
                                <div className="mt-2.5">
                                  <VisualRenderer
                                    visual={b.visual}
                                    isMini={true}
                                    onZoom={onZoomVisual}
                                  />
                                </div>
                              )}
                            </td>

                            {/* Kolom 2: Contoh Penerapan */}
                            <td className="py-3.5 px-3.5">
                              <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                {renderMarkdown(b.contoh_penerapan)}
                              </div>
                            </td>

                            {/* Kolom 3: Jebakan atau Catatan */}
                            <td className="py-3.5 px-3.5">
                              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/60 dark:border-amber-800/40 text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed space-y-1">
                                <div className="font-bold flex items-center gap-1 text-amber-700 dark:text-amber-400 font-mono text-xs">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>Catatan UTBK</span>
                                </div>
                                <div>{renderMarkdown(b.jebakan_atau_catatan)}</div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* =========================================================
                      MOBILE VIEW: Isi Materi Sama Rata Tanpa Margin Tambahan
                      ========================================================= */}
                  <div className="block md:hidden px-4 sm:px-5 py-2 divide-y divide-slate-200/90 dark:divide-slate-800">
                    {butirList.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className="py-4.5 first:pt-2.5 last:pb-3 space-y-3"
                      >
                        {/* Judul Butir */}
                        <div className="flex items-start gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 shrink-0 mt-0.5">
                            {bIdx + 1}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                            {b.judul_poin}
                          </h4>
                        </div>

                        {/* Kolom 1: Penjelasan Singkat */}
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                            {label_kolom?.kolom_1 || 'Konsep / Rumus'}
                          </div>
                          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                            {renderMarkdown(b.penjelasan_singkat)}
                          </div>
                          {/* Mini-SVG jika ada */}
                          {b.visual && (
                            <div className="pt-1">
                              <VisualRenderer
                                visual={b.visual}
                                isMini={true}
                                onZoom={onZoomVisual}
                              />
                            </div>
                          )}
                        </div>

                        {/* Kolom 2: Contoh Penerapan */}
                        <div className="space-y-1 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {label_kolom?.kolom_2 || 'Contoh Penerapan'}
                          </div>
                          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                            {renderMarkdown(b.contoh_penerapan)}
                          </div>
                        </div>

                        {/* Kolom 3: Jebakan atau Catatan */}
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed space-y-1">
                          <div className="font-bold flex items-center gap-1 text-amber-700 dark:text-amber-400 font-mono text-[11px] uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{label_kolom?.kolom_3 || 'Catatan / Jebakan UTBK'}</span>
                          </div>
                          <div>{renderMarkdown(b.jebakan_atau_catatan)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailMateriAccordion;
