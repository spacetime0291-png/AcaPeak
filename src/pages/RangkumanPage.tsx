import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Clock,
  Printer,
  Eye,
  EyeOff,
  ArrowLeft,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import type {
  RangkumanBabData,
  RangkumanIndexData,
} from '../types/rangkuman';
import {
  fetchRangkumanByBabId,
  fetchRangkumanIndex,
} from '../lib/rangkumanLoader';

// Strict KaTeX configuration: output: 'html' to guarantee 0 <math> tags
const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

interface RangkumanPageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  initialBabData?: RangkumanBabData | null;
  initialIndexData?: RangkumanIndexData | null;
}

export const RangkumanPage: React.FC<RangkumanPageProps> = ({
  initialBabData = null,
  initialIndexData = null,
}) => {
  const { babId } = useParams<{ babId?: string }>();
  const location = useLocation();

  // Pick initial data from prop or client-side SSR payload
  const [indexData, setIndexData] = useState<RangkumanIndexData | null>(() => {
    if (initialIndexData && initialIndexData.daftar_subtes?.length) {
      return initialIndexData;
    }
    return null;
  });

  const [babData, setBabData] = useState<RangkumanBabData | null>(() => {
    if (initialBabData && initialBabData.kode_bab.toLowerCase() === babId?.toLowerCase()) {
      return initialBabData;
    }
    if (typeof window !== 'undefined') {
      const wData = (window as any).__INITIAL_DATA__;
      if (wData && wData.kode_bab?.toLowerCase() === babId?.toLowerCase()) {
        return wData;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (!babId) return false;
    return !babData;
  });

  // Hub page states
  const [selectedSubtestTab, setSelectedSubtestTab] = useState<string>('Semua');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Bab page states
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [activeRecallMode, setActiveRecallMode] = useState<boolean>(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSubbabId, setActiveSubbabId] = useState<string>('');

  // Unblurred state for active recall on-click
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  // 1. Reading progress bar tracker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setScrollProgress(100);
        return;
      }
      const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [babId, babData]);

  // 2. Load Index data on mount
  useEffect(() => {
    if (!indexData) {
      fetchRangkumanIndex()
        .then((data) => setIndexData(data))
        .catch((err) => console.warn('Could not load rangkuman index:', err));
    }
  }, [indexData]);

  // 3. Load specific Bab data when babId changes
  useEffect(() => {
    if (!babId) {
      setBabData(null);
      setIsLoading(false);
      if (typeof document !== 'undefined') {
        document.title = 'Rangkuman Cepat UTBK-SNBT (1 Teori = 1 Contoh) | SkolAce';
      }
      return;
    }

    // Check if current state already matches
    if (babData && babData.kode_bab.toLowerCase() === babId.toLowerCase()) {
      if (typeof document !== 'undefined') {
        document.title = `Cheat Sheet ${babData.bab} (${babData.kode_bab.toUpperCase()}) | SkolAce UTBK`;
      }
      return;
    }

    setIsLoading(true);
    fetchRangkumanByBabId(babId)
      .then((data) => {
        setBabData(data);
        if (typeof document !== 'undefined') {
          document.title = `Cheat Sheet ${data.bab} (${data.kode_bab.toUpperCase()}) | SkolAce UTBK`;
        }
      })
      .catch((err) => {
        console.error('Failed to load rangkuman bab:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [babId, babData]);

  // 4. Handle smooth anchor scroll on hash change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = location.hash.replace('#', '');
    if (hash && babData) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location.hash, babData]);

  // 5. Scroll-Spy with IntersectionObserver for Active Sub-bab in TOC
  useEffect(() => {
    if (typeof window === 'undefined' || !babData?.daftar_subbab) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSubbabId(entry.target.id);
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    for (const sub of babData.daftar_subbab) {
      const el = document.getElementById(sub.kode_subbab);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [babData]);

  // 6. Navigation list of all Babs for Prev/Next
  const allBabsList = useMemo(() => {
    if (!indexData) return [];
    return indexData.daftar_subtes.flatMap((st) =>
      st.daftar_bab.map((b) => ({
        ...b,
        subtes: st.subtes,
        subtes_id: st.subtes_id,
      }))
    );
  }, [indexData]);

  const currentBabIndex = useMemo(() => {
    if (!babId || !allBabsList.length) return -1;
    return allBabsList.findIndex((b) => b.kode_bab.toLowerCase() === babId.toLowerCase());
  }, [babId, allBabsList]);

  const prevBab = currentBabIndex > 0 ? allBabsList[currentBabIndex - 1] : null;
  const nextBab = currentBabIndex !== -1 && currentBabIndex < allBabsList.length - 1 ? allBabsList[currentBabIndex + 1] : null;

  // Format Math helper: auto convert \frac to \dfrac for legible vertical fractions
  const formatMath = (content?: string) => {
    if (!content) return '';
    return content.replace(/\\frac(?=[{\s])/g, '\\dfrac');
  };

  // 7. Markdown Renderers
  // Standard Markdown Parser with KaTeX HTML output
  const renderMarkdownText = (text?: string, isExample: boolean = false) => {
    if (!text) return null;
    return (
      <div className="min-w-0 break-words leading-[1.65]">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={KATEX_REHYPE_PLUGINS}
          components={{
            p: ({ children }) => <span className="inline leading-[1.65]">{children}</span>,
            strong: ({ children }) => (
              <strong
                className={
                  isExample
                    ? 'font-semibold text-[#F8FAFC] bg-emerald-500/15 text-emerald-200 px-1 py-0.5 rounded shadow-2xs'
                    : 'font-semibold text-[#F8FAFC]'
                }
              >
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="italic font-medium text-[#93C5FD]">
                {children}
              </em>
            ),
            code: ({ children }) => (
              <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-700">
                {children}
              </code>
            ),
          }}
        >
          {formatMath(text)}
        </ReactMarkdown>
      </div>
    );
  };

  const renderInlineMarkdown = (text?: string) => {
    if (!text) return null;
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={KATEX_REHYPE_PLUGINS}
        components={{
          p: ({ children }) => <span className="inline">{children}</span>,
          strong: ({ children }) => <strong className="font-semibold text-[#F8FAFC]">{children}</strong>,
          em: ({ children }) => <em className="italic font-medium text-[#93C5FD]">{children}</em>,
          code: ({ children }) => (
            <code className="font-mono text-xs px-1 py-0.5 rounded bg-slate-900 text-sky-300">
              {children}
            </code>
          ),
        }}
      >
        {formatMath(text)}
      </ReactMarkdown>
    );
  };

  // Toggle group collapse
  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Collapse / Expand all groups
  const toggleAllGroups = (expand: boolean) => {
    if (!babData) return;
    const next: Record<string, boolean> = {};
    for (const sub of babData.daftar_subbab) {
      for (let i = 0; i < sub.kelompok.length; i++) {
        const id = `${sub.kode_subbab}-${i}`;
        next[id] = !expand;
      }
    }
    setCollapsedGroups(next);
  };

  // Subtest styling badges
  const getSubtestColor = (code: string) => {
    const c = code.toUpperCase();
    switch (c) {
      case 'PU':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40';
      case 'PPU':
        return 'bg-sky-950/60 text-sky-300 border-sky-500/40';
      case 'PBM':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'PK':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      case 'LBI':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/40';
      case 'LBE':
        return 'bg-teal-950/60 text-teal-300 border-teal-500/40';
      case 'PM':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Mode badge styling
  const getModeBadge = (mode?: string) => {
    if (!mode) return null;
    switch (mode) {
      case 'katalog_rumus_sifat':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-950/40 text-sky-300 border border-sky-500/30">
            Rumus & Sifat
          </span>
        );
      case 'katalog_kaidah':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
            Kaidah & Syarat
          </span>
        );
      case 'katalog_sinyal_pola':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-950/40 text-amber-300 border border-amber-500/30">
            Sinyal & Pola
          </span>
        );
      default:
        return null;
    }
  };

  // Filtered Chapters for Hub View
  const filteredHubChapters = useMemo(() => {
    if (!indexData) return [];
    let groups = indexData.daftar_subtes;

    // Filter by Subtest Tab
    if (selectedSubtestTab !== 'Semua') {
      groups = groups.filter((g) => g.subtes_id === selectedSubtestTab);
    }

    // Filter by Global Search query
    const q = globalSearch.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((g) => ({
        ...g,
        daftar_bab: g.daftar_bab.filter(
          (b) =>
            b.kode_bab.toLowerCase().includes(q) ||
            b.bab.toLowerCase().includes(q) ||
            b.subbab.some((sb) => sb.judul_subbab.toLowerCase().includes(q))
        ),
      }))
      .filter((g) => g.daftar_bab.length > 0);
  }, [indexData, selectedSubtestTab, globalSearch]);

  // Filtered Subchapters and Items for Chapter View
  const filteredSubbabs = useMemo(() => {
    if (!babData) return [];
    const q = chapterSearch.trim().toLowerCase();
    if (!q) return babData.daftar_subbab;

    return babData.daftar_subbab
      .map((sub) => {
        const matchesSubTitle = sub.judul_subbab.toLowerCase().includes(q) || sub.inti_subbab.toLowerCase().includes(q);
        const filteredKelompok = sub.kelompok
          .map((kel) => {
            const matchesKelName = kel.nama_kelompok.toLowerCase().includes(q);
            const matchingButir = kel.butir.filter(
              (b) =>
                matchesKelName ||
                matchesSubTitle ||
                b.judul.toLowerCase().includes(q) ||
                b.teori_singkat.toLowerCase().includes(q) ||
                b.contoh.toLowerCase().includes(q)
            );
            return {
              ...kel,
              butir: matchingButir,
            };
          })
          .filter((k) => k.butir.length > 0);

        return {
          ...sub,
          kelompok: filteredKelompok,
        };
      })
      .filter((sub) => sub.kelompok.length > 0);
  }, [babData, chapterSearch]);

  // Total theory points in current chapter
  const totalChapterPoints = useMemo(() => {
    if (!babData) return 0;
    return babData.daftar_subbab.reduce(
      (acc, sb) => acc + sb.kelompok.reduce((kAcc, k) => kAcc + k.butir.length, 0),
      0
    );
  }, [babData]);

  // =========================================================================
  // VIEW A: HALAMAN HUB RANGKUMAN (/rangkuman)
  // =========================================================================
  if (!babId) {
    return (
      <div className="min-h-screen text-slate-100 bg-[#0B1120] font-sans selection:bg-sky-500 selection:text-white pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
          {/* Header Ringkas Hub */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-sky-950/60 text-sky-400 border border-sky-500/30 mb-3 shadow-2xs">
              <Zap className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
              Rapid Review • Cheat Sheet UTBK-SNBT
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] leading-[1.2]">
              Rangkuman Cepat UTBK-SNBT
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2.5 font-medium leading-[1.6]">
              1 Teori = 1 Contoh Padat • 7 Subtes • 106 Sub-bab • Cepat Dipindai Anti-Lelah Mata
            </p>

            {/* Pencarian Global Rangkuman */}
            <div className="relative mt-6 max-w-lg mx-auto">
              <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Cari nama bab, rumus, atau judul sub-bab..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-[#111827] text-slate-100 placeholder-slate-400 border border-slate-700/80 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition"
              />
              {globalSearch && (
                <button
                  type="button"
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tab Horizontal 7 Subtes */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar justify-start sm:justify-center">
            {['Semua', 'PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBE', 'PM'].map((tab) => {
              const isActive = selectedSubtestTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedSubtestTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-[#111827] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {tab === 'Semua' ? 'Semua Subtes' : tab}
                </button>
              );
            })}
          </div>

          {/* Grid Kartu Bab Responsif */}
          {filteredHubChapters.length === 0 ? (
            <div className="text-center py-16 bg-[#111827] rounded-2xl border border-slate-800 max-w-md mx-auto">
              <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-semibold text-slate-200">Tidak ada bab yang sesuai</p>
              <p className="text-xs text-slate-400 mt-1">Coba kata kunci lain atau pilih tab Semua Subtes.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredHubChapters.map((group) => (
                <section key={group.subtes_id} className="space-y-4">
                  {/* Group Header */}
                  <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getSubtestColor(
                        group.subtes_id
                      )}`}
                    >
                      {group.subtes_id}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">{group.subtes}</h2>
                    <span className="text-xs font-semibold text-slate-400 ml-auto">
                      {group.daftar_bab.length} Bab
                    </span>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.daftar_bab.map((b) => (
                      <Link
                        key={b.kode_bab}
                        to={`/rangkuman/${b.kode_bab.toLowerCase()}`}
                        className="group flex flex-col justify-between p-4 rounded-xl bg-[#111827] hover:bg-[#131C31] border border-slate-800/80 hover:border-sky-500/40 transition-all duration-200 shadow-xs hover:shadow-md"
                      >
                        <div>
                          {/* Card Header: Code & Estimasi Menit */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-700/80 uppercase">
                              {b.kode_bab}
                            </span>
                            <span className="text-[12px] font-medium text-slate-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              {b.estimasi_menit_review} mnt
                            </span>
                          </div>

                          {/* Bab Name */}
                          <h3 className="font-semibold text-base text-[#F8FAFC] group-hover:text-sky-300 transition-colors leading-[1.35] line-clamp-2">
                            {b.bab}
                          </h3>

                          {/* Stats badge */}
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                            <span>{b.jumlah_subbab} Sub-bab</span>
                            <span>•</span>
                            <span>{b.total_butir} Poin Teori</span>
                          </div>

                          {/* 3 Sub-bab preview */}
                          <div className="mt-3.5 pt-3 border-t border-slate-800/60 space-y-1.5">
                            {b.subbab.slice(0, 3).map((sb) => (
                              <div
                                key={sb.kode_subbab}
                                className="flex items-start gap-1.5 text-xs text-slate-300 truncate"
                              >
                                <span className="font-mono text-[10.5px] text-slate-400 shrink-0">
                                  {sb.kode_subbab}
                                </span>
                                <span className="truncate">{sb.judul_subbab}</span>
                              </div>
                            ))}
                            {b.subbab.length > 3 && (
                              <p className="text-[11px] text-slate-400 italic">
                                +{b.subbab.length - 3} sub-bab lainnya
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Open Action Arrow */}
                        <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                          <span>Buka Rangkuman Padat</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: HALAMAN RANGKUMAN PER BAB (/rangkuman/:kode_bab)
  // =========================================================================
  return (
    <div className="min-h-screen text-slate-100 bg-[#0B1120] font-sans selection:bg-sky-500 selection:text-white pb-24 rangkuman-page-dark">
      {/* 1. Thin 2px Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 z-50 print-hide"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Top Sticky Toolbar & Breadcrumb */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5 print-hide">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Breadcrumb & Identity */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to="/rangkuman"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
              title="Kembali ke Daftar Semua Rangkuman"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
            </Link>

            <div className="flex items-center gap-1.5 min-w-0 text-xs sm:text-sm font-medium text-slate-400">
              <Link to="/rangkuman" className="hover:text-slate-200 shrink-0">
                Rangkuman
              </Link>
              <span>›</span>
              <span className="truncate text-slate-300 font-semibold">
                {babData ? babData.subtes.split(':')[0] : '...'}
              </span>
              <span>›</span>
              <span className="truncate text-[#F8FAFC] font-bold">
                {babData ? babData.kode_bab.toUpperCase() : '...'}
              </span>
            </div>

            {babData && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 shrink-0">
                <Clock className="w-3 h-3 text-amber-400" />
                {babData.estimasi_menit_review} Menit Review
              </span>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-end overflow-x-auto no-scrollbar">
            {/* Real-time search inside chapter */}
            <div className="relative">
              <input
                type="text"
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder="Cari rumus/teori..."
                className="w-32 sm:w-44 text-xs pl-7 pr-6 py-1.5 rounded-lg bg-[#111827] text-slate-100 placeholder-slate-400 border border-slate-700 focus:border-sky-400 outline-none"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              {chapterSearch && (
                <button
                  type="button"
                  onClick={() => setChapterSearch('')}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Active Recall Toggle (Sembunyikan Contoh) */}
            <button
              type="button"
              onClick={() => setActiveRecallMode(!activeRecallMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                activeRecallMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                  : 'bg-[#111827] text-slate-300 hover:text-white border-slate-700'
              }`}
              title={
                activeRecallMode
                  ? 'Matikan Mode Uji Ingatan'
                  : 'Aktifkan Mode Uji Ingatan: Buramkan contoh agar bisa menebak sendiri dahulu'
              }
            >
              {activeRecallMode ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">
                {activeRecallMode ? 'Contoh Kabur' : 'Uji Ingatan'}
              </span>
            </button>

            {/* Collapse / Expand Toggle */}
            <button
              type="button"
              onClick={() => {
                const anyCollapsed = Object.values(collapsedGroups).some(Boolean);
                toggleAllGroups(anyCollapsed);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#111827] text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Buka / Lipat Semua Kelompok Teori"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Lipat/Buka</span>
            </button>

            {/* Print / PDF Button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 transition cursor-pointer"
              title="Cetak Halaman ini atau Simpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Jump Chips Horizontal */}
      {babData && babData.daftar_subbab.length > 1 && (
        <div className="lg:hidden sticky top-[49px] z-30 bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 print-hide">
          {babData.daftar_subbab.map((sb) => {
            const isActive = activeSubbabId === sb.kode_subbab;
            return (
              <a
                key={sb.kode_subbab}
                href={`#${sb.kode_subbab}`}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold whitespace-nowrap transition-all uppercase ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-[#111827] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {sb.kode_subbab}
              </a>
            );
          })}
        </div>
      )}

      {/* 4. Main Body: Desktop 2-Column Grid (Sidebar TOC + Main Content) */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-6">
        {isLoading || !babData ? (
          <div className="py-24 text-center bg-[#111827] rounded-2xl border border-slate-800 max-w-xl mx-auto my-10">
            <div className="inline-block w-8 h-8 border-3 border-sky-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-semibold text-slate-300">Menyiapkan rangkuman padat bab...</p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 items-start">
            {/* SIDEBAR KIRI (DESKTOP STICKY TOC) */}
            <aside className="hidden lg:block lg:sticky lg:top-20 space-y-4 print-hide">
              <div className="p-4 rounded-xl bg-[#111827] border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Daftar Sub-bab</span>
                  <span className="font-mono text-sky-400">{babData.daftar_subbab.length} Sub</span>
                </div>

                <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-1">
                  {babData.daftar_subbab.map((sb, idx) => {
                    const isActive = activeSubbabId === sb.kode_subbab;
                    return (
                      <a
                        key={sb.kode_subbab}
                        href={`#${sb.kode_subbab}`}
                        className={`flex items-start gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${
                          isActive
                            ? 'bg-sky-950/60 text-sky-300 font-bold border border-sky-500/40'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
                        }`}
                      >
                        <span className="font-mono text-[11px] text-slate-500 shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="line-clamp-2 leading-[1.35]">{sb.judul_subbab}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Prev / Next Chapter Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {prevBab ? (
                  <Link
                    to={`/rangkuman/${prevBab.kode_bab.toLowerCase()}`}
                    className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#111827] hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition"
                    title={`Bab Sebelumnya: ${prevBab.bab}`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextBab && (
                  <Link
                    to={`/rangkuman/${nextBab.kode_bab.toLowerCase()}`}
                    className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#111827] hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-sky-300 hover:text-white transition"
                    title={`Bab Berikutnya: ${nextBab.bab}`}
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </aside>

            {/* KOLOM KANAN UTAMA (MAX-W-[840PX]) */}
            <main className="max-w-[840px] w-full min-w-0 space-y-10">
              {/* Judul Bab & Subtes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border uppercase ${getSubtestColor(
                      babData.kode_bab.split('-')[0]
                    )}`}
                  >
                    {babData.kode_bab}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{babData.subtes}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] leading-[1.25]">
                  {babData.bab}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {babData.estimasi_menit_review} Menit Review
                  </span>
                  <span>•</span>
                  <span>{babData.daftar_subbab.length} Sub-bab</span>
                  <span>•</span>
                  <span>{totalChapterPoints} Poin Teori & Contoh</span>
                </div>
              </div>

              {/* SEKSI DAFTAR SUB-BAB */}
              {filteredSubbabs.map((sub, sIdx) => {
                const subNumber = String(sIdx + 1).padStart(2, '0');
                const isPengayaan = sub.klasifikasi_materi === 'PENGAYAAN';

                return (
                  <section
                    key={sub.kode_subbab}
                    id={sub.kode_subbab}
                    className="scroll-mt-24 subbab-section space-y-4 pt-4 border-t border-slate-800/80 first:border-t-0"
                  >
                    {/* Header Sub-bab */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-bold text-sky-400">
                          {subNumber}.
                        </span>
                        <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-[#F8FAFC] leading-[1.3]">
                          {sub.judul_subbab}
                        </h2>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700/80 uppercase">
                          {sub.kode_subbab}
                        </span>
                        {isPengayaan ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950/50 text-amber-300 border border-amber-500/40">
                            PENGAYAAN
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-950/50 text-sky-300 border border-sky-500/40">
                            INTI
                          </span>
                        )}
                        {getModeBadge(sub.mode_tampilan)}
                      </div>

                      {/* Link ke materi mendalam */}
                      <Link
                        to={`/materi/${sub.kode_subbab}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition shrink-0 print-hide"
                        title="Buka naskah materi mendalam, tips jebakan, dan drilling"
                      >
                        <span>Buka Materi Lengkap & Latihan</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Banner Inti Sub-bab (TL;DR) */}
                    {sub.inti_subbab && (
                      <div className="bg-sky-950/30 border-l-4 border-sky-400 rounded-r-lg px-4 py-3 mb-5">
                        <div className="font-mono text-[11px] font-bold tracking-wider text-sky-400 uppercase mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-sky-400" />
                          <span>INTI SUB-BAB</span>
                        </div>
                        <div className="text-slate-200 text-sm sm:text-[14.5px]">
                          {renderMarkdownText(sub.inti_subbab)}
                        </div>
                      </div>
                    )}

                    {/* Matriks / Kelompok Teori & Contoh */}
                    <div className="space-y-4">
                      {sub.kelompok.map((kel, kIdx) => {
                        const groupId = `${sub.kode_subbab}-${kIdx}`;
                        const isCollapsed = Boolean(collapsedGroups[groupId]);

                        return (
                          <div
                            key={groupId}
                            className="rounded-xl bg-[#111827] border border-slate-800/80 overflow-hidden rangkuman-card"
                          >
                            {/* Header Kelompok */}
                            <button
                              type="button"
                              onClick={() => toggleGroupCollapse(groupId)}
                              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-left border-b border-slate-800/80 transition cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <h3 className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider text-slate-300 truncate">
                                  {renderInlineMarkdown(kel.nama_kelompok)}
                                </h3>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 shrink-0">
                                  {kel.butir.length} poin
                                </span>
                              </div>
                              <div className="text-slate-400 print-hide shrink-0">
                                {isCollapsed ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronUp className="w-4 h-4" />
                                )}
                              </div>
                            </button>

                            {/* Isi Kelompok: Desktop Matrix (md+) & Mobile Stacked Cards (<md) */}
                            <div className={`${isCollapsed ? 'hidden' : 'block'} print-force-open`}>
                              {/* Desktop Header Row (md+) */}
                              <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] bg-[#0F172A] border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 px-4 py-2">
                                <div className="pr-3 flex items-center gap-1.5">
                                  <span>{sub.label_kolom?.kolom_1 || 'Rumus / Kaidah'}</span>
                                </div>
                                <div className="pl-4 flex items-center gap-1.5 border-l border-slate-800/80">
                                  <span className="text-emerald-400">
                                    {sub.label_kolom?.kolom_2 || '1 Contoh Nyata'}
                                  </span>
                                </div>
                              </div>

                              {/* Rows of butir */}
                              <div className="divide-y divide-slate-800/70">
                                {kel.butir.map((b, bIdx) => {
                                  const microNum = String(bIdx + 1).padStart(2, '0');
                                  const itemId = `${groupId}-${bIdx}`;
                                  const isRevealed = Boolean(revealedItems[itemId]);
                                  const isBlurred = activeRecallMode && !isRevealed;

                                  return (
                                    <div
                                      key={itemId}
                                      className="rangkuman-row transition-colors hover:bg-slate-900/40"
                                    >
                                      {/* TAMPILAN DESKTOP (md+) : 2 Kolom Matriks Terstruktur */}
                                      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] items-stretch">
                                        {/* Kolom Kiri: Nomor, Judul, Teori Singkat */}
                                        <div className="p-4 pr-5 min-w-0">
                                          <div className="flex items-start gap-2">
                                            <span className="font-mono text-xs font-bold text-slate-500 select-none pt-0.5 shrink-0">
                                              {microNum}
                                            </span>
                                            <div className="min-w-0">
                                              <h4 className="text-[15px] sm:text-[16px] font-semibold text-slate-50 leading-[1.4]">
                                                {renderInlineMarkdown(b.judul)}
                                              </h4>
                                              <div className="mt-1 text-slate-300 text-sm sm:text-[15.5px]">
                                                {renderMarkdownText(b.teori_singkat)}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Kolom Kanan: Contoh Penerapan dengan Latar Tipis Kontras */}
                                        <div
                                          onClick={() => {
                                            if (activeRecallMode) {
                                              setRevealedItems((prev) => ({
                                                ...prev,
                                                [itemId]: !prev[itemId],
                                              }));
                                            }
                                          }}
                                          className={`rangkuman-row-contoh p-4 pl-4.5 bg-emerald-950/10 border-l border-slate-800/80 flex flex-col justify-center min-w-0 ${
                                            isBlurred ? 'active-recall-blur' : ''
                                          }`}
                                          title={
                                            isBlurred ? 'Klik atau arahkan mouse untuk melihat contoh' : ''
                                          }
                                        >
                                          <div className="text-slate-200 text-sm sm:text-[15.5px]">
                                            {renderMarkdownText(b.contoh, true)}
                                          </div>
                                        </div>
                                      </div>

                                      {/* TAMPILAN MOBILE (< md) : Tumpukan Kartu Padat */}
                                      <div className="md:hidden p-3.5 space-y-2.5">
                                        {/* Atas: micro num + judul + teori */}
                                        <div className="flex items-start gap-2">
                                          <span className="font-mono text-xs font-bold text-slate-500 pt-0.5 shrink-0">
                                            {microNum}
                                          </span>
                                          <div className="min-w-0">
                                            <h4 className="text-[15px] font-semibold text-slate-50 leading-[1.4]">
                                              {renderInlineMarkdown(b.judul)}
                                            </h4>
                                            <div className="mt-1 text-slate-300 text-[14.5px]">
                                              {renderMarkdownText(b.teori_singkat)}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Bawah: Inset Box Contoh */}
                                        <div
                                          onClick={() => {
                                            if (activeRecallMode) {
                                              setRevealedItems((prev) => ({
                                                ...prev,
                                                [itemId]: !prev[itemId],
                                              }));
                                            }
                                          }}
                                          className={`border-l-2 border-emerald-500/60 bg-emerald-950/15 px-3 py-2 rounded-r-md ${
                                            isBlurred ? 'active-recall-blur' : ''
                                          }`}
                                        >
                                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                                            CONTOH
                                          </div>
                                          <div className="text-slate-200 text-[14.5px]">
                                            {renderMarkdownText(b.contoh, true)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}

              {/* Bottom Navigation: Prev / Next Chapter Buttons */}
              <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4 print-hide">
                {prevBab ? (
                  <Link
                    to={`/rangkuman/${prevBab.kode_bab.toLowerCase()}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase">Bab Sebelumnya</div>
                      <div className="truncate max-w-[140px] sm:max-w-[200px]">{prevBab.bab}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  to="/rangkuman"
                  className="px-3.5 py-2 rounded-xl bg-[#111827] hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Daftar Rangkuman
                </Link>

                {nextBab ? (
                  <Link
                    to={`/rangkuman/${nextBab.kode_bab.toLowerCase()}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-sky-300 hover:text-white transition"
                  >
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Bab Berikutnya</div>
                      <div className="truncate max-w-[140px] sm:max-w-[200px]">{nextBab.bab}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
export default RangkumanPage;
