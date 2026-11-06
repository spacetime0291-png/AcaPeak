import fs from 'fs';
import path from 'path';

// ============================================================================
// 1. GENERATE pu-1.1.json: Kesesuaian Pernyataan & Simpulan Teks
// ============================================================================
const pu11 = {
  metadata: {
    id: "pu-1.1",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.1",
    subchapter_title: "Kesesuaian Pernyataan & Simpulan Teks",
    title: "Kesesuaian Pernyataan & Simpulan Teks (Pasti Benar, Mungkin Benar, & Kualitas Simpulan)",
    required_question_variations: [
      "Archetype Soal: Pernyataan yang PASTI BENAR berdasarkan wacana",
      "Archetype Soal: Pernyataan yang PASTI SALAH berdasarkan wacana",
      "Archetype Soal: Simpulan yang PALING MUNGKIN BENAR dari data empiris",
      "Archetype Soal: Penilaian KUALITAS SIMPULAN (Pasti Benar / Mungkin Benar / Pasti Salah / Tidak Dapat Dinilai)",
      "Archetype Soal: Tabel Kompleks 5 Pernyataan (Benar / Salah)"
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    tactical_overview: "Di UTBK-SNBT, tipe soal Kesesuaian Pernyataan dan Kualitas Simpulan menguji ketepatan verifikasi data tanpa asumsi pribadi. Anda tidak boleh menafsirkan teks secara liar. Kunci mutlak menjawab: (1) Pasti Benar wajib identik dengan data eksplisit, (2) Mungkin Benar adalah perluasan logis tanpa klaim mutlak, (3) Pasti Salah bertolak belakang secara langsung, dan (4) Kualitas Simpulan menggunakan 5 opsi standar Pusmendik.",
    exam_blueprint_markdown: "### Peta Medan UTBK: 4 Kategori Status Kebenaran Kalimat\n\n| Status Kebenaran di UTBK | Syarat Logis di Teks | Pola Kata Kunci Opsi | Cara Eksekusi Cepat ($\\le 25$ Detik) |\n| :--- | :--- | :--- | :--- |\n| **Pasti Benar** | Tertulis eksplisit atau parafrasa makna 100% identik tanpa menambah asumsi | Sesuai subjek, angka, dan arah klaim | Cari kalimat sumber di teks; jika sama persis maknanya $\\implies$ **Pilih**. |\n| **Pasti Salah** | Kontradiksi langsung atau bertentangan 180° dengan data teks | Kebalikan arah tren, memutarbalikkan subjek/objek | Cari opsi yang menegasikan fakta di teks (misal teks: *naik*, opsi: *turun*). |\n| **Mungkin Benar** | Logis, sejalan dengan tren, tetapi tidak ada bukti mutlak di teks | Menggunakan kata pembatas (*berpotensi, cenderung*) | Hindari kata mutlak (*pasti, selalu*). Pilih yang bernada kemungkinan terukur. |\n| **Tidak Cukup Info** | Informasi di teks tidak menyinggung variabel atau hubungan yang dimaksud | Melompat ke topik lain di luar teks | Jangan tebak pakai logika umum! Jika teks tidak membahas $\\implies$ **Tidak Cukup**. |",
    visualizations_svg: [],
    distractor_traps: [
      "Jebakan 1: Overstatement Mutlak — Teks menyatakan 'sebagian besar penderita', opsi mengecoh dengan 'seluruh penderita tanpa terkecuali'. (Otomatis SALAH di tipe Pasti Benar).",
      "Jebakan 2: Distorsi Kausalitas — Teks menyebutkan dua fenomena terjadi bersamaan, opsi menyatakan salah satu fenomena menjadi penyebab mutlak fenomena lain.",
      "Jebakan 3: Kebenaran Umum Dunia Nyata yang Absen di Teks — Opsi berisi fakta ilmiah yang memang benar di dunia nyata, tetapi SAMA SEKALI TIDAK TERTULIS pada paragraf stimulus."
    ],
    quick_execution_algorithm: [
      "Langkah 1: Baca stem pertanyaan terlebih dahulu (apakah menanyakan Pasti Benar, Pasti Salah, Paling Mungkin Benar, atau Kualitas Simpulan).",
      "Langkah 2: Tandai angka/kata kunci pada opsi dan cocokkan langsung ke kalimat rujukan di wacana (teknik scanning kata kunci).",
      "Langkah 3: Coret opsi yang mengandung generalisasi ekstrem ('seluruhnya', 'selalu', 'tidak pernah', 'hanya satu-satunya') jika teks memakai bahasa proporsional."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.1-var1",
      variation_name: "Archetype Soal 1: Menentukan Pernyataan yang PASTI BENAR Berdasarkan Teks",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Kementerian Kesehatan merilis laporan mengenai tren konsumsi minuman berpemanis dalam kemasan (MBDK) pada remaja usia 15–19 tahun di lima kota besar. Data survei menunjukkan bahwa $68\\%$ remaja mengonsumsi MBDK lebih dari tiga kali seminggu karena mudah diakses di sekitar lingkungan sekolah. Sebanyak $42\\%$ dari responden yang rutin mengonsumsi MBDK tersebut tercatat memiliki kadar gula darah puasa di atas batas normal. Meskipun demikian, hanya $15\\%$ remaja yang menyadari risiko penyakit diabetes melitus tipe 2 dari kebiasaan tersebut, sementara sisanya mengaku belum pernah mendapatkan edukasi nutrisi formal mengenai batasan asupan gula harian.",
      svg_illustration: null,
      question_markdown: "Berdasarkan paragraf di atas, manakah pernyataan berikut yang **PASTI BENAR**?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Sebagian remaja usia 15–19 tahun di lima kota besar mengonsumsi MBDK tidak lebih dari tiga kali dalam seminggu."
        },
        {
          "key: "B",
          "text_markdown: "Seluruh remaja yang memiliki kadar gula darah di atas normal dipastikan akan mengidap diabetes melitus tipe 2 dalam lima tahun ke depan."
        },
        {
          "key: "C",
          "text_markdown: "Akses MBDK di sekitar sekolah merupakan satu-satunya faktor pemicu tingginya konsumsi gula pada remaja."
        },
        {
          "key: "D",
          "text_markdown: "Mayoritas remaja telah mendapatkan edukasi nutrisi formal mengenai batasan asupan gula harian dari pihak sekolah."
        },
        {
          "key: "E",
          "text_markdown: "Kurangnya edukasi nutrisi formal menyebabkan seluruh remaja berusia 15–19 tahun rutin mengonsumsi minuman berpemanis."
        }
      ],
      correct_answer: "A",
      conceptual_solution_markdown: "**Langkah Logika Verifikasi:**\n1. Di teks tertulis: $68\\%$ remaja mengonsumsi MBDK lebih dari tiga kali seminggu.\n2. Komplemen logisnya: Sisanya sebesar $100\\% - 68\\% = 32\\%$ remaja mengonsumsi MBDK $\\le 3$ kali seminggu (kategori 'tidak lebih dari tiga kali seminggu').\n3. Karena $32\\%$ merepresentasikan 'sebagian', maka pernyataan pada opsi A secara matematis dan faktual **PASTI BENAR**.",
      quick_trick_markdown: "**Trik 10 Detik UTBK:**\nCoret kata ekstrem: B (*'seluruh... dipastikan'*), C (*'satu-satunya'*), D (bertentangan: teks bilang mayoritas $85\\%$ *belum* diedukasi), E (*'seluruh'*). Hanya opsi **A** yang menyajikan deduksi proporsi secara valid dan moderat.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi B Salah (Jebakan Overclaim Fatalistik):** Teks hanya menyatakan gula darah di atas normal, bukan vonis pasti terkena diabetes dalam 5 tahun.\n- **Opsi C Salah (Jebakan Kausalitas Tunggal):** Kata 'satu-satunya' salah; teks hanya menyebut 'karena mudah diakses', tanpa menegasikan faktor lain.\n- **Opsi D Salah (Jebakan Kontradiksi Fakta):** Teks menyebut hanya $15\\%$ yang sadar risiko dan sisanya ($85\\%$) belum pernah diedukasi $\\implies$ mayoritas justru BELUM teredukasi.\n- **Opsi E Salah (Jebakan Generalisasi Mutlak):** Kata 'seluruh remaja' bertentangan dengan fakta bahwa hanya $68\\%$ yang rutin."
    },
    {
      example_id: "pu-1.1-var2",
      variation_name: "Archetype Soal 2: Menentukan Pernyataan yang PASTI SALAH Berdasarkan Wacana",
      difficulty: "easy",
      question_type: "standard_mc",
      context_markdown: "Sebuah riset efisiensi energi menguji 100 unit pendingin ruangan (AC) berbasis inverter generasi terbaru. Hasil pengujian laboratorium menunjukkan bahwa konsumsi listrik AC inverter menurun hingga $35\\%$ dibandingkan AC non-inverter ketika ruangan sudah mencapai suhu target $24^\\circ\\text{C}$. Selain itu, seluruh unit uji inverter yang dipasang pada ruangan berinsulasi kedap udara mampu mempertahankan temperatur konstan dengan fluktuasi kurang dari $0{,}5^\\circ\\text{C}$ sepanjang $8$ jam pengujian non-stop.",
      svg_illustration: null,
      question_markdown: "Berdasarkan informasi tersebut, manakah pernyataan berikut yang **PASTI SALAH**?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "AC non-inverter mengonsumsi daya listrik yang lebih besar daripada AC inverter ketika suhu ruangan telah mencapai $24^\\circ\\text{C}$."
        },
        {
          "key: "B",
          "text_markdown: "Terdapat unit AC inverter uji pada ruangan berinsulasi kedap udara yang mengalami fluktuasi temperatur sebesar $1{,}8^\\circ\\text{C}$ selama 8 jam pengujian."
        },
        {
          "key: "C",
          "text_markdown: "AC inverter generasi terbaru dirancang untuk dapat menghemat konsumsi energi listrik pada suhu tertentu."
        },
        {
          "key: "D",
          "text_markdown: "Sebagian AC inverter yang tidak dipasang pada ruangan kedap udara mungkin memiliki performa fluktuasi suhu yang berbeda."
        },
        {
          "key: "E",
          "text_markdown: "Fluktuasi temperatur pada AC inverter pada ruangan kedap udara berada pada rentang yang sangat stabil."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Logika Verifikasi:**\n1. Fakta di teks: *'seluruh unit uji inverter yang dipasang pada ruangan berinsulasi kedap udara mampu mempertahankan temperatur konstan dengan fluktuasi kurang dari $0{,}5^\\circ\\text{C}$ sepanjang 8 jam'*.\n2. Opsi B menyatakan: *'Terdapat unit AC inverter uji pada ruangan berinsulasi kedap udara yang mengalami fluktuasi sebesar $1{,}8^\\circ\\text{C}$'*.\n3. Karena $1{,}8^\\circ\\text{C} > 0{,}5^\\circ\\text{C}$, pernyataan ini secara langsung mengontradiksi klaim kuantitatif universal ('seluruh unit') di teks $\\implies$ **PASTI SALAH**.",
      quick_trick_markdown: "**Trik 15 Detik UTBK:**\nSoal meminta 'Pasti Salah'. Cari kontradiksi langsung terhadap pernyataan berkata kunci mutlak di teks. Teks: *seluruh unit fluktuasi $< 0{,}5^\\circ\\text{C}$*. Opsi B: *ada unit yang fluktuasinya $1{,}8^\\circ\\text{C}$*. Ini kontradiksi 100%. Langsung pilih **B**.",
      why_others_are_wrong_markdown: "**Bedah Status Opsi Lain:**\n- **Opsi A Pasti Benar:** Konsumsi inverter turun $35\\%$, artinya non-inverter memang lebih boros.\n- **Opsi C Pasti Benar:** Sejalan dengan narasi penghematan energi pada suhu $24^\\circ\\text{C}$.\n- **Opsi D Mungkin Benar:** Teks tidak menguji ruangan non-kedap, sehingga performa berbeda adalah kemungkinan yang sah.\n- **Opsi E Pasti Benar:** Fluktuasi $< 0{,}5^\\circ\\text{C}$ adalah definisi operasional stabil."
    },
    {
      example_id: "pu-1.1-var3",
      variation_name: "Archetype Soal 3: Simpulan yang PALING MUNGKIN BENAR dari Data Empiris",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Data dari asosiasi pengusaha logistik menunjukkan bahwa selama tiga tahun berturut-turut, perusahaan ekspedisi yang beralih ke armada van listrik mencatatkan penurunan biaya operasional perawatan mesin hingga $40\\%$ per kilometer perjalanan. Pada periode yang sama, pengemudi armada van listrik melaporkan kelelahan berkendara yang lebih rendah akibat getaran mesin yang minim. Di sisi lain, harga beli awal kendaraan listrik masih $30\\%$ lebih tinggi dibandingkan armada konvensional berbahan bakar fosil.",
      svg_illustration: null,
      question_markdown: "Berdasarkan teks di atas, manakah simpulan yang **PALING MUNGKIN BENAR**?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Seluruh perusahaan ekspedisi di Indonesia akan segera bangkrut apabila tidak segera mengganti seluruh armadanya dengan van listrik."
        },
        {
          "key: "B",
          "text_markdown: "Penggunaan van listrik berpotensi memberikan efisiensi biaya jangka panjang bagi operasional ekspedisi meskipun membutuhkan investasi awal lebih tinggi."
        },
        {
          "key: "C",
          "text_markdown: "Kelelahan pengemudi merupakan satu-satunya faktor yang memengaruhi kelancaran pengiriman barang pada industri logistik."
        },
        {
          "key: "D",
          "text_markdown: "Biaya perawatan mesin van listrik dipastikan akan terus turun hingga mencapai nol rupiah pada tahun-tahun berikutnya."
        },
        {
          "key: "E",
          "text_markdown: "Kendaraan berbahan bakar fosil sudah tidak lagi diproduksi oleh industri otomotif saat ini."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Langkah Logika Simpulan Probabilistik:**\n1. Sintesis data teks: Ada efisiensi biaya perawatan $40\\%$ (keuntungan jangka panjang) dan kenyamanan supir, tetapi ada kendala modal awal $30\\%$ lebih mahal (investasi awal).\n2. Simpulan yang valid harus mencerminkan perimbangan kedua fakta tersebut secara realistis tanpa klaim mutlak.\n3. Opsi B menggunakan frasa modalitas terukur (*'berpotensi memberikan efisiensi biaya jangka panjang... meskipun membutuhkan investasi awal lebih tinggi'*), merangkum fakta teks dengan sempurna.",
      quick_trick_markdown: "**Trik Modalitas Bahasa:**\nPerhatikan modalitas: Opsi A (*'akan segera bangkrut'*), C (*'satu-satunya faktor'*), D (*'dipastikan turun sampai nol'*), E (*'sudah tidak lagi diproduksi'*). Semuanya overclaim tidak berdasar. Opsi **B** menggunakan kata kunci aman: *'berpotensi'* dan mencakup dua premis teks.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Jebakan Ekstrem / Slippery Slope):** Biaya awal tinggi tidak berarti perusahaan langsung bangkrut.\n- **Opsi C Salah (Jebakan Kausalitas Tunggal):** Kelelahan pengemudi hanya salah satu faktor kenyamanan, bukan satu-satunya penentu kelancaran.\n- **Opsi D Salah (Jebakan Ekstrapolasi Tidak Masuk Akal):** Biaya perawatan tidak mungkin turun menjadi 0 rupiah.\n- **Opsi E Salah (Jebakan Mengarang Informasi Luar):** Teks tidak membahas penghentian produksi mobil fosil."
    },
    {
      example_id: "pu-1.1-var4",
      variation_name: "Archetype Soal 4: Penilaian KUALITAS SIMPULAN Standar Pusmendik (5 Opsi Resmi)",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Penelitian terhadap 200 pasien pascaoperasi ortopedi menunjukkan bahwa pasien yang rutin menjalani sesi fisioterapi mandiri terpandu aplikasi digital mengalami percepatan pemulihan mobilitas sendi sebesar $25\\%$ lebih cepat dibandingkan kelompok yang hanya mengandalkan kontrol berkala di rumah sakit. Namun, fisioterapi aplikasi digital ini hanya optimal jika pasien tidak memiliki riwayat komorbiditas artritis degeneratif berat.\n\n*Simpulan yang diuji:*\n**Seorang pasien pascaoperasi ortopedi tanpa riwayat artritis degeneratif berat yang menggunakan fisioterapi mandiri terpandu aplikasi digital akan mengalami pemulihan mobilitas sendi yang lebih cepat.**",
      svg_illustration: null,
      question_markdown: "Berdasarkan informasi pada wacana di atas, bagaimanakah kualitas simpulan tersebut?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Simpulan tersebut PASTI BENAR."
        },
        {
          "key: "B",
          "text_markdown: "Simpulan tersebut MUNGKIN BENAR."
        },
        {
          "key: "C",
          "text_markdown: "Simpulan tersebut PASTI SALAH."
        },
        {
          "key: "D",
          "text_markdown: "Simpulan tidak relevan dengan informasi yang diberikan."
        },
        {
          "key: "E",
          "text_markdown: "Informasi tidak cukup untuk menilai simpulan."
        }
      ],
      correct_answer: "A",
      conceptual_solution_markdown: "**Algoritma Evaluasi Kualitas Simpulan Pusmendik:**\n1. Periksa premis di teks:\n   - Premis 1: Fisioterapi aplikasi digital mempercepat pemulihan $25\\%$.\n   - Premis 2: Optimal jika pasien *tidak memiliki* riwayat komorbiditas artritis degeneratif berat.\n2. Periksa subjek pada simpulan yang diuji:\n   - Subjek: Pasien pascaoperasi *tanpa riwayat artritis degeneratif berat* yang menggunakan fisioterapi aplikasi.\n3. Uji kesesuaian: Seluruh syarat pada Premis 1 dan batasan pada Premis 2 terpenuhi secara deduktif.\n4. Maka simpulan tersebut dijamin secara logis oleh teks $\\implies$ **PASTI BENAR**.",
      quick_trick_markdown: "**Pola 5 Opsi Standar Pusmendik:**\n- Jika simpulan merupakan konsekuensi logis langsung dari syarat yang terpenuhi $\\implies$ **A (Pasti Benar)**.\n- Jika simpulan mungkin terjadi tapi ada faktor yang belum dipastikan $\\implies$ **B (Mungkin Benar)**.\n- Jika bertolak belakang dengan teks $\\implies$ **C (Pasti Salah)**.\n- Pada kasus ini, semua syarat terpenuhi 100%, jadi langsung pilih **A**.",
      why_others_are_wrong_markdown: "**Bedah Kategori Opsi Pusmendik:**\n- **Opsi B (Mungkin Benar) Salah:** Pasien sudah secara spesifik dinyatakan 'tanpa riwayat komorbiditas berat', sehingga hasil percepatan pemulihan bukan lagi sekadar spekulasi probabilitas, melainkan kepastian klaim teks.\n- **Opsi C (Pasti Salah) Salah:** Simpulan sejalan dan didukung penuh oleh teks.\n- **Opsi D (Tidak Relevan) Salah:** Simpulan membahas variabel yang persis sama dengan stimulus.\n- **Opsi E (Info Tidak Cukup) Salah:** Informasi yang disediakan sangat spesifik dan cukup untuk menilai."
    },
    {
      example_id: "pu-1.1-var5",
      variation_name: "Archetype Soal 5: Tabel Kompleks 5 Pernyataan Evaluasi Kebenaran (Format Asli Pusmendik)",
      difficulty: "hard",
      question_type: "complex_table",
      context_markdown: "Hasil sensus pertanian digital di suatu provinsi mencatat: (1) Sebanyak $60\\%$ kelompok tani telah mengadopsi sensor kelembapan tanah berbasis IoT. (2) Kelompok tani pengguna sensor IoT mencatatkan penghematan air irigasi sebesar $30\\%$ dan peningkatan hasil panen gabah sebesar $12\\%$. (3) Biaya pengadaan sensor IoT disubsidi penuh oleh pemerintah daerah untuk kelompok tani dengan luas lahan di bawah 2 hektare. (4) Kelompok tani dengan luas lahan di atas 2 hektare wajib menanggung $50\\%$ biaya instalasi mandiri.",
      svg_illustration: null,
      question_markdown: "Berdasarkan informasi tersebut, tentukan nilai kebenaran (**BENAR** atau **SALAH**) untuk setiap pernyataan berikut!",
      statements: null,
      complex_table: {
        headers: ["Pernyataan", "Benar", "Salah"],
        rows: [
          {
            statement: "Sebagian kelompok tani di provinsi tersebut belum mengadopsi sensor kelembapan tanah berbasis IoT.",
            correct_choice: "Benar"
          },
          {
            statement: "Kelompok tani dengan luas lahan 1,5 hektare wajib membayar separuh dari biaya instalasi sensor IoT.",
            correct_choice: "Salah"
          },
          {
            statement: "Penggunaan sensor IoT terbukti membantu menekan penggunaan volume air irigasi pertanian.",
            correct_choice: "Benar"
          },
          {
            statement: "Pemerintah daerah memberikan subsidi penuh biaya instalasi kepada seluruh kelompok tani tanpa memandang luas lahan.",
            correct_choice: "Salah"
          },
          {
            statement: "Peningkatan hasil panen gabah hanya dialami oleh kelompok tani yang memiliki luas lahan di bawah 2 hektare.",
            correct_choice: "Salah"
          }
        ]
      },
      options: [],
      correct_answer: "Tabel Terverifikasi (Benar, Salah, Benar, Salah, Salah)",
      conceptual_solution_markdown: "**Verifikasi Setiap Baris:**\n1. **Baris 1 (BENAR):** Karena $60\\%$ sudah adopsi, maka $40\\%$ belum adopsi ($40\\% = $ sebagian).\n2. **Baris 2 (SALAH):** Lahan 1,5 hektare masuk kategori 'di bawah 2 hektare', sehingga berhak subsidi PENUH (gratis), bukan membayar 50%.\n3. **Baris 3 (BENAR):** Teks mencatat penghematan air sebesar $30\\%$, membuktikan penekanan volume air irigasi.\n4. **Baris 4 (SALAH):** Subsidi penuh hanya untuk lahan $< 2$ hektare, bukan tanpa memandang luas lahan.\n5. **Baris 5 (SALAH):** Teks menyebut peningkatan panen dialami oleh 'kelompok tani pengguna sensor IoT', bukan dibatasi oleh ukuran lahan.",
      quick_trick_markdown: "**Kunci Cepat Tabel Kompleks Pusmendik:**\nPindai angka batas limit: Lahan $< 2$ ha = subsidi $100\\%$; Lahan $> 2$ ha = bayar $50\\%$. Cocokkan nilai limit ini pada baris 2, 4, dan 5 langsung untuk verifikasi kilat dalam 20 detik.",
      why_others_are_wrong_markdown: "**Rangkuman Evaluasi Baris Pengecoh:**\n- Baris 2 salah karena $1{,}5 < 2$ sehingga gratis.\n- Baris 4 salah karena memanipulasi syarat kuantitatif subsidi menjadi tanpa syarat.\n- Baris 5 salah karena menambahkan kata pembatas 'hanya' yang tidak ada pada wacana."
    }
  ]
};

// ============================================================================
// 2. GENERATE pu-1.2.json: Evaluasi Argumen & Kausalitas
// ============================================================================
const pu12 = {
  metadata: {
    id: "pu-1.2",
    subtest: "PU",
    chapter_num: 1,
    chapter_title: "Penalaran Induktif",
    subchapter_num: "1.2",
    subchapter_title: "Evaluasi Argumen & Kausalitas",
    title: "Evaluasi Argumen & Kausalitas (Memperkuat, Memperlemah, & Asumsi Implisit)",
    required_question_variations: [
      "Archetype Soal: Pernyataan yang PALING MEMPERLEMAH argumen/hipotesis pakar",
      "Archetype Soal: Pernyataan yang PALING MEMPERKUAT argumen/hipotesis pakar",
      "Archetype Soal: Tabel Kompleks 5 Pernyataan (Memperkuat / Tidak Memperkuat)",
      "Archetype Soal: Asumsi yang mendasari kesimpulan penulis",
      "Archetype Soal: Menguji kesahihan hubungan sebab-akibat (korelasi vs kausalitas)"
    ],
    requires_svg: false,
    updated_at: "2026-11-06"
  },
  content: {
    tactical_overview: "Di UTBK-SNBT, evaluasi argumen menguji kemampuan Anda membedah kaitan antara Premis (Fakta) dan Klaim/Simpulan. Soal tidak menanyakan apakah Anda setuju dengan isi teks, melainkan menguji daya serang (Memperlemah) atau daya dukung (Memperkuat) dari opsi baru terhadap klaim penulis. Ingat: Korelasi belum tentu kausalitas!",
    exam_blueprint_markdown: "### Peta Medan UTBK: Uji Argumen & Kausalitas\n\n| Tipe Uji Argumen | Target Serangan / Dukungan | Karakter Opsi yang Tepat | Algoritma Menjawab Cepat ($\\le 30$ Detik) |\n| :--- | :--- | :--- | :--- |\n| **Paling Memperlemah (Weaken)** | Merusak jembatan kausal antara premis dan kesimpulan | Memunculkan **faktor penyebab alternatif** (*confounding factor*) atau bukti tandingan nyata | Cari opsi yang menunjukkan bahwa akibat terjadi BUKAN karena sebab yang diklaim penulis. |\n| **Paling Memperkuat (Strengthen)** | Mengokohkan rantai kausal dan menyingkirkan keraguan | Membuktikan mekanisme kausal berjalan atau **meniadakan faktor penyebab lain** | Cari opsi yang membuktikan: jika sebab ada $\\implies$ akibat ada, dan jika sebab hilang $\\implies$ akibat hilang. |\n| **Asumsi Implisit (Assumption)** | Menemukan premis tersembunyi yang wajib benar agar argumen sah | Pernyataan yang jika **dinegasikan** langsung membuat kesimpulan penulis runtuh total | Lakukan **Negation Test**: Ubah opsi jadi 'TIDAK/BUKAN'. Jika argumen hancur $\\implies$ Opsi itu jawabannya! |\n| **Tabel Memperkuat / Tidak** | Menilai status 5 pernyataan mandiri terhadap hipotesis | Menguji apakah opsi relevan dan searah vs netral/kontra | Bedakan 'Tidak Memperkuat' (bisa berupa memperlemah ATAU tidak relevan sama sekali). |",
    visualizations_svg: [],
    distractor_traps: [
      "Jebakan 1: Opsi Restatement (Mengulang Fakta) — Hanya menulis ulang apa yang sudah tertulis di wacana tanpa memberikan bukti baru untuk memperkuat.",
      "Jebakan 2: Terkecoh Antara 'Tidak Memperkuat' vs 'Memperlemah' — Opsi yang sama sekali tidak berhubungan dengan topik teks berstatus 'Tidak Memperkuat' (karena netral), bukan memperlemah.",
      "Jebakan 3: Menyerang Premis Fakta — Dalam kaidah UTBK, fakta pada stimulus dianggap benar. Opsi yang baik memperlemah dengan cara memutuskan hubungan kausal, bukan menyangkal data angka premis."
    ],
    quick_execution_algorithm: [
      "Langkah 1: Identifikasi rumusan KESIMPULAN INTI penulis (biasanya di kalimat akhir atau ditandai kata 'Oleh karena itu', 'Dengan demikian', 'Hal ini membuktikan bahwa').",
      "Langkah 2: Temukan variabel X (Sebab) dan Y (Akibat) pada kesimpulan tersebut.",
      "Langkah 3: Untuk soal MEMPERLEMAH, cari opsi yang memperkenalkan variabel Z yang membuktikan Y disebabkan oleh Z, bukan oleh X."
    ]
  },
  worked_examples: [
    {
      example_id: "pu-1.2-var1",
      variation_name: "Archetype Soal 1: Pernyataan yang PALING MEMPERLEMAH Hipotesis Pakar",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Pakar tata kota mengamati bahwa kawasan permukiman yang memiliki rasio ruang terbuka hijau (RTH) publik di atas $30\\%$ mencatatkan tingkat keluhan stres warga yang lebih rendah sebesar $45\\%$ dibandingkan kawasan padat tanpa RTH. Berdasarkan temuan tersebut, pakar menyimpulkan: *'Pembangunan dan penambahan RTH publik secara langsung menjadi faktor penentu utama yang menurunkan tingkat stres masyarakat perkotaan.'*",
      svg_illustration: null,
      question_markdown: "Manakah pernyataan berikut yang jika benar, **PALING MEMPERLEMAH** simpulan pakar tata kota di atas?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Biaya pemeliharaan taman dan pepohonan di kawasan RTH publik membutuhkan alokasi APBD yang tidak sedikit."
        },
        {
          "key: "B",
          "text_markdown: "Kawasan permukiman dengan RTH di atas 30% umumnya dihuni oleh kelompok masyarakat berpenghasilan tinggi dengan jam kerja yang lebih fleksibel dan beban finansial rendah."
        },
        {
          "key: "C",
          "text_markdown: "Sebagian warga di kawasan padat tanpa RTH mengaku sering mendengarkan musik santai di rumah untuk meredakan kepenatan kerja."
        },
        {
          "key: "D",
          "text_markdown: "Udara di sekitar taman RTH memiliki konsentrasi partikel debu halus yang relatif lebih rendah dibanding jalan protokol."
        },
        {
          "key: "E",
          "text_markdown: "Banyak kota-kota maju di dunia yang mewajibkan penyediaan RTH minimal 20% bagi setiap pengembang properti."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Analisis Kausalitas & Faktor Perancu (Confounding Factor):**\n1. Klaim Pakar: $X$ (Adanya RTH) $\\implies$ menyebabkan $Y$ (Stres warga turun).\n2. Untuk memperlemah klaim kausalitas ini, kita harus mencari variabel perancu $Z$ yang menjadi penyebab sebenarnya dari rendahnya stres warga.\n3. Opsi B menyajikan fakta bahwa warga di kawasan ber-RTH adalah kelompok berpenghasilan tinggi dengan beban finansial rendah dan kerja fleksibel (variabel $Z$).\n4. Artinya, tingkat stres rendah kemungkinan besar dipicu oleh faktor ekonomi dan jam kerja yang rileks, BUKAN semata-mata keberadaan RTH $\\implies$ **Argumen Pakar Melemah Total**.",
      quick_trick_markdown: "**Trik Emas Memperlemah UTBK:**\nCari opsi yang menyajikan **Penyebab Alternatif (Alternative Cause)**. Jika teks mengklaim 'A menyebabkan B', cari opsi yang membuktikan 'C-lah yang menyebabkan B, dan A hanyalah kebetulan'. Opsi B adalah model *confounding factor* klasik Pusmendik.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Tidak Relevan):** Biaya APBD tidak membatalkan efek RTH terhadap stres warga.\n- **Opsi C Salah (Pernyataan Netral / Anekdot):** Kebiasaan sebagian warga mendengarkan musik tidak membantah korelasi RTH dan stres pada skala kawasan.\n- **Opsi D Salah (Malah Memperkuat):** Menjelaskan udara bersih yang justru mendukung mengapa RTH menyehatkan warga.\n- **Opsi E Salah (Pernyataan Kebijakan Umum Luar):** Regulasi di luar negeri tidak berhubungan dengan hubungan sebab-akibat pada subjek penelitian."
    },
    {
      example_id: "pu-1.2-var2",
      variation_name: "Archetype Soal 2: Pernyataan yang PALING MEMPERKUAT Argumen Peneliti",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Peneliti nutrisi anak melakukan eksperimen selama 6 bulan terhadap 80 balita yang mengalami indikasi malnutrisi ringan. Setengah dari balita diberikan suplemen biskuit berbasis tepung daun kelor setiap pagi, sementara kelompok lainnya mengonsumsi biskuit gandum biasa dengan kalori yang setara. Pada akhir masa eksperimen, kelompok balita penerima biskuit kelor mencatatkan kenaikan massa otot dan kadar hemoglobin darah yang lebih tinggi secara signifikan. Peneliti menyimpulkan bahwa mikronutrien spesifik pada daun kelor efektif mempercepat pemulihan status gizi balita malnutrisi.",
      svg_illustration: null,
      question_markdown: "Manakah pernyataan berikut yang jika benar, **PALING MEMPERKUAT** kesimpulan peneliti tersebut?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Harga bahan baku daun kelor di pasar tradisional relatif murah dan mudah dibudidayakan oleh masyarakat di pekarangan rumah."
        },
        {
          "key: "B",
          "text_markdown: "Kedua kelompok balita selama masa eksperimen mendapatkan menu makanan harian yang seragam dan tidak mengonsumsi vitamin tambahan lain dari luar."
        },
        {
          "key: "C",
          "text_markdown: "Sebagian orang tua balita mengaku awalnya ragu memberikan biskuit kelor karena aroma herbalnya yang khas."
        },
        {
          "key: "D",
          "text_markdown: "Balita yang mengonsumsi biskuit gandum biasa menyukai cita rasa manis biskuit dibandingkan kelompok biskuit kelor."
        },
        {
          "key: "E",
          "text_markdown: "Biskuit kelor dapat dikemas dalam bentuk camilan sereal yang menarik bagi anak usia sekolah dasar."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Analisis Kontrol Variabel Peneliti:**\n1. Simpulan Peneliti: Mikronutrien daun kelor ($X$) $\\implies$ menyebabkan pemulihan gizi ($Y$).\n2. Sebuah eksperimen ilmiah rentan diserang jika ada variabel luar (misal: ternyata balita kelompok kelor diberi daging atau vitamin lebih banyak oleh ibunya di rumah).\n3. Opsi B memastikan bahwa **semua variabel luar dikontrol secara ketat** (makanan seragam, tanpa vitamin luar). Ini menyingkirkan kemungkinan penyebab alternatif, sehingga kenaikan gizi murni $100\\%$ bersumber dari daun kelor $\\implies$ **Memperkuat Simpulan Secara Maksimal**.",
      quick_trick_markdown: "**Trik Emas Memperkuat UTBK:**\nSalah satu cara terkuat memperkuat eksperimen kausalitas adalah **Menyingkirkan Variabel Pengganggu (Eliminating Confounding Variables)**. Opsi yang memastikan kondisi kedua kelompok identik terkontrol adalah jawaban mutlak.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Aspek Ekonomis Tidak Relevan):** Murahnya harga daun kelor tidak membuktikan secara biologis khasiat mikronutriennya.\n- **Opsi C Salah (Respon Psikologis):** Keraguan orang tua tidak memengaruhi efektivitas klinis biskuit.\n- **Opsi D Salah (Preferensi Rasa):** Kesukaan rasa balita tidak berkaitan dengan kenaikan massa otot dan hemoglobin.\n- **Opsi E Salah (Peluang Pasar Luar):** Target konsumsi anak SD berada di luar populasi balita yang diteliti."
    },
    {
      example_id: "pu-1.2-var3",
      variation_name: "Archetype Soal 3: Tabel Kompleks 5 Pernyataan (Memperkuat / Tidak Memperkuat Standar Pusmendik)",
      difficulty: "hard",
      question_type: "complex_table",
      context_markdown: "Seorang sosiolog pendidikan menyatakan hipotesis berikut:\n*\"Pemberlakuan kebijakan larangan membawa ponsel pintar ke dalam kelas bagi siswa SMP secara langsung meningkatkan rata-rata fokus belajar siswa dan menaikkan perolehan nilai ujian sekolah.\"*",
      svg_illustration: null,
      question_markdown: "Tentukan apakah setiap temuan lapangan berikut **MEMPERKUAT** atau **TIDAK MEMPERKUAT** hipotesis sosiolog pendidikan tersebut!",
      statements: null,
      complex_table: {
        headers: ["Temuan Lapangan Baru", "Memperkuat", "Tidak Memperkuat"],
        rows: [
          {
            statement: "Di sekolah yang menerapkan larangan ponsel, guru mencatat penurunan interupsi selama penjelasan materi dan nilai ujian semester naik 15%.",
            correct_choice: "Memperkuat"
          },
          {
            statement: "Harga ponsel pintar yang digunakan oleh siswa di sekolah tersebut rata-rata mengalami penurunan harga di pasaran elektronik.",
            correct_choice: "Tidak Memperkuat"
          },
          {
            statement: "Peningkatan nilai ujian terjadi serentak di seluruh sekolah karena standar tingkat kesulitan soal ujian sengaja diturunkan oleh dinas pendidikan.",
            correct_choice: "Tidak Memperkuat"
          },
          {
            statement: "Ketika kebijakan larangan ponsel dicabut selama satu bulan uji coba, durasi atensi siswa di kelas merosot tajam dan nilai kuis mingguan menurun.",
            correct_choice: "Memperkuat"
          },
          {
            statement: "Siswa SMP merasa lebih mudah berkomunikasi dengan orang tua saat jam pulang sekolah berkat penggunaan ponsel pintar.",
            correct_choice: "Tidak Memperkuat"
          }
        ]
      },
      options: [],
      correct_answer: "Tabel Terverifikasi (Memperkuat, Tidak Memperkuat, Tidak Memperkuat, Memperkuat, Tidak Memperkuat)",
      conceptual_solution_markdown: "**Evaluasi Kausalitas Setiap Baris:**\n1. **Baris 1 (MEMPERKUAT):** Bukti empiris langsung yang mengonfirmasi penurunan distraksi dan kenaikan nilai.\n2. **Baris 2 (TIDAK MEMPERKUAT):** Harga pasaran gawai sama sekali tidak relevan dengan fokus belajar di kelas.\n3. **Baris 3 (TIDAK MEMPERKUAT):** Ini justru **memperlemah** hipotesis, karena kenaikan nilai ternyata disebabkan oleh soal yang dipermudah, bukan karena larangan ponsel. Ingat: kategori 'Tidak Memperkuat' mencakup pernyataan yang memperlemah atau netral.\n4. **Baris 4 (MEMPERKUAT):** Uji pembalikan kausal (Reverse Causality Test): saat sebab dicabut, akibat ikut hilang. Ini memperkokoh hubungan kausalitas.\n5. **Baris 5 (TIDAK MEMPERKUAT):** Manfaat komunikasi kepulangan sekolah tidak berhubungan dengan fokus belajar saat jam pelajaran berlangsung.",
      quick_trick_markdown: "**Kaidah Format 'Tidak Memperkuat' di UTBK:**\nIngat rumus ini: **Tidak Memperkuat = Memperlemah ATAU Netral/Tidak Relevan**. Jika pernyataan tersebut merusak klaim penulis (baris 3) atau melenceng dari konteks kelas (baris 2 & 5), maka kategorinya WAJIB dicentang pada kolom 'Tidak Memperkuat'.",
      why_others_are_wrong_markdown: "**Pembedahan Klasifikasi:**\n- Baris 3 sering menjebak siswa mengira ada kategori ketiga ('Memperlemah'). Di form Pusmendik, pernyataan yang memperlemah masuk ke 'Tidak Memperkuat'.\n- Baris 4 memperkuat melalui mekanisme pengujian kontrol 'reversal test'."
    },
    {
      example_id: "pu-1.2-var4",
      variation_name: "Archetype Soal 4: Menentukan Asumsi Implisit yang Mendasari Argumen Penulis",
      difficulty: "hard",
      question_type: "standard_mc",
      context_markdown: "Sebuah maskapai penerbangan mengumumkan kebijakan baru untuk mengganti seluruh peralatan makan plastik sekali pakai dengan peralatan makan yang terbuat dari bahan serat bambu yang dapat dikomposkan. Manajemen maskapai menyatakan bahwa kebijakan ini akan secara drastis mengurangi jejak emisi karbon dan dampak kerusakan lingkungan dari operasional penerbangan mereka dalam setahun ke depan.",
      svg_illustration: null,
      question_markdown: "Argumen manajemen maskapai penerbangan di atas mengasumsikan bahwa...",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Seluruh penumpang maskapai bersedia membayar harga tiket yang lebih mahal untuk mendanai pengadaan peralatan makan bambu."
        },
        {
          "key: "B",
          "text_markdown: "Proses produksi, transportasi, dan pengomposan peralatan makan berbahan serat bambu tersebut tidak menghasilkan emisi karbon yang lebih tinggi daripada siklus hidup plastik yang digantikannya."
        },
        {
          "key: "C",
          "text_markdown: "Bambu merupakan satu-satunya tanaman di dunia yang dapat diolah menjadi produk peralatan makan ramah lingkungan."
        },
        {
          "key: "D",
          "text_markdown: "Pemerintah akan segera menerbitkan undang-undang yang melarang penggunaan plastik di seluruh armada transportasi umum."
        },
        {
          "key: "E",
          "text_markdown: "Peralatan makan plastik sekali pakai menyumbang lebih dari separuh total beban berat pesawat saat lepas landas."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Metode Uji Negasi (The Negation Test for Assumptions):**\n1. Target Asumsi: Asumsi adalah fondasi tersembunyi yang WAJIB BENAR agar kesimpulan maskapai sah.\n2. Lakukan Uji Negasi pada Opsi B:\n   - *Negasi Opsi B:* 'Proses produksi dan pengomposan alat makan bambu ternyata menghasilkan emisi karbon yang LEBIH TINGGI daripada siklus hidup plastik'.\n3. Akibat Negasi: Jika negasi ini terjadi, maka klaim maskapai bahwa 'kebijakan ini secara drastis mengurangi jejak emisi karbon' langsung **RUNTUH TOTAL** dan menjadi kebohongan belaka.\n4. Karena negasinya menghancurkan argumen, maka Opsi B terbukti secara sah merupakan **ASUMSI IMPLISIT UTAMA**.",
      quick_trick_markdown: "**Trik 30 Detik Negation Test:**\nIngat rumus uji asumsi: **Argumen Valid $\\iff$ Negasi Opsi Meruntuhkan Argumen**. Opsi B jika diingkari ('emisi bambu ternyata lebih boros daripada plastik') membuat tujuan maskapai gagal total. Maka B adalah asumsi mutlak.",
      why_others_are_wrong_markdown: "**Bedah Jebakan Opsi Pengecoh:**\n- **Opsi A Salah (Bukan Asumsi Mutlak):** Kesediaan penumpang bayar tiket mahal tidak membatalkan efek penurunan emisi karbon material bambu.\n- **Opsi C Salah (Jebakan Klaim 'Satu-satunya'):** Maskapai tidak perlu mengasumsikan bambu adalah satu-satunya bahan di dunia; ada bahan ramah lingkungan lain pun argumen tetap valid.\n- **Opsi D Salah (Faktor Kebijakan Eksternal):** Manfaat lingkungan tidak bergantung pada ada/tidaknya regulasi pemerintah.\n- **Opsi E Salah (Pernyataan Faktual Fiktif):** Berat plastik di pesawat sangat kecil, tidak mungkin separuh berat total pesawat."
    },
    {
      example_id: "pu-1.2-var5",
      variation_name: "Archetype Soal 5: Korelasi Semu (Spurious Correlation) vs Kausalitas Sejati",
      difficulty: "medium",
      question_type: "standard_mc",
      context_markdown: "Data dari biro statistik di sebuah negara kepulauan menunjukkan bahwa penjualan es krim mengalami peningkatan sebesar $60\\%$ pada bulan Juni hingga Agustus. Pada periode bulan yang sama, angka insiden kematian akibat sengatan ubur-ubur beracun di kawasan pantai wisata juga mencatatkan rekor tertinggi tahunan. Seorang komentator media menyimpulkan bahwa konsumsi es krim memicu pelepasan zat kimia tertentu melalui keringat perenang yang menarik ubur-ubur untuk menyerang manusia.",
      svg_illustration: null,
      question_markdown: "Manakah pernyataan berikut yang menunjukkan cacat logika paling mendasar dari kesimpulan komentator media tersebut?",
      statements: null,
      complex_table: null,
      options: [
        {
          "key: "A",
          "text_markdown: "Komentator mengabaikan fakta bahwa harga es krim mengalami inflasi di kawasan wisata pantai."
        },
        {
          "key: "B",
          "text_markdown: "Komentator menyimpulkan hubungan sebab-akibat langsung dari dua kejadian yang sebenarnya sama-sama dipicu oleh faktor ketiga, yaitu puncak musim panas yang meningkatkan jumlah pengunjung pantai."
        },
        {
          "key: "C",
          "text_markdown: "Komentator tidak merinci varian rasa es krim yang paling digemari oleh wisatawan yang berenang di pantai."
        },
        {
          "key: "D",
          "text_markdown: "Komentator mengasumsikan bahwa sengatan ubur-ubur beracun selalu berakibat fatal bagi seluruh korban sengatan."
        },
        {
          "key: "E",
          "text_markdown: "Komentator mendasarkan kesimpulannya pada data statistik resmi dari biro pemerintah yang sudah teruji validitasnya."
        }
      ],
      correct_answer: "B",
      conceptual_solution_markdown: "**Deteksi Cacat Logika *Cum Hoc Ergo Propter Hoc*:**\n1. Premis: Penjualan es krim naik bersamaan dengan insiden sengatan ubur-ubur di bulan Juni–Agustus.\n2. Kesimpulan Komentator: Makan es krim menyebabkan sengatan ubur-ubur ($X \\implies Y$).\n3. Kekeliruan Logika: Ini adalah korelasi semu (*spurious correlation*). Baik penjualan es krim maupun jumlah perenang di laut sama-sama melonjak karena adanya faktor cuaca (*musim panas ekstrem* / variabel $Z$).\n4. Opsi B secara akurat membongkar kekeliruan atribusi kausal tersebut.",
      quick_trick_markdown: "**Pola Klasik Soal UTBK:**\nJika ada dua tren yang tampak konyol jika dihubungkan sebab-akibat (misal: *es krim vs ubur-ubur*, *sepatu vs kebakaran hutan*), penyebabnya selalu **Faktor Ketiga Bersama (Common Cause)**. Langsung cari opsi yang menyebutkan variabel iklim/musim atau faktor lingkungan bersama.",
      why_others_are_wrong_markdown: "**Bedah Opsi Pengecoh:**\n- **Opsi A & C Salah:** Inflasi harga dan varian rasa es krim adalah detail remeh yang tidak menyentuh akar kekeliruan kausalitas.\n- **Opsi D Salah:** Dampak fatalitas bukan penyebab terjadinya korelasi kedua peristiwa.\n- **Opsi E Salah:** Justru membenarkan data biro statistik, padahal yang salah adalah penarikan kesimpulan sang komentator."
    }
  ]
};

// Write files
const pu11Path = path.resolve('public/content/utbk/pu/pu-1.1.json');
const pu12Path = path.resolve('public/content/utbk/pu/pu-1.2.json');

fs.writeFileSync(pu11Path, JSON.stringify(pu11, null, 2), 'utf8');
console.log('Successfully wrote calibrated authentic PU 1.1 playbook to:', pu11Path);

fs.writeFileSync(pu12Path, JSON.stringify(pu12, null, 2), 'utf8');
console.log('Successfully wrote calibrated authentic PU 1.2 playbook to:', pu12Path);
