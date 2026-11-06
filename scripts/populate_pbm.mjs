import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const pbmItems = [
  // ==========================================
  // BAB 1: KAIDAH EJAAN BAHASA INDONESIA (EYD EDISI V)
  // ==========================================
  // 1.1. Penggunaan Huruf
  {
    id: "pbm-1.1.1",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.1",
    subchapter_title: "Penggunaan Huruf",
    title: "Huruf Kapital",
    micro_syllabus_scope: [
      "Awal kalimat dan awal petikan langsung.",
      "Nama diri (orang, julukan, tokoh, Tuhan, kitab suci, agama).",
      "Gelar kehormatan, bangsawan, keagamaan, akademik, profesi, dan jabatan/pangkat: Kapital jika diikuti nama orang, nama instansi, atau nama tempat (misal: Presiden Joko Widodo, Gubernur Jawa Barat, Profesor Soepomo); Kecil jika tidak diikuti nama diri/instansi (misal: Siapakah gubernur yang baru dilantik itu?).",
      "Sapaan dan kekerabatan (Bapak, Ibu, Kakak, Adik, Saudara, Anda): kapital saat dipakai sebagai kata ganti sapaan/acuan, kecil saat dipakai sebagai kata benda umum.",
      "Nama bangsa, suku bangsa, bahasa, dan aksara: Kapital pada nama dasarnya (suku Sunda, bahasa Indonesia, bangsa Eropa); Kecil jika mendapat awalan dan akhiran sekaligus / keindonesiaan (mengindonesiakan, kebarat-baratan).",
      "Nama tahun, bulan, hari, dan hari besar/peristiwa sejarah (tahun Hijriah, bulan Agustus, hari Jumat, Proklamasi Kemerdekaan Indonesia; perhatikan kata tahun, bulan, hari ditulis kecil).",
      "Nama geografi (negara, provinsi, kota, gunung, laut, sungai, selat, teluk, pulau): Kapital jika diikuti nama diri geografi (Selat Sunda, Pulau Kalimantan, Danau Toba); Kecil jika tidak diikuti nama diri (berenang di danau, menyebrangi selat); Kecil untuk penunjuk spesies/kekhasan budaya/kuliner (jeruk bali, kacang bogor, petai cina, gula jawa, kunci inggris, kecuali batik Pekalongan, film Korea yang bermakna asal).",
      "Penulisan Judul (buku, artikel, karangan, berita, peraturan): semua kata diawali kapital kecuali kata tugas (di, ke, dari, dan, yang, untuk, pada, dengan, sebagai, dalam) yang tidak terletak di posisi awal."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.1.1.json"
  },
  {
    id: "pbm-1.1.2",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.1",
    subchapter_title: "Penggunaan Huruf",
    title: "Huruf Miring (Italics)",
    micro_syllabus_scope: [
      "Menuliskan judul buku, judul film, judul album, nama majalah, atau nama surat kabar yang dikutip dalam teks (bukan judul bab/artikel).",
      "Menegaskan atau mengkhususkan huruf, bagian kata, kata, atau kelompok kata dalam kalimat.",
      "Menuliskan kata atau ungkapan dalam bahasa daerah atau bahasa asing yang belum diserap ke dalam bahasa Indonesia (termasuk nama ilmiah biologi: Oryza sativa).",
      "Pengecualian: nama diri lembaga/organisasi asing tidak ditulis miring (World Health Organization, United Nations)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.1.2.json"
  },
  {
    id: "pbm-1.1.3",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.1",
    subchapter_title: "Penggunaan Huruf",
    title: "Huruf Tebal (Bold)",
    micro_syllabus_scope: [
      "Menegaskan bagian yang sudah ditulis miring.",
      "Menegaskan bagian-bagian karangan seperti judul buku, bab, atau subbab."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.1.3.json"
  },

  // 1.2. Penulisan Kata
  {
    id: "pbm-1.2.1",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Kata Dasar dan Kata Berimbuhan",
    micro_syllabus_scope: [
      "Kata berimbuhan (awalan, sisipan, akhiran, gabungan imbuhan) ditulis serangkai dengan kata dasarnya.",
      "Bentuk terikat (adiluhung, aerodinamika, antarnegara, caturwulan, dasawarsa, dwibahasa, ekstrakurikuler, infrastruktur, mancanegara, mahakuasa, mahasiswa, multilateral, narasumber, nonblok, panca-, pascasarjana, prasejarah, proaktif, purnawirawan, saptakrida, semiprofesional, subbagian, swadaya, telewicara, transmigrasi, tunanetra, ultramodern) ditulis serangkai dengan kata yang mengikutinya.",
      "Pengecualian bentuk terikat: Diikuti kata berhuruf awal kapital dimarkahi dengan tanda hubung (non-Indonesia, pan-Afrikanisme, pro-Barat, anti-PKI).",
      "Pengecualian bentuk terikat: Bentuk maha- diikuti kata berimbuhan (Maha Pengasih, Maha Penyayang, Maha Mengetahui) ditulis terpisah; kecuali Mahakuasa dan Maha Esa (khusus Maha Esa tetap terpisah, Mahakuasa serangkai)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.1.json"
  },
  {
    id: "pbm-1.2.2",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Gabungan Kata (Kata Majemuk)",
    micro_syllabus_scope: [
      "Ditulis terpisah antarunsurnya (duta besar, kambing hitam, kereta api cepat, meja tulis, orang tua, rumah sakit jiwa, simpang empat).",
      "Mendapat awalan saja atau akhiran saja tetap ditulis terpisah (bertepuk tangan, menganak sungai, garis bawahi, sebar luaskan).",
      "Mendapat awalan dan akhiran sekaligus (konfiks) ditulis serangkai (dilipatgandakan, menggarisbawahi, menyebarluaskan, penghancurleburan, pertanggungjawaban).",
      "Gabungan kata yang sudah padu (lebur) ditulis serangkai (acapkali, adakalanya, apalagi, bagaimana, barangkali, beasiswa, belasungkawa, bilamana, bumiputra, daripada, darmabakti, dukacita, hulubalang, kacamata, kasatmata, kepada, keratabasa, kilometer, manasuka, matahari, olahraga, padahal, paramedis, peribahasa, puspadanta, radioaktif, saptamarga, saputangan, saripati, sebagaimana, sediakala, segitiga, sekalipun, sukacita, sukarela, syahbandar, wiraswasta)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.2.json"
  },
  {
    id: "pbm-1.2.3",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Pemenggalan Kata (Suku Kata)",
    micro_syllabus_scope: [
      "Pemenggalan kata dasar berdasarkan vokal berurutan, konsonan di antara dua vokal, dua konsonan berurutan, dan tiga konsonan atau lebih (in-stru-men, eks-tra, bang-krut).",
      "Pemenggalan kata berimbuhan dan kata bertransliterasi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.3.json"
  },
  {
    id: "pbm-1.2.4",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Kata Depan (Preposisi: di, ke, dari)",
    micro_syllabus_scope: [
      "Ditulis terpisah dari kata yang mengikutinya jika menunjuk tempat, arah, atau waktu (di samping, di antara, di dalam, ke tengah, keluar [verba] vs ke luar [arah]).",
      "Membedakan preposisi di (terpisah: di mana, di sini, di rumah) vs prefiks pasif di- (serangkai: dimakan, dikelola, dipahami)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.4.json"
  },
  {
    id: "pbm-1.2.5",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Partikel (-lah, -kah, -tah, pun, per)",
    micro_syllabus_scope: [
      "Partikel -lah, -kah, -tah ditulis serangkai dengan kata yang mendahuluinya (bacalah, apakah, siapakah).",
      "Partikel pun ditulis terpisah jika bermakna \"juga\" atau \"saja\" (apa pun, siapa pun, di mana pun, kapan pun, satu kali pun, jangankan dua kali, satu kali pun belum pernah).",
      "Partikel pun ditulis serangkai pada 12 konjungsi padu (adapun, andaipun, ataupun, bagaimanapun, biarpun, kalaupun, kendatipun, maupun, meskipun, sekalipun [meski], sungguhpun, walaupun).",
      "Partikel per ditulis terpisah jika bermakna \"demi\", \"tiap\", atau \"mulai\" (masuk satu per satu, harga per meter, per 1 Januari); ditulis serangkai jika berupa pecahan atau imbuhan (dua pertiga, mempersatukan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.5.json"
  },
  {
    id: "pbm-1.2.6",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Singkatan dan Akronim",
    micro_syllabus_scope: [
      "Singkatan nama orang, gelar, sapaan, jabatan menggunakan titik (A.H. Nasution, S.Kom., M.Hum., Bpk., Sdr., Kol.).",
      "Singkatan nama lembaga/dokumen resmi dari huruf awal setiap kata ditulis kapital tanpa titik (NKRI, PBB, UUD, WHO, KTP).",
      "Singkatan umum: 3 huruf atau lebih diikuti satu titik (dll., dsb., dst., hlm., ttd., ybs., dkk.); 2 huruf masing-masing diikuti titik (a.n., d.a., u.b., u.p., s.d.).",
      "Singkatan lambang kimia, satuan ukuran, takaran, timbangan, dan mata uang ditulis tanpa titik (cm, kg, km, l, Rp5.000,00).",
      "Akronim nama diri dengan huruf awal kapital (Bulog, Bappenas, Kaltim, Suramadu) vs akronim bukan nama diri seluruhnya huruf kecil (iptek, pemilu, puskesmas, rapim, rudal, tilang, siskamling, daring, luring)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.6.json"
  },
  {
    id: "pbm-1.2.7",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.2",
    subchapter_title: "Penulisan Kata",
    title: "Angka dan Bilangan",
    micro_syllabus_scope: [
      "Bilangan yang dapat dinyatakan dengan satu atau dua kata ditulis dengan huruf (dua belas, seratus, tiga ratus, lima ribu), kecuali jika dipakai secara berurutan dalam perincian (12 laki-laki, 5 perempuan, dan 2 anak-anak).",
      "Bilangan pada awal kalimat wajib ditulis dengan huruf (atau kalimatnya diubah susunannya jika bilangan lebih dari dua kata).",
      "Penulisan angka dengan akhiran -an (tahun 1990-an, uang 5.000-an) dan bilangan tingkat (abad XX = abad ke-20 = abad kedua puluh)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.2.7.json"
  },

  // 1.3. Penggunaan Tanda Baca (Pungtuasi)
  {
    id: "pbm-1.3.1",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Titik (.)",
    micro_syllabus_scope: [
      "Akhir kalimat berita, pemisah angka jam/menit/detik (pukul 01.35.20), pemisah bilangan ribuan/kelipatannya yang menunjukkan jumlah (1.500 orang).",
      "Tidak digunakan pada: angka yang tidak menunjukkan jumlah (tahun 2026, halaman 1250, nomor telepon, NIP), akhir judul/subjudul, kepala tabel/grafik, atau alamat pengirim/penerima surat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.1.json"
  },
  {
    id: "pbm-1.3.2",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Koma (,)",
    micro_syllabus_scope: [
      "Di antara unsur-unsur dalam suatu pemerincian yang berupa tiga unsur atau lebih (A, B, dan C).",
      "Sebelum kata penghubung intrakalimat pertentangan (..., tetapi ..., ..., melainkan ..., ..., sedangkan ...).",
      "Memisahkan anak kalimat yang mendahului induk kalimat (Jika hujan turun, saya tidak datang). Tidak dipakai jika induk kalimat mendahului anak kalimat (Saya tidak datang jika hujan turun).",
      "Di belakang kata atau ungkapan penghubung antarkalimat (Oleh karena itu, ..., Namun, ..., Akan tetapi, ..., Meskipun demikian, ..., Selanjutnya, ...).",
      "Mengapit keterangan tambahan (aposisi) yang sifatnya tidak membatasi (Soekarno, Presiden I RI, ...).",
      "Di depan angka desimal (12,5 kg) dan di antara nama serta gelar akademik (Budi Santoso, S.T., M.Eng.)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.2.json"
  },
  {
    id: "pbm-1.3.3",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Titik Koma (;)",
    micro_syllabus_scope: [
      "Pengganti kata penghubung untuk memisahkan kalimat setara di dalam kalimat majemuk.",
      "Memisahkan bagian-bagian pemerincian yang masing-masing unsurnya sudah menggunakan tanda koma."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.3.json"
  },
  {
    id: "pbm-1.3.4",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Titik Dua (:)",
    micro_syllabus_scope: [
      "Akhir pernyataan lengkap yang langsung diikuti pemerincian/penjelasan.",
      "Tidak dipakai jika perincian tersebut merupakan pelengkap yang mengakhiri pernyataan (misal: Kita memerlukan kursi, meja, dan lemari)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.4.json"
  },
  {
    id: "pbm-1.3.5",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Hubung (-) vs Tanda Pisah (—)",
    micro_syllabus_scope: [
      "Tanda Hubung (-): menyambung unsur kata ulang, menyambung tanggal/bulan/tahun (05-11-2026), merangkai se- + kata berikutnya yang berhuruf awal kapital (se-Indonesia), merangkai ke- + angka (ke-2), merangkai angka + -an (1990-an), merangkai huruf kecil dan huruf kapital/angka (ber-KTP, di-SK-kan, sinar-X, D-3, S-1).",
      "Tanda Pisah (—): mengapit keterangan/penjelasan tambahan di luar bangun kalimat (setara tanda kurung/koma aposisi) dan menyatakan arti \"sampai dengan\" atau \"sampai ke\" (1945—2026, Jakarta—Bandung)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.5.json"
  },
  {
    id: "pbm-1.3.6",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Petik (\"...\") vs Tanda Petik Tunggal ('...')",
    micro_syllabus_scope: [
      "Tanda Petik (\"...\"): petikan langsung, judul puisi/lagu/artikel/bab buku/pidato yang dipakai dalam kalimat, atau istilah yang mempunyai arti khusus.",
      "Tanda Petik Tunggal ('...'): petikan di dalam petikan lain, serta mengapit makna, terjemahan, atau penjelasan kata/ungkapan (noken 'tas khas Papua')."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.6.json"
  },
  {
    id: "pbm-1.3.7",
    subtest: "PBM",
    chapter_num: 1,
    chapter_title: "Kaidah Ejaan Bahasa Indonesia (EYD Edisi V)",
    subchapter_num: "1.3",
    subchapter_title: "Penggunaan Tanda Baca (Pungtuasi)",
    title: "Tanda Kurung ((...)), Kurung Siku ([...]), dan Garis Miring (/)",
    micro_syllabus_scope: [
      "Fungsi tanda kurung untuk penjelasan tambahan/singkatan, kurung siku untuk koreksi kutipan, dan garis miring untuk pengganti dan/atau/tiap serta nomor surat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-1.3.7.json"
  },

  // ==========================================
  // BAB 2: KEKAYAAN LEKSIKON (KATA BAKU & SERAPAN KBBI)
  // ==========================================
  // 2.1. Kata Baku dan Tidak Baku (Standard vs Non-Standard Vocabulary)
  {
    id: "pbm-2.1.1",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kekayaan Leksikon (Kata Baku & Serapan KBBI)",
    subchapter_num: "2.1",
    subchapter_title: "Kata Baku dan Tidak Baku (Standard vs Non-Standard Vocabulary)",
    title: "Pola Kesalahan Ejaan Vokal dan Konsonan yang Sering Muncul di UTBK",
    micro_syllabus_scope: [
      "Praktik (bukan praktek), apotek (bukan apotik), atlet (bukan atlit), nasihat (bukan nasehat), risiko (bukan resiko), hakikat (bukan hakekat), kualitas/kuantitas/kuitansi (bukan kwalitas/kwitansi), jadwal (bukan jadual), lembap (bukan lembab), napas (bukan nafas), aktif/aktivitas (konsisten f pada kata dasar dan v pada kata turunan: produktif-produktivitas, efektif-efektivitas, sportif-sportivitas).",
      "Hierarki, karier, higienis, ekstrem, sistem, metode, teknik, konkret, komoditas, varietas, sekadar, silakan, mengubah (bukan merubah), mencolok (bukan menyolok), memengaruhi (bukan mempengaruhi), memercayai (bukan mempercayai), memerhatikan (bukan memperhatikan — ketiganya luluh berdasarkan KBBI)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.1.1.json"
  },
  {
    id: "pbm-2.1.2",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kekayaan Leksikon (Kata Baku & Serapan KBBI)",
    subchapter_num: "2.1",
    subchapter_title: "Kata Baku dan Tidak Baku (Standard vs Non-Standard Vocabulary)",
    title: "Pasangan Kata Mirip dan Pengecoh Semantik",
    micro_syllabus_scope: [
      "Acuh (peduli) vs tak acuh (tidak peduli).",
      "Bergeming (diam saja/tidak bergerak) vs tak bergeming.",
      "Sarat (penuh/muatan) vs syarat (ketentuan).",
      "Intens vs intensi."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.1.2.json"
  },

  // 2.2. Kaidah Penyerapan Unsur Asing (Pedoman Umum Pembentukan Istilah)
  {
    id: "pbm-2.2.1",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kekayaan Leksikon (Kata Baku & Serapan KBBI)",
    subchapter_num: "2.2",
    subchapter_title: "Kaidah Penyerapan Unsur Asing (Pedoman Umum Pembentukan Istilah)",
    title: "Penyerapan melalui Adaptasi (Penyesuaian Ejaan dan Lafal)",
    micro_syllabus_scope: [
      "Akhiran -ic / -ics menjadi -ik / -ika (logic → logika, physics → fisika, antibiotic → antibiotik).",
      "Akhiran -ism menjadi -isme (nationalism → nasionalisme).",
      "Akhiran -ization / -isatie menjadi -isasi (organization → organisasi).",
      "Akhiran -ity / -iteit menjadi -itas (university → universitas).",
      "Akhiran -logy / -logie menjadi -logi (technology → teknologi).",
      "Gugus konsonan yang disederhanakan: ph → f (phase → fase), ch → k / s (technique → teknik, machine → mesin), c → s / k (central → sentral, construction → konstruksi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.2.1.json"
  },
  {
    id: "pbm-2.2.2",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kekayaan Leksikon (Kata Baku & Serapan KBBI)",
    subchapter_num: "2.2",
    subchapter_title: "Kaidah Penyerapan Unsur Asing (Pedoman Umum Pembentukan Istilah)",
    title: "Penyerapan melalui Penerjemahan Konsep",
    micro_syllabus_scope: [
      "Mencari padanan bahasa Indonesia untuk istilah asing (download → unduh, upload → unggah, mouse → tetikus, gadget → gawai, netizen → warganet, preview → pratayang, spreadsheet → lembar sebar, takeover → pengambilalihan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.2.2.json"
  },
  {
    id: "pbm-2.2.3",
    subtest: "PBM",
    chapter_num: 2,
    chapter_title: "Kekayaan Leksikon (Kata Baku & Serapan KBBI)",
    subchapter_num: "2.2",
    subchapter_title: "Kaidah Penyerapan Unsur Asing (Pedoman Umum Pembentukan Istilah)",
    title: "Penyerapan Utuh (Adopsi)",
    micro_syllabus_scope: [
      "Kata asing yang diserap tanpa perubahan ejaan (data, film, golf, internet, orbit, radar, vitamin)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-2.2.3.json"
  },

  // ==========================================
  // BAB 3: KALIMAT EFEKTIF DAN PENYUNTINGAN SINTAKSIS
  // ==========================================
  // 3.1. Kesepadanan Struktur (Kelengkapan Subjek dan Predikat)
  {
    id: "pbm-3.1.1",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.1",
    subchapter_title: "Kesepadanan Struktur (Kelengkapan Subjek dan Predikat)",
    title: "Jebakan Preposisi di Depan Subjek",
    micro_syllabus_scope: [
      "Kesalahan meletakkan kata depan (Bagi, Untuk, Dalam, Pada, Di, Dari, Kepada, Menurut, Berdasarkan) tepat di depan Subjek sehingga kalimat kehilangan Subjek dan berubah menjadi Keterangan seluruhnya.",
      "Solusi perbaikan: hapus preposisi di awal kalimat, munculkan Subjek baru setelah tanda koma, atau ubah Predikat aktif menjadi pasif (di-...)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.1.1.json"
  },
  {
    id: "pbm-3.1.2",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.1",
    subchapter_title: "Kesepadanan Struktur (Kelengkapan Subjek dan Predikat)",
    title: "Jebakan Konjungsi Perluasan \"Yang\" di Depan Predikat",
    micro_syllabus_scope: [
      "Menyisipkan kata yang di antara Subjek dan Predikat utama (misal: Pemerintah yang menetapkan kebijakan baru → hanya berupa Frasa Subjek tanpa Predikat; harus diubah menjadi Pemerintah menetapkan kebijakan baru)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.1.2.json"
  },
  {
    id: "pbm-3.1.3",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.1",
    subchapter_title: "Kesepadanan Struktur (Kelengkapan Subjek dan Predikat)",
    title: "Jebakan Anak Kalimat Tunggal Tanpa Induk Kalimat",
    micro_syllabus_scope: [
      "Kalimat yang diawali konjungsi subordinatif (Karena..., Ketika..., Meskipun..., Sehingga..., Sedangkan...) tetapi tidak diikuti klausa utama (induk kalimat)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.1.3.json"
  },

  // 3.2. Keparalelan Bentuk (Kesejajaran / Parallelism)
  {
    id: "pbm-3.2.1",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.2",
    subchapter_title: "Keparalelan Bentuk (Kesejajaran / Parallelism)",
    title: "Kesejajaran Kategori Kelas Kata dan Imbuhan dalam Pemerincian",
    micro_syllabus_scope: [
      "Jika unsur pertama dalam perincian menggunakan verba berawalan meN-, maka unsur kedua dan ketiga wajib menggunakan verba meN- (bukan dicampur dengan di- atau peN-an).",
      "Contoh salah: Tahap penelitian meliputi pengumpulan data, menganalisis sampel, dan penulisan laporan.",
      "Contoh benar (semua nomina peN-an): ... meliputi pengumpulan data, penganalisisan sampel, dan penulisan laporan. (Atau semua verba meN-: mengumpulkan..., menganalisis..., dan menulis...)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.2.1.json"
  },

  // 3.3. Kehematan Kata (Menghindari Pleonasme dan Redundansi)
  {
    id: "pbm-3.3.1",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.3",
    subchapter_title: "Kehematan Kata (Menghindari Pleonasme dan Redundansi)",
    title: "Penghilangan Pengulangan Subjek yang Sama",
    micro_syllabus_scope: [
      "Jika Subjek anak kalimat sama dengan Subjek induk kalimat, sebutkan Subjek cukup satu kali pada induk kalimat."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.3.1.json"
  },
  {
    id: "pbm-3.3.2",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.3",
    subchapter_title: "Kehematan Kata (Menghindari Pleonasme dan Redundansi)",
    title: "Penghilangan Bentuk Jamak Ganda",
    micro_syllabus_scope: [
      "Kata yang sudah bermakna jamak (para, beberapa, banyak, semua, seluruh, sejumlah, berbagai, daftar, kumpulan) tidak boleh diikuti kata ulang (misal: para siswa-siswa → para siswa atau siswa-siswa)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.3.2.json"
  },
  {
    id: "pbm-3.3.3",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.3",
    subchapter_title: "Kehematan Kata (Menghindari Pleonasme dan Redundansi)",
    title: "Penghilangan Sinonim Ganda dan Hipernim-Hiponim Bersamaan",
    micro_syllabus_scope: [
      "Sinonim ganda: agar supaya, adalah merupakan, demi untuk, seperti misalnya, sejak dari, sangat ... sekali, hanya ... saja, saling ...-men-... (saling tolong-menolong → saling menolong atau tolong-menolong).",
      "Hipernim + Hiponim: warna merah → merah; hari Senin (dalam konteks hemat tertentu); bunga mawar."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.3.3.json"
  },

  // 3.4. Kelogisan, Kecermatan, dan Ketegasan Makna
  {
    id: "pbm-3.4.1",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.4",
    subchapter_title: "Kelogisan, Kecermatan, dan Ketegasan Makna",
    title: "Kelogisan Makna (Penalaran Kalimat)",
    micro_syllabus_scope: [
      "Kesesuaian logis antara pelaku (Subjek) dan tindakan (Predikat).",
      "Contoh tidak logis dan perbaikannya: Waktu dan tempat kami persilakan (perbaikan: Kepada Bapak Dekan, kami persilakan).",
      "Contoh tidak logis dan perbaikannya: Untuk mempersingkat waktu, acara dilanjutkan (perbaikan: Untuk menghemat waktu...).",
      "Contoh tidak logis dan perbaikannya: Mayat wanita yang ditemukan itu sebelumnya sering mondar-mandir di pasar (perbaikan: Sebelum meninggal, wanita yang mayatnya ditemukan itu...)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.4.1.json"
  },
  {
    id: "pbm-3.4.2",
    subtest: "PBM",
    chapter_num: 3,
    chapter_title: "Kalimat Efektif dan Penyuntingan Sintaksis",
    subchapter_num: "3.4",
    subchapter_title: "Kelogisan, Kecermatan, dan Ketegasan Makna",
    title: "Kecermatan (Menghindari Ambiguitas / Tafsir Ganda)",
    micro_syllabus_scope: [
      "Menghindari frasa bermakna ambigu, seperti: Lukisan ayah baru dipajang di ruang tamu (apakah lukisannya yang baru, ayahnya yang baru, atau baru saja dipajang?).",
      "Menghindari frasa bermakna ambigu, seperti: Istri lurah yang muda itu ramah (lurahnya yang muda atau istrinya?)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-3.4.2.json"
  },

  // ==========================================
  // BAB 4: KONJUNGSI DAN PENGGABUNGAN KALIMAT
  // ==========================================
  // 4.1. Konjungsi Intrakalimat
  {
    id: "pbm-4.1.1",
    subtest: "PBM",
    chapter_num: 4,
    chapter_title: "Konjungsi dan Penggabungan Kalimat",
    subchapter_num: "4.1",
    subchapter_title: "Konjungsi Intrakalimat",
    title: "Konjungsi Koordinatif (Setara)",
    micro_syllabus_scope: [
      "Dan, serta (penambahan).",
      "Atau (pemilihan).",
      "Tetapi, melainkan, padahal, sedangkan (pertentangan)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-4.1.1.json"
  },
  {
    id: "pbm-4.1.2",
    subtest: "PBM",
    chapter_num: 4,
    chapter_title: "Konjungsi dan Penggabungan Kalimat",
    subchapter_num: "4.1",
    subchapter_title: "Konjungsi Intrakalimat",
    title: "Konjungsi Korelatif (Berpasangan Tetap)",
    micro_syllabus_scope: [
      "Baik ... maupun ... (bukan baik ... ataupun).",
      "Tidak hanya ..., tetapi juga ... (bukan tidak hanya ..., melainkan juga ...).",
      "Bukan hanya ..., melainkan juga ... (bukan berpasangan dengan melainkan; tidak berpasangan dengan tetapi).",
      "Pasangan tetap lainnya: Entah ... entah ...; Jangankan ..., ... pun ...; Sedemikian rupa ... sehingga ...."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-4.1.2.json"
  },
  {
    id: "pbm-4.1.3",
    subtest: "PBM",
    chapter_num: 4,
    chapter_title: "Konjungsi dan Penggabungan Kalimat",
    subchapter_num: "4.1",
    subchapter_title: "Konjungsi Intrakalimat",
    title: "Konjungsi Subordinatif (Bertingkat)",
    micro_syllabus_scope: [
      "Relasi Waktu: sejak, ketika, sambil, selagi, sebelum, setelah.",
      "Relasi Syarat: jika, kalau, apabila, asalkan.",
      "Relasi Pengandaian: andaikan, seandainya, umpamanya.",
      "Relasi Tujuan: agar, supaya, biar.",
      "Relasi Konsesif: biarpun, meskipun, walaupun.",
      "Relasi Pembandingan: seakan-akan, sebagaimana, seperti, alih-alih, daripada.",
      "Relasi Sebab: sebab, karena, oleh karena.",
      "Relasi Hasil/Akibat: sehingga, maka, sampai.",
      "Relasi Alat/Cara: dengan, tanpa.",
      "Relasi Penjelas: bahwa."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-4.1.3.json"
  },

  // 4.2. Konjungsi Antarkalimat (Transisi Wacana)
  {
    id: "pbm-4.2.1",
    subtest: "PBM",
    chapter_num: 4,
    chapter_title: "Konjungsi dan Penggabungan Kalimat",
    subchapter_num: "4.2",
    subchapter_title: "Konjungsi Antarkalimat (Transisi Wacana)",
    title: "Klasifikasi Fungsi Logis Konjungsi Antarkalimat",
    micro_syllabus_scope: [
      "Menyatakan Konsekuensi / Akibat: Oleh karena itu, Oleh sebab itu, Dengan demikian, Maka dari itu, Akibatnya.",
      "Menyatakan Pertentangan: Namun, Akan tetapi, Biarpun demikian, Sekalipun demikian, Walaupun demikian, Meskipun demikian.",
      "Menyatakan Kebalikan: Sebaliknya.",
      "Menyatakan Penambahan / Kelanjutan: Selain itu, Di samping itu, Lebih lanjut, Tambahan pula, Selanjutnya, Setelah itu, Kemudian.",
      "Menyatakan Penguatan / Penegasan: Bahkan, Malahan, Sesungguhnya, Bahwasanya.",
      "Menyatakan Keadaan Sebenarnya: Sebenarnya, Sesungguhnya, Bahwasanya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-4.2.1.json"
  },
  {
    id: "pbm-4.2.2",
    subtest: "PBM",
    chapter_num: 4,
    chapter_title: "Konjungsi dan Penggabungan Kalimat",
    subchapter_num: "4.2",
    subchapter_title: "Konjungsi Antarkalimat (Transisi Wacana)",
    title: "Larangan Konjungsi Intrakalimat di Awal Kalimat",
    micro_syllabus_scope: [
      "Kata sedangkan, sehingga, tetapi, melainkan, dan, atau, maka dilarang diletakkan di awal kalimat baru (setelah tanda titik)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-4.2.2.json"
  },

  // ==========================================
  // BAB 5: RETORIKA DAN PENGEMBANGAN PARAGRAF (MENULIS)
  // ==========================================
  // 5.1. Penentuan Judul, Topik, dan Gagasan Pokok Tulisan
  {
    id: "pbm-5.1.1",
    subtest: "PBM",
    chapter_num: 5,
    chapter_title: "Retorika dan Pengembangan Paragraf (Menulis)",
    subchapter_num: "5.1",
    subchapter_title: "Penentuan Judul, Topik, dan Gagasan Pokok Tulisan",
    title: "Syarat Judul Teks yang Baik dan Benar",
    micro_syllabus_scope: [
      "Relevan dengan keseluruhan isi teks (mencakup seluruh paragraf, bukan hanya 1 paragraf).",
      "Berbentuk frasa (kelompok kata nonpredikatif), singkat, padat, logis, dan mematuhi kaidah huruf kapital judul EYD V."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-5.1.1.json"
  },
  {
    id: "pbm-5.1.2",
    subtest: "PBM",
    chapter_num: 5,
    chapter_title: "Retorika dan Pengembangan Paragraf (Menulis)",
    subchapter_num: "5.1",
    subchapter_title: "Penentuan Judul, Topik, dan Gagasan Pokok Tulisan",
    title: "Menyusun Kerangka dan Ilustrasi Penjelas",
    micro_syllabus_scope: [
      "Menentukan kalimat penjelas yang paling tepat untuk mendukung gagasan utama tertentu.",
      "Menentukan ilustrasi atau contoh kasus yang relevan untuk ditambahkan ke dalam paragraf."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-5.1.2.json"
  },

  // 5.2. Penyuntingan Tingkat Wacana (Cloze Test & Rekonstruksi Teks)
  {
    id: "pbm-5.2.1",
    subtest: "PBM",
    chapter_num: 5,
    chapter_title: "Retorika dan Pengembangan Paragraf (Menulis)",
    subchapter_num: "5.2",
    subchapter_title: "Penyuntingan Tingkat Wacana (Cloze Test & Rekonstruksi Teks)",
    title: "Melengkapi Teks Rumpang (Kata, Frasa, Klausa, dan Kalimat)",
    micro_syllabus_scope: [
      "Mengisi kata berimbuhan, istilah teknis, preposisi, atau konjungsi yang rumpang dalam paragraf.",
      "Menentukan kalimat pembuka, kalimat penjelas tengah, atau kalimat simpulan penutup yang rumpang."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-5.2.1.json"
  },
  {
    id: "pbm-5.2.2",
    subtest: "PBM",
    chapter_num: 5,
    chapter_title: "Retorika dan Pengembangan Paragraf (Menulis)",
    subchapter_num: "5.2",
    subchapter_title: "Penyuntingan Tingkat Wacana (Cloze Test & Rekonstruksi Teks)",
    title: "Penggabungan Dua Kalimat Tunggal Menjadi Kalimat Majemuk",
    micro_syllabus_scope: [
      "Memilih konjungsi yang paling tepat dan melakukan pelesapan (elipsis) unsur yang berulang secara efektif tanpa mengubah makna kedua kalimat asal."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-5.2.2.json"
  },
  {
    id: "pbm-5.2.3",
    subtest: "PBM",
    chapter_num: 5,
    chapter_title: "Retorika dan Pengembangan Paragraf (Menulis)",
    subchapter_num: "5.2",
    subchapter_title: "Penyuntingan Tingkat Wacana (Cloze Test & Rekonstruksi Teks)",
    title: "Penghilangan Kalimat yang Mengganggu Koherensi",
    micro_syllabus_scope: [
      "Memilih kalimat yang harus dihapus agar paragraf menjadi padu dan fokus pada satu gagasan utama."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/pbm/pbm-5.2.3.json"
  }
];

// Read existing tracker data
let trackerData = { items: [] };
if (fs.existsSync(trackerPath)) {
  try {
    const raw = fs.readFileSync(trackerPath, 'utf8');
    trackerData = JSON.parse(raw);
    if (!Array.isArray(trackerData.items)) {
      trackerData.items = [];
    }
  } catch (err) {
    console.warn('Gagal membaca file tracker eksisting, inisialisasi baru.');
    trackerData = { items: [] };
  }
}

// Preserve existing items not belonging to PBM, and merge PBM items
const nonPbmItems = trackerData.items.filter(item => item.subtest !== 'PBM');
const mergedItems = [...nonPbmItems, ...pbmItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(pbmItems.map(item => item.chapter_num));
const subchapters = new Set(pbmItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = pbmItems.length;
const requiresSvgCount = pbmItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes PBM!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
