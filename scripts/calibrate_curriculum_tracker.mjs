import fs from 'fs';
import path from 'path';

const trackerPath = path.resolve('data/curriculum_tracker.json');

// Definisi Kurikulum Ramping Linear UTBK-SNBT (Pusmendik Exam-Aligned)
const calibratedSyllabus = [
  // ==========================================
  // SUBTES 1: PENALARAN UMUM (PU)
  // ==========================================
  // Bab 1: Penalaran Induktif
  {
    id: "pu-1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Kesesuaian Pernyataan & Simpulan Teks",
    title: "Kesesuaian Pernyataan & Simpulan Teks (Pasti Benar, Mungkin Benar, & Kualitas Simpulan)",
    required_question_variations: [
      "Archetype Soal: Pernyataan yang PASTI BENAR berdasarkan wacana",
      "Archetype Soal: Pernyataan yang PASTI SALAH berdasarkan wacana",
      "Archetype Soal: Simpulan yang PALING MUNGKIN BENAR dari data empiris",
      "Archetype Soal: Penilaian KUALITAS SIMPULAN (Pasti Benar / Mungkin Benar / Pasti Salah / Tidak Dapat Dinilai)",
      "Archetype Soal: Tabel Kompleks 5 Pernyataan (Benar / Salah)"
    ],
    requires_svg: false,
    material_status: "done",
    output_path: "/content/utbk/pu/pu-1.1.json"
  },
  {
    id: "pu-1.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Evaluasi Argumen & Kausalitas",
    title: "Evaluasi Argumen & Kausalitas (Memperkuat, Memperlemah, & Asumsi Implisit)",
    required_question_variations: [
      "Archetype Soal: Pernyataan yang PALING MEMPERLEMAH argumen/hipotesis pakar",
      "Archetype Soal: Pernyataan yang PALING MEMPERKUAT argumen/hipotesis pakar",
      "Archetype Soal: Tabel Kompleks 5 Pernyataan (Memperkuat / Tidak Memperkuat)",
      "Archetype Soal: Asumsi yang mendasari kesimpulan penulis",
      "Archetype Soal: Menguji kesahihan hubungan sebab-akibat (korelasi vs kausalitas)"
    ],
    requires_svg: false,
    material_status: "done",
    output_path: "/content/utbk/pu/pu-1.2.json"
  },
  {
    id: "pu-1.3",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.3",
    subchapter_title: "Interpretasi Data Visual & Infografis",
    title: "Interpretasi Data Visual (Tabel, Grafik Batang/Garis Ganda, & Infografis)",
    required_question_variations: [
      "Archetype Soal: Simpulan yang paling didukung oleh tren grafik/tabel",
      "Archetype Soal: Pernyataan yang tidak sesuai dengan data grafik",
      "Archetype Soal: Proyeksi nilai periode berikutnya berdasarkan tren grafik"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-1.3.json"
  },

  // Bab 2: Penalaran Deduktif
  {
    id: "pu-2.1",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.1",
    subchapter_title: "Logika Proposisi & Silogisme",
    title: "Logika Proposisi (Implikasi, Ekuivalensi, Negasi, & Silogisme)",
    required_question_variations: [
      "Archetype Soal: Penarikan kesimpulan silogisme 2-3 premis bersyarat",
      "Archetype Soal: Menentukan ekuivalensi bentuk implikasi (~q -> ~p)",
      "Archetype Soal: Ingkaran/negasi dari pernyataan majemuk bersyarat"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.1.json"
  },
  {
    id: "pu-2.2",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.2",
    subchapter_title: "Logika Kuantor & Diagram Himpunan",
    title: "Logika Kuantor & Diagram Himpunan (Semua, Sebagian, & Ingkarannya)",
    required_question_variations: [
      "Archetype Soal: Silogisme kategorik kuantor universal (Semua) dan partikular (Sebagian)",
      "Archetype Soal: Ingkaran dari pernyataan berkuantor",
      "Archetype Soal: Relasi diagram Venn tiga himpunan kategori"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.2.json"
  },
  {
    id: "pu-2.3",
    subtest: "PU",
    chapter_num: 2,
    chapter_title: "Penalaran Deduktif",
    subchapter_num: "2.3",
    subchapter_title: "Penalaran Analitis & Kondisional",
    title: "Penalaran Analitis (Urutan Posisi, Penjadwalan, & Kombinasi Syarat)",
    required_question_variations: [
      "Archetype Soal: Urutan peringkat/posisi duduk melingkar atau berjajar",
      "Archetype Soal: Penjadwalan giliran piket/presentasi dengan batasan syarat",
      "Archetype Soal: Pemilihan anggota tim berdasarkan kriteria saling menolak"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-2.3.json"
  },

  // Bab 3: Penalaran Kuantitatif
  {
    id: "pu-3.1",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif",
    subchapter_num: "3.1",
    subchapter_title: "Pola Barisan & Operasi Aritmetika Cepat",
    title: "Pola Barisan Bilangan, Huruf, & Operasi Aritmetika Cepat",
    required_question_variations: [
      "Archetype Soal: Barisan bilangan pola loncat 2 atau bertingkat",
      "Archetype Soal: Pola barisan alfabet dan alfanumerik",
      "Archetype Soal: Pola bilangan dalam gambar/bentuk geometri",
      "Archetype Soal: Estimasi operasi hitung cepat pecahan & desimal"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.1.json"
  },
  {
    id: "pu-3.2",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif",
    subchapter_num: "3.2",
    subchapter_title: "Perbandingan & Aritmetika Kontekstual",
    title: "Perbandingan Senilai, Berbalik Nilai, Kecepatan, & Proporsi",
    required_question_variations: [
      "Archetype Soal: Masalah pekerja tambahan pada proyek terhenti",
      "Archetype Soal: Laju kerja gabungan dan debit tangki",
      "Archetype Soal: Kecepatan berpapasan dan menyusul"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.2.json"
  },
  {
    id: "pu-3.3",
    subtest: "PU",
    chapter_num: 3,
    chapter_title: "Penalaran Kuantitatif",
    subchapter_num: "3.3",
    subchapter_title: "Analisis Kuantitatif Data Tabel & Grafik",
    title: "Analisis Kuantitatif Tabel & Grafik (Persentase Pertumbuhan, Rasio, & Rata-rata)",
    required_question_variations: [
      "Archetype Soal: Menghitung persentase kenaikan/penurunan terbesar antarperiode",
      "Archetype Soal: Analisis rasio komparatif antarkategori pada tabel silang",
      "Archetype Soal: Perhitungan rata-rata gabungan dari beberapa kelompok"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pu/pu-3.3.json"
  },

  // ==========================================
  // SUBTES 2: PENGETAHUAN & PEMAHAMAN UMUM (PPU)
  // ==========================================
  {
    id: "ppu-1.1",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Kosakata & Semantik Teks",
    subchapter_num: "1.1",
    subchapter_title: "Makna Kata Kontekstual & Hierarki Semantik",
    title: "Makna Kata Kontekstual, Istilah Teknis, & Hierarki Makna (Hipernim-Hiponim)",
    required_question_variations: [
      "Archetype Soal: Makna istilah bertanda kutip/tebal sesuai konteks kalimat",
      "Archetype Soal: Hubungan makna hierarkis (hipernim - hiponim)",
      "Archetype Soal: Sinonim dan antonim kontekstual"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.1.json"
  },
  {
    id: "ppu-1.2",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Kosakata & Semantik Teks",
    subchapter_num: "1.2",
    subchapter_title: "Makna Bentukan Kata & Afiksasi",
    title: "Makna Bentukan Kata & Afiksasi Khas UTBK",
    required_question_variations: [
      "Archetype Soal: Menentukan kata yang memiliki makna imbuhan yang sama",
      "Archetype Soal: Makna reduplikasi (kata ulang) sejenis",
      "Archetype Soal: Perluasan dan pergeseran makna kata (ameliorasi, peyorasi, meluas, menyempit)"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.json"
  },
  {
    id: "ppu-1.3",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Kosakata & Semantik Teks",
    subchapter_num: "1.3",
    subchapter_title: "Hubungan Pola Frasa",
    title: "Pola Bentukan Frasa (Endosentris Atributif, Koordinatif, Apositif, & Eksosentris)",
    required_question_variations: [
      "Archetype Soal: Frasa yang berpola makna sama dengan frasa pada kalimat target",
      "Archetype Soal: Identifikasi inti dan pewatas frasa kompleks"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.json"
  },
  {
    id: "ppu-2.1",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Sintaksis & Wacana Kritis",
    subchapter_num: "2.1",
    subchapter_title: "Pola Dasar Kalimat",
    title: "Pola Dasar Kalimat & Analisis Struktur Sintaksis (S-P-O-K-Pel)",
    required_question_variations: [
      "Archetype Soal: Kalimat yang memiliki pola dasar sama dengan kalimat target",
      "Archetype Soal: Menentukan fungsi sintaksis subjek atau pelengkap pada kalimat panjang"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.1.json"
  },
  {
    id: "ppu-2.2",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Sintaksis & Wacana Kritis",
    subchapter_num: "2.2",
    subchapter_title: "Kepaduan Paragraf & Gagasan Utama",
    title: "Kepaduan Paragraf & Gagasan Utama (Kalimat Sumbang & Hubungan Antarparagraf)",
    required_question_variations: [
      "Archetype Soal: Menentukan kalimat sumbang yang tidak padu dalam paragraf",
      "Archetype Soal: Gagasan pokok dan hubungan keterkaitan antarparagraf"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.2.json"
  },
  {
    id: "ppu-3.1",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Bahasa Buatan & Sandi Kripto",
    subchapter_num: "3.1",
    subchapter_title: "Logika Bahasa Panda",
    title: "Logika Bahasa Buatan & Pemecahan Pola Bahasa Panda",
    required_question_variations: [
      "Archetype Soal: Menerjemahkan frasa bahasa buatan dengan pola urutan DM vs MD",
      "Archetype Soal: Menentukan terjemahan kata baru berdasarkan afiksasi sandi bahasa buatan"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.1.json"
  },

  // ==========================================
  // SUBTES 3: PEMAHAMAN BACAAN & MENULIS (PBM)
  // ==========================================
  {
    id: "pbm-1.1",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan & Pungtuasi (EYD V)",
    subchapter_num: "1.1",
    subchapter_title: "Tanda Baca Presisi",
    title: "Tanda Baca Presisi (Koma Wajib vs Dilarang, Titik Dua, & Titik Koma)",
    required_question_variations: [
      "Archetype Soal: Penggunaan tanda koma yang TIDAK tepat pada kalimat nomor...",
      "Archetype Soal: Penggunaan tanda titik dua dan tanda hubung sesuai EYD V"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.1.json"
  },
  {
    id: "pbm-1.2",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan & Pungtuasi (EYD V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata Baku & Huruf Kapital/Miring",
    title: "Penulisan Kata Baku, Kata Depan, & Huruf Kapital/Miring (Kamus Jebakan UTBK)",
    required_question_variations: [
      "Archetype Soal: Kata bercetak tebal yang TIDAK baku dalam teks",
      "Archetype Soal: Penggunaan huruf miring dan huruf kapital sesuai EYD V",
      "Archetype Soal: Penulisan kata depan di/ke vs imbuhan di-/ke-"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.json"
  },
  {
    id: "pbm-2.1",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kalimat Efektif & Kohesi Wacana",
    subchapter_num: "2.1",
    subchapter_title: "Kalimat Efektif & Paralelisme",
    title: "Kalimat Efektif, Kelogisan Kalimat, & Paralelisme Bentuk",
    required_question_variations: [
      "Archetype Soal: Kalimat yang TIDAK efektif karena ketaksejajaran atau pleonasme",
      "Archetype Soal: Perbaikan kalimat agar menjadi kalimat efektif yang gramatikal"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.1.json"
  },
  {
    id: "pbm-2.2",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kalimat Efektif & Kohesi Wacana",
    subchapter_num: "2.2",
    subchapter_title: "Konjungsi & Kohesi Paragraf",
    title: "Konjungsi Intrakalimat, Antarkalimat, & Kelogisan Hubungan",
    required_question_variations: [
      "Archetype Soal: Konjungsi yang tepat untuk melengkapi bagian rumpang teks",
      "Archetype Soal: Perbaikan konjungsi yang salah letak atau tidak logis"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.2.json"
  },
  {
    id: "pbm-3.1",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Rekonstruksi Teks & Judul",
    subchapter_num: "3.1",
    subchapter_title: "Penggabungan Kalimat & Judul Tepat",
    title: "Penggabungan Kalimat, Rangkuman Teks, & Pemilihan Judul Tepat",
    required_question_variations: [
      "Archetype Soal: Penggabungan paling tepat untuk dua kalimat pendek",
      "Archetype Soal: Penentuan judul paling representatif bagi keseluruhan wacana"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.1.json"
  },

  // ==========================================
  // SUBTES 4: PENGETAHUAN KUANTITATIF (PK)
  // ==========================================
  {
    id: "pk-1.1",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Aritmetika, Bilangan, & Teori Bilangan",
    subchapter_num: "1.1",
    subchapter_title: "Bilangan, Eksponen, & Keterbagian",
    title: "Bilangan Real, Eksponen, Sifat Akar, & Teori Keterbagian",
    required_question_variations: [
      "Archetype PK Tipe 1: Perhitungan nilai operasi aljabar eksponen/akar",
      "Archetype PK Tipe 2: Soal pernyataan (1), (2), (3), (4) keterbagian bilangan",
      "Archetype PK Tipe 3: Hubungan kuantitas P dan Q pada operasi bilangan real",
      "Archetype PK Tipe 4: Kecukupan Data (1) dan (2) pada faktor prima/FPB-KPK"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.1.json"
  },
  {
    id: "pk-1.2",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Aritmetika, Bilangan, & Teori Bilangan",
    subchapter_num: "1.2",
    subchapter_title: "Persamaan & Pertidaksamaan Linear",
    title: "Persamaan, Pertidaksamaan Linear, & Nilai Mutlak",
    required_question_variations: [
      "Archetype PK Tipe 1: Himpunan penyelesaian pertidaksamaan pecahan",
      "Archetype PK Tipe 3: Hubungan P dan Q nilai mutlak",
      "Archetype PK Tipe 4: Kecukupan Data SPLDV"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.2.json"
  },
  {
    id: "pk-2.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Fungsi & Persamaan Kuadrat",
    subchapter_num: "2.1",
    subchapter_title: "Persamaan Kuadrat & Sifat Akar",
    title: "Persamaan Kuadrat, Sifat Akar Vieta, & Diskriminan",
    required_question_variations: [
      "Archetype PK Tipe 1: Jumlah dan hasil kali akar-akar persamaan kuadrat",
      "Archetype PK Tipe 2: Soal pernyataan (1)(2)(3)(4) jenis akar dan nilai diskriminan",
      "Archetype PK Tipe 3: Hubungan kuantitas P dan Q akar kuadrat"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.1.json"
  },
  {
    id: "pk-2.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Fungsi & Persamaan Kuadrat",
    subchapter_num: "2.2",
    subchapter_title: "Fungsi Kuadrat & Nilai Optimum",
    title: "Fungsi Kuadrat, Grafik Parabola, & Nilai Optimum",
    required_question_variations: [
      "Archetype PK Tipe 1: Menentukan koordinat titik puncak dan sumbu simetri",
      "Archetype PK Tipe 3: Hubungan P dan Q nilai minimum fungsi kuadrat",
      "Archetype PK Tipe 4: Kecukupan Data posisi grafik terhadap sumbu-X"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.2.json"
  },
  {
    id: "pk-3.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri Bidang Datar & Ruang",
    subchapter_num: "3.1",
    subchapter_title: "Garis, Sudut, & Segitiga",
    title: "Hubungan Garis, Sudut, & Teorema Segitiga",
    required_question_variations: [
      "Archetype PK Tipe 1: Sudut garis sejajar transversal dan zig-zag",
      "Archetype PK Tipe 2: Soal pernyataan (1)(2)(3)(4) ketaksamaan segitiga",
      "Archetype PK Tipe 3: Hubungan P dan Q besar sudut luar segitiga",
      "Archetype PK Tipe 4: Kecukupan Data (1) dan (2) menentukan besar sudut"
    ],
    requires_svg: true,
    material_status: "done",
    output_path: "/content/utbk/pk/pk-3.1.json"
  },
  {
    id: "pk-3.2",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri Bidang Datar & Ruang",
    subchapter_num: "3.2",
    subchapter_title: "Lingkaran & Segi Empat",
    title: "Lingkaran, Sudut Pusat/Keliling, & Segi Empat",
    required_question_variations: [
      "Archetype PK Tipe 1: Luas daerah terarsir kombinasi lingkaran dan persegi",
      "Archetype PK Tipe 3: Hubungan kuantitas P dan Q sudut keliling lingkaran",
      "Archetype PK Tipe 4: Kecukupan Data keliling trapesium/jajar genjang"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.2.json"
  },
  {
    id: "pk-4.1",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika & Peluang",
    subchapter_num: "4.1",
    subchapter_title: "Statistika Deskriptif",
    title: "Ukuran Pemusatan & Penyebaran Data (Mean, Median, Modus, Jangkauan)",
    required_question_variations: [
      "Archetype PK Tipe 1: Efek perubahan data (tiap data ditambah x dan dikali y)",
      "Archetype PK Tipe 2: Soal format (1)(2)(3)(4) nilai median dan rata-rata",
      "Archetype PK Tipe 3: Hubungan kuantitas P dan Q rata-rata gabungan",
      "Archetype PK Tipe 4: Kecukupan Data jangkauan data tunggal"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.1.json"
  },
  {
    id: "pk-4.2",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika & Peluang",
    subchapter_num: "4.2",
    subchapter_title: "Kombinatorika & Peluang",
    title: "Kaidah Pencacahan, Permutasi, Kombinasi, & Peluang Kejadian",
    required_question_variations: [
      "Archetype PK Tipe 1: Kombinasi pemilihan delegasi/bola dalam kotak",
      "Archetype PK Tipe 3: Hubungan P dan Q peluang bersyarat/majemuk",
      "Archetype PK Tipe 4: Kecukupan Data peluang terambil kartu/huruf"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.2.json"
  },

  // ==========================================
  // SUBTES 5: LITERASI BAHASA INDONESIA (LBI)
  // ==========================================
  {
    id: "lbi-1.1",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Pemahaman Membaca Kritis",
    subchapter_num: "1.1",
    subchapter_title: "Gagasan Utama & Makna Tersirat",
    title: "Menentukan Ide Pokok, Makna Tersirat, & Simpulan Wacana Kompleks",
    required_question_variations: [
      "Archetype Soal: Gagasan utama wacana panjang multialinea",
      "Archetype Soal: Inferensi makna tersirat dari analogi penulis",
      "Archetype Soal: Simpulan yang paling merangkum keseluruhan teks"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.1.json"
  },
  {
    id: "lbi-1.2",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Pemahaman Membaca Kritis",
    subchapter_num: "1.2",
    subchapter_title: "Sikap & Nada Penulis",
    title: "Evaluasi Sikap Penulis (Author's Tone), Keberpihakan, & Asumsi Teks",
    required_question_variations: [
      "Archetype Soal: Sikap/pandangan penulis terhadap isu yang dibahas",
      "Archetype Soal: Tujuan penulisan teks (primary purpose)",
      "Archetype Soal: Hubungan pertentangan atau penguatan antara Teks 1 dan Teks 2"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.2.json"
  },

  // ==========================================
  // SUBTES 6: LITERASI BAHASA INGGRIS (LBE)
  // ==========================================
  {
    id: "lbe-1.1",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Reading Comprehension & Academic Texts",
    subchapter_num: "1.1",
    subchapter_title: "Main Idea, Purpose, & Inference",
    title: "Main Idea, Author's Purpose, & In-Depth Text Inference",
    required_question_variations: [
      "Archetype Soal: What is the main idea / primary purpose of the passage?",
      "Archetype Soal: Which statement is NOT supported by the text?",
      "Archetype Soal: It can be inferred from paragraph 2 that..."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.1.json"
  },
  {
    id: "lbe-1.2",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Reading Comprehension & Academic Texts",
    subchapter_num: "1.2",
    subchapter_title: "Multi-Speaker Discussion Threads",
    title: "Multi-Speaker Discussion Threads & Opposing Opinions Analysis",
    required_question_variations: [
      "Archetype Soal: Who among the commenters agrees with Speaker X?",
      "Archetype Soal: What is the main point of contention between Sarah and David?",
      "Archetype Soal: Tone and attitude of the speakers toward the proposed policy"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.2.json"
  },

  // ==========================================
  // SUBTES 7: PENALARAN MATEMATIKA (PM)
  // ==========================================
  {
    id: "pm-1.1",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Aritmetika Terapan & Masalah Nyata",
    subchapter_num: "1.1",
    subchapter_title: "Finansial, Diskon, & Perdagangan",
    title: "Aritmetika Finansial, Diskon Bertingkat, Pajak, & Skema Belanja Hemat",
    required_question_variations: [
      "Archetype Soal PM: Menentukan skema promo belanja paling hemat (Diskon vs Cashback vs Buy 2 Get 1)",
      "Archetype Soal PM: Perhitungan tarif progresif listrik/air/pajak bertingkat",
      "Archetype Soal PM: Analisis titik impas modal dan harga jual per kemasan neto"
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.1.json"
  },
  {
    id: "pm-2.1",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar, Geometri, & Pemodelan Nyata",
    subchapter_num: "2.1",
    subchapter_title: "Pemodelan Spasial & Geometri Kontekstual",
    title: "Pemodelan Geometri Nyata (Kapasitas Wadah, Packing 3D, & Konstruksi)",
    required_question_variations: [
      "Archetype Soal PM: Optimasi jumlah kardus balok ke dalam kontainer (3D Packing)",
      "Archetype Soal PM: Kenaikan tinggi cairan wadah tabung akibat dimasukkan benda padat",
      "Archetype Soal PM: Estimasi bahan cat/keramik dengan waste potongan bidang miring"
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.1.json"
  }
];

fs.writeFileSync(trackerPath, JSON.stringify({ items: calibratedSyllabus }, null, 2), 'utf8');
console.log(`Calibrated curriculum tracker saved with ${calibratedSyllabus.length} streamlined, exam-aligned modules!`);
