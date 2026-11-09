import type { Material } from '../../../types/material';

export const MATERIAL_PU_02_03: Material = {
  "metadata": {
    "id": "pu-2-3",
    "subtest": "PU",
    "chapter_num": 2,
    "chapter_title": "Penalaran Deduktif",
    "subchapter_num": "2.3",
    "subchapter_title": "Penarikan Kesimpulan (Modus Ponens, Modus Tollens, Silogisme)",
    "title": "Penarikan Kesimpulan (Modus Ponens, Modus Tollens, Silogisme)",
    "required_question_variations": [
      "Penarikan Kesimpulan Rantai Silogisme Multi-Premis",
      "Deteksi Fallacy / Evaluasi Validitas Penarikan Kesimpulan",
      "Penarikan Kesimpulan Premis Majemuk Campuran (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-09"
  },
  "content": {
    "tactical_overview": "Penarikan kesimpulan deduktif adalah proses menurunkan kesimpulan baru yang mutlak benar dari sekumpulan premis yang dianggap benar, menggunakan kaidah logika formal: Modus Ponens, Modus Tollens, dan Silogisme. Kunci utama dalam menyelesaikan soal tipe ini di UTBK SNBT adalah menyelaraskan arah rantai implikasi menggunakan hukum kontraposisi sebelum menyambungkannya, serta selalu waspada terhadap dua sesat pikir klasik: menegaskan konsekuen (mengira p → q dan q menghasilkan p) dan menyangkal anteseden (mengira p → q dan ~p menghasilkan ~q).",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nPenarikan kesimpulan deduktif merupakan inti dari pengujian penalaran umum UTBK SNBT. Dalam logika deduktif, kebenaran kesimpulan bersifat **pasti mutlak (valid)** asalkan premis-premis yang mendasarinya bernilai benar dan aturan penarikan kesimpulannya sah secara hukum logika formal. Anda tidak diperkenankan memasukkan asumsi pribadi di luar informasi yang diberikan pada premis soal.\n\nTiga kaidah baku penarikan kesimpulan yang wajib Anda kuasai adalah:\n\n1. **Modus Ponens (Kaidah Menegaskan Sebab / Anteseden)**  \n   - Premis 1: $p \\rightarrow q$ *(Jika $p$, maka $q$)*  \n   - Premis 2: $p$ *(Fakta: $p$ benar-benar terjadi)*  \n   - **Kesimpulan Sah:** $\\therefore q$ *(Maka pasti $q$ terjadi)*  \n   *Contoh:* Jika hari hujan ($p$), maka jalanan basah ($q$). Hari ini hujan ($p$). Simpulan pasti: jalanan basah ($q$).\n\n2. **Modus Tollens (Kaidah Menyangkal Akibat / Konsekuen)**  \n   - Premis 1: $p \\rightarrow q$ *(Jika $p$, maka $q$)*  \n   - Premis 2: $\\sim q$ *(Fakta: akibat $q$ tidak terjadi)*  \n   - **Kesimpulan Sah:** $\\therefore \\sim p$ *(Maka pasti sebab $p$ tidak terjadi)*  \n   *Contoh:* Jika hari hujan ($p$), maka jalanan basah ($q$). Jalanan tidak basah ($\\sim q$). Simpulan pasti: hari tidak hujan ($\\sim p$).\n\n3. **Silogisme Hipotetis (Kaidah Rantai Implikasi Transitif)**  \n   - Premis 1: $p \\rightarrow q$  \n   - Premis 2: $q \\rightarrow r$  \n   - **Kesimpulan Sah:** $\\therefore p \\rightarrow r$ *(atau kontraposisinya: $\\sim r \\rightarrow \\sim p$)*  \n   Jika disambung dengan fakta ketiga bahwa $p$ terjadi, maka kesimpulan akhirnya adalah $r$.\n\n4. **Silogisme Disjungtif (Kaidah Eliminasi Pilihan)**  \n   - Premis 1: $p \\lor q$ *($p$ atau $q$)*  \n   - Premis 2: $\\sim p$ *(Fakta: $p$ terbukti tidak terjadi)*  \n   - **Kesimpulan Sah:** $\\therefore q$ *(Maka alternatif $q$ pasti terjadi)*\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\nSoal UTBK sering menyajikan opsi jawaban yang sekilas tampak sangat logis, padahal merupakan sesat pikir formal (*formal logical fallacies*):\n\n1. **Jebakan Menegaskan Konsekuen (*Affirming the Consequent*)**  \n   - Diberikan premis: $p \\rightarrow q$ dan fakta: $q$ terjadi.  \n   - Siswa sering terkecoh menyimpulkan bahwa $p$ pasti terjadi.  \n   - **Fakta Logika:** Kesimpulan ini **TIDAK SAH**. Akibat ($q$) bisa saja terjadi karena penyebab lain yang tidak disebutkan di dalam wacana. Simpulan yang benar adalah: *Belum tentu $p$ terjadi* atau *Tidak dapat ditarik simpulan pasti*.\n2. **Jebakan Menyangkal Anteseden (*Denying the Antecedent*)**  \n   - Diberikan premis: $p \\rightarrow q$ dan fakta: $\\sim p$ terjadi.  \n   - Siswa sering terkecoh menyimpulkan bahwa $\\sim q$ pasti terjadi.  \n   - **Fakta Logika:** Kesimpulan ini **TIDAK SAH**. Ketiadaan $p$ tidak menjamin $q$ batal terjadi, karena ada kemungkinan jalur pemicu lainnya.\n3. **Jebakan Rantai Panah Terbalik pada Silogisme**  \n   Pembuat soal memberikan premis: $p \\rightarrow q$ dan $r \\rightarrow q$. Siswa yang ceroboh langsung menyimpulkan $p \\rightarrow r$. Ini salah besar karena kedua panah sama-sama mengarah ke $q$ sehingga jembatannya buntu. Untuk menyambung rantai, ujung akibat premis pertama harus menjadi pangkal sebab premis kedua.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\nTerapkan algoritma eksekusi cepat berikut saat menghadapi soal silogisme dan penarikan kesimpulan:\n\n1. **Metode Coret Jembatan Simbolik**  \n   Tuliskan kode huruf singkat: $A \\rightarrow B$ dan $B \\rightarrow C$. Jika huruf di ujung kanan sama persis dengan huruf di pangkal kiri premis berikutnya, langsung coret huruf jembatan ($B$) tersebut. Sambungkan huruf awal ke huruf akhir: $A \\rightarrow C$.\n2. **Putar Kontraposisi Bila Jembatan Tidak Pas**  \n   Jika variabel yang sama berada di posisi yang berlawanan arah panah, ubah salah satu premis menjadi bentuk kontraposisinya terlebih dahulu sebelum menyambungkan rantai silogisme.\n3. **Uji Validitas Cepat Ponens vs Tollens**  \n   - Jika fakta mengafirmasi sisi kiri ($p$) $\\rightarrow$ **SAH (Modus Ponens)** menghasilkan $q$.  \n   - Jika fakta menyangkal sisi kanan ($\\sim q$) $\\rightarrow$ **SAH (Modus Tollens)** menghasilkan $\\sim p$.  \n   - Jika fakta menyangkal sisi kiri ($\\sim p$) atau mengafirmasi sisi kanan ($q$) $\\rightarrow$ **SESAT PIKIR**, kesimpulannya adalah *\"Belum tentu\"* atau *\"Tidak dapat disimpulkan\"*.\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Materi:** Penarikan kesimpulan deduktif menurunkan konklusi yang pasti benar secara matematis berdasarkan keabsahan bentuk argumen.\n- **Tiga Aturan Valid:**  \n  1. Modus Ponens: $p \\rightarrow q$ dan $p \\vdash q$  \n  2. Modus Tollens: $p \\rightarrow q$ dan $\\sim q \\vdash \\sim p$  \n  3. Silogisme: $p \\rightarrow q$ dan $q \\rightarrow r \\vdash p \\rightarrow r$\n- **Dua Bentuk Sesat Pikir (Fallacies):** Menegaskan konsekuen ($q \\vdash p$) dan menyangkal anteseden ($\\sim p \\vdash \\sim q$) tidak pernah menghasilkan kesimpulan pasti.\n- **Strategi Eksekusi:** Gunakan simbolik huruf, putar kontraposisi bila rantai terbalik, dan langsung eliminasi opsi yang terjebak sesat pikir.\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Penarikan Kesimpulan yang rutin diujikan dalam UTBK SNBT, lengkap dengan konteks premis, opsi pilihan ganda utuh, kunci jawaban, dan pembahasan logika terperinci:\n\n### Variasi 1: Penarikan Kesimpulan Rantai Silogisme Multi-Premis\n\n> **Konteks Wacana Soal:**  \n> Perhatikan rangkaian premis kebijakan pangan berikut:  \n> (1) Jika produksi padi nasional meningkat melimpah, maka ketersediaan stok beras di gudang logistik negara terjamin aman.  \n> (2) Jika ketersediaan stok beras di gudang logistik negara terjamin aman, maka pemerintah tidak perlu melakukan impor beras dari luar negeri.  \n> (3) Pada musim panen raya tahun ini, produksi padi nasional terbukti meningkat melimpah.  \n>  \n> **Pertanyaan UTBK:** *Simpulan yang paling tepat dan sah secara logika deduktif berdasarkan rangkaian premis tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Pemerintah tetap melakukan impor beras dari luar negeri untuk cadangan darurat.  \n> - **B.** Pemerintah tidak perlu melakukan impor beras dari luar negeri.  \n> - **C.** Ketersediaan stok beras di gudang logistik negara belum tentu terjamin aman.  \n> - **D.** Produksi padi nasional yang melimpah disebabkan oleh ketiadaan kebijakan impor beras.  \n> - **E.** Pemerintah tidak perlu mengawasi harga beras di pasar tradisional.\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Pemodelan Simbolik:**  \n  - $P$ = Produksi padi nasional meningkat melimpah  \n  - $Q$ = Ketersediaan stok beras di gudang logistik negara terjamin aman  \n  - $R$ = Pemerintah tidak perlu melakukan impor beras dari luar negeri  \n- **Langkah Deduksi 1 (Silogisme Hipotetis):**  \n  Premis 1: $P \\rightarrow Q$  \n  Premis 2: $Q \\rightarrow R$  \n  Berdasarkan kaidah Silogisme Hipotetis, jembatan $Q$ dicoret sehingga menghasilkan kesimpulan transitif:  \n  $P \\rightarrow R$  \n  *(Jika produksi padi nasional meningkat melimpah, maka pemerintah tidak perlu melakukan impor beras dari luar negeri)*.\n- **Langkah Deduksi 2 (Modus Ponens):**  \n  Premis Transitif: $P \\rightarrow R$  \n  Premis 3 (Fakta): $P$ terbukti terjadi.  \n  Berdasarkan kaidah Modus Ponens: $(P \\rightarrow R) \\land P \\vdash R$.  \n  Maka kesimpulan akhir yang mutlak benar adalah $R$, yaitu: *\"Pemerintah tidak perlu melakukan impor beras dari luar negeri\"*.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Bertentangan langsung dengan hasil deduksi logis $R$.  \n  - **Pilihan C Salah:** Mengingkari premis 1 yang sudah mengaitkan secara pasti antara produksi melimpah dengan stok terjamin.  \n  - **Pilihan D Salah:** Membalik alur kausalitas secara keliru (*reverse causality*).  \n  - **Pilihan E Salah:** Membicarakan pengawasan harga beras yang berada di luar konteks wacana (*out of scope*).\n- **Penerapan Trik Cepat (15 Detik):** Coret jembatan kalimat yang berulang: *stok beras terjamin*. Rantai langsung menghubungkan: *produksi melimpah $\\rightarrow$ tidak perlu impor*. Karena produksi melimpah benar-benar terjadi, langsung simpulkan: *pemerintah tidak perlu impor beras*. Jawaban yang tepat adalah pilihan **B**.\n\n---\n\n### Variasi 2: Deteksi Fallacy / Evaluasi Validitas Penarikan Kesimpulan\n\n> **Konteks Wacana Soal:**  \n> Perhatikan pedoman apresiasi atlet berprestasi dan fakta berikut:  \n> Premis 1: Jika seorang atlet berhasil memenangkan medali emas di ajang olimpiade internasional, maka atlet tersebut berhak menerima tunjangan hari tua seumur hidup dari kementerian pemuda dan olahraga.  \n> Premis 2: Atlet angkat besi nasional bernama Rudi resmi menerima tunjangan hari tua seumur hidup dari kementerian pemuda dan olahraga.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan kaidah logika formal deduktif, manakah simpulan yang paling tepat mengenai Rudi?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Rudi pasti telah memenangkan medali emas di ajang olimpiade internasional.  \n> - **B.** Rudi tidak pernah memenangkan medali emas di ajang olimpiade internasional.  \n> - **C.** Rudi belum tentu telah memenangkan medali emas di ajang olimpiade internasional.  \n> - **D.** Semua atlet yang menerima tunjangan hari tua dari kementerian pasti peraih medali emas olimpiade.  \n> - **E.** Kementerian pemuda dan olahraga melanggar aturan pemberian tunjangan hari tua kepada Rudi.\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Bentuk Logika Argumen:**  \n  - Premis 1: $E \\rightarrow T$  \n    di mana $E$ = Memenangkan medali emas olimpiade, $T$ = Menerima tunjangan hari tua seumur hidup.  \n  - Premis 2: $T$ terjadi pada Rudi *(Rudi menerima tunjangan hari tua)*.\n- **Pendeteksian Cacat Logika (*Formal Fallacy*):**  \n  Premis 2 mengafirmasi bagian **konsekuen ($T$)**. Menyimpulkan bahwa Rudi pasti peraih medali emas ($E$) merupakan sesat pikir formal yang disebut **Affirming the Consequent**.  \n  Dalam kaidah logika bersyarat, memenangkan medali emas hanyalah salah satu syarat cukup (*sufficient condition*). Rudi bisa saja menerima tunjangan hari tua karena memecahkan rekor dunia, menjuarai kejuaraan dunia multi-cabang, atau memperoleh penghargaan pengabdian seumur hidup lainnya yang juga diatur oleh regulasi kementerian.  \n  Oleh karena itu, status apakah Rudi pernah memenangkan medali emas olimpiade adalah **belum tentu benar** (berada pada taraf kemungkinan, bukan kepastian deduktif).\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Terjebak sesat pikir *affirming the consequent* dengan memastikan hal yang belum terbukti.  \n  - **Pilihan B Salah:** Mengambil kesimpulan sebaliknya tanpa dasar bukti yang valid.  \n  - **Pilihan D Salah:** Merupakan generalisasi yang keliru dari penegasan konsekuen.  \n  - **Pilihan E Salah:** Bersifat menghakimi dan menuduh pelanggaran aturan tanpa didasari oleh premis teks.\n- **Penerapan Trik Cepat (15 Detik):** Periksa letak informasi fakta Rudi: Rudi menerima tunjangan (posisi di belakang / ruas kanan implikasi). Mengafirmasi ruas kanan adalah jebakan terlarang dalam logika! Jika ruas kanan diafirmasi, status ruas kiri otomatis menjadi *\"Belum tentu\"*. Pilihan yang tepat adalah pilihan **C**.\n\n---\n\n### Variasi 3: Penarikan Kesimpulan Premis Majemuk Campuran & Kontraposisi Rantai (HOTS)\n\n> **Konteks Wacana Soal:**  \n> Dewan Direksi sebuah konsorsium teknologi mengevaluasi tiga premis operasional berikut:  \n> (1) Jika sebuah perusahaan rintisan (*startup*) berhasil mencatatkan arus kas positif, maka valuasi modal perusahaan akan melonjak drastis atau perusahaan mampu merekrut talenta kecerdasan buatan (*AI*) terbaik dunia.  \n> (2) Jika perusahaan mampu merekrut talenta kecerdasan buatan (*AI*) terbaik dunia, maka produk perangkat lunak yang dirilis akan memenangkan penghargaan inovasi teknologi global.  \n> (3) Berdasarkan laporan audit akhir tahun, tercatat fakta bahwa valuasi modal perusahaan rintisan tersebut tidak melonjak drastis dan produk perangkat lunak yang dirilis tidak memenangkan penghargaan inovasi teknologi global.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan ketiga premis tersebut, simpulan yang PASTI BENAR secara kaidah logika deduktif adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Perusahaan rintisan tersebut berhasil mencatatkan arus kas positif melalui efisiensi biaya operasional.  \n> - **B.** Perusahaan rintisan tersebut tidak berhasil mencatatkan arus kas positif.  \n> - **C.** Perusahaan rintisan tersebut mampu merekrut talenta kecerdasan buatan terbaik dunia meskipun valuasinya tidak melonjak.  \n> - **D.** Valuasi modal perusahaan akan melonjak drastis pada tahun operasional berikutnya.  \n> - **E.** Tidak dapat ditarik simpulan apa pun karena laporan audit akhir tahun saling bertentangan.\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Pemodelan Simbolik Logika:**  \n  - $K$: Perusahaan berhasil mencatatkan arus kas positif  \n  - $V$: Valuasi modal perusahaan melonjak drastis  \n  - $T$: Perusahaan mampu merekrut talenta AI terbaik dunia  \n  - $I$: Produk perangkat lunak memenangkan penghargaan inovasi global  \n- **Rangkaian Premis:**  \n  - Premis 1: $K \\rightarrow (V \\lor T)$  \n  - Premis 2: $T \\rightarrow I$  \n  - Premis 3 (Fakta Audit): $\\sim V \\land \\sim I$ *(Valuasi TIDAK melonjak dan produk TIDAK menang penghargaan)*.\n- **Langkah Deduksi Terpadu:**  \n  1. Dari fakta $\\sim I$ dan Premis 2 ($T \\rightarrow I$), terapkan **Modus Tollens**:  \n     $(T \\rightarrow I) \\land \\sim I \\vdash \\sim T$  \n     Artinya, perusahaan dipastikan **tidak mampu merekrut talenta AI terbaik dunia** ($\\sim T$).  \n  2. Gabungkan kesimpulan $\\sim T$ dengan fakta audit $\\sim V$ yang sudah ada:  \n     $\\sim V \\land \\sim T$  \n  3. Berdasarkan **Hukum De Morgan**, konjungsi penyangkalan setara dengan ingkaran disjungsi:  \n     $\\sim V \\land \\sim T \\equiv \\sim (V \\lor T)$  \n     Artinya, seluruh blok konsekuen pada Premis 1 terbukti bernilai **SALAH**.  \n  4. Sekarang, terapkan **Modus Tollens** pada Premis 1:  \n     - Premis 1: $K \\rightarrow (V \\lor T)$  \n     - Fakta: $\\sim (V \\lor T)$  \n     - Konklusi Sah: $\\therefore \\sim K$  \n  5. Konklusi $\\sim K$ berarti: **\"Perusahaan rintisan tersebut tidak berhasil mencatatkan arus kas positif\"**.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Bertentangan secara mutlak dengan hasil pembuktian deduktif $\\sim K$.  \n  - **Pilihan C Salah:** Gugur karena langkah pertama membuktikan bahwa perusahaan tidak mampu merekrut talenta AI ($\\sim T$).  \n  - **Pilihan D Salah:** Bersifat ramalan masa depan yang tidak terdapat dalam premis wacana (*out of scope*).  \n  - **Pilihan E Salah:** Premis-premis logis tersebut sepenuhnya konsisten dan menghasilkan simpulan pasti $\\sim K$.\n- **Penerapan Trik Cepat (15 Detik):**  \n  1. Perhatikan bahwa produk tidak menang penghargaan ($\\sim I$), maka lewat premis 2 perusahaan pasti tidak merekrut talenta AI ($\\sim T$).  \n  2. Karena valuasi juga tidak naik ($\\sim V$), maka kedua syarat cabang $(V \\lor T)$ sama-sama gugur menjadi salah.  \n  3. Konsekuen premis 1 gugur, maka lewat Modus Tollens, sebabnya wajib gugur: arus kas tidak positif. Jawaban yang tepat adalah pilihan **B**.",
    "visualizations_svg": [],
    "distractor_traps": [
      "Affirming the Consequent: Mengira penegasan akibat (q) dapat menyimpulkan terjadinya sebab (p), padahal statusnya belum tentu benar.",
      "Denying the Antecedent: Mengira penyangkalan sebab (~p) otomatis menggugurkan akibat (~q), padahal akibat bisa timbul dari pemicu lain.",
      "Rantai Panah Buntu: Menghubungkan dua implikasi yang memiliki variabel sama namun tidak sejajar arah panahnya tanpa melakukan kontraposisi terlebih dahulu."
    ],
    "quick_execution_algorithm": [
      "Ubah premis verbal ke dalam notasi simbolik (p -> q, q -> r) untuk memetakan alur deduksi.",
      "Lakukan silogisme hipotetis dengan mencoret variabel jembatan yang sama di ujung akibat dan pangkal sebab.",
      "Jika posisi variabel belum searah, balikkan salah satu premis menggunakan hukum kontraposisi (~q -> ~p).",
      "Cocokkan fakta akhir: afirmasi ruas kiri = Modus Ponens (sah); sangkal ruas kanan = Modus Tollens (sah); selain itu = belum tentu."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-02-03-ex1",
      "variation_name": "Variasi 1: Penarikan Kesimpulan Rantai Silogisme Multi-Premis (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan rangkaian premis kebijakan pangan berikut:\n\n(1) Jika produksi padi nasional meningkat melimpah, maka ketersediaan stok beras di gudang logistik negara terjamin aman.\n(2) Jika ketersediaan stok beras di gudang logistik negara terjamin aman, maka pemerintah tidak perlu melakukan impor beras dari luar negeri.\n(3) Pada musim panen raya tahun ini, produksi padi nasional terbukti meningkat melimpah.",
      "question_markdown": "Simpulan yang **paling tepat dan sah secara logika deduktif** berdasarkan rangkaian premis tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pemerintah tetap melakukan impor beras dari luar negeri untuk cadangan darurat."
        },
        {
          "key": "B",
          "text_markdown": "Pemerintah tidak perlu melakukan impor beras dari luar negeri."
        },
        {
          "key": "C",
          "text_markdown": "Ketersediaan stok beras di gudang logistik negara belum tentu terjamin aman."
        },
        {
          "key": "D",
          "text_markdown": "Produksi padi nasional yang melimpah disebabkan oleh ketiadaan kebijakan impor beras."
        },
        {
          "key": "E",
          "text_markdown": "Pemerintah tidak perlu mengawasi harga beras di pasar tradisional."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Sambungkan rantai implikasi: `Padi melimpah → Stok aman` dan `Stok aman → Tidak perlu impor`. Coret jembatan \"stok aman\", sehingga didapat `Padi melimpah → Tidak perlu impor`. Karena padi melimpah benar-benar terjadi, gunakan Modus Ponens!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Simbolik:**\n  - $P$: Produksi padi nasional meningkat melimpah\n  - $Q$: Ketersediaan stok beras terjamin aman\n  - $R$: Pemerintah tidak perlu impor beras\n- **Deduksi 1 (Silogisme Hipotetis):**\n  $(P \\rightarrow Q) \\land (Q \\rightarrow R) \\vdash P \\rightarrow R$\n- **Deduksi 2 (Modus Ponens):**\n  $(P \\rightarrow R) \\land P \\vdash R$\n- **Konklusi:** $R$ (Pemerintah tidak perlu melakukan impor beras dari luar negeri).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Coret Jembatan Silogisme):**\n\n1. Coret frase penghubung yang sama: *\"stok beras di gudang logistik terjamin aman\"*.\n2. Sambungan langsung: *\"Jika produksi padi melimpah, maka tidak perlu impor\"*.\n3. Karena fakta panen raya padi melimpah, maka simpulan langsungnya: *\"Pemerintah tidak perlu impor beras\"*.\n4. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan langsung dengan hasil deduksi logis sah $R$.\n- **Pilihan C Salah:** Mengingkari premis 1 yang sudah menjamin keamanan stok secara bersyarat.\n- **Pilihan D Salah:** Membalik alur kausalitas secara keliru (*reverse causality*).\n- **Pilihan E Salah:** Membahas pengawasan harga beras di luar premis yang disediakan (*out of scope*)."
    },
    {
      "example_id": "pu-02-03-ex2",
      "variation_name": "Variasi 2: Deteksi Fallacy / Evaluasi Validitas (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan pedoman apresiasi atlet berprestasi dan fakta berikut:\n\n**Premis 1:** Jika seorang atlet berhasil memenangkan medali emas di ajang olimpiade internasional, maka atlet tersebut berhak menerima tunjangan hari tua seumur hidup dari kementerian pemuda dan olahraga.\n**Premis 2:** Atlet angkat besi nasional bernama Rudi resmi menerima tunjangan hari tua seumur hidup dari kementerian pemuda dan olahraga.",
      "question_markdown": "Berdasarkan kaidah logika formal deduktif, manakah simpulan yang **paling tepat** mengenai Rudi?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Rudi pasti telah memenangkan medali emas di ajang olimpiade internasional."
        },
        {
          "key": "B",
          "text_markdown": "Rudi tidak pernah memenangkan medali emas di ajang olimpiade internasional."
        },
        {
          "key": "C",
          "text_markdown": "Rudi belum tentu telah memenangkan medali emas di ajang olimpiade internasional."
        },
        {
          "key": "D",
          "text_markdown": "Semua atlet yang menerima tunjangan hari tua dari kementerian pasti peraih medali emas olimpiade."
        },
        {
          "key": "E",
          "text_markdown": "Kementerian pemuda dan olahraga melanggar aturan pemberian tunjangan hari tua kepada Rudi."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Premis 2 menyebut Rudi menerima tunjangan (akibat / sisi kanan implikasi). Mengafirmasi sisi kanan adalah sesat pikir *affirming the consequent*. Tunjangan bisa didapat dari jalur prestasi lain, sehingga status medali emas olimpiade Rudi adalah belum tentu!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Argumen:**\n  - Premis 1: $E \\rightarrow T$ ($E$: Emas olimpiade, $T$: Tunjangan hari tua).\n  - Premis 2: $T$ (Rudi menerima tunjangan).\n- **Evaluasi Cacat Logika:**\n  - Penarikan kesimpulan $(E \\rightarrow T) \\land T \\vdash E$ adalah sesat pikir **Affirming the Consequent**.\n  - $E$ adalah syarat cukup bagi $T$, namun $T$ bisa dipicu oleh prestasi kejuaraan dunia lain.\n  - Maka dari itu, apakah Rudi meraih medali emas olimpiade adalah **belum tentu benar**.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Deteksi Afirmasi Konsekuen):**\n\n1. Fakta Rudi berada di bagian belakang implikasi (akibat: menerima tunjangan).\n2. Mengafirmasi bagian belakang TIDAK BISA membuktikan bagian depan.\n3. Langsung pilih opsi yang memuat keraguan terukur: *\"Belum tentu...\"*.\n4. Jawaban yang tepat adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak cacat logika menegaskan konsekuen (*affirming the consequent*).\n- **Pilihan B Salah:** Mengambil klaim penyangkalan mutlak tanpa bukti premis yang sah.\n- **Pilihan D Salah:** Merupakan overgeneralisasi yang keliru dari penegasan konsekuen.\n- **Pilihan E Salah:** Bersifat menghakimi di luar koridor penalaran deduktif premis teks."
    },
    {
      "example_id": "pu-02-03-ex3",
      "variation_name": "Variasi 3: Premis Majemuk Campuran & Kontraposisi Rantai (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dewan Direksi sebuah konsorsium teknologi mengevaluasi tiga premis operasional berikut:\n\n(1) Jika sebuah perusahaan rintisan (*startup*) berhasil mencatatkan arus kas positif, maka valuasi modal perusahaan akan melonjak drastis atau perusahaan mampu merekrut talenta kecerdasan buatan (*AI*) terbaik dunia.\n(2) Jika perusahaan mampu merekrut talenta kecerdasan buatan (*AI*) terbaik dunia, maka produk perangkat lunak yang dirilis akan memenangkan penghargaan inovasi teknologi global.\n(3) Berdasarkan laporan audit akhir tahun, tercatat fakta bahwa valuasi modal perusahaan rintisan tersebut tidak melonjak drastis dan produk perangkat lunak yang dirilis tidak memenangkan penghargaan inovasi teknologi global.",
      "question_markdown": "Berdasarkan ketiga premis tersebut, simpulan yang **PASTI BENAR** secara kaidah logika deduktif adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Perusahaan rintisan tersebut berhasil mencatatkan arus kas positif melalui efisiensi biaya operasional."
        },
        {
          "key": "B",
          "text_markdown": "Perusahaan rintisan tersebut tidak berhasil mencatatkan arus kas positif."
        },
        {
          "key": "C",
          "text_markdown": "Perusahaan rintisan tersebut mampu merekrut talenta kecerdasan buatan terbaik dunia meskipun valuasinya tidak melonjak."
        },
        {
          "key": "D",
          "text_markdown": "Valuasi modal perusahaan akan melonjak drastis pada tahun operasional berikutnya."
        },
        {
          "key": "E",
          "text_markdown": "Tidak dapat ditarik simpulan apa pun karena laporan audit akhir tahun saling bertentangan."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan Modus Tollens beruntun: produk tidak menang (premis 2) → tidak merekrut talenta AI. Ditambah valuasi tidak naik, berarti kedua pilihan di premis 1 (valuasi ATAU talenta) sama-sama SALAH. Dengan Modus Tollens pada premis 1, sebabnya pasti SALAH (arus kas tidak positif)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Simbolik:**\n  - $K$: Arus kas positif\n  - $V$: Valuasi melonjak\n  - $T$: Merekrut talenta AI terbaik\n  - $I$: Menang inovasi global\n- **Sistem Premis:**\n  - Premis 1: $K \\rightarrow (V \\lor T)$\n  - Premis 2: $T \\rightarrow I$\n  - Fakta 3: $\\sim V \\land \\sim I$\n- **Rangkaian Deduksi:**\n  1. Dari $T \\rightarrow I$ dan $\\sim I$, melalui Modus Tollens diperoleh: $\\sim T$.\n  2. Gabungkan $\\sim V$ dan $\\sim T$: diperoleh $\\sim V \\land \\sim T \\equiv \\sim (V \\lor T)$ (Hukum De Morgan).\n  3. Terapkan Modus Tollens pada Premis 1:\n     $(K \\rightarrow (V \\lor T)) \\land \\sim (V \\lor T) \\vdash \\sim K$\n  4. Konklusi: $\\sim K$ (Perusahaan rintisan tersebut tidak berhasil mencatatkan arus kas positif).\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Modus Tollens Dua Tahap):**\n\n1. Fakta: produk tidak menang inovasi $\\rightarrow$ lewat premis 2, perusahaan pasti tidak rekrut talenta AI.\n2. Fakta: valuasi juga tidak naik $\\rightarrow$ kedua opsi pada premis 1 (*valuasi naik atau rekrut talenta AI*) gugur menjadi salah.\n3. Karena sisi kanan premis 1 salah, lewat Modus Tollens sisi kirinya wajib salah: *arus kas tidak positif*.\n4. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan secara mutlak dengan hasil deduksi logis $\\sim K$.\n- **Pilihan C Salah:** Bertentangan dengan deduksi tahap pertama yang membuktikan perusahaan tidak mampu merekrut talenta AI.\n- **Pilihan D Salah:** Bersifat spekulasi masa depan di luar premis teks (*out of scope*).\n- **Pilihan E Salah:** Premis-premis logis konsisten dan secara valid menghasilkan konklusi $\\sim K$."
    },
    {
      "example_id": "pu-02-03-ex4",
      "variation_name": "Variasi 4: Rantai Silogisme Bertingkat Transisi Energi Hijau (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan tiga premis strategis dalam rencana aksi transisi energi hijau daerah berikut ini:\n\n(1) Jika kapasitas terpasang pembangkit listrik tenaga panas bumi (PLTP) ditingkatkan minimal 40%, maka ketergantungan wilayah pada pembangkit batu bara berkurang drastis atau indeks emisi karbon dioksida sektor energi turun di bawah ambang batas kritis.\n(2) Jika indeks emisi karbon dioksida sektor energi turun di bawah ambang batas kritis, maka komitmen target *net zero emission* daerah tercapai tepat waktu pada tahun 2030.\n(3) Berdasarkan laporan audit lingkungan tahunan, komitmen target *net zero emission* daerah tidak tercapai tepat waktu pada tahun 2030 dan ketergantungan wilayah pada pembangkit batu bara tidak berkurang drastis.",
      "question_markdown": "Berdasarkan ketiga premis tersebut, simpulan yang **PASTI BENAR** secara kaidah logika deduktif adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Kapasitas terpasang pembangkit listrik tenaga panas bumi (PLTP) ditingkatkan lebih dari 40% tetapi pengelolaannya tidak efisien."
        },
        {
          "key": "B",
          "text_markdown": "Ketergantungan wilayah pada pembangkit batu bara berkurang drastis melalui diversifikasi energi lain."
        },
        {
          "key": "C",
          "text_markdown": "Indeks emisi karbon dioksida sektor energi turun di bawah ambang batas kritis meskipun target net zero emission gagal."
        },
        {
          "key": "D",
          "text_markdown": "Kapasitas terpasang pembangkit listrik tenaga panas bumi (PLTP) tidak ditingkatkan minimal 40%."
        },
        {
          "key": "E",
          "text_markdown": "Ketergantungan wilayah pada pembangkit batu bara meningkat karena target net zero emission gagal tercapai."
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan Modus Tollens berantai! Fakta: target *net zero emission* tidak tercapai ($\\sim N$). Dari premis 2, simpulkan emisi tidak turun di bawah ambang batas kritis ($\\sim E$). Gabungkan dengan fakta batu bara tidak berkurang ($\\sim B$). Karena kedua konsekuen premis 1 salah, lewat Modus Tollens sebabnya (kapasitas PLTP) pasti tidak terpenuhi!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Proposisi:**\n  - $P$: Kapasitas terpasang PLTP ditingkatkan minimal 40%\n  - $B$: Ketergantungan pada pembangkit batu bara berkurang drastis\n  - $E$: Indeks emisi $\\text{CO}_2$ turun di bawah ambang batas kritis\n  - $N$: Target *net zero emission* tercapai tepat waktu\n- **Struktur Premis:**\n  - Premis 1: $P \\rightarrow (B \\lor E)$\n  - Premis 2: $E \\rightarrow N$\n  - Fakta 3: $\\sim N \\land \\sim B$\n- **Rantai Deduksi Sah:**\n  1. Terapkan Modus Tollens pada Premis 2: $(E \\rightarrow N) \\land \\sim N \\vdash \\sim E$ (Indeks emisi $\\text{CO}_2$ tidak turun di bawah ambang batas kritis).\n  2. Konjungsi hasil langkah 1 dengan fakta audit $\\sim B$: $\\sim B \\land \\sim E$.\n  3. Berdasarkan Hukum De Morgan: $\\sim B \\land \\sim E \\equiv \\sim (B \\lor E)$ (Seluruh blok konsekuen pada Premis 1 bernilai SALAH).\n  4. Terapkan Modus Tollens pada Premis 1:\n     $(P \\rightarrow (B \\lor E)) \\land \\sim (B \\lor E) \\vdash \\sim P$\n  5. Konklusi akhir $\\sim P$: *\"Kapasitas terpasang pembangkit listrik tenaga panas bumi (PLTP) tidak ditingkatkan minimal 40%\"*.\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Modus Tollens Ganda):**\n\n1. Target gagal tercapai ($\\sim N$) $\\rightarrow$ lewat premis 2, emisi dipastikan tidak turun ($\\sim E$).\n2. Ditambah fakta batu bara tidak berkurang ($\\sim B$), maka kedua cabang konsekuen premis 1 (*batu bara berkurang ATAU emisi turun*) dua-duanya gugur.\n3. Karena ruas kanan premis 1 gugur total, maka lewat Modus Tollens ruas kirinya wajib gugur: *kapasitas PLTP tidak ditingkatkan minimal 40%*.\n4. Jawaban yang tepat adalah pilihan **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan secara frontal dengan hasil deduksi logis $\\sim P$.\n- **Pilihan B Salah:** Mengingkari fakta audit langsung pada premis 3 yang menyatakan ketergantungan batu bara tidak berkurang.\n- **Pilihan C Salah:** Bertentangan dengan hasil penarikan simpulan tahap pertama yang membuktikan $\\sim E$.\n- **Pilihan E Salah:** Menghubungkan sebab-akibat baru yang tidak berdasar pada struktur premis."
    },
    {
      "example_id": "pu-02-03-ex5",
      "variation_name": "Variasi 5: Deteksi Fallacy Afirmasi Konsekuen Kebijakan Moneter (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Gubernur Bank Sentral dalam konferensi pers transmisi kebijakan makroekonomi memaparkan pedoman moneter berikut:\n\n*\"Jika bank sentral menaikkan suku bunga acuan (BI-Rate) sebesar 50 basis poin, maka laju inflasi inti tahunan dipastikan melambat di bawah 3%.\"*\n\nTiga bulan kemudian, Badan Pusat Statistik (BPS) merilis laporan resmi yang mencatat fakta bahwa laju inflasi inti tahunan berhasil melambat di bawah 3%.",
      "question_markdown": "Berdasarkan kaidah logika formal deduktif, manakah simpulan yang **paling tepat dan sah** mengenai kebijakan suku bunga acuan bank sentral?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Bank sentral pasti telah menaikkan suku bunga acuan sebesar 50 basis poin."
        },
        {
          "key": "B",
          "text_markdown": "Bank sentral pasti tidak menaikkan suku bunga acuan sebesar 50 basis poin."
        },
        {
          "key": "C",
          "text_markdown": "Bank sentral belum tentu telah menaikkan suku bunga acuan sebesar 50 basis poin."
        },
        {
          "key": "D",
          "text_markdown": "Kenaikan suku bunga acuan adalah satu-satunya instrumen pengendali laju inflasi inti tahunan."
        },
        {
          "key": "E",
          "text_markdown": "Laju inflasi inti melambat bukan disebabkan oleh transmisi suku bunga bank sentral."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Cermati posisi fakta: fakta menyebutkan \"laju inflasi inti melambat\", yang merupakan akibat (ruas kanan) dari pernyataan bersyarat. Mengafirmasi ruas kanan adalah kekeliruan formal *affirming the consequent*. Melambatnya inflasi bisa dipicu faktor lain, sehingga status tindakan bank sentral belum tentu!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Simbolik:**\n  - $S$: Bank sentral menaikkan suku bunga acuan sebesar 50 basis poin\n  - $I$: Laju inflasi inti tahunan melambat di bawah 3%\n  - Premis 1: $S \\rightarrow I$\n  - Fakta 2: $I$ (Inflasi inti melambat di bawah 3% benar-benar terjadi)\n- **Analisis Validitas Penarikan Kesimpulan:**\n  - Bentuk argumen: $(S \\rightarrow I) \\land I \\vdash S$ merupakan sesat pikir formal **Affirming the Consequent**.\n  - Dalam logika deduktif, $S$ hanyalah syarat cukup (*sufficient condition*) untuk memicu $I$, bukan satu-satunya syarat mutlak (*necessary condition*).\n  - Melambatnya inflasi inti bisa diakibatkan oleh penurunan harga komoditas global, penguatan nilai tukar mata uang, atau perbaikan kelancaran pasokan barang domestik tanpa adanya kenaikan suku bunga.\n  - Oleh karena itu, kesimpulan yang valid adalah: bank sentral **belum tentu** menaikkan suku bunga acuan sebesar 50 basis poin.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Uji Posisi Ruas Implikasi):**\n\n1. Premis: *Jika S (depan) maka I (belakang)*.\n2. Fakta: *I (belakang)* terjadi.\n3. Aturan emas: Menegaskan bagian belakang TIDAK PERNAH menghasilkan kesimpulan pasti mengenai bagian depan!\n4. Langsung cari opsi yang menyatakan *\"Belum tentu...\"*. Pilihan C tepat sasaran.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak cacat logika formal menegaskan konsekuen (*affirming the consequent*).\n- **Pilihan B Salah:** Mengambil klaim negasi mutlak yang tidak berdasar tanpa pembuktian fakta $\\sim I$.\n- **Pilihan D Salah:** Mengubah syarat cukup menjadi syarat mutlak tunggal tanpa justifikasi teks wacana.\n- **Pilihan E Salah:** Membuat klaim penolakan kausalitas yang berada di luar jangkauan premis."
    },
    {
      "example_id": "pu-02-03-ex6",
      "variation_name": "Variasi 6: Silogisme Disjungtif Terintegrasi Modus Tollens Sindrom Kelelahan Kerja (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Tim psikiatri okupasi dan psikologi kognitif mengevaluasi kondisi beban kerja staf medis gawat darurat rumah sakit melalui rangkaian premis berikut:\n\n(1) Pegawai mengalami sindrom kelelahan kerja akut (*burnout syndrome*) atau pegawai memiliki mekanisme koping stres yang adaptif.\n(2) Jika pegawai memiliki mekanisme koping stres yang adaptif, maka tingkat sekresi hormon kortisol saliva tetap berada dalam rentang fisiologis normal.\n(3) Jika tingkat sekresi hormon kortisol saliva tetap berada dalam rentang fisiologis normal, maka kapasitas atensi selektif dan memori kerja pegawai tidak mengalami penurunan fungsi yang signifikan.\n(4) Pemeriksaan biokimiawi dan uji neuropsikologis berkala menunjukkan fakta bahwa kapasitas atensi selektif dan memori kerja pegawai tersebut mengalami penurunan fungsi yang signifikan.",
      "question_markdown": "Berdasarkan rangkaian premis tersebut, simpulan yang **PASTI BENAR** secara kaidah logika deduktif adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Pegawai memiliki mekanisme koping stres yang adaptif namun tingkat sekresi hormon kortisol salivanya meningkat."
        },
        {
          "key": "B",
          "text_markdown": "Tingkat sekresi hormon kortisol saliva pegawai tetap berada dalam rentang fisiologis normal."
        },
        {
          "key": "C",
          "text_markdown": "Pegawai tidak mengalami sindrom kelelahan kerja akut dan memiliki mekanisme koping stres yang adaptif."
        },
        {
          "key": "D",
          "text_markdown": "Kapasitas atensi selektif dan memori kerja pegawai dapat pulih tanpa penanganan sindrom kelelahan kerja."
        },
        {
          "key": "E",
          "text_markdown": "Pegawai mengalami sindrom kelelahan kerja akut (*burnout syndrome*)."
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Gabungkan Silogisme Hipotetis, Modus Tollens, dan Silogisme Disjungtif! Rantai implikasi: `Koping adaptif → Kortisol normal → Memori tidak turun`. Karena faktanya memori kerja MENGALAMI penurunan fungsi, lewat Modus Tollens pegawai TIDAK memiliki koping adaptif. Pada premis disjungsi `Burnout ATAU Koping adaptif`, karena koping adaptif gugur, maka pegawai pasti mengalami burnout!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Simbolik:**\n  - $B$: Pegawai mengalami sindrom kelelahan kerja akut (*burnout syndrome*)\n  - $K$: Pegawai memiliki mekanisme koping stres adaptif\n  - $S$: Hormon kortisol saliva berada dalam rentang normal\n  - $M$: Kapasitas atensi dan memori kerja tidak mengalami penurunan fungsi\n- **Daftar Premis:**\n  - Premis 1: $B \\lor K$\n  - Premis 2: $K \\rightarrow S$\n  - Premis 3: $S \\rightarrow M$\n  - Fakta 4: $\\sim M$ (Mengalami penurunan fungsi signifikan)\n- **Langkah Deduksi Formal:**\n  1. Silogisme Hipotetis dari Premis 2 dan 3: $(K \\rightarrow S) \\land (S \\rightarrow M) \\vdash K \\rightarrow M$\n  2. Terapkan Modus Tollens dengan Fakta 4: $(K \\rightarrow M) \\land \\sim M \\vdash \\sim K$ (Pegawai dipastikan tidak memiliki mekanisme koping adaptif).\n  3. Terapkan Silogisme Disjungtif pada Premis 1: $(B \\lor K) \\land \\sim K \\vdash B$\n  4. Konklusi Sah: $B$, yaitu *\"Pegawai mengalami sindrom kelelahan kerja akut (burnout syndrome)\"*.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Tollens Rantai & Eliminasi Disjungtif):**\n\n1. Rangkaian sebab-akibat: *Koping adaptif $\\rightarrow$ Kortisol normal $\\rightarrow$ Memori tidak turun*.\n2. Fakta: Memori justru turun ($\\sim M$) $\\rightarrow$ lewat Modus Tollens, ujung sebabnya gugur: pegawai *tidak punya koping adaptif* ($\\sim K$).\n3. Buka premis disjungsi: *Burnout ATAU Koping adaptif*. Karena koping adaptif salah, maka satu-satunya alternatif yang tersisa WAJIB BENAR: *Pegawai mengalami burnout*.\n4. Jawaban yang tepat adalah pilihan **E**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan langsung dengan simpulan logis $\\sim K$ yang membuktikan pegawai tidak memiliki koping adaptif.\n- **Pilihan B Salah:** Gugur karena Modus Tollens dari premis 3 membuktikan bahwa kortisol saliva tidak berada dalam batas normal ($\\sim S$).\n- **Pilihan C Salah:** Mengingkari konklusi sah $B$ dan menyisipkan $K$ yang terbukti salah.\n- **Pilihan D Salah:** Menyajikan spekulasi medis di luar cakupan premis yang diberikan (*out of scope*)."
    },
    {
      "example_id": "pu-02-03-ex7",
      "variation_name": "Variasi 7: Silogisme Rantai Disjungtif Kendali Mutu Semikonduktor (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Manajer lini manufaktur mikroelektronika mengevaluasi sistem kendali mutu otomatis perakitan chip semikonduktor berdasarkan protokol berikut:\n\n(1) Jika stasiun perakitan menerapkan sensor pemindaian optik ultra-presisi, maka cacat mikro pada wafer silikon terdeteksi sebelum proses pengemasan.\n(2) Jika cacat mikro pada wafer silikon terdeteksi sebelum proses pengemasan, maka tingkat produk cacat (*yield defect rate*) terkendali di bawah 0,1% atau biaya garansi komplain pelanggan meningkat.\n(3) Jika efisiensi proses kalibrasi robotik selalu terjaga, maka biaya garansi komplain pelanggan tidak meningkat.\n(4) Pada periode produksi kuartal ini, stasiun perakitan terbukti menerapkan sensor pemindaian optik ultra-presisi dan efisiensi proses kalibrasi robotik selalu terjaga.",
      "question_markdown": "Berdasarkan keempat premis tersebut, simpulan yang **PASTI BENAR** secara logika deduktif adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Tingkat produk cacat (*yield defect rate*) terkendali di bawah 0,1%."
        },
        {
          "key": "B",
          "text_markdown": "Biaya garansi komplain pelanggan meningkat akibat cacat mikro silikon."
        },
        {
          "key": "C",
          "text_markdown": "Cacat mikro pada wafer silikon tidak terdeteksi sebelum proses pengemasan."
        },
        {
          "key": "D",
          "text_markdown": "Tingkat produk cacat berada di atas 0,1% meskipun biaya garansi komplain pelanggan tidak meningkat."
        },
        {
          "key": "E",
          "text_markdown": "Efisiensi proses kalibrasi robotik tidak memengaruhi tingkat biaya garansi komplain pelanggan."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan Modus Ponens bertahap! Dari fakta sensor optik diterapkan, dapatkan cacat mikro terdeteksi (premis 1) → dapatkan disjungsi `Tingkat cacat < 0,1% ATAU Biaya garansi naik` (premis 2). Di sisi lain, fakta kalibrasi terjaga menghasilkan `Biaya garansi TIDAK naik` (premis 3). Lewat silogisme disjungtif, alternatif yang tersisa adalah tingkat cacat < 0,1%!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Proposisi:**\n  - $P$: Stasiun menerapkan sensor optik ultra-presisi\n  - $C$: Cacat mikro terdeteksi sebelum pengemasan\n  - $Y$: Tingkat produk cacat terkendali di bawah 0,1%\n  - $G$: Biaya garansi komplain pelanggan meningkat (sehingga $\\sim G$: biaya garansi tidak meningkat)\n  - $K$: Efisiensi proses kalibrasi robotik selalu terjaga\n- **Struktur Premis:**\n  - Premis 1: $P \\rightarrow C$\n  - Premis 2: $C \\rightarrow (Y \\lor G)$\n  - Premis 3: $K \\rightarrow \\sim G$\n  - Fakta 4: $P \\land K$ ($P$ benar dan $K$ benar)\n- **Rangkaian Deduksi:**\n  1. Dari $P$ dan Premis 1 melalui Modus Ponens: $(P \\rightarrow C) \\land P \\vdash C$\n  2. Dari $C$ dan Premis 2 melalui Modus Ponens: $(C \\rightarrow (Y \\lor G)) \\land C \\vdash Y \\lor G$\n  3. Dari $K$ dan Premis 3 melalui Modus Ponens: $(K \\rightarrow \\sim G) \\land K \\vdash \\sim G$\n  4. Terapkan Silogisme Disjungtif antara hasil langkah 2 dan langkah 3:\n     $(Y \\lor G) \\land \\sim G \\vdash Y$\n  5. Konklusi Sah: $Y$, yaitu *\"Tingkat produk cacat (yield defect rate) terkendali di bawah 0,1%\"*.\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Alur Ponens & Eliminasi Disjungsi):**\n\n1. Sensor optik jalan $\\rightarrow$ Cacat terdeteksi $\\rightarrow$ *Cacat < 0,1% ATAU Garansi naik*.\n2. Kalibrasi robotik terjaga $\\rightarrow$ *Garansi TIDAK naik*.\n3. Eliminasi pilihan yang digugurkan: karena garansi tidak naik, maka cabang yang tersisa wajib benar, yaitu *Tingkat produk cacat terkendali di bawah 0,1%*.\n4. Jawaban yang tepat adalah pilihan **A**.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Bertentangan secara langsung dengan hasil deduksi langkah 3 yang membuktikan $\\sim G$ (biaya garansi tidak meningkat).\n- **Pilihan C Salah:** Bertentangan dengan Modus Ponens langkah 1 yang membuktikan bahwa cacat mikro berhasil terdeteksi.\n- **Pilihan D Salah:** Bertentangan dengan konklusi sah $Y$ yang membuktikan tingkat cacat berada di bawah 0,1%.\n- **Pilihan E Salah:** Mengabaikan premis 3 yang secara eksplisit menetapkan relasi implikasi kalibrasi terhadap biaya garansi."
    },
    {
      "example_id": "pu-02-03-ex8",
      "variation_name": "Variasi 8: Modus Tollens Rantai De Morgan Konservasi Cagar Budaya (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Balai Pelestarian Kebudayaan merumuskan tiga premis strategis dalam masterplan konservasi kawasan cagar budaya kota tua:\n\n(1) Jika zonasi kawasan cagar budaya dikelola melalui kemitraan partisipatif dengan komunitas lokal, maka bangunan bersejarah terhindar dari alih fungsi komersial ilegal.\n(2) Jika bangunan bersejarah terhindar dari alih fungsi komersial ilegal, maka keaslian arsitektur kolonial terpelihara secara utuh dan nilai edukasi sejarah bagi generasi muda tidak terdegradasi.\n(3) Berdasarkan hasil evaluasi tim ahli cagar budaya independen, diperoleh fakta bahwa keaslian arsitektur kolonial tidak terpelihara secara utuh atau nilai edukasi sejarah bagi generasi muda terdegradasi.",
      "question_markdown": "Berdasarkan ketiga premis tersebut, simpulan yang **PASTI BENAR** secara kaidah logika deduktif adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Zonasi kawasan cagar budaya tetap dikelola melalui kemitraan partisipatif dengan komunitas lokal."
        },
        {
          "key": "B",
          "text_markdown": "Zonasi kawasan cagar budaya tidak dikelola melalui kemitraan partisipatif dengan komunitas lokal."
        },
        {
          "key": "C",
          "text_markdown": "Bangunan bersejarah terhindar dari alih fungsi komersial ilegal meskipun arsitekturnya berubah."
        },
        {
          "key": "D",
          "text_markdown": "Nilai edukasi sejarah generasi muda tidak terdegradasi sama sekali oleh alih fungsi komersial."
        },
        {
          "key": "E",
          "text_markdown": "Komunitas lokal menolak pelestarian arsitektur kolonial kawasan cagar budaya."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat hukum De Morgan untuk penyangkalan konjungsi: `~A ∨ ~E ≡ ~(A ∧ E)`. Karena fakta evaluasi menyangkal konsekuen premis 2, gunakan Modus Tollens bertingkat: akibat premis 2 salah → bangunan tidak terhindar alih fungsi ilegal. Lanjutkan Modus Tollens ke premis 1: akibat salah → sebab salah!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Proposisi:**\n  - $Z$: Zonasi dikelola melalui kemitraan partisipatif dengan komunitas lokal\n  - $B$: Bangunan bersejarah terhindar dari alih fungsi komersial ilegal\n  - $A$: Keaslian arsitektur kolonial terpelihara secara utuh\n  - $E$: Nilai edukasi sejarah bagi generasi muda tidak terdegradasi\n- **Struktur Premis:**\n  - Premis 1: $Z \\rightarrow B$\n  - Premis 2: $B \\rightarrow (A \\land E)$\n  - Fakta 3: $\\sim A \\lor \\sim E$\n- **Rantai Deduksi Sah:**\n  1. Berdasarkan Hukum De Morgan: $\\sim A \\lor \\sim E \\equiv \\sim (A \\land E)$ (Konsekuen Premis 2 terbukti salah).\n  2. Terapkan Modus Tollens pada Premis 2:\n     $(B \\rightarrow (A \\land E)) \\land \\sim (A \\land E) \\vdash \\sim B$\n     (Bangunan bersejarah tidak terhindar dari alih fungsi komersial ilegal).\n  3. Terapkan Modus Tollens pada Premis 1:\n     $(Z \\rightarrow B) \\land \\sim B \\vdash \\sim Z$\n  4. Konklusi Sah: $\\sim Z$, yaitu *\"Zonasi kawasan cagar budaya tidak dikelola melalui kemitraan partisipatif dengan komunitas lokal\"*.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Modus Tollens Rantai):**\n\n1. Premis 2 menjanjikan paket ganda: *arsitektur utuh DAN edukasi tidak turun*.\n2. Fakta evaluasi: *arsitektur tidak utuh ATAU edukasi turun*. Menurut De Morgan, janji paket ganda tersebut terbukti GAGAL.\n3. Karena janji di ujung belakang gagal, mundurlah lewat Modus Tollens:\n   - Bangunan tidak terhindar alih fungsi ilegal ($\\sim B$).\n   - Zonasi tidak dikelola kemitraan partisipatif komunitas lokal ($\\sim Z$).\n4. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan langsung dengan hasil pembuktian deduktif $\\sim Z$.\n- **Pilihan C Salah:** Mengingkari hasil deduksi tahap kedua $\\sim B$ yang membuktikan bangunan tidak terhindar dari alih fungsi ilegal.\n- **Pilihan D Salah:** Bersifat spekulatif dan bertentangan dengan temuan tim ahli cagar budaya independen.\n- **Pilihan E Salah:** Membuat prasangka sikap penolakan komunitas lokal yang tidak termuat di dalam premis teks (*out of scope*)."
    },
    {
    "example_id": "pu-02-03-ex9",
    "variation_name": "Variasi 9: Premis Majemuk Campuran Modus Tollens Eutrofikasi DAS (Level: Sulit / HOTS)",
    "difficulty": "hard",
    "question_type": "standard_mc",
    "context_markdown": "Dalam kajian hidrologi pengelolaan daerah aliran sungai (DAS) pertanian, peneliti merumuskan rangkaian premis ekologis:\n\n- **Premis 1**: *\"Jika debit limbah pupuk nitrogen anorganik melampaui daya dukung sungai ($p$), maka konsentrasi senyawa amonia terlarut meningkat drastis ($q$) DAN populasi fitoplankton mengalami ledakan biomassa tak terkendali ($r$).\"*\nRumus: $p \\implies (q \\land r)$.\n- **Premis 2**: *\"Jika populasi fitoplankton mengalami ledakan biomassa tak terkendali ($r$), maka kadar oksigen terlarut (*Dissolved Oxygen*) di dasar perairan anjlok di bawah ambang 2 mg/L ($s$).\"*\nRumus: $r \\implies s$.\n- **Fakta Hasil Sensor Lapangan**: *\"Data telemetri sensor kualitas air di hilir sungai menunjukkan bahwa kadar oksigen terlarut (*Dissolved Oxygen*) di dasar perairan stabil di atas 5 mg/L (artinya kondisi $s$ tidak terjadi, bernilai $\\sim s$).\"*",
    "question_markdown": "Berdasarkan premis-premis dan fakta lapangan tersebut, kesimpulan yang **pasti benar secara deduktif** adalah...",
    "options": [
        {
            "key": "A",
            "text_markdown": "Debit limbah pupuk nitrogen anorganik dipastikan melampaui daya dukung sungai karena kadar amonia tetap meningkat."
        },
        {
            "key": "B",
            "text_markdown": "Konsentrasi senyawa amonia terlarut di perairan dipastikan tidak mengalami kenaikan sedikit pun."
        },
        {
            "key": "C",
            "text_markdown": "Populasi fitoplankton mengalami ledakan biomassa tak terkendali meskipun kadar oksigen terlarut tetap stabil."
        },
        {
            "key": "D",
            "text_markdown": "Debit limbah pupuk nitrogen anorganik dipastikan tidak melampaui daya dukung sungai."
        },
        {
            "key": "E",
            "text_markdown": "Kadar oksigen terlarut di dasar perairan tidak memiliki keterkaitan logis dengan buangan pupuk pertanian."
        }
    ],
    "correct_answer": "D",
    "hint_markdown": "💡 **Petunjuk Soal:** Lakukan penarikan kesimpulan bertahap:\n1. Dari Premis 2 ($r \\implies s$) dan fakta $\\sim s$, gunakan **Modus Tollens**: diperoleh $\\sim r$ (fitoplankton tidak meledak).\n2. Dari Premis 1 ($p \\implies (q \\land r)$), bentuk kontraposisinya adalah $\\sim(q \\land r) \\implies \\sim p$, yang ekuivalen dengan $(\\sim q \\lor \\sim r) \\implies \\sim p$.\n3. Karena kita sudah mendapatkan fakta $\\sim r$, maka kalimat disjungsi $(\\sim q \\lor \\sim r)$ pasti bernilai Benar.\n4. Gunakan **Modus Ponens** pada kontraposisi: diperoleh kesimpulan mutlak $\\sim p$!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Langkah 1 (Analisis Premis 2 dan Fakta Sensor):**\n  - Implikasi: $r \\implies s$.\n  - Fakta lapangan: $\\sim s$ (kadar oksigen terlarut $\\ge 5$ mg/L, tidak anjlok di bawah 2 mg/L).\n  - Berdasarkan aturan inferensi **Modus Tollens**:\n    $$\\frac{r \\implies s, \\quad \\sim s}{\\therefore \\sim r}$$\n    Maka dipastikan $\\sim r$ bernilai Benar (populasi fitoplankton tidak mengalami ledakan biomassa).\n- **Langkah 2 (Analisis Premis 1):**\n  - Implikasi asli: $p \\implies (q \\land r)$.\n  - Kontraposisi ekuivalen (Hukum De Morgan): $(\\sim q \\lor \\sim r) \\implies \\sim p$.\n- **Langkah 3 (Kombinasi Inferensi Modus Ponens):**\n  - Karena $\\sim r$ bernilai Benar, maka pernyataan disjungsi $(\\sim q \\lor \\sim r)$ otomatis bernilai Benar.\n  - Terapkan **Modus Ponens**:\n    $$\\frac{(\\sim q \\lor \\sim r) \\implies \\sim p, \\quad (\\sim q \\lor \\sim r)}{\\therefore \\sim p}$$\n- **Simpulan Deduktif:** $\\sim p$ bernilai Benar, yaitu debit limbah pupuk nitrogen anorganik dipastikan **tidak melampaui** daya dukung sungai.\n\n**Jawaban: D**",
    "quick_trick_markdown": "**Cara Cepat (Rantai Tollens Mundur):**\n\n1. Alur maju: Limbah lebih ($p$) $\\rightarrow$ Amonia naik & Fitoplankton meledak ($q \\land r$) $\\rightarrow$ Oksigen anjlok ($s$).\n2. Fakta: Oksigen TIDAK anjlok (Bukan $s$).\n3. Mundur bertahap pakai Tollens:\n   - Bukan $s \\implies$ Bukan $r$ (Fitoplankton tidak meledak).\n   - Karena syarat belakang Premis 1 $(q \\land r)$ butuh KEDUANYA terjadi, kegagalan $r$ saja sudah cukup menggagalkan seluruh syarat belakang!\n   - Karena syarat belakang gagal $\\implies$ sebab depan pasti TIDAK TERJADI (Bukan $p$).\n4. Artinya: Limbah pupuk TIDAK melampaui daya dukung (Bukan $p$).\n5. Jawaban tepat langsung: **D**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan secara frontal dengan kesimpulan deduktif $\\sim p$.\n- **Pilihan B Salah:** Mengklaim amonia pasti tidak naik adalah kesimpulan berlebihan; kegagalan konjungsi $(q \\land r)$ sudah terjadi hanya dengan $\\sim r$, sehingga $q$ (amonia) bisa saja naik karena faktor lain.\n- **Pilihan C Salah:** Menolak fakta hasil Modus Tollens langkah 1 yang membuktikan $\\sim r$.\n- **Pilihan E Salah:** Menyangkal rantai kausalitas deduktif formal yang secara tegas telah dirumuskan pada premis."
},
    {
    "example_id": "pu-02-03-ex10",
    "variation_name": "Variasi 10: Deteksi Fallacy Afirmasi Konsekuen Kredit Usaha (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Dalam panduan operasional perbankan daerah ditetapkan premis bersyarat:\n\n*\"Jika pelaku usaha mikro binaan mendapatkan fasilitas restrukturisasi pinjaman lunak ($p$), maka rasio kredit macet (*Non-Performing Loan* / NPL) sektor ritel UMKM di bank daerah tersebut pasti mengalami penurunan di bawah ambang batas 3% ($q$).\"*\nRumus: $p \\implies q$.\n\nPada penutupan tahun anggaran, direksi bank daerah mengumumkan fakta laporan keuangan resmi:\n*\"Rasio kredit macet (*Non-Performing Loan* / NPL) sektor ritel UMKM di bank daerah tercatat berhasil turun menjadi 2,4% (artinya kondisi $q$ terbukti bernilai Benar).\"*\n\nBerdasarkan pengumuman penurunan rasio kredit macet tersebut, seorang analis pembiayaan menyimpulkan bahwa:\n*\"Pelaku usaha mikro binaan di bank daerah tersebut dipastikan telah mendapatkan fasilitas restrukturisasi pinjaman lunak (kondisi $p$ pasti terjadi).\"*",
    "question_markdown": "Bagaimanakah evaluasi yang **paling tepat** terhadap validitas logika penarikan kesimpulan analis pembiayaan tersebut?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Kesimpulan analis pembiayaan tersebut sah dan valid secara deduktif berdasarkan kaidah penarikan kesimpulan Modus Ponens."
        },
        {
            "key": "B",
            "text_markdown": "Kesimpulan analis pembiayaan tersebut tidak valid karena melakukan kesesatan pikir formal menegaskan konsekuen (*affirming the consequent fallacy*), sebab penurunan rasio kredit macet dapat dipicu oleh faktor ekonomi lain di luar restrukturisasi pinjaman."
        },
        {
            "key": "C",
            "text_markdown": "Kesimpulan analis pembiayaan tersebut sah dan valid secara deduktif berdasarkan kaidah penarikan kesimpulan Modus Tollens."
        },
        {
            "key": "D",
            "text_markdown": "Kesimpulan analis pembiayaan tersebut tidak valid karena melakukan kesesatan pikir menyangkal anteseden (*denying the antecedent fallacy*)."
        },
        {
            "key": "E",
            "text_markdown": "Kesimpulan analis pembiayaan tersebut valid dan mengikat secara hukum perbankan nasional."
        }
    ],
    "correct_answer": "B",
    "hint_markdown": "💡 **Petunjuk Soal:** Cermati alur penalarannya:\nPremis: $p \\implies q$ (Jika Restrukturisasi, maka NPL Turun).\nFakta: $q$ (NPL Turun).\nKesimpulan Analis: $p$ (Maka pasti Restrukturisasi).\nApakah membenarkan akibat ($q$) otomatis membuktikan sebab ($p$)? Ingat: NPL bisa turun karena hal lain (misal pemutihan utang atau ekonomi pulih). Ini adalah kesesatan pikir formal klasik *Menegaskan Konsekuen* (*Affirming the Consequent*)!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rekonstruksi Silogisme Analis:**\n  - Premis 1: $p \\implies q$.\n  - Premis 2 (Fakta Faktual): $q$.\n  - Kesimpulan: $\\therefore p$.\n- **Kaidah Inferensi Deduktif Baku:**\n  - Inferensi deduktif yang sah dari implikasi hanyalah:\n    1. **Modus Ponens**: $p \\implies q, \\; p \\vdash q$.\n    2. **Modus Tollens**: $p \\implies q, \\; \\sim q \\vdash \\sim p$.\n  - Bentuk $p \\implies q, \\; q \\vdash p$ adalah **kesesatan pikir formal (formal fallacy)** yang dikenal sebagai **Menegaskan Konsekuen (*Affirming the Consequent*)**.\n- **Substansi Kontekstual:** Terjadinya penurunan NPL ($q$) tidak menjamin bahwa restrukturisasi ($p$) telah diberikan; penurunan NPL bisa saja diakibatkan oleh penagihan piutang agresif, pemulihan pasar domestik, atau penjaminan kredit pemerintah.\n- **Simpulan:** Penarikan kesimpulan **tidak valid** karena sesat pikir afirmasi konsekuen.\n\n**Jawaban: B**",
    "quick_trick_markdown": "**Cara Cepat (Deteksi Pola 'Menegaskan Akibat'):**\n\n1. Pola: Jika Hujan ($P$) $\\rightarrow$ Jalan Basah ($Q$).\n2. Fakta: Jalan Basah ($Q$).\n3. Analis menyimpulkan: Pasti baru saja Hujan ($P$). $\\implies$ SALAH! Jalan basah bisa karena disiram mobil damkar atau pipa bocor!\n4. Ini nama resminya adalah *Affirming the Consequent* (Menegaskan Konsekuen).\n5. Pilihan yang tepat mendeteksi cacat logika ini adalah pilihan **B**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Modus Ponens membutuhkan penegasan anteseden ($p$), bukan konsekuen ($q$).\n- **Pilihan C Salah:** Modus Tollens membutuhkan pengingkaran konsekuen ($\\sim q$), bukan penegasan $q$.\n- **Pilihan D Salah:** Menyangkal anteseden (*denying the antecedent*) terjadi jika bentuknya $\\sim p \\vdash \\sim q$, bukan $q \\vdash p$.\n- **Pilihan E Salah:** Kesimpulan cacat logika tidak pernah berstatus valid secara hukum pembuktian deduktif."
},
    {
    "example_id": "pu-02-03-ex11",
    "variation_name": "Variasi 11: Dilema Konstruktif Terapi Gangguan Tidur Sirkadian (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Dalam protokol tata laksana gangguan tidur rumah sakit okupasi, ditetapkan premis-premis tindakan klinis bagi pekerja shift:\n\n- **Premis 1**: *\"Setiap pekerja shift malam yang mengalami insomnia kronis menjalani terapi restrukturisasi kognitif perilaku CBT-I ($p$) ATAU menjalani terapi fototerapi kotak cahaya terang terjadwal ($q$).\"*\nRumus: $p \\lor q$.\n- **Premis 2**: *\"Jika pekerja menjalani terapi restrukturisasi kognitif perilaku CBT-I ($p$), maka efisiensi tidur malamnya meningkat di atas 85% ($r$).\"*\nRumus: $p \\implies r$.\n- **Premis 3**: *\"Jika pekerja menjalani terapi fototerapi kotak cahaya terang terjadwal ($q$), maka fase ritme sirkadian hormon melatonin bergeser ke arah normal ($s$).\"*\nRumus: $q \\implies s$.",
    "question_markdown": "Berdasarkan kaidah penarikan kesimpulan deduktif formal, kesimpulan yang **pasti benar** bagi seorang pekerja shift malam pengidap insomnia kronis yang mematuhi protokol rumah sakit tersebut adalah...",
    "options": [
        {
            "key": "A",
            "text_markdown": "Efisiensi tidur malam pekerja meningkat di atas 85% ATAU fase ritme sirkadian hormon melatonin bergeser ke arah normal."
        },
        {
            "key": "B",
            "text_markdown": "Efisiensi tidur malam pekerja meningkat di atas 85% DAN fase ritme sirkadian hormon melatonin bergeser ke arah normal."
        },
        {
            "key": "C",
            "text_markdown": "Pekerja dipastikan tidak mengalami pergeseran fase hormon melatonin jika ia memilih menjalani terapi CBT-I."
        },
        {
            "key": "D",
            "text_markdown": "Pekerja wajib menjalani kedua jenis terapi secara serentak agar efisiensi tidurnya dapat meningkat."
        },
        {
            "key": "E",
            "text_markdown": "Jika fase ritme hormon melatonin pekerja bergeser normal, maka pekerja tersebut pasti menjalani terapi CBT-I."
        }
    ],
    "correct_answer": "A",
    "hint_markdown": "💡 **Petunjuk Soal:** Ini adalah bentuk baku kaidah inferensi **Dilema Konstruktif (*Constructive Dilemma*)**:\nPremis 1: $p \\lor q$ (Pilihan antara $p$ atau $q$).\nPremis 2: $p \\implies r$.\nPremis 3: $q \\implies s$.\nKesimpulan niscaya: Konsekuensi logisnya pasti berada pada pilihan disjungsi antara akibat-akibatnya, yaitu **$r \\lor s$**! Hati-hati jebakan kata DAN vs ATAU!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Identifikasi Kaidah Inferensi (Dilema Konstruktif):**\n  - Premis 1 (Disjungsi Anteseden): $p \\lor q$.\n  - Premis 2 (Implikasi Cabang 1): $p \\implies r$.\n  - Premis 3 (Implikasi Cabang 2): $q \\implies s$.\n- **Aturan Baku Inferensi Logika Proposisi:**\n  $$\\frac{p \\lor q, \\quad p \\implies r, \\quad q \\implies s}{\\therefore r \\lor s}$$\n- **Penerjemahan Simbolik:**\n  - $r$: Efisiensi tidur malam pekerja meningkat di atas 85%.\n  - $\\lor$: ATAU.\n  - $s$: Fase ritme sirkadian hormon melatonin bergeser ke arah normal.\n- **Simpulan Deduktif:** Hasil penarikan kesimpulan yang mutlak adalah pernyataan disjungtif: *Efisiensi tidur malam pekerja meningkat di atas 85% ATAU fase ritme sirkadian hormon melatonin bergeser ke arah normal* ($r \\lor s$).\n\n**Jawaban: A**",
    "quick_trick_markdown": "**Cara Cepat (Rumus Dilema Konstruktif: Gabungkan Akibat dengan 'ATAU'):**\n\n1. Premis pembuka berbentuk 'ATAU': $p$ ATAU $q$.\n2. Masing-masing menghasilkan akibat: $p \\rightarrow r$ dan $q \\rightarrow s$.\n3. Karena pilihannya cuma antara $p$ atau $q$, maka hasilnya pasti antara **$r$ ATAU $s$**!\n4. Jangan pilih opsi dengan kata 'DAN' (Pilihan **B** salah karena disjungsi inklusif tidak mewajibkan keduanya serentak).\n5. Pilihan yang memuat 'r ATAU s' secara tepat adalah pilihan **A**.",
    "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Menggunakan kata hubung konjungsi 'DAN' ($r \\land s$); karena premis awal adalah disjungsi ($p \\lor q$), kita tidak dapat memastikan kedua hasil terjadi bersamaan.\n- **Pilihan C Salah:** Disjungsi pada premis 1 bersifat inklusif, sehingga memilih CBT-I tidak secara otomatis melarang fototerapi.\n- **Pilihan D Salah:** Melanggar premis 1 yang memperbolehkan salah satu dari kedua terapi.\n- **Pilihan E Salah:** Menghubungkan melatonin ($s$) dengan CBT-I ($p$), padahal melatonin adalah konsekuensi dari fototerapi ($q$)."
},
    {
    "example_id": "pu-02-03-ex12",
    "variation_name": "Variasi 12: Rantai Silogisme Kontraposisi Konsensus Blockchain (Level: Sulit / HOTS)",
    "difficulty": "hard",
    "question_type": "standard_mc",
    "context_markdown": "Dalam spesifikasi audit protokol konsensus jaringan desentralisasi terdistribusi (*Proof-of-Stake*), dirumuskan rantai aturan verifikasi transaksi:\n\n- **Premis 1**: *\"Jika sebuah node validator melakukan verifikasi blok transaksi ganda secara ilegal (*double-signing*) ($p$), maka seluruh pasak aset kripto (*staked tokens*) milik validator tersebut disita habis secara otomatis (*slashing*) ($q$).\"*\n- **Premis 2**: *\"Jika seluruh pasak aset kripto milik validator disita habis secara otomatis ($q$), maka reputasi skor keandalan validator anjlok di bawah ambang batas kepercayaan protokol ($r$).\"*\n- **Premis 3**: *\"Jika reputasi skor keandalan validator anjlok di bawah ambang batas kepercayaan protokol ($r$), maka node validator tersebut dikeluarkan dari daftar pemilih konsensus jaringan ($s$).\"*",
    "question_markdown": "Berdasarkan rantai aturan konsensus tersebut, manakah pernyataan berikut yang **pasti benar secara deduktif**?",
    "options": [
        {
            "key": "A",
            "text_markdown": "Jika suatu node validator dikeluarkan dari daftar pemilih konsensus jaringan, maka validator tersebut pasti telah melakukan verifikasi blok transaksi ganda secara ilegal."
        },
        {
            "key": "B",
            "text_markdown": "Jika suatu node validator tidak melakukan verifikasi blok transaksi ganda secara ilegal, maka validator tersebut pasti tidak akan pernah dikeluarkan dari daftar pemilih konsensus jaringan."
        },
        {
            "key": "C",
            "text_markdown": "Jika suatu node validator tetap berada di dalam daftar pemilih konsensus jaringan (tidak dikeluarkan), maka validator tersebut dipastikan tidak melakukan verifikasi blok transaksi ganda secara ilegal."
        },
        {
            "key": "D",
            "text_markdown": "Node validator yang disita seluruh pasak aset kriptonya belum tentu mengalami penurunan reputasi skor keandalan."
        },
        {
            "key": "E",
            "text_markdown": "Setiap node validator dalam jaringan cepat atau lambat pasti akan melakukan verifikasi blok transaksi ganda."
        }
    ],
    "correct_answer": "C",
    "hint_markdown": "💡 **Petunjuk Soal:** Susun rantai silogisme hipotetis multi-premis:\n$p \\implies q$, $q \\implies r$, $r \\implies s$.\nMelalui silogisme hipotetis rantai, diperoleh kesimpulan langsung: $p \\implies s$ (Jika Verifikasi Ganda, maka Dikeluarkan).\nCari bentuk kontraposisinya yang ekuivalen: $\\sim s \\implies \\sim p$ (Jika TIDAK dikeluarkan, maka PASTI TIDAK melakukan verifikasi ganda). Waspadai jebakan konversi dan inversi!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Rantai Silogisme Hipotetis:**\n  - Premis 1: $p \\implies q$\n  - Premis 2: $q \\implies r$\n  - Premis 3: $r \\implies s$\n  - Aturan Silogisme Rantai:\n    $$\\frac{p \\implies q, \\quad q \\implies r, \\quad r \\implies s}{\\therefore p \\implies s}$$\n- **Ekuivalensi Kontraposisi:**\n  - Setiap implikasi $A \\implies B$ memiliki nilai kebenaran identik dengan kontraposisinya:\n    $$p \\implies s \\equiv \\sim s \\implies \\sim p$$\n- **Penerjemahan Semantik:**\n  - $\\sim s$: Node validator tidak dikeluarkan dari daftar pemilih konsensus (tetap berada di dalam daftar).\n  - $\\sim p$: Validator tidak melakukan verifikasi blok ganda secara ilegal.\n  - Gabungan: *Jika suatu node validator tetap berada di dalam daftar pemilih konsensus jaringan, maka validator tersebut dipastikan tidak melakukan verifikasi blok transaksi ganda*.\n- **Evaluasi Opsi:** Pilihan **C** menyajikan kontraposisi valid $\\sim s \\implies \\sim p$.\n\n**Jawaban: C**",
    "quick_trick_markdown": "**Cara Cepat (Trik Silogisme Rantai + Kontraposisi):**\n\n1. Hubungkan ujung awal ke ujung akhir:\n   $P$ (Verifikasi Ganda) $\\implies$ $S$ (Dikeluarkan).\n2. Balik dan negasikan (Kontraposisi):\n   Bukan $S$ (Tidak Dikeluarkan) $\\implies$ Bukan $P$ (Tidak Verifikasi Ganda).\n3. Cek opsi:\n   - Opsi **A**: $S \\implies P$ (Konversi $\\implies$ SALAH!).\n   - Opsi **B**: $\\sim P \\implies \\sim S$ (Inversi $\\implies$ SALAH!).\n   - Opsi **C**: $\\sim S \\implies \\sim P$ (Kontraposisi $\\implies$ BENAR!).\n4. Jawaban pasti: **C**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Merupakan bentuk konversi ($s \\implies p$); validator bisa saja dikeluarkan karena alasan teknis lain (misal koneksi jaringan mati lama).\n- **Pilihan B Salah:** Merupakan bentuk inversi ($\\sim p \\implies \\sim s$), yang tidak ekuivalen secara kaidah logika formal.\n- **Pilihan D Salah:** Bertentangan langsung dengan Premis 2 ($q \\implies r$).\n- **Pilihan E Salah:** Generalisasi spekulatif yang tidak memiliki dasar di dalam premis logika."
},
    {
    "example_id": "pu-02-03-ex13",
    "variation_name": "Variasi 13: Silogisme Disjungtif Penyelamatan Prasasti Sejarah (Level: Sedang)",
    "difficulty": "medium",
    "question_type": "standard_mc",
    "context_markdown": "Berdasarkan nota dinas Balai Pelestarian Kebudayaan mengenai rencana penyelamatan Situs Prasasti Karang Anyar yang terancam abrasi pasang laut:\n\n- **Premis 1**: *\"Prasasti Karang Anyar dipindahkan ke ruang pameran museum indoor daerah ($p$) ATAU dibangunkan struktur tanggul pelindung kedap air di lokasi aslinya ($q$).\"*\nRumus: $p \\lor q$.\n- **Premis 2**: *\"Jika dibangunkan struktur tanggul pelindung kedap air di lokasi aslinya ($q$), maka kebutuhan anggaran proyek teknik sipil melampaui pagu Rp2 miliar ($r$).\"*\nRumus: $q \\implies r$.\n- **Fakta Realitas Anggaran Daerah**: *\"Berdasarkan penetapan alokasi Anggaran Pendapatan dan Belanja Daerah (APBD) tahun berjalan, total pagu dana penanganan yang disetujui hanya sebesar Rp400 juta, sehingga kebutuhan anggaran proyek teknik sipil dipastikan tidak melampaui pagu Rp2 miliar (kondisi $r$ tidak terjadi, bernilai $\\sim r$).\"*",
    "question_markdown": "Berdasarkan premis-premis dan fakta realitas anggaran tersebut, simpulan yang **pasti benar secara deduktif** adalah...",
    "options": [
        {
            "key": "A",
            "text_markdown": "Struktur tanggul pelindung kedap air tetap dibangun di lokasi asli prasasti menggunakan sisa dana hibah."
        },
        {
            "key": "B",
            "text_markdown": "Prasasti Karang Anyar dibiarkan di lokasi aslinya tanpa tindakan pelestarian apa pun."
        },
        {
            "key": "C",
            "text_markdown": "Pemerintah daerah membatalkan seluruh agenda perlindungan cagar budaya di wilayah pesisir."
        },
        {
            "key": "D",
            "text_markdown": "Kebutuhan anggaran proyek penyelamatan cagar budaya dinaikkan menjadi Rp3 miliar pada triwulan berikutnya."
        },
        {
            "key": "E",
            "text_markdown": "Prasasti Karang Anyar dipastikan dipindahkan ke ruang pameran museum indoor daerah."
        }
    ],
    "correct_answer": "E",
    "hint_markdown": "💡 **Petunjuk Soal:** Selesaikan dalam dua langkah silogisme deduktif:\n1. Tinjau Premis 2 ($q \\implies r$) dan fakta $\\sim r$. Dengan **Modus Tollens**, diperoleh kesimpulan: $\\sim q$ (tanggul tidak dibangun).\n2. Tinjau Premis 1: $p \\lor q$ (Dipindahkan ke museum ATAU dibangun tanggul). Karena $\\sim q$ (tanggul tidak dibangun), maka melalui **Silogisme Disjungtif**, satu-satunya opsi yang tersisa adalah **$p$** (dipindahkan ke museum)!",
    "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Langkah 1 (Inferensi Modus Tollens):**\n  - Premis 2: $q \\implies r$.\n  - Fakta: $\\sim r$ (anggaran tidak melampaui Rp2 miliar).\n  - Kaidah Modus Tollens:\n    $$\\frac{q \\implies r, \\quad \\sim r}{\\therefore \\sim q}$$\n  - Hasil: $\\sim q$ bernilai Benar (struktur tanggul pelindung kedap air tidak dibangun di lokasi aslinya).\n- **Langkah 2 (Inferensi Silogisme Disjungtif):**\n  - Premis 1: $p \\lor q$.\n  - Fakta turunan dari langkah 1: $\\sim q$.\n  - Kaidah Silogisme Disjungtif (*Disjunctive Syllogism*):\n    $$\\frac{p \\lor q, \\quad \\sim q}{\\therefore p}$$\n  - Hasil: $p$ bernilai Benar (Prasasti Karang Anyar dipindahkan ke ruang pameran museum indoor daerah).\n- **Simpulan Deduktif:** Prasasti Karang Anyar **dipastikan dipindahkan ke ruang pameran museum indoor daerah** ($p$).\n\n**Jawaban: E**",
    "quick_trick_markdown": "**Cara Cepat (Tollens lalu Coret Opsi Disjungsi):**\n\n1. Tanggul dibangun $\\rightarrow$ Biaya $> 2$ Miliar.\n2. Fakta: Biaya TIDAK sampai 2 Miliar $\\implies$ Tanggul GAGAL dibangun!\n3. Pilihan tindakan di awal: Pindah ke museum ATAU Bangun tanggul.\n4. Karena opsi bangun tanggul sudah gugur/gagal, maka SATU-SATUNYA pilihan tersisa adalah: **Dipindahkan ke museum**!\n5. Jawaban tepat: **E**.",
    "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan dengan hasil Modus Tollens $\\sim q$ yang menyatakan tanggul tidak dibangun.\n- **Pilihan B Salah:** Mengabaikan premis 1 bahwa tindakan pelestarian wajib dipilih salah satunya ($p \\lor q$).\n- **Pilihan C Salah:** Lompatan kesimpulan berlebihan di luar konteks penanganan Prasasti Karang Anyar.\n- **Pilihan D Salah:** Berspekulasi mengenai anggaran masa depan tanpa dasar premis yang sah."
},
{
  "example_id": "pu-02-03-ex14",
  "variation_name": "Variasi 14: Silogisme Rantai dan Evaluasi Siklus Karbon Mangrove (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Perhatikan rangkaian premis ilmiah mengenai ekologi lahan basah pesisir berikut:\n\n1. **Premis 1**: Jika hutan mangrove pesisir direstorasi dengan kerapatan pohon di atas 2.500 batang per hektare ($p$), maka kapasitas sekuestrasi karbon biru pada sedimen tanah meningkat hingga empat kali lipat ($q$).\n2. **Premis 2**: Jika kapasitas sekuestrasi karbon biru pada sedimen tanah meningkat hingga empat kali lipat ($q$), maka laju pelepasan emisi gas metana ke atmosfer mengalami penurunan drastis ($r$).\n3. **Premis 3**: Jika laju pelepasan emisi gas metana ke atmosfer mengalami penurunan drastis ($r$), maka indeks resiliensi ekosistem pesisir terhadap ancaman pengasaman air laut mencapai kategori optimal ($s$).\n\n**Fakta Pengukuran Lapangan**: Stasiun riset oseanografi Teluk Nipah mencatat data empiris bahwa indeks resiliensi ekosistem pesisir setempat terbukti **TIDAK mencapai kategori optimal** (kondisi $s$ tidak terpenuhi, bernilai $\\sim s$).",
  "question_markdown": "Berdasarkan rangkaian premis ilmiah dan fakta pengukuran lapangan tersebut, simpulan yang **pasti benar secara kaidah deduktif** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Hutan mangrove pesisir Teluk Nipah dipastikan tidak direstorasi dengan kerapatan pohon di atas 2.500 batang per hektare."
    },
    {
      "key": "B",
      "text_markdown": "Laju pelepasan emisi gas metana ke atmosfer di Teluk Nipah tetap mengalami penurunan drastis."
    },
    {
      "key": "C",
      "text_markdown": "Jika kapasitas sekuestrasi karbon biru meningkat empat kali lipat, maka indeks resiliensi pesisir pasti mencapai kategori optimal."
    },
    {
      "key": "D",
      "text_markdown": "Hutan mangrove pesisir Teluk Nipah ditebang habis oleh aktivitas pembukaan tambak udang ilegal."
    },
    {
      "key": "E",
      "text_markdown": "Kapasitas sekuestrasi karbon biru sedimen tanah Teluk Nipah tetap meningkat hingga empat kali lipat."
    }
  ],
  "correct_answer": "A",
  "hint_markdown": "💡 **Petunjuk Soal:** Hubungkan seluruh premis dengan silogisme transitif: $p \\implies q \\implies r \\implies s$, sehingga diperoleh premis gabungan $p \\implies s$.\nLalu konfrontasikan dengan fakta $\\sim s$ menggunakan **Modus Tollens**: $(p \\implies s) \\land \\sim s \\vdash \\sim p$!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Pemodelan Simbolik Rantai Premis:**\n  - Premis 1: $p \\implies q$\n  - Premis 2: $q \\implies r$\n  - Premis 3: $r \\implies s$\n- **Aplikasi Silogisme Hipotetis Rantai:**\n  $$\\frac{p \\implies q, \\quad q \\implies r, \\quad r \\implies s}{\\therefore p \\implies s}$$\n  *(Jika mangrove direstorasi di atas 2.500 batang/ha, maka indeks resiliensi pesisir mencapai kategori optimal)*.\n- **Aplikasi Kaidah Modus Tollens:**\n  - Implikasi Rantai: $p \\implies s$\n  - Fakta Lapangan: $\\sim s$ *(Indeks resiliensi tidak mencapai kategori optimal)*.\n  $$\\frac{p \\implies s, \\quad \\sim s}{\\therefore \\sim p}$$\n- **Makna Konklusi ($\\sim p$):**\n  Hutan mangrove pesisir Teluk Nipah **tidak direstorasi dengan kerapatan pohon di atas 2.500 batang per hektare**.\n\n**Jawaban: A**",
  "quick_trick_markdown": "**Cara Cepat (Silogisme Rantai + Tollens Ujung ke Ujung):**\n\n1. Rantai logika: Kerapatan $> 2.500$ ($P$) $\\implies$ Karbon 4x ($Q$) $\\implies$ Metana turun ($R$) $\\implies$ Resiliensi optimal ($S$).\n2. Fakta: Resiliensi TIDAK optimal (Bukan $S$).\n3. Lewat Modus Tollens, jika ujung belakang GUGUR, maka pangkal sebab paling depan WAJIB GUGUR: Bukan $P$!\n4. Simpulan instan: Kerapatan mangrove TIDAK di atas 2.500 batang/ha.\n5. Jawaban tepat langsung tertuju pada pilihan **A**.",
  "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Melalui rantai Tollens bertahap, $\\sim s$ meniscayakan $\\sim r$ (emisi metana tidak mengalami penurunan drastis).\n- **Pilihan C Salah:** Hanya mengulang kembali implikasi parsial $q \\implies s$, bukan kesimpulan akhir dari fakta yang ada.\n- **Pilihan D Salah:** Menambahkan asumsi liar perusakan tambak udang yang tidak pernah disebutkan pada premis wacana (*out of scope*).\n- **Pilihan E Salah:** Bertentangan dengan inferensi deduktif $\\sim q$ (kapasitas sekuestrasi karbon biru tidak meningkat 4 kali lipat)."
},
{
  "example_id": "pu-02-03-ex15",
  "variation_name": "Variasi 15: Deteksi Fallacy Menegaskan Konsekuen pada Kebijakan Moneter BI (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Perhatikan dua klausul proyeksi makroekonomi perbankan sentral berikut:\n\n- **Premis 1**: Jika Bank Indonesia menaikkan suku bunga acuan (*BI-Rate*) sebesar 50 basis poin ($p$), maka volume penyaluran kredit konsumtif perbankan komersial akan mengalami perlambatan pertumbuhan ($q$).\n- **Premis 2**: Jika volume penyaluran kredit konsumtif perbankan komersial mengalami perlambatan pertumbuhan ($q$), maka laju inflasi umum tahunan (*headline inflation*) diproyeksikan terkendali di bawah batas target 3% ($r$).\n\n**Fakta Pasar Keuangan**: Laporan resmi Badan Pusat Statistik (BPS) pada penutupan triwulan berjalan mencatat fakta bahwa laju inflasi umum tahunan nasional **terbukti terkendali di bawah batas target 3%** (kondisi $r$ terkonfirmasi terjadi).",
  "question_markdown": "Berdasarkan kaidah logika formal deduktif, simpulan manakah yang **paling tepat dan sah** mengenai kebijakan suku bunga acuan Bank Indonesia ($p$)?",
  "options": [
    {
      "key": "A",
      "text_markdown": "Bank Indonesia dipastikan telah menaikkan suku bunga acuan (BI-Rate) sebesar 50 basis poin."
    },
    {
      "key": "B",
      "text_markdown": "Bank Indonesia dipastikan tidak menaikkan suku bunga acuan (BI-Rate) sebesar 50 basis poin."
    },
    {
      "key": "C",
      "text_markdown": "Bank Indonesia belum tentu telah menaikkan suku bunga acuan (BI-Rate) sebesar 50 basis poin."
    },
    {
      "key": "D",
      "text_markdown": "Volume penyaluran kredit perbankan komersial pasti mengalami akselerasi pertumbuhan yang sangat tinggi."
    },
    {
      "key": "E",
      "text_markdown": "Pemerintah melarang Bank Indonesia melakukan penyesuaian suku bunga acuan pada periode berjalan."
    }
  ],
  "correct_answer": "C",
  "hint_markdown": "💡 **Petunjuk Soal:** Cermati posisi fakta: fakta memberikan penegasan terhadap ruas kanan / akibat ($r$).\nHubungan rantai: $p \\implies r$.\nApakah penegasan ruas kanan ($r$ terjadi) sah menyimpulkan ruas kiri ($p$ terjadi)? Waspadai sesat pikir formal *Affirming the Consequent*!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Struktur Argumen:**\n  - Melalui Silogisme Hipotetis dari Premis 1 ($p \\implies q$) dan Premis 2 ($q \\implies r$), diperoleh hubungan transitif: $p \\implies r$.\n  - Fakta yang diberikan: $r$ terbukti bernilai **Benar**.\n- **Uji Keabsahan Logika Deduktif:**\n  - Argumen berbentuk: $\\frac{p \\implies r, \\quad r}{\\therefore p}$ adalah **TIDAK SAH (INVALID)**.\n  - Ini adalah sesat pikir formal klasik yang disebut **Affirming the Consequent (Menegaskan Konsekuen)**.\n  - Dalam ekonomi riil dan logika formal, inflasi yang terkendali di bawah $3\\%$ ($r$) bisa dipicu oleh faktor-faktor lain selain kenaikan suku bunga, seperti panen pangan melimpah, penurunan harga minyak global, atau stabilisasi pasokan komoditas.\n- **Simpulan yang Sah:** Keterjadian akibat ($r$) tidak menjamin kepastian terjadinya sebab ($p$). Oleh karena itu, Bank Indonesia **belum tentu telah menaikkan suku bunga acuan** (berada pada taraf kemungkinan, bukan kepastian deduktif).\n\n**Jawaban: C**",
  "quick_trick_markdown": "**Cara Cepat (Trik Deteksi Fallacy Konsekuen):**\n\n1. Bentuk rantai: $P \\implies Q \\implies R$ (Naik Bunga $\\implies$ Inflasi Terkendali).\n2. Fakta yang diketahui: Ruas belakang ($R$) terjadi!\n3. Ingat kaidah emas logika: Mengafirmasi ruas kanan (konsekuen) adalah JEBAKAN SESAT PIKIR.\n4. Konklusinya WAJIB memuat kata: **\"Belum tentu\"** atau **\"Tidak dapat dipastikan\"**.\n5. Opsi **A** (pasti ya) dan **B** (pasti tidak) langsung gugur. Pilihan yang benar adalah **C**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak sesat pikir formal *affirming the consequent* dengan memastikan sebab tunggal padahal ada alternatif pemicu lain.\n- **Pilihan B Salah:** Mengambil kesimpulan sangkalan tanpa dasar premis yang sah.\n- **Pilihan D Salah:** Bertentangan dengan status pertumbuhan kredit yang pada wacana diasosiasikan dengan kondisi inflasi.\n- **Pilihan E Salah:** Bersifat spekulatif dan tidak relevan dengan premis logika moneter yang diberikan (*out of scope*)."
},
{
  "example_id": "pu-02-03-ex16",
  "variation_name": "Variasi 16: Modus Tollens Premis Konjungtif Sindrom Burnout Klinis (Level: Sulit / HOTS)",
  "difficulty": "hard",
  "question_type": "standard_mc",
  "context_markdown": "Pedoman manajemen risiko keselamatan kerja rumah sakit rujukan menetapkan kriteria klinis berikut:\n\n*\"Jika dokter residen menjalani dinas klinis dengan beban kerja melebihi 80 jam per minggu ($p$) DAN tidak memperoleh supervisi suportif berkala dari dokter spesialis senior ($q$), maka dokter residen tersebut dipastikan mengalami kelelahan emosional ekstrem ($r$) ATAU depersonalisasi pasien yang parah ($s$).\"*\n\nRumus logika proposisi: $(p \\land q) \\implies (r \\lor s)$.\n\nDalam audit kesehatan kerja berkala, panitia evaluasi menemukan fakta riil mengenai Dokter Residen Farhan:\n1. Berdasarkan hasil asesmen psikometrik klinis standar, Dokter Residen Farhan terbukti **TIDAK mengalami kelelahan emosional ekstrem** (bernilai $\\sim r$) **DAN TIDAK mengalami depersonalisasi pasien** (bernilai $\\sim s$).\n2. Berdasarkan data logbook kehadiran digital, Dokter Residen Farhan tercatat **menjalani dinas klinis dengan beban kerja mencapai 86 jam per minggu** (kondisi $p$ terbukti benar-benar terjadi).",
  "question_markdown": "Berdasarkan kaidah logika formal deduktif, simpulan manakah yang **PASTI BENAR** mengenai supervisi yang diterima oleh Dokter Residen Farhan?",
  "options": [
    {
      "key": "A",
      "text_markdown": "Dokter Residen Farhan tidak memperoleh supervisi suportif berkala dari dokter spesialis senior."
    },
    {
      "key": "B",
      "text_markdown": "Dokter Residen Farhan dipastikan memperoleh supervisi suportif berkala dari dokter spesialis senior."
    },
    {
      "key": "C",
      "text_markdown": "Dokter Residen Farhan belum tentu memperoleh supervisi suportif dari dokter spesialis senior."
    },
    {
      "key": "D",
      "text_markdown": "Dokter Residen Farhan dipindahkan tugasnya ke unit rawat jalan non-akut."
    },
    {
      "key": "E",
      "text_markdown": "Beban kerja dinas klinis Dokter Residen Farhan diturunkan menjadi 40 jam per minggu."
    }
  ],
  "correct_answer": "B",
  "hint_markdown": "💡 **Petunjuk Soal:** Selesaikan melalui 3 langkah deduktif:\n1. Negasikan konsekuen $(r \\lor s)$: dengan De Morgan, fakta $\\sim r \\land \\sim s \\equiv \\sim(r \\lor s)$.\n2. Terapkan **Modus Tollens** pada premis utama: konsekuen gugur $\\implies$ anteseden wajib gugur: $\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$.\n3. Diketahui fakta bahwa $p$ terjadi (beban kerja $>80$ jam, sehingga $\\sim p$ Salah). Melalui **Silogisme Disjungtif**, satu-satunya yang wajib Benar adalah $\\sim q$ (memperoleh supervisi suportif)!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Pemodelan Simbolik:**\n  - Premis Utama: $(p \\land q) \\implies (r \\lor s)$\n  - Fakta Klinis: $\\sim r \\land \\sim s$\n  - Fakta Beban Jam Kerja: $p = \\text{Benar}$\n- **Langkah 1 (Hukum De Morgan pada Konsekuen):**\n  $$\\sim r \\land \\sim s \\equiv \\sim(r \\lor s)$$\n  Seluruh blok konsekuen terbukti bernilai **Salah**.\n- **Langkah 2 (Inferensi Modus Tollens):**\n  - Dengan mengonfrontasikan $(p \\land q) \\implies (r \\lor s)$ dengan $\\sim(r \\lor s)$, diperoleh konklusi:\n    $$\\therefore \\sim(p \\land q)$$\n  - Berdasarkan Hukum De Morgan, ingkaran konjungsi adalah disjungsi:\n    $$\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$$\n    *(Beban kerja tidak $>80$ jam ATAU memperoleh supervisi suportif)*.\n- **Langkah 3 (Silogisme Disjungtif dengan Fakta Jam Kerja):**\n  - Diketahui fakta bahwa Dokter Farhan bekerja 86 jam/minggu ($p$ bernilai Benar, sehingga $\\sim p$ bernilai **Salah**).\n  - Berdasarkan kaidah Silogisme Disjungtif (*Disjunctive Syllogism*):\n    $$\\frac{\\sim p \\lor \\sim q, \\quad p}{\\therefore \\sim q}$$\n  - Definisi awal: $q =$ tidak memperoleh supervisi suportif.\n  - Maka ingkarannya $\\sim q =$ **Dokter Residen Farhan memperoleh supervisi suportif berkala dari dokter spesialis senior**.\n\n**Jawaban: B**",
  "quick_trick_markdown": "**Cara Cepat (Tollens Majemuk + Eliminasi Disjungsi):**\n\n1. Syarat: (Beban $>80$ DAN Tanpa Supervisi) $\\implies$ (Lelah emosional ATAU Depersonalisasi).\n2. Fakta: Tidak lelah emosional DAN Tidak depersonalisasi (Akibat GAGAL total!).\n3. Lewat Modus Tollens: Blok sebab WAJIB GAGAL $\\implies$ Tidak mungkin terjadi kombinasi keduanya sekaligus!\n4. Karena Beban $>80$ jam SUDAH PASTI TERJADI, maka syarat 'Tanpa Supervisi' WAJIB TIDAK TERJADI agar blok sebab tidak aktif!\n5. Jadi, Dokter Farhan **PASTI MEMPEROLEH SUPERVISI SUPORTIF** ($\\sim q$).\n6. Jawaban yang tepat: **B**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Jika ia tidak memperoleh supervisi ($q$), maka bersama $p$ akan mengaktifkan premis sehingga ia wajib mengalami lelah/depersonalisasi (kontradiksi dengan fakta klinik).\n- **Pilihan C Salah:** Status $\\sim q$ adalah niscaya (pasti benar $100\\%$) lewat rantai Tollens dan disjungtif, bukan sekadar kemungkinan.\n- **Pilihan D Salah:** Merupakan tindak lanjut manajerial yang tidak termaktub dalam premis logika wacana (*out of scope*).\n- **Pilihan E Salah:** Bersifat spekulasi kebijakan masa depan yang tidak berdasar premis."
},
{
  "example_id": "pu-02-03-ex17",
  "variation_name": "Variasi 17: Silogisme Kompleks Arsitektur Keamanan Siber Zero-Trust (Level: Sulit / HOTS)",
  "difficulty": "hard",
  "question_type": "standard_mc",
  "context_markdown": "Spesifikasi protokol keamanan siber arsitektur *Zero-Trust* perbankan menetapkan aturan pertahanan sistem berikut:\n\n1. **Premis 1**: Jika lalu lintas jaringan internal terdeteksi anomali transfer data lintas subnet ($p$), maka sistem operasi secara otomatis mengaktifkan isolasi mikrosegmentasi server ($q$) ATAU mencabut token enkripsi sesi pengguna ($r$).\n   Rumus: $p \\implies (q \\lor r)$.\n2. **Premis 2**: Jika sistem operasi mengaktifkan isolasi mikrosegmentasi server ($q$), maka latensi transmisi basis data meningkat tajam di atas 200 milidetik ($s$).\n   Rumus: $q \\implies s$.\n3. **Premis 3**: Jika sistem operasi mencabut token enkripsi sesi pengguna ($r$), maka log aktivitas otentikasi mencatat status *Session Revoked* seketika ($t$).\n   Rumus: $r \\implies t$.\n\n**Fakta Telemetri Operasional**: Tim insinyur *Security Operations Center* (SOC) mengamati telemetri server pada pukul 14.00 dan menemukan fakta bahwa **latensi transmisi basis data tetap normal di angka 12 milidetik** (kondisi $s$ tidak terjadi, bernilai $\\sim s$) **DAN log aktivitas otentikasi tidak mencatat status *Session Revoked*** (kondisi $t$ tidak terjadi, bernilai $\\sim t$).",
  "question_markdown": "Berdasarkan kaidah penarikan kesimpulan deduktif, simpulan yang **PASTI BENAR** mengenai lalu lintas jaringan internal pada pukul 14.00 adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Lalu lintas jaringan internal terdeteksi mengalami serangan siber distributed denial of service (DDoS)."
    },
    {
      "key": "B",
      "text_markdown": "Sistem operasi sedang dalam proses pemeliharaan berkala basis data utama."
    },
    {
      "key": "C",
      "text_markdown": "Lalu lintas jaringan internal dipastikan TIDAK terdeteksi anomali transfer data lintas subnet."
    },
    {
      "key": "D",
      "text_markdown": "Token enkripsi sesi pengguna tetap dicabut meskipun log otentikasi tidak mencatatnya."
    },
    {
      "key": "E",
      "text_markdown": "Lalu lintas jaringan internal terdeteksi anomali transfer data lintas subnet."
    }
  ],
  "correct_answer": "C",
  "hint_markdown": "💡 **Petunjuk Soal:** Terapkan Modus Tollens pada Premis 2 dan 3 terlebih dahulu:\n- $(q \\implies s) \\land \\sim s \\vdash \\sim q$\n- $(r \\implies t) \\land \\sim t \\vdash \\sim r$\nGabungkan keduanya: $\\sim q \\land \\sim r \\equiv \\sim(q \\lor r)$ (De Morgan).\nLalu terapkan Modus Tollens pada Premis 1: $[p \\implies (q \\lor r)] \\land \\sim(q \\lor r) \\vdash \\sim p$!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Tahap 1 (Inferensi Modus Tollens Parsial):**\n  - Dari Premis 2 ($q \\implies s$) dan fakta telemetri $\\sim s$:\n    $$\\frac{q \\implies s, \\quad \\sim s}{\\therefore \\sim q}$$\n    *(Isolasi mikrosegmentasi server tidak diaktifkan)*.\n  - Dari Premis 3 ($r \\implies t$) dan fakta telemetri $\\sim t$:\n    $$\\frac{r \\implies t, \\quad \\sim t}{\\therefore \\sim r}$$\n    *(Token enkripsi sesi pengguna tidak dicabut)*.\n- **Analisis Tahap 2 (Kombinasi De Morgan):**\n  - Dari kedua kesimpulan di atas, kita peroleh fakta konjungtif: $\\sim q \\land \\sim r$.\n  - Berdasarkan Hukum De Morgan:\n    $$\\sim q \\land \\sim r \\equiv \\sim(q \\lor r)$$\n  - Artinya, seluruh konsekuen disjungtif pada Premis 1 bernilai **Salah**.\n- **Analisis Tahap 3 (Inferensi Modus Tollens Final):**\n  - Premis 1: $p \\implies (q \\lor r)$\n  - Fakta turunan: $\\sim(q \\lor r)$\n  $$\\frac{p \\implies (q \\lor r), \\quad \\sim(q \\lor r)}{\\therefore \\sim p}$$\n- **Simpulan Deduktif:** $\\sim p$ bernilai Benar, yang berarti **lalu lintas jaringan internal dipastikan tidak terdeteksi anomali transfer data lintas subnet**.\n\n**Jawaban: C**",
  "quick_trick_markdown": "**Cara Cepat (Tollens Cabang Dua ke Pangkal):**\n\n1. Cabang 1: Isolasi Mikrosegmentasi $\\implies$ Latensi $>200$ ms. Fakta: Latensi normal (12 ms) $\\implies$ TIDAK ada isolasi!\n2. Cabang 2: Cabut Token $\\implies$ Log Revoked. Fakta: Log tidak revoked $\\implies$ Token TIDAK dicabut!\n3. Kedua pilihan reaksi sistem gugur semua (bukan isolasi dan bukan cabut token).\n4. Pemicunya di awal adalah anomali data ($P$).\n5. Karena tidak ada satu pun reaksi pertahanan yang aktif, maka pemicunya PASTI TIDAK TERJADI: **Tidak ada anomali transfer data lintas subnet** ($\\sim P$)!\n6. Jawaban: **C**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menyimpulkan serangan DDoS yang tidak disebutkan dalam premis sistem (*out of scope*).\n- **Pilihan B Salah:** Asumsi operasional eksternal yang tidak memiliki kaitan logis dengan premis deduktif.\n- **Pilihan D Salah:** Bertentangan langsung dengan hasil Modus Tollens $\\sim r$ dari premis 3.\n- **Pilihan E Salah:** Kontradiksi mutlak dengan hasil pembuktian deduktif sah $\\sim p$."
},
{
  "example_id": "pu-02-03-ex18",
  "variation_name": "Variasi 18: Silogisme Disjungtif Restorasi Batuan Cagar Budaya Candi (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Tim ahli arkeologi cagar budaya menyusun pedoman konservasi batuan candi andesit peninggalan abad ke-9:\n\n1. **Premis 1**: Tim konservasi melakukan pembersihan lumut kerak menggunakan larutan kimia sintetis biosida ($a$) ATAU menggunakan teknologi semburan uap air bertekanan rendah yang dipadukan ekstrak herbal minyak atsiri ($b$).\n   Rumus: $a \\lor b$.\n2. **Premis 2**: Jika tim konservasi melakukan pembersihan lumut kerak menggunakan larutan kimia sintetis biosida ($a$), maka pori-pori batuan andesit akan mengalami akumulasi garam kimiawi (*salt efflorescence*) ($c$).\n   Rumus: $a \\implies c$.\n3. **Premis 3**: Jika pori-pori batuan andesit mengalami akumulasi garam kimiawi ($c$), maka detail relief ukiran dinding candi akan mengalami pengikisan estetika sejarah dalam jangka panjang ($d$).\n   Rumus: $c \\implies d$.\n\n**Fakta Pengujian Laboratorium Konservasi**: Hasil pemindaian mikroskopis elektron dan laser fotogrametri 3D menunjukkan bukti definitif bahwa relief ukiran dinding candi **TIDAK mengalami pengikisan estetika sejarah** (kondisi $d$ terbukti tidak terjadi, bernilai $\\sim d$).",
  "question_markdown": "Berdasarkan premis dan fakta pengujian laboratorium tersebut, simpulan yang **PASTI BENAR secara kaidah deduktif** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Tim konservasi dipastikan melakukan pembersihan lumut kerak menggunakan teknologi semburan uap air bertekanan rendah dan ekstrak herbal minyak atsiri."
    },
    {
      "key": "B",
      "text_markdown": "Tim konservasi dipastikan melakukan pembersihan lumut kerak menggunakan larutan kimia sintetis biosida dosis rendah."
    },
    {
      "key": "C",
      "text_markdown": "Pori-pori batuan andesit candi tetap mengalami akumulasi garam kimiawi dalam tingkat ringan."
    },
    {
      "key": "D",
      "text_markdown": "Relief ukiran candi tidak dibersihkan sama sekali oleh tim arkeologi cagar budaya."
    },
    {
      "key": "E",
      "text_markdown": "Larutan kimia sintetis biosida aman digunakan untuk seluruh jenis batuan cagar budaya purbakala."
    }
  ],
  "correct_answer": "A",
  "hint_markdown": "💡 **Petunjuk Soal:** Selesaikan dalam dua tahapan penalaran deduktif:\n1. Sambungkan Premis 2 dan 3 dengan Silogisme Hipotetis: $a \\implies c \\implies d$, menghasilkan $a \\implies d$.\n   Konfrontasikan dengan fakta $\\sim d$ menggunakan **Modus Tollens**: $(a \\implies d) \\land \\sim d \\vdash \\sim a$ (Larutan kimia biosida TIDAK digunakan).\n2. Konfrontasikan $\\sim a$ dengan Premis 1 ($a \\lor b$) menggunakan **Silogisme Disjungtif**: karena alternatif $a$ gugur, maka alternatif $b$ PASTI DIPILIH!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Tahap 1 (Silogisme Hipotetis dan Modus Tollens):**\n  - Premis 2: $a \\implies c$\n  - Premis 3: $c \\implies d$\n  - Silogisme Transitif:\n    $$\\frac{a \\implies c, \\quad c \\implies d}{\\therefore a \\implies d}$$\n  - Diberikan fakta laboratorium: $\\sim d$ *(Relief ukiran tidak mengalami pengikisan)*.\n  - Kaidah Modus Tollens:\n    $$\\frac{a \\implies d, \\quad \\sim d}{\\therefore \\sim a}$$\n  - Hasil Tahap 1: $\\sim a$ bernilai **Benar** *(Tim konservasi TIDAK melakukan pembersihan menggunakan larutan kimia sintetis biosida)*.\n- **Tahap 2 (Silogisme Disjungtif / Disjunctive Syllogism):**\n  - Premis 1: $a \\lor b$\n  - Fakta turunan dari Tahap 1: $\\sim a$\n  - Berdasarkan kaidah Silogisme Disjungtif:\n    $$\\frac{a \\lor b, \\quad \\sim a}{\\therefore b}$$\n  - Hasil Tahap 2: $b$ bernilai **Benar**.\n- **Simpulan Deduktif:** Tim konservasi dipastikan **melakukan pembersihan lumut kerak menggunakan teknologi semburan uap air bertekanan rendah yang dipadukan ekstrak herbal minyak atsiri** ($b$).\n\n**Jawaban: A**",
  "quick_trick_markdown": "**Cara Cepat (Tollens Rantai lalu Pilih Opsi Disjungsi Tersisa):**\n\n1. Rantai biosida: Kimia biosida ($a$) $\\implies$ Garam ($c$) $\\implies$ Relief terkikis ($d$).\n2. Fakta laboratorium: Relief TIDAK terkikis (Bukan $d$).\n3. Lewat Modus Tollens: Kimia biosida PASTI TIDAK DIPAKAI (Bukan $a$).\n4. Di awal disajikan 2 pilihan alternatif: Kimia biosida ($a$) ATAU Uap air & minyak atsiri ($b$).\n5. Karena opsi biosida ($a$) terbukti tidak dipakai, maka SATU-SATUNYA metode yang pasti dipakai adalah: **Uap air bertekanan rendah dan ekstrak herbal minyak atsiri** ($b$)!\n6. Jawaban yang tepat: **A**.",
  "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Bertentangan secara frontal dengan hasil pembuktian Modus Tollens $\\sim a$.\n- **Pilihan C Salah:** Melalui Modus Tollens dari premis 3, $\\sim d$ meniscayakan $\\sim c$ (tidak terjadi akumulasi garam).\n- **Pilihan D Salah:** Bertentangan dengan premis 1 yang menetapkan salah satu dari dua metode konservasi pasti dijalankan ($a \\lor b$).\n- **Pilihan E Salah:** Generalisasi keliru yang bertentangan dengan efek akumulasi garam pada premis 2."
}
  ]
};
