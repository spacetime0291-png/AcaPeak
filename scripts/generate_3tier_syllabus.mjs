import fs from 'fs';
import path from 'path';

export const SYLLABUS_DATA = [
  {
    id: 'pu',
    code: 'PU',
    title: 'Penalaran Umum',
    category: 'TPS',
    description: 'Penalaran induktif, deduktif, analitis, dan kuantitatif.',
    modules: [
      {
        id: 'pu-mod-1',
        title: 'Penalaran Induktif & Evaluasi Argumen',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pu-1-1', title: 'Kesesuaian Pernyataan & Fakta Eksplisit/Implisit', isCompleted: false },
          { id: 'pu-1-2', title: 'Hubungan Sebab-Akibat (Kausalitas) & Kualitas Simpulan', isCompleted: false },
          { id: 'pu-1-3', title: 'Memperkuat & Memperlemah Argumen/Hipotesis', isCompleted: false },
        ],
      },
      {
        id: 'pu-mod-2',
        title: 'Penalaran Deduktif (Logika Formal)',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pu-2-1', title: 'Logika Proposisi: Implikasi, Kontraposisi & Ekuivalensi', isCompleted: false },
          { id: 'pu-2-2', title: 'Penarikan Kesimpulan: Modus Ponens, Tollens & Silogisme', isCompleted: false },
          { id: 'pu-2-3', title: 'Logika Kuantor (Semua/Sebagian), Ingkaran & Diagram Himpunan', isCompleted: false },
        ],
      },
      {
        id: 'pu-mod-3',
        title: 'Penalaran Analitis (Logika Posisi & Syarat)',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'pu-3-1', title: 'Analisis Urutan, Peringkat & Posisi (Linear/Melingkar)', isCompleted: false },
          { id: 'pu-3-2', title: 'Analisis Penjadwalan & Pengelompokan Bersyarat', isCompleted: false },
        ],
      },
      {
        id: 'pu-mod-4',
        title: 'Penalaran Kuantitatif: Pola & Bilangan',
        priority: 'Core',
        estimatedMinutes: 35,
        subtopics: [
          { id: 'pu-4-1', title: 'Barisan Bilangan, Huruf & Larik', isCompleted: false },
          { id: 'pu-4-2', title: 'Pola Operasi Aritmetika dalam Bidang/Gambar', isCompleted: false },
        ],
      },
      {
        id: 'pu-mod-5',
        title: 'Penalaran Kuantitatif: Data & Proporsi',
        priority: 'High-Yield',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'pu-5-1', title: 'Perbandingan Senilai, Berbalik Nilai & Aritmetika Dasar', isCompleted: false },
          { id: 'pu-5-2', title: 'Interpretasi Tabel, Grafik Tren, Rasio & Persentase Pertumbuhan', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'ppu',
    code: 'PPU',
    title: 'Pengetahuan & Pemahaman Umum',
    category: 'TPS',
    description: 'Semantik, morfologi, sintaksis, wacana, dan kriptografi.',
    modules: [
      {
        id: 'ppu-mod-1',
        title: 'Semantik & Morfologi (Makna & Bentuk Kata)',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'ppu-1-1', title: 'Relasi Makna: Sinonim, Antonim, Homonim & Hipernim-Hiponim', isCompleted: false },
          { id: 'ppu-1-2', title: 'Afiksasi: Makna Imbuhan (pe-an, ke-an, per-an, me-kan, ter-)', isCompleted: false },
          { id: 'ppu-1-3', title: 'Gaya Bahasa, Majas, Idiom & Makna Asosiatif', isCompleted: false },
        ],
      },
      {
        id: 'ppu-mod-2',
        title: 'Sintaksis: Frasa, Klausa & Pola Kalimat',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'ppu-2-1', title: 'Frasa Endosentris/Eksosentris & Kesamaan Pola Frasa', isCompleted: false },
          { id: 'ppu-2-2', title: 'Analisis Fungsi Kalimat (S-P-O-K-Pel) & Persamaan Pola Dasar', isCompleted: false },
          { id: 'ppu-2-3', title: 'Kalimat Majemuk, Transformasi Aktif-Pasif & Inti Kalimat', isCompleted: false },
        ],
      },
      {
        id: 'ppu-mod-3',
        title: 'Analisis Wacana & Pragmatik',
        priority: 'High-Yield',
        estimatedMinutes: 35,
        subtopics: [
          { id: 'ppu-3-1', title: 'Gagasan Pokok, Kalimat Utama & Kepaduan Paragraf (Koherensi)', isCompleted: false },
          { id: 'ppu-3-2', title: 'Sikap, Keberpihakan, Tone & Tujuan Penulis', isCompleted: false },
        ],
      },
      {
        id: 'ppu-mod-4',
        title: 'Kriptografi & Bahasa Buatan (Bahasa Panda)',
        priority: 'Standard',
        estimatedMinutes: 30,
        subtopics: [
          { id: 'ppu-4-1', title: 'Dekode Pola Morfologi & Kosakata Bahasa Buatan', isCompleted: false },
          { id: 'ppu-4-2', title: 'Dekode Struktur Sintaksis & Kalimat Bahasa Panda', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'pbm',
    code: 'PBM',
    title: 'Pemahaman Bacaan & Menulis',
    category: 'TPS',
    description: 'Kaidah EYD V, kata baku, kalimat efektif, dan kohesi wacana.',
    modules: [
      {
        id: 'pbm-mod-1',
        title: 'Kaidah Ejaan & Tata Tulis (EYD V)',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pbm-1-1', title: 'Pemakaian Huruf Kapital, Miring & Tebal', isCompleted: false },
          { id: 'pbm-1-2', title: 'Penulisan Kata Depan, Imbuhan, Gabungan Kata & Partikel (pun/per)', isCompleted: false },
          { id: 'pbm-1-3', title: 'Penggunaan Tanda Baca (Koma, Titik Koma, Titik Dua, Pisah, Petik)', isCompleted: false },
        ],
      },
      {
        id: 'pbm-mod-2',
        title: 'Diksi, Kata Baku & Konjungsi',
        priority: 'High-Yield',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'pbm-2-1', title: 'Kata Baku vs Tidak Baku (KBBI VI) & Ketepatan Diksi', isCompleted: false },
          { id: 'pbm-2-2', title: 'Konjungsi Intrakalimat, Korelatif & Antarkalimat', isCompleted: false },
        ],
      },
      {
        id: 'pbm-mod-3',
        title: 'Kalimat Efektif & Penyuntingan',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pbm-3-1', title: 'Syarat Kalimat Efektif: Kelengkapan S-P, Kehematan & Kelogisan', isCompleted: false },
          { id: 'pbm-3-2', title: 'Keparalelan Bentuk (Paralelisme)', isCompleted: false },
          { id: 'pbm-3-3', title: 'Perbaikan, Penggabungan & Pemecahan Kalimat', isCompleted: false },
        ],
      },
      {
        id: 'pbm-mod-4',
        title: 'Konstruksi & Kepaduan Paragraf',
        priority: 'Core',
        estimatedMinutes: 35,
        subtopics: [
          { id: 'pbm-4-1', title: 'Melengkapi Kalimat Rumpang dalam Wacana', isCompleted: false },
          { id: 'pbm-4-2', title: 'Mengurutkan Kalimat Acak & Menyusun Simpulan Paragraf', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'pk',
    code: 'PK',
    title: 'Pengetahuan Kuantitatif',
    category: 'TPS',
    description: 'Aljabar, fungsi, barisan, geometri, statistika, dan peluang.',
    modules: [
      {
        id: 'pk-mod-1',
        title: 'Bilangan, Eksponen & Himpunan',
        priority: 'High-Yield',
        estimatedMinutes: 50,
        subtopics: [
          { id: 'pk-1-1', title: 'Sifat Bilangan Bulat, Prima, Keterbagian & Operasi Simbol Khusus', isCompleted: false },
          { id: 'pk-1-2', title: 'Sifat Pangkat, Bentuk Akar, Eksponen & Logaritma Dasar', isCompleted: false },
          { id: 'pk-1-3', title: 'Operasi Himpunan, Diagram Venn & Kardinalitas', isCompleted: false },
        ],
      },
      {
        id: 'pk-mod-2',
        title: 'Aljabar, Persamaan & Pertidaksamaan',
        priority: 'High-Yield',
        estimatedMinutes: 50,
        subtopics: [
          { id: 'pk-2-1', title: 'Sistem Persamaan Linear (SPLDV & SPLTV)', isCompleted: false },
          { id: 'pk-2-2', title: 'Pertidaksamaan Linear, Kuadrat & Nilai Mutlak Dasar', isCompleted: false },
          { id: 'pk-2-3', title: 'Persamaan & Fungsi Kuadrat (Akar, Diskriminan & Grafik Parabola)', isCompleted: false },
        ],
      },
      {
        id: 'pk-mod-3',
        title: 'Fungsi, Barisan & Matriks',
        priority: 'Core',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pk-3-1', title: 'Domain, Fungsi Komposisi & Fungsi Invers', isCompleted: false },
          { id: 'pk-3-2', title: 'Barisan & Deret Aritmetika serta Geometri', isCompleted: false },
          { id: 'pk-3-3', title: 'Operasi Matriks, Determinan & Invers Matriks Ordo 2x2', isCompleted: false },
        ],
      },
      {
        id: 'pk-mod-4',
        title: 'Geometri Datar',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pk-4-1', title: 'Hubungan Garis, Sudut & Segitiga (Pythagoras & Kesebangunan)', isCompleted: false },
          { id: 'pk-4-2', title: 'Segiempat, Lingkaran & Luas Daerah Arsir', isCompleted: false },
        ],
      },
      {
        id: 'pk-mod-5',
        title: 'Geometri Ruang & Koordinat Kartesius',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'pk-5-1', title: 'Volume, Luas Permukaan & Jarak pada Bangun Ruang', isCompleted: false },
          { id: 'pk-5-2', title: 'Sistem Koordinat, Jarak Titik-Garis & Persamaan Garis Lurus', isCompleted: false },
        ],
      },
      {
        id: 'pk-mod-6',
        title: 'Statistika & Peluang Dasar',
        priority: 'Core',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pk-6-1', title: 'Ukuran Pemusatan (Mean, Median, Modus, Rata-rata Gabungan) & Penyebaran', isCompleted: false },
          { id: 'pk-6-2', title: 'Kaidah Pencacahan, Permutasi, Kombinasi & Peluang Kejadian', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'lbi',
    code: 'LBI',
    title: 'Literasi Bahasa Indonesia',
    category: 'Literasi',
    description: 'Pemahaman teks eksplisit, inferensi, evaluasi kritis, dan teks ilmiah/sastra.',
    modules: [
      {
        id: 'lbi-mod-1',
        title: 'Pemahaman Tekstual & Informasi Eksplisit',
        priority: 'High-Yield',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'lbi-1-1', title: 'Pencarian & Verifikasi Fakta Langsung (Tabel Benar/Salah)', isCompleted: false },
          { id: 'lbi-1-2', title: 'Gagasan Utama, Kerangka, Ringkasan & Hubungan Antarbagian Wacana', isCompleted: false },
        ],
      },
      {
        id: 'lbi-mod-2',
        title: 'Penalaran Inferensial & Makna Tersirat',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'lbi-2-1', title: 'Penarikan Simpulan Logis & Makna Implisit', isCompleted: false },
          { id: 'lbi-2-2', title: 'Prediksi Sebab-Akibat, Asumsi & Implikasi Wacana', isCompleted: false },
        ],
      },
      {
        id: 'lbi-mod-3',
        title: 'Evaluasi Kritis & Sintesis Informasi',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'lbi-3-1', title: 'Membedakan Fakta Empiris, Opini & Kredibilitas Bukti', isCompleted: false },
          { id: 'lbi-3-2', title: 'Analisis Konflik Sudut Pandang Pakar & Sintesis Multi-teks', isCompleted: false },
        ],
      },
      {
        id: 'lbi-mod-4',
        title: 'Literasi Kontekstual: Teks Ilmiah, Publik & Sastra',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'lbi-4-1', title: 'Bedah Artikel Eksplanasi Sains-Teknologi & Esai Kebijakan Publik', isCompleted: false },
          { id: 'lbi-4-2', title: 'Apresiasi Sastra/Fiksi: Karakterisasi, Konflik Batin, Alur & Nilai Moral', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'lbe',
    code: 'LBE',
    title: 'Literasi Bahasa Inggris',
    category: 'Literasi',
    description: 'Reading comprehension, detailed info, critical inference, and multi-text synthesis.',
    modules: [
      {
        id: 'lbe-mod-1',
        title: 'Global Comprehension & Text Structure',
        priority: 'High-Yield',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'lbe-1-1', title: 'Main Idea, Topic & Author\'s Primary Purpose', isCompleted: false },
          { id: 'lbe-1-2', title: 'Text Organization, Coherence & Sentence Insertion', isCompleted: false },
        ],
      },
      {
        id: 'lbe-mod-2',
        title: 'Detailed Information, Vocabulary & Reference',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'lbe-2-1', title: 'Stated Detail, True/False Verification & Paraphrasing (Restatement)', isCompleted: false },
          { id: 'lbe-2-2', title: 'Vocabulary in Context & Pronoun Reference', isCompleted: false },
        ],
      },
      {
        id: 'lbe-mod-3',
        title: 'Critical Reading: Inference & Attitude',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'lbe-3-1', title: 'Implied Detail, Logical Inference & Assumption', isCompleted: false },
          { id: 'lbe-3-2', title: 'Preceding/Following Paragraph Prediction', isCompleted: false },
          { id: 'lbe-3-3', title: 'Author\'s Tone, Attitude & Target Audience', isCompleted: false },
        ],
      },
      {
        id: 'lbe-mod-4',
        title: 'Multi-Text Synthesis & Discussion Threads',
        priority: 'Core',
        estimatedMinutes: 40,
        subtopics: [
          { id: 'lbe-4-1', title: 'Multi-Post Online Forum Threads (Agreement, Disagreement & Stance)', isCompleted: false },
          { id: 'lbe-4-2', title: 'Paired Texts Comparison & Infographic/Chart Integration', isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'pm',
    code: 'PM',
    title: 'Penalaran Matematika',
    category: 'Literasi',
    description: 'Numerasi terapan, aljabar kontekstual, geometri terapan, dan analisis data peluang.',
    modules: [
      {
        id: 'pm-mod-1',
        title: 'Numerasi Terapan: Aritmetika Sosial & Proporsi',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pm-1-1', title: 'Aritmetika Keuangan: Diskon Bertingkat, Pajak, Bunga & Optimasi Biaya', isCompleted: false },
          { id: 'pm-1-2', title: 'Rasio, Skala, Campuran, Kecepatan, Debit & Kapasitas Kerja', isCompleted: false },
        ],
      },
      {
        id: 'pm-mod-2',
        title: 'Pemodelan Aljabar & Barisan Kontekstual',
        priority: 'High-Yield',
        estimatedMinutes: 50,
        subtopics: [
          { id: 'pm-2-1', title: 'Pertumbuhan, Peluruhan & Pemodelan Barisan Aritmetika/Geometri', isCompleted: false },
          { id: 'pm-2-2', title: 'Pemodelan Sistem Persamaan & Optimasi Pertidaksamaan Linear', isCompleted: false },
          { id: 'pm-2-3', title: 'Pemodelan Lintasan & Nilai Optimum Fungsi Kuadrat Kontekstual', isCompleted: false },
        ],
      },
      {
        id: 'pm-mod-3',
        title: 'Geometri & Pengukuran Terapan',
        priority: 'High-Yield',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pm-3-1', title: 'Desain Lahan, Luas, Keliling & Kesebangunan Kontekstual', isCompleted: false },
          { id: 'pm-3-2', title: 'Kapasitas Wadah (Bangun Ruang Gabungan) & Trigonometri (Sudut Elevasi/Depresi)', isCompleted: false },
        ],
      },
      {
        id: 'pm-mod-4',
        title: 'Analisis Data, Ketidakpastian & Peluang Terapan',
        priority: 'Core',
        estimatedMinutes: 45,
        subtopics: [
          { id: 'pm-4-1', title: 'Interpretasi Infografis, Ukuran Pemusatan & Penyebaran Kontekstual', isCompleted: false },
          { id: 'pm-4-2', title: 'Peluang Kejadian Majemuk & Pengambilan Keputusan Berbasis Data', isCompleted: false },
        ],
      },
    ],
  },
];

// Ensure src/data directory exists
if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

// 1. Write src/data/syllabus.json
fs.writeFileSync(
  'src/data/syllabus.json',
  JSON.stringify(SYLLABUS_DATA, null, 2),
  'utf8'
);
console.log('src/data/syllabus.json created!');

// 2. Write src/data/syllabus.ts
const dataSyllabusTs = `// Core 3-tier Syllabus Data (Subtest -> Module -> Atomic Subtopics)
import type { SubtestItem } from '../types/material';

export const SYLLABUS_DATA: SubtestItem[] = ${JSON.stringify(SYLLABUS_DATA, null, 2)};

export default SYLLABUS_DATA;
`;
fs.writeFileSync('src/data/syllabus.ts', dataSyllabusTs, 'utf8');
console.log('src/data/syllabus.ts created!');

// 3. Build backward-compatible UTBK_SYLLABUS in src/lib/syllabusData.ts
const backwardCompatibleSyllabus = SYLLABUS_DATA.map((st) => ({
  id: st.id,
  code: st.code,
  title: st.title,
  name: st.title,
  category: st.category,
  description: st.description,
  modules: st.modules,
  chapters: st.modules.map((mod, modIdx) => ({
    chapter_num: modIdx + 1,
    chapter_title: mod.title,
    subchapters: mod.subtopics.map((sub, subIdx) => ({
      id: sub.id,
      subchapter_num: (modIdx + 1) + '.' + (subIdx + 1),
      title: sub.title,
      variations_count: 3,
      isCompleted: sub.isCompleted,
    })),
  })),
}));

const syllabusDataTs = `// Consolidated 3-Tier Hierarchy (Subtest -> Module/Unit -> Atomic Subtopics)
import type { SubtestItem } from '../types/material';
export { SYLLABUS_DATA } from '../data/syllabus';

export const UTBK_SYLLABUS: SubtestItem[] = ${JSON.stringify(backwardCompatibleSyllabus, null, 2)};
`;
fs.writeFileSync('src/lib/syllabusData.ts', syllabusDataTs, 'utf8');
console.log('src/lib/syllabusData.ts created!');

// 4. Update data/curriculum_tracker.json
const trackerItems = [];
for (const st of SYLLABUS_DATA) {
  for (let mIdx = 0; mIdx < st.modules.length; mIdx++) {
    const mod = st.modules[mIdx];
    for (let sIdx = 0; sIdx < mod.subtopics.length; sIdx++) {
      const sub = mod.subtopics[sIdx];
      const subNum = (mIdx + 1) + '.' + (sIdx + 1);
      trackerItems.push({
        id: sub.id,
        subtest: st.code,
        category: st.category,
        module_id: mod.id,
        module_title: mod.title,
        priority: mod.priority,
        chapter_num: mIdx + 1,
        chapter_title: mod.title,
        subchapter_num: subNum,
        subchapter_title: sub.title,
        title: sub.title,
        required_question_variations: [
          'Archetype Soal: Konsep dasar & variasi ' + sub.title,
          'Archetype Soal: Deteksi jebakan distractor UTBK-SNBT',
          'Archetype Soal: Algoritma eliminasi cepat 30-45 detik',
        ],
        requires_svg: false,
        material_status: 'done',
        output_path: '/content/utbk/' + st.id + '/' + sub.id + '.json',
      });
    }
  }
}

fs.writeFileSync(
  'data/curriculum_tracker.json',
  JSON.stringify({ items: trackerItems }, null, 2),
  'utf8'
);
console.log('data/curriculum_tracker.json created with ' + trackerItems.length + ' subtopics!');
