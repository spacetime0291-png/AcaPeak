import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, MessageSquare, HelpCircle, CheckCircle2, Send } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

interface PageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const ContactPage: React.FC<PageProps> = ({ theme = 'light', onToggleTheme = () => {} }) => {
  const [topic, setTopic] = useState<'errata' | 'umum' | 'kemitraan'>('errata');
  const [name, setName] = useState('');
  const [subbabCode, setSubbabCode] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const recipient = topic === 'errata' ? 'errata@skolace.my.id' : 'support@skolace.my.id';
    const subjectPrefix =
      topic === 'errata'
        ? `[Errata ${subbabCode.trim() || 'Materi'}]`
        : topic === 'kemitraan'
        ? '[Kerja Sama SkolAce]'
        : '[Bantuan Pengguna]';
    const bodyText = `Nama: ${name.trim() || 'Pengguna SkolAce'}\nTopik: ${topic}\nKode Sub-bab: ${subbabCode.trim() || '-'}\n\nPesan:\n${message.trim()}`;
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        `${subjectPrefix} Laporan / Pertanyaan`
      )}&body=${encodeURIComponent(bodyText)}`;
    }
  };

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
              <span>Dukungan Pengguna &amp; Komunitas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Kontak &amp; Pusat Bantuan
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              Punya pertanyaan seputar kurikulum materi, menemukan kesalahan ketik (typo) rumus, atau ingin menyampaikan masukan pengembangan? Tim editorial kami memproses laporan masuk dalam 1–3 hari kerja.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Surel Dukungan Resmi
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Untuk pertanyaan umum, kerja sama konten edukasi, atau kendala akses web:
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
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Laporan Errata &amp; Koreksi Soal
              </h2>
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

          {/* Interactive Contact / Errata Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xs space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Kirim Pesan atau Laporan Cepat
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as 'errata' | 'umum' | 'kemitraan')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                >
                  <option value="errata">Koreksi Soal / Errata</option>
                  <option value="umum">Pertanyaan Umum / Teknis</option>
                  <option value="kemitraan">Kerja Sama Edukasi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama (Opsional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Budi"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Sub-bab (Jika Errata)
                </label>
                <input
                  type="text"
                  value={subbabCode}
                  onChange={(e) => setSubbabCode(e.target.value)}
                  placeholder="Misal: pk-02-01"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detail Pesan
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pertanyaan atau detail nomor soal yang perlu diperiksa..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Kirim via Aplikasi Email</span>
              </button>
              {submitted && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Draft email siap dikirim ke tim SkolAce.
                </span>
              )}
            </div>
          </form>

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
                  Tentu. Bank soal mencakup Pilihan Ganda Tradisional (A-E), Pilihan Ganda Kompleks (PGK) format tabel benar/salah &amp; multi-checkbox, serta format Isian Singkat.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Bagaimana cara mereset riwayat pengerjaan soal saya?
                </p>
                <p className="text-slate-600 dark:text-slate-400 pl-6">
                  Buka halaman detail subtes mana pun, pilih tab &quot;Drilling Soal&quot;, lalu klik tombol &quot;Reset Riwayat Soal&quot; pada panel histori indikator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
