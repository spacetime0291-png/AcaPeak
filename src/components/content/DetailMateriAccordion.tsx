import React, { useState } from 'react';
import { ChevronDown, BookOpen, AlertCircle } from 'lucide-react';
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
    <div className="bg-white dark:bg-[#0E1526] rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-xs overflow-hidden max-w-full transition-all">
      {/* Header Blok Detail Materi (Zona 1B) - High Contrast & Distinct */}
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
        {data.subjudul_ringkas && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {data.subjudul_ringkas}
          </p>
        )}
      </div>

      {/* Accordion List Kelompok - Dipisah per kartu independen agar tiap tab kelompok tegas */}
      <div className="p-3 sm:p-4 space-y-3.5 bg-slate-100/75 dark:bg-[#080D1A]">
        {data.kelompok.map((kelompok, kIdx) => {
          const isOpen = openGroups[kIdx] ?? false;
          const butirList = kelompok.butir || [];
          const badgeText = getBadgeLabel(butirList.length, kelompok.nama_kelompok);

          return (
            <div
              key={kIdx}
              className={`rounded-xl border overflow-hidden transition-all ${
                isOpen
                  ? 'border-sky-300/90 dark:border-sky-500/40 bg-white dark:bg-[#0D1425] shadow-xs dark:shadow-none'
                  : 'border-slate-200/90 dark:border-slate-700/75 bg-white dark:bg-[#10182B] hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Accordion Header / Trigger Button - Pemisah Tegas Aktif vs Tertutup */}
              <button
                type="button"
                onClick={() => toggleGroup(kIdx)}
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
                  {/* Penjelasan hanya tampil saat tab ditutup, hilang saat tab dibuka */}
                  {kelompok.ringkasan_kelompok && (
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
                        !isOpen ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {kelompok.ringkasan_kelompok}
                        </p>
                      </div>
                    </div>
                  )}
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

              {/* Accordion Content dengan Animasi Menggeser (Smooth Slide Transition) */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-slate-50/75 dark:bg-[#090F1D]">
                  {/* =========================================================
                      DESKTOP VIEW: Tabel 3 Kolom dengan Pembatas Baris & Kolom Tegas
                      ========================================================= */}
                  <div className="hidden md:block p-4 sm:p-5 overflow-x-auto max-w-full">
                    <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/70 overflow-hidden bg-white dark:bg-[#111A2E]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/95 dark:bg-[#17233B] text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-100 font-extrabold divide-x divide-slate-200/70 dark:divide-slate-700/60">
                            <th className="py-3 px-4 w-[38%]">
                              {label_kolom?.kolom_1 || 'Sifat / Rumus / Konsep'}
                            </th>
                            <th className="py-3 px-4 w-[34%]">
                              {label_kolom?.kolom_2 || 'Contoh Penerapan'}
                            </th>
                            <th className="py-3 px-4 w-[28%]">
                              {label_kolom?.kolom_3 || 'Jebakan / Catatan'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-200/80 dark:divide-slate-800 text-sm">
                          {butirList.map((b, bIdx) => (
                            <tr
                              key={bIdx}
                              className="odd:bg-white even:bg-slate-50/55 dark:odd:bg-[#111A2E] dark:even:bg-[#141F36] hover:bg-sky-50/40 dark:hover:bg-[#192744] transition-colors align-top divide-x divide-slate-200/60 dark:divide-slate-700/45"
                            >
                              {/* Kolom 1: Judul Poin + Penjelasan Singkat + Mini-SVG */}
                              <td className="py-4 px-4 max-w-xs overflow-x-auto">
                                <div className="flex items-start gap-2 mb-2">
                                  <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-200/80 dark:border-sky-400/25 shrink-0 mt-0.5">
                                    {String(bIdx + 1).padStart(2, '0')}
                                  </span>
                                  <div className="font-extrabold text-slate-950 dark:text-white text-[15px] leading-snug">
                                    {b.judul_poin}
                                  </div>
                                </div>
                                <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm max-w-full overflow-x-auto pl-0.5">
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
                              <td className="py-4 px-4 max-w-xs overflow-x-auto">
                                <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/35 border-l-[3px] border-l-emerald-500 dark:border-l-emerald-400/80 text-slate-700 dark:text-slate-200 leading-relaxed text-sm max-w-full overflow-x-auto">
                                  {renderMarkdown(b.contoh_penerapan)}
                                </div>
                              </td>

                              {/* Kolom 3: Jebakan atau Catatan */}
                              <td className="py-4 px-4 max-w-xs overflow-x-auto">
                                <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-700/55 text-amber-950 dark:text-amber-100 text-xs sm:text-sm leading-relaxed space-y-1.5 max-w-full overflow-hidden">
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
                  </div>

                  {/* =========================================================
                      MOBILE VIEW: Kartu Butir Independen dengan Elevasi & Pembatas Jelas
                      ========================================================= */}
                  <div className="block md:hidden p-3 space-y-3.5">
                    {butirList.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className="rounded-xl bg-white dark:bg-[#131C32] border border-slate-200/90 dark:border-slate-700/65 p-4 space-y-3.5 shadow-2xs dark:shadow-none max-w-full overflow-hidden"
                      >
                        {/* Judul Butir - High Contrast dengan Pembatas Bawah */}
                        <div className="flex items-start gap-2.5 border-b border-slate-200/80 dark:border-slate-700/60 pb-2.5">
                          <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-sky-600 text-white dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-400/35 shrink-0 mt-0.5">
                            {String(bIdx + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-extrabold text-slate-950 dark:text-white text-[15.5px] leading-snug">
                            {b.judul_poin}
                          </h4>
                        </div>

                        {/* Kolom 1: Penjelasan Singkat */}
                        <div className="space-y-1.5 pl-3 border-l-2 border-sky-500/70 dark:border-sky-400/70 max-w-full">
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
                        <div className="rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/35 border-l-[3px] border-l-emerald-500 dark:border-l-emerald-400/80 p-3 space-y-1.5 max-w-full">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            {label_kolom?.kolom_2 || 'Contoh Penerapan'}
                          </div>
                          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-w-full overflow-x-auto">
                            {renderMarkdown(b.contoh_penerapan)}
                          </div>
                        </div>

                        {/* Kolom 3: Jebakan atau Catatan */}
                        <div className="p-3 rounded-lg bg-amber-50/85 dark:bg-amber-950/25 border border-amber-300/75 dark:border-amber-700/50 border-l-[3px] border-l-amber-500 text-amber-950 dark:text-amber-100 text-xs sm:text-sm leading-relaxed space-y-1.5 max-w-full overflow-hidden">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailMateriAccordion;
