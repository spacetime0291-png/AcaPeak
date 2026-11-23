import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  Zap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
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

  const renderMd = (text?: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={{
          p: ({ children }) => (
            <span className="inline leading-relaxed">{children}</span>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-blue-700 dark:text-cyan-300">
              {children}
            </strong>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-pink-600 dark:text-pink-400">
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
    <div className="min-h-screen text-slate-800 dark:text-[#f8fafc] bg-[#F8FAFC] dark:bg-[#070913] pb-12 transition-colors">
      {/* 1. TOP STATIS/STICKY BAR: Identitas Bab/Materi, Progress Real-Time, Ukuran Teks Fleksibel & Theme Switcher */}
      <header className="sticky top-0 z-50 w-full bg-[#F8FAFC]/95 dark:bg-[#0c1224]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-2xs">
        {!isDark && <NatureFocusHeaderAccent />}

        <div
          className={`mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all ${
            isFocusMode ? 'max-w-5xl' : 'max-w-4xl'
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

            {babId && babData ? (
              <>
                <span className="font-mono text-xs font-semibold tracking-wide px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 text-white shrink-0 uppercase">
                  {babData.kode_bab.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate hidden xs:inline max-w-[140px] sm:max-w-[240px]">
                  {babData.bab}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-xs font-semibold tracking-wide px-2 sm:px-2.5 py-1 rounded-md bg-amber-600 text-white shrink-0 uppercase">
                  CHEAT SHEET
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate hidden xs:inline max-w-[180px] sm:max-w-[280px]">
                  Rangkuman Cepat per Bab
                </span>
              </>
            )}
          </div>

          {/* Indikator Progres Real-Time & Kontrol Fleksibel */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Real-Time Progress Bar (hanya saat membaca Bab) */}
            {babId && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[32px] text-right">
                  {scrollProgress}%
                </span>
                <div
                  className="w-14 sm:w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={scrollProgress}
                >
                  <div
                    className="h-full bg-[#3B82F6] transition-all duration-300 ease-out rounded-full"
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
                className="px-1.5 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
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
                className="px-1.5 py-1 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 transition cursor-pointer"
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

      {/* 2. MAIN SCALABLE CONTENT CONTAINER */}
      <main
        className={`mx-auto px-3 sm:px-6 transition-all reader-scalable-content ${
          isFocusMode ? 'max-w-5xl py-4' : 'max-w-4xl py-6 sm:py-8'
        }`}
        style={
          {
            '--reader-font-scale': fontScale,
            fontSize: `calc(1rem * ${fontScale})`,
          } as React.CSSProperties
        }
      >
        {/* VIEW 1: INDEX OVERVIEW (Ketika tidak ada babId spesifik) */}
        {!babId && (
          <div className="space-y-6">
            {/* Header Hero */}
            <div className="text-center py-6 sm:py-10 px-4 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 mb-3">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Katalog Rangkuman Padat (Pass-5)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Lembar Rangkuman Cepat per Bab
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-2 font-medium">
                Cheat Sheet resmi UTBK-SNBT:{' '}
                <strong>1 Teori Singkat = 1 Contoh Nyata</strong>. Didesain untuk
                review kilat ~4 menit sebelum simulasi drilling atau ujian.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mt-5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari bab atau materi rangkuman..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
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
                        className="group p-4 rounded-2xl bg-white dark:bg-[#0c142c] border border-slate-200/90 dark:border-slate-800/90 hover:border-amber-400 dark:hover:border-amber-500/80 transition-all hover:shadow-md flex flex-col justify-between"
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
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                            {b.nama_bab}
                          </h3>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-amber-500" />
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

        {/* VIEW 2: BAB DETAIL CHEAT SHEET */}
        {babId && (
          <div className="space-y-6">
            {/* Quick Breadcrumb / Sub-Nav */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBackNavigation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#0c142c] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Silabus Subtes</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to="/rangkuman"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 hover:bg-amber-100 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Daftar Semua Bab</span>
                </Link>
              </div>
            </div>

            {isLoading || !babData ? (
              <div className="py-24 text-center bg-white dark:bg-[#0c1326] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto my-6">
                <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Menyiapkan Lembar Rangkuman & Rumus Cepat...
                </p>
              </div>
            ) : (
              <>
                {/* Bab Header Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0b1228] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-extrabold uppercase border ${getSubtestColor(
                        babData.kode_bab
                      )}`}
                    >
                      {babData.subtes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Cheat Sheet Padat (1 Teori = 1 Contoh)</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 ml-auto">
                      <Clock className="w-3 h-3" />
                      <span>
                        ~{babData.estimasi_menit_review || 4} menit review
                      </span>
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {babData.bab}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Mencakup{' '}
                    <strong>{babData.daftar_subbab.length} sub-bab materi</strong>
                    . Gunakan filter di bawah untuk fokus pada topik tertentu
                    atau pelajari seluruh rangkuman sekaligus.
                  </p>

                  {/* Sub-bab Quick Tabs / Pill Selector */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setActiveSubbabIndex(-1)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        activeSubbabIndex === -1
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Semua Sub-bab ({babData.daftar_subbab.length})
                    </button>
                    {babData.daftar_subbab.map((sub, idx) => (
                      <button
                        key={sub.kode_subbab}
                        type="button"
                        onClick={() => setActiveSubbabIndex(idx)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          activeSubbabIndex === idx
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}. {sub.judul_subbab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-bab Content Cards List */}
                <div className="space-y-6">
                  {displayedSubbabs.map((sub, sIdx) => {
                    const col1Label =
                      sub.label_kolom?.kolom_1 ||
                      (sub.mode_tampilan === 'katalog_rumus_sifat'
                        ? 'Rumus / Sifat & Syarat'
                        : sub.mode_tampilan === 'katalog_sinyal_pola'
                        ? 'Jenis Pola / Sinyal Teks'
                        : 'Aturan / Pembagian Teori');
                    const col2Label =
                      sub.label_kolom?.kolom_2 ||
                      (sub.mode_tampilan === 'katalog_rumus_sifat'
                        ? '1 Contoh Hitung Cepat'
                        : sub.mode_tampilan === 'katalog_sinyal_pola'
                        ? '1 Contoh Kata Kunci / Kalimat'
                        : '1 Contoh Penerapan');

                    const intiText =
                      sub.inti_subbab || sub.konsep_inti_markdown || '';

                    return (
                      <section
                        key={sub.kode_subbab}
                        className="rounded-3xl bg-white dark:bg-[#0c142c] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                      >
                        {/* Sub-bab Header Bar */}
                        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 font-mono font-black text-xs flex items-center justify-center shrink-0">
                              {sub.kode_subbab.split('-')[2] || `${sIdx + 1}`}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                                  {sub.kode_subbab}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                                  {sub.klasifikasi_materi || 'INTI'}
                                </span>
                              </div>
                              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                {sub.judul_subbab}
                              </h2>
                            </div>
                          </div>

                          <Link
                            to={`/materi/${sub.kode_subbab}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 hover:bg-blue-100 transition-colors shadow-2xs ml-auto"
                            title="Buka materi lengkap komprehensif untuk topik ini"
                          >
                            <span>Baca Materi Lengkap</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>

                        {/* Inti Sub-bab (TL;DR) Callout */}
                        {intiText && (
                          <div className="px-4 sm:px-6 pt-4 pb-3">
                            <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/90 dark:border-amber-800/50 flex items-start gap-3">
                              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                                <Lightbulb className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                <strong className="font-extrabold text-amber-800 dark:text-amber-300 mr-1">
                                  Inti Sub-bab (TL;DR):
                                </strong>
                                {renderMd(intiText)}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2-Column Table of Cheat Sheet Theories */}
                        <div className="px-4 sm:px-6 pb-6 pt-2">
                          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
                            {/* Table Column Headers */}
                            <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                              <div className="md:col-span-6 p-3 sm:px-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                                <span>{col1Label}</span>
                              </div>
                              <div className="md:col-span-6 p-3 sm:px-4 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                <span>{col2Label}</span>
                              </div>
                            </div>

                            {/* Groups and Rows */}
                            <div className="divide-y divide-slate-200/80 dark:divide-slate-800">
                              {sub.kelompok.map((k, kIdx) => (
                                <div
                                  key={kIdx}
                                  className="divide-y divide-slate-100 dark:divide-slate-800/50"
                                >
                                  {/* Group Header Row */}
                                  <div className="bg-slate-50/90 dark:bg-slate-800/40 px-3.5 sm:px-4 py-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                      {k.nama_kelompok}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400 ml-auto">
                                      {k.butir.length} butir
                                    </span>
                                  </div>

                                  {/* Item Rows */}
                                  {k.butir.map((b, bIdx) => {
                                    const judulText =
                                      b.judul || b.judul_poin || '';
                                    const teoriText =
                                      b.teori_singkat ||
                                      b.penjelasan_singkat ||
                                      '';
                                    const contohText =
                                      b.contoh || b.contoh_penerapan || '';

                                    return (
                                      <div
                                        key={bIdx}
                                        className="grid grid-cols-1 md:grid-cols-12 text-xs sm:text-[13px] hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors"
                                      >
                                        {/* Left Column: Teori Singkat */}
                                        <div className="md:col-span-6 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800 space-y-1">
                                          {judulText && (
                                            <h4 className="font-bold text-slate-900 dark:text-white leading-tight flex items-start gap-1.5">
                                              <span className="text-amber-600 dark:text-amber-400 shrink-0 font-mono">
                                                ›
                                              </span>
                                              <span>{judulText}</span>
                                            </h4>
                                          )}
                                          <div className="text-slate-600 dark:text-slate-300 pl-3 leading-relaxed">
                                            {renderMd(teoriText)}
                                          </div>
                                        </div>

                                        {/* Right Column: 1 Contoh Konkret */}
                                        <div className="md:col-span-6 p-3 sm:p-4 bg-amber-500/[0.02] dark:bg-cyan-500/[0.02] flex items-center">
                                          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {renderMd(contohText)}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>

                {/* Bottom Prev / Next Bab Navigation */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  {prevBab ? (
                    <Link
                      to={`/rangkuman/${prevBab.kode_bab}`}
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#0c142c] border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-xs"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">
                          Bab Sebelumnya
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
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
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#0c142c] border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-xs ml-auto"
                    >
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">
                          Bab Berikutnya
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                          {nextBab.nama_bab}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
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
