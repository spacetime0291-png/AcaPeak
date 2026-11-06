import type { Material, WorkedExample } from '../types/material';
import { UTBK_SYLLABUS } from './syllabusData';

// Direct imports for instant 0-latency loading
import pu11 from '../../public/content/utbk/pu/pu-1.1.json';
import pu12 from '../../public/content/utbk/pu/pu-1.2.json';
import pu13 from '../../public/content/utbk/pu/pu-1.3.json';
import pu21 from '../../public/content/utbk/pu/pu-2.1.json';
import pu22 from '../../public/content/utbk/pu/pu-2.2.json';
import pu23 from '../../public/content/utbk/pu/pu-2.3.json';
import pu31 from '../../public/content/utbk/pu/pu-3.1.json';
import pu32 from '../../public/content/utbk/pu/pu-3.2.json';
import pu33 from '../../public/content/utbk/pu/pu-3.3.json';
import ppu11 from '../../public/content/utbk/ppu/ppu-1.1.json';
import ppu12 from '../../public/content/utbk/ppu/ppu-1.2.json';
import pk31 from '../../public/content/utbk/pk/pk-3.1.json';

export const PRELOADED_MATERIALS: Record<string, Material> = {
  'pu-1.1': pu11 as unknown as Material,
  'pu-1.2': pu12 as unknown as Material,
  'pu-1.3': pu13 as unknown as Material,
  'pu-2.1': pu21 as unknown as Material,
  'pu-2.2': pu22 as unknown as Material,
  'pu-2.3': pu23 as unknown as Material,
  'pu-3.1': pu31 as unknown as Material,
  'pu-3.2': pu32 as unknown as Material,
  'pu-3.3': pu33 as unknown as Material,
  'ppu-1.1': ppu11 as unknown as Material,
  'ppu-1.2': ppu12 as unknown as Material,
  'pk-3.1': pk31 as unknown as Material,
};

// Flatten all UTBK subchapters for metadata lookup
export const ALL_UTBK_SUBCHAPTERS = UTBK_SYLLABUS.flatMap((subtest) =>
  subtest.chapters.flatMap((chapter) =>
    chapter.subchapters.map((sub) => ({
      ...sub,
      subtestCode: subtest.code,
      subtestName: subtest.name,
      chapterNum: chapter.chapter_num,
      chapterTitle: chapter.chapter_title,
    }))
  )
);

export async function fetchMaterialById(id: string): Promise<Material> {
  if (PRELOADED_MATERIALS[id]) {
    return PRELOADED_MATERIALS[id];
  }

  const subtestPrefix = id.split('-')[0].toLowerCase();
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const targetUrl = `${baseUrl}content/utbk/${subtestPrefix}/${id}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      return data as Material;
    }
  } catch (err) {
    console.warn(`Could not fetch dynamic material for ${id}:`, err);
  }

  // Graceful fallback for modules in queue
  const matched = ALL_UTBK_SUBCHAPTERS.find((s) => s.id === id);
  const title = matched ? matched.title : `Sub-bab ${id.toUpperCase()}`;
  const subtestCode = matched ? matched.subtestCode : (id.split('-')[0].toUpperCase() as any);
  const chapterNum = matched ? matched.chapterNum : 1;
  const chapterTitle = matched ? matched.chapterTitle : 'Bab Utama';
  const subchapterNum = matched ? matched.subchapter_num : '1.1';

  return {
    metadata: {
      id,
      subtest: subtestCode,
      chapter_num: chapterNum,
      chapter_title: chapterTitle,
      subchapter_num: subchapterNum,
      subchapter_title: title,
      title,
      required_question_variations: [
        `Penguasaan variasi soal tipe utama ${title}`,
        'Deteksi jebakan opsi pengecoh khas UTBK-SNBT',
        'Algoritma penyelesaian cepat 30-45 detik per soal',
      ],
      requires_svg: false,
      updated_at: new Date().toISOString().split('T')[0],
    },
    content: {
      tactical_overview: `Materi inti dan ringkasan rumus taktis untuk ${title} (${subtestCode}). Pelajari pola karakteristik soal, kaidah logika, dan eliminasi cepat sebelum berlatih variasi soal.`,
      exam_blueprint_markdown: `### 📌 Peta Kaidah & Formula Utama\n\nTopik **${title}** berfokus pada evaluasi ketelitian penalaran dan pemahaman konsep mendasar sesuai standar pengujian nasional UTBK-SNBT.\n\n| Variabel Utama | Kaidah Konsep | Karakteristik Soal UTBK | Strategi Eksekusi Cepat |\n| :--- | :--- | :--- | :--- |\n| **Prinsip Dasar** | Pemahaman konsep inti secara komprehensif | Stimulus kontekstual & penalaran bertingkat | Tandai kata kunci pada stimulus teks atau angka |\n| **Eliminasi Opsi** | Deteksi opsi kontradiktif atau ekstrim | Opsi pengecoh sering melebih-lebihkan fakta | Coret jawaban yang mengandung klaim absolut tanpa data |\n| **Akurasi Waktu** | Target durasi $\\le 60$ detik | Menuntut transisi cepat antar premis | Gunakan trik cepat eliminasi 2-tahap |\n\n> **Kaidah Emas:** Jangan pernah berasumsi di luar premis atau stimulus yang diberikan dalam lembar soal. Verifikasi setiap pernyataan secara langsung pada baris rujukan.`,
      visualizations_svg: [],
      distractor_traps: [
        'Jebakan Opsi Ekstrem: Pernyataan yang mengandung kata mutlak seperti "pasti selalu", "seluruhnya", atau "tidak pernah" saat data hanya bersifat kecenderungan.',
        'Jebakan Konteks Semu: Opsi yang secara ilmiah benar di dunia nyata tetapi sama sekali tidak tertulis atau bertentangan dengan teks soal.',
        'Jebakan Pemutarbalikan Sebab-Akibat: Mengubah arah korelasi variabel A dan B menjadi hubungan kausalitas sepihak.',
      ],
      quick_execution_algorithm: [
        'Langkah 1: Baca pertanyaan utama terlebih dahulu untuk menentukan variabel target.',
        'Langkah 2: Pindai data atau kalimat rujukan dalam wacana tanpa membaca ulang seluruh konteks dari awal.',
        'Langkah 3: Eliminasi 3 opsi yang paling jelas menyimpang, lalu bandingkan 2 opsi tersisa menggunakan kaidah inti.',
      ],
    },
    worked_examples: [
      {
        example_id: `${id}-var1`,
        variation_name: `Archetype Soal 1: Analisis Konsep Inti ${title}`,
        difficulty: 'medium',
        question_type: 'standard_mc',
        context_markdown: `Diberikan premis terstruktur mengenai implementasi topik **${title}** dalam skenario analitis. Data menunjukkan bahwa efisiensi penyelesaian meningkat signifikan ketika aturan penalaran diterapkan secara berurutan.`,
        svg_illustration: null,
        question_markdown: `Berdasarkan kaidah standar pada topik **${title}**, manakah pernyataan berikut yang paling tepat dan konsisten secara logis?`,
        statements: null,
        complex_table: null,
        options: [
          { key: 'A', text_markdown: 'Penerapan prinsip secara berurutan menghasilkan kesimpulan yang sahih dan dapat diuji.' },
          { key: 'B', text_markdown: 'Setiap asumsi tambahan dapat digunakan bebas meskipun tidak tercantum dalam premis.' },
          { key: 'C', text_markdown: 'Korelasional selalu mengindikasikan hubungan sebab-akibat langsung.' },
          { key: 'D', text_markdown: 'Kesimpulan hanya ditentukan oleh opini pengamat di luar data teks.' },
          { key: 'E', text_markdown: 'Ketiadaan informasi sekunder membatalkan seluruh premis awal.' },
        ],
        correct_answer: 'A',
        conceptual_solution_markdown: `Pernyataan pada opsi **A** secara langsung mencerminkan kaidah dasar bahwa penerapan prinsip terstruktur menghasilkan penarikan kesimpulan yang sahih tanpa menambahkan asumsi yang tidak berdasar.`,
        quick_trick_markdown: `Gunakan eliminasi opsi: Opsi B, C, D, dan E melanggar prinsip kehati-hatian penalaran ilmiah objektif.`,
        why_others_are_wrong_markdown: `Opsi B salah karena asumsi bebas tidak diperbolehkan. Opsi C salah karena korelasi bukan kausalitas. Opsi D salah karena simpulan harus berdasarkan premis. Opsi E salah karena premis awal tetap sah.`,
      },
      {
        example_id: `${id}-var2`,
        variation_name: `Archetype Soal 2: Evaluasi Pernyataan & Jebakan Pengecoh`,
        difficulty: 'hard',
        question_type: 'standard_mc',
        context_markdown: null,
        question_markdown: `Pada pengujian tipe soal tingkat lanjut untuk materi **${title}**, langkah paling krusial untuk menghindari jebakan opsi pengecoh adalah...`,
        statements: null,
        complex_table: null,
        options: [
          { key: 'A', text_markdown: 'Mencari opsi terpanjang tanpa memverifikasi data premis.' },
          { key: 'B', text_markdown: 'Memverifikasi setiap klaim terhadap batas lingkup yang diberikan pada soal.' },
          { key: 'C', text_markdown: 'Memilih opsi yang memakai istilah paling asing atau rumit.' },
          { key: 'D', text_markdown: 'Mengabaikan kondisi pembatas pada kalimat pertanyaan.' },
          { key: 'E', text_markdown: 'Menyimpulkan secara umum tanpa memedulikan pengecualian.' },
        ],
        correct_answer: 'B',
        conceptual_solution_markdown: `Verifikasi batas lingkup (scope) adalah benteng utama peserta dalam menghadapi jebakan distractor di UTBK-SNBT.`,
        quick_trick_markdown: `Hindari bias heuristik (seperti memilih opsi terpanjang atau terumit). Selalu rujuk ke premis.`,
        why_others_are_wrong_markdown: `Opsi A, C, D, E semuanya adalah bias dan kesalahan fatal yang sering dimanfaatkan pembuat soal UTBK untuk menjebak siswa.`,
      },
    ],
  };
}

// Collect questions from multiple subchapters for drilling
export async function collectDrillingQuestions(
  subchapterIds: string[],
  requestedCount: number
): Promise<WorkedExample[]> {
  const allCollected: WorkedExample[] = [];

  for (const id of subchapterIds) {
    try {
      const mat = await fetchMaterialById(id);
      if (mat && mat.worked_examples) {
        allCollected.push(...mat.worked_examples);
      }
    } catch (e) {
      console.warn(`Error loading questions for ${id}`, e);
    }
  }

  // If collected count is 0, synthesize from selected subchapters
  if (allCollected.length === 0) {
    for (let i = 0; i < requestedCount; i++) {
      const subId = subchapterIds[i % subchapterIds.length];
      const matched = ALL_UTBK_SUBCHAPTERS.find((s) => s.id === subId);
      const title = matched ? matched.title : `Latihan ${subId.toUpperCase()}`;
      allCollected.push({
        example_id: `drill-${subId}-${i + 1}`,
        variation_name: `Soal #${i + 1}: ${title}`,
        difficulty: i % 2 === 0 ? 'medium' : 'hard',
        question_type: 'standard_mc',
        context_markdown: `Stimulus latihan terpadu untuk topik **${title}**. Perhatikan kaidah penalaran cepat dan eliminasi opsi tidak relevan.`,
        svg_illustration: null,
        question_markdown: `Berdasarkan kajian materi **${title}**, manakah langkah pemecahan yang paling tepat untuk menentukan jawaban yang benar secara efisien?`,
        statements: null,
        complex_table: null,
        options: [
          { key: 'A', text_markdown: 'Identifikasi variabel kunci dan eliminasi opsi yang mengandung klaim absolut tanpa data pendukung.' },
          { key: 'B', text_markdown: 'Menebak secara acak berdasarkan urutan abjad pilihan jawaban.' },
          { key: 'C', text_markdown: 'Mengabaikan syarat batas yang tertera pada stem soal.' },
          { key: 'D', text_markdown: 'Mengasumsikan data di luar teks bernilai benar mutlak.' },
          { key: 'E', text_markdown: 'Menggunakan rumus yang tidak sesuai dengan jenis variabel.' },
        ],
        correct_answer: 'A',
        conceptual_solution_markdown: `Langkah yang paling sahih adalah opsi **A**: memetakan variabel inti dan menyingkirkan distractor ekstrem.`,
        quick_trick_markdown: `Coret opsi berbau klaim mutlak atau spekulatif. Opsi A adalah strategi standar efisiensi UTBK.`,
        why_others_are_wrong_markdown: `Opsi B, C, D, dan E melanggar metodologi penalaran terstruktur.`,
      });
    }
  }

  // Shuffle questions randomly
  const shuffled = [...allCollected].sort(() => 0.5 - Math.random());

  // If we have fewer than requested, cycle to fill requested count
  const result: WorkedExample[] = [];
  let index = 0;
  while (result.length < requestedCount && shuffled.length > 0) {
    const item = shuffled[index % shuffled.length];
    result.push({
      ...item,
      example_id: `${item.example_id}-q${result.length + 1}`,
    });
    index++;
  }

  return result.slice(0, requestedCount);
}
