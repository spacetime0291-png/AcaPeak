import type { Material } from '../../../types/material';

export const MATERIAL_PPU_03_04: Material = {
  metadata: {
    id: 'ppu-3-4',
    subtest: 'PPU',
    chapter_num: 3,
    chapter_title: 'Sintaksis dan Kalimat',
    subchapter_num: '3.4',
    subchapter_title: 'Kalimat Pasif dan Aktif',
    title: 'Kalimat Pasif dan Aktif',
    required_question_variations: [
      'Konversi Kalimat Aktif ke Pasif Persona',
      'Deteksi Kesalahan Pembentukan Pasif',
      'Analisis Relasi Semantis Bentuk Pasif',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Kategori kalimat berdasarkan arah relasi antara peran subjek dan tindakan predikatnya terbagi menjadi kalimat aktif dan kalimat pasif. Dalam analisis sintaksis PPU UTBK-SNBT, pemahaman kalimat aktif dan pasif tidak sekadar menguji kemampuan membalik posisi subjek dan objek, melainkan mengevaluasi penguasaan kaidah gramatikal ortodoks bahasa Indonesia: pembentukan pasif persona (orang pertama dan kedua), pasif morfologis berprefiks (di-, ter-, ke-...-an), penempatan aspek/modalitas, serta kelogisan hubungan semantis peran agens (pelaku) dan pasien (sasaran) dalam teks ilmiah formal.',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Kategori kalimat berdasarkan arah relasi antara peran subjek dan tindakan predikatnya terbagi menjadi kalimat aktif dan kalimat pasif. Dalam domain Pengetahuan dan Pemahaman Umum (PPU) UTBK-SNBT, pemahaman sintaksis mengenai kalimat aktif dan pasif tidak sekadar menguji kemampuan membalik posisi subjek dan objek, melainkan mengevaluasi penguasaan kaidah gramatikal ortodoks bahasa Indonesia, khususnya kaidah pembentukan pasif persona (kata ganti orang pertama dan kedua), pasif morfologis berprefiks (*di-*, *ter-*, *ke-...-an*), penempatan modalitas/aspek, serta kelogisan hubungan semantis peran agens (pelaku) dan pasien (sasaran) dalam wacana formal ilmiah.

---

## 1.1 Tipologi Kalimat Aktif

1. **Kalimat Aktif Transitif**:
   - Kalimat aktif yang predikatnya berupa verba transitif dan mewajibkan hadirnya Objek (O).
   - *Aktif Monotransitif (S - P - O)*: *Pemerintah pusat* (S) *mengesahkan* (P) *undang-undang energi terbarukan* (O).
   - *Aktif Dwitransitif (S - P - O - Pel)*: *Kementerian Keuangan* (S) *mengalokasikan* (P) *dana stimulus* (O) *program perlindungan sosial* (Pel).
2. **Kalimat Aktif Intransitif**:
   - Kalimat aktif yang predikatnya tidak memerlukan objek dan tidak dapat dipasifkan.
   - *Aktif Intransitif Murni (S - P / S - P - K)*: *Tanaman hidroponik* (S) *bertumbuh* (P) *dengan sangat subur* (K).
   - *Aktif Semitransitif (S - P - Pel)*: *Kebijakan makroekonomi itu* (S) *berlandaskan* (P) *asas kehati-hatian perbankan* (Pel).

---

## 1.2 Tipologi Kalimat Pasif

1. **Kalimat Pasif Morfologis (Pasif Berprefiks)**:
   - *Pasif Prefiks di-*: Menyatakan tindakan yang dilakukan secara sengaja oleh pelaku orang ketiga (*dia, mereka, nama diri, lembaga/nomina*).
     - Contoh: *Sampel uji klinis* (S) *dianalisis* (P) *oleh tim mikrobiologi* (K).
   - *Pasif Prefiks ter-*: Menyatakan ketidaksengajaan (aksidental), keadaan resultatif, atau kemampuan/potensi.
   - *Pasif Konfiks ke-...-an (Pasif Adversatif)*: Menyatakan subjek tertimpa musibah atau mengalami kejadian merugikan.
     - Contoh: *Puluhan hektare lahan pertanian* (S) *kebanjiran* (P) *luapan sungai* (Pel/K).
2. **Kalimat Pasif Persona (Pasif Klisitis / Pasif Pronominal)**:
   - Kalimat pasif yang pelakunya berupa pronomina persona pertama (*saya, kami, kita*) atau kedua (*kamu, anda, kalian*).
   - **Kaidah Baku Ortodoks**: Kalimat pasif persona **DILARANG** menggunakan awalan *di-* dan kata depan *oleh*.
   - **Pola Baku**: **Subjek (Sasaran) + Pronomina Persona (I/II) + Verba Dasar**

---

## 1.3 Kaidah Baku Transformasi Kalimat Aktif ke Pasif

1. **Subjek Pelaku Orang Ketiga (Persona III)**:
   - Pola pasif: **Subjek + di- + Verba Dasar + (oleh) + Pelaku**
   - *Aktif*: Peneliti (S-III) menyusun (P) laporan komprehensif (O).
   - *Pasif*: Laporan komprehensif (S) disusun (P) oleh peneliti (K).
2. **Subjek Pelaku Orang Pertama dan Kedua (Persona I & II)**:
   - Pola pasif: **Subjek + Pronomina Persona + Verba Dasar**
   - *Aktif*: Kami (S-I) telah merumuskan (P) hipotesis penelitian (O).
   - *Pasif Baku*: **Hipotesis penelitian (S) telah kami rumuskan (P).**
   - *Bentuk Rusak*: *Hipotesis penelitian telah dirumuskan oleh kami.* (Salah!)
3. **Kaidah Penempatan Aspek dan Modalitas pada Pasif Persona**:
   - Kata aspek (*sudah, telah, sedang, akan, belum*) dan modalitas (*harus, ingin, boleh, wajib*) **WAJIB** diletakkan di depan pronomina persona.
   - *Benar*: Masalah ini **akan saya telaah**.
   - *Salah*: Masalah ini *saya akan telaah*.

---

## 1.4 Matriks Komparasi Konstruksi Kalimat Aktif dan Pasif

| Parameter Perbandingan | Kalimat Aktif Transitif | Kalimat Pasif Morfologis (Persona III) | Kalimat Pasif Persona (Persona I & II) |
| :--- | :--- | :--- | :--- |
| **Peran Subjek (S)** | Pelaku perbuatan (*Agens*) | Sasaran perbuatan (*Pasien*) | Sasaran perbuatan (*Pasien*) |
| **Bentuk Verba Predikat (P)** | Berimbuhan *me(N)-* / *me(N)-...-kan* / *me(N)-...-i* | Berimbuhan *di-* / *di-...-kan* / *di-...-i* | Bentuk dasar kata kerja (tanpa awalan *di-*) |
| **Posisi Pelaku (Agens)** | Berada di posisi Subjek (awal kalimat) | Berada di belakang predikat sebagai Keterangan (*oleh + FN*) | Menempel tepat di depan verba dasar sebagai satu kesatuan predikat |
| **Posisi Aspek / Modalitas** | Bebas mendahului verba aktif (*kami telah merancang*) | Bebas mendahului verba pasif (*telah dirancang oleh tim*) | Wajib mendahului pronomina persona (*telah kami rancang*) |
| **Contoh Konstruksi Baku** | *Kami telah memverifikasi berkas pendaftaran tersebut.* | *Berkas pendaftaran tersebut telah diverifikasi oleh panitia.* | *Berkas pendaftaran tersebut telah kami verifikasi.* |
| **Bentuk Tidak Baku Sering Muncul** | *Berkas pendaftaran kami yang memverifikasi.* | *Berkas pendaftaran diverifikasi panitia.* (tanpa *oleh* jika berjarak) | *Berkas pendaftaran telah diverifikasi oleh kami.* / *...kami telah verifikasi.* |

---

## 1.5 Rangkuman Inti

- **Kalimat aktif** menempatkan pelaku (*agens*) pada Subjek; **kalimat pasif** menempatkan sasaran (*pasien*) pada Subjek.
- Hanya kalimat bertransitif (memiliki objek) yang dapat dipasifkan secara gramatikal. Kalimat dengan predikat berprefiks *ber-* atau *ter-* (intransitif) tidak dapat dipasifkan.
- **Pasif Persona** (pelaku orang pertama/kedua) wajib menggunakan pola: **Subjek + Pronomina + Verba Dasar** (tanpa awalan *di-* dan tanpa preposisi *oleh*).
- Kata aspek dan modalitas wajib diletakkan sebelum pronomina persona pada kalimat pasif persona.
- Pada kalimat dwitransitif pasif (**S - P - O - Pel**), hanya Objek yang dapat beralih menjadi Subjek; Pelengkap tetap berada di belakang predikat.`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Pasif Persona Menggunakan Prefiks "Di-... Oleh": Penggunaan bentuk seperti "disusun oleh saya" atau "dikerjakan oleh kalian" alih-alih "saya susun" dan "kalian kerjakan".',
      'Jebakan Aspek/Modalitas Menyisip pada Pasif Persona: Menyisipkan kata aspek di antara pronomina dan verba (contoh: "saya akan kembalikan" alih-alih "akan saya kembalikan").',
      'Jebakan Pasifikasi Verba Berprefiks "Ber-": Mempasifkan verba intransitif/semitransitif berawalan ber- (contoh keliru: "Hukum adat dilandaskan oleh negara itu").',
      'Jebakan Pasif Adversatif Ke-...-an yang Disangka Nomina Turunan: Menganggap kata kerja pasif musibah seperti "kebanjiran", "kecurian", atau "kemalingan" sebagai kata benda.',
      'Jebakan Subjek Menggantung pada Kalimat Pasif Tanpa Pelaku: Menggabungkan anak kalimat aktif dengan induk kalimat pasif tanpa pelaku logis yang sama.',
    ],
    quick_execution_algorithm: [
      'Uji Kategori Persona Pelaku (1/2 vs 3): Jika pelaku orang ke-1 atau ke-2 (saya, aku, kami, kita, kamu, anda, kalian) → gunakan pola pasif persona tanpa di-... oleh. Jika orang ke-3 (dia, mereka, tim, nama orang) → gunakan pasif morfologis di-... oleh.',
      'Uji Kerapatan Pasif Persona (Zero-Insertion Test): Pastikan tidak ada kata aspek atau kata keterangan apa pun di antara pronomina persona dan verba dasar ("akan kami telaah", BUKAN "kami akan telaah").',
      'Uji Transitifitas Verba (Cek Objek Asli): Pastikan verba aktif aslinya berupa verba transitif yang diikuti langsung oleh kata benda tanpa preposisi.',
      'Uji Pasivasi Dwitransitif (S - P - O - Pel): Hanya Objek yang beralih menjadi Subjek; Pelengkap tetap bertahan di posisi semula di belakang verba predikat.',
    ],
  },
  worked_examples: [
    {
      example_id: 'ppu-03-04-ex1',
      variation_name: 'Variasi 1: Konversi Kalimat Aktif ke Pasif Persona Sesuai Kaidah Baku (Level: Sulit)',
      difficulty: 'hard',
      question_type: 'standard_mc',
      context_markdown:
        'Untuk mendukung percepatan transisi energi hijau di kawasan perdesaan, kami telah merancang purwarupa turbin angin mikro berskala komunitas.',
      question_markdown:
        'Transformasi pasif yang paling tepat dan baku dari klausa utama kalimat di atas adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'Purwarupa turbin angin mikro berskala komunitas telah dirancang oleh kami',
        },
        {
          key: 'B',
          text_markdown:
            'Purwarupa turbin angin mikro berskala komunitas kami telah rancang',
        },
        {
          key: 'C',
          text_markdown:
            'Purwarupa turbin angin mikro berskala komunitas telah kami rancang',
        },
        {
          key: 'D',
          text_markdown:
            'Telah dirancangnya purwarupa turbin angin mikro berskala komunitas oleh kami',
        },
        {
          key: 'E',
          text_markdown:
            'Purwarupa turbin angin mikro berskala komunitas kami rancang telah lama',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Pelaku adalah pronomina persona pertama (*kami*). Dalam pasif persona, kata aspek (*telah*) wajib mendahului kata ganti orang (*telah kami rancang*).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Klausa Utama Kalimat Aktif:**\n  - Subjek: *kami* (Pronomina Persona I Jamak)\n  - Aspek: *telah*\n  - Predikat: *merancang* (verba aktif transitif)\n  - Objek: *purwarupa turbin angin mikro berskala komunitas*\n- **Kaidah Transformasi Pasif Persona I/II:**\n  1. Objek menjadi Subjek: *Purwarupa turbin angin mikro berskala komunitas*.\n  2. Predikat tidak boleh menggunakan awalan *di-* dan tidak boleh menggunakan preposisi *oleh kami* (menganulir Opsi A dan D).\n  3. Kata ganti persona melekat langsung di depan verba dasar: *kami rancang*.\n  4. Kata aspek/modalitas wajib diletakkan sebelum pronomina persona: **telah kami rancang** (menganulir Opsi B yang menempatkan aspek di antara pronomina dan verba).\n- **Hasil Kalimat Pasif Baku:** *Purwarupa turbin angin mikro berskala komunitas telah kami rancang.*\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Aturan Pasif Persona: Aspek + Pelaku 1/2 + Kata Dasar):**\n\n1. Pelaku: *kami* (orang ke-1) $\\rightarrow$ Pola pasif wajib: **[Aspek] + kami + [kata dasar]**.\n2. Cek: **telah kami rancang**.\n3. Opsi A pakai *dirancang oleh kami* (Salah!), opsi B *kami telah rancang* (Salah urutan aspek).\n4. Langsung kunci opsi **C** (<10 detik)!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Menyalahi kaidah pasif persona ortodoks (menggunakan awalan *di-* dan kata depan *oleh kami*).\n- **Pilihan B Salah:** Kata aspek *telah* menyisip di antara pronomina persona dan kata kerja dasar (*kami telah rancang* tidak baku).\n- **Pilihan D Salah:** Merusak konstruksi sintaksis menjadi klausa pembalik yang tidak baku dengan akhiran *-nya*.\n- **Pilihan E Salah:** Mengubah letak aspek dan menyisipkan keterangan yang tidak ada pada kalimat sumber.',
    },
    {
      example_id: 'ppu-03-04-ex2',
      variation_name: 'Variasi 2: Deteksi Kesalahan Pembentukan Pasif pada Teks Ilmiah (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Dewan juri telah menetapkan pemenang kompetisi inovasi teknologi maritim tingkat nasional.\n(2) Keputusan akhir tersebut tidak dapat diganggu gugat oleh pihak mana pun.\n(3) Berbagai dokumen pendukung proposal penelitian telah diserahkan oleh kalian kepada panitia pelaksana kemarin sore.\n(4) Seluruh peserta diwajibkan mematuhi kode etik riset yang berlaku secara internasional.',
      question_markdown:
        'Kalimat yang memuat kesalahan pembentukan kalimat pasif pada kutipan di atas terdapat pada nomor...',
      options: [
        {
          key: 'A',
          text_markdown: '(1)',
        },
        {
          key: 'B',
          text_markdown: '(2)',
        },
        {
          key: 'C',
          text_markdown: '(3)',
        },
        {
          key: 'D',
          text_markdown: '(4)',
        },
        {
          key: 'E',
          text_markdown: '(2) dan (4)',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Periksa predikat pasif pada kalimat (3): *telah diserahkan oleh kalian*. Apakah pelaku orang kedua jamak (*kalian*) boleh menggunakan awalan *di-... oleh*?',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (1):** Kalimat aktif transitif baku (*Dewan juri [S] telah menetapkan [P] pemenang... [O]*).\n- **Analisis Kalimat (2):** Kalimat pasif persona III baku (*tidak dapat diganggu gugat oleh pihak mana pun*).\n- **Analisis Kalimat (3):** Memuat klausa pasif: *telah diserahkan oleh kalian*.\n  - Kata *kalian* adalah **pronomina persona kedua jamak**.\n  - Berdasarkan kaidah tata bahasa baku bahasa Indonesia, pronomina persona kedua dilarang membentuk kalimat pasif dengan prefiks *di-* dan preposisi *oleh*.\n  - Bentuk baku pasif persona kedua adalah: **telah kalian serahkan**.\n- **Analisis Kalimat (4):** Kalimat pasif persona III baku (*Seluruh peserta diwajibkan...*).\n\nOleh karena itu, kesalahan pembentukan pasif terdapat pada **Kalimat (3)**.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Deteksi Pola Terlarang):**\n\n1. Cari konstruksi terlarang: **di-... oleh [saya/kami/kamu/kalian]**.\n2. Kalimat (3) tertulis: *telah diserahkan oleh kalian* $\\rightarrow$ Pasti SALAH!\n3. Seharusnya: *telah kalian serahkan*.\n4. Kunci jawaban: **C** (<10 detik)!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Kalimat (1) adalah kalimat aktif transitif yang gramatikal.\n- **Pilihan B Salah:** Kalimat (2) pasif baku dengan pelaku persona III (*pihak mana pun*).\n- **Pilihan D Salah:** Kalimat (4) pasif baku berprefiks *di-* yang disesuaikan dengan instruksi formal.\n- **Pilihan E Salah:** Kalimat (2) dan (4) sudah menggunakan konstruksi pasif yang tepat.',
    },
    {
      example_id: 'ppu-03-04-ex3',
      variation_name: 'Variasi 3: Analisis Relasi Semantis Bentuk Pasif Bermakna Aksidental / Keadaan (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Laju deforestasi di wilayah hulu sungai menyebabkan lapisan tanah pucuk tergerus aliran air hujan deras.\n(2) Akibatnya, pemukiman warga di bantaran hilir kebanjiran lumpur endapan pekat setiap musim hujan tiba.',
      question_markdown:
        'Makna gramatikal bentuk pasif pada kata *tergerus* dalam kalimat (1) dan *kebanjiran* dalam kalimat (2) secara berturut-turut adalah...',
      options: [
        {
          key: 'A',
          text_markdown:
            'menyatakan perbuatan yang disengaja dan menyatakan kondisi yang telah selesai',
        },
        {
          key: 'B',
          text_markdown:
            'menyatakan keadaan yang dikenai perbuatan dan menyatakan hal yang menguntungkan',
        },
        {
          key: 'C',
          text_markdown:
            'menyatakan tindakan yang tidak sengaja/proses alamiah dan menyatakan hal yang menderita kemalangan (adversatif)',
        },
        {
          key: 'D',
          text_markdown:
            'menyatakan kemampuan melakukan tindakan dan menyatakan proses terjadinya suatu sifat',
        },
        {
          key: 'E',
          text_markdown:
            'menyatakan kesiapan melakukan pekerjaan dan menyatakan tempat terjadinya peristiwa',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Prefiks *ter-* pada fenomena alam menandai ketidaksengajaan/proses spontan, sedangkan konfiks *ke-...-an* pada kata *kebanjiran* menandai kondisi tertimpa musibah/kemalangan (pasif adversatif).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n1. **Bentuk Verba Pasif *tergerus*:**\n   - Terbentuk dari kata dasar *gerus* dengan prefiks *ter-*.\n   - Dalam konteks lapisan tanah pucuk yang tergerus aliran air hujan, prefiks *ter-* menyatakan makna gramatikal **tindakan spontan / tidak disengaja / proses alamiah aksidental**.\n2. **Bentuk Verba Pasif *kebanjiran*:**\n   - Terbentuk dari kata dasar *banjir* dengan konfiks *ke-...-an*.\n   - Dalam kajian morfologis sintaksis bahasa Indonesia, verba berkonfiks *ke-...-an* ini berfungsi sebagai **verba pasif adversatif**, yaitu menyatakan subjek (pemukiman warga) terkena dampak buruk atau **menderita suatu kemalangan/musibah**.\n3. Kesimpulan makna berturut-turut adalah **tindakan tidak sengaja/proses alamiah dan hal yang menderita kemalangan (adversatif)**.\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Makna Prefiks Ter- & Konfiks Ke-...-an):**\n\n1. *Tergerus* tanah oleh hujan $\\rightarrow$ proses alamiah spontan (aksidental/tidak sengaja).\n2. *Kebanjiran* warga $\\rightarrow$ terkena musibah (pasif adversatif).\n3. Pasangan makna: *tidak sengaja* dan *adversatif (kemalangan)* $\\rightarrow$ Pilih **C**!',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** *Tergerus* adalah proses alamiah non-sengaja, bukan disengaja.\n- **Pilihan B Salah:** *Kebanjiran* merupakan peristiwa merugikan/kemalangan, bukan hal yang menguntungkan.\n- **Pilihan D & E Salah:** Menyimpang dari definisi gramatikal baku prefiks *ter-* aksidental dan konfiks *ke-...-an* pasif adversatif.',
    },
  ],
};
