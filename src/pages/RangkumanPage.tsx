import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  ChevronsDownUp,
  ExternalLink,
  Layers,
  Search,
  Clock,
  Maximize2,
  Minimize2,
  Printer,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import type {
  RangkumanBabData,
  RangkumanIndexData,
  RangkumanSubbab,
  RangkumanButir,
} from '../types/rangkuman';
import {
  fetchRangkumanByBabId,
  fetchRangkumanIndex,
  getInitialRangkumanFromPageData,
} from '../lib/rangkumanLoader';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { NatureFocusHeaderAccent } from '../components/decorations/LazyDecorations';

// Strict KaTeX configuration: output: 'html' to guarantee 0 <math> tags
const REMARK_PLUGINS = [remarkMath, remarkGfm];
const KATEX_REHYPE_PLUGINS = [[rehypeKatex, { output: 'html' }] as any];

function formatMath(content?: string) {
  if (!content) return '';
  return content.replace(/\\frac(?=[{\s])/g, '\\dfrac');
}

const INLINE_COMPONENTS = {
  p: ({ children }: any) => <span className="inline">{children}</span>,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic font-medium text-blue-700 dark:text-blue-300">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
      {children}
    </code>
  ),
};

const THEORY_COMPONENTS = {
  p: ({ children }: any) => <p className="m-0 leading-[1.65]">{children}</p>,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic font-medium text-blue-700 dark:text-blue-300">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
      {children}
    </code>
  ),
};

const EXAMPLE_COMPONENTS = {
  p: ({ children }: any) => <p className="m-0 leading-[1.55]">{children}</p>,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-slate-900 dark:text-[#F8FAFC]">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic font-medium text-blue-700 dark:text-blue-300">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="font-mono px-1.5 py-0.5 rounded bg-emerald-100/60 dark:bg-emerald-950/60 text-xs text-emerald-800 dark:text-emerald-300">
      {children}
    </code>
  ),
};

const KONSEP_INTI_COMPONENTS = {
  p: ({ children }: any) => <p className="m-0 leading-[1.6]">{children}</p>,
  ul: ({ children }: any) => (
    <ul className="m-0 pl-5 list-disc list-outside space-y-2 marker:text-sky-500/80 dark:marker:text-sky-400/80">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="m-0 pl-5 list-decimal list-outside space-y-2 marker:text-sky-500/80 dark:marker:text-sky-400/80">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-[1.6] pl-1 break-words overflow-x-auto">{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic font-medium text-blue-700 dark:text-blue-300">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-300">
      {children}
    </code>
  ),
};

const MemoRangkumanMarkdown = memo<{
  text?: string;
  variant: 'inline' | 'theory' | 'example' | 'konsep';
}>(({ text, variant }) => {
  if (!text) return null;
  const components =
    variant === 'inline'
      ? INLINE_COMPONENTS
      : variant === 'theory'
      ? THEORY_COMPONENTS
      : variant === 'example'
      ? EXAMPLE_COMPONENTS
      : KONSEP_INTI_COMPONENTS;

  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={KATEX_REHYPE_PLUGINS}
      components={components}
    >
      {formatMath(text)}
    </ReactMarkdown>
  );
});
MemoRangkumanMarkdown.displayName = 'MemoRangkumanMarkdown';

const renderMarkdownInline = (text?: string) =>
  text ? <MemoRangkumanMarkdown text={text} variant="inline" /> : null;
const renderMarkdownTheory = (text?: string) =>
  text ? <MemoRangkumanMarkdown text={text} variant="theory" /> : null;
const renderMarkdownExample = (text?: string) =>
  text ? <MemoRangkumanMarkdown text={text} variant="example" /> : null;
const renderKonsepInti = (text?: string) =>
  text ? <MemoRangkumanMarkdown text={text} variant="konsep" /> : null;

interface ButirCardProps {
  butir: RangkumanButir;
  bIdx: number;
  activeRecallMode: boolean;
  isRevealed: boolean;
  hasAnyContoh: boolean;
  onToggleReveal: () => void;
}

const RangkumanButirCard = memo<ButirCardProps>(
  ({ butir, bIdx, activeRecallMode, isRevealed, hasAnyContoh, onToggleReveal }) => {
    const judulText = butir.judul || butir.judul_poin || '';
    const teoriText = butir.teori_singkat || butir.penjelasan_singkat || '';
    const contohText = butir.contoh || butir.contoh_penerapan || '';
    const isBlurred = activeRecallMode && !isRevealed;

    return (
      <div className="rangkuman-card rounded-xl bg-white dark:bg-[#131D34] border border-slate-200/90 dark:border-slate-700/65 p-4 sm:p-5 shadow-2xs dark:shadow-none">
        <div
          className={`grid grid-cols-1 ${
            contohText ? 'md:grid-cols-2 md:gap-6' : ''
          } gap-3.5 items-start`}
        >
          <div className="min-w-0">
            <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-700/55">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 text-[11px] font-mono font-semibold text-sky-700 dark:text-sky-300 shrink-0 mt-0.5 select-none">
                {String(bIdx + 1).padStart(2, '0')}
              </span>
              <h4 className="rangkuman-poin-title text-[15.5px] font-semibold text-slate-900 dark:text-slate-100 leading-[1.4] break-words">
                {renderMarkdownInline(judulText)}
              </h4>
            </div>

            {teoriText && (
              <div className="mt-2.5 sm:pl-8.5 rangkuman-theory-text text-slate-800 dark:text-slate-200 leading-[1.65] dark:tracking-[0.01em] break-words overflow-x-auto">
                {renderMarkdownTheory(teoriText)}
              </div>
            )}
          </div>

          {contohText && (
            <div
              onClick={activeRecallMode ? onToggleReveal : undefined}
              className={`rangkuman-row-contoh sm:ml-8.5 md:ml-0 rounded-lg border border-emerald-200/70 dark:border-emerald-800/40 border-l-[3px] border-l-emerald-500 dark:border-l-emerald-400/80 bg-emerald-50/70 dark:bg-emerald-950/25 px-3.5 py-2.5 transition-all ${
                activeRecallMode ? 'cursor-pointer' : ''
              } ${isBlurred ? 'active-recall-blur' : ''}`}
              title={isBlurred ? 'Klik untuk melihat contoh' : undefined}
            >
              <div
                className={`text-[10.5px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-1 select-none ${
                  hasAnyContoh ? 'md:hidden' : ''
                }`}
              >
                CONTOH
              </div>
              <div className="rangkuman-example-text text-slate-800 dark:text-slate-200 leading-[1.55] dark:tracking-[0.01em] break-words overflow-x-auto">
                {renderMarkdownExample(contohText)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
RangkumanButirCard.displayName = 'RangkumanButirCard';

interface RangkumanPageProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  initialBabData?: RangkumanBabData | null;
  initialIndexData?: RangkumanIndexData | null;
}

export const RangkumanPage: React.FC<RangkumanPageProps> = ({
  theme = 'light',
  onToggleTheme = () => {},
  initialBabData = null,
  initialIndexData = null,
}) => {
  const { babId } = useParams<{ babId?: string }>();
  const isDark = theme === 'dark';

  // Initial data from SSR or #__PAGE_DATA__
  const hydratedRangkuman = useMemo(() => getInitialRangkumanFromPageData(), []);

  const [indexData, setIndexData] = useState<RangkumanIndexData | null>(() => {
    if (initialIndexData && initialIndexData.daftar_subtes?.length) {
      return initialIndexData;
    }
    if (hydratedRangkuman.indexData?.daftar_subtes?.length) {
      return hydratedRangkuman.indexData;
    }
    return null;
  });

  const [babData, setBabData] = useState<RangkumanBabData | null>(() => {
    if (initialBabData && initialBabData.kode_bab.toLowerCase() === babId?.toLowerCase()) {
      return initialBabData;
    }
    if (
      hydratedRangkuman.babData &&
      hydratedRangkuman.babData.kode_bab.toLowerCase() === babId?.toLowerCase()
    ) {
      return hydratedRangkuman.babData;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (!babId) return false;
    return !babData;
  });

  const [activeSubbabIndex, setActiveSubbabIndex] = useState<number>(-1); // -1 = Semua Sub-bab
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inChapterSearch, setInChapterSearch] = useState<string>('');
  const [activeRecallMode, setActiveRecallMode] = useState<boolean>(false);
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Reader-matching states: Focus Mode & Font Scaling
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const progressBarFillRef = useRef<HTMLDivElement | null>(null);
  const progressAriaRef = useRef<HTMLDivElement | null>(null);

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

  // Reset accordion state when navigating between chapters
  useEffect(() => {
    setExpandedGroups({});
  }, [babId]);

  // Real-time scroll progress tracker via requestAnimationFrame (0 React re-renders during scroll!)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId = 0;

    const updateProgressDom = () => {
      rafId = 0;
      const doc = document.documentElement;
      const totalHeight = doc.scrollHeight - window.innerHeight;
      const pct =
        totalHeight <= 0
          ? 100
          : Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${pct}%`;
      }
      if (progressBarFillRef.current) {
        progressBarFillRef.current.style.width = `${pct}%`;
      }
      if (progressAriaRef.current) {
        progressAriaRef.current.setAttribute('aria-valuenow', String(pct));
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgressDom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgressDom();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [babId, babData, activeSubbabIndex]);

  // Load index data on mount
  useEffect(() => {
    if (!indexData) {
      fetchRangkumanIndex()
        .then((data) => setIndexData(data))
        .catch((err) => console.warn('Could not load rangkuman index:', err));
    }
  }, [indexData]);

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

    if (babData && babData.kode_bab.toLowerCase() === babId.toLowerCase()) {
      if (typeof document !== 'undefined') {
        document.title = `Cheat Sheet ${babData.bab} (${babData.kode_bab.toUpperCase()}) | SkolAce`;
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
  }, [babId, babData]);

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

  // Normalisasi tampilan nama kelompok bila ada awalan angka tidak konsisten (misal "1. ...")
  const normalizeGroupTitle = (title: string): string => {
    if (!title) return '';
    return title.replace(/^(\d+[\.\)]\s*)+/, '').trim();
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
    let list = activeSubbabIndex === -1 ? babData.daftar_subbab : [babData.daftar_subbab[activeSubbabIndex]].filter(Boolean);

    const q = inChapterSearch.trim().toLowerCase();
    if (!q) return list;

    return list
      .map((sub) => {
        const matchesSubTitle = sub.judul_subbab.toLowerCase().includes(q) || (sub.inti_subbab || '').toLowerCase().includes(q);
        const filteredKelompok = sub.kelompok
          .map((kel) => {
            const matchesKel = kel.nama_kelompok.toLowerCase().includes(q);
            const filteredButir = kel.butir.filter(
              (b) =>
                matchesKel ||
                matchesSubTitle ||
                (b.judul || b.judul_poin || '').toLowerCase().includes(q) ||
                (b.teori_singkat || b.penjelasan_singkat || '').toLowerCase().includes(q) ||
                (b.contoh || b.contoh_penerapan || '').toLowerCase().includes(q)
            );
            return {
              ...kel,
              butir: filteredButir,
            };
          })
          .filter((k) => k.butir.length > 0);

        return {
          ...sub,
          kelompok: filteredKelompok,
        };
      })
      .filter((sub) => sub.kelompok.length > 0);
  }, [babData, activeSubbabIndex, inChapterSearch]);

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
            b.bab.toLowerCase().includes(query) ||
            (b.nama_bab && b.nama_bab.toLowerCase().includes(query)) ||
            b.kode_bab.toLowerCase().includes(query) ||
            st.subtes.toLowerCase().includes(query) ||
            (b.subbab && b.subbab.some((sb) => sb.judul_subbab.toLowerCase().includes(query)))
        ),
      }))
      .filter((st) => st.daftar_bab.length > 0);
  }, [indexData, searchQuery]);

  // Progressive Disclosure: Accordion logic
  const isGroupOpen = (groupId: string, kIdx: number): boolean => {
    // Search active within chapter -> force expand all matching groups
    if (inChapterSearch.trim()) return true;
    if (expandedGroups[groupId] !== undefined) {
      return expandedGroups[groupId];
    }
    // Default: first group of each sub-bab is expanded, others collapsed
    return kIdx === 0;
  };

  const toggleGroup = (groupId: string, kIdx: number) => {
    setExpandedGroups((prev) => {
      const current = prev[groupId] !== undefined ? prev[groupId] : (inChapterSearch.trim() ? true : kIdx === 0);
      return {
        ...prev,
        [groupId]: !current,
      };
    });
  };

  // Check if all groups are currently expanded
  const areAllExpanded = useMemo(() => {
    if (inChapterSearch.trim()) return true;
    if (!displayedSubbabs.length) return true;
    for (const sub of displayedSubbabs) {
      for (let kIdx = 0; kIdx < sub.kelompok.length; kIdx++) {
        const groupId = `${sub.kode_subbab}-${kIdx}`;
        const open = expandedGroups[groupId] !== undefined ? expandedGroups[groupId] : kIdx === 0;
        if (!open) return false;
      }
    }
    return true;
  }, [displayedSubbabs, expandedGroups, inChapterSearch]);

  const handleToggleAllGroups = () => {
    const nextState = !areAllExpanded;
    const newExpanded: Record<string, boolean> = {};
    for (const sub of displayedSubbabs) {
      for (let kIdx = 0; kIdx < sub.kelompok.length; kIdx++) {
        const groupId = `${sub.kode_subbab}-${kIdx}`;
        newExpanded[groupId] = nextState;
      }
    }
    setExpandedGroups(newExpanded);
  };

  const backTargetUrl = useMemo(() => {
    if (babId && babData) {
      return `/utbk/${extractSubtestCode(babData.subtes)}`;
    }
    return '/';
  }, [babId, babData]);

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 bg-[#F8FAFC] dark:bg-[#0B1120] pb-16 transition-colors">
      {/* Scoped CSS Rules for Rangkuman Page reading area: typography, measure, line-height & KaTeX */}
      <style>{`
        .rangkuman-reading-area {
          font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          font-feature-settings: "cv02", "cv03", "cv04", "cv11";
        }
        .rangkuman-card {
          content-visibility: auto;
          contain-intrinsic-size: auto 180px;
        }
        .rangkuman-reading-area .font-mono,
        .rangkuman-reading-area code {
          font-family: 'JetBrains Mono', monospace;
        }
        .rangkuman-reading-area .katex {
          font-size: 1.02em !important;
          line-height: 1.3 !important;
          max-width: 100%;
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
          -webkit-overflow-scrolling: touch;
        }
        /* Dynamic font scaling support */
        .rangkuman-subbab-title {
          font-size: calc(20px * var(--reader-font-scale, 1));
        }
        @media (min-width: 640px) {
          .rangkuman-subbab-title {
            font-size: calc(24px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-kelompok-title {
          font-size: calc(15px * var(--reader-font-scale, 1));
        }
        @media (min-width: 640px) {
          .rangkuman-kelompok-title {
            font-size: calc(16px * var(--reader-font-scale, 1));
          }
          .sm\:pl-8\.5 {
            padding-left: 2.125rem !important; /* 34px: w-6 (24px) + gap-2.5 (10px) */
          }
          .sm\:ml-8\.5 {
            margin-left: 2.125rem !important;
          }
        }
        @media (min-width: 768px) {
          .md\:ml-0 {
            margin-left: 0 !important;
          }
        }
        .rangkuman-poin-title {
          font-size: calc(15.5px * var(--reader-font-scale, 1));
        }
        @media (min-width: 640px) {
          .rangkuman-poin-title {
            font-size: calc(16px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-theory-text {
          font-size: calc(15.5px * var(--reader-font-scale, 1));
        }
        @media (min-width: 640px) {
          .rangkuman-theory-text {
            font-size: calc(16px * var(--reader-font-scale, 1));
          }
        }
        .rangkuman-example-text {
          font-size: calc(15px * var(--reader-font-scale, 1));
        }
        @media (min-width: 640px) {
          .rangkuman-example-text {
            font-size: calc(15.5px * var(--reader-font-scale, 1));
          }
        }
      `}</style>

      {/* 1. TOP STATIS/STICKY BAR: Identitas Bab/Materi, Progress Real-Time, Ukuran Teks Fleksibel & Theme Switcher */}
      <header className="sticky top-0 z-50 w-full bg-[#F8FAFC]/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all shadow-2xs print-hide">
        {!isDark && <NatureFocusHeaderAccent />}

        <div
          className={`mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all ${
            babId ? 'max-w-4xl' : isFocusMode ? 'max-w-5xl' : 'max-w-4xl'
          }`}
        >
          {/* Identitas Bab & Tombol Kembali */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link
              to={backTargetUrl}
              className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              title={
                babId
                  ? 'Kembali ke Silabus Subtes'
                  : 'Kembali ke Dashboard Silabus'
              }
              aria-label="Kembali"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

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
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Real-Time Progress Bar (hanya saat membaca Bab) */}
            {babId && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span
                  ref={progressTextRef}
                  className="font-mono text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[28px] sm:min-w-[32px] text-right"
                >
                  0%
                </span>
                <div
                  ref={progressAriaRef}
                  className="w-10 sm:w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={0}
                >
                  <div
                    ref={progressBarFillRef}
                    className="h-full bg-blue-600 transition-[width] duration-150 ease-out rounded-full"
                    style={{ width: '0%' }}
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

            {/* Tombol Cetak / PDF */}
            {babId && (
              <button
                type="button"
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition cursor-pointer border border-emerald-200 dark:border-emerald-800/60"
                title="Cetak Halaman ini atau Simpan sebagai PDF"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cetak</span>
              </button>
            )}

            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT CONTAINER (Lebar Kolom Optimal max-w-4xl saat membaca Bab) */}
      <main
        className={`mx-auto px-4 sm:px-6 transition-all reader-scalable-content rangkuman-reading-area ${
          babId
            ? isFocusMode
              ? 'max-w-4xl py-4'
              : 'max-w-4xl py-6 sm:py-8'
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
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                        className="group p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/80 transition-all hover:shadow-md flex flex-col justify-between"
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
                            {b.bab || b.nama_bab}
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

        {/* VIEW 2: BAB DETAIL CHEAT SHEET (Optimal Measure max-w-4xl) */}
        {babId && (
          <div className="space-y-6">
            {isLoading || !babData ? (
              <div className="py-24 text-center bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto my-6">
                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Menyiapkan Lembar Rangkuman & Rumus Cepat...
                </p>
              </div>
            ) : (
              <>
                {/* 2. Ringkas Hero Card: Rata Kiri, Pangkas Kebisingan, Padding Compact */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-2xs space-y-3 transition-colors">
                  {/* Baris Breadcrumb Ringkas: Katalog Bab • SUBTES • Estimasi Menit */}
                  <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 justify-start">
                    <Link
                      to="/rangkuman"
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium shadow-2xs"
                      title="Lihat katalog semua bab cheat sheet"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Katalog Bab</span>
                    </Link>
                    <span className="text-slate-300 dark:text-slate-600 select-none">•</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase border ${getSubtestColor(
                        babData.kode_bab
                      )}`}
                    >
                      {babData.subtes}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600 select-none">•</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>~{babData.estimasi_menit_review || 5} mnt</span>
                    </span>
                  </div>

                  {/* Judul Bab Bersih */}
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                    {babData.bab}
                  </h1>

                  {/* Baris Pencarian & Utilitas (Kolom Pencarian flex-1, Recall Blur, & Buka/Lipat Semua) */}
                  <div className="flex items-center gap-2 pt-0.5">
                    {/* Search In-Chapter Input (flex-1 memenuhi ruang kosong) */}
                    <div className="relative flex-1 min-w-0">
                      <input
                        type="text"
                        value={inChapterSearch}
                        onChange={(e) => setInChapterSearch(e.target.value)}
                        placeholder="Cari teori, pola, atau contoh..."
                        className="w-full text-xs sm:text-sm pl-8 pr-7 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 placeholder-slate-400 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      {inChapterSearch && (
                        <button
                          type="button"
                          onClick={() => setInChapterSearch('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                          aria-label="Hapus pencarian"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Active Recall Toggle (Uji Ingatan) */}
                    <button
                      type="button"
                      onClick={() => setActiveRecallMode(!activeRecallMode)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer shrink-0 ${
                        activeRecallMode
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                      }`}
                      title="Mode Uji Ingatan: Sembunyikan contoh agar bisa menebak dahulu"
                    >
                      {activeRecallMode ? (
                        <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span className="hidden sm:inline">
                        {activeRecallMode ? 'Contoh Kabur' : 'Uji Ingatan'}
                      </span>
                    </button>

                    {/* Progressive Disclosure: Buka / Lipat Semua Toggle */}
                    <button
                      type="button"
                      onClick={handleToggleAllGroups}
                      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer shrink-0"
                      title={areAllExpanded ? 'Lipat Semua Kelompok' : 'Buka Semua Kelompok'}
                    >
                      {areAllExpanded ? (
                        <>
                          <ChevronsDownUp className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span className="hidden sm:inline">Lipat Semua</span>
                        </>
                      ) : (
                        <>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span className="hidden sm:inline">Buka Semua</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sub-bab Quick Tabs / Pill Selector dalam Segmented Tray */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                    <div
                      role="tablist"
                      aria-label="Filter Sub-bab Rangkuman"
                      className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl bg-slate-100/85 dark:bg-[#0B1120]/90 border border-slate-200/80 dark:border-slate-700/75 no-scrollbar"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeSubbabIndex === -1}
                        onClick={() => setActiveSubbabIndex(-1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
                          activeSubbabIndex === -1
                            ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                            : 'bg-white/75 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/75 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        Semua Sub-bab ({babData.daftar_subbab.length})
                      </button>
                      {babData.daftar_subbab.map((sub, idx) => (
                        <React.Fragment key={sub.kode_subbab}>
                          <span
                            className="h-4 w-px bg-slate-300/75 dark:bg-slate-700/80 shrink-0"
                            aria-hidden="true"
                          />
                          <button
                            type="button"
                            role="tab"
                            aria-selected={activeSubbabIndex === idx}
                            onClick={() => setActiveSubbabIndex(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
                              activeSubbabIndex === idx
                                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                                : 'bg-white/75 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/75 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                          >
                            {idx + 1}. {sub.judul_subbab}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-bab Content Reading Area */}
                <div className="mt-6 sm:mt-8 space-y-12 sm:space-y-14">
                  {displayedSubbabs.map((sub, sIdx) => {
                    const intiText = sub.inti_subbab || sub.konsep_inti_markdown || '';

                    return (
                      <article
                        key={sub.kode_subbab}
                        id={`subbab-${sub.kode_subbab}`}
                        className="subbab-section"
                      >
                        {/* Pembatas Makro Antar Sub-bab agar perpindahan topik terasa jelas & tenang */}
                        {sIdx > 0 && (
                          <div className="relative flex items-center justify-center mb-8 sm:mb-10 select-none">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700/75" />
                            <div className="absolute px-3.5 py-1 rounded-full bg-[#F8FAFC] dark:bg-[#0D1528] text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                              {sub.kode_subbab}
                            </div>
                          </div>
                        )}

                        {/* 3. Header Sub-bab Ringkas 2 Baris + Garis aksen bawah gradien tipis:
                            Baris 1: kode_subbab + klasifikasi di kiri, Materi Lengkap ↗ di kanan
                            Baris 2: Judul Sub-bab */}
                        <div className="pb-3.5 mb-5 border-b border-slate-200/80 dark:border-slate-800/80 relative">
                          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/40 via-sky-400/25 to-transparent" />
                          {/* Baris 1 */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                                {sub.kode_subbab}
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                {sub.klasifikasi_materi || 'INTI'}
                              </span>
                            </div>

                            <Link
                              to={`/utbk/${sub.kode_subbab.split('-')[0].toLowerCase()}/${sub.kode_subbab.toLowerCase()}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors shrink-0"
                              title="Buka materi lengkap komprehensif untuk topik ini"
                            >
                              <span>Materi Lengkap</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          {/* Baris 2 */}
                          <h2 className="rangkuman-subbab-title text-slate-900 dark:text-slate-100 font-bold tracking-tight leading-snug mt-1.5">
                            {sub.judul_subbab}
                          </h2>
                        </div>

                        {/* Blok inti_subbab (Callout ringkas dengan aksen kiri biru, teks terang, mb-5 pemisah ke kelompok accordion) */}
                        {intiText && (
                          <div className="mb-5 rounded-r-lg border-l-[3px] border-sky-500 dark:border-sky-400 bg-sky-50/70 dark:bg-sky-950/25 px-4 py-3 text-slate-800 dark:text-slate-200 shadow-2xs transition-colors">
                            <div className="text-[15px] sm:text-base leading-[1.6] dark:tracking-[0.01em] overflow-x-auto max-w-full">
                              {renderKonsepInti(intiText)}
                            </div>
                          </div>
                        )}

                        {/* 4 & 5. Blok kelompok[]: Kartu Kelompok Accordion dengan Tray Terpisah per Butir */}
                        <div className="space-y-4 sm:space-y-5">
                          {sub.kelompok.map((k, kIdx) => {
                            const groupId = `${sub.kode_subbab}-${kIdx}`;
                            const isExpanded = isGroupOpen(groupId, kIdx);
                            const hasAnyContoh = k.butir.some(
                              (b) => Boolean(b.contoh || b.contoh_penerapan)
                            );

                            return (
                              <div
                                key={kIdx}
                                className={`rounded-xl border overflow-hidden transition-all ${
                                  isExpanded
                                    ? 'border-sky-300/80 dark:border-sky-500/35 bg-white dark:bg-[#0D1425] shadow-xs dark:shadow-none'
                                    : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#10192D] hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs dark:shadow-none'
                                }`}
                              >
                                {/* Kepala Judul Kelompok / Tombol Accordion (Level 2) */}
                                <button
                                  type="button"
                                  onClick={() => toggleGroup(groupId, kIdx)}
                                  className={`w-full flex items-center justify-between gap-3 text-left transition-colors group cursor-pointer px-4 py-3.5 border-l-4 ${
                                    isExpanded
                                      ? 'bg-sky-50/75 dark:bg-[#172540] border-b border-sky-200/80 dark:border-slate-700/80 border-l-sky-500 dark:border-l-sky-400 hover:bg-sky-100/60 dark:hover:bg-[#1c2b48]'
                                      : 'bg-slate-50/75 hover:bg-slate-100/90 dark:bg-[#121C33] dark:hover:bg-[#172441] border-l-slate-300 dark:border-l-slate-700'
                                  }`}
                                  aria-expanded={isExpanded}
                                >
                                  {/* Tipografi Judul Kelompok */}
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <h3 className="rangkuman-kelompok-title text-[15px] sm:text-base font-bold text-slate-900 dark:text-slate-50 leading-[1.35] text-left break-words">
                                      {normalizeGroupTitle(k.nama_kelompok)}
                                    </h3>
                                  </div>

                                  {/* Sisi Kanan: Badge jumlah butir + Ikon Chevron dengan rotasi halus */}
                                  <div className="flex items-center gap-2.5 shrink-0">
                                    <span
                                      className={`text-xs font-mono px-2.5 py-0.5 rounded-full shrink-0 ${
                                        isExpanded
                                          ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 font-bold'
                                          : 'bg-slate-200/75 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700/70'
                                      }`}
                                    >
                                      {k.butir.length} butir
                                    </span>
                                    <ChevronDown
                                      className={`w-4 h-4 text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 shrink-0 ${
                                        isExpanded ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </button>

                                {/* Isi Kelompok: Header Matriks Kolom Desktop + Tray Kartu Butir Terpisah */}
                                <div className={`${isExpanded ? 'block' : 'hidden'} print-force-open bg-slate-100/75 dark:bg-[#080D19]`}>
                                  {/* Header Kolom Matriks 2 Kolom (Desktop md+ saja, jika ada butir yang memiliki contoh) */}
                                  {hasAnyContoh && (
                                    <div className="hidden md:grid md:grid-cols-2 md:gap-6 px-7 py-2.5 border-b border-slate-200/80 dark:border-slate-700/60 bg-slate-50/90 dark:bg-[#111A2E] text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 select-none">
                                      <div className="pl-8.5">
                                        {sub.label_kolom?.kolom_1 || 'POIN & TEORI'}
                                      </div>
                                      <div>
                                        {sub.label_kolom?.kolom_2 || 'CONTOH'}
                                      </div>
                                    </div>
                                  )}

                                  <div className="p-3 sm:p-4 space-y-3.5">
                                    {k.butir.map((b, bIdx) => {
                                      const itemId = `${sub.kode_subbab}-${kIdx}-${bIdx}`;
                                      return (
                                        <RangkumanButirCard
                                          key={bIdx}
                                          butir={b}
                                          bIdx={bIdx}
                                          activeRecallMode={activeRecallMode}
                                          isRevealed={Boolean(revealedItems[itemId])}
                                          hasAnyContoh={hasAnyContoh}
                                          onToggleReveal={() =>
                                            setRevealedItems((prev) => ({
                                              ...prev,
                                              [itemId]: !prev[itemId],
                                            }))
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Bottom Prev / Next Bab Navigation */}
                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 print-hide">
                  {prevBab ? (
                    <Link
                      to={`/rangkuman/${prevBab.kode_bab}`}
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-2xs max-w-[48%]"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                      <div className="text-left min-w-0">
                        <span className="font-mono text-[10px] text-slate-400 uppercase block">
                          Bab Sebelumnya
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block">
                          {prevBab.bab || prevBab.nama_bab}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextBab ? (
                    <Link
                      to={`/rangkuman/${nextBab.kode_bab}`}
                      className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-2xs ml-auto max-w-[48%]"
                    >
                      <div className="text-right min-w-0">
                        <span className="font-mono text-[10px] text-slate-400 uppercase block">
                          Bab Berikutnya
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block">
                          {nextBab.bab || nextBab.nama_bab}
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
