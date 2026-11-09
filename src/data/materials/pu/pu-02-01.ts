import type { Material } from '../../../types/material';

export const MATERIAL_PU_02_01: Material = {
  "metadata": {
    "id": "pu-2-1",
    "subtest": "PU",
    "chapter_num": 2,
    "chapter_title": "Penalaran Deduktif",
    "subchapter_num": "2.1",
    "subchapter_title": "Logika Proposisi (Konjungsi, Disjungsi, Implikasi, Biimplikasi)",
    "title": "Logika Proposisi (Konjungsi, Disjungsi, Implikasi, Biimplikasi)",
    "required_question_variations": [
      "Penentuan Nilai Kebenaran Proposisi Majemuk (Konjungsi & Disjungsi)",
      "Analisis Kondisi Syarat Cukup vs Syarat Perlu pada Implikasi",
      "Logika Biimplikasi dan Kondisi Syarat Mutlak Ganda (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-08"
  },
  "content": {
    "tactical_overview": "Logika proposisi adalah fondasi berpikir deduktif yang mengkaji hubungan nilai kebenaran antarpernyataan menggunakan operator logika: konjungsi (\"dan\"), disjungsi (\"atau\"), implikasi (\"jika... maka...\"), dan biimplikasi (\"...jika dan hanya jika...\"). Di UTBK SNBT, kunci terpenting adalah membedakan syarat cukup (sufficient condition) dan syarat perlu (necessary condition) pada kalimat bersyarat, memahami bahwa disjungsi UTBK bersifat inklusif kecuali dinyatakan khusus, serta mengingat bahwa implikasi p → q hanya bernilai salah ketika janji anteseden (p) bernilai benar tetapi realisasi konsekuen (q) justru salah.",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nLogika proposisi merupakan cabang penalaran deduktif yang mempelajari kebenaran suatu pernyataan berdasarkan susunan kalimat dan kata penghubung logikanya. Sebuah **proposisi** adalah kalimat deklaratif yang bernilai pasti, yaitu bernilai Benar ($B$) saja atau Salah ($S$) saja, namun tidak dapat bernilai keduanya sekaligus. Di dalam naskah ujian UTBK SNBT, Anda akan berhadapan dengan **proposisi majemuk**, yaitu gabungan dua proposisi tunggal atau lebih yang disatukan oleh operator logika formal.\n\nEmpat operator logika dasar yang wajib Anda kuasai meliputi:\n1. **Konjungsi ($p \\land q$ — dibaca: \"$p$ dan $q$\", \"serta\", \"walaupun\")**  \n   Pernyataan konjungsi bernilai **BENAR HANYA JIKA** kedua proposisi pembentuknya ($p$ dan $q$) sama-sama bernilai benar. Apabila ada salah satu saja proposisi yang bernilai salah, maka keseluruhan kalimat konjungsi seketika gugur menjadi salah. Di dalam soal kontekstual UTBK, kata *\"walaupun\"*, *\"namun\"*, atau *\"tetapi\"* memiliki kedudukan logika yang setara dengan operator *\"dan\"*.\n2. **Disjungsi ($p \\lor q$ — dibaca: \"$p$ atau $q$\")**  \n   Secara baku, disjungsi pada naskah UTBK bersifat **inklusif**, yang berarti pernyataan bernilai **BENAR JIKA MINIMAL SALAH SATU** proposisi bernilai benar (termasuk jika kedua-duanya bernilai benar sekaligus). Pernyataan disjungsi hanya akan bernilai **SALAH HANYA JIKA** kedua proposisi ($p$ dan $q$) sama-sama salah. Pilihan jawaban yang menganggap kata *\"atau\"* melarang kedua syarat terwujud secara serentak merupakan pemahaman yang keliru secara logika matematika.\n3. **Implikasi ($p \\rightarrow q$ — dibaca: \"Jika $p$, maka $q$\")**  \n   Implikasi menghubungkan pernyataan syarat/sebab ($p$, disebut *anteseden*) dengan hasil/akibat ($q$, disebut *konsekuen*).  \n   - $p$ berkedudukan sebagai **Syarat Cukup (*Sufficient Condition*)**: jika $p$ sudah terpenuhi, maka $q$ pasti otomatis terjadi.  \n   - $q$ berkedudukan sebagai **Syarat Perlu (*Necessary Condition*)**: $q$ adalah syarat mutlak yang harus hadir agar $p$ dapat terwujud.  \n   - **Aturan Emas Kebenaran Implikasi:** Implikasi bernilai **SALAH HANYA JIKA** $p$ bernilai Benar namun $q$ justru bernilai Salah ($B \\rightarrow S = S$). Jika $p$ bernilai Salah, maka seluruh implikasi otomatis dianggap tetap bernilai Benar.\n4. **Biimplikasi ($p \\leftrightarrow q$ — dibaca: \"$p$ jika dan hanya jika $q$\")**  \n   Biimplikasi adalah relasi ekuivalensi dua arah ($p \\rightarrow q$ dan $q \\rightarrow p$). Pernyataan ini bernilai **BENAR JIKA DAN HANYA JIKA** kedua proposisi memiliki nilai kebenaran yang persis sama (keduanya sama-sama Benar atau keduanya sama-sama Salah). Pada biimplikasi, $p$ adalah syarat cukup sekaligus syarat perlu bagi $q$.\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\nPembuat soal UTBK kerap merancang opsi jawaban yang sengaja memancing siswa agar terjebak pada kekeliruan logika sehari-hari:\n1. **Jebakan Menegaskan Konsekuen (*Affirming the Consequent*)**  \n   Pada pernyataan implikasi *\"Jika $p$ maka $q$\"*, siswa sering tergoda menyimpulkan bahwa jika fakta di lapangan menunjukkan $q$ terjadi, maka $p$ pasti terjadi. Ini adalah cacat logika fatal. Terwujudnya $q$ belum tentu disebabkan oleh $p$, karena $q$ bisa saja dipicu oleh faktor lain di luar $p$.\n2. **Jebakan Menyangkal Anteseden (*Denying the Antecedent*)**  \n   Siswa menyimpulkan bahwa jika $p$ tidak terjadi, maka $q$ pasti tidak terjadi. Padahal rumus *\"Jika $p$ maka $q$\"* tidak melarang $q$ untuk tetap terjadi melalui jalur lain meskipun $p$ tidak terlaksana.\n3. **Jebakan Menyamakan Implikasi dengan Biimplikasi**  \n   Pilihan jawaban menganggap hubungan bersyarat satu arah (*jika... maka...*) otomatis dapat dibalik dua arah. Ingat bahwa hubungan bolak-balik yang sah hanya berlaku jika teks secara eksplisit menuliskan frasa *\"jika dan hanya jika\"*.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\nGunakan strategi taktis berikut untuk mengeksekusi soal logika proposisi dengan cepat dan akurat:\n1. **Sederhanakan Kalimat Menjadi Rumus Simbolik Logika**  \n   Saat membaca wacana aturan atau klausul syarat yang panjang, segera terjemahkan ke dalam simbol logika singkat di lembar coretan, misalnya: $(A \\land B) \\lor C$ atau $P \\rightarrow Q$. Langkah ini menghindarkan Anda dari kebingungan redaksional kalimat wacana.\n2. **Kuasai Skenario Pelanggaran Implikasi ($B \\rightarrow S = S$)**  \n   Ingatlah bahwa satu-satunya cara membuktikan kalimat *\"Jika P maka Q\"* melanggar aturan atau bernilai bohong adalah saat kondisi $P$ terbukti terjadi, tetapi janji $Q$ tidak terlaksana.\n3. **Gunakan Hukum Kontraposisi untuk Menguji Kebenaran Pasti**  \n   Pernyataan *\"Jika $p$ maka $q$\"* ($p \\rightarrow q$) memiliki nilai kebenaran yang setara penuh (*ekuivalen*) dengan kontraposisinya, yaitu *\"Jika tidak $q$, maka tidak $p$\"* ($\\sim q \\rightarrow \\sim p$). Jika Anda menemukan fakta bahwa akibat tidak terjadi ($\\sim q$), Anda dapat langsung menyimpulkan dengan pasti bahwa sebabnya tidak terjadi ($\\sim p$).\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Materi:** Logika proposisi menilai kebenaran kalimat majemuk berdasarkan nilai kebenaran proposisi tunggal dan operator perangkainya.\n- **Aturan Kebenaran Kunci:**\n  - Konjungsi ($p \\land q$): Benar jika **keduanya Benar**.\n  - Disjungsi ($p \\lor q$): Benar jika **minimal salah satu Benar**.\n  - Implikasi ($p \\rightarrow q$): Salah jika **$p$ Benar dan $q$ Salah** ($B \\rightarrow S = S$).\n  - Biimplikasi ($p \\leftrightarrow q$): Benar jika **nilai keduanya sama**.\n- **Kaidah Syarat:** Pada implikasi $p \\rightarrow q$, $p$ adalah syarat cukup dan $q$ adalah syarat perlu. Penegasan $q$ tidak membuktikan $p$, dan penyangkalan $p$ tidak membuktikan ketiadaan $q$.\n- **Strategi Eksekusi:** Terjemahkan ke simbol logika, gunakan kontraposisi ($\\sim q \\rightarrow \\sim p$), dan eliminasi opsi yang menegaskan konsekuen.\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Logika Proposisi yang rutin muncul pada UTBK SNBT, lengkap dengan wacana soal, opsi pilihan ganda A–E utuh, kunci jawaban, dan pembahasan logika secara terperinci:\n\n### Variasi 1: Penentuan Nilai Kebenaran Proposisi Majemuk (Konjungsi & Disjungsi)\n\n> **Konteks Wacana Soal:**  \n> Panitia seleksi beasiswa kepemimpinan menetapkan ketentuan bagi calon penerima beasiswa sebagai berikut:  \n> *\"Seorang pendaftar berhak lolos seleksi berkas jika memenuhi ketentuan: memiliki IPK minimal 3,50 DAN aktif dalam organisasi kampus, ATAU memiliki sertifikat prestasi kompetisi tingkat nasional.\"*  \n>  \n> Berikut adalah catatan profil lima orang pendaftar:  \n> - Aryo: Memiliki IPK 3,65, tidak aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi kompetisi nasional.  \n> - Bima: Memiliki IPK 3,40, aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi kompetisi nasional.  \n> - Cantika: Memiliki IPK 3,25, tidak aktif dalam organisasi kampus, tetapi memiliki sertifikat juara 1 kompetisi debat nasional.  \n> - Dimas: Memiliki IPK 3,48, aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi tingkat nasional.  \n> - Erna: Memiliki IPK 3,30, tidak aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi tingkat nasional.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan aturan logika proposisi tersebut, siapakah pendaftar yang pasti lolos seleksi berkas beasiswa kepemimpinan?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Aryo  \n> - **B.** Bima  \n> - **C.** Cantika  \n> - **D.** Dimas  \n> - **E.** Erna\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Struktur Logika:** Aturan seleksi berkas beasiswa dapat dirumuskan secara simbolik sebagai: $(P \\land Q) \\lor R$  \n  di mana:  \n  - $P$ = Memiliki IPK $\\ge 3,50$  \n  - $Q$ = Aktif dalam organisasi kampus  \n  - $R$ = Memiliki sertifikat prestasi kompetisi tingkat nasional  \n  Karena operator utamanya adalah disjungsi inklusif ($\\lor$), maka pendaftar berhak lolos apabila **blok pertama $(P \\land Q)$ bernilai Benar** ATAU **blok kedua $(R)$ bernilai Benar**.\n- **Evaluasi Nilai Kebenaran Setiap Pendaftar:**\n  - **Aryo:** $P$ Benar ($3,65 \\ge 3,50$), $Q$ Salah, $R$ Salah. Nilai logika: $(B \\land S) \\lor S = S \\lor S = \\text{Salah}$ (Tidak Lolos).\n  - **Bima:** $P$ Salah ($3,40 < 3,50$), $Q$ Benar, $R$ Salah. Nilai logika: $(S \\land B) \\lor S = S \\lor S = \\text{Salah}$ (Tidak Lolos).\n  - **Cantika:** $P$ Salah ($3,25 < 3,50$), $Q$ Salah, namun $R$ Benar (memiliki sertifikat juara 1 nasional). Nilai logika: $(S \\land S) \\lor B = S \\lor B = \\text{Benar}$ (Pasti Lolos!).\n  - **Dimas:** $P$ Salah ($3,48 < 3,50$), $Q$ Benar, $R$ Salah. Nilai logika: $(S \\land B) \\lor S = S \\lor S = \\text{Salah}$ (Tidak Lolos).\n  - **Erna:** $P$ Salah, $Q$ Salah, $R$ Salah. Nilai logika: $(S \\land S) \\lor S = S \\lor S = \\text{Salah}$ (Tidak Lolos).\n- **Penerapan Trik Cepat (15 Detik):** Perhatikan kata *\"ATAU\"* sebelum syarat sertifikat prestasi nasional ($R$). Adanya disjungsi ini berarti siapa pun yang memiliki sertifikat nasional otomatis langsung lolos tanpa memedulikan IPK maupun organisasi. Langsung pindai profil pendaftar yang memiliki sertifikat prestasi nasional: hanya Cantika yang memilikinya. Jawaban yang benar adalah pilihan **C**.\n\n---\n\n### Variasi 2: Analisis Kondisi Syarat Cukup vs Syarat Perlu pada Implikasi\n\n> **Konteks Wacana Soal:**  \n> Sebuah perusahaan teknologi terkemuka memberlakukan aturan resmi dalam proses rekrutmen divisi rekayasa perangkat lunak:  \n> *\"Jika seorang pelamar memiliki sertifikasi keahlian komputasi awan tingkat profesional, maka pelamar tersebut pasti langsung dipanggil untuk wawancara teknis tahap akhir.\"*  \n>  \n> Dalam proses rekrutmen bulan ini, panitia mencatat dua fakta nyata di lapangan:  \n> (1) Doni tidak dipanggil untuk wawancara teknis tahap akhir.  \n> (2) Farhan dipanggil untuk wawancara teknis tahap akhir.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan kaidah logika proposisi (implikasi), manakah simpulan berikut yang paling tepat dan pasti bernilai benar?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Doni memiliki sertifikasi keahlian komputasi awan tingkat profesional.  \n> - **B.** Farhan pasti memiliki sertifikasi keahlian komputasi awan tingkat profesional.  \n> - **C.** Doni tidak memiliki sertifikasi keahlian komputasi awan tingkat profesional.  \n> - **D.** Farhan pasti tidak memiliki sertifikasi keahlian komputasi awan tingkat profesional.  \n> - **E.** Doni dan Farhan sama-sama memiliki sertifikasi keahlian komputasi awan tingkat profesional.\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Struktur Logika Implikasi:** Rumus aturan perusahaan adalah $p \\rightarrow q$, di mana:  \n  - $p$ = Memiliki sertifikasi keahlian komputasi awan (Syarat Cukup / Anteseden)  \n  - $q$ = Dipanggil untuk wawancara teknis tahap akhir (Syarat Perlu / Konsekuen)\n- **Evaluasi Logika Doni (Penerapan Kontraposisi):**  \n  Fakta Doni adalah $\\sim q$ (Doni *tidak* dipanggil wawancara teknis tahap akhir). Berdasarkan hukum kontraposisi / kaidah penarikan kesimpulan *Modus Tollens*, jika premis umum $p \\rightarrow q$ bernilai benar dan terjadi $\\sim q$, maka konklusi logis yang pasti adalah $\\sim p$ (Doni pasti tidak memiliki sertifikasi keahlian komputasi awan). Oleh sebab itu, pernyataan pada pilihan C pasti bernilai benar.\n- **Mengapa Opsi Farhan Salah? (Jebakan Menegaskan Konsekuen):**  \n  Fakta Farhan adalah $q$ (Farhan dipanggil wawancara tahap akhir). Menarik simpulan bahwa Farhan pasti memiliki sertifikasi ($p$) merupakan cacat logika *affirming the consequent*. Sertifikasi hanyalah salah satu syarat cukup; pelamar bisa saja dipanggil wawancara karena portofolio proyek yang luar biasa atau jalur rekomendasi lain. Dengan demikian, status sertifikasi Farhan berada pada taraf belum tentu benar (pilihan B dan D keliru).\n- **Penerapan Trik Cepat (15 Detik):** Ingat rumus kontraposisi: jika akibat tidak terjadi ($\\sim q$), maka sebab pasti tidak terjadi ($\\sim p$). Karena Doni tidak dipanggil wawancara, maka Doni pasti tidak punya sertifikasi. Coret opsi spekulatif mengenai Farhan (pilihan B dan D) karena menegaskan konsekuen. Pilihan yang tepat adalah pilihan **C**.\n\n---\n\n### Variasi 3: Logika Biimplikasi dan Kondisi Syarat Mutlak Ganda (HOTS)\n\n> **Konteks Wacana Soal:**  \n> Dalam regulasi pengawasan perbankan, penilaian status kesehatan bank devisa ditetapkan secara mengikat dengan ketentuan biimplikasi berikut:  \n> *\"Sebuah bank devisa berhak memperoleh predikat Sangat Sehat jika dan hanya jika bank tersebut mempertahankan rasio kecukupan modal di atas 15% serta mencatatkan rasio kredit macet di bawah 3%.\"*  \n>  \n> Dalam laporan audit tahunan perbankan nasional resmi:  \n> (1) Bank Megantara resmi diumumkan memperoleh predikat Sangat Sehat.  \n> (2) Bank Sentosa dinyatakan gagal memperoleh predikat Sangat Sehat, meskipun rasio kredit macetnya tercatat hanya 2,1%.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan kaidah logika biimplikasi, manakah pernyataan berikut yang pasti bernilai benar?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Bank Megantara memiliki rasio kecukupan modal di atas 15%, dan Bank Sentosa memiliki rasio kecukupan modal tidak lebih dari 15%.  \n> - **B.** Bank Sentosa pasti memiliki rasio kredit macet di atas 3%.  \n> - **C.** Bank Megantara belum tentu memiliki rasio kredit macet di bawah 3%.  \n> - **D.** Semua bank yang memiliki rasio kredit macet di bawah 3% pasti memperoleh predikat Sangat Sehat.  \n> - **E.** Bank Sentosa akan memperoleh predikat Sangat Sehat jika rasio kredit macetnya diturunkan menjadi 1,5%.\n\n**Kunci Jawaban: A**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Struktur Logika Biimplikasi:** Rumus regulasi adalah:  \n  $P \\leftrightarrow (M \\land K)$  \n  di mana:  \n  - $P$ = Memperoleh predikat Sangat Sehat  \n  - $M$ = Rasio kecukupan modal $> 15\\%$  \n  - $K$ = Rasio kredit macet $< 3\\%$  \n  Sifat biimplikasi menyatakan bahwa sisi kiri ($P$) dan sisi kanan $(M \\land K)$ wajib memiliki nilai kebenaran yang identik ($B \\leftrightarrow B$ atau $S \\leftrightarrow S$).\n- **Analisis Bank Megantara:** Bank Megantara memperoleh predikat Sangat Sehat ($P = \\text{Benar}$). Agar biimplikasi bernilai benar, maka blok kanan $(M \\land K)$ wajib bernilai Benar. Karena konjungsi bernilai benar hanya jika kedua syarat terpenuhi, maka Bank Megantara **pasti** memiliki rasio modal $> 15\\%$ ($M = \\text{Benar}$) dan kredit macet $< 3\\%$ ($K = \\text{Benar}$).\n- **Analisis Bank Sentosa:** Bank Sentosa gagal memperoleh predikat Sangat Sehat ($P = \\text{Salah}$). Maka sisi kanan $(M \\land K)$ wajib bernilai **Salah**. Di dalam teks diketahui rasio kredit macet Bank Sentosa adalah $2,1\\%$, yang berarti syarat $K$ telah terpenuhi ($K = \\text{Benar}$ karena $2,1\\% < 3\\%$). Agar konjungsi $(M \\land K)$ menghasilkan nilai Salah sementara $K$ sudah Benar, maka penyebab kegagalan satu-satunya adalah syarat modal ($M$) wajib bernilai **Salah**. Artinya, Bank Sentosa **pasti memiliki rasio kecukupan modal tidak lebih dari $15\\%$** ($M \\le 15\\%$).\n- **Mengapa Opsi Lain Salah?**\n  - **Pilihan B Salah:** Bertentangan langsung dengan fakta teks yang menyebutkan kredit macet Bank Sentosa adalah $2,1\\%$, bukan di atas $3\\%$.\n  - **Pilihan C Salah:** Bank Megantara telah memperoleh predikat Sangat Sehat, sehingga kredit macetnya pasti di bawah $3\\%$, bukan belum tentu.\n  - **Pilihan D Salah:** Kredit macet $< 3\\%$ hanyalah salah satu syarat konjungsi; jika rasio modalnya $\\le 15\\%$, bank tersebut tetap tidak akan memperoleh predikat Sangat Sehat.\n  - **Pilihan E Salah:** Menurunkan kredit macet ke $1,5\\%$ tidak akan mengubah keadaan apabila rasio kecukupan modalnya tetap berada di bawah atau sama dengan $15\\%$.\n- **Penerapan Trik Cepat (15 Detik):** Ingat sifat biimplikasi dua arah: jika predikat gagal ($P = \\text{Salah}$), maka syarat majemuk di sisi kanan harus ada yang gagal. Karena kredit macet Bank Sentosa sudah lolos ($2,1\\% < 3\\%$), maka yang pasti gagal adalah rasio kecukupan modalnya (tidak lebih dari $15\\%$). Gabungkan dengan status Bank Megantara yang pasti lolos kedua syaratnya. Pernyataan yang merangkum kedua deduksi ini secara tepat adalah pilihan **A**.",
    "visualizations_svg": [],
    "distractor_traps": [
      "Affirming the Consequent (Menegaskan Konsekuen): Menganggap terpenuhinya akibat/konsekuen (q) otomatis membuktikan bahwa syarat p pasti terjadi.",
      "Jebakan Disjungsi Eksklusif Semu: Mengira kata \"atau\" melarang kedua kondisi terjadi bersamaan, padahal disjungsi logika bernilai benar saat kedua syarat sama-sama terpenuhi.",
      "Jebakan Konversi Implikasi: Menyamakan \"Jika p maka q\" dengan \"Jika q maka p\", padahal implikasi adalah hubungan bersyarat satu arah, bukan biimplikasi."
    ],
    "quick_execution_algorithm": [
      "Identifikasi operator logika penghubung kalimat: lingkari kata \"dan\", \"atau\", \"jika... maka...\", atau \"jika dan hanya jika\".",
      "Ubah pernyataan majemuk ke dalam simbol logika sederhana (misal p -> q atau (p ∧ q) ∨ r) untuk menghindari bias wacana.",
      "Pada implikasi p -> q, ingat rumus emas: hanya bernilai salah jika p Benar dan q Salah (B -> S = S).",
      "Gunakan hukum kontraposisi (~q -> ~p) untuk menarik simpulan pasti, dan singkirkan opsi yang menegaskan konsekuen (q -> p) atau menyangkal anteseden (~p -> ~q)."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-02-01-ex1",
      "variation_name": "Variasi 1: Penentuan Nilai Kebenaran Proposisi Majemuk (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Panitia seleksi beasiswa kepemimpinan menetapkan ketentuan bagi calon penerima beasiswa sebagai berikut:\n\n*\"Seorang pendaftar berhak lolos seleksi berkas jika memenuhi ketentuan: memiliki IPK minimal 3,50 DAN aktif dalam organisasi kampus, ATAU memiliki sertifikat prestasi kompetisi tingkat nasional.\"*\n\nBerikut adalah catatan profil lima orang pendaftar:\n- **Aryo:** Memiliki IPK 3,65, tidak aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi kompetisi nasional.\n- **Bima:** Memiliki IPK 3,40, aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi kompetisi nasional.\n- **Cantika:** Memiliki IPK 3,25, tidak aktif dalam organisasi kampus, tetapi memiliki sertifikat juara 1 kompetisi debat nasional.\n- **Dimas:** Memiliki IPK 3,48, aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi tingkat nasional.\n- **Erna:** Memiliki IPK 3,30, tidak aktif dalam organisasi kampus, dan tidak memiliki sertifikat prestasi tingkat nasional.",
      "question_markdown": "Berdasarkan aturan logika proposisi tersebut, siapakah pendaftar yang **pasti lolos** seleksi berkas beasiswa kepemimpinan?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Aryo"
        },
        {
          "key": "B",
          "text_markdown": "Bima"
        },
        {
          "key": "C",
          "text_markdown": "Cantika"
        },
        {
          "key": "D",
          "text_markdown": "Dimas"
        },
        {
          "key": "E",
          "text_markdown": "Erna"
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Perhatikan struktur logika aturan: `(IPK ≥ 3,50 DAN Organisasi) ATAU Prestasi Nasional`. Karena ada kata ATAU, pendaftar yang memiliki prestasi nasional otomatis lolos meski IPK di bawah 3,50 dan tidak aktif organisasi!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rumus Logika Proposisi:** $(P \\land Q) \\lor R$\n  - $P$: $\\text{IPK} \\ge 3,50$\n  - $Q$: Aktif dalam organisasi kampus\n  - $R$: Memiliki sertifikat prestasi kompetisi tingkat nasional\n- **Evaluasi Nilai Kebenaran:**\n  - **Aryo:** $P$ Benar ($3,65$), $Q$ Salah, $R$ Salah $\\rightarrow (B \\land S) \\lor S = S \\lor S = \\text{Salah}$.\n  - **Bima:** $P$ Salah ($3,40$), $Q$ Benar, $R$ Salah $\\rightarrow (S \\land B) \\lor S = S \\lor S = \\text{Salah}$.\n  - **Cantika:** $P$ Salah ($3,25$), $Q$ Salah, namun $R$ Benar $\\rightarrow (S \\land S) \\lor B = S \\lor B = \\text{Benar}$.\n  - **Dimas:** $P$ Salah ($3,48$), $Q$ Benar, $R$ Salah $\\rightarrow (S \\land B) \\lor S = S \\lor S = \\text{Salah}$.\n  - **Erna:** $P$ Salah, $Q$ Salah, $R$ Salah $\\rightarrow S \\lor S = \\text{Salah}$.\n- **Konklusi:** Hanya Cantika yang menghasilkan nilai kebenaran Benar pada formula seleksi.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Amati Jalur Disjungsi \"ATAU\"):**\n\n1. Rumus aturan memiliki cabang penyelamat *\"ATAU memiliki sertifikat prestasi kompetisi nasional\"*.\n2. Siapa pun yang memiliki sertifikat nasional langsung lolos tanpa memedulikan nilai IPK dan keaktifan organisasi.\n3. Langsung periksa profil: hanya Cantika yang memiliki sertifikat prestasi nasional (juara 1 debat nasional).\n4. Jawaban yang tepat adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Aryo gagal karena konjungsi (IPK dan organisasi) mensyaratkan kedua hal terpenuhi; Aryo tidak aktif organisasi dan tidak punya sertifikat nasional.\n- **Pilihan B Salah:** Bima gagal karena IPK-nya 3,40 (kurang dari batas minimal 3,50) dan tidak memiliki sertifikat prestasi nasional.\n- **Pilihan D Salah:** Dimas gagal karena IPK-nya 3,48 belum mencapai batas 3,50 dan tidak memiliki sertifikat prestasi nasional.\n- **Pilihan E Salah:** Erna gagal karena tidak memenuhi satupun kriteria yang disyaratkan."
    },
    {
      "example_id": "pu-02-01-ex2",
      "variation_name": "Variasi 2: Analisis Kondisi Syarat Cukup vs Syarat Perlu (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah perusahaan teknologi terkemuka memberlakukan aturan resmi dalam proses rekrutmen divisi rekayasa perangkat lunak:\n\n*\"Jika seorang pelamar memiliki sertifikasi keahlian komputasi awan tingkat profesional, maka pelamar tersebut pasti langsung dipanggil untuk wawancara teknis tahap akhir.\"*\n\nDalam proses rekrutmen bulan ini, panitia mencatat dua fakta nyata di lapangan:\n(1) Doni tidak dipanggil untuk wawancara teknis tahap akhir.\n(2) Farhan dipanggil untuk wawancara teknis tahap akhir.",
      "question_markdown": "Berdasarkan kaidah logika proposisi (implikasi), manakah simpulan berikut yang **paling tepat dan pasti bernilai benar**?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Doni memiliki sertifikasi keahlian komputasi awan tingkat profesional."
        },
        {
          "key": "B",
          "text_markdown": "Farhan pasti memiliki sertifikasi keahlian komputasi awan tingkat profesional."
        },
        {
          "key": "C",
          "text_markdown": "Doni tidak memiliki sertifikasi keahlian komputasi awan tingkat profesional."
        },
        {
          "key": "D",
          "text_markdown": "Farhan pasti tidak memiliki sertifikasi keahlian komputasi awan tingkat profesional."
        },
        {
          "key": "E",
          "text_markdown": "Doni dan Farhan sama-sama memiliki sertifikasi keahlian komputasi awan tingkat profesional."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat hukum kontraposisi implikasi: `p → q` setara dengan `~q → ~p`. Doni tidak dipanggil wawancara (~q), maka Doni pasti tidak punya sertifikasi (~p). Hati-hati dengan Farhan: dipanggil wawancara (q) tidak menjamin Farhan punya sertifikasi (bisa lewat jalur lain)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Implikasi:** $p \\rightarrow q$\n  - $p$: Memiliki sertifikasi keahlian komputasi awan (syarat cukup).\n  - $q$: Dipanggil untuk wawancara teknis tahap akhir (syarat perlu).\n- **Analisis Doni:** Diketahui $\\sim q$ (tidak dipanggil wawancara).\n  - Sesuai hukum kontraposisi / *Modus Tollens*: $(p \\rightarrow q) \\land \\sim q \\vdash \\sim p$.\n  - Maka Doni dipastikan **tidak memiliki sertifikasi keahlian komputasi awan**. (Pilihan C pasti benar).\n- **Analisis Farhan:** Diketahui $q$ (dipanggil wawancara).\n  - Menyimpulkan $p$ dari $q$ adalah sesat pikir menegaskan konsekuen (*affirming the consequent*). Farhan bisa dipanggil karena faktor portofolio lain, sehingga status sertifikasi Farhan belum dapat dipastikan.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Kontraposisi & Hindari Jebakan Konsekuen):**\n\n1. Ingat rumus pasti: Jika akibat tidak terjadi ($\\sim q$), maka sebab pasti tidak ada ($\\sim p$). Karena Doni tidak dipanggil wawancara, maka Doni pasti tidak bersertifikasi.\n2. Farhan dipanggil wawancara adalah penegasan konsekuen ($q$), sehingga sertifikasinya belum tentu ada (jangan pilih opsi mutlak tentang Farhan di B atau D).\n3. Jawaban yang pasti benar adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertolak belakang dengan hukum kontraposisi; jika Doni punya sertifikasi, ia seharusnya dipanggil wawancara.\n- **Pilihan B Salah:** Mengalami sesat pikir *affirming the consequent*; dipanggil wawancara tidak menjamin kepemilikan sertifikasi karena ada jalur kualifikasi lain.\n- **Pilihan D Salah:** Bersifat spekulatif mutlak ke arah sebaliknya; tidak ada premis yang melarang Farhan memiliki sertifikasi.\n- **Pilihan E Salah:** Doni sudah terbukti secara deduktif tidak memiliki sertifikasi, sehingga tidak mungkin keduanya sama-sama memiliki sertifikasi."
    },
    {
      "example_id": "pu-02-01-ex3",
      "variation_name": "Variasi 3: Logika Biimplikasi dan Kondisi Syarat Mutlak Ganda (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dalam regulasi pengawasan perbankan, penilaian status kesehatan bank devisa ditetapkan secara mengikat dengan ketentuan biimplikasi berikut:\n\n*\"Sebuah bank devisa berhak memperoleh predikat Sangat Sehat jika dan hanya jika bank tersebut mempertahankan rasio kecukupan modal di atas 15% serta mencatatkan rasio kredit macet di bawah 3%.\"*\n\nDalam laporan audit tahunan perbankan nasional resmi:\n(1) Bank Megantara resmi diumumkan memperoleh predikat Sangat Sehat.\n(2) Bank Sentosa dinyatakan gagal memperoleh predikat Sangat Sehat, meskipun rasio kredit macetnya tercatat hanya 2,1%.",
      "question_markdown": "Berdasarkan kaidah logika biimplikasi, manakah pernyataan berikut yang **pasti bernilai benar**?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Bank Megantara memiliki rasio kecukupan modal di atas 15%, dan Bank Sentosa memiliki rasio kecukupan modal tidak lebih dari 15%."
        },
        {
          "key": "B",
          "text_markdown": "Bank Sentosa pasti memiliki rasio kredit macet di atas 3%."
        },
        {
          "key": "C",
          "text_markdown": "Bank Megantara belum tentu memiliki rasio kredit macet di bawah 3%."
        },
        {
          "key": "D",
          "text_markdown": "Semua bank yang memiliki rasio kredit macet di bawah 3% pasti memperoleh predikat Sangat Sehat."
        },
        {
          "key": "E",
          "text_markdown": "Bank Sentosa akan memperoleh predikat Sangat Sehat jika rasio kredit macetnya diturunkan menjadi 1,5%."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Biimplikasi mengikat dua arah: `Predikat ↔ (Modal > 15% DAN Kredit Macet < 3%)`. Jika predikat gagal (Bank Sentosa), maka syarat gabungannya pasti gagal. Karena kredit macet Bank Sentosa sudah lolos (2,1% < 3%), maka syarat modalnya WAJIB gagal (≤ 15%)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rumus Biimplikasi:** $P \\leftrightarrow (M \\land K)$\n  - $P$: Predikat Sangat Sehat\n  - $M$: Rasio modal $> 15\\%$\n  - $K$: Kredit macet $< 3\\%$\n- **Deduksi Bank Megantara:**\n  - $P = \\text{Benar}$.\n  - Agar $P \\leftrightarrow (M \\land K)$ bernilai Benar, maka $(M \\land K)$ wajib Benar.\n  - Akibatnya, Bank Megantara **pasti** memenuhi $M > 15\\%$ dan $K < 3\\%$.\n- **Deduksi Bank Sentosa:**\n  - $P = \\text{Salah}$ (gagal predikat).\n  - Agar biimplikasi bernilai Benar, maka $(M \\land K)$ wajib **Salah**.\n  - Fakta audit: Kredit macet Bank Sentosa adalah $2,1\\%$, artinya syarat $K$ bernilai Benar ($2,1\\% < 3\\%$).\n  - Agar konjungsi $(M \\land K)$ bernilai Salah sementara $K$ bernilai Benar, maka syarat $M$ harus bernilai **Salah** ($M \\le 15\\%$).\n  - Jadi, Bank Sentosa **pasti memiliki rasio kecukupan modal tidak lebih dari $15\\%$**.\n- **Kesimpulan:** Pernyataan A memadukan kedua kesimpulan yang telah terbukti secara valid.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Analisis Penyebab Kegagalan Biimplikasi):**\n\n1. Bank Megantara lolos predikat $\\rightarrow$ kedua syarat (modal $> 15\\%$ dan kredit macet $< 3\\%$) pasti terpenuhi.\n2. Bank Sentosa gagal predikat $\\rightarrow$ minimal salah satu syarat harus gugur.\n3. Karena data audit menunjukkan kredit macetnya sudah aman ($2,1\\% < 3\\%$), maka satu-satunya penyebab kegagalan adalah syarat modalnya tidak terpenuhi ($\\le 15\\%$).\n4. Pilihan yang menyatakan modal Megantara $> 15\\%$ dan modal Sentosa $\\le 15\\%$ adalah pilihan **A**.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Bertentangan dengan fakta teks wacana yang secara gamblang menyatakan kredit macet Bank Sentosa adalah 2,1% (di bawah 3%).\n- **Pilihan C Salah:** Bank Megantara sudah dipastikan memperoleh predikat Sangat Sehat, sehingga kredit macetnya pasti di bawah 3%, bukan belum tentu.\n- **Pilihan D Salah:** Kredit macet < 3% hanya satu dari dua syarat wajib; bank tetap tidak dapat predikat jika rasio modalnya tidak mencapai > 15%.\n- **Pilihan E Salah:** Menurunkan kredit macet ke 1,5% tidak ada gunanya jika akar kegagalannya adalah rasio modal yang belum melebihi 15%."
    }
,
    {
        "example_id": "pu-02-01-ex4",
        "variation_name": "Variasi 4: Evaluasi Nilai Kebenaran Status Peringatan Dini Hidrometeorologi (Level: Sedang)",
        "difficulty": "medium",
        "question_type": "standard_mc",
        "context_markdown": "Berdasarkan protokol operasional Badan Mitigasi Bencana, status Siaga Hidrometeorologi pada suatu Daerah Aliran Sungai (DAS) diterbitkan jika dan hanya jika kawasan hulu memenuhi kriteria:\n\n*\"Curah hujan harian melampaui 100 mm DAN durasi hujan lebat berlangsung lebih dari 4 jam terus-menerus, ATAU sensor telemetri mencatat kenaikan muka air bendung hulu melampaui batas kritis 250 cm.\"*\n\nData stasiun pemantau DAS Citarik pada hari Senin mencatat:\n- Curah hujan harian mencapai 118 mm.\n- Durasi hujan lebat tercatat selama 3 jam, lalu mereda menjadi gerimis.\n- Sensor telemetri bendung hulu mencatat kenaikan muka air mencapai 268 cm.",
        "question_markdown": "Berdasarkan kaidah logika proposisi, manakah kesimpulan yang **pasti bernilai benar** mengenai penerbitan status Siaga pada DAS Citarik pada hari Senin?",
        "options": [
            {
                "key": "A",
                "text_markdown": "Status Siaga tidak diterbitkan karena durasi hujan lebat hanya berlangsung 3 jam."
            },
            {
                "key": "B",
                "text_markdown": "Status Siaga pasti diterbitkan karena sensor telemetri bendung hulu melampaui batas kritis 250 cm meskipun durasi hujan lebat kurang dari 4 jam."
            },
            {
                "key": "C",
                "text_markdown": "Status Siaga hanya dapat diterbitkan apabila ketiga parameter pemantauan hidrometeorologi terpenuhi secara serentak."
            },
            {
                "key": "D",
                "text_markdown": "Status Siaga tidak dapat diterbitkan karena ketinggian muka air bendung hulu belum melampaui ambang batas 300 cm."
            },
            {
                "key": "E",
                "text_markdown": "Kenaikan muka air bendung hulu tidak berpengaruh terhadap keputusan penerbitan status siaga bencana."
            }
        ],
        "correct_answer": "B",
        "hint_markdown": "💡 **Petunjuk Soal:** Terjemahkan aturan ke simbol logika: `(Curah Hujan > 100 mm DAN Durasi > 4 jam) ATAU Muka Air Bendung > 250 cm`. Karena dihubungkan oleh kata ATAU (disjungsi), jika cabang muka air bendung terpenuhi (268 cm > 250 cm), maka status Siaga WAJIB diterbitkan walau durasi hujan cuma 3 jam!",
        "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Logika Regulasi:** $S \\leftrightarrow ((H \\land D) \\lor B)$\n  - $S$: Status Siaga diterbitkan\n  - $H$: Curah hujan $> 100$ mm\n  - $D$: Durasi hujan lebat $> 4$ jam\n  - $B$: Ketinggian muka air bendung $> 250$ cm\n- **Evaluasi Nilai Kebenaran DAS Citarik:**\n  - $H = \\text{Benar}$ ($118 > 100$ mm)\n  - $D = \\text{Salah}$ ($3 \\le 4$ jam)\n  - Blok Konjungsi: $H \\land D = B \\land S = \\text{Salah}$\n  - $B = \\text{Benar}$ ($268 > 250$ cm)\n  - Blok Disjungsi: $(H \\land D) \\lor B = S \\lor B = \\text{Benar}$\n- **Kesimpulan:** Karena sisi kanan formula bernilai Benar, maka status Siaga ($S$) **pasti diterbitkan**.\n\n**Jawaban: B**",
        "quick_trick_markdown": "**Cara Cepat (Periksa Jalur Penyelamat ATAU):**\n\n1. Aturan memiliki operator disjungsi *\"ATAU sensor muka air bendung > 250 cm\"*.\n2. Cek data sensor bendung: 268 cm ($> 250$ cm) $\\implies$ Jalur disjungsi langsung bernilai BENAR.\n3. Kegagalan durasi hujan (hanya 3 jam) tidak menggugurkan keputusan karena sudah diselamatkan oleh ketinggian bendung.\n4. Status Siaga pasti diterbitkan $\\implies$ Pilihan **B**.",
        "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Mengabaikan operator disjungsi inklusif; kegagalan durasi hujan tidak membatalkan penerbitan siaga karena syarat alternatif bendung terpenuhi.\n- **Pilihan C Salah:** Keliru menganggap seluruh syarat harus terpenuhi serentak (menganggap disjungsi sebagai konjungsi murni).\n- **Pilihan D Salah:** Ambang batas kritis resmi pada teks wacana adalah 250 cm, bukan 300 cm.\n- **Pilihan E Salah:** Bertentangan langsung dengan teks wacana yang secara eksplisit memuat parameter bendung sebagai kriteria penentu status siaga."
    },
    {
        "example_id": "pu-02-01-ex5",
        "variation_name": "Variasi 5: Analisis Syarat Cukup vs Syarat Perlu Insentif Pajak Kendaraan Rendah Emisi (Level: Sedang)",
        "difficulty": "medium",
        "question_type": "standard_mc",
        "context_markdown": "Kementerian Keuangan memberlakukan regulasi insentif fiskal industri otomotif:\n\n*\"Jika sebuah pabrikan otomotif memproduksi kendaraan listrik berbasis baterai murni dengan Tingkat Komponen Dalam Negeri (TKDN) minimal 40%, maka pabrikan tersebut berhak memperoleh fasilitas pembebasan PPnBM 0%.\"*\n\nBerdasarkan laporan verifikasi kementerian terkait pada kuartal ini:\n(1) PT Maju Motor tidak memperoleh fasilitas pembebasan PPnBM 0%.\n(2) PT Garda Otomotif memperoleh fasilitas pembebasan PPnBM 0%.",
        "question_markdown": "Berdasarkan kaidah penarikan kesimpulan logika implikasi, simpulan manakah yang **pasti bernilai benar**?",
        "options": [
            {
                "key": "A",
                "text_markdown": "PT Garda Otomotif pasti memproduksi kendaraan listrik baterai murni dengan TKDN minimal 40%."
            },
            {
                "key": "B",
                "text_markdown": "PT Maju Motor memproduksi kendaraan listrik baterai murni dengan TKDN tepat 40%."
            },
            {
                "key": "C",
                "text_markdown": "PT Garda Otomotif dipastikan tidak memproduksi kendaraan listrik baterai murni."
            },
            {
                "key": "D",
                "text_markdown": "PT Maju Motor pasti tidak memproduksi kendaraan listrik baterai murni dengan TKDN minimal 40%."
            },
            {
                "key": "E",
                "text_markdown": "PT Maju Motor dan PT Garda Otomotif sama-sama memenuhi syarat batas minimal TKDN 40%."
            }
        ],
        "correct_answer": "D",
        "hint_markdown": "💡 **Petunjuk Soal:** Bentuk implikasi `p → q`: `TKDN ≥ 40% → Bebas PPnBM`. Kontraposisinya: `~q → ~p` (Jika tidak bebas PPnBM, maka TKDN tidak mencapai 40%). PT Maju Motor tidak bebas PPnBM (~q), maka PT Maju Motor pasti tidak memenuhi syarat TKDN 40% (~p). Hati-hati dengan PT Garda: memperoleh bebas PPnBM (q) belum tentu karena syarat p (bisa insentif skema lain)!",
        "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Logika Implikasi:** $p \\rightarrow q$\n  - $p$: Memproduksi kendaraan listrik baterai murni dengan $\\text{TKDN} \\ge 40\\%$ (Syarat Cukup / Anteseden).\n  - $q$: Berhak memperoleh fasilitas pembebasan PPnBM $0\\%$ (Syarat Perlu / Konsekuen).\n- **Analisis PT Maju Motor (Kaidah Modus Tollens / Kontraposisi):**\n  - Diketahui fakta $\\sim q$ (tidak memperoleh fasilitas pembebasan PPnBM $0\\%$).\n  - Sesuai hukum ekuivalensi kontraposisi: $(p \\rightarrow q) \\land \\sim q \\vdash \\sim p$.\n  - Maka PT Maju Motor **pasti tidak memproduksi kendaraan listrik baterai murni dengan TKDN minimal 40%** (Pilihan D bernilai Benar mutlak).\n- **Analisis PT Garda Otomotif (Jebakan Menegaskan Konsekuen):**\n  - Fakta: $q$ (memperoleh pembebasan PPnBM $0\\%$).\n  - Menyimpulkan $p$ dari $q$ adalah sesat pikir *affirming the consequent*. Pabrikan bisa saja mendapatkan insentif melalui skema kerja sama investasi khusus lainnya. Status TKDN PT Garda berada pada taraf belum tentu.\n\n**Jawaban: D**",
        "quick_trick_markdown": "**Cara Cepat (Modus Tollens & Waspadai Affirming Consequent):**\n\n1. Aturan: Syarat $p \\rightarrow$ Akibat $q$.\n2. Fakta Maju Motor: Akibat tidak terjadi ($\\sim q$) $\\implies$ Syarat pasti tidak terpenuhi ($\\sim p$).\n3. Maka PT Maju Motor pasti tidak memenuhi TKDN $40\\%$ $\\implies$ Pilihan **D**.\n4. Coret opsi **A** dan **C** mengenai Garda Otomotif karena menegaskan konsekuen ($q \\rightarrow p$ tidak valid).",
        "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak kesalahan berpikir *affirming the consequent*; memperoleh fasilitas 0% belum tentu karena TKDN 40% (bisa karena jalur insentif investasi perintis lain).\n- **Pilihan B Salah:** Mengklaim angka TKDN tepat 40% secara spekulatif tanpa ada bukti pengujian.\n- **Pilihan C Salah:** Memvonis bahwa Garda Otomotif pasti tidak memproduksi EV baterai, yang merupakan klaim tanpa dasar premis.\n- **Pilihan E Salah:** PT Maju Motor telah terbukti secara deduktif tidak memenuhi syarat TKDN minimal 40%."
    },
    {
        "example_id": "pu-02-01-ex6",
        "variation_name": "Variasi 6: Logika Biimplikasi Diagnosis Sindrom Metabolik Klinis (Level: Sulit / HOTS)",
        "difficulty": "hard",
        "question_type": "standard_mc",
        "context_markdown": "Sebuah konsensus klinis endokrinologi menetapkan aturan diagnostik biimplikasi berikut:\n\n*\"Seorang pasien terdiagnosis menderita Sindrom Kardiometabolik Primer jika dan hanya jika pasien tersebut memiliki lingkar pinggang berlebih (pria > 90 cm atau wanita > 80 cm) SERTA memenuhi minimal satu dari dua kriteria: kadar trigliserida darah $\\ge 150$ mg/dL ATAU tekanan darah sistolik $\\ge 130$ mmHg.\"*\n\nHasil rekam medis mencatat profil dua pasien:\n- **Tuan Hendra (Pria):** Memiliki lingkar pinggang 96 cm, tekanan darah sistolik 122 mmHg, dan secara resmi divonis terdiagnosis menderita Sindrom Kardiometabolik Primer.\n- **Nyonya Ratna (Wanita):** Dinyatakan TIDAK menderita Sindrom Kardiometabolik Primer, meskipun kadar trigliserida darahnya tinggi yaitu 175 mg/dL.",
        "question_markdown": "Berdasarkan kaidah logika biimplikasi tersebut, pernyataan manakah yang **pasti bernilai benar**?",
        "options": [
            {
                "key": "A",
                "text_markdown": "Tuan Hendra pasti memiliki kadar trigliserida darah $\\ge 150$ mg/dL, dan Nyonya Ratna pasti memiliki lingkar pinggang tidak lebih dari 80 cm."
            },
            {
                "key": "B",
                "text_markdown": "Tuan Hendra dipastikan memiliki kadar trigliserida darah di bawah 150 mg/dL."
            },
            {
                "key": "C",
                "text_markdown": "Nyonya Ratna dipastikan memiliki lingkar pinggang lebih dari 80 cm."
            },
            {
                "key": "D",
                "text_markdown": "Semua pasien wanita dengan kadar trigliserida darah $\\ge 150$ mg/dL pasti menderita Sindrom Kardiometabolik Primer."
            },
            {
                "key": "E",
                "text_markdown": "Tuan Hendra dipastikan bebas dari seluruh risiko gangguan metabolisme lemak darah."
            }
        ],
        "correct_answer": "A",
        "hint_markdown": "💡 **Petunjuk Soal:** Rumus biimplikasi: `Diagnosis ↔ (Lingkar Pinggang DAN (Trigliserida ATAU Tensi))`. Pada Tuan Hendra: Diagnosis Benar, Lingkar Pinggang Benar, Tensi Salah. Agar kurung disjungsi Benar, maka Trigliserida Tuan Hendra WAJIB Benar (≥ 150). Pada Ny. Ratna: Diagnosis Salah, tapi Trigliseridanya Benar (175 ≥ 150). Agar kurung konjungsi bernilai Salah, maka Lingkar Pinggang Ny. Ratna WAJIB bernilai Salah (≤ 80 cm)!",
        "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Biimplikasi Diagnostik:** $D \\leftrightarrow (L \\land (T \\lor S))$\n  - $D$: Terdiagnosis Sindrom Kardiometabolik Primer\n  - $L$: Lingkar pinggang berlebih (Pria $> 90$ cm, Wanita $> 80$ cm)\n  - $T$: Trigliserida $\\ge 150$ mg/dL\n  - $S$: Tekanan darah sistolik $\\ge 130$ mmHg\n- **Deduksi Tuan Hendra ($D = \\text{Benar}$):**\n  - Karena $D = B$, maka sisi kanan $L \\land (T \\lor S)$ wajib bernilai **Benar**.\n  - Pria: lingkar pinggang $96$ cm $> 90$ cm $\\implies L = \\text{Benar}$.\n  - Tensi: $122 < 130$ mmHg $\\implies S = \\text{Salah}$.\n  - Agar $(T \\lor S) = (T \\lor S) = \\text{Benar}$, maka syarat trigliserida ($T$) **wajib bernilai Benar** ($T \\ge 150$ mg/dL).\n- **Deduksi Nyonya Ratna ($D = \\text{Salah}$):**\n  - Karena $D = S$, maka sisi kanan $L \\land (T \\lor S)$ wajib bernilai **Salah**.\n  - Fakta: Trigliserida $175 \\ge 150$ mg/dL $\\implies T = \\text{Benar}$.\n  - Maka blok disjungsi $(T \\lor S) = (B \\lor S) = \\text{Benar}$.\n  - Agar konjungsi $L \\land \\text{Benar}$ menghasilkan nilai **Salah**, maka syarat lingkar pinggang ($L$) **wajib bernilai Salah** ($L \\le 80$ cm).\n- **Kesimpulan:** Tuan Hendra memiliki trigliserida $\\ge 150$ mg/dL dan Nyonya Ratna memiliki lingkar pinggang $\\le 80$ cm (Pilihan A).\n\n**Jawaban: A**",
        "quick_trick_markdown": "**Cara Cepat (Deduksi Komponen Kegagalan dan Keterpenuhan Biimplikasi):**\n\n1. Tuan Hendra positif $\\implies$ Semua syarat harus terpenuhi. Tensi darahnya normal ($< 130$), jadi trigliseridanya WAJIB tinggi ($\\ge 150$).\n2. Ny. Ratna negatif $\\implies$ Syarat harus ada yang gugur. Trigliseridanya sudah tinggi ($175$), jadi yang menggugurkannya WAJIB lingkar pinggangnya yang normal ($\\le 80$ cm).\n3. Cari opsi yang memuat kedua fakta ini $\\implies$ Pilihan **A**.",
        "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Bertentangan dengan deduksi; jika trigliserida Hendra di bawah 150, maka vonis diagnosisnya seharusnya negatif.\n- **Pilihan C Salah:** Jika lingkar pinggang Ratna > 80 cm, dengan trigliserida 175 mg/dL Ratna seharusnya positif menderita sindrom metabolik.\n- **Pilihan D Salah:** Trigliserida tinggi hanya satu dari dua cabang disjungsi, pasien tetap bebas diagnosis jika lingkar pinggangnya normal.\n- **Pilihan E Salah:** Tuan Hendra justru terbukti secara deduktif memiliki trigliserida tinggi di atas ambang normal."
    },
    {
        "example_id": "pu-02-01-ex7",
        "variation_name": "Variasi 7: Penentuan Nilai Kebenaran Protokol Autentikasi Zero-Trust Multi-Faktor (Level: Sedang)",
        "difficulty": "medium",
        "question_type": "standard_mc",
        "context_markdown": "Sebuah sistem keamanan siber perusahaan menerapkan protokol autentikasi akses *Zero Trust*:\n\n*\"Permintaan akses ke basis data server utama hanya akan diberikan (bernilai Benar) jika pengguna berhasil memvalidasi kunci kriptografi perangkat terdaftar DAN memverifikasi kode OTP dinamis, ATAU pengguna melakukan verifikasi biometrik sidik jari tersertifikasi.\"*\n\nSistem mencatat empat upaya percobaan akses oleh teknisi pada jam operasional:\n- **Percobaan 1:** Kunci kriptografi perangkat gagal divalidasi, kode OTP dinamis valid, dan verifikasi biometrik tidak dilakukan.\n- **Percobaan 2:** Kunci kriptografi perangkat valid, kode OTP dinamis gagal divalidasi, dan verifikasi biometrik tidak dilakukan.\n- **Percobaan 3:** Kunci kriptografi perangkat gagal divalidasi, kode OTP dinamis gagal divalidasi, tetapi verifikasi biometrik sidik jari tersertifikasi berhasil diverifikasi.\n- **Percobaan 4:** Kunci kriptografi perangkat gagal divalidasi, kode OTP dinamis valid, dan verifikasi biometrik sidik jari gagal diverifikasi.",
        "question_markdown": "Berdasarkan kaidah logika proposisi majemuk, percobaan akses manakah yang **berhasil memperoleh izin akses ke basis data**?",
        "options": [
            {
                "key": "A",
                "text_markdown": "Percobaan 1 saja"
            },
            {
                "key": "B",
                "text_markdown": "Percobaan 2 saja"
            },
            {
                "key": "C",
                "text_markdown": "Percobaan 3 saja"
            },
            {
                "key": "D",
                "text_markdown": "Percobaan 1 dan Percobaan 4"
            },
            {
                "key": "E",
                "text_markdown": "Tidak ada percobaan yang berhasil memperoleh izin akses"
            }
        ],
        "correct_answer": "C",
        "hint_markdown": "💡 **Petunjuk Soal:** Analisis formula logika: `(Kriptografi Perangkat DAN OTP) ATAU Biometrik`. Karena dipisahkan oleh kata ATAU (disjungsi), jika verifikasi biometrik berhasil (Percobaan 3), akses langsung diberikan meskipun kunci kriptografi dan OTP gagal! Sebaliknya pada Percobaan 1 dan 2, syarat konjungsi (DAN) gagal dan biometrik tidak ada, maka akses ditolak.",
        "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Logika Akses:** $\\text{Akses} = (K \\land O) \\lor B$\n  - $K$: Kunci kriptografi valid\n  - $O$: Kode OTP dinamis valid\n  - $B$: Verifikasi biometrik valid\n- **Evaluasi Tiap Percobaan:**\n  - **Percobaan 1:** $K = S$, $O = B$, $B = S \\implies (S \\land B) \\lor S = S \\lor S = \\text{Salah}$ (Akses Ditolak).\n  - **Percobaan 2:** $K = B$, $O = S$, $B = S \\implies (B \\land S) \\lor S = S \\lor S = \\text{Salah}$ (Akses Ditolak).\n  - **Percobaan 3:** $K = S$, $O = S$, $B = B \\implies (S \\land S) \\lor B = S \\lor B = \\text{Benar}$ (Akses Diberikan!).\n  - **Percobaan 4:** $K = S$, $O = B$, $B = S \\implies (S \\land B) \\lor S = S \\lor S = \\text{Salah}$ (Akses Ditolak).\n- **Kesimpulan:** Hanya Percobaan 3 yang berhasil memperoleh izin akses.\n\n**Jawaban: C**",
        "quick_trick_markdown": "**Cara Cepat (Cek Jalur Disjungsi Independen):**\n\n1. Perhatikan kata *\"ATAU verifikasi biometrik\"*.\n2. Biometrik yang berhasil langsung meloloskan pengguna tanpa memedulikan kegagalan kunci kriptografi dan OTP.\n3. Periksa percobaan yang biometriknya valid: hanya Percobaan 3.\n4. Percobaan 1, 2, dan 4 gagal di konjungsi DAN tidak memiliki biometrik yang valid.\n5. Jawaban tepat adalah pilihan **C**.",
        "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Percobaan 1 gagal memenuhi konjungsi (kriptografi gagal) dan tidak menjalankan biometrik.\n- **Pilihan B Salah:** Percobaan 2 gagal memenuhi konjungsi (OTP gagal) dan tidak menjalankan biometrik.\n- **Pilihan D Salah:** Baik Percobaan 1 maupun Percobaan 4 sama-sama menghasilkan nilai logika Salah.\n- **Pilihan E Salah:** Percobaan 3 secara sah menghasilkan nilai logika Benar berkat keberhasilan verifikasi biometrik."
    },
    {
        "example_id": "pu-02-01-ex8",
        "variation_name": "Variasi 8: Evaluasi Konsistensi Proposisi Majemuk Pewarisan Tanah Ulayat Adat (Level: Mudah)",
        "difficulty": "easy",
        "question_type": "standard_mc",
        "context_markdown": "Dewan Adat Negeri menetapkan kaidah adat mengenai hak pengelolaan tanah ulayat marga:\n\n*\"Seorang warga adat berhak memperoleh hak garap tanah ulayat jika bergaris keturunan matrilineal sah DENGAN ketentuan: menetap di wilayah desa adat DAN ikut serta dalam upacara musyawarah adat tahunan, KECUALI warga tersebut telah memperoleh izin khusus dari ketua adat.\"*\n\n(Catatan: frasa *\"kecuali...\"* berkedudukan ekuivalen secara logika dengan operator disjungsi *\"ATAU telah memperoleh izin khusus dari ketua adat\"*).\n\nBerikut profil tiga warga adat:\n- **Umar:** Bergaris keturunan matrilineal sah, menetap di perantauan luar pulau (tidak menetap di desa), tidak ikut musyawarah adat, dan tidak mengantongi izin khusus ketua adat.\n- **Hamid:** Bukan garis keturunan matrilineal marga, tetapi menetap di desa adat dan memiliki izin khusus ketua adat.\n- **Zainab:** Bergaris keturunan matrilineal sah, menetap di desa adat, rutin hadir upacara musyawarah adat tahunan, dan tidak memiliki izin khusus ketua adat.",
        "question_markdown": "Berdasarkan kaidah aturan logika adat tersebut, siapakah warga yang **pasti berhak** memperoleh hak garap tanah ulayat?",
        "options": [
            {
                "key": "A",
                "text_markdown": "Umar saja"
            },
            {
                "key": "B",
                "text_markdown": "Hamid saja"
            },
            {
                "key": "C",
                "text_markdown": "Umar dan Zainab"
            },
            {
                "key": "D",
                "text_markdown": "Zainab dan Hamid"
            },
            {
                "key": "E",
                "text_markdown": "Zainab saja"
            }
        ],
        "correct_answer": "E",
        "hint_markdown": "💡 **Petunjuk Soal:** Cermati struktur syarat: Syarat mutlak utama adalah garis matrilineal sah ($M$), yang digabung dengan syarat `(Menetap DAN Musyawarah) ATAU Izin Ketua Adat`. Hamid otomatis gugur karena bukan garis matrilineal ($M$ = Salah). Umar gugur karena merantau, absen musyawarah, dan tanpa izin. Hanya Zainab yang memenuhi garis matrilineal serta menetap dan ikut musyawarah!",
        "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Logika Aturan Adat:** $\\text{Hak Garap} = M \\land ((D \\land U) \\lor I)$\n  - $M$: Garis keturunan matrilineal sah\n  - $D$: Menetap di wilayah desa adat\n  - $U$: Ikut upacara musyawarah adat tahunan\n  - $I$: Memperoleh izin khusus ketua adat\n- **Evaluasi Tiap Profil Warga:**\n  - **Umar:** $M = B$, $D = S$, $U = S$, $I = S \\implies B \\land ((S \\land S) \\lor S) = B \\land (S \\lor S) = B \\land S = \\text{Salah}$ (Tidak Berhak).\n  - **Hamid:** $M = S$, $D = B$, $I = B \\implies S \\land ((B \\land U) \\lor B) = S \\land B = \\text{Salah}$ (Tidak Berhak karena syarat utama $M$ mutlak wajib Benar).\n  - **Zainab:** $M = B$, $D = B$, $U = B$, $I = S \\implies B \\land ((B \\land B) \\lor S) = B \\land (B \\lor S) = B \\land B = \\text{Benar}$ (Pasti Berhak!).\n- **Kesimpulan:** Hanya Zainab yang berhak memperoleh hak garap tanah ulayat.\n\n**Jawaban: E**",
        "quick_trick_markdown": "**Cara Cepat (Eliminasi Syarat Mutlak Utama):**\n\n1. Syarat utama di luar kurung adalah garis matrilineal ($M$). Siapa yang bukan matrilineal langsung coret!\n2. Hamid bukan garis matrilineal $\\implies$ Hamid langsung gugur.\n3. Umar di perantauan dan tanpa izin adat $\\implies$ Umar gugur.\n4. Zainab matrilineal sah, tinggal di desa, dan ikut musyawarah $\\implies$ Zainab lolos murni.\n5. Yang berhak hanyalah Zainab saja $\\implies$ Pilihan **E**.",
        "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Umar gagal karena tidak menetap di desa, absen musyawarah, dan tidak memiliki izin khusus ketua adat.\n- **Pilihan B Salah:** Hamid gagal karena bukan berasal dari garis keturunan matrilineal yang merupakan syarat mutlak utama aturan adat.\n- **Pilihan C Salah:** Umar tidak memenuhi syarat hak garap tanah ulayat.\n- **Pilihan D Salah:** Hamid tidak memenuhi syarat garis keturunan matrilineal."
    }
  ]
};
