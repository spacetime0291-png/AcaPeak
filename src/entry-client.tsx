import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App.tsx';
import { hydrateInitialMaterialFromPageData } from './lib/contentLoader';
import { getInitialRangkumanFromPageData } from './lib/rangkumanLoader';

// Read <script id="__PAGE_DATA__" type="application/json"> synchronously (0ms latency)
// before React hydration so active material/rangkuman renders with zero network fetch.
const initialMaterial = hydrateInitialMaterialFromPageData();
const { babData: initialRangkumanBab, indexData: initialRangkumanIndex } =
  getInitialRangkumanFromPageData();

const rootElement = document.getElementById('root');

if (rootElement) {
  const hasPreRenderedContent =
    rootElement.hasChildNodes() && rootElement.innerHTML.trim().length > 0;

  const appTree = (
    <StrictMode>
      <BrowserRouter>
        <App
          initialMaterial={initialMaterial}
          initialRangkumanBab={initialRangkumanBab}
          initialRangkumanIndex={initialRangkumanIndex}
        />
      </BrowserRouter>
    </StrictMode>
  );

  if (hasPreRenderedContent) {
    hydrateRoot(rootElement, appTree);
  } else {
    createRoot(rootElement).render(appTree);
  }
}
