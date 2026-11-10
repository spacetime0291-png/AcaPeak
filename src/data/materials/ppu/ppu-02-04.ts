import type { Material } from '../../../types/material';

export const MATERIAL_PPU_02_04: Material = {
  metadata: {
    id: 'ppu-2-4',
    subtest: 'PPU',
    chapter_num: 2,
    chapter_title: 'Morfologi dan Frasa',
    subchapter_num: '2.4',
    subchapter_title: 'Kelompok Kata dan Pasangan Makna Sebidang',
    title: 'Kelompok Kata dan Pasangan Makna Sebidang',
    required_question_variations: [
      'Identifikasi Kelompok Kata Berpasangan Sebidang',
      'Paralelisme dan Kesejajaran Bentuk Frasa Berpasangan',
      'Analisis Anomali Kolokasi Pasangan Kata',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Kelompok kata dan pasangan makna sebidang dalam subtes PPU UTBK menguji kepekaan leksikosemantis terhadap medan makna (semantic field), kolokasi alamiah baku bahasa Indonesia formal, dan kepatuhan terhadap prinsip paralelisme gramatikal. Kunci utama penyelesaian soal adalah mengidentifikasi ranah/register disiplin ilmu teks (ekonomi, hukum, medis, lingkungan, teknologi), menyeleksi pasangan kolokasi leksikal yang berterima, serta memastikan keseragaman bentuk afiksasi pada rincian frasa yang berpasangan.',
    exam_blueprint_markdown: "# 1. Prinsip Dasar dan Kerangka Teori\n\nDalam komunikasi tulis ilmiah dan akademik, pemilihan kelompok kata tidak hanya dinilai dari kebenaran sintaksisnya, melainkan juga dari keselarasan semantisnya: **medan makna (*semantic field*)**, **kolokasi lazim**, dan **kesejajaran bentuk (paralelisme)**.\n\n---\n\n## 1.1 Medan Makna dan Pasangan Makna Sebidang\n\nMedan makna adalah gugusan atau jaringan leksikal yang saling terikat dalam ranah konseptual, disiplin ilmu, atau wilayah aktivitas yang sama.\n\n### Bentuk Pasangan Makna Sebidang:\n1. **Ko-hiponim Koordinatif (Satu Naungan Hipernim)**:\n   - Kata-kata yang menempati hierarki taksonomi sejajar di bawah konsep umum yang sama.\n   - *Contoh*: *panel surya*, *turbin angin*, *pembangkit geotermal* (berada di bawah medan makna hipernim *energi terbarukan*).\n2. **Kolokasi Alamiah (Pasangan Leksikal Baku)**:\n   - Kebiasaan leksikal penutur bahasa dan konvensi laras ilmiah dalam memasangkan kata kerja dengan kata benda tertentu (*collocation*).\n   - *Contoh*: *menjatuhkan vonis* (bukan *membagikan vonis*), *menegakkan diagnosis* (bukan *mendirikan diagnosis*), *mengendalikan laju inflasi* (bukan *menahan laju inflasi*).\n3. **Pasangan Relasional Resiprokal / Komplementer**:\n   - Kata-kata yang saling melengkapi dalam sistem hubungan biner atau sistemik.\n   - *Contoh*: *debit* $\\leftrightarrow$ *kredit*, *hulu* $\\leftrightarrow$ *hilir*, *jaksa penuntut umum* $\\leftrightarrow$ *penasihat hukum*.\n\n---\n\n## 1.2 Paralelisme Bentuk Kelompok Kata\n\nParalelisme sintaktis mewajibkan bahwa unsur-unsur dalam kelompok kata yang berpasangan atau diperinci dengan konjungsi setara (*dan*, *serta*, *maupun*, *atau*) harus memiliki **kesejajaran kategori gramatikal dan pola afiksasi**:\n\n- **Kesejajaran Nomina Berkonfiks *pe-...-an***:\n  - *pengembangan komoditas*, *pemanfaatan lahan*, dan *peningkatan produktivitas*.\n  - $\\rightarrow$ **Salah**: *pengembangan komoditas*, *memanfaatkan lahan*, dan *ditingkatkannya produktivitas* (rancu gabungan nomina, verba aktif, dan verba pasif).\n- **Kesejajaran Verba Berprefiks *me-***:\n  - *mengumpulkan data*, *menganalisis sampel*, serta *menarik kesimpulan*.\n  - $\\rightarrow$ **Salah**: *mengumpulkan data*, *analisis sampel*, dan *penarikan kesimpulan* (tidak paralel antara verba dan nomina).\n\n---\n\n## 1.3 Matriks Komparasi Medan Makna dan Pasangan Sebidang\n\n| Ranah / Bidang Ilmu | Kelompok Kata Kunci | Pasangan Makna Sebidang Lazim | Anomali Pasangan (Janggal / Salah Register) |\n| :--- | :--- | :--- | :--- |\n| **Ekonomi & Moneter** | *suku bunga acuan* | *laju inflasi*, *cadangan devisa*, *likuiditas perbankan*, *stabilitas moneter* | *suku bunga acuan - ekosistem buatan* (inkonsistensi ranah) |\n| **Hukum & Peradilan** | *jaksa penuntut umum* | *surat dakwaan*, *nota pembelaan (pledoi)*, *vonis majelis hakim*, *putusan bebas* | *jaksa penuntut - resep generik* (rancu ranah medis) |\n| **Kesehatan & Kedokteran** | *uji klinis vaksin* | *efikasi obat*, *kekebalan kelompok (herd immunity)*, *transmisi patogen* | *uji klinis - laba bersih kuartal* (rancu ranah finansial) |\n| **Ekologi & Lingkungan** | *kerusakan habitat* | *kepunahan spesies*, *degradasi lahan*, *suksesi ekologis*, *keanekaragaman hayati* | *kerusakan habitat - diversifikasi portofolio* |\n| **Teknologi Informasi** | *keamanan siber* | *enkripsi data end-to-end*, *celah kerentanan (vulnerability)*, *serangan siber* | *keamanan siber - berkas perkara* (rancu ranah hukum acara) |\n\n---\n\n# 2. Pola Jebakan Pengecoh UTBK\n\n1. **Jebakan Kolokasi Semu (Penerjemahan Harfiah / Metafora Asing)**: Memadukan kata dari disiplin ilmu asing yang sekilas terkesan intelek tetapi tidak lazim dalam kolokasi bahasa Indonesia baku (contoh: mengamputasi defisit anggaran alih-alih memangkas defisit).\n2. **Jebakan Asosiasi Bunyi / Fonologis**: Menyajikan opsi kata berima atau berakhiran mirip yang sama sekali berbeda ranah keilmuan dengan teks wacana (contoh: menyelipkan reboisasi ke dalam konteks peradilan pidana).\n3. **Jebakan Cacat Paralelisme Gramatikal**: Menyisipkan klausa kalimat utuh atau verba pasif di tengah deretan frasa nomina berkonfiks pe-...-an.\n4. **Jebakan Polisemi Kata Khusus**: Mengabaikan arti teknis kata lazim dalam domain tertentu (misalnya pasar dalam pasar modal atau jaringan dalam jaringan saraf tiruan).\n\n---\n\n# 3. Trik Analisis Taktis (<30 Detik)\n\n1. **Uji Label Ranah Ilmu (Register Tagging)**: Tentukan domain tema teks (Moneter, Hukum, Kedokteran, Ekologi, atau IT) dalam 3 detik, lalu eliminasi seketika seluruh opsi dari ranah lain.\n2. **Uji Subkategori Hiponim**: Pastikan kata pengisi berada di cabang taksonomi yang sejajar dengan kelompok kata pendampingnya di dalam teks.\n3. **Uji Kesejajaran Afiksasi (Kloning Gramatikal)**: Jika rincian (1) dan (2) berbentuk pe-...-an, rincian ke-3 wajib berkonfiks pe-...-an.\n4. **Uji Kolokasi Kamus KBBI**: Periksa kelaziman leksikal formal baku (menjatuhkan putusan, bukan membagikan vonis atau menciptakan keputusan).\n\n---\n\n# 4. Rangkuman Inti\n\n- **Medan Makna** menyatukan kata-kata dalam ranah disiplin ilmu dan aktivitas tertentu yang koheren.\n- **Kolokasi** mengatur kelaziman dan kepatutan penyandingan leksikal formal baku dalam konteks tertentu.\n- **Paralelisme** mewajibkan keseragaman bentuk morfosintaksis (kesamaan kelas kata dan pola imbuhan) pada kelompok kata berpasangan.\n\n---\n\n# 5. Bedah Soal Terstandar UTBK\n\nBerikut adalah bedah tiga variasi soal Kelompok Kata dan Pasangan Makna Sebidang terstandar UTBK-SNBT, lengkap dengan konteks wacana, pertanyaan, pilihan ganda A–E, kunci jawaban, petunjuk taktis, dan pembahasan analitis menyeluruh:\n\n### Variasi 1: Identifikasi Kelompok Kata Berpasangan Sebidang (Level: Sedang)\n\n> **Konteks Wacana Soal:**  \n> Untuk menjaga stabilitas nilai tukar domestik serta memperkuat ketahanan pasar keuangan nasional, bank sentral memutuskan untuk menaikkan suku bunga acuan demi meredam gejolak nilai tukar rupiah dan menekan [...].  \n>  \n> **Pertanyaan UTBK:** *Kelompok kata atau pasangan makna sebidang yang paling tepat untuk melengkapi bagian rumpang kalimat di atas adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** degradasi lingkungan  \n> - **B.** lonjakan inflasi  \n> - **C.** tuntutan jaksa  \n> - **D.** mutasi genetik  \n> - **E.** efisiensi mesin  \n\n**Kunci Jawaban: B**\n\n> 💡 **Petunjuk Soal:** Tentukan domain disiplin ilmu kalimat (makroekonomi/moneter), lalu identifikasi instrumen yang lazim dipasangkan dengan kebijakan \"menaikkan suku bunga acuan\".\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Identifikasi Ranah Ilmu:** Teks membahas wacana makroekonomi perbankan: *stabilitas nilai tukar*, *pasar keuangan*, *bank sentral*, *suku bunga acuan*, dan *nilai tukar rupiah*.\n- **Analisis Kebutuhan Leksikal:** Dalam teori moneter, instrumen *suku bunga acuan* dinaikkan oleh bank sentral untuk mengendalikan peredaran uang serta menekan laju kenaikan harga barang dan jasa (*inflasi*). Pasangan kolokasi baku sebidang adalah **lonjakan inflasi**.\n\n**Jawaban: B**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Metode Label Disiplin Ilmu):**\n\n1. Ranah teks = Moneter / Makroekonomi.\n2. Cek opsi: Opsi B (*lonjakan inflasi*) adalah satu-satunya konsep moneter sebidang!\n3. Coret opsi A (ekologi), C (hukum), D (biologi), dan E (teknik) dalam <5 detik.\n4. Pilih **B**.\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan A Salah:** Berasal dari domain ekologi/lingkungan hidup.\n- **Pilihan C Salah:** Merupakan istilah teknis laras hukum peradilan.\n- **Pilihan D Salah:** Merupakan istilah biologi molekuler/genetika.\n- **Pilihan E Salah:** Merupakan istilah rekayasa industri/mesin.\n\n---\n\n### Variasi 2: Paralelisme dan Kesejajaran Bentuk Frasa Berpasangan (Level: Sulit)\n\n> **Konteks Wacana Soal:**  \n> Program diversifikasi pangan nasional mencakup pengembangan komoditas lokal bernilai gizi tinggi, pemanfaatan pekarangan tidur secara produktif, dan [...] ke seluruh lapisan masyarakat.  \n>  \n> **Pertanyaan UTBK:** *Kelompok kata yang memenuhi prinsip paralelisme sintaktis dan pasangan makna sebidang untuk melengkapi rumpang tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** pemerintah menyosialisasikan pentingnya karbohidrat alternatif  \n> - **B.** disosialisasikannya pola pangan sehat secara masif  \n> - **C.** penyosialisasian pola konsumsi pangan nonberas  \n> - **D.** untuk menyosialisasikan diversifikasi pangan lokal  \n> - **E.** mengampanyekan pentingnya gizi seimbang  \n\n**Kunci Jawaban: C**\n\n> 💡 **Petunjuk Soal:** Cermati bentuk gramatikal dua rincian sebelumnya: \"pengembangan...\" dan \"pemanfaatan...\". Rincian ketiga wajib memiliki bentuk afiksasi dan kelas kata yang sama.\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Analisis Kesejajaran Morfosintaksis:**\n  - Rincian 1: *pengembangan...* $\\rightarrow$ Frasa Nomina berkonfiks **pe-...-an**.\n  - Rincian 2: *pemanfaatan...* $\\rightarrow$ Frasa Nomina berkonfiks **pe-...-an**.\n  - Rincian 3 (Target): Wajib mutlak sejajar berupa Frasa Nomina berkonfiks **pe-...-an**.\n- **Evaluasi Pilihan:**\n  - Pilihan C (*penyosialisasian pola konsumsi pangan nonberas*) memenuhi kaidah paralelisme afiksasi **pe-...-an** serta sebidang dengan tema diversifikasi pangan.\n\n**Jawaban: C**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Rumus Kloning Gramatikal):**\n\n1. Rincian 1 = **pe-...-an** (*pengembangan*)\n2. Rincian 2 = **pe-...-an** (*pemanfaatan*)\n3. Rincian 3 = **pe-...-an** $\\rightarrow$ hanya Opsi C (*penyosialisasian*) yang berawalan *pe-...-an*!\n4. Pilih **C** seketika.\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan A Salah:** Berbentuk klausa kalimat (S-P-O), merusak struktur rincian frasa nomina.\n- **Pilihan B Salah:** Berbentuk verba pasif klitika *-nya*, tidak sejajar dengan nomina tindakan.\n- **Pilihan D Salah:** Frasa preposisional berpartikel *untuk* mengubah fungsi menjadi keterangan tujuan tambahan.\n- **Pilihan E Salah:** Berbentuk verba aktif transitif (*me-*), bukan nomina berkonfiks *pe-...-an*.\n\n---\n\n### Variasi 3: Analisis Anomali Kolokasi Pasangan Kata (Level: Sedang)\n\n> **Konteks Wacana Soal:**  \n> Setelah mendengarkan keterangan saksi ahli dan memeriksa seluruh alat bukti di persidangan, majelis hakim akhirnya [...] putusan bebas murni kepada terdakwa karena tidak terbukti secara sah dan meyakinkan bersalah.  \n>  \n> **Pertanyaan UTBK:** *Frasa verba kolokasi baku yang selaras dengan laras bahasa hukum peradilan untuk melengkapi kalimat di atas adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** memberikan hadiah  \n> - **B.** menjatuhkan putusan  \n> - **C.** membagikan vonis  \n> - **D.** melemparkan dakwaan  \n> - **E.** menciptakan keputusan  \n\n**Kunci Jawaban: B**\n\n> 💡 **Petunjuk Soal:** Carilah verba transitif yang menjadi pasangan idiomatis formal bagi kata \"putusan/vonis\" oleh majelis hakim di ruang sidang pengadilan.\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Konsep Formal:**  \n**Cara Konsep Formal:**\n\n- **Analisis Kolokasi Laras Hukum:** Dalam register hukum peradilan Indonesia, tindakan majelis hakim yang menetapkan akhir dari suatu perkara persidangan bersanding secara formal dengan kata kerja **menjatuhkan**: *menjatuhkan putusan*, *menjatuhkan vonis*, *menjatuhkan hukuman*.\n- **Evaluasi Opsi:** *Memberikan hadiah* melanggar etika hukum; *membagikan* lazim untuk benda fisik konkret; *dakwaan* adalah tugas jaksa bukan hakim; *menciptakan keputusan* adalah terjemahan harfiah asing yang tidak baku.\n\n**Jawaban: B**\n\n- **Penerapan Trik Cepat (<30 Detik):**  \n**Cara Cepat (Kolokasi Tetap Laras Peradilan):**\n\n1. Hakim $\\rightarrow$ **menjatuhkan** (putusan/vonis/hukuman).\n2. Jaksa $\\rightarrow$ **membacakan/mengajukan** (dakwaan/tuntutan).\n3. Pasangan hakim + putusan = **menjatuhkan putusan**.\n4. Pilih **B**.\n\n- **Mengapa Opsi Lain Salah?**  \n- **Pilihan A Salah:** Putusan peradilan bukan bentuk hadiah atau gratifikasi.\n- **Pilihan C Salah:** Verba *membagikan* tidak lazim berpasangan dengan objek abstrak yuridis.\n- **Pilihan D Salah:** Dakwaan diajukan oleh jaksa, bukan hakim, dan kata *melemparkan* bersifat kolokial nonformal.\n- **Pilihan E Salah:** Terjemahan harfiah rancu (*create decision*), bukan kolokasi baku bahasa Indonesia.",
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Kolokasi Semu (Penerjemahan Harfiah / Metafora Asing): Memadukan kata dari disiplin ilmu asing yang sekilas terkesan intelek tetapi tidak lazim dalam kolokasi bahasa Indonesia baku (contoh: mengamputasi defisit anggaran alih-alih memangkas defisit).',
      'Jebakan Asosiasi Bunyi / Fonologis: Menyajikan opsi kata berima atau berakhiran mirip yang sama sekali berbeda ranah keilmuan dengan teks wacana (contoh: menyelipkan reboisasi ke dalam konteks peradilan pidana).',
      'Jebakan Cacat Paralelisme Gramatikal: Menyisipkan klausa kalimat utuh atau verba pasif di tengah deretan frasa nomina berkonfiks pe-...-an.',
      'Jebakan Polisemi Kata Khusus: Mengabaikan arti teknis kata lazim dalam domain tertentu (misalnya pasar dalam pasar modal atau jaringan dalam jaringan saraf tiruan).',
    ],
    quick_execution_algorithm: [
      'Uji Label Ranah Ilmu (Register Tagging): Tentukan domain tema teks (Moneter, Hukum, Kedokteran, Ekologi, atau IT) dalam 3 detik, lalu eliminasi seketika seluruh opsi dari ranah lain.',
      'Uji Subkategori Hiponim: Pastikan kata pengisi berada di cabang taksonomi yang sejajar dengan kelompok kata pendampingnya di dalam teks.',
      'Uji Kesejajaran Afiksasi (Kloning Gramatikal): Jika rincian (1) dan (2) berbentuk pe-...-an, rincian ke-3 wajib berkonfiks pe-...-an.',
      'Uji Kolokasi Kamus KBBI: Periksa kelaziman leksikal formal baku (menjatuhkan putusan, bukan membagikan vonis atau menciptakan keputusan).',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-02-04-ex1',
      variation_name: 'Variasi 1: Identifikasi Kelompok Kata Berpasangan Sebidang (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Untuk menjaga stabilitas nilai tukar domestik serta memperkuat ketahanan pasar keuangan nasional, bank sentral memutuskan untuk menaikkan suku bunga acuan demi meredam gejolak nilai tukar rupiah dan menekan [...].',
      question_markdown:
        'Kelompok kata atau pasangan makna sebidang yang paling tepat untuk melengkapi bagian rumpang kalimat di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'degradasi lingkungan',
        },
        {
          key: 'B',
          text_markdown: 'lonjakan inflasi',
        },
        {
          key: 'C',
          text_markdown: 'tuntutan jaksa',
        },
        {
          key: 'D',
          text_markdown: 'mutasi genetik',
        },
        {
          key: 'E',
          text_markdown: 'efisiensi mesin',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Tentukan domain disiplin ilmu kalimat (makroekonomi/moneter), lalu identifikasi instrumen yang lazim dipasangkan dengan kebijakan "menaikkan suku bunga acuan".',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Identifikasi Ranah Ilmu:** Teks membahas wacana makroekonomi perbankan: *stabilitas nilai tukar*, *pasar keuangan*, *bank sentral*, *suku bunga acuan*, dan *nilai tukar rupiah*.\n- **Analisis Kebutuhan Leksikal:** Dalam teori moneter, instrumen *suku bunga acuan* dinaikkan oleh bank sentral untuk mengendalikan peredaran uang serta menekan laju kenaikan harga barang dan jasa (*inflasi*). Pasangan kolokasi baku sebidang adalah **lonjakan inflasi**.\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Metode Label Disiplin Ilmu):**\n\n1. Ranah teks = Moneter / Makroekonomi.\n2. Cek opsi: Opsi B (*lonjakan inflasi*) adalah satu-satunya konsep moneter sebidang!\n3. Coret opsi A (ekologi), C (hukum), D (biologi), dan E (teknik) dalam <5 detik.\n4. Pilih **B**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Berasal dari domain ekologi/lingkungan hidup.\n- **Pilihan C Salah:** Merupakan istilah teknis laras hukum peradilan.\n- **Pilihan D Salah:** Merupakan istilah biologi molekuler/genetika.\n- **Pilihan E Salah:** Merupakan istilah rekayasa industri/mesin.',
    },
    {
      example_id: 'ppu-02-04-ex2',
      variation_name:
        'Variasi 2: Paralelisme dan Kesejajaran Bentuk Frasa Berpasangan (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Program diversifikasi pangan nasional mencakup pengembangan komoditas lokal bernilai gizi tinggi, pemanfaatan pekarangan tidur secara produktif, dan [...] ke seluruh lapisan masyarakat.',
      question_markdown:
        'Kelompok kata yang memenuhi prinsip paralelisme sintaktis dan pasangan makna sebidang untuk melengkapi rumpang tersebut adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'pemerintah menyosialisasikan pentingnya karbohidrat alternatif',
        },
        {
          key: 'B',
          text_markdown: 'disosialisasikannya pola pangan sehat secara masif',
        },
        {
          key: 'C',
          text_markdown: 'penyosialisasian pola konsumsi pangan nonberas',
        },
        {
          key: 'D',
          text_markdown: 'untuk menyosialisasikan diversifikasi pangan lokal',
        },
        {
          key: 'E',
          text_markdown: 'mengampanyekan pentingnya gizi seimbang',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cermati bentuk gramatikal dua rincian sebelumnya: "pengembangan..." dan "pemanfaatan...". Rincian ketiga wajib memiliki bentuk afiksasi dan kelas kata yang sama.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kesejajaran Morfosintaksis:**\n  - Rincian 1: *pengembangan...* $\\rightarrow$ Frasa Nomina berkonfiks **pe-...-an**.\n  - Rincian 2: *pemanfaatan...* $\\rightarrow$ Frasa Nomina berkonfiks **pe-...-an**.\n  - Rincian 3 (Target): Wajib mutlak sejajar berupa Frasa Nomina berkonfiks **pe-...-an**.\n- **Evaluasi Pilihan:**\n  - Pilihan C (*penyosialisasian pola konsumsi pangan nonberas*) memenuhi kaidah paralelisme afiksasi **pe-...-an** serta sebidang dengan tema diversifikasi pangan.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Rumus Kloning Gramatikal):**\n\n1. Rincian 1 = **pe-...-an** (*pengembangan*)\n2. Rincian 2 = **pe-...-an** (*pemanfaatan*)\n3. Rincian 3 = **pe-...-an** $\\rightarrow$ hanya Opsi C (*penyosialisasian*) yang berawalan *pe-...-an*!\n4. Pilih **C** seketika.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Berbentuk klausa kalimat (S-P-O), merusak struktur rincian frasa nomina.\n- **Pilihan B Salah:** Berbentuk verba pasif klitika *-nya*, tidak sejajar dengan nomina tindakan.\n- **Pilihan D Salah:** Frasa preposisional berpartikel *untuk* mengubah fungsi menjadi keterangan tujuan tambahan.\n- **Pilihan E Salah:** Berbentuk verba aktif transitif (*me-*), bukan nomina berkonfiks *pe-...-an*.',
    },
    {
      example_id: 'ppu-02-04-ex3',
      variation_name: 'Variasi 3: Analisis Anomali Kolokasi Pasangan Kata (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Setelah mendengarkan keterangan saksi ahli dan memeriksa seluruh alat bukti di persidangan, majelis hakim akhirnya [...] putusan bebas murni kepada terdakwa karena tidak terbukti secara sah dan meyakinkan bersalah.',
      question_markdown:
        'Frasa verba kolokasi baku yang selaras dengan laras bahasa hukum peradilan untuk melengkapi kalimat di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'memberikan hadiah',
        },
        {
          key: 'B',
          text_markdown: 'menjatuhkan putusan',
        },
        {
          key: 'C',
          text_markdown: 'membagikan vonis',
        },
        {
          key: 'D',
          text_markdown: 'melemparkan dakwaan',
        },
        {
          key: 'E',
          text_markdown: 'menciptakan keputusan',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Carilah verba transitif yang menjadi pasangan idiomatis formal bagi kata "putusan/vonis" oleh majelis hakim di ruang sidang pengadilan.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kolokasi Laras Hukum:** Dalam register hukum peradilan Indonesia, tindakan majelis hakim yang menetapkan akhir dari suatu perkara persidangan bersanding secara formal dengan kata kerja **menjatuhkan**: *menjatuhkan putusan*, *menjatuhkan vonis*, *menjatuhkan hukuman*.\n- **Evaluasi Opsi:** *Memberikan hadiah* melanggar etika hukum; *membagikan* lazim untuk benda fisik konkret; *dakwaan* adalah tugas jaksa bukan hakim; *menciptakan keputusan* adalah terjemahan harfiah asing yang tidak baku.\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Kolokasi Tetap Laras Peradilan):**\n\n1. Hakim $\\rightarrow$ **menjatuhkan** (putusan/vonis/hukuman).\n2. Jaksa $\\rightarrow$ **membacakan/mengajukan** (dakwaan/tuntutan).\n3. Pasangan hakim + putusan = **menjatuhkan putusan**.\n4. Pilih **B**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Putusan peradilan bukan bentuk hadiah atau gratifikasi.\n- **Pilihan C Salah:** Verba *membagikan* tidak lazim berpasangan dengan objek abstrak yuridis.\n- **Pilihan D Salah:** Dakwaan diajukan oleh jaksa, bukan hakim, dan kata *melemparkan* bersifat kolokial nonformal.\n- **Pilihan E Salah:** Terjemahan harfiah rancu (*create decision*), bukan kolokasi baku bahasa Indonesia.',
    },
  ],
};
