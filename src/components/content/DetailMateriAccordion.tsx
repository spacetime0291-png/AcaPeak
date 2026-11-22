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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-sky-500 dark:border-l-sky-400 shadow-xs overflow-hidden max-w-full transition-all">
      {/* Header Blok Detail Materi (Zona 1B) - High Contrast & Distinct */}
      <div className="p-5 sm:p-6 space-y-2 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-50/70 via-white to-white dark:from-sky-950/30 dark:via-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/60 border border-sky-300/80 dark:border-sky-700/80 px-2.5 py-1 rounded-md shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Zona 1B • Detail Materi Lengkap</span>
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight">
          {data.judul_blok}
        </h2>
        {data.subjudul_ringkas && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
              {/* Accordion Header / Trigger Button - High Contrast */}
              <button
                type="button"
                onClick={() => toggleGroup(kIdx)}
                className={`w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                  isOpen
                    ? 'bg-sky-50/90 dark:bg-slate-800/95 text-slate-950 dark:text-white border-b border-sky-200 dark:border-slate-700 shadow-2xs border-l-4 border-l-sky-600 dark:border-l-sky-400'
                    : 'bg-slate-50/80 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-900 dark:text-slate-100 border-l-4 border-l-transparent'
                }`}
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`text-sm sm:text-base leading-snug tracking-tight ${
                        isOpen
                          ? 'font-black text-sky-950 dark:text-white'
                          : 'font-extrabold text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {kelompok.nama_kelompok}
                    </span>
                    <span
                      className={`inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full ${
                        isOpen
                          ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 font-bold shadow-2xs'
                          : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold'
                      }`}
                    >
                      {badgeText}
                    </span>
                  </div>
                  {/* Penjelasan hanya tampil saat tab ditutup, hilang saat tab dibuka */}
                  {!isOpen && kelompok.ringkasan_kelompok && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {kelompok.ringkasan_kelompok}
                    </p>
                  )}
                </div>

                <div
                  className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                    isOpen
                      ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 shadow-2xs'
                      : 'bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-current" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-current" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="bg-white dark:bg-[#070b16] fade-in">
                  {/* =========================================================
                      DESKTOP VIEW: Tabel 3 Kolom Rapi
                      ========================================================= */}
                  <div className="hidden md:block p-5 sm:p-6 overflow-x-auto max-w-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800 text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100 font-extrabold">
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
                            <td className="py-3.5 px-3.5 max-w-xs overflow-x-auto">
                              <div className="font-extrabold text-slate-950 dark:text-white mb-1.5 text-[15px] leading-snug">
                                {b.judul_poin}
                              </div>
                              <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm max-w-full overflow-x-auto">
                                {renderMarkdown(b.penjelasan_singkat)}
                              </div>
                              {/* Mini-SVG jika ada */}
                              {b.visual && (
                                <div className="mt-2.5 max-w-full overflow-x-auto">
                                  <VisualRenderer
                                    visual={b.visual}
                                    isMini={true}
                                    onZoom={onZoomVisual}
                                  />
                                </div>
                              )}
                            </td>

                            {/* Kolom 2: Contoh Penerapan */}
                            <td className="py-3.5 px-3.5 max-w-xs overflow-x-auto">
                              <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm max-w-full overflow-x-auto">
                                {renderMarkdown(b.contoh_penerapan)}
                              </div>
                            </td>

                            {/* Kolom 3: Jebakan atau Catatan */}
                            <td className="py-3.5 px-3.5 max-w-xs overflow-x-auto">
                              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 text-xs sm:text-sm leading-relaxed space-y-1.5 max-w-full overflow-hidden">
                                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-mono text-xs">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>Catatan UTBK</span>
                                </div>
                                <div className="max-w-full overflow-x-auto">{renderMarkdown(b.jebakan_atau_catatan)}</div>
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
                        className="py-4.5 first:pt-2.5 last:pb-3 space-y-3.5 max-w-full overflow-hidden"
                      >
                        {/* Judul Butir - High Contrast */}
                        <div className="flex items-start gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                          <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 shrink-0 mt-0.5 shadow-2xs">
                            {bIdx + 1}
                          </span>
                          <h4 className="font-extrabold text-slate-950 dark:text-white text-base leading-snug">
                            {b.judul_poin}
                          </h4>
                        </div>

                        {/* Kolom 1: Penjelasan Singkat */}
                        <div className="space-y-1.5 max-w-full">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                            {label_kolom?.kolom_1 || 'Konsep / Rumus'}
                          </div>
                          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-w-full overflow-x-auto">
                            {renderMarkdown(b.penjelasan_singkat)}
                          </div>
                          {/* Mini-SVG jika ada */}
                          {b.visual && (
                            <div className="pt-1 max-w-full overflow-x-auto">
                              <VisualRenderer
                                visual={b.visual}
                                isMini={true}
                                onZoom={onZoomVisual}
                              />
                            </div>
                          )}
                        </div>

                        {/* Kolom 2: Contoh Penerapan */}
                        <div className="space-y-1.5 pt-1.5 border-t border-dashed border-slate-200 dark:border-slate-800 max-w-full">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            {label_kolom?.kolom_2 || 'Contoh Penerapan'}
                          </div>
                          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-w-full overflow-x-auto">
                            {renderMarkdown(b.contoh_penerapan)}
                          </div>
                        </div>

                        {/* Kolom 3: Jebakan atau Catatan */}
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 text-xs sm:text-sm leading-relaxed space-y-1.5 max-w-full overflow-hidden">
                          <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-mono text-[11px] uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{label_kolom?.kolom_3 || 'Catatan / Jebakan UTBK'}</span>
                          </div>
                          <div className="max-w-full overflow-x-auto">{renderMarkdown(b.jebakan_atau_catatan)}</div>
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
