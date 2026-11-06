import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const pkItems = [
  // ==========================================
  // BAB 1: TEORI BILANGAN DAN HIMPUNAN
  // ==========================================
  // 1.1. Sistem dan Sifat Bilangan Bulat
  {
    id: "pk-1.1.1",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.1",
    subchapter_title: "Sistem dan Sifat Bilangan Bulat",
    title: "Klasifikasi Bilangan",
    micro_syllabus_scope: [
      "Bilangan Kompleks, Real, Rasional, Irasional, Bulat, Cacah, Asli, dan Prima.",
      "Sifat operasi bilangan Ganjil dan Genap (penjumlahan, pengurangan, perkalian, dan perpangkatan).",
      "Sifat tanda bilangan Positif dan Negatif pada perkalian, pembagian, dan perpangkatan (pangkat genap vs pangkat ganjil)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.1.1.json"
  },
  {
    id: "pk-1.1.2",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.1",
    subchapter_title: "Sistem dan Sifat Bilangan Bulat",
    title: "Keterbagian (Divisibility Rules)",
    micro_syllabus_scope: [
      "Aturan keterbagian bilangan oleh 2, 3, 4, 5, 6, 7, 8, 9, 10, dan 11.",
      "Sifat faktor dan kelipatan bilangan bulat positif.",
      "Menghitung banyaknya pembagi positif dari suatu bilangan bulat menggunakan faktorisasi prima."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.1.2.json"
  },
  {
    id: "pk-1.1.3",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.1",
    subchapter_title: "Sistem dan Sifat Bilangan Bulat",
    title: "FPB, KPK, dan Aritmetika Modulo Dasar",
    micro_syllabus_scope: [
      "Faktor Persekutuan Terbesar (FPB) dan Kelipatan Persekutuan Terkecil (KPK) serta hubungannya: FPB(a, b) × KPK(a, b) = a × b.",
      "Konsep sisa pembagian (Teorema Sisa Bilangan: a = b × q + r).",
      "Pola siklus angka satuan pada bilangan berpangkat besar (misal: mencari angka satuan dari 2027 pangkat 2026)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.1.3.json"
  },

  // 1.2. Pecahan, Desimal, dan Bentuk Baku
  {
    id: "pk-1.2.1",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.2",
    subchapter_title: "Pecahan, Desimal, dan Bentuk Baku",
    title: "Operasi Pecahan dan Desimal",
    micro_syllabus_scope: [
      "Urutan operasi campuran (KURKABATAKU / PEMDAS) pada pecahan biasa, campuran, desimal, dan persen.",
      "Mengubah desimal berulang (repeating decimals, misal 0,121212...) menjadi pecahan biasa."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.2.1.json"
  },
  {
    id: "pk-1.2.2",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.2",
    subchapter_title: "Pecahan, Desimal, dan Bentuk Baku",
    title: "Perbandingan dan Pengurutan Nilai Pecahan",
    micro_syllabus_scope: [
      "Teknik kali silang, penyamaan penyebut, penyamaan pembilang, dan selisih konstan untuk mengurutkan pecahan secara cepat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.2.2.json"
  },

  // 1.3. Eksponen (Bilangan Berpangkat), Bentuk Akar, dan Logaritma Dasar
  {
    id: "pk-1.3.1",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.3",
    subchapter_title: "Eksponen (Bilangan Berpangkat), Bentuk Akar, dan Logaritma Dasar",
    title: "Sifat-Sifat Eksponen",
    micro_syllabus_scope: [
      "Perkalian, pembagian, perpangkatan eksponen, pangkat nol, pangkat negatif, dan pangkat pecahan.",
      "Persamaan eksponen sederhana (penyamaan basis: a^f(x) = a^g(x)) dan pertidaksamaan eksponen dasar (memperhatikan basis a > 1 vs 0 < a < 1)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.3.1.json"
  },
  {
    id: "pk-1.3.2",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.3",
    subchapter_title: "Eksponen (Bilangan Berpangkat), Bentuk Akar, dan Logaritma Dasar",
    title: "Bentuk Akar (Radikal)",
    micro_syllabus_scope: [
      "Penyederhanaan bentuk akar dan operasi aljabar bentuk akar.",
      "Merasionalkan penyebut pecahan bentuk akar (sekawan tunggal dan sekawan binomial).",
      "Bentuk akar di dalam akar: √( (a + b) ± 2√(a × b) ) = √a ± √b."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.3.2.json"
  },
  {
    id: "pk-1.3.3",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.3",
    subchapter_title: "Eksponen (Bilangan Berpangkat), Bentuk Akar, dan Logaritma Dasar",
    title: "Sifat Logaritma Dasar (Pengayaan PK)",
    micro_syllabus_scope: [
      "Definisi logaritma sebagai invers eksponen dan sifat operasi dasar penjumlahan/pengurangan logaritma."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.3.3.json"
  },

  // 1.4. Himpunan dan Diagram Venn
  {
    id: "pk-1.4.1",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.4",
    subchapter_title: "Himpunan dan Diagram Venn",
    title: "Konsep Dasar dan Representasi Himpunan",
    micro_syllabus_scope: [
      "Elemen himpunan (∈), himpunan bagian (⊂), himpunan kosong (∅), himpunan semesta (S), dan banyaknya himpunan bagian (2^n)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.4.1.json"
  },
  {
    id: "pk-1.4.2",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.4",
    subchapter_title: "Himpunan dan Diagram Venn",
    title: "Operasi Himpunan",
    micro_syllabus_scope: [
      "Irisan (A ∩ B), Gabungan (A ∪ B), Komplemen (A^c), Selisih (A - B), dan Beda Setangkup (A Δ B).",
      "Hukum De Morgan pada himpunan dan sifat distributif/asosiatif."
    ],
    requires_svg: true, // Diagram Venn operasi irisan, gabungan, selisih
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.4.2.json"
  },
  {
    id: "pk-1.4.3",
    subtest: "PK",
    chapter_num: 1,
    chapter_title: "Teori Bilangan dan Himpunan",
    subchapter_num: "1.4",
    subchapter_title: "Himpunan dan Diagram Venn",
    title: "Prinsip Inklusi-Eksklusi (Kardinalitas Himpunan)",
    micro_syllabus_scope: [
      "Rumus kardinalitas 2 himpunan: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).",
      "Rumus kardinalitas 3 himpunan dan visualisasi daerah arsir pada Diagram Venn (menerjemahkan daerah arsir ke notasi himpunan dan sebaliknya)."
    ],
    requires_svg: true, // Diagram Venn 3 himpunan daerah arsir
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-1.4.3.json"
  },

  // ==========================================
  // BAB 2: ALJABAR, FUNGSI, DAN MATRIKS
  // ==========================================
  // 2.1. Bentuk Aljabar dan Operasi Simbolik Khusus
  {
    id: "pk-2.1.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.1",
    subchapter_title: "Bentuk Aljabar dan Operasi Simbolik Khusus",
    title: "Manipulasi dan Pemfaktoran Aljabar",
    micro_syllabus_scope: [
      "Identitas aljabar kuadrat dan kubik: (a ± b)², a² - b² = (a - b)(a + b), (a + b + c)², a³ ± b³.",
      "Penyederhanaan pecahan aljabar dan substitusi nilai bersyarat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.1.1.json"
  },
  {
    id: "pk-2.1.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.1",
    subchapter_title: "Bentuk Aljabar dan Operasi Simbolik Khusus",
    title: "Operasi Biner / Simbolik Buatan (Custom Operators)",
    micro_syllabus_scope: [
      "Menerjemahkan definisi operator baru (misal: a ★ b = a² - 2ab + b) ke dalam perhitungan angka.",
      "Operasi simbolik bertingkat/bersarang dan mencari nilai variabel di dalam persamaan operator buatan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.1.2.json"
  },

  // 2.2. Persamaan dan Pertidaksamaan (Linear, Mutlak, Pecahan, Irasional)
  {
    id: "pk-2.2.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.2",
    subchapter_title: "Persamaan dan Pertidaksamaan (Linear, Mutlak, Pecahan, Irasional)",
    title: "Persamaan dan Pertidaksamaan Linear",
    micro_syllabus_scope: [
      "Persamaan Linear Satu Variabel (PLSV) dan Sistem Persamaan Linear Dua/Tiga Variabel (SPLDV/SPLTV: metode eliminasi, substitusi, dan manipulasi langsung tanpa mencari satu per satu variabel).",
      "Syarat SPLDV memiliki tepat satu solusi, tak hingga solusi (garis berimpit), atau tidak memiliki solusi (garis sejajar).",
      "Pertidaksamaan linear dan sifat pembalikan tanda pertidaksamaan saat dikali/dibagi bilangan negatif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.2.1.json"
  },
  {
    id: "pk-2.2.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.2",
    subchapter_title: "Persamaan dan Pertidaksamaan (Linear, Mutlak, Pecahan, Irasional)",
    title: "Persamaan dan Pertidaksamaan Nilai Mutlak",
    micro_syllabus_scope: [
      "Definisi nilai mutlak |x| dan sifat jarak pada garis bilangan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.2.2.json"
  },
  {
    id: "pk-2.2.3",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.2",
    subchapter_title: "Persamaan dan Pertidaksamaan (Linear, Mutlak, Pecahan, Irasional)",
    title: "Pertidaksamaan Kuadrat, Rasional (Pecahan), dan Irasional (Bentuk Akar)",
    micro_syllabus_scope: [
      "Metode garis bilangan (uji titik dan penentuan tanda + / -).",
      "Aturan titik kritis pada faktor berpangkat ganjil (tanda berubah) vs faktor berpangkat genap/definit (tanda tetap).",
      "Syarat penyebut tidak boleh nol pada pertidaksamaan pecahan dan syarat numerus ≥ 0 pada bentuk akar."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.2.3.json"
  },

  // 2.3. Persamaan dan Fungsi Kuadrat
  {
    id: "pk-2.3.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.3",
    subchapter_title: "Persamaan dan Fungsi Kuadrat",
    title: "Akar-Akar Persamaan Kuadrat (ax² + bx + c = 0)",
    micro_syllabus_scope: [
      "Pemfaktoran, melengkapkan kuadrat sempurna, dan rumus ABC.",
      "Analisis Diskriminan (D = b² - 4ac): akar real berbeda (D > 0), akar real kembar (D = 0), akar imajiner/tidak real (D < 0), dan akar rasional.",
      "Rumus Jumlah dan Hasil Kali Akar (Teorema Vieta): x₁ + x₂ = -b/a, x₁ × x₂ = c/a, dan |x₁ - x₂| = √D / |a|.",
      "Menyusun persamaan kuadrat baru yang akar-akarnya simetris terhadap persamaan kuadrat awal."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.3.1.json"
  },
  {
    id: "pk-2.3.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.3",
    subchapter_title: "Persamaan dan Fungsi Kuadrat",
    title: "Karakteristik Grafik Fungsi Kuadrat (f(x) = ax² + bx + c)",
    micro_syllabus_scope: [
      "Peran koefisien a (terbuka ke atas/bawah), b (posisi sumbu simetri terhadap sumbu-Y), c (titik potong sumbu-Y), dan D (posisi terhadap sumbu-X).",
      "Kondisi Definit Positif (a > 0 dan D < 0) serta Definit Negatif (a < 0 dan D < 0).",
      "Sumbu simetri (x_p = -b / 2a) dan nilai ekstrem/puncak (y_p = -D / 4a).",
      "Menyusun fungsi kuadrat jika diketahui titik potong sumbu-X, titik puncak, atau 3 titik sembarang."
    ],
    requires_svg: true, // Grafik parabola fungsi kuadrat
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.3.2.json"
  },

  // 2.4. Relasi, Fungsi, Komposisi, dan Invers
  {
    id: "pk-2.4.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.4",
    subchapter_title: "Relasi, Fungsi, Komposisi, dan Invers",
    title: "Konsep Fungsi, Domain, dan Range",
    micro_syllabus_scope: [
      "Syarat pemetaan (fungsi), fungsi injektif (satu-satu), surjektif (pada), dan bijektif (korespondensi satu-satu).",
      "Menentukan daerah asal alami (domain) dan daerah hasil (range) dari fungsi linear, kuadrat, pecahan, dan akar.",
      "Membaca nilai fungsi dari grafik f(x)."
    ],
    requires_svg: true, // Grafik pemetaan dan diagram panah
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.4.1.json"
  },
  {
    id: "pk-2.4.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.4",
    subchapter_title: "Relasi, Fungsi, Komposisi, dan Invers",
    title: "Fungsi Komposisi",
    micro_syllabus_scope: [
      "Operasi komposisi (f ∘ g)(x) = f(g(x)) dan sifat tidak komutatif.",
      "Menentukan fungsi f(x) jika diketahui (f ∘ g)(x) dan g(x), atau menentukan g(x) jika diketahui (f ∘ g)(x) dan f(x)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.4.2.json"
  },
  {
    id: "pk-2.4.3",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.4",
    subchapter_title: "Relasi, Fungsi, Komposisi, dan Invers",
    title: "Fungsi Invers",
    micro_syllabus_scope: [
      "Cara cepat menentukan invers fungsi linear, fungsi pecahan linear f(x) = (ax + b)/(cx + d), dan fungsi kuadrat pada domain terbatas.",
      "Sifat invers komposisi: (f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x) dan sifat f⁻¹(b) = a ↔ f(a) = b."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.4.3.json"
  },

  // 2.5. Barisan dan Deret (Aritmetika, Geometri, & Teleskopik)
  {
    id: "pk-2.5.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.5",
    subchapter_title: "Barisan dan Deret (Aritmetika, Geometri, & Teleskopik)",
    title: "Barisan dan Deret Aritmetika",
    micro_syllabus_scope: [
      "Suku ke-n (U_n = a + (n - 1)b), suku tengah, sisipan barisan aritmetika, dan jumlah n suku pertama (S_n).",
      "Hubungan U_n = S_n - S_(n-1)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.5.1.json"
  },
  {
    id: "pk-2.5.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.5",
    subchapter_title: "Barisan dan Deret (Aritmetika, Geometri, & Teleskopik)",
    title: "Barisan dan Deret Geometri",
    micro_syllabus_scope: [
      "Suku ke-n (U_n = a × r^(n-1)), suku tengah, sisipan, dan jumlah n suku pertama.",
      "Deret Geometri Tak Hingga Konvergen (|r| < 1): S_∞ = a / (1 - r), serta deret suku ganjil vs suku genap."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.5.2.json"
  },

  // 2.6. Matriks dan Transformasi Geometri Dasar
  {
    id: "pk-2.6.1",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.6",
    subchapter_title: "Matriks dan Transformasi Geometri Dasar",
    title: "Konsep dan Operasi Aljabar Matriks",
    micro_syllabus_scope: [
      "Ordo matriks, jenis matriks (identitas, diagonal, simetris), dan kesamaan dua matriks.",
      "Transpos matriks (A^T), penjumlahan, pengurangan, perkalian skalar, dan syarat perkalian dua matriks (A_(m×n) × B_(n×p) = C_(m×p))."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.6.1.json"
  },
  {
    id: "pk-2.6.2",
    subtest: "PK",
    chapter_num: 2,
    chapter_title: "Aljabar, Fungsi, dan Matriks",
    subchapter_num: "2.6",
    subchapter_title: "Matriks dan Transformasi Geometri Dasar",
    title: "Determinan, Invers, dan Persamaan Matriks Ordo 2×2",
    micro_syllabus_scope: [
      "Determinan det(A) = ad - bc dan sifat-sifatnya: det(A × B) = det(A) × det(B), det(A⁻¹) = 1/det(A), det(k × A) = k² × det(A).",
      "Matriks singular (det(A) = 0, tidak punya invers).",
      "Invers matriks 2×2 dan penyelesaian persamaan matriks AX = B → X = A⁻¹B serta XA = B → X = BA⁻¹."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-2.6.2.json"
  },

  // ==========================================
  // BAB 3: GEOMETRI (DATAR, RUANG, ANALITIK, & TRIGONOMETRI DASAR)
  // ==========================================
  // 3.1. Sudut, Garis, dan Bangun Datar (Geometri Euklides)
  {
    id: "pk-3.1.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Hubungan Garis dan Sudut",
    micro_syllabus_scope: [
      "Sudut berpelurus (suplemen = 180°), berpenyiku (komplemen = 90°), dan bertolak belakang.",
      "Dua garis sejajar dipotong garis transversal: sudut sehadap, dalam berseberangan, luar berseberangan, dalam sepihak, dan luar sepihak.",
      "Sudut garis patah di antara dua garis sejajar (metode garis bantu sejajar)."
    ],
    requires_svg: true, // Garis dan sudut geometri
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.1.1.json"
  },
  {
    id: "pk-3.1.2",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Segitiga dan Teorema Pythagoras",
    micro_syllabus_scope: [
      "Jumlah sudut dalam segitiga (180°) dan sifat sudut luar segitiga (sama dengan jumlah dua sudut dalam di hadapannya).",
      "Ketaksamaan segitiga (syarat panjang 3 sisi dapat membentuk segitiga: a + b > c).",
      "Tripel Pythagoras, segitiga siku-siku istimewa (sudut 30°-60°-90° dan 45°-45°-90°).",
      "Garis istimewa pada segitiga (garis tinggi, garis bagi, garis berat, garis sumbu) dan perbandingan luas segitiga yang memiliki tinggi sama (sebanding dengan perbandingan alasnya)."
    ],
    requires_svg: true, // Segitiga, garis istimewa, pythagoras
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.1.2.json"
  },
  {
    id: "pk-3.1.3",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Kesebangunan dan Kekongruenan",
    micro_syllabus_scope: [
      "Syarat dua segitiga sebangun (Sudut-Sudut-Sudut, Sisi-Sudut-Sisi, Sisi-Sisi-Sisi).",
      "Kesebangunan khusus pada segitiga dengan garis sejajar sisi alas, segitiga siku-siku dengan garis tinggi ke sisi miring (rumus air mancur), dan trapesium.",
      "Perbandingan luas dua bangun sebangun = kuadrat dari perbandingan sisi bersesuaiannya: L₁ / L₂ = (s₁ / s₂)²."
    ],
    requires_svg: true, // Kesebangunan segitiga / trapesium
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.1.3.json"
  },
  {
    id: "pk-3.1.4",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Segiempat, Poligon, dan Luas Daerah Diarsir",
    micro_syllabus_scope: [
      "Sifat, keliling, dan luas: Persegi, Persegi Panjang, Jajargenjang, Belah Ketupat, Layang-Layang, dan Trapesium.",
      "Jumlah sudut dalam dan sudut luar poligon segi-n beraturan.",
      "Strategi menghitung luas daerah yang diarsir dengan metode penjumlahan/pengurangan luas dan pergeseran bidang."
    ],
    requires_svg: true, // Bangun datar segiempat & daerah diarsir
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.1.4.json"
  },
  {
    id: "pk-3.1.5",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Lingkaran",
    micro_syllabus_scope: [
      "Keliling, luas lingkaran, panjang busur, luas juring, dan luas tembereng.",
      "Hubungan Sudut Pusat dan Sudut Keliling yang menghadap busur yang sama (Sudut Pusat = 2 × Sudut Keliling; sudut keliling menghadap diameter = 90°).",
      "Segiempat tali busur (jumlah sudut berhadapan = 180°), sudut antara dua tali busur berpotongan di dalam dan di luar lingkaran.",
      "Garis singgung lingkaran (tegak lurus jari-jari di titik singgung)."
    ],
    requires_svg: true, // Lingkaran, juring, tembereng, tali busur
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.1.5.json"
  },

  // 3.2. Geometri Ruang (Dimensi Tiga)
  {
    id: "pk-3.2.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.2",
    subchapter_title: "Geometri Ruang (Dimensi Tiga)",
    title: "Volume dan Luas Permukaan Bangun Ruang",
    micro_syllabus_scope: [
      "Kubus, Balok, Prisma, Limas, Tabung, Kerucut, dan Bola.",
      "Perubahan volume dan luas permukaan jika rusuk/jari-jari diperbesar atau diperkecil k kali."
    ],
    requires_svg: true, // Bangun ruang 3D
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.2.1.json"
  },
  {
    id: "pk-3.2.2",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.2",
    subchapter_title: "Geometri Ruang (Dimensi Tiga)",
    title: "Kedudukan dan Jarak pada Kubus & Balok",
    micro_syllabus_scope: [
      "Kedudukan titik, garis, dan bidang (berpotongan, sejajar, bersilangan).",
      "Diagonal bidang (a√2), diagonal ruang kubus (a√3), dan bidang diagonal.",
      "Menghitung jarak titik ke titik, jarak titik ke garis (proyeksi tegak lurus dan aturan luas segitiga), serta jarak titik ke bidang pada kubus/limas."
    ],
    requires_svg: true, // Dimensi tiga, kubus/limas proyeksi jarak
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.2.2.json"
  },

  // 3.3. Geometri Koordinat Kartesius dan Persamaan Garis Lurus
  {
    id: "pk-3.3.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.3",
    subchapter_title: "Geometri Koordinat Kartesius dan Persamaan Garis Lurus",
    title: "Titik dan Jarak pada Bidang Kartesius",
    micro_syllabus_scope: [
      "Jarak antara dua titik (x₁, y₁) dan (x₂, y₂), koordinat titik tengah, dan koordinat titik pembagi ruas garis dengan rasio m : n.",
      "Menghitung luas bangun datar yang titik-titik sudutnya diketahui di koordinat Kartesius (metode determinan / tali sepatu)."
    ],
    requires_svg: true, // Bidang kartesius & koordinat
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.3.1.json"
  },
  {
    id: "pk-3.3.2",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.3",
    subchapter_title: "Geometri Koordinat Kartesius dan Persamaan Garis Lurus",
    title: "Gradien (Kemiringan) dan Persamaan Garis Lurus",
    micro_syllabus_scope: [
      "Menentukan gradien m dari dua titik, dari persamaan y = mx + c atau ax + by + c = 0, dan dari sudut kemiringan (m = tan α).",
      "Menyusun persamaan garis melalui satu titik dengan gradien m, dan melalui dua titik.",
      "Hubungan dua garis: Sejajar (m₁ = m₂), Tegak Lurus (m₁ × m₂ = -1), dan Berpotongan (mencari titik potong dengan eliminasi/substitusi).",
      "Jarak titik (x₁, y₁) ke garis ax + by + c = 0: d = |ax₁ + by₁ + c| / √(a² + b²)."
    ],
    requires_svg: true, // Garis lurus kartesius, gradien, titik potong
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.3.2.json"
  },
  {
    id: "pk-3.3.3",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.3",
    subchapter_title: "Geometri Koordinat Kartesius dan Persamaan Garis Lurus",
    title: "Transformasi Geometri pada Titik dan Garis",
    micro_syllabus_scope: [
      "Translasi (pergeseran), Refleksi (pencerminan terhadap sumbu-X, sumbu-Y, y = x, y = -x, x = k, y = h), Rotasi (90°, 180°, 270°), dan Dilatasi (perkalian skala)."
    ],
    requires_svg: true, // Transformasi geometri visual
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.3.3.json"
  },

  // 3.4. Trigonometri Dasar
  {
    id: "pk-3.4.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.4",
    subchapter_title: "Trigonometri Dasar",
    title: "Perbandingan Trigonometri Segitiga Siku-Siku dan Sudut Istimewa",
    micro_syllabus_scope: [
      "Definisi sin, cos, tan, cosec, sec, cotan (Demi-Sami-Desa).",
      "Nilai trigonometri sudut istimewa (0°, 30°, 45°, 60°, 90°) dan tanda kuadran I–IV.",
      "Identitas Pythagoras dasar: sin²x + cos²x = 1."
    ],
    requires_svg: true, // Segitiga siku-siku & lingkaran satuan kuadran
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.4.1.json"
  },
  {
    id: "pk-3.4.2",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.4",
    subchapter_title: "Trigonometri Dasar",
    title: "Aturan Sinus, Aturan Kosinus, dan Luas Segitiga Trigonometri",
    micro_syllabus_scope: [
      "Aturan Sinus: a / sin A = b / sin B = c / sin C.",
      "Aturan Kosinus: c² = a² + b² - 2ab cos C.",
      "Luas Segitiga: L = ½ × a × b × sin C."
    ],
    requires_svg: true, // Segitiga sembarang aturan sinus & kosinus
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-3.4.2.json"
  },

  // ==========================================
  // BAB 4: STATISTIKA, KOMBINATORIKA, DAN PELUANG
  // ==========================================
  // 4.1. Statistika Deskriptif
  {
    id: "pk-4.1.1",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.1",
    subchapter_title: "Statistika Deskriptif",
    title: "Ukuran Pemusatan Data (Data Tunggal dan Tabel Frekuensi)",
    micro_syllabus_scope: [
      "Rata-rata hitung (Mean) dan sifat perubahan rata-rata jika setiap data ditambah/dikali konstanta.",
      "Rata-rata Gabungan (Combined Mean): x̄_gab = (n₁x̄₁ + n₂x̄₂) / (n₁ + n₂).",
      "Median (nilai tengah setelah data diurutkan) dan Modus (data dengan frekuensi tertinggi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.1.1.json"
  },
  {
    id: "pk-4.1.2",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.1",
    subchapter_title: "Statistika Deskriptif",
    title: "Ukuran Letak dan Penyebaran Data",
    micro_syllabus_scope: [
      "Kuartil Bawah (Q₁), Kuartil Tengah (Q₂/Median), dan Kuartil Atas (Q₃).",
      "Jangkauan (Range = X_maks - X_min) dan Jangkauan Antarkuartil (Hamparan H = Q₃ - Q₁).",
      "Simpangan Rata-Rata, Ragam (Variansi), dan Simpangan Baku (Standar Deviasi) data tunggal sederhana."
    ],
    requires_svg: true, // Boxplot / visualisasi kuartil
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.1.2.json"
  },
  {
    id: "pk-4.1.3",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.1",
    subchapter_title: "Statistika Deskriptif",
    title: "Analisis Perubahan Parameter Statistik",
    micro_syllabus_scope: [
      "Menentukan nilai data yang hilang/ditambahkan jika diketahui perubahan rata-rata, median, dan jangkauan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.1.3.json"
  },

  // 4.2. Kaidah Pencacahan (Combinatorics)
  {
    id: "pk-4.2.1",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.2",
    subchapter_title: "Kaidah Pencacahan (Combinatorics)",
    title: "Aturan Penjumlahan dan Aturan Perkalian (Filling Slots)",
    micro_syllabus_scope: [
      "Menyusun bilangan ganjil/genap atau bilangan yang lebih besar/kecil dari nilai tertentu dengan syarat angka boleh berulang vs tidak boleh berulang."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.2.1.json"
  },
  {
    id: "pk-4.2.2",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.2",
    subchapter_title: "Kaidah Pencacahan (Combinatorics)",
    title: "Permutasi (Memperhatikan Urutan: AB ≠ BA)",
    micro_syllabus_scope: [
      "Faktorial (n!) dan Permutasi r unsur dari n unsur: P(n, r) = n! / (n - r)!.",
      "Permutasi dengan unsur yang sama (menyusun huruf pada kata dengan huruf kembar).",
      "Permutasi Siklis (melingkar: P_siklis = (n - 1)!) dan permutasi dengan syarat posisi berdampingan/terpisah."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.2.2.json"
  },
  {
    id: "pk-4.2.3",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.2",
    subchapter_title: "Kaidah Pencacahan (Combinatorics)",
    title: "Kombinasi (Tidak Memperhatikan Urutan: AB = BA)",
    micro_syllabus_scope: [
      "Kombinasi r unsur dari n unsur: C(n, r) = n! / (r! × (n - r)!).",
      "Pemilihan anggota tim/panitia dengan syarat tertentu, pengambilan bola dari kotak, serta menghitung banyaknya jabat tangan atau garis/segitiga dari n titik."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.2.3.json"
  },

  // 4.3. Teori Peluang (Probability)
  {
    id: "pk-4.3.1",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.3",
    subchapter_title: "Teori Peluang (Probability)",
    title: "Peluang Kejadian Tunggal dan Komplemen",
    micro_syllabus_scope: [
      "Ruang sampel (n(S)), titik sampel (n(A)), dan rumus peluang P(A) = n(A) / n(S).",
      "Peluang komplemen kejadian (kejadian A tidak terjadi): P(A^c) = 1 - P(A).",
      "Frekuensi harapan: F_h = P(A) × N."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.3.1.json"
  },
  {
    id: "pk-4.3.2",
    subtest: "PK",
    chapter_num: 4,
    chapter_title: "Statistika, Kombinatorika, dan Peluang",
    subchapter_num: "4.3",
    subchapter_title: "Teori Peluang (Probability)",
    title: "Peluang Kejadian Majemuk",
    micro_syllabus_scope: [
      "Gabungan dua kejadian: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).",
      "Kejadian Saling Lepas (Mutually Exclusive, A ∩ B = ∅): P(A ∪ B) = P(A) + P(B).",
      "Kejadian Saling Bebas (Independent Events): P(A ∩ B) = P(A) × P(B).",
      "Peluang Bersyarat (Conditional Probability) dan pengambilan berurutan dengan pengembalian vs tanpa pengembalian."
    ],
    requires_svg: true, // Diagram pohon peluang / Venn peluang
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-4.3.2.json"
  },

  // ==========================================
  // BAB 5: FORMAT KHUSUS PENALARAN SOAL PK UTBK
  // ==========================================
  // 5.1. Analisis Kecukupan Data (Data Sufficiency)
  {
    id: "pk-5.1.1",
    subtest: "PK",
    chapter_num: 5,
    chapter_title: "Format Khusus Penalaran Soal PK UTBK",
    subchapter_num: "5.1",
    subchapter_title: "Analisis Kecukupan Data (Data Sufficiency)",
    title: "Mekanisme dan Logika Pilihan Jawaban (A, B, C, D, E)",
    micro_syllabus_scope: [
      "Menguji Pernyataan (1) saja secara independen (abaikan Pernyataan 2).",
      "Menguji Pernyataan (2) saja secara independen (abaikan Pernyataan 1).",
      "Menggabungkan Pernyataan (1) dan (2) hanya jika masing-masing pernyataan belum cukup."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-5.1.1.json"
  },
  {
    id: "pk-5.1.2",
    subtest: "PK",
    chapter_num: 5,
    chapter_title: "Format Khusus Penalaran Soal PK UTBK",
    subchapter_num: "5.1",
    subchapter_title: "Analisis Kecukupan Data (Data Sufficiency)",
    title: "Jebakan Klasik Kecukupan Data",
    micro_syllabus_scope: [
      "Definisi \"Cukup\": menghasilkan tepat satu nilai tunggal (untuk pertanyaan nilai) atau jawaban pasti Ya / pasti Tidak secara konsisten (untuk pertanyaan apakah/kebenaran).",
      "Jika persamaan kuadrat menghasilkan 2 nilai x yang berbeda tanpa batasan domain (misal x = 2 atau x = -3), maka pernyataan tersebut TIDAK CUKUP.",
      "Memisahkan informasi yang sudah diketahui di batang soal (stem) dengan informasi pada pernyataan (1) dan (2)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-5.1.2.json"
  },

  // 5.2. Analisis Perbandingan Dua Kuantitas (Hubungan P dan Q)
  {
    id: "pk-5.2.1",
    subtest: "PK",
    chapter_num: 5,
    chapter_title: "Format Khusus Penalaran Soal PK UTBK",
    subchapter_num: "5.2",
    subchapter_title: "Analisis Perbandingan Dua Kuantitas (Hubungan P dan Q)",
    title: "Strategi Evaluasi P dan Q",
    micro_syllabus_scope: [
      "Menyederhanakan ekspresi aljabar atau bentuk akar pada P dan Q secara simultan (mengurangi atau membagi kedua ruas dengan bilangan positif yang sama).",
      "Menguji nilai ekstrem dan nilai batas (bilangan bulat positif, pecahan di antara 0 dan 1, nol, dan bilangan negatif) untuk mendeteksi opsi D (\"Informasi yang diberikan tidak cukup untuk memutuskan\")."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-5.2.1.json"
  },

  // 5.3. Evaluasi Kebenaran Empat Pernyataan (1), (2), (3), dan (4)
  {
    id: "pk-5.3.1",
    subtest: "PK",
    chapter_num: 5,
    chapter_title: "Format Khusus Penalaran Soal PK UTBK",
    subchapter_num: "5.3",
    subchapter_title: "Evaluasi Kebenaran Empat Pernyataan (1), (2), (3), dan (4)",
    title: "Teknik Eliminasi Cepat Berpasangan",
    micro_syllabus_scope: [
      "Memeriksa Pernyataan (1) terlebih dahulu: jika (1) Benar, maka (3) sangat berpeluang Benar; jika (1) Salah, langsung periksa (2) dan (4).",
      "Menentukan banyaknya pernyataan yang benar (0, 1, 2, 3, atau 4 pernyataan benar)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-5.3.1.json"
  },

  // 5.4. Soal Isian Singkat Numerik
  {
    id: "pk-5.4.1",
    subtest: "PK",
    chapter_num: 5,
    chapter_title: "Format Khusus Penalaran Soal PK UTBK",
    subchapter_num: "5.4",
    subchapter_title: "Soal Isian Singkat Numerik",
    title: "Presisi Komputasi Tanpa Opsi Pilihan Ganda",
    micro_syllabus_scope: [
      "Memastikan hasil akhir berupa bilangan bulat atau nilai eksak yang diminta oleh soal tanpa bergantung pada teknik tebak/uji opsi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pk/pk-5.4.1.json"
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

// Preserve existing items not belonging to PK, and merge PK items
const nonPkItems = trackerData.items.filter(item => item.subtest !== 'PK');
const mergedItems = [...nonPkItems, ...pkItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(pkItems.map(item => item.chapter_num));
const subchapters = new Set(pkItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = pkItems.length;
const requiresSvgCount = pkItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes PK!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
