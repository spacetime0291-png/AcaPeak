import type { Material } from '../../../types/material';

export const MATERIAL_PBM_02_01: Material = {
  metadata: {
    id: 'pbm-2-1',
    subtest: 'PBM',
    chapter_num: 2,
    chapter_title: 'Morfologi dan Frasa',
    subchapter_num: '2.1',
    subchapter_title: 'Afiksasi (Imbuhan) dan Maknanya',
    title: 'Afiksasi (Imbuhan) dan Maknanya',
    required_question_variations: [
      'Uji Kesamaan Makna Gramatikal Prefiks ter- (HOTS Semantik)',
      'Kaidah Morfofonemik Pembentukan Kata Baku (KTSP)',
      'Analisis Dikotomi Konfiks pe(N)-...-an vs per-...-an',
    ],
    requires_svg: false,
    updated_at: '2026-11-10',
  },
  content: {
    tactical_overview:
      'Afiksasi adalah proses morfologis pembentukan kata turunan polimorfemis yang memicu perubahan kelas kata (derivasi) atau pengubahan bentuk kata tanpa mengubah kelas kata (infleksi). Kunci menjawab soal UTBK terletak pada penguasaan hukum peluluhan fonem KTSP (luluh jika huruf ke-2 vokal, bertahan jika klaster konsonan), pembedaan teliti makna prefiks ter- (potensial vs aksidental), serta dikotomi konfiks pe(N)-...-an (proses tindakan) vs per-...-an (tempat/hal/hasil).',
    exam_blueprint_markdown: `# 1. Prinsip Dasar dan Kerangka Teori

Afiksasi adalah proses morfologis pembentukan kata dengan cara melekatkan afiks (imbuhan) pada bentuk dasar (kata tunggal maupun kompleks) sehingga menghasilkan kata turunan (polimorfemis) dengan kategori gramatikal dan makna baru.

Dua fungsi gramatikal afiksasi:
1. **Derivasi (Derivasional)**: Mengubah kelas kata bentuk dasar (*tulis* [verba] $\\rightarrow$ *penulis* [nomina]; *kuning* [adjektiva] $\\rightarrow$ *menguning* [verba]).
2. **Infleksi (Infleksional)**: Mengubah bentuk kata untuk menyesuaikan fungsi sintaksis tanpa mengubah kelas kata (*makan* [verba] $\\rightarrow$ *memakan* [verba aktif transitif]).

---

## 1.1 Klasifikasi Afiks Berdasarkan Posisi
1. **Prefiks (Awalan)**: Dilekatkan di awal bentuk dasar (*me(N)-*, *ber-*, *di-*, *ter-*, *pe(N)-*, *per-*, *se-*, *ke-*).
2. **Sufiks (Akhiran)**: Dilekatkan di akhir bentuk dasar (*-an*, *-kan*, *-i*, *-nya*, serta sufiks serapan *-isasi*, *-is*, *-wi*, *-man*, *-wan*, *-wati*).
3. **Infiks (Sisipan)**: Disisipkan di antara konsonan pertama dan vokal pertama bentuk dasar (*-el-* pada *telapak*, *-em-* pada *gemetar*, *-er-* pada *gerigi*, *-in-* pada *kinerja*).
4. **Konfiks (Afiks Tunggal Tak Terpisah)**: Gabungan awalan dan akhiran yang melekat secara serentak membentuk satu kesatuan gramatikal tunggal (*ke-...-an*, *pe(N)-...-an*, *per-...-an*, *ber-...-an*, *se-...-nya*).
5. **Kombinasi Afiks (Simulfiks / Afiks Gabung Bertahap)**: Melekat secara bertahap pada bentuk dasar (*me-...-kan*, *memper-...-kan*).

---

## 1.2 Kaidah Morfofonemik (Peluluhan Fonem K, T, S, P)
Kaidah morfofonemik mengatur perubahan fonem alomorf ketika prefiks *me(N)-* dan *pe(N)-* bertemu konsonan inisial bentuk dasar.

### A. Kaidah Wajib Luluh
Fonem awal **/k/**, **/t/**, **/s/**, dan **/p/** wajib luluh menjadi alomorf sengau (*/ng/*, */n/*, */ny/*, */m/*) jika memenuhi **dua syarat akumulatif**:
1. Terdiri atas lebih dari satu suku kata (polisilabel).
2. Huruf kedua setelah K, T, S, atau P adalah **huruf vokal** (*a, i, u, e, o*).

*Contoh*:
- *me(N)-* + *kunci* $\\rightarrow$ **mengunci**
- *me(N)-* + *tulis* $\\rightarrow$ **menulis**
- *me(N)-* + *sapu* $\\rightarrow$ **menyapu**
- *me(N)-* + *pakai* $\\rightarrow$ **memakai**

### B. Pengecualian Peluluhan (Tidak Boleh Luluh)
1. **Bentuk dasar diawali gugus konsonan (klaster: kr, tr, sp, pr, kl, st)**:
   - *me(N)-* + *kritik* $\\rightarrow$ **mengkritik** (Bukan *mengritik*)
   - *me(N)-* + *traktir* $\\rightarrow$ **mentraktir** (Bukan *menraktir*)
   - *me(N)-* + *produksi* $\\rightarrow$ **memproduksi** (Bukan *memroduksi*)
   - *me(N)-* + *klasifikasi* $\\rightarrow$ **mengklasifikasikan**
   - *me(N)-* + *stimulus* $\\rightarrow$ **menstimulus**
2. **Bentuk dasar berupa kata bersuku satu (monosilabel)**:
   - Menggunakan alomorf *menge-* / *penge-*: *mengecat*, *mengebom*, *mengelap*, *mengetik*, *mengelas*.
3. **Bentuk dasar sudah berupa kata berimbuhan (afiksasi bertingkat)**:
   - *me(N)-* + *per-* + *satu* $\\rightarrow$ **mempersatukan** (/p/ pada prefiks tidak luluh).
4. **Pembedaan Makna Leksikal Khusus (Kasus Kaji)**:
   - *kaji* (penelitian ilmiah) $\\rightarrow$ **mengkaji** / **pengkaji** (meneliti secara ilmiah).
   - *aji/kaji* (bacaan kitab suci) $\\rightarrow$ **mengaji** / **pengajian**.
   - *saji* (hidangan) $\\rightarrow$ **penyaji** / **menyajikan**.

---

## 1.3 Nilai Makna Gramatikal Afiks Utama UTBK
- **Prefiks me(N)-**: Melakukan tindakan aktif (*memasak*), menjadi/membuat jadi (*meratakan*, *memburuk*), mengeluarkan bunyi/benda (*meringkik*, *berkeringat*), menuju ke arah (*melaut*, *mendarat*), menyerupai (*membatu*).
- **Prefiks ber-**: Mempunyai (*beruang*, *bermobil*), memakai (*berbaju*), menghasilkan (*bertelur*), refleksif (*bercermin*), resiprokal/saling (*bersalaman*, *berpelukan*), kondisi/keadaan (*bergembira*).
- **Prefiks ter-**:
  - *Superlatif/paling*: *tertinggi*, *terbesar*.
  - *Potensial/dapat di-*: *terjangkau* (dapat dijangkau), *terbaca* (dapat dibaca).
  - *Aksidental/tak sengaja*: *terinjak*, *tertelan*, *tertinggal*.
  - *Resultatif/keadaan*: *terbuka*, *terkunci*, *tertutup*.
- **Konfiks ke-...-an**: Keadaan abstrak (*kesehatan*, *keadilan*), daerah/wilayah (*kerajaan*), eksesif/terlalu (*kebesaran*, *kemalaman*), adversatif/terkena musibah (*kehujanan*, *kemalingan*).
- **pe(N)-...-an vs. per-...-an**:
  - *pe(N)-...-an* berkorelasi dengan verba *me(N)-* (**proses / metode pelaksanaan**): *pemukiman* (proses memukimkan), *pembangunan* (proses membangun).
  - *per-...-an* berkorelasi dengan verba *ber-* atau nomina (**lokasi, hal, atau hasil**): *permukiman* (kawasan hunian), *perkembangan* (hal berkembang), *perjanjian* (hasil berjanji).
- **Sufiks -kan vs. -i**:
  - *-kan* (kausatif/benefaktif): menyebabkan jadi (*menjatuhkan*) atau tindakan untuk orang lain (*membelikan*).
  - *-i* (lokatif/repetitif): objek tempat (*menaburi*, *menghampiri*) atau berulang-ulang (*memukuli*).

---

## 1.4 Matriks Komparasi Makna Afiksasi

| Tipe Afiks | Bentuk Turunan | Bentuk Dasar | Kaidah Semantik | Makna Gramatikal |
| :--- | :--- | :--- | :--- | :--- |
| **Prefiks me(N)-** | Melaut | Laut (Nomina) | Arah tujuan | Menuju ke laut |
| **Prefiks me(N)-** | Menguning | Kuning (Adjektiva) | Perubahan sifat | Menjadi kuning |
| **Prefiks ber-** | Bersenjata | Senjata (Nomina) | Kepemilikan alat | Memiliki/memakai senjata |
| **Prefiks ber-** | Bertinju | Tinju (Verba) | Resiprokalitas | Saling memukul tinju |
| **Prefiks ter-** | Termurah | Murah (Adjektiva) | Gradasi intensitas | Paling murah (superlatif) |
| **Prefiks ter-** | Tertabrak | Tabrak (Verba) | Ketidaksengajaan | Tidak sengaja ditabrak (aksidental) |
| **Prefiks ter-** | Terpecahkan | Pecah (Verba) | Potensialitas | Dapat dipecahkan |
| **Konfiks ke-...-an** | Kecilikan | Cilik (Adjektiva) | Melebihi takaran | Terlalu kecil (eksesif) |
| **Konfiks ke-...-an** | Kecopetan | Copet (Nomina) | Tertimpa musibah | Menderita kena aksi copet (adversatif) |
| **pe(N)-...-an** | Pemisahan | Pisah (Verba) | Nominalisasi aksi (*me-*) | Proses/cara memisahkan |
| **per-...-an** | Peristirahatan | Istirahat (Verba) | Lokasi/perihal (*ber-*) | Tempat untuk beristirahat |

---

# 2. Pola Jebakan Pengecoh UTBK

1. **Jebakan Gugus Konsonan KTSP**: Kata serapan berawalan klaster (*traktir, produksi, kritik, klarifikasi*) tidak boleh luluh (*mentraktir, memproduksi, mengkritik*).
2. **Jebakan Homonim Konfiks ke-...-an**: Menukar makna hal abstrak (*keadilan*) dengan kondisi terkena musibah (*kemalingan*).
3. **Jebakan Dikotomi Pemukiman vs Permukiman**: *Pemukiman* adalah proses memukimkan, sedangkan *permukiman* adalah kawasan tempat tinggal.
4. **Jebakan Tripartit Makna Prefiks ter-**: Membedakan *ter-* potensial (*dapat di-*) dengan aksidental (*tidak sengaja*) pada kalimat pasif negatif (*masalah tidak teratasi* = potensial).
5. **Jebakan Pleonasme Makna Resiprokal Prefiks ber-**: Penggabungan *saling bersalaman* mengandung pleonasme karena *ber-* pada bentuk tersebut sudah bermakna saling.

---

# 3. Trik Analisis Taktis (<30 Detik)

1. **Uji Formula Parafrasa Kata Dasar**: Substitusi kata imbuhan dengan sinonim maknanya (*ber-* $\\rightarrow$ mempunyai/saling; *ter-* $\\rightarrow$ paling/tidak sengaja/dapat di-; *ke-...-an* $\\rightarrow$ perihal/terlalu/terkena).
2. **Uji Rumus Huruf Kedua Klaster KTSP**: Huruf ke-2 vokal = wajib luluh; huruf ke-2 konsonan = pertahankan (tidak luluh).
3. **Uji Asosiasi Pasangan Verba Dasar (peN-...-an vs per-...-an)**: Dari verba *me-* $\\rightarrow$ *pe(N)-...-an*; dari verba *ber-* $\\rightarrow$ *per-...-an*.
4. **Uji Sisipan "Dapat Di-" pada Prefiks ter-**: Jika logis disisipi frasa "dapat di-", fungsinya adalah potensial.

---

# 4. Rangkuman Inti

- **Afiksasi**: Menghasilkan kata jadian dengan makna gramatikal spesifik melalui derivasi atau infleksi.
- **KTSP**: Luluh jika huruf ke-2 vokal; tidak luluh jika huruf ke-2 konsonan (klaster) atau kata bersuku satu.
- **ter-**: Memiliki makna utama superlatif (paling), potensial (dapat di-), aksidental (tidak sengaja), dan resultatif (keadaan).
- **pe(N)-...-an vs. per-...-an**: *pe(N)-...-an* merujuk pada proses aksi; *per-...-an* merujuk pada kawasan/hasil/hal.`,
    visualizations_svg: [],
    distractor_traps: [
      'Jebakan Gugus Konsonan KTSP: Kata serapan berawalan klaster (traktir, produksi, kritik, klarifikasi) tidak luluh (mentraktir, memproduksi, mengkritik).',
      'Jebakan Homonim Konfiks ke-...-an: Menukar makna hal abstrak (keadilan) dengan kondisi terkena musibah (kemalingan).',
      'Jebakan Dikotomi Pemukiman vs Permukiman: Pemukiman adalah proses memukimkan, sedangkan permukiman adalah kawasan tempat tinggal.',
      'Jebakan Tripartit Makna Prefiks ter-: Membedakan ter- potensial (dapat di-) dengan aksidental (tidak sengaja) pada kalimat pasif negatif (masalah tidak teratasi = potensial).',
      'Jebakan Pleonasme Makna Resiprokal Prefiks ber-: Penggabungan saling bersalaman mengandung pleonasme karena ber- sudah bermakna saling.',
    ],
    quick_execution_algorithm: [
      'Uji Formula Parafrasa Kata Dasar: Substitusi kata imbuhan dengan sinonim maknanya (ber- → mempunyai/saling; ter- → paling/tidak sengaja/dapat di-; ke-...-an → perihal/terlalu/terkena).',
      'Uji Rumus Huruf Kedua Klaster KTSP: Huruf ke-2 vokal = wajib luluh; huruf ke-2 konsonan = pertahankan (tidak luluh).',
      'Uji Asosiasi Pasangan Verba Dasar (peN-...-an vs per-...-an): Dari verba me- → pe(N)-...-an; dari verba ber- → per-...-an.',
      'Uji Sisipan "Dapat Di-" pada Prefiks ter-: Jika logis disisipi frasa "dapat di-", fungsinya adalah potensial.',
    ],
  },
  worked_examples: [
    {
      example_id: 'pbm-02-01-ex1',
      variation_name:
        'Variasi 1: Uji Kesamaan Makna Gramatikal Prefiks ter- / HOTS Semantik (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Tingkat pencemaran mikroplastik pada ekosistem laut kini telah berada pada ambang batas yang tidak **terbayangkan** sebelumnya oleh para peneliti lingkungan.',
      question_markdown:
        'Makna gramatikal imbuhan *ter-* pada kata **terbayangkan** semakna dengan prefiks *ter-* pada kata bercetak miring dalam kalimat...',
      options: [
        {
          key: 'A',
          text_markdown: 'Dokumen rahasia itu tidak sengaja *terbawa* oleh staf magang.',
        },
        {
          key: 'B',
          text_markdown:
            'Harga obat-obatan generik di apotek itu sangat *terjangkau* oleh masyarakat.',
        },
        {
          key: 'C',
          text_markdown:
            'Kereta cepat tersebut merupakan moda transportasi darat *tercepat* di Asia Tenggara.',
        },
        {
          key: 'D',
          text_markdown: 'Pintu gerbang museum itu sudah *terbuka* sejak pukul delapan pagi.',
        },
        {
          key: 'E',
          text_markdown: 'Seluruh peserta upacara merasa *terkejut* mendengar dentuman keras.',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Perhatikan frasa *"tidak terbayangkan"*, yang bermakna "tidak dapat dibayangkan" (menyatakan kemampuan/potensialitas pasif). Cari kata berprefiks *ter-* pada opsi yang juga dapat disubstitusi dengan rumus *"dapat di-"*.',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Gramatikal Target:** Kata *terbayangkan* terbentuk dari prefiks *ter-* + verba *bayangkan*. Dalam konstruksi *"tidak terbayangkan"*, fungsi semantisnya adalah **pasif potensial** ("dapat dibayangkan").\n- **Analisis Pilihan Jawaban:**\n  - Pilihan A: *terbawa* = ketidaksengajaan (aksidental).\n  - Pilihan B: *terjangkau* = dapat dijangkau (pasif potensial).\n  - Pilihan C: *tercepat* = paling cepat (superlatif).\n  - Pilihan D: *terbuka* = sudah dalam kondisi terbuka (resultatif/keadaan).\n  - Pilihan E: *terkejut* = mengalami keadaan terperanjat (kondisional afektif).\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Uji Sisipan "Dapat Di-"):**\n\n1. *Terbayangkan* $\\rightarrow$ *dapat dibayangkan* (potensial).\n2. Cek opsi: *Terjangkau* $\\rightarrow$ *dapat dijangkau* (100% cocok!).\n3. Coret A (tidak sengaja), C (paling), dan D (keadaan).',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Imbuhan *ter-* pada *terbawa* menyatakan perbuatan yang tidak disengaja (aksidental).\n- **Pilihan C Salah:** Imbuhan *ter-* pada *tercepat* melekat pada kata sifat yang menyatakan tingkat paling (superlatif).\n- **Pilihan D Salah:** Imbuhan *ter-* pada *terbuka* menyatakan keadaan/kondisi pasif suatu objek.\n- **Pilihan E Salah:** Imbuhan *ter-* pada *terkejut* menyatakan reaksi perasaan spontan.',
    },
    {
      example_id: 'pbm-02-01-ex2',
      variation_name:
        'Variasi 2: Kaidah Morfofonemik Pembentukan Kata Baku / KTSP (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        'Kementerian berencana [...] program pemberdayaan UMKM pedesaan secara digital serta [...] anggaran infrastruktur dasar ke wilayah pelosok.',
      question_markdown:
        'Kata berimbuhan baku yang paling tepat untuk mengisi bagian rumpang kalimat di atas secara berurutan adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'memprogramkan; mensuplai',
        },
        {
          key: 'B',
          text_markdown: 'memrogramkan; menyuplai',
        },
        {
          key: 'C',
          text_markdown: 'memprogramkan; menyuplai',
        },
        {
          key: 'D',
          text_markdown: 'memrogramkan; mensuplai',
        },
        {
          key: 'E',
          text_markdown: 'memprogramkan; memproduksi',
        },
      ],
      correct_answer: 'C',
      hint_markdown:
        '💡 **Petunjuk Soal:** Cermati huruf kedua kata dasar: kata *program* diawali gugus konsonan /pr/ (klaster), sedangkan kata *suplai* diawali konsonan /s/ yang langsung diikuti huruf vokal /u/. Ingat kaidah peluluhan KTSP!',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kata "Program":** Kata dasar *program* diawali oleh klaster konsonan **/pr/**. Sesuai kaidah EYD V, fonem K, T, S, P yang diikuti konsonan lain (klaster) **TIDAK LULUH**. Bentuk bakunya adalah *me(N)-* + *programkan* $\\rightarrow$ **memprogramkan** (bukan *memrogramkan*).\n- **Analisis Kata "Suplai":** Kata dasar *suplai* diawali konsonan **/s/** dan langsung diikuti huruf vokal **/u/**. Karena memenuhi dua syarat (polisilabel dan diikuti vokal), fonem /s/ **WAJIB LULUH** menjadi alomorf /ny/. Bentuk bakunya adalah *me(N)-* + *suplai* $\\rightarrow$ **menyuplai** (bukan *mensuplai*).\n\n**Jawaban: C**',
      quick_trick_markdown:
        '**Cara Cepat (Rumus Huruf Kedua Klaster):**\n\n1. *Pr-ogram* (huruf ke-2 adalah /r/ = konsonan) $\\rightarrow$ Tahan, jangan diluluhkan $\\rightarrow$ **memprogramkan**.\n2. *S-uplai* (huruf ke-2 adalah /u/ = vokal) $\\rightarrow$ Wajib lebur/luluh $\\rightarrow$ **menyuplai**.\n3. Kombinasi yang benar adalah opsi **C**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Bentuk *mensuplai* tidak baku karena fonem /s/ yang diikuti vokal wajib luluh menjadi *menyuplai*.\n- **Pilihan B Salah:** Bentuk *memrogramkan* salah karena gugus konsonan /pr/ tidak boleh diluluhkan.\n- **Pilihan D Salah:** Kedua bentuk kata imbuhan sama-sama menyalahi kaidah morfofonemik KTSP.\n- **Pilihan E Salah:** Kata *memproduksi* tidak kontekstual untuk melengkapi distribusi anggaran ke wilayah pelosok.',
    },
    {
      example_id: 'pbm-02-01-ex3',
      variation_name:
        'Variasi 3: Analisis Dikotomi Konfiks pe(N)-...-an vs per-...-an (Level: Sedang)',
      difficulty: 'medium',
      question_type: 'standard_mc',
      context_markdown:
        '(1) Bencana banjir bandang meluluhlantakkan kawasan [...] padat penduduk di sepanjang bantaran sungai.\n(2) Pemerintah daerah segera mempercepat proses [...] warga terdampak ke zona relokasi yang aman.',
      question_markdown:
        'Bentuk kata turunan yang tepat untuk melengkapi kalimat (1) dan kalimat (2) secara berturut-turut adalah...',
      options: [
        {
          key: 'A',
          text_markdown: 'pemukiman dan permukiman',
        },
        {
          key: 'B',
          text_markdown: 'permukiman dan pemukiman',
        },
        {
          key: 'C',
          text_markdown: 'permukiman dan permukiman',
        },
        {
          key: 'D',
          text_markdown: 'pemukiman dan pemukiman',
        },
        {
          key: 'E',
          text_markdown: 'pemukim dan permukiman',
        },
      ],
      correct_answer: 'B',
      hint_markdown:
        '💡 **Petunjuk Soal:** Bedakan konsep *tempat/kawasan hunian* (berkorelasi dengan kata *bermukim*) dengan konsep *proses/tindakan memindahkan* (berkorelasi dengan kata *memukimkan*).',
      conceptual_solution_markdown:
        '**Cara Konsep Formal:**\n\n- **Analisis Kalimat (1):** Teks membutuhkan nomina yang merujuk pada **kawasan, wilayah, atau tempat tinggal**. Konfiks *per-...-an* yang berkorelasi dengan verba *bermukim* membentuk kata **permukiman** (daerah/tempat bermukim).\n- **Analisis Kalimat (2):** Teks membutuhkan nomina yang menyatakan **proses, tindakan, atau perbuatan**. Konfiks *pe(N)-...-an* yang berkorelasi dengan verba transitif *memukimkan* membentuk kata **pemukiman** (proses atau cara memukimkan penduduk).\n- Maka urutan yang tepat adalah *permukiman* (1) dan *pemukiman* (2).\n\n**Jawaban: B**',
      quick_trick_markdown:
        '**Cara Cepat (Proses vs Tempat):**\n\n1. Kalimat (1): Ada kata *kawasan* $\\rightarrow$ Butuh makna tempat $\\rightarrow$ **permukiman**.\n2. Kalimat (2): Ada kata *proses* $\\rightarrow$ Butuh makna tindakan $\\rightarrow$ **pemukiman**.\n3. Urutan: permukiman dan pemukiman $\\rightarrow$ Opsi **B**.',
      why_others_are_wrong_markdown:
        '- **Pilihan A Salah:** Urutan posisi tertukar (*pemukiman* ditaruh di kalimat tempat, dan *permukiman* di kalimat proses).\n- **Pilihan C Salah:** Menggunakan kata *permukiman* untuk kedua konteks, padahal kalimat (2) jelas menyatakan proses tindakan.\n- **Pilihan D Salah:** Menggunakan kata *pemukiman* untuk kawasan fisik, yang merupakan kerancuan makna klasik di UTBK.\n- **Pilihan E Salah:** Kata *pemukim* merujuk pada orang (pelaku yang mendiami), bukan kawasan tempat tinggal.',
    },
  ],
};
