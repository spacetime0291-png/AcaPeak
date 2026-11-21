import React, { useEffect, useState, useMemo, useId } from 'react';
import DOMPurify from 'dompurify';
import mermaid from 'mermaid';
import { ZoomIn } from 'lucide-react';
import type { VisualData } from '../../types/material';

export interface VisualRendererProps {
  visual?: VisualData | null;
  isMini?: boolean;
  className?: string;
  onZoom?: (visual: VisualData) => void;
  showZoomButton?: boolean;
}

export const VisualRenderer: React.FC<VisualRendererProps> = ({
  visual,
  isMini = false,
  className = '',
  onZoom,
  showZoomButton = true,
}) => {
  const [mermaidSvg, setMermaidSvg] = useState<string>('');
  const uniqueId = useId().replace(/:/g, '_');

  // Handle Mermaid Rendering
  useEffect(() => {
    if (typeof window === 'undefined' || visual?.tipe !== 'mermaid' || !visual.kode) {
      return;
    }

    let isMounted = true;

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#0F172A',
          primaryTextColor: '#E2E8F0',
          primaryBorderColor: '#38BDF8',
          lineColor: '#94A3B8',
        },
        securityLevel: 'loose',
      });

      const renderDiagram = async () => {
        try {
          const renderId = `mermaid_${uniqueId}`;
          const { svg } = await mermaid.render(renderId, visual.kode);
          if (isMounted) {
            setMermaidSvg(svg);
          }
        } catch (err) {
          console.warn('Failed to render mermaid diagram:', err);
          if (isMounted) {
            setMermaidSvg('');
          }
        }
      };

      renderDiagram();
    } catch (err) {
      console.warn('Failed to initialize mermaid:', err);
    }

    return () => {
      isMounted = false;
    };
  }, [visual?.kode, visual?.tipe, uniqueId]);

  // Handle SVG Sanitization and Responsive Class Injection
  const formattedSvg = useMemo(() => {
    if (!visual?.kode || visual.tipe !== 'svg') return '';

    let code = visual.kode;
    if (typeof window !== 'undefined' && DOMPurify && typeof DOMPurify.sanitize === 'function') {
      try {
        code = DOMPurify.sanitize(code, {
          USE_PROFILES: { svg: true },
          ADD_ATTR: ['class', 'viewBox', 'viewbox'],
        });
      } catch {
        // Fallback to raw code if DOMPurify fails
      }
    }

    const svgClass = isMini
      ? 'w-full h-auto max-w-[260px] mx-auto block'
      : 'w-full h-auto max-w-full mx-auto block';

    if (code.includes('<svg')) {
      code = code.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
        if (/class=['"][^'"]*['"]/i.test(attrs)) {
          return `<svg ${attrs.replace(/class=['"][^'"]*['"]/i, `class="${svgClass}"`)}>`;
        }
        return `<svg class="${svgClass}" ${attrs}>`;
      });
    }

    return code;
  }, [visual?.kode, visual?.tipe, isMini]);

  if (!visual || !visual.kode) return null;

  const isSvg = visual.tipe === 'svg';
  const isMermaid = visual.tipe === 'mermaid';

  return (
    <figure
      className={`my-4 w-full relative group transition-all ${
        isMermaid ? 'rounded-xl border border-slate-800 bg-[#0B1120] p-3 sm:p-4' : ''
      } ${className}`}
    >
      {/* Zoom Button if handler provided */}
      {onZoom && showZoomButton && (
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            type="button"
            onClick={() => onZoom(visual)}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer shadow-xs"
            title="Perbesar Visual"
            aria-label="Perbesar Visual"
          >
            <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      )}

      {/* SVG Container */}
      {isSvg && (
        <div
          onClick={onZoom ? () => onZoom(visual) : undefined}
          className={`w-full overflow-hidden rounded-xl flex justify-center items-center ${
            onZoom ? 'cursor-zoom-in' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: formattedSvg }}
        />
      )}

      {/* Mermaid Container */}
      {isMermaid && (
        <div
          onClick={onZoom ? () => onZoom(visual) : undefined}
          className={`w-full overflow-x-auto flex justify-center items-center [&>svg]:w-full [&>svg]:h-auto ${
            isMini ? '[&>svg]:max-w-[260px]' : '[&>svg]:max-w-full'
          } [&>svg]:mx-auto [&>svg]:block ${onZoom ? 'cursor-zoom-in' : ''}`}
          dangerouslySetInnerHTML={{
            __html: mermaidSvg || `<div class="text-xs text-slate-500 py-4">Memuat diagram...</div>`,
          }}
        />
      )}

      {/* Caption */}
      {visual.caption && (
        <figcaption className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center mt-2.5 leading-relaxed px-2">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
};

export default VisualRenderer;
