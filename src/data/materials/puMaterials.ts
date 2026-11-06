import type { Material } from '../../types/material';

export const MATERIAL_PU_01_01: Material = {
  metadata: {
    id: 'pu-1-1',
    subtest: 'PU',
    chapter_num: 1,
    chapter_title: 'Penalaran Induktif',
    subchapter_num: '1.1',
    subchapter_title: 'Generalisasi',
    title: 'Generalisasi',
    required_question_variations: [
      'Simpulan Proporsi Sampel',
      'Simpulan Tren Induktif Berkala',
      'Evaluasi Kualitas Generalisasi (HOTS)',
    ],
    requires_svg: false,
    updated_at: '2026-11-06',
  },
  content: {
    tactical_overview:
      'Simpulan induktif generalisasi tidak pernah 100% pasti mutlak, melainkan bersifat probabilistik. Kunci utama UTBK: waspadai lompatan cakupan sampel (scope) dan selalu eliminasi opsi jawaban dengan kuantor ekstrem mutlak (pasti, selalu, seluruh) jika data teks memiliki batasan atau pengecualian.',
    exam_blueprint_markdown: `### 1. Konsep & Pola Logika Inti

**Generalisasi** adalah proses penarikan simpulan umum berdasarkan sejumlah data, fakta, atau peristiwa khusus (sampel) yang memiliki kemiripan sifat.

$$P(x_1) \\land P(x_2) \\land \\dots \\land P(x_n) \\xrightarrow{\\text{Induksi}} \\text{Kemungkinan besar } \\forall x, P(x)$$

- **Prinsip Utama UTBK:** Simpulan induktif **tidak pernah 100% pasti mutlak**, melainkan bersifat **probabilistik** (*kemungkinan besar, cenderung, sebagian besar, umumnya*).
- **Syarat Generalisasi Kuat:**
  1. **Kuantitas Sampel Memadai:** Semakin banyak contoh khusus ($n$) yang diamati, semakin kuat simpulannya.
  2. **Representatif:** Sampel mewakili keseluruhan populasi, bukan kasus ekstrem atau anomali.
  3. **Kesesuaian Cakupan (*Scope*):** Simpulan tidak melompat keluar dari kategori kelompok yang dibahas pada premis.

---

### 2. Tabel Terjemahan Premis ke Simpulan Valid

| Pola Data pada Teks (Premis Khusus) | Kata Kunci Simpulan Valid | Kata Kunci Pengecoh (Opsi Salah) |
| :--- | :--- | :--- |
| Seluruh sampel yang diamati memiliki sifat $A$ tanpa terkecuali. | *Umumnya*, *cenderung*, *kemungkinan besar*, *pada umumnya*. | *Pasti*, *selalu*, *tidak mungkin tidak*, *mutlak* (Terlalu ekstrem). |
| Mayoritas sampel memiliki sifat $A$, tetapi ada 1–2 pengecualian. | *Sebagian besar*, *mayoritas*, *hampir semua*. | *Semua*, *setiap*, *seluruh* (Mengabaikan pengecualian). |
| Tren data meningkat/menurun secara konsisten dari periode $t_1$ ke $t_n$. | *Cenderung meningkat/menurun*, *diprediksi akan terus...* | *Akan naik selamanya*, *tidak akan pernah turun lagi*. |

---

### 3. Jebakan Konsep (*Common Pitfalls*)

- **Hasty Generalization (Generalisasi Terburu-buru):** Menarik simpulan untuk seluruh populasi hanya dari 1 atau 2 sampel yang tidak mewakili.
- **Overgeneralization (Lompatan Cakupan):** Teks hanya membahas *"siswa SMA di kota X"*, tetapi opsi jawaban menyimpulkan *"seluruh pelajar di Indonesia"*.
- **Jebakan Kuantor Universal (*"Semua/Selalu"*):** Jika di dalam teks terdapat kata *"beberapa"*, *"sebagian"*, atau ada kasus pengecualian, langsung **eliminasi** opsi yang menggunakan kata *"semua"* atau *"pasti"*.`,
    visualizations_svg: [],
    distractor_traps: [
      'Hasty Generalization (Generalisasi Terburu-buru): Menarik simpulan untuk seluruh populasi hanya dari 1 atau 2 sampel yang tidak mewakili.',
      'Overgeneralization (Lompatan Cakupan/Scope): Teks hanya membahas siswa SMA di kota X, tetapi opsi jawaban melompat menyimpulkan seluruh pelajar di Indonesia.',
      'Jebakan Kuantor Universal ("Semua/Selalu"): Jika di dalam teks terdapat kata beberapa, sebagian, atau ada kasus pengecualian, langsung eliminasi opsi yang menggunakan kata semua atau pasti.',
    ],
    quick_execution_algorithm: [
      'Identifikasi populasi dan ukuran sampel (n) yang diobservasi dalam teks wacana.',
      'Periksa apakah terdapat data pengecualian atau hanya mencakup wilayah/sub-populasi tertentu.',
      'Eliminasi opsi berkuantor ekstrem (pasti, selalu, mutlak) atau opsi yang melompat keluar cakupan (out of scope).',
      'Pilih simpulan probabilistik (cenderung, sebagian besar, kemungkinan besar) yang setia pada data premis.',
    ],
  },
  worked_examples: [
    {
      example_id: 'pu-01-01-ex1',
      variation_name: 'Variasi 1: Simpulan Proporsi Sampel (Level: Mudah)',
      difficulty: 'easy',
      question_type: 'standard_mc',
      context_markdown:
        'Survei terhadap 500 pengguna motor listrik di Jakarta menunjukkan bahwa 460 di antaranya merasakan penghematan biaya operasional bulanan hingga 60% dibandingkan saat menggunakan motor berbahan bakar bensin. Sebanyak 40 pengguna lainnya merasa biayanya sama saja karena jarak tempuh harian mereka sangat pendek.',
      question_markdown:
        'Simpulan yang **paling tepat** berdasarkan teks tersebut adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Semua pengguna motor listrik di Jakarta berhasil menghemat biaya operasional hingga 60%.',
        },
        {
          key: 'B',
          text_markdown:
            'Motor berbahan bakar bensin selalu lebih boros bagi seluruh masyarakat di Jakarta.',
        },
        {
          key: 'C',
          text_markdown:
            'Sebagian besar pengguna motor listrik di Jakarta mengalami penghematan biaya operasional bulanan yang signifikan.',
        },
        {
          key: 'D',
          text_markdown:
            'Pengguna motor dengan jarak tempuh pendek pasti tidak cocok menggunakan motor listrik.',
        },
        {
          key: 'E',
          text_markdown:
            'Masyarakat luar Jakarta juga akan menghemat biaya hingga 60% jika beralih ke motor listrik.',
        },
      ],
      correct_answer: 'C',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Populasi sampel:** Pengguna motor listrik di Jakarta ($n = 500$).
- **Proporsi sifat utama:** $\\frac{460}{500} = 92\\%$ mengalami penghematan biaya operasional signifikan, sedangkan $8\\%$ tidak.
- Karena proporsi mencapai $92\\%$ (mayoritas, namun bukan $100\\%$ mutlak), kuantor yang valid adalah *"sebagian besar"* pada populasi target *"pengguna motor listrik di Jakarta"*.

**Jawaban: C**`,
      quick_trick_markdown: `**Cara Cepat (Eliminasi Kata Ekstrem & Scope):**

- Eliminasi **A** (kata *"Semua"* salah karena ada 40 responden yang tidak menghemat).
- Eliminasi **B** & **D** (kata *"selalu"* dan *"pasti"* terlalu mutlak).
- Eliminasi **E** (*Out of scope*: teks hanya meneliti Jakarta, bukan luar Jakarta).

Tersisa **C**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Mengabaikan 40 responden yang tidak hemat (terlalu absolut).
- **B Salah:** Menyimpulkan hal mutlak ('selalu') bagi seluruh masyarakat yang tidak diteliti.
- **D Salah:** Menyimpulkan vonis mutlak ('pasti tidak cocok') yang tidak dinyatakan dalam data.
- **E Salah:** Out of scope (menggeneralisasi ke masyarakat luar Jakarta tanpa data).`,
    },
    {
      example_id: 'pu-01-01-ex2',
      variation_name: 'Variasi 2: Simpulan Tren Induktif Berkala (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Pada kuartal pertama, penjualan komoditas kopi arabika dari daerah pegunungan tengah meningkat 12% setelah petani menerapkan teknik fermentasi tertutup. Pada kuartal kedua dan ketiga, petani di tiga kabupaten sekitar ikut menerapkan teknik yang sama dan mencatatkan peningkatan penjualan masing-masing sebesar 15% dan 18%.',
      question_markdown:
        'Manakah pernyataan yang **paling mungkin benar** mengenai penerapan teknik fermentasi tertutup tersebut?',
      options: [
        {
          key: 'A',
          text_markdown:
            'Teknik fermentasi tertutup merupakan satu-satunya cara untuk meningkatkan penjualan kopi arabika.',
        },
        {
          key: 'B',
          text_markdown:
            'Penerapan teknik fermentasi tertutup cenderung berdampak positif terhadap peningkatan penjualan kopi arabika di wilayah tersebut.',
        },
        {
          key: 'C',
          text_markdown:
            'Kopi robusta yang diolah dengan teknik fermentasi tertutup juga akan mengalami kenaikan penjualan di atas 10%.',
        },
        {
          key: 'D',
          text_markdown:
            'Pada kuartal keempat, penjualan kopi arabika pasti akan meningkat sebesar 21%.',
        },
        {
          key: 'E',
          text_markdown:
            'Petani yang tidak menggunakan teknik fermentasi tertutup akan mengalami kerugian besar.',
        },
      ],
      correct_answer: 'B',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Data khusus:** Kuartal 1 ($+12\\%$), Kuartal 2 ($+15\\%$), Kuartal 3 ($+18\\%$) pada komoditas kopi arabika setelah penerapan teknik fermentasi tertutup.
- **Induksi tren:** Kenaikan konsisten di beberapa wilayah dan waktu menunjukkan kecenderungan dampak positif teknik tersebut terhadap penjualan kopi arabika di wilayah penelitian.

**Jawaban: B**`,
      quick_trick_markdown: `**Cara Cepat (Eliminasi Kata Ekstrem & Scope):**

- **A** salah: Kata *"satu-satunya"* tidak didukung teks wacana.
- **C** salah: Lompatan objek ke *"kopi robusta"* (cakupan berbeda).
- **D** salah: Prediksi angka spesifik *"pasti 21%"* terlalu mutlak dan mendahului data empiris.
- **E** salah: Teks tidak membahas nasib petani yang tidak memakai teknik tersebut (*negasi premis yang tidak sah*).

Jawaban: **B**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Klaim absolut tanpa dasar bukti ('satu-satunya cara').
- **C Salah:** Lompatan jenis komoditas di luar konteks (arabika $\\to$ robusta).
- **D Salah:** Ekstrapolasi angka mutlak ('pasti 21%').
- **E Salah:** Menarik kesimpulan negatif sepihak tentang kondisi yang tidak diuji.`,
    },
    {
      example_id: 'pu-01-01-ex3',
      variation_name: 'Variasi 3: Evaluasi Kualitas Generalisasi / HOTS (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Seorang peneliti menyimpulkan bahwa *"Konsumsi cokelat hitam setiap pagi dapat meningkatkan daya ingat jangka pendek pada seluruh kelompok usia dewasa."* Simpulan ini diambil setelah ia menguji 25 mahasiswa tingkat akhir di sebuah universitas teknik yang diberi 30 gram cokelat hitam setiap pagi selama dua minggu, dan hasilnya skor tes memori mereka meningkat rata-rata 20%.',
      question_markdown:
        'Manakah pernyataan di bawah ini yang **paling tepat mengevaluasi kelemahan** dari generalisasi peneliti tersebut?',
      options: [
        {
          key: 'A',
          text_markdown:
            'Peneliti tidak membandingkan efek cokelat hitam dengan cokelat susu pada mahasiswa tersebut.',
        },
        {
          key: 'B',
          text_markdown:
            'Durasi penelitian selama dua minggu terlalu lama untuk mengukur daya ingat jangka pendek.',
        },
        {
          key: 'C',
          text_markdown:
            'Sampel yang digunakan terlalu sempit dan homogen sehingga tidak mewakili seluruh kelompok usia dewasa.',
        },
        {
          key: 'D',
          text_markdown:
            'Peningkatan skor memori sebesar 20% belum cukup signifikan secara statistik untuk ditarik simpulan.',
        },
        {
          key: 'E',
          text_markdown:
            'Mahasiswa universitas teknik sudah memiliki daya ingat yang tinggi sebelum mengonsumsi cokelat hitam.',
        },
      ],
      correct_answer: 'C',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Klaim simpulan peneliti:** Berlaku untuk *"seluruh kelompok usia dewasa"* (rentang usia 18 hingga 65+ tahun dengan beragam kondisi fisik dan latar belakang pekerjaan).
- **Bukti sampel:** Hanya $n = 25$ mahasiswa tingkat akhir (usia $\\approx 21-23$ tahun) di satu fakultas universitas teknik yang sangat homogen.
- **Cacat logika:** *Unrepresentative sample / Hasty generalization* (sampel terlalu sempit dan homogen untuk menggeneralisasi seluruh populasi usia dewasa).

**Jawaban: C**`,
      quick_trick_markdown: `**Cara Cepat (Cek Kesenjangan Sampel vs Klaim):**

- Sampel = *25 mahasiswa teknik (homogen)*.
- Klaim simpulan = *seluruh usia dewasa (sangat heterogen)*.
- Letak kelemahan fatal adalah ketidaksesuaian cakupan sampel dengan klaim populasi target.

Jawaban: **C**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Perbandingan dengan cokelat susu bukan fokus uji hipotesis cokelat hitam.
- **B Salah:** Durasi 2 minggu wajar dalam uji klinis memori.
- **D Salah:** Kenaikan rerata 20% adalah angka yang sangat besar dan secara deskriptif signifikan.
- **E Salah:** Peningkatan diukur dari baseline skor mahasiswa itu sendiri (sebelum vs sesudah intervensi).`,
    },
  ],
};

export const MATERIAL_PU_01_02: Material = {
  metadata: {
    id: 'pu-1-2',
    subtest: 'PU',
    chapter_num: 1,
    chapter_title: 'Penalaran Induktif',
    subchapter_num: '1.2',
    subchapter_title: 'Analogi',
    title: 'Analogi',
    required_question_variations: [
      'Prediksi Berbasis Analogi Fenomena',
      'Parallel Reasoning (Pola Penalaran Setara)',
      'Memperlemah Analogi / Critical Disanalogy (HOTS)',
    ],
    requires_svg: false,
    updated_at: '2026-11-06',
  },
  content: {
    tactical_overview:
      'Analogi menarik kesimpulan berdasarkan kemiripan esensial antar dua entitas atau sistem. Kunci UTBK: Kenali apakah soal meminta transfer sifat (A ke B), parallel reasoning (kesetaraan struktur logika), atau mencari critical disanalogy (perbedaan kritis yang meruntuhkan kesimpulan).',
    exam_blueprint_markdown: `### 1. Konsep & Pola Logika Inti

**Analogi Induktif** adalah penarikan simpulan dengan membandingkan dua entitas atau fenomena berbeda ($A$ dan $B$) yang memiliki sejumlah kesamaan sifat esensial ($p_1, p_2, p_3$). Jika entitas $A$ diketahui memiliki sifat tambahan $q$ yang berkaitan erat dengan sifat-sifat esensial tersebut, maka entitas $B$ disimpulkan kemungkinan besar juga memiliki sifat $q$.

$$\\left. \\begin{array}{l} \\text{Objek } A \\text{ memiliki sifat } p_1, p_2, p_3, \\text{ dan } q \\\\ \\text{Objek } B \\text{ memiliki sifat } p_1, p_2, p_3 \\end{array} \\right\\} \\xrightarrow{\\text{Analogi}} \\text{Objek } B \\text{ kemungkinan besar memiliki sifat } q$$

- **Dua Tipe Soal Analogi di UTBK:**
  1. **Analogi Argumen/Fenomena (Wacana):** Menyimpulkan nasib atau sifat objek $B$ berdasarkan kemiripan karakteristiknya dengan objek $A$, atau mencari pernyataan yang memiliki **pola penalaran sepadan** (*parallel reasoning*).
  2. **Analogi Relasi Konsep:** Memetakan fungsi atau mekanisme kerja suatu sistem dengan sistem lain yang sejenis.

---

### 2. Tabel Pola Relasi Analogi yang Sering Muncul

| Jenis Pola Analogi | Struktur Hubungan ($A \\approx B$) | Contoh Penerapan di UTBK |
| :--- | :--- | :--- |
| **Kesamaan Mekanisme / Fungsi** | Komponen $X$ pada sistem $A$ bekerja dengan cara yang sama seperti komponen $Y$ pada sistem $B$. | Cara kerja *firewall* menyaring trafik jaringan $\\approx$ cara kerja sistem imun menyaring patogen tubuh. |
| **Prediksi Dampak Kebijakan** | Wilayah/Kasus $A$ dan $B$ punya kondisi demografis serupa. Kebijakan $P$ sukses di $A \\implies$ Kebijakan $P$ diprediksi sukses di $B$. | Subsidi transportasi publik di Kota $X$ menurunkan macet $\\implies$ di Kota $Y$ yang berkarakteristik serupa juga akan menurunkan macet. |
| **Parallel Reasoning (Struktur Setara)** | Meniru struktur pola logika kalimat tanpa memedulikan topik pembicaraan. | *"Jika bahan baku langka, harga naik. Saat ini harga tidak naik, maka bahan baku tidak langka"* $\\approx$ pola Modus Tollens pada bidang kedokteran atau hukum. |

---

### 3. Jebakan Konsep (*Common Pitfalls*)

- **False Analogy (Analogi Palsu/Dangkal):** Membandingkan dua objek hanya karena kemiripan permukaan atau nama, padahal mekanisme dasarnya bertolak belakang (contoh: menyamakan pengelolaan anggaran negara dengan tabungan uang saku anak sekolah).
- **Mengabaikan Perbedaan Kritis (*Critical Disanalogy*):** Jika terdapat satu perbedaan faktor krusial antara objek $A$ dan $B$ yang justru menjadi penyebab munculnya sifat $q$, maka analogi langsung gugur.
- **Jebakan Kesamaan Topik Semu:** Terkecoh memilih opsi hanya karena temanya mirip, bukan karena kesamaan struktur argumennya.`,
    visualizations_svg: [],
    distractor_traps: [
      'False Analogy (Analogi Palsu/Dangkal): Membandingkan dua objek hanya karena kemiripan permukaan atau kemiripan nama, padahal mekanisme dasarnya bertolak belakang.',
      'Mengabaikan Perbedaan Kritis (Critical Disanalogy): Jika terdapat satu perbedaan faktor krusial antara objek A dan B yang justru menjadi penyebab munculnya sifat q, maka analogi langsung gugur.',
      'Jebakan Kesamaan Topik Semu: Memilih opsi hanya karena sama-sama membahas bidang yang mirip (misal sains atau teknologi), padahal pola struktur penalarannya tidak sepadan.',
    ],
    quick_execution_algorithm: [
      'Identifikasi sifat dasar bersama (p1, p2, ...) antara entitas A dan entitas B.',
      'Cari sifat simpulan (q) yang ingin ditransfer dari A ke B.',
      'Periksa apakah ada perbedaan kritis (critical disanalogy) yang merusak hubungan kausal antara sifat esensial dengan q.',
      'Untuk soal Parallel Reasoning, abstraksikan kalimat ke formula logika simbolik sebelum mencocokkan struktur dengan opsi jawaban.',
    ],
  },
  worked_examples: [
    {
      example_id: 'pu-01-02-ex1',
      variation_name: 'Variasi 1: Prediksi Berbasis Analogi Fenomena (Level: Mudah)',
      difficulty: 'easy',
      question_type: 'standard_mc',
      context_markdown:
        'Planet Kepler-186f dan Bumi sama-sama berada di zona laik huni (*habitable zone*) bintang induknya, memiliki komposisi batuan silikat yang padat, serta menerima intensitas radiasi bintang yang memungkinkan air tetap berada dalam fase cair di permukaan. Di Bumi, kombinasi ketiga kondisi tersebut memungkinkan terbentuknya siklus hidrologi yang stabil.',
      question_markdown:
        'Berdasarkan penalaran analogi, simpulan yang **paling mungkin benar** adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Planet Kepler-186f pasti dihuni oleh makhluk hidup cerdas seperti di Bumi.',
        },
        {
          key: 'B',
          text_markdown:
            'Planet Kepler-186f memiliki ukuran dan jumlah satelit alami yang persis sama dengan Bumi.',
        },
        {
          key: 'C',
          text_markdown:
            'Planet Kepler-186f kemungkinan besar juga memiliki potensi terbentuknya siklus hidrologi yang stabil.',
        },
        {
          key: 'D',
          text_markdown:
            'Semua planet di luar tata surya yang berbatu padat memiliki air dalam fase cair.',
        },
        {
          key: 'E',
          text_markdown:
            'Bumi dan Planet Kepler-186f terbentuk pada waktu yang bersamaan.',
        },
      ],
      correct_answer: 'C',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Entitas A (Bumi):** Zona laik huni ($p_1$) + batuan silikat ($p_2$) + air fase cair ($p_3$) $\\implies$ siklus hidrologi stabil ($q$).
- **Entitas B (Kepler-186f):** Memiliki sifat $p_1, p_2, p_3$.
- **Simpulan analogi:** Kepler-186f kemungkinan besar juga memiliki sifat $q$ (potensi terbentuknya siklus hidrologi yang stabil).

**Jawaban: C**`,
      quick_trick_markdown: `**Cara Cepat (Cek Pasangan Sifat q):**

- Cari sifat milik Bumi di akhir kalimat teks yang belum disebutkan untuk Kepler-186f: *"siklus hidrologi yang stabil"*.
- Pasangkan dengan kata bernada probabilistik (*"kemungkinan besar"*).

Jawaban langsung terlihat: **C**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Lompatan kesimpulan liar ('makhluk hidup cerdas') yang tidak dibahas dalam premis wacana.
- **B Salah:** Kesamaan zona laik huni tidak menyiratkan ukuran satelit sama persis.
- **D Salah:** Generalisasi berlebihan pada seluruh planet di alam semesta.
- **E Salah:** Tidak ada data waktu pembentukan kedua planet.`,
    },
    {
      example_id: 'pu-01-02-ex2',
      variation_name: 'Variasi 2: Parallel Reasoning / Pola Penalaran Setara (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown: `Perhatikan argumen berikut:

*"Melatih otot tubuh dengan beban yang ditingkatkan secara bertahap akan membuat serat otot beradaptasi dan menjadi lebih kuat. Sebaliknya, jika beban terlalu ekstrem sejak hari pertama, otot justru akan mengalami cedera. Demikian pula dalam mempelajari pemrograman komputer; memberikan latihan logika secara bertahap akan membangun pemahaman yang kokoh, sedangkan langsung memaksakan proyek berskala besar kepada pemula justru akan memicu kejenuhan dan kegagalan."*`,
      question_markdown:
        'Manakah situasi di bawah ini yang menggunakan **pola penalaran analogi paling serupa** dengan teks di atas?',
      options: [
        {
          key: 'A',
          text_markdown:
            'Membaca buku sejarah setiap hari akan memperluas wawasan seseorang, sama halnya dengan menonton film dokumenter sejarah di televisi.',
        },
        {
          key: 'B',
          text_markdown:
            'Memberikan pupuk secara bertahap sesuai usia tanaman akan menyuburkan pertumbuhannya, sedangkan pemberian dosis berlebih sekaligus akan membuat tanaman mati; hal ini serupa dengan pemberian materi ajar kepada siswa yang harus disesuaikan tingkat kesulitannya secara bertahap agar tidak membuat siswa kewalahan.',
        },
        {
          key: 'C',
          text_markdown:
            'Kendaraan listrik membutuhkan pengisian daya baterai secara rutin agar dapat beroperasi, berbeda dengan kendaraan bensin yang dapat diisi dalam waktu singkat di SPBU.',
        },
        {
          key: 'D',
          text_markdown:
            'Seorang atlet lari maraton harus menjaga pola makan dan waktu tidur yang teratur agar staminanya terjaga saat perlombaan berlangsung.',
        },
        {
          key: 'E',
          text_markdown:
            'Belajar bermain gitar membutuhkan latihan jari setiap hari, oleh karena itu semua musisi profesional pasti pernah mengalami sakit pada ujung jari mereka.',
        },
      ],
      correct_answer: 'B',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Struktur argumen asli:** Membandingkan 2 domain berbeda (Fisik/Otot vs Kognitif/Pemrograman) dengan struktur kontras simetris:
  - [Perlakuan bertahap $\\implies$ adaptasi/hasil positif]
  - [Perlakuan berlebih sekaligus $\\implies$ cedera/kegagalan]
- **Evaluasi opsi:** Hanya **B** yang mereplikasi struktur simetris tersebut: Pertanian/Tanaman vs Edukasi/Siswa dengan kontras [pupuk bertahap $\\implies$ subur, berlebih $\\implies$ mati] $\\approx$ [materi bertahap $\\implies$ paham, drastis $\\implies$ kewalahan].

**Jawaban: B**`,
      quick_trick_markdown: `**Cara Cepat (Pencocokan Pola Kontras Kembar):**

- Teks asli punya 2 komponen kontras: **"bertahap = berhasil"** vs **"langsung berlebih = rusak"** pada dua domain berbeda.
- Cek opsi: **A** tidak ada sisi kegagalan/negatif; **C** adalah kalimat pembeda (*kontras*), bukan analogi paralel; **D** & **E** hanya membahas 1 domain tunggal.

Jawaban: **B**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Hanya membandingkan dua media belajar tanpa ada komponen kontras kegagalan.
- **C Salah:** Merupakan kalimat pembeda (kontrastif), bukan penalaran analogi sistematis.
- **D Salah:** Hanya satu ranah (atlet) tanpa objek analogi pembanding.
- **E Salah:** Kesimpulan induktif satu bidang (musik) tanpa padanan bidang lain.`,
    },
    {
      example_id: 'pu-01-02-ex3',
      variation_name: 'Variasi 3: Memperlemah Analogi / Critical Disanalogy (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Manajemen Perusahaan Ritel X berencana menerapkan sistem kerja 4 hari seminggu tanpa pemotongan gaji untuk meningkatkan produktivitas karyawan. Keputusan ini didasarkan pada keberhasilan Perusahaan Software Y yang mengalami kenaikan produktivitas sebesar 25% setelah menerapkan sistem kerja 4 hari seminggu karena kedua perusahaan memiliki jumlah karyawan yang sama (300 orang) dan berlokasi di kota metropolitan yang sama.',
      question_markdown:
        'Manakah fakta di bawah ini yang, jika benar, **paling memperlemah** argumen analogi Manajemen Perusahaan Ritel X?',
      options: [
        {
          key: 'A',
          text_markdown:
            'Perusahaan Software Y telah berdiri lima tahun lebih lama dibandingkan Perusahaan Ritel X.',
        },
        {
          key: 'B',
          text_markdown:
            'Sebagian karyawan di Perusahaan Ritel X menggunakan transportasi umum untuk berangkat bekerja.',
        },
        {
          key: 'C',
          text_markdown:
            'Produktivitas Perusahaan Software Y bergantung pada penyelesaian proyek berbasis output mingguan yang fleksibel, sedangkan pendapatan Perusahaan Ritel X bergantung langsung pada jumlah jam operasional toko fisik yang melayani pelanggan setiap hari.',
        },
        {
          key: 'D',
          text_markdown:
            'Perusahaan Software Y memberikan fasilitas makan siang gratis kepada karyawannya, sedangkan Perusahaan Ritel X memberikan tunjangan makan dalam bentuk uang tunai.',
        },
        {
          key: 'E',
          text_markdown:
            'Biaya sewa gedung kantor di kota metropolitan tersebut meningkat sebesar 10% pada tahun ini.',
        },
      ],
      correct_answer: 'C',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- Untuk memperlemah penalaran analogi, cari **perbedaan kritis (*critical disanalogy*)** yang merusak hubungan kausal antara kesamaan pembanding dengan keberhasilan kebijakan.
- Keberhasilan sistem kerja di Perusahaan Software Y didorong oleh model kerja berbasis output proyek yang fleksibel (tidak terikat jam layanan langsung). Sebaliknya, pendapatan Perusahaan Ritel X bergantung langsung pada jumlah jam operasional toko fisik yang melayani pelanggan secara fisik setiap hari. Memangkas hari kerja di toko ritel akan memangkas jam operasional toko dan pendapatan bisnis. Perbedaan kausal ini mematahkan analogi transfer kebijakan.

**Jawaban: C**`,
      quick_trick_markdown: `**Cara Cepat (Cari Perbedaan yang Menghancurkan Mekanisme Inti):**

- Pertanyaan kunci: Perbedaan mana yang membuat sistem kerja 4 hari di software *TIDAK BISA* ditiru di toko ritel?
- Hanya opsi **C** yang menembak langsung perbedaan esensial mekanisme pendapatan bisnis: *software berbasis proyek fleksibel* vs *ritel fisik berbasis jam layanan*.

Jawaban: **C**.`,
      why_others_are_wrong_markdown: `- **A Salah:** Usia berdiri perusahaan tidak memengaruhi efektivitas jam kerja mingguan.
- **B Salah:** Moda transportasi karyawan tidak relevan dengan esensi produktivitas jam kerja.
- **D Salah:** Format tunjangan makan (katering vs tunjangan uang) adalah detail sepele yang tidak mengganggu analogi.
- **E Salah:** Kenaikan biaya sewa gedung dialami kedua pihak dan tidak berhubungan dengan skema 4 hari kerja.`,
    },
  ],
};
