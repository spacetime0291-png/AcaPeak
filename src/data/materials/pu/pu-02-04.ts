import type { Material } from '../../../types/material';

export const MATERIAL_PU_02_04: Material = {
  "metadata": {
    "id": "pu-2-4",
    "subtest": "PU",
    "chapter_num": 2,
    "chapter_title": "Penalaran Deduktif",
    "subchapter_num": "2.4",
    "subchapter_title": "Logika Kuantor dan Diagram Venn",
    "title": "Logika Kuantor dan Diagram Venn",
    "required_question_variations": [
      "Penarikan Kesimpulan Kuantor Universal & Partikular",
      "Evaluasi Hubungan Tiga Entitas via Diagram Venn",
      "Jebakan Dua Premis Partikular & Validitas Himpunan Irisan (HOTS)"
    ],
    "requires_svg": false,
    "updated_at": "2026-11-09"
  },
  "content": {
    "tactical_overview": "Logika kuantor mengkaji cakupan kebenaran suatu pernyataan terhadap anggota himpunannya menggunakan kuantor universal (\"semua/setiap\") dan kuantor eksistensial (\"sebagian/beberapa/ada\"). Di UTBK SNBT, visualisasi Diagram Venn merupakan alat bantu terbaik untuk memetakan irisan, gabungan, atau keterpisahan antarkelompok. Kunci terpenting adalah mengingat aturan emas: jika salah satu premis bersifat partikular (sebagian), maka kesimpulan wajib partikular; dan jika kedua premis sama-sama partikular (sebagian + sebagian), maka tidak dapat ditarik kesimpulan pasti mengenai hubungan kedua ujung himpunan.",
    "exam_blueprint_markdown": "# 1. Prinsip Dasar\n\nLogika kuantor menelaah pernyataan yang memuat kata penunjuk kuantitas atau jumlah anggota suatu himpunan subjek. Di dalam ujian UTBK SNBT, soal jenis ini paling efektif diselesaikan dengan memvisualisasikan hubungan antarhimpunan ke dalam **Diagram Venn**.\n\nTiga konsep dasar logika kuantor dan diagram Venn yang wajib Anda kuasai adalah:\n\n1. **Dua Jenis Kuantor Baku**  \n   - **Kuantor Universal (Simbol: $\\forall$ — kata kunci: \"Semua\", \"Setiap\", \"Seluruh\", \"Tanpa Terkecuali\")**  \n     Menyatakan bahwa suatu sifat berlaku mutlak untuk seluruh anggota himpunan tanpa satu pun pengecualian. Secara diagram Venn, lingkaran himpunan $A$ berada **sepenuhnya di dalam** lingkaran himpunan $B$ ($A \\subset B$).  \n     *Pola:* *\"Semua $A$ adalah $B$\"*.  \n   - **Kuantor Eksistensial / Partikular (Simbol: $\\exists$ — kata kunci: \"Beberapa\", \"Sebagian\", \"Ada\", \"Terdapat\", \"Minimal Satu\")**  \n     Menyatakan bahwa terdapat **minimal satu** anggota yang memenuhi sifat tersebut. Perlu dicatat: dalam kaidah logika, frasa *\"sebagian\"* tidak berarti separuh (50%), melainkan mencakup rentang dari 1 anggota hingga seluruhnya ($1 \\le n \\le N$). Secara diagram Venn, himpunan $A$ dan himpunan $B$ **memiliki daerah irisan (*overlap*) yang tidak kosong** ($A \\cap B \\neq \\emptyset$).  \n     *Pola:* *\"Sebagian $A$ adalah $B$\"*.\n\n2. **Aturan Baku Kombinasi Kuantor dalam Penarikan Kesimpulan**  \n   - **Premis Universal + Premis Universal $\\rightarrow$ Kesimpulan Universal**  \n     *Premis 1:* Semua $A$ adalah $B$.  \n     *Premis 2:* Semua $B$ adalah $C$.  \n     *Kesimpulan Sah:* **Semua $A$ adalah $C$**.  \n   - **Premis Universal + Premis Partikular $\\rightarrow$ Kesimpulan Wajib Partikular**  \n     *Premis 1:* Semua $A$ adalah $B$.  \n     *Premis 2:* Sebagian $C$ adalah $A$.  \n     *Kesimpulan Sah:* **Sebagian $C$ adalah $B$**.  \n     *(Jika ada satu premis menggunakan kata \"sebagian\", kesimpulan tidak boleh menggunakan kata \"semua\")*.  \n   - **Premis Universal Negatif (Pemisahan Total)**  \n     *Premis 1:* Semua $A$ adalah $B$.  \n     *Premis 2:* Tidak ada satupun $B$ yang merupakan $C$ (lingkaran $B$ dan $C$ saling lepas).  \n     *Kesimpulan Sah:* **Tidak ada satupun $A$ yang merupakan $C$** *(karena $A$ ada di dalam $B$, maka $A$ mustahil menyentuh $C$)*.\n\n3. **Aturan Gugurnya Dua Premis Partikular (Sebagian + Sebagian)**  \n   - *Premis 1:* Sebagian $A$ adalah $B$.  \n   - *Premis 2:* Sebagian $B$ adalah $C$.  \n   - **Kesimpulan Sah:** **TIDAK DAPAT DITARIK KESIMPULAN PASTI**.  \n   Dalam diagram Venn, daerah irisan antara $A$ dan $B$ bisa saja sama sekali tidak bersentuhan dengan daerah irisan antara $B$ dan $C$. Hubungan antara $A$ dan $C$ berada pada status *belum tentu*, sehingga opsi yang menyatakan kepastian wajib dieliminasi.\n\n---\n\n# 2. Jebakan Pengecoh Khas UTBK\n\nPembuat naskah UTBK sengaja merancang opsi jawaban yang memanfaatkan persepsi bahasa sehari-hari yang menyimpang dari kaidah logika himpunan:\n\n1. **Jebakan Menganggap \"Sebagian\" Melarang \"Semua\"**  \n   Ketika teks menyatakan *\"Sebagian atlet menyukai musik jazz\"*, siswa sering membuat asumsi sepihak bahwa *\"Sebagian atlet pasti tidak menyukai musik jazz\"*. Padahal dalam logika formal, pernyataan eksistensial hanya mengonfirmasi keberadaan minimal satu orang tanpa melarang kemungkinan bahwa seluruh atlet menyukainya.\n2. **Jebakan Menyimpulkan Hubungan dari Dua Premis Partikular**  \n   Pilihan jawaban menghubungkan dua hal hanya karena keduanya sama-sama memiliki relasi *\"sebagian\"* dengan kelompok penengah. Ingat: dua premis berkuantor sebagian tidak pernah menjamin adanya irisan bersama antara ujung awal dan ujung akhir.\n3. **Jebakan Melompat Keluar dari Irisan Diagram Venn**  \n   Pilihan jawaban mengambil kesimpulan spekulatif mengenai daerah komplemen (daerah di luar lingkaran) yang tidak memiliki keterangan bukti di dalam teks wacana.\n\n---\n\n# 3. Trik Cepat (15 Detik)\n\nTerapkan algoritma seleksi cepat berikut saat menghadapi soal kuantor dan diagram Venn:\n\n1. **Terapkan Rumus Kuantor Terlemah**  \n   Periksa kuantor pada seluruh premis soal:  \n   - Jika salah satu premis memuat kata **\"Sebagian / Beberapa / Ada\"**, maka kunci jawaban **WAJIB memuat kata \"Sebagian / Beberapa / Ada\"**. Segera coret semua opsi yang menggunakan kata *\"Semua / Seluruh\"*.  \n   - Jika salah satu premis memuat kata **\"Tidak / Bukan\"**, maka kesimpulan **WAJIB memuat kata \"Tidak / Bukan\"**.\n2. **Deteksi Cepat Dua Premis Sebagian**  \n   Jika Anda melihat Premis 1 berbunyi *\"Sebagian...\"* dan Premis 2 juga berbunyi *\"Sebagian...\"*, jangan buang waktu menggambar! Langsung cari opsi jawaban: *\"Tidak dapat ditarik simpulan\"* atau *\"Belum tentu...\"*.\n3. **Sketsa Mental 3 Lingkaran Venn**  \n   Bayangkan tiga lingkaran: jika lingkaran $A$ berada di dalam $B$, dan sebagian $C$ menembus $A$, maka bagian $C$ yang berada di dalam $A$ tersebut secara otomatis ikut berada di dalam $B$.\n\n---\n\n# 4. Kesimpulan\n\n- **Hakikat Materi:** Logika kuantor menguji hubungan cakupan himpunan antarobjek (universal penuh vs eksistensial minimal satu).\n- **Prinsip Diagram Venn:**  \n  - \"Semua $A$ adalah $B$\" $\rightarrow$ Lingkaran $A$ berada di dalam lingkaran $B$.  \n  - \"Sebagian $A$ adalah $B$\" $\rightarrow$ Lingkaran $A$ dan $B$ saling beririsan.  \n  - \"Tidak ada $A$ yang $B$\" $\rightarrow$ Lingkaran $A$ dan $B$ terpisah sempurna.\n- **Kaidah Simpulan Baku:**  \n  - Universal + Partikular $\rightarrow$ Partikular.  \n  - Partikular + Partikular $\rightarrow$ Gugur / Tidak dapat disimpulkan.\n- **Strategi Eliminasi:** Eliminasi opsi berkuantor *\"Semua\"* jika terdapat premis *\"Sebagian\"*, dan waspadai klaim daerah luar irisan.\n\n---\n\n# 5. Bedah Soal dan Variasi UTBK\n\nBerikut adalah bedah tiga variasi soal Logika Kuantor dan Diagram Venn yang rutin keluar pada naskah UTBK SNBT, lengkap dengan konteks premis, opsi pilihan ganda utuh, kunci jawaban, dan pembahasan logika terperinci:\n\n### Variasi 1: Penarikan Kesimpulan Kuantor Universal & Partikular\n\n> **Konteks Wacana Soal:**  \n> Perhatikan dua premis mengenai komunitas akademik kampus berikut ini:  \n> Premis 1: Semua anggota klub astronomi observasional menguasai pengoperasian teleskop optik canggih.  \n> Premis 2: Sebagian mahasiswa program studi ilmu fisika adalah anggota klub astronomi observasional.  \n>  \n> **Pertanyaan UTBK:** *Simpulan yang paling tepat dan sah secara logika deduktif berdasarkan kedua premis tersebut adalah...*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Semua mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih.  \n> - **B.** Sebagian mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih.  \n> - **C.** Semua orang yang menguasai pengoperasian teleskop optik canggih adalah mahasiswa program studi ilmu fisika.  \n> - **D.** Sebagian mahasiswa program studi ilmu fisika bukan merupakan anggota klub astronomi observasional dan pasti tidak dapat mengoperasikan teleskop optik canggih.  \n> - **E.** Tidak ada mahasiswa program studi ilmu fisika yang tidak menguasai pengoperasian teleskop optik canggih.\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Himpunan & Diagram Venn:**  \n  - Misalkan $A$ = Himpunan Anggota klub astronomi observasional.  \n  - Misalkan $T$ = Himpunan Orang yang menguasai pengoperasian teleskop optik canggih.  \n  - Misalkan $F$ = Himpunan Mahasiswa program studi ilmu fisika.  \n  - **Premis 1:** Semua $A$ adalah $T$ ($A \\subset T$). Seluruh lingkaran klub astronomi berada di dalam lingkaran penguasa teleskop.  \n  - **Premis 2:** Sebagian $F$ adalah $A$ ($F \\cap A \\neq \\emptyset$). Terdapat irisan antara himpunan mahasiswa fisika dengan klub astronomi.\n- **Penarikan Kesimpulan:**  \n  Karena sebagian mahasiswa fisika ($F$) berada di dalam lingkaran klub astronomi ($A$), dan seluruh lingkaran $A$ berada di dalam lingkaran penguasa teleskop ($T$), maka mahasiswa fisika yang berada di dalam irisan $A$ tersebut secara otomatis pasti berada di dalam lingkaran $T$.  \n  Oleh sebab itu, kesimpulan sah yang dihasilkan adalah: **\"Sebagian mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih\"** ($F \\cap T \\neq \\emptyset$).\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Menggunakan kuantor universal *\"Semua\"*, padahal premis 2 bersifat partikular (*\"Sebagian\"*).  \n  - **Pilihan C Salah:** Membalik hubungan himpunan secara keliru; penguasa teleskop adalah himpunan semesta yang lebih luas.  \n  - **Pilihan D Salah:** Membuat vonis kepastian mutlak mengenai daerah komplemen di luar irisan yang tidak dibahas di dalam premis.  \n  - **Pilihan E Salah:** Maknanya setara dengan *\"Semua mahasiswa fisika menguasai...\"*, yang bertentangan dengan kaidah kuantor partikular.\n- **Penerapan Trik Cepat (15 Detik):** Karena premis 2 memuat kata *\"Sebagian\"*, maka kesimpulan wajib memuat kata *\"Sebagian\"*. Coret langsung opsi A dan E yang bermakna universal. Coret opsi D yang menghakimi daerah luar. Pilihan yang tepat dan aman adalah pilihan **B**.\n\n---\n\n### Variasi 2: Evaluasi Hubungan Tiga Entitas via Diagram Venn\n\n> **Konteks Wacana Soal:**  \n> Perhatikan tiga ketentuan kepegawaian dalam sebuah konsultan kreatif berikut:  \n> (1) Semua tenaga ahli desainer grafis menguasai perangkat lunak ilustrasi vektor 3D.  \n> (2) Tidak ada satupun staf auditor keuangan internal yang menguasai perangkat lunak ilustrasi vektor 3D.  \n> (3) Sebagian staf divisi komunikasi publik adalah tenaga ahli desainer grafis.  \n>  \n> **Pertanyaan UTBK:** *Berdasarkan ketiga premis tersebut dan representasi diagram Venn, manakah simpulan yang PASTI BENAR?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Semua staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal.  \n> - **B.** Sebagian staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal.  \n> - **C.** Semua tenaga ahli desainer grafis adalah staf divisi komunikasi publik.  \n> - **D.** Sebagian staf auditor keuangan internal menguasai perangkat lunak ilustrasi vektor 3D.  \n> - **E.** Tidak ada staf divisi komunikasi publik yang menguasai perangkat lunak ilustrasi vektor 3D.\n\n**Kunci Jawaban: B**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Relasi Himpunan Tiga Lingkaran:**  \n  - Himpunan Desainer Grafis ($D$) berada sepenuhnya di dalam Himpunan Penguasa Vektor 3D ($V$), yaitu $D \\subset V$.  \n  - Himpunan Auditor Keuangan ($K$) saling lepas sempurna (*disjoint*) dengan Himpunan $V$, yaitu $K \\cap V = \\emptyset$. Akibatnya, lingkaran $K$ juga terpisah mutlak dari lingkaran $D$ ($K \\cap D = \\emptyset$).  \n  - Himpunan Staf Komunikasi Publik ($P$) memiliki irisan dengan Desainer Grafis ($D$), yaitu $P \\cap D \\neq \\emptyset$.\n- **Langkah Deduksi Logis:**  \n  Terdapat sebagian anggota staf komunikasi publik ($P$) yang merupakan desainer grafis ($D$). Karena seluruh desainer grafis ($D$) berada di dalam lingkaran $V$, dan lingkaran $V$ sama sekali tidak menyentuh auditor keuangan ($K$), maka anggota staf komunikasi publik yang berprofesi sebagai desainer grafis tersebut **dipastikan bukan merupakan staf auditor keuangan internal**.  \n  Konklusi sah: **\"Sebagian staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal\"**.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Menyimpulkan untuk *\"Semua\"* staf komunikasi publik, padahal premis 3 hanya mengonfirmasi irisan *\"Sebagian\"*. Anggota komunikasi publik lainnya yang bukan desainer grafis bisa saja merangkap auditor.  \n  - **Pilihan C Salah:** Mengacaukan arah irisan; sebagian staf komunikasi adalah desainer, bukan berarti semua desainer adalah staf komunikasi.  \n  - **Pilihan D Salah:** Bertentangan langsung dengan premis 2 yang menyatakan tidak ada satupun auditor yang menguasai vektor 3D.  \n  - **Pilihan E Salah:** Bertentangan dengan gabungan premis 1 dan 3 yang membuktikan bahwa staf komunikasi yang menjadi desainer pasti menguasai vektor 3D.\n- **Penerapan Trik Cepat (15 Detik):** Perhatikan kombinasi kuantor: Universal Negatif (Premis 2: *Tidak ada satupun auditor yang masuk lingkaran Vektor*) + Partikular (Premis 3: *Sebagian staf Komunikasi masuk lingkaran Desainer/Vektor*). Hasilnya wajib Partikular Negatif: *Sebagian staf Komunikasi BUKAN auditor*. Pilihan yang tepat adalah pilihan **B**.\n\n---\n\n### Variasi 3: Jebakan Dua Premis Partikular & Validitas Himpunan Irisan (HOTS)\n\n> **Konteks Wacana Soal:**  \n> Sebuah laporan survei komunitas kebugaran memaparkan tiga fakta himpunan responden:  \n> (1) Sebagian peserta lari maraton perkotaan menerapkan pola makan vegetarian murni.  \n> (2) Sebagian individu yang menerapkan pola makan vegetarian murni rutin mengonsumsi suplemen vitamin D dosis tinggi.  \n> (3) Semua orang yang rutin mengonsumsi suplemen vitamin D dosis tinggi memiliki tingkat kepadatan massa tulang di atas rata-rata.  \n>  \n> Berdasarkan laporan tersebut, seorang pelatih kebugaran menarik kesimpulan resmi:  \n> *\"Sebagian peserta lari maraton perkotaan pasti memiliki tingkat kepadatan massa tulang di atas rata-rata.\"*  \n>  \n> **Pertanyaan UTBK:** *Manakah evaluasi berikut yang paling tepat mengenai validitas kesimpulan pelatih kebugaran tersebut berdasarkan kaidah logika diagram Venn?*  \n>  \n> **Pilihan Ganda:**  \n> - **A.** Kesimpulan pelatih bernilai mutlak benar karena didukung oleh rantai silogisme lengkap dari premis 1 hingga premis 3.  \n> - **B.** Kesimpulan pelatih bernilai mutlak salah karena tidak ada pelari maraton yang menerapkan pola makan vegetarian murni.  \n> - **C.** Kesimpulan pelatih tidak dapat dipastikan kebenarannya (belum tentu benar) karena himpunan pelari maraton yang vegetarian belum tentu beririsan dengan himpunan vegetarian yang mengonsumsi suplemen vitamin D.  \n> - **D.** Kesimpulan pelatih pasti benar asalkan seluruh peserta lari maraton mengganti pola makan mereka menjadi vegetarian murni.  \n> - **E.** Kesimpulan pelatih seharusnya menyatakan bahwa semua peserta lari maraton memiliki kepadatan tulang di atas rata-rata.\n\n**Kunci Jawaban: C**\n\n**Bedah Logika & Pembahasan:**\n- **Analisis Kritis Diagram Venn:**  \n  - Misalkan $M$ = Peserta maraton, $V$ = Vegetarian murni, $D$ = Pengonsumsi suplemen vitamin D, dan $T$ = Kepadatan tulang di atas rata-rata.  \n  - Premis 1: $M \\cap V \\neq \\emptyset$ *(Sebagian $M$ adalah $V$)*.  \n  - Premis 2: $V \\cap D \\neq \\emptyset$ *(Sebagian $V$ adalah $D$)*.  \n  - Premis 3: $D \\subset T$ *(Semua $D$ adalah $T$)*.\n- **Identifikasi Sesat Pikir Penarikan Simpulan:**  \n  Hubungan antara himpunan $M$ dan $D$ dijembatani oleh himpunan $V$. Namun, kedua premis penghubungnya sama-sama berkuantor **partikular (\"Sebagian\")**:  \n  - Irisan pertama $(M \\cap V)$ adalah sekelompok orang vegetarian yang hobi maraton.  \n  - Irisan kedua $(V \\cap D)$ adalah sekelompok orang vegetarian yang minum vitamin D.  \n  Di dalam diagram Venn, lingkaran $M$ dan lingkaran $D$ sama-sama menembus lingkaran $V$, namun **tidak ada jaminan bahwa kedua irisan tersebut saling bertumpukan atau berada pada daerah potongan yang sama**. Bisa saja pelari maraton yang vegetarian berada di sisi kiri lingkaran $V$, sedangkan vegetarian peminum vitamin D berada di sisi kanan lingkaran $V$.  \n  Karena irisan bersama $(M \\cap D)$ belum tentu ada, maka simpulan bahwa sebagian pelari maraton pasti memiliki tulang padat ($T$) adalah **tidak sah / belum tentu benar**.\n- **Mengapa Opsi Lain Salah?**  \n  - **Pilihan A Salah:** Terjebak pada silogisme semu; rantai silogisme tidak dapat dibentuk dari dua premis partikular berturut-turut.  \n  - **Pilihan B Salah:** Mengklaim simpulan mutlak salah dengan menyangkal premis 1 yang sudah ditetapkan benar.  \n  - **Pilihan D Salah:** Mengubah premis faktual menjadi kondisi pengandaian yang tidak relevan.  \n  - **Pilihan E Salah:** Menarik kesimpulan universal yang semakin menyimpang dari kaidah logika.\n- **Penerapan Trik Cepat (15 Detik):** Segera amati kuantor premis 1 dan premis 2: keduanya diawali kata *\"Sebagian\"*. Ingat aturan emas: **Dua premis partikular (\"sebagian + sebagian\") tidak dapat menghasilkan kesimpulan pasti**. Pilihlah opsi yang menyatakan bahwa simpulan tersebut belum tentu benar karena irisan kedua kelompok belum tentu bertumpukan. Jawaban yang tepat adalah pilihan **C**.",
    "visualizations_svg": [],
    "distractor_traps": [
      "Menyimpulkan Kepastian dari Dua Premis Partikular: Mengira \"sebagian A adalah B\" dan \"sebagian B adalah C\" otomatis menghasilkan kesimpulan \"sebagian A adalah C\".",
      "Overgeneralisasi Kuantor: Memilih opsi berkuantor universal (\"semua\") saat terdapat premis berkuantor partikular (\"sebagian\").",
      "Spekulasi Daerah Komplemen: Menarik simpulan mengenai sifat objek di luar irisan diagram Venn yang tidak tercantum dalam premis teks."
    ],
    "quick_execution_algorithm": [
      "Identifikasi kuantor setiap premis (universal \"semua\" vs partikular \"sebagian\").",
      "Gunakan aturan kuantor terlemah: jika ada premis \"sebagian\", eliminasi langsung opsi yang memuat \"semua\".",
      "Jika kedua premis berkuantor \"sebagian\", pilih opsi \"tidak dapat disimpulkan\" atau \"belum tentu benar\".",
      "Gambarkan sketsa cepat 3 lingkaran diagram Venn untuk memverifikasi apakah daerah irisan pasti bertumpukan atau saling lepas."
    ]
  },
  "worked_examples": [
    {
      "example_id": "pu-02-04-ex1",
      "variation_name": "Variasi 1: Penarikan Kesimpulan Kuantor Campuran (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan dua premis mengenai komunitas akademik kampus berikut ini:\n\n**Premis 1:** Semua anggota klub astronomi observasional menguasai pengoperasian teleskop optik canggih.\n**Premis 2:** Sebagian mahasiswa program studi ilmu fisika adalah anggota klub astronomi observasional.",
      "question_markdown": "Simpulan yang **paling tepat dan sah secara logika deduktif** berdasarkan kedua premis tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih."
        },
        {
          "key": "B",
          "text_markdown": "Sebagian mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih."
        },
        {
          "key": "C",
          "text_markdown": "Semua orang yang menguasai pengoperasian teleskop optik canggih adalah mahasiswa program studi ilmu fisika."
        },
        {
          "key": "D",
          "text_markdown": "Sebagian mahasiswa program studi ilmu fisika bukan merupakan anggota klub astronomi observasional dan pasti tidak dapat mengoperasikan teleskop optik canggih."
        },
        {
          "key": "E",
          "text_markdown": "Tidak ada mahasiswa program studi ilmu fisika yang tidak menguasai pengoperasian teleskop optik canggih."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan aturan kuantor terlemah: Premis 1 berkuantor \"Semua\", Premis 2 berkuantor \"Sebagian\". Kesimpulan WAJIB berkuantor \"Sebagian\". Coret opsi A, C, dan E yang berkuantor universal!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $A$: Anggota klub astronomi\n  - $T$: Menguasai teleskop optik\n  - $F$: Mahasiswa ilmu fisika\n- **Struktur Premis:**\n  - Premis 1: $A \\subset T$ (semua $A$ adalah bagian dari $T$).\n  - Premis 2: $F \\cap A \\neq \\emptyset$ (ada irisan antara $F$ dan $A$).\n- **Deduksi Himpunan:**\n  Karena seluruh anggota himpunan $A$ berada di dalam $T$, maka irisan $F$ dengan $A$ secara otomatis juga berada di dalam $T$ ($F \\cap T \\neq \\emptyset$).\n- **Konklusi:** Sebagian mahasiswa program studi ilmu fisika menguasai pengoperasian teleskop optik canggih.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Aturan Kuantor Campuran):**\n\n1. Premis 1: *\"Semua...\"*, Premis 2: *\"Sebagian...\"*.\n2. Kombinasi *\"Semua\"* + *\"Sebagian\"* selalu menghasilkan kesimpulan berkuantor *\"Sebagian\"*.\n3. Langsung coret opsi **A** dan **E** (karena memaksakan \"semua\"), coret opsi **C** (karena membalik subjek secara universal).\n4. Pilihan yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\" yang bertentangan dengan premis partikular.\n- **Pilihan C Salah:** Membalik hubungan inklusi himpunan; penguasa teleskop mencakup kelompok yang lebih luas dari sekadar mahasiswa fisika.\n- **Pilihan D Salah:** Memberikan vonis spekulatif mutlak pada daerah di luar irisan premis.\n- **Pilihan E Salah:** Kalimat ini secara logika ekuivalen dengan kata \"Semua\", sehingga salah."
    },
    {
      "example_id": "pu-02-04-ex2",
      "variation_name": "Variasi 2: Evaluasi Hubungan Tiga Entitas via Diagram Venn (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan tiga ketentuan kepegawaian dalam sebuah konsultan kreatif berikut:\n\n(1) Semua tenaga ahli desainer grafis menguasai perangkat lunak ilustrasi vektor 3D.\n(2) Tidak ada satupun staf auditor keuangan internal yang menguasai perangkat lunak ilustrasi vektor 3D.\n(3) Sebagian staf divisi komunikasi publik adalah tenaga ahli desainer grafis.",
      "question_markdown": "Berdasarkan ketiga premis tersebut dan representasi diagram Venn, manakah simpulan yang **PASTI BENAR**?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal."
        },
        {
          "key": "B",
          "text_markdown": "Sebagian staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal."
        },
        {
          "key": "C",
          "text_markdown": "Semua tenaga ahli desainer grafis adalah staf divisi komunikasi publik."
        },
        {
          "key": "D",
          "text_markdown": "Sebagian staf auditor keuangan internal menguasai perangkat lunak ilustrasi vektor 3D."
        },
        {
          "key": "E",
          "text_markdown": "Tidak ada staf divisi komunikasi publik yang menguasai perangkat lunak ilustrasi vektor 3D."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Buat sketsa diagram Venn: Lingkaran Desainer ada di dalam Vektor 3D. Lingkaran Auditor sama sekali terpisah dari Vektor 3D (saling lepas). Karena sebagian staf Komunikasi adalah Desainer, maka kelompok staf Komunikasi tersebut PASTI bukan Auditor!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Pemodelan Himpunan:**\n  - $D$: Desainer grafis\n  - $V$: Penguasa software vektor 3D\n  - $K$: Auditor keuangan\n  - $P$: Staf komunikasi publik\n- **Relasi Antarhimpunan:**\n  1. $D \\subset V$\n  2. $K \\cap V = \\emptyset \\implies K \\cap D = \\emptyset$ (Auditor terpisah mutlak dari Desainer).\n  3. $P \\cap D \\neq \\emptyset$ (Sebagian Komunikasi adalah Desainer).\n- **Deduksi Logis:**\n  Ambil anggota $x \\in (P \\cap D)$. Karena $x \\in D$ dan $D \\cap K = \\emptyset$, maka $x \\notin K$.\n  Artinya, terdapat elemen di dalam $P$ yang bukan anggota $K$.\n- **Konklusi:** Sebagian staf divisi komunikasi publik bukan merupakan staf auditor keuangan internal.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Kombinasi Kuantor Partikular & Negatif):**\n\n1. Premis memuat: *\"Tidak ada satupun auditor yang masuk lingkaran Vektor\"* dan *\"Sebagian staf Komunikasi ada di dalam lingkaran Desainer/Vektor\"*.\n2. Kelompok staf Komunikasi yang ada di dalam Desainer tersebut mustahil menjadi auditor.\n3. Simpulan sah wajib berformat: *\"Sebagian staf Komunikasi BUKAN auditor\"*.\n4. Jawaban yang tepat adalah pilihan **B**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terlalu luas (\"Semua\"), padahal anggota komunikasi yang bukan desainer bisa saja memiliki peran lain.\n- **Pilihan C Salah:** Mengacaukan arah partikular; tidak semua desainer berada di divisi komunikasi publik.\n- **Pilihan D Salah:** Bertentangan langsung dengan premis 2 yang menyatakan auditor terpisah dari penguasa vektor.\n- **Pilihan E Salah:** Bertentangan dengan premis 1 dan 3 yang membuktikan ada staf komunikasi yang menguasai vektor."
    },
    {
      "example_id": "pu-02-04-ex3",
      "variation_name": "Variasi 3: Jebakan Dua Premis Partikular / Validitas Irisan (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah laporan survei komunitas kebugaran memaparkan tiga fakta himpunan responden:\n\n(1) Sebagian peserta lari maraton perkotaan menerapkan pola makan vegetarian murni.\n(2) Sebagian individu yang menerapkan pola makan vegetarian murni rutin mengonsumsi suplemen vitamin D dosis tinggi.\n(3) Semua orang yang rutin mengonsumsi suplemen vitamin D dosis tinggi memiliki tingkat kepadatan massa tulang di atas rata-rata.\n\nBerdasarkan laporan tersebut, seorang pelatih kebugaran menarik kesimpulan resmi:\n*\"Sebagian peserta lari maraton perkotaan pasti memiliki tingkat kepadatan massa tulang di atas rata-rata.\"*",
      "question_markdown": "Manakah evaluasi berikut yang **paling tepat** mengenai validitas kesimpulan pelatih kebugaran tersebut berdasarkan kaidah logika diagram Venn?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Kesimpulan pelatih bernilai mutlak benar karena didukung oleh rantai silogisme lengkap dari premis 1 hingga premis 3."
        },
        {
          "key": "B",
          "text_markdown": "Kesimpulan pelatih bernilai mutlak salah karena tidak ada pelari maraton yang menerapkan pola makan vegetarian murni."
        },
        {
          "key": "C",
          "text_markdown": "Kesimpulan pelatih tidak dapat dipastikan kebenarannya (belum tentu benar) karena himpunan pelari maraton yang vegetarian belum tentu beririsan dengan himpunan vegetarian yang mengonsumsi suplemen vitamin D."
        },
        {
          "key": "D",
          "text_markdown": "Kesimpulan pelatih pasti benar asalkan seluruh peserta lari maraton mengganti pola makan mereka menjadi vegetarian murni."
        },
        {
          "key": "E",
          "text_markdown": "Kesimpulan pelatih seharusnya menyatakan bahwa semua peserta lari maraton memiliki kepadatan tulang di atas rata-rata."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Waspadai jebakan dua premis partikular (\"sebagian + sebagian\")! Pelari maraton beririsan dengan vegetarian. Vegetarian beririsan dengan peminum vitamin D. Apakah kedua irisan tersebut pasti menempati orang yang sama? Belum tentu! Irisan keduanya bisa saling lepas.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Analisis Struktur Kuantor:**\n  - Premis 1: Sebagian $M$ adalah $V$ ($M \\cap V \\neq \\emptyset$).\n  - Premis 2: Sebagian $V$ adalah $D$ ($V \\cap D \\neq \\emptyset$).\n  - Premis 3: Semua $D$ adalah $T$ ($D \\subset T$).\n- **Evaluasi Cacat Logika:**\n  - Premis 1 dan Premis 2 sama-sama berkuantor **partikular**.\n  - Daerah $(M \\cap V)$ dan daerah $(V \\cap D)$ sama-sama berada di dalam lingkaran $V$, namun **tidak ada premis yang menyatakan bahwa kedua daerah irisan tersebut bertumpukan** ($(M \\cap V) \\cap (V \\cap D) = \\emptyset$ mungkin terjadi).\n  - Akibatnya, hubungan antara peserta maraton ($M$) dengan peminum vitamin D ($D$) atau pemilik tulang padat ($T$) berada pada taraf **belum tentu benar**.\n- **Konklusi:** Kesimpulan pelatih tidak valid secara deduktif karena mengasumsikan adanya irisan yang belum tentu ada.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Hukum Kegagalan Dua Premis Partikular):**\n\n1. Premis 1 memuat *\"Sebagian\"*, Premis 2 memuat *\"Sebagian\"*.\n2. Dua premis partikular tidak pernah bisa disambungkan secara deduktif untuk membuktikan kepastian.\n3. Langsung cari opsi yang menyatakan: *\"Tidak dapat dipastikan kebenarannya / belum tentu benar karena irisan belum tentu bertemu\"*.\n4. Jawaban yang tepat adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terkecoh menganggap rantai valid, padahal menghubungkan dua premis partikular adalah cacat logika deduktif.\n- **Pilihan B Salah:** Mengklaim mutlak salah dengan menyangkal kebenaran premis 1.\n- **Pilihan D Salah:** Menghadirkan asumsi pengandaian di luar fakta yang diuji.\n- **Pilihan E Salah:** Mengubah simpulan menjadi universal yang semakin menyalahi kaidah himpunan."
    },
    {
      "example_id": "pu-02-04-ex4",
      "variation_name": "Variasi 4: Relasi Himpunan Tiga Entitas Adaptasi Vegetasi Mangrove (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Perhatikan tiga premis biologi konservasi mengenai keanekaragaman flora ekosistem lahan basah pesisir berikut:\n\n(1) Semua spesies vegetasi mangrove berakar napas (*pneumatofor*) memiliki adaptasi jaringan aerenkim untuk toleransi hipoksia tanah lumpur.\n(2) Tidak ada satupun tumbuhan parasit gurun (*xerofit obligat*) yang memiliki adaptasi jaringan aerenkim untuk toleransi hipoksia tanah lumpur.\n(3) Beberapa jenis pohon genus *Avicennia* yang tumbuh di muara sungai adalah vegetasi mangrove berakar napas (*pneumatofor*).",
      "question_markdown": "Berdasarkan ketiga premis tersebut dan representasi diagram Venn, simpulan yang **PASTI BENAR** adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua jenis pohon genus *Avicennia* yang tumbuh di muara sungai adalah tumbuhan parasit gurun."
        },
        {
          "key": "B",
          "text_markdown": "Semua tumbuhan yang memiliki adaptasi jaringan aerenkim adalah jenis pohon genus *Avicennia*."
        },
        {
          "key": "C",
          "text_markdown": "Tidak ada jenis pohon genus *Avicennia* yang memiliki adaptasi jaringan aerenkim untuk toleransi hipoksia tanah lumpur."
        },
        {
          "key": "D",
          "text_markdown": "Beberapa jenis pohon genus *Avicennia* yang tumbuh di muara sungai bukan merupakan tumbuhan parasit gurun (*xerofit obligat*)."
        },
        {
          "key": "E",
          "text_markdown": "Beberapa tumbuhan parasit gurun memiliki adaptasi jaringan aerenkim untuk toleransi hipoksia tanah lumpur."
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Petakan 3 lingkaran diagram Venn: Lingkaran Mangrove ($M$) ada di dalam Jaringan Aerenkim ($A$). Lingkaran Parasit Gurun ($X$) terpisah mutlak dari $A$ ($X \\cap A = \\emptyset$). Karena beberapa *Avicennia* ($V$) adalah Mangrove ($M$), maka kelompok *Avicennia* tersebut pasti berada di dalam $A$ dan mustahil menyentuh $X$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $M$: Himpunan vegetasi mangrove berakar napas\n  - $A$: Himpunan tumbuhan dengan adaptasi jaringan aerenkim\n  - $X$: Himpunan tumbuhan parasit gurun (*xerofit obligat*)\n  - $V$: Himpunan pohon genus *Avicennia* di muara sungai\n- **Relasi Premis:**\n  1. $M \\subset A$ (Semua $M$ berada di dalam $A$)\n  2. $X \\cap A = \\emptyset$ (Himpunan $X$ dan $A$ saling lepas mutlak $\\implies X \\cap M = \\emptyset$)\n  3. $V \\cap M \\neq \\emptyset$ (Terdapat irisan partikular antara $V$ dan $M$)\n- **Deduksi Himpunan Sah:**\n  Ambil elemen $y \\in (V \\cap M)$.\n  Karena $y \\in M$ dan $M \\subset A$, maka $y \\in A$.\n  Karena $X \\cap A = \\emptyset$, maka $y \\notin X$.\n  Terbukti bahwa anggota $y$ (beberapa pohon genus *Avicennia*) dipastikan bukan anggota $X$.\n- **Konklusi:** Beberapa jenis pohon genus *Avicennia* yang tumbuh di muara sungai bukan merupakan tumbuhan parasit gurun (*xerofit obligat*).\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Aturan Kuantor Negatif Campuran):**\n\n1. Premis memuat kuantor: Universal Negatif (Premis 2: *Tidak ada parasit gurun yang masuk lingkaran Aerenkim*) dan Partikular Positif (Premis 3: *Beberapa Avicennia masuk lingkaran Mangrove/Aerenkim*).\n2. Gabungan keduanya wajib menghasilkan Partikular Negatif: *Beberapa Avicennia BUKAN parasit gurun*.\n3. Coret opsi A, B, dan C yang berkuantor universal atau bertentangan fakta.\n4. Jawaban yang tepat adalah pilihan **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan secara frontal dengan fakta bahwa *Avicennia* berada di dalam lingkungan lahan basah aerenkim yang lepas dari parasit gurun.\n- **Pilihan B Salah:** Membalik relasi superset menjadi subset; jaringan aerenkim mencakup spesies tanaman rawa lainnya.\n- **Pilihan C Salah:** Bertentangan dengan gabungan premis 1 dan 3 yang membuktikan *Avicennia* yang berakar napas pasti memiliki jaringan aerenkim.\n- **Pilihan E Salah:** Mengingkari premis 2 yang secara eksplisit menyatakan pemisahan mutlak antara parasit gurun dengan jaringan aerenkim."
    },
    {
      "example_id": "pu-02-04-ex5",
      "variation_name": "Variasi 5: Jebakan Dua Kuantor Partikular Fasilitas Ekspor UMKM (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Dinas Koperasi dan Usaha Kecil Menengah mencatat laporan profil debitur usaha produktif perkotaan:\n\n(1) Sebagian pelaku UMKM kuliner kemasan olahan laut menerima fasilitas subsidi bunga Kredit Usaha Rakyat (KUR).\n(2) Sebagian pelaku UMKM yang menerima fasilitas subsidi bunga Kredit Usaha Rakyat (KUR) telah mengantongi sertifikat keamanan pangan internasional (HACCP).\n(3) Semua pelaku UMKM yang telah mengantongi sertifikat keamanan pangan internasional (HACCP) berhak mengekspor produk olahan langsung ke pasar Uni Eropa.\n\nBerdasarkan data tersebut, seorang analis pembiayaan menyimpulkan:\n*\"Sebagian pelaku UMKM kuliner kemasan olahan laut berhak mengekspor produk olahan langsung ke pasar Uni Eropa.\"*",
      "question_markdown": "Bagaimanakah evaluasi yang **paling tepat dan objektif** terhadap validitas kesimpulan analis pembiayaan tersebut berdasarkan prinsip logika kuantor diagram Venn?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Kesimpulan belum tentu benar karena himpunan pelaku UMKM kuliner olahan laut penerima KUR belum tentu beririsan dengan debitur KUR yang mengantongi sertifikat HACCP."
        },
        {
          "key": "B",
          "text_markdown": "Kesimpulan mutlak benar karena seluruh debitur subsidi bunga KUR secara otomatis memiliki akses hak ekspor ke pasar internasional."
        },
        {
          "key": "C",
          "text_markdown": "Kesimpulan mutlak salah karena tidak ada satupun pelaku UMKM kuliner kemasan olahan laut yang menerima fasilitas subsidi bunga KUR."
        },
        {
          "key": "D",
          "text_markdown": "Kesimpulan seharusnya berkuantor universal bahwa semua pelaku UMKM kuliner kemasan olahan laut berhak mengekspor produk olahan langsung ke pasar Uni Eropa."
        },
        {
          "key": "E",
          "text_markdown": "Kesimpulan pasti benar karena sertifikat HACCP merupakan syarat mutlak bagi penerima fasilitas subsidi bunga KUR."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Cermati kuantor Premis 1 dan Premis 2: keduanya berkuantor partikular (\"Sebagian...\" dan \"Sebagian...\"). Pelaku olahan laut beririsan dengan KUR. KUR beririsan dengan HACCP. Apakah irisan olahan laut dan HACCP pasti bertumpukan di dalam KUR? Belum tentu! Irisan keduanya bisa saling lepas.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Simbolik Himpunan:**\n  - $K$: Pelaku UMKM kuliner kemasan olahan laut\n  - $S$: Penerima fasilitas subsidi bunga KUR\n  - $H$: Pemegang sertifikat HACCP\n  - $E$: Berhak mengekspor produk ke Uni Eropa\n- **Analisis Struktur Kuantor:**\n  - Premis 1: $K \\cap S \\neq \\emptyset$ (Partikular)\n  - Premis 2: $S \\cap H \\neq \\emptyset$ (Partikular)\n  - Premis 3: $H \\subset E$ (Universal)\n- **Pemeriksaan Cacat Logika (Fallacy of Undistributed Middle):**\n  - Penghubung antara $K$ dan $H$ adalah himpunan $S$.\n  - Namun kedua premis penghubungnya bersifat **partikular** (*sebagian*).\n  - Daerah $(K \\cap S)$ dan daerah $(S \\cap H)$ sama-sama berada di dalam lingkaran $S$, namun **tidak ada jaminan bahwa kedua daerah irisan tersebut saling bertumpukan** ($(K \\cap S) \\cap (S \\cap H) = \\emptyset$ mungkin terjadi).\n  - Karena keberadaan irisan $(K \\cap H)$ tidak terjamin pasti, maka konklusi $(K \\cap E \\neq \\emptyset)$ berada pada status **belum tentu benar** (tidak valid secara deduktif).\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Hukum Kegagalan Dua Premis Partikular):**\n\n1. Premis 1 berkuantor *\"Sebagian\"*, Premis 2 berkuantor *\"Sebagian\"*.\n2. Hubungan *Sebagian A adalah B* dan *Sebagian B adalah C* TIDAK PERNAH menghasilkan kepastian deduktif antara A dan C!\n3. Segera pilih opsi yang menyatakan: *\"Belum tentu benar karena irisan kedua kelompok belum tentu bertumpukan\"*.\n4. Jawaban yang tepat adalah pilihan **A**.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Mengasumsikan silogisme yang salah dan mengabaikan batas kuantor partikular.\n- **Pilihan C Salah:** Mengklaim mutlak salah dengan menyangkal premis 1 yang sudah ditetapkan benar.\n- **Pilihan D Salah:** Menarik kesimpulan universal yang semakin menyimpang dari premis partikular.\n- **Pilihan E Salah:** Mengarang hubungan syarat mutlak fiktif yang tidak terdapat dalam premis soal."
    },
    {
      "example_id": "pu-02-04-ex6",
      "variation_name": "Variasi 6: Silogisme Kuantor Campuran Regulasi Emosional Mindfulness (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Sebuah institusi riset neuropsikologi klinis menetapkan temuan observasional berikut:\n\n(1) Semua individu yang terlatih mempraktikkan meditasi *mindfulness* secara teratur memiliki konektivitas fungsional prefrontal-amigdala yang stabil.\n(2) Semua individu yang memiliki konektivitas fungsional prefrontal-amigdala yang stabil mampu mengendalikan reaktivitas emosional impulsif saat menghadapi tekanan kerja.\n(3) Sebagian dokter spesialis anestesi di rumah sakit rujukan adalah individu yang terlatih mempraktikkan meditasi *mindfulness* secara teratur.",
      "question_markdown": "Simpulan yang **paling tepat dan sah secara logika deduktif** berdasarkan ketiga premis tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua dokter spesialis anestesi di rumah sakit rujukan mampu mengendalikan reaktivitas emosional impulsif saat menghadapi tekanan kerja."
        },
        {
          "key": "B",
          "text_markdown": "Semua individu yang mampu mengendalikan reaktivitas emosional impulsif saat menghadapi tekanan kerja adalah dokter spesialis anestesi."
        },
        {
          "key": "C",
          "text_markdown": "Sebagian dokter spesialis anestesi di rumah sakit rujukan mampu mengendalikan reaktivitas emosional impulsif saat menghadapi tekanan kerja."
        },
        {
          "key": "D",
          "text_markdown": "Sebagian dokter spesialis anestesi di rumah sakit rujukan tidak memiliki konektivitas fungsional prefrontal-amigdala yang stabil dan pasti mengalami gangguan emosi."
        },
        {
          "key": "E",
          "text_markdown": "Tidak ada dokter spesialis anestesi di rumah sakit rujukan yang mempraktikkan meditasi *mindfulness* secara teratur."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan aturan kuantor terlemah! Premis 1 (Semua), Premis 2 (Semua), Premis 3 (Sebagian). Karena ada satu premis \"Sebagian\", kesimpulan WAJIB berkuantor \"Sebagian\". Sambungkan rantai: Praktisi mindfulness → Konektivitas stabil → Mampu kendalikan emosi. Karena sebagian dokter anestesi adalah praktisi mindfulness, maka dokter tersebut mampu mengendalikan emosi!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $M$: Praktisi meditasi *mindfulness* teratur\n  - $K$: Pemilik konektivitas fungsional prefrontal-amigdala stabil\n  - $R$: Individu yang mampu mengendalikan reaktivitas emosional impulsif\n  - $D$: Dokter spesialis anestesi di rumah sakit rujukan\n- **Sistem Hubungan Himpunan:**\n  - Premis 1: $M \\subset K$\n  - Premis 2: $K \\subset R$\n  - Dari 1 dan 2 diperoleh rantai inklusi: $M \\subset R$ (Semua praktisi *mindfulness* berada di dalam himpunan pengendali reaktivitas emosional).\n  - Premis 3: $D \\cap M \\neq \\emptyset$ (Ada irisan antara dokter anestesi dan praktisi *mindfulness*).\n- **Deduksi Logis:**\n  Karena irisan $(D \\cap M)$ berada di dalam $M$, dan seluruh $M \\subset R$, maka irisan tersebut secara pasti berada di dalam $R$ ($D \\cap R \\neq \\emptyset$).\n- **Konklusi:** Sebagian dokter spesialis anestesi di rumah sakit rujukan mampu mengendalikan reaktivitas emosional impulsif saat menghadapi tekanan kerja.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Coret Jembatan & Kuantor Terlemah):**\n\n1. Karena terdapat premis berkuantor *\"Sebagian\"* (Premis 3), maka kesimpulan akhir mutlak wajib memuat kata *\"Sebagian\"*. Coret langsung opsi A dan B!\n2. Sambungan rantai: *Mindfulness $\\rightarrow$ Konektivitas stabil $\\rightarrow$ Kendali emosi*.\n3. Sebagian dokter anestesi ikut dalam jalur ini, sehingga simpulan langsungnya: *Sebagian dokter anestesi mampu mengendalikan reaktivitas emosional impulsif*.\n4. Jawaban yang tepat adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Memaksakan kuantor universal \"Semua\", melanggar kaidah premis partikular 3.\n- **Pilihan B Salah:** Membalik posisi subjek dan predikat serta menggunakan kuantor universal.\n- **Pilihan D Salah:** Berspekulasi mutlak mengenai daerah komplemen di luar irisan tanpa dasar premis.\n- **Pilihan E Salah:** Bertentangan secara frontal dengan fakta premis 3."
    },
    {
      "example_id": "pu-02-04-ex7",
      "variation_name": "Variasi 7: Negasi Kuantor Universal De Morgan Keamanan Siber (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Konsorsium Keamanan Siber Industri merumuskan pernyataan deklaratif mengenai standar pertahanan infrastruktur jaringan digital:\n\n*\"Semua server komputasi awan (cloud) yang terintegrasi dengan arsitektur zero-trust menerapkan modul kriptografi quantum-resistant atau dilengkapi sistem deteksi anomali berbasis kecerdasan buatan.\"*",
      "question_markdown": "Negasi (ingkaran mutlak) yang **paling tepat secara kaidah logika kuantor dan diagram Venn** dari pernyataan deklaratif tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua server komputasi awan (cloud) yang terintegrasi dengan arsitektur zero-trust tidak menerapkan modul kriptografi quantum-resistant atau tidak dilengkapi sistem deteksi anomali berbasis kecerdasan buatan."
        },
        {
          "key": "B",
          "text_markdown": "Semua server komputasi awan (cloud) yang terintegrasi dengan arsitektur zero-trust tidak menerapkan modul kriptografi quantum-resistant dan tidak dilengkapi sistem deteksi anomali berbasis kecerdasan buatan."
        },
        {
          "key": "C",
          "text_markdown": "Ada server komputasi awan (cloud) yang tidak terintegrasi dengan arsitektur zero-trust yang menerapkan modul kriptografi quantum-resistant."
        },
        {
          "key": "D",
          "text_markdown": "Ada server komputasi awan (cloud) yang terintegrasi dengan arsitektur zero-trust yang tidak menerapkan modul kriptografi quantum-resistant atau tidak dilengkapi sistem deteksi anomali berbasis kecerdasan buatan."
        },
        {
          "key": "E",
          "text_markdown": "Ada server komputasi awan (cloud) yang terintegrasi dengan arsitektur zero-trust yang tidak menerapkan modul kriptografi quantum-resistant dan tidak dilengkapi sistem deteksi anomali berbasis kecerdasan buatan."
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Ingat dua aturan negasi: 1) Kuantor universal (\"Semua\") diingkari menjadi kuantor eksistensial (\"Ada / Beberapa\"). 2) Kalimat majemuk di dalamnya diingkari dengan Hukum De Morgan: ingkaran dari \"menerapkan Q ATAU dilengkapi D\" adalah \"TIDAK menerapkan Q DAN TIDAK dilengkapi D\".",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formulasi Simbolik Kuantor Universal:**\n  $\\forall x \\in C [ Q(x) \\lor D(x) ]$\n  di mana $C$ = server arsitektur *zero-trust*, $Q(x)$ = menerapkan modul kriptografi *quantum-resistant*, dan $D(x)$ = dilengkapi sistem deteksi anomali AI.\n- **Kaidah Negasi Kuantor Universal:**\n  $\\sim (\\forall x \\in C [ P(x) ]) \\equiv \\exists x \\in C [ \\sim P(x) ]$\n  Kata *\"Semua\"* berubah menjadi *\"Ada / Beberapa / Terdapat minimal satu\"*.\n- **Penerapan Hukum De Morgan pada $\\sim (Q(x) \\lor D(x))$:**\n  $\\sim (Q(x) \\lor D(x)) \\equiv \\sim Q(x) \\land \\sim D(x)$\n  Operator disjungsi *\"atau\"* wajib bertukar menjadi konjungsi *\"dan\"*.\n- **Hasil Penggabungan Kalimat Ingkaran:**\n  *\"Ada server komputasi awan yang terintegrasi dengan arsitektur zero-trust yang TIDAK menerapkan modul kriptografi quantum-resistant DAN TIDAK dilengkapi sistem deteksi anomali berbasis kecerdasan buatan.\"*\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Tukar Kuantor & Balik De Morgan):**\n\n1. Langkah 1: Kuantor *\"Semua\"* WAJIB berubah menjadi *\"Ada / Beberapa\"*. Coret opsi A dan B!\n2. Langkah 2: Operator perangkai *\"atau\"* di dalam kurung WAJIB berubah menjadi *\"dan\"* saat dinegasikan. Coret opsi D!\n3. Opsi C salah karena menegasikan subjek himpunan semesta alih-alih predikatnya.\n4. Opsi E secara sempurna memenuhi kedua transformasi logika tersebut.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Mempertahankan kuantor \"Semua\" dan gagal menukar operator \"atau\" menjadi \"dan\".\n- **Pilihan B Salah:** Mempertahankan kuantor universal \"Semua\" alih-alih mengubahnya menjadi kuantor eksistensial \"Ada\".\n- **Pilihan C Salah:** Keliru menyangkal kondisi keanggotaan subjek himpunan (*tidak terintegrasi zero-trust*).\n- **Pilihan D Salah:** Terjebak pada kegagalan menerapkan Hukum De Morgan (kata \"atau\" tidak diubah menjadi \"dan\")."
    },
    {
      "example_id": "pu-02-04-ex8",
      "variation_name": "Variasi 8: Pemetaan Diagram Venn Partikular Spesifik Sanggar Seni Tradisi (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Kementerian Kebudayaan melakukan pendataan komunitas pelaku seni tradisional daerah berdasarkan ketentuan berikut:\n\n(1) Semua sanggar seni wayang kulit purwa membina dalang muda dari kalangan generasi z.\n(2) Sebagian sanggar seni yang membina dalang muda dari kalangan generasi z menerima anugerah fasilitasi sarana kebudayaan nasional.\n(3) Tidak ada satupun penerima anugerah fasilitasi sarana kebudayaan nasional yang menolak pencatatan digitalisasi naskah lakon kuno.\n(4) Sanggar seni \"Sasana Budaya\" adalah sanggar seni wayang kulit purwa yang menerima anugerah fasilitasi sarana kebudayaan nasional.",
      "question_markdown": "Berdasarkan keempat premis tersebut, simpulan yang **PASTI BENAR** mengenai Sanggar seni \"Sasana Budaya\" adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Sanggar seni Sasana Budaya menolak pencatatan digitalisasi naskah lakon kuno meskipun membina dalang muda."
        },
        {
          "key": "B",
          "text_markdown": "Sanggar seni Sasana Budaya membina dalang muda dari kalangan generasi z dan tidak menolak pencatatan digitalisasi naskah lakon kuno."
        },
        {
          "key": "C",
          "text_markdown": "Semua sanggar seni yang membina dalang muda dari kalangan generasi z pasti menerima anugerah fasilitasi sarana kebudayaan nasional seperti Sasana Budaya."
        },
        {
          "key": "D",
          "text_markdown": "Sanggar seni Sasana Budaya tidak membina dalang muda dari kalangan generasi z karena fokus pada digitalisasi naskah lakon kuno."
        },
        {
          "key": "E",
          "text_markdown": "Hanya sanggar seni wayang kulit purwa yang berhak menerima anugerah fasilitasi sarana kebudayaan nasional."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Telusuri keanggotaan Sasana Budaya pada Diagram Venn: Sasana Budaya adalah sanggar wayang kulit purwa → menurut premis 1, Sasana Budaya PASTI membina dalang muda. Sasana Budaya juga penerima anugerah fasilitasi → menurut premis 3, penerima anugerah PASTI TIDAK menolak digitalisasi lakon!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $W$: Sanggar seni wayang kulit purwa\n  - $D$: Sanggar pembina dalang muda generasi z\n  - $F$: Penerima anugerah fasilitasi sarana kebudayaan nasional\n  - $T$: Pihak yang menolak pencatatan digitalisasi naskah lakon kuno\n  - $s$: Entitas Sanggar seni \"Sasana Budaya\"\n- **Pemetaan Hubungan Premis:**\n  - Premis 1: $W \\subset D$\n  - Premis 2: $D \\cap F \\neq \\emptyset$\n  - Premis 3: $F \\cap T = \\emptyset$ (Semua anggota $F$ bukan anggota $T$, atau $\\forall x \\in F \\implies x \\notin T$)\n  - Premis 4: $s \\in W$ dan $s \\in F$\n- **Penarikan Kesimpulan Terhadap $s$:**\n  1. Karena $s \\in W$ dan $W \\subset D$, maka secara mutlak berlaku $s \\in D$ (*membina dalang muda generasi z*).\n  2. Karena $s \\in F$ dan $F \\cap T = \\emptyset$, maka secara mutlak berlaku $s \\notin T$ (*tidak menolak pencatatan digitalisasi naskah lakon kuno*).\n  3. Gabungan konjungsi sifat yang sah: $s \\in D \\land s \\notin T$.\n- **Konklusi:** Sanggar seni Sasana Budaya membina dalang muda dari kalangan generasi z dan tidak menolak pencatatan digitalisasi naskah lakon kuno.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Substitusi Anggota Khusus ke Diagram Venn):**\n\n1. Sifat 1: Sasana Budaya = sanggar wayang purwa $\\rightarrow$ lewat premis 1, pasti *membina dalang muda*.\n2. Sifat 2: Sasana Budaya = penerima anugerah $\\rightarrow$ lewat premis 3, pasti *tidak menolak digitalisasi naskah*.\n3. Cari opsi yang memuat kedua fakta pasti tersebut secara bersamaan. Pilihan B langsung menyajikannya secara presisi.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan langsung dengan premis 3 yang melarang penerima anugerah menolak digitalisasi naskah.\n- **Pilihan C Salah:** Terjebak overgeneralisasi dari premis 2 yang hanya menyatakan \"sebagian\".\n- **Pilihan D Salah:** Bertentangan dengan premis 1 dan premis 4 yang memastikan Sasana Budaya membina dalang muda.\n- **Pilihan E Salah:** Menghadirkan kata pembatas eksklusif \"Hanya\" yang tidak didukung oleh teks premis."
    },
    {
      "example_id": "pu-02-04-ex9",
      "variation_name": "Variasi 9: Relasi Tiga Entitas Asidifikasi Laut dan Kalsifikasi Karang (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Penelitian oseanografi biokimia mengenai dampak penurunan pH air laut terhadap ekosistem bentik zona batial memaparkan ketentuan berikut:\n\n(1) Semua spesies karang laut dalam (*cold-water corals*) yang membentuk kerangka kalsium karbonat aragonit rentan terhadap disolusi akibat fenomena kenaikan tingkat saturasi asam samudra.\n(2) Tidak ada satupun organisme bentik autotrof kemosintetik kawah hidrotermal (*hydrothermal vent fauna*) yang rentan terhadap disolusi akibat fenomena kenaikan tingkat saturasi asam samudra.\n(3) Sebagian koloni karang genus *Lophelia* yang hidup di punggung laut atlantik utara adalah spesies karang laut dalam (*cold-water corals*) yang membentuk kerangka kalsium karbonat aragonit.",
      "question_markdown": "Berdasarkan ketiga premis tersebut dan kaidah diagram Venn, manakah simpulan yang **PASTI BENAR**?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua koloni karang genus *Lophelia* yang hidup di punggung laut atlantik utara adalah organisme bentik autotrof kemosintetik kawah hidrotermal."
        },
        {
          "key": "B",
          "text_markdown": "Semua organisme bentik autotrof kemosintetik kawah hidrotermal adalah spesies karang genus *Lophelia*."
        },
        {
          "key": "C",
          "text_markdown": "Sebagian koloni karang genus *Lophelia* yang hidup di punggung laut atlantik utara bukan merupakan organisme bentik autotrof kemosintetik kawah hidrotermal."
        },
        {
          "key": "D",
          "text_markdown": "Tidak ada koloni karang genus *Lophelia* yang rentan terhadap disolusi akibat fenomena kenaikan tingkat saturasi asam samudra."
        },
        {
          "key": "E",
          "text_markdown": "Sebagian organisme bentik autotrof kemosintetik kawah hidrotermal membentuk kerangka kalsium karbonat aragonit."
        }
      ],
      "correct_answer": "C",
      "hint_markdown": "💡 **Petunjuk Soal:** Gambar 3 lingkaran diagram Venn: Lingkaran Karang Aragonit ($K$) berada di dalam Rentan Disolusi ($R$). Lingkaran Kemosintetik Hidrotermal ($H$) terpisah mutlak dari $R$ ($H \\cap R = \\emptyset$). Karena sebagian koloni *Lophelia* ($L$) adalah Karang Aragonit ($K$), maka kelompok koloni *Lophelia* tersebut pasti berada di dalam $R$ dan mustahil menyentuh $H$!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $K$: Himpunan spesies karang laut dalam pembentuk kerangka aragonit\n  - $R$: Himpunan organisme yang rentan terhadap disolusi asidifikasi samudra\n  - $H$: Himpunan organisme bentik autotrof kemosintetik kawah hidrotermal\n  - $L$: Himpunan koloni karang genus *Lophelia* di atlantik utara\n- **Pemetaan Relasi Premis:**\n  1. $K \\subset R$ (Semua $K$ adalah bagian dari $R$)\n  2. $H \\cap R = \\emptyset$ (Himpunan $H$ dan $R$ saling lepas mutlak $\\implies H \\cap K = \\emptyset$)\n  3. $L \\cap K \\neq \\emptyset$ (Terdapat irisan partikular antara $L$ dan $K$)\n- **Penarikan Kesimpulan:**\n  Ambil elemen $x \\in (L \\cap K)$.\n  Karena $x \\in K$ dan $K \\subset R$, maka $x \\in R$.\n  Karena $H \\cap R = \\emptyset$, maka elemen $x$ dipastikan bukan anggota $H$ ($x \\notin H$).\n  Dengan demikian, kelompok koloni *Lophelia* yang berada pada irisan $K$ tersebut pasti bukan organisme bentik kemosintetik hidrotermal.\n- **Konklusi:** Sebagian koloni karang genus *Lophelia* yang hidup di punggung laut atlantik utara bukan merupakan organisme bentik autotrof kemosintetik kawah hidrotermal.\n\n**Jawaban: C**",
      "quick_trick_markdown": "**Cara Cepat (Kombinasi Kuantor Partikular & Universal Negatif):**\n\n1. Premis 2 memuat: *\"Tidak ada kemosintetik yang rentan disolusi (terpisah mutlak)\"*.\n2. Premis 3 memuat: *\"Sebagian Lophelia masuk ke dalam karang aragonit yang rentan disolusi\"*.\n3. Bagian *Lophelia* tersebut mustahil menjadi organisme kemosintetik.\n4. Rumus baku UTBK: Universal Negatif + Partikular $\\rightarrow$ Partikular Negatif (*Sebagian Lophelia BUKAN kemosintetik*).\n5. Jawaban yang tepat adalah pilihan **C**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan langsung dengan premis; koloni *Lophelia* yang membentuk aragonit terpisah secara mutlak dari organisme kemosintetik kawah hidrotermal.\n- **Pilihan B Salah:** Mengacaukan dua himpunan yang saling lepas menjadi relasi universal.\n- **Pilihan D Salah:** Bertentangan dengan gabungan premis 1 dan 3 yang membuktikan bahwa *Lophelia* yang membentuk aragonit pasti rentan terhadap disolusi.\n- **Pilihan E Salah:** Bertentangan dengan premis 1 dan 2; organisme kemosintetik tidak rentan disolusi sehingga tidak mungkin memiliki kerangka aragonit yang rentan disolusi."
    },
    {
      "example_id": "pu-02-04-ex10",
      "variation_name": "Variasi 10: Jebakan Dua Kuantor Partikular Insentif Rantai Dingin Ekspor (Level: Sulit)",
      "difficulty": "hard",
      "question_type": "standard_mc",
      "context_markdown": "Kementerian Koordinator Bidang Perekonomian merilis audit logistik distribusi komoditas pangan segar:\n\n(1) Sebagian perusahaan logistik rantai dingin (*cold chain*) antarprovinsi memanfaatkan fasilitas insentif pembebasan bea masuk peremajaan armada pendingin.\n(2) Sebagian perusahaan penyedia jasa logistik yang memanfaatkan fasilitas insentif pembebasan bea masuk peremajaan armada pendingin telah mengadopsi sensor pemantau suhu berbasis IoT (*Internet of Things*).\n(3) Semua penyedia jasa logistik yang telah mengadopsi sensor pemantau suhu berbasis IoT berhak memperoleh sertifikat jaminan mutu rantai pasok ekspor produk hortikultura.\n\nBerdasarkan laporan audit tersebut, seorang konsultan logistik mengambil simpulan:\n*\"Sebagian perusahaan logistik rantai dingin (cold chain) antarprovinsi berhak memperoleh sertifikat jaminan mutu rantai pasok ekspor produk hortikultura.\"*",
      "question_markdown": "Bagaimanakah penilaian yang **paling tepat** mengenai validitas kesimpulan konsultan logistik tersebut berdasarkan kaidah diagram Venn dan logika kuantor?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Kesimpulan konsultan mutlak benar karena didukung oleh rantai hubungan silogisme lengkap dari insentif armada hingga sertifikasi ekspor."
        },
        {
          "key": "B",
          "text_markdown": "Kesimpulan konsultan mutlak salah karena tidak ada satupun perusahaan logistik rantai dingin antarprovinsi yang mengadopsi sensor pemantau suhu berbasis IoT."
        },
        {
          "key": "C",
          "text_markdown": "Kesimpulan konsultan seharusnya diperluas menjadi kuantor universal bahwa semua perusahaan logistik rantai dingin antarprovinsi berhak memperoleh sertifikat jaminan mutu rantai pasok ekspor."
        },
        {
          "key": "D",
          "text_markdown": "Kesimpulan konsultan tidak dapat dipastikan kebenarannya (belum tentu benar) karena himpunan perusahaan rantai dingin penerima insentif belum tentu beririsan dengan penerima insentif yang mengadopsi sensor pemantau suhu berbasis IoT."
        },
        {
          "key": "E",
          "text_markdown": "Kesimpulan konsultan pasti benar asalkan kementerian mewajibkan seluruh armada logistik rantai dingin memasang sensor pemantau suhu berbasis IoT."
        }
      ],
      "correct_answer": "D",
      "hint_markdown": "💡 **Petunjuk Soal:** Cermati kuantor Premis 1 dan Premis 2: keduanya diawali kata \"Sebagian\"! Perusahaan rantai dingin beririsan dengan penerima insentif. Penerima insentif beririsan dengan pengadopsi sensor IoT. Apakah kedua irisan tersebut pasti menempati perusahaan yang sama? Belum tentu! Irisan keduanya bisa saling lepas di dalam lingkaran penerima insentif.",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $C$: Perusahaan logistik rantai dingin (*cold chain*) antarprovinsi\n  - $I$: Perusahaan pemanfaat fasilitas insentif pembebasan bea masuk\n  - $S$: Perusahaan pengadopsi sensor suhu berbasis IoT\n  - $E$: Perusahaan yang berhak memperoleh sertifikat mutu ekspor hortikultura\n- **Analisis Kuantor Premis:**\n  - Premis 1: $C \\cap I \\neq \\emptyset$ (Partikular)\n  - Premis 2: $I \\cap S \\neq \\emptyset$ (Partikular)\n  - Premis 3: $S \\subset E$ (Universal)\n- **Evaluasi Cacat Logika (Fallacy of Undistributed Middle):**\n  Himpunan penengah antara $C$ dan $S$ adalah himpunan $I$.\n  Namun, kedua premis yang menghubungkannya sama-sama bersifat partikular (*sebagian*).\n  Daerah irisan $(C \\cap I)$ dan $(I \\cap S)$ sama-sama berada di dalam lingkaran $I$, namun **tidak ada jaminan bahwa kedua irisan tersebut saling bertumpukan** ($(C \\cap I) \\cap (I \\cap S) = \\emptyset$ mungkin terjadi).\n  Karena keberadaan irisan $(C \\cap S)$ tidak dapat dipastikan, maka konklusi bahwa sebagian $C$ adalah bagian dari $E$ berstatus **belum tentu benar** (tidak sah secara deduktif).\n\n**Jawaban: D**",
      "quick_trick_markdown": "**Cara Cepat (Aturan Gugurnya Dua Premis Partikular):**\n\n1. Amati Premis 1: *\"Sebagian...\"* dan Premis 2: *\"Sebagian...\"*.\n2. Rumus Emas UTBK: Dua premis partikular berturut-turut TIDAK PERNAH menghasilkan simpulan pasti!\n3. Langsung cari pilihan jawaban yang menegaskan status *\"belum tentu benar / tidak dapat dipastikan karena irisan belum tentu bertumpukan\"*.\n4. Jawaban yang tepat adalah pilihan **D**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak silogisme semu; mengabaikan fakta bahwa dua premis partikular tidak dapat disambungkan menjadi kesimpulan pasti.\n- **Pilihan B Salah:** Mengklaim mutlak salah secara ekstrem dengan menyangkal fakta yang belum diuji.\n- **Pilihan C Salah:** Mengubah simpulan menjadi universal yang semakin menyalahi batas logika himpunan.\n- **Pilihan E Salah:** Menambahkan asumsi pengandaian kebijakan baru yang tidak relevan dengan evaluasi premis yang ada."
    },
    {
      "example_id": "pu-02-04-ex11",
      "variation_name": "Variasi 11: Negasi Kuantor Eksistensial Terapi Presisi Farmakogenomik (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Komite Etik dan Riset Terapi Presisi Onkologi mengumumkan temuan hasil skrining genomik pasien tumor padat:\n\n*\"Ada pasien kanker stadium lanjut yang menerima regimen terapi target presisi yang tidak mengalami resistensi mutasi sekunder dan menunjukkan peningkatan kesintasan hidup bebas progresi (PFS).\"*",
      "question_markdown": "Negasi mutlak (ingkaran formal) yang **paling tepat secara kaidah logika kuantor** dari pernyataan komite tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua pasien kanker stadium lanjut yang menerima regimen terapi target presisi mengalami resistensi mutasi sekunder atau tidak menunjukkan peningkatan kesintasan hidup bebas progresi (PFS)."
        },
        {
          "key": "B",
          "text_markdown": "Semua pasien kanker stadium lanjut yang menerima regimen terapi target presisi mengalami resistensi mutasi sekunder dan tidak menunjukkan peningkatan kesintasan hidup bebas progresi (PFS)."
        },
        {
          "key": "C",
          "text_markdown": "Ada pasien kanker stadium lanjut yang menerima regimen terapi target presisi yang mengalami resistensi mutasi sekunder atau tidak menunjukkan peningkatan kesintasan hidup bebas progresi (PFS)."
        },
        {
          "key": "D",
          "text_markdown": "Tidak ada pasien kanker stadium lanjut yang menerima regimen terapi target presisi yang mengalami resistensi mutasi sekunder."
        },
        {
          "key": "E",
          "text_markdown": "Semua pasien kanker stadium lanjut yang tidak menerima regimen terapi target presisi mengalami resistensi mutasi sekunder atau tidak menunjukkan peningkatan kesintasan hidup bebas progresi (PFS)."
        }
      ],
      "correct_answer": "A",
      "hint_markdown": "💡 **Petunjuk Soal:** Terapkan kaidah negasi kuantor: 1) Kuantor eksistensial (\"Ada\") diingkari menjadi kuantor universal (\"Semua\"). 2) Kalimat konjungsi di dalamnya (\"TIDAK resisten DAN menunjukkan peningkatan\") diingkari menggunakan Hukum De Morgan menjadi (\"Resisten ATAU TIDAK menunjukkan peningkatan\").",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Formulasi Simbolik Kuantor Eksistensial:**\n  Misalkan $P$ adalah himpunan pasien kanker stadium lanjut penerima terapi target presisi.\n  Misalkan $R(x)$: pasien $x$ mengalami resistensi mutasi sekunder.\n  Misalkan $S(x)$: pasien $x$ menunjukkan peningkatan kesintasan hidup bebas progresi (PFS).\n  Pernyataan asli berbunyi:\n  $\\exists x \\in P [ \\sim R(x) \\land S(x) ]$\n- **Hukum Negasi Kuantor Eksistensial:**\n  $\\sim (\\exists x \\in P [ \\sim R(x) \\land S(x) ]) \\equiv \\forall x \\in P [ \\sim (\\sim R(x) \\land S(x)) ]$\n  Kuantor *\"Ada\"* berubah menjadi kuantor *\"Semua\"*.\n- **Penerapan Hukum De Morgan pada Komponen Predikat:**\n  $\\sim (\\sim R(x) \\land S(x)) \\equiv \\sim(\\sim R(x)) \\lor \\sim S(x) \\equiv R(x) \\lor \\sim S(x)$\n  Operator *\"dan\"* berubah menjadi *\"atau\"*, serta masing-masing komponen dinegasikan.\n- **Hasil Rekonstruksi Kalimat:**\n  *\"Semua pasien kanker stadium lanjut yang menerima regimen terapi target presisi mengalami resistensi mutasi sekunder atau tidak menunjukkan peningkatan kesintasan hidup bebas progresi (PFS).\"*\n\n**Jawaban: A**",
      "quick_trick_markdown": "**Cara Cepat (Tukar Kuantor & Hukum De Morgan):**\n\n1. Kuantor: Kata *\"Ada\"* WAJIB berubah menjadi *\"Semua\"*. Coret langsung opsi C dan D!\n2. Hukum De Morgan: Bagian predikat *\"TIDAK R dan S\"* bila dinegaskan menjadi *\"R atau TIDAK S\"*. Kata hubung WAJIB berubah menjadi *\"atau\"*.\n3. Coret opsi B karena masih menggunakan kata *\"dan\"*.\n4. Coret opsi E karena keliru mengubah subjek definisi himpunan.\n5. Opsi A adalah satu-satunya pilihan yang memenuhi kedua kaidah formal tersebut secara presisi.",
      "why_others_are_wrong_markdown": "- **Pilihan B Salah:** Terjebak kegagalan menerapkan Hukum De Morgan; operator \"dan\" tidak diubah menjadi \"atau\".\n- **Pilihan C Salah:** Mempertahankan kuantor eksistensial \"Ada\" alih-alih mengubahnya menjadi kuantor universal \"Semua\".\n- **Pilihan D Salah:** Merupakan negasi parsial yang menghilangkan komponen peningkatan kesintasan hidup bebas progresi.\n- **Pilihan E Salah:** Keliru menegasikan batasan subjek himpunan semesta (\"yang tidak menerima regimen...\")."
    },
    {
      "example_id": "pu-02-04-ex12",
      "variation_name": "Variasi 12: Kuantor Campuran Rantai Silogisme Litografi Semikonduktor (Level: Mudah)",
      "difficulty": "easy",
      "question_type": "standard_mc",
      "context_markdown": "Spesifikasi teknis pada konsorsium manufaktur semikonduktor fabrikasi wafer mikroprosesor mencatat ketentuan berikut:\n\n(1) Semua mesin litografi sinar ultraviolet ekstrem (*Extreme Ultraviolet / EUV*) beroperasi di dalam ruang hampa udara bertekanan ultra-rendah (*ultra-high vacuum*).\n(2) Semua mesin litografi yang beroperasi di dalam ruang hampa udara bertekanan ultra-rendah dilengkapi cermin reflektif optik multikolektor berbasis molibdenum-silikon.\n(3) Sebagian perangkat fabrikasi semikonduktor di fasilitas *cleanroom* generasi terdepan adalah mesin litografi sinar ultraviolet ekstrem (*Extreme Ultraviolet / EUV*).",
      "question_markdown": "Simpulan yang **paling tepat dan sah secara logika deduktif** berdasarkan ketiga premis spesifikasi tersebut adalah...",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua perangkat fabrikasi semikonduktor di fasilitas cleanroom generasi terdepan dilengkapi cermin reflektif optik multikolektor berbasis molibdenum-silikon."
        },
        {
          "key": "B",
          "text_markdown": "Semua mesin yang dilengkapi cermin reflektif optik multikolektor berbasis molibdenum-silikon adalah perangkat fabrikasi semikonduktor di fasilitas cleanroom generasi terdepan."
        },
        {
          "key": "C",
          "text_markdown": "Tidak ada mesin litografi sinar ultraviolet ekstrem yang beroperasi di fasilitas cleanroom generasi terdepan."
        },
        {
          "key": "D",
          "text_markdown": "Sebagian perangkat fabrikasi semikonduktor di fasilitas cleanroom generasi terdepan bukan merupakan mesin litografi dan pasti tidak memiliki cermin reflektif optik."
        },
        {
          "key": "E",
          "text_markdown": "Sebagian perangkat fabrikasi semikonduktor di fasilitas cleanroom generasi terdepan dilengkapi cermin reflektif optik multikolektor berbasis molibdenum-silikon."
        }
      ],
      "correct_answer": "E",
      "hint_markdown": "💡 **Petunjuk Soal:** Gunakan aturan kuantor terlemah! Premis 1 (Semua), Premis 2 (Semua), Premis 3 (Sebagian). Karena ada satu premis \"Sebagian\", kesimpulan akhir WAJIB berkuantor \"Sebagian\". Rantai inklusi: EUV → Hampa udara → Cermin molibdenum-silikon. Karena sebagian perangkat cleanroom adalah EUV, maka perangkat tersebut pasti memiliki cermin molibdenum-silikon!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $E$: Mesin litografi sinar ultraviolet ekstrem (EUV)\n  - $H$: Mesin yang beroperasi di ruang hampa udara ultra-rendah\n  - $M$: Mesin yang dilengkapi cermin reflektif multikolektor molibdenum-silikon\n  - $F$: Perangkat fabrikasi semikonduktor di fasilitas *cleanroom* terdepan\n- **Rantai Hubungan Inklusi:**\n  - Premis 1: $E \\subset H$\n  - Premis 2: $H \\subset M$\n  - Dari premis 1 dan 2 diperoleh relasi transitif: $E \\subset M$ (Semua mesin EUV dilengkapi cermin molibdenum-silikon).\n  - Premis 3: $F \\cap E \\neq \\emptyset$ (Terdapat irisan partikular antara perangkat *cleanroom* dan mesin EUV).\n- **Penarikan Kesimpulan:**\n  Karena irisan $(F \\cap E)$ berada di dalam himpunan $E$, dan seluruh $E$ termaktub di dalam $M$ ($E \\subset M$), maka anggota irisan tersebut secara pasti merupakan anggota dari $M$ ($F \\cap M \\neq \\emptyset$).\n- **Konklusi:** Sebagian perangkat fabrikasi semikonduktor di fasilitas *cleanroom* generasi terdepan dilengkapi cermin reflektif optik multikolektor berbasis molibdenum-silikon.\n\n**Jawaban: E**",
      "quick_trick_markdown": "**Cara Cepat (Kuantor Terlemah & Sambung Rantai):**\n\n1. Premis 3 memuat kata *\"Sebagian\"*, sehingga kesimpulan akhir MUTLAK wajib memuat kata *\"Sebagian\"*. Coret opsi A, B, dan C!\n2. Sambungkan rantai: *Perangkat cleanroom (sebagian) $\\rightarrow$ Mesin EUV $\\rightarrow$ Ruang hampa $\\rightarrow$ Cermin reflektif molibdenum-silikon*.\n3. Coret opsi D yang menghakimi spekulatif daerah di luar irisan.\n4. Jawaban yang tepat dan sah adalah pilihan **E**.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\", padahal premis 3 membatasi hubungan hanya pada \"sebagian\".\n- **Pilihan B Salah:** Membalik arah superset menjadi subset secara universal yang keliru.\n- **Pilihan C Salah:** Bertentangan langsung dengan premis 3 yang menyatakan sebagian perangkat cleanroom adalah mesin EUV.\n- **Pilihan D Salah:** Membuat klaim mutlak mengenai daerah komplemen di luar irisan tanpa dasar premis teks."
    },
    {
      "example_id": "pu-02-04-ex13",
      "variation_name": "Variasi 13: Diagram Venn Empat Entitas Konservasi Manuskrip Kuno (Level: Sedang)",
      "difficulty": "medium",
      "question_type": "standard_mc",
      "context_markdown": "Badan Pelestarian Cagar Budaya menetapkan protokol kurasi naskah kuno nusantara berdasarkan ketentuan berikut:\n\n(1) Semua filolog naskah lontar kuno menguasai pembacaan aksara Kawi arkais.\n(2) Tidak ada satupun pemandu wisata benteng kolonial yang menguasai pembacaan aksara Kawi arkais.\n(3) Sebagian kurator museum cagar budaya nasional adalah filolog naskah lontar kuno.\n(4) Semua kurator museum cagar budaya nasional memegang lisensi sertifikasi konservasi preventif material organik.",
      "question_markdown": "Berdasarkan keempat premis tersebut dan representasi diagram Venn, manakah simpulan yang **PASTI BENAR**?",
      "options": [
        {
          "key": "A",
          "text_markdown": "Semua kurator museum cagar budaya nasional adalah pemandu wisata benteng kolonial."
        },
        {
          "key": "B",
          "text_markdown": "Sebagian kurator museum cagar budaya nasional bukan merupakan pemandu wisata benteng kolonial."
        },
        {
          "key": "C",
          "text_markdown": "Semua orang yang menguasai pembacaan aksara Kawi arkais adalah filolog naskah lontar kuno."
        },
        {
          "key": "D",
          "text_markdown": "Tidak ada pemegang lisensi sertifikasi konservasi preventif material organik yang menjadi filolog naskah lontar kuno."
        },
        {
          "key": "E",
          "text_markdown": "Sebagian pemandu wisata benteng kolonial menguasai pembacaan aksara Kawi arkais."
        }
      ],
      "correct_answer": "B",
      "hint_markdown": "💡 **Petunjuk Soal:** Petakan Diagram Venn: Lingkaran Filolog ($F$) berada di dalam Aksara Kawi ($K$). Lingkaran Pemandu Wisata ($W$) terpisah mutlak dari Aksara Kawi ($K$) ($W \\cap K = \\emptyset$). Karena sebagian kurator museum ($C$) adalah filolog ($F$), maka kurator museum tersebut berada di dalam $K$ dan mustahil menyentuh pemandu wisata ($W$)!",
      "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $F$: Filolog naskah lontar kuno\n  - $K$: Orang yang menguasai pembacaan aksara Kawi arkais\n  - $W$: Pemandu wisata benteng kolonial\n  - $C$: Kurator museum cagar budaya nasional\n  - $L$: Pemegang lisensi sertifikasi konservasi preventif\n- **Pemetaan Relasi Antarhimpunan:**\n  1. $F \\subset K$ (Filolog adalah himpunan bagian dari penguasa aksara Kawi)\n  2. $W \\cap K = \\emptyset$ (Pemandu wisata dan penguasa aksara Kawi saling lepas mutlak $\\implies W \\cap F = \\emptyset$)\n  3. $C \\cap F \\neq \\emptyset$ (Terdapat irisan partikular antara kurator museum dan filolog)\n  4. $C \\subset L$ (Semua kurator berada di dalam pemegang lisensi konservasi)\n- **Penarikan Kesimpulan Terarah:**\n  Ambil elemen kurator museum $z \\in (C \\cap F)$.\n  Karena $z \\in F$ dan $F \\subset K$, maka $z \\in K$.\n  Karena $W \\cap K = \\emptyset$, maka $z \\notin W$.\n  Hal ini membuktikan secara deduktif bahwa kurator museum yang berada pada irisan $F$ tersebut dipastikan bukan merupakan anggota himpunan pemandu wisata benteng kolonial ($W$).\n- **Konklusi:** Sebagian kurator museum cagar budaya nasional bukan merupakan pemandu wisata benteng kolonial.\n\n**Jawaban: B**",
      "quick_trick_markdown": "**Cara Cepat (Substitusi Kuantor Partikular & Pemisahan Mutlak):**\n\n1. Dari premis 2: Himpunan pemandu wisata benteng kolonial terpisah mutlak dari lingkaran aksara Kawi.\n2. Dari premis 1 & 3: Sebagian kurator museum masuk ke dalam lingkaran aksara Kawi (melalui filolog naskah).\n3. Kurator museum yang berada di dalam lingkaran tersebut secara mutlak TIDAK BISA menjadi pemandu wisata benteng kolonial.\n4. Bentuk simpulan sah: *Sebagian kurator museum cagar budaya nasional BUKAN pemandu wisata benteng kolonial*.\n5. Pilihan B secara tepat merepresentasikan deduksi ini.",
      "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Bertentangan secara frontal dengan kaidah diagram Venn; ada kurator museum yang terbukti bukan pemandu wisata kolonial.\n- **Pilihan C Salah:** Membalik arah inklusi himpunan; penguasa aksara Kawi dapat mencakup arkeolog, sejarawan, atau linguis lainnya di luar filolog lontar.\n- **Pilihan D Salah:** Bertentangan dengan gabungan premis 3 dan 4 yang membuktikan adanya kurator berlisensi konservasi yang merupakan filolog naskah lontar.\n- **Pilihan E Salah:** Mengingkari premis 2 yang secara eksplisit menyatakan pemisahan mutlak (tidak ada satupun pemandu wisata benteng kolonial yang menguasai aksara Kawi)."
    },
{
  "example_id": "pu-02-04-ex14",
  "variation_name": "Variasi 14: Logika Kuantor dan Irisan Tiga Himpunan Biota Terumbu Karang (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Perhatikan tiga ketentuan ilmiah mengenai ekologi terumbu karang kepulauan berikut:\n\n1. **Premis 1**: Semua koloni karang genus *Acropora* memiliki laju kalsifikasi kerangka kapur yang sangat rentan terhadap lonjakan suhu permukaan air laut di atas 31°C.\n2. **Premis 2**: Tidak ada satupun organisme yang memiliki laju kalsifikasi rentan kenaikan suhu yang mampu bertahan hidup di zona terumbu dangkal yang terpapar gelombang panas laut ekstrem.\n3. **Premis 3**: Sebagian spesies karang pembangun terumbu (*hermatypic coral*) di perairan Kepulauan Banda adalah koloni karang genus *Acropora*.",
  "question_markdown": "Berdasarkan ketiga premis tersebut dan representasi diagram Venn, simpulan yang **PASTI BENAR** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Semua spesies karang pembangun terumbu di perairan Kepulauan Banda mampu bertahan hidup di zona terumbu dangkal yang terpapar gelombang panas laut ekstrem."
    },
    {
      "key": "B",
      "text_markdown": "Semua koloni karang genus Acropora mampu bertahan hidup di zona terumbu dangkal yang terpapar gelombang panas laut ekstrem."
    },
    {
      "key": "C",
      "text_markdown": "Sebagian spesies karang pembangun terumbu di perairan Kepulauan Banda tidak mampu bertahan hidup di zona terumbu dangkal yang terpapar gelombang panas laut ekstrem."
    },
    {
      "key": "D",
      "text_markdown": "Semua organisme yang tidak mampu bertahan hidup di zona terumbu dangkal adalah koloni karang genus Acropora."
    },
    {
      "key": "E",
      "text_markdown": "Tidak ada spesies karang pembangun terumbu di perairan Kepulauan Banda yang merupakan koloni karang genus Acropora."
    }
  ],
  "correct_answer": "C",
  "hint_markdown": "💡 **Petunjuk Soal:** Petakan tiga himpunan ke diagram Venn:\n- Lingkaran Karang *Acropora* ($A$) berada di dalam lingkaran Rentan Suhu ($R$) ($A \\subset R$).\n- Lingkaran Mampu Bertahan Panas ($B$) terpisah mutlak dari Rentan Suhu ($R$) ($B \\cap R = \\emptyset$).\n- Sebagian Karang Kepulauan Banda ($K$) adalah *Acropora* ($K \\cap A \\neq \\emptyset$).\nKarena bagian $K$ yang berada di dalam $A$ juga berada di dalam $R$, dan $R$ terpisah dari $B$, maka bagian $K$ tersebut pasti TIDAK mampu bertahan hidup di zona panas ekstrem!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $A$: Koloni karang genus *Acropora*\n  - $R$: Organisme dengan laju kalsifikasi sangat rentan kenaikan suhu di atas 31°C\n  - $B$: Organisme yang mampu bertahan hidup di zona terumbu dangkal gelombang panas ekstrem\n  - $K$: Spesies karang pembangun terumbu di Kepulauan Banda\n- **Relasi Berdasarkan Premis:**\n  1. $A \\subset R$ *(Semua A berada di dalam R)*\n  2. $R \\cap B = \\emptyset$ *(R dan B saling lepas mutlak $\\implies A \\cap B = \\emptyset$)*\n  3. $K \\cap A \\neq \\emptyset$ *(Terdapat irisan partikular antara K dan A)*\n- **Penarikan Kesimpulan:**\n  Ambil elemen $x \\in (K \\cap A)$.\n  Karena $x \\in A$ dan $A \\subset R$, maka $x \\in R$.\n  Karena $R \\cap B = \\emptyset$, maka $x \\notin B$.\n  Artinya, terdapat elemen dalam $K$ yang pasti bukan merupakan anggota $B$.\n- **Konklusi Deduktif:** **Sebagian spesies karang pembangun terumbu di Kepulauan Banda tidak mampu bertahan hidup di zona terumbu dangkal yang terpapar gelombang panas laut ekstrem** ($K \\cap B^c \\neq \\emptyset$).\n\n**Jawaban: C**",
  "quick_trick_markdown": "**Cara Cepat (Kuantor Terlemah & Coret Himpunan Lepas):**\n\n1. Aturan kuantor: Premis 3 memakai kata *\"Sebagian\"* $\\implies$ Kesimpulan WAJIB memuat kata *\"Sebagian\"*. Coret opsi A, B, D, dan E!\n2. Sisa satu-satunya opsi berkuantor sebagian adalah opsi **C**.\n3. Uji logika singkat: Karang Banda (sebagian) $\\rightarrow$ *Acropora* $\\rightarrow$ Rentan Suhu $\\rightarrow$ TIDAK bisa bertahan di panas ekstrem.\n4. Kesimpulan terverifikasi akurat: Pilihan **C**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\", bertentangan dengan irisan partikular rentan suhu.\n- **Pilihan B Salah:** Kontradiksi mutlak dengan premis 1 dan premis 2 yang membuktikan seluruh koloni *Acropora* tidak mampu bertahan.\n- **Pilihan D Salah:** Membalik relasi himpunan secara universal (*overgeneralization*).\n- **Pilihan E Salah:** Mengingkari premis 3 yang secara eksplisit menyatakan adanya irisan spesies karang Banda dengan *Acropora*."
},
{
  "example_id": "pu-02-04-ex15",
  "variation_name": "Variasi 15: Jebakan Dua Premis Partikular Subsidi Bunga KUR UMKM (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Sebuah laporan komite evaluasi pembiayaan ekonomi mikro memaparkan data himpunan debitur perbankan berikut:\n\n1. **Premis 1**: Sebagian pelaku usaha mikro, kecil, dan menengah (UMKM) sektor pangan olahan menerima fasilitas subsidi bunga Kredit Usaha Rakyat (KUR) berbunga 6% per tahun.\n2. **Premis 2**: Sebagian debitur penerima fasilitas subsidi bunga KUR berbunga 6% per tahun memanfaatkan sistem transaksi kode respons cepat standar nasional (QRIS) terintegrasi.\n3. **Premis 3**: Semua pelaku UMKM yang memanfaatkan sistem transaksi QRIS terintegrasi tercatat memiliki riwayat pelaporan omzet harian transparan pada platform perbankan digital.\n\nBerdasarkan ketiga premis tersebut, seorang analis pembiayaan menarik kesimpulan resmi:\n*\"Sebagian pelaku UMKM sektor pangan olahan dipastikan memiliki riwayat pelaporan omzet harian transparan pada platform perbankan digital.\"*",
  "question_markdown": "Manakah evaluasi berikut yang **paling tepat mengenai validitas kesimpulan** yang ditarik oleh analis pembiayaan tersebut berdasarkan kaidah logika diagram Venn?",
  "options": [
    {
      "key": "A",
      "text_markdown": "Kesimpulan analis bernilai mutlak benar karena didukung oleh rantai inklusi silogisme dari premis 1 hingga premis 3."
    },
    {
      "key": "B",
      "text_markdown": "Kesimpulan analis bernilai mutlak salah karena tidak ada pelaku UMKM sektor pangan olahan yang menggunakan sistem QRIS."
    },
    {
      "key": "C",
      "text_markdown": "Kesimpulan analis belum tentu benar (tidak dapat dipastikan secara deduktif) karena dua premis partikular tidak menjamin bertumpuknya daerah irisan UMKM pangan olahan dengan pengguna QRIS di dalam himpunan penerima subsidi KUR."
    },
    {
      "key": "D",
      "text_markdown": "Kesimpulan analis seharusnya berkuantor universal, yaitu semua pelaku UMKM sektor pangan olahan memiliki omzet transparan."
    },
    {
      "key": "E",
      "text_markdown": "Kesimpulan analis pasti benar hanya jika seluruh debitur penerima subsidi KUR merupakan pelaku usaha sektor pangan olahan."
    }
  ],
  "correct_answer": "C",
  "hint_markdown": "💡 **Petunjuk Soal:** Amati kuantor Premis 1 (\"Sebagian\") dan Premis 2 (\"Sebagian\").\nIngat aturan emas diagram Venn: Dua premis partikular berturut-turut (\"Sebagian A adalah B\" dan \"Sebagian B adalah C\") TIDAK PERNAH menjamin adanya irisan antara A dan C! Lingkaran UMKM pangan olahan dan lingkaran pengguna QRIS bisa saja berada di sisi terpisah dalam lingkaran KUR!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $U$: UMKM sektor pangan olahan\n  - $K$: Penerima subsidi bunga KUR 6%\n  - $Q$: Pengguna QRIS terintegrasi\n  - $O$: Pelaku usaha dengan riwayat omzet transparan\n- **Analisis Struktur Kuantor:**\n  - Premis 1: $U \\cap K \\neq \\emptyset$ *(Kuantor Partikular)*\n  - Premis 2: $K \\cap Q \\neq \\emptyset$ *(Kuantor Partikular)*\n  - Premis 3: $Q \\subset O$ *(Kuantor Universal)*\n- **Pendeteksian Cacat Logika (Fallacy of Undistributed Middle):**\n  - Relasi antara $U$ dan $Q$ dijembatani oleh himpunan penengah $K$.\n  - Namun, kedua premis penghubung sama-sama berkuantor **partikular (sebagian)**.\n  - Dalam diagram Venn, irisan $(U \\cap K)$ dan irisan $(K \\cap Q)$ masing-masing menempati sub-wilayah dalam lingkaran $K$. Namun, **tidak ada dasar premis yang menjamin kedua sub-wilayah tersebut bertumpukan** ($(U \\cap K) \\cap (K \\cap Q) = U \\cap K \\cap Q$ bisa bernilai $\\emptyset$).\n  - Akibatnya, ada kemungkinan bahwa debitur pangan olahan yang menerima KUR sama sekali bukan merupakan pihak yang memakai QRIS.\n- **Simpulan Evaluasi:** Kesimpulan analis **tidak dapat dipastikan kebenarannya (belum tentu benar)** secara hukum logika deduktif.\n\n**Jawaban: C**",
  "quick_trick_markdown": "**Cara Cepat (Trik Dua Premis Partikular: 'Sebagian' + 'Sebagian'):**\n\n1. Scan cepat kata awal premis: Premis 1 (*Sebagian*), Premis 2 (*Sebagian*).\n2. Hukum mutlak UTBK: Jika dua premis berturut-turut diawali kata *\"Sebagian\"*, maka hubungan ujung awal dan ujung akhir **TIDAK BISA DISIMPULKAN SECARA PASTI**!\n3. Langsung cari opsi yang memuat evaluasi: **\"Belum tentu benar\"** atau **\"Tidak dapat dipastikan\"**.\n4. Opsi yang memuat argumen ketidakpastian irisan ini secara presisi adalah pilihan **C**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Terjebak sesat pikir; dua premis partikular tidak dapat membentuk rantai silogisme yang sahih.\n- **Pilihan B Salah:** Mengklaim mutlak salah dengan menyangkal kemungkinan adanya irisan yang sebenarnya mungkin saja terjadi.\n- **Pilihan D Salah:** Merupakan overgeneralisasi ekstrem yang semakin menyimpang dari kaidah logika.\n- **Pilihan E Salah:** Bersifat pengandaian kondisional yang tidak menjawab evaluasi validitas deduktif pada premis yang tersedia."
},
{
  "example_id": "pu-02-04-ex16",
  "variation_name": "Variasi 16: Diagram Venn Empat Himpunan Biomarker Defisit Tidur (Level: Sulit / HOTS)",
  "difficulty": "hard",
  "question_type": "standard_mc",
  "context_markdown": "Sebuah konsorsium riset neurosains klinis memaparkan empat ketentuan patofisiologis sistem saraf otak:\n\n1. **Premis 1**: Semua pasien dengan defisit gelombang tidur lambat (*slow-wave sleep*) mengalami gangguan pembersihan protein beta-amiloid di jaringan otak.\n2. **Premis 2**: Semua pasien yang mengalami gangguan pembersihan protein beta-amiloid di jaringan otak merupakan individu yang mengalami penurunan fungsi memori episodik dini.\n3. **Premis 3**: Tidak ada satupun individu yang mengalami penurunan fungsi memori episodik dini yang memiliki skor ketahanan neurokognitif di atas persentil ke-90.\n4. **Premis 4**: Sebagian tenaga pengajar senior di universitas riset adalah pasien dengan defisit gelombang tidur lambat (*slow-wave sleep*).",
  "question_markdown": "Berdasarkan keempat premis tersebut dan prinsip pemetaan diagram Venn, simpulan yang **PASTI BENAR** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Semua tenaga pengajar senior di universitas riset memiliki skor ketahanan neurokognitif di atas persentil ke-90."
    },
    {
      "key": "B",
      "text_markdown": "Sebagian tenaga pengajar senior di universitas riset bukan merupakan individu yang memiliki skor ketahanan neurokognitif di atas persentil ke-90."
    },
    {
      "key": "C",
      "text_markdown": "Semua individu yang memiliki skor ketahanan neurokognitif di atas persentil ke-90 adalah pasien dengan defisit gelombang tidur lambat."
    },
    {
      "key": "D",
      "text_markdown": "Tidak ada tenaga pengajar senior di universitas riset yang mengalami gangguan pembersihan protein beta-amiloid."
    },
    {
      "key": "E",
      "text_markdown": "Sebagian pasien yang mengalami gangguan pembersihan protein beta-amiloid memiliki skor ketahanan neurokognitif di atas persentil ke-90."
    }
  ],
  "correct_answer": "B",
  "hint_markdown": "💡 **Petunjuk Soal:** Susun rantai inklusi himpunan secara bertahap:\nDefisit Tidur ($D$) $\\subset$ Gangguan Amiloid ($A$) $\\subset$ Penurunan Memori ($M$).\nLalu perhatikan Premis 3: Himpunan Penurunan Memori ($M$) terpisah mutlak dari Skor Ketahanan $>90$ ($S$) ($M \\cap S = \\emptyset$).\nKarena Sebagian Pengajar Senior ($P$) adalah $D$, maka bagian $P$ tersebut berada di dalam $M$, yang artinya MUTLAK berada di luar lingkaran $S$!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $D$: Pasien dengan defisit gelombang tidur lambat\n  - $A$: Pasien dengan gangguan pembersihan protein beta-amiloid\n  - $M$: Individu dengan penurunan fungsi memori episodik dini\n  - $S$: Individu dengan skor ketahanan neurokognitif di atas persentil ke-90\n  - $P$: Tenaga pengajar senior di universitas riset\n- **Pemetaan Rantai Himpunan:**\n  1. $D \\subset A$ *(Semua D adalah A)*\n  2. $A \\subset M$ *(Semua A adalah M)*\n     - Melalui kaidah transitif: $D \\subset M$ *(Semua D berada di dalam M)*.\n  3. $M \\cap S = \\emptyset$ *(Himpunan M dan S saling lepas mutlak)*\n     - Karena $D \\subset M$ dan $M \\cap S = \\emptyset$, maka diperoleh: $D \\cap S = \\emptyset$ *(Tidak ada satupun anggota D yang berada di dalam S)*.\n  4. $P \\cap D \\neq \\emptyset$ *(Sebagian P adalah D)*\n- **Penarikan Kesimpulan Terpadu:**\n  Terdapat elemen $y \\in (P \\cap D)$.\n  Karena $y \\in D$ dan $D \\cap S = \\emptyset$, maka secara niscaya $y \\notin S$.\n  Hal ini membuktikan bahwa tenaga pengajar senior yang berada di dalam kelompok defisit tidur lambat tersebut dipastikan bukan merupakan individu yang memiliki skor ketahanan neurokognitif di atas persentil ke-90.\n- **Konklusi:** **Sebagian tenaga pengajar senior di universitas riset bukan merupakan individu yang memiliki skor ketahanan neurokognitif di atas persentil ke-90** ($P \\cap S^c \\neq \\emptyset$).\n\n**Jawaban: B**",
  "quick_trick_markdown": "**Cara Cepat (Kuantor Terlemah & Isolasi Himpunan Asing):**\n\n1. Kuantor: Premis 4 memuat kata *\"Sebagian\"* $\\implies$ Jawaban WAJIB partikular (*Sebagian*). Coret opsi A, C, dan D!\n2. Cek pemisahan: Himpunan skor neurokognitif $>90$ terpisah mutlak dari lingkaran memori/amiloid/tidur lambat.\n3. Karena sebagian pengajar senior masuk ke lingkaran tidur lambat, maka bagian pengajar tersebut **PASTI BUKAN** pemilik skor neurokognitif $>90$.\n4. Struktur ini cocok sempurna dengan pilihan **B**.\n5. Opsi **E** melanggar premis 3 (amiloid dan skor $>90$ saling lepas).",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\", padahal terbukti sebagian pengajar senior terdistribusi di dalam kelompok defisit memori.\n- **Pilihan C Salah:** Membalik relasi dua himpunan yang saling lepas mutlak ($D \\cap S = \\emptyset$).\n- **Pilihan D Salah:** Bertentangan dengan gabungan premis 1 dan premis 4 yang membuktikan pengajar dengan defisit tidur pasti mengalami gangguan pembersihan amiloid.\n- **Pilihan E Salah:** Bertentangan dengan premis 2 dan 3 yang membuktikan tidak ada pasien amiloid yang memiliki skor ketahanan di atas persentil ke-90."
},
{
  "example_id": "pu-02-04-ex17",
  "variation_name": "Variasi 17: Evaluasi Himpunan Komplemen Keandalan Cloud Multi-Wilayah (Level: Sulit / HOTS)",
  "difficulty": "hard",
  "question_type": "standard_mc",
  "context_markdown": "Spesifikasi arsitektur keandalan pusat data komputasi awan perbankan nasional menetapkan aturan klasifikasi berikut:\n\n1. **Premis 1**: Semua kluster peladen komputasi awan dengan sertifikasi *Fault-Tolerant Level 4* menerapkan arsitektur replikasi multi-wilayah aktif-aktif (*active-active multi-region*).\n2. **Premis 2**: Semua kluster peladen yang menerapkan arsitektur replikasi multi-wilayah aktif-aktif dilengkapi mekanisme pengalihan beban (*failover*) otomatis berlatensi di bawah satu detik.\n3. **Premis 3**: Sebagian sistem basis data terdistribusi perbankan digital adalah kluster peladen komputasi awan dengan sertifikasi *Fault-Tolerant Level 4*.\n4. **Premis 4**: Tidak ada satupun peladen yang dilengkapi mekanisme pengalihan beban (*failover*) otomatis berlatensi di bawah satu detik yang mengalami gangguan operasional (*downtime*) kumulatif melebihi lima menit per tahun.",
  "question_markdown": "Berdasarkan keempat premis tersebut dan kaidah logika diagram Venn, simpulan yang **PASTI BENAR** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Semua sistem basis data terdistribusi perbankan digital mengalami gangguan operasional (downtime) kumulatif melebihi lima menit per tahun."
    },
    {
      "key": "B",
      "text_markdown": "Semua kluster peladen yang dilengkapi failover otomatis di bawah satu detik adalah sistem basis data terdistribusi perbankan digital."
    },
    {
      "key": "C",
      "text_markdown": "Sebagian sistem basis data terdistribusi perbankan digital tidak mengalami gangguan operasional (downtime) kumulatif melebihi lima menit per tahun."
    },
    {
      "key": "D",
      "text_markdown": "Tidak ada sistem basis data terdistribusi perbankan digital yang menerapkan arsitektur replikasi multi-wilayah aktif-aktif."
    },
    {
      "key": "E",
      "text_markdown": "Semua peladen komputasi awan dengan sertifikasi Fault-Tolerant Level 4 mengalami gangguan operasional melebihi lima menit per tahun."
    }
  ],
  "correct_answer": "C",
  "hint_markdown": "💡 **Petunjuk Soal:** Rangkai diagram Venn inklusi beruntun:\nSertifikasi Level 4 ($F$) $\\subset$ Replikasi Multi-Wilayah ($R$) $\\subset$ Failover $<1$ detik ($O$).\nLalu perhatikan himpunan Gangguan Downtime $>5$ menit ($D$): terpisah mutlak dari $O$ ($O \\cap D = \\emptyset$).\nKarena Sebagian Basis Data Bank ($B$) adalah $F$, maka kelompok $B$ tersebut berada di dalam $O$, sehingga MUTLAK TIDAK mengalami downtime $>5$ menit per tahun!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $F$: Kluster peladen bersertifikasi *Fault-Tolerant Level 4*\n  - $R$: Kluster dengan replikasi multi-wilayah aktif-aktif\n  - $O$: Kluster dengan failover otomatis berlatensi $<1$ detik\n  - $B$: Sistem basis data terdistribusi perbankan digital\n  - $T$: Peladen yang mengalami downtime kumulatif $>5$ menit/tahun\n- **Hubungan Berdasarkan Premis:**\n  1. $F \\subset R$ *(Premis 1)*\n  2. $R \\subset O$ *(Premis 2)*\n     - Rantai Inklusi Transitif: $F \\subset O$ *(Semua kluster Level 4 memiliki failover $<1$ detik)*.\n  3. $B \\cap F \\neq \\emptyset$ *(Premis 3: Sebagian basis data bank adalah kluster Level 4)*\n  4. $O \\cap T = \\emptyset$ *(Premis 4: Himpunan failover $<1$ detik dan downtime $>5$ menit terpisah mutlak)*\n- **Penarikan Kesimpulan:**\n  - Karena $F \\subset O$ dan $O \\cap T = \\emptyset$, maka secara deduktif $F \\cap T = \\emptyset$.\n  - Terdapat sebagian anggota basis data bank $z \\in (B \\cap F)$.\n  - Karena $z \\in F$, maka $z \\notin T$.\n  - Artinya, anggota basis data bank yang berada pada irisan $F$ tersebut secara mutlak **tidak mengalami downtime kumulatif melebihi lima menit per tahun** ($B \\cap T^c \\neq \\emptyset$).\n- **Konklusi:** **Sebagian sistem basis data terdistribusi perbankan digital tidak mengalami gangguan operasional (downtime) kumulatif melebihi lima menit per tahun**.\n\n**Jawaban: C**",
  "quick_trick_markdown": "**Cara Cepat (Kuantor Terlemah & Transitif Negatif):**\n\n1. Premis 3 memuat kata *\"Sebagian\"* $\\implies$ Kesimpulan WAJIB memuat kata *\"Sebagian\"*. Coret opsi A, B, D, dan E!\n2. Satu-satunya opsi berkuantor sebagian adalah pilihan **C**.\n3. Verifikasi logika: Basis data bank (sebagian) $\\rightarrow$ Level 4 $\\rightarrow$ Multi-wilayah $\\rightarrow$ Failover cepat $\\rightarrow$ BEBAS dari downtime $>5$ menit.\n4. Kesimpulan sah dan valid: Pilihan **C**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\" yang bertentangan dengan bukti adanya basis data bank yang terhindar dari downtime berlebih.\n- **Pilihan B Salah:** Membalik relasi inklusi superset menjadi subset secara keliru.\n- **Pilihan D Salah:** Bertentangan langsung dengan gabungan premis 1 dan premis 3.\n- **Pilihan E Salah:** Kontradiksi mutlak dengan premis 1, 2, dan 4 yang membuktikan peladen Level 4 aman dari downtime melebihi 5 menit."
},
{
  "example_id": "pu-02-04-ex18",
  "variation_name": "Variasi 18: Kuantor Universal Bersyarat Komunitas Adat Maritim (Level: Sedang)",
  "difficulty": "medium",
  "question_type": "standard_mc",
  "context_markdown": "Sebuah studi etnografi antropologi maritim memaparkan empat ketentuan tradisi bahari nusantara berikut:\n\n1. **Premis 1**: Semua nakhoda kapal tradisional suku Bajo menguasai navigasi perbintangan bahari tanpa menggunakan kompas modern.\n2. **Premis 2**: Semua individu yang menguasai navigasi perbintangan bahari tanpa menggunakan kompas modern memiliki pemahaman mendalam tentang pola arus lintas samudra musiman.\n3. **Premis 3**: Sebagian perajin perahu cadik di pesisir kepulauan timur adalah nakhoda kapal tradisional suku Bajo.\n4. **Premis 4**: Tidak ada satupun pemandu wisata bahari bermesin cepat yang memiliki pemahaman mendalam tentang pola arus lintas samudra musiman.",
  "question_markdown": "Berdasarkan keempat premis tersebut dan kaidah diagram Venn, simpulan yang **PASTI BENAR** adalah...",
  "options": [
    {
      "key": "A",
      "text_markdown": "Semua perajin perahu cadik di pesisir kepulauan timur adalah pemandu wisata bahari bermesin cepat."
    },
    {
      "key": "B",
      "text_markdown": "Sebagian perajin perahu cadik di pesisir kepulauan timur bukan merupakan pemandu wisata bahari bermesin cepat."
    },
    {
      "key": "C",
      "text_markdown": "Semua individu yang memiliki pemahaman tentang pola arus samudra musiman adalah nakhoda kapal tradisional suku Bajo."
    },
    {
      "key": "D",
      "text_markdown": "Tidak ada perajin perahu cadik di pesisir kepulauan timur yang menguasai navigasi perbintangan bahari."
    },
    {
      "key": "E",
      "text_markdown": "Sebagian pemandu wisata bahari bermesin cepat adalah nakhoda kapal tradisional suku Bajo."
    }
  ],
  "correct_answer": "B",
  "hint_markdown": "💡 **Petunjuk Soal:** Cermati susunan diagram Venn:\n- Lingkaran Nakhoda Bajo ($B$) $\\subset$ Navigasi Bintang ($N$) $\\subset$ Paham Arus ($A$).\n- Lingkaran Pemandu Wisata Mesin Cepat ($W$) terpisah mutlak dari Paham Arus ($A$) ($W \\cap A = \\emptyset$).\n- Sebagian Perajin Perahu Cadik ($P$) adalah Nakhoda Bajo ($B$) ($P \\cap B \\neq \\emptyset$).\nPerajin perahu cadik yang berada di dalam kelompok Bajo tersebut pasti berada di dalam $A$ dan MUTLAK TIDAK BISA menjadi pemandu wisata mesin cepat!",
  "conceptual_solution_markdown": "**Cara Konsep Formal:**\n\n- **Notasi Himpunan:**\n  - $B$: Nakhoda kapal tradisional suku Bajo\n  - $N$: Individu yang menguasai navigasi perbintangan bahari\n  - $A$: Individu yang memiliki pemahaman mendalam tentang pola arus samudra musiman\n  - $P$: Perajin perahu cadik di pesisir kepulauan timur\n  - $W$: Pemandu wisata bahari bermesin cepat\n- **Pemodelan Himpunan:**\n  1. $B \\subset N$ *(Premis 1)*\n  2. $N \\subset A$ *(Premis 2)*\n     - Relasi Transitif: $B \\subset A$ *(Semua nakhoda Bajo paham arus samudra)*.\n  3. $P \\cap B \\neq \\emptyset$ *(Premis 3: Sebagian perajin cadik adalah nakhoda Bajo)*\n  4. $W \\cap A = \\emptyset$ *(Premis 4: Pemandu wisata dan penguasa arus saling lepas mutlak)*\n- **Penarikan Kesimpulan Deduktif:**\n  - Dari $B \\subset A$ dan $W \\cap A = \\emptyset$, diperoleh: $B \\cap W = \\emptyset$ *(Nakhoda Bajo dan pemandu wisata mesin cepat saling lepas)*.\n  - Terdapat sebagian perajin cadik yang merupakan nakhoda Bajo ($k \\in P \\cap B$).\n  - Karena $k \\in B$ dan $B \\cap W = \\emptyset$, maka secara niscaya $k \\notin W$.\n  - Artinya, perajin perahu cadik tersebut dipastikan bukan merupakan pemandu wisata bahari bermesin cepat ($P \\cap W^c \\neq \\emptyset$).\n- **Konklusi:** **Sebagian perajin perahu cadik di pesisir kepulauan timur bukan merupakan pemandu wisata bahari bermesin cepat**.\n\n**Jawaban: B**",
  "quick_trick_markdown": "**Cara Cepat (Kuantor Terlemah & Eliminasi Himpunan Lepas):**\n\n1. Aturan kuantor: Premis 3 memakai kata *\"Sebagian\"* $\\implies$ Kesimpulan WAJIB memuat kata *\"Sebagian\"*. Coret opsi A, C, dan D!\n2. Opsi tersisa: B dan E.\n3. Uji opsi E: Pemandu wisata terpisah mutlak dari lingkaran pemahaman arus laut yang ditempati suku Bajo $\\implies$ Opsi E SALAH!\n4. Satu-satunya opsi yang benar dan terbukti adalah pilihan **B**.",
  "why_others_are_wrong_markdown": "- **Pilihan A Salah:** Menggunakan kuantor universal \"Semua\" yang bertolak belakang dengan fakta bahwa sebagian perajin cadik berada di kelompok Bajo yang terpisah dari pemandu wisata.\n- **Pilihan C Salah:** Membalik arah inklusi himpunan; penguasa arus samudra bisa mencakup oseanograf, pelaut lain, atau nelayan modern di luar suku Bajo.\n- **Pilihan D Salah:** Bertentangan dengan gabungan premis 1 dan premis 3 yang membuktikan adanya perajin cadik yang menguasai navigasi perbintangan bahari.\n- **Pilihan E Salah:** Kontradiksi mutlak dengan premis 2 dan 4 yang membuktikan nakhoda Bajo dan pemandu wisata mesin cepat saling lepas tanpa irisan."
}
  ]
};
