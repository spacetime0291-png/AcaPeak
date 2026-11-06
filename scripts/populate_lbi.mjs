import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const lbiItems = [
  // ==========================================
  // BAB 1: KOMPETENSI KOGNITIF LITERASI MEMBACA (TAKSONOMI AKM & PISA)
  // ==========================================
  // 1.1. Menemukan dan Mengakses Informasi (Retrieve and Access)
  {
    id: "lbi-1.1.1",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.1",
    subchapter_title: "Menemukan dan Mengakses Informasi (Retrieve and Access)",
    title: "Ekstraksi Informasi Eksplisit (Tersurat)",
    micro_syllabus_scope: [
      "Teknik Skimming (membaca cepat untuk menangkap gambaran umum/topik).",
      "Teknik Scanning (memindai kata kunci spesifik: nama tokoh, tahun, angka statistik, lokasi, istilah teknis).",
      "Menjawab pertanyaan faktual langsung (5W+1H: Apa, Siapa, Kapan, Di mana, Mengapa, Bagaimana) yang tertulis persis atau diparafrasakan tipis di dalam teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.1.1.json"
  },
  {
    id: "lbi-1.1.2",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.1",
    subchapter_title: "Menemukan dan Mengakses Informasi (Retrieve and Access)",
    title: "Verifikasi Pernyataan Tunggal dan Majemuk (Benar/Salah & Sesuai/Tidak Sesuai)",
    micro_syllabus_scope: [
      "Memisahkan pernyataan yang Sesuai dengan isi bacaan vs Tidak Sesuai dengan isi bacaan.",
      "Strategi mengisi tabel matriks Benar - Salah (5 pernyataan berurutan) dengan mencocokkan kata kunci per paragraf tanpa membaca ulang seluruh teks.",
      "Mengidentifikasi jebakan distorsi informasi: penyempitan/perluasan kuantor (sebagian diubah menjadi semua), pembalikan hubungan sebab-akibat, dan perubahan modalitas (dapat/berpotensi diubah menjadi pasti/wajib)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.1.2.json"
  },

  // 1.2. Menginterpretasi dan Mengintegrasikan Informasi (Interpret and Integrate)
  {
    id: "lbi-1.2.1",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.2",
    subchapter_title: "Menginterpretasi dan Mengintegrasikan Informasi (Interpret and Integrate)",
    title: "Penarikan Inferensi (Simpulan Tersirat)",
    micro_syllabus_scope: [
      "Menyimpulkan informasi yang tidak tertulis secara langsung tetapi pasti benar secara logis berdasarkan gabungan 2 atau lebih kalimat di dalam teks.",
      "Menentukan alasan logis di balik suatu fenomena atau tindakan subjek dalam wacana."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.2.1.json"
  },
  {
    id: "lbi-1.2.2",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.2",
    subchapter_title: "Menginterpretasi dan Mengintegrasikan Informasi (Interpret and Integrate)",
    title: "Hierarki Gagasan dan Struktur Makro Wacana",
    micro_syllabus_scope: [
      "Menentukan Topik Utama / Pokok Bahasan Teks.",
      "Menentukan Gagasan Utama / Ide Pokok per paragraf dan Gagasan Utama keseluruhan bacaan.",
      "Menyusun Kerangka Teks (Outline) atau Peta Konsep yang merepresentasikan alur paragraf 1 hingga paragraf terakhir.",
      "Merangkum / Meringkas Teks (Summary): menggabungkan gagasan utama tiap paragraf secara proporsional."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.2.2.json"
  },
  {
    id: "lbi-1.2.3",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.2",
    subchapter_title: "Menginterpretasi dan Mengintegrasikan Informasi (Interpret and Integrate)",
    title: "Hubungan Logis Antarbagian Teks",
    micro_syllabus_scope: [
      "Menganalisis hubungan antarparagraf (penjelasan rinci, pembuktian data, contoh kasus, perbandingan, pertentangan/kontras, sebab-akibat, masalah-solusi).",
      "Menafsirkan makna ungkapan, istilah teknis, atau kalimat kompleks berdasarkan konteks paragraf tempat kalimat tersebut berada."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.2.3.json"
  },

  // 1.3. Mengevaluasi dan Merefleksikan Informasi (Evaluate and Reflect)
  {
    id: "lbi-1.3.1",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.3",
    subchapter_title: "Mengevaluasi dan Merefleksikan Informasi (Evaluate and Reflect)",
    title: "Analisis Fakta, Opini, dan Asumsi dalam Wacana",
    micro_syllabus_scope: [
      "Fakta: informasi objektif yang telah terjadi, terverifikasi, memiliki data kuantitatif/historis yang pasti.",
      "Opini (Pendapat): penilaian subjektif, prediksi masa depan (akan, diperkirakan), saran (sebaiknya, seharusnya), atau kata sifat evaluatif (sangat indah, paling efektif, mengkhawatirkan).",
      "Asumsi: anggapan dasar penulis yang dijadikan landasan argumen tanpa disertai bukti langsung di dalam teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.3.1.json"
  },
  {
    id: "lbi-1.3.2",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.3",
    subchapter_title: "Mengevaluasi dan Merefleksikan Informasi (Evaluate and Reflect)",
    title: "Evaluasi Kualitas dan Kredibilitas Argumen",
    micro_syllabus_scope: [
      "Menilai kecukupan bukti/data yang disajikan penulis untuk mendukung klaim utamanya.",
      "Mengidentifikasi bias penulis, konflik kepentingan, atau argumen yang berat sebelah (satu sudut pandang).",
      "Menentukan pihak yang dituju oleh penulis, keberpihakan penulis (membela siapa), dan tujuan komunikatif teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.3.2.json"
  },
  {
    id: "lbi-1.3.3",
    subtest: "LBI",
    chapter_num: 1,
    chapter_title: "Kompetensi Kognitif Literasi Membaca (Taksonomi AKM & PISA)",
    subchapter_num: "1.3",
    subchapter_title: "Mengevaluasi dan Merefleksikan Informasi (Evaluate and Reflect)",
    title: "Refleksi dan Aplikasi Kontekstual (Problem Solving)",
    micro_syllabus_scope: [
      "Menentukan solusi kebijakan atau langkah tindak lanjut yang paling tepat berdasarkan permasalahan yang diuraikan dalam teks.",
      "Menerapkan prinsip/konsep di dalam teks ke dalam skenario atau ilustrasi kasus baru di luar teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-1.3.3.json"
  },

  // ==========================================
  // BAB 2: LITERASI TEKS INFORMASI DAN SAINTIFIK (NONFIKSI)
  // ==========================================
  // 2.1. Karakteristik Genre Teks Nonfiksi dalam LBI
  {
    id: "lbi-2.1.1",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.1",
    subchapter_title: "Karakteristik Genre Teks Nonfiksi dalam LBI",
    title: "Teks Eksposisi dan Artikel Ilmiah Populer",
    micro_syllabus_scope: [
      "Struktur: Tesis (Pernyataan Pendapat) → Rangkaian Argumen (Data & Fakta) → Penegasan Ulang.",
      "Fokus analisis: mekanisme kerja suatu fenomena (misal: pemanasan global, mutasi virus, algoritma AI, inflasi ekonomi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.1.1.json"
  },
  {
    id: "lbi-2.1.2",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.1",
    subchapter_title: "Karakteristik Genre Teks Nonfiksi dalam LBI",
    title: "Teks Eksplanasi (Fenomena Alam dan Sosial)",
    micro_syllabus_scope: [
      "Struktur: Pernyataan Umum → Deretan Penjelas (Urutan Sebab-Akibat / Kronologis Proses) → Interpretasi.",
      "Fokus analisis: melacak rantai kausalitas bagaimana dan mengapa suatu fenomena terjadi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.1.2.json"
  },
  {
    id: "lbi-2.1.3",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.1",
    subchapter_title: "Karakteristik Genre Teks Nonfiksi dalam LBI",
    title: "Teks Argumentasi dan Editorial / Opini Tajuk Rencana",
    micro_syllabus_scope: [
      "Fokus analisis: membedah posisi redaksi/penulis terhadap isu kontroversial, kontra-argumen (sanggahan), dan rekomendasi solusi kepada pemerintah/masyarakat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.1.3.json"
  },
  {
    id: "lbi-2.1.4",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.1",
    subchapter_title: "Karakteristik Genre Teks Nonfiksi dalam LBI",
    title: "Teks Biografi dan Sejarah",
    micro_syllabus_scope: [
      "Fokus analisis: kronologi peristiwa sejarah, keteladanan tokoh, pemikiran tokoh, dan dampak historis terhadap masa kini."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.1.4.json"
  },

  // 2.2. Sintesis Multi-Teks (Wacana Ganda: Teks 1 & Teks 2)
  {
    id: "lbi-2.2.1",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.2",
    subchapter_title: "Sintesis Multi-Teks (Wacana Ganda: Teks 1 & Teks 2)",
    title: "Komparasi Sudut Pandang dan Fokus Pembahasan",
    micro_syllabus_scope: [
      "Mengidentifikasi persamaan topik tetapi perbedaan sudut pandang (misal: Teks 1 membahas dampak ekonomi energi surya, Teks 2 membahas kendala teknis baterai surya).",
      "Mengidentifikasi pertentangan klaim (Teks 1 mendukung kebijakan X, Teks 2 mengkritisi kebijakan X)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.2.1.json"
  },
  {
    id: "lbi-2.2.2",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.2",
    subchapter_title: "Sintesis Multi-Teks (Wacana Ganda: Teks 1 & Teks 2)",
    title: "Hubungan Komplemen Antar-Teks",
    micro_syllabus_scope: [
      "Menentukan bagaimana Teks 2 memperjelas, mencontohkan, membantah, atau merinci informasi yang ada pada Teks 1.",
      "Menarik kesimpulan gabungan (sintesis) yang merangkum benang merah Teks 1 dan Teks 2 secara utuh."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.2.2.json"
  },

  // 2.3. Literasi Teks Multimodal (Infografis, Tabel, dan Bagan Alir)
  {
    id: "lbi-2.3.1",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.3",
    subchapter_title: "Literasi Teks Multimodal (Infografis, Tabel, dan Bagan Alir)",
    title: "Integrasi Teks Verbal dan Visualisasi Data",
    micro_syllabus_scope: [
      "Memadukan informasi pada paragraf bacaan dengan data angka pada grafik/tabel/infografis yang menyertainya.",
      "Menguji apakah narasi di dalam teks didukung atau justru dibantah oleh data visual pada infografis."
    ],
    requires_svg: true, // Infografis & data visual
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.3.1.json"
  },
  {
    id: "lbi-2.3.2",
    subtest: "LBI",
    chapter_num: 2,
    chapter_title: "Literasi Teks Informasi dan Saintifik (Nonfiksi)",
    subchapter_num: "2.3",
    subchapter_title: "Literasi Teks Multimodal (Infografis, Tabel, dan Bagan Alir)",
    title: "Pembacaan Bagan Alir (Flowchart), Siklus, dan Denah",
    micro_syllabus_scope: [
      "Menerjemahkan tahapan prosedur, siklus biologi/fisika/ekonomi, atau alur birokrasi ke dalam pernyataan verbal yang akurat."
    ],
    requires_svg: true, // Bagan alir / Flowchart / Denah
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-2.3.2.json"
  },

  // ==========================================
  // BAB 3: LITERASI TEKS SASTRA DAN NARASI FIKSI
  // ==========================================
  // 3.1. Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)
  {
    id: "lbi-3.1.1",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.1",
    subchapter_title: "Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)",
    title: "Tema dan Amanat (Pesan Moral)",
    micro_syllabus_scope: [
      "Mengabstraksikan persoalan pokok yang mendasari cerita (tema mayor vs tema minor).",
      "Menarik pesan moral/amanat secara tersirat dari penyelesaian konflik dan nasib tokoh tanpa terjebak pada kalimat menggurui yang tidak ada di teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.1.1.json"
  },
  {
    id: "lbi-3.1.2",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.1",
    subchapter_title: "Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)",
    title: "Tokoh dan Penokohan (Karakterisasi)",
    micro_syllabus_scope: [
      "Peran tokoh: Protagonis, Antagonis, Tritagonis (penengah), dan Figuran.",
      "Teknik Pelukisan Watak: Teknik Analitik (Langsung): penulis mendeskripsikan sifat tokoh secara eksplisit.",
      "Teknik Pelukisan Watak: Teknik Dramatik (Tidak Langsung): watak disimpulkan pembaca melalui dialog antartokoh, tindakan/perilaku tokoh, jalan pikiran/monolog batin tokoh, reaksi tokoh lain, serta deskripsi fisik/lingkungan tokoh."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.1.2.json"
  },
  {
    id: "lbi-3.1.3",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.1",
    subchapter_title: "Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)",
    title: "Alur (Plot) dan Konflik",
    micro_syllabus_scope: [
      "Tahapan alur: Pengenalan (Eksposisi) → Pemunculan Masalah → Peningkatan Konflik (Komplikasi) → Puncak Konflik (Klimaks) → Penurunan/Penyelesaian (Resolusi).",
      "Jenis alur: Maju (Progresif), Mundur (Regresif/Flashback), dan Campuran.",
      "Jenis konflik: Konflik Batin/Internal (manusia vs dirinya sendiri) dan Konflik Eksternal (manusia vs manusia, manusia vs masyarakat/budaya, manusia vs alam)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.1.3.json"
  },
  {
    id: "lbi-3.1.4",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.1",
    subchapter_title: "Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)",
    title: "Latar (Setting) dan Suasana",
    micro_syllabus_scope: [
      "Latar Tempat: lokasi geografis atau ruang fisik kejadian.",
      "Latar Waktu: jam, pagi/siang/malam, musim, atau era sejarah.",
      "Latar Sosial-Budaya: status sosial ekonomi tokoh, adat istiadat, cara berpikir masyarakat setempat.",
      "Latar Suasana (Mood/Atmosphere): suasana emosional yang terbangun dalam kutipan (mencekam, haru, getir, khidmat, ceria, sunyi, tegang) beserta bukti kalimat pendukungnya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.1.4.json"
  },
  {
    id: "lbi-3.1.5",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.1",
    subchapter_title: "Analisis Unsur Intrinsik Prosa (Cerpen dan Kutipan Novel)",
    title: "Sudut Pandang (Point of View / POV)",
    micro_syllabus_scope: [
      "Orang Pertama (\"Aku\" / \"Saya\"): Orang Pertama Pelaku Utama (\"Aku\" adalah tokoh sentral yang mengalami konflik utama).",
      "Orang Pertama (\"Aku\" / \"Saya\"): Orang Pertama Pelaku Sampingan (\"Aku\" hanya sebagai saksi/pencerita kisah tokoh utama lain).",
      "Orang Ketiga (\"Dia\" / \"Ia\" / Nama Tokoh): Orang Ketiga Serbatahu (Omniscient: narator mengetahui seluruh isi hati dan pikiran semua tokoh).",
      "Orang Ketiga (\"Dia\" / \"Ia\" / Nama Tokoh): Orang Ketiga Terbatas (Pengamat: narator hanya menceritakan apa yang terlihat atau hanya fokus pada pikiran satu tokoh)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.1.5.json"
  },

  // 3.2. Bahasa Kias, Simbolisme, dan Citraan dalam Sastra
  {
    id: "lbi-3.2.1",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.2",
    subchapter_title: "Bahasa Kias, Simbolisme, dan Citraan dalam Sastra",
    title: "Makna Simbolik dan Ungkapan Kontekstual dalam Narasi",
    micro_syllabus_scope: [
      "Menafsirkan makna lambang/simbol benda, warna, atau peristiwa alam dalam cerita (misal: senja = masa tua/akhir kehidupan; hujan deras = kesedihan/rintangan).",
      "Menjelaskan maksud kiasan dari dialog atau narasi puitis tokoh."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.2.1.json"
  },
  {
    id: "lbi-3.2.2",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.2",
    subchapter_title: "Bahasa Kias, Simbolisme, dan Citraan dalam Sastra",
    title: "Citraan / Imaji (Imagery)",
    micro_syllabus_scope: [
      "Citraan Penglihatan (Visual), Pendengaran (Auditif), Penciuman (Olfaktoris), Pencecapan (Gustatoris), Perabaan (Taktil), dan Gerak (Kinestetik)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.2.2.json"
  },

  // 3.3. Unsur Ekstrinsik dan Nilai-Nilai Kehidupan Karya Sastra
  {
    id: "lbi-3.3.1",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.3",
    subchapter_title: "Unsur Ekstrinsik dan Nilai-Nilai Kehidupan Karya Sastra",
    title: "Identifikasi Nilai-Nilai dalam Kutipan Novel/Cerpen",
    micro_syllabus_scope: [
      "Nilai Moral (Etika): berkaitan dengan perbuatan baik-buruk, kejujuran, tanggung jawab, bakti kepada orang tua.",
      "Nilai Sosial (Kemasyarakatan): berkaitan dengan interaksi antarmanusia, gotong royong, empati, kesenjangan sosial, kepedulian terhadap sesama.",
      "Nilai Budaya (Adat Istiadat): berkaitan dengan tradisi leluhur, upacara adat, kebiasaan turun-temurun suatu daerah.",
      "Nilai Religius (Keagamaan): berkaitan dengan hubungan manusia dengan Tuhan, ibadah, takdir, ketakwaan.",
      "Nilai Pendidikan (Edukatif) & Nilai Estetika (Keindahan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.3.1.json"
  },
  {
    id: "lbi-3.3.2",
    subtest: "LBI",
    chapter_num: 3,
    chapter_title: "Literasi Teks Sastra dan Narasi Fiksi",
    subchapter_num: "3.3",
    subchapter_title: "Unsur Ekstrinsik dan Nilai-Nilai Kehidupan Karya Sastra",
    title: "Relevansi Karya Sastra dengan Kehidupan Sehari-hari",
    micro_syllabus_scope: [
      "Menghubungkan konflik atau nilai dalam cerita fiksi dengan fenomena sosial nyata di masyarakat saat ini."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbi/lbi-3.3.2.json"
  }
];

// Read existing tracker data
let trackerData = { items: [] };
if (fs.existsSync(trackerPath)) {
  try {
    const raw = fs.readFileSync(trackerPath, 'utf8');
    trackerData = JSON.parse(raw);
    if (!Array.isArray(trackerData.items)) {
      trackerData.items = [];
    }
  } catch (err) {
    console.warn('Gagal membaca tracker.');
    trackerData = { items: [] };
  }
}

// Preserve existing items not belonging to LBI, and merge LBI items
const nonLbiItems = trackerData.items.filter(item => item.subtest !== 'LBI');
const mergedItems = [...nonLbiItems, ...lbiItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(lbiItems.map(item => item.chapter_num));
const subchapters = new Set(lbiItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = lbiItems.length;
const requiresSvgCount = lbiItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes LBI!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
