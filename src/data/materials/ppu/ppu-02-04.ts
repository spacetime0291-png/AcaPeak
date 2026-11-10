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
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Dalam komunikasi tulis ilmiah dan akademik, pemilihan kelompok kata tidak hanya dinilai dari kebenaran sintaksisnya, melainkan juga dari keselarasan semantisnya: **medan makna (*semantic field*)**, **kolokasi lazim**, dan **kesejajaran bentuk (paralelisme)**.

---

## 1.1 Medan Makna dan Pasangan Makna Sebidang

Medan makna adalah gugusan atau jaringan leksikal yang saling terikat dalam ranah konseptual, disiplin ilmu, atau wilayah aktivitas yang sama.

### Bentuk Pasangan Makna Sebidang:
1. **Ko-hiponim Koordinatif (Satu Naungan Hipernim)**:
   - Kata-kata yang menempati hierarki taksonomi sejajar di bawah konsep umum yang sama.
   - *Contoh*: *panel surya*, *turbin angin*, *pembangkit geotermal* (berada di bawah medan makna hipernim *energi terbarukan*).
2. **Kolokasi Alamiah (Pasangan Leksikal Baku)**:
   - Kebiasaan leksikal penutur bahasa dan konvensi laras ilmiah dalam memasangkan kata kerja dengan kata benda tertentu (*collocation*).
   - *Contoh*: *menjatuhkan vonis* (bukan *membagikan vonis*), *menegakkan diagnosis* (bukan *mendirikan diagnosis*), *mengendalikan laju inflasi* (bukan *menahan laju inflasi*).
3. **Pasangan Relasional Resiprokal / Komplementer**:
   - Kata-kata yang saling melengkapi dalam sistem hubungan biner atau sistemik.
   - *Contoh*: *debit* $\\leftrightarrow$ *kredit*, *hulu* $\\leftrightarrow$ *hilir*, *jaksa penuntut umum* $\\leftrightarrow$ *penasihat hukum*.

---

## 1.2 Paralelisme Bentuk Kelompok Kata

Paralelisme sintaktis mewajibkan bahwa unsur-unsur dalam kelompok kata yang berpasangan atau diperinci dengan konjungsi setara (*dan*, *serta*, *maupun*, *atau*) harus memiliki **kesejajaran kategori gramatikal dan pola afiksasi**:

- **Kesejajaran Nomina Berkonfiks *pe-...-an***:
  - *pengembangan komoditas*, *pemanfaatan lahan*, dan *peningkatan produktivitas*.
  - $\\rightarrow$ **Salah**: *pengembangan komoditas*, *memanfaatkan lahan*, dan *ditingkatkannya produktivitas* (rancu gabungan nomina, verba aktif, dan verba pasif).
- **Kesejajaran Verba Berprefiks *me-***:
  - *mengumpulkan data*, *menganalisis sampel*, serta *menarik kesimpulan*.
  - $\\rightarrow$ **Salah**: *mengumpulkan data*, *analisis sampel*, dan *penarikan kesimpulan* (tidak paralel antara verba dan nomina).

---

## 1.3 Matriks Komparasi Medan Makna dan Pasangan Sebidang

| Ranah / Bidang Ilmu | Kelompok Kata Kunci | Pasangan Makna Sebidang Lazim | Anomali Pasangan (Janggal / Salah Register) |
| :--- | :--- | :--- | :--- |
| **Ekonomi & Moneter** | *suku bunga acuan* | *laju inflasi*, *cadangan devisa*, *likuiditas perbankan*, *stabilitas moneter* | *suku bunga acuan - ekosistem buatan* (inkonsistensi ranah) |
| **Hukum & Peradilan** | *jaksa penuntut umum* | *surat dakwaan*, *nota pembelaan (pledoi)*, *vonis majelis hakim*, *putusan bebas* | *jaksa penuntut - resep generik* (rancu ranah medis) |
| **Kesehatan & Kedokteran** | *uji klinis vaksin* | *efikasi obat*, *kekebalan kelompok (herd immunity)*, *transmisi patogen* | *uji klinis - laba bersih kuartal* (rancu ranah finansial) |
| **Ekologi & Lingkungan** | *kerusakan habitat* | *kepunahan spesies*, *degradasi lahan*, *suksesi ekologis*, *keanekaragaman hayati* | *kerusakan habitat - diversifikasi portofolio* |
| **Teknologi Informasi** | *keamanan siber* | *enkripsi data end-to-end*, *celah kerentanan (vulnerability)*, *serangan siber* | *keamanan siber - berkas perkara* (rancu ranah hukum acara) |

---

## 1.4 Rangkuman Inti

- **Medan Makna** menyatukan kata-kata dalam ranah disiplin ilmu dan aktivitas tertentu yang koheren.
- **Kolokasi** mengatur kelaziman dan kepatutan penyandingan leksikal formal baku dalam konteks tertentu.
- **Paralelisme** mewajibkan keseragaman bentuk morfosintaksis (kesamaan kelas kata dan pola imbuhan) pada kelompok kata berpasangan.`,
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
