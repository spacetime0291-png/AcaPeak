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
  ZoomIn,
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Target,
  Compass,
  Flame,
  ShieldAlert,
  Check,
} from 'lucide-react';
import type { Material, SvgVisualization, WorkedExample } from '../../types/material';
import { isAnswerCorrect } from '../../lib/drillingRotationEngine';

const KATEX_REHYPE_PLUGINS = [rehypeKatex as any];

interface MaterialRendererProps {
  material: Material;
  onAnswerSubmit?: (exampleId: string, answer: string, isCorrect: boolean) => void;
}

export const MaterialRenderer: React.FC<MaterialRendererProps> = ({
  material,
  onAnswerSubmit,
}) => {
  const { metadata, content, worked_examples } = material;

  // State for user answers in worked examples: { [example_id]: answerValue }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  // Draft answers for inputs before submit: { [example_id]: draftValue }
  const [draftAnswers, setDraftAnswers] = useState<Record<string, any>>({});
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
      const isCorrect = isAnswerCorrect(example, optionKey);
      onAnswerSubmit(example.example_id, optionKey, isCorrect);
    }
  };

  const handleSubmitDraftAnswer = (example: WorkedExample) => {
    const draft = draftAnswers[example.example_id];
    if (draft === undefined || draft === null || draft === '') return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [example.example_id]: draft,
    }));

    if (onAnswerSubmit) {
      const isCorrect = isAnswerCorrect(example, draft);
      onAnswerSubmit(
        example.example_id,
        typeof draft === 'string' ? draft : JSON.stringify(draft),
        isCorrect
      );
    }
  };

  const handleResetExample = (exampleId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[exampleId];
      return next;
    });
    setDraftAnswers((prev) => {
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

  const scrollToVariation = (exampleId: string) => {
    const el = document.getElementById(exampleId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to render SVG with responsive wrapper and Tap-to-Zoom (large view, zero margin waste)
  const renderSvgContainer = (svgItem: SvgVisualization) => (
    <div
      key={svgItem.id}
      id={svgItem.id}
      className="-mx-4 sm:mx-auto w-[calc(100%+2rem)] sm:w-full max-w-5xl my-6 p-0 svg-container bg-transparent border-0 rounded-none sm:rounded-xl flex flex-col items-center group relative transition-all"
    >
      <div className="w-full flex items-center justify-between mb-1.5 px-4 sm:px-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span className="flex items-center gap-1.5 text-indigo-700 dark:text-cyan-400 font-semibold truncate pr-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0"></span>
          {svgItem.title}
        </span>
        <button
          type="button"
          onClick={() => setZoomSvg(svgItem)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-md shadow-xs hover:bg-stone-100 dark:hover:bg-slate-700 transition active:scale-95 cursor-pointer shrink-0"
          title="Perbesar Gambar (Tap to Zoom)"
        >
          <ZoomIn className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
          <span>Perbesar</span>
        </button>
      </div>

      <div
        className="w-full overflow-x-auto flex justify-center cursor-zoom-in p-0"
        onClick={() => setZoomSvg(svgItem)}
        dangerouslySetInnerHTML={{ __html: svgItem.svg_code }}
      />

      {svgItem.caption && (
        <p className="mt-2 text-center text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 italic px-4 sm:px-2 pb-1">
          {svgItem.caption}
        </p>
      )}
    </div>
  );

  // Markdown component replacements for mobile-friendly tables and styled typography
  const markdownComponents = {
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<'table'>) => (
      <div className="w-full overflow-x-auto my-6 max-w-full">
        <table className="w-full min-w-full text-left border-collapse text-[15px] sm:text-[16px] leading-relaxed" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
      <thead className="border-b-2 border-stone-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
      <tbody className="divide-y divide-stone-200/90 dark:divide-slate-800/90" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
      <tr className="hover:bg-stone-50/70 dark:hover:bg-slate-800/40 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
      <th className="py-3 px-3.5 first:pl-0 last:pr-0 text-left font-bold text-slate-900 dark:text-slate-100 text-[15px] sm:text-[16px] align-top" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
      <td className="py-3.5 px-3.5 first:pl-0 last:pr-0 text-slate-700 dark:text-slate-300 text-[15px] sm:text-[16px] leading-relaxed align-top whitespace-normal break-words" {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p className="my-2.5 leading-relaxed text-slate-800 dark:text-slate-200" {...props}>
        {children}
      </p>
    ),
    h1: ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => (
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2.5" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mt-3 mb-1.5" {...props}>
        {children}
      </h3>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc list-outside pl-5 my-2.5 space-y-1.5 text-slate-800 dark:text-slate-200 text-sm" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal list-outside pl-5 my-2.5 space-y-1.5 text-slate-800 dark:text-slate-200 text-sm" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 py-1.5 my-3 italic text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-slate-800/50 rounded-r-lg" {...props}>
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-stone-100 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono" {...props}>
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
        const svgItem = content.visualizations_svg.find((v) => v.id === svgId);
        if (svgItem) {
          return renderSvgContainer(svgItem);
        }
        return (
          <div
            key={index}
            className="my-3 p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 text-xs rounded border border-amber-200 dark:border-amber-800"
          >
            ⚠️ Visualisasi <code>{svgId}</code> sedang dipersiapkan.
          </div>
        );
      }

      return (
        <ReactMarkdown
          key={index}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={KATEX_REHYPE_PLUGINS}
          components={markdownComponents}
        >
          {part}
        </ReactMarkdown>
      );
    });
  };

  return (
    <article className="w-full space-y-8">
      {/* -------------------------------------------------------------
          MODULE HEADER
          ------------------------------------------------------------- */}
      <header className="border-b border-stone-200 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800/60">
            {metadata.subtest}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Bab {metadata.chapter_num}: {metadata.chapter_title}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Sub-bab {metadata.subchapter_num}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
          {metadata.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 font-semibold">
            <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {worked_examples.length} Variasi Soal Terverifikasi
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-cyan-300 border border-indigo-200/80 dark:border-indigo-800/60 font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            20% Taktis • 80% Bedah Soal
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">
            Diperbarui: {metadata.updated_at}
          </span>
        </div>

        {/* Quick Jump: Katalog Variasi Soal */}
        <div className="mt-5 pt-4 border-t border-stone-200/60 dark:border-slate-800/60">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" /> Katalog Loncat Cepat Variasi Soal:
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Klik untuk langsung ke soal</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {worked_examples.map((ex, idx) => (
              <button
                key={ex.example_id}
                type="button"
                onClick={() => scrollToVariation(ex.example_id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-900 dark:hover:text-cyan-300 transition shadow-2xs active:scale-95 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate max-w-[200px] sm:max-w-[280px]">
                  {ex.variation_name.replace(/^Variasi \d+:\s*/, '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          BAGIAN 1 (20%): TACTICAL CHEATSHEET & ALGORITMA EKSEKUSI
          ------------------------------------------------------------- */}
      <section className="bg-white dark:bg-[#0d1428] rounded-2xl border border-stone-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 sm:px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">
                Peta Medan & Strategi Taktis UTBK (20%)
              </h2>
              <p className="text-[11px] text-slate-300">
                Kuasai pola tipe soal dan algoritma eksekusi sebelum masuk ke latihan soal
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950">
            Playbook 30 Detik
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Callout: Karakteristik Medan Ujian */}
          {content.tactical_overview && (
            <div
              style={{
                borderLeft: '4px solid #6366f1',
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
              }}
              className="p-3.5 rounded-xl text-xs sm:text-sm text-slate-850 dark:text-slate-200 leading-relaxed font-medium"
            >
              💡 <strong>Karakteristik Medan Ujian:</strong> {content.tactical_overview}
            </div>
          )}

          {/* Exam Blueprint Table */}
          <div>
            {renderMarkdownWithSvg(content.exam_blueprint_markdown)}
          </div>

          {/* SVG Visualizations if any */}
          {content.visualizations_svg && content.visualizations_svg.length > 0 && (
            <div className="pt-2">
              {content.visualizations_svg.map((svgItem) => renderSvgContainer(svgItem))}
            </div>
          )}

          {/* Distractor Traps & Quick Algorithm Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {/* Distractor Traps Box */}
            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60">
              <div className="flex items-center gap-2 mb-2 text-rose-900 dark:text-rose-300 font-bold text-sm sm:text-base uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Pola Jebakan Opsi Pengecoh Khas UTBK</span>
              </div>
              <ul className="space-y-2 text-[15px] sm:text-[16px] text-rose-950 dark:text-rose-100">
                {content.distractor_traps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-500 font-black shrink-0">✕</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Execution Algorithm */}
            {content.quick_execution_algorithm && content.quick_execution_algorithm.length > 0 && (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm sm:text-base uppercase tracking-wide">
                  <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Algoritma Eksekusi di Meja Ujian</span>
                </div>
                <ol className="space-y-2 text-[15px] sm:text-[16px] text-emerald-950 dark:text-emerald-100">
                  {content.quick_execution_algorithm.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          BAGIAN 2 (80%): KATALOG BEDAH VARIASI SOAL ASLI UTBK
          ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                Katalog Bedah Variasi Soal Asli UTBK (80%)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selesaikan variasi soal untuk menguasai seluruh kemungkinan tipe soal yang diujikan
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-indigo-200/60 dark:border-slate-700">
            {worked_examples.length} Variasi Soal
          </span>
        </div>

        <div className="space-y-8">
          {worked_examples.map((example, index) => {
            const selectedKey = selectedAnswers[example.example_id];
            const hasAnswered = !!selectedKey;
            const isContextLong =
              !!example.context_markdown && example.context_markdown.length > 350;
            const isContextExpanded = !!expandedContexts[example.example_id];

            return (
              <div
                key={example.example_id}
                id={example.example_id}
                className="bg-white dark:bg-[#0d1428] border border-stone-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition hover:border-indigo-300 dark:hover:border-cyan-500/40 scroll-mt-20"
              >
                {/* Example Card Header */}
                <div className="px-4 sm:px-6 py-3.5 bg-stone-50 dark:bg-slate-800/60 border-b border-stone-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                      Variasi {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {example.variation_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold capitalize ${
                        example.difficulty === 'easy'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : example.difficulty === 'medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {example.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded font-medium bg-stone-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {example.question_type}
                    </span>
                  </div>
                </div>

                {/* Question Body */}
                <div className="p-4 sm:p-6 space-y-5">
                  {/* Long context: Desktop Split-Pane / Mobile Collapsible */}
                  {example.context_markdown && (
                    <div>
                      {isContextLong ? (
                        <div>
                          {/* Mobile toggle button */}
                          <div className="lg:hidden mb-3">
                            <button
                              type="button"
                              onClick={() => toggleContext(example.example_id)}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-750 transition cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 font-semibold">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                                {isContextExpanded
                                  ? 'Sembunyikan Teks Bacaan'
                                  : 'Buka Teks Bacaan / Wacana Lengkap'}
                              </span>
                              {isContextExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                          </div>

                          {/* Desktop always visible, mobile collapsible */}
                          <div
                            className={`${
                              isContextExpanded ? 'block' : 'hidden lg:block'
                            } p-4 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 max-h-80 overflow-y-auto mb-4`}
                          >
                            <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                              <span>Stimulus / Teks Wacana Soal:</span>
                            </div>
                            <ReactMarkdown
                              remarkPlugins={[remarkMath, remarkGfm]}
                              rehypePlugins={KATEX_REHYPE_PLUGINS}
                              components={markdownComponents}
                            >
                              {example.context_markdown}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 mb-4">
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={KATEX_REHYPE_PLUGINS}
                            components={markdownComponents}
                          >
                            {example.context_markdown}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SVG Illustration if present */}
                  {example.svg_illustration && (
                    <div className="w-full max-w-md mx-auto my-3 p-2 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg flex justify-center overflow-x-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: example.svg_illustration.svg_code,
                        }}
                      />
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath, remarkGfm]}
                      rehypePlugins={KATEX_REHYPE_PLUGINS}
                      components={markdownComponents}
                    >
                      {example.question_markdown}
                    </ReactMarkdown>
                  </div>

                  {/* Interactive Options / Table / Input per Question Type */}
                  <div className="space-y-3 pt-1">
                    {/* TYPE 1: PGK COMPLEX TABLE */}
                    {example.question_type === 'mc_complex_table' && example.complex_statements && (
                      <div className="space-y-3">
                        <div className="w-full overflow-x-auto rounded-xl border border-stone-200 dark:border-slate-800 shadow-2xs">
                          <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                              <tr className="bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                                <th className="p-3 font-bold">Pernyataan</th>
                                <th className="p-3 text-center w-24 text-indigo-700 dark:text-cyan-400 font-bold">
                                  {(example.table_headers || ['Benar', 'Salah'])[0]}
                                </th>
                                <th className="p-3 text-center w-24 text-rose-700 dark:text-rose-400 font-bold">
                                  {(example.table_headers || ['Benar', 'Salah'])[1]}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80 bg-white dark:bg-[#080d21]">
                              {example.complex_statements.map((stmt) => {
                                const draftMap = (draftAnswers[example.example_id] || selectedAnswers[example.example_id] || {}) as Record<string, string>;
                                const choice = draftMap[stmt.id];
                                const col0 = (example.table_headers || ['Benar', 'Salah'])[0];
                                const col1 = (example.table_headers || ['Benar', 'Salah'])[1];

                                return (
                                  <tr key={stmt.id} className="hover:bg-stone-50/50 dark:hover:bg-slate-850/50">
                                    <td className="p-3 text-slate-800 dark:text-slate-200 leading-relaxed">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkMath, remarkGfm]}
                                        rehypePlugins={KATEX_REHYPE_PLUGINS}
                                        components={markdownComponents}
                                      >
                                        {stmt.statement_markdown}
                                      </ReactMarkdown>
                                    </td>
                                    <td className="p-3 text-center align-middle">
                                      <button
                                        type="button"
                                        disabled={hasAnswered}
                                        onClick={() => {
                                          setDraftAnswers((prev) => ({
                                            ...prev,
                                            [example.example_id]: {
                                              ...(prev[example.example_id] || {}),
                                              [stmt.id]: col0,
                                            },
                                          }));
                                        }}
                                        className={`w-7 h-7 rounded-full border mx-auto flex items-center justify-center transition cursor-pointer ${
                                          choice === col0
                                            ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                                            : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700 hover:border-indigo-400'
                                        }`}
                                      >
                                        {choice === col0 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                      </button>
                                    </td>
                                    <td className="p-3 text-center align-middle">
                                      <button
                                        type="button"
                                        disabled={hasAnswered}
                                        onClick={() => {
                                          setDraftAnswers((prev) => ({
                                            ...prev,
                                            [example.example_id]: {
                                              ...(prev[example.example_id] || {}),
                                              [stmt.id]: col1,
                                            },
                                          }));
                                        }}
                                        className={`w-7 h-7 rounded-full border mx-auto flex items-center justify-center transition cursor-pointer ${
                                          choice === col1
                                            ? 'bg-rose-600 border-rose-600 text-white font-bold'
                                            : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700 hover:border-rose-400'
                                        }`}
                                      >
                                        {choice === col1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {!hasAnswered && (
                          <button
                            type="button"
                            onClick={() => handleSubmitDraftAnswer(example)}
                            disabled={!draftAnswers[example.example_id]}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                          >
                            Periksa Jawaban Tabel
                          </button>
                        )}
                      </div>
                    )}

                    {/* TYPE 2: PGK COMPLEX CHECKBOX */}
                    {example.question_type === 'mc_complex_checkbox' && (
                      <div className="space-y-2.5">
                        {(example.complex_statements && example.complex_statements.length > 0
                          ? example.complex_statements.map((s) => ({
                              id: s.id,
                              text: s.statement_markdown,
                            }))
                          : (example.options || []).map((o) => ({
                              id: o.key,
                              text: o.text_markdown,
                            }))
                        ).map((item) => {
                          const userDraft: string[] = Array.isArray(
                            draftAnswers[example.example_id] || selectedAnswers[example.example_id]
                          )
                            ? draftAnswers[example.example_id] || selectedAnswers[example.example_id]
                            : [];
                          const isChecked = userDraft.includes(item.id);

                          return (
                            <button
                              key={item.id}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => {
                                setDraftAnswers((prev) => {
                                  const cur: string[] = Array.isArray(prev[example.example_id])
                                    ? [...prev[example.example_id]]
                                    : [];
                                  const idx = cur.indexOf(item.id);
                                  if (idx >= 0) cur.splice(idx, 1);
                                  else cur.push(item.id);
                                  return { ...prev, [example.example_id]: cur };
                                });
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                                isChecked
                                  ? 'bg-indigo-50/90 dark:bg-[#0f1d3c] border-indigo-400 dark:border-cyan-400 font-medium'
                                  : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                  isChecked
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'bg-stone-100 dark:bg-slate-800 border-stone-300 dark:border-slate-700'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                                <ReactMarkdown
                                  remarkPlugins={[remarkMath, remarkGfm]}
                                  rehypePlugins={KATEX_REHYPE_PLUGINS}
                                  components={markdownComponents}
                                >
                                  {item.text}
                                </ReactMarkdown>
                              </div>
                            </button>
                          );
                        })}

                        {!hasAnswered && (
                          <button
                            type="button"
                            onClick={() => handleSubmitDraftAnswer(example)}
                            disabled={!draftAnswers[example.example_id] || draftAnswers[example.example_id].length === 0}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                          >
                            Periksa Pilihan
                          </button>
                        )}
                      </div>
                    )}

                    {/* TYPE 3: SHORT ANSWER */}
                    {example.question_type === 'short_answer' && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-cyan-400">
                            Jawaban Isian:
                          </label>
                          <input
                            type="text"
                            disabled={hasAnswered}
                            value={draftAnswers[example.example_id] ?? selectedAnswers[example.example_id] ?? ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDraftAnswers((prev) => ({ ...prev, [example.example_id]: val }));
                            }}
                            placeholder="Ketik jawaban angka atau kata..."
                            className="w-full px-3.5 py-2 text-sm font-bold bg-white dark:bg-[#080d21] border border-stone-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                          />
                        </div>

                        {!hasAnswered && (
                          <button
                            type="button"
                            onClick={() => handleSubmitDraftAnswer(example)}
                            disabled={!draftAnswers[example.example_id] || !draftAnswers[example.example_id].trim()}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                          >
                            Periksa Jawaban Isian
                          </button>
                        )}
                      </div>
                    )}

                    {/* TYPE 4: STANDARD MULTIPLE CHOICE */}
                    {example.question_type !== 'mc_complex_table' &&
                      example.question_type !== 'mc_complex_checkbox' &&
                      example.question_type !== 'short_answer' && (
                        <div className="space-y-2.5">
                          {(example.options || []).map((option) => {
                            const isSelected = selectedKey === option.key;
                            const isCorrect = option.key === example.correct_answer;

                            let btnStyle =
                              'border-stone-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-500/50 hover:bg-stone-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200';

                            if (hasAnswered) {
                              if (isCorrect) {
                                btnStyle =
                                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                              } else if (isSelected && !isCorrect) {
                                btnStyle =
                                  'border-rose-400 bg-rose-50 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 font-semibold ring-1 ring-rose-400';
                              } else {
                                btnStyle =
                                  'border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={option.key}
                                type="button"
                                onClick={() => handleSelectOption(example, option.key)}
                                className={`w-full min-h-[48px] p-3 text-left flex items-start gap-3 rounded-xl border transition shadow-2xs active:scale-[0.99] cursor-pointer ${btnStyle}`}
                              >
                                <span
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                                    hasAnswered && isCorrect
                                      ? 'bg-emerald-600 text-white'
                                      : hasAnswered && isSelected
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  {option.key}
                                </span>
                                <div className="text-xs sm:text-sm pt-0.5 leading-relaxed flex-1">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={KATEX_REHYPE_PLUGINS}
                                    components={markdownComponents}
                                  >
                                    {option.text_markdown}
                                  </ReactMarkdown>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                  </div>

                  {/* Instant Feedback & Solution Panel */}
                  {hasAnswered && (
                    <div className="mt-5 space-y-4 pt-4 border-t border-stone-200 dark:border-slate-800">
                      {/* Answer Feedback Banner */}
                      {(() => {
                        const isCorrect = isAnswerCorrect(example, selectedKey);
                        let correctText = String(example.correct_answer || '-');
                        if (example.question_type === 'short_answer') {
                          correctText = String(example.short_answer_key ?? example.correct_answer ?? '-');
                        } else if (example.question_type === 'mc_complex_table') {
                          correctText = 'Lihat rincian tabel di pembahasan';
                        } else if (example.question_type === 'mc_complex_checkbox') {
                          correctText = 'Lihat opsi bertanda benar di pembahasan';
                        }

                        return (
                          <div
                            className={`p-3.5 rounded-xl flex items-center justify-between ${
                              isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                                : 'bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                  <span>Jawaban Anda TEPAT!</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                  <span>
                                    Jawaban Anda Belum Tepat. Kunci Jawaban: {correctText}
                                  </span>
                                </>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleResetExample(example.example_id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition active:scale-95 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Coba Lagi</span>
                            </button>
                          </div>
                        );
                      })()}

                      {/* Solution Tabs / Blocks */}
                      <div className="space-y-3">
                        {/* 0. Petunjuk / Hint Soal */}
                        {example.hint_markdown && (
                          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-[15px] sm:text-[16px] text-amber-950 dark:text-amber-200 leading-relaxed">
                            <div className="flex items-center gap-2 mb-1.5 font-bold text-amber-900 dark:text-amber-300 text-sm sm:text-base uppercase tracking-wide">
                              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              <span>Petunjuk / Hint Soal:</span>
                            </div>
                            <ReactMarkdown
                              remarkPlugins={[remarkMath, remarkGfm]}
                              rehypePlugins={KATEX_REHYPE_PLUGINS}
                              components={markdownComponents}
                            >
                              {example.hint_markdown}
                            </ReactMarkdown>
                          </div>
                        )}

                        {/* 1. Algoritma Eksekusi Konseptual */}
                        <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-[15px] sm:text-[16px] text-slate-800 dark:text-slate-200 leading-relaxed">
                          <div className="flex items-center gap-2 mb-2 font-bold text-indigo-900 dark:text-cyan-300 text-sm sm:text-base uppercase tracking-wide">
                            <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                            <span>Algoritma Eksekusi Konseptual:</span>
                          </div>
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={KATEX_REHYPE_PLUGINS}
                            components={markdownComponents}
                          >
                            {example.conceptual_solution_markdown}
                          </ReactMarkdown>
                        </div>

                        {/* 2. Trik Kilat 30 Detik UTBK */}
                        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[15px] sm:text-[16px] text-amber-950 dark:text-amber-200 leading-relaxed">
                          <div className="flex items-center gap-2 mb-2 font-bold text-amber-900 dark:text-amber-300 text-sm sm:text-base uppercase tracking-wide">
                            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span>Trik Kilat 30 Detik UTBK:</span>
                          </div>
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={KATEX_REHYPE_PLUGINS}
                            components={markdownComponents}
                          >
                            {example.quick_trick_markdown}
                          </ReactMarkdown>
                        </div>

                        {/* 3. Bedah Opsi Pengecoh */}
                        <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[15px] sm:text-[16px] text-rose-950 dark:text-rose-200 leading-relaxed">
                          <div className="flex items-center gap-2 mb-2 font-bold text-rose-900 dark:text-rose-300 text-sm sm:text-base uppercase tracking-wide">
                            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            <span>Bedah Opsi Pengecoh (Mengapa Opsi Lain Salah?):</span>
                          </div>
                          <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={KATEX_REHYPE_PLUGINS}
                            components={markdownComponents}
                          >
                            {example.why_others_are_wrong_markdown}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tap-to-Zoom Fullscreen Modal for SVG */}
      {zoomSvg && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setZoomSvg(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-stone-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {zoomSvg.title}
              </h3>
              <button
                type="button"
                onClick={() => setZoomSvg(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-auto flex items-center justify-center py-4"
              dangerouslySetInnerHTML={{ __html: zoomSvg.svg_code }}
            />

            {zoomSvg.caption && (
              <p className="pt-3 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-stone-200 dark:border-slate-800">
                {zoomSvg.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
