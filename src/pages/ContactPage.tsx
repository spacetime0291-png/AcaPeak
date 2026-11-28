import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Mail,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  Send,
  Copy,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import type { ThemeId } from '../lib/theme';

interface PageProps {
  theme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
}

const CONTACT_FORM_ENDPOINT =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_FORM_ENDPOINT?.trim()) || '';

export const ContactPage: React.FC<PageProps> = ({ theme = 'light', onSelectTheme = () => {} }) => {
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';
  const [topic, setTopic] = useState<'errata' | 'umum' | 'kemitraan'>('errata');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subbabCode, setSubbabCode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitFeedback, setSubmitFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  const recipient = topic === 'errata' ? 'errata@skolace.my.id' : 'support@skolace.my.id';
  const subjectPrefix =
    topic === 'errata'
      ? `[Errata ${subbabCode.trim() || 'Materi'}]`
      : topic === 'kemitraan'
      ? '[Kerja Sama SkolAce]'
      : '[Bantuan Pengguna]';
  const fullSubject = `${subjectPrefix} Laporan / Pertanyaan`;
  const formattedBody = `Tujuan: ${recipient}\nSubjek: ${fullSubject}\nNama: ${
    name.trim() || 'Pengguna SkolAce'
  }\nEmail Pengirim: ${email.trim() || '-'}\nTopik: ${topic}\nKode Sub-bab: ${
    subbabCode.trim() || '-'
  }\n\nPesan:\n${message.trim()}`;

  const mailtoHref = `mailto:${recipient}?subject=${encodeURIComponent(
    fullSubject
  )}&body=${encodeURIComponent(formattedBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      setSubmitStatus('error');
      setSubmitFeedback('Mohon isi detail pesan minimal 10 karakter agar tim kami dapat menindaklanjuti.');
      return;
    }

    if (!CONTACT_FORM_ENDPOINT) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitFeedback('');

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          topic,
          recipient,
          name: name.trim() || 'Pengguna SkolAce',
          email: email.trim() || undefined,
          subbab_code: subbabCode.trim() || undefined,
          subject: fullSubject,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setSubmitStatus('success');
      setSubmitFeedback('Laporan Anda berhasil dikirim ke tim editorial SkolAce. Terima kasih!');
      setMessage('');
      setSubbabCode('');
    } catch {
      setSubmitStatus('error');
      setSubmitFeedback(
        'Gagal mengirim langsung ke server saat ini. Silakan gunakan tombol Salin Pesan Laporan atau Buka Aplikasi Email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReport = async () => {
    if (!message.trim()) {
      setSubmitStatus('error');
      setSubmitFeedback('Tuliskan detail pesan terlebih dahulu sebelum menyalin laporan.');
      return;
    }
    try {
      await navigator.clipboard.writeText(formattedBody);
      setCopied(true);
      setSubmitStatus('idle');
      setSubmitFeedback('');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setSubmitStatus('error');
      setSubmitFeedback('Browser tidak mengizinkan salin otomatis. Silakan salin teks secara manual.');
    }
  };

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
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 velvet-surface prism-surface shadow-xs space-y-3">
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

            <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 velvet-surface prism-surface shadow-xs space-y-3">
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
            className="p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 velvet-surface prism-surface shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Kirim Pesan atau Laporan Cepat
              </h2>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Tujuan: {recipient}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  Email Balasan (Opsional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
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
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pertanyaan atau detail nomor soal yang perlu diperiksa (minimal 10 karakter)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {CONTACT_FORM_ENDPOINT && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyReport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Laporan Tersalin ✓' : 'Salin Pesan Laporan'}</span>
              </button>

              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Buka Aplikasi Email</span>
              </a>
            </div>

            {!CONTACT_FORM_ENDPOINT && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pengiriman formulir langsung ke server belum diaktifkan pada build ini. Gunakan tombol <strong>Salin Pesan Laporan</strong> atau <strong>Buka Aplikasi Email</strong> untuk mengirim ke <span className="font-mono">{recipient}</span>.
              </p>
            )}

            {submitStatus === 'success' && submitFeedback && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{submitFeedback}</span>
              </div>
            )}

            {submitStatus === 'error' && submitFeedback && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 px-3.5 py-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitFeedback}</span>
              </div>
            )}
          </form>

          {/* Quick FAQ */}
          <div className="p-8 rounded-3xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/40 velvet-surface prism-surface space-y-6">
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
                  Ya, seluruh 106 sub-bab materi taktis, 27 lembar rangkuman bab, dan 4.240+ soal drilling dapat diakses gratis (Rp0) tanpa sistem berlangganan maupun paywall terkunci.
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
