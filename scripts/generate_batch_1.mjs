import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/content/utbk/pu');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// -------------------------------------------------------------
// ITEM 1: pu-1.1.1
// -------------------------------------------------------------
const item1 = {
  metadata: {
    id: "pu-1.1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Konsep Dasar dan Mekanisme Generalisasi",
    micro_syllabus_covered: [
      "Definisi premis observasional/partikular dan kesimpulan umum.",
      "Perbedaan kesimpulan mutlak (deduktif) vs kesimpulan probabilistik (induktif)."
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    concept_markdown: `Penalaran induktif merupakan proses penarikan kesimpulan yang bergerak dari fakta-fakta khusus (partikular) menuju kaidah atau prinsip yang berlaku umum (*bottom-up reasoning*). Di dalam subtes Penalaran Umum (PU) UTBK-SNBT, penguasaan mekanisme generalisasi menjadi kunci untuk membedakan argumen logis yang valid dari klaim yang bias atau tidak berdasar.

### 1. Definisi Premis Observasional/Partikular dan Kesimpulan Umum

Penalaran generalisasi selalu dibangun dari dua tingkatan proposisi:

* **Premis Observasional (Partikular):** Merupakan proposisi yang merekam fakta empiris, hasil pengamatan indrawi, atau pencatatan eksperimental terhadap kasus-kasus spesifik. Lingkup proposisi ini terbatas pada individu atau kelompok sampel tertentu ($S_1, S_2, S_3, \\dots, S_n$).
  * Contoh: *"Sampel air sungai di titik A mengandung mikroplastik."*
  * Contoh: *"Sampel air sungai di titik B mengandung mikroplastik."*
* **Kesimpulan Umum (General / Universal Statement):** Merupakan proposisi yang memproyeksikan karakteristik yang teramati pada sampel partikular kepada seluruh populasi atau kelas objek sejenis, termasuk objek yang belum pernah diamati secara langsung.
  * Contoh: *"Air di sepanjang aliran sungai tersebut tercemar mikroplastik."*

Mekanisme terbentuknya generalisasi melibatkan empat fase berpikir logis:
1. **Observasi Berulang:** Mengamati fenomena pada serangkaian kasus individual.
2. **Deteksi Pola (*Pattern Recognition*):** Mengidentifikasi keseragaman (*regularity*) atau sifat konstan yang selalu muncul pada setiap kasus yang diamati.
3. **Lompatan Induktif (*Inductive Leap*):** Melakukan lompatan logika dari batas data empiris yang sudah teramati ke wilayah umum yang belum teramati.
4. **Formulasi Proposisi Umum:** Merumuskan pernyataan universal atau kaidah yang merangkum keseluruhan fenomena.

Berikut visualisasi diagram alur mekanisme lompatan induktif dibandingkan dengan penalaran deduktif:

[[SVG:svg-pu-1-1]]

### 2. Perbedaan Kesimpulan Mutlak (Deduktif) vs Kesimpulan Probabilistik (Induktif)

Salah satu jebakan utama dalam soal UTBK PU adalah ketidakmampuan membedakan sifat kepastian antara penalaran deduktif dan induktif.

| Parameter Evaluasi | Penalaran Deduktif | Penalaran Induktif (Generalisasi) |
| :--- | :--- | :--- |
| **Arah Penarikan Logika** | *Top-down* (Prinsip Umum $\\rightarrow$ Kasus Spesifik) | *Bottom-up* (Kasus Partikular $\\rightarrow$ Kaidah Umum) |
| **Sifat Hubungan Premis-Konklusi** | Implikatif Niscaya (*necessary connection*). Jika seluruh premis benar, konklusi mustahil salah. | Probabilistik (*probabilistic support*). Premis hanya memberikan dukungan derajat peluang (*degree of confirmation*). |
| **Kandungan Informasi Konklusi** | **Non-ampliatif:** Konklusi tidak menambah informasi baru di luar apa yang sudah termaktub secara implisit di premis. | **Ampliatif:** Konklusi melampaui data fakta yang ada di premis, menghasilkan hipotesis/pengetahuan baru. |
| **Tingkat Kepastian (*Certainty*)** | Mutlak / Pasti 100% (*apodictic*). | Bersifat kemungkinan / Peluang (*plausible / contingent*). |
| **Kriteria Evaluasi Argumen** | **Valid / Invalid** serta **Sahih (*Sound*)** jika premis faktual. | **Kuat (*Strong*) / Lemah (*Weak*)** serta **Meyakinkan (*Cogent*)**. |
| **Dampak Kasus Kontradiktif** | Premis awal langsung gugur jika terdapat premis tandingan. | Satu contoh penyangkal (*counter-example*) dapat melemahkan atau meruntuhkan klaim universal. |

Pada sains empiris dan wacana wacana UTBK, kesimpulan dari sebuah survei atau eksperimen **tidak boleh** diklaim sebagai kebenaran mutlak 100%. Kesimpulan yang sah secara metodologis selalu menggunakan modalitas probabilitas (*cenderung*, *sebagian besar*, *berpeluang tinggi*).`,
    visualizations_svg: [
      {
        id: "svg-pu-1-1",
        title: "Perbandingan Alur Penalaran Induktif vs Deduktif",
        caption: "Induktif bertolak dari kasus-kasus partikular melakukan lompatan logika menuju kesimpulan umum berderajat probabilitas, sedangkan deduktif bertolak dari kaidah umum menuju kepastian mutlak kasus spesifik.",
        svg_code: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <rect width="600" height="360" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  <text x="300" y="38" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#0f172a">Perbandingan Mekanisme Penalaran</text>
  
  <!-- Left Side: Inductive (Bottom-Up) -->
  <rect x="50" y="60" width="235" height="270" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
  <text x="167" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#1d4ed8">PENALARAN INDUKTIF</text>
  <text x="167" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#3b82f6">(Bottom-Up / Generalisasi)</text>
  
  <rect x="70" y="125" width="195" height="42" rx="6" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="167" y="145" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1e293b">Premis Observasional</text>
  <text x="167" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Fakta Kasus 1, Kasus 2, Kasus n</text>
  
  <line x1="167" y1="167" x2="167" y2="200" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="5,5"/>
  <polygon points="167,205 162,195 172,195" fill="#2563eb"/>
  <text x="175" y="188" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#2563eb">Lompatan Induktif</text>
  
  <rect x="70" y="210" width="195" height="52" rx="6" fill="#dbeafe" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="167" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1e40af">Kesimpulan Umum</text>
  <text x="167" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#0284c7">Probabilistik (Peluang)</text>
  
  <rect x="70" y="275" width="195" height="38" rx="6" fill="#f1f5f9"/>
  <text x="167" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Sifat: Ampliatif (Data Baru)</text>
  <text x="167" y="306" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#059669">Evaluasi: Kuat vs Lemah</text>

  <!-- Right Side: Deductive (Top-Down) -->
  <rect x="315" y="60" width="235" height="270" rx="10" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="2"/>
  <text x="432" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#be185d">PENALARAN DEDUKTIF</text>
  <text x="432" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#ec4899">(Top-Down / Silogistik)</text>
  
  <rect x="335" y="125" width="195" height="42" rx="6" fill="#ffffff" stroke="#fbcfe8" stroke-width="1.5"/>
  <text x="432" y="145" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1e293b">Premis Universal</text>
  <text x="432" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Hukum / Aturan Umum</text>
  
  <line x1="432" y1="167" x2="432" y2="200" stroke="#db2777" stroke-width="2.5"/>
  <polygon points="432,205 427,195 437,195" fill="#db2777"/>
  <text x="440" y="188" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#db2777">Penurunan Logika</text>
  
  <rect x="335" y="210" width="195" height="52" rx="6" fill="#fce7f3" stroke="#f472b6" stroke-width="1.5"/>
  <text x="432" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#9d174d">Konklusi Spesifik</text>
  <text x="432" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#b91c1c">Mutlak 100% (Niscaya)</text>
  
  <rect x="335" y="275" width="195" height="38" rx="6" fill="#f1f5f9"/>
  <text x="432" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Sifat: Non-ampliatif</text>
  <text x="432" y="306" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#059669">Evaluasi: Valid vs Invalid</text>
</svg>`
      }
    ],
    formulas_and_quick_tricks: [
      "Arah Induktif: $K_1 + K_2 + \\dots + K_n \\xrightarrow{\\text{Lompatan Induktif}} \\text{Kaidah Umum (Probabilistik)}$.",
      "Arah Deduktif: $\\text{Kaidah Umum} + \\text{Kasus Khusus} \\xrightarrow{\\text{Silogisme Murni}} \\text{Konklusi Mutlak (100\\%)}$.",
      "Trik Eliminasi UTBK: Jika stimulus soal menyajikan data survei, eksperimen laboratorium, atau pengamatan lapangan, ELIMINASI opsi simpulan yang menggunakan kata mutlak ('pasti selalu', 'seluruhnya tanpa pengecualian'). Pilih opsi yang mencerminkan derajat probabilitas logis ('sangat mungkin', 'cenderung', 'berpeluang besar')."
    ],
    common_pitfalls: [
      "Menganggap kesimpulan induktif yang sangat kuat sebagai kepastian mutlak (100% deduktif).",
      "Melakukan generalisasi tergesa-gesa (*hasty generalization*) hanya dari satu atau dua kasus pengamatan partikular.",
      "Mengabaikan bukti tandingan (*counter-example*) yang sebenarnya dapat langsung menggugurkan klaim universal induktif."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.1.1-ex1",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Seorang peneliti pangan menguji kadar antioksidan pada lima jenis varietas buah mangga yang tumbuh di perkebunan Jawa Timur. Hasil pengujian laboratorium menunjukkan bahwa seluruh varietas mangga yang diuji memiliki kandungan vitamin C dan polifenol di atas $60\\text{ mg}/100\\text{ g}$. Dari pengujian ini, peneliti menyimpulkan: *'Buah mangga yang dibudidayakan di perkebunan Jawa Timur berpotensi tinggi menjadi sumber antioksidan alami bagi masyarakat.'*",
      svg_illustration: null,
      question_markdown: "Berdasarkan stimulus tersebut, proses berpikir yang dilakukan peneliti merupakan bentuk penalaran...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Deduktif, karena kesimpulan yang dihasilkan berlaku mutlak dan dapat dibuktikan secara matematis." },
        { key: "B", text_markdown: "Deduktif, karena bertolak dari premis umum mengenai kandungan antioksidan menuju sifat varietas mangga." },
        { key: "C", text_markdown: "Induktif, karena menarik kesimpulan umum yang bersifat probabilistik dari serangkaian data pengamatan sampel partikular." },
        { key: "D", text_markdown: "Induktif, karena menghasilkan kesimpulan mutlak yang tidak dapat dibantah oleh penelitian berikutnya." },
        { key: "E", text_markdown: "Silogisme kategorik, karena menghubungkan premis mayor dan premis minor secara niscaya." }
      ],
      correct_answer: "C",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Identifikasi premis: Peneliti mengamati lima varietas mangga (data sampel/kasus partikular).\n2. Identifikasi konklusi: Peneliti menyimpulkan karakteristik mangga di Jawa Timur secara lebih luas dengan frasa modalitas *'berpotensi tinggi'* (kesimpulan umum probabilistik).\n3. Klasifikasi penalaran: Gerakan berpikir dari kasus-kasus partikular menuju pernyataan umum adalah esensi dari **penalaran induktif**.\n4. Sifat kesimpulan: Kesimpulan induktif tidak pernah mutlak melainkan berpeluang (*probabilistik*). Opsi A dan D salah karena mencantumkan 'mutlak'. Opsi B dan E salah karena menganggapnya deduktif/silogisme.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nCek kata kunci arah logika:\n5 varietas mangga $\\rightarrow$ sampel khusus (partikular).\nKesimpulan $\\rightarrow$ kaidah umum perkebunan Jawa Timur.\nKhusus ke Umum = **Induktif**. Ciri khas induktif = **Probabilistik/berpotensi** (bukan mutlak). Langsung pilih **C** dalam $< 15$ detik."
    },
    {
      example_id: "pu-1.1.1-ex2",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Perhatikan dua kutipan kesimpulan dari dua laporan ilmiah berikut:\n\n* **Laporan 1:** *'Semua mamalia bernapas dengan paru-paru. Ikan paus adalah mamalia. Oleh karena itu, ikan paus pasti bernapas dengan paru-paru.'*\n* **Laporan 2:** *'Berdasarkan pemantauan terhadap 1.200 pengemudi di Jakarta selama uji coba sistem ganjil-genap, 88% pengemudi beralih ke transportasi umum pada jam sibuk. Dengan demikian, penerapan sistem ganjil-genap cenderung efektif mengalihkan mobilitas warga perkotaan ke transportasi publik.'*",
      svg_illustration: null,
      question_markdown: "Pernyataan evaluatif berikut yang paling tepat mengenai sifat kebenaran dari kedua kesimpulan laporan di atas adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Kedua laporan menghasilkan kesimpulan yang mutlak benar karena didukung oleh fakta empiris." },
        { key: "B", text_markdown: "Laporan 1 bersifat probabilistik karena paus hidup di air, sedangkan Laporan 2 bersifat mutlak karena ukuran sampel besar." },
        { key: "C", text_markdown: "Laporan 1 menghasilkan kesimpulan deduktif yang mutlak benar jika premisnya benar, sedangkan Laporan 2 menghasilkan kesimpulan induktif yang bersifat probabilistik." },
        { key: "D", text_markdown: "Laporan 1 merupakan penalaran induktif yang lemah, sedangkan Laporan 2 merupakan penalaran deduktif yang sah." },
        { key: "E", text_markdown: "Kedua laporan tidak dapat dipercaya karena tidak menguji seluruh populasi di dunia." }
      ],
      correct_answer: "C",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Bedah Laporan 1:\n   - Premis Mayor: Semua mamalia bernapas dengan paru-paru (kaidah universal).\n   - Premis Minor: Ikan paus adalah mamalia (kasus partikular).\n   - Konklusi: Ikan paus pasti bernapas dengan paru-paru.\n   - Ini adalah silogisme deduktif klasik. Hubungan premis dan konklusi bersifat niscaya/mutlak 100% (*valid & sound*).\n2. Bedah Laporan 2:\n   - Pengamatan terhadap 1.200 pengemudi (sampel partikular).\n   - Konklusi menggunakan modalitas *'cenderung efektif'* untuk warga perkotaan.\n   - Ini adalah generalisasi induktif berbasis sampel. Kesimpulannya berderajat probabilitas, bukan mutlak.\n3. Evaluasi Opsi:\n   - Opsi C menyatakan perbedaan sifat ini secara presisi: Laporan 1 deduktif mutlak, Laporan 2 induktif probabilistik.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nLaporan 1: Format 'Semua A adalah B, C adalah A, maka C pasti B' $\\implies$ Deduktif Mutlak.\nLaporan 2: Ada angka survei (1.200 orang) + kata 'cenderung' $\\implies$ Induktif Probabilistik.\nKombinasi tepat: Deduktif mutlak & Induktif probabilistik $\\implies$ **C**."
    },
    {
      example_id: "pu-1.1.1-ex3",
      difficulty: "hard",
      question_type: "reading_comprehension",
      context_markdown: "Dalam sebuah simposium astrobiologi, Tim Peneliti Alpha mempresentasikan temuan bahwa lima meteorit purba yang ditemukan di lapisan es Antarktika mengandung asam amino rantai pendek dan gugus hidrokarbon aromatik kompleks. Dari data tersebut, ketua tim peneliti menyatakan simpulan akhir dalam konferensi pers: *'Keberadaan senyawa organik kompleks pada kelima meteorit ini membuktikan secara pasti bahwa benih kehidupan biologis di seluruh sistem Tata Surya berasal dari tabrakan komet dan asteroid purba.'*\n\nMenanggapi klaim tersebut, seorang pakar metodologi sains memberikan catatan kritis bahwa simpulan ketua tim telah melakukan cacat nalar (*logical leap*) dalam mekanisme penarikan kesimpulan ilmiah.",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip dasar penalaran induktif dan pembentukan kesimpulan umum, kritik yang paling tepat dan berbobot terhadap pernyataan ketua tim peneliti adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Data dari lima meteorit merupakan premis partikular terbatas, sehingga klaim kesimpulan tidak boleh dinyatakan sebagai kepastian mutlak ('membuktikan secara pasti') untuk seluruh tata surya." },
        { key: "B", text_markdown: "Penelitian tersebut seharusnya menggunakan penalaran deduktif murni tanpa melibatkan data laboratorium sama sekali." },
        { key: "C", text_markdown: "Meteorit Antarktika tidak dapat dijadikan premis observasional karena es Antarktika telah terkontaminasi oleh atmosfer bumi." },
        { key: "D", text_markdown: "Asam amino bukan merupakan molekul organik, sehingga kesimpulan umum tersebut salah secara definisi ilmiah." },
        { key: "E", text_markdown: "Lompatan induktif hanya diperbolehkan jika meteorit yang diteliti diambil langsung dari sabuk asteroid di luar angkasa." }
      ],
      correct_answer: "A",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Analisis premis: Pengamatan empiris hanya terbatas pada lima meteorit di Antarktika (sampel partikular yang sangat kecil dibandingkan kompleksitas kosmos).\n2. Analisis klaim konklusi: Ketua tim mengklaim *'membuktikan secara pasti'* (kepastian mutlak deduktif) untuk *'seluruh sistem Tata Surya'* (generalisasi universal raksasa).\n3. Kelemahan metodologis: Penalaran induktif melompat dari sampel partikular ke kesimpulan umum. Karena didasarkan pada sampel terbatas, kesimpulan induktif hanya boleh berderajat probabilitas (*sangat mungkin*, *menunjukkan indikasi kuat*), bukan kepastian mutlak yang tak terbantahkan.\n4. Dengan demikian, kritik paling fundamental terletak pada pelanggaran batas epistemik induksi: mengubah temuan partikular menjadi klaim universal mutlak tanpa dukungan data menyeluruh.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nFokus pada kata kunci kesalahan logika di klaim: 'hanya 5 meteorit' (sampel kecil) $\\rightarrow$ 'membuktikan secara pasti seluruh tata surya' (klaim mutlak universal). Ini adalah pelanggaran batas induksi. Opsi yang secara tajam membongkar kesalahan ini adalah **A**."
    }
  ]
};

// -------------------------------------------------------------
// ITEM 2: pu-1.1.2
// -------------------------------------------------------------
const item2 = {
  metadata: {
    id: "pu-1.1.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Jenis-Jenis Generalisasi",
    micro_syllabus_covered: [
      "Generalisasi Sempurna (Lengkap): Pengamatan dilakukan pada seluruh anggota populasi tanpa terkecuali.",
      "Generalisasi Sempurna (Lengkap): Tingkat kepastian kesimpulan setara dengan kepastian deduktif.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Pengamatan dilakukan pada sebagian anggota populasi (sampel) untuk mewakili keseluruhan.",
      "Generalisasi Tidak Sempurna (Parsial/Sampel): Penggunaan kata penanda probabilitas pada kesimpulan (sebagian besar, cenderung, umumnya, berpotensi)."
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    concept_markdown: `Dalam penalaran induktif, generalisasi diklasifikasikan ke dalam dua kategori utama berdasarkan cakupan observasi terhadap anggota populasi: **Generalisasi Sempurna (*Complete Induction*)** dan **Generalisasi Tidak Sempurna (*Incomplete / Partial Induction*)**. Memahami perbedaan keduanya sangat krusial dalam menyelesaikan soal-soal penalaran logis UTBK-SNBT.

### 1. Generalisasi Sempurna (Lengkap / Complete Induction)

Generalisasi sempurna terjadi ketika proses penarikan kesimpulan umum didasarkan pada pengamatan menyeluruh terhadap **setiap individu anggota populasi tanpa ada satu pun yang terlewat**.

* **Karakteristik Utama:**
  * **Populasi Terbatas & Tertutup (*Finite & Bounded*):** Jumlah anggota populasi dapat dihitung secara pasti (*countable*), berukuran kecil atau terbatas ruang dan waktu (misal: hari dalam seminggu, siswa di suatu kelas, provinsi di Indonesia).
  * **Tingkat Kepastian Setara Deduktif:** Karena $100\\%$ anggota populasi telah diperiksa langsung, kesimpulan yang dihasilkan **bersifat mutlak dan pasti (apodiktik)**. Tidak ada risiko adanya *counter-example* yang terlewatkan.
* **Contoh Kasus:**
  * Premis:
    * Hari Senin berdurasi 24 jam.
    * Hari Selasa berdurasi 24 jam.
    * Hari Rabu, Kamis, Jumat, Sabtu, dan Minggu masing-masing berdurasi 24 jam.
  * Kesimpulan: *'Semua hari dalam satu minggu berdurasi 24 jam.'*
  * Status kesimpulan: Mutlak benar $100\\%$ (pasti deduktif).

### 2. Generalisasi Tidak Sempurna (Parsial/Sampel / Incomplete Induction)

Sebagian besar fenomena di alam, sosial, dan penelitian sains memiliki populasi yang sangat besar atau tak berhingga (*infinite*). Oleh karena itu, peneliti hanya dapat mengamati **sebagian anggota populasi (sampel)** untuk mewakili karakteristik keseluruhan.

* **Karakteristik Utama:**
  * **Melibatkan Lompatan Induktif (*Inductive Leap*):** Penarikan kesimpulan melangkah melampaui data yang diobservasi secara langsung.
  * **Tingkat Kepastian Probabilistik:** Kesimpulan tidak pernah mencapai derajat kepastian $100\\%$. Selalu ada peluang munculnya anomali atau data penyangkal di masa mendatang.
* **Penggunaan Kata Penanda Modalitas Probabilitas:**
  * Dalam bahasa ilmiah dan standar UTBK, kesimpulan generalisasi parsial yang sah **wajib** menggunakan kata penanda probabilitas:
    * *Sebagian besar*, *cenderung*, *pada umumnya*, *berpotensi*, *kemungkinan besar*.
  * Jika sebuah kesimpulan dari sampel parsial diklaim menggunakan kata mutlak seperti *'semua pasti'*, maka argumen tersebut cacat secara penalaran (*fallacy of hasty generalization*).

Berikut visualisasi diagram cakupan populasi dan sampel antara kedua jenis generalisasi:

[[SVG:svg-pu-1-2]]

### 3. Tabel Perbandingan Sintesis

| Dimensi Perbandingan | Generalisasi Sempurna (*Complete*) | Generalisasi Tidak Sempurna (*Partial*) |
| :--- | :--- | :--- |
| **Cakupan Pengamatan** | Seluruh anggota populasi ($n = N$, 100%) | Sebagian anggota populasi ($n < N$, sampel) |
| **Sifat Populasi** | Terbatas (*finite*), tertutup, dan terhitung | Sangat besar, tak berhingga (*infinite*), atau dinamis |
| **Kekuatan Kesimpulan** | **Pasti / Mutlak (Derajat kepastian = 1)** | **Probabilistik (Derajat kepastian < 1)** |
| **Kesetaraan Logika** | Setara dengan kepastian kesimpulan deduktif | Khas induksi empiris (membutuhkan verifikasi berkelanjutan) |
| **Kata Penanda Simpulan** | *'Semua'*, *'Setiap'*, *'Seluruh'* (sah digunakan) | *'Cenderung'*, *'Umumnya'*, *'Sebagian besar'*, *'Berpotensi'* |
| **Kerentanan Anomali** | Nol (tidak ada ruang bagi penyangkal) | Rentan melemah jika ditemukan *counter-example* |`,
    visualizations_svg: [
      {
        id: "svg-pu-1-2",
        title: "Perbedaan Ruang Lingkup Observasi Generalisasi",
        caption: "Generalisasi sempurna memeriksa seluruh anggota populasi tertutup sehingga kesimpulannya mutlak, sedangkan generalisasi tidak sempurna hanya memeriksa sampel sehingga kesimpulannya bersifat probabilistik.",
        svg_code: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <rect width="600" height="360" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  <text x="300" y="38" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#0f172a">Jenis-Jenis Generalisasi Logis</text>

  <!-- Left: Generalisasi Sempurna -->
  <rect x="50" y="60" width="235" height="270" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
  <text x="167" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#15803d">GENERALISASI SEMPURNA</text>
  <text x="167" y="106" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#16a34a">(Induksi Lengkap / n = N)</text>

  <!-- Circle representing full population checked -->
  <circle cx="167" cy="170" r="50" fill="#bbf7d0" stroke="#22c55e" stroke-width="2.5"/>
  <circle cx="145" cy="155" r="4" fill="#15803d"/>
  <circle cx="167" cy="150" r="4" fill="#15803d"/>
  <circle cx="188" cy="158" r="4" fill="#15803d"/>
  <circle cx="152" cy="180" r="4" fill="#15803d"/>
  <circle cx="178" cy="182" r="4" fill="#15803d"/>
  <circle cx="167" cy="195" r="4" fill="#15803d"/>
  <text x="167" y="138" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">100% Diobservasi</text>

  <rect x="68" y="235" width="200" height="78" rx="6" fill="#ffffff" stroke="#86efac" stroke-width="1.5"/>
  <text x="167" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Sifat Kesimpulan:</text>
  <text x="167" y="272" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#15803d">MUTLAK / PASTI (100%)</text>
  <text x="167" y="290" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Setara Kepastian Deduktif</text>
  <text x="167" y="304" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#15803d">Diksi: "Semua", "Seluruh"</text>

  <!-- Right: Generalisasi Tidak Sempurna -->
  <rect x="315" y="60" width="235" height="270" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
  <text x="432" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1d4ed8">GENERALISASI PARSIAL</text>
  <text x="432" y="106" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#3b82f6">(Induksi Sampel / n &lt; N)</text>

  <!-- Large circle population and small inner circle sample -->
  <circle cx="432" cy="170" r="50" fill="#ffffff" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="432" y="132" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#64748b">Populasi Luas (N)</text>
  
  <circle cx="432" cy="175" r="26" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/>
  <circle cx="425" cy="172" r="3" fill="#1d4ed8"/>
  <circle cx="438" cy="170" r="3" fill="#1d4ed8"/>
  <circle cx="432" cy="182" r="3" fill="#1d4ed8"/>
  <text x="432" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1d4ed8">Sampel (n)</text>

  <rect x="333" y="235" width="200" height="78" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="432" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Sifat Kesimpulan:</text>
  <text x="432" y="272" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#2563eb">PROBABILISTIK (Peluang)</text>
  <text x="432" y="290" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Terdapat Lompatan Induktif</text>
  <text x="432" y="304" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#2563eb">Diksi: "Cenderung", "Umumnya"</text>
</svg>`
      }
    ],
    formulas_and_quick_tricks: [
      "Generalisasi Sempurna: Populasi Tertutup + Seluruh Anggota Terperiksa ($n = N$) $\\implies$ Kepastian Mutlak ($P = 1$).",
      "Generalisasi Tidak Sempurna: Populasi Terbuka + Sampel Parsial ($n < N$) $\\implies$ Kepastian Probabilistik ($0 < P < 1$).",
      "Trik Modalitas Jawaban UTBK: Jika premis bertolak dari sampel survei (misal 500 responden), kesimpulan yang menggunakan kata 'pasti', 'selalu', atau 'seluruhnya' adalah SALAH. Pilih opsi simpulan yang menggunakan kata pembatas modalitas: 'sebagian besar', 'cenderung', atau 'pada umumnya'."
    ],
    common_pitfalls: [
      "Menganggap generalisasi sempurna tidak valid hanya karena tidak menggunakan metode sampling statistik.",
      "Membuat klaim kepastian mutlak padahal populasi yang diteliti tidak terbatas (misalnya menyatakan 'seluruh burung gagak pasti hitam' hanya karena belum pernah melihat burung gagak albino).",
      "Menganggap kata penanda probabilitas (*cenderung*) sebagai tanda bahwa argumen tersebut lemah, padahal dalam sains empiris, kata penanda tersebut adalah syarat keabsahan metodologis."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.1.2-ex1",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Seorang wali kelas memeriksa kelengkapan seragam seluruh 32 siswa kelas XII-B pada upacara bendera hari Senin. Setelah memeriksa siswa nomor absen 1 hingga 32 secara satu per satu tanpa ada yang terlewat, wali kelas mencatat bahwa seluruh siswa mengenakan dasi dan topi lengkap. Wali kelas kemudian membuat laporan: *'Seluruh siswa kelas XII-B mematuhi tata tertib atribut upacara hari ini.'*",
      svg_illustration: null,
      question_markdown: "Berdasarkan stimulus di atas, jenis generalisasi dan sifat kepastian kesimpulan wali kelas tersebut adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Generalisasi parsial, dan kesimpulannya bersifat probabilistik karena hanya diamati pada hari Senin." },
        { key: "B", text_markdown: "Generalisasi sempurna, dan kesimpulannya bersifat mutlak benar karena seluruh anggota populasi kelas terperiksa." },
        { key: "C", text_markdown: "Generalisasi parsial, karena jumlah 32 siswa tidak mencukupi untuk mewakili populasi satu sekolah." },
        { key: "D", text_markdown: "Penalaran silogisme alternatif, karena terdapat opsi memakai dasi atau topi." },
        { key: "E", text_markdown: "Generalisasi tergesa-gesa, karena wali kelas tidak melakukan uji statistik independen." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Tentukan subjek dan populasi sasaran kesimpulan: Subjeknya adalah 'siswa kelas XII-B pada upacara hari ini'.\n2. Hitung cakupan pengamatan: Populasi kelas terdiri dari 32 siswa, dan seluruh nomor absen 1 s.d. 32 diperiksa langsung tanpa ada yang terlewat ($n = N = 32$).\n3. Klasifikasikan jenis generalisasi: Karena seluruh anggota populasi tertutup diamati secara tuntas, proses ini dinamakan **Generalisasi Sempurna (*Complete Induction*)**.\n4. Tingkat kepastian: Pada generalisasi sempurna, kesimpulannya bernilai **mutlak benar (100%)**, setara dengan kepastian deduktif.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nPopulasi spesifik kelas XII-B = 32 siswa.\nYang diperiksa = 32 siswa (100% tuntas).\n100% diperiksa = **Generalisasi Sempurna** $\\implies$ Sifatnya **Mutlak Benar**. Langsung pilih **B**."
    },
    {
      example_id: "pu-1.1.2-ex2",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Lembaga Survei Konsumen Nasional melakukan penelitian terhadap kepuasan pengguna layanan e-commerce di Indonesia. Dari 4.000 responden yang dipilih secara acak di 20 kota besar, sebanyak 3.320 responden menyatakan sangat puas dengan kecepatan pengiriman paket belanjaan daring.",
      svg_illustration: null,
      question_markdown: "Berdasarkan data penelitian tersebut, rumusan kesimpulan berikut yang PALING SAH dan tepat secara kaidah penalaran generalisasi ilmiah adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Seluruh pengguna e-commerce di Indonesia pasti merasa puas terhadap kecepatan pengiriman paket." },
        { key: "B", text_markdown: "Kecepatan pengiriman paket di Indonesia tidak akan pernah mengalami keterlambatan di masa mendatang." },
        { key: "C", text_markdown: "Sebagian besar pengguna e-commerce di perkotaan Indonesia cenderung merasa puas terhadap kecepatan pengiriman paket." },
        { key: "D", text_markdown: "Konsumen e-commerce yang tidak puas hanyalah kelompok masyarakat di luar 20 kota besar tersebut." },
        { key: "E", text_markdown: "Penelitian ini membuktikan secara mutlak bahwa seluruh layanan ekspedisi telah bekerja sempurna." }
      ],
      correct_answer: "C",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Identifikasi sifat penelitian: Populasi pengguna e-commerce di Indonesia berjumlah puluhan juta orang (terbuka/sangat besar), sedangkan data berasal dari sampel 4.000 responden di 20 kota.\n2. Tentukan jenis generalisasi: Ini adalah **generalisasi tidak sempurna (parsial/sampel)**.\n3. Aturan penarikan kesimpulan parsial: Kesimpulan tidak boleh menggunakan klaim mutlak atau deterministik ('seluruh pasti', 'tidak akan pernah', 'membuktikan secara mutlak'). Opsi A, B, dan E otomatis gugur.\n4. Evaluasi diksi modalitas: Opsi C menggunakan kata penanda probabilitas yang tepat (*'sebagian besar... cenderung merasa puas'*), mencerminkan $3.320 / 4.000 = 83\\%$ serta membatasi ruang lingkup pada perkotaan sesuai metodologi sampel.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nEliminasi opsi beracun dengan kata mutlak: A ('seluruh pasti'), B ('tidak akan pernah'), E ('secara mutlak'). Opsi D berasumsi tanpa dasar data. Tersisa **C** yang menggunakan frasa terukur ilmiah ('sebagian besar... cenderung')."
    },
    {
      example_id: "pu-1.1.2-ex3",
      difficulty: "hard",
      question_type: "reading_comprehension",
      context_markdown: "Sebuah tim sosiolog merilis hasil riset tentang pola konsumsi media digital di kalangan pelajar SMA di Kota Y. Tim tersebut mewawancarai 600 pelajar dari 15 sekolah negeri dan swasta. Dalam laporannya, ketua tim menuliskan kesimpulan: *'Pelajar SMA di Kota Y umumnya menghabiskan waktu lebih dari empat jam sehari untuk mengakses media sosial berbasis video pendek, sehingga berpotensi mengalami penurunan konsentrasi saat belajar mandiri.'*\n\nSeorang pembaca mengkritik laporan tersebut dan berpendapat bahwa kesimpulan itu lemah dan tidak dapat diterima karena masih menyisakan kata 'umumnya' dan 'berpotensi', bukan menyatakan kepastian mutlak.",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip metodologi penalaran logis, bagaimanakah penilaian yang paling tepat terhadap kritik pembaca tersebut?",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Kritik pembaca tepat, karena kesimpulan ilmiah yang baik harus selalu berupa hukum kepastian mutlak tanpa keraguan." },
        { key: "B", text_markdown: "Kritik pembaca keliru, karena riset tersebut merupakan generalisasi tidak sempurna (berbasis sampel), sehingga penggunaan kata penanda probabilitas merupakan keharusan logis agar tidak terjadi overgeneralisasi." },
        { key: "C", text_markdown: "Kritik pembaca tepat, karena tim peneliti seharusnya memeriksa seluruh pelajar SMA di Kota Y agar kesimpulannya menjadi deduktif murni." },
        { key: "D", text_markdown: "Kritik pembaca keliru, karena kata 'umumnya' menunjukkan bahwa penelitian tersebut menggunakan metode deduktif silogistik." },
        { key: "E", text_markdown: "Kritik pembaca tepat, karena penggunaan kata 'berpotensi' membuktikan bahwa instrumen kuesioner yang digunakan peneliti tidak valid." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Analisis objek kritik: Pembaca menuntut agar kesimpulan dari 600 sampel dinyatakan secara mutlak tanpa kata penanda probabilitas (*'umumnya'* dan *'berpotensi'*).\n2. Evaluasi metodologis: Riset sosial berbasis 600 sampel dari populasi pelajar satu kota merupakan **generalisasi tidak sempurna (parsial)**. Dalam penalaran induktif parsial, kesimpulan **tidak boleh** dinyatakan mutlak. Jika peneliti menyatakan 'seluruh pelajar pasti...', peneliti justru melakukan cacat logika *hasty generalization* (generalisasi berlebihan).\n3. Kesimpulan: Kritik pembaca justru bertentangan dengan kaidah dasar logika induktif. Penggunaan kata 'umumnya' dan 'berpotensi' adalah syarat keharusan logis (*epistemic modesty*) untuk menjaga validitas klaim hasil sampel.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nKritik menuntut riset sampel berbunyi 'mutlak 100%'. Tuntutan ini salah kaprah dalam sains dan logika. Maka 'kritik pembaca keliru'. Antara opsi B dan D, jelas B yang tepat karena menjelaskan hakikat generalisasi tidak sempurna berbasis sampel."
    }
  ]
};

// -------------------------------------------------------------
// ITEM 3: pu-1.1.3
// -------------------------------------------------------------
const item3 = {
  metadata: {
    id: "pu-1.1.3",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Generalisasi (Generalization)",
    title: "Syarat Validitas dan Pengujian Generalisasi",
    micro_syllabus_covered: [
      "Kuantitas Sampel: kecukupan jumlah kasus khusus untuk mewakili populasi.",
      "Representativitas (Keterwakilan) Sampel: variasi sampel terhadap heterogenitas populasi.",
      "Penanganan Pengecualian (Outlier/Anomali): bagaimana data ekstrem memengaruhi kekuatan kesimpulan."
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    concept_markdown: `Tidak semua penalaran induktif memiliki bobot yang sama. Sebuah generalisasi dapat berstatus **kuat (*strong*)** dan meyakinkan (*cogent*), atau justru **lemah (*weak*)** dan cacat nalar (*fallacious*). Dalam soal Penalaran Umum UTBK-SNBT, pengujian validitas generalisasi diukur melalui tiga pilar fundamental: **Kuantitas Sampel**, **Representativitas Sampel**, dan **Penanganan Pengecualian (Outlier/Anomali)**.

### 1. Kuantitas Sampel (Kecukupan Jumlah Kasus Khusus)

Kuantitas sampel mengacu pada kecukupan rasio ukuran sampel ($n$) terhadap total populasi ($N$) serta variabilitas data yang diteliti.

* **Hukum Bilangan Besar (*Law of Large Numbers*):** Semakin besar jumlah observasi acak yang diambil dari populasi, rata-rata karakteristik sampel akan semakin mendekati parameter populasi yang sebenarnya.
* **Kekeliruan Generalisasi Tergesa-gesa (*Hasty Generalization*):**
  * Terjadi ketika kesimpulan universal ditarik hanya dari satu, dua, atau segelintir kasus khusus yang tidak memadai secara kuantitas.
  * Contoh Cacat Nalar: *"Saya makan di warung makan X dua kali dan sambalnya terlalu pedas. Jadi, semua makanan di warung makan X rasanya terlalu pedas."* (Menyimpulkan seluruh menu hanya dari 2 sampel).

### 2. Representativitas (Keterwakilan) Sampel terhadap Heterogenitas Populasi

Jumlah sampel yang besar **tidak ada artinya** jika sampel tersebut bias atau tidak mewakili keberagaman (*heterogeneity*) populasi.

* **Heterogenitas vs Homogenitas Populasi:**
  * Jika populasi bersifat **homogen sempurna** (misal: komposisi zat kimia dalam larutan murni, golongan darah pada satu kantong darah), maka 1 tetes sampel sudah cukup untuk mewakili seluruh galon cairan.
  * Jika populasi bersifat **heterogen** (misal: preferensi politik, gaya belajar siswa, daya beli masyarakat), sampel wajib diambil dari seluruh strata/variasi populasi secara proporsional.
* **Bias Seleksi (*Sampling Bias*):**
  * Terjadi ketika teknik pengambilan sampel secara sistematis mengecualikan segmen populasi tertentu.
  * Contoh Klasik (*Literary Digest 1936*): Survei terhadap 2,4 juta orang salah memprediksi hasil pemilu AS karena kuesioner hanya disebarkan via buku telepon dan registrasi kepemilikan mobil mewah, mengabaikan jutaan warga kelas pekerja yang terdampak Depresi Besar.

### 3. Penanganan Pengecualian (Outlier/Anomali)

Data pencilan (*outlier*) atau bukti penyangkal (*counter-example*) merupakan batu uji utama bagi kekuatan generalisasi induktif.

* **Prinsip Angsa Hitam (*Black Swan Problem*):**
  * Pengamatan jutaan angsa putih selama berabad-abad tidak pernah membuktikan kesimpulan mutlak *"Semua angsa berwarna putih"*. Namun, penemuan satu ekor angsa hitam di Australia langsung membuktikan bahwa kesimpulan universal tersebut salah.
* **Dua Pendekatan Metodologis Menangani Anomali:**
  1. **Revisi dan Pembatasan Klaim (*Scope Restriction*):** Mengubah cakupan kesimpulan dari mutlak universal menjadi kondisional/terbatas (misal: *"Sebagian besar X adalah Y, kecuali jika kondisi Z terpenuhi"*).
  2. **Investigasi Variabel Perancu (*Confounding Variable*):** Meneliti apakah kasus outlier tersebut disebabkan oleh faktor eksternal atau kesalahan pengukuran instrumen.
  * **Pantangan Ilmiah:** Menghapus atau menyembunyikan data anomali secara sengaja (*cherry-picking*) demi memaksakan kesimpulan awal. Tindakan ini merusak integritas penalaran.

Berikut visualisasi diagram tiga pilar pengujian validitas generalisasi:

[[SVG:svg-pu-1-3]]

### 4. Matriks Evaluasi Kekuatan Argumen Generalisasi

| Kondisi Sampel | Representativitas | Anomali / Pengecualian | Status Kesimpulan |
| :--- | :--- | :--- | :--- |
| **Besar ($n$ memadai)** | **Tinggi (Proporsional heterogen)** | **Dianalisis & dimitigasi** | **Sangat Kuat (*Strong & Cogent*)** |
| Kecil ($n$ sangat sedikit) | Rendah (Hanya 1 lokasi) | Diabaikan | **Cacat Nalar (*Hasty Generalization*)** |
| Sangat Besar ($n$ jutaan) | Rendah (Bias kelompok tertentu) | Ditutupi (*cherry-picking*) | **Cacat Metodologi (*Selection Bias*)** |
| Kecil | Tinggi (Homogenitas terbukti) | Tidak ditemukan | **Cukup Kuat (*Conditionally Strong*)** |`,
    visualizations_svg: [
      {
        id: "svg-pu-1-3",
        title: "Tiga Pilar Validitas Pengujian Generalisasi",
        caption: "Validitas kesimpulan generalisasi ditopang secara seimbang oleh kuantitas sampel yang memadai, keterwakilan (representativitas) terhadap heterogenitas populasi, dan ketelitian menangani anomali.",
        svg_code: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <rect width="600" height="360" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  <text x="300" y="38" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#0f172a">Tiga Pilar Validitas Generalisasi</text>

  <!-- Pillar 1: Kuantitas -->
  <rect x="50" y="70" width="155" height="210" rx="10" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="2"/>
  <circle cx="127" cy="115" r="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <text x="127" y="122" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#0284c7">N</text>
  <text x="127" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0369a1">Kuantitas</text>
  <text x="127" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#0284c7">Kecukupan Sampel</text>
  <line x1="65" y1="200" x2="190" y2="200" stroke="#bae6fd" stroke-width="1.5"/>
  <text x="127" y="222" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Law of Large Numbers</text>
  <text x="127" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Rasio n/N Memadai</text>
  <text x="127" y="262" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#b91c1c">Cegah Hasty Generaliz.</text>

  <!-- Pillar 2: Representativitas -->
  <rect x="222" y="70" width="155" height="210" rx="10" fill="#fdf4ff" stroke="#f0abfc" stroke-width="2"/>
  <circle cx="300" cy="115" r="28" fill="#fae8ff" stroke="#c026d3" stroke-width="2"/>
  <text x="300" y="122" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#c026d3">R</text>
  <text x="300" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#a21caf">Keterwakilan</text>
  <text x="300" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#c026d3">Heterogenitas</text>
  <line x1="237" y1="200" x2="362" y2="200" stroke="#f5d0fe" stroke-width="1.5"/>
  <text x="300" y="222" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Proporsi Karakteristik</text>
  <text x="300" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Random Stratified</text>
  <text x="300" y="262" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#b91c1c">Bebas Selection Bias</text>

  <!-- Pillar 3: Outlier / Anomali -->
  <rect x="395" y="70" width="155" height="210" rx="10" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="2"/>
  <circle cx="472" cy="115" r="28" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="472" y="122" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#059669">A</text>
  <text x="472" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#047857">Anomali</text>
  <text x="472" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#059669">Data Outlier</text>
  <line x1="410" y1="200" x2="535" y2="200" stroke="#a7f3d0" stroke-width="1.5"/>
  <text x="472" y="222" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Black Swan Problem</text>
  <text x="472" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">Revisi Batasan Klaim</text>
  <text x="472" y="262" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#b91c1c">Anti Cherry-Picking</text>

  <!-- Bottom Evaluation Result Bar -->
  <rect x="50" y="295" width="500" height="45" rx="8" fill="#1e293b"/>
  <text x="300" y="323" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Ketiga Pilar Terpenuhi = Argumen Kuat &amp; Meyakinkan (Strong &amp; Cogent)</text>
</svg>`
      }
    ],
    formulas_and_quick_tricks: [
      "Kekuatan Generalisasi $\\propto \\frac{\\text{Kuantitas Sampel} \\times \\text{Representativitas}}{\\text{Jumlah Anomali yang Diabaikan}}$.",
      "Deteksi Bias Lokasi Soal PU: Jika survei mengenai minat baca hanya dilakukan di perpustakaan atau toko buku, sampel tersebut mengalami *selection bias* $\\implies$ kesimpulan TIDAK representatif terhadap masyarakat umum.",
      "Aturan Angsa Hitam (*Single Counter-Instance*): Pernyataan universal 'Semua A adalah B' langsung gugur cukup dengan ditemukannya 1 bukti valid 'A yang bukan B'."
    ],
    common_pitfalls: [
      "Mengira bahwa ukuran sampel jutaan responden pasti menjamin kebenaran kesimpulan, padahal jika sampelnya bias (*selection bias*), hasilnya tetap cacat.",
      "Melakukan *cherry-picking*, yaitu membuang data sampel yang tidak sesuai dengan hipotesis awal agar hasil tampak seragam.",
      "Mengasumsikan populasi heterogen sebagai homogen, sehingga merasa cukup hanya meneliti satu kelompok kecil."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.1.3-ex1",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Seorang wisatawan berkunjung ke Kota Z selama dua hari. Saat sarapan di hotel, pelayan hotel bersikap kurang ramah kepadanya. Pada siang harinya, seorang sopir taksi di kota tersebut tidak memberikan uang kembalian. Wisatawan tersebut kemudian menulis di blog perjalanannya: *'Penduduk Kota Z memiliki kepribadian yang kasar dan tidak menghargai wisatawan.'*",
      svg_illustration: null,
      question_markdown: "Kelemahan paling mendasar dari kesimpulan wisatawan tersebut menurut prinsip penalaran induktif adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Wisatawan tersebut menggunakan bahasa yang terlalu santun dalam menulis blog." },
        { key: "B", text_markdown: "Kesimpulan ditarik dari jumlah kasus yang sangat sedikit (hanya dua orang) untuk menggeneralisasi seluruh populasi penduduk kota (*hasty generalization*)." },
        { key: "C", text_markdown: "Wisatawan tidak menyertakan foto dan rekaman video sebagai bukti empiris pendukung." },
        { key: "D", text_markdown: "Wisatawan menggunakan penalaran deduktif yang premis mayornya telah terbukti salah." },
        { key: "E", text_markdown: "Sopir taksi dan pelayan hotel bukan merupakan warga negara Indonesia yang sah." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Identifikasi data sampel: Wisatawan hanya berinteraksi dengan 2 orang (1 pelayan hotel + 1 sopir taksi).\n2. Identifikasi populasi sasaran kesimpulan: Seluruh penduduk Kota Z (ratusan ribu hingga jutaan orang).\n3. Evaluasi kuantitas sampel: Dua kasus jelas sangat tidak mencukupi untuk menggambarkan karakter seluruh warga kota yang sangat heterogen.\n4. Klasifikasi cacat logika: Menarik kesimpulan umum dari ukuran sampel yang terlalu kecil adalah bentuk klasik dari **generalisasi tergesa-gesa (*hasty generalization*)**.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nCek rasio sampel terhadap kesimpulan:\nSampel: 2 orang $\\rightarrow$ Kesimpulan: 'Semua penduduk kota Z'.\nSampel teramat sedikit untuk kesimpulan raksasa = **Hasty Generalization** (Generalisasi Tergesa-gesa). Opsi tepat adalah **B**."
    },
    {
      example_id: "pu-1.1.3-ex2",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Sebuah platform media sosial ingin mengetahui tingkat kepuasan fitur terbarunya. Mereka mengadakan survei daring secara sukarela melalui pop-up notifikasi aplikasi pada pukul 13.00-14.00 di hari kerja. Dari 50.000 pengguna yang mengisi survei, 92% menyatakan sangat menyukai fitur tersebut. Berdasarkan hasil ini, manajemen menyimpulkan bahwa fitur baru tersebut sangat disukai oleh seluruh demografi pengguna di Indonesia.",
      svg_illustration: null,
      question_markdown: "Meskipun jumlah responden mencapai 50.000 pengguna, faktor utama yang paling berpotensi MELEMAHKAN keabsahan generalisasi kesimpulan manajemen adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Waktu survei satu jam di siang hari kerja dan metode sukarela menimbulkan bias seleksi, sehingga sampel tidak merepresentasikan pengguna dari kelompok pekerja sibuk, pelajar, dan wilayah zona waktu lain." },
        { key: "B", text_markdown: "Angka 50.000 pengguna masih jauh lebih kecil daripada jumlah penduduk Indonesia yang mencapai 278 juta jiwa." },
        { key: "C", text_markdown: "Persentase kepuasan 92% belum mencapai batas konsensus mutlak 100%." },
        { key: "D", text_markdown: "Survei daring secara hukum tidak dapat dijadikan acuan pengambilan keputusan perusahaan teknologi." },
        { key: "E", text_markdown: "Pengguna yang mengisi survei daring cenderung memiliki koneksi internet yang lebih cepat daripada yang tidak mengisi." }
      ],
      correct_answer: "A",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Evaluasi kuantitas vs representativitas: Meskipun kuantitas sampel besar (50.000 responden), metode pengambilan sampel (*voluntary response* dan jam 13.00-14.00 hari kerja) sangat selektif.\n2. Identifikasi bias representativitas (*Sampling Bias / Selection Bias*):\n   - Mereka yang aktif mengisi survei sukarela di jam kerja umumnya hanya segmen tertentu (misal: orang yang sedang luang atau memiliki ketertarikan ekstrem).\n   - Menyingkirkan kelompok pekerja aktif, pelajar yang sedang di sekolah, serta perbedaan waktu (WITA/WIT).\n3. Dampak terhadap kesimpulan: Manajemen mengklaim kesimpulan untuk *'seluruh demografi pengguna di Indonesia'*. Karena sampel tidak representatif terhadap heterogenitas demografi, generalisasi tersebut lemah secara metodologis.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nKunci: *Kuantitas besar TIDAK menjamin keterwakilan jika metode pengambilan sampel bias.* Survei pop-up sukarela di jam kerja = **Bias Seleksi (Representativitas Rendah)**. Opsi yang secara ilmiah menjelaskan bias ini adalah **A**."
    },
    {
      example_id: "pu-1.1.3-ex3",
      difficulty: "hard",
      question_type: "reading_comprehension",
      context_markdown: "Perhatikan cuplikan laporan pengujian obat herbal berikut:\n\n*'Sebuah uji klinis formula herbal antihipertensi dilakukan terhadap 800 pasien dengan rentang usia 35-65 tahun selama 12 minggu. Pada 782 pasien (97,75%), tekanan darah sistolik berhasil turun ke rentang normal ($< 120\\text{ mmHg}$). Namun, pada 18 pasien (2,25%), tekanan darah justru meningkat di atas $150\\text{ mmHg}$ disertai reaksi alergi kulit.'*\n\nDalam draf laporan awal, tim peneliti merekomendasikan: *'Formula herbal ini aman dan efektif menyembuhkan hipertensi pada semua penderita tanpa efek samping.'*",
      svg_illustration: null,
      question_markdown: "Berdasarkan prinsip penanganan pengecualian (outlier/anomali) dalam penalaran induktif, langkah korektif yang paling tepat dan bertanggung jawab secara ilmiah yang harus diambil oleh tim peneliti adalah...",
      statements: null,
      complex_table: null,
      options: [
        { key: "A", text_markdown: "Menghapus data 18 pasien tersebut dari laporan akhir karena persentasenya sangat kecil ($< 3\\%$) dan dianggap sebagai kesalahan acak instrumen." },
        { key: "B", text_markdown: "Mengubah klaim kesimpulan universal ('semua penderita tanpa efek samping') menjadi klaim kondisional dengan menjelaskan kontraindikasi pada kelompok pasien anomali tersebut." },
        { key: "C", text_markdown: "Menyimpulkan bahwa formula herbal tersebut gagal total dan tidak memiliki khasiat apa pun bagi penderita hipertensi." },
        { key: "D", text_markdown: "Mengulangi pengujian dengan hanya memilih pasien yang telah dipastikan akan merespons positif terhadap herbal tersebut." },
        { key: "E", text_markdown: "Menyatakan bahwa 18 pasien tersebut memiliki gaya hidup yang buruk tanpa perlu meneliti riwayat medis mereka." }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Konseptual:**\n1. Identifikasi masalah klaim: Draf laporan mengklaim kesimpulan universal mutlak: *'menyembuhkan hipertensi pada semua penderita tanpa efek samping'*.\n2. Identifikasi bukti empiris: Terdapat 18 pasien (2,25%) yang mengalami anomali serius (tekanan darah melonjak dan alergi).\n3. Evaluasi integritas ilmiah & penalaran induktif:\n   - Mengabaikan atau menghapus data anomali (opsi A dan D) adalah tindakan tercela (*cherry-picking / data fabrication*).\n   - Menolak seluruh hasil yang 97,75% berhasil (opsi C) adalah reaksi ekstrem yang mengabaikan efikasi mayoritas.\n4. Solusi tepat: Menghadapi anomali dalam generalisasi dilakukan dengan **Revisi dan Pembatasan Klaim (*Scope Restriction*)**: mengakui keberhasilan pada sebagian besar responden dan secara eksplisit merumuskan batasan/kontraindikasi bagi kelompok yang berisiko mengalami efek samping.",
      quick_trick_markdown: "**Strategi Cepat UTBK:**\nPrinsip menghadapi anomali/pengecualian:\n1. Jangan hapus data (anti cherry-picking) $\\rightarrow$ coret A dan D.\n2. Jangan reaktif ekstrem $\\rightarrow$ coret C.\n3. Jangan menyalahkan subjek tanpa bukti $\\rightarrow$ coret E.\n4. Langkah ilmiah yang benar = **Batasi klaim secara proporsional & jelaskan anomali/kontraindikasi** $\\implies$ **B**."
    }
  ]
};

// Write files
fs.writeFileSync(path.join(outDir, 'pu-1.1.1.json'), JSON.stringify(item1, null, 2), 'utf8');
console.log('Created: public/content/utbk/pu/pu-1.1.1.json');

fs.writeFileSync(path.join(outDir, 'pu-1.1.2.json'), JSON.stringify(item2, null, 2), 'utf8');
console.log('Created: public/content/utbk/pu/pu-1.1.2.json');

fs.writeFileSync(path.join(outDir, 'pu-1.1.3.json'), JSON.stringify(item3, null, 2), 'utf8');
console.log('Created: public/content/utbk/pu/pu-1.1.3.json');
