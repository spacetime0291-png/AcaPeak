import type { Material } from '../../../types/material';

export const MATERIAL_PU_02_02: Material = {
  "metadata": {
    "id": "pu-2-2",
    "subtest": "PU",
    "chapter_num": 2,
    "chapter_title": "Penalaran Deduktif",
    "subchapter_num": "2.2",
    "subchapter_title": "Ekuivalensi dan Negasi Pernyataan",
    "title": "Ekuivalensi dan Negasi Pernyataan",
    "required_question_variations": [
      "Ekuivalensi Pernyataan Bersyarat (Kontraposisi & Bentuk Disjungsi)",
      "Negasi Proposisi Majemuk Bersyarat (Hukum De Morgan)",
      "Evaluasi Ekuivalensi Klausul Kompleks / Kebijakan Publik (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-09"
  },
  "content": {
    "tactical_overview": "Ekuivalensi dan negasi pernyataan menguji kemampuan Anda dalam mengidentifikasi bentuk kalimat yang memiliki nilai kebenaran identik (ekuivalen) atau kebalikan mutlak (negasi/ingkaran) tanpa terjebak pada perubahan susunan kata. Di UTBK SNBT, kunci emas ekuivalensi implikasi p → q adalah kontraposisinya (~q → ~p) dan bentuk disjungsinya (~p ∨ q). Sementara itu, jebakan terbesar pada materi ini adalah mengira negasi dari \"Jika p maka q\" adalah \"Jika tidak p maka tidak q\", padahal ingkaran yang sah secara logika adalah \"p DAN tidak q\" (p ∧ ~q).",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nDi dalam penalaran deduktif UTBK SNBT, Anda akan sering diminta mencari pernyataan yang *setara secara makna logika* (**ekuivalen**, disimbolkan $\\equiv$) atau pernyataan yang merupakan *ingkaran mutlak* (**negasi**, disimbolkan $\\sim$) dari suatu pernyataan premis. Menguasai materi ini akan menghindarkan Anda dari jebakan manipulasi kata-kata pada opsi pilihan ganda.\n\nTiga pilar rumus logika ekuivalensi dan negasi yang wajib Anda hafal di luar kepala meliputi:\n\n1. **Dua Bentuk Ekuivalensi Emas Implikasi ($p \\rightarrow q$)**  \n   Pernyataan bersyarat *\"Jika $p$ maka $q$\"* memiliki dua bentuk kalimat lain yang nilai kebenarannya persis sama:\n   - **Bentuk Kontraposisi:** $p \\rightarrow q \\equiv \\sim q \\rightarrow \\sim p$  \n     *(Balik posisi pernyataan, lalu negasikan kedua ruasnya: \"Jika tidak $q$, maka tidak $p$\")*.\n   - **Bentuk Disjungsi:** $p \\rightarrow q \\equiv \\sim p \\lor q$  \n     *(Negasikan bagian sebab, ganti kata \"jika... maka...\" menjadi \"atau\", biarkan bagian akibat tetap: \"Tidak $p$ ATAU $q$\")*. Bentuk ini sangat sering muncul sebagai kunci jawaban tak terduga saat seluruh opsi jawaban tidak menggunakan kata *\"jika\"*.\n   - **Catatan Kritis:** **Konvers** ($q \\rightarrow p$) dan **Invers** ($\\sim p \\rightarrow \\sim q$) **TIDAK PERNAH EKUIVALEN** dengan pernyataan asal $p \\rightarrow q$.\n\n2. **Hukum De Morgan (Negasi Konjungsi dan Disjungsi)**  \n   Untuk mengingkari kalimat majemuk yang memuat kata *\"dan\"* atau *\"atau\"*, gunakan aturan De Morgan:\n   - Ingkaran Konjungsi: $\\sim (p \\land q) \\equiv \\sim p \\lor \\sim q$  \n     *(Ingkaran dari \"$p$ dan $q$\" adalah \"tidak $p$ ATAU tidak $q$\")*.\n   - Ingkaran Disjungsi: $\\sim (p \\lor q) \\equiv \\sim p \\land \\sim q$  \n     *(Ingkaran dari \"$p$ atau $q$\" adalah \"tidak $p$ DAN tidak $q$\")*.\n\n3. **Negasi Pernyataan Bersyarat / Implikasi ($sim (p \\rightarrow q)$)**  \n   Banyak siswa terjebak mengira negasi dari *\"Jika $p$ maka $q$\"* adalah *\"Jika tidak $p$ maka tidak $q$\"*. Padahal secara hukum logika matematika:\n   $\\sim (p \\rightarrow q) \\equiv p \\land \\sim q$\n   - **Penjelasan Rasional:** Kalimat janji *\"Jika kamu juara kelas ($p$), maka Ayah belikan sepeda ($q$)\"* hanya terbukti **berbohong / diingkari** jika faktanya: *Kamu terbukti juara kelas ($p$), TETAPI Ayah tidak membelikan sepeda ($\\sim q$)*. Negasi dari kalimat bersyarat tidak lagi diawali kata *\"Jika\"*, melainkan berupa kalimat fakta konjungsi: *\"p DAN tidak q\"*.\n\n4. **Negasi Pernyataan Berkuantor**  \n   - Ingkaran dari kuantor universal (*\"Semua / Setiap $A$ adalah $B$\"*) adalah kuantor eksistensial: *\"Ada / Beberapa / Sebagian $A$ yang bukan $B$\"*.\n   - Ingkaran dari kuantor eksistensial (*\"Ada / Beberapa $A$ yang $B$\"*) adalah kuantor universal ingkaran: *\"Semua $A$ bukan $B$\"*.\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\nPembuat naskah soal UTBK merancang opsi pengecoh dengan memanfaatkan asumsi bahasa sehari-hari yang salah secara logika:\n1. **Jebakan Negasi Implikasi Semu (*Invers Trap*)**  \n   Saat diminta mencari ingkaran dari kalimat *\"Jika P maka Q\"*, pembuat soal memasang opsi pengecoh *\"Jika tidak P maka tidak Q\"*. Opsi ini salah besar karena itu adalah invers, bukan negasi. Negasi implikasi wajib berformat *\"P tetapi tidak Q\"* ($p \\land \\sim q$).\n2. **Jebakan Mengabaikan Pertukaran Operator pada De Morgan**  \n   Pada soal negasi kalimat majemuk, opsi pengecoh hanya menegasikan kata-katanya tanpa mengubah operator penghubungnya (misalnya kata *\"dan\"* tetap dibiarkan *\"dan\"*). Ingat: dalam Hukum De Morgan, kata *\"dan\"* wajib berubah menjadi *\"atau\"*, dan sebaliknya.\n3. **Jebakan Konvers yang Terdengar Meyakinkan**  \n   Pilihan jawaban membalik kalimat secara langsung dari *\"Jika A maka B\"* menjadi *\"Jika B maka A\"*. Siswa yang kurang teliti sering menganggap kedua kalimat ini bermakna sama, padahal membalik urutan syarat tanpa memberikan negasi adalah kekeliruan konvers yang fatal.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\nBerikut adalah algoritma taktis untuk menyelesaikan soal ekuivalensi dan negasi di lembar ujian UTBK:\n1. **Untuk Soal \"Pernyataan yang Ekuivalen dengan: Jika P maka Q\"**  \n   - Periksa opsi yang diawali kata *\"Jika\"*: cari yang berformat **\"Jika tidak Q, maka tidak P\"** (Kontraposisi).\n   - Jika tidak ada opsi kalimat jika, langsung cari opsi yang berformat **\"Tidak P atau Q\"** (Disjungsi Implikasi).\n2. **Untuk Soal \"Negasi / Ingkaran dari: Jika P maka Q\"**  \n   - Langsung **coret semua opsi jawaban yang masih diawali kata \"Jika\"**!\n   - Pilih satu-satunya opsi yang menyatakan: **\"[Kondisi P tetap terjadi], TETAPI [Kondisi Q tidak terjadi]\"**.\n3. **Untuk Negasi Majemuk (Hukum De Morgan)**  \n   - Tukar kata hubung: ubah *\"dan\"* menjadi *\"atau\"*, ubah *\"atau\"* menjadi *\"dan\"*.\n   - Balikkan status kebenaran kedua komponen kalimat di sisi kiri dan kanannya.\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Ekuivalensi:** Dua pernyataan dikatakan ekuivalen jika menghasilkan nilai kebenaran yang persis sama pada setiap kemungkinan kondisi premisnya.\n- **Dua Rumus Ekuivalensi $p \\rightarrow q$:**  \n  1. Kontraposisi: $\\sim q \\rightarrow \\sim p$  \n  2. Bentuk Disjungsi: $\\sim p \\lor q$\n- **Hakikat Negasi:** Negasi adalah pernyataan yang selalu bernilai kebalikan mutlak dari pernyataan semula.\n- **Dua Rumus Negasi Kunci:**  \n  1. Negasi Implikasi: $\\sim (p \\rightarrow q) \\equiv p \\land \\sim q$  \n  2. Negasi Konjungsi/Disjungsi: $\\sim (p \\land q) \\equiv \\sim p \\lor \\sim q$ dan $\\sim (p \\lor q) \\equiv \\sim p \\land \\sim q$\n- **Strategi Eksekusi:** Untuk ekuivalensi, ingat trik \"balik dan negasikan\". Untuk negasi implikasi, singkirkan opsi bersyarat dan pilih format \"tetap sebab, ingkar akibat\".\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Ekuivalensi dan Negasi yang paling sering keluar pada naskah UTBK SNBT, lengkap dengan stimulus soal, opsi pilihan ganda utuh, kunci jawaban, dan pembahasan logika terperinci:\n\n### Variasi 1: Ekuivalensi Pernyataan Bersyarat (Kontraposisi & Bentuk Disjungsi)\n\n> **Konteks Wacana Soal:**  \n> Perhatikan regulasi penerbangan komersial internasional berikut ini:  \n> *\"Jika sebuah maskapai mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, maka pihak maskapai wajib memberikan kompensasi ganti rugi penuh berupa fasilitas akomodasi dan pengembalian biaya tiket kepada seluruh penumpang.\"*  \n>  \n> **Pertanyaan UTBK:** *Pernyataan berikut yang memiliki nilai kebenaran ekuivalen (setara secara logika) dengan regulasi penerbangan tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Jika pihak maskapai memberikan kompensasi ganti rugi penuh kepada seluruh penumpang, maka maskapai tersebut mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis.  \n> - **B.** Jika pihak maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, maka pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang.  \n> - **C.** Pihak maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, atau pihak maskapai wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang.  \n> - **D.** Pihak maskapai mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis dan pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang.  \n> - **E.** Pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh jika dan hanya jika maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam.\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Struktur Logika:** Regulasi dinyatakan dalam bentuk implikasi bersyarat $p \\rightarrow q$, di mana:  \n  - $p$ = Maskapai mengalami keterlambatan terbang lebih dari empat jam karena kelalaian teknis.  \n  - $q$ = Pihak maskapai wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang.\n- **Mencari Bentuk Ekuivalensi:** Dalam kaidah logika proposisi matematika, implikasi $p \\rightarrow q$ memiliki dua bentuk ekuivalen yang sah:  \n  1. Kontraposisi: $\\sim q \\rightarrow \\sim p$ (*\"Jika maskapai tidak wajib memberikan kompensasi, maka maskapai tidak mengalami keterlambatan...\"*) — bentuk ini tidak tersedia pada pilihan ganda.  \n  2. Bentuk Disjungsi: $\\sim p \\lor q$ (*\"Maskapai tidak mengalami keterlambatan lebih dari empat jam karena kelalaian teknis, ATAU pihak maskapai wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang\"*).  \n  Bentuk kedua ini secara presisi tertera pada pilihan **C**.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Merupakan bentuk **konvers** ($q \\rightarrow p$), yaitu sekadar membalik kalimat tanpa menyangkal, sehingga tidak ekuivalen.  \n  - **Pilihan B Salah:** Merupakan bentuk **invers** ($\\sim p \\rightarrow \\sim q$), yaitu menyangkal tanpa membalik posisi, sehingga tidak ekuivalen.  \n  - **Pilihan D Salah:** Merupakan bentuk **negasi** ($p \\land \\sim q$), yang justru memiliki nilai kebenaran berkebalikan dari premis awal.  \n  - **Pilihan E Salah:** Mengubah implikasi satu arah menjadi relasi biimplikasi dua arah tanpa dasar premis yang sah.\n- **Penerapan Trik Cepat (15 Detik):** Ingat rumus ekuivalensi disjungsi: $p \\rightarrow q \\equiv \\sim p \\lor q$. Cari opsi yang memuat kata *\"tidak P atau Q\"*. Pilihan C langsung menyajikan struktur: *[Tidak mengalami keterlambatan...] ATAU [Wajib memberikan kompensasi...]*. Jawaban yang tepat adalah pilihan **C**.\n\n---\n\n### Variasi 2: Negasi Proposisi Majemuk Bersyarat (Hukum De Morgan)\n\n> **Konteks Wacana Soal:**  \n> Seorang Kepala Dinas Ketahanan Pangan menyampaikan pernyataan resmi terkait stabilitas pasar sembako menjelang hari raya:  \n> *\"Jika pasokan beras lokal mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah beroperasi lancar tanpa hambatan, maka harga beras di pasar tradisional tidak akan mengalami kenaikan drastis.\"*  \n>  \n> **Pertanyaan UTBK:** *Negasi (ingkaran) yang paling tepat secara kaidah logika formal dari pernyataan Kepala Dinas tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Jika pasokan beras lokal tidak mencukupi kebutuhan masyarakat atau jalur distribusi antardaerah terhambat, maka harga beras di pasar tradisional akan mengalami kenaikan drastis.  \n> - **B.** Pasokan beras lokal mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah beroperasi lancar, tetapi harga beras di pasar tradisional tetap mengalami kenaikan drastis.  \n> - **C.** Pasokan beras lokal tidak mencukupi kebutuhan masyarakat atau jalur distribusi antardaerah terhambat, dan harga beras di pasar tradisional tidak mengalami kenaikan drastis.  \n> - **D.** Jika harga beras di pasar tradisional mengalami kenaikan drastis, maka pasokan beras lokal tidak mencukupi atau distribusi antardaerah terhambat.  \n> - **E.** Pasokan beras lokal tidak mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah terhambat, serta harga beras di pasar tradisional naik drastis.\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Struktur Logika:** Pernyataan Kepala Dinas berbentuk implikasi majemuk:  \n  $(P \\land Q) \\rightarrow R$  \n  di mana:  \n  - $P$ = Pasokan beras lokal mencukupi kebutuhan masyarakat  \n  - $Q$ = Jalur distribusi antardaerah beroperasi lancar tanpa hambatan  \n  - $R$ = Harga beras di pasar tradisional tidak mengalami kenaikan drastis (sehingga $\\sim R$ = harga beras *mengalami kenaikan drastis*).\n- **Penentuan Rumus Negasi Implikasi:**  \n  Rumus baku ingkaran kalimat bersyarat adalah: $\\sim (A \\rightarrow B) \\equiv A \\land \\sim B$.  \n  Dengan menggantikan $A = (P \\land Q)$ dan $B = R$, kita peroleh:  \n  $\\sim ((P \\land Q) \\rightarrow R) \\equiv (P \\land Q) \\land \\sim R$  \n  Artinya: Bagian syarat sebelum kata *\"maka\"* tetap berlaku sepenuhnya (*pasokan beras mencukupi DAN distribusi lancar*), TETAPI bagian akibatnya diingkari (*harga beras di pasar tradisional tetap mengalami kenaikan drastis*).\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Terjebak pada kesalahan umum membuat kalimat invers bersyarat baru yang masih diawali kata *\"Jika\"*.  \n  - **Pilihan C Salah:** Menegaskan anteseden secara terbalik tanpa mempertahankan kondisi syarat $P \\land Q$.  \n  - **Pilihan D Salah:** Merupakan bentuk kontraposisi yang ekuivalen, bukan negasi.  \n  - **Pilihan E Salah:** Mengingkari semua komponen kalimat secara sembarangan tanpa mengikuti kaidah logika negasi implikasi.\n- **Penerapan Trik Cepat (15 Detik):** Gunakan trik eliminasi negasi implikasi:  \n  1. Segera coret semua opsi yang masih menggunakan kata *\"Jika\"* (Pilihan A dan D langsung gugur!).  \n  2. Ingat format ingkaran janji: *\"Syarat terpenuhi, tapi akibat ingkar\"*. Cari opsi yang menyatakan pasokan cukup dan distribusi lancar, namun harga beras tetap naik drastis. Pilihan yang tepat adalah pilihan **B**.\n\n---\n\n### Variasi 3: Evaluasi Ekuivalensi Klausul Kompleks / Kebijakan Publik (HOTS)\n\n> **Konteks Wacana Soal:**  \n> Dewan Pengawas Lingkungan Hidup menetapkan pakta kepatuhan industri manufaktur berat sebagai berikut:  \n> *\"Jika suatu pabrik industri membuang limbah cair beracun tanpa instalasi pengolahan standar atau melepaskan emisi gas cerobong melebihi ambang batas toleransi, maka izin operasional pabrik tersebut akan dicabut dan pimpinan perusahaan akan diproses secara hukum.\"*  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan kaidah logika ekuivalensi (kontraposisi dan Hukum De Morgan), manakah pernyataan di bawah ini yang paling tepat dan bermakna setara (ekuivalen) dengan pakta kepatuhan tersebut?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Jika izin operasional pabrik industri tidak dicabut atau pimpinan perusahaan tidak diproses secara hukum, maka pabrik tersebut tidak membuang limbah cair beracun tanpa instalasi standar dan tidak melepaskan emisi gas cerobong melebihi ambang batas toleransi.  \n> - **B.** Jika izin operasional pabrik industri tidak dicabut dan pimpinan perusahaan tidak diproses secara hukum, maka pabrik tersebut boleh melepaskan emisi gas cerobong melebihi ambang batas toleransi.  \n> - **C.** Jika suatu pabrik industri mengolah limbah cair beracun sesuai standar dan emisi gas di bawah batas toleransi, maka izin operasional pabrik tidak dicabut dan pimpinan perusahaan tidak diproses hukum.  \n> - **D.** Izin operasional suatu pabrik industri akan dicabut jika dan hanya jika pabrik tersebut membuang limbah cair beracun tanpa instalasi pengolahan standar.  \n> - **E.** Jika pimpinan perusahaan diproses secara hukum, maka pabrik industri tersebut pasti telah membuang limbah cair beracun tanpa instalasi pengolahan standar.\n\n**Kunci Jawaban: A**\n\n**Bedah Logika & Pembahasan:**\n- **Formulasi Simbolik Premis Asli:**  \n  $(L \\lor E) \\rightarrow (C \\land P)$  \n  di mana:  \n  - $L$ = Membuang limbah cair beracun tanpa instalasi standar  \n  - $E$ = Melepaskan emisi gas melebihi ambang batas  \n  - $C$ = Izin operasional dicabut  \n  - $P$ = Pimpinan perusahaan diproses secara hukum\n- **Penerapan Kontraposisi Ganda dengan Hukum De Morgan:**  \n  Sesuai kaidah kontraposisi:  \n  $(L \\lor E) \\rightarrow (C \\land P) \\equiv \\sim (C \\land P) \\rightarrow \\sim (L \\lor E)$  \n  Sekarang terapkan **Hukum De Morgan** pada kedua ruas:  \n  - Ruas kiri: $\\sim (C \\land P) \\equiv \\sim C \\lor \\sim P$ *(Izin operasional TIDAK dicabut ATAU pimpinan TIDAK diproses hukum)*.  \n  - Ruas kanan: $\\sim (L \\lor E) \\equiv \\sim L \\land \\sim E$ *(TIDAK membuang limbah beracun DAN TIDAK melepaskan emisi gas berlebih)*.  \n  Menggabungkan kedua hasil De Morgan menghasilkan kalimat kontraposisi utuh:  \n  $(\\sim C \\lor \\sim P) \\rightarrow (\\sim L \\land \\sim E)$  \n  Kalimat ini secara sempurna dan presisi diungkapkan oleh pilihan **A**.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan B Salah:** Menggunakan kata *\"dan\"* pada penyangkalan konsekuen (melanggar De Morgan) dan membolehkan pelepasan emisi berlebih.  \n  - **Pilihan C Salah:** Merupakan bentuk **invers** $\\sim(L \\lor E) \\rightarrow \\sim(C \\land P)$, yang tidak ekuivalen dengan premis awal.  \n  - **Pilihan D Salah:** Mengubah kalimat menjadi biimplikasi sepihak dan membuang komponen emisi gas secara keliru.  \n  - **Pilihan E Salah:** Mengalami sesat pikir menegaskan konsekuen (*affirming the consequent*), menyimpulkan sebab tunggal dari salah satu bagian akibat.\n- **Penerapan Trik Cepat (15 Detik):**  \n  1. Kontraposisi menuntut pembalikan posisi: akibat majemuk *(dicabut DAN diproses)* pindah ke depan dengan disangkal menggunakan De Morgan $\\rightarrow$ menjadi *(TIDAK dicabut ATAU TIDAK diproses)*.  \n  2. Sebab majemuk *(limbah ATAU emisi)* pindah ke belakang dengan disangkal menggunakan De Morgan $\\rightarrow$ menjadi *(TIDAK buang limbah DAN TIDAK buang emisi)*.  \n  3. Cocokkan dengan pilihan ganda: hanya pilihan **A** yang menerapkan pergantian operator De Morgan bolak-balik secara tepat. Jawaban yang benar adalah pilihan **A**.",
    "visualizations_svg": [],
    "distractor_traps": [
      "Jebakan Invers Semu: Mengira negasi dari \"Jika p maka q\" adalah \"Jika ~p maka ~q\", padahal negasi implikasi berbentuk konjungsi (p ∧ ~q).",
      "Jebakan Konvers: Menganggap \"Jika q maka p\" setara dengan kalimat asli \"Jika p maka q\", padahal hanya kontraposisi (~q -> ~p) yang ekuivalen.",
      "Kekeliruan De Morgan: Lupa menukar operator logika saat menegasikan kalimat majemuk (menegasikan \"dan\" tetap menjadi \"dan\", padahal wajib berubah menjadi \"atau\")."
    ],
    "quick_execution_algorithm": [
      "Untuk mencari ekuivalensi p -> q: cari kontraposisinya (~q -> ~p) atau bentuk disjungsinya (~p ∨ q).",
      "Untuk mencari negasi p -> q: segera eliminasi opsi yang masih memakai kata \"jika\", dan cari opsi berformat \"p DAN ~q\".",
      "Saat menegasikan kalimat majemuk: terapkan De Morgan dengan menukar \"dan\" menjadi \"atau\" (atau sebaliknya) lalu negasikan kedua unsurnya.",
      "Pada kuantor universal (\"semua/setiap\"): negasikan dengan kuantor eksistensial (\"ada/beberapa/sebagian yang tidak\")."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-02-02-ex1",
      "variation_name": "Variasi 1: Ekuivalensi Pernyataan Bersyarat (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan regulasi penerbangan komersial internasional berikut ini:\n\n*\"Jika sebuah maskapai mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, maka pihak maskapai wajib memberikan kompensasi ganti rugi penuh berupa fasilitas akomodasi dan pengembalian biaya tiket kepada seluruh penumpang.\"*",
      "question_markdown": "Pernyataan berikut yang memiliki nilai kebenaran **ekuivalen (setara secara logika)** dengan regulasi penerbangan tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika pihak maskapai memberikan kompensasi ganti rugi penuh kepada seluruh penumpang, maka maskapai tersebut mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis."
        },
        {
          "key": "B",
          "text_markdown": "Jika pihak maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, maka pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang."
        },
        {
          "key": "C",
          "text_markdown": "Pihak maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis, atau pihak maskapai wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang."
        },
        {
          "key": "D",
          "text_markdown": "Pihak maskapai mengalami keterlambatan jadwal terbang lebih dari empat jam karena kelalaian teknis dan pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh kepada seluruh penumpang."
        },
        {
          "key": "E",
          "text_markdown": "Pihak maskapai tidak wajib memberikan kompensasi ganti rugi penuh jika dan hanya jika maskapai tidak mengalami keterlambatan jadwal terbang lebih dari empat jam."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat dua rumus ekuivalensi implikasi `p → q`: kontraposisi `~q → ~p` dan bentuk disjungsi `~p ∨ q` (\"Tidak p ATAU q\"). Periksa opsi C yang menggunakan bentuk disjungsi!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Premis Asli:** $p \\rightarrow q$\n  - $p$: Maskapai mengalami keterlambatan terbang $> 4$ jam karena kelalaian teknis.\n  - $q$: Maskapai wajib memberikan kompensasi ganti rugi penuh.\n- **Dua Bentuk Ekuivalensi yang Sah:**\n  1. Kontraposisi: $\\sim q \\rightarrow \\sim p$\n  2. Bentuk Disjungsi Implikasi: $\\sim p \\lor q$\n- **Analisis Pilihan C:** Menggunakan bentuk disjungsi $\\sim p \\lor q$, yaitu: *\"Maskapai tidak mengalami keterlambatan... ATAU pihak maskapai wajib memberikan kompensasi...\"*. Sesuai tabel kebenaran logika matematika, nilai kebenaran $\\sim p \\lor q$ identik penuh dengan $p \\rightarrow q$.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Ekuivalensi Disjungsi ~p ∨ q):**\n\n1. Jika opsi tidak memuat kontraposisi *\"Jika tidak Q maka tidak P\"*, segera cari bentuk disjungsi *\"Tidak P atau Q\"*.\n2. Negasikan kalimat sebab: *\"Maskapai tidak terlambat...\"* lalu sambungkan kata *\"atau\"* dengan kalimat akibat: *\"atau wajib memberi kompensasi\"*.\n3. Kalimat tersebut ada tepat pada pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk konvers ($q \\rightarrow p$), yaitu sekadar membalik kalimat tanpa negasi.\n- **Pilihan B Salah:** Merupakan bentuk invers ($\\sim p \\rightarrow \\sim q$), yaitu menegasikan tanpa membalik posisi.\n- **Pilihan D Salah:** Merupakan bentuk negasi ($p \\land \\sim q$), yang bernilai kebalikan dari premis awal.\n- **Pilihan E Salah:** Mengubah implikasi satu arah menjadi biimplikasi dua arah tanpa dasar yang sah."
    },
    {
      "example_id": "pu-02-02-ex2",
      "variation_name": "Variasi 2: Negasi Proposisi Majemuk Bersyarat (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Seorang Kepala Dinas Ketahanan Pangan menyampaikan pernyataan resmi terkait stabilitas pasar sembako menjelang hari raya:\n\n*\"Jika pasokan beras lokal mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah beroperasi lancar tanpa hambatan, maka harga beras di pasar tradisional tidak akan mengalami kenaikan drastis.\"*",
      "question_markdown": "Negasi (ingkaran) yang **paling tepat secara kaidah logika formal** dari pernyataan Kepala Dinas tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika pasokan beras lokal tidak mencukupi kebutuhan masyarakat atau jalur distribusi antardaerah terhambat, maka harga beras di pasar tradisional akan mengalami kenaikan drastis."
        },
        {
          "key": "B",
          "text_markdown": "Pasokan beras lokal mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah beroperasi lancar, tetapi harga beras di pasar tradisional tetap mengalami kenaikan drastis."
        },
        {
          "key": "C",
          "text_markdown": "Pasokan beras lokal tidak mencukupi kebutuhan masyarakat atau jalur distribusi antardaerah terhambat, dan harga beras di pasar tradisional tidak mengalami kenaikan drastis."
        },
        {
          "key": "D",
          "text_markdown": "Jika harga beras di pasar tradisional mengalami kenaikan drastis, maka pasokan beras lokal tidak mencukupi atau distribusi antardaerah terhambat."
        },
        {
          "key": "E",
          "text_markdown": "Pasokan beras lokal tidak mencukupi kebutuhan masyarakat dan jalur distribusi antardaerah terhambat, serta harga beras di pasar tradisional naik drastis."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Rumus negasi implikasi: `~(A → B) ≡ A ∧ ~B`. Coret semua opsi yang masih diawali kata \"Jika\"! Cari opsi yang mempertahankan syarat (pasokan cukup DAN distribusi lancar), TETAPI akibatnya diingkari (harga beras tetap naik).",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Simbolik Kalimat:** $(P \\land Q) \\rightarrow R$\n  - $P$: Pasokan beras lokal mencukupi\n  - $Q$: Jalur distribusi antardaerah beroperasi lancar\n  - $R$: Harga beras tidak mengalami kenaikan drastis (sehingga $\\sim R$: harga beras *mengalami kenaikan drastis*)\n- **Rumus Negasi Implikasi:**\n  $\\sim ((P \\land Q) \\rightarrow R) \\equiv (P \\land Q) \\land \\sim R$\n- **Penerjemahan Bahasa:**\n  - $(P \\land Q)$: Pasokan beras lokal mencukupi dan jalur distribusi lancar.\n  - $\\land \\sim R$: TETAPI / DAN harga beras di pasar tradisional tetap mengalami kenaikan drastis.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Eliminasi Opsi \"Jika\"):**\n\n1. Negasi dari kalimat implikasi *\"Jika... maka...\"* TIDAK PERNAH berbentuk kalimat bersyarat *\"Jika\"*. Coret langsung pilihan **A** dan **D**!\n2. Cari formula *\"Syarat tetap berlaku, tapi janji diingkari\"*. Pilihan **B** mempertahankan pasokan cukup dan distribusi lancar, namun harga beras tetap naik drastis.\n3. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak membuat kalimat invers baru yang masih berbentuk bersyarat \"Jika\".\n- **Pilihan C Salah:** Mengingkari anteseden secara keliru dan tidak mempertahankan syarat $P \\land Q$.\n- **Pilihan D Salah:** Merupakan bentuk kontraposisi yang ekuivalen, bukan ingkaran/negasi.\n- **Pilihan E Salah:** Mengingkari semua komponen kalimat secara membabi buta tanpa mengikuti kaidah logika implikasi."
    },
    {
      "example_id": "pu-02-02-ex3",
      "variation_name": "Variasi 3: Evaluasi Ekuivalensi Klausul Kompleks (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dewan Pengawas Lingkungan Hidup menetapkan pakta kepatuhan industri manufaktur berat sebagai berikut:\n\n*\"Jika suatu pabrik industri membuang limbah cair beracun tanpa instalasi pengolahan standar atau melepaskan emisi gas cerobong melebihi ambang batas toleransi, maka izin operasional pabrik tersebut akan dicabut dan pimpinan perusahaan akan diproses secara hukum.\"*",
      "question_markdown": "Berdasarkan kaidah logika ekuivalensi (kontraposisi dan Hukum De Morgan), manakah pernyataan di bawah ini yang **pasti bermakna setara (ekuivalen)** dengan pakta kepatuhan tersebut?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika izin operasional pabrik industri tidak dicabut atau pimpinan perusahaan tidak diproses secara hukum, maka pabrik tersebut tidak membuang limbah cair beracun tanpa instalasi standar dan tidak melepaskan emisi gas cerobong melebihi ambang batas toleransi."
        },
        {
          "key": "B",
          "text_markdown": "Jika izin operasional pabrik industri tidak dicabut dan pimpinan perusahaan tidak diproses secara hukum, maka pabrik tersebut boleh melepaskan emisi gas cerobong melebihi ambang batas toleransi."
        },
        {
          "key": "C",
          "text_markdown": "Jika suatu pabrik industri mengolah limbah cair beracun sesuai standar dan emisi gas di bawah batas toleransi, maka izin operasional pabrik tidak dicabut dan pimpinan perusahaan tidak diproses hukum."
        },
        {
          "key": "D",
          "text_markdown": "Izin operasional suatu pabrik industri akan dicabut jika dan hanya jika pabrik tersebut membuang limbah cair beracun tanpa instalasi pengolahan standar."
        },
        {
          "key": "E",
          "text_markdown": "Jika pimpinan perusahaan diproses secara hukum, maka pabrik industri tersebut pasti telah membuang limbah cair beracun tanpa instalasi pengolahan standar."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan kontraposisi `A → B ≡ ~B → ~A` dengan Hukum De Morgan ganda: konsekuen `(C ∧ P)` jika disangkal menjadi `(~C ∨ ~P)` (\"TIDAK dicabut ATAU TIDAK diproses\"). Anteseden `(L ∨ E)` jika disangkal menjadi `(~L ∧ ~E)` (\"TIDAK buang limbah DAN TIDAK buang emisi\").",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rumus Premis Asli:** $(L \\lor E) \\rightarrow (C \\land P)$\n  - $L$: Buang limbah cair beracun tanpa instalasi standar\n  - $E$: Lepaskan emisi gas melebihi ambang batas\n  - $C$: Izin operasional dicabut\n  - $P$: Pimpinan perusahaan diproses secara hukum\n- **Langkah 1 (Kontraposisi):**\n  $(L \\lor E) \\rightarrow (C \\land P) \\equiv \\sim (C \\land P) \\rightarrow \\sim (L \\lor E)$\n- **Langkah 2 (Terapkan Hukum De Morgan pada Kedua Ruas):**\n  - Ruas kiri: $\\sim (C \\land P) \\equiv \\sim C \\lor \\sim P$ (Izin tidak dicabut ATAU pimpinan tidak diproses hukum).\n  - Ruas kanan: $\\sim (L \\lor E) \\equiv \\sim L \\land \\sim E$ (Tidak buang limbah beracun DAN tidak lepaskan emisi berlebih).\n- **Hasil Akhir Ekuivalensi:**\n  $(\\sim C \\lor \\sim P) \\rightarrow (\\sim L \\land \\sim E)$\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Tukar Posisi & Terapkan De Morgan):**\n\n1. Pindahkan akibat *(dicabut DAN diproses)* ke depan menjadi syarat: ingkari dengan De Morgan menjadi *(TIDAK dicabut ATAU TIDAK diproses)*.\n2. Pindahkan sebab *(limbah ATAU emisi)* ke belakang menjadi akibat: ingkari dengan De Morgan menjadi *(TIDAK buang limbah DAN TIDAK buang emisi)*.\n3. Hanya pilihan **A** yang menukar operator \"dan\" menjadi \"atau\" di depan serta \"atau\" menjadi \"dan\" di belakang secara sempurna.\n4. Jawaban yang tepat adalah pilihan **A**.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Menggunakan operator \"dan\" alih-alih \"atau\" pada penyangkalan konsekuen, serta melanggar klausul emisi.\n- **Pilihan C Salah:** Merupakan bentuk invers $\\sim(L \\lor E) \\rightarrow \\sim(C \\land P)$, yang tidak ekuivalen dengan premis awal.\n- **Pilihan D Salah:** Membatasi regulasi menjadi biimplikasi sepihak dan membuang klausul emisi gas.\n- **Pilihan E Salah:** Mengalami cacat logika menegaskan konsekuen tunggal (*affirming the consequent*)."
    },
    {
      "example_id": "pu-02-02-ex4",
      "variation_name": "Variasi 4: Kontraposisi Implikasi Majemuk Ekosistem Pesisir (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah konsorsium peneliti oseanografi dan biologi laut mempublikasikan laporan pemantauan kawasan konservasi terumbu karang perairan tropis:\n\n*\"Jika anomali suhu permukaan laut melebihi ambang batas $1{,}5^\\circ\\text{C}$ dan indeks tutupan sedimen lumpur pesisir meningkat tajam, maka koloni karang mengalami pemutihan massal (mass bleaching) atau laju kalsifikasi terumbu karang terhenti.\"*",
      "question_markdown": "Berdasarkan prinsip logika formal matematika, pernyataan berikut yang **pasti memiliki nilai kebenaran ekuivalen (setara secara logika)** dengan laporan pemantauan tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika anomali suhu permukaan laut tidak melebihi ambang batas $1{,}5^\\circ\\text{C}$ atau indeks tutupan sedimen lumpur pesisir tidak meningkat tajam, maka koloni karang tidak mengalami pemutihan massal dan laju kalsifikasi terumbu karang tidak terhenti."
        },
        {
          "key": "B",
          "text_markdown": "Jika koloni karang mengalami pemutihan massal atau laju kalsifikasi terumbu karang terhenti, maka anomali suhu permukaan laut melebihi ambang batas $1{,}5^\\circ\\text{C}$ dan indeks tutupan sedimen lumpur pesisir meningkat tajam."
        },
        {
          "key": "C",
          "text_markdown": "Jika koloni karang tidak mengalami pemutihan massal atau laju kalsifikasi terumbu karang tidak terhenti, maka anomali suhu permukaan laut tidak melebihi ambang batas $1{,}5^\\circ\\text{C}$ dan indeks tutupan sedimen lumpur pesisir tidak meningkat tajam."
        },
        {
          "key": "D",
          "text_markdown": "Jika koloni karang tidak mengalami pemutihan massal dan laju kalsifikasi terumbu karang tidak terhenti, maka anomali suhu permukaan laut tidak melebihi ambang batas $1{,}5^\\circ\\text{C}$ atau indeks tutupan sedimen lumpur pesisir tidak meningkat tajam."
        },
        {
          "key": "E",
          "text_markdown": "Anomali suhu permukaan laut melebihi ambang batas $1{,}5^\\circ\\text{C}$ dan indeks tutupan sedimen lumpur pesisir meningkat tajam, tetapi koloni karang tidak mengalami pemutihan massal dan laju kalsifikasi terumbu karang tidak terhenti."
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Rumus kontraposisi implikasi adalah $p \\implies q \\equiv \\sim q \\implies \\sim p$. Karena kedua ruas memuat perangkai logika majemuk (\"dan\" serta \"atau\"), terapkan Hukum De Morgan saat menegasikan: ingkaran dari $(B \\lor K)$ adalah $(\\sim B \\land \\sim K)$, dan ingkaran dari $(T \\land S)$ adalah $(\\sim T \\lor \\sim S)$.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Identifikasi Simbol Logika Premis:**\n  - $T$: Anomali suhu permukaan laut melebihi ambang batas $1{,}5^\\circ\\text{C}$\n  - $S$: Indeks tutupan sedimen lumpur pesisir meningkat tajam\n  - $B$: Koloni karang mengalami pemutihan massal\n  - $K$: Laju kalsifikasi terumbu karang terhenti\n  Bentuk premis: $(T \\land S) \\implies (B \\lor K)$\n- **Aturan Kontraposisi:**\n  $P \\implies Q \\equiv \\sim Q \\implies \\sim P$\n  Maka: $\\sim(B \\lor K) \\implies \\sim(T \\land S)$\n- **Penerapan Hukum De Morgan:**\n  1. Ruas kiri (penyangkalan konsekuen): $\\sim(B \\lor K) \\equiv \\sim B \\land \\sim K$ (*\"Koloni karang tidak mengalami pemutihan massal DAN laju kalsifikasi tidak terhenti\"*).\n  2. Ruas kanan (penyangkalan anteseden): $\\sim(T \\land S) \\equiv \\sim T \\lor \\sim S$ (*\"Anomali suhu tidak melebihi $1{,}5^\\circ\\text{C}$ ATAU indeks tutupan sedimen tidak meningkat tajam\"*).\n- **Hasil Kalimat Kontraposisi Lengkap:**\n  *\"Jika koloni karang tidak mengalami pemutihan massal dan laju kalsifikasi terumbu karang tidak terhenti, maka anomali suhu permukaan laut tidak melebihi ambang batas $1{,}5^\\circ\\text{C}$ atau indeks tutupan sedimen lumpur pesisir tidak meningkat tajam.\"*\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Tukar Tempat & Balik Operator De Morgan):**\n\n1. Kontraposisi mewajibkan pembalikan posisi syarat dan akibat.\n2. Akibat semula memuat operator \"atau\" ($B \\lor K$), saat dibalik ke depan wajib berubah menjadi ingkaran beroperator \"dan\" $(\\sim B \\land \\sim K)$. Coret opsi A, B, dan C!\n3. Syarat semula memuat operator \"dan\" ($T \\land S$), saat dibalik ke belakang wajib berubah menjadi ingkaran beroperator \"atau\" $(\\sim T \\lor \\sim S)$.\n4. Opsi D secara tepat dan sempurna memenuhi kedua kaidah tersebut.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk invers $\\sim(T \\land S) \\implies \\sim(B \\lor K)$ yang tidak ekuivalen secara logika matematika dengan kalimat asal.\n- **Pilihan B Salah:** Merupakan bentuk konvers $(B \\lor K) \\implies (T \\land S)$ yang sekadar membalik posisi tanpa melakukan penyangkalan negasi.\n- **Pilihan C Salah:** Melakukan kesalahan fatal dalam menerapkan Hukum De Morgan karena tidak mengubah operator \"atau\" menjadi \"dan\" saat menegasikan kalimat konsekuen.\n- **Pilihan E Salah:** Merupakan bentuk negasi / ingkaran dari implikasi asal ($P \\land \\sim Q$), yang nilai kebenarannya justru berkebalikan penuh dengan kalimat asal."
    },
    {
      "example_id": "pu-02-02-ex5",
      "variation_name": "Variasi 5: Negasi Implikasi Majemuk Kebijakan Subsidi Transportasi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Kementerian Keuangan bersama Dinas Perhubungan merilis dokumen analisis kebijakan fiskal transportasi perkotaan sebagai berikut:\n\n*\"Jika pemerintah daerah memperluas alokasi subsidi tiket angkutan massal dan menambah armada koridor bus listrik terintegrasi, maka tingkat kemacetan jalan arteri perkotaan menurun atau beban pengeluaran transportasi harian keluarga pekerja berkurang signifikan.\"*",
      "question_markdown": "Negasi (ingkaran) yang **paling tepat secara kaidah logika formal** dari pernyataan kebijakan transportasi tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika pemerintah daerah tidak memperluas alokasi subsidi tiket angkutan massal atau tidak menambah armada koridor bus listrik, maka tingkat kemacetan jalan arteri perkotaan tidak menurun dan beban pengeluaran transportasi tidak berkurang."
        },
        {
          "key": "B",
          "text_markdown": "Jika tingkat kemacetan jalan arteri perkotaan tidak menurun dan beban pengeluaran transportasi harian keluarga pekerja tidak berkurang, maka pemerintah daerah tidak memperluas alokasi subsidi tiket angkutan massal atau tidak menambah armada bus listrik."
        },
        {
          "key": "C",
          "text_markdown": "Pemerintah daerah tidak memperluas alokasi subsidi tiket angkutan massal atau tidak menambah armada koridor bus listrik terintegrasi, atau tingkat kemacetan jalan arteri perkotaan menurun dan beban pengeluaran transportasi harian keluarga pekerja berkurang signifikan."
        },
        {
          "key": "D",
          "text_markdown": "Pemerintah daerah memperluas alokasi subsidi tiket angkutan massal dan menambah armada koridor bus listrik terintegrasi, tetapi tingkat kemacetan jalan arteri perkotaan tidak menurun atau beban pengeluaran transportasi harian keluarga pekerja berkurang signifikan."
        },
        {
          "key": "E",
          "text_markdown": "Pemerintah daerah memperluas alokasi subsidi tiket angkutan massal dan menambah armada koridor bus listrik terintegrasi, tetapi tingkat kemacetan jalan arteri perkotaan tidak menurun dan beban pengeluaran transportasi harian keluarga pekerja tidak berkurang signifikan."
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat hukum negasi implikasi: $\\sim(P \\implies Q) \\equiv P \\land \\sim Q$. Langkah 1: Langsung coret semua opsi yang masih berformat pengandaian (\"Jika... maka...\"). Langkah 2: Pertahankan klausul syarat ($P$) sepenuhnya, lalu sangkal klausul akibat ($Q$) menggunakan Hukum De Morgan: ingkaran dari \"menurun ATAU berkurang\" adalah \"tidak menurun DAN tidak berkurang\".",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Proposisi:**\n  - $S$: Pemerintah daerah memperluas alokasi subsidi tiket angkutan massal\n  - $B$: Pemerintah daerah menambah armada koridor bus listrik terintegrasi\n  - $M$: Tingkat kemacetan jalan arteri perkotaan menurun\n  - $P$: Beban pengeluaran transportasi harian berkurang signifikan\n  Struktur premis: $(S \\land B) \\implies (M \\lor P)$\n- **Rumus Negasi Implikasi Bersyarat:**\n  $\\sim (X \\implies Y) \\equiv X \\land \\sim Y$\n  Dengan mensubstitusikan $X = (S \\land B)$ dan $Y = (M \\lor P)$, diperoleh:\n  $\\sim ((S \\land B) \\implies (M \\lor P)) \\equiv (S \\land B) \\land \\sim (M \\lor P)$\n- **Terapkan Hukum De Morgan pada $\\sim(M \\lor P)$:**\n  $\\sim (M \\lor P) \\equiv \\sim M \\land \\sim P$\n  Artinya: *kemacetan jalan arteri tidak menurun DAN beban pengeluaran transportasi harian tidak berkurang signifikan*.\n- **Gabungan Kalimat Ingkaran Utuh:**\n  *(S dan B terlaksana), TETAPI (M tidak terjadi DAN P tidak terjadi)*, yang tepat diuraikan pada pilihan E.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Eliminasi Opsi \"Jika\" & Konjungsi De Morgan):**\n\n1. Negasi dari pernyataan bersyarat (\"Jika... maka...\") BUKAN kalimat bersyarat! Langsung eliminasi pilihan A dan B.\n2. Negasi implikasi menuntut syarat tetap terjadi namun akibat diingkari ($P \\land \\sim Q$). Pilihan C salah karena menegasikan syarat di depan.\n3. Periksa akibat: semula menggunakan operator \"atau\" ($M \\lor P$), maka ingkarannya wajib berubah menjadi \"dan\" ($\\sim M \\land \\sim P$). Pilihan D salah karena tetap menggunakan kata \"atau\".\n4. Pilihan E satu-satunya opsi yang benar.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk kekeliruan invers bersyarat baru yang masih mempertahankan struktur \"Jika... maka...\".\n- **Pilihan B Salah:** Merupakan bentuk kontraposisi yang bernilai ekuivalen (sama), bukan merupakan negasi (ingkaran).\n- **Pilihan C Salah:** Mengubah susunan kalimat menjadi ekuivalensi disjungsi tanpa negasi konsekuen yang tepat.\n- **Pilihan D Salah:** Terjebak pada kegagalan mengubah operator De Morgan; penyangkalan dari disjungsi \"atau\" wajib berganti menjadi konjungsi \"dan\"."
    },
    {
      "example_id": "pu-02-02-ex6",
      "variation_name": "Variasi 6: Kontraposisi Negasi Bertingkat Ritme Sirkadian dan Memori (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah tim peneliti neurosains perilaku dan psikologi kognitif merilis hasil uji klinis mengenai restorasi fungsi kognitif otak:\n\n*\"Jika seorang individu tidak mengalami gangguan ritme sirkadian dan secara konsisten memperoleh fase tidur gelombang lambat (slow-wave sleep) minimal 90 menit per malam, maka efisiensi konsolidasi memori kerja otaknya terjaga secara optimal.\"*",
      "question_markdown": "Pernyataan berikut yang **pasti memiliki nilai kebenaran ekuivalen (setara secara logika)** dengan hasil uji klinis tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika seorang individu mengalami gangguan ritme sirkadian atau tidak memperoleh fase tidur gelombang lambat minimal 90 menit per malam, maka efisiensi konsolidasi memori kerja otaknya tidak terjaga secara optimal."
        },
        {
          "key": "B",
          "text_markdown": "Jika efisiensi konsolidasi memori kerja otak seorang individu tidak terjaga secara optimal, maka individu tersebut mengalami gangguan ritme sirkadian atau tidak memperoleh fase tidur gelombang lambat minimal 90 menit per malam."
        },
        {
          "key": "C",
          "text_markdown": "Jika efisiensi konsolidasi memori kerja otak seorang individu tidak terjaga secara optimal, maka individu tersebut mengalami gangguan ritme sirkadian dan tidak memperoleh fase tidur gelombang lambat minimal 90 menit per malam."
        },
        {
          "key": "D",
          "text_markdown": "Seorang individu tidak mengalami gangguan ritme sirkadian dan secara konsisten memperoleh fase tidur gelombang lambat minimal 90 menit per malam, tetapi efisiensi konsolidasi memori kerja otaknya tidak terjaga secara optimal."
        },
        {
          "key": "E",
          "text_markdown": "Jika efisiensi konsolidasi memori kerja otak seorang individu terjaga secara optimal, maka individu tersebut tidak mengalami gangguan ritme sirkadian dan secara konsisten memperoleh fase tidur gelombang lambat minimal 90 menit per malam."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Perhatikan negasi ganda pada anteseden! Premis berbentuk $(\\sim G \\land S) \\implies M$. Rumus kontraposisinya adalah $\\sim M \\implies \\sim (\\sim G \\land S)$. Menurut Hukum De Morgan, $\\sim (\\sim G \\land S) \\equiv \\sim(\\sim G) \\lor \\sim S \\equiv G \\lor \\sim S$ (\"mengalami gangguan sirkadian ATAU tidak memperoleh tidur gelombang lambat\").",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Logika Premis:**\n  - Misalkan $G$: Individu mengalami gangguan ritme sirkadian (sehingga $\\sim G$: *tidak mengalami gangguan ritme sirkadian*)\n  - $S$: Memperoleh fase tidur gelombang lambat minimal 90 menit per malam\n  - $M$: Efisiensi konsolidasi memori kerja terjaga secara optimal\n  Premis: $(\\sim G \\land S) \\implies M$\n- **Penerapan Rumus Kontraposisi:**\n  $P \\implies Q \\equiv \\sim Q \\implies \\sim P$\n  Maka: $\\sim M \\implies \\sim (\\sim G \\land S)$\n- **Penyederhanaan Negasi Anteseden dengan Hukum De Morgan:**\n  $\\sim (\\sim G \\land S) \\equiv \\sim(\\sim G) \\lor \\sim S \\equiv G \\lor \\sim S$\n- **Penerjemahan Kembali ke Bahasa Alami:**\n  - $\\sim M$: Efisiensi konsolidasi memori kerja otak tidak terjaga secara optimal\n  - $G \\lor \\sim S$: Individu tersebut mengalami gangguan ritme sirkadian ATAU tidak memperoleh fase tidur gelombang lambat minimal 90 menit per malam.\n  Kalimat utuh: *\"Jika efisiensi konsolidasi memori kerja otak seorang individu tidak terjaga secara optimal, maka individu tersebut mengalami gangguan ritme sirkadian atau tidak memperoleh fase tidur gelombang lambat minimal 90 menit per malam.\"*\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Kontraposisi & Negasi Ganda De Morgan):**\n\n1. Cari opsi yang membalik akibat ke depan dengan disangkal: *\"Jika efisiensi konsolidasi memori kerja TIDAK terjaga...\"* (Eliminasi opsi A, D, dan E!).\n2. Ingkari syarat di belakang: ingkaran dari *\"tidak mengalami gangguan (~G) DAN tidur cukup (S)\"* adalah *\"mengalami gangguan (G) ATAU tidak tidur cukup (~S)\"*.\n3. Pilihan C salah karena menggunakan kata hubung \"dan\".\n4. Pilihan B tepat menggunakan kata hubung \"atau\" hasil konversi De Morgan.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk invers $\\sim(\\sim G \\land S) \\implies \\sim M$, yang tidak pernah ekuivalen dengan kalimat implikasi awal.\n- **Pilihan C Salah:** Melakukan kekeliruan aturan De Morgan karena tidak menukar perangkai konjungsi \"dan\" menjadi disjungsi \"atau\".\n- **Pilihan D Salah:** Merupakan format negasi ingkaran $(\\sim G \\land S) \\land \\sim M$, bukan format ekuivalensi.\n- **Pilihan E Salah:** Merupakan bentuk konvers $M \\implies (\\sim G \\land S)$ yang sekadar membalik kalimat tanpa melakukan negasi."
    },
    {
      "example_id": "pu-02-02-ex7",
      "variation_name": "Variasi 7: Ekuivalensi Disjungtif Kepatuhan Keamanan Siber (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Otoritas Pengawas Layanan Keuangan Digital menetapkan pedoman standar arsitektur teknologi informasi perbankan:\n\n*\"Jika sistem perbankan digital menerapkan arsitektur enkripsi ujung-ke-ujung (end-to-end) bersertifikat mutakhir dan rutin meloloskan audit uji penetrasi independen, maka integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar.\"*",
      "question_markdown": "Pada lembar evaluasi audit, auditor diminta menyajikan pernyataan yang **memiliki nilai kebenaran ekuivalen (setara secara logika)** dengan pedoman tersebut tanpa menggunakan kata pengandaian \"jika... maka...\". Pernyataan yang tepat adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Sistem perbankan digital menerapkan arsitektur enkripsi ujung-ke-ujung bersertifikat mutakhir atau rutin meloloskan audit uji penetrasi independen, dan integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar."
        },
        {
          "key": "B",
          "text_markdown": "Sistem perbankan digital tidak menerapkan arsitektur enkripsi ujung-ke-ujung bersertifikat mutakhir dan tidak rutin meloloskan audit uji penetrasi independen, atau integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar."
        },
        {
          "key": "C",
          "text_markdown": "Sistem perbankan digital tidak menerapkan arsitektur enkripsi ujung-ke-ujung (end-to-end) bersertifikat mutakhir atau tidak rutin meloloskan audit uji penetrasi independen, atau integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar."
        },
        {
          "key": "D",
          "text_markdown": "Sistem perbankan digital menerapkan arsitektur enkripsi ujung-ke-ujung bersertifikat mutakhir dan rutin meloloskan audit uji penetrasi independen, tetapi integritas data transaksi keuangan nasabah tidak terjamin dari manipulasi pihak luar."
        },
        {
          "key": "E",
          "text_markdown": "Sistem perbankan digital rutin meloloskan audit uji penetrasi independen jika dan hanya jika integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat bentuk ekuivalensi disjungsi dari implikasi: $p \\implies q \\equiv \\sim p \\lor q$. Syarat anteseden $p$ berbentuk konjungsi $(E \\land A)$, sehingga ketika dinegasikan dengan Hukum De Morgan menjadi $\\sim(E \\land A) \\equiv \\sim E \\lor \\sim A$ (\"tidak menerapkan enkripsi ATAU tidak meloloskan audit\").",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Logika Premis:**\n  - $E$: Sistem menerapkan arsitektur enkripsi *end-to-end* bersertifikat mutakhir\n  - $A$: Sistem rutin meloloskan audit uji penetrasi independen\n  - $T$: Integritas data transaksi nasabah terjamin dari manipulasi\n  Bentuk kalimat: $(E \\land A) \\implies T$\n- **Hukum Ekuivalensi Disjungtif Implikasi:**\n  $P \\implies Q \\equiv \\sim P \\lor Q$\n- **Substitusi dan Aplikasi Hukum De Morgan:**\n  $\\sim (E \\land A) \\lor T \\equiv (\\sim E \\lor \\sim A) \\lor T$\n- **Penerjemahan Kalimat:**\n  - $(\\sim E \\lor \\sim A)$: Sistem perbankan digital tidak menerapkan enkripsi mutakhir ATAU tidak rutin meloloskan audit penetrasi independen.\n  - $\\lor T$: ATAU integritas data transaksi keuangan nasabah terjamin dari manipulasi pihak luar.\n  Struktur ini secara tepat dinyatakan pada pilihan C.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Ekuivalensi ~P ∨ Q):**\n\n1. Jika soal meminta ekuivalensi tanpa kata \"jika\", langsung gunakan rumus disjungsi: \"TIDAK P atau Q\".\n2. Negasikan bagian syarat dengan De Morgan: \"enkripsi DAN audit\" menjadi \"TIDAK enkripsi ATAU TIDAK audit\".\n3. Biarkan bagian akibat apa adanya dengan perangkai \"atau\": \"ATAU integritas data terjamin\".\n4. Pilihan C langsung menyajikan struktur persis tersebut.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Gagal menegasikan anteseden dan keliru menggunakan kata perangkai \"dan\" alih-alih \"atau\".\n- **Pilihan B Salah:** Lupa menerapkan Hukum De Morgan pada penyangkalan anteseden; kata \"dan\" tidak diubah menjadi \"atau\".\n- **Pilihan D Salah:** Merupakan bentuk negasi / ingkaran ($P \\land \\sim Q$), yang nilai kebenarannya berlawanan dengan premis asli.\n- **Pilihan E Salah:** Mengubah implikasi satu arah menjadi proposisi biimplikasi serta membuang variabel enkripsi sistem."
    },
    {
      "example_id": "pu-02-02-ex8",
      "variation_name": "Variasi 8: Negasi Kuantor Universal Bersyarat Revitalisasi Dialek (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Balai Pelestarian Kebudayaan dan Lembaga Adat Daerah merumuskan tesis sosiolinguistik mengenai ketahanan bahasa tutur minoritas di kepulauan nusantara:\n\n*\"Semua komunitas adat yang mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar dan menyelenggarakan festival sastra lisan tahunan secara konsisten berhasil mencegah kepunahan bahasa daerahnya.\"*",
      "question_markdown": "Negasi (ingkaran mutlak) yang **paling tepat secara kaidah logika formal** dari tesis sosiolinguistik tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Ada komunitas adat yang mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar dan menyelenggarakan festival sastra lisan tahunan secara konsisten, tetapi tidak berhasil mencegah kepunahan bahasa daerahnya."
        },
        {
          "key": "B",
          "text_markdown": "Semua komunitas adat yang tidak mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar atau tidak menyelenggarakan festival sastra lisan tahunan tidak berhasil mencegah kepunahan bahasa daerahnya."
        },
        {
          "key": "C",
          "text_markdown": "Ada komunitas adat yang tidak mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar atau tidak menyelenggarakan festival sastra lisan tahunan, dan berhasil mencegah kepunahan bahasa daerahnya."
        },
        {
          "key": "D",
          "text_markdown": "Semua komunitas adat yang mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar dan menyelenggarakan festival sastra lisan tahunan tidak berhasil mencegah kepunahan bahasa daerahnya."
        },
        {
          "key": "E",
          "text_markdown": "Jika sebuah komunitas adat tidak berhasil mencegah kepunahan bahasa daerahnya, maka komunitas tersebut tidak mengintegrasikan dialek lokal atau tidak menyelenggarakan festival sastra lisan tahunan."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Soal ini memadukan negasi kuantor dan negasi implikasi! Ingkaran dari kuantor universal \"Semua x berlaku [Jika P(x) maka Q(x)]\" adalah kuantor eksistensial \"Ada x sedemikian sehingga [P(x) TETAPI tidak Q(x)]\". Coret opsi yang masih mempertahankan kata \"Semua\" atau \"Jika\"!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Logika Kuantor Universal Bersyarat:**\n  $\\forall x [ (K(x) \\land F(x)) \\implies B(x) ]$\n  di mana $x$ adalah komunitas adat, $K(x)$: mengintegrasikan dialek lokal ke kurikulum, $F(x)$: menyelenggarakan festival sastra lisan, dan $B(x)$: berhasil mencegah kepunahan bahasa daerah.\n- **Kaidah Negasi Kuantor Universal:**\n  $\\sim (\\forall x [ P(x) ]) \\equiv \\exists x [ \\sim P(x) ]$\n  Kuantor universal (*Semua*) berubah menjadi kuantor eksistensial (*Ada / Beberapa / Terdapat setidaknya satu*).\n- **Kaidah Negasi Implikasi di Dalam Kuantor:**\n  $\\sim ((K(x) \\land F(x)) \\implies B(x)) \\equiv (K(x) \\land F(x)) \\land \\sim B(x)$\n  Artinya: kondisi syarat $K$ dan $F$ tetap terpenuhi, TETAPI akibat $B$ diingkari (tidak berhasil mencegah kepunahan).\n- **Hasil Penggabungan Logika Negasi:**\n  *\"Ada komunitas adat yang mengintegrasikan dialek lokal ke dalam kurikulum muatan lokal sekolah dasar dan menyelenggarakan festival sastra lisan tahunan secara konsisten, TETAPI tidak berhasil mencegah kepunahan bahasa daerahnya.\"*\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Trik Dua Langkah Negasi Kuantor Bersyarat):**\n\n1. Langkah 1 (Ubah Kuantor): Ingkaran kata \"Semua\" WAJIB berubah menjadi \"Ada / Beberapa\". Coret langsung pilihan B, D, dan E!\n2. Langkah 2 (Ingkar Janji): Ingkaran kalimat bersyarat adalah fakta pembantah: \"Syarat dilakukan, tetapi janji gagal tercapai\".\n3. Pilihan A menyatakan syarat dilakukan (integrasi dialek dan festival sastra jalan), namun gagal mencegah kepunahan. Pilihan C keliru karena justru membalik syaratnya.\n4. Jawaban yang benar adalah pilihan A.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Mempertahankan kuantor universal \"Semua\" dan membentuk kalimat invers, yang bukan merupakan ingkaran logika yang sah.\n- **Pilihan C Salah:** Keliru menyangkal anteseden (syarat) alih-alih mempertahankan anteseden dan menyangkal konsekuen.\n- **Pilihan D Salah:** Merupakan kesalahan umum mengubah predikat tanpa mengubah kuantor universal (\"Semua... tidak berhasil\"). Cukup satu contoh penyangkal (*counterexample*) \"Ada...\" untuk meruntuhkan pernyataan universal.\n- **Pilihan E Salah:** Merupakan bentuk kontraposisi bersyarat ekuivalen, bukan bentuk kalimat ingkaran/negasi."
    },
    {
    "example_id": "pu-02-02-ex9",
    "variation_name": "Variasi 9: Negasi Proposisi Bersyarat Reduksi Emisi Geotermal (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Dalam laporan Analisis Mengenai Dampak Lingkungan (AMDAL) pembangunan unit pembangkit panas bumi di lereng gunung api aktif, seorang konsultan lingkungan merumuskan hipotesis pernyataan bersyarat:\n\n*\"Jika teknologi injeksi ulang fluida geotermal bertekanan tinggi diterapkan secara kontinu, maka emisi gas hidrogen sulfida ($H_2S$) ke atmosfer pasti tereduksi di bawah ambang batas bahaya.\"*\n\nSetelah serangkaian pengujian independen di lapangan, dewan pengawas lingkungan menemukan fakta ilmiah yang secara resmi **menyangkal / membatalkan (menegasikan)** pernyataan konsultan lingkungan tersebut.",
    "question_markdown": "Berdasarkan kaidah logika matematika, manakah kondisi faktual berikut yang merupakan **negasi (ingkaran)** yang sah dari pernyataan konsultan lingkungan tersebut?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Teknologi injeksi ulang fluida geotermal bertekanan tinggi tidak diterapkan secara kontinu DAN emisi gas hidrogen sulfida ($H_2S$) ke atmosfer tidak tereduksi di bawah ambang batas bahaya."
        },
        {
            "key": "B",
            "text_markdown": "Jika teknologi injeksi ulang fluida geotermal tidak diterapkan secara kontinu, maka emisi gas hidrogen sulfida ($H_2S$) ke atmosfer tidak tereduksi di bawah ambang batas bahaya."
        },
        {
            "key": "C",
            "text_markdown": "Teknologi injeksi ulang fluida geotermal bertekanan tinggi diterapkan secara kontinu, TETAPI emisi gas hidrogen sulfida ($H_2S$) ke atmosfer tidak tereduksi di bawah ambang batas bahaya."
        },
        {
            "key": "D",
            "text_markdown": "Jika emisi gas hidrogen sulfida ($H_2S$) ke atmosfer tidak tereduksi di bawah ambang batas bahaya, maka teknologi injeksi ulang fluida geotermal tidak diterapkan secara kontinu."
        },
        {
            "key": "E",
            "text_markdown": "Teknologi injeksi ulang fluida geotermal bertekanan tinggi tidak diterapkan secara kontinu, TETAPI emisi gas hidrogen sulfida ($H_2S$) berhasil tereduksi di bawah ambang batas bahaya."
        }
    ],
    "correct_answer": "C",
    "hint_markdown": "💡 **Petunjuk Soal:** Ingat rumus baku negasi dari implikasi bersyarat $p \\implies q$:\n$$\\sim(p \\implies q) \\equiv p \\land \\sim q$$\nArtinya: syarat awal terpenuhi ($p$), TETAPI akibat yang dijanjikan justru TIDAK terjadi ($\\sim q$). Cari opsi yang menyatakan teknologi injeksi diterapkan, TETAPI emisinya tetap tidak tereduksi!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formalisasi Pernyataan Awal:**\n  - Bentuk implikasi: $p \\implies q$, dengan $p$: injeksi ulang diterapkan kontinu, $q$: emisi $H_2S$ tereduksi di bawah ambang batas.\n- **Kaidah Negasi Implikasi:**\n  - Negasi dari implikasi adalah suatu konjungsi yang membuktikan anteseden benar namun konsekuen salah:\n    $$\\sim(p \\implies q) \\equiv p \\land \\sim q$$\n- **Pencocokan Nilai Semantik:**\n  - $p$: Teknologi injeksi ulang diterapkan secara kontinu.\n  - $\\sim q$: Emisi gas hidrogen sulfida ($H_2S$) tidak tereduksi di bawah ambang batas bahaya.\n  - Bentuk gabungan ($p \\land \\sim q$): Injeksi diterapkan secara kontinu, TETAPI emisi gas $H_2S$ tidak tereduksi di bawah ambang batas bahaya.\n- **Evaluasi Opsi:** Pilihan **C** mereplikasi secara sempurna bentuk $p \\land \\sim q$.\n\n**Jawaban: C**",
    "quick_trick_markdown": "**Cara Cepat (Rumus Mutlak Negasi 'Jika-Maka'):**\n\n1. Rumus sakti negasi implikasi: Negasi dari \"Jika $P$ maka $Q$\" adalah **\"$P$ dan Bukan $Q$\"** ($P$ tetap terjadi, tapi $Q$ ingkar).\n2. Coret pilihan **B** dan **D** karena masih berbentuk kalimat bersyarat \"Jika-Maka\" (negasi implikasi tidak boleh berwujud implikasi!).\n3. Coret pilihan **A** (karena $\\sim p \\land \\sim q$) dan pilihan **E** (karena $\\sim p \\land q$).\n4. Pilihan yang tepat ($p \\land \\sim q$) adalah pilihan **C**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bentuk $\\sim p \\land \\sim q$ bukan negasi dari $p \\implies q$; ketika anteseden salah, implikasi justru bernilai benar secara hampa (*vacuously true*).\n- **Pilihan B Salah:** Merupakan bentuk inversi ($\\sim p \\implies \\sim q$), bukan negasi proposisi.\n- **Pilihan D Salah:** Merupakan bentuk kontraposisi ($\\sim q \\implies \\sim p$) yang ekuivalen dengan pernyataan asli, bukan ingkarannya.\n- **Pilihan E Salah:** Bentuk $\\sim p \\land q$ bukan negasi yang membatalkan implikasi awal."
},
    {
    "example_id": "pu-02-02-ex10",
    "variation_name": "Variasi 10: Bentuk Ekuivalensi Disjungtif Insentif Bea Masuk Industri (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Kementerian Perdagangan mengeluarkan peraturan tertulis terkait fasilitas kepabeanan bagi industri energi terbarukan:\n\n*\"Jika pelaku industri perakitan domestik meningkatkan Tingkat Komponen Dalam Negeri (TKDN) minimal 60%, maka pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya.\"*\n\nDalam suatu rapat harmonisasi hukum, biro regulasi kementerian diminta merumuskan klausul alternatif yang ekuivalen (setara logis) ke dalam format pernyataan disjungtif (menggunakan kata hubung 'ATAU') tanpa mengubah substansi hukum aslinya.",
    "question_markdown": "Berdasarkan kaidah ekuivalensi logika formal, manakah pernyataan disjungtif berikut yang **ekuivalen (setara logis)** dengan regulasi di atas?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Pelaku industri perakitan domestik meningkatkan Tingkat Komponen Dalam Negeri (TKDN) minimal 60% ATAU pemerintah tidak memberikan fasilitas pembebasan bea masuk komponen inverter surya."
        },
        {
            "key": "B",
            "text_markdown": "Pelaku industri perakitan domestik tidak meningkatkan Tingkat Komponen Dalam Negeri (TKDN) minimal 60% ATAU pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya."
        },
        {
            "key": "C",
            "text_markdown": "Pelaku industri perakitan domestik tidak meningkatkan Tingkat Komponen Dalam Negeri (TKDN) minimal 60% DAN pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya."
        },
        {
            "key": "D",
            "text_markdown": "Pelaku industri perakitan domestik meningkatkan Tingkat Komponen Dalam Negeri (TKDN) minimal 60% DAN pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya."
        },
        {
            "key": "E",
            "text_markdown": "Pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya jika dan hanya jika pelaku industri meningkatkan TKDN minimal 60%."
        }
    ],
    "correct_answer": "B",
    "hint_markdown": "💡 **Petunjuk Soal:** Ingat hukum ekuivalensi disjungtif implikasi material dalam logika proposisi:\n$$p \\implies q \\equiv \\sim p \\lor q$$\nArtinya: \"Bukan $p$ ATAU $q$\". Cari opsi yang memuat negasi anteseden (tidak meningkatkan TKDN minimal 60%) digabung kata 'ATAU' dengan konsekuen asli (pemerintah memberikan fasilitas pembebasan bea masuk)!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formalisasi Logika:**\n  - Pernyataan asli: $p \\implies q$.\n- **Teorema Ekuivalensi Disjungtif:**\n  - Berdasarkan tabel kebenaran logika proposisi, sebuah implikasi $p \\implies q$ memiliki nilai kebenaran yang persis sama dengan bentuk disjungsi:\n    $$p \\implies q \\equiv \\sim p \\lor q$$\n- **Penerjemahan Simbolik ke Bahasa Kontekstual:**\n  - $\\sim p$: Pelaku industri perakitan domestik tidak meningkatkan TKDN minimal 60%.\n  - $\\lor$: ATAU.\n  - $q$: Pemerintah memberikan fasilitas pembebasan bea masuk komponen inverter surya.\n- **Evaluasi Opsi:** Pilihan **B** secara tepat menyatakan $\\sim p \\lor q$.\n\n**Jawaban: B**",
    "quick_trick_markdown": "**Cara Cepat (Rumus Ekuivalensi Disjungtif: 'Ganti JIKA dengan BUKAN, MAKA dengan ATAU'):**\n\n1. Rumus dasar: $p \\implies q \\equiv \\sim p \\lor q$.\n2. Langkah praktis:\n   - Depan dibantah/dinegasikan: \"Pelaku industri TIDAK meningkatkan TKDN 60%\"\n   - Hubungkan dengan kata \"ATAU\"\n   - Belakang TETAP: \"Pemerintah memberikan pembebasan bea masuk\"\n3. Gabungan utuh: Pilihan **B**.\n4. Coret opsi **C** dan **D** karena menggunakan kata hubung 'DAN'.\n5. Coret opsi **A** karena membalik posisi negasi ($p \\lor \\sim q$).\n6. Jawaban: **B**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menyatakan $p \\lor \\sim q$, yang merupakan bentuk ekuivalensi dari $\\sim p \\implies \\sim q$ (inversi), bukan implikasi asli.\n- **Pilihan C Salah:** Menggunakan kata hubung konjungsi 'DAN' ($\\sim p \\land q$), bukan disjungsi.\n- **Pilihan D Salah:** Bentuk $p \\land q$ merupakan konjungsi afirmatif yang hanya bernilai benar jika kedua kondisi terpenuhi, berbeda tabel kebenaran dengan implikasi.\n- **Pilihan E Salah:** Bentuk biimplikasi ($p \\iff q$) menuntut hubungan timbal balik dua arah, bukan ekuivalen satu arah implikasi."
},
    {
    "example_id": "pu-02-02-ex11",
    "variation_name": "Variasi 11: Kontraposisi Implikasi Konjungtif Stimulasi Neurokognitif (Level: Sulit / HOTS)",
    "difficulty": "hard",
    "question_type": "standard_mc",
    "context_markdown": "Sebuah tim neurobiologi mempublikasikan kaidah penarikan kesimpulan medis dari hasil uji coba klinis:\n\n*\"Jika pasien penurunan kognitif ringan menjalani stimulasi auditori gelombang gamma 40 Hz secara rutin, maka pasien tersebut mengalami perbaikan konsolidasi memori kerja DAN penurunan kadar protein amiloid-beta di cairan serebrospinal.\"*",
    "question_markdown": "Manakah pernyataan di bawah ini yang merupakan **kontraposisi yang ekuivalen (pasti benar)** dengan pernyataan peneliti di atas?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Jika pasien penurunan kognitif ringan tidak mengalami perbaikan konsolidasi memori kerja ATAU tidak mengalami penurunan kadar protein amiloid-beta, maka pasien tersebut dipastikan tidak menjalani stimulasi auditori gelombang gamma 40 Hz secara rutin."
        },
        {
            "key": "B",
            "text_markdown": "Jika pasien penurunan kognitif ringan tidak menjalani stimulasi auditori gelombang gamma 40 Hz secara rutin, maka pasien tersebut tidak mengalami perbaikan memori kerja dan tidak mengalami penurunan amiloid-beta."
        },
        {
            "key": "C",
            "text_markdown": "Jika pasien penurunan kognitif ringan mengalami perbaikan konsolidasi memori kerja dan penurunan amiloid-beta, maka pasien tersebut pasti menjalani stimulasi auditori gelombang gamma 40 Hz secara rutin."
        },
        {
            "key": "D",
            "text_markdown": "Jika pasien penurunan kognitif ringan tidak mengalami perbaikan konsolidasi memori kerja DAN tidak mengalami penurunan kadar protein amiloid-beta, maka pasien tersebut dipastikan tidak menjalani stimulasi auditori gelombang gamma 40 Hz secara rutin."
        },
        {
            "key": "E",
            "text_markdown": "Pasien penurunan kognitif ringan menjalani stimulasi auditori gelombang gamma jika dan hanya jika mengalami perbaikan konsolidasi memori kerja."
        }
    ],
    "correct_answer": "A",
    "hint_markdown": "💡 **Petunjuk Soal:** Cermati rumus kontraposisi implikasi bersyarat dengan konsekuen majemuk konjungsi:\nBentuk asli: $p \\implies (q \\land r)$.\nKontraposisi: $\\sim(q \\land r) \\implies \\sim p$.\nBerdasarkan Hukum De Morgan: $\\sim(q \\land r) \\equiv \\sim q \\lor \\sim r$.\nSehingga kalimat kontraposisinya menjadi: \"Jika Bukan $q$ ATAU Bukan $r$, maka Bukan $p$\". Hati-hati jebakan kata DAN vs ATAU!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formalisasi Pernyataan:**\n  - Implikasi asli: $p \\implies (q \\land r)$.\n- **Penerapan Kaidah Kontraposisi:**\n  - Aturan kontraposisi: Balik posisi anteseden dan konsekuen, lalu negasikan keduanya:\n    $$\\sim(q \\land r) \\implies \\sim p$$\n- **Penerapan Hukum De Morgan pada Negasi Konjungsi:**\n  - Negasi dari konjungsi adalah disjungsi dari masing-masing negasinya:\n    $$\\sim(q \\land r) \\equiv \\sim q \\lor \\sim r$$\n- **Rumus Akhir Kontraposisi Ekuivalen:**\n  $$(\\sim q \\lor \\sim r) \\implies \\sim p$$\n- **Penerjemahan ke Bahasa Kontekstual:**\n  - Jika pasien tidak mengalami perbaikan konsolidasi memori kerja ($\\sim q$) **ATAU** tidak mengalami penurunan kadar amiloid-beta ($\\sim r$), maka pasien dipastikan tidak menjalani stimulasi gelombang gamma rutin ($\\sim p$).\n- **Evaluasi Opsi:** Pilihan **A** secara tepat menggunakan kata perangkai **ATAU** pada anteseden kontraposisi.\n\n**Jawaban: A**",
    "quick_trick_markdown": "**Cara Cepat (Trik De Morgan pada Kontraposisi Konjungsi):**\n\n1. Soal meminta Kontraposisi: Konsekuen [A dan B] dibalik ke depan menjadi [Bukan A ATAU Bukan B]! Kata 'DAN' wajib berubah jadi 'ATAU'!\n2. Belakang menjadi: [Bukan P].\n3. Lihat opsi:\n   - Opsi **D** menjebak dengan kata 'DAN' $\\implies$ SALAH!\n   - Opsi **A** menggunakan kata 'ATAU' dengan tepat $\\implies$ BENAR!\n   - Opsi **B** adalah inversi, Opsi **C** adalah konversi.\n4. Jawaban yang tepat adalah pilihan **A**.",
    "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Merupakan bentuk inversi ($\\sim p \\implies \\sim(q \\land r)$), yang tidak ekuivalen secara logika.\n- **Pilihan C Salah:** Merupakan bentuk konversi ($(q \\land r) \\implies p$), yang merupakan kekeliruan menegaskan konsekuen (*affirming the consequent*).\n- **Pilihan D Salah:** Menggunakan kata hubung 'DAN' pada anteseden ($\\sim q \\land \\sim r \\implies \\sim p$), yang gagal menerapkan hukum De Morgan (seharusnya 'ATAU'). Jika salah satu saja dari $q$ atau $r$ tidak terpenuhi, sudah cukup membuktikan $\\sim p$.\n- **Pilihan E Salah:** Mengubah implikasi satu arah menjadi pernyataan biimplikasi."
},
    {
    "example_id": "pu-02-02-ex12",
    "variation_name": "Variasi 12: Hukum De Morgan pada Negasi Keamanan Kanal Kuantum (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Dalam dokumen spesifikasi transmisi jaringan serat optik kuantum (*Quantum Key Distribution* / QKD) perbankan nasional, tertera klausul jaminan integritas berikut:\n\n*\"Kanal transmisi data perbankan aman dari penyadapan pihak ketiga jika dan hanya jika terpenuhi kondisi: Terjadi interferensi foton acak pada detektor ATAU terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%.\"*\n\nSuatu tim auditor siber ingin membuktikan secara deduktif kondisi yang membuktikan bahwa kanal transmisi data tersebut **TIDAK aman dari penyadapan pihak ketiga**.",
    "question_markdown": "Berdasarkan prinsip logika, kondisi faktual manakah yang **secara niscaya membuktikan** bahwa kanal transmisi tersebut tidak aman?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Tidak terjadi interferensi foton acak pada detektor ATAU tidak terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%."
        },
        {
            "key": "B",
            "text_markdown": "Terjadi interferensi foton acak pada detektor DAN tidak terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%."
        },
        {
            "key": "C",
            "text_markdown": "Terjadi interferensi foton acak pada detektor ATAU terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%."
        },
        {
            "key": "D",
            "text_markdown": "Jika terjadi interferensi foton acak pada detektor, maka terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%."
        },
        {
            "key": "E",
            "text_markdown": "Tidak terjadi interferensi foton acak pada detektor DAN tidak terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%."
        }
    ],
    "correct_answer": "E",
    "hint_markdown": "💡 **Petunjuk Soal:** Perhatikan relasi biimplikasi: $S \\iff (p \\lor q)$.\nUntuk membuktikan negasi $\\sim S$, kita harus menegaskan negasi dari sisi kanan:\n$$\\sim S \\iff \\sim(p \\lor q)$$\nBerdasarkan Hukum De Morgan, negasi dari disjungsi $(p \\lor q)$ adalah konjungsi dari negasi-negasinya: $\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$. Cari opsi yang menyatakan Bukan $p$ DAN Bukan $q$!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Relasi Logika:** $S \\iff (p \\lor q)$.\n- **Penetapan Target Negasi:**\n  - Target yang ingin dibuktikan: $\\sim S$.\n  - Berdasarkan sifat biimplikasi: $\\sim S \\iff \\sim(p \\lor q)$.\n- **Aplikasi Hukum De Morgan:**\n  - Negasi dari disjungsi ('ATAU') adalah konjungsi ('DAN') dari ingkaran masing-masing elemen:\n    $$\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$$\n- **Penerjemahan Variabel:**\n  - $\\sim p$: Tidak terjadi interferensi foton acak pada detektor.\n  - $\\land$: DAN.\n  - $\\sim q$: Tidak terdeteksi lonjakan tingkat kesalahan bit kuantum di atas ambang batas 11%.\n- **Simpulan:** Kondisi niscaya yang membuktikan $\\sim S$ adalah terpenuhinya $\\sim p \\land \\sim q$.\n\n**Jawaban: E**",
    "quick_trick_markdown": "**Cara Cepat (Hukum De Morgan: 'ATAU' Dibalik Jadi 'DAN'):**\n\n1. Aturan: Negasi dari $(P \\lor Q)$ adalah $(\\sim P \\land \\sim Q)$.\n2. Ingat kaidah: Kata 'ATAU' dinegasikan PASTI berubah menjadi 'DAN', dan kedua unsurnya harus dinegasikan (Tidak P DAN Tidak Q).\n3. Cek opsi:\n   - Opsi **A** masih memakai kata 'ATAU' $\\implies$ SALAH!\n   - Opsi **B** dan **C** memuat unsur positif $\\implies$ SALAH!\n   - Opsi **E** memuat 'Tidak P DAN Tidak Q' secara sempurna $\\implies$ BENAR!\n4. Jawaban: **E**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan perangkai 'ATAU' ($\\sim p \\lor \\sim q$), yang merupakan negasi dari konjungsi $(p \\land q)$, bukan disjungsi.\n- **Pilihan B Salah:** Bentuk $p \\land \\sim q$ tetap membuat $p \\lor q$ bernilai benar karena komponen $p$ benar, sehingga $S$ tetap benar.\n- **Pilihan C Salah:** Merupakan kondisi $p \\lor q$ asli yang justru membuktikan kanal aman ($S$ benar).\n- **Pilihan D Salah:** Merupakan bentuk implikasi yang tidak mewakili kondisi nilai kebenaran negasi disjungsi."
},
    {
    "example_id": "pu-02-02-ex13",
    "variation_name": "Variasi 13: Negasi Implikasi Anteseden Disjungtif Cagar Budaya (Level: Sulit / HOTS)",
    "difficulty": "hard",
    "question_type": "standard_mc",
    "context_markdown": "Dewan Pakar Pelestarian Warisan Arsitektur menetapkan dalil perlindungan cagar budaya daerah:\n\n*\"Jika suatu bangunan cagar budaya mengalami kerusakan struktur kayu akibat rayap ATAU mengalami pelapukan batu pondasi akibat naiknya air tanah, maka pemerintah daerah wajib mengalokasikan pos anggaran tanggap darurat restorasi.\"*\n\nSebuah koalisi masyarakat pemerhati sejarah mendalilkan bahwa pemerintah daerah telah **melanggar (mengingkari / menegasikan)** dalil perlindungan tersebut dalam kasus penanganan Kompleks Candi Batu Wadas.",
    "question_markdown": "Berdasarkan kaidah logika matematika, kondisi faktual manakah pada Kompleks Candi Batu Wadas yang **membuktikan secara sah terjadinya pengingkaran (negasi)** terhadap dalil perlindungan tersebut?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Candi Batu Wadas tidak mengalami kerusakan struktur kayu akibat rayap dan tidak mengalami pelapukan batu pondasi, tetapi pemerintah daerah tetap mengalokasikan pos anggaran tanggap darurat restorasi."
        },
        {
            "key": "B",
            "text_markdown": "Jika Candi Batu Wadas tidak mengalami kerusakan struktur kayu akibat rayap, maka pemerintah daerah tidak mengalokasikan pos anggaran tanggap darurat restorasi."
        },
        {
            "key": "C",
            "text_markdown": "Candi Batu Wadas tidak mengalami kerusakan struktur kayu akibat rayap atau tidak mengalami pelapukan batu pondasi, dan pemerintah daerah tidak mengalokasikan pos anggaran tanggap darurat restorasi."
        },
        {
            "key": "D",
            "text_markdown": "Candi Batu Wadas mengalami kerusakan struktur kayu akibat rayap ATAU pelapukan batu pondasi akibat naiknya air tanah, TETAPI pemerintah daerah tidak mengalokasikan pos anggaran tanggap darurat restorasi."
        },
        {
            "key": "E",
            "text_markdown": "Pemerintah daerah mengalokasikan pos anggaran tanggap darurat restorasi jika dan hanya jika Candi Batu Wadas mengalami kerusakan kayu dan pelapukan pondasi secara bersamaan."
        }
    ],
    "correct_answer": "D",
    "hint_markdown": "💡 **Petunjuk Soal:** Terapkan kaidah negasi implikasi bersyarat: $\\sim(A \\implies B) \\equiv A \\land \\sim B$.\nDi sini, $A$ adalah anteseden disjungtif: $(p \\lor q)$.\n$B$ adalah konsekuen: $r$.\nMaka negasinya adalah: $(p \\lor q) \\land \\sim r$.\nArtinya: Candi mengalami kerusakan kayu ATAU pelapukan pondasi (kondisi $A$ ada), TETAPI pemerintah TIDAK mengalokasikan anggaran restorasi ($\\sim r$)!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Dalil Perlindungan Asli:**\n  $$(p \\lor q) \\implies r$$\n  - $A = (p \\lor q)$: Cagar budaya rusak struktur kayu atau lapuk batu pondasi.\n  - $B = r$: Pemda wajib mengalokasikan anggaran tanggap darurat restorasi.\n- **Kaidah Logika Negasi Implikasi:**\n  - Implikasi $A \\implies B$ hanya diingkari ketika anteseden $A$ bernilai Benar namun konsekuen $B$ bernilai Salah:\n    $$\\sim(A \\implies B) \\equiv A \\land \\sim B$$\n- **Substitusi Komponen:**\n  $$\\sim([(p \\lor q) \\implies r]) \\equiv (p \\lor q) \\land \\sim r$$\n- **Penerjemahan Bahasa Alami:**\n  - Candi Batu Wadas mengalami kerusakan struktur kayu akibat rayap ATAU pelapukan batu pondasi ($p \\lor q$ Benar),\n  - **TETAPI** pemerintah daerah tidak mengalokasikan anggaran tanggap darurat restorasi ($\\sim r$ Benar).\n- **Evaluasi Opsi:** Pilihan **D** adalah satu-satunya opsi yang secara tepat menyusun kondisi $(p \\lor q) \\land \\sim r$.\n\n**Jawaban: D**",
    "quick_trick_markdown": "**Cara Cepat (Rumus Negasi 'Syarat Terjadi, Tapi Kewajiban Dilanggar'):**\n\n1. Kapan suatu janji/aturan 'Jika A maka B' dilanggar?\n   Jawab: Saat syarat A benar-benar terjadi, tetapi pihak berwenang TIDAK melakukan B!\n2. Syarat A: Mengalami kerusakan kayu ATAU pelapukan pondasi.\n3. Pelanggaran (Bukan B): Pemerintah TIDAK mengalokasikan anggaran restorasi.\n4. Cari opsi yang memuat [Syarat A terjadi, tapi Pemda tidak mengalokasikan anggaran]: Opsi **D**.\n5. Coret opsi **A**, **B**, **C**, dan **E**.\n6. Jawaban: **D**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bentuk $\\sim(p \\lor q) \\land r$; jika syarat tidak terjadi tetapi dana tetap dialokasikan, implikasi tidak dilanggar (*vacuously true*).\n- **Pilihan B Salah:** Merupakan kalimat bersyarat inversi parsial, bukan pembuktian negasi faktual.\n- **Pilihan C Salah:** Menggunakan negasi pada disjungsi awal alih-alih mempertahankan kondisi anteseden asli $(p \\lor q)$.\n- **Pilihan E Salah:** Mengubah ketentuan implikasi satu arah menjadi biimplikasi bersyarat ganda."
},
    {
      "example_id": "pu-02-02-ex14",
      "variation_name": "Variasi 14: Bentuk Ekuivalensi Disjungtif Baku Mutu Emisi PLTP (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Dinas Lingkungan Hidup menetapkan standar kepatuhan operasional Pembangkit Listrik Tenaga Panas Bumi (PLTP):\n\n*\"Jika sebuah unit PLTP melepaskan uap geothermal dengan konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm, maka pihak pengelola wajib mengaktifkan sistem penyaring bioscrubber penurun emisi secara seketika.\"*",
      "question_markdown": "Pernyataan berikut yang memiliki nilai kebenaran **ekuivalen (setara secara logika)** dengan standar kepatuhan operasional tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Unit PLTP melepaskan uap geothermal dengan konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm, atau pihak pengelola tidak wajib mengaktifkan sistem penyaring bioscrubber penurun emisi."
        },
        {
          "key": "B",
          "text_markdown": "Unit PLTP tidak melepaskan uap geothermal dengan konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm, ATAU pihak pengelola wajib mengaktifkan sistem penyaring bioscrubber penurun emisi secara seketika."
        },
        {
          "key": "C",
          "text_markdown": "Unit PLTP tidak melepaskan uap geothermal dengan konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm DAN pihak pengelola tidak wajib mengaktifkan sistem penyaring bioscrubber penurun emisi."
        },
        {
          "key": "D",
          "text_markdown": "Jika pihak pengelola mengaktifkan sistem penyaring bioscrubber penurun emisi, maka unit PLTP pasti melepaskan uap geothermal dengan konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm."
        },
        {
          "key": "E",
          "text_markdown": "Pihak pengelola wajib mengaktifkan sistem penyaring bioscrubber jika dan hanya jika konsentrasi gas hidrogen sulfida ($H_2S$) melebihi 10 ppm."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat hukum ekuivalensi disjungtif implikasi material: $p \\implies q \\equiv \\sim p \\lor q$ (\"Bukan p ATAU q\"). Cari opsi yang menegaskan ingkaran anteseden (tidak melebihi 10 ppm) digabung kata 'ATAU' dengan konsekuen asli (wajib mengaktifkan bioscrubber)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Awal:** $p \\implies q$.\n  - $p$: Konsentrasi $H_2S$ melebihi 10 ppm.\n  - $q$: Pengelola wajib mengaktifkan bioscrubber seketika.\n- **Hukum Ekuivalensi Disjungtif:**\n  Dalam tabel kebenaran logika proposisi, sebuah implikasi setara penuh dengan bentuk disjungsi:\n  $$p \\implies q \\equiv \\sim p \\lor q$$\n- **Penerjemahan ke Bahasa Alami:**\n  - $\\sim p$: Unit PLTP tidak melepaskan uap geothermal dengan konsentrasi $H_2S$ melebihi 10 ppm.\n  - $\\lor$: ATAU.\n  - $q$: Pihak pengelola wajib mengaktifkan sistem penyaring bioscrubber penurun emisi secara seketika.\n- **Evaluasi Opsi:** Pilihan **B** adalah bentuk identik dari $\\sim p \\lor q$.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Ekuivalensi Disjungtif: ~p ∨ q):**\n\n1. Implikasi: $P \\implies Q$.\n2. Bentuk setara disjungsi: [TIDAK P] ATAU [Q].\n3. [TIDAK melebihi 10 ppm] ATAU [Wajib mengaktifkan bioscrubber].\n4. Pilihan yang tepat langsung terlihat pada opsi **B**.\n5. Opsi **A** membalik negasi ($p \\lor \\sim q$), opsi **C** memakai 'DAN', opsi **D** adalah konvers ($q \\implies p$).\n6. Jawaban: **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Berbentuk $p \\lor \\sim q$, yang merupakan ekuivalensi dari inversi $\\sim p \\implies \\sim q$.\n- **Pilihan C Salah:** Menggunakan kata hubung konjungsi 'DAN' ($\\sim p \\land \\sim q$), bukan disjungsi.\n- **Pilihan D Salah:** Merupakan bentuk konvers ($q \\implies p$), yaitu membalik urutan tanpa negasi.\n- **Pilihan E Salah:** Mengubah implikasi satu arah menjadi pernyataan biimplikasi ($p \\iff q$)."
    },
    {
      "example_id": "pu-02-02-ex15",
      "variation_name": "Variasi 15: Negasi Proposisi Bersyarat Subsidi Mobil Listrik (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Kementerian Perindustrian menyampaikan klausul kebijakan insentif kendaraan rendah emisi:\n\n*\"Jika produsen kendaraan listrik memproduksi mobil dengan capaian Tingkat Komponen Dalam Negeri (TKDN) minimal 40%, maka konsumen berhak memperoleh potongan Pajak Pertambahan Nilai (PPN) ditanggung pemerintah sebesar 10%.\"*\n\nSebuah asosiasi konsumen mendalilkan bahwa sebuah agen pemegang merek (APM) telah **mengingkari (menegasikan / melanggar)** janji kebijakan tersebut dalam penjualan mobil listrik model terbaru.",
      "question_markdown": "Berdasarkan kaidah logika proposisi formal, kondisi faktual manakah yang **membuktikan secara sah terjadinya pengingkaran (negasi)** terhadap pernyataan kementerian tersebut?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika produsen memproduksi mobil listrik dengan TKDN kurang dari 40%, maka konsumen tidak berhak memperoleh potongan PPN sebesar 10%."
        },
        {
          "key": "B",
          "text_markdown": "Produsen kendaraan listrik memproduksi mobil dengan capaian TKDN minimal 40%, TETAPI konsumen tidak memperoleh potongan Pajak Pertambahan Nilai (PPN) ditanggung pemerintah sebesar 10%."
        },
        {
          "key": "C",
          "text_markdown": "Produsen memproduksi mobil dengan TKDN kurang dari 40% dan konsumen tidak memperoleh potongan PPN ditanggung pemerintah sebesar 10%."
        },
        {
          "key": "D",
          "text_markdown": "Jika konsumen tidak memperoleh potongan PPN 10%, maka produsen pasti memproduksi mobil dengan TKDN kurang dari 40%."
        },
        {
          "key": "E",
          "text_markdown": "Konsumen berhak memperoleh potongan PPN 10% jika dan hanya jika produsen mencapai TKDN minimal 40%."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat rumus negasi kalimat bersyarat 'Jika p maka q':\n$$\\sim(p \\implies q) \\equiv p \\land \\sim q$$\nJanji atau aturan hanya diingkari ketika syarat dipenuhi ($p$), tetapi janjinya TIDAK ditepati ($\\sim q$). Segera eliminasi opsi yang masih diawali kata 'Jika'!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Awal:** $p \\implies q$.\n- **Kaidah Negasi Implikasi:**\n  Implikasi bernilai Salah (diingkari) hanya ketika anteseden Benar dan konsekuen Salah:\n  $$\\sim(p \\implies q) \\equiv p \\land \\sim q$$\n- **Penerjemahan Variabel:**\n  - $p$: Produsen memproduksi mobil dengan capaian TKDN minimal 40%.\n  - $\\land$: TETAPI / DAN.\n  - $\\sim q$: Konsumen tidak memperoleh potongan PPN ditanggung pemerintah sebesar 10%.\n- **Simpulan:** Kondisi faktual yang membuktikan negasi adalah terpenuhinya $p \\land \\sim q$.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Trik Emas Negasi Implikasi: Coret Kata 'Jika'):**\n\n1. Aturan praktis: Negasi dari kalimat \"Jika... maka...\" TIDAK BOLEH memuat kata \"Jika\"!\n2. Langsung coret opsi **A** dan **D** karena masih memakai kata \"Jika\".\n3. Format negasi: [Sebab terjadi, TETAPI janji dilanggar]:\n   \"TKDN minimal 40%, TETAPI konsumen TIDAK dapat potongan PPN 10%\".\n4. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk invers bersyarat baru ($\\sim p \\implies \\sim q$), bukan negasi.\n- **Pilihan C Salah:** Bentuk $\\sim p \\land \\sim q$; jika produsen tidak mencapai TKDN 40% dan konsumen tidak dapat PPN, aturan tidak dilanggar sama sekali.\n- **Pilihan D Salah:** Merupakan bentuk kontraposisi yang ekuivalen ($\\sim q \\implies \\sim p$), bukan ingkaran.\n- **Pilihan E Salah:** Mengubah implikasi menjadi biimplikasi ($q \\iff p$)."
    },
    {
      "example_id": "pu-02-02-ex16",
      "variation_name": "Variasi 16: Kontraposisi Implikasi Majemuk Ritme Sirkadian Pekerja Shift (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Pakar kedokteran okupasi merumuskan kaidah implikasi kesehatan pekerja shift malam:\n\n*\"Jika pekerja pabrik rotasi malam bekerja lembur lebih dari 12 jam per shift ATAU tidak memperoleh jeda tidur pemulihan minimal 8 jam, maka pekerja tersebut mengalami gangguan ritme sirkadian hormon kortisol DAN penurunan konsentrasi kognitif saat bertugas.\"*",
      "question_markdown": "Manakah pernyataan berikut yang merupakan **kontraposisi yang ekuivalen (pasti benar)** dengan kaidah implikasi kesehatan di atas?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Jika pekerja pabrik rotasi malam tidak mengalami gangguan ritme sirkadian hormon kortisol ATAU tidak mengalami penurunan konsentrasi kognitif saat bertugas, maka pekerja tersebut dipastikan tidak bekerja lembur lebih dari 12 jam per shift DAN memperoleh jeda tidur pemulihan minimal 8 jam."
        },
        {
          "key": "B",
          "text_markdown": "Jika pekerja pabrik rotasi malam tidak bekerja lembur lebih dari 12 jam per shift dan memperoleh jeda tidur pemulihan minimal 8 jam, maka pekerja tersebut tidak mengalami gangguan hormon kortisol dan tidak mengalami penurunan konsentrasi."
        },
        {
          "key": "C",
          "text_markdown": "Jika pekerja pabrik rotasi malam tidak mengalami gangguan ritme sirkadian hormon kortisol DAN tidak mengalami penurunan konsentrasi kognitif, maka pekerja tersebut tidak bekerja lembur lebih dari 12 jam ATAU memperoleh jeda tidur 8 jam."
        },
        {
          "key": "D",
          "text_markdown": "Jika pekerja pabrik rotasi malam mengalami gangguan ritme sirkadian hormon kortisol dan penurunan konsentrasi kognitif, maka pekerja tersebut pasti bekerja lembur lebih dari 12 jam per shift."
        },
        {
          "key": "E",
          "text_markdown": "Pekerja pabrik rotasi malam mengalami gangguan ritme sirkadian hormon kortisol jika dan hanya jika bekerja lembur lebih dari 12 jam per shift."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan hukum kontraposisi implikasi: $A \\implies B \\equiv \\sim B \\implies \\sim A$.\nDi sini $A = (p \\lor q)$ dan $B = (r \\land s)$.\nBerdasarkan Hukum De Morgan:\n1. $\\sim B = \\sim(r \\land s) \\equiv \\sim r \\lor \\sim s$ (kata 'DAN' berubah jadi 'ATAU').\n2. $\\sim A = \\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$ (kata 'ATAU' berubah jadi 'DAN').\nGabungkan keduanya: $(\\sim r \\lor \\sim s) \\implies (\\sim p \\land \\sim q)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Awal:** $(p \\lor q) \\implies (r \\land s)$.\n- **Kaidah Kontraposisi Formal:**\n  $$\\sim(r \\land s) \\implies \\sim(p \\lor q)$$\n- **Aplikasi Hukum De Morgan:**\n  - Negasi dari konjungsi $(r \\land s)$ adalah: $\\sim r \\lor \\sim s$.\n    *(Tidak mengalami gangguan kortisol ATAU tidak mengalami penurunan konsentrasi)*.\n  - Negasi dari disjungsi $(p \\lor q)$ adalah: $\\sim p \\land \\sim q$.\n    *(Tidak lembur $> 12$ jam DAN memperoleh jeda tidur $\\ge 8$ jam)*.\n- **Bentuk Akhir Kontraposisi Ekuivalen:**\n  $$(\\sim r \\lor \\sim s) \\implies (\\sim p \\land \\sim q)$$\n- **Evaluasi Opsi:** Pilihan **A** menyusun kontraposisi ganda dan hukum De Morgan dengan ketepatan $100\\%$.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Trik De Morgan Bolak-Balik pada Kontraposisi):**\n\n1. Aturan kontraposisi: Balik posisi dan negasikan kedua bagian.\n2. Bagian belakang $(r \\land s)$ pindah ke depan: 'DAN' WAJIB jadi 'ATAU' $\\implies$ (Tidak r ATAU Tidak s).\n3. Bagian depan $(p \\lor q)$ pindah ke belakang: 'ATAU' WAJIB jadi 'DAN' $\\implies$ (Tidak p DAN Tidak q).\n4. Cari opsi yang memuat struktur: [Tidak r ATAU Tidak s] $\\implies$ [Tidak p DAN Tidak q].\n5. Struktur ini hanya ada pada pilihan **A**.\n6. Opsi **C** keliru menukar operator De Morgan.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Merupakan bentuk inversi $\\sim(p \\lor q) \\implies \\sim(r \\land s)$, yang tidak ekuivalen.\n- **Pilihan C Salah:** Menggunakan kata 'DAN' pada anteseden dan 'ATAU' pada konsekuen (kacau menerapkan De Morgan).\n- **Pilihan D Salah:** Merupakan bentuk konversi $(r \\land s) \\implies p$, yang melakukan sesat pikir *affirming the consequent*.\n- **Pilihan E Salah:** Mengubah implikasi majemuk menjadi biimplikasi sepihak."
    },
    {
      "example_id": "pu-02-02-ex17",
      "variation_name": "Variasi 17: Hukum De Morgan pada Negasi Sel Robotik Manufaktur (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Spesifikasi keselamatan sistem otomasi robotik lini manufaktur menetapkan klausul operasional:\n\n*\"Sel robot pengelasan beroperasi aktif dalam kecepatan tinggi jika dan hanya jika memenuhi kondisi: Pintu pengaman pelindung tertutup rapat DAN sensor tirai cahaya inframerah tidak mendeteksi objek asing.\"*\n\nSeorang teknisi keselamatan industri ingin membuktikan secara deduktif bahwa sel robot pengelasan **TIDAK beroperasi aktif dalam kecepatan tinggi**.",
      "question_markdown": "Berdasarkan hukum De Morgan dalam logika matematika, kondisi faktual manakah yang **secara niscaya membuktikan** status sel robot tidak beroperasi aktif ($\\sim A$)?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pintu pengaman pelindung tidak tertutup rapat DAN sensor tirai cahaya inframerah mendeteksi adanya objek asing."
        },
        {
          "key": "B",
          "text_markdown": "Pintu pengaman pelindung tertutup rapat, tetapi sensor tirai cahaya inframerah tidak mendeteksi objek asing."
        },
        {
          "key": "C",
          "text_markdown": "Pintu pengaman pelindung tidak tertutup rapat ATAU sensor tirai cahaya inframerah mendeteksi adanya objek asing."
        },
        {
          "key": "D",
          "text_markdown": "Jika pintu pengaman pelindung tertutup rapat, maka sensor tirai cahaya mendeteksi objek asing."
        },
        {
          "key": "E",
          "text_markdown": "Pintu pengaman pelindung tertutup rapat atau sensor inframerah tidak mendeteksi objek asing."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Cermati relasi target: $\\sim A \\iff \\sim(p \\land q)$.\nMenurut Hukum De Morgan, negasi dari konjungsi $(p \\land q)$ adalah disjungsi dari masing-masing negasinya:\n$$\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$$\nKata 'DAN' harus berubah menjadi 'ATAU'! Pilihlah opsi yang memuat Bukan $p$ ATAU Bukan $q$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Awal:** $A \\iff (p \\land q)$.\n- **Target Penyelidikan:** Menentukan kondisi yang setara dengan $\\sim A$.\n  - Berdasarkan kaidah biimplikasi: $\\sim A \\iff \\sim(p \\land q)$.\n- **Aplikasi Hukum De Morgan pada Negasi Konjungsi:**\n  $$\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$$\n- **Penerjemahan Variabel:**\n  - $\\sim p$: Pintu pengaman pelindung tidak tertutup rapat (terbuka).\n  - $\\lor$: ATAU.\n  - $\\sim q$: Sensor tirai cahaya inframerah mendeteksi adanya objek asing.\n- **Simpulan:** Kondisi niscaya yang membuktikan sel robot tidak beroperasi aktif ($\\sim A$) adalah terpenuhinya $\\sim p \\lor \\sim q$.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Hukum De Morgan: 'DAN' Dinegasikan Jadi 'ATAU'):**\n\n1. Rumus De Morgan: $\\sim(P \\land Q) \\equiv \\sim P \\lor \\sim Q$.\n2. Kata penghubung wajib berubah dari 'DAN' menjadi 'ATAU'.\n3. Cek opsi:\n   - Opsi **A** masih memakai 'DAN' $\\implies$ SALAH!\n   - Opsi **C** memakai 'ATAU' dengan negasi kedua unsur (Pintu terbuka ATAU sensor mendeteksi objek) $\\implies$ BENAR!\n4. Jawaban: **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan perangkai 'DAN' ($\\sim p \\land \\sim q$); ini adalah syarat yang terlalu sempit karena jika salah satu saja terjadi, robot sudah berhenti.\n- **Pilihan B Salah:** Memenuhi kondisi $p \\land q$ yang justru membuat robot beroperasi aktif ($A = \\text{Benar}$).\n- **Pilihan D Salah:** Merupakan bentuk implikasi yang tidak setara dengan disjungsi De Morgan.\n- **Pilihan E Salah:** Mempertahankan bentuk afirmasi $p \\lor q$ alih-alih menegasikan kedua proposisinya."
    },
    {
      "example_id": "pu-02-02-ex18",
      "variation_name": "Variasi 18: Negasi Implikasi Anteseden Konjungtif Pelestarian Dialek Lokal (Level: Sulit / HOTS)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Balai Bahasa dan Majelis Adat Kepulauan mendeklarasikan komitmen pelestarian bahasa ibu:\n\n*\"Jika pemerintah daerah mewajibkan pengajaran dialek bahasa lokal dalam kurikulum muatan lokal sekolah dasar DAN keluarga penutur asli aktif bertutur menggunakan bahasa ibu di ruang domestik keluarga, maka daya hidup dialek bahasa lokal tersebut tidak akan punah dalam generasi mendatang.\"*\n\nSebuah lembaga riset sosiolinguistik independen menemukan bukti bahwa komitmen deklarasi tersebut telah **diingkari / dinegasikan (terbukti tidak berlaku)** dalam kasus kepunahan dialek Talaud Kuno.",
      "question_markdown": "Berdasarkan kaidah logika proposisi matematika, kondisi faktual manakah yang **membuktikan secara sah terjadinya pengingkaran (negasi)** terhadap deklarasi pelestarian bahasa tersebut?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pemerintah daerah tidak mewajibkan pengajaran dialek bahasa lokal atau keluarga tidak bertutur bahasa ibu di rumah, dan dialek tersebut mengalami kepunahan."
        },
        {
          "key": "B",
          "text_markdown": "Jika dialek bahasa lokal punah dalam generasi mendatang, maka pemerintah daerah tidak mewajibkan kurikulum bahasa lokal atau keluarga tidak aktif bertutur."
        },
        {
          "key": "C",
          "text_markdown": "Pemerintah daerah mewajibkan pengajaran dialek lokal dalam kurikulum sekolah dasar DAN keluarga penutur asli aktif bertutur bahasa ibu di rumah, TETAPI dialek bahasa lokal tersebut tetap mengalami kepunahan dalam generasi mendatang."
        },
        {
          "key": "D",
          "text_markdown": "Jika pemerintah daerah tidak mewajibkan kurikulum dialek lokal, maka dialek tersebut dipastikan punah."
        },
        {
          "key": "E",
          "text_markdown": "Pengajaran kurikulum di sekolah dasar merupakan satu-satunya cara mutlak untuk menyelamatkan seluruh dialek bahasa di Indonesia."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan rumus baku negasi implikasi: $\\sim(A \\implies B) \\equiv A \\land \\sim B$.\nDi sini $A = (p \\land q)$ dan $B = r$.\nMaka negasinya adalah: $(p \\land q) \\land \\sim r$.\nArtinya: Kurikulum lokal diwajibkan DAN keluarga aktif bertutur ($A$ terpenuhi), TETAPI dialek lokal tersebut TETAP PUNAH ($\\sim r$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formula Deklarasi Awal:** $(p \\land q) \\implies r$.\n  - $A = (p \\land q)$: Kurikulum muatan lokal diwajibkan ($p$) dan keluarga aktif bertutur di rumah ($q$).\n  - $B = r$: Dialek lokal tidak punah.\n- **Kaidah Logika Negasi Implikasi:**\n  - Suatu implikasi bersyarat $A \\implies B$ hanya diingkari saat anteseden $A$ benar-benar terlaksana tetapi janji konsekuen $B$ dilanggar (bernilai Salah, yaitu $\\sim B$):\n    $$\\sim(A \\implies B) \\equiv A \\land \\sim B$$\n- **Substitusi Simbolik:**\n  $$\\sim([(p \\land q) \\implies r]) \\equiv (p \\land q) \\land \\sim r$$\n- **Penerjemahan Bahasa Kontekstual:**\n  - Kurikulum lokal diwajibkan DAN keluarga aktif bertutur ($p \\land q$ terlaksana),\n  - **TETAPI** dialek bahasa lokal tersebut tetap punah ($\\sim r$).\n- **Evaluasi Opsi:** Pilihan **C** secara sempurna memetakan kondisi $(p \\land q) \\land \\sim r$.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Rumus Negasi Implikasi: Anteseden Tetap, Konsekuen Diingkari):**\n\n1. Singkirkan opsi bersyarat yang diawali kata \"Jika\" (Opsi **B** dan **D** langsung gugur!).\n2. Ingat struktur pengingkaran janji: [Syarat dilakukan lengkap, tapi hasil tetap gagal].\n3. Syarat lengkap: Kurikulum diwajibkan DAN keluarga bertutur di rumah.\n4. Hasil ingkar: TETAPI dialek tetap punah.\n5. Opsi yang menyajikan kalimat ini secara utuh adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bentuk $\\sim(p \\land q) \\land \\sim r$; jika syarat tidak dijalankan lalu bahasa punah, deklarasi tidak terbukti dilanggar (*vacuously true*).\n- **Pilihan B Salah:** Merupakan bentuk kontraposisi ekuivalen ($\\sim r \\implies \\sim(p \\land q)$), bukan negasi.\n- **Pilihan D Salah:** Merupakan bentuk inversi bersyarat spekulatif.\n- **Pilihan E Salah:** Klaim mutlak di luar kerangka pengujian logika proposisi."
    }
  ]
};
