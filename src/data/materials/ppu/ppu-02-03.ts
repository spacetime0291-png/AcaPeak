import type { Material } from '../../../types/material';

export const MATERIAL_PPU_02_03: Material = {
  metadata: {
    id: 'ppu-2-3',
    subtest: 'PPU',
    chapter_num: 2,
    chapter_title: 'Morfologi dan Frasa',
    subchapter_num: '2.3',
    subchapter_title: 'Jenis dan Konstruksi Frasa',
    title: 'Jenis dan Konstruksi Frasa',
    required_question_variations: [
      'Penentuan Unsur Inti Frasa Bertingkat Kompleks',
      'Identifikasi Konstruksi Frasa Ambigu',
      'Analisis Jenis Hubungan Distribusi Frasa',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Frasa adalah satuan sintaksis non-predikatif pengisi satu slot fungsi kalimat (S, P, O, Pel, atau Ket). Dalam UTBK, penguasaan frasa berfokus pada tiga aspek utama: penentuan unsur inti frasa bertingkat kompleks (menguji eliminasi pewatas bertingkat), pendeteksian ambiguitas struktural akibat letak pewatas yang bercabang, serta pemilahan relasi distribusi endosentrik (koordinatif, atributif, apositif) versus eksosentrik (preposisional dan artikula).',
    exam_blueprint_markdown: "# 1. Prinsip Dasar dan Kerangka Teori\n\nFrasa adalah satuan gramatikal non-predikatif yang terdiri atas gabungan dua kata atau lebih yang mengisi satu slot fungsi sintaksis (Subjek, Predikat, Objek, Pelengkap, atau Keterangan) dalam sebuah klausa atau kalimat.\n\n---\n\n### Tiga Ciri Esensial Frasa\n1. **Polileksikal**: Terdiri atas minimal dua kata leksikal (*rumah besar*, *sedang makan*).\n2. **Non-predikatif**: Tidak terdapat hubungan timbal balik Subjek-Predikat mandiri di dalamnya (jika terdapat hubungan S-P mandiri, satuan tersebut beralih menjadi **klausa** atau **kalimat**).\n3. **Kesatuan Sintaksis**: Menempati satu kesatuan slot gramatikal dan berpindah bersama-sama dalam permutasi posisi fungsi kalimat.\n\n---\n\n## 1.1 Klasifikasi Berdasarkan Kesetaraan Distribusi Unsur\n\nBerdasarkan kesetaraan distribusi fungsi antara unsur pembentuknya dengan frasa secara keseluruhan:\n\n### A. Frasa Endosentrik (Berpusat / Memiliki Inti)\nFrasa yang distribusinya paralel atau setara dengan salah satu atau semua unsur pembentuknya. Jika salah satu unsur dilesapkan, konstruksi kalimat tetap berterima secara gramatikal.\n\n1. **Endosentrik Koordinatif (Setara)**:\n   - Hubungan antarkonstituen setara ($Inti_1 + Inti_2$).\n   - Dapat disisipkan konjungsi setara *dan* atau *atau*.\n   - *Contoh*: *ayah ibu*, *jual beli*, *tua muda*, *sandang pangan*.\n2. **Endosentrik Atributif (Bertingkat / Modifikatif)**:\n   - Terdiri atas **Unsur Inti / Diterangkan (D)** dan **Unsur Pewatas / Menerangkan (M)**.\n   - Hubungan tidak setara; hanya unsur inti yang memegang peran gramatikal utama.\n   - *Contoh*: *buku tebal* (*buku* = Inti/D, *tebal* = Pewatas/M); *sangat cepat* (*cepat* = Inti/D, *sangat* = Pewatas/M).\n3. **Endosentrik Apositif (Saling Menggantikan / Identik)**:\n   - Terdiri atas dua unsur penjelas yang mengacu pada referen ekstralinguistis yang persis sama.\n   - Kedua unsur dapat saling menggantikan sepenuhnya dalam kalimat.\n   - Ditandai oleh penggunaan tanda koma ganda atau tanda pisah.\n   - *Contoh*: *Jakarta, ibu kota Indonesia,* ... (*Jakarta* dapat digantikan sepenuhnya oleh *ibu kota Indonesia*).\n\n### B. Frasa Eksosentrik (Tak Berpusat / Tanpa Inti Mandiri)\nFrasa yang distribusinya tidak sama dengan salah satu unsur pembentuknya. Jika salah satu unsur dihilangkan, sisa kata tidak dapat menggantikan peran frasa tersebut.\n\n1. **Eksosentrik Preposisional (Direksional)**:\n   - Terdiri atas **Preposisi (Perangkai)** + **Aksis (Kata Benda/Ganti)**.\n   - Berfungsi mengisi slot fungsi Keterangan (Ket).\n   - *Contoh*: *di perpustakaan*, *ke luar negeri*, *dari kampus*.\n2. **Eksosentrik Artikula (Objektif)**:\n   - Terdiri atas **Partikel Pembatas / Artikula** (*si, sang, hang, dang, kaum, para*) + **Nomina**.\n   - *Contoh*: *si kancil*, *sang juara*, *kaum tertindas*.\n\n---\n\n## 1.2 Klasifikasi Berdasarkan Kelas Kata Unsur Inti\n\nKategori frasa ditentukan sepenuhnya oleh **kelas kata dari unsur intinya**:\n1. **Frasa Nomina (FN)**: Unsur intinya berupa nomina (kata benda).\n   - *Contoh*: *gedung rektorat megah* (inti: *gedung* [nomina]).\n2. **Frasa Verba (FV)**: Unsur intinya berupa verba (kata kerja).\n   - *Contoh*: *sedang meneliti mikroorganisme* (inti: *meneliti* [verba]).\n3. **Frasa Adjektiva (FA)**: Unsur intinya berupa adjektiva (kata sifat).\n   - *Contoh*: *sangat akurat dan terpercaya* (inti: *akurat* [adjektiva]).\n4. **Frasa Numeralia (FNum)**: Unsur intinya berupa numeralia (kata bilangan).\n   - *Contoh*: *tiga puluh lima orang* (inti: *tiga puluh lima* [numeralia]).\n5. **Frasa Preposisional (FP)**: Diawali preposisi dan bertindak sebagai frasa relasional.\n   - *Contoh*: *pada akhir pekan* (diawali preposisi *pada*).\n6. **Frasa Adverbia (FAdv)**: Unsur intinya berupa adverbia (kata keterangan).\n   - *Contoh*: *kurang lebih*, *hampir selalu*.\n\n---\n\n## 1.3 Kaidah D-M (Diterangkan-Menerangkan)\n\n### A. Kaidah Baku D-M\nDalam bahasa Indonesia ragam formal, pola frasa baku menempatkan konstituen yang **Diterangkan (D / Inti)** di depan, diikuti oleh konstituen yang **Menerangkan (M / Pewatas)** di belakang.\n- *baju* (D) + *baru* (M) $\\rightarrow$ *baju baru*\n- *ruang* (D) + *tamu* (M) $\\rightarrow$ *ruang tamu*\n- *laboratorium* (D) + *komputer* (M) $\\rightarrow$ *laboratorium komputer*\n- *perusahaan* (D) + *asuransi* (M) $\\rightarrow$ *perusahaan asuransi*\n\n### B. Pengecualian Kaidah D-M (Hukum M-D)\nBeberapa konstruksi kata dalam bahasa Indonesia menempatkan pewatas (M) sebelum inti (D):\n1. **Kata Bilangan / Numeralia**: *tiga* (M) + *buku* (D) $\\rightarrow$ *tiga buku*.\n2. **Kuantor Jamak**: *para* (M) + *hadirin* (D) $\\rightarrow$ *para hadirin*; *semua* (M) + *peserta* (D) $\\rightarrow$ *semua peserta*.\n3. **Adverbia Aspek & Derajat**: *sedang* (M) + *tidur* (D); *sangat* (M) + *indah* (D).\n4. **Kata Sapaan dan Gelar**: *Ibu* (M) + *Guru* (D); *Dokter* (M) + *Andi* (D); *Profesor* (M) + *Budi* (D).\n\n---\n\n## 1.4 Matriks Komparasi Jenis Frasa\n\n| Tipe Frasa | Pola Distribusi Unsur | Ciri Struktural Unsur | Contoh Frasa | Status Pelesapan Unsur |\n| :--- | :--- | :--- | :--- | :--- |\n| **Endosentrik Koordinatif** | Setara ($Inti_1 + Inti_2$) | Dihubungkan *dan* / *atau* | *ayah ibu*, *jual beli* | Salah satu unsur dapat menggantikan frasa utuh |\n| **Endosentrik Atributif** | Tidak Setara ($Inti + Pewatas$) | Berpola D-M atau M-D | *buku tebal*, *sangat cepat* | Hanya unsur inti yang dapat bertahan |\n| **Endosentrik Apositif** | Identik ($Inti + Aposisi$) | Mengacu pada referen tunggal | *Bandung, kota kembang* | Kedua unsur dapat saling menggantikan secara penuh |\n| **Eksosentrik Preposisional** | Tak Berpusat ($Preposisi + Aksis$) | Diawali kata depan | *di perpustakaan*, *ke kampus* | Tidak ada unsur yang dapat berdiri sendiri |\n| **Eksosentrik Artikula** | Tak Berpusat ($Artikel + Nomina$) | Didahului artikel pembatas | *sang juara*, *si kancil* | Kedua unsur terikat ketat dalam konstruksi |\n\n---\n\n# 2. Pola Jebakan Pengecoh UTBK\n\n1. **Jebakan Frasa Panjang vs Klausa**: Deretan kata panjang diawali kata benda dan diperluas klausa relatif (yang..., dengan...) yang dikira kalimat utuh, padahal hanyalah frasa nomina panjang tanpa predikat mandiri.\n2. **Jebakan Penentuan Inti Frasa Bertingkat (Hierarkis)**: Mengira unsur inti terletak pada kata keterangan di akhir frasa, padahal pada pola baku D-M bahasa Indonesia, inti utama terletak pada kata pokok pertama.\n3. **Jebakan Ambiguitas Pewatas Bercabang**: Penempatan klausa relatif di ujung frasa yang dapat menerangkan dua nomina berlainan di depannya (contoh: dekan fakultas kedokteran yang baru).\n4. **Jebakan Kategori Leksikal Frasa**: Menentukan kelas kata frasa berdasarkan kata tugas pembuka (misalnya mengira \"sangat cepat\" frasa adverbia), padahal ditentukan oleh kelas kata intinya (\"cepat\" = adjektiva).\n\n---\n\n# 3. Trik Analisis Taktis (<30 Detik)\n\n1. **Uji Pelesapan Pewatas (Eliminasi Modifier)**: Coret seluruh kata keterangan derajat, preposisi, dan klausa pembatas (yang...). Kata mandiri yang tersisa adalah inti frasa.\n2. **Uji Sisip \"Yang\"**: Jika logis disisipi partikel pemarkah \"yang\" tanpa merusak gramatikal, konstruksi terbukti merupakan frasa endosentrik atributif D-M.\n3. **Uji Sisip \"Dan / Atau\"**: Jika logis dihubungkan konjungsi setara \"dan/atau\", konstruksi merupakan frasa endosentrik koordinatif.\n4. **Uji Jeda Sintaksis (//)**: Tempatkan jeda intonasi untuk membuktikan percabangan tafsir makna pada frasa ambigu.\n\n---\n\n# 4. Rangkuman Inti\n\n- **Frasa** adalah satuan lingual polileksikal non-predikatif yang mengisi tepat satu fungsi sintaksis (S, P, O, Pel, Ket).\n- **Klasifikasi Distribusi**:\n  - **Endosentrik**: Memiliki inti mandiri (Koordinatif: setara; Atributif: D-M/M-D; Apositif: identitas kembar penjelas).\n  - **Eksosentrik**: Tidak berinti mandiri (Preposisional: diawali kata depan; Artikula: didahului partikel).\n- **Kelas Frasa** ditentukan oleh kategori leksikal kata intinya: FN (Nomina), FV (Verba), FA (Adjektiva), FNum (Numeralia), FP (Preposisional), FAdv (Adverbia).\n- **Hukum D-M**: Diterangkan (Inti) di depan, Menerangkan (Pewatas) di belakang. Pengecualian pada kuantor, numeralia, aspek, dan kata sapaan/gelar.\n\n---\n\n# 5. Bedah Soal Terstandar UTBK\n\nBerikut adalah bedah tiga variasi soal Jenis dan Konstruksi Frasa terstandar UTBK-SNBT, lengkap dengan konteks wacana, pertanyaan, pilihan ganda A–E, kunci jawaban, petunjuk taktis, dan pembahasan analitis menyeluruh:\n\n### Variasi 1: Penentuan Unsur Inti Frasa Bertingkat Kompleks (Level: Sulit)\n\n> **Konteks Wacana Soal:**  \n> Evaluasi komprehensif terhadap tata kelola sistem pendistribusian pupuk bersubsidi nasional di daerah tertinggal menunjukkan perlunya pembenahan regulasi secara menyeluruh.  \n>  \n> **Pertanyaan UTBK:** *Unsur inti dari subjek pada kalimat di atas adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** pupuk  \n> - **B.** pendistribusian  \n> - **C.** sistem  \n> - **D.** tata kelola  \n> - **E.** evaluasi  \n\n**Kunci Jawaban: E**\n\n> 💡 **Petunjuk Soal:** Tentukan batas konstituen Subjek (S) sebelum Predikat (*menunjukkan*), lalu gunakan uji pelesapan pewatas berpreposisi untuk menemukan kata pokok pembuka.\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Analisis Struktur Kalimat:**\n  - Subjek (S): *Evaluasi komprehensif terhadap tata kelola sistem pendistribusian pupuk bersubsidi nasional di daerah tertinggal*\n  - Predikat (P): *menunjukkan*\n  - Objek (O): *perlunya pembenahan regulasi secara menyeluruh*\n- **Pembedahan Subjek Bertingkat:** Kata pembuka *evaluasi* (nomina) merupakan inti utama. Seluruh konstituen sesudahnya (*komprehensif*, *terhadap tata kelola...*, *di daerah tertinggal*) merupakan pewatas penjelas bertingkat.\n- **Uji Pelesapan:** Jika pewatas dilesapkan, kalimat inti tetap utuh: *Evaluasi menunjukkan perlunya pembenahan regulasi secara menyeluruh.*\n\n**Jawaban: E**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Coret Preposisi & Pewatas):**\n\n1. Frasa subjek berpola D-M: Inti selalu berada pada kata benda pembuka sebelum preposisi (*terhadap, di, untuk*).\n2. *Evaluasi [komprehensif] [terhadap...] [di...]* $\\rightarrow$ Inti = **evaluasi**.\n3. Pilih **E** (<10 detik!).\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan A Salah:** Kata *pupuk* hanyalah pewatas objek dari kata *pendistribusian*.\n- **Pilihan B Salah:** Kata *pendistribusian* berada di dalam anak pewatas keterangan *tata kelola sistem...*.\n- **Pilihan C Salah:** Kata *sistem* merupakan pewatas dari *tata kelola*.\n- **Pilihan D Salah:** *Tata kelola* adalah aksis frasa preposisional penjelas, bukan inti subjek utama.\n\n---\n\n### Variasi 2: Identifikasi Konstruksi Frasa Ambigu (Level: Sulit)\n\n> **Konteks Wacana Soal:**  \n> (1) Rektor melantik dekan fakultas kedokteran yang baru di auditorium utama.\n> (2) Peneliti mengamati perilaku anak monyet ekor panjang di cagar alam.\n> (3) Rumah sakit umum daerah itu membeli alat pemindai termutakhir.\n> (4) Polisi berhasil menangkap sindikat pencuri sepeda motor bersenjata tajam.\n> (5) Petugas membagikan paket bantuan pangan langsung tunai kepada warga.  \n>  \n> **Pertanyaan UTBK:** *Kalimat yang memuat konstruksi frasa ambigu (bermakna ganda) adalah kalimat bernomor...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** (1)  \n> - **B.** (2)  \n> - **C.** (3)  \n> - **D.** (4)  \n> - **E.** (5)  \n\n**Kunci Jawaban: A**\n\n> 💡 **Petunjuk Soal:** Cari klausa pewatas relatif (*yang baru*) yang posisinya dapat memodifikasi dua nomina berlainan di depannya.\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Analisis Ambiguitas Kalimat (1):** Frasa *dekan fakultas kedokteran yang baru* memicu dua tafsiran struktur:\n  1. *[Dekan [fakultas kedokteran]] // yang baru* $\\rightarrow$ Orang yang menjabat sebagai dekan baru saja dilantik/berganti.\n  2. *Dekan // [fakultas kedokteran yang baru]* $\\rightarrow$ Fakultas kedokterannya yang baru didirikan/dibuka di universitas tersebut.\n- **Evaluasi Kalimat Lain:** Kalimat (2) memuat nama spesies biologi monosemis; kalimat (3) pemindai termutakhir berpola D-M lugas; kalimat (4) bersenjata tajam semantis melekat pada pencuri/sindikat; kalimat (5) nama program resmi non-ambigu.\n\n**Jawaban: A**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Uji Jeda Sintaksis //):**\n\n1. Kalimat (1): *Dekan baru // dari fakultas kedokteran* vs *Dekan // dari fakultas baru* $\\rightarrow$ Multitafsir nyata!\n2. Langsung pilih **A**.\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan B Salah:** *Monyet ekor panjang* adalah istilah taksonomi biologi baku yang bermakna tunggal.\n- **Pilihan C Salah:** *Pemindai termutakhir* berpola D-M baku tanpa percabangan makna.\n- **Pilihan D Salah:** Karakteristik *bersenjata tajam* secara semantis hanya merujuk pada *pencuri/sindikat*, bukan *sepeda motor*.\n- **Pilihan E Salah:** *Paket bantuan pangan langsung tunai* merujuk pada satu kesatuan program resmi pemerintah.\n\n---\n\n### Variasi 3: Analisis Jenis Hubungan Distribusi Frasa (Level: Sedang)\n\n> **Konteks Wacana Soal:**  \n> (1) Jembatan megah penghubung dua pulau itu diresmikan oleh presiden.\n> (2) Buruh dan pengusaha akhirnya menyepakati formula kenaikan upah minimum provinsi.\n> (3) Tim ekspedisi berhasil mencapai puncak tertinggi pegunungan Jayawijaya.\n> (4) Nadiem Makarim, Menteri Pendidikan, meluncurkan program Merdeka Belajar.  \n>  \n> **Pertanyaan UTBK:** *Kalimat yang secara berturut-turut memuat jenis frasa endosentrik koordinatif dan frasa endosentrik apositif adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** (1) dan (3)  \n> - **B.** (2) dan (4)  \n> - **C.** (2) dan (1)  \n> - **D.** (3) dan (4)  \n> - **E.** (4) dan (2)  \n\n**Kunci Jawaban: B**\n\n> 💡 **Petunjuk Soal:** Frasa koordinatif berunsur setara yang dihubungkan \"dan/atau\", sedangkan apositif ditandai oleh dua unsur identik yang saling menggantikan (diapit tanda koma penjelas).\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Analisis Kalimat (2):** *Buruh dan pengusaha* terdiri atas dua inti setara yang dihubungkan konjungsi setara *dan*. Merupakan **frasa endosentrik koordinatif**.\n- **Analisis Kalimat (4):** *Nadiem Makarim, Menteri Pendidikan,* terdiri atas dua unsur penjelas yang mengacu pada referen pribadi yang sama persis (dapat saling menggantikan sepenuhnya). Merupakan **frasa endosentrik apositif**.\n- **Kalimat (1) dan (3):** Keduanya merupakan frasa endosentrik atributif (D-M bertingkat).\n\n**Jawaban: B**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Pindai Penanda Ciri):**\n\n1. Koordinatif = cari konjungsi setara (*dan/atau*) $\\rightarrow$ kalimat (2) *buruh dan pengusaha*.\n2. Apositif = cari koma aposisi identitas $\\rightarrow$ kalimat (4) *Nadiem Makarim, Menteri Pendidikan*.\n3. Urutan berturut-turut: **(2) dan (4)** $\\rightarrow$ Pilih **B**.\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan A Salah:** Keduanya adalah frasa endosentrik atributif bertingkat.\n- **Pilihan C Salah:** Kalimat (1) adalah frasa endosentrik atributif, bukan apositif.\n- **Pilihan D Salah:** Kalimat (3) adalah atributif, bukan koordinatif.\n- **Pilihan E Salah:** Terbalik susunannya; pertanyaan mensyaratkan koordinatif terlebih dahulu baru apositif.",
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Frasa Panjang vs Klausa: Deretan kata panjang diawali kata benda dan diperluas klausa relatif (yang..., dengan...) yang dikira kalimat utuh, padahal hanyalah frasa nomina panjang tanpa predikat mandiri.',
      'Jebakan Penentuan Inti Frasa Bertingkat (Hierarkis): Mengira unsur inti terletak pada kata keterangan di akhir frasa, padahal pada pola baku D-M bahasa Indonesia, inti utama terletak pada kata pokok pertama.',
      'Jebakan Ambiguitas Pewatas Bercabang: Penempatan klausa relatif di ujung frasa yang dapat menerangkan dua nomina berlainan di depannya (contoh: dekan fakultas kedokteran yang baru).',
      'Jebakan Kategori Leksikal Frasa: Menentukan kelas kata frasa berdasarkan kata tugas pembuka (misalnya mengira "sangat cepat" frasa adverbia), padahal ditentukan oleh kelas kata intinya ("cepat" = adjektiva).',
    ],
    quick_execution_algorithm: [
      'Uji Pelesapan Pewatas (Eliminasi Modifier): Coret seluruh kata keterangan derajat, preposisi, dan klausa pembatas (yang...). Kata mandiri yang tersisa adalah inti frasa.',
      'Uji Sisip "Yang": Jika logis disisipi partikel pemarkah "yang" tanpa merusak gramatikal, konstruksi terbukti merupakan frasa endosentrik atributif D-M.',
      'Uji Sisip "Dan / Atau": Jika logis dihubungkan konjungsi setara "dan/atau", konstruksi merupakan frasa endosentrik koordinatif.',
      'Uji Jeda Sintaksis (//): Tempatkan jeda intonasi untuk membuktikan percabangan tafsir makna pada frasa ambigu.',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-02-03-ex1',
      variation_name: 'Variasi 1: Penentuan Unsur Inti Frasa Bertingkat Kompleks (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Evaluasi komprehensif terhadap tata kelola sistem pendistribusian pupuk bersubsidi nasional di daerah tertinggal menunjukkan perlunya pembenahan regulasi secara menyeluruh.',
      question_markdown: 'Unsur inti dari subjek pada kalimat di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'pupuk',
        },
        {
          key: 'B',
          text_markdown: 'pendistribusian',
        },
        {
          key: 'C',
          text_markdown: 'sistem',
        },
        {
          key: 'D',
          text_markdown: 'tata kelola',
        },
        {
          key: 'E',
          text_markdown: 'evaluasi',
        },
      ],
      correct_answer: 'E',
      hint_markdown:
        '💡 **Petunjuk Soal:** Tentukan batas konstituen Subjek (S) sebelum Predikat (*menunjukkan*), lalu gunakan uji pelesapan pewatas berpreposisi untuk menemukan kata pokok pembuka.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Struktur Kalimat:**\n  - Subjek (S): *Evaluasi komprehensif terhadap tata kelola sistem pendistribusian pupuk bersubsidi nasional di daerah tertinggal*\n  - Predikat (P): *menunjukkan*\n  - Objek (O): *perlunya pembenahan regulasi secara menyeluruh*\n- **Pembedahan Subjek Bertingkat:** Kata pembuka *evaluasi* (nomina) merupakan inti utama. Seluruh konstituen sesudahnya (*komprehensif*, *terhadap tata kelola...*, *di daerah tertinggal*) merupakan pewatas penjelas bertingkat.\n- **Uji Pelesapan:** Jika pewatas dilesapkan, kalimat inti tetap utuh: *Evaluasi menunjukkan perlunya pembenahan regulasi secara menyeluruh.*\n\n**Jawaban: E**',
      quick_trick_markdown:
        '**Cara Cepat (Coret Preposisi & Pewatas):**\n\n1. Frasa subjek berpola D-M: Inti selalu berada pada kata benda pembuka sebelum preposisi (*terhadap, di, untuk*).\n2. *Evaluasi [komprehensif] [terhadap...] [di...]* $\\rightarrow$ Inti = **evaluasi**.\n3. Pilih **E** (<10 detik!).',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Kata *pupuk* hanyalah pewatas objek dari kata *pendistribusian*.\n- **Pilihan B Salah:** Kata *pendistribusian* berada di dalam anak pewatas keterangan *tata kelola sistem...*.\n- **Pilihan C Salah:** Kata *sistem* merupakan pewatas dari *tata kelola*.\n- **Pilihan D Salah:** *Tata kelola* adalah aksis frasa preposisional penjelas, bukan inti subjek utama.',
    },
    {
      example_id: 'ppu-02-03-ex2',
      variation_name: 'Variasi 2: Identifikasi Konstruksi Frasa Ambigu (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Rektor melantik dekan fakultas kedokteran yang baru di auditorium utama.\n(2) Peneliti mengamati perilaku anak monyet ekor panjang di cagar alam.\n(3) Rumah sakit umum daerah itu membeli alat pemindai termutakhir.\n(4) Polisi berhasil menangkap sindikat pencuri sepeda motor bersenjata tajam.\n(5) Petugas membagikan paket bantuan pangan langsung tunai kepada warga.',
      question_markdown:
        'Kalimat yang memuat konstruksi frasa ambigu (bermakna ganda) adalah kalimat bernomor...',
      options: [
        {
          key: 'A',
          text_markdown: '(1)',
        },
        {
          key: 'B',
          text_markdown: '(2)',
        },
        {
          key: 'C',
          text_markdown: '(3)',
        },
        {
          key: 'D',
          text_markdown: '(4)',
        },
        {
          key: 'E',
          text_markdown: '(5)',
        },
      ],
      correct_answer: 'A',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cari klausa pewatas relatif (*yang baru*) yang posisinya dapat memodifikasi dua nomina berlainan di depannya.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Ambiguitas Kalimat (1):** Frasa *dekan fakultas kedokteran yang baru* memicu dua tafsiran struktur:\n  1. *[Dekan [fakultas kedokteran]] // yang baru* $\\rightarrow$ Orang yang menjabat sebagai dekan baru saja dilantik/berganti.\n  2. *Dekan // [fakultas kedokteran yang baru]* $\\rightarrow$ Fakultas kedokterannya yang baru didirikan/dibuka di universitas tersebut.\n- **Evaluasi Kalimat Lain:** Kalimat (2) memuat nama spesies biologi monosemis; kalimat (3) pemindai termutakhir berpola D-M lugas; kalimat (4) bersenjata tajam semantis melekat pada pencuri/sindikat; kalimat (5) nama program resmi non-ambigu.\n\n**Jawaban: A**',
      quick_trick_markdown:
        '**Cara Cepat (Uji Jeda Sintaksis //):**\n\n1. Kalimat (1): *Dekan baru // dari fakultas kedokteran* vs *Dekan // dari fakultas baru* $\\rightarrow$ Multitafsir nyata!\n2. Langsung pilih **A**.',
      why_others_are_wrong_markdown:
        '- **Pilihan B Salah:** *Monyet ekor panjang* adalah istilah taksonomi biologi baku yang bermakna tunggal.\n- **Pilihan C Salah:** *Pemindai termutakhir* berpola D-M baku tanpa percabangan makna.\n- **Pilihan D Salah:** Karakteristik *bersenjata tajam* secara semantis hanya merujuk pada *pencuri/sindikat*, bukan *sepeda motor*.\n- **Pilihan E Salah:** *Paket bantuan pangan langsung tunai* merujuk pada satu kesatuan program resmi pemerintah.',
    },
    {
      example_id: 'ppu-02-03-ex3',
      variation_name: 'Variasi 3: Analisis Jenis Hubungan Distribusi Frasa (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Jembatan megah penghubung dua pulau itu diresmikan oleh presiden.\n(2) Buruh dan pengusaha akhirnya menyepakati formula kenaikan upah minimum provinsi.\n(3) Tim ekspedisi berhasil mencapai puncak tertinggi pegunungan Jayawijaya.\n(4) Nadiem Makarim, Menteri Pendidikan, meluncurkan program Merdeka Belajar.',
      question_markdown:
        'Kalimat yang secara berturut-turut memuat jenis frasa endosentrik koordinatif dan frasa endosentrik apositif adalah...',
      options: [
        {
          key: 'A',
          text_markdown: '(1) dan (3)',
        },
        {
          key: 'B',
          text_markdown: '(2) dan (4)',
        },
        {
          key: 'C',
          text_markdown: '(2) dan (1)',
        },
        {
          key: 'D',
          text_markdown: '(3) dan (4)',
        },
        {
          key: 'E',
          text_markdown: '(4) dan (2)',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Frasa koordinatif berunsur setara yang dihubungkan "dan/atau", sedangkan apositif ditandai oleh dua unsur identik yang saling menggantikan (diapit tanda koma penjelas).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (2):** *Buruh dan pengusaha* terdiri atas dua inti setara yang dihubungkan konjungsi setara *dan*. Merupakan **frasa endosentrik koordinatif**.\n- **Analisis Kalimat (4):** *Nadiem Makarim, Menteri Pendidikan,* terdiri atas dua unsur penjelas yang mengacu pada referen pribadi yang sama persis (dapat saling menggantikan sepenuhnya). Merupakan **frasa endosentrik apositif**.\n- **Kalimat (1) dan (3):** Keduanya merupakan frasa endosentrik atributif (D-M bertingkat).\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Pindai Penanda Ciri):**\n\n1. Koordinatif = cari konjungsi setara (*dan/atau*) $\\rightarrow$ kalimat (2) *buruh dan pengusaha*.\n2. Apositif = cari koma aposisi identitas $\\rightarrow$ kalimat (4) *Nadiem Makarim, Menteri Pendidikan*.\n3. Urutan berturut-turut: **(2) dan (4)** $\\rightarrow$ Pilih **B**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Keduanya adalah frasa endosentrik atributif bertingkat.\n- **Pilihan C Salah:** Kalimat (1) adalah frasa endosentrik atributif, bukan apositif.\n- **Pilihan D Salah:** Kalimat (3) adalah atributif, bukan koordinatif.\n- **Pilihan E Salah:** Terbalik susunannya; pertanyaan mensyaratkan koordinatif terlebih dahulu baru apositif.',
    },
  ],
};
