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
    updated_at: '2026-11-07',
  },
  content: {
    tactical_overview:
      'Generalisasi menarik simpulan umum dari sampel data atau peristiwa khusus. Kunci penting UTBK: simpulan generalisasi tidak pernah bernilai 100% mutlak pasti (hindari kata "semua" atau "pasti"). Pilih simpulan terukur (sebagian besar, cenderung) dan jangan pernah melompat ke luar kelompok/wilayah yang dibahas dalam wacana.',
    exam_blueprint_markdown: `### 1. Bedah Konsep Berdasarkan Contoh Nyata Soal UTBK

Mari kita pelajari cara berpikir **Generalisasi** lewat penggalan teks soal UTBK yang sering muncul:

> **Wacana Soal:**  
> *"Berdasarkan hasil survei terhadap 500 pengguna motor listrik di Jakarta, sebanyak 460 pengguna mengaku berhasil menghemat biaya operasional bulanan hingga 60%. Sementara itu, 40 pengguna lainnya merasa biaya operasionalnya tidak banyak berubah karena jarak tempuh hariannya sangat dekat."*  
>  
> **Pertanyaan UTBK:** *Simpulan yang paling tepat berdasarkan teks di atas adalah...*

Bagaimana cara menentukan kesimpulan yang **sah** di UTBK?

1. **Kenali Datanya (Sampel Khusus):**
   - Yang disurvei: *500 pengguna motor listrik di Jakarta*.
   - Hasilnya: Sebagian besar (460 orang atau 92%) hemat, tetapi **ada 40 orang yang tidak hemat**.

2. **Uji Opsi Jawaban (Mengapa Benar vs Salah?):**
   - ❌ **Opsi Jebakan 1:** *"Semua pengguna motor listrik di Jakarta berhasil menghemat biaya."*  
     👉 **Salah!** Mengapa? Karena ada 40 orang yang tidak hemat. Kata **"Semua"** terlalu mutlak dan mengabaikan fakta teks.
   - ❌ **Opsi Jebakan 2:** *"Masyarakat di seluruh Indonesia pasti hemat jika beralih ke motor listrik."*  
     👉 **Salah!** Wacana hanya meneliti pengguna di Jakarta, bukan seluruh Indonesia (*Lompatan Cakupan/Out of Scope*).
   - ✔️ **Opsi Kunci Jawaban Benar:** *"Sebagian besar pengguna motor listrik di Jakarta mengalami penghematan biaya bulanan."*  
     👉 **Tepat!** Sesuai fakta data wacana dan menggunakan bahasa yang terukur (*sebagian besar*).

---

### 2. Aturan Emas UTBK dalam Menarik Kesimpulan Generalisasi

Dari contoh soal di atas, ada 3 prinsip utama yang selalu diuji dalam UTBK:

1. **Hasil Generalisasi Tidak Pernah 100% Mutlak:**  
   Simpulan induktif selalu bersifat **probabilistik** (kemungkinan). Cari kata kunci: **"sebagian besar"**, **"cenderung"**, **"kemungkinan besar"**, atau **"pada umumnya"**.
2. **Jangan Melompat Keluar dari Batas Wilayah atau Kelompok (Scope):**  
   Jika teks berbicara tentang *"siswa SMA di Surabaya"*, jangan pilih jawaban yang menyimpulkan *"pelajar di Indonesia"*.
3. **Waspadai Kata Mutlak (Pasti, Semua, Selalu):**  
   Jika data di teks ada sedikit saja pengecualian, opsi yang memakai kata **"pasti"** atau **"selalu"** langsung eliminasi.

---

### 3. Tabel Panduan Kata Kunci Soal vs Kunci Jawaban Valid

| Situasi Data di Teks Soal | Pola Jawaban yang BENAR di Kunci | Jebakan Pengecoh yang SALAH (Langsung Eliminasi) |
| :--- | :--- | :--- |
| **Data Mayoritas (Ada Pengecualian)**<br>*Contoh: 9 dari 10 pasien flu sembuh setelah istirahat cukup.* | *"Sebagian besar pasien flu cenderung sembuh dengan istirahat cukup."* | *"Semua pasien flu pasti langsung sembuh jika tidur cukup."* *(Mengabaikan 1 pasien yang belum sembuh)* |
| **Data Tren Meningkat/Menurun**<br>*Contoh: Penjualan produk X naik konsisten di kuartal 1, 2, dan 3.* | *"Penjualan produk X cenderung mengalami tren kenaikan positif."* | *"Penjualan produk X dipastikan akan naik terus selamanya tanpa henti."* *(Terlalu berlebihan/klaim mutlak)* |
| **Data Wilayah / Sampel Terbatas**<br>*Contoh: Uji coba tanaman padi varietas A berhasil subur di dataran tinggi Malang.* | *"Varietas A berpotensi tumbuh baik di daerah dataran tinggi beriklim serupa."* | *"Seluruh lahan pertanian di Indonesia cocok ditanami varietas A."* *(Lompat cakupan ke wilayah lain tanpa data)* |

---

### 4. Trik Eliminasi Cepat di Ruang Ujian (15 Detik)

1. **Langkah 1:** Baca angka atau kata penjelas sampel di teks (apakah ada kata *sebagian*, *mayoritas*, atau persentase tertentu).
2. **Langkah 2:** Langsung coret opsi jawaban yang mengandung kata ekstrem: **semua, seluruh, selalu, pasti, mutlak, tidak pernah**.
3. **Langkah 3:** Coret opsi yang membawa kelompok atau lokasi baru yang tidak pernah dibahas di teks.
4. **Langkah 4:** Pilih opsi yang menggunakan kata terukur seperti **cenderung, sebagian besar, berpotensi, kemungkinan besar**.`,
    visualizations_svg: [],
    distractor_traps: [
      'Hasty Generalization (Generalisasi Terburu-buru): Menarik simpulan untuk seluruh populasi hanya dari 1 atau 2 sampel yang tidak mewakili.',
      'Overgeneralization (Lompatan Cakupan/Scope): Teks hanya membahas siswa SMA di kota X, tetapi opsi jawaban melompat menyimpulkan seluruh pelajar di Indonesia.',
      'Jebakan Kuantor Universal ("Semua/Selalu"): Jika di dalam teks terdapat kata beberapa, sebagian, atau ada kasus pengecualian, langsung eliminasi opsi yang menggunakan kata semua atau pasti.',
    ],
    quick_execution_algorithm: [
      'Identifikasi populasi dan ukuran sampel yang diobservasi dalam teks wacana.',
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
      hint_markdown:
        '💡 **Petunjuk Soal:** Cermati data teks: dari 500 orang, 460 orang hemat (mayoritas) dan 40 orang tidak hemat. Karena ada 40 orang yang tidak hemat, pilihan dengan kata mutlak seperti *"semua"* atau *"selalu"* otomatis salah. Perhatikan juga batasan wilayah penelitian!',
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
      hint_markdown:
        '💡 **Petunjuk Soal:** Penjualan kopi arabika meningkat konsisten pada kuartal 1 (12%), kuartal 2 (15%), dan kuartal 3 (18%). Cari opsi yang menyatakan kecenderungan dampak positif. Hati-hati dengan opsi yang mengganti jenis komoditas (misal kopi robusta) atau menebak angka masa depan secara mutlak!',
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
      hint_markdown:
        '💡 **Petunjuk Soal:** Perhatikan perbedaan antara subjek yang diuji (hanya 25 mahasiswa teknik) dengan simpulan peneliti yang mengklaim berlaku untuk *"seluruh kelompok usia dewasa"*. Apakah sampel 25 mahasiswa teknik cukup mewakili seluruh orang dewasa dari berbagai usia dan profesi?',
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
    updated_at: '2026-11-07',
  },
  content: {
    tactical_overview:
      'Penalaran analogi menyimpulkan sifat suatu hal berdasarkan kemiripannya dengan hal lain yang sudah terbukti. Kunci penting UTBK: kenali apakah soal meminta prediksi sifat (mentransfer kesimpulan karena kemiripan kondisi), mencari pola penalaran kembar (parallel reasoning), atau mencari perbedaan kritis (critical disanalogy) yang meruntuhkan argumen.',
    exam_blueprint_markdown: `### 1. Bedah Konsep Berdasarkan Contoh Nyata Soal UTBK

Mari kita pelajari cara kerja **Penalaran Analogi** lewat studi kasus teks soal asli yang sering keluar di UTBK:

> **Wacana Soal:**  
> *"Planet Kepler-186f dan Planet Bumi sama-sama berada di zona layak huni bintangnya, permukaannya tersusun atas batuan padat, dan menerima panas yang cukup agar air tetap berbentuk cair. Di Bumi, gabungan kondisi tersebut memungkinkan terjadinya siklus air dan hujan yang stabil."*  
>  
> **Pertanyaan UTBK:** *Berdasarkan penalaran analogi, simpulan yang paling mungkin benar adalah...*

Bagaimana cara logika analogi bekerja di soal ini?

1. **Temukan Titik Kemiripannya (Objek Pembanding):**
   - Bumi dan Kepler-186f punya 3 kesamaan: sama-sama di zona layak huni, sama-sama berbatu padat, dan suhu memungkinkan air cair.
2. **Lihat Sifat Tambahan yang Ditransfer:**
   - Di Bumi, ketiga kondisi itu menghasilkan **siklus air yang stabil**.
3. **Tarik Kesimpulan Analogi ke Objek Kedua:**
   - Karena kondisinya mirip, maka Kepler-186f **kemungkinan besar juga memiliki potensi siklus air yang stabil**.
4. **Waspadai Kesimpulan yang 'Kebablasan':**
   - ❌ *"Kepler-186f pasti dihuni oleh peradaban manusia cerdas."* 👉 **Salah!** Teks hanya bicara soal air dan suhu, bukan peradaban cerdas. Analogi hanya boleh memindahkan sifat yang relevan, tidak boleh mengarang bebas.

---

### 2. Dua Tipe Soal Analogi yang Paling Sering Keluar di UTBK

Di UTBK, soal analogi biasanya muncul dalam 2 bentuk:

#### Tipe 1: Analogi Fenomena & Kebijakan (Transfer Kesimpulan)
Menyimpulkan kondisi objek kedua berdasarkan keberhasilan di objek pertama karena kemiripan lingkungannya.
- *Contoh UTBK:* Program penataan trotoar dan jalur sepeda berhasil mengurangi kemacetan di Kota Solo. Karena Kota Yogyakarta memiliki tata kota dan aktivitas warga yang serupa, maka program tersebut diprediksi juga berpotensi menekan kemacetan di Yogyakarta.

#### Tipe 2: Parallel Reasoning (Pola Penalaran Kembar)
Mencari kalimat di pilihan ganda yang **cara berpikir logisnya kembar identik** dengan kalimat di soal, meskipun topiknya berbeda jauh!
- *Contoh Pola di Soal:*  
  *"Melatih otot secara bertahap membuatnya semakin kuat, tetapi jika langsung dipaksa beban ekstrem akan cedera. Sama halnya belajar koding; latihan logika bertahap membangun pemahaman kokoh, sedangkan langsung mengerjakan proyek raksasa akan memicu kegagalan."*  
  *(Polanya: [Bertahap $\\to$ Sukses] VS [Berlebihan $\\to$ Rusak/Gagal]).*
- *Pola Kembar yang Benar di Pilihan Ganda:*  
  *"Memberi pupuk tanaman bertahap menyuburkan pohon, namun pupuk berlebih membuat tanaman mati; sama halnya memberi materi belajar harus bertahap agar siswa tidak kewalahan."*

---

### 3. Tabel Pola Analogi UTBK & Trik Membedahnya

| Jenis Soal Analogi | Pola Cara Berpikir | Cara Cepat Temukan Kunci Jawaban |
| :--- | :--- | :--- |
| **Transfer Prediksi**<br>*(Contoh: Sistem X sukses $\\to$ Sistem Y diprediksi sukses)* | Membandingkan dua hal yang mirip (misal sistem imun tubuh manusia $\\approx$ sistem keamanan firewall komputer). | Cari kesimpulan yang bernada **probabilitas** (*"kemungkinan besar"*, *"berpotensi"*) dan tolak opsi yang berlebihan (*"pasti sama persis"*). |
| **Parallel Reasoning**<br>*(Pola Penalaran Kembar)* | Menyalin kerangka logika kalimat: sebab-akibat, perbandingan positif vs negatif. | Abaikan topiknya (apakah bahas sains, olahraga, atau sejarah), fokus ke **rangka logikanya**: apakah ada kontras [jika perlakuan A $\\to$ sukses, perlakuan ekstrem $\\to$ gagal]? |
| **Memperlemah Analogi (HOTS)**<br>*(Mencari perbedaan fatal)* | Menemukan satu perbedaan mendasar yang membuat perbandingan menjadi tidak sah (*Critical Disanalogy*). | Cari opsi yang menunjukkan bahwa kedua hal itu sebenarnya punya cara kerja yang bertolak belakang (misal: membandingkan toko online dengan toko fisik). |

---

### 4. Trik Eliminasi Cepat di Ruang Ujian (15 Detik)

1. **Trik 1 (Cek Kesetaraan Sifat):** Pastikan sifat yang disimpulkan berhubungan langsung dengan kemiripan yang dibahas. Tolak opsi yang menambahkan klaim di luar topik wacana.
2. **Trik 2 (Untuk Soal Penalaran Kembar):** Buat pola sederhana di kepala: *"Jika bertahap $\\to$ baik, jika berlebihan $\\to$ buruk"*. Lalu cari opsi yang persis memiliki dua sisi perbandingan tersebut.
3. **Trik 3 (Untuk Soal Memperlemah):** Cari fakta di pilihan ganda yang membongkar bahwa objek pembanding punya mekanisme kerja yang berbeda jauh.`,
    visualizations_svg: [],
    distractor_traps: [
      'False Analogy (Analogi Palsu/Dangkal): Membandingkan dua objek hanya karena kemiripan permukaan atau kemiripan nama, padahal mekanisme dasarnya bertolak belakang.',
      'Mengabaikan Perbedaan Kritis (Critical Disanalogy): Jika terdapat satu perbedaan faktor krusial antara dua objek yang justru menjadi penyebab hasil yang berbeda, maka analogi langsung gugur.',
      'Jebakan Kesamaan Topik Semu: Memilih opsi hanya karena sama-sama membahas bidang yang mirip (misal sains atau teknologi), padahal pola struktur penalarannya tidak sepadan.',
    ],
    quick_execution_algorithm: [
      'Identifikasi sifat dasar bersama antara dua entitas yang sedang diperbandingkan.',
      'Cari sifat simpulan yang ingin ditransfer ke entitas kedua.',
      'Periksa apakah ada perbedaan kritis (critical disanalogy) yang merusak hubungan kausal.',
      'Untuk soal Parallel Reasoning, abaikan topik dan cocokkan kerangka logika sebab-akibatnya.',
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
      hint_markdown:
        '💡 **Petunjuk Soal:** Cari kesamaan antara Bumi dan Kepler-186f (zona laik huni, batuan padat, air cair). Di Bumi, kondisi ini menghasilkan siklus hidrologi stabil. Kesimpulan analogi yang sah harus memprediksi sifat yang sama untuk Kepler-186f secara probabilistik (*"kemungkinan besar"*), bukan kepastian mutlak!',
      conceptual_solution_markdown: `**Cara Konsep Formal:**

- **Entitas A (Bumi):** Zona laik huni + batuan silikat + air fase cair $\\implies$ siklus hidrologi stabil.
- **Entitas B (Kepler-186f):** Memiliki sifat yang serupa.
- **Simpulan analogi:** Kepler-186f kemungkinan besar juga memiliki potensi terbentuknya siklus hidrologi yang stabil.

**Jawaban: C**`,
      quick_trick_markdown: `**Cara Cepat (Cek Pasangan Sifat Terkait):**

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
      hint_markdown:
        '💡 **Petunjuk Soal:** Teks membandingkan dua perlakuan: perlakuan bertahap menghasilkan adaptasi/kekuatan positif, sedangkan beban berlebih sekaligus memicu cedera/kegagalan. Cari opsi pilihan ganda yang juga menyajikan dua perbandingan serupa (bertahap membawa kebaikan, berlebihan memicu kerusakan)!',
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
      hint_markdown:
        '💡 **Petunjuk Soal:** Untuk mematahkan argumen analogi antara Perusahaan Ritel (toko fisik) dan Software, temukan perbedaan mendasar pada sistem kerja keduanya. Perusahaan software bisa bekerja dengan target proyek yang fleksibel, sedangkan toko ritel sangat bergantung pada jam operasional toko fisik melayani pembeli setiap hari!',
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
