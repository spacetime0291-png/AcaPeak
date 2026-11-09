import type { Material } from '../../../types/material';

export const MATERIAL_PU_03_05: Material = {
  "metadata": {
    "id": "pu-3-5",
    "subtest": "PU",
    "chapter_num": 3,
    "chapter_title": "Penalaran Kuantitatif",
    "subchapter_num": "3.5",
    "subchapter_title": "Interpretasi Data (Tabel, Grafik, Diagram)",
    "title": "Interpretasi Data (Tabel, Grafik, Diagram)",
    "required_question_variations": [
      "Analisis Persentase Perubahan dan Rasio pada Tabel Statistik",
      "Membaca Tren dan Titik Ekstrem pada Grafik Garis dan Batang",
      "Evaluasi Simpulan Pernyataan Berdasarkan Data Majemuk (HOTS)"
    ],
    "requires_svg": true,
    "updated_at": "2026-11-08"
  },
  "content": {
    "tactical_overview": "Interpretasi data adalah materi penalaran kuantitatif yang paling sering menguras waktu ujian jika tidak dihadapi dengan teknik eliminasi dan estimasi yang cerdas. Pembuat soal UTBK sengaja menyajikan tabel atau grafik yang padat angka untuk memancing siswa menghitung rata-rata atau persentase secara detail. Kunci suksesnya adalah jangan pernah menghitung seluruh tabel: baca pertanyaan terlebih dahulu, temukan baris atau kolom yang relevan saja, dan kuasai perbedaan mendasar antara kenaikan nominal (selisih pengurangan biasa) dengan kenaikan persentase (selisih dibagi nilai awal).",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nMembaca data statistik di UTBK SNBT menuntut kecepatan dan ketepatan penalaran numerik:\n\n1. **Perbedaan Kenaikan Nominal vs Kenaikan Persentase**  \n   Ini adalah konsep paling sering diuji dan paling banyak memakan korban jebakan di UTBK:  \n   - **Kenaikan Nominal (Selisih Mutlak):**  \n     $\\Delta = \\text{Nilai Akhir} - \\text{Nilai Awal}$  \n   - **Kenaikan Relatif / Persentase (Pertumbuhan):**  \n     $\\%\\Delta = \\frac{\\text{Nilai Akhir} - \\text{Nilai Awal}}{\\text{Nilai Awal}} \\times 100\\% = \\frac{\\Delta}{\\text{Awal}} \\times 100\\%$  \n   *Contoh:* Angka naik dari $10$ ke $20$ memiliki $\\Delta = 10$, namun persentase kenaikannya mencapai $100\\%$. Sebaliknya, angka naik dari $100$ ke $120$ memiliki $\\Delta = 20$ (nominal lebih besar), tetapi persentase kenaikannya hanya $20\\%$.\n\n2. **Membaca Grafik Batang dan Grafik Garis**  \n   - Perhatikan **satuan pada sumbu vertikal** (dalam jutaan, ribuan ton, atau persen).  \n   - Perhatikan apakah grafik memiliki **sumbu ganda (dual axis)** di mana sumbu kiri dan kanan menggunakan skala yang berbeda.  \n   - Kemiringan garis (*slope*) menggambarkan laju perubahan: semakin curam garis naik, semakin tinggi laju pertumbuhannya.\n\n3. **Evaluasi Kebenaran Pernyataan Majemuk (Soal HOTS)**  \n   Soal menyajikan 5 pernyataan pilihan ganda dan meminta Anda menentukan pernyataan yang *pasti benar* atau *pasti salah*.  \n   - Teknik pengerjaan: Gunakan metode eliminasi cepat dengan membantah opsi yang memuat angka ekstrim atau opsi yang klaimnya bertolak belakang dengan grafik.\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\n1. **Jebakan Menyamakan Kenaikan Tertinggi dengan Persentase Tertinggi**  \n   Soal menanyakan *\"komoditas dengan persentase pertumbuhan tertinggi\"*, namun siswa justru memilih komoditas dengan kenaikan nominal terbesar.\n2. **Jebakan Mengabaikan Nilai Basis Awal (*Base Effect Trap*)**  \n   Kenaikan nominal kecil pada nilai awal yang sangat kerdil dapat menghasilkan persentase lonjakan yang masif (misal: naik dari 2 ke 6 adalah kenaikan 200%). Jangan tertipu hanya melihat besaran angka akhir.\n3. **Jebakan Salah Membaca Label Tahun atau Kategori**  \n   Siswa membaca data tahun 2023 padahal yang ditanyakan adalah perubahan antara tahun 2021 dan 2022.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\n1. **Baca Pertanyaan Sebelum Melirik Tabel**  \n   Ketahui apa yang dicari (nama komoditas, tahun tertentu, atau persentase) sebelum mata Anda tenggelam dalam belantara angka tabel.\n2. **Gunakan Perbandingan Pecahan Silang untuk Persentase Terbesar**  \n   Untuk membandingkan apakah $\\frac{15}{40}$ lebih besar dari $\\frac{18}{50}$:  \n   Kalikan silang: $15 \\times 50 = 750$ vs $40 \\times 18 = 720$.  \n   Karena $750 > 720$, maka $\\frac{15}{40}$ pasti lebih besar tanpa perlu menghitung desimalnya!\n3. **Uji Opsi dari yang Paling Mudah Diverifikasi**  \n   Pada soal evaluasi pernyataan, uji terlebih dahulu opsi yang hanya memerlukan pembacaan satu titik grafik sebelum menguji opsi yang memerlukan perhitungan rata-rata.\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Materi:** Kemampuan mengekstraksi kesimpulan numerik yang akurat dari tabel dan visualisasi data.\n- **Kaidah Emas:** Persentase perubahan selalu dibagi dengan nilai awal:\n  $\\%\\Delta = \\frac{\\Delta}{\\text{Awal}} \\times 100\\%$\n- **Strategi Eksekusi:** Baca pertanyaan dulu, gunakan perkalian silang untuk membandingkan laju pertumbuhan, dan eliminasi opsi yang salah membaca skala sumbu.\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Interpretasi Data yang paling sering keluar pada naskah UTBK SNBT, lengkap dengan konteks tabel, opsi pilihan ganda utuh, kunci jawaban, dan pembahasan logika secara terperinci:\n\n### Variasi 1: Analisis Persentase Perubahan pada Tabel Statistik\n\n[[SVG:svg-pu-03-05-barchart]]\n\n\n> **Konteks Tabel Data Soal:**  \n> Tabel berikut menunjukkan volume penjualan mobil (dalam unit) dari empat dealer mobil selama tahun 2024 dan 2025:  \n> | Dealer | Penjualan 2024 | Penjualan 2025 |  \n> | :--- | :---: | :---: |  \n> | Dealer Alpha | 200 | 260 |  \n> | Dealer Beta | 120 | 180 |  \n> | Dealer Gamma | 400 | 480 |  \n> | Dealer Delta | 500 | 575 |  \n>  \n> **Pertanyaan UTBK:** *Dealer yang mencatatkan persentase kenaikan penjualan TERTINGGI dari tahun 2024 ke 2025 adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Dealer Alpha  \n> - **B.** Dealer Beta  \n> - **C.** Dealer Gamma  \n> - **D.** Dealer Delta  \n> - **E.** Dealer Gamma dan Delta sama tinggi\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Kenaikan Nominal vs Kenaikan Persentase Tiap Dealer:**  \n  - **Dealer Alpha:**  \n    Kenaikan nominal $= 260 - 200 = 60\\text{ unit}$.  \n    Persentase kenaikan $= \\frac{60}{200} \\times 100\\% = 30\\%$.\n  - **Dealer Beta:**  \n    Kenaikan nominal $= 180 - 120 = 60\\text{ unit}$.  \n    Persentase kenaikan $= \\frac{60}{120} \\times 100\\% = 50\\%$.\n  - **Dealer Gamma:**  \n    Kenaikan nominal $= 480 - 400 = 80\\text{ unit}$ (secara nominal adalah yang tertinggi!).  \n    Persentase kenaikan $= \\frac{80}{400} \\times 100\\% = 20\\%$.\n  - **Dealer Delta:**  \n    Kenaikan nominal $= 575 - 500 = 75\\text{ unit}$.  \n    Persentase kenaikan $= \\frac{75}{500} \\times 100\\% = 15\\%$.\n- **Perbandingan Hasil:**  \n  Meskipun Dealer Gamma memiliki kenaikan nominal terbesar ($80\\text{ unit}$), persentase kenaikan tertinggi dipegang oleh **Dealer Beta** dengan kenaikan mencapai **$50\\%$** karena nilai basis awalnya yang lebih kecil.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan C Salah (Jebakan Utama):** Terkecoh memilih Dealer Gamma karena nominalnya naik 80 unit.  \n  - **Pilihan A, D, E Salah:** Persentase kenaikan Alpha (30%) dan Delta (15%) lebih rendah daripada Beta (50%).\n- **Penerapan Trik Cepat (15 Detik):** Bandingkan rasio pertumbuhan masing-masing dealer:\n  - **Dealer Alpha:** $\\frac{60}{200} = \\frac{3}{10} = 30\\%$\n  - **Dealer Beta:** $\\frac{60}{120} = \\frac{1}{2} = 50\\%$ *(Juara Kenaikan!)*\n  - **Dealer Gamma:** $\\frac{80}{400} = \\frac{1}{5} = 20\\%$\n  Jelas bahwa Dealer Beta memimpin pertumbuhan tertinggi ($50\\%$). Jawaban pasti **B**.\n\n---\n\n### Variasi 2: Membaca Tren dan Titik Ekstrem pada Grafik / Data Deret\n\n> **Konteks Data Soal:**  \n> Catatan laba bersih (dalam miliar rupiah) sebuah perusahaan rintisan selama lima caturwulan berturut-turut adalah sebagai berikut:  \n> - Caturwulan I: Rp15 Miliar  \n> - Caturwulan II: Rp18 Miliar  \n> - Caturwulan III: Rp12 Miliar  \n> - Caturwulan IV: Rp24 Miliar  \n> - Caturwulan V: Rp30 Miliar  \n>  \n> **Pertanyaan UTBK:** *Laju kenaikan laba bersih tertinggi dalam satu periode caturwulan berturut-turut terjadi pada perpindahan dari...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Caturwulan I ke Caturwulan II  \n> - **B.** Caturwulan II ke Caturwulan III  \n> - **C.** Caturwulan III ke Caturwulan IV  \n> - **D.** Caturwulan IV ke Caturwulan V  \n> - **E.** Caturwulan I ke Caturwulan V\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Laju Perubahan Tiap Periode:**  \n  - **Periode I ke II:** Naik dari $15$ ke $18$ $\\implies \\frac{18 - 15}{15} = \\frac{3}{15} = 20\\%$.  \n  - **Periode II ke III:** Terjadi **penurunan** (dari 18 ke 12), sehingga gugur.  \n  - **Periode III ke IV:** Naik dari $12$ ke $24$ $\\implies \\frac{24 - 12}{12} = \\frac{12}{12} = 100\\%$ (laba berlipat ganda dua kali lipat!).  \n  - **Periode IV ke V:** Naik dari $24$ ke $30$ $\\implies \\frac{30 - 24}{24} = \\frac{6}{24} = 25\\%$.\n- **Kesimpulan:** Laju kenaikan tertinggi terjadi pada perpindahan dari **Caturwulan III ke Caturwulan IV** dengan lonjakan fantastis sebesar **$100\\%$**.\n- **Mengapa Opsi Lain Salah?**  \n  - Pilihan A dan D laju pertumbuhannya hanya $20\\%$ dan $25\\%$.  \n  - Pilihan B mengalami penurunan laba.  \n  - Pilihan E mencakup empat periode, bukan satu periode berturut-turut.\n- **Penerapan Trik Cepat (15 Detik):** Dari 12 ke 24 adalah kenaikan $100\\%$ (angka berlipat dua). Tidak ada periode lain yang melipatgandakan angka. Jawaban seketika **C**.\n\n---\n\n### Variasi 3: Evaluasi Simpulan Pernyataan Berdasarkan Data Majemuk / HOTS\n\n> **Konteks Tabel Data Soal:**  \n> Tabel statistik kelulusan ujian kompetensi dari tiga sekolah kejuruan tahun 2025:  \n> | Sekolah | Jumlah Siswa Terdaftar | Persentase Kelulusan |  \n> | :--- | :---: | :---: |  \n> | SMK Mandiri | 200 siswa | 90% |  \n> | SMK Prestasi | 300 siswa | 80% |  \n> | SMK Cendekia | 150 siswa | 80% |  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan data tabel tersebut, pernyataan berikut yang **PASTI BENAR** adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Jumlah siswa yang lulus dari SMK Mandiri lebih banyak daripada siswa yang lulus dari SMK Prestasi  \n> - **B.** Jumlah siswa yang TIDAK lulus dari SMK Prestasi sama dengan jumlah siswa yang TIDAK lulus dari SMK Mandiri  \n> - **C.** Jumlah siswa yang lulus dari SMK Prestasi adalah yang terbanyak di antara ketiga sekolah tersebut  \n> - **D.** Total persentase kelulusan gabungan ketiga sekolah tersebut adalah 85%  \n> - **E.** Siswa yang tidak lulus dari SMK Cendekia berjumlah 40 orang\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Kalkulasi Rinci Jumlah Siswa Lulus dan Tidak Lulus:**  \n  - **SMK Mandiri (200 siswa):**  \n    - Lulus $= 90\\% \\times 200 = 180\\text{ siswa}$.  \n    - Tidak Lulus $= 10\\% \\times 200 = 20\\text{ siswa}$.  \n  - **SMK Prestasi (300 siswa):**  \n    - Lulus $= 80\\% \\times 300 = 240\\text{ siswa}$.  \n    - Tidak Lulus $= 20\\% \\times 300 = 60\\text{ siswa}$.  \n  - **SMK Cendekia (150 siswa):**  \n    - Lulus $= 80\\% \\times 150 = 120\\text{ siswa}$.  \n    - Tidak Lulus $= 20\\% \\times 150 = 30\\text{ siswa}$.\n- **Evaluasi Opsi Pilihan Ganda:**  \n  - **Pilihan A Salah:** Lulus Mandiri ($180$) lebih sedikit dari Lulus Prestasi ($240$).  \n  - **Pilihan B Salah:** Tidak lulus Prestasi ($60$) berbeda dengan Mandiri ($20$).  \n  - **Pilihan C BENAR:** Lulus terbanyak adalah SMK Prestasi dengan $240\\text{ siswa}$ (mengungguli Mandiri $180$ dan Cendekia $120$).  \n  - **Pilihan D Salah:** Total lulus $= 180 + 240 + 120 = 540$ dari total $650$ siswa $\\implies \\frac{540}{650} \\approx 83{,}08\\%$ (bukan 85%). Rata-rata persentase tidak boleh dirata-ratakan langsung karena bobot populasinya berbeda.  \n  - **Pilihan E Salah:** Siswa tidak lulus SMK Cendekia adalah $30\\text{ orang}$, bukan $40\\text{ orang}$.\n- **Penerapan Trik Cepat (15 Detik):** Cek jumlah lulus Prestasi: $80\\% \\times 300 = 240$. Ini jauh melampaui total seluruh siswa Mandiri (200) apalagi yang lulus. Maka pernyataan C bahwa Prestasi memiliki jumlah lulus terbanyak sudah pasti benar tanpa perlu menghitung rata-rata gabungan. Pilihan **C** terbukti sah.",
    "visualizations_svg": [
      {
        "id": "svg-pu-03-05-barchart",
        "title": "Komparasi Penjualan Mobil 2024 vs 2025 (Kenaikan Nominal vs Persentase)",
        "caption": "Kenaikan Nominal Terbesar (Gamma: +80) vs Persentase Tertinggi (Beta: +50%)",
        "svg_code": "<svg viewBox=\"0 0 500 350\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full h-auto\">\n  <defs>\n    <style>\n      .bc-title { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; font-weight: 800; fill: #1e293b; text-anchor: middle; }\n      .bc-axis { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; fill: #64748b; text-anchor: end; }\n      .bc-dealer { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; font-weight: 800; fill: #1e293b; text-anchor: middle; }\n      .bc-val { font-family: system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 900; fill: #ffffff; text-anchor: middle; }\n      .bc-pct { font-family: system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 900; text-anchor: middle; }\n      :root.dark .bc-title, :root.dark .bc-dealer { fill: #f8fafc; }\n    </style>\n  </defs>\n\n  <text x=\"250\" y=\"20\" class=\"bc-title\">KOMPARASI KENAIKAN PENJUALAN: NOMINAL vs PERSENTASE</text>\n\n  <!-- Legend -->\n  <g transform=\"translate(155, 30)\">\n    <rect x=\"0\" y=\"0\" width=\"14\" height=\"10\" rx=\"2\" fill=\"#64748b\"/>\n    <text x=\"18\" y=\"9\" fill=\"#64748b\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"700\">Tahun 2024</text>\n    <rect x=\"100\" y=\"0\" width=\"14\" height=\"10\" rx=\"2\" fill=\"#4f46e5\"/>\n    <text x=\"118\" y=\"9\" fill=\"#4f46e5\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"700\">Tahun 2025</text>\n  </g>\n\n  <!-- Grid lines -->\n  <g stroke=\"#cbd5e1\" stroke-width=\"1\" stroke-dasharray=\"4,4\" opacity=\"0.6\">\n    <line x1=\"42\" y1=\"75\" x2=\"495\" y2=\"75\"/>\n    <line x1=\"42\" y1=\"118\" x2=\"495\" y2=\"118\"/>\n    <line x1=\"42\" y1=\"162\" x2=\"495\" y2=\"162\"/>\n    <line x1=\"42\" y1=\"205\" x2=\"495\" y2=\"205\"/>\n    <line x1=\"42\" y1=\"248\" x2=\"495\" y2=\"248\" stroke-dasharray=\"0\" stroke-width=\"1.5\" stroke=\"#94a3b8\"/>\n  </g>\n\n  <!-- Y-Axis Labels -->\n  <text x=\"36\" y=\"79\" class=\"bc-axis\">600</text>\n  <text x=\"36\" y=\"122\" class=\"bc-axis\">400</text>\n  <text x=\"36\" y=\"166\" class=\"bc-axis\">200</text>\n  <text x=\"36\" y=\"252\" class=\"bc-axis\">0</text>\n\n  <!-- GROUP 1: Alpha (center at x=100) -->\n  <g transform=\"translate(56, 0)\">\n    <rect x=\"0\" y=\"191\" width=\"38\" height=\"57\" rx=\"5\" fill=\"#64748b\"/>\n    <text x=\"19\" y=\"213\" class=\"bc-val\">200</text>\n    <rect x=\"42\" y=\"174\" width=\"38\" height=\"74\" rx=\"5\" fill=\"#4f46e5\"/>\n    <text x=\"61\" y=\"198\" class=\"bc-val\">260</text>\n    <rect x=\"15\" y=\"138\" width=\"50\" height=\"25\" rx=\"6\" fill=\"#e0e7ff\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n    <text x=\"40\" y=\"155\" fill=\"#4338ca\" class=\"bc-pct\">+30%</text>\n    <text x=\"40\" y=\"270\" class=\"bc-dealer\">Alpha</text>\n  </g>\n\n  <!-- GROUP 2: Beta (center at x=210 - WINNER) -->\n  <g transform=\"translate(166, 0)\">\n    <rect x=\"-8\" y=\"65\" width=\"96\" height=\"190\" rx=\"9\" fill=\"rgba(16, 185, 129, 0.08)\" stroke=\"#10b981\" stroke-width=\"2.5\"/>\n    <rect x=\"0\" y=\"214\" width=\"38\" height=\"34\" rx=\"5\" fill=\"#64748b\"/>\n    <text x=\"19\" y=\"233\" class=\"bc-val\">120</text>\n    <rect x=\"42\" y=\"197\" width=\"38\" height=\"51\" rx=\"5\" fill=\"#10b981\"/>\n    <text x=\"61\" y=\"220\" class=\"bc-val\">180</text>\n    <rect x=\"-3\" y=\"74\" width=\"86\" height=\"28\" rx=\"6\" fill=\"#10b981\"/>\n    <text x=\"40\" y=\"93\" fill=\"#ffffff\" class=\"bc-pct\">★ +50% (MAX)</text>\n    <text x=\"40\" y=\"270\" class=\"bc-dealer\" fill=\"#047857\">Beta ★</text>\n  </g>\n\n  <!-- GROUP 3: Gamma (center at x=320 - TRAP) -->\n  <g transform=\"translate(276, 0)\">\n    <rect x=\"-8\" y=\"60\" width=\"96\" height=\"195\" rx=\"9\" fill=\"rgba(245, 158, 11, 0.08)\" stroke=\"#f59e0b\" stroke-width=\"2\" stroke-dasharray=\"4,4\"/>\n    <rect x=\"0\" y=\"135\" width=\"38\" height=\"113\" rx=\"5\" fill=\"#64748b\"/>\n    <text x=\"19\" y=\"158\" class=\"bc-val\">400</text>\n    <rect x=\"42\" y=\"112\" width=\"38\" height=\"136\" rx=\"5\" fill=\"#f59e0b\"/>\n    <text x=\"61\" y=\"138\" class=\"bc-val\">480</text>\n    <rect x=\"-4\" y=\"69\" width=\"88\" height=\"25\" rx=\"5\" fill=\"#f59e0b\"/>\n    <text x=\"40\" y=\"86\" fill=\"#ffffff\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"900\" text-anchor=\"middle\">+80 Unit (20%)</text>\n    <text x=\"40\" y=\"270\" class=\"bc-dealer\">Gamma</text>\n  </g>\n\n  <!-- GROUP 4: Delta (center at x=430) -->\n  <g transform=\"translate(386, 0)\">\n    <rect x=\"0\" y=\"106\" width=\"38\" height=\"142\" rx=\"5\" fill=\"#64748b\"/>\n    <text x=\"19\" y=\"133\" class=\"bc-val\">500</text>\n    <rect x=\"42\" y=\"85\" width=\"38\" height=\"163\" rx=\"5\" fill=\"#4f46e5\"/>\n    <text x=\"61\" y=\"113\" class=\"bc-val\">575</text>\n    <rect x=\"15\" y=\"53\" width=\"50\" height=\"25\" rx=\"6\" fill=\"#e0e7ff\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n    <text x=\"40\" y=\"70\" fill=\"#4338ca\" class=\"bc-pct\">+15%</text>\n    <text x=\"40\" y=\"270\" class=\"bc-dealer\">Delta</text>\n  </g>\n\n  <!-- Bottom Clarification Banner -->\n  <rect x=\"6\" y=\"286\" width=\"488\" height=\"28\" rx=\"6\" fill=\"#0f172a\"/>\n  <text x=\"250\" y=\"304\" fill=\"#38bdf8\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">💡 KUNCI UTBK: Gamma naik nominal terbesar (+80), tapi Beta juara persentase (+50%)!</text>\n</svg>"
      }
    ],
    "distractor_traps": [
      "Menyamakan rata-rata persentase dengan persentase gabungan: Rata-rata dari 90%, 80%, dan 80% bukan (90+80+80)/3 jika ukuran populasi tiap sekolah berbeda.",
      "Terkecoh persentase tinggi dengan jumlah mutlak: 90% dari 200 (180) lebih sedikit daripada 80% dari 300 (240).",
      "Salah membaca selisih penurunan vs kenaikan."
    ],
    "quick_execution_algorithm": [
      "Identifikasi apa yang ditanyakan: jumlah mutlak atau persentase relatif.",
      "Kalikan persentase dengan total populasi baris untuk memperoleh angka riil.",
      "Waspadai jebakan merata-ratakan persentase secara langsung tanpa bobot populasi.",
      "Uji opsi yang menyatakan perbandingan jumlah mutlak terlebih dahulu."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-03-05-ex1",
      "variation_name": "Variasi 1: Persentase Kenaikan Tertinggi (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan volume penjualan mobil (dalam unit) dari empat dealer:\n- Dealer Alpha: 200 unit (2024) -> 260 unit (2025)\n- Dealer Beta: 120 unit (2024) -> 180 unit (2025)\n- Dealer Gamma: 400 unit (2024) -> 480 unit (2025)\n- Dealer Delta: 500 unit (2024) -> 575 unit (2025)",
      "question_markdown": "Dealer yang mencatatkan **persentase kenaikan penjualan TERTINGGI** dari tahun 2024 ke 2025 adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Dealer Alpha"
        },
        {
          "key": "B",
          "text_markdown": "Dealer Beta"
        },
        {
          "key": "C",
          "text_markdown": "Dealer Gamma"
        },
        {
          "key": "D",
          "text_markdown": "Dealer Delta"
        },
        {
          "key": "E",
          "text_markdown": "Dealer Gamma dan Delta sama tinggi"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Persentase kenaikan dihitung dari (Kenaikan / Penjualan Awal) x 100%. Jangan terkecoh dengan Dealer Gamma yang kenaikan nominalnya paling banyak!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Alpha:** $\\frac{60}{200} = 30\\%$.\n- **Beta:** $\\frac{60}{120} = 50\\%$.\n- **Gamma:** $\\frac{80}{400} = 20\\%$.\n- **Delta:** $\\frac{75}{500} = 15\\%$.\n- **Konklusi:** Persentase kenaikan tertinggi adalah Dealer Beta ($50\\%$).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Bagi Nilai Awal):**\n\n1. Beta naik $60$ dari $120 \\implies$ naik tepat setengahnya ($50\\%$).\n2. Dealer lain kenaikannya jauh di bawah $50\\%$ dari nilai awalnya.\n3. Jawaban langsung **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan C Salah (Jebakan Nominal):** Gamma naik 80 unit namun basis awalnya 400 unit sehingga hanya naik 20%.\n- **Pilihan A, D, E Salah:** Persentasenya di bawah 50%."
    },
    {
      "example_id": "pu-03-05-ex2",
      "variation_name": "Variasi 2: Laju Kenaikan Tertinggi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Catatan laba bersih (dalam miliar rupiah) sebuah perusahaan rintisan selama lima caturwulan berturut-turut:\n- Caturwulan I: Rp15 Miliar\n- Caturwulan II: Rp18 Miliar\n- Caturwulan III: Rp12 Miliar\n- Caturwulan IV: Rp24 Miliar\n- Caturwulan V: Rp30 Miliar",
      "question_markdown": "Laju kenaikan laba bersih **tertinggi** dalam satu periode caturwulan berturut-turut terjadi pada perpindahan dari...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Caturwulan I ke Caturwulan II"
        },
        {
          "key": "B",
          "text_markdown": "Caturwulan II ke Caturwulan III"
        },
        {
          "key": "C",
          "text_markdown": "Caturwulan III ke Caturwulan IV"
        },
        {
          "key": "D",
          "text_markdown": "Caturwulan IV ke Caturwulan V"
        },
        {
          "key": "E",
          "text_markdown": "Caturwulan I ke Caturwulan V"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Cari periode di mana labanya mengalami lonjakan persentase berlipat ganda paling tajam. Coba periksa caturwulan III ke IV (dari 12 ke 24)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **I -> II:** $(18 - 15) / 15 = 3 / 15 = 20\\%$.\n- **II -> III:** Turun.\n- **III -> IV:** $(24 - 12) / 12 = 12 / 12 = 100\\%$.\n- **IV -> V:** $(30 - 24) / 24 = 6 / 24 = 25\\%$.\n- **Konklusi:** Kenaikan tertinggi $100\\%$ terjadi pada III ke IV.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Kenaikan 2 Kali Lipat):**\n\n1. Dari 12 ke 24 naik tepat $100\\%$ (berlipat dua).\n2. Tidak ada periode lain yang mencapai kenaikan $100\\%$.\n3. Jawaban **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A, D Salah:** Kenaikan hanya 20% dan 25%.\n- **Pilihan B Salah:** Mengalami penurunan laba.\n- **Pilihan E Salah:** Meliputi 4 periode, bukan satu periode berturut-turut."
    },
    {
      "example_id": "pu-03-05-ex3",
      "variation_name": "Variasi 3: Evaluasi Simpulan Data Statistik (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel statistik kelulusan ujian kompetensi dari tiga sekolah kejuruan tahun 2025:\n- SMK Mandiri: 200 siswa terdaftar, kelulusan 90%\n- SMK Prestasi: 300 siswa terdaftar, kelulusan 80%\n- SMK Cendekia: 150 siswa terdaftar, kelulusan 80%",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan berikut yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jumlah siswa yang lulus dari SMK Mandiri lebih banyak daripada siswa yang lulus dari SMK Prestasi"
        },
        {
          "key": "B",
          "text_markdown": "Jumlah siswa yang TIDAK lulus dari SMK Prestasi sama dengan jumlah siswa yang TIDAK lulus dari SMK Mandiri"
        },
        {
          "key": "C",
          "text_markdown": "Jumlah siswa yang lulus dari SMK Prestasi adalah yang terbanyak di antara ketiga sekolah tersebut"
        },
        {
          "key": "D",
          "text_markdown": "Total persentase kelulusan gabungan ketiga sekolah tersebut adalah 85%"
        },
        {
          "key": "E",
          "text_markdown": "Siswa yang tidak lulus dari SMK Cendekia berjumlah 40 orang"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung jumlah siswa lulus riil untuk setiap sekolah: Mandiri = 90% x 200 = 180 siswa. Prestasi = 80% x 300 = 240 siswa. Cendekia = 80% x 150 = 120 siswa. Bandingkan dengan opsi pernyataan!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Kalkulasi Siswa Lulus:**\n  - SMK Mandiri: $90\\% \\times 200 = 180$ siswa.\n  - SMK Prestasi: $80\\% \\times 300 = 240$ siswa.\n  - SMK Cendekia: $80\\% \\times 150 = 120$ siswa.\n- **Kalkulasi Siswa Tidak Lulus:**\n  - SMK Mandiri: $20$ siswa.\n  - SMK Prestasi: $60$ siswa.\n  - SMK Cendekia: $30$ siswa.\n- **Evaluasi Pernyataan:**\n  - Siswa lulus terbanyak adalah SMK Prestasi ($240$ siswa). Pernyataan C pasti benar.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Verifikasi Nilai Terbanyak):**\n\n1. Lulus Prestasi $= 80\\% \\times 300 = 240$ orang.\n2. Total siswa Mandiri saja hanya 200 orang. Jadi Prestasi pasti menghasilkan lulusan terbanyak.\n3. Pilihan **C** seketika terbukti benar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Mandiri (180) lebih sedikit dari Prestasi (240).\n- **Pilihan B Salah:** Tidak lulus Prestasi (60) tidak sama dengan Mandiri (20).\n- **Pilihan D Salah:** Rata-rata tertimbang kelulusan adalah 540/650 = 83,08% bukan 85%.\n- **Pilihan E Salah:** Siswa tidak lulus Cendekia adalah 30 orang bukan 40 orang."
    },
    {
      "example_id": "pu-03-05-ex4",
      "variation_name": "Variasi 4: Penurunan Persentase Emisi Terbesar (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan catatan emisi gas rumah kaca ($CO_2$) dalam ribuan ton dari empat pembangkit listrik selama periode transisi energi 2022 hingga 2024:\n\n| Pembangkit Listrik | Emisi 2022 | Emisi 2023 | Emisi 2024 |\n| :--- | :---: | :---: | :---: |\n| PLTU Batubara A | 400 | 360 | 300 |\n| PLTG Gas B | 250 | 200 | 150 |\n| PLTP Panas Bumi C | 80 | 60 | 40 |\n| PLTS Hibrida D | 50 | 35 | 20 |",
      "question_markdown": "Berdasarkan data tersebut, pembangkit listrik yang mencatatkan **penurunan persentase emisi kumulatif TERBESAR** dari tahun 2022 ke tahun 2024 adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "PLTS Hibrida D"
        },
        {
          "key": "B",
          "text_markdown": "PLTP Panas Bumi C"
        },
        {
          "key": "C",
          "text_markdown": "PLTG Gas B"
        },
        {
          "key": "D",
          "text_markdown": "PLTU Batubara A"
        },
        {
          "key": "E",
          "text_markdown": "PLTU Batubara A dan PLTG Gas B sama besar"
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Persentase penurunan dihitung dari $\\frac{\\text{Penurunan}}{\\text{Emisi Awal 2022}} \\times 100\\%$. Hati-hati jebakan nominal: penurunan 30 dari basis 50 jauh lebih tajam daripada penurunan 100 dari basis 400!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Persentase Penurunan (2022 -> 2024):**\n   - **PLTU Batubara A:** Penurunan $= 400 - 300 = 100$ ribu ton $\\implies \\frac{100}{400} \\times 100\\% = 25{,}0\\%$.\n   - **PLTG Gas B:** Penurunan $= 250 - 150 = 100$ ribu ton $\\implies \\frac{100}{250} \\times 100\\% = 40{,}0\\%$.\n   - **PLTP Panas Bumi C:** Penurunan $= 80 - 40 = 40$ ribu ton $\\implies \\frac{40}{80} \\times 100\\% = 50{,}0\\%$.\n   - **PLTS Hibrida D:** Penurunan $= 50 - 20 = 30$ ribu ton $\\implies \\frac{30}{50} \\times 100\\% = 60{,}0\\%$.\n2. **Evaluasi dan Kesimpulan:**\n   Penurunan persentase kumulatif paling masif diraih oleh **PLTS Hibrida D** sebesar **$60{,}0\\%$**.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Uji Rasio Penurunan terhadap Basis):**\n\n- PLTS Hibrida D memangkas emisinya dari $50$ ke $20$, menyisakan hanya $40\\%$ (artinya terpotong $60\\%$).\n- Pembangkit lain masih menyisakan $50\\%$ atau lebih dari emisi awalnya.\n- Jawaban langsung **A**.",
      "why_others_are_wrong_markdown": "- **Pilihan D Salah (Jebakan Nominal Terbesar):** PLTU A turun 100 ribu ton (terbesar nominalnya), namun karena basis awalnya 400 ribu ton, persentasenya hanya 25%.\n- **Pilihan B, C, E Salah:** Persentase penurunan C (50%) dan B (40%) lebih rendah daripada D (60%)."
    },
    {
      "example_id": "pu-03-05-ex5",
      "variation_name": "Variasi 5: Evaluasi Simpulan Anggaran dan Realisasi (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut memuat data alokasi pagu anggaran dan tingkat realisasi penyerapan dana pada empat dinas daerah pada Tahun Anggaran 2025:\n\n| Dinas Daerah | Pagu Anggaran (Miliar Rp) | Realisasi Penyerapan (%) |\n| :--- | :---: | :---: |\n| Dinas Pendidikan | 120 | 85% |\n| Dinas Kesehatan | 80 | 90% |\n| Dinas Pekerjaan Umum (PU) | 150 | 70% |\n| Dinas Perhubungan | 50 | 90% |",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan berikut yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Nominal realisasi penyerapan anggaran Dinas Pendidikan lebih besar daripada Dinas Pekerjaan Umum"
        },
        {
          "key": "B",
          "text_markdown": "Sisa anggaran yang belum terserap pada Dinas Pekerjaan Umum sama besarnya dengan nominal realisasi anggaran Dinas Perhubungan"
        },
        {
          "key": "C",
          "text_markdown": "Rata-rata persentase penyerapan anggaran gabungan keempat dinas tersebut adalah 83,75%"
        },
        {
          "key": "D",
          "text_markdown": "Sisa anggaran yang belum terserap pada Dinas Perhubungan lebih besar daripada Dinas Kesehatan"
        },
        {
          "key": "E",
          "text_markdown": "Dinas Kesehatan merupakan dinas dengan nominal dana terserap paling sedikit di antara keempat dinas"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung nominal riil masing-masing dinas dalam miliar rupiah: Realisasi $= \\% \\times \\text{Pagu}$ dan Sisa $= (100\\% - \\%) \\times \\text{Pagu}$. Cermati perbandingan antara sisa anggaran Dinas PU ($30\\% \\times 150$) dengan realisasi Dinas Perhubungan ($90\\% \\times 50$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Rinci Nominal (Miliar Rupiah):**\n   - **Dinas Pendidikan:** Realisasi $= 85\\% \\times 120 = 102$; Sisa $= 120 - 102 = 18$.\n   - **Dinas Kesehatan:** Realisasi $= 90\\% \\times 80 = 72$; Sisa $= 80 - 72 = 8$.\n   - **Dinas Pekerjaan Umum:** Realisasi $= 70\\% \\times 150 = 105$; Sisa $= 150 - 105 = 45$.\n   - **Dinas Perhubungan:** Realisasi $= 90\\% \\times 50 = 45$; Sisa $= 50 - 45 = 5$.\n2. **Uji Kebenaran Opsi B:**\n   - Sisa anggaran Dinas Pekerjaan Umum $= 45\\text{ Miliar Rp}$.\n   - Realisasi anggaran Dinas Perhubungan $= 45\\text{ Miliar Rp}$.\n   - Keduanya bernilai persis sama ($45 = 45$). Pernyataan B terbukti pasti benar.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Perhitungan Langsung Opsi Relasional B):**\n\n- Sisa PU: $30\\% \\times 150 = 45\\text{ Miliar}$.\n- Realisasi Perhubungan: $90\\% \\times 50 = 45\\text{ Miliar}$.\n- Angka identik seketika membuktikan opsi **B** benar tanpa perlu menghitung rata-rata tertimbang.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Realisasi Pendidikan (102 Miliar) lebih kecil dari PU (105 Miliar).\n- **Pilihan C Salah (Jebakan Rata-Rata Naif):** $(85+90+70+90)/4 = 83{,}75\\%$ mengabaikan bobot pagu. Rata-rata gabungan tertimbang sesungguhnya adalah $\\frac{102+72+105+45}{400} = \\frac{324}{400} = 81{,}0\\%$.\n- **Pilihan D Salah:** Sisa Perhubungan ($5$ Miliar) lebih kecil dari Kesehatan ($8$ Miliar).\n- **Pilihan E Salah:** Realisasi paling sedikit adalah Dinas Perhubungan ($45$ Miliar), bukan Kesehatan ($72$ Miliar)."
    },
    {
      "example_id": "pu-03-05-ex6",
      "variation_name": "Variasi 6: Rata-Rata Gabungan Tertimbang Pasien Terapi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah pusat layanan psikologi klinis mengevaluasi efektivitas terapi perilaku kognitif (*Cognitive Behavioral Therapy* - CBT) terhadap penurunan tingkat kecemasan. Skor reduksi kecemasan (skala 0–100) diukur dari tiga kelompok pasien berdasarkan durasi program intervensi:\n\n| Kelompok Intervensi | Durasi Intervensi | Jumlah Pasien | Rata-Rata Skor Reduksi |\n| :--- | :---: | :---: | :---: |\n| Kelompok A | 4 Minggu | 30 | 65 |\n| Kelompok B | 8 Minggu | 50 | 75 |\n| Kelompok C | 12 Minggu | 20 | 85 |",
      "question_markdown": "Skor **rata-rata gabungan reduksi kecemasan** dari seluruh pasien yang mengikuti program terapi di klinik tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "71,5"
        },
        {
          "key": "B",
          "text_markdown": "72,5"
        },
        {
          "key": "C",
          "text_markdown": "73,0"
        },
        {
          "key": "D",
          "text_markdown": "74,0"
        },
        {
          "key": "E",
          "text_markdown": "75,0"
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan rumus rata-rata gabungan: $\\bar{x}_{gab} = \\frac{\\sum (n_i \\times \\bar{x}_i)}{\\sum n_i}$. Jangan hanya menjumlahkan rata-rata lalu membaginya dengan 3 karena jumlah pasien di setiap kelompok tidak sama!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Hitung Total Skor Tiap Kelompok:**\n   - Kelompok A: $30 \\times 65 = 1.950$\n   - Kelompok B: $50 \\times 75 = 3.750$\n   - Kelompok C: $20 \\times 85 = 1.700$\n2. **Hitung Total Skor dan Total Pasien:**\n   - Total skor $= 1.950 + 3.750 + 1.700 = 7.400$\n   - Total pasien $= 30 + 50 + 20 = 100$\n3. **Hitung Rata-Rata Gabungan:**\n   $$\\bar{x}_{gab} = \\frac{7.400}{100} = 74{,}0$$\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Metode Deviasi dari Basis 75):**\n\n1. Ambil patokan tengah $75$:\n   - Kelompok A ($65$): selisih $-10 \\times 30 = -300$\n   - Kelompok B ($75$): selisih $0 \\times 50 = 0$\n   - Kelompok C ($85$): selisih $+10 \\times 20 = +200$\n2. Total deviasi $= -300 + 200 = -100$.\n3. Koreksi rata-rata $= 75 + \\frac{-100}{100} = 75 - 1 = 74{,}0$.\n4. Jawaban seketika **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan E Salah (Jebakan Rata-Rata Sederhana):** $\\frac{65+75+85}{3} = 75{,}0$ adalah jebakan fatal yang mengabaikan bahwa pasien kelompok 4 minggu (30 orang) lebih banyak dari 12 minggu (20 orang).\n- **Pilihan A, B, C Salah:** Nilai kalkulasi keliru."
    },
    {
      "example_id": "pu-03-05-ex7",
      "variation_name": "Variasi 7: Produktivitas Per Unit Lini Otomasi Industri (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut memuat data kapasitas produksi dan jumlah robot lengan industri yang beroperasi aktif pada lima lini perakitan komponen mikroprosesor selama satu shift kerja (8 jam):\n\n| Lini Perakitan | Jumlah Robot Aktif | Total Output Komponen (Unit) |\n| :--- | :---: | :---: |\n| Lini Alpha | 8 | 4.800 |\n| Lini Beta | 12 | 7.800 |\n| Lini Gamma | 15 | 9.000 |\n| Lini Delta | 10 | 6.200 |\n| Lini Epsilon | 6 | 4.080 |",
      "question_markdown": "Lini perakitan yang mencatatkan **produktivitas tertinggi per robot** selama satu shift kerja adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Lini Alpha"
        },
        {
          "key": "B",
          "text_markdown": "Lini Beta"
        },
        {
          "key": "C",
          "text_markdown": "Lini Gamma"
        },
        {
          "key": "D",
          "text_markdown": "Lini Delta"
        },
        {
          "key": "E",
          "text_markdown": "Lini Epsilon"
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Bagikan total output komponen dengan jumlah robot aktif pada masing-masing lini. Waspada terhadap Lini Gamma yang memiliki output total terbesar ($9.000$ unit) namun didukung oleh robot terbanyak pula!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Produktivitas per Robot:**\n   - **Lini Alpha:** $\\frac{4.800}{8} = 600\\text{ unit/robot}$.\n   - **Lini Beta:** $\\frac{7.800}{12} = 650\\text{ unit/robot}$.\n   - **Lini Gamma:** $\\frac{9.000}{15} = 600\\text{ unit/robot}$.\n   - **Lini Delta:** $\\frac{6.200}{10} = 620\\text{ unit/robot}$.\n   - **Lini Epsilon:** $\\frac{4.080}{6} = 680\\text{ unit/robot}$.\n2. **Kesimpulan:**\n   Produktivitas tertinggi per robot dicapai oleh **Lini Epsilon** dengan hasil $680\\text{ unit/robot}$.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Estimasi Cepat Patokan 650):**\n\n- Epsilon: $4.080 / 6 = 680$ (langsung tembus melampaui 650 milik Beta).\n- Alpha dan Gamma jelas 600, Delta hanya 620.\n- Jawaban mutlak **E**.",
      "why_others_are_wrong_markdown": "- **Pilihan C Salah (Jebakan Output Bruto):** Gamma menghasilkan 9.000 unit namun karena dibagi 15 robot, efisiensinya hanya 600 unit/robot.\n- **Pilihan B Salah:** Beta berada di peringkat kedua (650 unit/robot).\n- **Pilihan A, D Salah:** Di bawah 650 unit/robot."
    },
    {
      "example_id": "pu-03-05-ex8",
      "variation_name": "Variasi 8: Evaluasi Komparasi Data Wisata Cagar Budaya (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menyajikan data statistik kunjungan wisatawan domestik dan wisatawan mancanegara ke empat situs cagar budaya nasional pada Semester I dan Semester II tahun 2025:\n\n| Cagar Budaya / Museum | Wisatawan Domestik (Semester I) | Wisatawan Domestik (Semester II) | Wisatawan Mancanegara (Semester I) | Wisatawan Mancanegara (Semester II) |\n| :--- | :---: | :---: | :---: | :---: |\n| Situs Sangiran | 40.000 | 50.000 | 5.000 | 6.000 |\n| Candi Muaro Jambi | 25.000 | 35.000 | 2.000 | 3.000 |\n| Benteng Rotterdam | 30.000 | 36.000 | 8.000 | 12.000 |\n| Keraton Kasepuhan | 50.000 | 60.000 | 4.000 | 5.000 |",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan komparasi berikut yang **BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jumlah seluruh pengunjung (domestik dan mancanegara) di Benteng Rotterdam pada Semester II melampaui jumlah seluruh pengunjung di Situs Sangiran pada Semester II"
        },
        {
          "key": "B",
          "text_markdown": "Jumlah wisatawan mancanegara di Benteng Rotterdam pada Semester I lebih sedikit daripada di Situs Sangiran pada Semester I"
        },
        {
          "key": "C",
          "text_markdown": "Persentase kenaikan wisatawan domestik dari Semester I ke Semester II tertinggi dicatatkan oleh Candi Muaro Jambi"
        },
        {
          "key": "D",
          "text_markdown": "Keraton Kasepuhan mencatatkan persentase pertumbuhan total wisatawan (domestik dan mancanegara) paling tinggi di antara keempat destinasi"
        },
        {
          "key": "E",
          "text_markdown": "Total akumulasi wisatawan domestik di Candi Muaro Jambi sepanjang tahun melebihi total wisatawan domestik di Benteng Rotterdam"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Cek persentase pertumbuhan wisatawan domestik masing-masing destinasi: kenaikan dibagi nilai semester I. Bandingkan Muaro Jambi ($+10.000$ dari $25.000$) dengan destinasi lainnya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Analisis Kenaikan Persentase Wisatawan Domestik (Smt I -> Smt II):**\n   - **Situs Sangiran:** $\\frac{50.000 - 40.000}{40.000} = \\frac{10.000}{40.000} = 25{,}0\\%$.\n   - **Candi Muaro Jambi:** $\\frac{35.000 - 25.000}{25.000} = \\frac{10.000}{25.000} = 40{,}0\\%$.\n   - **Benteng Rotterdam:** $\\frac{36.000 - 30.000}{30.000} = \\frac{6.000}{30.000} = 20{,}0\\%$.\n   - **Keraton Kasepuhan:** $\\frac{60.000 - 50.000}{50.000} = \\frac{10.000}{50.000} = 20{,}0\\%$.\n   - Terbukti **Candi Muaro Jambi** meraih persentase kenaikan domestik tertinggi ($40{,}0\\%$). Pernyataan C sah benar.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Perbandingan Pembilang dan Penyebut):**\n\n- Muaro Jambi, Sangiran, dan Kasepuhan sama-sama naik $10.000$ orang domestik.\n- Karena nilai awal Muaro Jambi paling kecil ($25.000$), maka pecahan $\\frac{10.000}{25.000} = \\frac{2}{5} = 40\\%$ otomatis menghasilkan persentase lonjakan terbesar tanpa perlu menghitung destinasi lain.\n- Pilihan **C** terbukti benar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Total Semester II Rotterdam $= 36.000 + 12.000 = 48.000$, lebih sedikit dari Sangiran $= 50.000 + 6.000 = 56.000$.\n- **Pilihan B Salah:** Wisatawan mancanegara Rotterdam Smt I adalah $8.000$, justru lebih banyak dari Sangiran ($5.000$).\n- **Pilihan D Salah:** Pertumbuhan total Muaro Jambi adalah $\\frac{38.000 - 27.000}{27.000} \\approx 40{,}7\\%$, jauh lebih tinggi daripada Kasepuhan yang hanya $\\frac{65.000 - 54.000}{54.000} \\approx 20{,}4\\%$.\n- **Pilihan E Salah:** Total domestik Muaro Jambi $= 25.000 + 35.000 = 60.000$, sedangkan Rotterdam $= 30.000 + 36.000 = 66.000$."
    },
    {
      "example_id": "pu-03-05-ex9",
      "variation_name": "Variasi 9: Kenaikan Persentase Kerapatan Partikel Mikroplastik (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan hasil pemantauan kerapatan partikel mikroplastik (dalam partikel/$\\text{m}^3$) pada lima muara sungai pesisir selama ekspedisi oseanografi tahun 2023 dan 2025:\n\n| Muara Sungai | Kerapatan 2023 (partikel/$\\text{m}^3$) | Kerapatan 2025 (partikel/$\\text{m}^3$) |\n| :--- | :---: | :---: |\n| Muara Cisadane | 250 | 325 |\n| Muara Way Seputih | 120 | 180 |\n| Muara Barito | 80 | 140 |\n| Muara Kapuas | 150 | 210 |\n| Muara Bengawan Solo | 400 | 460 |",
      "question_markdown": "Muara sungai yang mencatatkan **persentase kenaikan kerapatan mikroplastik TERTINGGI** dari tahun 2023 ke tahun 2025 adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Muara Cisadane"
        },
        {
          "key": "B",
          "text_markdown": "Muara Bengawan Solo"
        },
        {
          "key": "C",
          "text_markdown": "Muara Barito"
        },
        {
          "key": "D",
          "text_markdown": "Muara Way Seputih"
        },
        {
          "key": "E",
          "text_markdown": "Muara Kapuas"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Persentase kenaikan dihitung dengan membagi selisih kenaikan dengan nilai awal tahun 2023, lalu dikalikan 100%. Jangan terkecoh oleh angka nominal mutlak di mana empat muara mengalami kenaikan nominal yang persis sama (+60 partikel/$\\text{m}^3$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Hitung Kenaikan Nominal dan Persentase Masing-Masing Muara:**\n   - **Muara Cisadane:** $\\Delta = 325 - 250 = 75 \\implies \\frac{75}{250} \\times 100\\% = 30{,}0\\%$.\n   - **Muara Way Seputih:** $\\Delta = 180 - 120 = 60 \\implies \\frac{60}{120} \\times 100\\% = 50{,}0\\%$.\n   - **Muara Barito:** $\\Delta = 140 - 80 = 60 \\implies \\frac{60}{80} \\times 100\\% = 75{,}0\\%$.\n   - **Muara Kapuas:** $\\Delta = 210 - 150 = 60 \\implies \\frac{60}{150} \\times 100\\% = 40{,}0\\%$.\n   - **Muara Bengawan Solo:** $\\Delta = 460 - 400 = 60 \\implies \\frac{60}{400} \\times 100\\% = 15{,}0\\%$.\n2. **Evaluasi dan Kesimpulan:**\n   Persentase kenaikan tertinggi dicatatkan oleh **Muara Barito** dengan lonjakan mencapai **$75{,}0\\%$**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Perbandingan Pembilang Sama):**\n\n1. Perhatikan bahwa Way Seputih, Barito, Kapuas, dan Bengawan Solo sama-sama mengalami kenaikan nominal $+60$.\n2. Dengan kenaikan yang sama ($+60$), pecahan $\\frac{60}{\\text{Nilai Awal}}$ bernilai paling besar jika **nilai awal (penyebut) paling kecil**.\n3. Nilai awal terkecil adalah Muara Barito ($80$), sehingga $\\frac{60}{80} = 75{,}0\\%$ langsung mengungguli yang lain tanpa perlu menghitung desimal satu per satu.\n4. Jawaban seketika **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah (Jebakan Nominal Terbesar):** Cisadane naik 75 partikel (nominal terbesar), namun persentasenya hanya 30,0% karena basis awalnya 250.\n- **Pilihan B Salah (Jebakan Kerapatan Terpadat):** Bengawan Solo memiliki kerapatan tertinggi (460), namun laju kenaikannya paling lambat (hanya 15,0%).\n- **Pilihan D, E Salah:** Persentase kenaikan Way Seputih (50,0%) dan Kapuas (40,0%) lebih rendah daripada Barito (75,0%)."
    },
    {
      "example_id": "pu-03-05-ex10",
      "variation_name": "Variasi 10: Evaluasi Rasio Efisiensi Logistik Pelabuhan Peti Kemas (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menyajikan data operasional dan pendapatan jasa empat pelabuhan peti kemas utama nasional pada kuartal IV tahun 2025:\n\n| Pelabuhan Peti Kemas | Arus Peti Kemas (Ribu TEUs) | Rata-Rata Dwelling Time (Hari) | Tarif Rata-Rata per TEU (Juta Rp) |\n| :--- | :---: | :---: | :---: |\n| Pelabuhan Belawan | 150 | 4,0 | 1,8 |\n| Pelabuhan Tanjung Priok | 600 | 2,5 | 2,0 |\n| Pelabuhan Tanjung Perak | 400 | 3,0 | 1,5 |\n| Pelabuhan Makassar | 200 | 3,5 | 1,6 |",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan berikut yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Total penerimaan jasa di Pelabuhan Tanjung Priok tepat dua kali lipat total penerimaan jasa di Pelabuhan Tanjung Perak"
        },
        {
          "key": "B",
          "text_markdown": "Rata-rata dwelling time gabungan tertimbang dari keempat pelabuhan tersebut adalah 3,25 hari"
        },
        {
          "key": "C",
          "text_markdown": "Arus peti kemas di Pelabuhan Tanjung Priok melampaui 50% dari total arus peti kemas di keempat pelabuhan"
        },
        {
          "key": "D",
          "text_markdown": "Total penerimaan jasa Pelabuhan Belawan lebih tinggi daripada Pelabuhan Makassar"
        },
        {
          "key": "E",
          "text_markdown": "Pelabuhan dengan rata-rata dwelling time paling singkat menghasilkan total penerimaan jasa terendah"
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung total penerimaan jasa tiap pelabuhan dengan rumus $\\text{Penerimaan} = \\text{Arus Peti Kemas} \\times \\text{Tarif per TEU}$. Bandingkan total penerimaan Tanjung Priok ($600 \\times 2{,}0$) dengan Tanjung Perak ($400 \\times 1{,}5$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Total Penerimaan Jasa Masing-Masing Pelabuhan (Miliar Rupiah):**\n   - **Pelabuhan Belawan:** $150 \\times 1{,}8 = 270\\text{ Miliar Rp}$.\n   - **Pelabuhan Tanjung Priok:** $600 \\times 2{,}0 = 1.200\\text{ Miliar Rp}$.\n   - **Pelabuhan Tanjung Perak:** $400 \\times 1{,}5 = 600\\text{ Miliar Rp}$.\n   - **Pelabuhan Makassar:** $200 \\times 1{,}6 = 320\\text{ Miliar Rp}$.\n2. **Evaluasi Pernyataan A:**\n   - Penerimaan Tanjung Priok $= 1.200\\text{ Miliar Rp}$.\n   - Penerimaan Tanjung Perak $= 600\\text{ Miliar Rp}$.\n   - Rasio $= \\frac{1.200}{600} = 2{,}0$ (tepat dua kali lipat). Pernyataan A terbukti pasti benar.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Verifikasi Langsung Opsi Relasional A):**\n\n1. Priok: $600 \\times 2{,}0 = 1.200$.\n2. Perak: $400 \\times 1{,}5 = 600$.\n3. Terlihat langsung bahwa $1.200 = 2 \\times 600$ (tepat dua kali lipat).\n4. Jawaban **A** terbukti mutlak tanpa perlu menghitung opsi lainnya.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah (Jebakan Rata-Rata Naif):** $\\frac{4{,}0 + 2{,}5 + 3{,}0 + 3{,}5}{4} = 3{,}25$ hari adalah rata-rata aritmetika sederhana yang mengabaikan bobot volume. Rata-rata tertimbang sesungguhnya adalah $\\frac{(150 \\times 4) + (600 \\times 2{,}5) + (400 \\times 3) + (200 \\times 3{,}5)}{150 + 600 + 400 + 200} = \\frac{600 + 1.500 + 1.200 + 700}{1.350} = \\frac{4.000}{1.350} \\approx 2{,}96$ hari.\n- **Pilihan C Salah:** Total arus peti kemas $= 150 + 600 + 400 + 200 = 1.350$ ribu TEUs. Porsi Tanjung Priok $= \\frac{600}{1.350} \\approx 44{,}4\\%$, tidak melampaui 50%.\n- **Pilihan D Salah:** Penerimaan Belawan (270 Miliar Rp) lebih kecil daripada Makassar (320 Miliar Rp).\n- **Pilihan E Salah:** Priok memiliki dwelling time paling singkat (2,5 hari), namun justru menghasilkan penerimaan tertinggi (1.200 Miliar Rp)."
    },
    {
      "example_id": "pu-03-05-ex11",
      "variation_name": "Variasi 11: Rata-Rata Gabungan Tertimbang Skor Memori Kerja (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menyajikan data hasil studi psikologi kognitif mengenai hubungan durasi tidur malam dengan performa memori kerja (*Dual N-Back Task*, skala skor 0–100) pada 200 profesional muda:\n\n| Kelompok Partisipan | Rata-Rata Durasi Tidur | Jumlah Partisipan | Rata-Rata Skor Memori Kerja |\n| :--- | :---: | :---: | :---: |\n| Kelompok Deprivasi Berat | $< 5$ jam | 40 | 55 |\n| Kelompok Deprivasi Ringan | $5 - 6$ jam | 60 | 65 |\n| Kelompok Tidur Optimal | $7 - 8$ jam | 80 | 85 |\n| Kelompok Tidur Berlebih | $> 9$ jam | 20 | 75 |",
      "question_markdown": "Skor **rata-rata gabungan memori kerja** dari seluruh partisipan dalam studi tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "69,5"
        },
        {
          "key": "B",
          "text_markdown": "70,0"
        },
        {
          "key": "C",
          "text_markdown": "71,0"
        },
        {
          "key": "D",
          "text_markdown": "72,0"
        },
        {
          "key": "E",
          "text_markdown": "73,5"
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan rumus rata-rata tertimbang: $\\bar{x}_{gab} = \\frac{\\sum (n_i \\times \\bar{x}_i)}{\\sum n_i}$. Hati-hati jangan langsung menjumlahkan rata-rata keempat kelompok lalu dibagi 4, karena jumlah partisipan di setiap kelompok berbeda!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Hitung Akumulasi Skor Tiap Kelompok:**\n   - Deprivasi Berat: $40 \\times 55 = 2.200$\n   - Deprivasi Ringan: $60 \\times 65 = 3.900$\n   - Tidur Optimal: $80 \\times 85 = 6.800$\n   - Tidur Berlebih: $20 \\times 75 = 1.500$\n2. **Hitung Total Skor dan Total Partisipan:**\n   - Total Skor $= 2.200 + 3.900 + 6.800 + 1.500 = 14.400$\n   - Total Partisipan $= 40 + 60 + 80 + 20 = 200$\n3. **Hitung Rata-Rata Gabungan:**\n   $$\\bar{x}_{gab} = \\frac{14.400}{200} = 72{,}0$$\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Metode Deviasi terhadap Patokan 70):**\n\n1. Pasang angka patokan sementara $= 70$.\n2. Hitung selisih (deviasi) dikalikan bobot:\n   - Deprivasi Berat ($55$): selisih $-15 \\times 40 = -600$\n   - Deprivasi Ringan ($65$): selisih $-5 \\times 60 = -300$\n   - Tidur Optimal ($85$): selisih $+15 \\times 80 = +1.200$\n   - Tidur Berlebih ($75$): selisih $+5 \\times 20 = +100$\n3. Total deviasi $= -600 - 300 + 1.200 + 100 = +400$.\n4. Koreksi rata-rata $= 70 + \\frac{+400}{200} = 70 + 2 = 72{,}0$.\n5. Jawaban seketika **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah (Jebakan Rata-Rata Naif):** $\\frac{55 + 65 + 85 + 75}{4} = \\frac{280}{4} = 70{,}0$ mengabaikan fakta bahwa kelompok tidur optimal memiliki jumlah peserta terbanyak (80 orang), sehingga menarik rata-rata ke atas.\n- **Pilihan A, C, E Salah:** Nilai perhitungan meleset dari hasil rata-rata tertimbang sebenarnya ($72{,}0$)."
    },
    {
      "example_id": "pu-03-05-ex12",
      "variation_name": "Variasi 12: Komparasi Struktur Biaya Fabrikasi Wafer Semikonduktor (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan persentase komponen biaya produksi pada fabrikasi dua jenis wafer semikonduktor di sebuah fasilitas pengecoran (*foundry*):\n- Total Biaya Produksi per Wafer Chip AI (3nm): US$18.000\n- Total Biaya Produksi per Wafer Chip Otomotif (28nm): US$4.000\n\n| Komponen Biaya | Proporsi Biaya Chip AI 3nm (%) | Proporsi Biaya Chip Otomotif 28nm (%) |\n| :--- | :---: | :---: |\n| Mesin Litografi (EUV / DUV) | 45% | 20% |\n| Bahan Baku Silikon & Kimia Khusus | 15% | 35% |\n| Energi Bersih & Utilitas Pabrik | 20% | 25% |\n| Pengujian & Pengemasan (*Packaging & Test*) | 20% | 20% |",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan komparasi biaya berikut yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Biaya nominal bahan baku per wafer untuk Chip Otomotif 28nm lebih tinggi daripada Chip AI 3nm karena persentasenya lebih besar"
        },
        {
          "key": "B",
          "text_markdown": "Biaya pengujian dan pengemasan per wafer pada Chip AI 3nm tepat 4,5 kali lipat biaya pengujian dan pengemasan pada Chip Otomotif 28nm"
        },
        {
          "key": "C",
          "text_markdown": "Pengeluaran nominal energi dan utilitas per wafer pada Chip Otomotif 28nm melampaui biaya energi pada Chip AI 3nm"
        },
        {
          "key": "D",
          "text_markdown": "Biaya litografi pada Chip AI 3nm menyumbang tepat sepertiga dari total biaya produksi wafer tersebut"
        },
        {
          "key": "E",
          "text_markdown": "Selisih biaya litografi antara kedua jenis wafer tersebut adalah kurang dari US$5.000"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Jangan membandingkan persentase secara langsung karena basis total biaya kedua jenis wafer sangat berbeda (US$18.000 vs US$4.000). Hitung nilai nominal pengujian: AI $= 20\\% \\times 18.000$, Otomotif $= 20\\% \\times 4.000$. Bandingkan rasio keduanya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Rinci Nilai Nominal Tiap Komponen Biaya (dalam US$):**\n   - **Mesin Litografi:**\n     - Chip AI: $45\\% \\times 18.000 = \\text{US\\$}8.100$\n     - Chip Otomotif: $20\\% \\times 4.000 = \\text{US\\$}800$\n   - **Bahan Baku Silikon:**\n     - Chip AI: $15\\% \\times 18.000 = \\text{US\\$}2.700$\n     - Chip Otomotif: $35\\% \\times 4.000 = \\text{US\\$}1.400$\n   - **Energi & Utilitas:**\n     - Chip AI: $20\\% \\times 18.000 = \\text{US\\$}3.600$\n     - Chip Otomotif: $25\\% \\times 4.000 = \\text{US\\$}1.000$\n   - **Pengujian & Pengemasan:**\n     - Chip AI: $20\\% \\times 18.000 = \\text{US\\$}3.600$\n     - Chip Otomotif: $20\\% \\times 4.000 = \\text{US\\$}800$\n2. **Evaluasi Pernyataan B:**\n     $$\\frac{\\text{Biaya Uji AI}}{\\text{Biaya Uji Otomotif}} = \\frac{3.600}{800} = 4{,}5\\text{ kali lipat}$$\n   Pernyataan B terbukti sah dan pasti benar.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Rasio Persentase Identik):**\n\n1. Baik Chip AI maupun Otomotif sama-sama mengalokasikan $20\\%$ biaya untuk pengujian dan pengemasan.\n2. Karena persentasenya identik ($20\\%$), maka perbandingan nominal biayanya persis sama dengan perbandingan total biaya wafernya:\n   $$\\frac{18.000}{4.000} = \\frac{18}{4} = 4{,}5\\text{ kali lipat}$$\n3. Terbukti seketika bahwa biaya uji Chip AI tepat 4,5 kali lipat Chip Otomotif. Pilihan **B** mutlak benar tanpa kalkulasi panjang.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah (Jebakan Efek Basis Persentase):** Meskipun persentase bahan baku Otomotif ($35\\%$) tampak lebih besar dari AI ($15\\%$), secara nominal bahan baku Otomotif hanya US$1.400, jauh lebih kecil daripada bahan baku AI yang mencapai US$2.700.\n- **Pilihan C Salah:** Biaya energi Otomotif (US$1.000) jauh lebih kecil dari AI (US$3.600).\n- **Pilihan D Salah:** Biaya litografi AI menyumbang $45\\%$ ($9/20$), bukan sepertiga ($33{,}33\\%$).\n- **Pilihan E Salah:** Selisih litografi $= 8.100 - 800 = \\text{US\\$}7.300$, yang lebih dari US$5.000."
    },
    {
      "example_id": "pu-03-05-ex13",
      "variation_name": "Variasi 13: Laju Pertumbuhan Mahasiswa Antarwilayah Kepulauan (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan perkembangan jumlah mahasiswa aktif terdaftar (dalam ribuan orang) di perguruan tinggi pada lima wilayah kepulauan Indonesia dari tahun 2020 ke tahun 2025:\n\n| Wilayah Kepulauan | Mahasiswa 2020 (Ribu Orang) | Mahasiswa 2025 (Ribu Orang) |\n| :--- | :---: | :---: |\n| Wilayah Jawa-Bali | 4.500 | 5.400 |\n| Wilayah Sumatera | 1.800 | 2.250 |\n| Wilayah Kalimantan | 600 | 810 |\n| Wilayah Sulawesi | 750 | 975 |\n| Wilayah Nusa Tenggara & Maluku-Papua | 400 | 580 |",
      "question_markdown": "Wilayah kepulauan yang mencatatkan **laju persentase pertumbuhan jumlah mahasiswa TERTINGGI** dari tahun 2020 ke tahun 2025 adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Wilayah Jawa-Bali"
        },
        {
          "key": "B",
          "text_markdown": "Wilayah Sumatera"
        },
        {
          "key": "C",
          "text_markdown": "Wilayah Kalimantan"
        },
        {
          "key": "D",
          "text_markdown": "Wilayah Sulawesi"
        },
        {
          "key": "E",
          "text_markdown": "Wilayah Nusa Tenggara & Maluku-Papua"
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Laju persentase pertumbuhan dihitung dari $\\frac{\\text{Kenaikan}}{\\text{Jumlah Mahasiswa 2020}} \\times 100\\%$. Waspada jebakan nominal: kenaikan 900 ribu orang di Jawa-Bali memiliki basis awal 4.500 ribu orang!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Hitung Kenaikan Nominal dan Persentase Pertumbuhan Tiap Wilayah:**\n   - **Wilayah Jawa-Bali:** Kenaikan $= 5.400 - 4.500 = 900$ ribu $\\implies \\frac{900}{4.500} \\times 100\\% = 20{,}0\\%$.\n   - **Wilayah Sumatera:** Kenaikan $= 2.250 - 1.800 = 450$ ribu $\\implies \\frac{450}{1.800} \\times 100\\% = 25{,}0\\%$.\n   - **Wilayah Kalimantan:** Kenaikan $= 810 - 600 = 210$ ribu $\\implies \\frac{210}{600} \\times 100\\% = 35{,}0\\%$.\n   - **Wilayah Sulawesi:** Kenaikan $= 975 - 750 = 225$ ribu $\\implies \\frac{225}{750} \\times 100\\% = 30{,}0\\%$.\n   - **Wilayah Nusa Tenggara & Maluku-Papua:** Kenaikan $= 580 - 400 = 180$ ribu $\\implies \\frac{180}{400} \\times 100\\% = 45{,}0\\%$.\n2. **Evaluasi dan Kesimpulan:**\n   Laju pertumbuhan persentase tertinggi dicatatkan oleh **Wilayah Nusa Tenggara & Maluku-Papua** sebesar **$45{,}0\\%$**.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Sederhanakan Pecahan Pertumbuhan):**\n\n1. Sederhanakan rasio kenaikan terhadap basis:\n   - Jawa-Bali: $\\frac{900}{4.500} = \\frac{1}{5} = 20\\%$\n   - Sumatera: $\\frac{450}{1.800} = \\frac{1}{4} = 25\\%$\n   - Sulawesi: $\\frac{225}{750} = \\frac{3}{10} = 30\\%$\n   - Kalimantan: $\\frac{210}{600} = \\frac{7}{20} = 35\\%$\n   - Nusa Tenggara & Maluku-Papua: $\\frac{180}{400} = \\frac{9}{20} = 45\\%$\n2. Pecahan $\\frac{9}{20} = 45\\%$ adalah yang paling besar.\n3. Jawaban seketika **E**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah (Jebakan Nominal Terbesar):** Jawa-Bali mengalami penambahan terbanyak secara nominal (+900 ribu orang), namun karena basisnya sangat besar (4.500 ribu), persentase pertumbuhannya paling rendah (hanya 20,0%).\n- **Pilihan B, C, D Salah:** Persentase pertumbuhan Sumatera (25,0%), Kalimantan (35,0%), dan Sulawesi (30,0%) berada di bawah Nusa Tenggara & Maluku-Papua (45,0%)."
    },
    {
      "example_id": "pu-03-05-ex14",
      "variation_name": "Variasi 14: Persentase Pertumbuhan Stok Karbon Biru Estuari (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan estimasi cadangan stok simpanan karbon organik tanah (*soil organic carbon*) dalam satuan ton C/hektar pada empat kawasan estuari pesisir Indonesia pada tahun 2021 dan 2026:\n\n| Kawasan Estuari | Stok Karbon 2021 (ton C/ha) | Stok Karbon 2026 (ton C/ha) |\n| :--- | :---: | :---: |\n| Kawasan Estuari A (Mangrove Primer) | 250 | 310 |\n| Kawasan Estuari B (Restorasi Rawa Payau) | 80 | 124 |\n| Kawasan Estuari C (Laguna Terbuka) | 150 | 210 |\n| Kawasan Estuari D (Delta Muara Terlindungi) | 300 | 390 |",
      "question_markdown": "Kawasan estuari yang mencatatkan **persentase pertumbuhan stok simpanan karbon TERTINGGI** dari tahun 2021 ke tahun 2026 adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Kawasan Estuari A"
        },
        {
          "key": "B",
          "text_markdown": "Kawasan Estuari B"
        },
        {
          "key": "C",
          "text_markdown": "Kawasan Estuari C"
        },
        {
          "key": "D",
          "text_markdown": "Kawasan Estuari D"
        },
        {
          "key": "E",
          "text_markdown": "Kawasan Estuari A dan C sama tinggi"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Persentase pertumbuhan dihitung dari $\\frac{\\text{Kenaikan Nominal}}{\\text{Stok Awal 2021}} \\times 100\\%$. Waspada jebakan nominal: Kawasan Estuari D mengalami penambahan nominal terbesar (+90 ton C/ha), tetapi perhatikan nilai basis awalnya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Kenaikan Nominal dan Persentase Pertumbuhan Tiap Kawasan:**\n   - **Kawasan Estuari A:**\n     - Kenaikan nominal $= 310 - 250 = 60\\text{ ton C/ha}$\n     - Persentase pertumbuhan $= \\frac{60}{250} \\times 100\\% = 24\\%$\n   - **Kawasan Estuari B:**\n     - Kenaikan nominal $= 124 - 80 = 44\\text{ ton C/ha}$\n     - Persentase pertumbuhan $= \\frac{44}{80} \\times 100\\% = \\frac{11}{20} \\times 100\\% = 55\\%$\n   - **Kawasan Estuari C:**\n     - Kenaikan nominal $= 210 - 150 = 60\\text{ ton C/ha}$\n     - Persentase pertumbuhan $= \\frac{60}{150} \\times 100\\% = 40\\%$\n   - **Kawasan Estuari D:**\n     - Kenaikan nominal $= 390 - 300 = 90\\text{ ton C/ha}$ *(tertinggi secara nominal)*\n     - Persentase pertumbuhan $= \\frac{90}{300} \\times 100\\% = 30\\%$\n2. **Evaluasi dan Konklusi:**\n   - Pertumbuhan persentase tertinggi dicatatkan oleh **Kawasan Estuari B** sebesar **$55\\%$**, melampaui Estuari C ($40\\%$), Estuari D ($30\\%$), dan Estuari A ($24\\%$).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Sederhanakan Rasio Pertumbuhan):**\n\n1. Estuari A: $\\frac{60}{250} = \\frac{6}{25} = 24\\%$.\n2. Estuari B: $\\frac{44}{80} = \\frac{11}{20} = 55\\%$ *(Melampaui separuh / >50%)*.\n3. Estuari C: $\\frac{60}{150} = \\frac{4}{10} = 40\\%$.\n4. Estuari D: $\\frac{90}{300} = \\frac{3}{10} = 30\\%$.\n5. Hanya Estuari B yang laju pertumbuhannya melampaui $50\\%$. Pilihan **B** langsung keluar.",
      "why_others_are_wrong_markdown": "- **Pilihan D Salah (Jebakan Nominal Terbesar):** Estuari D mengalami pertambahan terbesar secara nominal (+90 ton C/ha), namun karena basis awalnya besar (300 ton C/ha), persentase kenaikannya hanya 30%.\n- **Pilihan A & C Salah:** Estuari A (24%) dan Estuari C (40%) memiliki persentase pertumbuhan di bawah Estuari B (55%).\n- **Pilihan E Salah:** Kenaikan nominal Estuari A dan C memang sama (+60 ton C/ha), namun persentasenya berbeda (24% vs 40%)."
    },
    {
      "example_id": "pu-03-05-ex15",
      "variation_name": "Variasi 15: Rekalibrasi Proporsi Subsidi Transportasi Publik Ramah Lingkungan (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam rancangan anggaran belanja subsidi energi dan kompensasi fiskal pemerintah pusat, dialokasikan total pagu anggaran sebesar **Rp360 triliun**. Diagram proporsi pos anggaran awal tercatat sebagai berikut:\n- Subsidi BBM Tertentu (Pertalite & Solar): **$35\\%$**\n- Subsidi LPG Tabung 3 Kg: **$30\\%$**\n- Subsidi Tarif Listrik Rumah Tangga & UMKM: **$25\\%$**\n- Subsidi Transportasi Publik Ramah Lingkungan: **$10\\%$**\n\nPada evaluasi paruh tahun, pemerintah memutuskan untuk memotong alokasi belanja **Subsidi BBM Tertentu sebesar $20\\%$ dari anggarannya semula**, dan seluruh dana hasil pemotongan tersebut **dialihkan sepenuhnya untuk menambah pagu anggaran Subsidi Transportasi Publik Ramah Lingkungan**.",
      "question_markdown": "Total anggaran akhir yang diterima oleh **Subsidi Transportasi Publik Ramah Lingkungan** setelah penambahan dana pengalihan tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Rp54,0 triliun"
        },
        {
          "key": "B",
          "text_markdown": "Rp57,6 triliun"
        },
        {
          "key": "C",
          "text_markdown": "Rp61,2 triliun"
        },
        {
          "key": "D",
          "text_markdown": "Rp64,8 triliun"
        },
        {
          "key": "E",
          "text_markdown": "Rp72,0 triliun"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** (1) Hitung anggaran mula-mula Subsidi Transportasi Publik: $10\\% \\times 360\\text{ triliun}$. (2) Hitung pemotongan Subsidi BBM: $20\\%$ dari porsi $35\\%$, yaitu $0{,}20 \\times 35\\% = 7\\%$. (3) Tambahkan $7\\%$ ke persentase Transportasi Publik ($10\\% + 7\\% = 17\\%$) atau hitung nominal dana alihannya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Anggaran Awal Masing-Masing Pos Relevan:**\n   - Total pagu anggaran $= \\text{Rp}360\\text{ triliun}$.\n   - Anggaran awal Subsidi BBM Tertentu ($35\\%$):\n     $$\\text{Pagu BBM} = 35\\% \\times 360 = \\text{Rp}126\\text{ triliun}$$\n   - Anggaran awal Subsidi Transportasi Publik ($10\\%$):\n     $$\\text{Pagu Transportasi Awal} = 10\\% \\times 360 = \\text{Rp}36\\text{ triliun}$$\n2. **Kalkulasi Besaran Dana Pengalihan dari Pemotongan BBM:**\n   - Pemotongan sebesar $20\\%$ dari anggaran BBM:\n     $$\\text{Dana Pengalihan} = 20\\% \\times \\text{Rp}126\\text{ triliun} = \\frac{1}{5} \\times 126 = \\text{Rp}25{,}2\\text{ triliun}$$\n3. **Kalkulasi Total Anggaran Akhir Subsidi Transportasi Publik:**\n   $$\\text{Pagu Akhir} = \\text{Rp}36\\text{ triliun} + \\text{Rp}25{,}2\\text{ triliun} = \\text{Rp}61{,}2\\text{ triliun}$$\n- **Konklusi:** Total anggaran akhir yang diterima Subsidi Transportasi Publik adalah **Rp61,2 triliun**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Persentase terhadap Total Pagu):**\n\n1. Pemotongan BBM dalam persentase pagu total: $20\\% \\times 35\\% = 7\\%$.\n2. Persentase baru Transportasi Publik: $10\\% + 7\\% = 17\\%$.\n3. Anggaran akhir: $17\\% \\times 360 = 17 \\times 3{,}6 = 61{,}2\\text{ triliun}$.\n4. Pilihan **C** langsung terkunci dalam 8 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Rp54,0 triliun merupakan $15\\% \\times 360$ (keliru mengira penambahan hanya 5%).\n- **Pilihan B Salah:** Rp57,6 triliun merupakan $16\\% \\times 360$.\n- **Pilihan D Salah:** Rp64,8 triliun merupakan $18\\% \\times 360$.\n- **Pilihan E Salah:** Rp72,0 triliun mengasumsikan porsi transportasi berlipat dua menjadi 20%."
    },
    {
      "example_id": "pu-03-05-ex16",
      "variation_name": "Variasi 16: Evaluasi Efektivitas Intervensi Mindfulness terhadap Skor Kecemasan (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menyajikan hasil uji klinis efektivitas program terapi kognitif berbasis mindfulness (*Mindfulness-Based Stress Reduction* / MBSR) terhadap penurunan skor kecemasan (*Hamilton Anxiety Rating Scale* / HARS) pada 240 orang partisipan yang dikelompokkan menurut derajat keparahan awal:\n\n| Kelompok Derajat Kecemasan | Jumlah Partisipan ($N$) | Rata-rata Skor HARS Pra-Intervensi | Rata-rata Skor HARS Pasca-Intervensi |\n| :--- | :---: | :---: :---: |\n| Kelompok Kecemasan Ringan | 60 | 18 | 10 |\n| Kelompok Kecemasan Sedang | 80 | 25 | 15 |\n| Kelompok Kecemasan Berat | 70 | 34 | 20 |\n| Kelompok Kecemasan Sangat Berat | 30 | 44 | 24 |",
      "question_markdown": "Berdasarkan data tabel tersebut, pernyataan evaluasi statistik berikut yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Akumulasi total penurunan poin skor kecemasan terbesar dicatatkan oleh Kelompok Kecemasan Sedang"
        },
        {
          "key": "B",
          "text_markdown": "Akumulasi total penurunan poin skor kecemasan pada Kelompok Kecemasan Berat adalah yang tertinggi di antara seluruh kelompok"
        },
        {
          "key": "C",
          "text_markdown": "Kelompok Kecemasan Ringan mencatatkan persentase penurunan rata-rata skor kecemasan terbesar di antara keempat kelompok"
        },
        {
          "key": "D",
          "text_markdown": "Rata-rata skor HARS pasca-intervensi untuk seluruh 240 partisipan gabungan adalah 17,25 poin"
        },
        {
          "key": "E",
          "text_markdown": "Jumlah penurunan rata-rata poin skor kecemasan pada Kelompok Sangat Berat adalah dua kali lipat penurunan poin pada Kelompok Sedang"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung penurunan poin individu tiap kelompok (Pra dikurangi Pasca), lalu kalikan dengan jumlah partisipan ($N$) untuk memperoleh akumulasi total penurunan poin: Ringan ($60 \\times 8$), Sedang ($80 \\times 10$), Berat ($70 \\times 14$), Sangat Berat ($30 \\times 20$). Bandingkan hasilnya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Penurunan Poin per Partisipan dan Akumulasi Kelompok:**\n   - **Kelompok Kecemasan Ringan ($N = 60$):**\n     - Penurunan rata-rata $= 18 - 10 = 8\\text{ poin}$\n     - Akumulasi total penurunan $= 60 \\times 8 = 480\\text{ poin}$\n     - Persentase penurunan $= \\frac{8}{18} \\times 100\\% \\approx 44{,}44\\%$\n   - **Kelompok Kecemasan Sedang ($N = 80$):**\n     - Penurunan rata-rata $= 25 - 15 = 10\\text{ poin}$\n     - Akumulasi total penurunan $= 80 \\times 10 = 800\\text{ poin}$\n     - Persentase penurunan $= \\frac{10}{25} \\times 100\\% = 40{,}00\\%$\n   - **Kelompok Kecemasan Berat ($N = 70$):**\n     - Penurunan rata-rata $= 34 - 20 = 14\\text{ poin}$\n     - Akumulasi total penurunan $= 70 \\times 14 = 980\\text{ poin}$ *(Tertinggi di antara seluruh kelompok!)*\n     - Persentase penurunan $= \\frac{14}{34} \\times 100\\% \\approx 41{,}18\\%$\n   - **Kelompok Kecemasan Sangat Berat ($N = 30$):**\n     - Penurunan rata-rata $= 44 - 24 = 20\\text{ poin}$\n     - Akumulasi total penurunan $= 30 \\times 20 = 600\\text{ poin}$\n     - Persentase penurunan $= \\frac{20}{44} \\times 100\\% \\approx 45{,}45\\%$\n2. **Evaluasi Pernyataan B:**\n   - Akumulasi total penurunan poin Kelompok Berat ($980\\text{ poin}$) terbukti melampaui Kelompok Sedang ($800\\text{ poin}$), Kelompok Sangat Berat ($600\\text{ poin}$), dan Kelompok Ringan ($480\\text{ poin}$).\n   - Pernyataan B mutlak **PASTI BENAR**.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Perkalian Bobot Akumulasi):**\n\n1. Selisih poin: Ringan $= 8$, Sedang $= 10$, Berat $= 14$, Sangat Berat $= 20$.\n2. Akumulasi $= N \\times \\Delta$:\n   - Ringan: $60 \\times 8 = 480$\n   - Sedang: $80 \\times 10 = 800$\n   - Berat: $70 \\times 14 = 980$ ★\n   - Sangat Berat: $30 \\times 20 = 600$\n3. Angka 980 adalah puncak tertinggi. Pilihan **B** langsung terbukti valid.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Akumulasi Kelompok Sedang adalah 800 poin, masih berada di bawah Kelompok Berat (980 poin).\n- **Pilihan C Salah:** Persentase penurunan tertinggi dipegang oleh Kelompok Sangat Berat (45,45%), bukan Kelompok Ringan (44,44%).\n- **Pilihan D Salah:** Rata-rata skor pasca-intervensi gabungan adalah $\\frac{600 + 1.200 + 1.400 + 720}{240} = \\frac{3.920}{240} \\approx 16{,}33$ poin (bukan 17,25).\n- **Pilihan E Salah:** Penurunan skor Sangat Berat (20 poin) memang dua kali lipat penurunan Sedang (10 poin), tetapi opsi ini berbicara per individu, sedangkan opsi B merupakan evaluasi statistik akumulatif teruji."
    },
    {
      "example_id": "pu-03-05-ex17",
      "variation_name": "Variasi 17: Laju Pertumbuhan Kapasitas Produksi Baterai LFP Gigafactory (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Data berikut mencatat kapasitas produksi tahunan sel baterai litium besi fosfat (*Lithium Iron Phosphate* / LFP) di sebuah fasilitas gigafactory kendaraan listrik dari tahun 2021 hingga 2025:\n- Tahun 2021: **$16\\text{ GWh}$**\n- Tahun 2022: **$24\\text{ GWh}$**\n- Tahun 2023: **$30\\text{ GWh}$**\n- Tahun 2024: **$48\\text{ GWh}$**\n- Tahun 2025: **$60\\text{ GWh}$**",
      "question_markdown": "Laju persentase kenaikan kapasitas produksi baterai tahunan **TERTINGGI** dalam satu periode tahun berturut-turut terjadi pada perpindahan dari tahun...",
      "options": [
        {
          "key": "A",
          "text_markdown": "2021 ke 2022"
        },
        {
          "key": "B",
          "text_markdown": "2022 ke 2023"
        },
        {
          "key": "C",
          "text_markdown": "2023 ke 2024"
        },
        {
          "key": "D",
          "text_markdown": "2024 ke 2025"
        },
        {
          "key": "E",
          "text_markdown": "2021 ke 2023"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung persentase laju pertumbuhan tiap periode berturut-turut: $\\frac{\\text{Kapasitas Akhir} - \\text{Kapasitas Awal}}{\\text{Kapasitas Awal}} \\times 100\\%$. Waspada jangan terkecoh antara periode 2021-2022 ($+8\\text{ GWh}$) dan 2023-2024 ($+18\\text{ GWh}$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Laju Pertumbuhan Persentase Tiap Periode Tahunan:**\n   - **Periode 2021 ke 2022:**\n     $$\\%\\Delta = \\frac{24 - 16}{16} \\times 100\\% = \\frac{8}{16} \\times 100\\% = 50{,}0\\%$$\n   - **Periode 2022 ke 2023:**\n     $$\\%\\Delta = \\frac{30 - 24}{24} \\times 100\\% = \\frac{6}{24} \\times 100\\% = 25{,}0\\%$$\n   - **Periode 2023 ke 2024:**\n     $$\\%\\Delta = \\frac{48 - 30}{30} \\times 100\\% = \\frac{18}{30} \\times 100\\% = \\frac{3}{5} \\times 100\\% = 60{,}0\\%$$\n   - **Periode 2024 ke 2025:**\n     $$\\%\\Delta = \\frac{60 - 48}{48} \\times 100\\% = \\frac{12}{48} \\times 100\\% = \\frac{1}{4} \\times 100\\% = 25{,}0\\%$$\n2. **Evaluasi dan Kesimpulan:**\n   - Laju kenaikan persentase tertinggi terjadi pada periode **2023 ke 2024** dengan pertumbuhan sebesar **$60{,}0\\%$**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Sederhanakan Pecahan Pertumbuhan):**\n\n1. $2021 \\to 2022: \\frac{8}{16} = 0{,}50 = 50\\%$.\n2. $2022 \\to 2023: \\frac{6}{24} = 0{,}25 = 25\\%$.\n3. $2023 \\to 2024: \\frac{18}{30} = \\frac{3}{5} = 0{,}60 = 60\\%$ ★ *(Paling Tajam)*.\n4. $2024 \\to 2025: \\frac{12}{48} = 0{,}25 = 25\\%$.\n5. Laju $60\\%$ adalah yang tertinggi. Jawaban **C** didapat dalam 5 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Laju pertumbuhan 2021 ke 2022 adalah 50,0%, berada di bawah periode 2023 ke 2024 (60,0%).\n- **Pilihan B & D Salah:** Periode 2022-2023 dan 2024-2025 sama-sama hanya mencatatkan kenaikan 25,0%.\n- **Pilihan E Salah:** Mencakup rentang dua tahun sekaligus, bukan satu periode berturut-turut."
    },
    {
      "example_id": "pu-03-05-ex18",
      "variation_name": "Variasi 18: Komparasi Penerimaan Tiket Wisatawan Kompleks Percandian Cagar Budaya (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tabel berikut menunjukkan proporsi kategori wisatawan dan tarif tiket masuk di sebuah kompleks percandian cagar budaya nasional selama periode liburan musim libur sekolah dengan total kunjungan mencapai **120.000 orang**:\n\n| Kategori Wisatawan | Proporsi Pengunjung (%) | Tarif Tiket Masuk (Rp/orang) |\n| :--- | :---: | :---: |\n| Pelajar & Mahasiswa Domestik | 40% | Rp25.000,00 |\n| Wisatawan Umum Dewasa Domestik | 35% | Rp50.000,00 |\n| Wisatawan Mancanegara Anak-anak | 10% | Rp150.000,00 |\n| Wisatawan Mancanegara Dewasa | 15% | Rp350.000,00 |",
      "question_markdown": "Berdasarkan data tabel tersebut, selisih total penerimaan pendapatan tiket antara kelompok **Wisatawan Mancanegara Dewasa** dan kelompok **Wisatawan Umum Dewasa Domestik** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Rp3.600.000.000,00"
        },
        {
          "key": "B",
          "text_markdown": "Rp4.200.000.000,00"
        },
        {
          "key": "C",
          "text_markdown": "Rp4.500.000.000,00"
        },
        {
          "key": "D",
          "text_markdown": "Rp4.800.000.000,00"
        },
        {
          "key": "E",
          "text_markdown": "Rp5.100.000.000,00"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung jumlah orang pada kedua kelompok: Wisatawan Mancanegara Dewasa ($15\\% \\times 120.000$) dan Wisatawan Umum Dewasa Domestik ($35\\% \\times 120.000$). Kalikan masing-masing dengan tarif tiketnya, lalu cari selisih pengurangannya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n1. **Kalkulasi Penerimaan Wisatawan Mancanegara Dewasa:**\n   - Jumlah pengunjung $= 15\\% \\times 120.000 = 18.000\\text{ orang}$\n   - Tarif tiket $= \\text{Rp}350.000,00$\n   - Total penerimaan tiket:\n     $$\\text{Penerimaan} = 18.000 \\times \\text{Rp}350.000 = \\text{Rp}6.300.000.000,00$$\n2. **Kalkulasi Penerimaan Wisatawan Umum Dewasa Domestik:**\n   - Jumlah pengunjung $= 35\\% \\times 120.000 = 42.000\\text{ orang}$\n   - Tarif tiket $= \\text{Rp}50.000,00$\n   - Total penerimaan tiket:\n     $$\\text{Penerimaan} = 42.000 \\times \\text{Rp}50.000 = \\text{Rp}2.100.000.000,00$$\n3. **Perhitungan Selisih Penerimaan Tiket:**\n   $$\\Delta = \\text{Rp}6.300.000.000 - \\text{Rp}2.100.000.000 = \\text{Rp}4.200.000.000,00$$\n- **Konklusi:** Selisih total penerimaan antara kedua kelompok wisatawan tersebut adalah **Rp4.200.000.000,00** (Rp4,2 miliar).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Nilai Rata-Rata per Pengunjung):**\n\n1. Kontribusi per pengunjung total:\n   - Wisman Dewasa $= 15\\% \\times 350.000 = \\text{Rp}52.500$\n   - Domestik Dewasa $= 35\\% \\times 50.000 = \\text{Rp}17.500$\n2. Selisih kontribusi per orang $= 52.500 - 17.500 = \\text{Rp}35.000$.\n3. Selisih total $= 120.000 \\times 35.000 = \\text{Rp}4.200.000.000,00$.\n4. Jawaban **B** didapatkan tanpa menghitung miliaran panjang.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Rp3.600.000.000,00 didapat jika keliru menghitung tarif wisman dewasa Rp300.000.\n- **Pilihan C Salah:** Kesalahan perkalian $42.000 \\times 50.000 = 1{,}8$ miliar sehingga selisihnya menjadi 4,5 miliar.\n- **Pilihan D & E Salah:** Hasil estimasi kasar yang tidak akurat dalam mengalikan proporsi persentase."
    }
  ]
};
