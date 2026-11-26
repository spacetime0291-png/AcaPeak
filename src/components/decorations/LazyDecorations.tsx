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

const LazyVelvetHeaderBanner = lazy(() =>
  import('./VelvetDecorations').then((m) => ({ default: m.VelvetHeaderBanner }))
);
const LazyVelvetFocusHeaderAccent = lazy(() =>
  import('./VelvetDecorations').then((m) => ({ default: m.VelvetFocusHeaderAccent }))
);
const LazyVelvetDecorationsBg = lazy(() =>
  import('./VelvetDecorations').then((m) => ({ default: m.VelvetDecorationsBg }))
);
const LazyVelvetCardCornerDecor = lazy(() =>
  import('./VelvetDecorations').then((m) => ({ default: m.VelvetCardCornerDecor }))
);

const LazyPrismHeaderBanner = lazy(() =>
  import('./PrismDecorations').then((m) => ({ default: m.PrismHeaderBanner }))
);
const LazyPrismFocusHeaderAccent = lazy(() =>
  import('./PrismDecorations').then((m) => ({ default: m.PrismFocusHeaderAccent }))
);
const LazyPrismDecorationsBg = lazy(() =>
  import('./PrismDecorations').then((m) => ({ default: m.PrismDecorationsBg }))
);
const LazyPrismCardCornerDecor = lazy(() =>
  import('./PrismDecorations').then((m) => ({ default: m.PrismCardCornerDecor }))
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

export const VelvetHeaderBanner: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyVelvetHeaderBanner />
    </Suspense>
  );
};

export const VelvetFocusHeaderAccent: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyVelvetFocusHeaderAccent />
    </Suspense>
  );
};

export const VelvetDecorationsBg: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyVelvetDecorationsBg />
    </Suspense>
  );
};

export const VelvetCardCornerDecor: React.FC<{ variant?: 'leaf-dots' | 'leaf-lotus' | 'dots-lotus' }> = (props) => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyVelvetCardCornerDecor {...props} />
    </Suspense>
  );
};

export const PrismHeaderBanner: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyPrismHeaderBanner />
    </Suspense>
  );
};

export const PrismFocusHeaderAccent: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyPrismFocusHeaderAccent />
    </Suspense>
  );
};

export const PrismDecorationsBg: React.FC = () => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyPrismDecorationsBg />
    </Suspense>
  );
};

export const PrismCardCornerDecor: React.FC<{ variant?: 'dots-bl' | 'dots-tr' }> = (props) => {
  if (!useAfterHydration()) return null;
  return (
    <Suspense fallback={null}>
      <LazyPrismCardCornerDecor {...props} />
    </Suspense>
  );
};
