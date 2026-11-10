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
  ZoomIn,
  X,
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
  const { metadata, content } = material;
  const isDark = theme === 'dark';

  // Focus Mode toggle
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [zoomSvg, setZoomSvg] = useState<SvgVisualization | null>(null);

  // Always ensure reading begins at the top of the document
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [metadata.id]);

  // Render centered SVG container with academic caption (maximized view, zero margin waste, tap-to-zoom)
  const renderSvgContainer = (svgItem: SvgVisualization, index: number) => (
    <figure
      key={svgItem.id}
      id={svgItem.id}
      className="my-6 -mx-4 sm:mx-auto w-[calc(100%+2rem)] sm:w-full max-w-5xl text-center px-0 svg-container"
    >
      <div className="flex items-center justify-between mb-1.5 px-4 sm:px-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-indigo-700 dark:text-cyan-400 truncate pr-2 text-left">
          {svgItem.title}
        </span>
        <button
          type="button"
          onClick={() => setZoomSvg(svgItem)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-md shadow-2xs hover:bg-stone-200 dark:hover:bg-slate-700 transition active:scale-95 cursor-pointer shrink-0"
          title="Perbesar Tampilan (Tap to Zoom)"
        >
          <ZoomIn className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
          <span>Perbesar</span>
        </button>
      </div>

      <div
        className="w-full overflow-x-auto p-0 bg-transparent border-0 rounded-none sm:rounded-xl flex justify-center items-center cursor-zoom-in"
        onClick={() => setZoomSvg(svgItem)}
        title="Klik untuk memperbesar tampilan grafik"
        dangerouslySetInnerHTML={{ __html: svgItem.svg_code }}
      />
      <figcaption className="mt-2 text-xs sm:text-sm font-serif italic text-slate-500 dark:text-slate-400 px-4 sm:px-0">
        Gambar {metadata.chapter_num}.{index + 1}: {svgItem.caption || svgItem.title}
      </figcaption>
    </figure>
  );

  // Markdown component replacements for clean, distraction-free reading typography
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950 dark:text-cyan-300 mt-9 mb-4 border-b-2 border-indigo-100 dark:border-slate-800 pb-2.5">
        {children}
      </h2>
    ),
    h2: ({ children }: any) => (
      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-7 mb-3">
        {children}
      </h3>
    ),
    h3: ({ children }: any) => (
      <h4 className="text-base sm:text-lg font-bold tracking-tight text-indigo-800 dark:text-cyan-400 mt-6 mb-2.5">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.8] text-slate-800 dark:text-slate-200 mb-4 text-left">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-[15px] sm:text-[16px] leading-[1.75] text-slate-800 dark:text-slate-200">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-[15px] sm:text-[16px] leading-[1.75] text-slate-800 dark:text-slate-200">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="leading-relaxed pl-1">{children}</li>
    ),
    hr: () => (
      <hr className="my-8 border-t border-stone-200 dark:border-slate-800" />
    ),
    blockquote: ({ children }: any) => (
      <div className="border-l-4 border-indigo-600 dark:border-indigo-400 bg-indigo-50/70 dark:bg-slate-800/80 px-5 py-4 my-5 font-sans text-slate-800 dark:text-slate-200 text-[15px] sm:text-[16px] rounded-r-2xl shadow-2xs">
        {children}
      </div>
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
    table: ({ children, ...props }: any) => (
      <div className="w-full overflow-x-auto my-6">
        <table className="w-full text-left border-collapse text-[15px] sm:text-[16px] leading-relaxed" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="border-b-2 border-stone-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody className="divide-y divide-stone-200/90 dark:divide-slate-800/90" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="hover:bg-stone-50/70 dark:hover:bg-slate-800/40 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="py-3 px-3.5 first:pl-0 last:pr-0 text-left font-bold text-slate-900 dark:text-slate-100 text-[15px] sm:text-[16px] align-top" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="py-3.5 px-3.5 first:pl-0 last:pr-0 text-slate-700 dark:text-slate-300 text-[15px] sm:text-[16px] leading-relaxed align-top whitespace-normal" {...props}>
        {children}
      </td>
    ),
  };

  // Helper to split markdown and replace `[[SVG:id]]`, plus sanitize raw <br> tags
  const renderMarkdownWithSvg = (rawText: string) => {
    if (!rawText) return null;
    const cleanText = rawText.replace(/<br\s*\/?>/gi, '\n\n');
    const parts = cleanText.split(/(\[\[SVG:[a-zA-Z0-9_-]+\]\])/g);

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
          rehypePlugins={[rehypeKatex as any]}
          components={markdownComponents}
        >
          {part}
        </ReactMarkdown>
      );
    });
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] pb-12">
      {/* 1. TOP STATIS/STICKY BAR: Tombol kembali ke bab dan judul sub bab materi */}
      <div className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-stone-200/90 dark:border-indigo-500/25 shadow-xs">
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

      {/* 2. PAPER CONTAINER: Nyaman dengan margin proporsional */}
      <div className={isFocusMode ? 'py-3 px-2 sm:py-5 sm:px-4' : 'py-5 sm:py-8 px-3.5 sm:px-6 md:px-8 lg:px-12'}>
        <article className="max-w-4xl mx-auto px-4 py-5 sm:px-8 sm:py-9 md:px-10 md:py-10 shadow-sm rounded-2xl sm:rounded-3xl transition-all duration-300 bg-white dark:bg-[#0c1326] border border-stone-200/90 dark:border-slate-800/90 text-slate-800 dark:text-[#f8fafc] my-2 sm:my-4">
        {/* Academic Header / Metadata */}
        <header className="border-b-2 border-slate-900 dark:border-slate-700 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            <span>
              UTBK-SNBT • {metadata.subtest} • Bab {metadata.chapter_num}
            </span>
            <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 dark:text-slate-400">
              Dokumen Pembelajaran Terstandar
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-tight break-words">
            {metadata.title}
          </h1>

          <div className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span>Bab {metadata.chapter_num}: {metadata.chapter_title}</span>
            {metadata.required_question_variations && metadata.required_question_variations.length > 0 && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-700 dark:text-cyan-400">
                  {metadata.required_question_variations.length} Variasi Soal Terstandar
                </span>
              </>
            )}
          </div>
        </header>

        {/* If material content is empty */}
        {!content.exam_blueprint_markdown && !content.tactical_overview ? (
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
          <div className="academic-content space-y-4">
            {/* Konten Materi Lengkap Berformat 5 Bagian */}
            {renderMarkdownWithSvg(content.exam_blueprint_markdown)}

            {/* Visualizations if any separate from inline SVG */}
            {content.visualizations_svg && content.visualizations_svg.length > 0 && (
              <div className="my-6">
                {content.visualizations_svg.map((svgItem, i) =>
                  renderSvgContainer(svgItem, i)
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. NAVIGASI BAWAH: <- Sub-bab Sebelumnya, Latihan Drilling Topik Ini, Sub-bab Selanjutnya -> */}
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
            <span>Latihan Drilling {metadata.title}</span>
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

      {/* Tap-to-Zoom Fullscreen / Expanded Modal */}
      {zoomSvg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setZoomSvg(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-stone-200 dark:border-slate-800"
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
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-auto flex items-center justify-center py-2"
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
      </div>
    </div>
  );
};
