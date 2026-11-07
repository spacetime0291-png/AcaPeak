import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Material, SvgVisualization } from '../../types/material';
import { ThemeToggle } from '../common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../decorations/NatureDecorations';

interface PdfMaterialReaderProps {
  material: Material;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onBackToSubtest: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic: (subchapterId: string) => void;
}

export const PdfMaterialReader: React.FC<PdfMaterialReaderProps> = ({
  material,
  theme = 'light',
  onToggleTheme = () => {},
  onBackToSubtest,
  onPrevSubchapter,
  onNextSubchapter,
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic,
}) => {
  const { metadata, content, worked_examples } = material;
  const isDark = theme === 'dark';

  // Focus Mode toggle
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  // Answers state in worked examples: { [exampleId]: selectedKey }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Collapsible solution accordion state: Set of open exampleIds
  const [openSolutions, setOpenSolutions] = useState<Set<string>>(new Set());

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
        className="w-full overflow-x-auto p-4 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl shadow-2xs flex justify-center"
        dangerouslySetInnerHTML={{ __html: svgItem.svg_code }}
      />
      <figcaption className="mt-2 text-xs font-serif italic text-slate-500 dark:text-slate-400">
        Gambar {metadata.chapter_num}.{index + 1}: {svgItem.title || svgItem.caption}
      </figcaption>
    </figure>
  );

  // Markdown component replacements for clean PDF LaTeX print-book typography
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-[#f8fafc] mt-7 mb-3.5 border-b border-stone-200 dark:border-slate-800 pb-2.5">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-[#f8fafc] mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-indigo-700 dark:text-cyan-400 mt-5 mb-2.5">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.8] text-slate-800 dark:text-slate-200 mb-4 text-justify sm:text-left">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-2 text-[15px] sm:text-[16px] leading-[1.75] text-slate-800 dark:text-slate-200">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-2 text-[15px] sm:text-[16px] leading-[1.75] text-slate-800 dark:text-slate-200">
        {children}
      </ol>
    ),
    hr: () => (
      <hr className="my-6 border-t border-stone-200 dark:border-slate-800" />
    ),
    blockquote: ({ children }: any) => (
      <div className="border-l-4 border-indigo-600 dark:border-indigo-400 bg-indigo-50/70 dark:bg-slate-800/80 px-5 py-4 my-5 font-serif text-slate-800 dark:text-slate-200 text-[15px] sm:text-[16px] rounded-r-2xl shadow-2xs">
        {children}
      </div>
    ),
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto my-6 mx-auto w-full border border-stone-200 dark:border-slate-800 rounded-2xl shadow-xs bg-white dark:bg-slate-900">
        <table className="min-w-full divide-y divide-stone-200 dark:divide-slate-800 text-[15px] sm:text-[16px]" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead className="bg-stone-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 font-bold border-b border-stone-200 dark:border-slate-700" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="px-4 py-3.5 text-left text-xs sm:text-sm uppercase tracking-wider font-bold border-b border-stone-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="px-4 py-3.5 border-t border-stone-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 whitespace-normal text-[15px] sm:text-[16px] leading-relaxed" {...props}>
        {children}
      </td>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-stone-100 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono font-medium" {...props}>
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
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] animate-page-enter transition-all duration-300 pb-12">
      {/* 1. TOP STATIS/STICKY BAR: Tombol kembali ke bab dan judul sub bab materi dibuat statis di atas */}
      <div className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-indigo-500/25 shadow-xs transition-all duration-300">
        {!isDark && <NatureFocusHeaderAccent />}

        <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
          {/* Tombol kembali ke bab */}
          <button
            type="button"
            onClick={onBackToSubtest}
            className="relative z-10 flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Daftar Bab {metadata.subtest}</span>
            <span className="sm:hidden">Bab</span>
          </button>

          {/* Judul sub bab materi di atas */}
          <div className="relative z-10 min-w-0 flex-1 text-center px-1">
            <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 truncate sm:line-clamp-2 leading-tight">
              {metadata.title}
            </p>
          </div>

          {/* Actions: Mode Fokus & Theme Toggle */}
          <div className="relative z-10 flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/70 hover:bg-indigo-100 dark:hover:bg-cyan-900/60 transition cursor-pointer border border-indigo-100 dark:border-cyan-800/40"
              title="Beralih Mode Fokus"
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Biasa</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Fokus</span>
                </>
              )}
            </button>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </div>

      {/* 2. PAPER CONTAINER: Compact padding/margin, Maximum Reading Space */}
      <div className={isFocusMode ? 'py-1 px-1 sm:py-2 sm:px-2' : 'py-3 sm:py-5 px-1 sm:px-3'}>
        <article className="max-w-4xl mx-auto px-3.5 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 shadow-sm rounded-xl sm:rounded-2xl transition-all duration-300 bg-white dark:bg-[#0c1326] border border-stone-200/90 dark:border-slate-800/90 text-slate-800 dark:text-[#f8fafc]">
        {/* Academic Header / Metadata */}
        <header className="border-b-2 border-slate-900 dark:border-slate-700 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            <span>
              UTBK-SNBT • {metadata.subtest} • Bab {metadata.chapter_num}
            </span>
            <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 dark:text-slate-400">
              Dokumen Akademis Terverifikasi
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-tight break-words">
            {metadata.title}
          </h1>

          <div className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span>Bab {metadata.chapter_num}: {metadata.chapter_title}</span>
            {worked_examples && worked_examples.length > 0 && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  {worked_examples.length} Variasi Soal
                </span>
              </>
            )}
          </div>
        </header>

        {/* If material content is empty / cleared */}
        {!content.exam_blueprint_markdown && !content.tactical_overview && (!worked_examples || worked_examples.length === 0) ? (
          <div className="py-16 px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Materi Belum Tersedia</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Isi materi untuk sub-bab <span className="font-semibold text-slate-700 dark:text-slate-300">{metadata.title}</span> sedang dalam proses penyusunan.
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
            {/* Callout Box: 📌 KAIDAH & PRINSIP MUTLAK (Per Spec) */}
            {content.tactical_overview && (
              <div
                style={{
                  borderLeft: isDark ? '4px solid #6366f1' : '4px solid #4f46e5',
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#eef2ff',
                  boxShadow: isDark ? '-2px 0 10px rgba(99,102,241,0.25)' : 'none',
                }}
                className="px-4 py-3.5 my-4 sm:px-5 sm:py-4 sm:my-6 font-serif text-[15.5px] sm:text-[16.5px] leading-relaxed text-slate-800 dark:text-slate-100 rounded-r-xl transition-all"
              >
                <span className="font-sans font-bold text-sm sm:text-base uppercase tracking-wider text-indigo-900 dark:text-indigo-300 block mb-2">
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
              <section className="my-8 pt-6 border-t border-stone-200 dark:border-slate-800">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                  Peringatan Jebakan Distractor & Algoritma Eksekusi
                </h2>

                {content.distractor_traps && content.distractor_traps.length > 0 && (
                  <div className="mb-5 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 rounded-2xl p-4 sm:p-5 shadow-2xs">
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2.5">
                      ⚠️ 3 Jebakan Paling Sering Mengecoh Siswa:
                    </h3>
                    <ul className="list-disc list-outside pl-5 space-y-2.5 text-[15.5px] sm:text-[16.5px] text-rose-950 dark:text-rose-100 leading-relaxed">
                      {content.distractor_traps.map((trap, idx) => (
                        <li key={idx}>{trap}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {content.quick_execution_algorithm && content.quick_execution_algorithm.length > 0 && (
                  <div className="bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 rounded-2xl p-4 sm:p-5 shadow-2xs">
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-2.5">
                      ⚡ Algoritma Penyelesaian Kilat:
                    </h3>
                    <ol className="list-decimal list-outside pl-5 space-y-2.5 text-[15.5px] sm:text-[16.5px] text-indigo-950 dark:text-indigo-100 leading-relaxed">
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
              <section className="mt-10 pt-8 border-t-2 border-slate-900 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      Contoh Soal & Bedah Variasi Terstandar
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Uji pemahaman Anda langsung. Pilihan ganda vertikal dengan tombol buka pembahasan.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
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
                        className="p-5 sm:p-7 bg-[#fcfbf9] dark:bg-[#0f172a] rounded-3xl border border-stone-200 dark:border-slate-800 space-y-4 sm:space-y-5 shadow-xs transition-colors"
                      >
                        {/* Question Header & Variation Title */}
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-200 dark:border-slate-800">
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-800 dark:text-cyan-300">
                            {example.variation_name}
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">
                            Soal #{idx + 1}
                          </span>
                        </div>

                        {/* Stimulus Context if available */}
                        {example.context_markdown && (
                          <div className="p-4 sm:p-5 bg-white dark:bg-[#070c18] rounded-2xl border border-stone-200 dark:border-slate-800 text-[15.5px] sm:text-[16.5px] text-slate-700 dark:text-slate-300 leading-relaxed italic shadow-2xs">
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
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={markdownComponents}
                          >
                            {example.question_markdown}
                          </ReactMarkdown>
                        </div>

                        {/* Options Vertical List: A, B, C, D, E */}
                        <div className="space-y-2.5 pt-1">
                          {example.options.map((opt) => {
                            const isChosen = userSelected === opt.key;

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => handleSelectOption(example.example_id, opt.key)}
                                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition flex items-start gap-3.5 cursor-pointer ${
                                  isChosen
                                    ? isDark
                                      ? 'bg-indigo-950/90 border-cyan-400 text-cyan-100 font-medium shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                                      : 'bg-indigo-50/90 border-indigo-500 text-indigo-950 font-medium ring-2 ring-indigo-400/50 shadow-xs'
                                    : isDark
                                    ? 'bg-[#0a1020] hover:bg-[#0f1730] border-slate-800 hover:border-cyan-500/30 text-slate-200'
                                    : 'bg-white hover:bg-stone-100 border-stone-200 text-slate-800 shadow-2xs'
                                }`}
                              >
                                <span
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                                    isChosen
                                      ? isDark
                                        ? 'bg-cyan-500 text-slate-950 font-bold'
                                        : 'bg-indigo-600 text-white'
                                      : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {opt.key}
                                </span>
                                <div className="flex-1 text-[15px] sm:text-[16px] leading-relaxed">
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
                            className="w-full py-3 px-5 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-[#0a1020] hover:bg-stone-50 dark:hover:bg-slate-800 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between transition cursor-pointer shadow-2xs active:scale-[0.99]"
                          >
                            <span className="flex items-center gap-2">
                              <BookOpen className="w-4.5 h-4.5 text-indigo-600 dark:text-cyan-400" />
                              <span>{isOpen ? 'Tutup Pembahasan' : 'Lihat Pembahasan & Trik Cepat'}</span>
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4.5 h-4.5 text-slate-500" />
                            ) : (
                              <ChevronDown className="w-4.5 h-4.5 text-slate-500" />
                            )}
                          </button>

                          {/* Collapsible Solution Content */}
                          {isOpen && (
                            <div className="mt-3.5 p-5 bg-white dark:bg-[#070c18] rounded-2xl border border-stone-200 dark:border-slate-800 space-y-4 text-[15px] sm:text-[16px] shadow-xs animate-in fade-in duration-150">
                              {/* Correct Answer Badge */}
                              <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-stone-100 dark:border-slate-800">
                                <span className="font-bold text-slate-700 dark:text-slate-300">Kunci Jawaban:</span>
                                <span className="px-3 py-1 rounded-lg font-black text-xs sm:text-sm bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60">
                                  Opsi {example.correct_answer}
                                </span>
                                {userSelected && (
                                  <span
                                    className={`text-xs sm:text-sm font-semibold ${
                                      userSelected === example.correct_answer
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-rose-600 dark:text-rose-400'
                                    }`}
                                  >
                                    ({userSelected === example.correct_answer ? 'Pilihan Anda Benar' : 'Pilihan Anda Belum Tepat'})
                                  </span>
                                )}
                              </div>

                              {/* Conceptual Solution */}
                              <div>
                                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1.5 text-base">
                                  Solusi Konseptual:
                                </span>
                                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
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
                                <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/60 text-amber-950 dark:text-amber-200">
                                  <span className="font-bold text-sm uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
                                <div className="pt-1 text-slate-600 dark:text-slate-300">
                                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5 text-base">
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
        <footer className="mt-12 pt-6 border-t-2 border-slate-900 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onPrevSubchapter}
            disabled={!hasPrev}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sub-bab Sebelumnya</span>
          </button>

          {/* Center Button: Latihan Drilling Topik Ini */}
          <button
            type="button"
            onClick={() => onStartDrillingThisTopic(metadata.id)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-600 dark:via-indigo-600 dark:to-cyan-500 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white font-bold shadow-md shadow-blue-500/25 dark:shadow-[0_0_16px_rgba(0,242,254,0.35)] hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Latihan Drilling Topik Ini</span>
          </button>

          <button
            type="button"
            onClick={onNextSubchapter}
            disabled={!hasNext}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <span>Sub-bab Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>
      </div>
    </div>
  );
};
