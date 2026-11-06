import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Zap,
  AlertTriangle,
  ZoomIn,
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import type { Material, SvgVisualization, WorkedExample } from '../../types/material';
import { AdBanner } from './AdBanner';

interface MaterialRendererProps {
  material: Material;
  onAnswerSubmit?: (exampleId: string, answer: string, isCorrect: boolean) => void;
}

export const MaterialRenderer: React.FC<MaterialRendererProps> = ({
  material,
  onAnswerSubmit,
}) => {
  const { metadata, content, worked_examples } = material;

  // State for user answers in worked examples: { [example_id]: selectedKey }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // State for mobile collapsible context: { [example_id]: boolean }
  const [expandedContexts, setExpandedContexts] = useState<Record<string, boolean>>({});
  // State for Tap-to-Zoom SVG modal: null or SvgVisualization
  const [zoomSvg, setZoomSvg] = useState<SvgVisualization | null>(null);

  const handleSelectOption = (example: WorkedExample, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [example.example_id]: optionKey,
    }));

    if (onAnswerSubmit) {
      const isCorrect = optionKey === example.correct_answer;
      onAnswerSubmit(example.example_id, optionKey, isCorrect);
    }
  };

  const handleResetExample = (exampleId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[exampleId];
      return next;
    });
  };

  const toggleContext = (exampleId: string) => {
    setExpandedContexts((prev) => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  // Helper to render SVG with responsive wrapper and Tap-to-Zoom
  const renderSvgContainer = (svgItem: SvgVisualization) => (
    <div
      key={svgItem.id}
      id={svgItem.id}
      className="w-full max-w-xl mx-auto my-6 p-2 sm:p-4 bg-slate-50/90 border border-slate-200 rounded-xl shadow-xs flex flex-col items-center group relative transition-all hover:border-indigo-300"
    >
      <div className="w-full flex items-center justify-between mb-2 px-1 text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          {svgItem.title}
        </span>
        <button
          type="button"
          onClick={() => setZoomSvg(svgItem)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md shadow-xs hover:bg-slate-100 hover:text-slate-900 transition active:scale-95"
          title="Perbesar Gambar (Tap to Zoom)"
        >
          <ZoomIn className="w-3.5 h-3.5 text-indigo-600" />
          <span>Perbesar</span>
        </button>
      </div>

      <div
        className="w-full overflow-x-auto flex justify-center cursor-zoom-in py-1"
        onClick={() => setZoomSvg(svgItem)}
        dangerouslySetInnerHTML={{ __html: svgItem.svg_code }}
      />

      {svgItem.caption && (
        <p className="mt-2 text-center text-xs sm:text-[13px] text-slate-600 italic px-2">
          {svgItem.caption}
        </p>
      )}
    </div>
  );

  // Markdown component replacements for mobile-friendly tables and styled typography
  const markdownComponents = {
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-2xs">
        <table className="min-w-full divide-y divide-slate-200 text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead className="bg-slate-100/90 text-slate-800 font-semibold" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="px-3.5 py-2.5 text-left text-xs uppercase tracking-wider font-semibold border-b border-slate-200" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="px-3.5 py-2.5 border-t border-slate-100 text-slate-700 whitespace-nowrap sm:whitespace-normal" {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p className="my-2.5 leading-relaxed text-slate-800" {...props}>
        {children}
      </p>
    ),
    h1: ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => (
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-6 mb-3 scroll-mt-20" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-5 mb-2.5 scroll-mt-20" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-4 mb-2 scroll-mt-20" {...props}>
        {children}
      </h3>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc list-outside pl-5 my-2.5 space-y-1.5 text-slate-800" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal list-outside pl-5 my-2.5 space-y-1.5 text-slate-800" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className="border-l-4 border-indigo-400 pl-4 py-1 my-3 italic text-slate-700 bg-indigo-50/40 rounded-r" {...props}>
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-[0.9em] font-mono" {...props}>
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
    const parts = rawText.split(/(\[\[SVG:[a-zA-Z0-9_-]+\]\])/g);

    return parts.map((part, index) => {
      const svgMatch = part.match(/\[\[SVG:([a-zA-Z0-9_-]+)\]\]/);
      if (svgMatch) {
        const svgId = svgMatch[1];
        const svgItem = content.visualizations_svg.find((v) => v.id === svgId);
        if (svgItem) {
          return renderSvgContainer(svgItem);
        }
        return (
          <div key={`svg-missing-${index}`} className="my-2 p-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded">
            Diagram visualisasi [{svgId}] belum dimuat.
          </div>
        );
      }

      return (
        <ReactMarkdown
          key={`md-${index}`}
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
    <article className="w-full text-slate-900 pb-16">
      {/* Header Metadata Materi */}
      <header className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 tracking-wide uppercase">
            Subtes: {metadata.subtest}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">
            Bab {metadata.chapter_num}: {metadata.chapter_title}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Sub-bab {metadata.subchapter_num}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {metadata.title}
        </h1>

        {/* Micro-Syllabus Covered Pills */}
        {metadata.micro_syllabus_covered && metadata.micro_syllabus_covered.length > 0 && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Target Kompetensi yang Dipelajari:
            </p>
            <ul className="space-y-1">
              {metadata.micro_syllabus_covered.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Top Banner Anti-CLS */}
      <div className="mb-6">
        <AdBanner slotId="banner-top" contextKey={metadata.id} />
      </div>

      {/* Bagian 1: Konsep Inti */}
      <section id="konsep-materi" className="mb-8 scroll-mt-20">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Konsep Inti & Pembahasan Teori
          </h2>
        </div>

        <div className="prose-content">
          {renderMarkdownWithSvg(content.concept_markdown)}
        </div>
      </section>

      {/* Visualizations List (jika ada yang belum disisipkan via placeholder) */}
      {content.visualizations_svg && content.visualizations_svg.length > 0 && (
        <section id="visualisasi-konsep" className="mb-8 scroll-mt-20">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <ZoomIn className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Visualisasi Geometri & Diagram
            </h2>
          </div>
          <div className="space-y-4">
            {content.visualizations_svg.map((svgItem) => renderSvgContainer(svgItem))}
          </div>
        </section>
      )}

      {/* Bagian 2: Ringkasan Rumus & Trik Cepat */}
      {content.formulas_and_quick_tricks && content.formulas_and_quick_tricks.length > 0 && (
        <section id="rumus-cepat" className="mb-8 scroll-mt-20">
          <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-amber-900 font-bold text-base sm:text-lg">
              <Zap className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Ringkasan Rumus & Formula Kilat UTBK</span>
            </div>
            <ul className="space-y-2.5">
              {content.formulas_and_quick_tricks.map((formula, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-amber-950">
                  <span className="font-mono text-amber-600 font-bold shrink-0 mt-0.5">#{idx + 1}</span>
                  <div className="flex-1 overflow-x-auto">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath, remarkGfm]}
                      rehypePlugins={[rehypeKatex]}
                      components={markdownComponents}
                    >
                      {formula}
                    </ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Bagian 3: Jebakan Umum (Common Pitfalls) */}
      {content.common_pitfalls && content.common_pitfalls.length > 0 && (
        <section id="jebakan-umum" className="mb-10 scroll-mt-20">
          <div className="p-4 sm:p-5 bg-rose-50/70 border border-rose-200 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-rose-900 font-bold text-base sm:text-lg">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Jebakan Umum Peserta UTBK (Common Pitfalls)</span>
            </div>
            <ul className="space-y-2">
              {content.common_pitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-rose-950">
                  <span className="text-rose-500 font-bold shrink-0">•</span>
                  <div className="flex-1">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath, remarkGfm]}
                      rehypePlugins={[rehypeKatex]}
                      components={markdownComponents}
                    >
                      {pitfall}
                    </ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Mid-content Banner Anti-CLS */}
      <div className="my-8">
        <AdBanner slotId="banner-mid" contextKey={`${metadata.id}-mid`} />
      </div>

      {/* Bagian 4: Contoh Soal Terbimbing Interaktif */}
      <section id="contoh-soal" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Contoh Soal Terbimbing ({worked_examples.length} Soal)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Uji pemahamanmu secara langsung. Pilih opsi untuk melihat analisis & trik cepat.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {worked_examples.map((example, index) => {
            const selectedKey = selectedAnswers[example.example_id];
            const hasAnswered = !!selectedKey;
            const isCorrect = selectedKey === example.correct_answer;
            const isLongContext = (example.context_markdown?.length || 0) > 400;
            const isContextExpanded = expandedContexts[example.example_id] ?? true;

            const difficultyColors = {
              easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              medium: 'bg-amber-100 text-amber-800 border-amber-200',
              hard: 'bg-rose-100 text-rose-800 border-rose-200',
            };

            return (
              <div
                key={example.example_id}
                id={`contoh-soal-${index + 1}`}
                className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden scroll-mt-20"
              >
                {/* Header Soal */}
                <div className="px-4 py-3 sm:px-6 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      Contoh #{index + 1}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase ${
                        difficultyColors[example.difficulty] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {example.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      ({example.question_type.replace('_', ' ')})
                    </span>
                  </div>

                  {hasAnswered && (
                    <button
                      type="button"
                      onClick={() => handleResetExample(example.example_id)}
                      className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Ulang</span>
                    </button>
                  )}
                </div>

                {/* Body Soal: Split-Pane jika Context Panjang di Desktop */}
                <div className="p-4 sm:p-6">
                  <div
                    className={
                      isLongContext
                        ? 'lg:grid lg:grid-cols-2 lg:gap-6 items-start'
                        : 'space-y-4'
                    }
                  >
                    {/* Kolom 1: Reading Context jika ada */}
                    {example.context_markdown && (
                      <div className="mb-4 lg:mb-0">
                        {/* Mobile Toggle Button untuk Bacaan Panjang */}
                        {isLongContext && (
                          <div className="lg:hidden mb-2">
                            <button
                              type="button"
                              onClick={() => toggleContext(example.example_id)}
                              className="w-full flex items-center justify-between p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900"
                            >
                              <span className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-amber-700" />
                                {isContextExpanded
                                  ? 'Sembunyikan Teks Bacaan Soal'
                                  : 'Tampilkan Teks Bacaan Soal'}
                              </span>
                              {isContextExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Konten Teks Bacaan */}
                        <div
                          className={`p-3.5 sm:p-4 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-slate-800 ${
                            isLongContext
                              ? isContextExpanded
                                ? 'block lg:sticky lg:top-20 lg:max-h-[75vh] lg:overflow-y-auto'
                                : 'hidden lg:block lg:sticky lg:top-20 lg:max-h-[75vh] lg:overflow-y-auto'
                              : 'block'
                          }`}
                        >
                          <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-1.5">
                            📖 Wacana / Teks Konteks:
                          </div>
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={markdownComponents}
                          >
                            {example.context_markdown}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {/* Kolom 2: Pertanyaan & Opsi Jawaban */}
                    <div className="space-y-4">
                      {/* Diagram SVG Soal jika ada */}
                      {example.svg_illustration && (
                        <div className="w-full max-w-md mx-auto my-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
                          <div
                            className="w-full overflow-x-auto flex justify-center cursor-zoom-in"
                            onClick={() =>
                              setZoomSvg({
                                id: example.svg_illustration!.id,
                                title: `Ilustrasi Soal #${index + 1}`,
                                caption: '',
                                svg_code: example.svg_illustration!.svg_code,
                              })
                            }
                            dangerouslySetInnerHTML={{
                              __html: example.svg_illustration.svg_code,
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setZoomSvg({
                                id: example.svg_illustration!.id,
                                title: `Ilustrasi Soal #${index + 1}`,
                                caption: '',
                                svg_code: example.svg_illustration!.svg_code,
                              })
                            }
                            className="mt-1 text-[11px] text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <ZoomIn className="w-3 h-3" />
                            Perbesar Diagram Soal
                          </button>
                        </div>
                      )}

                      {/* Teks Pertanyaan */}
                      <div className="text-sm sm:text-base font-medium text-slate-900">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, remarkGfm]}
                          rehypePlugins={[rehypeKatex]}
                          components={markdownComponents}
                        >
                          {example.question_markdown}
                        </ReactMarkdown>
                      </div>

                      {/* Format Pernyataan (1)(2)(3)(4) jika ada */}
                      {example.statements && example.statements.length > 0 && (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs sm:text-sm">
                          {example.statements.map((stmt, sIdx) => (
                            <div key={sIdx} className="text-slate-800">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {stmt}
                              </ReactMarkdown>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Opsi Pilihan Jawaban A-E (Kartu Penuh Ramah Sentuhan Layar HP) */}
                      <div className="space-y-2.5 pt-2">
                        {example.options.map((opt) => {
                          const isOptionSelected = selectedKey === opt.key;
                          const isThisCorrect = opt.key === example.correct_answer;

                          let cardStyle =
                            'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white text-slate-800';

                          if (hasAnswered) {
                            if (isOptionSelected) {
                              if (isCorrect) {
                                cardStyle =
                                  'border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-400';
                              } else {
                                cardStyle =
                                  'border-rose-500 bg-rose-50/90 text-rose-950 ring-2 ring-rose-400';
                              }
                            } else if (isThisCorrect) {
                              cardStyle =
                                'border-emerald-400 bg-emerald-50/60 text-emerald-900 border-dashed';
                            } else {
                              cardStyle = 'border-slate-200 opacity-60 bg-white';
                            }
                          }

                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => handleSelectOption(example, opt.key)}
                              className={`w-full min-h-[48px] p-3 text-left flex items-start gap-3 rounded-xl border transition-all active:scale-[0.99] select-none ${cardStyle}`}
                            >
                              <span
                                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                                  isOptionSelected
                                    ? isCorrect
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-rose-600 text-white'
                                    : hasAnswered && isThisCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {opt.key}
                              </span>

                              <div className="flex-1 text-xs sm:text-sm self-center">
                                <ReactMarkdown
                                  remarkPlugins={[remarkMath, remarkGfm]}
                                  rehypePlugins={[rehypeKatex]}
                                  components={markdownComponents}
                                >
                                  {opt.text_markdown}
                                </ReactMarkdown>
                              </div>

                              {hasAnswered && (
                                <div className="shrink-0 self-center">
                                  {isOptionSelected && (
                                    isCorrect ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-rose-600" />
                                    )
                                  )}
                                  {!isOptionSelected && isThisCorrect && (
                                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                      Kunci Jawaban
                                    </span>
                                  )}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback Langsung & Pembahasan Detail */}
                      {hasAnswered && (
                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-300">
                          {/* Banner Feedback */}
                          <div
                            className={`p-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                            <div>
                              <p className="font-bold">
                                {isCorrect
                                  ? 'Jawaban Anda Benar! 🎉'
                                  : `Jawaban Kurang Tepat (Kunci: ${example.correct_answer})`}
                              </p>
                              <p className="text-xs font-normal opacity-90">
                                {isCorrect
                                  ? 'Konsep Anda sudah mantap. Pelajari trik cepat di bawah untuk menghemat waktu saat ujian.'
                                  : 'Jangan berkecil hati. Pelajari langkah konseptual dan cara cepatnya di bawah.'}
                              </p>
                            </div>
                          </div>

                          {/* Solusi Konseptual */}
                          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-indigo-900 font-bold text-xs sm:text-sm">
                              <Lightbulb className="w-4 h-4 text-indigo-600" />
                              <span>Langkah Konseptual & Pembahasan Lengkap</span>
                            </div>
                            <div className="text-xs sm:text-sm text-slate-800 space-y-1">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {example.conceptual_solution_markdown}
                              </ReactMarkdown>
                            </div>
                          </div>

                          {/* Strategi Cepat UTBK */}
                          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs sm:text-sm">
                              <Zap className="w-4 h-4 text-amber-600" />
                              <span>Strategi Cepat UTBK (Fast-Track Method)</span>
                            </div>
                            <div className="text-xs sm:text-sm text-amber-950 space-y-1">
                              <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={markdownComponents}
                              >
                                {example.quick_trick_markdown}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tap-to-Zoom Modal Fullscreen (Mobile Friendly) */}
      {zoomSvg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col p-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/20">
            <div>
              <h3 className="font-semibold text-sm sm:text-base">{zoomSvg.title}</h3>
              {zoomSvg.caption && (
                <p className="text-xs text-white/70 max-w-md">{zoomSvg.caption}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setZoomSvg(null)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              aria-label="Tutup Perbesaran"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6"
            onClick={() => setZoomSvg(null)}
          >
            <div
              className="max-w-3xl w-full bg-white p-4 sm:p-6 rounded-2xl shadow-2xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
              dangerouslySetInnerHTML={{ __html: zoomSvg.svg_code }}
            />
          </div>

          <div className="text-center text-xs text-white/60 py-2">
            Sentuh area luar atau tombol silang di atas untuk menutup
          </div>
        </div>
      )}
    </article>
  );
};
