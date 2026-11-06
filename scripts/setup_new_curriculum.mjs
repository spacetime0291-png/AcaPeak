import fs from 'fs';
import path from 'path';

const CURRICULUM = {
  PK: {
    code: 'PK',
    name: 'Pengetahuan Kuantitatif',
    description: 'Matematika dasar, aljabar, geometri, dan statistika.',
    chapters: [
      {
        num: 1,
        title: 'Operasi Bilangan & Sifat Keterbagian',
        subchapters: [
          'Bilangan Bulat, Prima & Keterbagian',
          'Pecahan, Desimal & Bentuk Akar',
          'Pola & Operasi Simbol Khusus',
        ],
      },
      {
        num: 2,
        title: 'Eksponen & Logaritma Dasar',
        subchapters: [
          'Sifat Pangkat & Eksponen',
          'Persamaan Eksponen',
          'Konsep Dasar Logaritma',
        ],
      },
      {
        num: 3,
        title: 'Himpunan & Diagram Venn',
        subchapters: [
          'Operasi Irisan, Gabungan & Komplemen',
          'Kardinalitas & Soal Cerita Himpunan',
        ],
      },
      {
        num: 4,
        title: 'Persamaan & Pertidaksamaan Linear',
        subchapters: [
          'SPLDV & SPLTV',
          'Pertidaksamaan Linear & Nilai Mutlak Dasar',
        ],
      },
      {
        num: 5,
        title: 'Persamaan & Fungsi Kuadrat',
        subchapters: [
          'Akar-akar & Diskriminan',
          'Sifat Grafik Parabola & Titik Ekstrem',
        ],
      },
      {
        num: 6,
        title: 'Fungsi, Relasi & Invers',
        subchapters: [
          'Domain & Sifat Fungsi',
          'Fungsi Komposisi',
          'Fungsi Invers',
        ],
      },
      {
        num: 7,
        title: 'Barisan & Deret',
        subchapters: [
          'Barisan & Deret Aritmetika',
          'Barisan & Deret Geometri',
        ],
      },
      {
        num: 8,
        title: 'Matriks',
        subchapters: [
          'Operasi & Perkalian Matriks',
          'Determinan & Invers Matriks Ordo 2x2',
        ],
      },
      {
        num: 9,
        title: 'Garis, Sudut & Bangun Datar',
        subchapters: [
          'Sudut & Garis Sejajar',
          'Segitiga & Pythagoras',
          'Segiempat, Lingkaran & Luas Daerah Arsir',
        ],
      },
      {
        num: 10,
        title: 'Bangun Ruang & Koordinat Kartesius',
        subchapters: [
          'Volume & Luas Permukaan Bangun Ruang',
          'Jarak Titik, Garis & Persamaan Garis Lurus',
        ],
      },
      {
        num: 11,
        title: 'Statistika Deskriptif',
        subchapters: [
          'Ukuran Pemusatan: Mean, Median, Modus',
          'Ukuran Penyebaran: Jangkauan & Kuartil',
          'Rata-rata Gabungan',
        ],
      },
      {
        num: 12,
        title: 'Aturan Pencacahan & Peluang',
        subchapters: [
          'Kaidah Pencacahan, Permutasi & Kombinasi',
          'Peluang Kejadian & Frekuensi Harapan',
        ],
      },
    ],
  },
  PU: {
    code: 'PU',
    name: 'Penalaran Umum',
    description: 'Penalaran induktif, deduktif, dan kuantitatif.',
    chapters: [
      {
        num: 1,
        title: 'Kesesuaian Pernyataan Wacana',
        subchapters: [
          'Fakta Eksplisit Pasti Benar/Salah',
          'Simpulan Mungkin Benar & Inferensi',
        ],
      },
      {
        num: 2,
        title: 'Sebab-Akibat & Kualitas Simpulan',
        subchapters: [
          'Hubungan Kausalitas Teks',
          'Evaluasi Kualitas Simpulan',
        ],
      },
      {
        num: 3,
        title: 'Memperkuat & Memperlemah Argumen',
        subchapters: [
          'Pernyataan Memperkuat/Memperlemah Hipotesis',
          'Tabel Kompleks Memperkuat vs Tidak Memperkuat',
        ],
      },
      {
        num: 4,
        title: 'Logika Proposisi & Silogisme',
        subchapters: [
          'Implikasi, Kontraposisi & Ekuivalensi',
          'Penarikan Kesimpulan modus Ponens, Tollens & Silogisme',
        ],
      },
      {
        num: 5,
        title: 'Logika Kuantor & Diagram Himpunan',
        subchapters: [
          'Kuantor Semua-Sebagian & Ingkarannya',
          'Silogisme Kategoris',
        ],
      },
      {
        num: 6,
        title: 'Penalaran Analitis',
        subchapters: [
          'Analisis Urutan & Posisi',
          'Analisis Penjadwalan & Pengelompokan Syarat',
        ],
      },
      {
        num: 7,
        title: 'Pola Bilangan, Huruf & Gambar',
        subchapters: [
          'Barisan Bilangan & Larik',
          'Pola Operasi Aritmetika dalam Kotak/Segitiga',
        ],
      },
      {
        num: 8,
        title: 'Aritmetika Sosial & Perbandingan',
        subchapters: [
          'Perbandingan Senilai & Berbalik Nilai',
          'Kecepatan, Debit & Kapasitas Kerja',
        ],
      },
      {
        num: 9,
        title: 'Interpretasi Data Tabel & Grafik',
        subchapters: [
          'Tren Grafik Garis & Batang Ganda',
          'Proporsi, Persentase Pertumbuhan & Rasio Data',
        ],
      },
    ],
  },
  PPU: {
    code: 'PPU',
    name: 'Pengetahuan & Pemahaman Umum',
    description: 'Makna kata, kepaduan paragraf, dan bahasa teks.',
    chapters: [
      {
        num: 1,
        title: 'Makna Kata & Hubungan Leksikal',
        subchapters: [
          'Sinonim, Antonim & Homonim Kontekstual',
          'Hipernim-Hiponim & Perubahan Makna',
        ],
      },
      {
        num: 2,
        title: 'Afiksasi & Pembentukan Kata',
        subchapters: [
          'Makna Imbuhan pe-an, ke-an, per-an',
          'Makna Imbuhan me-kan, ber-, ter-',
        ],
      },
      {
        num: 3,
        title: 'Frasa & Pola Makna Frasa',
        subchapters: [
          'Frasa Endosentris & Eksosentris',
          'Kesamaan Pola Makna Frasa dalam Kalimat',
        ],
      },
      {
        num: 4,
        title: 'Struktur Klausa & Pola Kalimat (S-P-O-K-Pel)',
        subchapters: [
          'Identifikasi Subjek, Predikat, Objek & Pelengkap',
          'Persamaan Pola Dasar Kalimat',
        ],
      },
      {
        num: 5,
        title: 'Kalimat Majemuk & Transformasi Kalimat',
        subchapters: [
          'Kalimat Majemuk Setara & Bertingkat',
          'Kalimat Aktif-Pasif & Perluasan Inti Kalimat',
        ],
      },
      {
        num: 6,
        title: 'Gagasan Pokok & Kepaduan Paragraf',
        subchapters: [
          'Ide Pokok & Kalimat Utama',
          'Koherensi, Kalimat Sumbang & Hubungan Antarparagraf',
        ],
      },
      {
        num: 7,
        title: 'Gaya Bahasa, Sikap Penulis & Pragmatik',
        subchapters: [
          'Majas, Makna Asosiatif & Idiom',
          'Keberpihakan, Tone & Tujuan Penulis',
        ],
      },
      {
        num: 8,
        title: 'Kriptografi & Bahasa Buatan (Bahasa Panda)',
        subchapters: [
          'Dekode Pola Morfologi Bahasa Buatan',
          'Dekode Struktur Kalimat Bahasa Panda',
        ],
      },
    ],
  },
  PBM: {
    code: 'PBM',
    name: 'Pemahaman Bacaan & Menulis',
    description: 'Kaidah ejaan EYD V, kalimat efektif, dan kohesi wacana.',
    chapters: [
      {
        num: 1,
        title: 'Pemakaian Huruf (EYD V)',
        subchapters: [
          'Aturan Huruf Kapital',
          'Aturan Huruf Miring & Huruf Tebal',
        ],
      },
      {
        num: 2,
        title: 'Penulisan Kata & Gabungan Kata',
        subchapters: [
          'Kata Depan di/ke/dari vs Imbuhan',
          'Gabungan Kata Serangkai vs Terpisah, Partikel pun/per & Angka',
        ],
      },
      {
        num: 3,
        title: 'Kaidah Tanda Baca',
        subchapters: [
          'Penggunaan Tanda Koma Wajib & Terlarang',
          'Tanda Titik Koma, Titik Dua, Hubung, Pisah & Petik',
        ],
      },
      {
        num: 4,
        title: 'Kata Baku & Diksi (KBBI VI)',
        subchapters: [
          'Identifikasi Kata Baku vs Tidak Baku',
          'Ketepatan Pilihan Kata/Diksi dalam Kalimat',
        ],
      },
      {
        num: 5,
        title: 'Konjungsi (Kata Hubung)',
        subchapters: [
          'Konjungsi Intrakalimat & Korelatif',
          'Konjungsi Antarkalimat',
        ],
      },
      {
        num: 6,
        title: 'Kalimat Efektif & Kelogisan',
        subchapters: [
          'Kelengkapan S-P & Kehematan Kata',
          'Kesejajaran Bentuk/Paralelisme & Kelogisan Makna',
        ],
      },
      {
        num: 7,
        title: 'Perbaikan, Penggabungan & Pemecahan Kalimat',
        subchapters: [
          'Menyunting Kalimat Tidak Efektif',
          'Menggabungkan & Memecah Kalimat',
        ],
      },
      {
        num: 8,
        title: 'Kelengkapan & Urutan Paragraf',
        subchapters: [
          'Melengkapi Kalimat Rumpang dalam Paragraf',
          'Mengurutkan Kalimat Acak & Simpulan Bacaan',
        ],
      },
    ],
  },
  LBI: {
    code: 'LBI',
    name: 'Literasi Bahasa Indonesia',
    description: 'Analisis wacana kritis, inferensi makna, dan evaluasi argumen.',
    chapters: [
      {
        num: 1,
        title: 'Pencarian & Verifikasi Informasi Eksplisit',
        subchapters: [
          'Akurasi Fakta Langsung dari Bacaan',
          'Tabel Kompleks Benar/Salah Berdasarkan Teks',
        ],
      },
      {
        num: 2,
        title: 'Ide Pokok, Ringkasan & Struktur Wacana',
        subchapters: [
          'Gagasan Utama Wacana Panjang',
          'Kerangka, Ringkasan & Hubungan Antarbagian Teks',
        ],
      },
      {
        num: 3,
        title: 'Inferensi, Simpulan & Makna Tersirat',
        subchapters: [
          'Penarikan Simpulan Logis',
          'Prediksi Sebab-Akibat & Implikasi Wacana',
        ],
      },
      {
        num: 4,
        title: 'Evaluasi Fakta, Opini & Kredibilitas Informasi',
        subchapters: [
          'Membedakan Fakta Empiris vs Opini',
          'Menilai Keakuratan & Kecukupan Bukti',
        ],
      },
      {
        num: 5,
        title: 'Analisis Teks Sains, Kesehatan & Teknologi',
        subchapters: [
          'Bedah Artikel Eksplanasi Ilmiah',
          'Interpretasi Istilah Teknis & Mekanisme Proses',
        ],
      },
      {
        num: 6,
        title: 'Analisis Teks Sosial, Ekonomi & Humaniora',
        subchapters: [
          'Bedah Esai Opini & Kebijakan Publik',
          'Konflik Sudut Pandang Tokoh/Pakar',
        ],
      },
      {
        num: 7,
        title: 'Apresiasi Teks Sastra & Fiksi Naratif',
        subchapters: [
          'Karakterisasi Tokoh, Latar & Alur',
          'Nilai Moral, Konflik Batin & Amanat Cerita',
        ],
      },
    ],
  },
  LBE: {
    code: 'LBE',
    name: 'Literasi Bahasa Inggris',
    description: 'Reading comprehension, text structure, and tone analysis.',
    chapters: [
      {
        num: 1,
        title: 'Main Idea, Topic & Primary Purpose',
        subchapters: [
          'Topic & Main Idea of Passage',
          'Author\'s Primary Purpose & Overview',
        ],
      },
      {
        num: 2,
        title: 'Detailed Information & Restatement (Paraphrasing)',
        subchapters: [
          'Stated Detail & True/False Verification',
          'Paraphrasing & Equivalent Sentences',
        ],
      },
      {
        num: 3,
        title: 'Vocabulary in Context & Reference',
        subchapters: [
          'Contextual Synonym & Word Meaning',
          'Pronoun Reference',
        ],
      },
      {
        num: 4,
        title: 'Inference, Assumption & Prediction',
        subchapters: [
          'Implied Detail & Logical Inference',
          'Preceding/Following Paragraph Prediction',
        ],
      },
      {
        num: 5,
        title: 'Author\'s Tone, Attitude & Text Organization',
        subchapters: [
          'Tone, Attitude & Target Audience',
          'Coherence & Sentence Insertion',
        ],
      },
      {
        num: 6,
        title: 'Multi-Post Discussion Threads (Online Forum)',
        subchapters: [
          'Identifying Agreement/Disagreement Among Posters',
          'Synthesizing Opinions in Thread',
        ],
      },
      {
        num: 7,
        title: 'Paired Texts & Infographic Reading',
        subchapters: [
          'Comparing Two Related Texts',
          'Integrating Text with Charts/Tables',
        ],
      },
    ],
  },
  PM: {
    code: 'PM',
    name: 'Penalaran Matematika',
    description: 'Pemodelan matematis kontekstual dalam skenario nyata.',
    chapters: [
      {
        num: 1,
        title: 'Aritmetika Sosial, Keuangan & Perdagangan',
        subchapters: [
          'Diskon Bertingkat, Pajak, Bunga & Cicilan',
          'Optimasi Biaya, Untung-Rugi & Tarif Layanan',
        ],
      },
      {
        num: 2,
        title: 'Rasio, Proporsi, Laju & Debit Kontekstual',
        subchapters: [
          'Skala, Campuran & Komposisi Bahan',
          'Kecepatan, Waktu Tempuh, Debit & Kapasitas',
        ],
      },
      {
        num: 3,
        title: 'Pola Bilangan & Barisan Terapan',
        subchapters: [
          'Pertumbuhan & Peluruhan Aritmetika di Dunia Nyata',
          'Pemodelan Barisan Geometri Kontekstual',
        ],
      },
      {
        num: 4,
        title: 'Pemodelan Persamaan & Pertidaksamaan Linear',
        subchapters: [
          'Sistem Persamaan Linear dalam Kasus Nyata',
          'Optimasi Syarat & Pertidaksamaan',
        ],
      },
      {
        num: 5,
        title: 'Fungsi & Grafik Kontekstual',
        subchapters: [
          'Pemodelan Lintasan & Nilai Optimum Fungsi Kuadrat',
          'Interpretasi Grafik Fungsi Kontekstual',
        ],
      },
      {
        num: 6,
        title: 'Geometri Bidang & Pengukuran Terapan',
        subchapters: [
          'Luas, Keliling & Desain Lahan/Arsitektur',
          'Teorema Pythagoras & Kesebangunan Terapan',
        ],
      },
      {
        num: 7,
        title: 'Geometri Ruang & Trigonometri Terapan',
        subchapters: [
          'Volume, Kapasitas Wadah & Bangun Ruang Gabungan',
          'Sudut Elevasi/Depresi & Jarak Pandang',
        ],
      },
      {
        num: 8,
        title: 'Statistika, Kaidah Pencacahan & Peluang Kontekstual',
        subchapters: [
          'Analisis Data Infografis, Mean & Penyebaran',
          'Peluang Kejadian & Pengambilan Keputusan Berbasis Data',
        ],
      },
    ],
  },
};

// Subtest display order
const subtestOrder = ['PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBE', 'PM'];

// Build curriculum_tracker.json items
const trackerItems = [];
const finalSyllabus = [];

for (const code of subtestOrder) {
  const st = CURRICULUM[code];
  const chaptersList = [];

  for (const ch of st.chapters) {
    const subList = [];
    ch.subchapters.forEach((title, idx) => {
      const subNum = `${ch.num}.${idx + 1}`;
      const id = `${code.toLowerCase()}-${subNum}`;

      trackerItems.push({
        id,
        subtest: code,
        chapter_num: ch.num,
        chapter_title: ch.title,
        subchapter_num: subNum,
        subchapter_title: title,
        title,
        required_question_variations: [
          `Archetype Soal: Konsep dasar dan variasi utama ${title}`,
          `Archetype Soal: Deteksi jebakan opsi pengecoh UTBK-SNBT`,
          `Archetype Soal: Algoritma eliminasi cepat 30-45 detik`,
        ],
        requires_svg: false,
        material_status: 'done',
        output_path: `/content/utbk/${code.toLowerCase()}/${id}.json`,
      });

      subList.push({
        id,
        subchapter_num: subNum,
        title,
        variations_count: 3,
        isCompleted: true,
      });
    });

    chaptersList.push({
      chapter_num: ch.num,
      chapter_title: ch.title,
      subchapters: subList,
    });
  }

  finalSyllabus.push({
    code: st.code,
    name: st.name,
    description: st.description,
    chapters: chaptersList,
  });
}

// Write data/curriculum_tracker.json
fs.writeFileSync(
  'data/curriculum_tracker.json',
  JSON.stringify({ items: trackerItems }, null, 2),
  'utf8'
);
console.log(`data/curriculum_tracker.json saved with ${trackerItems.length} items!`);

// Write src/lib/syllabusData.ts
const tsContent = `// Auto-generated from data/curriculum_tracker.json (Topic-Specific Chapters)
import type { SyllabusSubtestItem } from '../types/material';

export const UTBK_SYLLABUS: SyllabusSubtestItem[] = ${JSON.stringify(finalSyllabus, null, 2)};
`;

fs.writeFileSync('src/lib/syllabusData.ts', tsContent, 'utf8');
console.log('src/lib/syllabusData.ts generated successfully!');
