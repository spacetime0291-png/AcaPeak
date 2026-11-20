import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Lock, Cookie, Eye, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

interface PageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ theme = 'light', onToggleTheme = () => {} }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] dark:bg-[#070913] text-slate-800 dark:text-[#f8fafc]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#fdfbf7]/90 dark:bg-[#070913]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">SkolAce</span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Kepatuhan Privasi & Kebijakan Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Kebijakan Privasi (Privacy Policy)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Terakhir diperbarui: 20 November 2026
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
            Komitmen SkolAce: Kami sangat menghargai privasi Anda. Platform ini dirancang agar dapat diakses secara langsung tanpa memerlukan pendaftaran akun pengguna, nama asli, atau nomor telepon.
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              1. Pengumpulan Data dan Penyimpanan Lokal (Local Storage)
            </h2>
            <p>
              SkolAce tidak mewajibkan pembuatan akun. Untuk mendukung pengalaman belajar yang mulus, kami menggunakan fitur <span className="font-mono text-xs bg-stone-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</span> pada peramban web (browser) perangkat Anda untuk menyimpan:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Status penyelesaian sub-bab materi belajar (progres kurikulum).</li>
              <li>Riwayat pengerjaan soal latihan (<span className="font-mono text-xs">seen count</span>) agar algoritma rotasi soal tidak mengulang soal yang sama secara terus-menerus.</li>
              <li>Preferensi tampilan tema (Mode Terang atau Mode Gelap).</li>
              <li>Preferensi ukuran teks (font scaling) pada halaman baca materi.</li>
            </ul>
            <p className="text-xs sm:text-sm">
              Data ini disimpan 100% secara lokal pada perangkat Anda dan tidak dikirimkan ke peladen (server) kami untuk profil personalisasi. Anda dapat menghapus data ini kapan saja melalui menu pengaturan peramban atau tombol reset riwayat soal di aplikasi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              2. Penggunaan Cookies dan Iklan Pihak Ketiga (Google AdSense)
            </h2>
            <p>
              Agar SkolAce dapat terus beroperasi dan menyediakan seluruh bank soal serta materi UTBK secara <strong>Rp0 Bebas Biaya</strong> bagi jutaan pelajar Indonesia, kami dapat menayangkan iklan dari vendor pihak ketiga, termasuk Google AdSense.
            </p>
            <div className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">
                Ketentuan Penggunaan Cookie oleh Google:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Vendor pihak ketiga, termasuk Google, menggunakan cookies untuk menayangkan iklan berdasarkan kunjungan sebelumnya dari pengguna ke situs web ini atau situs web lain.
                </li>
                <li>
                  Penggunaan cookie periklanan (seperti cookie DoubleClick) memungkinkan Google dan mitranya untuk menayangkan iklan kepada pengguna berdasarkan riwayat penjelajahan mereka di internet.
                </li>
                <li>
                  Pengguna dapat memilih untuk tidak menggunakan iklan hasil personalisasi (personalized advertising) dengan mengunjungi{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-cyan-400 underline inline-flex items-center gap-0.5 font-medium"
                  >
                    Setelan Iklan Google <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </li>
                <li>
                  Atau, Anda dapat menyisihkan penggunaan cookie vendor pihak ketiga untuk iklan berbasis minat dengan mengunjungi{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-cyan-400 underline inline-flex items-center gap-0.5 font-medium"
                  >
                    www.aboutads.info <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              3. Data Log & Analitik Web
            </h2>
            <p>
              Sama seperti situs web modern pada umumnya, peladen penyedia hosting kami (seperti Cloudflare) secara otomatis mencatat berkas log standar saat situs diakses. Informasi ini mencakup alamat protokol internet (IP address), jenis peramban, penyedia layanan internet (ISP), cap waktu kunjungan, dan halaman rujukan. Data log ini digunakan murni untuk keperluan diagnostik performa jaringan, keamanan ddos mitigation, dan kestabilan sistem global.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Perlindungan Privasi Anak di Bawah Umur
            </h2>
            <p>
              SkolAce adalah platform pendidikan yang ditujukan untuk siswa SMA/SMK/MA sederajat dan lulusan yang mempersiapkan diri menuju jenjang Perguruan Tinggi Negeri. Kami tidak secara sengaja mengumpulkan data identifikasi pribadi apa pun dari anak-anak di bawah usia 13 tahun.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Perubahan Kebijakan Privasi
            </h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu sesuai dengan perkembangan fitur platform atau perubahan regulasi periklanan internasional. Setiap perubahan akan segera dipublikasikan pada halaman ini dengan tanggal pembaruan yang disesuaikan.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
