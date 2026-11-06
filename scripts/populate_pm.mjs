import fs from 'fs';
import path from 'path';

const trackerPath = path.resolve('data/curriculum_tracker.json');
const tracker = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));

// Filter out any existing PM entries to ensure idempotency while preserving all other subtests
const existingOther = tracker.items.filter(item => item.subtest !== 'PM');

const pmItems = [
  // BAB 1: BILANGAN DAN ARITMETIKA TERAPAN (QUANTITY & NUMBER IN CONTEXT)
  // 1.1. Aritmetika Sosial, Finansial, dan Perdagangan
  {
    id: "pm-1.1.1",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.1",
    subchapter_title: "Aritmetika Sosial, Finansial, dan Perdagangan",
    title: "Harga Jual, Harga Beli, Untung, dan Rugi",
    micro_syllabus_scope: [
      "Menghitung persentase keuntungan dan kerugian terhadap harga beli (modal).",
      "Menentukan harga beli (modal awal) jika diketahui harga jual dan persentase untung/rugi: HB = HJ ÷ (100% ± %Untung/Rugi).",
      "Analisis titik impas (Break-Even Point / BEP) pada skenario usaha mikro/UMKM."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.1.1.json"
  },
  {
    id: "pm-1.1.2",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.1",
    subchapter_title: "Aritmetika Sosial, Finansial, dan Perdagangan",
    title: "Diskon (Rabat), Pajak, dan Skema Promosi Bertingkat",
    micro_syllabus_scope: [
      "Diskon tunggal vs Diskon bertingkat/ganda (misal: diskon 50% + 20% equivalen dengan diskon total 60%, bukan 70%).",
      "Komparasi skema promosi belanja: memilih opsi paling hemat antara potongan harga langsung (voucher nominal), diskon persentase dengan batas maksimum (capped discount), atau skema \"Beli N Gratis M\" (Buy 2 Get 1 Free).",
      "Perhitungan Pajak Pertambahan Nilai (PPN), pajak restoran/layanan (service charge), dan Pajak Penghasilan (PPh) sederhana pada struk/tagihan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.1.2.json"
  },
  {
    id: "pm-1.1.3",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.1",
    subchapter_title: "Aritmetika Sosial, Finansial, dan Perdagangan",
    title: "Bruto, Neto, dan Tara dalam Pengemasan Logistik",
    micro_syllabus_scope: [
      "Hubungan Bruto = Neto + Tara dan perhitungan persentase tara.",
      "Menghitung harga bersih per satuan berat produk setelah dikurangi penyusutan/tara kemasan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.1.3.json"
  },
  {
    id: "pm-1.1.4",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.1",
    subchapter_title: "Aritmetika Sosial, Finansial, dan Perdagangan",
    title: "Bunga Tunggal, Bunga Majemuk, dan Angsuran Pinjaman/Tabungan",
    micro_syllabus_scope: [
      "Bunga Tunggal (Simple Interest): M_n = M_0 × (1 + n × i) pada tabungan dan koperasi.",
      "Bunga Majemuk (Compound Interest): M_n = M_0 × (1 + i)ⁿ pada investasi dan deposito.",
      "Perhitungan cicilan/angsuran bulanan tetap (flat) beserta total bunga yang dibayarkan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.1.4.json"
  },
  // 1.2. Rasio, Proporsi, Laju, dan Perbandingan Kontekstual
  {
    id: "pm-1.2.1",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.2",
    subchapter_title: "Rasio, Proporsi, Laju, dan Perbandingan Kontekstual",
    title: "Perbandingan Senilai dan Berbalik Nilai dalam Proyek",
    micro_syllabus_scope: [
      "Perbandingan Senilai: estimasi bahan bakar terhadap jarak, takaran resep masakan/campuran bahan kimia, konversi mata uang.",
      "Perbandingan Berbalik Nilai: estimasi waktu pengerjaan proyek konstruksi terhadap jumlah pekerja, kecepatan terhadap waktu tempuh.",
      "Kasus Proyek Terhenti: menghitung tambahan pekerja yang dibutuhkan agar proyek selesai tepat waktu setelah sempat terhenti beberapa hari: Pekerja Tambahan = (Pekerja Awal × Hari Terhenti) ÷ Sisa Hari Tersedia."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.2.1.json"
  },
  {
    id: "pm-1.2.2",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.2",
    subchapter_title: "Rasio, Proporsi, Laju, dan Perbandingan Kontekstual",
    title: "Laju Kerja Gabungan (Combined Work Rate) dan Debit Aliran",
    micro_syllabus_scope: [
      "Penggabungan kapasitas kerja mesin/pompa yang bekerja bersama-sama: 1 ÷ t_gab = 1 ÷ t_A + 1 ÷ t_B.",
      "Pengisian dan pengosongan tangki air secara simultan (debit masuk dikurangi debit bocor/keluar)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.2.2.json"
  },
  {
    id: "pm-1.2.3",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.2",
    subchapter_title: "Rasio, Proporsi, Laju, dan Perbandingan Kontekstual",
    title: "Kecepatan, Jarak, dan Waktu (Kinematika Kontekstual)",
    micro_syllabus_scope: [
      "Berpapasan (berangkat pada waktu yang sama vs waktu berbeda dari dua arah berlawanan).",
      "Susul-menyusul (menghitung waktu dan jarak saat kendaraan kedua menyusul kendaraan pertama).",
      "Kecepatan rata-rata perjalanan multi-segmen (Total Jarak ÷ Total Waktu)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.2.3.json"
  },
  {
    id: "pm-1.2.4",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.2",
    subchapter_title: "Rasio, Proporsi, Laju, dan Perbandingan Kontekstual",
    title: "Skala Peta, Denah Arsitektur, dan Maket",
    micro_syllabus_scope: [
      "Konversi ukuran pada denah/peta ke ukuran sebenarnya untuk panjang (skala 1 : k) dan luas lahan/bangunan (skala luas 1 : k²)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.2.4.json"
  },
  // 1.3. Pola Bilangan dan Barisan Kontekstual
  {
    id: "pm-1.3.1",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.3",
    subchapter_title: "Pola Bilangan dan Barisan Kontekstual",
    title: "Aplikasi Barisan dan Deret Aritmetika di Dunia Nyata",
    micro_syllabus_scope: [
      "Penataan jumlah kursi di gedung pertunjukan/stadion per baris.",
      "Tumpukan barang di gudang (pipa, batu bata, kaleng), skema kenaikan gaji berkala, dan akumulasi produksi pabrik."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.3.1.json"
  },
  {
    id: "pm-1.3.2",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.3",
    subchapter_title: "Pola Bilangan dan Barisan Kontekstual",
    title: "Aplikasi Barisan dan Deret Geometri di Dunia Nyata",
    micro_syllabus_scope: [
      "Pertumbuhan populasi penduduk, pembelahan sel/bakteri, dan peluruhan zat radioaktif/penyusutan harga aset kendaraan.",
      "Panjang lintasan bola memantul hingga berhenti: L_total = h_0 × (b + a) ÷ (b - a)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.3.2.json"
  },
  {
    id: "pm-1.3.3",
    subtest: "PM",
    chapter_num: 1,
    chapter_title: "Bilangan dan Aritmetika Terapan (Quantity & Number in Context)",
    subchapter_num: "1.3",
    subchapter_title: "Pola Bilangan dan Barisan Kontekstual",
    title: "Siklus Kalender, Jadwal Berkala, dan KPK Kontekstual",
    micro_syllabus_scope: [
      "Menentukan jadwal pertemuan kembali beberapa rute transportasi, jadwal piket/ronda, atau sinkronisasi lampu lalu lintas menggunakan konsep KPK dan sisa bagi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-1.3.3.json"
  },

  // BAB 2: ALJABAR DAN FUNGSI DALAM PEMODELAN NYATA (CHANGE & RELATIONSHIPS)
  // 2.1. Pemodelan Sistem Persamaan Linear (SPLDV & SPLTV)
  {
    id: "pm-2.1.1",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.1",
    subchapter_title: "Pemodelan Sistem Persamaan Linear (SPLDV & SPLTV)",
    title: "Alokasi Sumber Daya, Tarif, dan Paket Pembelian",
    micro_syllabus_scope: [
      "Memodelkan harga tiket (dewasa vs anak-anak), tarif parkir/taksi (tarif buka pintu/awal + tarif per km/jam), dan tagihan listrik/air berjenjang (tarif blok progresif).",
      "Menyelesaikan masalah komposisi campuran (mencampur dua larutan dengan kadar berbeda atau dua jenis beras dengan harga berbeda untuk mencapai harga/kadar target)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.1.1.json"
  },
  {
    id: "pm-2.1.2",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.1",
    subchapter_title: "Pemodelan Sistem Persamaan Linear (SPLDV & SPLTV)",
    title: "Masalah Usia, Bilangan, dan Pertukaran Kuantitas",
    micro_syllabus_scope: [
      "Pemodelan perbandingan usia beberapa tahun lalu dan beberapa tahun mendatang."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.1.2.json"
  },
  // 2.2. Pertidaksamaan Linear dan Optimasi Program Linear Dasar
  {
    id: "pm-2.2.1",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.2",
    subchapter_title: "Pertidaksamaan Linear dan Optimasi Program Linear Dasar",
    title: "Pemodelan Kendala Kapasitas dan Anggaran (Constraints)",
    micro_syllabus_scope: [
      "Menerjemahkan batasan modal uang, kapasitas muatan truk/bagasi, dan ketersediaan bahan baku menjadi sistem pertidaksamaan linear."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.2.1.json"
  },
  {
    id: "pm-2.2.2",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.2",
    subchapter_title: "Pertidaksamaan Linear dan Optimasi Program Linear Dasar",
    title: "Optimasi Laba Maksimum dan Biaya Minimum",
    micro_syllabus_scope: [
      "Menentukan kombinasi jumlah barang yang harus diproduksi/dijual untuk memperoleh keuntungan maksimum atau pengeluaran minimum melalui uji titik pojok daerah penyelesaian."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.2.2.json"
  },
  // 2.3. Pemodelan Fungsi Linear dan Fungsi Kuadrat Terapan
  {
    id: "pm-2.3.1",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.3",
    subchapter_title: "Pemodelan Fungsi Linear dan Fungsi Kuadrat Terapan",
    title: "Fungsi Biaya, Penerimaan, dan Keuntungan",
    micro_syllabus_scope: [
      "Fungsi Biaya Total C(x) = Biaya Tetap + Biaya Variabel, Fungsi Penerimaan R(x), dan Fungsi Laba P(x) = R(x) - C(x)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.3.1.json"
  },
  {
    id: "pm-2.3.2",
    subtest: "PM",
    chapter_num: 2,
    chapter_title: "Aljabar dan Fungsi dalam Pemodelan Nyata (Change & Relationships)",
    subchapter_num: "2.3",
    subchapter_title: "Pemodelan Fungsi Linear dan Fungsi Kuadrat Terapan",
    title: "Aplikasi Nilai Ekstrem (Maksimum/Minimum) Fungsi Kuadrat",
    micro_syllabus_scope: [
      "Menentukan tinggi maksimum dan jarak terjauh lintasan gerak parabola (lemparan bola, tembakan air mancur, jembatan lengkung).",
      "Menentukan harga jual produk atau jumlah diskon agar pendapatan total mencapai nilai maksimum.",
      "Memaksimalkan luas lahan/kandang persegi panjang yang dibatasi oleh pagar dengan keliling tetap (atau salah satu sisinya menempel pada dinding/sungai)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-2.3.2.json"
  },

  // BAB 3: GEOMETRI DAN PENGUKURAN KONTEKSTUAL (SPACE & SHAPE)
  // 3.1. Geometri Datar dalam Konstruksi dan Tata Ruang
  {
    id: "pm-3.1.1",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.1",
    subchapter_title: "Geometri Datar dalam Konstruksi dan Tata Ruang",
    title: "Estimasi Material Bangunan dan Lahan",
    micro_syllabus_scope: [
      "Menghitung jumlah ubin/keramik, batu bata, cat dinding, atau gulungan rumput sintetis yang dibutuhkan untuk menutup suatu bidang dengan memperhitungkan faktor sisa potongan (waste).",
      "Menghitung luas jalan setapak di sekeliling taman berbentuk persegi panjang atau lingkaran."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.1.1.json"
  },
  {
    id: "pm-3.1.2",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.1",
    subchapter_title: "Geometri Datar dalam Konstruksi dan Tata Ruang",
    title: "Aplikasi Teorema Pythagoras dan Kesebangunan",
    micro_syllabus_scope: [
      "Mengukur tinggi gedung, pohon, atau tiang bendera menggunakan perbandingan panjang bayangan pada waktu yang sama.",
      "Menghitung panjang tangga yang bersandar pada dinding, panjang kabel penyangga menara, atau lebar sungai menggunakan patok segitiga sebangun."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.1.2.json"
  },
  {
    id: "pm-3.1.3",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.1",
    subchapter_title: "Geometri Datar dalam Konstruksi dan Tata Ruang",
    title: "Aplikasi Lingkaran, Roda, dan Sabuk Lilitan (Pulley/Gear)",
    micro_syllabus_scope: [
      "Hubungan jarak tempuh kendaraan dengan jari-jari roda dan banyaknya putaran roda: Jarak = Keliling Roda × Banyak Putaran.",
      "Rasio putaran roda gigi (gear) yang bersinggungan atau dihubungkan rantai: R₁ × ω₁ = R₂ × ω₂.",
      "Menghitung jangkauan pancaran radar, menara sinyal, atau alat penyiram tanaman berputar (sprinkler) berbentuk juring lingkaran."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.1.3.json"
  },
  // 3.2. Geometri Ruang dalam Pengemasan dan Kapasitas Wadah
  {
    id: "pm-3.2.1",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.2",
    subchapter_title: "Geometri Ruang dalam Pengemasan dan Kapasitas Wadah",
    title: "Kapasitas Wadah, Tangki, dan Benda Celup (Hukum Archimedes Geometri)",
    micro_syllabus_scope: [
      "Menghitung volume air dalam kolam yang alasnya miring (berbentuk prisma trapesium), tangki silinder, atau tandon kerucut terpancung.",
      "Menghitung kenaikan tinggi permukaan air di dalam wadah tabung/balok ketika dimasukkan benda padat (bola besi/batu) ke dalamnya.",
      "Menuangkan cairan dari satu wadah ke beberapa wadah kecil yang berbeda bentuk (misal: dari panci tabung ke gelas kerucut)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.2.1.json"
  },
  {
    id: "pm-3.2.2",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.2",
    subchapter_title: "Geometri Ruang dalam Pengemasan dan Kapasitas Wadah",
    title: "Optimasi Pengemasan Barang (3D Packing Problem)",
    micro_syllabus_scope: [
      "Menghitung jumlah maksimum kardus kecil berbentuk balok yang dapat dimasukkan ke dalam kontainer/kardus besar dengan memperhatikan orientasi dimensi panjang, lebar, dan tinggi (bukan sekadar membagi volume total)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.2.2.json"
  },
  {
    id: "pm-3.2.3",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.2",
    subchapter_title: "Geometri Ruang dalam Pengemasan dan Kapasitas Wadah",
    title: "Luas Permukaan Konstruksi Atap dan Kemasan",
    micro_syllabus_scope: [
      "Menghitung luas bahan seng/genteng untuk atap rumah berbentuk limas atau prisma segitiga, serta luas karton untuk membuat kemasan produk."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.2.3.json"
  },
  // 3.3. Trigonometri Kontekstual (Sudut Elevasi, Depresi, & Navigasi)
  {
    id: "pm-3.3.1",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.3",
    subchapter_title: "Trigonometri Kontekstual (Sudut Elevasi, Depresi, & Navigasi)",
    title: "Sudut Elevasi dan Sudut Depresi",
    micro_syllabus_scope: [
      "Menghitung tinggi menara/tebing atau jarak pengamat ke objek menggunakan sudut elevasi (arah pandang ke atas) dan sudut depresi (arah pandang ke bawah).",
      "Kasus pengamat yang bergerak mendekati/menjauhi objek dengan perubahan sudut elevasi (misal dari 30° menjadi 60°)."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.3.1.json"
  },
  {
    id: "pm-3.3.2",
    subtest: "PM",
    chapter_num: 3,
    chapter_title: "Geometri dan Pengukuran Kontekstual (Space & Shape)",
    subchapter_num: "3.3",
    subchapter_title: "Trigonometri Kontekstual (Sudut Elevasi, Depresi, & Navigasi)",
    title: "Navigasi Arah Mata Angin dan Jurusan Tiga Angka",
    micro_syllabus_scope: [
      "Menghitung jarak terdekat kapal atau pesawat dari titik keberangkatan setelah berbelok pada sudut tertentu menggunakan Aturan Kosinus dan Aturan Sinus."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-3.3.2.json"
  },

  // BAB 4: DATA DAN KETIDAKPASTIAN DALAM SKENARIO NYATA (UNCERTAINTY & DATA)
  // 4.1. Analisis Data Infografis dan Statistik Terapan
  {
    id: "pm-4.1.1",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.1",
    subchapter_title: "Analisis Data Infografis dan Statistik Terapan",
    title: "Interpretasi Grafik Multi-Variabel dan Tabel Silang",
    micro_syllabus_scope: [
      "Menganalisis grafik gabungan (misal: diagram batang untuk volume ekspor + grafik garis untuk persentase pertumbuhan pada sumbu-Y ganda).",
      "Membaca piramida penduduk, grafik fluktuasi kurs/saham, dan tabel indikator ekonomi/kesehatan."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.1.1.json"
  },
  {
    id: "pm-4.1.2",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.1",
    subchapter_title: "Analisis Data Infografis dan Statistik Terapan",
    title: "Rata-Rata Berbobot (Weighted Average) dan Sistem Penilaian",
    micro_syllabus_scope: [
      "Menghitung skor akhir seleksi atau indeks prestasi jika setiap komponen penilaian memiliki bobot persentase yang berbeda (misal: Tugas 20%, UTS 30%, UAS 50%).",
      "Menentukan skor minimum yang harus dicapai pada ujian terakhir agar memenuhi batas kelulusan (passing grade)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.1.2.json"
  },
  {
    id: "pm-4.1.3",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.1",
    subchapter_title: "Analisis Data Infografis dan Statistik Terapan",
    title: "Ukuran Letak dan Sebaran dalam Konteks Populasi",
    micro_syllabus_scope: [
      "Menafsirkan makna kuartil, persentil, dan jangkauan pada distribusi gaji karyawan, skor ujian nasional, atau kurva pertumbuhan balita."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.1.3.json"
  },
  // 4.2. Kombinatorika dan Peluang dalam Pengambilan Keputusan
  {
    id: "pm-4.2.1",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.2",
    subchapter_title: "Kombinatorika dan Peluang dalam Pengambilan Keputusan",
    title: "Pencacahan Rute, Kode Keamanan, dan Kombinasi Menu/Jadwal",
    micro_syllabus_scope: [
      "Menghitung banyaknya variasi rute perjalanan dari kota A ke kota C melalui kota B (termasuk syarat tidak boleh melewati jalan yang sama saat pulang).",
      "Menghitung banyaknya kombinasi password, kode plat nomor, atau susunan tempat duduk keluarga/panitia dengan batasan posisi tertentu."
    ],
    requires_svg: true,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.2.1.json"
  },
  {
    id: "pm-4.2.2",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.2",
    subchapter_title: "Kombinatorika dan Peluang dalam Pengambilan Keputusan",
    title: "Peluang dalam Kontrol Kualitas, Medis, dan Permainan/Undian",
    micro_syllabus_scope: [
      "Menghitung peluang terambilnya produk cacat dalam inspeksi sampel pabrik (pengambilan sekaligus menggunakan kombinasi vs pengambilan satu per satu tanpa pengembalian).",
      "Menghitung peluang keberhasilan/kegagalan berturut-turut dari dua kejadian independen (misal: peluang dua mesin beroperasi normal secara bersamaan).",
      "Analisis tabel kontingensi 2×2 (misal: hasil uji diagnostik positif/negatif vs kondisi sakit/sehat sebenarnya) untuk menghitung peluang bersyarat dari data populasi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.2.2.json"
  },
  {
    id: "pm-4.2.3",
    subtest: "PM",
    chapter_num: 4,
    chapter_title: "Data dan Ketidakpastian dalam Skenario Nyata (Uncertainty & Data)",
    subchapter_num: "4.2",
    subchapter_title: "Kombinatorika dan Peluang dalam Pengambilan Keputusan",
    title: "Nilai Harapan (Expected Value) dan Evaluasi Risiko",
    micro_syllabus_scope: [
      "Menghitung frekuensi harapan dan ekspektasi keuntungan/kerugian bersih dalam skenario asuransi, investasi, atau kupon undian berhadiah."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pm/pm-4.2.3.json"
  }
];

const mergedItems = [...existingOther, ...pmItems];
tracker.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2), 'utf8');

console.log('Successfully populated PM syllabus into curriculum tracker.');
console.log(`PM items count: ${pmItems.length}`);
console.log(`Total tracker items count: ${mergedItems.length}`);

// Unique bab and sub-bab count for PM
const chapters = new Set(pmItems.map(i => i.chapter_num));
const subchapters = new Set(pmItems.map(i => i.subchapter_num));
console.log(`PM Bab count: ${chapters.size}`);
console.log(`PM Sub-bab count: ${subchapters.size}`);
