export type SubtestType = 'PU' | 'PPU' | 'PBM' | 'PK' | 'LBI' | 'LBE' | 'PM';

export interface MaterialMetadata {
  id: string;
  subtest: SubtestType;
  chapter_num: number;
  chapter_title: string;
  subchapter_num: string;
  subchapter_title: string;
  title: string;
  micro_syllabus_covered: string[];
  requires_svg: boolean;
  updated_at: string;
}

export interface SvgVisualization {
  id: string;
  title: string;
  caption: string;
  svg_code: string;
}

export interface MaterialContent {
  concept_markdown: string;
  visualizations_svg: SvgVisualization[];
  formulas_and_quick_tricks: string[];
  common_pitfalls: string[];
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  text_markdown: string;
}

export interface SvgIllustration {
  id: string;
  svg_code: string;
}

export interface WorkedExample {
  example_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: 'standard_mc' | 'statements_1234' | 'data_sufficiency' | 'reading_comprehension' | string;
  context_markdown?: string | null;
  svg_illustration?: SvgIllustration | null;
  question_markdown: string;
  statements?: string[] | null;
  complex_table?: Record<string, unknown> | null;
  options: QuestionOption[];
  correct_answer: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  conceptual_solution_markdown: string;
  quick_trick_markdown: string;
}

export interface Material {
  metadata: MaterialMetadata;
  content: MaterialContent;
  worked_examples: WorkedExample[];
}

export interface SyllabusSubchapterItem {
  id: string;
  subchapter_num: string;
  title: string;
  isCompleted?: boolean;
}

export interface SyllabusChapterItem {
  chapter_num: number;
  chapter_title: string;
  subchapters: SyllabusSubchapterItem[];
}

export interface SyllabusSubtestItem {
  code: SubtestType;
  name: string;
  description: string;
  chapters: SyllabusChapterItem[];
}
