import type { Material } from '../../../types/material';

export const MATERIAL_PPU_01_03: Material = {
  metadata: {
    id: 'ppu-1-3',
    subtest: 'PPU',
    chapter_num: 1,
    chapter_title: 'Makna dan Relasi Kata',
    subchapter_num: '1.3',
    subchapter_title: 'Hipernim dan Hiponim',
    title: 'Hipernim dan Hiponim',
    required_question_variations: [
      'Distingsi Hiponim vs Meronim dalam Teks Sains',
      'Kesepadanan Relasi Kohiponim Horizontal',
      'Penentuan Hipernim Terdekat / Paling Presisi (HOTS)',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Relasi inklusi makna mengatur hubungan taksonomi hierarkis antara hipernim (kata umum superordinat yang memayungi kelas kata lain) dan hiponim (kata khusus subordinat bawahan). Pembeda paling kritis yang sering diujikan di UTBK adalah memisahkan hiponimi (hubungan jenis/taksonomi: "X adalah sejenis Y") dari meronimi (hubungan bagian fisik: "X adalah komponen penyusun dari Y").',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Relasi inklusi makna dalam semantik mengatur hubungan hierarkis dan kategorisasi antarentitas leksikal:

## 1.1 Definisi Hipernim, Hiponim, dan Kohiponim
- **Hipernim (Superordinat / Kata Umum)**: Satuan leksikal yang memiliki cakupan makna luas, umum, dan membawahi kelas kata lain (*unggas*, *kendaraan*, *flora*).
- **Hiponim (Subordinat / Kata Khusus)**: Satuan leksikal yang memiliki cakupan makna sempit, spesifik, dan bernaung di bawah hipernim (*ayam*, *mobil*, *anggrek*).
- **Kohiponim (Ko-subordinat)**: Hubungan kesetaraan koordinatif horizontal antara dua hiponim atau lebih pada tingkat hierarki yang sama di bawah satu hipernim (*ayam* dan *bebek* adalah kohiponim dari *unggas*).

---

## 1.2 Kaidah Relasi Inklusi dan Hierarki Bertingkat (Taksonomi)
1. **Asimetri Inklusi Semantis**: Semua $X$ adalah $Y$, tetapi tidak semua $Y$ adalah $X$.  
   *Contoh*: Semua merpati adalah burung, tetapi tidak semua burung adalah merpati.
2. **Relativitas Jenjang Taksonomi**: Status sebuah kata bersifat relatif terhadap tataran pembandingnya.  
   *Contoh*: *Hewan* adalah hiponim dari *Makhluk Hidup*, tetapi merupakan hipernim bagi *Reptil*.

---

## 1.3 Distingsi Krusial: Hiponim (Is-a) vs. Meronim (Part-of)
- **Hiponimi (Hubungan "Jenis Dari" / *Is-a*)**: Entitas $X$ adalah sejenis $Y$ dan mewarisi seluruh ciri esensialnya (*kelinci* adalah sejenis *mamalia*).
- **Meronimi (Hubungan "Bagian Dari" / *Part-of*)**: Entitas $X$ merupakan komponen fisik / organ penyusun dari keseluruhan $Y$ (*jantung*, *mata*, dan *tangan* adalah meronim dari *tubuh manusia*, bukan jenis manusia).

---

## 1.4 Matriks Komparasi: Hipernim, Hiponim, Kohiponim, dan Meronim

| Dimensi Relasi | Karakteristik Hubungan | Rumus Pengujian Logika | Contoh Kasus Nyata |
| :--- | :--- | :--- | :--- |
| **Hipernim** | Kata umum pembimbing kelas leksikal | Membawahi sejumlah entitas $X_1, X_2, \\dots$ | *Kendaraan* (bagi mobil, motor) |
| **Hiponim** | Kata khusus bawahan taksonomi | "$X$ adalah sejenis $Y$" | *Sedan* (bagi mobil) |
| **Kohiponim** | Hubungan setara horizontal antarkata khusus | "$X_1$ dan $X_2$ bernaung di bawah $Y$ yang sama" | *Bus* dan *Truk* (kohiponim kendaraan besar) |
| **Meronim** | Komponen fisik / organ penyusun | "$X$ merupakan bagian penyusun dari $Y$" | *Mesin*, *ban*, *setir* (meronim dari mobil) |

---

# 2. Pola Jebakan Pengecoh UTBK

1. **Jebakan Meronimi Menyamar sebagai Hiponimi**: Menyajikan nama bagian fisik/organ penyusun tubuh (*akar, batang, daun, insang*) alih-alih jenis taksonomi (*lumut, mangga, anemon*).
2. **Jebakan Ketimpangan Jenjang Taksonomi**: Mencampuradukkan entitas setara kohiponim dengan kelas ordo yang membawahinya di luar level hierarki.
3. **Jebakan Hipernim Terlalu Luas (Over-Generalized)**: Memilih kata pembimbing yang terlampau abstrak (*unsur, benda, bahan alam*) sehingga kehilangan presisi konteks teks.
4. **Jebakan Frasa Kiasan Berunsur Kata Khusus**: Menguji kata khusus yang telah beralih menjadi idiom (*kambing hitam*, *anak emas*) seolah-olah berelasi biologis.

---

# 3. Trik Analisis Taktis (<30 Detik)

1. **Uji Formula Komparasi "Sejenis" vs. "Bagian Dari"**: Jika logis dengan *"X adalah sejenis Y"* $\\rightarrow$ Hiponim; jika hanya logis dengan *"X adalah bagian dari Y"* $\\rightarrow$ Meronim (langsung coret jika soal meminta hiponim).
2. **Uji Simetri Konjungsi Koordinatif**: Hubungkan dengan kata *dan* atau *serta*. Kohiponim wajib berada pada derajat taksonomi yang persis sama (*kubis, kentang, dan wortel*).
3. **Uji Eliminasi Abstraksi Ekstrem**: Prioritaskan hipernim terdekat (*genus proximum*).
4. **Verifikasi Anafora Teks**: Periksa apakah kata umum mampu menjadi kata ganti rujukan yang padu bagi deretan kata khusus wacana.

---

# 4. Rangkuman Inti

- **Hipernim**: Kata umum superordinat (*hewan*).
- **Hiponim**: Kata khusus subordinat (*kucing*).
- **Kohiponim**: Pasangan kata khusus sejajar (*kucing* dan *anjing*).
- **Pembeda Kritis**: Hiponim menyatakan jenis (*is-a*); Meronim menyatakan bagian fisik penyusun (*part-of*).`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Meronimi Menyamar sebagai Hiponimi: Menyajikan nama bagian fisik/organ (akar, batang, daun) alih-alih jenis taksonomi tumbuhan (lumut, mangga).',
      'Jebakan Ketimpangan Jenjang Taksonomi: Mencampuradukkan entitas setara kohiponim dengan kelas ordo yang membawahinya.',
      'Jebakan Hipernim Terlalu Luas (Over-Generalized): Memilih kata pembimbing yang terlampau abstrak (unsur/benda) sehingga kehilangan presisi konteks teks.',
      'Jebakan Frasa Kiasan Berunsur Kata Khusus: Menguji kata khusus yang telah beralih menjadi idiom (kambing hitam, anak emas) seolah-olah berelasi biologis.',
    ],
    quick_execution_algorithm: [
      'Uji Formula Komparasi "Sejenis" vs "Bagian Dari": Jika logis dengan "X adalah sejenis Y" → Hiponim; jika hanya logis dengan "X adalah bagian dari Y" → Meronim (coret jika soal meminta hiponim).',
      'Uji Simetri Konjungsi Koordinatif: Hubungkan dengan kata dan/serta. Kohiponim wajib berada pada derajat taksonomi yang persis sama (sapi, kambing, dan kerbau).',
      'Uji Eliminasi Abstraksi Ekstrem: Prioritaskan hipernim terdekat (genus proximum).',
      'Verifikasi Anafora Teks: Periksa apakah kata umum mampu menjadi kata ganti rujukan yang padu bagi deretan kata khusus wacana.',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-01-03-ex1',
      variation_name: 'Variasi 1: Distingsi Hiponim vs Meronim dalam Teks Sains (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Dalam struktur ekosistem terumbu karang perairan tropis, keberadaan fauna laut memegang peranan krusial dalam menjaga rantai makanan. Degradasi terumbu karang akibat pemanasan global mengancam kelangsungan hidup anemon, nudibranch, serta berbagai jenis ikan karang.',
      question_markdown:
        'Kata bercetak miring berikut yang **tidak** memiliki hubungan relasi hiponim terhadap kata **fauna laut** adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'Anemon',
        },
        {
          key: 'B',
          text_markdown: 'Nudibranch',
        },
        {
          key: 'C',
          text_markdown: 'Ikan karang',
        },
        {
          key: 'D',
          text_markdown: 'Kuda laut',
        },
        {
          key: 'E',
          text_markdown: 'Insang',
        },
      ],
      correct_answer: 'E',
      hint_markdown:
        '💡 **Petunjuk Soal:** Terapkan uji logika: apakah entitas tersebut merupakan *sejenis* fauna laut, ataukah merupakan *organ/bagian fisik tubuh* fauna laut? Hubungan bagian fisik disebut meronim, bukan hiponim.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Kaidah Semantis:** Hiponimi menyatakan hubungan taksonomi jenis (*is-a*), sedangkan meronimi menyatakan hubungan komponen/bagian penyusun fisik (*part-of*).\n- **Uji Entitas:**\n  - *Anemon* adalah sejenis fauna laut (Hiponim).\n  - *Nudibranch* adalah sejenis fauna laut (Hiponim).\n  - *Ikan karang* adalah sejenis fauna laut (Hiponim).\n  - *Kuda laut* adalah sejenis fauna laut (Hiponim).\n  - *Insang* adalah organ pernapasan fisik pada ikan/hewan laut (Meronim / bagian tubuh, bukan jenis fauna laut).\n\n**Jawaban: E**',
      quick_trick_markdown:
        '**Cara Cepat (Uji "Sejenis" vs "Bagian Tubuh"):**\n\n1. Tes: "Insang adalah sejenis fauna laut" $\\rightarrow$ SALAH LOGIKA. Insang adalah bagian fisik organ pernapasan.\n2. Sementara itu anemon, nudibranch, ikan karang, dan kuda laut semuanya adalah nama jenis hewan laut.\n3. Opsi yang bukan hiponim adalah **E**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A, B, C, dan D Salah (sebagai jawaban):** Keempatnya adalah hiponim yang sah karena masing-masing merupakan jenis taksonomi fauna (hewan) laut.',
    },
    {
      example_id: 'ppu-01-03-ex2',
      variation_name: 'Variasi 2: Kesepadanan Relasi Kohiponim Horizontal (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Petani di kawasan dataran tinggi lereng gunung itu membudidayakan kubis, kentang, dan wortel secara tumpang sari untuk memaksimalkan produktivitas lahan vulkanis.',
      question_markdown:
        'Hubungan semantis antara kata **kubis**, **kentang**, dan **wortel** pada kalimat di atas setara dengan hubungan pasangan kata pada kalimat...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Bengkel resmi itu menyediakan berbagai macam suku cadang, seperti busi, rantai, dan oli mesin.',
        },
        {
          key: 'B',
          text_markdown:
            'Di dalam hutan lindung tersebut ditemukan populasi mamalia, harimau sumatra, dan gajah.',
        },
        {
          key: 'C',
          text_markdown:
            'Siswa SMA dapat memilih peminatan sains dengan mata pelajaran fisika, kimia, dan biologi.',
        },
        {
          key: 'D',
          text_markdown:
            'Pameran dirgantara itu menampilkan konstruksi sayap, kokpit, dan badan pesawat.',
        },
        {
          key: 'E',
          text_markdown:
            'Rumah sakit rujukan itu memiliki poli bedah, perawat, dan dokter spesialis.',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Pasangan kata *kubis, kentang, wortel* adalah kohiponim yang berada pada tingkat hierarki yang sama persis di bawah satu hipernim (sayuran). Cari pasangan pada opsi yang murni sejajar sebagai cabang keilmuan/kategori yang sama.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Target:** *Kubis*, *kentang*, dan *wortel* berkedudukan sebagai **kohiponim setara** pada tingkat taksonomi yang persis sejajar di bawah hipernim *sayuran* atau *tanaman pangan hortikultura*.\n- **Evaluasi Opsi:**\n  - Pilihan A: *busi* dan *rantai* adalah suku cadang mekanis padat, sedangkan *oli mesin* adalah zat pelumas cair (ketidakseragaman kategori).\n  - Pilihan B: Cacat hierarki logis; *mamalia* adalah hipernim yang membawahi *harimau* dan *gajah* (mencampur induk taksonomi dengan bawahan).\n  - Pilihan C: *Fisika*, *kimia*, dan *biologi* adalah kohiponim yang persis sejajar di bawah hipernim *cabang ilmu sains / IPA*.\n  - Pilihan D: *Sayap*, *kokpit*, dan *badan pesawat* adalah meronim (komponen fisik pesawat), bukan jenis pesawat.\n  - Pilihan E: *Poli bedah* (ruangan instalasi medis), *perawat* (profesi medis), dan *dokter spesialis* (profesi medis) mencampuradukkan kategori ruangan fisik dan tenaga kerja.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Eliminasi Meronim & Cacat Hierarki):**\n\n1. Target = Tiga jenis sayuran sejajar (kohiponim).\n2. Coret D (bagian fisik pesawat = meronim).\n3. Coret B (ada *mamalia* yang merupakan induk dari harimau = cacat taksonomi).\n4. Coret E (ada *poli bedah* yang merupakan fasilitas ruang, bukan profesi).\n5. Pilihan murni sejajar adalah C (*fisika, kimia, biologi* = tiga cabang ilmu sains sejajar).',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Kategori tidak homogen sempurna antara komponen mekanis suku cadang dengan zat pelumas cair.\n- **Pilihan B Salah:** Menggabungkan hipernim (*mamalia*) bersamaan dengan hiponimnya (*harimau* dan *gajah*).\n- **Pilihan D Salah:** Berelasi meronimi (unsur fisik penyusun pesawat terbang), bukan hubungan jenis.\n- **Pilihan E Salah:** Kategori tidak setara antara instalasi fisik (*poli bedah*) dengan tenaga medis (*perawat, dokter*).',
    },
    {
      example_id: 'ppu-01-03-ex3',
      variation_name: 'Variasi 3: Penentuan Hipernim Terdekat / Paling Presisi / HOTS (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Dalam laporan neraca perdagangan kuartal ketiga, ekspor komoditas nikel, bauksit, dan tembaga mencatatkan surplus devisa tertinggi menyusul kebijakan hilirisasi industri pengolahan dalam negeri.',
      question_markdown:
        'Hipernim yang **paling tepat dan presisi secara semantis** untuk membawahi kata-kata bercetak miring pada wacana di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'Bahan alam',
        },
        {
          key: 'B',
          text_markdown: 'Sumber daya',
        },
        {
          key: 'C',
          text_markdown: 'Mineral logam',
        },
        {
          key: 'D',
          text_markdown: 'Barang tambang',
        },
        {
          key: 'E',
          text_markdown: 'Komoditas primer',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** *Nikel, bauksit, tembaga* semuanya adalah batuan hasil bumi yang memiliki kandungan unsur logam. Carilah payung hipernim yang paling spesifik dan terdekat (*genus proximum*), bukan yang terlalu abstrak/luas.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Esensi Objek:** *Nikel*, *bauksit*, dan *tembaga* merupakan batuan tambang bernilai ekonomis tinggi yang secara spesifik memiliki unsur logam (*metallic minerals*).\n- **Evaluasi Derajat Keumuman:**\n  - *Bahan alam* dan *sumber daya* (opsi A & B) adalah kategori hipernim yang terlampau abstrak dan luas (*over-generalized*), karena juga mencakup air, angin, dan kayu hutan.\n  - *Komoditas primer* (opsi E) terlalu luas karena mencakup produk perkebunan (karet, kelapa sawit, teh).\n  - *Barang tambang* (opsi D) masih terlalu luas karena mencakup barang tambang nonlogam dan energi (batubara, pasir, gas alam, minyak bumi).\n  - *Mineral logam* (opsi C) adalah **hipernim terdekat (genus proximum)** yang secara tepat dan eksklusif membawahi nikel, bauksit, dan tembaga.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Prinsip Genus Proximum):**\n\n1. Cari kata payung paling intim/dekat dengan ketiga objek.\n2. Nikel, bauksit, tembaga $\\rightarrow$ semuanya adalah logam $\\rightarrow$ **Mineral logam (C)**.\n3. Singkirkan *barang tambang* (terlalu luas, masih mencakup batubara/minyak) dan *bahan alam* (sangat abstrak).',
      why_others_are_wrong_markdown:
        '- **Pilihan A & B Salah:** Terlalu abstrak dan mencakup seluruh unsur biosfer bumi termasuk flora dan air.\n- **Pilihan D Salah:** Barang tambang masih mencakup tambang bahan galian C (pasir, batu gamping) dan tambang energi (batubara, migas) yang nonlogam.\n- **Pilihan E Salah:** Komoditas primer mencakup hasil pertanian, perkebunan, dan perikanan.',
    },
  ],
};
