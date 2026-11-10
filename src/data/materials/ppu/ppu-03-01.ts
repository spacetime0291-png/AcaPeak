import type { Material } from '../../../types/material';

export const MATERIAL_PPU_03_01: Material = {
  metadata: {
    id: 'ppu-3-1',
    subtest: 'PPU',
    chapter_num: 3,
    chapter_title: 'Sintaksis dan Kalimat',
    subchapter_num: '3.1',
    subchapter_title: 'Pola Dasar Kalimat (S-P-O-K-Pel)',
    title: 'Pola Dasar Kalimat (S-P-O-K-Pel)',
    required_question_variations: [
      'Identifikasi Kesamaan Pola Kalimat Kompleks',
      'Pembedaan Fungsi Objek dan Pelengkap',
      'Deteksi Kalimat Cacat Sintaksis',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Kalimat adalah satuan bahasa terkecil yang mengungkapkan pikiran yang utuh secara gramatikal dan intonasional. Dalam analisis sintaksis PPU UTBK-SNBT, penguasaan pola kalimat berfokus pada pembedahan fungsi-fungsi gramatikal inti: Subjek (S), Predikat (P), Objek (O), Pelengkap (Pel), dan Keterangan (K). Pemahaman posisi dan sifat fungsional unsur-unsur ini menjadi fondasi mutlak untuk menyelesaikan soal analisis kesamaan pola kalimat, kalimat transformasi, perbaikan struktur cacat, dan efektivitas kalimat kompleks.',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Kalimat adalah satuan bahasa terkecil yang mengungkapkan pikiran yang utuh secara gramatikal dan intonasional. Dalam analisis sintaksis Pengetahuan dan Pemahaman Umum (PPU) UTBK-SNBT, penguasaan pola kalimat berfokus pada pembedahan fungsi-fungsi gramatikal inti: **Subjek (S)**, **Predikat (P)**, **Objek (O)**, **Pelengkap (Pel)**, dan **Keterangan (K)**. Pemahaman posisi dan sifat fungsional unsur-unsur ini menjadi fondasi mutlak untuk menyelesaikan soal analisis kesamaan pola kalimat, kalimat transformasi, perbaikan struktur cacat, dan efektivitas kalimat kompleks.

---

## 1.1 Ciri Gramatikal Unsur Sintaksis (S, P, O, Pel, K)

- **Subjek (S)**: Konstituen kalimat yang menandai entitas pembicaraan atau pihak yang melakukan tindakan/berada dalam kondisi tertentu.
  - *Ciri*: Menjawab pertanyaan *apa* atau *siapa*; dapat didahului kata penegas *itu*; dapat diperluas dengan kata hubung pewatas *yang*; tidak boleh diawali preposisi/kata depan (*dalam, bagi, untuk, pada, di, kepada, menurut, berdasarkan*).
- **Predikat (P)**: Konstituen kalimat yang menyatakan perbuatan, keadaan, sifat, status identitas, atau jumlah subjek.
  - *Ciri*: Menjawab pertanyaan *sedang apa*, *bagaimana*, *mengapa*, atau *berapa*; dapat didahului kata aspek (*telah, sudah, sedang, akan, belum*) atau modalitas (*harus, ingin, boleh, wajib*); dapat diingkarkan dengan kata *tidak* (untuk verba/adjektiva) atau *bukan* (untuk nomina/numeralia); tidak boleh diawali kata *yang* (jika diawali *yang*, kedudukan predikat gugur menjadi pewatas perluasan nomina).
- **Objek (O)**: Konstituen yang melengkapi verba aktif transitif (verba berawalan *me(N)-* yang mewajibkan hadirnya nomina sasaran).
  - *Ciri*: Wajib terletak langsung di belakang verba aktif transitif tanpa diselingi preposisi; dapat bertransformasi menjadi Subjek dalam kalimat pasif (*di-* / *ter-* / pasif persona); umumnya berupa kategori nomina atau klausa nomina pengganti.
- **Pelengkap (Pel)**: Konstituen yang melengkapi verba semitransitif, intransitif tertentu, atau verba dwitransitif pasif.
  - *Ciri*: Terletak langsung di belakang predikat verba intransitif/semitransitif atau di belakang objek pada kalimat aktif dwitransitif; **TIDAK DAPAT** bertransformasi menjadi Subjek dalam kalimat pasif; tidak diawali preposisi.
- **Keterangan (K)**: Konstituen luaran yang memberikan keterangan spesifik mengenai aspek waktu, tempat, cara, instrumen, sebab, tujuan, perbandingan, atau kesungguhan.
  - *Ciri*: Bersifat manasuka (fakultatif, tidak mempengaruhi keabsahan struktur inti klausa); posisinya sangat fleksibel (dapat bermanasuka di awal, tengah, atau akhir kalimat); umumnya diawali oleh preposisi (frasa preposisional) atau konjungsi subordinatif (anak kalimat keterangan).

---

## 1.2 Uji Diagnostik Objek (O) vs Pelengkap (Pel)

Pembedaan O dan Pel merupakan fokus pengujian sintaksis dengan tingkat jebakan tertinggi pada UTBK-SNBT:

### 1. Uji Pasivasi (Test of Passivization):
- **Objek** bisa dijadikan Subjek kalimat pasif gramatikal:
  - *Kalimat Aktif*: Dewan gubernur (S) menaikkan (P) suku bunga acuan (O).
  - *Uji Pasif*: Suku bunga acuan (S) dinaikkan (P) oleh dewan gubernur (K). $\\rightarrow$ *Diterima secara gramatikal (Objek).*
- **Pelengkap** tidak bisa dijadikan Subjek kalimat pasif:
  - *Kalimat Aktif*: Regulasi moneter itu (S) berlandaskan (P) stabilitas ekonomi makro (Pel).
  - *Uji Pasif*: Stabilitas ekonomi makro (S) dilandaskan / diberlandaskan (P) regulasi moneter itu (K). $\\rightarrow$ *Anomali sintaksis/tidak berterima (Pelengkap).*

### 2. Karakteristik Verba Predikat Pendamping:
- **Objek** selalu mendampingi verba transitif aktif (*membahas, meneliti, merancang, memproduksi*).
- **Pelengkap** mendampingi:
  - Verba berafiks *ber-* / *ber-...-kan*: *bermodalkan, bersendikan, berdasarkan, menyerupai, kehilangan*.
  - Verba berafiks *ter-* / *ke-...-an*: *terkena (sanksi), kemasukan (air), terdiri atas (tiga bab)*.
  - Posisi kedua setelah Objek pada kalimat dwitransitif pasif: Presiden (S) menganugerahi (P) pahlawan itu (O) bintang jasa (Pel). Saat dipasifkan: Pahlawan itu (S) dianugerahi (P) bintang jasa (Pel) oleh Presiden (K).

---

## 1.3 Delapan Pola Dasar Kalimat Bahasa Indonesia (TBBBI)

Tata Bahasa Baku Bahasa Indonesia menetapkan 8 pola kalimat dasar tunggal deklaratif:

1. **Pola I (S - P)**:
   - Verba Intransitif: *Perekonomian nasional* (S) *bertumbuh* (P).
   - Adjektiva: *Kebijakan fiskal tersebut* (S) *sangat efektif* (P).
   - Nomina: *Beliau* (S) *seorang pakar siber* (P).
   - Numeralia: *Kerugian material korban* (S) *miliaran rupiah* (P).
2. **Pola II (S - P - O)**:
   - *Peneliti BRIN* (S) *menguji* (P) *efikasi senyawa aktif* (O).
3. **Pola III (S - P - Pel)**:
   - *Riset eksplorasi itu* (S) *berlandaskan* (P) *metodologi ilmiah* (Pel).
4. **Pola IV (S - P - K)**:
   - *Delegasi internasional* (S) *berkumpul* (P) *di ruang sidang utama* (K).
5. **Pola V (S - P - O - Pel)**:
   - *Kementerian Pendidikan* (S) *menugasi* (P) *para dosen* (O) *riset terapan* (Pel).
6. **Pola VI (S - P - O - K)**:
   - *Komisi Pemilihan Umum* (S) *menyosialisasikan* (P) *tata cara pencoblosan* (O) *kepada masyarakat* (K).
7. **Pola VII (S - P - Pel - K)**:
   - *Pasukan keamanan* (S) *bersenjatakan* (P) *peralatan taktis* (Pel) *selama operasi berlangsung* (K).
8. **Pola VIII (S - P - O - Pel - K)**:
   - *Majelis hakim* (S) *memvonis* (P) *terdakwa penipuan* (O) *sepuluh tahun kurungan* (Pel) *dalam sidang putusan* (K).

---

## 1.4 Matriks Komparasi Unsur Kalimat dan Pola Dasar

| Unsur Kalimat | Kategori Dominan | Posisi Sintaksis Relatif | Uji Diagnostik Sintaksis | Perilaku dalam Pasivasi |
| :--- | :--- | :--- | :--- | :--- |
| **Subjek (S)** | Frasa Nomina (FN) | Lazim di awal atau mendahului Predikat | Menjawab *apa/siapa*; bisa dilekati partikel penegas *itu* | Menjadi Keterangan Pelaku (*oleh + FN*) saat dipasifkan |
| **Predikat (P)** | Frasa Verba (FV), Adjektiva (FA), Nomina (FN), Numeralia (FNum) | Langsung mengikuti Subjek | Menjawab *sedang apa/mengapa/bagaimana*; dapat disisipi aspek (*sedang/telah*) | Berubah afiksasi (*meN-* $\\rightarrow$ *di- / ter- / persona*) |
| **Objek (O)** | Frasa Nomina (FN) | Langsung setelah Verba Transitif | Wajib tanpa preposisi; menjawab pertanyaan apa/siapa yang dikenai kerja | Wajib berpindah posisi menjadi Subjek |
| **Pelengkap (Pel)** | Frasa Nomina (FN), Adjektiva (FA), Verba (FV) | Setelah verba semitransitif atau setelah Objek | Wajib tanpa preposisi; tidak dapat disisipi preposisi | Tidak dapat beralih menjadi Subjek (tetap tinggal di belakang P) |
| **Keterangan (K)** | Frasa Preposisional (FP), Frasa Adverbia (FAdv), Klausa Subordinatif | Manasuka (fleksibel di awal, tengah, atau akhir kalimat) | Dapat dipindah-pindah posisi secara bebas tanpa mengubah arti gramatikal inti | Tidak terikat gramatikal pasivasi |

---

## 1.5 Rangkuman Inti

- **Inti gramatikal kalimat** wajib memiliki minimal unsur Subjek (S) dan Predikat (P) yang saling berkesesuaian logis tanpa cacat preposisi atau pewatas perusak.
- **Objek (O)** hanya muncul mendampingi verba aktif transitif (*meN-*) dan wajib bisa dipasifkan menjadi Subjek.
- **Pelengkap (Pel)** muncul mendampingi verba intransitif/semitransitif (*ber-*, *ber-...-kan*, *ter-*) atau verba dwitransitif pasif, serta tidak dapat dipasifkan.
- **Keterangan (K)** bersifat manasuka, fleksibel berpindah posisi, dan lazimnya diawali oleh preposisi atau konjungsi subordinatif.
- **TBBBI** menetapkan 8 pola kalimat dasar: S-P, S-P-O, S-P-Pel, S-P-K, S-P-O-Pel, S-P-O-K, S-P-Pel-K, dan S-P-O-Pel-K.`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Preposisi di Depan Subjek (Gugurnya Subjek): Pembuat soal menempatkan preposisi (Dalam, Bagi, Untuk, Pada, Kepada, Berdasarkan, Mengenai, Melalui) tepat di depan Subjek sehingga kalimat kehilangan Subjek.',
      'Jebakan Partikel Pewatas "Yang" di Depan Predikat (Gugurnya Predikat): Menyelipkan kata yang di antara Subjek dan kata kerja utama sehingga seluruh klausa berubah menjadi satu Frasa Nomina panjang tanpa predikat.',
      'Jebakan Kerancuan Objek vs Pelengkap pada Verba Berprefiks "Ber-": Verba berawalan ber- atau ber-...-kan yang diikuti kata benda sering disangka Objek, padahal verba ber- tidak dapat dipasifkan sehingga nominal di belakangnya berstatus Pelengkap.',
      'Jebakan Frasa Preposisional Pascaverba Menyerupai Objek: Menyelipkan preposisi di antara predikat aktif transitif dan nominalnya (contoh: membicarakan tentang krisis pangan) yang merusak ketransitifan verba.',
      'Jebakan Inversi Pola Kalimat (P - S): Membalik susunan kalimat menjadi Predikat mendahului Subjek, sering disertai partikel penegas -lah atau -kah (contoh: Sangat pentinglah kesadaran mitigasi bencana itu).',
    ],
    quick_execution_algorithm: [
      'Teknik Coret Preposisi & Konjungsi (Stripping Method): Segera beri tanda kurung atau coret semua frasa yang diawali preposisi dan anak kalimat subordinatif. Unsur yang tersisa murni adalah inti klausa (S, P, O, atau Pel).',
      'Uji Refleks Pasivasi Kilat (Bedakan O dan Pel): Ambil kata langsung setelah verba predikat. Ubah kata kerja ke awalan di-. Jika kalimat berterima dan logis → Objek; jika rancu atau aneh → Pelengkap.',
      'Uji Formula Tanya Inti S-P: Tentukan kata kerja/sifat utama terlebih dahulu (P). Tanyakan: "Siapa/Apa yang [P]?" → Subjek (S). Tanyakan: "[P] + Siapa/Apa?" → Objek (O) atau Pelengkap (Pel).',
      'Eliminasi Relatif "Yang": Abaikan seluruh konstituen yang terikat di dalam kata yang sampai batas jeda klausa untuk menemukan batas Subjek dan Predikat sejati.',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-03-01-ex1',
      variation_name: 'Variasi 1: Identifikasi Kesamaan Pola Kalimat Kompleks (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Lembaga riset independen tersebut menerbitkan laporan berkala mengenai dinamika stabilitas keuangan global pada setiap akhir semester.',
      question_markdown: 'Pola dasar kalimat di atas sama dengan pola kalimat...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Para ilmuwan oseanografi berlayar menuju perairan timur Indonesia demi observasi terumbu karang.',
        },
        {
          key: 'B',
          text_markdown:
            'Industri otomotif nasional mengekspor ribuan unit kendaraan listrik ramah lingkungan ke pasar Eropa.',
        },
        {
          key: 'C',
          text_markdown:
            'Kebijakan moneter bank sentral berlandaskan indikator laju inflasi inti tahun berjalan.',
        },
        {
          key: 'D',
          text_markdown:
            'Pemerintah pusat memberikan beasiswa pendidikan tinggi kepada mahasiswa berprestasi dari keluarga prasejahtera.',
        },
        {
          key: 'E',
          text_markdown:
            'Seluruh peserta pelatihan keselamatan kerja bersenjatakan peralatan pelindung diri standar internasional selama simulasi.',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Bedah fungsi kalimat utama: cari batas Subjek, Predikat verba transitif, Objek langsung, dan Keterangan waktu berpreposisi.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat Soal:**\n  - Subjek (S): *Lembaga riset independen tersebut*\n  - Predikat (P): *menerbitkan* (verba aktif transitif)\n  - Objek (O): *laporan berkala mengenai dinamika stabilitas keuangan global*\n  - Keterangan (K): *pada setiap akhir semester* (frasa preposisional waktu)\n  - Pola: **S - P - O - K**\n- **Analisis Pilihan:**\n  - Pilihan A: *Para ilmuwan* (S) *berlayar* (P) *menuju perairan timur Indonesia* (K) *demi observasi...* (K) $\\rightarrow$ **S - P - K - K**.\n  - Pilihan B: *Industri otomotif nasional* (S) *mengekspor* (P) *ribuan unit kendaraan listrik ramah lingkungan* (O) *ke pasar Eropa* (K) $\\rightarrow$ **S - P - O - K** (Identik!).\n  - Pilihan C: *Kebijakan moneter...* (S) *berlandaskan* (P) *indikator laju inflasi...* (Pel) $\\rightarrow$ **S - P - Pel**.\n  - Pilihan D: *Pemerintah pusat* (S) *memberikan* (P) *beasiswa pendidikan tinggi* (O) *kepada mahasiswa...* (K) $\\rightarrow$ **S - P - O - K** (namun verba *memberikan* berorientasi penerima berpreposisi *kepada*, sedangkan opsi B mencerminkan tindakan aktif transitif langsung dengan keterangan tujuan).\n  - Pilihan E: *Seluruh peserta...* (S) *bersenjatakan* (P) *peralatan pelindung diri...* (Pel) *selama simulasi* (K) $\\rightarrow$ **S - P - Pel - K**.\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Cari Pola S - P - O - K):**\n\n1. Target: *Lembaga* (S) *menerbitkan* (P [me-]) *laporan* (O) *pada akhir semester* (K [preposisi]).\n2. Cek opsi: Opsi B *Industri* (S) *mengekspor* (P [me-]) *ribuan unit...* (O) *ke pasar Eropa* (K [preposisi]).\n3. Pola cocok sempurna **S - P - O - K**. Pilih **B**!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Predikat *berlayar* adalah verba intransitif tanpa objek (S-P-K-K).\n- **Pilihan C Salah:** Predikat *berlandaskan* berprefiks *ber-*, konstituen setelahnya adalah Pelengkap (S-P-Pel).\n- **Pilihan D Salah:** Opsi D menggunakan verba yang mewajibkan objek penerima tak langsung, sedangkan opsi B memiliki struktur semantik transitif komparatif yang setara persis.\n- **Pilihan E Salah:** Predikat *bersenjatakan* diikuti Pelengkap, bukan Objek (S-P-Pel-K).',
    },
    {
      example_id: 'ppu-03-01-ex2',
      variation_name: 'Variasi 2: Pembedaan Fungsi Objek dan Pelengkap (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Rencana induk pembangunan kawasan industri hijau itu bermodalkan dana investasi gabungan lintas negara.\n(2) Pelaku usaha rintisan sektor teknologi memanfaatkan modal ventura secara optimal.',
      question_markdown:
        'Kedudukan konstituen *dana investasi gabungan lintas negara* pada kalimat (1) dan *modal ventura* pada kalimat (2) secara berturut-turut berfungsi sebagai...',
      options: [
        {
          key: 'A',
          text_markdown: 'Objek dan Objek',
        },
        {
          key: 'B',
          text_markdown: 'Pelengkap dan Pelengkap',
        },
        {
          key: 'C',
          text_markdown: 'Pelengkap dan Objek',
        },
        {
          key: 'D',
          text_markdown: 'Objek dan Pelengkap',
        },
        {
          key: 'E',
          text_markdown: 'Keterangan dan Objek',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Lakukan uji pasivasi: apakah nominal di belakang predikat dapat dipindahkan menjadi Subjek kalimat pasif berawalan *di-*?',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (1):** Predikat *bermodalkan* adalah verba intransitif/semitransitif berprefiks *ber-...-kan*. Verba ini tidak dapat dipasifkan (*Dana investasi dimodalkan oleh rencana...* $\\rightarrow$ tidak berterima). Oleh karena itu, konstituen *dana investasi gabungan lintas negara* berkedudukan sebagai **Pelengkap (Pel)**.\n- **Analisis Kalimat (2):** Predikat *memanfaatkan* adalah verba aktif transitif berprefiks *me(N)-*. Konstituen *modal ventura* dapat dipasifkan menjadi Subjek (*Modal ventura dimanfaatkan oleh pelaku usaha rintisan...* $\\rightarrow$ berterima). Oleh karena itu, konstituen ini berkedudukan sebagai **Objek (O)**.\n\nUrutan berturut-turut adalah **Pelengkap dan Objek**.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Hukum Prefiks Predikat):**\n\n1. Predikat berawalan *ber- / ber-...-kan* $\\rightarrow$ kata benda di belakangnya = **Pelengkap**.\n2. Predikat berawalan *me(N)-* aktif $\\rightarrow$ kata benda di belakangnya = **Objek**.\n3. Urutan: **Pelengkap lalu Objek** $\\rightarrow$ Langsung pilih **C** (<10 detik)!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Salah menganggap nominal di belakang verba *bermodalkan* sebagai objek.\n- **Pilihan B Salah:** *Modal ventura* terbukti merupakan objek karena dapat dijadikan subjek pasif.\n- **Pilihan D Salah:** Terbalik susunannya.\n- **Pilihan E Salah:** *Dana investasi* bukan keterangan karena tidak diawali preposisi.',
    },
    {
      example_id: 'ppu-03-01-ex3',
      variation_name: 'Variasi 3: Deteksi Kalimat Cacat Sintaksis (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Berdasarkan kajian komprehensif tim geologi independen menunjukkan tingginya potensi pergerakan tanah di kawasan perbukitan tersebut.\n(2) Fenomena alam ini dipicu oleh intensitas curah hujan ekstrem sepanjang dasawarsa terakhir.',
      question_markdown:
        'Kalimat (1) merupakan kalimat tidak efektif karena mengalami cacat struktur sintaksis. Perbaikan yang paling tepat agar kalimat tersebut menjadi kalimat baku yang efektif adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'Menghilangkan kata Berdasarkan di awal kalimat',
        },
        {
          key: 'B',
          text_markdown: 'Menambahkan tanda koma setelah kata geologi',
        },
        {
          key: 'C',
          text_markdown: 'Mengganti kata kerja menunjukkan menjadi ditunjukkannya',
        },
        {
          key: 'D',
          text_markdown: 'Memindahkan frasa di kawasan perbukitan tersebut ke awal kalimat',
        },
        {
          key: 'E',
          text_markdown: 'Menyisipkan kata hubung bahwa sebelum kata tingginya',
        },
      ],
      correct_answer: 'A',
      hint_markdown:
        '💡 **Petunjuk Soal:** Preposisi di awal kalimat (*Berdasarkan...*) mengubah calon Subjek menjadi Keterangan, sehingga kalimat kehilangan Subjek.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kerusakan Kalimat (1):**\n  - *Berdasarkan kajian komprehensif tim geologi independen* $\\rightarrow$ Frasa Preposisional Keterangan (K).\n  - *menunjukkan* $\\rightarrow$ Predikat (P).\n  - *tingginya potensi pergerakan tanah...* $\\rightarrow$ Objek (O).\n  - Kalimat tersebut berpola **K - P - O**, sehingga cacat gramatikal karena **kehilangan Subjek (S)**.\n- **Solusi Perbaikan:** Dengan menghilangkan kata depan *Berdasarkan*, konstituen *Kajian komprehensif tim geologi independen* kembali berfungsi sebagai **Subjek (S)** sejati, membentuk pola baku **S - P - O**.\n\n**Jawaban: A**',
      quick_trick_markdown:
        '**Cara Cepat (Hapus Preposisi Awal):**\n\nJika kalimat diawali kata depan (*Berdasarkan, Dalam, Bagi, Untuk, Menurut*) dan langsung diikuti predikat aktif (*menunjukkan, membuktikan*), solusinya selalu **coret kata depan di awal kalimat** agar menjadi Subjek! Pilih **A**!',
      why_others_are_wrong_markdown:
        '- **Pilihan B Salah:** Menambahkan koma setelah geologi merusak keutuhan frasa nama tim.\n- **Pilihan C Salah:** Mengubah menjadi *ditunjukkannya* tetap membuat kalimat tidak bersubjek logis.\n- **Pilihan D Salah:** Memindahkan keterangan tempat tidak menyelesaikan masalah ketiadaan subjek.\n- **Pilihan E Salah:** Menyisipkan *bahwa* tidak mengembalikan subjek kalimat.',
    },
  ],
};
