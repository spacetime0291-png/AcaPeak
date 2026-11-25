import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Target, BookOpen, Zap, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

interface PageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const AboutPage: React.FC<PageProps> = ({ theme = 'light', onToggleTheme = () => {} }) => {
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
        <div className="space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-cyan-300 border border-indigo-200 dark:border-cyan-800/40 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Platform Terbuka & Bebas Biaya (Rp0)
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Tentang SkolAce
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Misi kami sederhana: Memberikan akses bimbingan persiapan UTBK-SNBT terlengkap dan berkualitas tinggi tanpa memungut biaya sepeser pun kepada seluruh siswa di pelosok Nusantara.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Kurikulum 3 Zona Taktis
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Materi tidak disajikan sebagai teks panjang yang membosankan, melainkan dipecah menjadi Zona 1 (Peta Taktis), Zona 2 (Bedah Variasi Pola), dan Zona 3 (Uji Pemahaman Instan).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Mesin Drilling Stratified
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Algoritma rotasi deterministik memastikan latihan soal mereplikasi proporsi resmi BPPP: Pilihan Ganda (PG), PG Kompleks (PGK), dan Isian Singkat dengan wave difficulty HOTS.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Akurasi Formula KaTeX
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Render matematika menggunakan standardisasi <span className="font-mono">\dfrac</span> display fraction dan strut protection, menjamin pecahan rumit tampil bersih tanpa tabrakan vertikal.
              </p>
            </div>
          </div>

          {/* 7 Subtests Coverage */}
          <div className="p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/40 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              Cakupan 7 Subtes Resmi UTBK-SNBT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Penalaran Umum (PU) - Induktif, Deduktif, Kuantitatif</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pengetahuan & Pemahaman Umum (PPU)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pemahaman Bacaan & Menulis (PBM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pengetahuan Kuantitatif (PK)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Literasi dalam Bahasa Indonesia (LBI)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Literasi dalam Bahasa Inggris (LBE)</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Penalaran Matematika (PM) - Geometri, Aljabar, Peluang, Statistika</span>
              </div>
            </div>
          </div>

          {/* Editorial & E-E-A-T Quality Standard */}
          <div className="p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-white/75 dark:bg-slate-900/50 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Standar Editorial &amp; Verifikasi Kurikulum
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Seluruh 106 sub-bab materi, 27 lembar rangkuman cepat, dan ratusan butir latihan HOTS disusun oleh <strong>Tim Penyusun Kurikulum SkolAce</strong> dengan mengacu pada kisi-kisi resmi SNPMB/BPPP serta prinsip keakuratan pedagogis:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Verifikasi Komputasi Kuantitatif:</strong> Seluruh soal berhitung pada Penalaran Umum (PU), Pengetahuan Kuantitatif (PK), dan Penalaran Matematika (PM) divalidasi secara numerik sebelum dipublikasikan.
              </li>
              <li>
                <strong>Pembaruan &amp; Koreksi Errata Terbuka:</strong> Setiap laporan koreksi dari pelajar ditinjau dan diperbarui langsung pada repositori materi publik melalui jalur pelaporan di halaman{' '}
                <Link to="/contact" className="text-indigo-600 dark:text-cyan-400 underline font-semibold">
                  Kontak &amp; Bantuan
                </Link>
                .
              </li>
              <li>
                <strong>Independen &amp; Bebas Paywall:</strong> Seluruh materi tetap dapat diakses tanpa registrasi akun maupun biaya langganan, didukung secara berkelanjutan oleh penayangan iklan yang mematuhi kebijakan privasi.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
