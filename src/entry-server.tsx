import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './index.css';
import App, { resolveRouteComponents } from './App.tsx';
import type { Material, ThreeZoneMaterial } from './types/material';
import type { RangkumanBabData, RangkumanIndexData } from './types/rangkuman';
import { adaptThreeZoneMaterial } from './lib/contentLoader';

export interface RenderContext {
  initialMaterial?: Material | ThreeZoneMaterial | null;
  initialRangkumanBab?: RangkumanBabData | null;
  initialRangkumanIndex?: RangkumanIndexData | null;
}

/**
 * Pure stateless async SSR renderer:
 * Resolves the single lazy route chunk for `url`, then renders flat synchronous HTML
 * via renderToString (zero <template id="B:0"> or hidden <div hidden id="S:0"> shells).
 */
export async function render(url: string, context?: RenderContext): Promise<{ html: string }> {
  let mat = context?.initialMaterial;
  if (mat && !('metadata' in mat) && 'kode_subbab' in mat) {
    mat = adaptThreeZoneMaterial(mat as ThreeZoneMaterial);
  }

  const preloadedComponents = await resolveRouteComponents(url);

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App
          initialMaterial={(mat as Material) ?? null}
          initialRangkumanBab={context?.initialRangkumanBab ?? null}
          initialRangkumanIndex={context?.initialRangkumanIndex ?? null}
          preloadedComponents={preloadedComponents}
        />
      </StaticRouter>
    </StrictMode>
  );

  return { html };
}
