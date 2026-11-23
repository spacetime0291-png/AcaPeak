import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Search,
  Clock,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type {
  RangkumanBabData,
  RangkumanIndexData,
  RangkumanSubbab,
} from '../types/rangkuman';
import {
  fetchRangkumanByBabId,
  fetchRangkumanIndex,
} from '../lib/rangkumanLoader';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../components/decorations/NatureDecorations';

const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

interface RangkumanPageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const RangkumanPage: React.FC<RangkumanPageProps> = ({
  theme = 'light',
  onToggleTheme = () => {},
}) => {
  const { babId } = useParams<{ babId?: string }>();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [babData, setBabData] = useState<RangkumanBabData | null>(null);
  const [indexData, setIndexData] = useState<RangkumanIndexData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSubbabIndex, setActiveSubbabIndex] = useState<number>(-1); // -1 = Semua Sub-bab
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reader-matching states: Focus Mode & Font Scaling
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Flexible Font Size Scale: 0.85 to 1.4 (Default 1.0, synced with reader)
  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved =
        typeof window !== 'undefined'
          ? localStorage.getItem('skolace_reader_font_scale')
          : null;
      return saved ? Math.min(1.4, Math.max(0.85, parseFloat(saved))) : 1.0;
    } catch {
      return 1.0;
    }
  });

  const handleFontScaleChange = (newScale: number) => {
    const clamped = Math.min(1.4, Math.max(0.85, Number(newScale.toFixed(2))));
    setFontScale(clamped);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('skolace_reader_font_scale', clamped.toString());
      }
    } catch {}
  };

  // Real-time scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalHeight = doc.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const current = window.scrollY;
      const pct = Math.min(
        100,
        Math.max(0, Math.round((current / totalHeight) * 100))
      );
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [babId, babData, activeSubbabIndex]);

  // Load index data on mount
  useEffect(() => {
    fetchRangkumanIndex()
      .then((data) => setIndexData(data))
      .catch((err) => console.warn('Could not load rangkuman index:', err));
  }, []);

  // Load specific Bab data
  useEffect(() => {
    if (!babId) {
      setBabData(null);
      setIsLoading(false);
      if (typeof document !== 'undefined') {
        document.title = 'Rangkuman & Cheat Sheet UTBK-SNBT | SkolAce';
      }
      return;
    }

    setIsLoading(true);
    fetchRangkumanByBabId(babId)
      .then((data) => {
        setBabData(data);
        setActiveSubbabIndex(-1); // Reset filter to all
        if (typeof document !== 'undefined') {
          document.title = `Cheat Sheet ${data.bab} (${data.kode_bab.toUpperCase()}) | SkolAce`;
        }
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      })
      .catch((err) => {
        console.error('Failed to load rangkuman bab:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [babId]);

  // Derived list of all chapters for prev/next
  const allBabsList = useMemo(() => {
    if (!indexData) return [];
    return indexData.daftar_subtes.flatMap((st) =>
      st.daftar_bab.map((b) => ({
        ...b,
        subtes: st.subtes,
      }))
    );
  }, [indexData]);

  const currentBabIndex = useMemo(() => {
    if (!babId || !allBabsList.length) return -1;
    return allBabsList.findIndex(
      (b) => b.kode_bab.toLowerCase() === babId.toLowerCase()
    );
  }, [babId, allBabsList]);

  const prevBab = currentBabIndex > 0 ? allBabsList[currentBabIndex - 1] : null;
  const nextBab =
    currentBabIndex !== -1 && currentBabIndex < allBabsList.length - 1
      ? allBabsList[currentBabIndex + 1]
      : null;

  // Format Math & Markdown
  const formatMath = (content?: string) => {
    if (!content) return '';
    return content.replace(/\\frac(?=[{\s])/g, '\\dfrac');
  };

  // Normalisasi tampilan nama kelompok bila ada awalan angka tidak konsisten (misal "1. ...")
  const normalizeGroupTitle = (title: string): string => {
    if (!title) return '';
    return title.replace(/^(\d+[\.\)]\s*)+/, '').trim();
  };

  // Renderer untuk judul poin (inline element, KaTeX enabled)
  const renderMarkdownInline = (text?: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={{
          p: ({ children }) => <span className="inline">{children}</span>,
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic font-medium text-slate-700 dark:text-sky-300">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
              {children}
            </code>
          ),
        }}
      >
        {formatMath(text)}
      </ReactMarkdown>
    );
  };

  // Renderer untuk penjelasan_singkat & contoh_penerapan
  const renderMarkdownText = (text?: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={{
          p: ({ children }) => (
            <p className="m-0 leading-[1.72]">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic font-medium text-slate-700 dark:text-sky-300">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
              {children}
            </code>
          ),
        }}
      >
        {formatMath(text)}
      </ReactMarkdown>
    );
  };

  // Renderer untuk konsep_inti_markdown dengan spacing paragraf & list 10-12px (space-y-2.5)
  const renderKonsepInti = (text?: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={{
          p: ({ children }) => (
            <p className="m-0 leading-[1.72]">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="m-0 pl-5 list-disc list-outside space-y-2.5 marker:text-blue-500/80 dark:marker:text-blue-400/80">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="m-0 pl-5 list-decimal list-outside space-y-2.5 marker:text-blue-500/80 dark:marker:text-blue-400/80">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.72] pl-1 break-words overflow-x-auto">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic font-medium text-slate-700 dark:text-sky-300">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
              {children}
            </code>
          ),
        }}
      >
        {formatMath(text)}
      </ReactMarkdown>
    );
  };

  // Color badges based on Subtes
  const getSubtestColor = (kode: string) => {
    const k = kode.toLowerCase();
    if (k.startsWith('pu'))
      return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';
    if (k.startsWith('pk'))
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
    if (k.startsWith('pm'))
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    if (k.startsWith('ppu'))
      return 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30';
    if (k.startsWith('pbm'))
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30';
    if (k.startsWith('lbi'))
      return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30';
    if (k.startsWith('lbe'))
      return 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30';
    return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30';
  };

  // Subtest Acronym
  const extractSubtestCode = (subtesName?: string) => {
    if (!subtesName) return 'pu';
    const match = subtesName.match(/\(([^)]+)\)/);
    return (match ? match[1] : subtesName.split(':')[0]).toLowerCase().trim();
  };

  // Filtered sub-babs
  const displayedSubbabs: RangkumanSubbab[] = useMemo(() => {
    if (!babData) return [];
    if (activeSubbabIndex === -1) return babData.daftar_subbab;
    return [babData.daftar_subbab[activeSubbabIndex]].filter(Boolean);
  }, [babData, activeSubbabIndex]);

  // Index Search filter
  const filteredIndexSubtes = useMemo(() => {
    if (!indexData) return [];
    if (!searchQuery.trim()) return indexData.daftar_subtes;
    const query = searchQuery.toLowerCase();
    return indexData.daftar_subtes
      .map((st) => ({
        ...st,
        daftar_bab: st.daftar_bab.filter(
          (b) =>
            b.nama_bab.toLowerCase().includes(query) ||
            b.kode_bab.toLowerCase().includes(query) ||
            st.subtes.toLowerCase().includes(query) ||
            b.daftar_subbab.some((sb) =>
              sb.judul_subbab.toLowerCase().includes(query)
            )
        ),
      }))
      .filter((st) => st.daftar_bab.length > 0);
  }, [indexData, searchQuery]);

  const handleBackNavigation = () => {
    if (babData) {
      const subCode = extractSubtestCode(babData.subtes);
      navigate(`/subtest/${subCode}`);
    } else {
      navigate('/subtest/pu');
    }
  };

  return (
    <div className="min-h-screen text-[#1E293B] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#070913] pb-16 transition-colors">
      {/* Scoped CSS Rules for Rangkuman Page reading area: typography, measure, line-height & KaTeX */}
      <style>{`
        .rangkuman-reading-area {
          font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          font-feature-settings: "cv02", "cv03", "cv04", "cv11";
        }
        .rangkuman-reading-area .font-mono,
        .rangkuman-reading-area code {
          font-family: 'JetBrains Mono', monospace;
        }
        .rangkuman-subbab-title {
          font-size: calc(22px * var(--reader-font-scale, 1));
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.3 !important;
        }
        @media (min-width: 640px) {
          .rangkuman-subbab-title {
            font-size: calc(26px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-kelompok-title {
          font-size: calc(15px * var(--reader-font-scale, 1));
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.4 !important;
        }
        @media (min-width: 640px) {
          .rangkuman-kelompok-title {
            font-size: calc(16px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-poin-title {
          font-size: calc(15.5px * var(--reader-font-scale, 1));
          font-weight: 600;
          line-height: 1.45 !important;
        }
        @media (min-width: 640px) {
          .rangkuman-poin-title {
            font-size: calc(16.5px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-body-text {
          font-size: calc(15.5px * var(--reader-font-scale, 1));
          line-height: 1.72 !important;
        }
        @media (min-width: 640px) {
          .rangkuman-body-text {
            font-size: calc(16.5px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-reading-area .katex {
          font-size: 1.02em !important;
          line-height: 1.3 !important;
        }
        .rangkuman-reading-area p:has(.katex),
        .rangkuman-reading-area li:has(.katex),
        .rangkuman-reading-area div:has(.katex),
        .rangkuman-reading-area span:has(.katex),
        .rangkuman-reading-area h4:has(.katex) {
          line-height: inherit !important;
        }
        .rangkuman-reading-area strong {
          font-weight: 600 !important;
        }
        .rangkuman-reading-area .katex-display {
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          margin: 0.5rem 0;
          padding: 0.25rem 0;
        }
      `}</style>

      {/* 1. TOP STATIS/STICKY BAR: Identitas Bab/Materi, Progress Real-Time, Ukuran Teks Fleksibel & Theme Switcher */}
      <header className="sticky top-0 z-50 w-full bg-[#F8FAFC]/95 dark:bg-[#070913]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 transition-all shadow-2xs">
        {!isDark && <NatureFocusHeaderAccent />}

        <div
          className={`mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all ${
            babId ? 'max-w-[700px]' : isFocusMode ? 'max-w-5xl' : 'max-w-4xl'
          }`}
        >
          {/* Identitas Bab & Tombol Kembali */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              title={
                babId
                  ? 'Kembali ke Silabus Subtes'
                  : 'Kembali ke Dashboard Silabus'
              }
              aria-label="Kembali"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {babId ? (
              <>
                <span className="font-mono text-xs font-semibold tracking-wide px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 dark:bg-slate-700 text-white shrink-0 uppercase">
                  {babData ? babData.kode_bab.toUpperCase() : babId.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate inline max-w-[120px] sm:max-w-[240px]">
                  {babData ? babData.bab : 'Cheat Sheet'}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-xs font-semibold tracking-wide px-2 sm:px-2.5 py-1 rounded-md bg-blue-600 text-white shrink-0 uppercase">
                  CHEAT SHEET
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate inline max-w-[150px] sm:max-w-[280px]">
                  Rangkuman Cepat per Bab
                </span>
              </>
            )}
          </div>

          {/* Indikator Progres Real-Time & Kontrol Fleksibel */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Real-Time Progress Bar (hanya saat membaca Bab) */}
            {babId && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[28px] sm:min-w-[32px] text-right">
                  {scrollProgress}%
                </span>
                <div
                  className="w-10 sm:w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={scrollProgress}
                >
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Pengatur Ukuran Font Fleksibel (A- / % / A+) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale - 0.1)}
                disabled={fontScale <= 0.85}
                className="px-1 sm:px-1.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perkecil Ukuran Teks (A-)"
                aria-label="Perkecil Ukuran Teks"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(1.0)}
                className="px-1 sm:px-1.5 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                title="Reset Ukuran Normal (100%)"
                aria-label="Reset Ukuran Normal"
              >
                {Math.round(fontScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => handleFontScaleChange(fontScale + 0.1)}
                disabled={fontScale >= 1.4}
                className="px-1 sm:px-1.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
                title="Perbesar Ukuran Teks (A+)"
                aria-label="Perbesar Ukuran Teks"
              >
                A+
              </button>
            </div>

            {/* Mode Fokus Toggle (saat membaca Bab) */}
            {babId && (
              <button
                type="button"
                onClick={() => setIsFocusMode(!isFocusMode)}
                className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Beralih Mode Fokus"
              >
                {isFocusMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Biasa</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Fokus</span>
                  </>
                )}
              </button>
            )}

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT CONTAINER (Lebar Kolom Optimal max-w-[700px] saat membaca Bab) */}
      <main
        className={`mx-auto px-4 sm:px-6 transition-all reader-scalable-content rangkuman-reading-area ${
          babId
            ? isFocusMode
              ? 'max-w-[700px] py-4'
              : 'max-w-[700px] py-6 sm:py-8'
            : isFocusMode
            ? 'max-w-5xl py-4'
            : 'max-w-4xl py-6 sm:py-8'
        }`}
        style={
          {
            '--reader-font-scale': fontScale,
          } as React.CSSProperties
        }
      >
        {/* VIEW 1: INDEX OVERVIEW (Ketika tidak ada babId spesifik) */}
        {!babId && (
          <div className="space-y-6">
            {/* Header Hero */}
            <div className="text-center py-6 sm:py-10 px-4 rounded-3xl bg-gradient-to-b from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 mb-3">
                <Zap className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                <span>Katalog Rangkuman Padat (Pass-5)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Lembar Rangkuman Cepat per Bab
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-2 font-medium">
                Cheat Sheet resmi UTBK-SNBT:{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  1 Teori Singkat = 1 Contoh Nyata
                </strong>
                . Didesain untuk review kilat ~4 menit sebelum simulasi drilling atau ujian.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mt-5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari bab atau materi rangkuman..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
              </div>
            </div>

            {/* List Grouped by Subtes */}
            <div className="space-y-8">
              {filteredIndexSubtes.map((st, stIdx) => (
                <div key={stIdx} className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide">
                      {st.subtes}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                      {st.daftar_bab.length} Bab
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {st.daftar_bab.map((b) => (
                      <Link
                        key={b.kode_bab}
                        to={`/rangkuman/${b.kode_bab}`}
                        className="group p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-[rgba(148,163,184,0.14)] hover:border-blue-400 dark:hover:border-blue-500/80 transition-all hover:shadow-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getSubtestColor(
                                b.kode_bab
                              )}`}
                            >
                              {b.kode_bab}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                              {b.jumlah_subbab} Sub-bab
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {b.nama_bab}
                          </h3>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-blue-500" />
                            Buka Cheat Sheet
                          </span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: BAB DETAIL CHEAT SHEET (Optimal Measure max-w-[700px]) */}
        {babId && (
          <div className="space-y-6">
            {isLoading || !babData ? (
              <div className="py-24 text-center bg-white dark:bg-[#111827] rounded-3xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.14)] shadow-xs max-w-2xl mx-auto my-6">
                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Menyiapkan Lembar Rangkuman & Rumus Cepat...
                </p>
              </div>
            ) : (
              <>
                {/* Bab Header Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.14)] shadow-2xs space-y-3.5 transition-colors">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase border ${getSubtestColor(
                        babData.kode_bab
                      )}`}
                    >
                      {babData.subtes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                      <Zap className="w-3 h-3 fill-blue-500 text-blue-500" />
                      <span>Cheat Sheet Padat (1 Teori = 1 Contoh)</span>
                    </span>

                    <Link
                      to="/rangkuman"
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15 hover:text-blue-600 transition-colors ml-auto shadow-2xs"
                      title="Lihat katalog semua bab cheat sheet"
                    >
                      <Layers className="w-3 h-3" />
                      <span>Katalog Bab</span>
                    </Link>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>
                        ~{babData.estimasi_menit_review || 4} mnt review
                      </span>
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1E293B] dark:text-[#F8FAFC] tracking-tight leading-tight">
                    {babData.bab}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    Mencakup{' '}
                    <strong className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      {babData.daftar_subbab.length} sub-bab materi
                    </strong>
                    . Gunakan filter di bawah untuk fokus pada topik tertentu atau pelajari seluruh rangkuman sekaligus.
                  </p>

                  {/* Sub-bab Quick Tabs / Pill Selector */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setActiveSubbabIndex(-1)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        activeSubbabIndex === -1
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Semua Sub-bab ({babData.daftar_subbab.length})
                    </button>
                    {babData.daftar_subbab.map((sub, idx) => (
                      <button
                        key={sub.kode_subbab}
                        type="button"
                        onClick={() => setActiveSubbabIndex(idx)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                          activeSubbabIndex === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}. {sub.judul_subbab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-bab Content Reading Area */}
                <div className="mt-8">
                  {displayedSubbabs.map((sub, sIdx) => {
                    const intiText =
                      sub.konsep_inti_markdown || sub.inti_subbab || '';

                    return (
                      <React.Fragment key={sub.kode_subbab}>
                        {/* Jarak antar sub-bab: 48px (my-12) disertai pemisah tipis (divider) */}
                        {sIdx > 0 && (
                          <div
                            className="my-12 h-px bg-slate-200 dark:bg-slate-800/80 w-full"
                            role="separator"
                          />
                        )}

                        <article
                          id={`subbab-${sub.kode_subbab}`}
                          className="space-y-6"
                        >
                          {/* 1. Header Sub-bab Ringkas: kode_subbab (monospace) + klasifikasi_materi sejajar judul_subbab */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                            <div className="space-y-1.5 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                                  {sub.kode_subbab}
                                </span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                  {sub.klasifikasi_materi || 'INTI'}
                                </span>
                              </div>
                              <h2 className="rangkuman-subbab-title text-[#1E293B] dark:text-[#E2E8F0] tracking-tight">
                                {sub.judul_subbab}
                              </h2>
                            </div>

                            <Link
                              to={`/materi/${sub.kode_subbab}`}
                              className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/80 dark:border-blue-800/60 transition-colors shadow-2xs shrink-0"
                              title="Buka materi lengkap komprehensif untuk topik ini"
                            >
                              <span>Materi Lengkap</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          {/* 2. Blok konsep_inti_markdown (Ringkasan Pembuka Sub-bab: kutipan bersih dengan aksen garis kiri biru) */}
                          {intiText && (
                            <div className="rounded-xl border-l-[3px] border-blue-500/80 bg-blue-50/60 dark:bg-blue-500/[0.06] p-4 sm:p-5 text-[#1E293B] dark:text-[#E2E8F0] rangkuman-body-text shadow-2xs transition-colors">
                              <div className="space-y-2.5 overflow-x-auto max-w-full">
                                {renderKonsepInti(intiText)}
                              </div>
                            </div>
                          )}

                          {/* 3. Blok kelompok[] & butir[]: Format Editorial Scannable bertumpuk */}
                          {/* Jarak antar kelompok: 28px (space-y-7) */}
                          <div className="space-y-7">
                            {sub.kelompok.map((k, kIdx) => (
                              <div key={kIdx} className="space-y-3.5">
                                {/* Sub-header Kelompok Bersih dengan garis bawah halus + pill jumlah butir */}
                                <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 dark:bg-blue-400/80 shrink-0" />
                                    <h3 className="rangkuman-kelompok-title text-[#1E293B] dark:text-[#E2E8F0] tracking-wide truncate">
                                      {normalizeGroupTitle(k.nama_kelompok)}
                                    </h3>
                                  </div>
                                  <span className="font-mono text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md shrink-0">
                                    {k.butir.length} butir
                                  </span>
                                </div>

                                {/* Daftar Butir: Jarak antar butir: 16px (space-y-4) */}
                                <div className="space-y-4">
                                  {k.butir.map((b, bIdx) => {
                                    const judulText =
                                      b.judul_poin || b.judul || '';
                                    const teoriText =
                                      b.penjelasan_singkat ||
                                      b.teori_singkat ||
                                      '';
                                    const contohText =
                                      b.contoh_penerapan || b.contoh || '';

                                    return (
                                      <div
                                        key={bIdx}
                                        className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.14)] shadow-2xs transition-colors"
                                      >
                                        {/* Baris 1: judul_poin dengan nomor urut kecil monospace (01, 02, dst.) */}
                                        <div className="flex items-baseline gap-2.5">
                                          <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 select-none">
                                            {String(bIdx + 1).padStart(2, '0')}
                                          </span>
                                          <h4 className="rangkuman-poin-title text-[#0F172A] dark:text-[#F8FAFC] flex-1 break-words">
                                            {renderMarkdownInline(judulText)}
                                          </h4>
                                        </div>

                                        {/* Baris 2: penjelasan_singkat (Teks teori inti yang ringkas dan lega mt-1.5) */}
                                        {teoriText && (
                                          <div className="mt-1.5 rangkuman-body-text text-[#475569] dark:text-[#94A3B8] break-words">
                                            {renderMarkdownText(teoriText)}
                                          </div>
                                        )}

                                        {/* Baris 3: contoh_penerapan (Blok inset terpisah berlatar lembut & border-l-2 emerald + label mikro uppercase CONTOH) */}
                                        {contohText && (
                                          <div className="mt-3 rounded-lg px-3.5 py-2.5 border-l-2 border-emerald-500/70 bg-emerald-50/50 dark:bg-emerald-500/[0.05] transition-colors">
                                            <div className="flex items-center gap-1.5 mb-1 select-none">
                                              <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400/90 uppercase">
                                                CONTOH
                                              </span>
                                            </div>
                                            <div className="rangkuman-body-text text-[#1E293B] dark:text-[#E2E8F0] break-words">
                                              {renderMarkdownText(contohText)}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </article>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Bottom Prev / Next Bab Navigation */}
                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  {prevBab ? (
                    <Link
                      to={`/rangkuman/${prevBab.kode_bab}`}
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.14)] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-2xs max-w-[48%]"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                      <div className="text-left min-w-0">
                        <span className="font-mono text-[10px] text-slate-400 uppercase block">
                          Bab Sebelumnya
                        </span>
                        <span className="text-xs font-semibold text-[#1E293B] dark:text-[#E2E8F0] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                          {prevBab.nama_bab}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextBab ? (
                    <Link
                      to={`/rangkuman/${nextBab.kode_bab}`}
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.14)] hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-2xs ml-auto max-w-[48%]"
                    >
                      <div className="text-right min-w-0">
                        <span className="font-mono text-[10px] text-slate-400 uppercase block">
                          Bab Berikutnya
                        </span>
                        <span className="text-xs font-semibold text-[#1E293B] dark:text-[#E2E8F0] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                          {nextBab.nama_bab}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default RangkumanPage;