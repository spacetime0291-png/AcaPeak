import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const ppuItems = [
  // ==========================================
  // BAB 1: SEMANTIK DAN LEKSIKAL (MAKNA KATA)
  // ==========================================
  // 1.1. Jenis Makna Berdasarkan Asosiasi dan Konteks
  {
    id: "ppu-1.1.1",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.1",
    subchapter_title: "Jenis Makna Berdasarkan Asosiasi dan Konteks",
    title: "Makna Leksikal vs Makna Gramatikal",
    micro_syllabus_scope: [
      "Makna Leksikal: makna dasar kata sebagaimana tercantum di dalam kamus (KBBI) sebelum mengalami proses morfologis.",
      "Makna Gramatikal: makna yang muncul akibat proses afiksasi (pengimbuhan), reduplikasi (pengulangan), komposisi (pemajemukan), atau posisi dalam sintaksis."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.1.1.json"
  },
  {
    id: "ppu-1.1.2",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.1",
    subchapter_title: "Jenis Makna Berdasarkan Asosiasi dan Konteks",
    title: "Makna Denotatif (Lugas) vs Makna Konotatif (Kias)",
    micro_syllabus_scope: [
      "Makna Denotatif: makna objektif, apa adanya, tanpa muatan nilai rasa tambahan (umum pada teks ilmiah/eksposisi).",
      "Makna Konotatif: makna subjektif yang mengandung nilai rasa positif (konotasi baik/halus) atau negatif (konotasi buruk/kasar)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.1.2.json"
  },
  {
    id: "ppu-1.1.3",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.1",
    subchapter_title: "Jenis Makna Berdasarkan Asosiasi dan Konteks",
    title: "Makna Referensial vs Nonreferensial",
    micro_syllabus_scope: [
      "Kata yang memiliki acuan konkret di dunia nyata (nomina, verba, adjektiva) vs kata tugas yang tidak memiliki acuan mandiri (preposisi, konjungsi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.1.3.json"
  },

  // 1.2. Relasi Makna Antarkata (Semantic Relations)
  {
    id: "ppu-1.2.1",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Sinonimi (Kemiripan Makna)",
    micro_syllabus_scope: [
      "Sinonim mutlak vs sinonim konteks (memilih padanan kata yang paling presisi sesuai register kalimat).",
      "Uji substitusi kata dalam kalimat tanpa mengubah gagasan utama."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.1.json"
  },
  {
    id: "ppu-1.2.2",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Antonimi / Oposisi (Pertentangan Makna)",
    micro_syllabus_scope: [
      "Oposisi Mutlak (Biner): hidup >< mati, gerak >< diam.",
      "Oposisi Kutub (Gradual/Berjenjang): kaya >< miskin, panas >< dingin, besar >< kecil.",
      "Oposisi Relasional (Kebalikan Arah/Peran): menjual >< membeli, guru >< murid, suami >< istri.",
      "Oposisi Hierarkis: urutan jenjang ukuran atau satuan waktu (gram, ons, kilogram)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.2.json"
  },
  {
    id: "ppu-1.2.3",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Homonimi, Homofoni, dan Homografi",
    micro_syllabus_scope: [
      "Homonim: ejaan dan lafal sama, tetapi asal-usul dan maknanya berbeda sama sekali (misal: bisa racun vs bisa dapat; bulan kalender vs bulan satelit).",
      "Homofon: lafal sama, ejaan dan makna berbeda (misal: bank vs bang, sanksi vs sangsi, massa vs masa).",
      "Homograf: ejaan sama, lafal dan makna berbeda (misal: apel buah vs apel upacara, mental kepribadian vs mental terpelanting, tahu makanan vs tahu paham)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.3.json"
  },
  {
    id: "ppu-1.2.4",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Polisemi (Kebermaknaan Ganda dalam Satu Akar)",
    micro_syllabus_scope: [
      "Satu kata yang memiliki banyak makna turunan yang masih berkaitan dengan konsep dasar yang sama (misal: kepala manusia, kepala sekolah, kepala surat, kepala kereta).",
      "Membedakan polisemi vs homonim di dalam konteks bacaan UTBK."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.4.json"
  },
  {
    id: "ppu-1.2.5",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Hipernimi dan Hiponimi (Relasi Atas-Bawah / Taksonomi)",
    micro_syllabus_scope: [
      "Hipernim (Superordinat): kata umum yang mencakup kategori luas (misal: bunga, unggas, kendaraan).",
      "Hiponim (Subordinat): kata khusus yang menjadi anggota dari hipernim (misal: mawar, melati; ayam, itik; mobil, motor).",
      "Kohiponim: hubungan sejajar antar-anggota hiponim."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.5.json"
  },
  {
    id: "ppu-1.2.6",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.2",
    subchapter_title: "Relasi Makna Antarkata (Semantic Relations)",
    title: "Meronimi dan Holonimi (Relasi Bagian-Keseluruhan)",
    micro_syllabus_scope: [
      "Meronim (bagian penyusun: akar, batang, daun) vs Holonim (keseluruhan entitas: pohon)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.2.6.json"
  },

  // 1.3. Perubahan dan Pergeseran Makna Kata
  {
    id: "ppu-1.3.1",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Perluasan Makna (Generalisasi / Meluas)",
    micro_syllabus_scope: [
      "Cakupan makna kata saat ini lebih luas daripada makna asalnya (misal: berlayar, bapak, ibu, saudara, putra-putri)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.1.json"
  },
  {
    id: "ppu-1.3.2",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Penyempitan Makna (Spesialisasi / Menyempit)",
    micro_syllabus_scope: [
      "Cakupan makna kata saat ini lebih terbatas daripada makna asalnya (misal: sarjana, madrasah, pendeta, pembantu, sastra)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.2.json"
  },
  {
    id: "ppu-1.3.3",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Peninggian Nilai Rasa (Ameliorasi)",
    micro_syllabus_scope: [
      "Makna kata baru dirasakan lebih sopan, terhormat, atau bermartabat dibanding kata sebelumnya (misal: wanita > perempuan, pramuniaga > pelayan toko, narapidana > orang hukuman, tunawisma > gelandangan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.3.json"
  },
  {
    id: "ppu-1.3.4",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Penurunan Nilai Rasa (Peyorasi)",
    micro_syllabus_scope: [
      "Makna kata bergeser menjadi lebih rendah, kasar, atau berkonotasi negatif dibanding makna awalnya (misal: bini, gerombolan, kroni, oknum, bunting)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.4.json"
  },
  {
    id: "ppu-1.3.5",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Pertukaran Tanggapan Indra (Sinestesia)",
    micro_syllabus_scope: [
      "Kombinasi kata yang mempertukarkan dua pencerapan panca indra yang berbeda (misal: suaranya terang, kata-katanya pedas, senyumnya manis, warnanya sejuk)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.5.json"
  },
  {
    id: "ppu-1.3.6",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.3",
    subchapter_title: "Perubahan dan Pergeseran Makna Kata",
    title: "Persamaan Sifat (Asosiasi)",
    micro_syllabus_scope: [
      "Perubahan makna yang muncul karena persamaan sifat antara konsep asli dengan konsep baru (misal: amplop = uang suap, kursi = jabatan/kekuasaan, parasit = orang yang merugikan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.3.6.json"
  },

  // 1.4. Ungkapan, Idiom, Peribahasa, dan Gaya Bahasa
  {
    id: "ppu-1.4.1",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.4",
    subchapter_title: "Ungkapan, Idiom, Peribahasa, dan Gaya Bahasa",
    title: "Idiom (Ungkapan)",
    micro_syllabus_scope: [
      "Idiom Penuh: seluruh unsur kata melebur membentuk makna baru (misal: membanting tulang, meja hijau, kambing hitam).",
      "Idiom Sebagian: salah satu kata masih mempertahankan makna leksikalnya (misal: daftar hitam, koran kuning, kabar angin)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.4.1.json"
  },
  {
    id: "ppu-1.4.2",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.4",
    subchapter_title: "Ungkapan, Idiom, Peribahasa, dan Gaya Bahasa",
    title: "Peribahasa, Pepatah, dan Perumpamaan",
    micro_syllabus_scope: [
      "Mengidentifikasi peribahasa yang sepadan dengan ilustrasi/situasi dalam paragraf."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.4.2.json"
  },
  {
    id: "ppu-1.4.3",
    subtest: "PPU",
    chapter_num: 1,
    chapter_title: "Semantik dan Leksikal (Makna Kata)",
    subchapter_num: "1.4",
    subchapter_title: "Ungkapan, Idiom, Peribahasa, dan Gaya Bahasa",
    title: "Majas (Gaya Bahasa Kontekstual)",
    micro_syllabus_scope: [
      "Majas Perbandingan: Metafora, Personifikasi, Simile (Asosiasi), Metonimia, Sinekdoke (Pars pro toto & Totem pro parte), Alegori.",
      "Majas Pertentangan: Hiperbola, Litotes, Ironi, Paradoks, Antitesis, Oksimoron.",
      "Majas Penegasan & Sindiran: Pleonasme, Repetisi, Klimaks, Antiklimaks, Retoris, Sarkasme, Sinisme."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-1.4.3.json"
  },

  // ==========================================
  // BAB 2: MORFOLOGI (PEMBENTUKAN KATA & KELAS KATA)
  // ==========================================
  // 2.1. Morfem dan Proses Afiksasi (Pengimbuhan)
  {
    id: "ppu-2.1.1",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.1",
    subchapter_title: "Morfem dan Proses Afiksasi (Pengimbuhan)",
    title: "Konsep Morfem",
    micro_syllabus_scope: [
      "Morfem Bebas (kata dasar) vs Morfem Terikat (afiks, klitik ku-, kau-, -mu, -nya, bentuk terikat seperti pasca-, pra-, antar-, tuna-, manca-).",
      "Morfem Unik (prakategorial: juang, temu, baur, henti, rangkul)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.1.1.json"
  },
  {
    id: "ppu-2.1.2",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.1",
    subchapter_title: "Morfem dan Proses Afiksasi (Pengimbuhan)",
    title: "Jenis dan Hukum Peluluhan Afiks (Morfofonemik)",
    micro_syllabus_scope: [
      "Prefiks (Awalan): meN-, ber-, di-, ter-, peN-, per-, se-, ke-.",
      "Hukum KPTS pada meN- dan peN-: aturan luluh (konsonan tunggal K-P-T-S diikuti vokal) vs tidak luluh (gugus konsonan kr-, pr-, tr-, st-, sk-, sp- atau kaji/punya).",
      "Sufiks (Akhiran): -kan, -i, -an, -nya.",
      "Konfiks (Imbuhan Gabung Serentak): ke-an, peN-an, per-an, ber-an, se-nya.",
      "Infiks (Sisipan): -el- (geletar, telunjuk), -em- (gemetar, temali), -er- (gerigi, seruling), -in- (kinerja, sinambung)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.1.2.json"
  },
  {
    id: "ppu-2.1.3",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.1",
    subchapter_title: "Morfem dan Proses Afiksasi (Pengimbuhan)",
    title: "Analisis Kesamaan Makna dan Fungsi Imbuhan (Tipe Soal Favorit PPU)",
    micro_syllabus_scope: [
      "Makna Prefiks meN-: melakukan tindakan, bekerja dengan alat, membuat jadi, menuju ke, mencari/mengumpulkan, mengeluarkan suara, menjadi seperti.",
      "Makna Prefiks ber-: mempunyai/memiliki, memakai/menggunakan, mengeluarkan/menghasilkan, dalam keadaan, menyatakan resiprokal (saling), kumpulan/kelompok.",
      "Makna Prefiks ter-: ketidaksengajaan, paling (superlatif), dapat di-... (potensial), keadaan yang sudah terjadi (perfektif), tiba-tiba.",
      "Makna Prefiks peN- dan Konfiks peN-an vs per-an: pelaku, alat, sifat, proses (berhubungan dengan verba meN- vs verba ber-).",
      "Makna Konfiks ke-an: menyatakan hal/keadaan, tempat/wilayah, terkena/menderita (kehujanan), terlalu (kebesaran), ketidaksengajaan.",
      "Makna Sufiks -an: hasil tindakan, tempat, alat, tiap-tiap, kumpulan.",
      "Perbedaan fungsi sufiks -kan vs -i (kausatif, benefaktif, lokatif/repetitif)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.1.3.json"
  },

  // 2.2. Reduplikasi (Kata Ulang)
  {
    id: "ppu-2.2.1",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.2",
    subchapter_title: "Reduplikasi (Kata Ulang)",
    title: "Bentuk Reduplikasi",
    micro_syllabus_scope: [
      "Dwilingga (Kata Ulang Utuh/Murni): rumah-rumah, buku-buku.",
      "Dwipurwa (Ulang Suku Awal): lelaki, tetangga, sesama, leluhur, jejaring.",
      "Kata Ulang Berimbuhan: berlari-lari, tarik-menarik, kehijau-hijauan, sebaik-baiknya.",
      "Kata Ulang Salin Suara (Berubah Bunyi): bolak-balik, sayur-mayur, gerak-gerik, warna-warni, lauk-pauk.",
      "Kata Ulang Semu: bentuk dasarnya memang berulang dan tidak memiliki makna jika dipisah (kupu-kupu, kura-kura, laba-laba, paru-paru, pura-pura)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.2.1.json"
  },
  {
    id: "ppu-2.2.2",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.2",
    subchapter_title: "Reduplikasi (Kata Ulang)",
    title: "Kesetaraan Makna Reduplikasi dalam Kalimat",
    micro_syllabus_scope: [
      "Menyatakan jamak/banyak, banyak dan bermacam-macam, kemiripan/menyerupai (mobil-mobilan, langit-langit), resiprokal/saling (pandang-memandang), intensitas/terus-menerus, paling/superlatif, atau pengulangan tindakan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.2.2.json"
  },

  // 2.3. Komposisi (Kata Majemuk / Gabungan Kata)
  {
    id: "ppu-2.3.1",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.3",
    subchapter_title: "Komposisi (Kata Majemuk / Gabungan Kata)",
    title: "Karakteristik Kata Majemuk",
    micro_syllabus_scope: [
      "Ketakterpisahan unsur (tidak dapat disisipi kata lain di antaranya).",
      "Perbedaan Kata Majemuk (membentuk satu konsep baru: rumah sakit, meja makan, mata pelajaran) vs Frasa Biasa (makna komposisional: rumah besar, meja baru)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.3.1.json"
  },
  {
    id: "ppu-2.3.2",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.3",
    subchapter_title: "Komposisi (Kata Majemuk / Gabungan Kata)",
    title: "Struktur Hubungan Kata Majemuk",
    micro_syllabus_scope: [
      "Kata Majemuk Setara (Kopulatif): tua muda, besar kecil, pulang pergi, hancur lebur, kaki tangan.",
      "Kata Majemuk Tak Setara (Determinatif D-M dan M-D): kamar tidur, daya juang, perdana menteri, bumiputra.",
      "Kata Majemuk Idiomatis vs Semi-Idiomatis vs Non-Idiomatis."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.3.2.json"
  },

  // 2.4. Klasifikasi Kelas Kata (Word Classes / Parts of Speech)
  {
    id: "ppu-2.4.1",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.4",
    subchapter_title: "Klasifikasi Kelas Kata (Word Classes / Parts of Speech)",
    title: "Kelas Kata Utama (Terbuka)",
    micro_syllabus_scope: [
      "Nomina (Kata Benda): ciri morfologis (peN-, -an, ke-an) dan sintaksis (dapat diingkarkan dengan kata bukan, dapat diikuti itu/ini).",
      "Verba (Kata Kerja): verba transitif (berobjek: ekatransitif, dwitransitif), verba intransitif (tak berobjek / berpelengkap), verba aktif vs pasif, verba resiprokal. Diingkarkan dengan kata tidak.",
      "Adjektiva (Kata Sifat): menyatakan keadaan/kualitas, dapat diberi keterangan pembanding (lebih, kurang, paling) dan penguat (sangat, amat, sekali)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.4.1.json"
  },
  {
    id: "ppu-2.4.2",
    subtest: "PPU",
    chapter_num: 2,
    chapter_title: "Morfologi (Pembentukan Kata & Kelas Kata)",
    subchapter_num: "2.4",
    subchapter_title: "Klasifikasi Kelas Kata (Word Classes / Parts of Speech)",
    title: "Kelas Kata Tugas (Tertutup)",
    micro_syllabus_scope: [
      "Adverbia (Kata Keterangan): keterangan cara, waktu, frekuensi, derajat, modalitas (mungkin, pasti, sebaiknya), aspek (sudah, sedang, akan, belum).",
      "Pronomina (Kata Ganti): persona (orang I, II, III tunggal/jamak), demonstrativa (penunjuk: ini, itu, sana, situ, begini, begitu), interogativa (penanya), taktentu (seseorang, sesuatu, masing-masing).",
      "Numeralia (Kata Bilangan): takrif/tentu (utama/kardinal: satu, dua; tingkat/ordinal: kesatu, kedua; kolektif: ketiga-tiganya) vs taktakrif (beberapa, seluruh, banyak, sedikit).",
      "Preposisi (Kata Depan): menandai hubungan tempat, waktu, arah, alat, tujuan (di, ke, dari, pada, kepada, bagi, untuk, oleh, dengan, tentang, sejak).",
      "Konjungsi (Kata Hubung): intrakalimat (koordinatif, subordinatif, korelatif) dan antarkalimat.",
      "Artikula (Kata Sandang): si, sang, hang, para, kaum, umat.",
      "Partikel Penegas: -lah, -kah, -tah, pun, per."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-2.4.2.json"
  },

  // ==========================================
  // BAB 3: SINTAKSIS (FRASA, KLAUSA, DAN KALIMAT)
  // ==========================================
  // 3.1. Frasa (Kelompok Kata Nonpredikatif)
  {
    id: "ppu-3.1.1",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.1",
    subchapter_title: "Frasa (Kelompok Kata Nonpredikatif)",
    title: "Konsep dan Batasan Frasa",
    micro_syllabus_scope: [
      "Gabungan dua kata atau lebih yang menduduki tepat satu fungsi sintaksis (hanya S, hanya P, hanya O, hanya Pel, atau hanya K) dan tidak melampaui batas klausa."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.1.1.json"
  },
  {
    id: "ppu-3.1.2",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.1",
    subchapter_title: "Frasa (Kelompok Kata Nonpredikatif)",
    title: "Struktur Internal Frasa (Hukum D-M dan M-D)",
    micro_syllabus_scope: [
      "Unsur Inti / Diterangkan (D) vs Unsur Atribut / Menerangkan (M).",
      "Frasa Endosentris Atributif (Bertingkat): salah satu unsur menjadi inti (pola D-M seperti buku sejarah baru, atau M-D seperti sedang membaca, sangat tinggi, tiga ekor).",
      "Frasa Endosentris Koordinatif (Setara): kedua unsur setara dan dapat disisipi dan/atau (ayah ibu, makan minum, tua muda).",
      "Frasa Endosentris Apositif: unsur kedua memberikan keterangan tambahan yang merujuk pada entitas yang sama dengan unsur pertama (Bung Hatta, Wakil Presiden pertama RI, ...).",
      "Frasa Eksosentris (Frasa Preposisional): Tidak memiliki unsur inti; terdiri dari preposisi (perangkai) + nomina (sumbu), selalu menduduki fungsi Keterangan (misal: di pasar, ke sekolah, sejak kemarin, oleh pemerintah)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.1.2.json"
  },
  {
    id: "ppu-3.1.3",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.1",
    subchapter_title: "Frasa (Kelompok Kata Nonpredikatif)",
    title: "Kategori Frasa Berdasarkan Kelas Kata Inti",
    micro_syllabus_scope: [
      "Frasa Nominal, Frasa Verbal, Frasa Adjektival, Frasa Numeralia, dan Frasa Preposisional."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.1.3.json"
  },
  {
    id: "ppu-3.1.4",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.1",
    subchapter_title: "Frasa (Kelompok Kata Nonpredikatif)",
    title: "Tipe Soal PPU Terkait Frasa",
    micro_syllabus_scope: [
      "Mencari kelompok kata yang memiliki pola struktur frasa yang sama (misal: menyamakan frasa M-D [Adverbia + Verba] atau D-M-M [Nomina + Nomina + Adjektiva]).",
      "Memecah kalimat menjadi beberapa frasa pembentuk yang benar tanpa memotong struktur fungsi sintaksis."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.1.4.json"
  },

  // 3.2. Klausa dan Fungsi Sintaksis (S-P-O-Pel-K)
  {
    id: "ppu-3.2.1",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.2",
    subchapter_title: "Klausa dan Fungsi Sintaksis (S-P-O-Pel-K)",
    title: "Identifikasi Fungsi Sintaksis Utama",
    micro_syllabus_scope: [
      "Subjek (S): inti pokok pembicaraan, umumnya berupa nomina/frasa nominal (atau klausa benda bahwa...), menjawab pertanyaan Siapa/Apa + P?, tidak didahului preposisi.",
      "Predikat (P): unsur pengikat utama klausa (dapat berupa verba, adjektiva, nomina, frasa numeralia, atau frasa preposisional).",
      "Objek (O): nomina/frasa nominal yang terletak langsung di belakang Predikat Verba Transitif Aktif (biasanya berawalan meN-), dan dapat berubah menjadi Subjek ketika kalimat dipasifkan.",
      "Pelengkap (Pel): terletak di belakang Predikat Verba Intransitif (ber-, ter-, ke-an, menjadi, merupakan), Verba Dwitransitif, atau Adjektiva; tidak dapat menjadi Subjek dalam kalimat pasif.",
      "Keterangan (K): unsur opsional yang posisinya fleksibel (di awal, tengah, atau akhir kalimat), umumnya didahului preposisi atau konjungsi subordinatif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.2.1.json"
  },
  {
    id: "ppu-3.2.2",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.2",
    subchapter_title: "Klausa dan Fungsi Sintaksis (S-P-O-Pel-K)",
    title: "Perbedaan Kritis Objek vs Pelengkap vs Keterangan",
    micro_syllabus_scope: [
      "Uji pemasifan untuk membedakan O dan Pel (misal: Ia membelikan adiknya baju → Adiknya = O, baju = Pel; vs Ia membeli baju untuk adiknya → baju = O, untuk adiknya = K)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.2.2.json"
  },
  {
    id: "ppu-3.2.3",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.2",
    subchapter_title: "Klausa dan Fungsi Sintaksis (S-P-O-Pel-K)",
    title: "Jenis Klausa",
    micro_syllabus_scope: [
      "Klausa Bebas (Induk Kalimat / Mandiri) vs Klausa Terikat (Anak Kalimat / Dependen).",
      "Klausa Verbal vs Klausa Nonverbal (Nominal, Adjektival, Preposisional)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.2.3.json"
  },

  // 3.3. Kalimat Inti, Kalimat Dasar, dan Transformasi Kalimat
  {
    id: "ppu-3.3.1",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.3",
    subchapter_title: "Kalimat Inti, Kalimat Dasar, dan Transformasi Kalimat",
    title: "Kalimat Inti / Kerangka Kalimat (Kernel Sentence)",
    micro_syllabus_scope: [
      "Menentukan inti kalimat dengan memangkas seluruh keterangan (K) dan seluruh atribut/perluasan (M) pada Subjek, Predikat, Objek, atau Pelengkap, sehingga tersisa Inti Subjek + Inti Predikat (+ Inti Objek/Pelengkap).",
      "Syarat Kalimat Inti: bersusun tunggal, deklaratif (berita), afirmatif (positif), dan aktif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.3.1.json"
  },
  {
    id: "ppu-3.3.2",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.3",
    subchapter_title: "Kalimat Inti, Kalimat Dasar, dan Transformasi Kalimat",
    title: "Pola Kalimat Dasar Bahasa Indonesia",
    micro_syllabus_scope: [
      "Pola 1: S - P (Anak itu menangis).",
      "Pola 2: S - P - O (Petani menanam padi).",
      "Pola 3: S - P - Pel (Tubuhnya berlumuran keringat / Ia menjadi dokter).",
      "Pola 4: S - P - K (Mereka tinggal di Depok).",
      "Pola 5: S - P - O - Pel (Paman mengirimi saya uang).",
      "Pola 6: S - P - O - K (Ibu menyimpan dokumen di lemari)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.3.2.json"
  },
  {
    id: "ppu-3.3.3",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.3",
    subchapter_title: "Kalimat Inti, Kalimat Dasar, dan Transformasi Kalimat",
    title: "Transformasi Kalimat Aktif dan Pasif",
    micro_syllabus_scope: [
      "Kaidah Pasif Tipe 1 (Subjek pada kalimat aktif adalah kata/frasa benda atau kata ganti orang ke-3): Pola: O + di-Verba + (oleh) + S.",
      "Kaidah Pasif Tipe 2 / Pasif Persona (Subjek pada kalimat aktif adalah kata ganti orang ke-1 atau ke-2: saya, aku, kami, kita, kamu, Anda, engkau): Pola: O + S + Verba tanpa awalan meN-/di- (misal: Saya membaca buku itu → Buku itu saya baca, BUKAN Buku itu dibaca oleh saya)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.3.3.json"
  },
  {
    id: "ppu-3.3.4",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.3",
    subchapter_title: "Kalimat Inti, Kalimat Dasar, dan Transformasi Kalimat",
    title: "Kalimat Inversi (Susun Balik)",
    micro_syllabus_scope: [
      "Kalimat yang posisi Predikatnya mendahului Subjek (P - S), umumnya pada kalimat dengan verba ada, terdapat, terjadi, muncul, datang atau kalimat perintah/tanya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.3.4.json"
  },

  // 3.4. Kalimat Majemuk dan Penggabungan Kalimat
  {
    id: "ppu-3.4.1",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.4",
    subchapter_title: "Kalimat Majemuk dan Penggabungan Kalimat",
    title: "Kalimat Majemuk Setara (Koordinatif)",
    micro_syllabus_scope: [
      "Hubungan Penjumlahan (dan, serta), Pemilihan (atau), Pertentangan (tetapi, melainkan, sedangkan, padahal), dan Urutan (lalu, kemudian)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.4.1.json"
  },
  {
    id: "ppu-3.4.2",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.4",
    subchapter_title: "Kalimat Majemuk dan Penggabungan Kalimat",
    title: "Kalimat Majemuk Bertingkat (Subordinatif)",
    micro_syllabus_scope: [
      "Anak kalimat berfungsi sebagai Keterangan Waktu (ketika, sejak, sebelum, sesudah), Syarat (jika, apabila, andaikan), Tujuan (agar, supaya), Konsesif (walaupun, meskipun, kendatipun), Sebab (karena, sebab, lantaran), Akibat (sehingga, sampai-sampai), Cara (dengan, tanpa), atau Perbandingan (seperti, bagaikan, daripada).",
      "Anak kalimat pengganti Nomina (Subjek/Objek) dengan konjungsi bahwa."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.4.2.json"
  },
  {
    id: "ppu-3.4.3",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.4",
    subchapter_title: "Kalimat Majemuk dan Penggabungan Kalimat",
    title: "Kalimat Majemuk Perluasan (Klausa Relatif dengan \"yang\")",
    micro_syllabus_scope: [
      "Perluasan Subjek, Objek, atau Pelengkap menggunakan klausa sematan berpenanda yang (membedakan mana Predikat utama kalimat dan mana predikat di dalam klausa yang)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.4.3.json"
  },
  {
    id: "ppu-3.4.4",
    subtest: "PPU",
    chapter_num: 3,
    chapter_title: "Sintaksis (Frasa, Klausa, dan Kalimat)",
    subchapter_num: "3.4",
    subchapter_title: "Kalimat Majemuk dan Penggabungan Kalimat",
    title: "Kalimat Majemuk Campuran (Kompleks)",
    micro_syllabus_scope: [
      "Gabungan minimal 3 klausa yang memuat hubungan koordinatif sekaligus subordinatif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-3.4.4.json"
  },

  // ==========================================
  // BAB 4: KEPADUAN WACANA DAN PRAGMATIK TEKS
  // ==========================================
  // 4.1. Kohesi (Kepaduan Bentuk/Gramatikal & Leksikal)
  {
    id: "ppu-4.1.1",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.1",
    subchapter_title: "Kohesi (Kepaduan Bentuk/Gramatikal & Leksikal)",
    title: "Piranti Kohesi Gramatikal",
    micro_syllabus_scope: [
      "Referensi (Rujukan Kata): Rujukan Anaforis: kata ganti/penunjuk (ia, mereka, -nya, hal ini, tersebut) merujuk pada informasi yang telah disebutkan sebelumnya (di sebelah kiri).",
      "Referensi (Rujukan Kata): Rujukan Kataforis: kata ganti merujuk pada informasi yang baru disebutkan setelahnya (di sebelah kanan).",
      "Substitusi (Penyulihan): mengganti unsur bahasa dengan unsur lain untuk menghindari pengulangan monoton.",
      "Elipsis (Pelesapan): menghilangkan unsur yang sama pada klausa berikutnya karena sudah dipahami dari konteks.",
      "Konjungsi Antarkalimat: ketepatan logika transisi antar-kalimat (Oleh karena itu, Namun, Akan tetapi, Selain itu, Di samping itu, Sebaliknya, Bahkan, Malahan, Sementara itu)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.1.1.json"
  },
  {
    id: "ppu-4.1.2",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.1",
    subchapter_title: "Kohesi (Kepaduan Bentuk/Gramatikal & Leksikal)",
    title: "Piranti Kohesi Leksikal",
    micro_syllabus_scope: [
      "Repetisi (pengulangan kata kunci), Sinonimi, Antonimi, Hiponimi, dan Kolokasi (asosiasi kata dalam satu bidang/domain yang sama)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.1.2.json"
  },

  // 4.2. Koherensi (Kepaduan Makna dan Alur Gagasan)
  {
    id: "ppu-4.2.1",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.2",
    subchapter_title: "Koherensi (Kepaduan Makna dan Alur Gagasan)",
    title: "Pola Pengembangan Paragraf",
    micro_syllabus_scope: [
      "Deduktif (Umum → Khusus: kalimat utama di awal).",
      "Induktif (Khusus → Umum: kalimat utama di akhir).",
      "Campuran (Deduktif-Induktif: penegasan kembali di akhir).",
      "Ineratif (kalimat utama di tengah) dan Deskriptif/Naratif (menyebar)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.2.1.json"
  },
  {
    id: "ppu-4.2.2",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.2",
    subchapter_title: "Koherensi (Kepaduan Makna dan Alur Gagasan)",
    title: "Evaluasi Kepaduan Paragraf (Tipe Soal PPU)",
    micro_syllabus_scope: [
      "Mendeteksi Kalimat Sumbang / Tidak Padu: mengidentifikasi kalimat yang menyimpang dari ide pokok atau memutus alur logis kalimat sebelum dan sesudahnya.",
      "Menyusun Urutan Kalimat Acak: mengurutkan kalimat menjadi paragraf yang utuh menggunakan petunjuk rujukan (ini, tersebut), konjungsi, dan kronologi ide.",
      "Memecah Paragraf (Paragraph Splitting): menentukan pada nomor kalimat berapa sebuah paragraf panjang harus dibagi menjadi dua paragraf karena adanya pergantian subtopik.",
      "Melengkapi Kalimat Rumpang: mengisi bagian awal, tengah, atau akhir paragraf agar koheren."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.2.2.json"
  },

  // 4.3. Pemahaman Wacana Kritis dan Pragmatik
  {
    id: "ppu-4.3.1",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.3",
    subchapter_title: "Pemahaman Wacana Kritis dan Pragmatik",
    title: "Gagasan Utama, Topik, dan Simpulan",
    micro_syllabus_scope: [
      "Menentukan ide pokok paragraf dan gagasan utama teks secara keseluruhan.",
      "Memprediksi topik paragraf sebelum (preceding) atau sesudah (following) teks berdasarkan kalimat pertama dan kalimat terakhir."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.3.1.json"
  },
  {
    id: "ppu-4.3.2",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.3",
    subchapter_title: "Pemahaman Wacana Kritis dan Pragmatik",
    title: "Sikap, Keberpihakan, dan Tujuan Penulis",
    micro_syllabus_scope: [
      "Sikap/Nada Penulis: netral/objektif, kritis, pesimistis, optimistis, prihatin, persuasif, apresiatif, sarkastis.",
      "Tujuan Penulis: menginformasikan, memaparkan, membujuk/mengajak, mengkritisi, membuktikan, membandingkan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.3.2.json"
  },
  {
    id: "ppu-4.3.3",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.3",
    subchapter_title: "Pemahaman Wacana Kritis dan Pragmatik",
    title: "Hubungan Antarparagraf",
    micro_syllabus_scope: [
      "Pola hubungan antara Paragraf 1 dan Paragraf 2: penjelasan rinci, contoh/ilustrasi, sebab-akibat, pertentangan/kontras, pembandingan, masalah-solusi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.3.3.json"
  },
  {
    id: "ppu-4.3.4",
    subtest: "PPU",
    chapter_num: 4,
    chapter_title: "Kepaduan Wacana dan Pragmatik Teks",
    subchapter_num: "4.3",
    subchapter_title: "Pemahaman Wacana Kritis dan Pragmatik",
    title: "Kalimat Logis dan Kalimat Sama Makna (Restatement/Parafrasa)",
    micro_syllabus_scope: [
      "Mengubah struktur kalimat aktif-pasif atau urutan klausa tanpa mengurangi maupun menambah informasi inti."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-4.3.4.json"
  },

  // ==========================================
  // BAB 5: BAHASA PANDA (KRIPTOGRAFI SEDERHANA & BAHASA BUATAN)
  // ==========================================
  // 5.1. Bahasa Buatan / Terjemahan Bahasa Asing Fiktif (Artificial Language Translation)
  {
    id: "ppu-5.1.1",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.1",
    subchapter_title: "Bahasa Buatan / Terjemahan Bahasa Asing Fiktif (Artificial Language Translation)",
    title: "Metode Irisan Kata (Word Intersection)",
    micro_syllabus_scope: [
      "Membandingkan 2 atau 3 kalimat bahasa buatan yang memiliki satu kata yang sama untuk menemukan padanan kosakatanya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.1.1.json"
  },
  {
    id: "ppu-5.1.2",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.1",
    subchapter_title: "Bahasa Buatan / Terjemahan Bahasa Asing Fiktif (Artificial Language Translation)",
    title: "Analisis Urutan Sintaksis Bahasa Buatan",
    micro_syllabus_scope: [
      "Menentukan apakah bahasa buatan menggunakan urutan S - P - O atau S - O - P atau P - S - O atau O - S - P.",
      "Menentukan pola frasa dalam bahasa buatan: apakah menggunakan hukum D-M (Diterangkan-Menerangkan) seperti bahasa Indonesia atau M-D (Menerangkan-Diterangkan) seperti bahasa Inggris."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.1.2.json"
  },
  {
    id: "ppu-5.1.3",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.1",
    subchapter_title: "Bahasa Buatan / Terjemahan Bahasa Asing Fiktif (Artificial Language Translation)",
    title: "Analisis Afiksasi dan Penanda Gramatikal pada Bahasa Buatan",
    micro_syllabus_scope: [
      "Mengidentifikasi penanda jamak (plural), penanda kala waktu (lampau/sekarang/akan datang), penanda milik (posesif), penanda kalimat tanya, dan penanda kalimat aktif vs pasif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.1.3.json"
  },

  // 5.2. Kriptografi Alfabet dan Sandi Geser (Ciphers)
  {
    id: "ppu-5.2.1",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.2",
    subchapter_title: "Kriptografi Alfabet dan Sandi Geser (Ciphers)",
    title: "Sandi Geser Konstan (Caesar Cipher)",
    micro_syllabus_scope: [
      "Pergeseran huruf maju (+n) atau mundur (-n) secara seragam (misal: A=1, B=2 ... Z=26 dengan pergeseran +3)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.2.1.json"
  },
  {
    id: "ppu-5.2.2",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.2",
    subchapter_title: "Kriptografi Alfabet dan Sandi Geser (Ciphers)",
    title: "Sandi Geser Bertingkat / Berpola (Progressive Cipher)",
    micro_syllabus_scope: [
      "Pergeseran huruf yang berubah sesuai posisi karakter (misal: huruf ke-1 digeser +1, huruf ke-2 digeser +2, huruf ke-3 digeser +3, atau selang-seling +2, -1, +2, -1)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.2.1.json".replace("5.2.1", "5.2.2")
  },
  {
    id: "ppu-5.2.3",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.2",
    subchapter_title: "Kriptografi Alfabet dan Sandi Geser (Ciphers)",
    title: "Sandi Cermin / Balik (Atbash & Reversal Cipher)",
    micro_syllabus_scope: [
      "Pemetaan urutan alfabet terbalik (A ↔ Z, B ↔ Y, C ↔ X, dst., di mana jumlah posisi pasangan huruf selalu = 27).",
      "Pembalikan urutan ejaan kata atau pertukaran posisi suku kata/pasangan huruf bersebelahan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.2.3.json"
  },
  {
    id: "ppu-5.2.4",
    subtest: "PPU",
    chapter_num: 5,
    chapter_title: "Bahasa Panda (Kriptografi Sederhana & Bahasa Buatan)",
    subchapter_num: "5.2",
    subchapter_title: "Kriptografi Alfabet dan Sandi Geser (Ciphers)",
    title: "Sandi Substitusi Vokal-Konsonan dan Numerik",
    micro_syllabus_scope: [
      "Pola penggantian khusus untuk huruf vokal (A, I, U, E, O) yang berbeda aturannya dengan huruf konsonan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/ppu/ppu-5.2.4.json"
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
    console.warn('Gagal membaca file tracker eksisting, inisialisasi baru.');
    trackerData = { items: [] };
  }
}

// Preserve existing items not belonging to PPU, and merge PPU items
const nonPpuItems = trackerData.items.filter(item => item.subtest !== 'PPU');
const mergedItems = [...nonPpuItems, ...ppuItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(ppuItems.map(item => item.chapter_num));
const subchapters = new Set(ppuItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = ppuItems.length;
const requiresSvgCount = ppuItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes PPU!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
