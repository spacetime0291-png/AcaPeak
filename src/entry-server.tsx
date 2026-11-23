import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App.tsx';
import type { Material, ThreeZoneMaterial } from './types/material';
import type { RangkumanBabData, RangkumanIndexData } from './types/rangkuman';
import { setSsrInitialMaterial, adaptThreeZoneMaterial } from './lib/contentLoader';

export interface RenderContext {
  initialMaterial?: Material | ThreeZoneMaterial | null;
  initialRangkumanBab?: RangkumanBabData | null;
  initialRangkumanIndex?: RangkumanIndexData | null;
}

export function render(url: string, context?: RenderContext) {
  let mat = context?.initialMaterial;
  if (mat && !('metadata' in mat) && 'kode_subbab' in mat) {
    mat = adaptThreeZoneMaterial(mat as ThreeZoneMaterial);
  }

  if (mat) {
    setSsrInitialMaterial(mat as Material);
  } else {
    setSsrInitialMaterial(null);
  }

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App
          initialMaterial={mat as Material}
          initialRangkumanBab={context?.initialRangkumanBab}
          initialRangkumanIndex={context?.initialRangkumanIndex}
        />
      </StaticRouter>
    </StrictMode>
  );

  return { html };
}
