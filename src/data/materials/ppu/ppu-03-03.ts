import type { Material } from '../../../types/material';

export const MATERIAL_PPU_03_03: Material = {
  metadata: {
    id: 'ppu-3-3',
    subtest: 'PPU',
    chapter_num: 3,
    chapter_title: 'Sintaksis dan Kalimat',
    subchapter_num: '3.3',
    subchapter_title: 'Kalimat Efektif dan Kepaduan Makna',
    title: 'Kalimat Efektif dan Kepaduan Makna',
    required_question_variations: [
      'Perbaikan Cacat Paralelisme',
      'Deteksi Kalimat Tidak Logis',
      'Eliminasi Pleonasme dan Redundansi',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan penulis kepada pembaca secara utuh, tepat sasaran, ringkas, dan tidak menimbulkan multitafsir sesuai kaidah tata bahasa baku bahasa Indonesia. Dalam spektrum PPU UTBK-SNBT, materi kalimat efektif dan kepaduan makna merupakan materi dengan frekuensi kemunculan tertinggi. Pengujian ini menuntut kemampuan mendeteksi kecacatan gramatikal mikro (kesepadanan struktur, keparalelan bentuk, kehematan kata) hingga koherensi semantis makro (kelogisan nalar dan keutuhan ide).',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan penulis kepada pembaca secara utuh, tepat sasaran, ringkas, dan tidak menimbulkan multitafsir sesuai dengan kaidah tata bahasa baku bahasa Indonesia (PUEBI/EYD dan Tata Bahasa Baku Bahasa Indonesia). Dalam spektrum Pengetahuan dan Pemahaman Umum (PPU) UTBK-SNBT, materi kalimat efektif dan kepaduan makna merupakan instrumen pengujian utama dengan bobot kemunculan paling tinggi. Pengujian ini menuntut peserta untuk mengidentifikasi kecacatan gramatikal mikro (kesepadanan, keparalelan, kehematan) hingga koherensi semantik makro (kelogisan penalaran dan kepaduan wacana).

---

## 1.1 Enam Prinsip Syarat Kalimat Efektif

Kalimat dikatakan efektif jika memenuhi enam prinsip akumulatif:

1. **Kesepadanan Struktur (Kelengkapan Gramatikal)**:
   - Memiliki unsur inti Subjek (S) dan Predikat (P) yang jelas dan eksplisit.
   - Tidak menempatkan preposisi di depan Subjek yang dapat menganulir status fungsi Subjek.
   - Tidak menyisipkan partikel pewatas *yang* tepat di depan verba utama sehingga membatalkan fungsi Predikat.
   - Tidak berupa anak kalimat tunggal (fragmen klausa subordinatif) yang berdiri sendiri tanpa induk kalimat.
2. **Keparalelan Bentuk (Kesejajaran Sintaksis)**:
   - Menggunakan bentuk bahasa, kategori leksikal, dan afiksasi yang sama/sejajar dalam perincian atau koordinasi kalimat. Jika perincian pertama berbentuk nomina (*pe-...-an*), rincian berikutnya wajib nomina (*pe-...-an*). Jika verba aktif (*meN-*), berikutnya wajib verba aktif (*meN-*).
3. **Kehematan Kata (Anti-Pleonasme & Anti-Redundansi)**:
   - Menghindari pemborosan kata yang tidak menambah nilai semantik.
   - Tidak mengulang subjek yang sama dalam anak kalimat.
   - Tidak menggunakan bentuk jamak ganda (kata penanda jamak + reduplikasi jamak).
   - Tidak menggabungkan dua kata bersinonim secara berdampingan.
   - Tidak mencantumkan nama hipernim di depan kata hiponim yang sudah jelas maknanya.
4. **Kecermatan dan Ketidakambiguan**:
   - Memilih diksi dan menyusun relasi sintaksis secara tepat agar tidak melahirkan ketaksaan (makna ganda/ambigu).
5. **Kelogisan Penalaran (Koherensi Logis)**:
   - Makna kalimat dapat diterima oleh akal sehat dan kaidah logika formal ilmiah. Subjek gramatikal harus logis melakukan pekerjaan yang dinyatakan oleh predikat verba aktif.
6. **Kepaduan Makna (Kohesi Sintaksis dan Kesatuan Ide)**:
   - Informasi yang disampaikan tidak terpecah-pecah dan tidak menyisipkan keterangan yang melompat di luar fokus topik klausa utama.

---

## 1.2 Inventarisasi Bentuk Pleonasme dan Redundansi Leksikal

1. **Pasangan Sinonim Ganda (Mubazir)**:
   - *adalah merupakan* $\\rightarrow$ gunakan salah satu (*adalah* ATAU *merupakan*).
   - *agar supaya* $\\rightarrow$ gunakan salah satu (*agar* ATAU *supaya*).
   - *demi untuk* $\\rightarrow$ gunakan salah satu (*demi* ATAU *untuk*).
   - *sejak dari* $\\rightarrow$ gunakan salah satu (*sejak* ATAU *dari*).
   - *hanya ... saja* $\\rightarrow$ gunakan salah satu (*hanya* ATAU *saja*).
   - *sangat ... sekali* / *amat ... sekali* $\\rightarrow$ gunakan salah satu (*sangat indah* ATAU *indah sekali*).
   - *seperti misalnya* / *contohnya seperti* $\\rightarrow$ gunakan salah satu (*seperti* ATAU *misalnya*).
2. **Bentuk Jamak Ganda (Reduplikasi Pleonastis)**:
   - *para hadirin sekalian* $\\rightarrow$ *hadirin*.
   - *banyak faktor-faktor* $\\rightarrow$ *banyak faktor* ATAU *faktor-faktor*.
   - *beberapa negara-negara* $\\rightarrow$ *beberapa negara* ATAU *negara-negara*.
   - *seluruh masyarakat-masyarakat* $\\rightarrow$ *seluruh masyarakat*.
   - *daftar nama-nama peserta* $\\rightarrow$ *daftar nama peserta*.
3. **Resiprokal Berlebih (Pleonastis Perbuatan Berbalasan)**:
   - *saling tolong-menolong* $\\rightarrow$ *saling menolong* ATAU *tolong-menolong*.
   - *saling pandang-memandang* $\\rightarrow$ *saling memandang* ATAU *pandang-memandang*.
4. **Hipernim Berdampingan dengan Hiponim**:
   - *bunga mawar* $\\rightarrow$ *mawar*.
   - *warna merah* $\\rightarrow$ *merah*.
   - *bulan Maret tahun 2026* $\\rightarrow$ *Maret 2026*.

---

## 1.3 Dimensi Keparalelan (Paralelisme Sintaksis)

1. **Kesejajaran Frasa Nomina (*pe-...-an*)**:
   - *Tidak Sejajar*: Tahapan pemulihan ekonomi mencakup *stabilisasi* harga pasar, *mengendalikan* laju inflasi, dan *penyediaan* stimulus UMKM.
   - *Sejajar (Nomina)*: Tahapan pemulihan ekonomi mencakup **stabilisasi** harga pasar, **pengendalian** laju inflasi, dan **penyediaan** stimulus UMKM.
2. **Kesejajaran Verba Aktif (*meN-*)**:
   - *Tidak Sejajar*: Lembaga riset bertugas *mengumpulkan* data, *menganalisis* parameter, dan *pelaporan* hasil observasi.
   - *Sejajar (Verba Aktif)*: Lembaga riset bertugas **mengumpulkan** data, **menganalisis** parameter, dan **melaporkan** hasil observasi.
3. **Kesejajaran Verba Pasif (*di-*)**:
   - *Tidak Sejajar*: Berkas perkara tersangka korupsi telah *diperiksa* oleh kejaksaan dan penyidik *melengkapinya*.
   - *Sejajar (Verba Pasif)*: Berkas perkara tersangka korupsi telah **diperiksa** oleh kejaksaan dan **dilengkapi** oleh penyidik.

---

## 1.4 Matriks Komparasi Cacat Kalimat Efektif dan Rekonstruksi Baku

| Jenis Kecacatan | Contoh Kalimat Tidak Efektif | Analisis Kerusakan Sintaksis / Semantik | Rekonstruksi Kalimat Efektif |
| :--- | :--- | :--- | :--- |
| **Gugur Subjek (Preposisi Awal)** | *Bagi seluruh peserta seleksi wajib membawa kartu identitas asli.* | Kata depan *Bagi* di awal kalimat mengubah Subjek menjadi Keterangan sehingga kalimat tidak memiliki Subjek. | **Seluruh peserta seleksi wajib membawa kartu identitas asli.** |
| **Gugur Predikat (Partikel 'Yang')** | *Pemerintah pusat yang menggelontorkan subsidi pangan kepada warga.* | Partikel *yang* membatasi frasa verba menjadi pewatas sehingga klausa menjadi frasa nomina panjang tanpa predikat. | **Pemerintah pusat menggelontorkan subsidi pangan kepada warga.** |
| **Anak Kalimat Buntung (Fragmen)** | *Sehingga proyek strategis nasional tersebut belum dapat diselesaikan tepat waktu.* | Konjungsi subordinatif *sehingga* menghubungkan anak kalimat akibat, tetapi tidak memiliki induk kalimat pendahulu. | **Oleh karena itu, proyek strategis nasional tersebut belum dapat diselesaikan tepat waktu.** |
| **Cacat Paralelisme** | *Agenda rapat meliputi perumusan rencana kerja, evaluasi kinerja, dan menetapkan anggaran.* | Rincian 1 dan 2 berkategori nomina (*perumusan*, *evaluasi*), sedangkan rincian 3 berupa verba aktif (*menetapkan*). | **Agenda rapat meliputi perumusan rencana kerja, evaluasi kinerja, dan penetapan anggaran.** |
| **Pleonasme Sinonim & Jamak** | *Banyak berbagai bukti-bukti empiris adalah merupakan faktor penting.* | Pemborosan masif: *banyak berbagai* (sinonim), *bukti-bukti* (jamak ganda setelah kuantor), dan *adalah merupakan* (sinonim). | **Berbagai bukti empiris merupakan faktor penting.** |
| **Ketidaklogisan Nalar** | *Untuk mempersingkat waktu, kami persilakan kepada pembicara pertama.* | Waktu tidak dapat dipersingkat secara fisik (yang dapat dilakukan adalah menghemat waktu), dan bukan entitas yang dipersilakan. | **Untuk menghemat waktu, kami persilakan pembicara pertama.** |
| **Ketaksaan / Ambiguitas** | *Mobil pegawai baru yang mewah itu diparkir di lobi.* | Frasa ambigu: apakah mobilnya yang baru, atau pegawainya yang baru? | **Mobil mewah milik pegawai baru itu diparkir di lobi.** |

---

## 1.5 Rangkuman Inti

- **Kalimat efektif** wajib memenuhi asas kesepadanan struktur, keparalelan bentuk, kehematan kata, kecermatan, kelogisan nalar, dan kepaduan makna.
- **Kesepadanan**: Kalimat wajib memiliki Subjek dan Predikat yang utuh tanpa terdistorsi oleh preposisi di awal atau partikel *yang* perusak predikat.
- **Keparalelan**: Unsur-unsur rincian dalam kalimat majemuk wajib setara kelas katanya (nomina dengan nomina, verba aktif dengan verba aktif, atau pasif dengan pasif).
- **Kehematan**: Mengeliminasi pleonasme leksikal klise (*adalah merupakan*, *agar supaya*, *demi untuk*), jamak ganda, dan perulangan subjek redundan.
- **Kelogisan**: Relasi makna antara agens (pelaku), tindakan (verba), dan sasaran (objek) wajib dapat diterima oleh akal sehat dan kaidah ilmiah formal.`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Preposisi di Depan Subjek / Subjek Mengambang: Kalimat diawali frasa preposisional panjang (contoh: Dalam kajian mendalam yang dilakukan oleh astronom dunia membuktikan...) sehingga tidak ada subjek mandiri.',
      'Jebakan Asimetri Paralelisme dalam Perincian Majemuk: Rincian dibuat sangat panjang dengan klausa pewatas sehingga siswa luput menyadari inkonsistensi afiks awal kata kunci rincian.',
      'Jebakan Fragmen Subordinatif Berdiri Sendiri: Mengawali kalimat baru dengan konjungsi subordinatif intrakalimat (Sedangkan, Karena, Sehingga, Walaupun) setelah tanda titik.',
      'Jebakan Pleonasme Terselubung: Menggunakan bentukan yang terkesan formal padahal mubazir (contoh: adalah merupakan, bertujuan untuk, disebabkan karena).',
      'Jebakan Ketidaklogisan Semantik Aktor-Verba (Zeugma Tak Padu): Satu predikat memayungi dua objek yang secara logis membutuhkan verba berbeda (contoh: melayani pasien dan resep obat).',
    ],
    quick_execution_algorithm: [
      'Uji Kerangka Utama S-P: Periksa kata pertama kalimat. Jika diawali preposisi (dalam, pada, untuk, bagi, melalui), coret preposisi tersebut atau periksa apakah terdapat Subjek sejati setelah koma.',
      'Scan Imbuhan Perincian (Tes Kesejajaran): Jika melihat tanda koma perincian (A, B, dan C), langsung bandingkan imbuhan kata pertama tiap rincian. Pola imbuhan wajib seragam (meN- semua atau pe-...-an semua).',
      'Scan Leksikal Kata Mubazir: Cari pasangan sinonim ganda (adalah merupakan, agar supaya, demi untuk) atau kata penanda jamak yang diikuti pengulangan kata (banyak faktor-faktor).',
      'Uji Nalar Verba terhadap Objek: Periksa apakah setiap objek logis dikenai tindakan oleh predikat yang bersangkutan.',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-03-03-ex1',
      variation_name: 'Variasi 1: Perbaikan Cacat Paralelisme (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Program hilirisasi komoditas mineral nasional diarahkan untuk meningkatkan nilai tambah produk, memperluas lapangan kerja industri, dan penyerapan investasi modal dalam negeri.\n(2) Langkah strategis ini diharapkan memperkokoh struktur manufaktur domestik.',
      question_markdown:
        'Kalimat (1) menjadi tidak efektif karena tidak memenuhi prinsip keparalelan bentuk. Perbaikan yang paling tepat untuk kalimat tersebut adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Mengganti frasa meningkatkan nilai tambah menjadi peningkatan terhadap nilai tambah',
        },
        {
          key: 'B',
          text_markdown:
            'Mengganti frasa memperluas lapangan kerja menjadi perluasan lapangan kerja industri',
        },
        {
          key: 'C',
          text_markdown:
            'Mengganti frasa penyerapan investasi modal menjadi menyerap investasi modal',
        },
        {
          key: 'D',
          text_markdown: 'Menghilangkan kata depan untuk setelah kata kerja diarahkan',
        },
        {
          key: 'E',
          text_markdown: 'Menyisipkan kata hubung serta sebelum frasa memperluas lapangan kerja',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cek imbuhan pada ketiga perincian: *meningkatkan...*, *memperluas...*, dan *penyerapan...*. Dua di antaranya menggunakan verba aktif transitif (*meN-*).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Identifikasi Cacat Paralelisme:**\n  - Rincian 1: *meningkatkan nilai tambah produk* $\\rightarrow$ Frasa Verba Aktif (*meN-*).\n  - Rincian 2: *memperluas lapangan kerja industri* $\\rightarrow$ Frasa Verba Aktif (*meN-*).\n  - Rincian 3: *penyerapan investasi modal dalam negeri* $\\rightarrow$ Frasa Nomina (*pe-...-an*).\n- **Analisis Kesejajaran:** Dua konstituen rincian terdahulu berbentuk verba aktif transitif (*meningkatkan*, *memperluas*). Oleh karena itu, rincian ketiga (*penyerapan*) merusak kesejajaran bentuk.\n- **Solusi Baku:** Mengubah kata benda *penyerapan* menjadi verba aktif setara, yaitu **menyerap** (*menyerap investasi modal dalam negeri*).\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Cek Awalan Rincian):**\n\n1. Rincian 1: **me**ningkatkan.\n2. Rincian 2: **mem**perluas.\n3. Rincian 3: **pe**nyerapan $\\rightarrow$ BEDA SENDIRI (asimetri)!\n4. Samakan menjadi awalan **me-**: *menyerap*. Langsung pilih opsi **C** (<10 detik)!',
      why_others_are_wrong_markdown:
        '- **Pilihan A & B Salah:** Mengubah salah satu rincian awal menjadi bentuk nomina tidak menyelesaikan asimetri jika rincian lainnya masih verba aktif.\n- **Pilihan D Salah:** Kata depan *untuk* diperlukan untuk menandai hubungan keterangan tujuan setelah verba pasif *diarahkan*.\n- **Pilihan E Salah:** Konjungsi perincian dalam bahasa Indonesia baku diakhiri oleh konjungsi *dan*, bukan *serta*.',
    },
    {
      example_id: 'ppu-03-03-ex2',
      variation_name: 'Variasi 2: Deteksi Kalimat Tidak Logis / Rancu Nalar (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Rumah sakit rujukan itu terus memodernisasi fasilitas medis demi meningkatkan standar mutu layanan.\n(2) Seluruh tenaga medis melayani konsultasi pasien, tindakan operasi, dan resep obat-obatan farmasi secara terintegrasi.\n(3) Manajemen meyakini bahwa langkah inovatif ini akan mempercepat angka kesembuhan masyarakat.',
      question_markdown:
        'Kalimat yang tidak logis dan menyalahi asas kepaduan makna pada kutipan teks di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'Kalimat (1)',
        },
        {
          key: 'B',
          text_markdown: 'Kalimat (2)',
        },
        {
          key: 'C',
          text_markdown:
            'Kalimat (2) karena susunan perincian tidak diawali konjungsi koordinatif',
        },
        {
          key: 'D',
          text_markdown: 'Kalimat (3) karena kata inovatif berkonotasi negatif',
        },
        {
          key: 'E',
          text_markdown: 'Kalimat (3) karena kata angka tidak dapat dipasangkan dengan kata kesembuhan',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Perhatikan predikat verba *melayani* pada kalimat (2). Apakah seluruh objek dalam rincian logis dapat "dilayani" oleh subjek tenaga medis?',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (2):**\n  - Subjek: *Seluruh tenaga medis*\n  - Predikat: *melayani*\n  - Rincian Objek: (a) *konsultasi pasien*, (b) *tindakan operasi*, dan (c) *resep obat-obatan farmasi*.\n- **Uji Kelogisan Semantis (Zeugma Tak Padu):**\n  - Tenaga medis *melayani konsultasi pasien* $\\rightarrow$ Logis.\n  - Tenaga medis *melayani tindakan operasi* $\\rightarrow$ Logis / berterima.\n  - Tenaga medis *melayani resep obat-obatan* $\\rightarrow$ **Tidak Logis**. Tenaga medis (dokter) bukan pihak yang "melayani resep", melainkan "menuliskan/meresepkan obat" atau apoteker yang "menyiapkan obat berdasarkan resep". Menggabungkan ketiga nomina tersebut di bawah satu verba *melayani* menimbulkan cacat ketidaklogisan nalar sintaksis.\n- Oleh karena itu, kalimat yang tidak logis adalah **Kalimat (2)**.\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Uji Verba vs Objek):**\n\n1. Tes: "Tenaga medis melayani konsultasi" (OK).\n2. Tes: "Tenaga medis melayani operasi" (OK).\n3. Tes: "Tenaga medis melayani resep" $\\rightarrow$ Nalar janggal! Dokter membuat resep, bukan melayani resep.\n4. Kalimat cacat semantis = **Kalimat (2)**. Pilih **B**!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Kalimat (1) memenuhi seluruh prinsip kesepadanan dan kelogisan nalar.\n- **Pilihan C Salah:** Penjelasan tambahannya keliru; perincian sudah benar dihubungkan konjungsi *dan*.\n- **Pilihan D Salah:** Kata *inovatif* berkonotasi positif dan tepat konteks.\n- **Pilihan E Salah:** Frasa *angka kesembuhan* lazim dan baku dalam statistik kesehatan.',
    },
    {
      example_id: 'ppu-03-03-ex3',
      variation_name: 'Variasi 3: Eliminasi Pleonasme dan Redundansi (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Meskipun pemerintah telah menetapkan batas atas harga komoditas pangan, tetapi di pasar-pasar tradisional masih sering kali ditemukan banyak pedagang-pedagang yang menjual minyak goreng dengan harga yang sangat tinggi sekali.',
      question_markdown:
        'Kalimat di atas tidak efektif karena memuat sejumlah pemborosan kata dan kesalahan struktur. Bentuk perbaikan yang paling efektif, hemat, dan baku dari kalimat tersebut adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Meskipun pemerintah telah menetapkan batas atas harga komoditas pangan, di pasar tradisional masih sering ditemukan banyak pedagang yang menjual minyak goreng dengan harga sangat tinggi.',
        },
        {
          key: 'B',
          text_markdown:
            'Walaupun pemerintah menetapkan batas harga komoditas pangan, tetapi di pasar tradisional sering kali banyak pedagang-pedagang menjual minyak goreng sangat tinggi sekali.',
        },
        {
          key: 'C',
          text_markdown:
            'Pemerintah telah menetapkan batas atas harga komoditas pangan, namun di pasar tradisional sering ditemukan pedagang menjual minyak goreng yang sangat tinggi sekali.',
        },
        {
          key: 'D',
          text_markdown:
            'Meskipun pemerintah telah menetapkan batas atas komoditas pangan, tetapi pedagang di pasar tradisional masih sering menjual minyak goreng berharga tinggi.',
        },
        {
          key: 'E',
          text_markdown:
            'Di pasar-pasar tradisional masih sering ditemukan banyak pedagang yang menjual minyak goreng sangat tinggi karena batas atas harga pangan telah ditetapkan.',
        },
      ],
      correct_answer: 'A',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cari opsi yang: (1) menghilangkan konjungsi ganda *meskipun... tetapi*, (2) menyingkirkan jamak ganda *banyak pedagang-pedagang*, dan (3) membuang intensitas ganda *sangat tinggi sekali*.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Identifikasi Cacat pada Kalimat Soal:**\n  1. *Konjungsi Pertentangan Ganda*: Pasangan *Meskipun... tetapi...* haram dalam satu klausa subordinatif-induk. Konjungsi *tetapi* wajib dihilangkan.\n  2. *Reduplikasi Jamak Ganda*: Frasa *pasar-pasar* dan *banyak pedagang-pedagang* berlebihan (kuantor *banyak* sudah jamak, tidak boleh diikuti reduplikasi *pedagang-pedagang*).\n  3. *Pleonasme Derajat*: Frasa *sangat tinggi sekali* memuat dua penanda intensitas bersamaan (*sangat* dan *sekali*), cukup gunakan salah satu (*sangat tinggi*).\n- **Evaluasi Pilihan A:**\n  - Menghilangkan *tetapi* setelah *Meskipun* (struktur baku subordinatif).\n  - Menjadikan bentuk tunggal *pasar tradisional*.\n  - Menjadi *banyak pedagang* (tanpa reduplikasi ganda).\n  - Menjadi *harga sangat tinggi* (tanpa *sekali*).\n  - Menghasilkan konstruksi yang hemat, logis, dan gramatikal.\n\n**Jawaban: A**',
      quick_trick_markdown:
        '**Cara Cepat (Eliminasi Kata Redundan):**\n\n1. Ada *Meskipun*? Coret kata *tetapi* di tengah $\\rightarrow$ eliminasi B dan D!\n2. Ada *sangat... sekali*? Coret salah satu $\\rightarrow$ eliminasi B dan C!\n3. Cek struktur logis tersisa: Opsi A bersih dari semua cacat pleonasme. Pilih **A** (<15 detik)!',
      why_others_are_wrong_markdown:
        '- **Pilihan B Salah:** Mempertahankan *tetapi* setelah *Walaupun*, jamak ganda *banyak pedagang-pedagang*, dan *sangat tinggi sekali*.\n- **Pilihan C Salah:** Masih mempertahankan bentuk mubazir *sangat tinggi sekali*.\n- **Pilihan D Salah:** Masih mempertahankan pasangan konjungsi terlarang *Meskipun... tetapi*.\n- **Pilihan E Salah:** Mengubah relasi semantik konsesif (*meskipun*) menjadi kausalitas (*karena*) yang menyimpang dari makna asli.',
    },
  ],
};
