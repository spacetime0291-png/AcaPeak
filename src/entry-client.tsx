import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App, { resolveRouteComponents } from './App.tsx';
import { hydrateInitialMaterialFromPageData } from './lib/contentLoader';
import { getInitialRangkumanFromPageData } from './lib/rangkumanLoader';

async function bootstrapClient() {
  // 1. Read <script id="__PAGE_DATA__" type="application/json"> synchronously (0ms latency)
  const initialMaterial = hydrateInitialMaterialFromPageData();
  const { babData: initialRangkumanBab, indexData: initialRangkumanIndex } =
    getInitialRangkumanFromPageData();

  // 2. Preload ONLY the lazy route chunk for the current URL before hydrateRoot
  //    so hydration runs synchronously with zero Suspense fallback flash.
  const preloadedComponents = await resolveRouteComponents(window.location.pathname);

  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const normalizedPath = (window.location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
  const isDrillingRoute =
    normalizedPath === '/drilling' || normalizedPath.startsWith('/drilling/');
  const hasPreRenderedContent =
    !isDrillingRoute && rootElement.firstElementChild !== null;

  const appTree = (
    <StrictMode>
      <BrowserRouter>
        <App
          initialMaterial={initialMaterial}
          initialRangkumanBab={initialRangkumanBab}
          initialRangkumanIndex={initialRangkumanIndex}
          preloadedComponents={preloadedComponents}
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

bootstrapClient();
