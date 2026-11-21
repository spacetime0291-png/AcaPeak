export type SubtestType = 'PU' | 'PPU' | 'PBM' | 'PK' | 'LBI' | 'LBE' | 'PM';

// -------------------------------------------------------------
// STANDAR BLUEPRINT 3 ZONA TERSTRUKTUR (UTBK-SNBT)
// -------------------------------------------------------------

export interface ExamHook {
  pertanyaan_pemantik: string;
  opsi_cepat: string[];
  jawaban_benar_index: number;
  penjelasan_kilat: string;
}

export interface VisualData {
  tipe: 'svg' | 'mermaid' | string;
  kode: string;
  caption?: string;
  engine?: string;
}

export interface ButirDetailMateri {
  judul_poin: string;
  penjelasan_singkat: string;
  contoh_penerapan: string;
  jebakan_atau_catatan: string;
  visual?: VisualData | null;
}

export interface KelompokDetailMateri {
  nama_kelompok: string;
  ringkasan_kelompok?: string;
  buka_default: boolean;
  butir: ButirDetailMateri[];
}

export interface LabelKolomDetailMateri {
  kolom_1: string;
  kolom_2: string;
  kolom_3: string;
}

export interface DetailMateriLengkap {
  judul_blok: string;
  subjudul_ringkas?: string;
  mode_tampilan?: string;
  label_kolom: LabelKolomDetailMateri;
  kelompok: KelompokDetailMateri[];
}

export interface Zona1PetaTaktis {
  estimasi_menit_baca: number;
  frekuensi_utbk: string;
  exam_hook?: ExamHook | null;
  konsep_inti_markdown: string;
  detail_materi_lengkap?: DetailMateriLengkap | null;
  radar_jebakan_utbk: string[];
  stimulus_utama_bersama?: string | null;
  visual?: VisualData | null;
}

export interface VariasiInti {
  nomor_variasi: number;
  nama_variasi: string;
  kategori_variasi: string;
  stimulus_mini: string;
  bedah_pola_markdown: string;
  kunci_pembeda: string;
  visual?: VisualData | null;
}

export interface SoalUjiPemahaman {
  nomor_soal: number;
  menguji_variasi_ke: number[];
  tipe_soal_utbk: string;
  pertanyaan_markdown: string;
  opsi_jawaban: string[];
  kunci_jawaban: string;
  bedah_cepat_markdown: string;
  visual?: VisualData | null;
}

export interface ThreeZoneMaterial {
  kode_subbab: string;
  subtes: string;
  bab: string;
  judul_subbab: string;
  klasifikasi_materi: 'INTI' | 'PENGAYAAN' | string;
  indikator_klasifikasi_web?: string;
  zona_1_peta_taktis: Zona1PetaTaktis;
  zona_2_variasi_inti: VariasiInti[];
  zona_3_uji_pemahaman: SoalUjiPemahaman[];
}

// -------------------------------------------------------------
// LEGACY / ADAPTER INTERFACES
// -------------------------------------------------------------

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

export type QuestionType =
  | 'standard_mc'
  | 'statements_1234'
  | 'data_sufficiency'
  | 'mc_complex_table'
  | 'mc_complex_checkbox'
  | 'short_answer'
  | 'reading_comprehension'
  | 'table_evaluation'
  | string;

export interface ComplexStatementItem {
  id: string;
  statement_markdown: string;
  is_true: boolean;
}

export interface WorkedExample {
  example_id: string;
  variation_name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: QuestionType;
  context_markdown?: string | null;
  svg_illustration?: SvgIllustration | null;
  question_markdown: string;
  statements?: string[] | null;
  complex_table?: ComplexTable | null;
  options?: QuestionOption[];
  correct_answer?: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  // Format baru UTBK-SNBT BPPP: PGK & Isian Singkat
  complex_statements?: ComplexStatementItem[];
  table_headers?: [string, string];
  short_answer_key?: string | number;
  passage_group_id?: string;
  hint_markdown?: string;
  conceptual_solution_markdown: string;
  quick_trick_markdown?: string;
  why_others_are_wrong_markdown?: string;
}

export interface Material extends Partial<ThreeZoneMaterial> {
  metadata: MaterialMetadata;
  content: MaterialContent;
  worked_examples: WorkedExample[];
}

export type SubtestCategory = 'TPS' | 'Literasi';
export type ModulePriority = 'High-Yield' | 'Core' | 'Standard';

export interface SubtopicItem {
  id: string;
  title: string;
  isCompleted?: boolean;
  classification?: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  priority: ModulePriority;
  estimatedMinutes: number;
  subtopics: SubtopicItem[];
}

export interface SubtestItem {
  id: string;
  code: SubtestType;
  title: string;
  category: SubtestCategory;
  modules: ModuleItem[];
  // Backwards compatibility properties
  name?: string;
  description?: string;
  chapters?: SyllabusChapterItem[];
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

export type SyllabusSubtestItem = SubtestItem;
