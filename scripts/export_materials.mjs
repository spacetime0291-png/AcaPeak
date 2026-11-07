import fs from 'fs';
import path from 'path';

const pubPuDir = path.resolve('public/content/utbk/pu');
const rootPuDir = path.resolve('content/utbk/pu');

[pubPuDir, rootPuDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const MATERIAL_PU_01_01 = {
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
    exam_blueprint_markdown: `# 1. Kaidah dan Prinsip Dasar

Generalisasi adalah proses menarik simpulan umum yang berlaku luas berdasarkan sejumlah fakta, data, atau peristiwa khusus (sampel) yang diamati.

Dalam tes UTBK-SNBT, penalaran generalisasi bertumpu pada tiga kaidah berpikir logis yang mutlak:

1. **Hasil Generalisasi Tidak Pernah Bernilai 100% Mutlak Pasti**  
   Generalisasi merupakan penalaran induktif yang bersifat probabilistik (tingkat kemungkinan), bukan deduksi matematika yang pasti mutlak. Oleh karena itu, kunci jawaban yang benar di UTBK hampir selalu menggunakan kata-kata terukur seperti:
   - **"Sebagian besar"** atau **"Mayoritas"**
   - **"Cenderung"**
   - **"Kemungkinan besar"**
   - **"Pada umumnya"**
   - **"Berpotensi"**

2. **Kepatuhan pada Batas Wilayah dan Kelompok (Scope)**  
   Simpulan tidak boleh melompat keluar dari batasan populasi yang diteliti. Jika wacana teks hanya membahas *"pengguna motor listrik di Jakarta"*, maka simpulan yang sah hanya berlaku untuk wilayah Jakarta, bukan untuk *"seluruh masyarakat Indonesia"*.

3. **Prinsip Pengecualian Data**  
   Jika di dalam data teks terdapat satu saja kasus pengecualian (misalnya ada responden yang tidak mengalami perubahan), maka semua pilihan jawaban yang menggunakan kata mutlak seperti *"semua"*, *"seluruh"*, *"setiap"*, *"pasti"*, atau *"selalu"* otomatis salah.

---

# 2. Bedah Variasi Soal dan Penjelasan

Berikut adalah bedah tipe variasi soal Generalisasi yang paling sering diujikan di UTBK, lengkap dengan wacana soal asli dan penjelasan alur logikanya:

### Variasi 1: Simpulan Proporsi Sampel (Tipe Mayoritas)

> **Konteks Wacana Soal:**  
> Survei terhadap 500 pengguna motor listrik di Jakarta menunjukkan bahwa 460 di antaranya merasakan penghematan biaya operasional bulanan hingga 60% dibandingkan saat menggunakan motor berbahan bakar bensin. Sebanyak 40 pengguna lainnya merasa biayanya sama saja karena jarak tempuh harian mereka sangat pendek.  
>  
> **Pertanyaan UTBK:** *Simpulan yang paling tepat berdasarkan teks tersebut adalah...*

**Bedah Logika & Penjelasan:**
- **Identifikasi Data:** Dari total 500 responden, sebanyak 460 orang (92%) mengalami penghematan biaya operasional, sedangkan 40 orang (8%) tidak merasakan penghematan.
- **Mengapa Opsi Lain Salah?**
  - Opsi yang berbunyi *"Semua pengguna motor listrik di Jakarta berhasil menghemat biaya"* adalah **salah**, karena mengabaikan 40 responden yang tidak hemat. Kata *"semua"* terlalu mutlak.
  - Opsi yang berbunyi *"Motor berbahan bakar bensin selalu lebih boros bagi seluruh masyarakat di Jakarta"* adalah **salah**, karena membuat klaim mutlak terhadap seluruh masyarakat umum yang tidak diteliti.
  - Opsi yang berbunyi *"Masyarakat luar Jakarta juga akan menghemat biaya hingga 60%"* adalah **salah**, karena melompat keluar wilayah penelitian (*out of scope*).
- **Simpulan yang Benar:** *"Sebagian besar pengguna motor listrik di Jakarta mengalami penghematan biaya operasional bulanan yang signifikan."*  
  Simpulan ini tepat karena setia pada data proporsi (92% merupakan sebagian besar) dan wilayah target penelitian (Jakarta).

---

### Variasi 2: Simpulan Tren Induktif Berkala (Tipe Rangkaian Waktu)

> **Konteks Wacana Soal:**  
> Pada kuartal pertama, penjualan komoditas kopi arabika dari daerah pegunungan tengah meningkat 12% setelah petani menerapkan teknik fermentasi tertutup. Pada kuartal kedua dan ketiga, petani di tiga kabupaten sekitar ikut menerapkan teknik yang sama dan mencatatkan peningkatan penjualan masing-masing sebesar 15% dan 18%.  
>  
> **Pertanyaan UTBK:** *Manakah pernyataan yang paling mungkin benar mengenai penerapan teknik fermentasi tertutup tersebut?*

**Bedah Logika & Penjelasan:**
- **Identifikasi Data:** Terjadi kenaikan konsisten penjualan kopi arabika di beberapa kuartal berturut-turut (12%, 15%, 18%) setelah petani di daerah pegunungan dan tiga kabupaten sekitarnya menerapkan teknik fermentasi tertutup.
- **Mengapa Opsi Lain Salah?**
  - Opsi yang menyatakan *"Teknik fermentasi tertutup merupakan satu-satunya cara untuk meningkatkan penjualan kopi"* adalah **salah**, karena teks tidak pernah menyatakan bahwa tidak ada faktor atau cara lain.
  - Opsi yang mengklaim *"Kopi robusta yang diolah dengan fermentasi tertutup juga akan mengalami kenaikan penjualan di atas 10%"* adalah **salah**, karena wacana hanya menguji kopi arabika, bukan kopi robusta.
  - Opsi yang memastikan *"Pada kuartal keempat penjualan pasti naik 21%"* adalah **salah**, karena meramal angka spesifik secara mutlak tanpa data empiris.
- **Simpulan yang Benar:** *"Penerapan teknik fermentasi tertutup cenderung berdampak positif terhadap peningkatan penjualan kopi arabika di wilayah tersebut."*  
  Simpulan ini menyatakan arah tren data secara wajar (*cenderung berdampak positif*) dan tetap berada dalam batasan komoditas wacana (kopi arabika).

---

### Variasi 3: Evaluasi Kualitas Generalisasi / HOTS (Tipe Keterwakilan Sampel)

> **Konteks Wacana Soal:**  
> Seorang peneliti menyimpulkan bahwa *"Konsumsi cokelat hitam setiap pagi dapat meningkatkan daya ingat jangka pendek pada seluruh kelompok usia dewasa."* Simpulan ini diambil setelah ia menguji 25 mahasiswa tingkat akhir di sebuah universitas teknik yang diberi 30 gram cokelat hitam setiap pagi selama dua minggu, dan hasilnya skor tes memori mereka meningkat rata-rata 20%.  
>  
> **Pertanyaan UTBK:** *Manakah pernyataan di bawah ini yang paling tepat mengevaluasi kelemahan dari generalisasi peneliti tersebut?*

**Bedah Logika & Penjelasan:**
- **Identifikasi Cacat Logika:** Peneliti mengklaim bahwa simpulannya berlaku untuk *"seluruh kelompok usia dewasa"* (rentang usia 18 hingga 65 tahun ke atas dengan berbagai latar belakang kesehatan dan profesi). Padahal, subjek yang diuji hanya 25 mahasiswa tingkat akhir dari satu fakultas teknik yang usianya sebaya (21-23 tahun) dan sangat homogen.
- **Kekeliruan Ilmiah:** Jumlah sampel terlalu sedikit dan tidak representatif untuk mewakili heterogenitas orang dewasa. Kesalahan penarikan simpulan ini dikenal sebagai *Hasty Generalization* (generalisasi tergesa-gesa).
- **Simpulan Evaluasi yang Benar:** *"Sampel yang digunakan terlalu sempit dan homogen sehingga tidak mewakili seluruh kelompok usia dewasa."*

---

# 3. Jebakan Pengecoh Khas UTBK

Perhatikan tiga jenis jebakan opsi jawaban yang sengaja dirancang untuk mengecoh peserta ujian:

1. **Jebakan Kuantor Universal Ekstrem**  
   Penggunaan kata mutlak seperti *semua*, *selalu*, *pasti*, *seluruh*, atau *tidak pernah*. Jika wacana memuat data persentase kurang dari 100% atau memiliki pengecualian, coret opsi ini seketika.

2. **Jebakan Lompatan Cakupan Wilayah (Overgeneralization)**  
   Data wacana hanya menguji siswa di kota A atau pekerja di perusahaan B, namun opsi jawaban menarik simpulan untuk seluruh masyarakat Indonesia.

3. **Jebakan Negasi Tak Berdasar**  
   Menyimpulkan nasib kebalikan dari kelompok yang tidak diteliti. Contoh: jika teks menyebut *"pengguna motor listrik lebih hemat biaya operasional"*, jangan memilih opsi yang menyebut *"pengguna motor bensin pasti akan bangkrut"*.

---

# 4. Cara Cepat & Trik Eliminasi Kilat (15 Detik)

Lakukan 4 langkah praktis ini saat membaca soal generalisasi di ruang ujian:

1. **Langkah 1 - Kunci Batas Sampel:**  
   Garis bawahi siapa subjek penelitian dan di mana lokasinya. Singkirkan langsung pilihan yang menyebut subjek atau wilayah lain di luar wacana.
2. **Langkah 2 - Coret Kata Mutlak:**  
   Eliminasi opsi yang mengandung kata: **pasti, selalu, seluruh, semua, mutlak, satu-satunya**.
3. **Langkah 3 - Pilih Kata Probabilistik Terukur:**  
   Prioritaskan pilihan yang memuat kata kunci simpulan sah: **sebagian besar, cenderung, umumnya, berpotensi, kemungkinan besar**.
4. **Langkah 4 - Periksa Kesetiaan Data:**  
   Pastikan klaim simpulan tidak melampaui fakta angka atau fakta tren yang tertulis di teks wacana.

---

# 5. Kesimpulan Intisari

- Generalisasi adalah penarikan simpulan umum dari **data sampel khusus**.
- Simpulan generalisasi **tidak pernah bernilai pasti mutlak**, melainkan bersifat kemungkinan logis (*probabilistik*).
- Simpulan yang sah wajib **setia pada batas cakupan sampel** (lokasi, jumlah, dan jenis objek penelitian).
- Kunci jawaban yang tepat di UTBK selalu menggunakan **bahasa yang terukur dan terbebas dari kuantor ekstrem**.`,
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

const MATERIAL_PU_01_02 = {
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
    exam_blueprint_markdown: `# 1. Kaidah dan Prinsip Dasar

Penalaran Analogi adalah proses penarikan simpulan dengan cara membandingkan dua entitas, sistem, atau fenomena berbeda yang memiliki kesamaan karakteristik mendasar.

Jika entitas pertama terbukti memiliki serangkaian sifat penting dan menghasilkan dampak tertentu, maka entitas kedua yang memiliki kemiripan sifat mendasar disimpulkan kemungkinan besar juga akan menghasilkan dampak yang serupa.

Kaidah-kaidah penting penalaran analogi di UTBK:

1. **Kemiripan Harus Bersifat Esensial (Fungsional)**  
   Perbandingan hanya sah jika titik kesamaan antara kedua hal berhubungan langsung dengan simpulan yang ditarik. Membandingkan dua hal hanya karena kemiripan tampilan luar, nama, atau kemiripan kata semata merupakan cacat logika (*False Analogy*).

2. **Simpulan Analogi Bersifat Kemungkinan (Probabilistik)**  
   Analogi tidak menghasilkan kepastian mutlak. Jawaban yang tepat di UTBK selalu menggunakan bahasa kemungkinan yang wajar, seperti *"kemungkinan besar"*, *"berpotensi"*, atau *"cenderung"*.

3. **Prinsip Perbedaan Kritis (Critical Disanalogy)**  
   Sebagus apa pun kemiripan antara dua sistem, jika terdapat satu perbedaan mendasar yang memutus hubungan kausal, maka simpulan analogi langsung gugur atau diperlemah secara signifikan.

---

# 2. Bedah Variasi Soal dan Penjelasan

Berikut adalah bedah tiga variasi soal Analogi yang rutin keluar pada naskah UTBK:

### Variasi 1: Prediksi Berbasis Analogi Fenomena (Transfer Sifat)

> **Konteks Wacana Soal:**  
> Planet Kepler-186f dan Bumi sama-sama berada di zona laik huni (*habitable zone*) bintang induknya, memiliki komposisi batuan silikat yang padat, serta menerima intensitas radiasi bintang yang memungkinkan air tetap berada dalam fase cair di permukaan. Di Bumi, kombinasi ketiga kondisi tersebut memungkinkan terbentuknya siklus hidrologi yang stabil.  
>  
> **Pertanyaan UTBK:** *Berdasarkan penalaran analogi, simpulan yang paling mungkin benar adalah...*

**Bedah Logika & Penjelasan:**
- **Titik Kesamaan:** Bumi dan Planet Kepler-186f sama-sama memiliki tiga kondisi esensial: zona laik huni, batuan padat, dan suhu yang mendukung keberadaan air fase cair.
- **Sifat yang Ditransfer:** Di Bumi, kombinasi ketiga faktor tersebut menghasilkan dampak terbukti, yaitu terbentuknya siklus hidrologi yang stabil.
- **Mengapa Opsi Lain Salah?**
  - Opsi yang menyatakan *"Kepler-186f pasti dihuni oleh makhluk hidup cerdas seperti di Bumi"* adalah **salah**, karena wacana hanya membahas batuan dan air, bukan peradaban cerdas. Analogi tidak boleh menambah klaim liar di luar premis.
  - Opsi yang menyatakan *"Ukuran satelit alami kedua planet persis sama"* adalah **salah**, karena zona laik huni tidak menyiratkan jumlah atau ukuran satelit.
- **Simpulan yang Benar:** *"Planet Kepler-186f kemungkinan besar juga memiliki potensi terbentuknya siklus hidrologi yang stabil."*  
  Simpulan ini memindahkan dampak yang terbukti secara logis dengan kata probabilitas yang tepat (*kemungkinan besar*).

---

### Variasi 2: Parallel Reasoning (Pola Penalaran Kembar)

Pada variasi ini, soal meminta kamu mencari opsi jawaban yang memiliki **kerangka struktur logika kembar identik** dengan wacana soal, meskipun bidang pembahasannya berbeda sama sekali.

> **Konteks Wacana Soal:**  
> Melatih otot tubuh dengan beban yang ditingkatkan secara bertahap akan membuat serat otot beradaptasi dan menjadi lebih kuat. Sebaliknya, jika beban terlalu ekstrem sejak hari pertama, otot justru akan mengalami cedera. Demikian pula dalam mempelajari pemrograman komputer; memberikan latihan logika secara bertahap akan membangun pemahaman yang kokoh, sedangkan langsung memaksakan proyek berskala besar kepada pemula justru akan memicu kejenuhan dan kegagalan.  
>  
> **Pertanyaan UTBK:** *Manakah situasi di bawah ini yang menggunakan pola penalaran analogi paling serupa dengan teks di atas?*

**Bedah Logika & Penjelasan:**
- **Rumus Struktur Logika Soal:**  
  Teks menyusun perbandingan dua ranah berbeda (Latihan Otot Fisik vs Belajar Pemrograman Kognitif) dengan rumus kontras simetris:  
  [Perlakuan bertahap -&gt; Hasil positif dan adaptasi]  
  [Perlakuan berlebih atau ekstrem -&gt; Kegagalan dan kerusakan]
- **Mencari Pasangan Kembar:**  
  Abaikan temanya. Cari opsi pilihan ganda yang menyajikan dua sisi perbandingan serupa (bertahap membawa hasil baik, berlebihan memicu kegagalan).
- **Pilihan yang Tepat:** *"Memberikan pupuk secara bertahap sesuai usia tanaman akan menyuburkan pertumbuhannya, sedangkan pemberian dosis berlebih sekaligus akan membuat tanaman mati; hal ini serupa dengan pemberian materi ajar kepada siswa yang harus disesuaikan tingkat kesulitannya secara bertahap agar tidak membuat siswa kewalahan."*  
  Opsi ini mereplikasi rumus perbandingan kontras yang kembar identik: Pertanian Tanaman vs Pendidikan Siswa.

---

### Variasi 3: Memperlemah Analogi / Critical Disanalogy (HOTS)

Tipe soal ini menguji kemampuan analitis untuk menemukan satu perbedaan kritis yang membatalkan analogi kebijakan atau argumen.

> **Konteks Wacana Soal:**  
> Manajemen Perusahaan Ritel X berencana menerapkan sistem kerja 4 hari seminggu tanpa pemotongan gaji untuk meningkatkan produktivitas karyawan. Keputusan ini didasarkan pada keberhasilan Perusahaan Software Y yang mengalami kenaikan produktivitas sebesar 25% setelah menerapkan sistem kerja 4 hari seminggu karena kedua perusahaan memiliki jumlah karyawan yang sama (300 orang) dan berlokasi di kota metropolitan yang sama.  
>  
> **Pertanyaan UTBK:** *Manakah fakta di bawah ini yang paling memperlemah argumen analogi Manajemen Perusahaan Ritel X?*

**Bedah Logika & Penjelasan:**
- **Analogi Manajemen:** Perusahaan Software Y sukses kerja 4 hari -> Perusahaan Ritel X diprediksi ikut sukses karena sama-sama punya 300 karyawan di kota yang sama.
- **Mencari Perbedaan Kritis yang Mematikan:**  
  Kesamaan jumlah karyawan dan lokasi kota hanyalah kemiripan luar. Keberhasilan sistem kerja di Perusahaan Software Y didorong oleh model kerja berbasis output proyek yang fleksibel (tidak terikat jam layanan fisik). Sebaliknya, pendapatan Perusahaan Ritel X bergantung langsung pada jam operasional toko fisik melayani pembeli setiap hari. Jika toko ritel memangkas hari kerja, jam operasional toko berkurang dan omzet penjualan langsung turun.
- **Fakta yang Memperlemah Analogi:** *"Produktivitas Perusahaan Software Y bergantung pada penyelesaian proyek berbasis output mingguan yang fleksibel, sedangkan pendapatan Perusahaan Ritel X bergantung langsung pada jumlah jam operasional toko fisik yang melayani pelanggan setiap hari."*

---

# 3. Jebakan Pengecoh Khas UTBK

Waspadai jebakan-jebakan berikut saat mengerjakan soal analogi:

1. **Jebakan Kemiripan Permukaan (False Analogy)**  
   Membandingkan dua objek hanya karena nama atau temanya mirip, padahal mekanisme internalnya bertolak belakang.

2. **Jebakan Kesamaan Topik Semu**  
   Pada soal *Parallel Reasoning*, jangan memilih opsi hanya karena sama-sama membahas sains, kedokteran, atau teknologi. Fokuslah pada kesepadanan rumus struktur kalimatnya.

3. **Jebakan Klaim Kepastian Mutlak**  
   Memilih opsi yang menyatakan bahwa objek kedua *"pasti persis sama"* atau *"sudah tentu menghasilkan dampak yang tidak mungkin berbeda"*.

---

# 4. Cara Cepat & Trik Eliminasi Kilat (15 Detik)

1. **Untuk Soal Prediksi Analogi:**  
   Identifikasi dampak yang terbukti pada entitas pembanding. Cari pilihan jawaban yang memindahkan dampak tersebut ke entitas kedua dengan kuantor kemungkinan (*kemungkinan besar, berpotensi*).
2. **Untuk Soal Penalaran Kembar (Parallel Reasoning):**  
   Sederhanakan kalimat wacana menjadi rumus kontras singkat di kepala: "[Bertahap = Baik, Berlebihan = Rusak]". Cari pilihan jawaban yang memiliki rumus kontras dua sisi yang persis sama.
3. **Untuk Soal Memperlemah Analogi:**  
   Tanyakan: *"Perbedaan apa yang membuat sistem di perusahaan/objek A tidak dapat diterapkan di objek B?"* Pilih jawaban yang membeberkan perbedaan cara kerja sistemik tersebut.

---

# 5. Kesimpulan Intisari

- Penalaran analogi mendasarkan kesimpulan pada **kesamaan fungsi dan karakteristik esensial**, bukan kemiripan luar.
- Simpulan analogi selalu bersifat **probabilistik** dan tidak pernah mutlak pasti.
- Pada soal *Parallel Reasoning*, kesamaan dinilai dari **kerangka hubungan logika**, bukan kesamaan topik kalimat.
- Sebuah analogi dapat dipatahkan dengan menunjukkan **perbedaan kritis (*critical disanalogy*)** pada mekanisme kerja kedua objek.`,
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

// Write both files to public/content/utbk/pu and content/utbk/pu
const targets = [
  { dir: pubPuDir, name: 'public/content/utbk/pu' },
  { dir: rootPuDir, name: 'content/utbk/pu' },
];

targets.forEach(({ dir, name }) => {
  fs.writeFileSync(path.join(dir, 'pu-1-1.json'), JSON.stringify(MATERIAL_PU_01_01, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'pu-01-01.json'), JSON.stringify(MATERIAL_PU_01_01, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'pu-1-2.json'), JSON.stringify(MATERIAL_PU_01_02, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'pu-01-02.json'), JSON.stringify(MATERIAL_PU_01_02, null, 2), 'utf8');
  console.log(`Generated JSON files in ${name}`);
});
