import React from 'react';
import type { Material } from '../../types/material';
import { ThreeZoneMaterialViewer } from './ThreeZoneMaterialViewer';

export interface MaterialRendererProps {
  material: Material;
  theme?: 'light' | 'dark';
  fontScale?: number;
  onBackToSubtest?: () => void;
  onPrevSubchapter?: () => void;
  onNextSubchapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartDrillingThisTopic?: (subchapterId: string) => void;
  onAnswerSubmit?: (exampleId: string, answer: string, isCorrect: boolean) => void;
}

export const MaterialRenderer: React.FC<MaterialRendererProps> = ({
  material,
  theme = 'light',
  fontScale = 1.0,
  onBackToSubtest = () => {},
  onPrevSubchapter = () => {},
  onNextSubchapter = () => {},
  hasPrev = false,
  hasNext = false,
  onStartDrillingThisTopic = () => {},
}) => {
  return (
    <ThreeZoneMaterialViewer
      material={material}
      theme={theme}
      fontScale={fontScale}
      onBackToSubtest={onBackToSubtest}
      onPrevSubchapter={onPrevSubchapter}
      onNextSubchapter={onNextSubchapter}
      hasPrev={hasPrev}
      hasNext={hasNext}
      onStartDrillingThisTopic={onStartDrillingThisTopic}
    />
  );
};

export default MaterialRenderer;
