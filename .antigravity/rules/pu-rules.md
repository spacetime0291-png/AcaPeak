# UTBK PU QUESTION DRILLING SYSTEM RULES & BLUEPRINT
**Antigravity Rule Directive for Penalaran Umum (PU) — SNBT / UTBK**

---

## 1. SYSTEM RULES & EXECUTION GUIDELINES

Sistem pembuatan bank soal drilling Penalaran Umum (PU) beroperasi menggunakan kendali file state mesin `PU-STATE.json`. Seluruh penambahan soal wajib mematuhi aturan berikut:

### A. Aturan Eksekusi Batch
1. **Batch Generation Rule**: Maksimal generate **5 soal per 1 kali jalan (1 Batch)** untuk menjaga kedalaman analisis berpikir (HOTS), memastikan opsi pengecoh dirancang cermat tanpa cacat logika, dan menghindari degradasi kualitas wacana.
2. **KaTeX & Math Syntax Rule**:
   - Seluruh notasi matematis dan rumus wajib menggunakan KaTeX inline dengan pembatas tunggal dollar `$ ... $`.
   - Di dalam string file JSON / TypeScript, setiap backslash KaTeX **wajib di-escape ganda** (`\\`).
     - Contoh: `$\\frac{3}{7}$`, `$\\times$`, `$\\approx$`, `$\\sim p \\lor q$`, `$\\implies$`, `$\\forall$`, `$\\exists$`.
   - Tanda persen di dalam KaTeX wajib di-escape (`$\\92\\%$`) atau ditulis di luar KaTeX: `92%`.
3. **Modular Subchapter & Dual-File Architecture Synchronization**:
   - Repository menyimpan data soal di modul terpisah per sub-bab untuk keamanan, isolasi, dan skalabilitas tinggi:
     1. Modul TypeScript terisolasi: `src/data/materials/pu/pu-XX-YY.ts` (misal: `pu-01-01.ts`, `pu-02-02.ts`, dll.).
     2. Barrel export: `src/data/materials/pu/index.ts` dan `src/data/materials/puMaterials.ts` me-re-export semua sub-bab (zero breaking change).
     3. File JSON publik runtime: `public/content/utbk/pu/pu-XX-YY.json` (dan aliasnya `pu-X-Y.json`) serta mirror `content/utbk/pu/`.
   - **Keuntungan Keamanan**: Setiap batch penambahan soal **hanya mengedit satu file spesifik** `src/data/materials/pu/pu-XX-YY.ts`, tidak menyentuh modul sub-bab lainnya sehingga 100% aman dari risiko bentrok (merge conflict) atau error sintaks global.
   - Setiap batch penambahan soal baru wajib mengedit `src/data/materials/pu/pu-XX-YY.ts`, lalu menjalankan sinkronisasi via `node scripts/export_materials.mjs` (atau `npm run build`).
4. **Validasi Komputasi Bab 03 (Mandatory Verification)**:
   - Untuk setiap soal di **Bab 03 (Penalaran Kuantitatif)**, agen **wajib memverifikasi perhitungan aritmetika, rasio, deret, dan matriks** dengan komputasi pasti sebelum menuliskan soal dan opsi.
5. **Anti-Duplikasi Mandiri**:
   - Sebelum membuat batch soal baru untuk suatu sub-bab, agen membaca array `worked_examples` yang sudah ada pada file target untuk memastikan topik wacana, nama subjek, dan angka yang digunakan belum pernah dipakai.

---

## 2. JSON SCHEMA REFERENCE

### A. Struktur Root File (`pu-XX-YY.json`)
```json
{
  "metadata": {
    "id": "pu-1-1",
    "subtest": "PU",
    "chapter_num": 1,
    "chapter_title": "Penalaran Induktif",
    "subchapter_num": "1.1",
    "subchapter_title": "Generalisasi",
    "title": "Generalisasi",
    "required_question_variations": [
      "Simpulan Proporsi Sampel",
      "Simpulan Tren Induktif Berkala",
      "Evaluasi Kualitas Generalisasi (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-09"
  },
  "content": {
    "tactical_overview": "Ringkasan konsep pokok dan strategi eliminasi taktis...",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nPenjelasan teori komprehensif...",
    "visualizations_svg": [],
    "distractor_traps": [
      "Jebakan 1: Overgeneralization...",
      "Jebakan 2: Hasty Generalization..."
    ],
    "quick_execution_algorithm": [
      "Langkah 1: Identifikasi ruang lingkup subjek...",
      "Langkah 2: Eliminasi opsi berkata mutlak..."
    ]
  },
  "worked_examples": [
    /* Array item WorkedExample (Bank Soal Drilling) */
  ]
}
```

### B. Skema Item Soal (`WorkedExample`)
Setiap elemen di dalam array `worked_examples` wajib memiliki struktur:

```typescript
interface WorkedExample {
  example_id: string;                    // Format: "pu-XX-YY-exN" (contoh: "pu-01-01-ex4")
  variation_name: string;                // Format: "Variasi [Nomor]: [Nama Variasi] (Level: [Mudah|Sedang|Sulit])"
  difficulty: "easy" | "medium" | "hard";// Tingkat kesulitan
  question_type: "standard_mc";          // Tipe soal baku UTBK (Pilihan Ganda 5 Opsi)
  context_markdown: string;              // Teks wacana / premis / tabel Markdown
  question_markdown: string;             // Kalimat pertanyaan dengan instruksi kunci dicetak tebal
  options: [                             // Tepat 5 pilihan jawaban (A, B, C, D, E)
    { key: "A"; text_markdown: string },
    { key: "B"; text_markdown: string },
    { key: "C"; text_markdown: string },
    { key: "D"; text_markdown: string },
    { key: "E"; text_markdown: string }
  ];
  correct_answer: "A" | "B" | "C" | "D" | "E";
  hint_markdown: string;                 // Dimulai dengan: "💡 **Petunjuk Soal:** ..."
  conceptual_solution_markdown: string;  // Dimulai dengan: "**Cara Konsep Formal:**\n\n..." diakhiri "**Jawaban: X**"
  quick_trick_markdown: string;          // Dimulai dengan: "**Cara Cepat ([Nama Trik]):**\n\n..."
  why_others_are_wrong_markdown: string; // Analisis 4 opsi salah: "- **Pilihan A Salah:** ...\n- **Pilihan B Salah:** ..."
}
```

---

## 3. DOMAIN & CONTEXT ROTATION POOL (5 DOMAIN WAJIB)

Setiap **5 soal dalam 1 Batch** wajib merotasi konteks bacaan ke dalam 5 domain berikut secara berurutan:

| Urutan Batch | Domain Wacana | Fokus Topik & Kata Kunci Skenario |
| :---: | :--- | :--- |
| **Soal #1** | `[Sains & Lingkungan]` | Ekologi, keanekaragaman hayati pesisir/hutan, astronomi & astrobiologi, transisi energi hijau, mikrobiologi tanah, polusi mikroplastik, mitigasi hidrometeorologi. |
| **Soal #2** | `[Ekonomi & Kebijakan Publik]` | Inflasi pangan, efektivitas subsidi energi/transportasi, efisiensi logistik pelabuhan, demografi angkatan kerja, digitalisasi UMKM, suku bunga bank, perdagangan elektronik. |
| **Soal #3** | `[Kesehatan & Psikologi Kognitif]` | Epidemiologi klinis, intervensi nutrisi, ritme sirkadian & kualitas tidur, ergonomi ruang kerja, memori kerja, stres kerja & produktivitas kognitif, imunologi. |
| **Soal #4** | `[Teknologi & Industri]` | Model kecerdasan buatan (LLM, Vision), semikonduktor, keamanan siber & kriptografi, otomasi robotik manufaktur, efisiensi baterai EV, satelit orbit rendah. |
| **Soal #5** | `[Sosial, Budaya & Sejarah]` | Urbanisasi kota cerdas, sosiologi pendidikan tinggi, vitalitas dialek lokal, konservasi cagar budaya, mobilitas sosial antargenerasi, etika media digital. |

*Aturan Rotasi: Tidak diperbolehkan membuat dua soal berturut-turut dalam satu batch dengan domain wacana yang sama.*

---

## 4. BLUEPRINT MATRIX UTBK PU (KURIKULUM & ARKETIPE SOAL)

### Bab 01: Penalaran Induktif
*Prinsip: Kesimpulan induktif bernilai probabilistik (derajat keyakinan terukur), tidak pernah mutlak 100%, dan terikat ketat pada batasan ruang lingkup sampel.*
- **`pu-01-01` Generalisasi**:
  - *Arketipe 1*: Simpulan Proporsi Sampel (*sebagian besar, separuh, mayoritas* vs kesalahan pukul rata *semua*).
  - *Arketipe 2*: Simpulan Tren Induktif Berkala / Rangkaian Waktu (proyeksi realistis tren).
  - *Arketipe 3*: Evaluasi Keterwakilan Sampel / *Hasty Generalization* (HOTS: sampel sempit vs populasi heterogen).
  - *Arketipe 4*: Simpulan Paling Mungkin Benar vs Pasti Salah (evaluasi plausibilitas konteks wacana).
- **`pu-01-02` Analogi**:
  - *Arketipe 1*: Prediksi Berbasis Analogi Fenomena / Mekanisme Ilmiah.
  - *Arketipe 2*: *Parallel Reasoning* / Pola Penalaran Setara (mencocokkan struktur argumen analogis).
  - *Arketipe 3*: Memperlemah Analogi / *Critical Disanalogy* (HOTS: perbedaan fundamental yang merusak perbandingan).
  - *Arketipe 4*: Evaluasi Kekuatan Analogi Relasional.
- **`pu-01-03` Hubungan Kausalitas (Sebab-Akibat)**:
  - *Arketipe 1*: Penentuan Arah Hubungan Kausal (A sebab B, B sebab A, atau akibat dari penyebab bersama).
  - *Arketipe 2*: Kekeliruan Korelasi Semu & Variabel Perancu (*Confounding Factor / Spurious Correlation*).
  - *Arketipe 3*: Kausalitas Terbalik (*Reverse Causation Fallacy*).
  - *Arketipe 4*: Evaluasi Validitas Klaim Sebab-Akibat (HOTS: penguatan/pelemahan hipotesis kausal via intervensi/kontrol).

---

### Bab 02: Penalaran Deduktif
*Prinsip: Kesimpulan deduktif bersifat mutlak/niscaya apabila premis-premis bernilai benar dan kaidah penarikan kesimpulan valid.*
- **`pu-02-01` Logika Proposisi (Konjungsi, Disjungsi, Implikasi, Biimplikasi)**:
  - *Arketipe 1*: Penentuan Nilai Kebenaran Proposisi Majemuk ($p \\land q$, $p \\lor q$, $p \\oplus q$).
  - *Arketipe 2*: Analisis Syarat Cukup (*Sufficient Condition*) vs Syarat Perlu (*Necessary Condition*).
  - *Arketipe 3*: Logika Biimplikasi ($p \\iff q$) dan Syarat Mutlak Ganda (*if and only if*).
  - *Arketipe 4*: Evaluasi Konsistensi Pernyataan Majemuk Regulasi / Kebijakan Publik.
- **`pu-02-02` Ekuivalensi dan Negasi Pernyataan**:
  - *Arketipe 1*: Kontraposisi Implikasi Tunggal ($p \\implies q \\equiv \\sim q \\implies \\sim p$).
  - *Arketipe 2*: Bentuk Ekuivalensi Disjungtif ($p \\implies q \\equiv \\sim p \\lor q$).
  - *Arketipe 3*: Negasi Proposisi Majemuk Bersyarat ($\\sim(p \\implies q) \\equiv p \\land \\sim q$).
  - *Arketipe 4*: Hukum De Morgan pada Negasi Kompleks ($\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$).
- **`pu-02-03` Penarikan Kesimpulan (Modus Ponens, Modus Tollens, Silogisme)**:
  - *Arketipe 1*: Rantai Silogisme Hipotetis Multi-Premis ($p \\implies q$, $q \\implies r \\vdash p \\implies r$).
  - *Arketipe 2*: Deteksi Kesesatan Pikir Formal (*Affirming the Consequent & Denying the Antecedent*).
  - *Arketipe 3*: Premis Majemuk Campuran & Kontraposisi Rantai Bersyarat.
  - *Arketipe 4*: Silogisme Disjungtif & Dilema Konstruktif ($p \\lor q$, $\\sim p \\vdash q$).
- **`pu-02-04` Logika Kuantor dan Diagram Venn**:
  - *Arketipe 1*: Kesimpulan Kuantor Campuran (Universal *Semua* + Partikular *Ada/Sebagian*).
  - *Arketipe 2*: Relasi Tiga Entitas melalui Diagram Venn (irisan, komplemen, himpunan bagian, lepas).
  - *Arketipe 3*: Jebakan Dua Premis Partikular (*Invalid Syllogism*: sebagian A adalah B, sebagian B adalah C).
  - *Arketipe 4*: Negasi Pernyataan Berkuantor Universal dan Partikular.
- **`pu-02-05` Penalaran Analitik (Urutan dan Kombinasi Posisi)**:
  - *Arketipe 1*: Urutan Linier Bertingkat dan Penjadwalan Waktu (antrean, ranking, jadwal presentasi).
  - *Arketipe 2*: Posisi Tempat Duduk Bersyarat (sebaris, berhadapan meja, melingkar).
  - *Arketipe 3*: Kombinasi Tim dan Penugasan Bersyarat (syarat saling tolak & saling tarik).
  - *Arketipe 4*: Skenario Kondisional Bercabang (*If-Then Sub-Scenarios*).
- **`pu-02-06` Evaluasi Argumen (Memperkuat dan Memperlemah Pernyataan)**:
  - *Arketipe 1*: Pelemahan Argumen via Penjelasan Alternatif (*Alternative Explanation*).
  - *Arketipe 2*: Penguatan Argumen via Bukti Korelatif / Eliminasi Faktor Luar.
  - *Arketipe 3*: Identifikasi Asumsi Implisit (*Unstated Necessary Assumption*).
  - *Arketipe 4*: Evaluasi Tingkat Kerusakan Argumen terhadap Fakta Penyelidikan Baru (HOTS).

---

### Bab 03: Penalaran Kuantitatif
*Prinsip: Penalaran numerik, aljabar kontekstual, spasial, dan interpretasi data berbasis ketelitian matematis.*
- **`pu-03-01` Pola Bilangan dan Deret**:
  - *Arketipe 1*: Deret Aritmetika / Geometri Bertingkat Dua dan Tiga.
  - *Arketipe 2*: Deret Larik Melompat / Pola Berseling (2-3 larik independen).
  - *Arketipe 3*: Pola Operasi Kombinasi Berulang ($x_n = a \\cdot x_{n-1} \\pm b$).
  - *Arketipe 4*: Deret Pecahan Pola Pembilang & Penyebut Terpisah.
- **`pu-03-02` Pola Gambar dan Spasial Numerik**:
  - *Arketipe 1*: Spasial Angka dalam Figur Geometri (segitiga, lingkaran terbagi, bangun bintang).
  - *Arketipe 2*: Matriks Angka Berordo $3 \\times 3$ dengan Operasi Baris dan Kolom Terpadu.
  - *Arketipe 3*: Serial Spasial Geometris (rotasi sudut, inversi warna, translasi langkah).
  - *Arketipe 4*: Pola Gambar Analogi Struktur Hubungan Bentuk.
- **`pu-03-03` Operasi Hitung dan Aritmetika Dasar**:
  - *Arketipe 1*: Operasi Campuran Pecahan, Desimal, dan Persentase dengan Trik Faktorisasi.
  - *Arketipe 2*: Operasi Lambang Khusus Aljabar ($x \\oplus y = \\frac{x \\cdot y - k}{x + y}$).
  - *Arketipe 3*: Estimasi Komparasi Pecahan Ekstrem / Nilai $P$ vs $Q$ tanpa Kalkulator.
  - *Arketipe 4*: Sifat Keterbagian Bilangan Bulat dan Bilangan Prima Bersyarat.
- **`pu-03-04` Perbandingan Senilai dan Berbalik Nilai**:
  - *Arketipe 1*: Rasio Bertingkat Multi-Variabel ($A : B$ dan $B : C$).
  - *Arketipe 2*: Kecepatan, Jarak, dan Waktu Tempuh Berbalik Nilai (susul-menyusul, papasan).
  - *Arketipe 3*: Proyek Terhenti dan Kebutuhan Pekerja Tambahan (konsep *mandays*).
  - *Arketipe 4*: Masalah Debit Aliran Fluida dan Pengisian Pipa Ganda Simultan.
- **`pu-03-05` Interpretasi Data (Tabel, Grafik, Diagram)**:
  - *Arketipe 1*: Persentase Kenaikan / Penurunan Tertinggi dari Tabel Multi-Kategori.
  - *Arketipe 2*: Laju Pertumbuhan Rata-rata dan Pertumbuhan Relatif antar Periode.
  - *Arketipe 3*: Evaluasi Simpulan Statistik & Kesesuaian Pernyataan terhadap Tabel (HOTS).
  - *Arketipe 4*: Perbandingan Rasio Proporsi Diagram Lingkaran (*Pie Chart*) terhadap Nilai Riil.

---

## 5. PROTOKOL ALUR KERJA (WORKFLOW MESIN)

1. **Baca State**: Buka `PU-STATE.json` di root untuk membaca `next_target`.
2. **Baca File Target**: Muat file JSON yang ditunjuk oleh `next_target` untuk mengetahui jumlah dan konten soal yang sudah ada.
3. **Generate 1 Batch (5 Soal)**: Buat tepat 5 soal mengikuti urutan 5 domain wacana dan arketipe sub-bab terkait.
4. **Sinkronisasi**:
   - Masukkan 5 soal baru ke `src/data/materials/puMaterials.ts`.
   - Jalankan `node scripts/export_materials.mjs` untuk menyelaraskan file JSON publik dan konten.
   - Jalankan `npm run build` untuk memverifikasi integritas TypeScript dan build aplikasi.
5. **Perbarui `PU-STATE.json`**:
   - Update nilai `current`, `status`, `total_current`, dan `progress_percentage`.
   - Jika file telah mencapai target 20 soal, setel statusnya menjadi `"DONE"` dan pindahkan `next_target` ke file berikutnya yang belum selesai.
   - Jika seluruh sub-bab telah mencapai 20 soal (total 280), setel `next_target: null` dan cantumkan tag `[TRACKER_SELESAI]`.
