import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

interface PageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const ContactPage: React.FC<PageProps> = ({ theme = 'light', onToggleTheme = () => {} }) => {
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
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Mail className="w-4 h-4" />
              <span>Dukungan Pengguna & Komunitas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Kontak & Pusat Bantuan
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              Punya pertanyaan seputar kurikulum materi, menemukan kesalahan ketik (typo) rumus, atau ingin menyampaikan masukan pengembangan? Kami siap mendengarkan!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Surel Dukungan Resmi
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Untuk pertanyaan umum, kerja sama konten, atau pertanyaan teknis web:
              </p>
              <a
                href="mailto:support@skolace.my.id"
                className="inline-block font-mono text-sm font-semibold text-indigo-600 dark:text-cyan-400 hover:underline"
              >
                support@skolace.my.id
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Laporan Errata & Koreksi Soal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Menemukan ketidaksesuaian kunci jawaban atau formula KaTeX? Kirimkan kode sub-bab (misal: <span className="font-mono">pu-01-01</span>) beserta nomor soal ke:
              </p>
              <a
                href="mailto:errata@skolace.my.id"
                className="inline-block font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                errata@skolace.my.id
              </a>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/40 space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Apakah SkolAce benar-benar 100% gratis?
                </p>
                <p className="text-slate-600 dark:text-slate-400 pl-6">
                  Ya, seluruh 106 sub-bab materi taktis dan 300+ soal drilling dapat diakses gratis (Rp0) tanpa sistem berlangganan maupun paywall terkunci.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Apakah tipe soal sudah mengikuti sistem terbaru BPPP?
                </p>
                <p className="text-slate-600 dark:text-slate-400 pl-6">
                  Tentu. Bank soal mencakup Pilihan Ganda Tradisional (A-E), Pilihan Ganda Kompleks (PGK) format tabel benar/salah & multi-checkbox, serta format Isian Singkat.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Bagaimana cara mereset riwayat pengerjaan soal saya?
                </p>
                <p className="text-slate-600 dark:text-slate-400 pl-6">
                  Buka halaman detail subtes mana pun, pilih tab "Latihan Soal (Drilling)", lalu klik tombol "Reset Riwayat Soal" pada panel histori indikator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
