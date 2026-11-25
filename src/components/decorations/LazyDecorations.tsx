import React, { Suspense, lazy, useEffect, useState } from 'react';

const LazyCosmicStarsBg = lazy(() =>
  import('./CosmicDecorations').then((m) => ({ default: m.CosmicStarsBg }))
);
const LazyCosmicNebulaGlow = lazy(() =>
  import('./CosmicDecorations').then((m) => ({ default: m.CosmicNebulaGlow }))
);
const LazyCosmicSubtitleSparkle = lazy(() =>
  import('./CosmicDecorations').then((m) => ({ default: m.CosmicSubtitleSparkle }))
);

const LazyNatureHeaderBanner = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.NatureHeaderBanner }))
);
const LazyNatureRainbowArc = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.NatureRainbowArc }))
);
const LazyPottedPlantDecor = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.PottedPlantDecor }))
);
const LazyLeafCornerDecor = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.LeafCornerDecor }))
);
const LazyDottedCornerDecor = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.DottedCornerDecor }))
);
const LazyNatureDecorationsBg = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.NatureDecorationsBg }))
);
const LazyNatureFocusHeaderAccent = lazy(() =>
  import('./NatureDecorations').then((m) => ({ default: m.NatureFocusHeaderAccent }))
);

/**
 * Defers decorative SVGs until after client hydration completes,
 * keeping SSR HTML clean and ensuring zero hydration main-thread contention.
 */
function useAfterHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export const CosmicStarsBg: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyCosmicStarsBg />
    </Suspense>
  );
};

export const CosmicNebulaGlow: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyCosmicNebulaGlow />
    </Suspense>
  );
};

export const CosmicSubtitleSparkle: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyCosmicSubtitleSparkle />
    </Suspense>
  );
};

export const NatureHeaderBanner: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyNatureHeaderBanner />
    </Suspense>
  );
};

export const NatureRainbowArc: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyNatureRainbowArc />
    </Suspense>
  );
};

export const PottedPlantDecor: React.FC<{ position?: 'bottom-left' | 'bottom-right' | 'top-right' }> = (props) => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyPottedPlantDecor {...props} />
    </Suspense>
  );
};

export const LeafCornerDecor: React.FC<{ position?: 'top-left' | 'top-right' }> = (props) => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyLeafCornerDecor {...props} />
    </Suspense>
  );
};

export const DottedCornerDecor: React.FC<{ position?: 'bottom-left' | 'top-right' | 'bottom-right' }> = (props) => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyDottedCornerDecor {...props} />
    </Suspense>
  );
};

export const NatureDecorationsBg: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyNatureDecorationsBg />
    </Suspense>
  );
};

export const NatureFocusHeaderAccent: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyNatureFocusHeaderAccent />
    </Suspense>
  );
};
