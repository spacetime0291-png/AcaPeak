import fs from 'fs';
import path from 'path';

// -------------------------------------------------------------
// MODULE 1: PU-1.1 (Penalaran Induktif - Generalisasi)
// -------------------------------------------------------------
const pu11 = {
  metadata: {
    id: "pu-1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Generalisasi: Peta Soal & Taktik Eksekusi UTBK",
    required_question_variations: [
      "Definisi premis observasional/partikular dan kesimpulan umum.",
      "Perbedaan kesimpulan mutlak (deduktif) vs kesimpulan probabilistik (induktif).",
      "Generalisasi Sempurna (Lengkap): Pengamatan dilakukan pada seluruh anggota populasi tanpa terkecuali.",
      "Generalisasi Sempurna (Lengkap): Tingkat kepastian kesimpulan setara dengan kepastian deduktif.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Pengamatan dilakukan pada sebagian anggota populasi (sampel) untuk mewakili keseluruhan.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Penggunaan kata penanda probabilitas pada kesimpulan (sebagian besar, cenderung, umumnya, berpotensi).",
      "Kuantitas Sampel: kecukupan jumlah kasus khusus untuk mewakili populasi.",
      "Representativitas (Keterwakilan) Sampel: variasi sampel terhadap heterogenitas populasi.",
      "Penanganan Pengecualian (Outlier/Anomali): bagaimana data ekstrem memengaruhi kekuatan kesimpulan."
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    tactical_overview: "Di UTBK-SNBT, soal Generalisasi TIDAK PERNAH menanyakan definisi hafalan teori. Soal selalu disajikan dalam bentuk wacana riset, survei sosial, atau uji klinis di mana Anda diuji untuk: (1) Mendeteksi apakah kesimpulan melompat terlalu jauh (overclaim), (2) Memilih opsi yang memperlemah/memperkuat hipotesis, dan (3) Mengevaluasi keterwakilan sampel serta anomali data.",
    exam_blueprint_markdown: `### Peta Medan UTBK: Tipe Soal & Algoritma Eksekusi 30 Detik

| Tipe Soal di UTBK | Pola Pertanyaan Khas | Fokus yang Sebenarnya Diuji | Algoritma Menjawab Cepat ($\\le 30$ Detik) |
| :--- | :--- | :--- | :--- |
| **Simpulan yang Paling Didukung** | *"Simpulan yang paling mungkin benar berdasarkan teks di atas adalah..."* | Membedakan kesimpulan berbasis sampel (probabilistik) dari klaim mutlak | **Coret opsi mutlak** ('pasti seluruhnya', 'selalu'). Pilih opsi dengan modalitas aman: *'cenderung'*, *'sebagian besar'*, *'berpeluang'*. |
| **Pelemahan Argumen (Weaken)** | *"Pernyataan yang PALING MEMPERLEMAH simpulan peneliti adalah..."* | Menemukan variabel perancu (*confounding factor*) atau bukti tandingan (*counter-evidence*) | Cari opsi yang menyajikan **faktor penyebab alternatif** di luar variabel yang diteliti, atau membuktikan sampel memiliki bias seleksi. |
| **Evaluasi Keterwakilan Sampel** | *"Kelemahan penalaran dari kesimpulan di atas adalah..."* | Mendeteksi *Hasty Generalization* atau *Sampling Bias* | Periksa asal sampel vs populasi sasaran. Jika survei publik hanya diambil dari 1 lokasi/metode sukarela $\\implies$ **Bias Seleksi**. |
| **Sempurna vs Tidak Sempurna** | *"Sifat kepastian dari simpulan kedua laporan adalah..."* | Menilai rasio observasi ($n = N$ mutlak vs $n < N$ probabilistik) | Jika memeriksa $100\\%$ anggota himpunan tertutup $\\implies$ **Mutlak ($P=1$)**. Jika survei sampel $\\implies$ **Probabilistik ($P<1$)**. |
| **Penanganan Anomali (Outlier)** | *"Langkah ilmiah yang paling tepat menghadapi data pasien yang tidak sembuh..."* | Menguji prosedur *Scope Restriction* vs *Cherry-Picking* | Jangan buang data anomali! Pilih opsi yang **membatasi ruang lingkup kesimpulan** dengan menjelaskan kontraindikasi. |`,
    visualizations_svg: [
      {
        id: "svg-pu-1-1",
        title: "Peta Logika: Generalisasi Sempurna vs Tidak Sempurna",
        caption: "Induksi lengkap pada himpunan tertutup menghasilkan kepastian 100%, sedangkan induksi berbasis sampel mengandung lompatan induktif yang wajib menggunakan modalitas probabilitas.",
        svg_code: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <rect width="600" height="360" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  <text x="300" y="38" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#0f172a">Peta Pola Soal Generalisasi UTBK</text>
  
  <!-- Left Side: Sempurna -->
  <rect x="50" y="65" width="235" height="265" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
  <text x="167" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#15803d">1. INDUKSI LENGKAP</text>
  <text x="167" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#16a34a">(Generalisasi Sempurna)</text>
  
  <rect x="70" y="130" width="195" height="48" rx="6" fill="#ffffff" stroke="#bbf7d0"/>
  <text x="167" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1e293b">Kondisi Observasi</text>
  <text x="167" y="167" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#15803d">100% Anggota Diperiksa (n = N)</text>

  <rect x="70" y="190" width="195" height="48" rx="6" fill="#ffffff" stroke="#bbf7d0"/>
  <text x="167" y="210" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1e293b">Status Kesimpulan</text>
  <text x="167" y="227" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#15803d">PASTI / MUTLAK (P = 1)</text>

  <rect x="70" y="250" width="195" height="65" rx="6" fill="#dcfce7"/>
  <text x="167" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#166534">Ciri Khas di Soal UTBK:</text>
  <text x="167" y="287" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#14532d">Objek tertutup (siswa 1 kelas,</text>
  <text x="167" y="303" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#14532d">hari dalam seminggu, mesin pabrik)</text>

  <!-- Right Side: Tidak Sempurna -->
  <rect x="315" y="65" width="235" height="265" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
  <text x="432" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1d4ed8">2. INDUKSI SAMPEL</text>
  <text x="432" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#2563eb">(Generalisasi Parsial)</text>

  <rect x="335" y="130" width="195" height="48" rx="6" fill="#ffffff" stroke="#bfdbfe"/>
  <text x="432" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1e293b">Kondisi Observasi</text>
  <text x="432" y="167" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#2563eb">Hanya Sebagian Sampel (n &lt; N)</text>

  <rect x="335" y="190" width="195" height="48" rx="6" fill="#ffffff" stroke="#bfdbfe"/>
  <text x="432" y="210" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1e293b">Status Kesimpulan</text>
  <text x="432" y="227" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1d4ed8">PROBABILISTIK (P &lt; 1)</text>

  <rect x="335" y="250" width="195" height="65" rx="6" fill="#dbeafe"/>
  <text x="432" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e40af">Kunci Lolos Jebakan UTBK:</text>
  <text x="432" y="287" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1e3a8a">Wajib gunakan kata modalitas:</text>
  <text x="432" y="303" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#2563eb">"Cenderung", "Sebagian besar"</text>
</svg>`
      }
    ],
    distractor_traps: [
      "Jebakan 1: Overgeneralisasi Mutlak (Universal Overclaim) — Opsi yang mengubah data sampel survei menjadi kepastian mutlak ('seluruhnya pasti', 'selalu membuktikan', 'tidak pernah'). Opsi ini 99% SALAH di UTBK.",
      "Jebakan 2: Bias Korelasi Dianggap Kausalitas — Dua peristiwa yang terjadi bersamaan di sampel disimpulkan sebagai hubungan sebab-akibat mutlak.",
      "Jebakan 3: Homogeneity Fallacy (Mengabaikan Variasi Populasi) — Menarik kesimpulan tentang seluruh masyarakat Indonesia hanya dari responden di satu kota besar atau satu kelompok usia.",
      "Jebakan 4: Menolak Seluruh Data Akibat Anomali Tunggal (All-or-Nothing Trap) — Menganggap seluruh hasil penelitian tidak berguna hanya karena ada 1–2 kasus yang menyimpang dari tren mayoritas."
    ],
    quick_execution_algorithm: [
      "Langkah 1: Identifikasi subjek dan sumber data pada stimulus (Apakah sampel terbatas atau populasi 100%?).",
      "Langkah 2: Pindai opsi jawaban dan coret langsung opsi yang memuat kata mutlak ('selalu', 'pasti', 'seluruhnya') jika stimulus berbasis sampel.",
      "Langkah 3: Untuk tipe soal 'Memperlemah', cari opsi yang membawa variabel luar penyebab alternatif yang belum diukur oleh peneliti."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.1-var1",
      variation_name: "Variasi 1: Mendeteksi Simpulan Sah vs Generalisasi Tergesa-gesa (Hasty Generalization)",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Sebuah lembaga bimbingan belajar melakukan evaluasi hasil simulasi UTBK terhadap 40 siswa kelas intensif. Data menunjukkan bahwa 36 siswa yang rutin hadir sesi bedah soal malam hari mengalami kenaikan skor try out rata-rata sebesar 85 poin. Berdasarkan data tersebut, konsultan bimbel membuat beberapa draf kesimpulan untuk materi publikasi.",
      svg_illustration: null,
      question_markdown: "Berdasarkan data 40 siswa tersebut, rumusan kesimpulan yang PALING TEPAT dan SAH secara kaidah logika generalisasi ilmiah adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Seluruh siswa yang mengikuti sesi bedah soal malam hari dipastikan akan lolos ke perguruan tinggi negeri impiannya." },
        { key: "B", text_markdown: "Sesi bedah soal malam hari cenderung efektif membantu sebagian besar siswa dalam meningkatkan perolehan skor try out." },
        { key: "C", text_markdown: "Siswa yang tidak mengikuti sesi malam hari dipastikan akan mengalami penurunan skor try out secara signifikan." },
        { key: "D", text_markdown: "Peningkatan skor try out semata-mata hanya ditentukan oleh kehadiran pada sesi bedah soal malam hari." },
        { key: "E", text_markdown: "Data 40 siswa membuktikan secara mutlak bahwa metode bimbingan belajar konvensional sudah tidak relevan." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Periksa batas data: Data berasal dari 40 siswa di satu bimbel ($n$ terbatas), dengan 36 siswa ($90\\%$) mengalami kenaikan skor.\n2. Tentukan sifat generalisasi: Karena berbasis sampel ($n < N$), kesimpulan hanya boleh berderajat probabilitas, bukan kepastian mutlak.\n3. Evaluasi diksi modalitas: Opsi B menggunakan pembatas yang presisi (*'cenderung efektif membantu sebagian besar siswa'*), sesuai dengan fakta $90\\%$ dan menghindari overgeneralisasi.",
      quick_trick_markdown: "**Trik 15 Detik UTBK:**\nCoret opsi ekstrem: A ('dipastikan lolos'), C ('dipastikan turun'), D ('semata-mata hanya'), E ('membuktikan secara mutlak'). Opsi yang tersisa dan bernada proporsional terukur hanyalah **B**.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Jebakan Universal Overclaim):** Mengklaim kepastian lolos PTN padahal data hanya kenaikan skor try out internal.\n- **Opsi C Salah (Jebakan Negasi Palsu / Inversi Ilegal):** Teks tidak membahas performa siswa yang tidak hadir sesi malam.\n- **Opsi D Salah (Jebakan Kausalitas Tunggal Ekstrem):** Kata 'semata-mata hanya' mengabaikan faktor belajar mandiri, bakat, dan istirahat.\n- **Opsi E Salah (Jebakan Lompatan Topik Ekstrem):** Menyimpulkan nasib bimbel konvensional yang sama sekali tidak diteliti."
    },
    {
      example_id: "pu-1.1-var2",
      variation_name: "Variasi 2: Menguji Keterwakilan Sampel & Bias Seleksi (Selection Bias)",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Dinas Perhubungan sebuah kota metropolitan berencana menyesuaikan tarif bus raya terpadu (BRT). Untuk mengukur reaksi masyarakat, tim survei menyebarkan kuesioner daring melalui media sosial resmi instansi pada pukul 09.00–11.00 di hari kerja. Dari 2.500 responden yang mengisi, sebanyak 78% menyatakan sangat setuju dengan kenaikan tarif jika fasilitas armada ditambah. Berdasarkan hasil ini, kepala dinas menyimpulkan: *'Warga kota metropolitan pada dasarnya mendukung penyesuaian tarif BRT demi perbaikan fasilitas.'*",
      svg_illustration: null,
      question_markdown: "Pernyataan evaluatif berikut yang PALING TEPAT menunjukkan kelemahan metodologis dari kesimpulan kepala dinas di atas adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Jumlah 2.500 responden terlalu banyak sehingga menghabiskan anggaran survei publik." },
        { key: "B", text_markdown: "Pengambilan sampel di jam kerja via media sosial instansi berpotensi bias seleksi, sehingga mengecualikan kelompok pekerja lapangan, buruh komuter pagi, dan masyarakat tanpa akses internet aktif." },
        { key: "C", text_markdown: "Persentase 78% tidak dapat dipercaya karena tidak mencapai batas mayoritas mutlak 100%." },
        { key: "D", text_markdown: "Kuesioner seharusnya hanya diisi oleh pengemudi bus dan petugas halte, bukan penumpang." },
        { key: "E", text_markdown: "Kepala dinas seharusnya menggunakan penalaran deduktif silogisme murni tanpa perlu mengadakan survei empiris." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Identifikasi sasaran klaim: *'Warga kota metropolitan'* (populasi sangat heterogen dari berbagai kelas sosial).\n2. Identifikasi metode survei: Kuesioner daring di medsos instansi pukul 09.00–11.00 WIB hari kerja.\n3. Analisis representativitas: Kelompok komuter sesungguhnya yang berangkat pukul 05.30–08.00 WIB dan bekerja di lapangan tidak sedang memantau medsos pada jam tersebut. Terjadi **bias seleksi (*Sampling Bias*)** yang fatal sehingga kesimpulan tidak mewakili populasi riil pengguna BRT.",
      quick_trick_markdown: "**Trik 20 Detik UTBK:**\nSoal kelemahan survei di UTBK hampir selalu menguji: *Apakah sampel mewakili heterogenitas populasi?* Survei di medsos pada jam kerja instansi jelas memiliki bias demografi. Opsi **B** langsung membongkar kelemahan ini.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah:** 2.500 responden secara kuantitatif sudah cukup besar; kelemahannya bukan di jumlah, melainkan di keterwakilan.\n- **Opsi C Salah:** Dalam ilmu sosial dan statistika, 78% adalah mayoritas kuat; tidak ada aturan riset yang mewajibkan 100%.\n- **Opsi D Salah:** Kebijakan tarif berdampak pada penumpang, bukan hanya pengemudi.\n- **Opsi E Salah:** Kebijakan publik wajib berbasis data empiris, bukan sekadar deduksi di atas kertas."
    },
    {
      example_id: "pu-1.1-var3",
      variation_name: "Variasi 3: Penanganan Data Anomali & Kontradiktif (Black Swan Problem)",
      difficulty: "hard",
      question_type: "reading_comprehension",
      context_markdown: "Sebuah perusahaan teknologi menguji daya tahan baterai generasi terbaru pada 1.000 unit ponsel pintar dalam kondisi suhu ekstrem ($-10^\\circ\\text{C}$ hingga $45^\\circ\\text{C}$). Hasil pengujian selama 72 jam menunjukkan bahwa 965 unit (96,5%) mampu mempertahankan kapasitas daya di atas 80%. Namun, pada 35 unit (3,5%), baterai mengalami pemuaian (kembung) drastis dan mati total sebelum 24 jam.\n\nDalam draf rilis media awal, manajer pemasaran menulis: *'Baterai generasi terbaru terbukti 100% tangguh dan aman di segala cuaca tanpa ada risiko kendala apa pun.'*",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip penanganan anomali dalam generalisasi ilmiah, tindakan korektif yang PALING TEPAT dan bertanggung jawab adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Menghapus data 35 unit yang rusak dari laporan pengujian agar tidak merusak reputasi produk di pasar." },
        { key: "B", text_markdown: "Menyatakan bahwa baterai tersebut gagal total dan membatalkan seluruh peluncuran ponsel pintar secara permanen." },
        { key: "C", text_markdown: "Merevisi klaim universal ('100% aman tanpa risiko') menjadi klaim terukur, serta menginvestigasi faktor penyebab pemuaian pada 3,5% unit anomali tersebut sebagai batas operasional produk." },
        { key: "D", text_markdown: "Menyalahkan konsumen pengguna karena dianggap menguji ponsel di tempat yang tidak wajar." },
        { key: "E", text_markdown: "Mengubah metode pengujian menjadi penalaran deduktif agar anomali fisik baterai tidak diperhitungkan." }
      ],
      correct_answer: "C",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Identifikasi anomali: 35 unit baterai (3,5%) kembung dan mati total.\n2. Identifikasi cacat klaim manajer: Menyatakan *'terbukti 100% tangguh tanpa risiko'* (mengabaikan anomali nyata).\n3. Kaidah integritas ilmiah: Menghadapi data penyangkal (*counter-example*) tidak boleh dengan *cherry-picking* (menghapus data) atau penolakan reaktif (membatalkan seluruh produk), melainkan dengan **Revisi Lingkup Klaim (*Scope Restriction*)** dan analisis akar masalah anomali.",
      quick_trick_markdown: "**Trik 20 Detik UTBK:**\nAturan Emas Etika Sains di UTBK:\n- Coret A (Kecurangan ilmiah / cherry-picking).\n- Coret B (Reaksi ekstrem berlebihan).\n- Coret D (Menyalahkan subjek).\nPilihan ilmiah dewasa dan objektif selalu berupa **pembatasan klaim & investigasi anomali** $\\implies$ **C**.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Jebakan Cherry-Picking):** Menghilangkan data demi estetika laporan melanggar etika penalaran logis.\n- **Opsi B Salah (Jebakan False Dilemma):** 96,5% berhasil adalah capaian tinggi; kegagalan 3,5% adalah bahan evaluasi batas ambang, bukan alasan membuang seluruh riset.\n- **Opsi D Salah:** Pengujian dilakukan oleh laboratorium internal, belum di tangan konsumen.\n- **Opsi E Salah:** Fenomena fisik tidak bisa diselesaikan dengan abstraksi deduktif tanpa verifikasi materiil."
    },
    {
      example_id: "pu-1.1-var4",
      variation_name: "Variasi 4: Memilih Pasangan Modalitas Logika (Sempurna vs Parsial)",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Perhatikan dua proses evaluasi berikut:\n\n* **Kasus 1:** Seorang auditor keuangan memeriksa laporan transaksi kas kecil di seluruh 12 kantor cabang PT X selama bulan Oktober. Setiap kantor cabang diperiksa buku kas dan bukti fisiknya secara lengkap tanpa ada satu pun yang terlewat. Hasilnya, seluruh 12 kantor cabang memiliki neraca kas yang seimbang.\n* **Kasus 2:** Sebuah lembaga gizi menguji kadar iodium pada 200 merek garam dapur kemasan yang beredar di pasar tradisional Pulau Jawa. Hasil pengujian menunjukkan 176 merek garam memenuhi standar nasional (SNI).",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip generalisasi sempurna dan tidak sempurna, pasangan rumusan kesimpulan yang PALING TEPAT untuk Kasus 1 dan Kasus 2 berturut-turut adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Kasus 1: 'Cenderung seluruh kantor cabang seimbang'; Kasus 2: 'Seluruh garam di Indonesia pasti memenuhi SNI'." },
        { key: "B", text_markdown: "Kasus 1: 'Seluruh 12 kantor cabang PT X memiliki neraca seimbang pada bulan Oktober'; Kasus 2: 'Sebagian besar garam dapur di pasar tradisional Pulau Jawa cenderung memenuhi SNI'." },
        { key: "C", text_markdown: "Kasus 1: 'Beberapa kantor cabang mungkin seimbang'; Kasus 2: 'Semua garam dapur di Pulau Jawa pasti higienis'." },
        { key: "D", text_markdown: "Kasus 1: 'PT X tidak akan pernah mengalami defisit kas'; Kasus 2: 'Garam dapur yang tidak ber-SNI berasal dari luar Pulau Jawa'." },
        { key: "E", text_markdown: "Kedua kasus menghasilkan kesimpulan yang setara kepastiannya dan wajib menggunakan kata 'pasti'." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Analisis Kasus 1: Populasi tertutup (12 kantor cabang pada bulan Oktober) diperiksa 100% tuntas ($n = N$). Ini adalah **Generalisasi Sempurna**, sah menggunakan kata mutlak universal (*'seluruh 12 kantor cabang...'*).\n2. Analisis Kasus 2: Merek garam di Pulau Jawa sangat banyak dan dinamis, hanya diambil sampel 200 merek ($n < N$). Ini adalah **Generalisasi Parsial**, wajib menggunakan modalitas probabilitas (*'sebagian besar... cenderung memenuhi'*).\n3. Pasangan yang merefleksikan kedua prinsip ini secara presisi adalah Opsi B.",
      quick_trick_markdown: "**Trik 15 Detik UTBK:**\nKasus 1 ($100\\%$ terperiksa) $\\rightarrow$ Boleh 'Seluruh/Semua'.\nKasus 2 (Hanya 200 sampel) $\\rightarrow$ Wajib 'Sebagian besar / Cenderung'.\nSatu-satunya opsi yang memenuhi pola ini adalah **B**.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah:** Terbalik! Kasus 1 yang 100% malah diberi kata 'cenderung', sedangkan Kasus 2 yang berbasis sampel malah diberi kata 'pasti'.\n- **Opsi C Salah:** Kasus 1 meremehkan fakta audit 100% ('beberapa'), Kasus 2 melompat ke klaim higienis tanpa data.\n- **Opsi D Salah:** Melakukan klaim masa depan ('tidak akan pernah defisit') yang melampaui data bulan Oktober.\n- **Opsi E Salah:** Menganggap kepastian sampel sama dengan kepastian sensus 100%."
    },
    {
      example_id: "pu-1.1-var5",
      variation_name: "Variasi 5: Menentukan Pernyataan yang Memperlemah Hipotesis Peneliti (Tipe Soal Favorit)",
      difficulty: "hard",
      question_type: "standard_mc",
      context_markdown: "Sebuah studi epidemiologi di Kota K mengamati 500 orang dewasa yang mengonsumsi sedikitnya dua cangkir teh hijau fermentasi setiap hari selama 6 bulan. Pada akhir periode studi, peneliti menemukan bahwa 84% partisipan memiliki tekanan darah normal dan kadar kolesterol LDL yang lebih rendah dibandingkan rata-rata warga kota. Dari temuan ini, peneliti merumuskan hipotesis: *'Senyawa katekin dalam teh hijau fermentasi merupakan faktor utama yang menyebabkan penurunan tekanan darah dan kolesterol pada masyarakat perkotaan.'*",
      svg_illustration: null,
      question_markdown: "Manakah di antara temuan berikut yang jika benar akan PALING MELEMAHKAN hipotesis peneliti tersebut?",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Sebagian partisipan dalam studi tersebut juga rutin mengonsumsi buah-buahan lokal saat sarapan pagi." },
        { key: "B", text_markdown: "Hampir seluruh partisipan dalam studi tersebut adalah anggota komunitas pegiat lari pagi yang menjalani pola diet rendah lemak dan bebas rokok sejak bertahun-tahun sebelum studi dimulai." },
        { key: "C", text_markdown: "Harga teh hijau fermentasi di Kota K relatif lebih mahal daripada teh hitam konvensional." },
        { key: "D", text_markdown: "Sebanyak 16% partisipan yang tekanan darahnya tidak turun memiliki riwayat hipertensi genetik keluarga." },
        { key: "E", text_markdown: "Penelitian serupa di negara subtropis juga mencatat manfaat kesehatan dari konsumsi teh hijau." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Identifikasi klaim kausalitas peneliti: *Teh hijau fermentasi adalah faktor utama penyebab tekanan darah normal dan kolesterol rendah*.\n2. Cara meruntuhkan klaim kausalitas generalisasi: Cari **Variabel Perancu (*Confounding Variable*)** yang menjadi penyebab alternatif lebih kuat daripada teh hijau itu sendiri.\n3. Uji Opsi B: Jika partisipan ternyata adalah komunitas pegiat lari pagi, diet rendah lemak, dan non-perokok sejak lama, maka kesehatan jantung mereka disebabkan oleh gaya hidup aktif tersebut, BUKAN oleh teh hijau fermentasi. Temuan ini langsung meruntuhkan klaim bahwa teh hijau adalah 'faktor utama'.",
      quick_trick_markdown: "**Trik 30 Detik UTBK (Pelemah Kausalitas):**\nKlaim: *X menyebabkan Y*.\nPelemah terkuat = *Ternyata ada Z (faktor lain yang jauh lebih berpengaruh) yang sudah ada pada subjek sebelum X diberikan*. Opsi **B** menghadirkan faktor Z (kebiasaan lari pagi & diet ketat).",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Terlalu Lemah):** Kata 'sebagian' buah lokal tidak cukup kuat untuk menjelaskan efek drastis pada 84% partisipan.\n- **Opsi C Salah (Informasi Tak Relevan):** Harga teh tidak ada hubungannya dengan efikasi biologis senyawa katekin.\n- **Opsi D Salah (Malah Memperjelas Anomali):** Justru mendukung peneliti dengan menjelaskan mengapa 16% tidak turun (karena faktor genetik).\n- **Opsi E Salah (Malah Memperkuat):** Menemukan hal serupa di negara subtropis justru memperkuat hipotesis, bukan memperlemah."
    },
    {
      example_id: "pu-1.1-var6",
      variation_name: "Variasi 6: Analisis Lompatan Induktif vs Deduktif Silogistik",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Perhatikan percakapan dua orang analis cuaca berikut:\n\n* **Analis 1:** *'Semua badai tropis di belahan bumi utara berputar berlawanan arah jarum jam akibat Efek Coriolis. Badai Mawar terbentuk di Samudra Pasifik belahan utara. Oleh karena itu, Badai Mawar pasti berputar berlawanan arah jarum jam.'*\n* **Analis 2:** *'Selama sepuluh tahun terakhir, setiap kali suhu permukaan laut di wilayah X naik lebih dari $1,5^\\circ\\text{C}$ pada bulan November, wilayah pesisir Y selalu dilanda curah hujan ekstrem pada bulan Desember. Saat ini suhu di wilayah X telah naik $1,8^\\circ\\text{C}$. Oleh karena itu, pesisir Y sangat berpeluang mengalami curah hujan ekstrem pada Desember mendatang.'*",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip metodologi logika, kesimpulan yang paling tepat mengenai corak penalaran kedua analis tersebut adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Analis 1 menggunakan penalaran induktif yang bersifat probabilistik, sedangkan Analis 2 menggunakan deduktif mutlak." },
        { key: "B", text_markdown: "Analis 1 menggunakan penalaran deduktif dengan kesimpulan mutlak niscaya, sedangkan Analis 2 menggunakan penalaran induktif generalisasi dengan kesimpulan probabilistik." },
        { key: "C", text_markdown: "Kedua analis sama-sama menggunakan silogisme deduktif karena keduanya mengacu pada fenomena fisika atmosfer." },
        { key: "D", text_markdown: "Kesimpulan Analis 2 tidak memiliki nilai ilmiah karena tidak menguji seluruh samudra di dunia." },
        { key: "E", text_markdown: "Analis 1 melakukan kesalahan generalisasi tergesa-gesa karena belum mengamati Badai Mawar secara langsung." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Algoritma Eksekusi:**\n1. Analis 1: Memiliki hukum umum (Efek Coriolis pada semua badai utara) $\\rightarrow$ diterapkan pada Badai Mawar. Hubungan premis-konklusi bersifat niscaya/mutlak 100%. Ini adalah **Penalaran Deduktif**.\n2. Analis 2: Bertolak dari data deret waktu 10 tahun terakhir (kasus partikular berulang) $\\rightarrow$ memproyeksikan kejadian masa depan dengan modalitas *'sangat berpeluang'*. Ini adalah **Penalaran Induktif Generalisasi (Probabilistik)**.\n3. Opsi B mendefinisikan kontras ini secara tepat.",
      quick_trick_markdown: "**Trik 15 Detik UTBK:**\nAnalis 1: Hukum umum $\\rightarrow$ Kasus khusus = **Deduktif Mutlak**.\nAnalis 2: Data 10 tahun $\\rightarrow$ Prediksi peluang = **Induktif Probabilistik**.\nLangsung pilih **B**.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah:** Terbalik total antara posisi deduktif dan induktif.\n- **Opsi C Salah:** Analis 2 tidak menggunakan silogisme deduktif, melainkan ekstrapolasi data historis (induksi).\n- **Opsi D Salah:** Prediksi berbasis data 10 tahun adalah prosedur baku klimatologi empiris (sah secara induktif).\n- **Opsi E Salah:** Analis 1 mendeduksi dari hukum sains yang sudah terbukti secara mekanika fluida, bukan induksi tergesa-gesa."
    }
  ]
};

// -------------------------------------------------------------
// MODULE 2: PK-3.1 (Geometri Bidang Datar: Sudut, Garis, & Segitiga)
// -------------------------------------------------------------
const pk31 = {
  metadata: {
    id: "pk-3.1",
    subtest: "PK",
    chapter_num: 3,
    chapter_title: "Geometri (Datar, Ruang, Analitik, & Trigonometri Dasar)",
    subchapter_num: "3.1",
    subchapter_title: "Sudut, Garis, dan Bangun Datar (Geometri Euklides)",
    title: "Hubungan Garis dan Sudut: Bedah Soal Asli UTBK",
    required_question_variations: [
      "Sudut berpelurus (suplemen = 180°), berpenyiku (komplemen = 90°), dan bertolak belakang.",
      "Dua garis sejajar dipotong garis transversal: sudut sehadap, dalam berseberangan, luar berseberangan, dalam sepihak, dan luar sepihak.",
      "Sudut garis patah di antara dua garis sejajar (metode garis bantu sejajar)."
    ],
    requires_svg: true,
    updated_at: "2026-11-06"
  },
  content: {
    tactical_overview: "Soal geometri sudut di Pengetahuan Kuantitatif (PK) UTBK menguji efisiensi aljabar dan ketajaman mata mendeteksi sifat sudut sejajar. Jangan menghabiskan waktu mencari seluruh sudut satu per satu! Gunakan prinsip kesamaan sudut lancip dan teorema sudut luar untuk memotong waktu pengerjaan menjadi di bawah 40 detik.",
    exam_blueprint_markdown: `### Peta Medan UTBK: Rumus Kilat & Taktik Eksekusi PK

| Tipe Soal Geometri di UTBK | Pola Soal yang Sering Muncul | Rumus Kilat & Sifat Kunci | Algoritma Menjawab Cepat ($\\le 35$ Detik) |
| :--- | :--- | :--- | :--- |
| **Sudut Garis Sejajar & Transversal** | Dua garis sejajar dipotong satu garis transversal dengan sudut beraljabar $(ax + b)^\\circ$ | **Sifat Lancip-Tumpul:** Semua sudut lancip sama besar. Semua sudut tumpul sama besar. $\\text{Lancip} + \\text{Tumpul} = 180^\\circ$. | Cukup tentukan apakah kedua sudut sama jenisnya (sama besar) atau berbeda jenis (berpelurus $= 180^\\circ$). Langsung buat 1 persamaan aljabar. |
| **Teorema Sudut Luar Segitiga** | Segitiga dengan salah satu sisinya diperpanjang | $\\angle \\text{Luar} = \\angle A + \\angle B$ (Jumlah dua sudut dalam di hadapannya) | **Haram mencari sudut pelurus ketiga!** Langsung jumlahkan dua sudut dalam yang diketahui untuk menghemat 2 langkah hitung. |
| **Garis Patah Zig-zag Sejajar** | Sudut di antara dua garis sejajar yang berbentuk patahan petir / huruf M | $\\sum \\angle \\text{Hadap Kiri} = \\sum \\angle \\text{Hadap Kanan}$ | Tarik garis bantu imajiner sejajar di titik patah, atau langsung jumlahkan sudut hadap kiri $=$ jumlah sudut hadap kanan. |
| **Kecukupan Data (1) dan (2)** | Putuskan apakah pernyataan (1) dan (2) cukup menentukan nilai sudut $\\angle x$ | Tentukan apakah informasi menghasilkan nilai unik | Uji pernyataan (1) mandiri: jika dapat 1 nilai pasti $\\implies$ Cukup. Jika belum, uji (2) mandiri. Jika keduanya perlu digabung $\implies$ Opsi C. |`,
    visualizations_svg: [
      {
        id: "svg-pk-3-1",
        title: "Dua Garis Sejajar Dipotong Garis Transversal",
        caption: "Semua sudut lancip (1, 3, 5, 7) sama besar. Semua sudut tumpul (2, 4, 6, 8) sama besar. Pasangan lancip dan tumpul selalu berjumlah 180 derajat.",
        svg_code: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <rect width="600" height="360" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Horizontal Parallel Lines -->
  <line x1="60" y1="110" x2="540" y2="110" stroke="#334155" stroke-width="3"/>
  <text x="548" y="115" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#334155">g</text>
  
  <line x1="60" y1="240" x2="540" y2="240" stroke="#334155" stroke-width="3"/>
  <text x="548" y="245" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#334155">h (g // h)</text>
  
  <!-- Transversal Line -->
  <line x1="180" y1="25" x2="420" y2="335" stroke="#4f46e5" stroke-width="3.5"/>
  <text x="430" y="340" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4f46e5">l (transversal)</text>
  
  <!-- Intersections -->
  <circle cx="246" cy="110" r="5" fill="#4f46e5"/>
  <circle cx="346" cy="240" r="5" fill="#4f46e5"/>
  
  <!-- Angle Labels Top Intersection -->
  <text x="220" y="95" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#2563eb">∠1 (L)</text>
  <text x="270" y="95" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#dc2626">∠2 (T)</text>
  <text x="210" y="140" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#dc2626">∠4 (T)</text>
  <text x="265" y="140" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#2563eb">∠3 (L)</text>
  
  <!-- Angle Labels Bottom Intersection -->
  <text x="320" y="225" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#2563eb">∠5 (L)</text>
  <text x="370" y="225" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#dc2626">∠6 (T)</text>
  <text x="310" y="270" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#dc2626">∠8 (T)</text>
  <text x="365" y="270" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#2563eb">∠7 (L)</text>
  
  <!-- Legend Banner -->
  <rect x="60" y="295" width="480" height="45" rx="8" fill="#1e293b"/>
  <text x="300" y="323" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#f8fafc">
    Kunci Cepat: L = Lancip (Semua Sama Besar), T = Tumpul (Semua Sama Besar). L + T = 180°
  </text>
</svg>`
      }
    ],
    distractor_traps: [
      "Jebakan 1: Asumsi Garis Tampak Sejajar — Menganggap dua garis sejajar hanya karena terlihat lurus di layar, padahal tidak ada notasi panah sejajar (//) atau teks pendukung di soal.",
      "Jebakan 2: Menyamakan Sudut Sepihak — Lupa bahwa sudut dalam/luar sepihak itu berpelurus (jumlahnya 180°), bukan sama besar.",
      "Jebakan 3: Berputar-putar Mencari Sudut Ketiga — Pada soal sudut luar segitiga, siswa sering mencari sudut dalam pelurusnya terlebih dahulu sehingga membuang waktu 30–45 detik."
    ],
    quick_execution_algorithm: [
      "Langkah 1: Identifikasi tanda sejajar pada garis. Jika ada sudut zig-zag, langsung buat garis bantu sejajar imajiner.",
      "Langkah 2: Kategorikan setiap sudut: apakah lancip atau tumpul? Jika sejenis $\\implies$ samakan nilainya ($A = B$). Jika beda jenis $\\implies$ jumlahkan $= 180^\\circ$.",
      "Langkah 3: Untuk format soal Kecukupan Data, jangan hitung sampai tuntas; cukup pastikan apakah variabel bernilai unik."
    ]
  },
  worked_examples: [
    {
      example_id: "pk-3.1-var1",
      variation_name: "Variasi 1: Sudut Garis Sejajar Beraljabar (Lancip vs Tumpul)",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Dua garis sejajar $g$ dan $h$ dipotong oleh garis transversal $l$. Diketahui sebuah sudut lancip bernilai $(3x - 15)^\\circ$ dan sudut tumpul dalam sepihak dengan sudut tersebut bernilai $(2x + 70)^\\circ$.",
      svg_illustration: null,
      question_markdown: "Berdasarkan informasi di atas, berapakah nilai dari $x$?",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "$15$" },
        { key: "B", text_markdown: "$25$" },
        { key: "C", text_markdown: "$35$" },
        { key: "D", text_markdown: "$45$" },
        { key: "E", text_markdown: "$55$" }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Sifat sudut dalam sepihak pada dua garis sejajar: jumlah kedua sudutnya sama dengan $180^\\circ$ (berpelurus).\n2. Susun persamaan linear:\n$$(3x - 15) + (2x + 70) = 180$$\n$$5x + 55 = 180$$\n$$5x = 125 \\implies x = 25$$",
      quick_trick_markdown: "**Trik 15 Detik UTBK:**\nLangsung jumlahkan koefisien $x$ dan konstantanya:\n$3x + 2x = 5x$\n$70 - 15 = 55$\n$5x = 180 - 55 = 125 \\implies x = 25$. Selesai dalam 10 detik.",
      why_others_are_wrong_markdown: "**Bedah Opsi Pengecoh:**\n- **A ($15$):** Jebakan jika siswa salah menyamakan kedua sudut ($3x - 15 = 2x + 70 \\implies x = 85$, lalu salah hitung pembagian).\n- **C ($35$):** Kesalahan hitung pengurangan $180 - 55 = 175$.\n- **D & E:** Angka distraktor acak jika siswa lupa membagi dengan 5."
    },
    {
      example_id: "pk-3.1-var2",
      variation_name: "Variasi 2: Teorema Sudut Luar Segitiga (Shortcut Eksekusi)",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Pada segitiga $PQR$, sisi $QR$ diperpanjang melewati titik $R$ hingga titik $S$. Diketahui besar $\\angle PQS = 48^\\circ$ dan besar sudut luar $\\angle PRS = 116^\\circ$.",
      svg_illustration: null,
      question_markdown: "Berapakah besar sudut dalam $\\angle QPR$?",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "$58^\\circ$" },
        { key: "B", text_markdown: "$64^\\circ$" },
        { key: "C", text_markdown: "$68^\\circ$" },
        { key: "D", text_markdown: "$72^\\circ$" },
        { key: "E", text_markdown: "$76^\\circ$" }
      ],
      correct_answer: "C",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Teorema Sudut Luar: Besar sudut luar $\\angle PRS$ sama dengan jumlah dua sudut dalam di hadapannya, yaitu $\\angle QPR$ dan $\\angle PQR$.\n$$\\angle PRS = \\angle QPR + \\angle PQR$$\n$$116^\\circ = \\angle QPR + 48^\\circ$$\n$$\\angle QPR = 116^\\circ - 48^\\circ = 68^\\circ$$",
      quick_trick_markdown: "**Trik 10 Detik UTBK:**\nJangan pernah mencari sudut $\\angle PRQ$ pelurus dari $116^\\circ$ terlebih dahulu! Langsung kurangkan: $\\angle QPR = 116 - 48 = 68^\\circ$. Selesai dalam satu tarikan nafas.",
      why_others_are_wrong_markdown: "**Bedah Opsi Pengecoh:**\n- **B ($64^\\circ$):** Jebakan sudut pelurus $\\angle PRQ = 180 - 116 = 64^\\circ$ (siswa mengira ditanyakan sudut $R$).\n- **A & D:** Kesalahan pengurangan standar aritmetika pinjam puluhan ($116 - 48$).\n- **E ($76^\\circ$):** Siswa salah menjumlahkan dengan sudut siku-siku."
    },
    {
      example_id: "pk-3.1-var3",
      variation_name: "Variasi 3: Sudut Zig-Zag Garis Patah (Aturan Hadap Kiri = Hadap Kanan)",
      difficulty: "hard",
      question_type: "standard_mc",
      context_markdown: "Garis horizontal $k$ sejajar dengan garis horizontal $m$. Di antara kedua garis tersebut terdapat garis patah $ABC$ yang membentuk sudut hadap kiri $\\angle kAB = 34^\\circ$, sudut puncak lancip $\\angle BCD = 42^\\circ$ pada garis patah berikutnya, dan sudut hadap kanan di titik $B$ sebesar $\\angle ABC = x^\\circ$.",
      svg_illustration: null,
      question_markdown: "Jika sudut hadap kanan di titik $B$ merupakan satu-satunya puncak patahan ke arah kanan antara garis $k$ dan $m$, berapakah nilai dari $x$?",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "$68^\\circ$" },
        { key: "B", text_markdown: "$76^\\circ$" },
        { key: "C", text_markdown: "$84^\\circ$" },
        { key: "D", text_markdown: "$96^\\circ$" },
        { key: "E", text_markdown: "$104^\\circ$" }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Buat garis bantu horizontal imajiner yang sejajar dengan garis $k$ dan $m$ yang melewati titik puncak patahan $B$.\n2. Sudut $x$ terbagi menjadi dua bagian:\n   - Bagian atas bersudut dalam berseberangan dengan $\\angle kAB = 34^\\circ$.\n   - Bagian bawah bersudut dalam berseberangan dengan sudut hadap kiri berikutnya $= 42^\\circ$.\n3. Maka: $x = 34^\\circ + 42^\\circ = 76^\\circ$.",
      quick_trick_markdown: "**Trik Zig-Zag 5 Detik UTBK:**\nPada garis patah di antara dua garis sejajar:\n$$\\sum \\angle \\text{Hadap Kanan} = \\sum \\angle \\text{Hadap Kiri}$$\n$$x = 34^\\circ + 42^\\circ = 76^\\circ$$. Anda tidak perlu menggambar garis bantu sama sekali!",
      why_others_are_wrong_markdown: "**Bedah Opsi Pengecoh:**\n- **A ($68^\\circ$):** Siswa menduplikasi sudut pertama ($34 \\times 2$).\n- **C ($84^\\circ$):** Siswa menduplikasi sudut kedua ($42 \\times 2$).\n- **E ($104^\\circ$):** Siswa mengurangkan dari $180^\\circ$ ($180 - 76 = 104^\\circ$)."
    },
    {
      example_id: "pk-3.1-var4",
      variation_name: "Variasi 4: Format Kecukupan Data (1) dan (2) pada Sudut Bertolak Belakang",
      difficulty: "hard",
      question_type: "data_sufficiency",
      context_markdown: "Dua garis lurus berpotongan di titik $O$ membentuk empat sudut: $\\angle 1, \\angle 2, \\angle 3,$ dan $\\angle 4$ berurutan searah jarum jam. Berapakah besar $\\angle 1$?",
      svg_illustration: null,
      question_markdown: "Putuskan apakah pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:\n\n(1) $\\angle 1 + \\angle 3 = 130^\\circ$\n(2) $\\angle 2 = 115^\\circ$",
      statements: [
        "(1) $\\angle 1 + \\angle 3 = 130^\\circ$",
        "(2) $\\angle 2 = 115^\\circ$"
      ],
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup." },
        { key: "B", text_markdown: "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup." },
        { key: "C", text_markdown: "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup." },
        { key: "D", text_markdown: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup." },
        { key: "E", text_markdown: "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan." }
      ],
      correct_answer: "D",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Karena empat sudut terbentuk berurutan dari dua garis yang berpotongan:\n   - $\\angle 1$ dan $\\angle 3$ bertolak belakang $\\implies \\angle 1 = \\angle 3$.\n   - $\\angle 1$ dan $\\angle 2$ berpelurus $\\implies \\angle 1 + \\angle 2 = 180^\\circ$.\n2. Uji Pernyataan (1) Sendiri:\n   $$\\angle 1 + \\angle 3 = 130^\\circ$$\n   Karena $\\angle 1 = \\angle 3$, maka $2\\angle 1 = 130^\\circ \\implies \\angle 1 = 65^\\circ$ (UNIK). Pernyataan (1) CUKUP.\n3. Uji Pernyataan (2) Sendiri:\n   $$\\angle 2 = 115^\\circ$$\n   Karena $\\angle 1 + \\angle 2 = 180^\\circ$, maka $\\angle 1 = 180 - 115 = 65^\\circ$ (UNIK). Pernyataan (2) CUKUP.\n4. Karena masing-masing pernyataan secara independen cukup menjawab nilai $\\angle 1$, maka jawabannya adalah **D**.",
      quick_trick_markdown: "**Trik Kecukupan Data UTBK:**\nCek simetri sudut garis potong:\n- Sifat 1: Bertolak belakang $\\implies$ sama besar.\n- Sifat 2: Berdampingan $\\implies$ jumlah 180°.\nPernyataan (1) memberi sudut bertolak belakang $\\implies$ Cukup!\nPernyataan (2) memberi sudut pelurus $\\implies$ Cukup!\nMasing-masing cukup $\\implies$ Langsung pilih **D**.",
      why_others_are_wrong_markdown: "**Bedah Opsi Pengecoh:**\n- **Opsi C Salah (Jebakan Menggabungkan Premis Terlalu Cepat):** Siswa sering buru-buru menggabungkan (1) dan (2) tanpa menyadari bahwa pernyataan (1) saja sudah cukup menghasilkan nilai unik."
    }
  ]
};

// Output directories
const puDir = path.resolve('public/content/utbk/pu');
const pkDir = path.resolve('public/content/utbk/pk');

fs.mkdirSync(puDir, { recursive: true });
fs.mkdirSync(pkDir, { recursive: true });

// Clean old fragmented files
const oldPuFiles = ['pu-1.1.1.json', 'pu-1.1.2.json', 'pu-1.1.3.json'];
for (const f of oldPuFiles) {
  const p = path.join(puDir, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// Write consolidated playbooks
fs.writeFileSync(path.join(puDir, 'pu-1.1.json'), JSON.stringify(pu11, null, 2), 'utf8');
console.log('Created: public/content/utbk/pu/pu-1.1.json (Tactical UTBK Playbook)');

fs.writeFileSync(path.join(pkDir, 'pk-3.1.json'), JSON.stringify(pk31, null, 2), 'utf8');
console.log('Created: public/content/utbk/pk/pk-3.1.json (Tactical UTBK Playbook)');

// Mark status done in tracker
const trackerPath = path.resolve('data/curriculum_tracker.json');
const tracker = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));

tracker.items.forEach(item => {
  if (item.id === 'pu-1.1' || item.id === 'pk-3.1') {
    item.material_status = 'done';
  }
});
fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2), 'utf8');
console.log('Updated tracker status to done for pu-1.1 and pk-3.1');
