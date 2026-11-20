import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Check if root already contains pre-rendered static HTML
  const hasPreRenderedContent =
    rootElement.hasChildNodes() && rootElement.innerHTML.trim().length > 0;

  if (hasPreRenderedContent) {
    hydrateRoot(
      rootElement,
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  } else {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  }
}
