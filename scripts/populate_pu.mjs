import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const puItems = [
  // ==========================================
  // BAB 1: PENALARAN INDUKTIF
  // ==========================================
  // 1.1. Generalisasi (Penarikan Kesimpulan Umum)
  {
    id: "pu-1.1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Penarikan Kesimpulan Umum)",
    title: "Konsep Dasar Generalisasi",
    micro_syllabus_scope: [
      "Definisi premis khusus (sampel/fakta) dan konklusi umum (populasi).",
      "Perbedaan kesimpulan pasti benar (deduktif) vs mungkin benar / paling mungkin benar (induktif).",
      "Kata kunci penanda kesimpulan induktif: \"sebagian besar\", \"cenderung\", \"berpotensi\", \"kemungkinan\", \"pada umumnya\"."
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
    subchapter_title: "Generalisasi (Penarikan Kesimpulan Umum)",
    title: "Jenis-Jenis Generalisasi",
    micro_syllabus_scope: [
      "Generalisasi Sempurna (Lengkap): Pengamatan dilakukan pada seluruh anggota populasi.",
      "Generalisasi Sempurna (Lengkap): Tingkat kepastian kesimpulan mendekati 100%.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Pengamatan dilakukan pada sebagian sampel yang mewakili populasi.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Analisis keterwakilan sampel terhadap populasi.",
      "Generalisasi Statistik vs Kualitatif: Generalisasi berbasis angka/persentase survei.",
      "Generalisasi Statistik vs Kualitatif: Generalisasi berbasis fenomena sosial/saintifik."
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
    subchapter_title: "Generalisasi (Penarikan Kesimpulan Umum)",
    title: "Syarat & Pengujian Validitas Generalisasi",
    micro_syllabus_scope: [
      "Kecukupan jumlah sampel (Sample Size Adequacy).",
      "Variasi dan keterwakilan sampel (Representativeness).",
      "Penanganan pengecualian (Outliers / kasus khusus)."
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
    subchapter_title: "Generalisasi (Penarikan Kesimpulan Umum)",
    title: "Cacat Logika dalam Generalisasi (Fallacies)",
    micro_syllabus_scope: [
      "Hasty Generalization (Generalisasi Terburu-buru: sampel terlalu sedikit).",
      "Unrepresentative Sample (Sampel Bias / tidak mewakili).",
      "Overgeneralization (Penggunaan kata \"semua/selalu/pasti\" pada data yang hanya menunjukkan tren sebagian)."
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
    subchapter_title: "Generalisasi (Penarikan Kesimpulan Umum)",
    title: "Tipe Soal UTBK pada Sub-bab Generalisasi",
    micro_syllabus_scope: [
      "Menentukan simpulan yang paling mungkin benar dari rentetan fakta.",
      "Menilai kualitas simpulan (Pernyataan: \"Simpulan tersebut pasti benar / mungkin benar / pasti salah / tidak relevan / tidak dapat dinilai\").",
      "Menentukan fakta tambahan yang dibutuhkan agar generalisasi menjadi lebih kuat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.1.5.json"
  },

  // 1.2. Analogi (Kesetaraan Pola dan Hubungan)
  {
    id: "pu-1.2.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Analogi (Kesetaraan Pola dan Hubungan)",
    title: "Konsep Dasar Penalaran Analogi",
    micro_syllabus_scope: [
      "Pemetaan kesamaan struktur/fungsi/sifat antara dua entitas berbeda (Entitas A dan Entitas B).",
      "Prinsip inferensi: Jika A dan B memiliki kesamaan pada sifat $x, y, z$, dan A memiliki sifat $w$, maka B kemungkinan juga memiliki sifat $w$."
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
    subchapter_title: "Analogi (Kesetaraan Pola dan Hubungan)",
    title: "Jenis-Jenis Analogi",
    micro_syllabus_scope: [
      "Analogi Induktif (Logis/Argumentatif): Membandingkan dua kasus/fenomena dalam paragraf untuk menarik kesimpulan serupa.",
      "Analogi Induktif (Logis/Argumentatif): Analogi mekanisme kerja (misal: sistem imun tubuh dianalogikan dengan sistem pertahanan negara).",
      "Analogi Verbal / Relasi Konsep: Relasi fungsi, relasi bagian-keseluruhan (part-whole), relasi sebab-akibat, relasi derajat/intensitas, relasi urutan proses.",
      "Analogi Deklaratif (Penjelas): Penggunaan kiasan untuk mempermudah pemahaman konsep abstrak dalam teks."
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
    subchapter_title: "Analogi (Kesetaraan Pola dan Hubungan)",
    title: "Evaluasi Kekuatan & Cacat Analogi",
    micro_syllabus_scope: [
      "Relevansi kemiripan (apakah sifat yang dibandingkan relevan dengan kesimpulan?).",
      "Jumlah kemiripan vs jumlah perbedaan mendasar antara kedua objek.",
      "False Analogy (Analogi Palsu/Lemah: membandingkan dua hal yang tampak mirip di permukaan tetapi berbeda secara prinsip dasar)."
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
    subchapter_title: "Analogi (Kesetaraan Pola dan Hubungan)",
    title: "Tipe Soal UTBK pada Sub-bab Analogi",
    micro_syllabus_scope: [
      "Menentukan kejadian/fenomena lain yang memiliki pola penalaran identik dengan bacaan (Parallel Reasoning).",
      "Melengkapi kesimpulan berdasarkan perbandingan dua kasus dalam teks.",
      "Mengidentifikasi kelemahan argumen yang menggunakan analogi tidak tepat."
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
    title: "Konsep Dasar Kausalitas",
    micro_syllabus_scope: [
      "Identifikasi variabel penyebab (Cause/Independent) dan variabel akibat (Effect/Dependent).",
      "Penanda linguistik kausalitas: \"disebabkan oleh\", \"memicu\", \"berdampak pada\", \"akibatnya\", \"berkontribusi terhadap\", \"karena\"."
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
    title: "Pola Directionality (Arah Hubungan Kausal)",
    micro_syllabus_scope: [
      "Sebab ke Akibat (Cause to Effect): Diketahui pemicu, dicari dampak logisnya.",
      "Akibat ke Sebab (Effect to Cause): Diketahui fenomena/masalah akhir, dicari akar penyebabnya (diagnostik).",
      "Rantai Kausalitas (Causal Chain): $A \\rightarrow B \\rightarrow C \\rightarrow D$ (sebab awal memicu akibat antara hingga akibat akhir).",
      "Multi-Sebab & Multi-Akibat: Satu kejadian dipicu banyak faktor (penyebab utama vs penyebab pendukung) atau satu penyebab menimbulkan banyak dampak."
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
    title: "Metode Penentuan Kausalitas (Metode John Stuart Mill)",
    micro_syllabus_scope: [
      "Method of Agreement (Metode Persamaan: mencari satu faktor yang selalu hadir saat akibat terjadi).",
      "Method of Difference (Metode Perbedaan: membandingkan kondisi saat faktor ada vs tidak ada).",
      "Concomitant Variations (Variasi Seiring: jika $X$ naik maka $Y$ naik, atau jika $X$ naik maka $Y$ turun)."
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
    title: "Korelasi vs Kausalitas & Cacat Logika Kausal",
    micro_syllabus_scope: [
      "Perbedaan korelasi (terjadi bersamaan/beriringan) dengan kausalitas (satu menyebabkan yang lain).",
      "Post Hoc Ergo Propter Hoc ($A$ terjadi sebelum $B$, maka $A$ dianggap penyebab $B$ — padahal hanya urutan waktu).",
      "Cum Hoc Ergo Propter Hoc ($A$ dan $B$ terjadi bersamaan, maka dianggap saling menyebabkan — padahal ada faktor ketiga / confounding variable $C$).",
      "Reversed Causality (Terbalik antara sebab dan akibat).",
      "Slippery Slope (Asumsi rantai akibat ekstrem tanpa bukti memadai)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.4.json"
  },
  {
    id: "pu-1.3.5",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Kausalitas (Sebab-Akibat)",
    title: "Tipe Soal UTBK pada Sub-bab Kausalitas",
    micro_syllabus_scope: [
      "Evaluasi dua pernyataan (Pernyataan A dan Pernyataan B): A adalah penyebab dan B adalah akibat.",
      "Evaluasi dua pernyataan (Pernyataan A dan Pernyataan B): B adalah penyebab dan A adalah akibat.",
      "Evaluasi dua pernyataan (Pernyataan A dan Pernyataan B): A dan B adalah penyebab, namun tidak saling berhubungan.",
      "Evaluasi dua pernyataan (Pernyataan A dan Pernyataan B): A dan B adalah akibat dari dua penyebab yang tidak saling berhubungan.",
      "Evaluasi dua pernyataan (Pernyataan A dan Pernyataan B): A dan B adalah akibat dari suatu penyebab yang sama.",
      "Menentukan penyebab paling mungkin dari suatu fenomena baru di dalam wacana."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.5.json"
  },

  // ==========================================
  // BAB 2: PENALARAN DEDUKTIF
  // ==========================================
  // 2.1. Logika Proposisi (Logika Kalimat)
  {
    id: "pu-2.1.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi (Logika Kalimat)",
    title: "Konsep Dasar Proposisi",
    micro_syllabus_scope: [
      "Pengertian proposisi (kalimat deklaratif yang bernilai Benar atau Salah, bukan kalimat tanya/perintah).",
      "Proposisi atomik (tunggal) vs proposisi majemuk."
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
    subchapter_title: "Logika Proposisi (Logika Kalimat)",
    title: "Operator Logika & Tabel Kebenaran",
    micro_syllabus_scope: [
      "Negasi / Ingkaran ($\\sim p$): Pembalikan nilai kebenaran.",
      "Konjungsi ($p \\land q$): Kata hubung \"dan\", \"tetapi\", \"meskipun\", \"sedangkan\".",
      "Disjungsi ($p \\lor q$): Kata hubung \"atau\" (Inklusif vs Eksklusif).",
      "Implikasi ($p \\rightarrow q$): Hubungan \"Jika $p$, maka $q$\" (Anteseden/Sebab $\\rightarrow$ Konsekuen/Akibat).",
      "Variasi bahasa alami implikasi: \"$p$ mengakibatkan $q$\", \"$q$ jika $p$\", \"$p$ hanya jika $q$\", \"Syarat cukup bagi $q$ adalah $p$\", \"Syarat perlu bagi $p$ adalah $q$\", \"Tanpa $q$ tidak ada $p$\" ($\\sim q \\rightarrow \\sim p$).",
      "Biimplikasi ($p \\leftrightarrow q$): Hubungan \"Jika dan hanya jika\" (Syarat perlu dan cukup)."
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
    subchapter_title: "Logika Proposisi (Logika Kalimat)",
    title: "Ekuivalensi Logis & Hukum Aljabar Proposisi",
    micro_syllabus_scope: [
      "Hukum De Morgan: $\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$ dan $\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$.",
      "Ekuivalensi Implikasi (Kalimat Setara) Kontraposisi: $(p \\rightarrow q) \\equiv (\\sim q \\rightarrow \\sim p)$ (Sangat sering keluar di UTBK).",
      "Ekuivalensi Implikasi Bentuk Disjungsi: $(p \\rightarrow q) \\equiv (\\sim p \\lor q)$.",
      "Negasi dari Implikasi: $\\sim(p \\rightarrow q) \\equiv p \\land \\sim q$ (Bukan $p \\rightarrow \\sim q$).",
      "Konvers dan Invers (Tidak Ekuivalen dengan Implikasi Awal): Konvers $q \\rightarrow p$, Invers $\\sim p \\rightarrow \\sim q$ (Konvers $\\equiv$ Invers)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.3.json"
  },

  // 2.2. Aturan Inferensi & Silogisme (Penarikan Kesimpulan)
  {
    id: "pu-2.2.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Aturan Inferensi & Silogisme (Penarikan Kesimpulan)",
    title: "Silogisme Hipotesik / Kondisional",
    micro_syllabus_scope: [
      "Modus Ponens (Penegasan Anteseden): Premis 1: $p \\rightarrow q$, Premis 2: $p$, Kesimpulan: $\\therefore q$.",
      "Modus Tollens (Penyangkalan Konsekuen): Premis 1: $p \\rightarrow q$, Premis 2: $\\sim q$, Kesimpulan: $\\therefore \\sim p$.",
      "Silogisme Hipotesik (Sifat Transitif/Berantai): Premis 1: $p \\rightarrow q$, Premis 2: $q \\rightarrow r$, Kesimpulan: $\\therefore p \\rightarrow r$ (atau ekuivalennya: $\\sim r \\rightarrow \\sim p$ atau $\\sim p \\lor r$)."
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
    subchapter_title: "Aturan Inferensi & Silogisme (Penarikan Kesimpulan)",
    title: "Silogisme Disjungtif & Dilema",
    micro_syllabus_scope: [
      "Silogisme Disjungtif: Premis 1: $p \\lor q$, Premis 2: $\\sim p$, Kesimpulan: $\\therefore q$.",
      "Dilema Konstruktif: Premis 1: $(p \\rightarrow q) \\land (r \\rightarrow s)$, Premis 2: $p \\lor r$, Kesimpulan: $\\therefore q \\lor s$.",
      "Dilema Destruktif: Premis 1: $(p \\rightarrow q) \\land (r \\rightarrow s)$, Premis 2: $\\sim q \\lor \\sim s$, Kesimpulan: $\\therefore \\sim p \\lor \\sim r$."
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
    subchapter_title: "Aturan Inferensi & Silogisme (Penarikan Kesimpulan)",
    title: "Kesalahan Inferensi Formal (Formal Fallacies — Jebakan Soal UTBK)",
    micro_syllabus_scope: [
      "Affirming the Consequent (Menegaskan Akibat): Diketahui $p \\rightarrow q$ dan terjadi $q$, lalu disimpulkan $p$ (Kesimpulan TIDAK SAH / Tidak Dapat Disimpulkan).",
      "Denying the Antecedent (Menyangkal Sebab): Diketahui $p \\rightarrow q$ dan terjadi $\\sim p$, lalu disimpulkan $\\sim q$ (Kesimpulan TIDAK SAH)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.3.json"
  },
  {
    id: "pu-2.2.4",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Aturan Inferensi & Silogisme (Penarikan Kesimpulan)",
    title: "Silogisme Kategorik",
    micro_syllabus_scope: [
      "Struktur proposisi kategorik (Subjek, Predikat, Kopula, Kuantor).",
      "Term Tengah (Middle Term - $M$), Term Subjek ($S$), Term Predikat ($P$).",
      "Hukum-hukum penarikan kesimpulan silogisme kategorik: Jika salah satu premis partikular (sebagian), kesimpulan harus partikular.",
      "Hukum-hukum penarikan kesimpulan silogisme kategorik: Jika salah satu premis negatif (tidak), kesimpulan harus negatif.",
      "Hukum-hukum penarikan kesimpulan silogisme kategorik: Dari dua premis partikular tidak dapat ditarik kesimpulan pasti.",
      "Hukum-hukum penarikan kesimpulan silogisme kategorik: Dari dua premis negatif tidak dapat ditarik kesimpulan."
    ],
    requires_svg: true, // Hubungan himpunan logika / diagram silogisme kategorik
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.4.json"
  },

  // 2.3. Logika Kuantor (Kuantifikasi)
  {
    id: "pu-2.3.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Logika Kuantor (Kuantifikasi)",
    title: "Jenis-Jenis Kuantor",
    micro_syllabus_scope: [
      "Kuantor Universal ($\\forall$): \"Semua\", \"Setiap\", \"Seluruh\", \"Tidak ada satupun ... yang tidak ...\", \"Siapapun\".",
      "Kuantor Eksistensial ($\\exists$): \"Sebagian\", \"Beberapa\", \"Ada\", \"Terdapat\", \"Sementara\", \"Tidak semua\".",
      "Kuantor Negatif Universal: \"Tidak ada $A$ yang merupakan $B$\" ($\\equiv$ Semua $A$ bukan $B$)."
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
    subchapter_title: "Logika Kuantor (Kuantifikasi)",
    title: "Negasi (Ingkaran) Berkuantor",
    micro_syllabus_scope: [
      "Ingkaran \"Semua $A$ adalah $B$\" $\\rightarrow$ \"Ada/Beberapa $A$ yang bukan $B$\" (atau \"Tidak semua $A$ adalah $B$\").",
      "Ingkaran \"Beberapa $A$ adalah $B$\" $\\rightarrow$ \"Semua $A$ bukan $B$\" (atau \"Tidak ada $A$ yang merupakan $B$\")."
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
    subchapter_title: "Logika Kuantor (Kuantifikasi)",
    title: "Representasi Diagram Venn untuk Logika Kuantor",
    micro_syllabus_scope: [
      "Himpunan bagian (Semua $A$ adalah $B \\rightarrow A \\subset B$).",
      "Himpunan beririsan (Sebagian $A$ adalah $B \\rightarrow A \\cap B \\neq \\emptyset$).",
      "Himpunan saling lepas (Tidak ada $A$ yang $B \\rightarrow A \\cap B = \\emptyset$).",
      "Analisis area ketidakpastian (mengapa dari \"Semua $A$ adalah $B$\" dan \"Sebagian $B$ adalah $C$\" tidak bisa disimpulkan pasti bahwa \"Sebagian $A$ adalah $C$\")."
    ],
    requires_svg: true, // Diagram Venn & Himpunan
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.3.json"
  },
  {
    id: "pu-2.3.4",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Logika Kuantor (Kuantifikasi)",
    title: "Kombinasi Kuantor dan Implikasi",
    micro_syllabus_scope: [
      "Penerjemahan kalimat berkuantor menjadi bentuk implikasi: \"Semua $x$, jika $P(x)$ maka $Q(x)$\"."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.4.json"
  },

  // 2.4. Penalaran Analitik (Analytical Reasoning)
  {
    id: "pu-2.4.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning)",
    title: "Permasalahan Urutan & Peringkat (Ordering & Ranking)",
    micro_syllabus_scope: [
      "Urutan linier satu dimensi (skor ujian, tinggi badan, urutan kedatangan, antrean).",
      "Penggunaan tanda ketaksamaan ($>, <, \\ge, \\le$) dan rentang kemungkinan posisi."
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
    subchapter_title: "Penalaran Analitik (Analytical Reasoning)",
    title: "Permasalahan Posisi & Tata Letak (Spatial & Seating Arrangement)",
    micro_syllabus_scope: [
      "Susunan Linier / Sebaris: Duduk berjajar, posisi rumah di satu sisi/dua sisi jalan, susunan buku di rak.",
      "Susunan Melingkar (Circular Arrangement): Duduk mengelilingi meja bundar (konsep berhadapan, bersebelahan kiri/kanan).",
      "Susunan Matriks / Lantai Gedung: Penempatan ruangan di gedung bertingkat."
    ],
    requires_svg: true, // Denah meja bundar, susunan lantai gedung
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.2.json"
  },
  {
    id: "pu-2.4.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning)",
    title: "Permasalahan Penjadwalan & Kombinasi Kelompok (Scheduling & Grouping)",
    micro_syllabus_scope: [
      "Pemilihan anggota tim/komite dengan syarat inklusi (\"Jika A dipilih, maka B harus dipilih\") dan syarat eksklusi (\"C tidak bisa bersama D\").",
      "Penjadwalan shift kerja, mata pelajaran, atau kunjungan hari Senin–Minggu dengan batasan kuota."
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
    subchapter_title: "Penalaran Analitik (Analytical Reasoning)",
    title: "Permasalahan Relasi & Jaringan (Network, Blood Relations, & Routing)",
    micro_syllabus_scope: [
      "Silsilah keluarga (hubungan darah/pernikahan).",
      "Rute perjalanan satu arah / dua arah antar kota (graf berarah)."
    ],
    requires_svg: true, // Graf rute perjalanan & bagan silsilah keluarga
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.4.json"
  },
  {
    id: "pu-2.4.5",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.4",
    subchapter_title: "Penalaran Analitik (Analytical Reasoning)",
    title: "Strategi Penyelesaian Cepat Soal Analitik",
    micro_syllabus_scope: [
      "Teknik eliminasi opsi jawaban berdasarkan syarat mutlak (Absolute Constraints).",
      "Pembuatan tabel matriks silang (Cross-hatch Grid)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.4.5.json"
  },

  // 2.5. Evaluasi Argumen & Penalaran Kritis (Critical Reasoning)
  {
    id: "pu-2.5.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen & Penalaran Kritis (Critical Reasoning)",
    title: "Anatomi Argumen dalam Wacana",
    micro_syllabus_scope: [
      "Membedakan Fakta/Bukti (Premise/Evidence), Opini, Asumsi, dan Klaim/Kesimpulan Utama (Conclusion)."
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
    subchapter_title: "Evaluasi Argumen & Penalaran Kritis (Critical Reasoning)",
    title: "Memperkuat & Memperlemah Argumen (Strengthening & Weakening)",
    micro_syllabus_scope: [
      "Memperkuat (Strengthen): Menambahkan bukti pendukung baru, memvalidasi asumsi dasar penulis, atau menghilangkan kemungkinan penyebab alternatif.",
      "Memperlemah (Weaken): Menunjukkan celah logika, menghadirkan counter-example (contoh penyangkal), menunjukkan adanya variabel pengganggu (confounding factor), atau meruntuhkan asumsi dasar."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.1.json".replace("2.5.1", "2.5.2")
  },
  {
    id: "pu-2.5.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.5",
    subchapter_title: "Evaluasi Argumen & Penalaran Kritis (Critical Reasoning)",
    title: "Identifikasi Asumsi (Assumption Questions)",
    micro_syllabus_scope: [
      "Asumsi jembatan (Bridge Assumption): pernyataan tidak tertulis yang menghubungkan premis dengan kesimpulan.",
      "Negation Test (Uji Negasi): jika asumsi dinegasikan, maka argumen penulis runtuh."
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
    subchapter_title: "Evaluasi Argumen & Penalaran Kritis (Critical Reasoning)",
    title: "Evaluasi Kebenaran & Kesesuaian Pernyataan (Statement Verification)",
    micro_syllabus_scope: [
      "Menentukan pernyataan yang Pasti Benar vs Pasti Salah berdasarkan teks.",
      "Menentukan apakah informasi yang diberikan Cukup atau Tidak Cukup untuk menjawab pertanyaan spesifik.",
      "Menjelaskan paradoks (Resolve the Paradox: mencari fakta yang mendamaikan dua pernyataan dalam teks yang tampak bertentangan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.5.4.json"
  },

  // ==========================================
  // BAB 3: PENALARAN KUANTITATIF (DALAM SUBTES PU)
  // ==========================================
  // 3.1. Pola Bilangan, Barisan, dan Deret
  {
    id: "pu-3.1.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.1",
    subchapter_title: "Pola Bilangan, Barisan, dan Deret",
    title: "Pola Barisan Bilangan",
    micro_syllabus_scope: [
      "Pola satu larik (reguler): penjumlahan, pengurangan, perkalian, pembagian, perpangkatan.",
      "Pola bertingkat (selisih tingkat 2 atau tingkat 3).",
      "Pola lompat (Alternating/Interleaved Series): larik ganjil-genap (lompat 1, lompat 2, atau dikelompokkan per 3 suku).",
      "Pola Fibonacci & modifikasinya (suku berikutnya adalah hasil operasi dua/tiga suku sebelumnya).",
      "Pola pecahan (pola tersendiri pada pembilang dan penyebut)."
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
    subchapter_title: "Pola Bilangan, Barisan, dan Deret",
    title: "Pola Huruf / Alfabet",
    micro_syllabus_scope: [
      "Konversi huruf ke urutan angka ($A=1, B=2, \\dots, Z=26$).",
      "Pola maju-mundur alfabet dan kombinasi angka-huruf."
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
    subchapter_title: "Pola Bilangan, Barisan, dan Deret",
    title: "Pola Bilangan dalam Bentuk Gambar / Matriks (Aritmetika Visual)",
    micro_syllabus_scope: [
      "Operasi bilangan di dalam bangun datar (segitiga, lingkaran, kotak) untuk mencari nilai $X$ di tengah.",
      "Pola baris dan kolom pada matriks angka $3 \\times 3$ atau $4 \\times 4$."
    ],
    requires_svg: true, // Bangun datar geometri & matriks angka bergambar
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.1.3.json"
  },

  // 3.2. Operasi Hitung & Estimasi Cepat (Aritmetika Dasar)
  {
    id: "pu-3.2.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.2",
    subchapter_title: "Operasi Hitung & Estimasi Cepat (Aritmetika Dasar)",
    title: "Operasi Bilangan Real",
    micro_syllabus_scope: [
      "Operasi bilangan bulat, pecahan biasa, pecahan campuran, desimal, dan persen.",
      "Sifat distributif, asosiatif, dan komutatif untuk penyederhanaan hitung cepat (misal: $a^2 - b^2 = (a+b)(a-b)$)."
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
    subchapter_title: "Operasi Hitung & Estimasi Cepat (Aritmetika Dasar)",
    title: "Teknik Aproksimasi / Estimasi Numerik",
    micro_syllabus_scope: [
      "Pembulatan angka untuk membandingkan nilai pecahan besar (misal: membandingkan $\\frac{17}{35}$ dengan $\\frac{23}{45}$).",
      "Estimasi persentase cepat ($10\\%, 5\\%, 1\\%, 25\\%, 33{,}3\\%$)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.2.json"
  },

  // 3.3. Rasio, Proporsi, dan Aritmetika Kontekstual Sederhana
  {
    id: "pu-3.3.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Rasio, Proporsi, dan Aritmetika Kontekstual Sederhana",
    title: "Perbandingan (Proporsi)",
    micro_syllabus_scope: [
      "Perbandingan Senilai ($A_1/B_1 = A_2/B_2$).",
      "Perbandingan Berbalik Nilai ($A_1 \\times B_1 = A_2 \\times B_2$ — kasus jumlah pekerja vs waktu selesai).",
      "Perbandingan Gabungan (3 variabel: misal jumlah mesin, jumlah produksi, dan waktu)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.1.json"
  },
  {
    id: "pu-3.3.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Rasio, Proporsi, dan Aritmetika Kontekstual Sederhana",
    title: "Persentase & Perubahan Nilai",
    micro_syllabus_scope: [
      "Menghitung persentase kenaikan/penurunan: $\\frac{\\text{Selisih}}{\\text{Nilai Awal}} \\times 100\\%$.",
      "Diskon, pajak, untung/rugi dasar, dan komposisi campuran (kadar zat/larutan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.2.json"
  },
  {
    id: "pu-3.3.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.3",
    subchapter_title: "Rasio, Proporsi, dan Aritmetika Kontekstual Sederhana",
    title: "Kecepatan, Jarak, Waktu, dan Debit",
    micro_syllabus_scope: [
      "Konsep dasar $v = s/t$, waktu berpapasan, dan waktu menyusul sederhana.",
      "Laju kerja gabungan ($\\frac{1}{T_{\\text{total}}} = \\frac{1}{T_A} + \\frac{1}{T_B}$)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.3.json"
  },

  // 3.4. Interpretasi Data (Tabel, Grafik, Diagram, dan Infografis)
  {
    id: "pu-3.4.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.4",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, Diagram, dan Infografis)",
    title: "Jenis Visualisasi Data",
    micro_syllabus_scope: [
      "Tabel Data & Tabel Silang (Crosstab): Membaca baris, kolom, total, dan selisih antar kategori.",
      "Grafik Garis (Line Chart): Menganalisis tren waktu (time-series), kemiringan garis (laju kenaikan/penurunan paling tajam), dan fluktuasi.",
      "Diagram Batang (Bar Chart): Tunggal, majemuk (grouped), dan bertumpuk (stacked bar chart).",
      "Diagram Lingkaran (Pie Chart): Konversi sudut derajat ($360^\\circ$) dan persentase ($100\\%$) ke nilai aktual.",
      "Diagram Pencar (Scatter Plot) & Infografis Komposit: Membaca korelasi dua variabel dari sebaran titik."
    ],
    requires_svg: true, // Statistika visual, grafik garis, diagram batang, diagram lingkaran
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.4.1.json"
  },
  {
    id: "pu-3.4.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.4",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, Diagram, dan Infografis)",
    title: "Analisis Statistik Deskriptif pada Grafik",
    micro_syllabus_scope: [
      "Menghitung rata-rata (mean) dari grafik batang/garis.",
      "Menentukan nilai tengah (median), modus, dan rentang (range) dari visualisasi data.",
      "Menentukan periode dengan kenaikan jumlah terbesar vs persentase kenaikan terbesar (Jebakan klasik UTBK)."
    ],
    requires_svg: true, // Visualisasi data & grafik statistik
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.4.2.json"
  },
  {
    id: "pu-3.4.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif (dalam Subtes PU)",
    subchapter_num: "3.4",
    subchapter_title: "Interpretasi Data (Tabel, Grafik, Diagram, dan Infografis)",
    title: "Prediksi & Ekstrapolasi Data (Forecasting)",
    micro_syllabus_scope: [
      "Memprediksi nilai pada periode berikutnya apabila tren kenaikan/penurunan diasumsikan konstan.",
      "Menguji kesesuaian pernyataan teks dengan data pada grafik."
    ],
    requires_svg: true, // Grafik tren peramalan/ekstrapolasi
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.4.3.json"
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
    console.warn('Gagal membaca file tracker eksisting, inisialisasi baru.');
    trackerData = { items: [] };
  }
}

// Filter out existing PU items to prevent duplicates while preserving other subtests
const nonPuItems = trackerData.items.filter(item => item.subtest !== 'PU');
const mergedItems = [...nonPuItems, ...puItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(puItems.map(item => item.chapter_num));
const subchapters = new Set(puItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = puItems.length;
const requiresSvgCount = puItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes PU!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker: ${trackerData.items.length}`);
