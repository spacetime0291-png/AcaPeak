import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  Maximize2,
  Minimize2,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Material, SvgVisualization } from '../../types/material';
import { AdBanner } from '../content/AdBanner';

interface PdfMaterialReaderProps {
  material: Material;
  onBackToSubtest: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
}

export const PdfMaterialReader: React.FC<PdfMaterialReaderProps> = ({
  material,
  onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
}) => {
  const { metadata, content, worked_examples } = material;

  // Focus Mode toggle
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  // Answers state in worked examples: { [exampleId]: selectedKey }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Collapsible solution accordion state: Set of open exampleIds
  const [openSolutions, setOpenSolutions] = useState<Set<string>>(new Set());

  const handlePrint = () => {
    window.print();
  };

  const toggleSolution = (exampleId: string) => {
    setOpenSolutions((prev) => {
      const next = new Set(prev);
      if (next.has(exampleId)) {
        next.delete(exampleId);
      } else {
        next.add(exampleId);
      }
      return next;
    });
  };

  const handleSelectOption = (exampleId: string, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [exampleId]: optionKey,
    }));
  };

  // Render centered SVG container with academic caption
  const renderSvgContainer = (svgItem: SvgVisualization, index: number) => (
    <figure
      key={svgItem.id}
      id={svgItem.id}
      className="my-6 mx-auto w-full max-w-xl text-center"
    >
      <div
        className="w-full overflow-x-auto p-4 bg-white border border-slate-200 rounded-lg shadow-2xs flex justify-center"
        dangerouslySetInnerHTML={{ __html: svgItem.svg_code }}
      />
      <figcaption className="mt-2 text-xs font-serif italic text-slate-600">
        Gambar {metadata.chapter_num}.{index + 1}: {svgItem.title || svgItem.caption}
      </figcaption>
    </figure>
  );

  // Markdown component replacements for clean PDF LaTeX print-book typography
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-6 mb-3 border-b border-slate-200 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 mt-6 mb-2.5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base md:text-lg font-semibold tracking-tight text-slate-800 mt-5 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-[15.5px] md:text-[16.5px] leading-[1.8] text-slate-800 text-justify mb-4">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-1.5 text-[15px] md:text-[16px] leading-[1.75] text-slate-800">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-1.5 text-[15px] md:text-[16px] leading-[1.75] text-slate-800">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <div className="border-l-4 border-slate-800 bg-slate-50 px-5 py-4 my-5 font-serif text-slate-800 text-[15px] md:text-[16px] rounded-r-md">
        {children}
      </div>
    ),
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto my-6 mx-auto w-full max-w-2xl border border-slate-200 rounded-md">
        <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="px-4 py-2.5 text-left text-xs uppercase tracking-wider font-bold border-b border-slate-200" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="px-4 py-2.5 border-t border-slate-100 text-slate-800 whitespace-normal text-xs sm:text-sm leading-relaxed" {...props}>
        {children}
      </td>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-slate-100 text-slate-900 px-1 py-0.5 rounded text-[0.9em] font-mono" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  // Helper to split markdown and replace `[[SVG:id]]`
  const renderMarkdownWithSvg = (rawText: string) => {
    if (!rawText) return null;
    const parts = rawText.split(/(\[\[SVG:[a-zA-Z0-9_-]+\]\])/g);

    return parts.map((part, index) => {
      const match = part.match(/^\[\[SVG:([a-zA-Z0-9_-]+)\]\]$/);
      if (match) {
        const svgId = match[1];
        const svgItem = content.visualizations_svg?.find((v) => v.id === svgId);
        if (svgItem) {
          return renderSvgContainer(svgItem, index);
        }
        return null;
      }

      return (
        <ReactMarkdown
          key={index}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={markdownComponents}
        >
          {part}
        </ReactMarkdown>
      );
    });
  };

  return (
    <div className={`min-h-screen bg-slate-100 ${isFocusMode ? 'py-2 px-2' : 'py-4 sm:py-8 px-2 sm:px-4'}`}>
      {/* 1. TOP STICKY BAR: Tipis, tombol kembali ke daftar bab, judul sub-bab, tombol Cetak / Mode Fokus */}
      <div className="sticky top-0 z-30 max-w-3xl mx-auto mb-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-3 sm:px-4 py-2.5 shadow-xs flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToSubtest}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-indigo-600" />
          <span className="hidden sm:inline">Daftar Bab {metadata.subtest}</span>
          <span className="sm:hidden">Bab</span>
        </button>

        {/* Clean Sub-bab title */}
        <div className="min-w-0 flex-1 text-center px-2">
          <p className="text-xs font-bold text-slate-800 break-words line-clamp-2 leading-tight">
            {metadata.title}
          </p>
        </div>

        {/* Actions: Cetak & Mode Fokus */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            title="Cetak Dokumen (Print to PDF)"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Cetak</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
            title="Beralih Mode Fokus"
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Biasa</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Fokus</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. PAPER CONTAINER: Putih bersih, shadow-sm, border tipis, typography setara buku cetak/LaTeX */}
      <article className="bg-white max-w-3xl mx-auto px-6 py-8 md:px-12 md:py-12 shadow-sm border border-slate-200 rounded-none sm:rounded-xl text-slate-800">
        {/* Academic Header / Metadata */}
        <header className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase font-mono tracking-wider text-slate-500 mb-2">
            <span>
              UTBK-SNBT • {metadata.subtest} • Bab {metadata.chapter_num}
            </span>
            <span className="text-[11px] font-normal text-slate-400">
              Dokumen Akademis
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight break-words">
            {metadata.title}
          </h1>

          <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
            <span>Bab {metadata.chapter_num}: {metadata.chapter_title}</span>
            {worked_examples && worked_examples.length > 0 && (
              <>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">
                  {worked_examples.length} Variasi Soal
                </span>
              </>
            )}
          </div>
        </header>

        {/* If material content is empty / cleared */}
        {!content.exam_blueprint_markdown && !content.tactical_overview && (!worked_examples || worked_examples.length === 0) ? (
          <div className="py-16 px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Materi Belum Tersedia</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Isi materi untuk sub-bab <span className="font-semibold text-slate-700">{metadata.title}</span> sedang dalam proses penyusunan.
            </p>
            <button
              type="button"
              onClick={onBackToSubtest}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Subtes</span>
            </button>
          </div>
        ) : (
          <>
            {/* Tactical Overview / Intisari Materi */}
        {content.tactical_overview && (
          <div className="border-l-4 border-slate-800 bg-slate-50 px-5 py-4 my-5 font-serif text-[15px] md:text-[16px] leading-relaxed text-slate-800 rounded-r-md">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700 block mb-1">
              📌 Kaidah & Prinsip Mutlak:
            </span>
            {content.tactical_overview}
          </div>
        )}

        {/* Exam Blueprint & Concepts (LaTeX Typography) */}
        <div className="academic-content">
          {renderMarkdownWithSvg(content.exam_blueprint_markdown)}
        </div>

        {/* Visualizations if separate from inline [[SVG]] */}
        {content.visualizations_svg && content.visualizations_svg.length > 0 && (
          <div className="my-6">
            {content.visualizations_svg.map((svgItem, i) =>
              renderSvgContainer(svgItem, i)
            )}
          </div>
        )}

        {/* Distractor Traps & Execution Algorithm */}
        {((content.distractor_traps && content.distractor_traps.length > 0) ||
          (content.quick_execution_algorithm && content.quick_execution_algorithm.length > 0)) && (
          <section className="my-8 pt-6 border-t border-slate-200">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
              Peringatan Jebakan Distractor & Algoritma Eksekusi
            </h2>

            {content.distractor_traps && content.distractor_traps.length > 0 && (
              <div className="mb-5 bg-rose-50/70 border border-rose-200/80 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2">
                  ⚠️ 3 Jebakan Paling Sering Mengecoh Siswa:
                </h3>
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-rose-950">
                  {content.distractor_traps.map((trap, idx) => (
                    <li key={idx}>{trap}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.quick_execution_algorithm && content.quick_execution_algorithm.length > 0 && (
              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-2">
                  ⚡ Algoritma Penyelesaian Kilat:
                </h3>
                <ol className="list-decimal list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-indigo-950">
                  {content.quick_execution_algorithm.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {/* 3. BAGIAN CONTOH SOAL & BEDAH VARIASI DI BAWAH MATERI */}
        {worked_examples && worked_examples.length > 0 && (
          <section className="mt-10 pt-8 border-t-2 border-slate-900">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  Contoh Soal & Bedah Variasi Terstandar
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Uji pemahaman Anda langsung. Pilihan ganda vertikal dengan tombol buka pembahasan.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                {worked_examples.length} Soal
              </span>
            </div>

            <div className="space-y-8">
              {worked_examples.map((example, idx) => {
                const userSelected = selectedAnswers[example.example_id];
                const isOpen = openSolutions.has(example.example_id);

                return (
                  <div
                    key={example.example_id}
                    id={example.example_id}
                    className="p-5 sm:p-6 bg-slate-50/70 rounded-xl border border-slate-200 space-y-4"
                  >
                    {/* Question Header & Variation Title */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                        {example.variation_name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Soal #{idx + 1}
                      </span>
                    </div>

                    {/* Stimulus Context if available */}
                    {example.context_markdown && (
                      <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeKatex]}
                          components={markdownComponents}
                        >
                          {example.context_markdown}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Question Markdown */}
                    <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                        components={markdownComponents}
                      >
                        {example.question_markdown}
                      </ReactMarkdown>
                    </div>

                    {/* Options Vertical List: A, B, C, D, E */}
                    <div className="space-y-2 pt-1">
                      {example.options.map((opt) => {
                        const isChosen = userSelected === opt.key;

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectOption(example.example_id, opt.key)}
                            className={`w-full text-left p-3 rounded-lg border transition flex items-start gap-3 cursor-pointer ${
                              isChosen
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-medium ring-1 ring-indigo-400'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                isChosen
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {opt.text_markdown}
                              </ReactMarkdown>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Fold Button: "Lihat Pembahasan & Trik Cepat" */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleSolution(example.example_id)}
                        className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-between transition cursor-pointer shadow-2xs"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          <span>{isOpen ? 'Tutup Pembahasan' : 'Lihat Pembahasan & Trik Cepat'}</span>
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {/* Collapsible Solution Content */}
                      {isOpen && (
                        <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 space-y-3.5 text-xs sm:text-sm animate-in fade-in duration-150">
                          {/* Correct Answer Badge */}
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="font-bold text-slate-700">Kunci Jawaban:</span>
                            <span className="px-2.5 py-0.5 rounded-md font-bold text-xs bg-emerald-100 text-emerald-800">
                              Opsi {example.correct_answer}
                            </span>
                            {userSelected && (
                              <span
                                className={`text-[11px] font-semibold ${
                                  userSelected === example.correct_answer
                                    ? 'text-emerald-600'
                                    : 'text-rose-600'
                                }`}
                              >
                                ({userSelected === example.correct_answer ? 'Pilihan Anda Benar' : 'Pilihan Anda Belum Tepat'})
                              </span>
                            )}
                          </div>

                          {/* Conceptual Solution */}
                          <div>
                            <span className="font-bold text-slate-900 block mb-1">
                              Solusi Konseptual:
                            </span>
                            <div className="text-slate-700 leading-relaxed">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {example.conceptual_solution_markdown}
                              </ReactMarkdown>
                            </div>
                          </div>

                          {/* Quick Trick */}
                          {example.quick_trick_markdown && (
                            <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 text-amber-950">
                              <span className="font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1">
                                <Zap className="w-3.5 h-3.5 text-amber-600" />
                                <span>Trik Cepat / Eliminasi Kilat:</span>
                              </span>
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {example.quick_trick_markdown}
                              </ReactMarkdown>
                            </div>
                          )}

                          {/* Why others are wrong */}
                          {example.why_others_are_wrong_markdown && (
                            <div className="pt-1 text-slate-600">
                              <span className="font-bold text-slate-800 block mb-1">
                                Mengapa Pilihan Lain Salah?
                              </span>
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {example.why_others_are_wrong_markdown}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
          </>
        )}

        {/* 4. NAVIGASI BAWAH DOKUMEN: <- Sub-bab Sebelumnya, Latihan Drilling Topik Ini, Sub-bab Selanjutnya -> */}
        <footer className="mt-12 pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onPrevSubchapter}
            disabled={!hasPrev}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sub-bab Sebelumnya</span>
          </button>

          {/* Center Button: Latihan Drilling Topik Ini */}
          <button
            type="button"
            onClick={() => onStartDrillingThisTopic(metadata.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Latihan Drilling Topik Ini</span>
          </button>

          <button
            type="button"
            onClick={onNextSubchapter}
            disabled={!hasNext}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Sub-bab Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>

      {/* Ad slot at the bottom of the academic paper */}
      <div className="max-w-3xl mx-auto mt-6">
        <AdBanner
          slotId={`reader-bottom-${metadata.id}`}
          routeKey={`reader-bottom-${metadata.id}`}
        />
      </div>
    </div>
  );
};
