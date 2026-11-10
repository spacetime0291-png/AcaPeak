import type { Material } from '../../../types/material';

export const MATERIAL_PBM_02_02: Material = {
  metadata: {
    id: 'pbm-2-2',
    subtest: 'PBM',
    chapter_num: 2,
    chapter_title: 'Morfologi dan Frasa',
    subchapter_num: '2.2',
    subchapter_title: 'Kata Ulang (Reduplikasi) dan Kata Majemuk',
    title: 'Kata Ulang (Reduplikasi) dan Kata Majemuk',
    required_question_variations: [
      'Analisis Pleonasme dan Makna Reduplikasi',
      'Kaidah Penulisan Kata Majemuk Berimbuhan',
      'Analisis Relasi Semantis Kata Majemuk Idiomatis',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Reduplikasi dan komposisi (kata majemuk) adalah dua pilar morfologis pembentuk satuan kata kompleks dalam bahasa Indonesia. Soal UTBK sering menguji kepekaan terhadap pleonasme kata ulang (kuantor jamak bertemu reduplikasi jamak, atau kata "saling" bertemu verba resiprokal), kaidah penulisan kata majemuk berimbuhan (afiks sepihak dipisah, konfiks apitan dirangkai), serta pembedaan kata majemuk idiomatis metaforis dari konstruksi harfiah.',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Reduplikasi (pengulangan bentuk) dan komposisi (pemajemukan) merupakan mekanisme morfologis derivasional dan infleksional untuk memperkaya kosakata dan melahirkan relasi semantis baru.

---

## 1.1 Reduplikasi (Kata Ulang)

### A. Klasifikasi Bentuk Reduplikasi
1. **Dwilingga (Utuh / Murni)**: Perulangan seluruh bentuk dasar tanpa perubahan fonem (*buku-buku*, *gedung-gedung*).
2. **Dwilingga Salin Suara (Berubah Bunyi)**: Perulangan dengan pergantian fonem vokal atau konsonan (*sayur-mayur*, *bolak-balik*, *mondar-mandir*).
3. **Dwipurwa (Sebagian / Suku Awal)**: Perulangan suku pertama bentuk dasar dengan pelemahan vokal pepet (*tetangga*, *pepohonan*, *dedaunan*, *leluhur*).
4. **Kata Ulang Berimbuhan**: Perulangan bentuk dasar yang berkombinasi serentak atau bertahap dengan afiksasi (*bermain-main*, *tarik-menarik*, *sebaik-baiknya*).
5. **Kata Ulang Semu**: Kata yang bentuknya menyerupai kata ulang tetapi bentuk dasarnya tidak mandiri secara leksikal (*kupu-kupu*, *kura-kura*, *ubur-ubur*, *sia-sia*).

### B. Nilai Makna Gramatikal Reduplikasi
- **Jamak / Pluralitas**: *buku-buku*, *pepohonan*.
- **Tiruan / Imitatif**: *mobil-mobilan*, *orang-orangan*.
- **Berulang-ulang / Frekuentatif**: *menggeleng-gelengkan*, *memukul-mukul*.
- **Saling / Resiprokal**: *tolong-menolong*, *pandang-memandang*, *bahu-membahu*.
- **Intensitas / Superlatif**: *setinggi-tingginya*, *sebaik-baiknya*.
- **Santai / Dispersif**: *duduk-duduk*, *jalan-jalan*.
- **Agak / Aproksimatif**: *kemerah-merahan*, *pusing-pusing*.

---

## 1.2 Kata Majemuk (Komposisi)

### A. Ciri Struktural Kata Majemuk
1. **Ketakterpisahan Struktural**: Unsur-unsur pembentuknya tidak dapat disisipi kata tugas (*yang*, *dan*) tanpa mengubah atau merusak arti (*kamar tidur* $\\neq$ *kamar yang tidur*).
2. **Ketakterbalikan Urutan**: Urutan leksem bersifat kaku dan tidak dapat ditukar (*meja hijau* $\\neq$ *hijau meja*).
3. **Keterikatan Afiksasi (Kaidah EYD V)**:
   - **Afiks Tunggal (Awalan saja atau Akhiran saja)** $\\rightarrow$ **Ditulis Terpisah** (*bertanggung jawab*, *bekerja sama*, *tanda tangani*).
   - **Konfiks / Apitan Serentak (Awalan dan Akhiran bersamaan)** $\\rightarrow$ **Ditulis Serangkai** (*pertanggungjawaban*, *menandatangani*, *melipatgandakan*).

### B. Klasifikasi Kata Majemuk
- **Endosentrik Atributif / Koordinatif**: Memiliki unsur inti yang diterangkan (*kamar tidur*, *tua muda*).
- **Eksosentrik**: Kedua unsurnya tidak berfungsi sebagai inti (*bawah tanah*, *luar negeri*).
- **Idiomatis (Kiasan Penuh)**: Makna gabungan kata berbeda total dari arti harfiah unsur pembentuknya (*kambing hitam* = tumpuan kesalahan, *meja hijau* = pengadilan, *gulung tikar* = bangkrut).
- **Kata Majemuk Senyawa Baku (EYD V)**: Ditulis serangkai sejak bentuk dasarnya (*olahraga*, *kacamata*, *beasiswa*, *saputangan*, *sukacita*, *peribahasa*, *segitiga*).

---

## 1.3 Matriks Komparasi Reduplikasi dan Komposisi

| Dimensi | Reduplikasi Morfologis | Kata Majemuk Biasa | Kata Majemuk Senyawa | Kata Majemuk Idiomatis |
| :--- | :--- | :--- | :--- | :--- |
| **Proses Pembentukan** | Pengulangan bentuk dasar | Penggabungan dua kata dasar mandiri | Penggabungan dua kata padu | Penggabungan makna metaforis |
| **Pemisahan dengan Spasi** | Pakai tanda hubung (-) | Dipisah spasi | Ditulis serangkai tanpa spasi | Dipisah spasi (kecuali senyawa) |
| **Status Penambahan Afiks** | Melekat di awal/akhir bentuk | Pisah jika afiks tunggal; Rangkai jika konfiks | Selalu serangkai | Tetap kiasan terikat konteks |
| **Contoh Baku** | *Murid-murid*, *sayur-mayur* | *Kerja sama*, *tanggung jawab* | *Olahraga*, *kacamata* | *Kambing hitam*, *meja hijau* |
| **Bentuk Berkonfiks** | *Menghubung-hubungkan* | *Pertanggungjawaban* | *Keolahragaan* | *Mengkambinghitamkan* |

---

# 2. Pola Jebakan Pengecoh UTBK

1. **Jebakan Pleonasme Jamak**: Penanda jamak (*para, banyak, seluruh, sejumlah*) mendampingi dwilingga jamak (*para hadirin-hadirin* $\\rightarrow$ salah redundan).
2. **Jebakan Reduplikasi Semu vs. Jamak**: Menganggap kata seperti *kupu-kupu* atau *ubur-ubur* sebagai bentuk jamak, padahal merupakan nomina tunggal mandiri.
3. **Jebakan Penulisan Afiks Parsial vs. Konfiks**: Menulis serangkai kata majemuk yang hanya berprefiks (*bertanggungjawab* $\\rightarrow$ salah; wajib *bertanggung jawab*).
4. **Jebakan Resiprokal Pleonastis**: Menambahkan kata *saling* di depan verba yang sudah bermakna resiprokal (*saling tolong-menolong* $\\rightarrow$ pleonasme).
5. **Jebakan Harfiah vs. Idiomatis**: Membedakan frasa deskriptif biasa (*meja hijau* = meja berwarna hijau) dengan kata majemuk idiomatis (*meja hijau* = lembaga pengadilan).

---

# 3. Trik Analisis Taktis (<30 Detik)

1. **Uji Sisip "Yang" / "Dan"**: Jika disisipi kata *yang* maknanya menjadi rusak/berubah total, maka konstruksi tersebut adalah kata majemuk (*kaki tangan* $\\neq$ *kaki yang tangan*).
2. **Uji Coret Jamak Ganda**: Jika ada kata kuantor jamak bersamaan dengan kata ulang jamak, coret salah satunya dalam evaluasi kalimat efektif.
3. **Hukum "Apitan = Rangkai, Sepihak = Pisah"**: Apitan konfiks ditulis serangkai (*mempertanggungjawabkan*); afiks sepihak dipisah (*tanggung jawabkan*, *bertanggung jawab*).
4. **Uji Isolasi Bentuk Tunggal**: Kata ulang semu tidak memiliki makna leksikal jika dipotong menjadi kata tunggal (*ubur* dari *ubur-ubur* tidak bermakna mandiri).

---

# 4. Rangkuman Inti

- **Reduplikasi**: Meliputi dwilingga, dwipurwa, salin suara, berimbuhan, dan semu.
- **Kata Majemuk**: Membentuk kesatuan makna baru tanpa dapat disisipi kata tugas.
- **Aturan Ejaan**: Afiks tunggal ditulis terpisah; konfiks apitan ditulis serangkai; kata senyawa selalu serangkai (*olahraga*, *kacamata*).`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Pleonasme Jamak: Penanda jamak (para, banyak, seluruh) mendampingi dwilingga jamak (para hadirin-hadirin → salah).',
      'Jebakan Reduplikasi Semu vs Jamak: Menganggap kupu-kupu jamak padahal merupakan nomina tunggal mandiri.',
      'Jebakan Penulisan Afiks Parsial vs Konfiks: Menulis serangkai kata yang hanya berprefiks (bertanggungjawab → salah; harus bertanggung jawab).',
      'Jebakan Resiprokal Pleonastis: Penambahan kata saling pada bentuk resiprokal (saling tolong-menolong → pleonasme).',
      'Jebakan Harfiah vs Idiomatis: Membedakan meja hijau (pengadilan) dengan meja hijau (meja berwarna hijau).',
    ],
    quick_execution_algorithm: [
      'Uji Sisip "Yang" / "Dan": Jika disisipi yang maknanya rusak, konstruksi tersebut adalah kata majemuk (kaki tangan).',
      'Uji Coret Jamak Ganda: Jika ada kuantor jamak bersamaan dengan kata ulang jamak, coret salah satunya dalam analisis kalimat efektif.',
      'Hukum "Apitan = Rangkai, Sepihak = Pisah": Apitan konfiks ditulis serangkai (mempertanggungjawabkan); afiks sepihak dipisah (tanggung jawabkan).',
      'Uji Isolasi Bentuk Tunggal: Kata ulang semu tidak memiliki makna jika dipotong tunggal (ubur dari ubur-ubur).',
    ],
  },
  worked_examples: [
    {
      example_id: 'pbm-02-02-ex1',
      variation_name:
        'Variasi 1: Analisis Pleonasme dan Makna Reduplikasi (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Para juru bicara-juru bicara dari kementerian memaparkan capaian kinerja triwulan pertama.\n(2) Sebelum memulai rapat bilateral, kedua delegasi terlihat saling bersalaman dengan akrab.\n(3) Anak-anak di posko pengungsian tampak terhibur saat bermain mobil-mobilan kayu.\n(4) Berkas usulan pemekaran daerah itu harus segera dikirimkan sesegera mungkin ke pusat.',
      question_markdown:
        'Kalimat yang memuat kesalahan pemborosan kata (**pleonasme**) yang berkaitan langsung dengan proses pengulangan kata adalah kalimat nomor...',
      options: [
        {
          key: 'A',
          text_markdown: '(1) dan (2)',
        },
        {
          key: 'B',
          text_markdown: '(1) dan (3)',
        },
        {
          key: 'C',
          text_markdown: '(2) dan (4)',
        },
        {
          key: 'D',
          text_markdown: '(3) dan (4)',
        },
        {
          key: 'E',
          text_markdown: '(2) dan (3)',
        },
      ],
      correct_answer: 'A',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cermati kalimat (1) yang memuat kata penanda jamak *"para"* berdampingan dengan bentuk ulang jamak *"juru bicara-juru bicara"*. Lalu cermati kalimat (2) yang memuat kata *"saling"* berdampingan dengan verba yang sudah bermakna resiprokal (*"bersalaman"*).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (1):** Terdapat pleonasme jamak ganda. Kata *para* sudah menyatakan jamak/kolektif, sehingga bentuk ulang *juru bicara-juru bicara* menyebabkan kemubaziran kata (seharusnya *para juru bicara* atau *juru-juru bicara*).\n- **Analisis Kalimat (2):** Terdapat pleonasme resiprokal ganda. Kata dasar *salam* yang diberi prefiks *ber-* dalam konteks interaksi dua orang (*bersalaman*) sudah mengandung makna resiprokal ("saling menyalami"). Penggabungan dengan kata *saling* menjadi *saling bersalaman* adalah pemborosan makna.\n- **Kalimat (3):** Bentuk *mobil-mobilan* bermakna tiruan/mainan dan penggunaannya tepat dan efektif.\n- **Kalimat (4):** Memang terdapat redundansi (*segera ... sesegera mungkin*), namun bukan disebabkan oleh kaidah bentukan reduplikasi.\n- Maka pasangan kalimat pleonasme reduplikasi adalah (1) dan (2).\n\n**Jawaban: A**',
      quick_trick_markdown:
        '**Cara Cepat (Deteksi Pola Pleonasme Klasik):**\n\n1. *Para* + kata ulang jamak $\\rightarrow$ Kalimat (1) pasti pleonasme!\n2. *Saling* + kata ber- resiprokal $\\rightarrow$ Kalimat (2) pasti pleonasme!\n3. Pasangan tepat: (1) dan (2) $\\rightarrow$ Opsi **A**.',
      why_others_are_wrong_markdown:
        '- **Pilihan B & E Salah:** Kalimat (3) benar secara tata bahasa; *mobil-mobilan* bermakna tiruan mainan mobil tanpa cacat pleonasme.\n- **Pilihan C & D Salah:** Kalimat (4) memuat pemborosan leksikal kata keterangan, bukan kesalahan kaidah reduplikasi morfologis.',
    },
    {
      example_id: 'pbm-02-02-ex2',
      variation_name:
        'Variasi 2: Kaidah Penulisan Kata Majemuk Berimbuhan (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Dewan komisaris meminta jajaran direksi untuk segera [...] laporan keuangan tahunan secara transparan serta tidak [...] seluruh unit bisnis rintisan di daerah.',
      question_markdown:
        'Bentuk kata turunan majemuk yang baku untuk melengkapi kalimat di atas secara berurutan adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'mempertanggung jawabkan; menganaktirikan',
        },
        {
          key: 'B',
          text_markdown: 'mempertanggungjawabkan; menganaktirikan',
        },
        {
          key: 'C',
          text_markdown: 'mempertanggung jawabkan; menganak tirikan',
        },
        {
          key: 'D',
          text_markdown: 'mempertanggungjawabkan; menganak tirikan',
        },
        {
          key: 'E',
          text_markdown: 'pertanggung jawabkan; meng-anak-tirikan',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Ingat hukum penulisan kata majemuk berimbuhan dalam EYD V: jika kata majemuk mendapat apitan (konfiks) awalan dan akhiran sekaligus, maka seluruh unsur kata majemuk tersebut WAJIB ditulis serangkai tanpa spasi!',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Kaidah Kata Majemuk 1 (Tanggung Jawab):** Bentuk dasarnya adalah *tanggung jawab* (ditulis terpisah). Ketika mendapat konfiks serentak *memper-...-kan*, kedua unsur terikat erat sehingga **wajib ditulis serangkai**: **mempertanggungjawabkan** (bukan *mempertanggung jawabkan*).\n- **Kaidah Kata Majemuk 2 (Anak Tiri):** Bentuk dasarnya adalah *anak tiri* (ditulis terpisah). Ketika mendapat konfiks serentak *me(N)-...-kan*, kedua unsur terikat erat sehingga **wajib ditulis serangkai**: **menganaktirikan** (bukan *menganak tirikan*).\n- Kedua kata turunan wajib ditulis serangkai.\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Hukum Konfiks Serentak):**\n\n1. Ada awalan dan akhiran sekaligus (*memper-...-kan* dan *me-...-kan*) $\\rightarrow$ Wajib serangkai!\n2. Cari opsi di mana kedua kata serangkai total: *mempertanggungjawabkan* dan *menganaktirikan*.\n3. Opsi yang memenuhi adalah **B**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A & C Salah:** Menuliskan spasi pada *mempertanggung jawabkan*, menyalahi kaidah konfiks apitan.\n- **Pilihan D Salah:** Menuliskan spasi pada *menganak tirikan*.\n- **Pilihan E Salah:** Menggunakan tanda hubung tidak baku serta bentuk *pertanggung jawabkan* yang salah secara sintaksis dan ejaan.',
    },
    {
      example_id: 'pbm-02-02-ex3',
      variation_name:
        'Variasi 3: Analisis Relasi Semantis Kata Majemuk Idiomatis (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Alih-alih mengevaluasi kekeliruan internal manajemen, pihak tertentu justru berupaya mencari **kambing hitam** atas melambatnya pertumbuhan ekonomi perusahaan.',
      question_markdown:
        'Frasa berikut yang memiliki pola pembentukan semantis yang **sama** dengan frasa bercetak tebal pada teks di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'tegangan tinggi',
        },
        {
          key: 'B',
          text_markdown: 'hutan gundul',
        },
        {
          key: 'C',
          text_markdown: 'meja hijau',
        },
        {
          key: 'D',
          text_markdown: 'air kelapa',
        },
        {
          key: 'E',
          text_markdown: 'tempat kejadian',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Kata majemuk *kambing hitam* bukan bermakna hewan kambing yang berbulu hitam, melainkan idiom kiasan penuh (orang yang dituduh memikul kesalahan). Cari kata majemuk yang juga bermakna idiomatis metaforis.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Karakteristik Semantik Target:** Kata *kambing hitam* tergolong ke dalam **Kata Majemuk Idiomatis (Kiasan Penuh)**, di mana arti keseluruhan tidak dapat diturunkan dari arti harfiah unsur-unsurnya (*kambing* dan *hitam*), melainkan bermakna "orang yang dijadikan tumpuan kesalahan".\n- **Analisis Pilihan:**\n  - Pilihan A (*tegangan tinggi*): Frasa endosentrik atributif harfiah dalam fisika/kelistrikan.\n  - Pilihan B (*hutan gundul*): Frasa endosentrik atributif harfiah tentang kondisi lingkungan fisik.\n  - Pilihan C (*meja hijau*): Kata majemuk idiomatis penuh yang bermakna "pengadilan / ruang sidang hukum", bukan meja yang dicat warna hijau.\n  - Pilihan D (*air kelapa*): Frasa nomina harfiah yang menyatakan cairan buah kelapa.\n  - Pilihan E (*tempat kejadian*): Frasa endosentrik harfiah yang menyatakan lokasi suatu peristiwa.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Cari Makna Kiasan Penuh / Idiom):**\n\n1. *Kambing hitam* = bukan hewan kambing $\\rightarrow$ Idiom metaforis.\n2. Cek opsi: *Meja hijau* = pengadilan (bukan perabot meja warna hijau) $\\rightarrow$ Idiom metaforis identik!\n3. Opsi A, B, D, dan E semuanya adalah gabungan kata denotatif harfiah.\n4. Pilih **C**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A, B, D, dan E Salah:** Semuanya merupakan konstruksi frasa endosentris harfiah (denotatif murni), di mana makna gabungan kata masih merujuk langsung pada referen nyata unsur-unsur pembentuknya.',
    },
  ],
};
