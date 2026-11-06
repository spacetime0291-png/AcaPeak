export type SubtestType = 'PU' | 'PPU' | 'PBM' | 'PK' | 'LBI' | 'LBE' | 'PM';

export interface MaterialMetadata {
  id: string;
  subtest: SubtestType;
  chapter_num: number;
  chapter_title: string;
  subchapter_num: string;
  subchapter_title: string;
  title: string;
  required_question_variations: string[];
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
  tactical_overview?: string;
  exam_blueprint_markdown: string;
  visualizations_svg: SvgVisualization[];
  distractor_traps: string[];
  quick_execution_algorithm?: string[];
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  text_markdown: string;
}

export interface SvgIllustration {
  id: string;
  svg_code: string;
}

export interface ComplexTableRow {
  statement: string;
  correct_choice: string;
}

export interface ComplexTable {
  headers: string[];
  rows: ComplexTableRow[];
}

export interface WorkedExample {
  example_id: string;
  variation_name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: 'standard_mc' | 'statements_1234' | 'data_sufficiency' | 'reading_comprehension' | 'table_evaluation' | string;
  context_markdown?: string | null;
  svg_illustration?: SvgIllustration | null;
  question_markdown: string;
  statements?: string[] | null;
  complex_table?: ComplexTable | null;
  options: QuestionOption[];
  correct_answer: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  conceptual_solution_markdown: string;
  quick_trick_markdown: string;
  why_others_are_wrong_markdown: string;
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
  variations_count?: number;
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
