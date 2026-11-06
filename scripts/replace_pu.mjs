import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const newPuItems = [
  // ==========================================
  // BAB 1: PENALARAN INDUKTIF
  // ==========================================
  // 1.1. Generalisasi (Generalization)
  {
    id: "pu-1.1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Konsep Dasar dan Mekanisme Generalisasi",
    micro_syllabus_scope: [
      "Definisi premis observasional/partikular dan kesimpulan umum.",
      "Perbedaan kesimpulan mutlak (deduktif) vs kesimpulan probabilistik (induktif)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.1.json"
  },
  {
    id: "pu-1.1.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Jenis-Jenis Generalisasi",
    micro_syllabus_scope: [
      "Generalisasi Sempurna (Lengkap): Pengamatan dilakukan pada seluruh anggota populasi tanpa terkecuali.",
      "Generalisasi Sempurna (Lengkap): Tingkat kepastian kesimpulan setara dengan kepastian deduktif.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Pengamatan dilakukan pada sebagian anggota populasi (sampel) untuk mewakili keseluruhan.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Penggunaan kata penanda probabilitas pada kesimpulan (sebagian besar, cenderung, umumnya, berpotensi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.2.json"
  },
  {
    id: "pu-1.1.3",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Syarat Validitas dan Pengujian Generalisasi",
    micro_syllabus_scope: [
      "Kuantitas Sampel: kecukupan jumlah kasus khusus untuk mewakili populasi.",
      "Representativitas (Keterwakilan) Sampel: variasi sampel terhadap heterogenitas populasi.",
      "Penanganan Pengecualian (Outlier/Anomali): bagaimana data ekstrem memengaruhi kekuatan kesimpulan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.3.json"
  },
  {
    id: "pu-1.1.4",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Kekeliruan Berpikir (Fallacy) dalam Generalisasi",
    micro_syllabus_scope: [
      "Hasty Generalization (Generalisasi Terburu-buru): menarik kesimpulan umum dari sampel yang terlalu sedikit atau tidak representatif.",
      "Overgeneralization (Generalisasi Berlebihan): menggunakan kata kuantor universal mutlak (\"semua\", \"selalu\", \"pasti\") dari data yang hanya bersifat sebagian.",
      "Sweeping Generalization (Dicto Simpliciter): menerapkan aturan umum secara kaku pada kasus khusus yang seharusnya menjadi pengecualian."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.4.json"
  },
  {
    id: "pu-1.1.5",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Tipe Soal UTBK Generalisasi",
    micro_syllabus_scope: [
      "Menentukan simpulan yang paling mungkin benar dari serangkaian fakta/tren.",
      "Menilai kualitas simpulan (Pasti Benar, Mungkin Benar, Pasti Salah, Tidak Relevan, Tidak Dapat Dinilai)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.5.json"
  },

  // 1.2. Analogi (Analogical Reasoning)
  {
    id: "pu-1.2.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Analogi (Analogical Reasoning)",
    title: "Konsep Dasar dan Struktur Analogi",
    micro_syllabus_scope: [
      "Pemetaan kesamaan fungsi, sifat, atau pola hubungan antara dua entitas/kasus yang berbeda domain.",
      "Komponen Analogi: Fenomena Pokok (Target), Fenomena Pembanding (Analog), dan Titik Persamaan Esensial."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.2.1.json"
  },
  {
    id: "pu-1.2.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Analogi (Analogical Reasoning)",
    title: "Klasifikasi Analogi",
    micro_syllabus_scope: [
      "Analogi Induktif (Logis/Argumentatif): Menyimpulkan bahwa jika dua hal memiliki kesamaan dalam beberapa aspek A, B, dan C, maka keduanya juga memiliki kesamaan pada aspek D.",
      "Analogi Deklaratif (Penjelas): Menggunakan konsep yang sudah familier untuk menjelaskan konsep baru yang kompleks tanpa menarik kesimpulan prediktif baru."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.2.2.json"
  },
  {
    id: "pu-1.2.3",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Analogi (Analogical Reasoning)",
    title: "Pola Relasi Kata dan Konsep (Analogi Verbal & Kontekstual)",
    micro_syllabus_scope: [
      "Relasi Fungsi dan Peran (Alat : Fungsi, Profesi : Tugas Utama).",
      "Relasi Bagian ke Keseluruhan (Part-to-Whole / Meronimi).",
      "Relasi Sebab-Akibat dan Proses (Tahapan berurutan, Bahan Baku : Produk Akhir).",
      "Relasi Derajat/Intensitas dan Ukuran (Kecil ke Besar, Lambat ke Cepat).",
      "Relasi Habitat, Lokasi, dan Asosiasi Karakteristik."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.2.3.json"
  },
  {
    id: "pu-1.2.4",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Analogi (Analogical Reasoning)",
    title: "Evaluasi dan Kelemahan Analogi",
    micro_syllabus_scope: [
      "Relevansi Persamaan: memastikan kesamaan yang dibandingkan adalah sifat esensial, bukan kebetulan superfisial.",
      "Identifikasi Perbedaan Kritis (Disanalogi): menemukan faktor pembeda utama yang menggugurkan kesimpulan analogi.",
      "False Analogy (Analogi Palsu/Timpang): menyamakan dua hal yang pada prinsip dasarnya memiliki mekanisme berbeda."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.2.4.json"
  },

  // 1.3. Hubungan Kausalitas (Sebab-Akibat)
  {
    id: "pu-1.3.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Kausalitas (Sebab-Akibat)",
    title: "Konsep Dasar Kausalitas dalam Wacana",
    micro_syllabus_scope: [
      "Penanda linguistik sebab (karena, disebabkan oleh, dipicu oleh, akibat dari, berawal dari).",
      "Penanda linguistik akibat (sehingga, berdampak pada, mengakibatkan, memicu, berujung pada, maka)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.1.json"
  },
  {
    id: "pu-1.3.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Kausalitas (Sebab-Akibat)",
    title: "Pola Struktur Hubungan Kausal",
    micro_syllabus_scope: [
      "Sebab ke Akibat (Kausalitas Langsung): Satu faktor pemicu menghasilkan satu dampak langsung.",
      "Akibat ke Sebab (Kausalitas Balik/Diagnostik): Melihat fenomena hasil terlebih dahulu, lalu menelusuri faktor penyebabnya.",
      "Rantai Kausalitas (Akibat ke Akibat / Domino Effect): A menyebabkan B, B menyebabkan C, C menyebabkan D.",
      "Multi-Sebab (Penyebab Majemuk): Fenomena X terjadi karena gabungan faktor A, B, dan C secara bersamaan.",
      "Multi-Akibat (Dampak Bercabang): Satu peristiwa A menimbulkan dampak B, C, dan D sekaligus."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.2.json"
  },
  {
    id: "pu-1.3.3",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Kausalitas (Sebab-Akibat)",
    title: "Kondisi Kausalitas (Syarat Cukup vs Syarat Perlu)",
    micro_syllabus_scope: [
      "Necessary Condition (Syarat Perlu): Faktor yang harus ada agar akibat bisa terjadi, tetapi keberadaannya saja belum tentu menjamin akibat terjadi.",
      "Sufficient Condition (Syarat Cukup): Faktor yang jika ada, maka akibat pasti terjadi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.3.json"
  },
  {
    id: "pu-1.3.4",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Kausalitas (Sebab-Akibat)",
    title: "Korelasi vs Kausalitas & Kekeliruan Kausal (Causal Fallacies)",
    micro_syllabus_scope: [
      "Cum Hoc Ergo Propter Hoc: Menganggap dua kejadian yang muncul bersamaan/berkorelasi statistik pasti memiliki hubungan sebab-akibat.",
      "Post Hoc Ergo Propter Hoc: Menganggap kejadian A adalah penyebab kejadian B hanya karena A terjadi lebih dulu daripada B.",
      "Confounding Variable (Variabel Perancu/Ketiga): A dan B tampak berhubungan, padahal keduanya sama-sama disebabkan oleh faktor ketiga (C).",
      "Reverse Causality (Kausalitas Terbalik): Menukar posisi antara mana yang menjadi penyebab dan mana yang menjadi akibat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.4.json"
  },

  // ==========================================
  // BAB 2: PENALARAN DEDUKTIF
  // ==========================================
  // 2.1. Logika Proposisi (Propositional Logic)
  {
    id: "pu-2.1.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi (Propositional Logic)",
    title: "Konsep Pernyataan (Proposisi) dan Nilai Kebenaran",
    micro_syllabus_scope: [
      "Membedakan kalimat proposisi (bernilai benar atau salah) dan kalimat terbuka/non-proposisi.",
      "Proposisi Atomik (tunggal) dan Proposisi Majemuk."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.1.json"
  },
  {
    id: "pu-2.1.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi (Propositional Logic)",
    title: "Operator Logika Dasar dan Tabel Kebenaran",
    micro_syllabus_scope: [
      "Negasi / Ingkaran (¬p): Membalik nilai kebenaran pernyataan tunggal.",
      "Konjungsi (p ∧ q): Kata hubung \"dan\", \"tetapi\", \"meskipun\", \"serta\" (Benar hanya jika kedua komponen benar).",
      "Disjungsi Inklusif (p ∨ q): Kata hubung \"atau\" (Benar jika minimal salah satu benar).",
      "Disjungsi Eksklusif (p ⊕ q): Kata hubung \"atau ... tetapi bukan keduanya\".",
      "Implikasi / Kondisional (p → q): Struktur \"Jika p, maka q\" (p = anteseden/syarat cukup, q = konsekuen/syarat perlu); Variasi bentuk kalimat implikasi dalam bahasa Indonesia: \"q jika p\", \"p hanya jika q\", \"p mengakibatkan q\", \"tanpa q tidak ada p\" (¬q → ¬p).",
      "Biimplikasi / Bikondisional (p ↔ q): Struktur \"p jika dan hanya jika q\", \"jika p maka q, dan sebaliknya\"."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.2.json"
  },
  {
    id: "pu-2.1.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi (Propositional Logic)",
    title: "Ekuivalensi Logis dan Hukum-Hukum Logika (Manipulasi Kalimat Setara)",
    micro_syllabus_scope: [
      "Hukum De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q dan ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
      "Ekuivalensi Implikasi ke Disjungsi: (p → q) ≡ (¬p ∨ q) dan (¬p ∨ q) ≡ (p → q).",
      "Ingkaran / Negasi dari Implikasi: ¬(p → q) ≡ (p ∧ ¬q) (\"p terjadi, tetapi q tidak terjadi\").",
      "Ingkaran / Negasi dari Biimplikasi: ¬(p ↔ q) ≡ (p ∧ ¬q) ∨ (q ∧ ¬p)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.3.json"
  },
  {
    id: "pu-2.1.4",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi (Propositional Logic)",
    title: "Transformasi Implikasi",
    micro_syllabus_scope: [
      "Konvers (q → p) — Tidak ekuivalen dengan p → q.",
      "Invers (¬p → ¬q) — Tidak ekuivalen dengan p → q, tetapi ekuivalen dengan Konvers.",
      "Kontraposisi (¬q → ¬p) — Ekuivalen mutlak dengan implikasi awal (p → q)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.4.json"
  },

  // 2.2. Silogisme dan Aturan Penarikan Kesimpulan (Rules of Inference)
  {
    id: "pu-2.2.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Silogisme dan Aturan Penarikan Kesimpulan (Rules of Inference)",
    title: "Silogisme Hipotesik (Kondisional)",
    micro_syllabus_scope: [
      "Modus Ponens (Penegasan Anteseden): Premis 1: p → q | Premis 2: p | Kesimpulan: ∴ q.",
      "Modus Tollens (Penyangkalan Konsekuen): Premis 1: p → q | Premis 2: ¬q | Kesimpulan: ∴ ¬p.",
      "Silogisme Hipotesik Murni (Sifat Transitif): Premis 1: p → q | Premis 2: q → r | Kesimpulan: ∴ p → r (atau kontraposisinya: ¬r → ¬p).",
      "Jebakan Kesesatan Formal (Formal Fallacies - Tidak Sah): Affirming the Consequent: Premis 1: p → q | Premis 2: q | Kesimpulan: tidak dapat disimpulkan p pasti terjadi.",
      "Jebakan Kesesatan Formal (Formal Fallacies - Tidak Sah): Denying the Antecedent: Premis 1: p → q | Premis 2: ¬p | Kesimpulan: tidak dapat disimpulkan ¬q pasti terjadi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.1.json"
  },
  {
    id: "pu-2.2.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Silogisme dan Aturan Penarikan Kesimpulan (Rules of Inference)",
    title: "Silogisme Disjungtif dan Dilema",
    micro_syllabus_scope: [
      "Silogisme Disjungtif: Premis 1: p ∨ q | Premis 2: ¬p | Kesimpulan: ∴ q.",
      "Dilema Konstruktif: Premis 1: (p → q) ∧ (r → s) | Premis 2: p ∨ r | Kesimpulan: ∴ q ∨ s.",
      "Dilema Destruktif: Premis 1: (p → q) ∧ (r → s) | Premis 2: ¬q ∨ ¬s | Kesimpulan: ∴ ¬p ∨ ¬r."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.2.json"
  },
  {
    id: "pu-2.2.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Silogisme dan Aturan Penarikan Kesimpulan (Rules of Inference)",
    title: "Silogisme Kategorik",
    micro_syllabus_scope: [
      "Struktur: Term Subjek (S), Term Predikat (P), dan Term Penengah/Middle Term (M).",
      "4 Macam Proposisi Kategorik: Universal Afirmatif (A): Semua S adalah P.",
      "4 Macam Proposisi Kategorik: Universal Negatif (E): Semua S bukan P (Tidak ada S yang merupakan P).",
      "4 Macam Proposisi Kategorik: Partikular Afirmatif (I): Sebagian/Beberapa/Ada S adalah P.",
      "4 Macam Proposisi Kategorik: Partikular Negatif (O): Sebagian/Beberapa/Ada S bukan P.",
      "Hukum-hukum penarikan kesimpulan antara kuantor \"Semua\" dan \"Sebagian\" menggunakan metode Himpunan/Diagram Venn."
    ],
    requires_svg: true, // Diagram Venn / Himpunan
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.3.json"
  },

  // 2.3. Logika Kuantor (Quantifier Logic)
  {
    id: "pu-2.3.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Logika Kuantor (Quantifier Logic)",
    title: "Jenis Kuantor dan Makna Semantiknya",
    micro_syllabus_scope: [
      "Kuantor Universal (∀): \"Semua\", \"Setiap\", \"Seluruh\", \"Tidak satu pun kecuali\".",
      "Kuantor Eksistensial (∃): \"Sebagian\", \"Beberapa\", \"Ada\", \"Terdapat\", \"Sementara\", \"Minimal satu\"."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.1.json"
  },
  {
    id: "pu-2.3.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Logika Kuantor (Quantifier Logic)",
    title: "Negasi / Ingkaran Pernyataan Berkuantor",
    micro_syllabus_scope: [
      "Ingkaran \"Semua A adalah B\" ≡ \"Ada/Sebagian A yang bukan B\".",
      "Ingkaran \"Ada/Sebagian A adalah B\" ≡ \"Semua A bukan B\" (Tidak ada A yang merupakan B)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.2.json"
  },
  {
    id: "pu-2.3.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Logika Kuantor (Quantifier Logic)",
    title: "Kombinasi Kuantor dengan Proposisi Majemuk",
    micro_syllabus_scope: [
      "Bentuk: \"Semua siswa yang lulus ujian rajin belajar dan berdoa\" → jika dinegasikan atau ditarik kesimpulan sebagiannya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.3.json"
  },

  // 2.4. Penalaran Analitik (Analytical Reasoning / Logic Games)
  {
    id: "pu-2.4.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning / Logic Games)",
    title: "Pengurutan / Ranking (Ordering & Sequencing)",
    micro_syllabus_scope: [
      "Urutan Linier Kaku (skor tertinggi ke terendah, urutan antrean, jadwal hari Senin–Minggu).",
      "Urutan Relatif / Bertingkat (A lebih besar dari B, C di antara D dan E, pertidaksamaan rantai)."
    ],
    requires_svg: true, // Garis urutan / posisi linier
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.1.json"
  },
  {
    id: "pu-2.4.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning / Logic Games)",
    title: "Penempatan Posisi (Spatial & Positional Arrangement)",
    micro_syllabus_scope: [
      "Posisi Berderet / Sejajar (kursi bioskop, urutan rumah dalam satu jalan, posisi berdampingan/terpisah).",
      "Posisi Melingkar / Meja Bundar (aturan berhadapan, bersebelahan kiri/kanan pada meja bundar 4, 6, atau 8 kursi).",
      "Matriks / Tabel Atribut (memasangkan N orang dengan N profesi, N hobi, dan N kota asal)."
    ],
    requires_svg: true, // Denah meja bundar, susunan posisi
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.2.json"
  },
  {
    id: "pu-2.4.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning / Logic Games)",
    title: "Pengelompokan dan Seleksi Bersyarat (Grouping & Selection)",
    micro_syllabus_scope: [
      "Pembentukan tim/panitia dengan aturan inklusi (\"Jika A dipilih, maka B harus dipilih\").",
      "Aturan eksklusi/konflik (\"C tidak bisa berada satu tim dengan D\").",
      "Kuota kapasitas grup (Tim X harus berisi tepat 3 orang dari 7 kandidat)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.3.json"
  },
  {
    id: "pu-2.4.4",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning / Logic Games)",
    title: "Penjadwalan dan Rute Jaringan (Scheduling & Network Path)",
    micro_syllabus_scope: [
      "Alokasi slot waktu dengan batasan urutan mendahului/mengikuti.",
      "Keterhubungan titik/kota (jalur satu arah vs dua arah, mencari rute yang mungkin dilewati)."
    ],
    requires_svg: true, // Jalur/rute graf jaringan
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.4.json"
  },

  // 2.5. Evaluasi Argumen dan Kritis Wacana (Critical Reasoning)
  {
    id: "pu-2.5.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen dan Kritis Wacana (Critical Reasoning)",
    title: "Anatomi Argumen dalam Paragraf",
    micro_syllabus_scope: [
      "Mengidentifikasi klaim utama (kesimpulan penulis).",
      "Mengidentifikasi bukti pendukung (premis faktual/data).",
      "Mengidentifikasi asumsi dasar (jembatan tak tertulis antara premis dan kesimpulan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.1.json"
  },
  {
    id: "pu-2.5.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen dan Kritis Wacana (Critical Reasoning)",
    title: "Memperkuat dan Memperlemah Argumen (Strengthening & Weakening)",
    micro_syllabus_scope: [
      "Memperkuat (Strengthen): Menambahkan fakta baru yang mendukung asumsi dasar, mengonfirmasi hubungan kausal, atau menghilangkan penjelasan alternatif.",
      "Memperlemah (Weaken): Menunjukkan adanya faktor luar yang merusak hubungan sebab-akibat, menyajikan contoh penyangkal (counter-example), atau membuktikan data tidak valid."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.2.json"
  },
  {
    id: "pu-2.5.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen dan Kritis Wacana (Critical Reasoning)",
    title: "Evaluasi Kebenaran Pernyataan Berdasarkan Teks",
    micro_syllabus_scope: [
      "Membedakan pernyataan yang Pasti Benar (didukung eksplisit atau deduksi langsung), Mungkin Benar (konsisten tetapi butuh asumsi tambahan), Pasti Salah (bertentangan langsung dengan teks), dan Tidak Relevan (di luar cakupan informasi teks)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.3.json"
  },
  {
    id: "pu-2.5.4",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen dan Kritis Wacana (Critical Reasoning)",
    title: "Resolusi Paradoks / Kontradiksi (Resolve the Paradox)",
    micro_syllabus_scope: [
      "Menemukan pernyataan penjelas yang mendamaikan dua fakta di dalam teks yang sekilas tampak saling bertentangan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.4.json"
  },

  // ==========================================
  // BAB 3: PENALARAN KUANTITATIF (DALAM SUBTES PU)
  // ==========================================
  // 3.1. Pola Bilangan, Barisan, dan Gambar Numerik
  {
    id: "pu-3.1.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.1",
    subchapter_title: "Pola Bilangan, Barisan, dan Gambar Numerik",
    title: "Pola Barisan Angka (Number Sequences)",
    micro_syllabus_scope: [
      "Pola Satu Larik (penjumlahan, pengurangan, perkalian, pembagian, perpangkatan).",
      "Pola Bertingkat (selisih tingkat 2 atau tingkat 3 yang konstan/berpola).",
      "Pola Larik Ganda / Melompat (loncat 1 suku, loncat 2 suku, atau kombinasi ganjil-genap).",
      "Pola Fibonacci dan modifikasi penjumlahan suku-suku sebelumnya.",
      "Pola Pecahan dan Desimal."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.1.1.json"
  },
  {
    id: "pu-3.1.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.1",
    subchapter_title: "Pola Bilangan, Barisan, dan Gambar Numerik",
    title: "Pola Barisan Huruf (Alphabetical Sequences)",
    micro_syllabus_scope: [
      "Konversi huruf ke urutan angka (A=1, B=2, ..., Z=26) dan pola lompatan maju/mundur."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.1.2.json"
  },
  {
    id: "pu-3.1.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.1",
    subchapter_title: "Pola Bilangan, Barisan, dan Gambar Numerik",
    title: "Pola Angka dalam Gambar / Matriks (Number Puzzles)",
    micro_syllabus_scope: [
      "Operasi aritmetika antar-sudut bangun datar (segitiga, persegi, lingkaran) untuk menghasilkan angka di tengah.",
      "Pola baris dan kolom pada tabel/matriks angka sederhana."
    ],
    requires_svg: true, // Bangun datar & matriks angka bergambar
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.1.3.json"
  },

  // 3.2. Aritmetika Dasar dan Komputasi Cepat
  {
    id: "pu-3.2.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.2",
    subchapter_title: "Aritmetika Dasar dan Komputasi Cepat",
    title: "Operasi Bilangan dan Estimasi Nilai",
    micro_syllabus_scope: [
      "Operasi bilangan bulat, pecahan biasa, pecahan campuran, dan desimal.",
      "Teknik aproksimasi/pembulatan cepat untuk membandingkan dua nilai pecahan atau persentase."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.1.json"
  },
  {
    id: "pu-3.2.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.2",
    subchapter_title: "Aritmetika Dasar dan Komputasi Cepat",
    title: "Persentase dan Perubahan Nilai",
    micro_syllabus_scope: [
      "Menghitung nilai persentase dari suatu total.",
      "Menghitung persentase kenaikan (pertumbuhan) dan persentase penurunan (penyusutan) antarperiode.",
      "Selisih poin persentase vs persentase perubahan relatif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.2.json"
  },
  {
    id: "pu-3.2.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.2",
    subchapter_title: "Aritmetika Dasar dan Komputasi Cepat",
    title: "Rasio, Proporsi, dan Perbandingan",
    micro_syllabus_scope: [
      "Perbandingan Senilai (lurus).",
      "Perbandingan Berbalik Nilai (terbalik).",
      "Perbandingan Campuran / Tiga Variabel (misal: jumlah pekerja, waktu pengerjaan, dan target volume pekerjaan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.3.json"
  },
  {
    id: "pu-3.2.4",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.2",
    subchapter_title: "Aritmetika Dasar dan Komputasi Cepat",
    title: "Aritmetika Kontekstual Sederhana",
    micro_syllabus_scope: [
      "Kecepatan, Jarak, dan Waktu (susul-menyusul dan berpapasan dasar).",
      "Debit, Volume, dan Waktu pengisian/pengosongan.",
      "Harga jual, harga beli, persentase untung/rugi, dan diskon tunggal."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.4.json"
  },

  // 3.3. Interpretasi Data (Tabel, Grafik, dan Infografis)
  {
    id: "pu-3.3.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, dan Infografis)",
    title: "Pembacaan dan Ekstraksi Data Visual",
    micro_syllabus_scope: [
      "Tabel Data (satu arah dan tabel silang/dua arah).",
      "Grafik Garis (Line Chart) — analisis tren waktu (fluktuatif, monoton naik/turun, gradien kenaikan paling curam).",
      "Diagram Batang (Bar Chart) — komparasi nilai antarkategori atau antartahun.",
      "Diagram Lingkaran (Pie Chart) — konversi proporsi derajat (°) dan persentase (%) ke nilai riil."
    ],
    requires_svg: true, // Visual data grafik garis, diagram batang, pie chart
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.1.json"
  },
  {
    id: "pu-3.3.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, dan Infografis)",
    title: "Analisis Statistik Deskriptif pada Data Grafik",
    micro_syllabus_scope: [
      "Menghitung rata-rata (mean) dari data pada grafik/tabel.",
      "Menentukan nilai tengah (median), nilai terbanyak (modus), dan rentang (range) secara cepat."
    ],
    requires_svg: true, // Visual data statistik grafik
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.2.json"
  },
  {
    id: "pu-3.3.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, dan Infografis)",
    title: "Prediksi dan Simpulan Berbasis Data (Forecasting & Trend Analysis)",
    micro_syllabus_scope: [
      "Ekstrapolasi tren: memprediksi nilai pada periode berikutnya jika laju perubahan diasumsikan konstan.",
      "Menguji kesesuaian klaim di dalam paragraf dengan bukti angka yang tertera pada grafik/tabel."
    ],
    requires_svg: true, // Visualisasi tren data ekstrapolasi
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.3.json"
  }
];

// Read existing tracker data
let trackerData = { items: [] };
if (fs.existsSync(trackerPath)) {
  try {
    const raw = fs.readFileSync(trackerPath, 'utf8');
    trackerData = JSON.parse(raw);
    if (!Array.isArray(trackerData.items)) {
      trackerData.items = [];
    }
  } catch (err) {
    console.warn('Gagal membaca tracker.');
    trackerData = { items: [] };
  }
}

// Filter out old PU items and replace with new PU items
const nonPuItems = trackerData.items.filter(item => item.subtest !== 'PU');
const mergedItems = [...newPuItems, ...nonPuItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary calculations
const chapters = new Set(newPuItems.map(item => item.chapter_num));
const subchapters = new Set(newPuItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = newPuItems.length;
const requiresSvgCount = newPuItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil mengganti seluruh isi PU dengan silabus baru!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi baru PU: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
