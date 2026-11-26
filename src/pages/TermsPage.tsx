import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import type { ThemeId } from '../lib/theme';

interface PageProps {
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
}

export const TermsPage: React.FC<PageProps> = ({ theme = 'light', onSelectTheme = () => {} }) => {
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isVelvet
          ? 'bg-transparent text-[#FBF1F2]'
          : isPrism
          ? 'bg-transparent text-[#0F172A]'
          : 'bg-[#fdfbf7] dark:bg-[#070913] text-slate-800 dark:text-[#f8fafc]'
      }`}
    >
      {/* Top Bar */}
      <header
        className={`sticky top-0 z-30 w-full backdrop-blur-md border-b py-3 px-4 sm:px-8 ${
          isVelvet
            ? 'bg-[#1B0F1D]/90 border-[#EB8A78]/25'
            : isPrism
            ? 'bg-white/70 border-white/85'
            : 'bg-[#fdfbf7]/90 dark:bg-[#070913]/90 border-stone-200/80 dark:border-slate-800'
        }`}
      >
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
            <ThemeToggle theme={theme} onSelectTheme={onSelectTheme} size="sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>Ketentuan Hukum & Lisensi Penggunaan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Syarat dan Ketentuan (Terms of Service)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Berlaku sejak: 20 November 2026
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan situs web <strong>SkolAce</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui salah satu poin dalam ketentuan ini, Anda dipersilakan untuk tidak melanjutkan penggunaan situs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              2. Lisensi Penggunaan untuk Tujuan Edukasi
            </h2>
            <p>
              SkolAce memberikan Anda lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengakses materi bacaan dan mengerjakan latihan soal murni untuk keperluan studi pribadi dan persiapan ujian mandiri.
            </p>
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-xs sm:text-sm text-rose-950 dark:text-rose-200 space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                Larangan Penggunaan:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Dilarang melakukan scraping, crawling otomatis berskala masif, atau penyalinan bank soal untuk dijual kembali.</li>
                <li>Dilarang memonetisasi atau mempublikasikan ulang materi 3 zona SkolAce ke dalam bentuk buku fisik, kursus berbayar, atau aplikasi komersial tanpa izin tertulis.</li>
                <li>Dilarang melakukan tindakan yang dapat mengganggu kestabilan infrastruktur, bypass keamanan, atau penyalahgunaan API.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Penafian Afiliasi Resmi (Independent Educational Platform)
            </h2>
            <p>
              SkolAce adalah platform edukasi independen yang dikembangkan oleh komunitas pegiat pendidikan. SkolAce <strong>tidak berafiliasi, tidak didukung secara resmi, dan bukan bagian dari</strong> Balai Pengelolaan Pengujian Pendidikan (BPPP), Seleksi Nasional Penerimaan Mahasiswa Baru (SNPMB), maupun Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek).
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Penyebutan nama subtes (seperti PU, PPU, PBM, PK, LBI, LBE, PM) dan acuan materi digunakan semata-mata untuk tujuan nominatif edukatif sesuai silabus umum publik yang berlaku.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Batasan Tanggung Jawab
            </h2>
            <p>
              Seluruh materi taktis, rumus cepat, dan pembahasan disusun dengan standar ketelitian tinggi oleh tim pengembang. Namun demikian, SkolAce tidak menjamin skor tertentu atau kepastian kelulusan pada PTN pilihan pengguna. Hasil ujian sebenarnya sepenuhnya bergantung pada usaha, persiapan, dan kondisi objektif masing-masing peserta.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
