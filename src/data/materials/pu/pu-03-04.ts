import type { Material } from '../../../types/material';

export const MATERIAL_PU_03_04: Material = {
  "metadata": {
    "id": "pu-3-4",
    "subtest": "PU",
    "chapter_num": 3,
    "chapter_title": "Penalaran Kuantitatif",
    "subchapter_num": "3.4",
    "subchapter_title": "Perbandingan Senilai dan Berbalik Nilai",
    "title": "Perbandingan Senilai dan Berbalik Nilai",
    "required_question_variations": [
      "Perbandingan Senilai dan Rasio Bertingkat (A:B:C)",
      "Perbandingan Berbalik Nilai pada Waktu dan Kecepatan",
      "Beban Kerja Bersama dan Pekerja Tambahan Terhenti (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-09"
  },
  "content": {
    "tactical_overview": "Perbandingan adalah instrumen penalaran kuantitatif fundamental di UTBK SNBT yang menguji pemahaman Anda terhadap hubungan proporsional antarvariabel. Fondasi terpenting adalah membedakan jenis hubungan secara akurat: jika variabel pertama naik dan variabel kedua ikut naik dengan rasio tetap, itu adalah perbandingan senilai; jika variabel pertama naik tetapi variabel kedua justru menurun (seperti menambah pekerja yang membuat waktu selesai berkurang), itu adalah perbandingan berbalik nilai. Pada variasi HOTS proyek terhenti, jangan pernah mengulang hitungan dari awal: selalu fokuslah pada \"sisa beban kerja\" (sisa hari dikali jumlah pekerja) yang harus dibagi dengan sisa hari yang masih tersedia.",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nPerbandingan di UTBK SNBT terbagi menjadi dua pilar utama:\n\n1. **Perbandingan Senilai (*Direct Proportion*)**  \n   Dua variabel $X$ dan $Y$ berbanding lurus, di mana rasio keduanya bernilai konstan:  \n   $\\frac{X_1}{Y_1} = \\frac{X_2}{Y_2} \\iff X_1 \\cdot Y_2 = X_2 \\cdot Y_1$  \n   - *Konteks Nyata:* Jumlah konsumsi bahan bakar vs jarak tempuh, jumlah barang dibeli vs total harga, atau perbandingan skala peta.  \n   - **Rasio Bertingkat ($A : B$ dan $B : C$):**  \n     Jika $A : B = p : q$ dan $B : C = m : n$, samakan nilai $B$ dengan mencari KPK dari $q$ dan $m$:  \n     $A : B : C = (p \\cdot m) : (q \\cdot m) : (n \\cdot q)$\n\n2. **Perbandingan Berbalik Nilai (*Inverse Proportion*)**  \n   Dua variabel $X$ dan $Y$ berbanding terbalik, di mana hasil kali keduanya bernilai konstan:  \n   $X_1 \\cdot Y_1 = X_2 \\cdot Y_2 \\iff \\frac{X_1}{X_2} = \\frac{Y_2}{Y_1}$  \n   - *Konteks Nyata:* Kecepatan vs waktu tempuh pada jarak yang sama, atau jumlah pekerja vs durasi waktu penyelesaian proyek.\n\n3. **Manajemen Beban Kerja Proyek Terhenti (HOTS)**  \n   Total pekerjaan diukur dalam satuan *\"Beban Orang-Hari\"* ($Pek = Orang \\times Hari$).  \n   - Ketika proyek terhenti di tengah jalan:  \n     $\\text{Sisa Beban Kerja} = (\\text{Sisa Hari Normal}) \\times (\\text{Pekerja Semula})$  \n     $\\text{Pekerja Baru yang Dibutuhkan} = \\frac{\\text{Sisa Beban Kerja}}{\\text{Sisa Hari Nyata}}$  \n     $\\text{Pekerja Tambahan} = \\text{Pekerja Baru} - \\text{Pekerja Semula}$\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\n1. **Jebakan Salah Menentukan Arah Perbandingan**  \n   Menggunakan perkalian silang (senilai) untuk kasus pekerja dan waktu, sehingga diperoleh hasil yang tidak logis (misalnya menambah pekerja malah membuat waktu pengerjaan menjadi lebih lama).\n2. **Jebakan Menghitung Beban dari Hari Ke-0 pada Proyek Terhenti**  \n   Siswa sering menghitung ulang total beban proyek dari awal, padahal sebagian pekerjaan sudah selesai dikerjakan pada hari-hari awal. Selalu langsung fokus pada **hari yang tersisa**.\n3. **Jebakan Pertanyaan Pekerja Tambahan vs Total Pekerja**  \n   Jika soal menanyakan *\"berapa pekerja tambahan yang diperlukan\"*, siswa yang terburu-buru sering memilih angka total pekerja baru, lupa mengurangkannya dengan jumlah pekerja semula.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\n1. **Uji Arah Hubungan Sebelum Menghitung**  \n   Tanyakan dalam hati: *\"Jika X ditambah, apakah Y makin banyak atau makin sedikit?\"*  \n   - Makin banyak $\\to$ **Senilai** (perkalian silang: $X_1 Y_2 = X_2 Y_1$).  \n   - Makin sedikit $\\to$ **Berbalik Nilai** (perkalian lurus: $X_1 Y_1 = X_2 Y_2$).\n2. **Rumus Sakti Proyek Terhenti (10 Detik)**  \n   $\\text{Pekerja Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Semula}$  \n   Rumus kilat ini langsung menghasilkan jumlah pekerja tambahan tanpa perlu menghitung total beban kerja!\n3. **Penyamaan Rasio N-Bentuk (Rasio Bertingkat)**  \n   Susun:  \n   $A : B = p : q$  \n   $B : C = m : n$  \n   Kalikan menyilang: $A = p \\times m$, $B = q \\times m$, $C = q \\times n$.\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Materi:** Menentukan konstanta relasi matematis (rasio tetap vs hasil kali tetap) antarvariabel yang saling memengaruhi.\n- **Kaidah Identifikasi:** Senilai jika bergerak searah ($X \\uparrow, Y \\uparrow$), Berbalik Nilai jika berlawanan arah ($X \\uparrow, Y \\downarrow$).\n- **Strategi Proyek Terhenti:** Gunakan rumus sakti:\n  $\\text{Pekerja Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Perbandingan Senilai dan Berbalik Nilai yang paling sering keluar pada naskah UTBK SNBT, lengkap dengan konteks soal, opsi pilihan ganda utuh, kunci jawaban, dan pembahasan logika secara terperinci:\n\n### Variasi 1: Perbandingan Senilai dan Rasio Bertingkat (A:B:C)\n\n> **Konteks Masalah Soal:**  \n> Perbandingan uang tabungan Alif dan Budi adalah $3 : 4$, sedangkan perbandingan uang tabungan Budi dan Cici adalah $5 : 6$. Jika selisih uang tabungan Alif dan Cici adalah Rp450.000,00, berapakah jumlah uang tabungan Budi?  \n>  \n> **Pertanyaan UTBK:** *Jumlah uang tabungan Budi berdasarkan informasi tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Rp800.000,00  \n> - **B.** Rp900.000,00  \n> - **C.** Rp1.000.000,00  \n> - **D.** Rp1.100.000,00  \n> - **E.** Rp1.200.000,00\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Menyatukan Perbandingan Bertingkat ($A : B : C$):**  \n  - $A : B = 3 : 4$  \n  - $B : C = 5 : 6$  \n  - KPK dari nilai pembanding $B$ (yaitu 4 dan 5) adalah 20.  \n  - Kalikan rasio pertama dengan 5: $A : B = 15 : 20$.  \n  - Kalikan rasio kedua dengan 4: $B : C = 20 : 24$.  \n  - Perbandingan gabungan:  \n    $A : B : C = 15 : 20 : 24$\n- **Menentukan Nilai Satuan Porsi Tabungan:**  \n  - Selisih porsi $C$ dan $A$ adalah:  \n    $24 - 15 = 9 \\text{ bagian}$  \n  - Nilai 9 bagian tersebut setara dengan Rp450.000,00.  \n  - Maka nilai 1 bagian rasio adalah:  \n    $\\text{Nilai } 1 \\text{ bagian} = \\frac{\\text{Rp450.000,00}}{9} = \\text{Rp50.000,00}$\n- **Menghitung Tabungan Budi:**  \n  - Tabungan Budi memiliki porsi 20 bagian:  \n    $\\text{Tabungan Budi} = 20 \\times \\text{Rp50.000,00} = \\text{Rp1.000.000,00}$\n- **Mengapa Opsi Lain Salah?**  \n  - Pilihan A (Rp800.000) dan B (Rp900.000) terjadi jika siswa keliru menghitung porsi Alif atau salah menentukan selisih bagian ($24 - 15$ disangka 10 bagian).  \n  - Pilihan D dan E keliru dalam mengalikan nilai porsi Budi.\n- **Penerapan Trik Cepat (15 Detik):** $A:B:C = 15:20:24$. Selisih $C - A = 9$ bagian $= 450$ ribu $\\implies 1$ bagian $= 50$ ribu. Budi $= 20$ bagian $\\implies 20 \\times 50$ ribu $= 1.000$ ribu (Rp1.000.000,00). Pilihan **C** langsung terkunci.\n\n---\n\n### Variasi 2: Perbandingan Berbalik Nilai pada Waktu dan Kecepatan\n\n> **Konteks Masalah Soal:**  \n> Sebuah mobil menempuh perjalanan dari Kota P ke Kota Q dengan kecepatan rata-rata $60\\text{ km/jam}$ dalam waktu $3\\text{ jam } 30\\text{ menit}$. Jika dalam perjalanan pulang pengemudi ingin menyingkat waktu tempuh menjadi hanya $2\\text{ jam } 20\\text{ menit}$, berapakah kecepatan rata-rata yang harus dipertahankan?  \n>  \n> **Pertanyaan UTBK:** *Kecepatan rata-rata mobil pada perjalanan pulang tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** $75\\text{ km/jam}$  \n> - **B.** $80\\text{ km/jam}$  \n> - **C.** $85\\text{ km/jam}$  \n> - **D.** $90\\text{ km/jam}$  \n> - **E.** $95\\text{ km/jam}$\n\n**Kunci Jawaban: D**\n\n**Bedah Logika & Pembahasan:**\n- **Identifikasi Jenis Perbandingan:**  \n  Jarak antara Kota P dan Kota Q adalah tetap. Semakin cepat mobil melaju, waktu yang dibutuhkan semakin singkat. Ini adalah kasus **perbandingan berbalik nilai**:  \n  $v_1 \\cdot t_1 = v_2 \\cdot t_2$\n- **Konversi Waktu ke Satuan Jam / Menit:**  \n  - $t_1 = 3\\text{ jam } 30\\text{ menit} = 210\\text{ menit}$ (atau $3{,}5\\text{ jam}$).  \n  - $t_2 = 2\\text{ jam } 20\\text{ menit} = 140\\text{ menit}$ (atau $2\\frac{1}{3}\\text{ jam}$).  \n  - $v_1 = 60\\text{ km/jam}$.\n- **Perhitungan Kecepatan $v_2$:**  \n  $v_2 = \\frac{v_1 \\cdot t_1}{t_2} = \\frac{60 \\times 210}{140}$  \n  Sederhanakan pecahan $\\frac{210}{140} = \\frac{3}{2}$:  \n  $v_2 = 60 \\times \\frac{3}{2} = 90\\text{ km/jam}$\n- **Mengapa Opsi Lain Salah?**  \n  - Pilihan A ($75$) dan B ($80$) dihitung jika menggunakan perbandingan senilai secara keliru.  \n  - Pilihan C dan E terjadi akibat kesalahan pembagian menit.\n- **Penerapan Trik Cepat (15 Detik):** Gunakan rasio menit: $t_1 : t_2 = 210 : 140 = 3 : 2$. Karena berbalik nilai, rasio kecepatan dibalik: $v_1 : v_2 = 2 : 3$. Jika $2$ bagian $= 60\\text{ km/jam}$, maka $3$ bagian $= 90\\text{ km/jam}$. Jawaban tepat adalah pilihan **D**.\n\n---\n\n### Variasi 3: Beban Kerja Bersama dan Pekerja Tambahan Terhenti / HOTS\n\n> **Konteks Masalah Soal:**  \n> Sebuah proyek renovasi jembatan ditargetkan selesai dalam waktu $40\\text{ hari}$ dengan mempekerjakan $24\\text{ orang}$ pekerja. Setelah pekerjaan berjalan selama $15\\text{ hari}$, proyek terpaksa dihentikan selama $5\\text{ hari}$ akibat kendala banjir luapan sungai. Agar proyek tersebut tetap selesai tepat waktu sesuai jadwal semula, berapa orang pekerja tambahan yang wajib didatangkan?  \n>  \n> **Pertanyaan UTBK:** *Jumlah pekerja tambahan yang diperlukan adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** 4 orang  \n> - **B.** 6 orang  \n> - **C.** 8 orang  \n> - **D.** 10 orang  \n> - **E.** 30 orang\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Sisa Waktu Proyek:**  \n  - Waktu total rencana: $40\\text{ hari}$.  \n  - Waktu yang sudah berjalan: $15\\text{ hari}$.  \n  - Sisa hari rencana normal: $40 - 15 = 25\\text{ hari}$.  \n  - Pekerjaan terhenti selama: $5\\text{ hari}$.  \n  - Sisa hari nyata yang tersedia: $25 - 5 = 20\\text{ hari}$.\n- **Metode 1 (Konsep Formal Beban Kerja):**  \n  - Sisa beban kerja yang belum selesai:  \n    $\\text{Beban} = 25\\text{ hari} \\times 24\\text{ pekerja} = 600\\text{ orang-hari}$  \n  - Jumlah pekerja baru ($P_{baru}$) yang dibutuhkan agar 600 beban ini tuntas dalam 20 hari:  \n    $P_{baru} = \\frac{600}{20} = 30\\text{ orang}$  \n  - Jumlah pekerja **tambahan** yang diperlukan:  \n    $\\text{Tambahan} = P_{baru} - P_{lama} = 30 - 24 = 6\\text{ orang}$\n- **Metode 2 (Rumus Sakti Kilat 10 Detik):**  \n  $\\text{Tambahan} = \\frac{5}{20} \\times 24 = \\frac{1}{4} \\times 24 = 6\\text{ orang}$  \n  Hasilnya identik secara instan!\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan E Salah (Jebakan Terbesar):** Angka $30$ adalah total pekerja yang dibutuhkan, bukan pekerja tambahan! Siswa yang terburu-buru sering terjebak memilih E.  \n  - **Pilihan A, C, D Salah:** Terjadi karena salah membagi dengan total hari 40 atau lupa menghitung 5 hari terhenti.\n- **Penerapan Trik Cepat (15 Detik):** Rumus kilat: $\\frac{\\text{Hari Libur}}{\\text{Sisa Hari}} \\times \\text{Pekerja} = \\frac{5}{20} \\times 24 = 6$ orang. Dalam 5 detik, jawaban **B** langsung keluar.",
    "visualizations_svg": [],
    "distractor_traps": [
      "Jebakan Total Pekerja vs Pekerja Tambahan: Memilih angka 30 padahal yang ditanyakan adalah pekerja tambahannya (30 - 24 = 6).",
      "Mengalikan silang pada perbandingan waktu dan pekerja (keliru menganggap senilai).",
      "Menghitung beban proyek dari hari ke-0 bukan dari hari yang tersisa."
    ],
    "quick_execution_algorithm": [
      "Tentukan jenis perbandingan: berbanding lurus (senilai) atau berbanding terbalik.",
      "Pada rasio bertingkat A:B dan B:C, samakan nilai B dengan KPK untuk membuat rasio A:B:C.",
      "Pada proyek terhenti, gunakan rumus sakti: (Hari Terhenti / Sisa Hari Nyata) x Pekerja Semula.",
      "Periksa dengan teliti apakah pertanyaan meminta nilai total atau nilai selisih/tambahan."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-03-04-ex1",
      "variation_name": "Variasi 1: Rasio Bertingkat Tabungan (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Perbandingan uang tabungan Alif dan Budi adalah 3 : 4, sedangkan perbandingan uang tabungan Budi dan Cici adalah 5 : 6. Jika selisih uang tabungan Alif dan Cici adalah Rp450.000,00, berapakah jumlah uang tabungan Budi?",
      "question_markdown": "Jumlah uang tabungan Budi berdasarkan informasi tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Rp800.000,00"
        },
        {
          "key": "B",
          "text_markdown": "Rp900.000,00"
        },
        {
          "key": "C",
          "text_markdown": "Rp1.000.000,00"
        },
        {
          "key": "D",
          "text_markdown": "Rp1.100.000,00"
        },
        {
          "key": "E",
          "text_markdown": "Rp1.200.000,00"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Samakan nilai Budi pada kedua perbandingan! Budi bernilai 4 pada rasio pertama dan bernilai 5 pada rasio kedua. Jadikan 20!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rasio Gabungan:**\n  - $A : B = 3 : 4 = 15 : 20$.\n  - $B : C = 5 : 6 = 20 : 24$.\n  - Maka $A : B : C = 15 : 20 : 24$.\n- **Nilai Per Bagian:**\n  - Selisih $C - A = 24 - 15 = 9$ bagian.\n  - $9$ bagian $= 450.000 \\implies 1$ bagian $= 50.000$.\n- **Tabungan Budi:**\n  - Budi $= 20$ bagian $= 20 \\times 50.000 = \\text{Rp1.000.000,00}$.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Skala Porsi):**\n\n1. $A:B:C = 15:20:24$.\n2. Selisih $C - A = 9$ bagian $= 450.000 \\implies 1$ bagian $= 50.000$.\n3. Budi $= 20$ bagian $\\implies 20 \\times 50.000 = 1.000.000$.\n4. Jawaban **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A, B, D, E Salah:** Terjadi karena salah membagi selisih 9 bagian atau salah mengalikan bagian Budi."
    },
    {
      "example_id": "pu-03-04-ex2",
      "variation_name": "Variasi 2: Kecepatan dan Waktu Berbalik Nilai (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah mobil menempuh perjalanan dari Kota P ke Kota Q dengan kecepatan rata-rata 60 km/jam dalam waktu 3 jam 30 menit (210 menit). Jika pengemudi ingin menyingkat waktu tempuh pulang menjadi 2 jam 20 menit (140 menit), berapakah kecepatan rata-rata yang harus dipertahankan?",
      "question_markdown": "Kecepatan rata-rata mobil pada perjalanan pulang tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "75 km/jam"
        },
        {
          "key": "B",
          "text_markdown": "80 km/jam"
        },
        {
          "key": "C",
          "text_markdown": "85 km/jam"
        },
        {
          "key": "D",
          "text_markdown": "90 km/jam"
        },
        {
          "key": "E",
          "text_markdown": "95 km/jam"
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Ini perbandingan berbalik nilai (kecepatan x waktu = jarak tetap). v1 x t1 = v2 x t2. Masukkan waktu dalam satuan menit: 210 menit dan 140 menit.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rumus:** $v_1 \\cdot t_1 = v_2 \\cdot t_2$.\n- $60 \\times 210 = v_2 \\times 140$.\n- $v_2 = \\frac{60 \\times 210}{140} = 60 \\times \\frac{3}{2} = 90\\text{ km/jam}$.\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Rasio Terbalik):**\n\n1. Rasio waktu: $210 : 140 = 3 : 2$.\n2. Rasio kecepatan dibalik: $2 : 3$.\n3. Jika $2$ bagian $= 60\\text{ km/jam}$, maka $3$ bagian $= 90\\text{ km/jam}$.\n4. Jawaban **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan A, B Salah:** Hasil jika menghitung dengan perbandingan senilai.\n- **Pilihan C, E Salah:** Kesalahan hitung pada pembagian rasio waktu."
    },
    {
      "example_id": "pu-03-04-ex3",
      "variation_name": "Variasi 3: Proyek Terhenti dan Pekerja Tambahan (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah proyek renovasi jembatan ditargetkan selesai dalam waktu 40 hari dengan mempekerjakan 24 orang pekerja. Setelah pekerjaan berjalan selama 15 hari, proyek terpaksa dihentikan selama 5 hari akibat kendala banjir luapan sungai. Agar proyek tersebut tetap selesai tepat waktu sesuai jadwal semula, berapa orang pekerja tambahan yang wajib didatangkan?",
      "question_markdown": "Jumlah **pekerja tambahan** yang diperlukan adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "4 orang"
        },
        {
          "key": "B",
          "text_markdown": "6 orang"
        },
        {
          "key": "C",
          "text_markdown": "8 orang"
        },
        {
          "key": "D",
          "text_markdown": "10 orang"
        },
        {
          "key": "E",
          "text_markdown": "30 orang"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan rumus kilat proyek terhenti: Pekerja Tambahan = (Hari Terhenti / Sisa Hari Nyata) x Pekerja Semula. Hari terhenti = 5, sisa hari nyata = (40 - 15) - 5 = 20 hari.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Sisa Beban Kerja:**\n  - Sisa hari normal $= 40 - 15 = 25$ hari.\n  - Beban $= 25 \\times 24 = 600$ orang-hari.\n- **Sisa Waktu Nyata:** $25 - 5 = 20$ hari.\n- **Kebutuhan Pekerja Baru:** $\\frac{600}{20} = 30$ orang.\n- **Pekerja Tambahan:** $30 - 24 = 6$ orang.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Sakti 10 Detik):**\n\n1. Tambahan $= \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$.\n2. Tambahan $= \\frac{5}{20} \\times 24 = \\frac{1}{4} \\times 24 = 6$ orang.\n3. Jawaban langsung **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan E Salah (Jebakan Utama):** 30 adalah total seluruh pekerja, bukan pekerja tambahan!\n- **Pilihan A, C, D Salah:** Kesalahan hitung pada pembagian sisa hari."
    },
    {
      "example_id": "pu-03-04-ex4",
      "variation_name": "Variasi 1: Debit Aliran Pipa Ganda Simultan Tandon Konservasi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah tandon penampungan air hujan ramah lingkungan di stasiun riset ekologi dilengkapi dua pipa pengisi (Pipa A dan Pipa B) serta satu pipa pembuangan (Pipa C). Jika dibuka secara terpisah dalam kondisi awal tandon kosong, Pipa A dapat mengisi penuh tandon dalam waktu $6\\text{ jam}$, sedangkan Pipa B dapat mengisinya penuh dalam waktu $9\\text{ jam}$. Sementara itu, pipa pembuangan (Pipa C) mampu mengosongkan seluruh isi tandon yang penuh dalam waktu $18\\text{ jam}$.",
      "question_markdown": "Jika pada kondisi tandon kosong, Pipa A, Pipa B, dan Pipa C dibuka secara **bersamaan**, waktu yang dibutuhkan hingga tandon tersebut terisi penuh adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "3 jam 45 menit"
        },
        {
          "key": "B",
          "text_markdown": "4 jam 15 menit"
        },
        {
          "key": "C",
          "text_markdown": "4 jam 30 menit"
        },
        {
          "key": "D",
          "text_markdown": "5 jam 00 menit"
        },
        {
          "key": "E",
          "text_markdown": "5 jam 15 menit"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung laju debit per jam dari masing-masing pipa: Pipa A mengisi $+1/6$, Pipa B mengisi $+1/9$, dan Pipa C mengosongkan $-1/18$. Jumlahkan seluruh laju debit dengan menyamakan penyebutnya ke angka 18, lalu balikkan pecahannya untuk memperoleh total waktu!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Definisi Laju Debit per Jam:**\n  - Laju pengisian Pipa A: $V_A = \\frac{1}{6}\\text{ tandon/jam}$\n  - Laju pengisian Pipa B: $V_B = \\frac{1}{9}\\text{ tandon/jam}$\n  - Laju pengosongan Pipa C: $V_C = -\\frac{1}{18}\\text{ tandon/jam}$\n- **Laju Akumulasi Debit Gabungan ($V_{\\text{total}}$):**\n  $$V_{\\text{total}} = V_A + V_B - V_C = \\frac{1}{6} + \\frac{1}{9} - \\frac{1}{18}$$\n  - Samakan penyebut dengan KPK dari 6, 9, dan 18, yaitu 18:\n    $$V_{\\text{total}} = \\frac{3}{18} + \\frac{2}{18} - \\frac{1}{18} = \\frac{3 + 2 - 1}{18} = \\frac{4}{18} = \\frac{2}{9}\\text{ tandon/jam}$$\n- **Perhitungan Waktu Total Pengisian ($t$):**\n  $$t = \\frac{1}{V_{\\text{total}}} = \\frac{1}{\\frac{2}{9}} = \\frac{9}{2}\\text{ jam} = 4{,}5\\text{ jam}$$\n  - Konversi 0,5 jam ke menit:\n    $$0{,}5 \\times 60\\text{ menit} = 30\\text{ menit}$$\n  - Maka waktu total adalah **4 jam 30 menit**.\n- **Konklusi:** Tandon akan terisi penuh dalam waktu **4 jam 30 menit**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (KPK Debit 18 Bagian):**\n\n1. Kapasitas tandon $= 18\\text{ bagian}$.\n2. Laju A $= 18 / 6 = +3$ bagian/jam.\n3. Laju B $= 18 / 9 = +2$ bagian/jam.\n4. Laju C $= 18 / 18 = -1$ bagian/jam.\n5. Laju netto $= 3 + 2 - 1 = 4$ bagian/jam.\n6. Waktu $= \\frac{18}{4} = 4{,}5\\text{ jam} = 4\\text{ jam } 30\\text{ menit}$. Jawaban **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjadi jika salah menghitung debit $18 / 5$ atau salah konversi pecahan jam.\n- **Pilihan B Salah:** Mengasumsikan 4,25 jam (4 jam 15 menit) akibat keliru membagi pecahan.\n- **Pilihan D Salah:** Terjadi jika lupa memperhitungkan pipa pembuangan C (hanya menghitung A dan B yang menghasilkan $\\frac{18}{5} = 3{,}6$ jam).\n- **Pilihan E Salah:** Kesalahan aritmetika pada pengurangan debit pembuangan."
    },
    {
      "example_id": "pu-03-04-ex5",
      "variation_name": "Variasi 2: Beban Kerja Proyek Terhenti Jalan Logistik (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah proyek pembangunan jalan lingkar logistik ditargetkan selesai dalam waktu $60\\text{ hari}$ dengan mempekerjakan $45\\text{ orang}$ pekerja. Setelah pekerjaan berjalan selama $20\\text{ hari}$, proyek terpaksa dihentikan selama $10\\text{ hari}$ akibat kendala cuaca ekstrem dan keterlambatan pasokan material. Agar proyek tersebut tetap selesai tepat waktu sesuai jadwal semula, berapakah jumlah pekerja tambahan yang wajib didatangkan?",
      "question_markdown": "Jumlah **pekerja tambahan** yang wajib didatangkan adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "15 orang"
        },
        {
          "key": "B",
          "text_markdown": "20 orang"
        },
        {
          "key": "C",
          "text_markdown": "25 orang"
        },
        {
          "key": "D",
          "text_markdown": "45 orang"
        },
        {
          "key": "E",
          "text_markdown": "60 orang"
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan rumus kilat proyek terhenti: $\\text{Pekerja Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Semula}$. Hari terhenti = 10 hari. Sisa hari normal = $60 - 20 = 40$ hari, sehingga sisa hari nyata yang tersisa tinggal $40 - 10 = 30$ hari!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Waktu dan Sisa Beban Kerja:**\n  - Target awal: $60\\text{ hari}$ oleh $45\\text{ pekerja}$.\n  - Sudah berjalan: $20\\text{ hari}$.\n  - Sisa hari kerja normal: $60 - 20 = 40\\text{ hari}$.\n  - Sisa beban kerja yang belum terselesaikan:\n    $$\\text{Beban} = 40\\text{ hari} \\times 45\\text{ pekerja} = 1.800\\text{ orang-hari}$$\n- **Analisis Sisa Hari Nyata Pasca-Terhenti:**\n  - Proyek terhenti selama $10\\text{ hari}$.\n  - Waktu nyata yang tersisa untuk menyelesaikan 1.800 beban kerja:\n    $$\\text{Sisa Hari Nyata} = 40 - 10 = 30\\text{ hari}$$\n- **Perhitungan Kebutuhan Pekerja Baru ($P_{\\text{baru}}$):**\n  $$P_{\\text{baru}} = \\frac{\\text{Sisa Beban}}{\\text{Sisa Hari Nyata}} = \\frac{1.800}{30} = 60\\text{ orang}$$\n- **Perhitungan Pekerja Tambahan:**\n  $$\\text{Pekerja Tambahan} = P_{\\text{baru}} - P_{\\text{lama}} = 60 - 45 = 15\\text{ orang}$$\n- **Konklusi:** Tambahan pekerja yang dibutuhkan adalah **15 orang**.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Sakti Proyek Terhenti):**\n\n1. $\\text{Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$.\n2. $\\text{Tambahan} = \\frac{10}{30} \\times 45 = \\frac{1}{3} \\times 45 = 15\\text{ orang}$.\n3. Waktu pengerjaan hanya 8 detik. Pilihan **A** langsung terkunci.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Menghitung tambahan dengan pembagi 40 hari bukan 30 hari.\n- **Pilihan C Salah:** Kesalahan hitung pada rasio sisa beban.\n- **Pilihan D Salah:** Merupakan jumlah pekerja awal (45 orang).\n- **Pilihan E Salah (Jebakan Terbesar):** 60 orang adalah total seluruh pekerja baru yang dibutuhkan, bukan pekerja tambahan!"
    },
    {
      "example_id": "pu-03-04-ex6",
      "variation_name": "Variasi 3: Rasio Bertingkat Nutrisi Diet Pasien Klinis (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Program intervensi nutrisi klinis menetapkan proporsi kalori harian pasien dari tiga makronutrien: Karbohidrat ($K$), Protein ($P$), dan Lemak ($L$). Rasio kalori Karbohidrat terhadap Protein adalah $5 : 3$, sedangkan rasio kalori Protein terhadap Lemak adalah $4 : 3$. Jika asupan kalori dari Karbohidrat melampaui asupan kalori dari Lemak sebesar $440\\text{ kkal}$, berapakah total asupan kalori harian yang bersumber dari Protein?",
      "question_markdown": "Total asupan kalori harian pasien yang bersumber dari **Protein** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "360 kkal"
        },
        {
          "key": "B",
          "text_markdown": "400 kkal"
        },
        {
          "key": "C",
          "text_markdown": "440 kkal"
        },
        {
          "key": "D",
          "text_markdown": "480 kkal"
        },
        {
          "key": "E",
          "text_markdown": "800 kkal"
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Samakan porsi Protein ($P$) pada kedua rasio! $P$ bernilai 3 pada rasio pertama dan bernilai 4 pada rasio kedua. KPK dari 3 dan 4 adalah 12. Buat rasio gabungan $K : P : L$, lalu cari selisih bagian antara $K$ dan $L$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Penyatuan Rasio Bertingkat ($K : P : L$):**\n  - Rasio 1: $K : P = 5 : 3$ (kalikan 4 agar $P = 12$) $\\implies K : P = 20 : 12$\n  - Rasio 2: $P : L = 4 : 3$ (kalikan 3 agar $P = 12$) $\\implies P : L = 12 : 9$\n  - Rasio gabungan tiga variabel:\n    $$K : P : L = 20 : 12 : 9$$\n- **Penentuan Nilai Satuan Porsi Kalori:**\n  - Selisih porsi antara Karbohidrat ($K$) dan Lemak ($L$):\n    $$\\Delta_{\\text{porsi}} = 20 - 9 = 11\\text{ bagian}$$\n  - Nilai 11 bagian tersebut setara dengan $440\\text{ kkal}$.\n  - Maka nilai 1 bagian porsi adalah:\n    $$\\text{Nilai } 1\\text{ bagian} = \\frac{440\\text{ kkal}}{11} = 40\\text{ kkal}$$\n- **Perhitungan Asupan Kalori Protein ($P$):**\n  - Porsi Protein adalah 12 bagian:\n    $$\\text{Kalori Protein} = 12 \\times 40\\text{ kkal} = 480\\text{ kkal}$$\n- **Konklusi:** Asupan kalori harian dari Protein adalah **480 kkal**.\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Skala Rasio N):**\n\n1. $K : P : L = 20 : 12 : 9$.\n2. Selisih $K - L = 20 - 9 = 11$ bagian $= 440\\text{ kkal} \\implies 1$ bagian $= 40\\text{ kkal}$.\n3. Protein $= 12$ bagian $\\implies 12 \\times 40 = 480\\text{ kkal}$.\n4. Pilihan **D** langsung terkunci dalam 12 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** 360 kkal merupakan asupan kalori dari Lemak ($9 \\times 40 = 360\\text{ kkal}$).\n- **Pilihan B Salah:** Menghitung $10 \\times 40 = 400$ karena keliru menentukan porsi Protein.\n- **Pilihan C Salah:** Angka 440 kkal merupakan nilai selisih yang tertulis di teks soal.\n- **Pilihan E Salah:** 800 kkal merupakan asupan kalori dari Karbohidrat ($20 \\times 40 = 800\\text{ kkal}$)."
    },
    {
      "example_id": "pu-03-04-ex7",
      "variation_name": "Variasi 4: Susul-Menyusul Kecepatan dan Waktu Robot AGV (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Di lantai produksi manufaktur semikonduktor berotomasi tinggi, dua unit robot pemindah material (Robot Alpha dan Robot Beta) bergerak menyusuri lintasan lurus yang sama dari stasiun pemotongan wafer menuju stasiun perakitan. Robot Alpha berangkat pada pukul **08.00** dengan kecepatan konstan $40\\text{ meter/menit}$. Pada pukul **08.15**, Robot Beta diberangkatkan dari titik awal yang sama untuk menyusul Robot Alpha dengan kecepatan konstan $60\\text{ meter/menit}$.",
      "question_markdown": "Pada pukul berapakah Robot Beta berhasil **menyusul** Robot Alpha?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pukul 08.35"
        },
        {
          "key": "B",
          "text_markdown": "Pukul 08.45"
        },
        {
          "key": "C",
          "text_markdown": "Pukul 08.50"
        },
        {
          "key": "D",
          "text_markdown": "Pukul 09.00"
        },
        {
          "key": "E",
          "text_markdown": "Pukul 09.15"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung jarak awal yang sudah ditempuh Robot Alpha selama selisih waktu 15 menit (dari 08.00 ke 08.15): $s_0 = 40 \\times 15 = 600\\text{ meter}$. Waktu menyusul dihitung dengan membagi jarak awal tersebut dengan selisih kecepatan kedua robot ($v_B - v_A$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Selisih Waktu Keberangkatan:**\n  - Selisih waktu: dari 08.00 ke 08.15 adalah $\\Delta t = 15\\text{ menit}$.\n  - Jarak keunggulan awal yang telah ditempuh Robot Alpha saat Robot Beta mulai bergerak:\n    $$s_0 = v_{\\text{Alpha}} \\times \\Delta t = 40\\text{ m/menit} \\times 15\\text{ menit} = 600\\text{ meter}$$\n- **Perhitungan Waktu Tempuh Menyusul ($t_{\\text{susul}}$):**\n  - Kecepatan relatif pengejaran:\n    $$\\Delta v = v_{\\text{Beta}} - v_{\\text{Alpha}} = 60 - 40 = 20\\text{ m/menit}$$\n  - Waktu yang dibutuhkan Robot Beta untuk memangkas jarak 600 meter tersebut:\n    $$t_{\\text{susul}} = \\frac{s_0}{\\Delta v} = \\frac{600\\text{ meter}}{20\\text{ m/menit}} = 30\\text{ menit}$$\n- **Penentuan Waktu Jam Menyusul:**\n  - Robot Beta mulai bergerak pada pukul 08.15.\n  - Maka Robot Beta menyusul pada:\n    $$\\text{Waktu} = 08.15 + 30\\text{ menit} = 08.45$$\n- **Konklusi:** Robot Beta berhasil menyusul Robot Alpha pada **pukul 08.45** (setelah keduanya menempuh jarak $1.800\\text{ meter}$).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Kecepatan Relatif):**\n\n1. Selisih jarak $= 40 \\times 15 = 600\\text{ meter}$.\n2. Kecepatan relatif $= 60 - 40 = 20\\text{ m/menit}$.\n3. Waktu kejar $= \\frac{600}{20} = 30\\text{ menit}$.\n4. Jam menyusul $= 08.15 + 30\\text{ menit} = 08.45$.\n5. Pilihan **B** langsung terbukti benar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menghitung waktu kejar hanya 20 menit ($08.15 + 20\\text{ menit} = 08.35$).\n- **Pilihan C Salah:** Keliru menambahkan 30 menit dari pukul 08.20.\n- **Pilihan D Salah:** Menambahkan 60 menit (waktu kejar 1 jam) akibat salah membagi selisih kecepatan.\n- **Pilihan E Salah:** Menambahkan waktu kejar dari jam 08.00 bukan dari jam keberangkatan Robot Beta (08.15)."
    },
    {
      "example_id": "pu-03-04-ex8",
      "variation_name": "Variasi 5: Beban Kerja Multivariabel Sentra Kriya Batik Cagar Budaya (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Di sentra kerajinan kriya batik tulis cagar budaya, $6\\text{ orang}$ pengrajin berpengalaman mampu menyelesaikan pembatikan $15\\text{ lembar}$ kain batik halus dalam waktu $20\\text{ hari}$. Menjelang pameran kebudayaan internasional, sentra kerajinan tersebut menerima pesanan sebanyak $45\\text{ lembar}$ kain batik halus yang harus diselesaikan dalam waktu $24\\text{ hari}$.",
      "question_markdown": "Berapakah jumlah **total pengrajin** dengan kapasitas kerja yang sama yang dibutuhkan untuk menyelesaikan pesanan tersebut tepat waktu?",
      "options": [
        {
          "key": "A",
          "text_markdown": "9 orang"
        },
        {
          "key": "B",
          "text_markdown": "10 orang"
        },
        {
          "key": "C",
          "text_markdown": "12 orang"
        },
        {
          "key": "D",
          "text_markdown": "14 orang"
        },
        {
          "key": "E",
          "text_markdown": "15 orang"
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan formula kesetaraan beban kerja multivariabel: $\\frac{\\text{Pekerja}_1 \\times \\text{Hari}_1}{\\text{Target Output}_1} = \\frac{\\text{Pekerja}_2 \\times \\text{Hari}_2}{\\text{Target Output}_2}$. Masukkan data: $P_1 = 6, H_1 = 20, O_1 = 15$, dan $H_2 = 24, O_2 = 45$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Prinsip Beban Kerja Multivariabel Terpadu:**\n  - Beban kerja per satuan output bernilai konstan:\n    $$\\frac{P_1 \\times H_1}{O_1} = \\frac{P_2 \\times H_2}{O_2}$$\n  - Di mana:\n    - $P_1 = 6\\text{ orang}, \\; H_1 = 20\\text{ hari}, \\; O_1 = 15\\text{ kain}$\n    - $P_2 = ?\\text{ orang}, \\; H_2 = 24\\text{ hari}, \\; O_2 = 45\\text{ kain}$\n- **Substitusi dan Penyelesaian Aljabar:**\n  $$\\frac{6 \\times 20}{15} = \\frac{P_2 \\times 24}{45}$$\n  - Sederhanakan ruas kiri:\n    $$\\frac{120}{15} = 8$$\n  - Sederhanakan pecahan ruas kanan pada angka 24 dan 45 (bagi 3):\n    $$\\frac{24}{45} = \\frac{8}{15}$$\n  - Persamaan menjadi:\n    $$8 = P_2 \\times \\frac{8}{15}$$\n  - Bagi kedua ruas dengan 8:\n    $$1 = \\frac{P_2}{15} \\implies P_2 = 15\\text{ orang}$$\n- **Konklusi:** Jumlah total pengrajin yang dibutuhkan adalah **15 orang**.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Pencoretan Kesetaraan Beban):**\n\n1. Formula: $\\frac{6 \\times 20}{15} = \\frac{P_2 \\times 24}{45}$.\n2. Coret 15 dan 45 $\\implies$ ruas kanan bersisa 3 di penyebut: $\\frac{6 \\times 20}{1} = \\frac{P_2 \\times 24}{3} = P_2 \\times 8$.\n3. $120 = 8 \\cdot P_2 \\implies P_2 = \\frac{120}{8} = 15$ orang.\n4. Jawaban **E** tuntas dalam 10 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Angka 9 orang adalah jumlah pekerja tambahan yang harus direkrut ($15 - 6 = 9\\text{ orang}$), padahal soal menanyakan total pengrajin.\n- **Pilihan B, C, D Salah:** Hasil estimasi kasar yang mengabaikan hubungan proporsional perubahan hari dan target kain."
    },
    {
      "example_id": "pu-03-04-ex9",
      "variation_name": "Variasi 6: Produksi Energi Multivariabel PLTS Terapung (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah instalasi pembangkit listrik tenaga surya (PLTS) terapung di waduk konservasi air menggunakan sejumlah inverter panel surya untuk memasok energi listrik ke jaringan mikro. Berdasarkan data pemantauan awal, sebanyak $18\\text{ unit}$ inverter mampu memproduksi total energi listrik sebesar $54\\text{ MWh}$ dalam durasi operasional $4\\text{ hari}$. Guna meningkatkan keandalan pasokan, pengelola mengoperasikan $30\\text{ unit}$ inverter dengan efisiensi yang identik selama $6\\text{ hari}$.",
      "question_markdown": "Total energi listrik yang dihasilkan dari pengoperasian $30\\text{ unit}$ inverter selama $6\\text{ hari}$ tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "108 MWh"
        },
        {
          "key": "B",
          "text_markdown": "120 MWh"
        },
        {
          "key": "C",
          "text_markdown": "135 MWh"
        },
        {
          "key": "D",
          "text_markdown": "150 MWh"
        },
        {
          "key": "E",
          "text_markdown": "162 MWh"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan perbandingan senilai multivariabel: produksi energi berbanding lurus dengan jumlah inverter dan durasi hari. Hitung energi per inverter per hari: $\\frac{54}{18 \\times 4}$, lalu kalikan dengan $(30 \\times 6)$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Prinsip Proporsionalitas Multivariabel:**\n  - Energi yang dihasilkan ($E$) berbanding lurus dengan jumlah inverter ($N$) dan durasi waktu operasional ($H$):\n    $$\\frac{E_1}{N_1 \\times H_1} = \\frac{E_2}{N_2 \\times H_2}$$\n  - Data kondisi 1: $E_1 = 54\\text{ MWh}, \\; N_1 = 18\\text{ unit}, \\; H_1 = 4\\text{ hari}$.\n  - Data kondisi 2: $E_2 = ?\\text{ MWh}, \\; N_2 = 30\\text{ unit}, \\; H_2 = 6\\text{ hari}$.\n- **Substitusi dan Penyelesaian:**\n  $$\\frac{54}{18 \\times 4} = \\frac{E_2}{30 \\times 6}$$\n  - Sederhanakan ruas kiri:\n    $$\\frac{54}{72} = \\frac{3}{4} = 0{,}75\\text{ MWh per inverter per hari}$$\n  - Kalikan dengan total inverter-hari kondisi 2 ($30 \\times 6 = 180$):\n    $$E_2 = 180 \\times \\frac{3}{4} = 45 \\times 3 = 135\\text{ MWh}$$\n- **Konklusi:** Total energi listrik yang dihasilkan adalah **135 MWh**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Laju per Unit-Hari):**\n\n1. Laju $= \\frac{54}{18 \\times 4} = \\frac{3}{4}\\text{ MWh/unit/hari}$.\n2. Kondisi baru: $30 \\times 6 = 180\\text{ unit-hari}$.\n3. Energi $= 180 \\times \\frac{3}{4} = 135\\text{ MWh}$.\n4. Jawaban **C** didapatkan dalam 8 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menghitung $180 \\times 0{,}6 = 108\\text{ MWh}$ karena salah membagi laju $54/90$.\n- **Pilihan B Salah:** Menghitung hanya penambahan inverter tanpa memperpanjang hari operasi ($30 \\times 4 \\times 0{,}75 = 90\\text{ MWh}$) lalu ditambah pembulatan keliru.\n- **Pilihan D & E Salah:** Kesalahan perkalian proporsi dasar."
    },
    {
      "example_id": "pu-03-04-ex10",
      "variation_name": "Variasi 7: Rasio Bertingkat Anggaran Tiga Sektor APBD (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Dalam rancangan Anggaran Pendapatan dan Belanja Daerah (APBD), alokasi belanja modal didistribusikan ke tiga sektor prioritas: Pendidikan ($D$), Kesehatan ($K$), dan Infrastruktur Publik ($I$). Rasio alokasi anggaran Pendidikan terhadap Kesehatan adalah $7 : 5$, sedangkan rasio alokasi anggaran Kesehatan terhadap Infrastruktur Publik adalah $4 : 3$. Diketahui bahwa selisih alokasi anggaran antara sektor Pendidikan dan sektor Infrastruktur Publik tercatat sebesar **Rp390 miliar**.",
      "question_markdown": "Total alokasi anggaran yang ditetapkan untuk **sektor Kesehatan** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Rp450 miliar"
        },
        {
          "key": "B",
          "text_markdown": "Rp540 miliar"
        },
        {
          "key": "C",
          "text_markdown": "Rp600 miliar"
        },
        {
          "key": "D",
          "text_markdown": "Rp720 miliar"
        },
        {
          "key": "E",
          "text_markdown": "Rp840 miliar"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Samakan nilai rasio Kesehatan ($K$) yang bernilai 5 pada rasio pertama dan 4 pada rasio kedua. KPK dari 5 dan 4 adalah 20. Buat rasio tunggal $D : K : I$, lalu hitung nilai per bagian berdasarkan selisih $D - I$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Penyamaan Rasio Tiga Sektor ($D : K : I$):**\n  - Rasio 1: $D : K = 7 : 5$ (kalikan 4) $\\implies D : K = 28 : 20$\n  - Rasio 2: $K : I = 4 : 3$ (kalikan 5) $\\implies K : I = 20 : 15$\n  - Rasio gabungan:\n    $$D : K : I = 28 : 20 : 15$$\n- **Penentuan Nilai Satuan Porsi Bagian:**\n  - Selisih bagian sektor Pendidikan ($D$) dan Infrastruktur Publik ($I$):\n    $$\\Delta_{\\text{bagian}} = 28 - 15 = 13\\text{ bagian}$$\n  - Nilai 13 bagian tersebut setara dengan Rp390 miliar.\n  - Nilai 1 bagian rasio:\n    $$\\text{Nilai } 1\\text{ bagian} = \\frac{\\text{Rp390 miliar}}{13} = \\text{Rp30 miliar}$$\n- **Perhitungan Alokasi Sektor Kesehatan ($K$):**\n  - Sektor Kesehatan memiliki porsi 20 bagian:\n    $$\\text{Anggaran Kesehatan} = 20 \\times \\text{Rp30 miliar} = \\text{Rp600 miliar}$$\n- **Konklusi:** Alokasi anggaran untuk sektor Kesehatan adalah **Rp600 miliar**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Skala Rasio N):**\n\n1. Rasio gabungan: $D : K : I = (7 \\times 4) : (5 \\times 4) : (5 \\times 3) = 28 : 20 : 15$.\n2. Selisih $D - I = 28 - 15 = 13$ bagian $= 390\\text{ miliar} \\implies 1$ bagian $= 30\\text{ miliar}$.\n3. Kesehatan $= 20$ bagian $\\implies 20 \\times 30 = 600\\text{ miliar}$.\n4. Pilihan **C** langsung terkunci sempurna.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Rp450 miliar merupakan alokasi anggaran sektor Infrastruktur Publik ($15 \\times 30 = 450\\text{ miliar}$).\n- **Pilihan B Salah:** Menghitung $18 \\times 30 = 540\\text{ miliar}$ akibat keliru menyamakan rasio tengah.\n- **Pilihan D Salah:** Menghitung $24 \\times 30 = 720\\text{ miliar}$.\n- **Pilihan E Salah:** Rp840 miliar merupakan alokasi anggaran sektor Pendidikan ($28 \\times 30 = 840\\text{ miliar}$)."
    },
    {
      "example_id": "pu-03-04-ex11",
      "variation_name": "Variasi 8: Laju Beban Kerja Asesmen Tiga Agen Psikologis (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam program seleksi massal calon tenaga medis tanggap darurat, tiga orang psikolog klinis (Psikolog A, Psikolog B, dan Psikolog C) ditugaskan untuk menyelesaikan seluruh kuota berkas asesmen kepribadian. Berdasarkan data simulasi penugasan:\n- Jika Psikolog A dan B bekerja bersama, berkas asesmen dapat diselesaikan dalam waktu **12 hari**.\n- Jika Psikolog B dan C bekerja bersama, berkas asesmen dapat diselesaikan dalam waktu **15 hari**.\n- Jika Psikolog A dan C bekerja bersama, berkas asesmen dapat diselesaikan dalam waktu **20 hari**.",
      "question_markdown": "Jika ketiga psikolog tersebut (A, B, dan C) bekerja secara **bersama-sama**, waktu yang dibutuhkan untuk menyelesaikan seluruh kuota berkas asesmen adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "8 hari"
        },
        {
          "key": "B",
          "text_markdown": "10 hari"
        },
        {
          "key": "C",
          "text_markdown": "12 hari"
        },
        {
          "key": "D",
          "text_markdown": "15 hari"
        },
        {
          "key": "E",
          "text_markdown": "18 hari"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Tuliskan laju harian per pasangan: $v_A + v_B = 1/12$, $v_B + v_C = 1/15$, dan $v_A + v_C = 1/20$. Jumlahkan ketiga persamaan tersebut untuk memperoleh $2(v_A + v_B + v_C)$. Bagi dua hasilnya, lalu balik nilai pecahannya!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formulasi Laju Beban Kerja Berpasangan:**\n  - Laju Psikolog A dan B: $v_A + v_B = \\frac{1}{12}\\text{ pekerjaan/hari}$\n  - Laju Psikolog B dan C: $v_B + v_C = \\frac{1}{15}\\text{ pekerjaan/hari}$\n  - Laju Psikolog A dan C: $v_A + v_C = \\frac{1}{20}\\text{ pekerjaan/hari}$\n- **Penjumlahan Ketiga Persamaan:**\n  $$(v_A + v_B) + (v_B + v_C) + (v_A + v_C) = \\frac{1}{12} + \\frac{1}{15} + \\frac{1}{20}$$\n  $$2(v_A + v_B + v_C) = \\frac{1}{12} + \\frac{1}{15} + \\frac{1}{20}$$\n- **Penyamaan Penyebut (KPK 12, 15, 20 adalah 60):**\n  $$2(v_A + v_B + v_C) = \\frac{5}{60} + \\frac{4}{60} + \\frac{3}{60} = \\frac{5 + 4 + 3}{60} = \\frac{12}{60} = \\frac{1}{5}$$\n- **Laju Kerja Bersama Ketiganya:**\n  $$v_A + v_B + v_C = \\frac{1}{5 \\times 2} = \\frac{1}{10}\\text{ pekerjaan/hari}$$\n- **Perhitungan Waktu Penyelesaian ($t$):**\n  $$t = \\frac{1}{v_A + v_B + v_C} = \\frac{1}{\\frac{1}{10}} = 10\\text{ hari}$$\n- **Konklusi:** Waktu yang dibutuhkan ketiganya saat bekerja bersama adalah **10 hari**.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Metode Unit Pekerjaan 60 Poin):**\n\n1. Beban total asesmen $= 60\\text{ unit}$.\n2. Laju $A + B = 60 / 12 = 5$ unit/hari.\n3. Laju $B + C = 60 / 15 = 4$ unit/hari.\n4. Laju $A + C = 60 / 20 = 3$ unit/hari.\n5. Jumlah: $2(A + B + C) = 5 + 4 + 3 = 12$ unit/hari $\\implies A + B + C = 6$ unit/hari.\n6. Waktu $= \\frac{60}{6} = 10\\text{ hari}$. Pilihan **B** langsung keluar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjadi akibat pembulatan kasar tanpa menyamakan KPK secara presisi.\n- **Pilihan C Salah:** Angka 12 hari adalah waktu pengerjaan pasangan tercepat (A dan B), jika bertiga pasti lebih cepat dari 12 hari.\n- **Pilihan D & E Salah:** Melebihi waktu pengerjaan berpasangan, tidak logis untuk penambahan tenaga kerja."
    },
    {
      "example_id": "pu-03-04-ex12",
      "variation_name": "Variasi 9: Proyek Terhenti Perakitan Pack Baterai EV Gigafactory (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Di fasilitas gigafactory manufaktur kendaraan listrik (EV), sebuah proyek perakitan modul baterai generasi terbaru ditargetkan selesai dalam waktu **45 hari** dengan mempekerjakan **36 orang** teknisi perakitan. Setelah pekerjaan berjalan lancar selama **15 hari**, seluruh lini perakitan terpaksa dihentikan selama **6 hari** untuk proses kalibrasi darurat sensor ultrasonik. Agar seluruh pesanan baterai tetap dapat diselesaikan tepat waktu sesuai target 45 hari semula, berapakah jumlah teknisi tambahan yang harus dikerahkan?",
      "question_markdown": "Jumlah **teknisi tambahan** yang harus dikerahkan adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "6 orang"
        },
        {
          "key": "B",
          "text_markdown": "8 orang"
        },
        {
          "key": "C",
          "text_markdown": "9 orang"
        },
        {
          "key": "D",
          "text_markdown": "12 orang"
        },
        {
          "key": "E",
          "text_markdown": "45 orang"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan rumus sakti proyek terhenti: $\\text{Pekerja Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$. Hitung sisa hari normal: $45 - 15 = 30$ hari. Sisa hari nyata: $30 - 6 = 24$ hari!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Waktu dan Sisa Beban Kerja:**\n  - Target awal: $45\\text{ hari}$ dengan $36\\text{ teknisi}$.\n  - Durasi telah berjalan: $15\\text{ hari}$.\n  - Sisa hari kerja normal: $45 - 15 = 30\\text{ hari}$.\n  - Sisa beban kerja yang wajib dituntaskan:\n    $$\\text{Sisa Beban} = 30\\text{ hari} \\times 36\\text{ teknisi} = 1.080\\text{ orang-hari}$$\n- **Analisis Sisa Waktu Nyata Setelah Proyek Terhenti:**\n  - Pekerjaan terhenti selama $6\\text{ hari}$.\n  - Sisa hari nyata yang tersedia:\n    $$\\text{Sisa Hari Nyata} = 30 - 6 = 24\\text{ hari}$$\n- **Perhitungan Kebutuhan Total Teknisi Baru ($P_{\\text{baru}}$):**\n  $$P_{\\text{baru}} = \\frac{\\text{Sisa Beban}}{\\text{Sisa Hari Nyata}} = \\frac{1.080}{24} = 45\\text{ teknisi}$$\n- **Perhitungan Teknisi Tambahan:**\n  $$\\text{Teknisi Tambahan} = P_{\\text{baru}} - P_{\\text{awal}} = 45 - 36 = 9\\text{ teknisi}$$\n- **Konklusi:** Jumlah teknisi tambahan yang harus dikerahkan adalah **9 orang**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Sakti 10 Detik):**\n\n1. $\\text{Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$.\n2. $\\text{Tambahan} = \\frac{6}{24} \\times 36 = \\frac{1}{4} \\times 36 = 9\\text{ orang}$.\n3. Pilihan **C** langsung tuntas dalam 6 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Angka 6 orang merupakan durasi hari proyek terhenti, bukan jumlah penambahan teknisi.\n- **Pilihan B Salah:** Menghitung dengan rasio $6/27 \\times 36 = 8$ akibat keliru menghitung sisa hari normal.\n- **Pilihan D Salah:** Menghitung pembagi sisa hari 18 bukan 24.\n- **Pilihan E Salah (Jebakan Terbesar):** 45 orang adalah total seluruh teknisi yang harus bekerja, bukan pekerja tambahan!"
    },
    {
      "example_id": "pu-03-04-ex13",
      "variation_name": "Variasi 10: Berpapasan Berbeda Waktu Ekspedisi Jalur Rempah Maritim (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Dua kapal ekspedisi napak tilas jalur rempah maritim Nusantara, Kapal Samudera dan Kapal Bahari, berlayar melintasi rute perairan yang sama sepanjang **336 mil laut** yang menghubungkan Pelabuhan Sunda Kelapa dan Pelabuhan Tuban dari arah berlawanan.\n- Kapal Samudera berangkat dari Pelabuhan Sunda Kelapa menuju Pelabuhan Tuban pada pukul **06.00 WIB** dengan kecepatan konstan **16 knot** (mil laut/jam).\n- Kapal Bahari berangkat dari Pelabuhan Tuban menuju Pelabuhan Sunda Kelapa pada pukul **07.00 WIB** dengan kecepatan konstan **24 knot**.",
      "question_markdown": "Pada pukul berapakah kedua kapal ekspedisi tersebut saling **berpapasan** di laut?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pukul 14.20 WIB"
        },
        {
          "key": "B",
          "text_markdown": "Pukul 14.40 WIB"
        },
        {
          "key": "C",
          "text_markdown": "Pukul 15.00 WIB"
        },
        {
          "key": "D",
          "text_markdown": "Pukul 15.20 WIB"
        },
        {
          "key": "E",
          "text_markdown": "Pukul 16.00 WIB"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung jarak awal yang sudah ditempuh Kapal Samudera selama 1 jam pertama (dari 06.00 ke 07.00): $s_1 = 16 \\times 1 = 16\\text{ mil laut}$. Kurangkan dari total jarak 336 mil laut untuk memperoleh sisa jarak pada pukul 07.00, lalu bagi dengan jumlah kecepatan kedua kapal ($16 + 24 = 40\\text{ knot}$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Selisih Waktu Keberangkatan:**\n  - Kapal Samudera berangkat pukul 06.00 WIB dan Kapal Bahari pukul 07.00 WIB (selisih waktu $\\Delta t = 1\\text{ jam}$).\n  - Jarak yang telah ditempuh Kapal Samudera saat Kapal Bahari baru mulai berlayar pada pukul 07.00 WIB:\n    $$s_{\\text{awal}} = v_{\\text{Samudera}} \\times 1\\text{ jam} = 16\\text{ knot} \\times 1 = 16\\text{ mil laut}$$\n- **Perhitungan Sisa Jarak Antara Kedua Kapal:**\n  - Jarak total lintasan $= 336\\text{ mil laut}$.\n  - Sisa jarak yang harus ditempuh bersama pada pukul 07.00 WIB:\n    $$s_{\\text{sisa}} = 336 - 16 = 320\\text{ mil laut}$$\n- **Perhitungan Waktu Berpapasan ($t_{\\text{papas}}$):**\n  - Karena kedua kapal bergerak saling mendekati dari arah berlawanan, laju pendekatan gabungan adalah:\n    $$v_{\\text{gabung}} = v_{\\text{Samudera}} + v_{\\text{Bahari}} = 16 + 24 = 40\\text{ knot}$$\n  - Waktu tempuh hingga berpapasan dihitung dari pukul 07.00 WIB:\n    $$t_{\\text{papas}} = \\frac{s_{\\text{sisa}}}{v_{\\text{gabung}}} = \\frac{320\\text{ mil}}{40\\text{ knot}} = 8\\text{ jam}$$\n- **Penentuan Waktu Jam Berpapasan:**\n  - Waktu berpapasan dihitung dari saat kedua kapal sama-sama bergerak (pukul 07.00 WIB):\n    $$\\text{Waktu Berpapasan} = 07.00 + 8\\text{ jam} = 15.00\\text{ WIB}$$\n- **Konklusi:** Kedua kapal ekspedisi saling berpapasan pada **pukul 15.00 WIB**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Sisa Jarak dibagi Jumlah Kecepatan):**\n\n1. Jarak 1 jam pertama $= 16\\text{ mil}$.\n2. Sisa jarak $= 336 - 16 = 320\\text{ mil}$.\n3. Kecepatan gabungan $= 16 + 24 = 40\\text{ knot}$.\n4. Waktu $= \\frac{320}{40} = 8\\text{ jam}$ setelah pukul 07.00 WIB.\n5. Jam berpapasan $= 07.00 + 8 = 15.00\\text{ WIB}$. Pilihan **C** terbukti benar.",
      "why_others_are_wrong_markdown": "- **Pilihan A & B Salah:** Menghitung waktu berpapasan dengan membagi langsung jarak 336 tanpa mengurangkan jarak 1 jam pertama ($336 / 40 = 8{,}4\\text{ jam} = 8\\text{ jam } 24\\text{ menit}$).\n- **Pilihan D Salah:** Menambahkan 8 jam dari pukul 06.00 WIB ($06.00 + 8 = 14.00$) lalu keliru menambahkan waktu lain.\n- **Pilihan E Salah:** Mengasumsikan waktu tempuh 9 jam."
    },
    {
      "example_id": "pu-03-04-ex14",
      "variation_name": "Variasi 11: Susul-Menyusul Kecepatan Wahana Selam AUV Oseanografi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Dalam misi pemetaan batimetri dan pemantauan polusi mikroplastik laut dalam, dua unit wahana selam otonom (AUV Nusa-1 dan AUV Nusa-2) diberangkatkan menyusuri koridor transek bawah laut yang sama dari stasiun oseanografi pesisir:\n- AUV Nusa-1 diluncurkan pada pukul **06.00 WIB** dengan kecepatan jelajah konstan **$18\\text{ km/jam}$**.\n- AUV Nusa-2 diluncurkan pada pukul **07.20 WIB** dari dermaga yang sama untuk menyusul AUV Nusa-1 dengan kecepatan konstan **$30\\text{ km/jam}$**.",
      "question_markdown": "Pada pukul berapakah AUV Nusa-2 berhasil **menyusul** AUV Nusa-1?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pukul 09.00 WIB"
        },
        {
          "key": "B",
          "text_markdown": "Pukul 09.20 WIB"
        },
        {
          "key": "C",
          "text_markdown": "Pukul 09.40 WIB"
        },
        {
          "key": "D",
          "text_markdown": "Pukul 10.00 WIB"
        },
        {
          "key": "E",
          "text_markdown": "Pukul 10.20 WIB"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Hitung selisih waktu keberangkatan dari pukul 06.00 ke 07.20, yaitu $80\\text{ menit} = \\frac{4}{3}\\text{ jam}$. Tentukan keunggulan jarak awal AUV Nusa-1 ($s_0 = v_1 \\times \\Delta t$), lalu bagi jarak tersebut dengan selisih kecepatan kedua wahana selam ($v_2 - v_1$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Selisih Waktu Keberangkatan:**\n  - Selisih waktu dari 06.00 ke 07.20 WIB:\n    $$\\Delta t = 1\\text{ jam } 20\\text{ menit} = 80\\text{ menit} = \\frac{80}{60}\\text{ jam} = \\frac{4}{3}\\text{ jam}$$\n  - Jarak keunggulan awal yang telah ditempuh AUV Nusa-1 saat AUV Nusa-2 baru mulai bergerak pada pukul 07.20 WIB:\n    $$s_0 = v_{\\text{Nusa-1}} \\times \\Delta t = 18\\text{ km/jam} \\times \\frac{4}{3}\\text{ jam} = 6 \\times 4 = 24\\text{ km}$$\n- **Perhitungan Waktu Tempuh Pengejaran ($t_{\\text{kejar}}$):**\n  - Kecepatan relatif pengejaran antara kedua wahana selam:\n    $$\\Delta v = v_{\\text{Nusa-2}} - v_{\\text{Nusa-1}} = 30 - 18 = 12\\text{ km/jam}$$\n  - Waktu yang dibutuhkan AUV Nusa-2 untuk memangkas jarak 24 km:\n    $$t_{\\text{kejar}} = \\frac{s_0}{\\Delta v} = \\frac{24\\text{ km}}{12\\text{ km/jam}} = 2\\text{ jam}$$\n- **Penentuan Waktu Jam Menyusul:**\n  - Waktu menyusul dihitung sejak AUV Nusa-2 diberangkatkan (pukul 07.20 WIB):\n    $$\\text{Waktu Menyusul} = 07.20 + 2\\text{ jam} = 09.20\\text{ WIB}$$\n- **Konklusi:** AUV Nusa-2 berhasil menyusul AUV Nusa-1 pada **pukul 09.20 WIB** (pada jarak tempuh $30 \\times 2 = 60\\text{ km}$ dari dermaga).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Kecepatan Relatif):**\n\n1. Selisih waktu $= 80\\text{ menit} = \\frac{4}{3}\\text{ jam}$.\n2. Jarak awal $= 18 \\times \\frac{4}{3} = 24\\text{ km}$.\n3. Selisih laju $= 30 - 18 = 12\\text{ km/jam}$.\n4. Waktu kejar $= \\frac{24}{12} = 2\\text{ jam}$.\n5. Jam menyusul $= 07.20 + 2\\text{ jam} = 09.20\\text{ WIB}$. Pilihan **B** langsung keluar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menghitung waktu kejar hanya $1{,}5$ jam ($07.20 + 1\\text{ jam } 30\\text{ menit} = 08.50$ atau dibulatkan salah ke 09.00).\n- **Pilihan C Salah:** Keliru menambahkan 2 jam dari pukul 07.40 WIB.\n- **Pilihan D Salah:** Menghitung waktu kejar dari jam 06.00 WIB dengan durasi 4 jam.\n- **Pilihan E Salah:** Kesalahan konversi 80 menit menjadi $1{,}8$ jam sehingga perhitungan waktu kejar meleset."
    },
    {
      "example_id": "pu-03-04-ex15",
      "variation_name": "Variasi 12: Proyek Terhenti Depo Logistik Peti Kemas Nasional (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam proyek strategis nasional pembangunan depo logistik peti kemas pelabuhan ekspor, pekerjaan konstruksi ditargetkan selesai dalam waktu **50 hari** dengan mempekerjakan **32 orang** pekerja konstruksi. Setelah pekerjaan berlangsung lancar selama **20 hari**, proyek terpaksa dihentikan selama **6 hari** akibat perbaikan darurat struktur tanah ekspansif. Agar proyek depo logistik tersebut tetap selesai tepat waktu sesuai jadwal semula, berapakah jumlah pekerja tambahan yang wajib didatangkan?",
      "question_markdown": "Jumlah **pekerja tambahan** yang wajib didatangkan adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "6 orang"
        },
        {
          "key": "B",
          "text_markdown": "8 orang"
        },
        {
          "key": "C",
          "text_markdown": "10 orang"
        },
        {
          "key": "D",
          "text_markdown": "12 orang"
        },
        {
          "key": "E",
          "text_markdown": "40 orang"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan rumus kilat proyek terhenti: $\\text{Pekerja Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Semula}$. Hitung sisa hari normal: $50 - 20 = 30$ hari. Sisa hari nyata: $30 - 6 = 24$ hari!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Waktu dan Sisa Beban Kerja Normal:**\n  - Target awal: $50\\text{ hari}$ oleh $32\\text{ pekerja}$.\n  - Waktu yang telah berjalan: $20\\text{ hari}$.\n  - Sisa hari kerja normal yang tersisa: $50 - 20 = 30\\text{ hari}$.\n  - Sisa beban kerja yang wajib diselesaikan:\n    $$\\text{Sisa Beban} = 30\\text{ hari} \\times 32\\text{ pekerja} = 960\\text{ orang-hari}$$\n- **Analisis Sisa Waktu Nyata Setelah Proyek Terhenti:**\n  - Pekerjaan terhenti selama $6\\text{ hari}$.\n  - Waktu kerja nyata yang tersisa:\n    $$\\text{Sisa Hari Nyata} = 30 - 6 = 24\\text{ hari}$$\n- **Perhitungan Kebutuhan Pekerja Baru Total ($P_{\\text{baru}}$):**\n  $$P_{\\text{baru}} = \\frac{\\text{Sisa Beban}}{\\text{Sisa Hari Nyata}} = \\frac{960}{24} = 40\\text{ orang}$$\n- **Perhitungan Kebutuhan Pekerja Tambahan:**\n  $$\\text{Pekerja Tambahan} = P_{\\text{baru}} - P_{\\text{lama}} = 40 - 32 = 8\\text{ orang}$$\n- **Konklusi:** Jumlah pekerja tambahan yang wajib didatangkan adalah **8 orang**.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Sakti Proyek Terhenti):**\n\n1. $\\text{Tambahan} = \\frac{\\text{Hari Terhenti}}{\\text{Sisa Hari Nyata}} \\times \\text{Pekerja Awal}$.\n2. $\\text{Tambahan} = \\frac{6}{24} \\times 32 = \\frac{1}{4} \\times 32 = 8\\text{ orang}$.\n3. Waktu penyelesaian hanya 6 detik. Jawaban **B** langsung keluar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Angka 6 orang merupakan jumlah hari pekerjaan terhenti, bukan jumlah penambahan pekerja.\n- **Pilihan C Salah:** Menghitung dengan pembagi sisa hari 20 bukan 24.\n- **Pilihan D Salah:** Kesalahan hitung rasio pembagian sisa beban kerja.\n- **Pilihan E Salah (Jebakan Terbesar):** 40 orang adalah total seluruh pekerja baru yang dibutuhkan, bukan pekerja tambahan!"
    },
    {
      "example_id": "pu-03-04-ex16",
      "variation_name": "Variasi 13: Aliran Pompa Bertahap Bioreaktor Vaksin Imunoterapi (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam fasilitas produksi vaksin imunoterapi modern, sebuah tangki bioreaktor kultur sel dilengkapi dua pompa pengisi media nutrisi cair (Pompa A dan Pompa B) serta satu pompa drainase limbah metabolit (Pompa C). Jika diuji dari kondisi tangki kosong secara mandiri:\n- Pompa A dapat mengisi penuh bioreaktor dalam waktu **$8\\text{ jam}$**.\n- Pompa B dapat mengisi penuh bioreaktor dalam waktu **$12\\text{ jam}$**.\n- Pompa drainase C mampu mengosongkan seluruh isi bioreaktor yang penuh dalam waktu **$24\\text{ jam}$**.\n\nPada awal proses sterilisasi, bioreaktor dalam kondisi kosong dan hanya **Pompa A yang diaktifkan selama $2\\text{ jam}$ pertama**. Setelah $2\\text{ jam}$ berlalu, Pompa B dan Pompa drainase C ikut diaktifkan secara bersamaan mendampingi Pompa A.",
      "question_markdown": "Berapakah **waktu tambahan** yang dibutuhkan sejak Pompa B dan C diaktifkan hingga bioreaktor tersebut terisi penuh?",
      "options": [
        {
          "key": "A",
          "text_markdown": "3 jam 30 menit"
        },
        {
          "key": "B",
          "text_markdown": "4 jam 00 menit"
        },
        {
          "key": "C",
          "text_markdown": "4 jam 30 menit"
        },
        {
          "key": "D",
          "text_markdown": "5 jam 00 menit"
        },
        {
          "key": "E",
          "text_markdown": "6 jam 30 menit"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** (1) Hitung volume yang telah diisi Pompa A selama 2 jam pertama: $2 \\times \\frac{1}{8} = \\frac{1}{4}$ bagian. (2) Sisa volume yang belum terisi adalah $1 - \\frac{1}{4} = \\frac{3}{4}$ bagian. (3) Hitung laju akumulasi netto saat ketiga pompa aktif bersama: $\\frac{1}{8} + \\frac{1}{12} - \\frac{1}{24}$. Bagi sisa volume $\\frac{3}{4}$ dengan laju netto tersebut!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Tahap 1: Evaluasi Pengisian Awal oleh Pompa A (2 Jam Pertama)**\n  - Laju Pompa A: $v_A = \\frac{1}{8}\\text{ bagian/jam}$\n  - Volume terisi dalam 2 jam:\n    $$V_{\\text{awal}} = 2 \\times \\frac{1}{8} = \\frac{2}{8} = \\frac{1}{4}\\text{ bagian bioreaktor}$$\n  - Sisa kapasitas yang belum terisi:\n    $$V_{\\text{sisa}} = 1 - \\frac{1}{4} = \\frac{3}{4}\\text{ bagian bioreaktor}$$\n- **Tahap 2: Evaluasi Laju Akumulasi Netto Ketiga Pompa Bersama**\n  - Laju Pompa B: $v_B = \\frac{1}{12}\\text{ bagian/jam}$\n  - Laju Pompa C (drainase): $v_C = -\\frac{1}{24}\\text{ bagian/jam}$\n  - Laju akumulasi gabungan ($v_{\\text{netto}}$):\n    $$v_{\\text{netto}} = v_A + v_B - v_C = \\frac{1}{8} + \\frac{1}{12} - \\frac{1}{24}$$\n  - Samakan penyebut dengan KPK dari 8, 12, dan 24, yaitu 24:\n    $$v_{\\text{netto}} = \\frac{3}{24} + \\frac{2}{24} - \\frac{1}{24} = \\frac{3 + 2 - 1}{24} = \\frac{4}{24} = \\frac{1}{6}\\text{ bagian/jam}$$\n- **Tahap 3: Perhitungan Waktu Tambahan Pengisian ($t_{\\text{tambah}}$)**\n  $$t_{\\text{tambah}} = \\frac{V_{\\text{sisa}}}{v_{\\text{netto}}} = \\frac{\\frac{3}{4}}{\\frac{1}{6}} = \\frac{3}{4} \\times 6 = \\frac{18}{4} = 4{,}5\\text{ jam}$$\n  - Konversi desimal jam: $4{,}5\\text{ jam} = 4\\text{ jam } 30\\text{ menit}$.\n- **Konklusi:** Waktu tambahan yang dibutuhkan sejak Pompa B dan C diaktifkan adalah **4 jam 30 menit**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Metode Kapasitas 24 Bagian):**\n\n1. Kapasitas bioreaktor $= 24\\text{ bagian}$.\n2. Laju Pompa A $= 24 / 8 = 3$ bagian/jam.\n3. Dalam 2 jam pertama: Pompa A mengisi $2 \\times 3 = 6$ bagian $\\implies$ Sisa $= 24 - 6 = 18$ bagian.\n4. Laju gabungan A, B, C $= 3 + (24/12) - (24/24) = 3 + 2 - 1 = 4$ bagian/jam.\n5. Waktu tambahan $= \\frac{18}{4} = 4{,}5\\text{ jam} = 4\\text{ jam } 30\\text{ menit}$. Pilihan **C** langsung tuntas.",
      "why_others_are_wrong_markdown": "- **Pilihan A & B Salah:** Terjadi karena salah mengurangi laju drainase atau salah menghitung sisa volume tangki.\n- **Pilihan D Salah:** Menghitung pengisian dari kondisi kosong tanpa memperhitungkan 2 jam pertama Pompa A ($24 / 4 = 6$ jam dikurangi 1 jam).\n- **Pilihan E Salah (Jebakan Total Waktu):** 6 jam 30 menit adalah total seluruh durasi sejak awal proses ($2\\text{ jam} + 4\\text{ jam } 30\\text{ menit}$), bukan waktu tambahan!"
    },
    {
      "example_id": "pu-03-04-ex17",
      "variation_name": "Variasi 14: Rasio Bertingkat Bandwidth Server Tiga Tingkat (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Dalam arsitektur komputasi awan aplikasi berskala besar, alokasi kapasitas bandwidth jaringan didistribusikan ke tiga lapisan kluster server: Web Tier ($W$), Application Tier ($A$), dan Database Tier ($D$).\n- Rasio alokasi bandwidth antara Web Tier dan Application Tier adalah $4 : 3$.\n- Rasio alokasi bandwidth antara Application Tier dan Database Tier adalah $5 : 2$.\n\nBerdasarkan hasil audit performa jaringan, selisih alokasi bandwidth antara Web Tier dan Database Tier tercatat sebesar **$84\\text{ Gbps}$**.",
      "question_markdown": "Total alokasi kapasitas bandwidth yang ditetapkan untuk **Application Tier ($A$)** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "60 Gbps"
        },
        {
          "key": "B",
          "text_markdown": "75 Gbps"
        },
        {
          "key": "C",
          "text_markdown": "90 Gbps"
        },
        {
          "key": "D",
          "text_markdown": "105 Gbps"
        },
        {
          "key": "E",
          "text_markdown": "120 Gbps"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Samakan nilai Application Tier ($A$) yang bernilai 3 pada rasio pertama dan 5 pada rasio kedua. KPK dari 3 dan 5 adalah 15. Bentuk perbandingan tunggal $W : A : D$, lalu tentukan nilai per bagian dari selisih bagian antara $W$ dan $D$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Penyatuan Rasio Tiga Lapisan ($W : A : D$):**\n  - Rasio 1: $W : A = 4 : 3$ (kalikan 5 agar $A = 15$) $\\implies W : A = 20 : 15$\n  - Rasio 2: $A : D = 5 : 2$ (kalikan 3 agar $A = 15$) $\\implies A : D = 15 : 6$\n  - Rasio terpadu tiga variabel:\n    $$W : A : D = 20 : 15 : 6$$\n- **Penentuan Nilai Satuan Porsi Bandwidth:**\n  - Selisih porsi bagian antara Web Tier ($W$) dan Database Tier ($D$):\n    $$\\Delta_{\\text{porsi}} = 20 - 6 = 14\\text{ bagian}$$\n  - Nilai 14 bagian tersebut setara dengan $84\\text{ Gbps}$.\n  - Maka nilai 1 bagian porsi adalah:\n    $$\\text{Nilai } 1\\text{ bagian} = \\frac{84\\text{ Gbps}}{14} = 6\\text{ Gbps}$$\n- **Perhitungan Alokasi Application Tier ($A$):**\n  - Application Tier memiliki porsi 15 bagian:\n    $$\\text{Bandwidth } A = 15 \\times 6\\text{ Gbps} = 90\\text{ Gbps}$$\n- **Konklusi:** Alokasi kapasitas bandwidth untuk Application Tier adalah **90 Gbps**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Skala Rasio N):**\n\n1. Rasio terpadu: $W : A : D = (4 \\times 5) : (3 \\times 5) : (3 \\times 2) = 20 : 15 : 6$.\n2. Selisih $W - D = 20 - 6 = 14$ bagian $= 84\\text{ Gbps} \\implies 1$ bagian $= 6\\text{ Gbps}$.\n3. Application Tier $= 15$ bagian $\\implies 15 \\times 6 = 90\\text{ Gbps}$.\n4. Pilihan **C** langsung terkunci dalam 10 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** 60 Gbps dihitung dari $10 \\times 6\\text{ Gbps}$ akibat salah menetapkan porsi.\n- **Pilihan B Salah:** Menghitung $5 \\times 15 = 75\\text{ Gbps}$ karena salah mengalikan konstanta bagian.\n- **Pilihan D Salah:** Menghitung $90 + 15 = 105\\text{ Gbps}$ akibat salah menjumlahkan bagian.\n- **Pilihan E Salah (Jebakan Web Tier):** 120 Gbps merupakan alokasi untuk Web Tier ($20 \\times 6 = 120\\text{ Gbps}$)."
    },
    {
      "example_id": "pu-03-04-ex18",
      "variation_name": "Variasi 15: Pergantian Tim Restorasi Relief Candi Warisan Dunia (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam proyek pemugaran situs cagar budaya dunia, tiga orang konservator ahli (Rama, Sinta, dan Bima) ditugaskan untuk membersihkan dan merestorasi panel relief dinding candi. Jika bekerja sendiri-sendiri secara mandiri:\n- Rama dapat menyelesaikan restorasi satu panel relief dalam waktu **$12\\text{ hari}$**.\n- Sinta dapat menyelesaikannya dalam waktu **$15\\text{ hari}$**.\n- Bima dapat menyelesaikannya dalam waktu **$20\\text{ hari}$**.\n\nPada awalnya, **Rama dan Sinta mulai bekerja bersama selama $4\\text{ hari}$**. Setelah $4\\text{ hari}$ berlangsung, Sinta harus bertugas ke lokasi lain dan perannya digantikan oleh Bima. Rama dan Bima kemudian bekerja bersama hingga seluruh panel relief tuntas direstorasi.",
      "question_markdown": "Berapa **hari tambahan** yang dibutuhkan Rama dan Bima untuk menuntaskan sisa pekerjaan restorasi relief tersebut?",
      "options": [
        {
          "key": "A",
          "text_markdown": "2 hari"
        },
        {
          "key": "B",
          "text_markdown": "3 hari"
        },
        {
          "key": "C",
          "text_markdown": "4 hari"
        },
        {
          "key": "D",
          "text_markdown": "5 hari"
        },
        {
          "key": "E",
          "text_markdown": "7 hari"
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan metode unit kerja dengan mencari KPK durasi (12, 15, dan 20 adalah 60 unit). (1) Laju Rama = $5$ unit/hari, Sinta = $4$ unit/hari, Bima = $3$ unit/hari. (2) Hitung beban yang diselesaikan Rama dan Sinta dalam 4 hari: $4 \\times (5 + 4) = 36$ unit. (3) Sisa beban kerja adalah $60 - 36 = 24$ unit. Bagi sisa beban tersebut dengan laju gabungan Rama dan Bima ($5 + 3$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Definisi Laju Kerja Harian Masing-Masing Konservator:**\n  - Laju Rama: $v_R = \\frac{1}{12}\\text{ panel/hari}$\n  - Laju Sinta: $v_S = \\frac{1}{15}\\text{ panel/hari}$\n  - Laju Bima: $v_B = \\frac{1}{20}\\text{ panel/hari}$\n- **Tahap 1: Pengerjaan Awal oleh Rama dan Sinta (4 Hari)**\n  - Laju gabungan Rama dan Sinta:\n    $$v_{R+S} = \\frac{1}{12} + \\frac{1}{15} = \\frac{5}{60} + \\frac{4}{60} = \\frac{9}{60} = \\frac{3}{20}\\text{ panel/hari}$$\n  - Bagian panel yang terselesaikan dalam 4 hari:\n    $$W_1 = 4 \\times v_{R+S} = 4 \\times \\frac{3}{20} = \\frac{12}{20} = \\frac{3}{5}\\text{ bagian}$$\n  - Sisa panel yang belum direstorasi:\n    $$W_{\\text{sisa}} = 1 - \\frac{3}{5} = \\frac{2}{5}\\text{ bagian}$$\n- **Tahap 2: Pengerjaan Sisa Panel oleh Rama dan Bima**\n  - Laju gabungan Rama dan Bima:\n    $$v_{R+B} = \\frac{1}{12} + \\frac{1}{20} = \\frac{5}{60} + \\frac{3}{60} = \\frac{8}{60} = \\frac{2}{15}\\text{ panel/hari}$$\n  - Waktu tambahan yang dibutuhkan untuk menyelesaikan sisa $\\frac{2}{5}$ bagian:\n    $$t_{\\text{tambah}} = \\frac{W_{\\text{sisa}}}{v_{R+B}} = \\frac{\\frac{2}{5}}{\\frac{2}{15}} = \\frac{2}{5} \\times \\frac{15}{2} = \\frac{15}{5} = 3\\text{ hari}$$\n- **Konklusi:** Waktu tambahan yang dibutuhkan Rama dan Bima adalah **3 hari**.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Metode 60 Unit Pekerjaan):**\n\n1. Total beban relief $= 60\\text{ unit}$ (KPK 12, 15, 20).\n2. Laju: Rama $= 5$, Sinta $= 4$, Bima $= 3$ unit/hari.\n3. Rama + Sinta (4 hari): $4 \\times (5 + 4) = 4 \\times 9 = 36\\text{ unit}$.\n4. Sisa pekerjaan $= 60 - 36 = 24\\text{ unit}$.\n5. Rama + Bima: Laju $= 5 + 3 = 8\\text{ unit/hari}$.\n6. Hari tambahan $= \\frac{24}{8} = 3\\text{ hari}$. Pilihan **B** tuntas dalam 10 detik.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menghitung hari tambahan hanya 2 hari akibat salah menghitung sisa beban.\n- **Pilihan C Salah:** Angka 4 hari adalah durasi pengerjaan tahap pertama oleh Rama dan Sinta.\n- **Pilihan D Salah:** Kesalahan hitung pada pembagian $24 / 5$.\n- **Pilihan E Salah (Jebakan Total Durasi):** 7 hari adalah total keseluruhan waktu restorasi dari awal ($4\\text{ hari} + 3\\text{ hari}$), bukan hari tambahan!"
    }
  ]
};
