import type { SyllabusSubtestItem } from '../types/material';

export const UTBK_SYLLABUS: SyllabusSubtestItem[] = [
  {
    code: 'PK',
    name: 'Pengetahuan Kuantitatif',
    description: 'Konsep dasar matematika, geometri, aljabar, statistika, dan bilangan.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Bilangan & Aljabar Dasar',
        subchapters: [
          { id: 'pk-1.1.1', subchapter_num: '1.1', title: 'Operasi Bilangan & Eksponen', isCompleted: true },
          { id: 'pk-1.2.1', subchapter_num: '1.2', title: 'Persamaan & Pertidaksamaan Linear', isCompleted: true },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Fungsi & Persamaan Kuadrat',
        subchapters: [
          { id: 'pk-2.1.1', subchapter_num: '2.1', title: 'Sifat Akar & Diskriminan', isCompleted: true },
          { id: 'pk-2.2.1', subchapter_num: '2.2', title: 'Grafik Parabola & Nilai Optimum', isCompleted: false },
        ],
      },
      {
        chapter_num: 3,
        chapter_title: 'Geometri dan Trigonometri Dasar',
        subchapters: [
          { id: 'pk-3.1.1', subchapter_num: '3.1', title: 'Sudut, Garis Sejajar, dan Sifat Segitiga', isCompleted: false },
          { id: 'pk-3.2.1', subchapter_num: '3.2', title: 'Lingkaran & Teorema Garis Singgung', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'PM',
    name: 'Penalaran Matematika',
    description: 'Pemodelan matematika kontekstual & penalaran kuantitatif dunia nyata.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Aritmatika Sosial & Finansial',
        subchapters: [
          { id: 'pm-1.1.1', subchapter_num: '1.1', title: 'Bunga Majemuk, Diskon, & Pajak', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'PU',
    name: 'Penalaran Umum',
    description: 'Penalaran induktif, deduktif, dan kuantitatif.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Logika & Silogisme',
        subchapters: [
          { id: 'pu-1.1.1', subchapter_num: '1.1', title: 'Premis Mayor, Minor, & Kesimpulan Logis', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'LBI',
    name: 'Literasi Bahasa Indonesia',
    description: 'Memahami, menganalisis, dan mengevaluasi wacana teks kompleks.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Analisis Wacana Kritis',
        subchapters: [
          { id: 'lbi-1.1.1', subchapter_num: '1.1', title: 'Ide Pokok, Simpulan, & Bias Penulis', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'LBE',
    name: 'Literasi Bahasa Inggris',
    description: 'Reading comprehension, inferencing, and vocabulary in context.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Academic Reading Comprehension',
        subchapters: [
          { id: 'lbe-1.1.1', subchapter_num: '1.1', title: 'Author Purpose & Tone in Expository Texts', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'PPU',
    name: 'Pengetahuan & Pemahaman Umum',
    description: 'Makna kata, sinonim/antonim, dan kepaduan paragraf.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Semantik & Makna Kata',
        subchapters: [
          { id: 'ppu-1.1.1', subchapter_num: '1.1', title: 'Makna Kontekstual & Hubungan Leksikal', isCompleted: false },
        ],
      },
    ],
  },
  {
    code: 'PBM',
    name: 'Pemahaman Bacaan & Menulis',
    description: 'Ejaan bahasa Indonesia (EYD V), tanda baca, dan kalimat efektif.',
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Tata Bahasa & Ejaan Baku',
        subchapters: [
          { id: 'pbm-1.1.1', subchapter_num: '1.1', title: 'Kalimat Efektif & Analisis Kalimat Sumbang', isCompleted: false },
        ],
      },
    ],
  },
];
