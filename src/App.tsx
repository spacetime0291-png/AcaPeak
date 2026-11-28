import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense, lazy } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { UTBK_SYLLABUS } from './lib/syllabusData';
import { SMA_SUBJECTS } from './lib/smaSyllabusData';
import {
  fetchMaterialById,
  collectDrillingQuestions,
  getSsrInitialMaterial,
  adaptThreeZoneMaterial,
} from './lib/contentLoader';
import type { Material, ThreeZoneMaterial, WorkedExample } from './types/material';
import type { RangkumanBabData, RangkumanIndexData } from './types/rangkuman';
import {
  type ThemeId,
  THEME_STORAGE_KEY,
  isValidTheme,
  applyThemeToDocument,
} from './lib/theme';
import { TopHeader } from './components/navigation/TopHeader';
import { Footer } from './components/navigation/Footer';
import { UtbkSubtestGrid } from './components/home/UtbkSubtestGrid';
import {
  CosmicNebulaGlow,
  CosmicStarsBg,
  NatureDecorationsBg,
  VelvetDecorationsBg,
  PrismDecorationsBg,
} from './components/decorations/LazyDecorations';

// Dynamic importers shared between React.lazy() and pre-hydration/SSR resolution
const importSubtestDetailView = () =>
  import('./components/subtest/SubtestDetailView').then((m) => m.SubtestDetailView);
const importPdfMaterialReader = () =>
  import('./components/reader/PdfMaterialReader').then((m) => m.PdfMaterialReader);
const importActiveDrillingView = () =>
  import('./components/drilling/ActiveDrillingView').then((m) => m.ActiveDrillingView);
const importSmaSubjectGrid = () =>
  import('./components/home/SmaSubjectGrid').then((m) => m.SmaSubjectGrid);
const importSmaSubjectDetailView = () =>
  import('./components/subtest/SmaSubjectDetailView').then((m) => m.SmaSubjectDetailView);
const importRangkumanPage = () =>
  import('./pages/RangkumanPage').then((m) => m.RangkumanPage);
const importAboutPage = () => import('./pages/AboutPage').then((m) => m.AboutPage);
const importPrivacyPolicyPage = () =>
  import('./pages/PrivacyPolicyPage').then((m) => m.PrivacyPolicyPage);
const importTermsPage = () => import('./pages/TermsPage').then((m) => m.TermsPage);
const importContactPage = () => import('./pages/ContactPage').then((m) => m.ContactPage);

const LazySubtestDetailView = lazy(async () => ({ default: await importSubtestDetailView() }));
const LazyPdfMaterialReader = lazy(async () => ({ default: await importPdfMaterialReader() }));
const LazyActiveDrillingView = lazy(async () => ({ default: await importActiveDrillingView() }));
const LazySmaSubjectGrid = lazy(async () => ({ default: await importSmaSubjectGrid() }));
const LazySmaSubjectDetailView = lazy(async () => ({
  default: await importSmaSubjectDetailView(),
}));
const LazyRangkumanPage = lazy(async () => ({ default: await importRangkumanPage() }));
const LazyAboutPage = lazy(async () => ({ default: await importAboutPage() }));
const LazyPrivacyPolicyPage = lazy(async () => ({ default: await importPrivacyPolicyPage() }));
const LazyTermsPage = lazy(async () => ({ default: await importTermsPage() }));
const LazyContactPage = lazy(async () => ({ default: await importContactPage() }));

export interface ResolvedRouteComponents {
  SubtestDetailView?: React.ComponentType<any>;
  PdfMaterialReader?: React.ComponentType<any>;
  ActiveDrillingView?: React.ComponentType<any>;
  SmaSubjectGrid?: React.ComponentType<any>;
  SmaSubjectDetailView?: React.ComponentType<any>;
  RangkumanPage?: React.ComponentType<any>;
  AboutPage?: React.ComponentType<any>;
  PrivacyPolicyPage?: React.ComponentType<any>;
  TermsPage?: React.ComponentType<any>;
  ContactPage?: React.ComponentType<any>;
}

const VALID_DRILLING_SUBTESTS = new Set(['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm']);

/**
 * Pre-resolves the single lazy route chunk matching `pathname` before SSR renderToString
 * or client hydrateRoot, guaranteeing flat SSR HTML and zero Suspense flash on initial load.
 */
export async function resolveRouteComponents(pathname: string): Promise<ResolvedRouteComponents> {
  const clean = (pathname.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase();

  if (clean === '/') return {};
  if (/^\/utbk\/[^/]+\/[^/]+$/.test(clean)) {
    return { PdfMaterialReader: await importPdfMaterialReader() };
  }
  if (/^\/utbk\/[^/]+$/.test(clean)) {
    return { SubtestDetailView: await importSubtestDetailView() };
  }
  if (clean === '/rangkuman' || /^\/rangkuman\/[^/]+$/.test(clean)) {
    return { RangkumanPage: await importRangkumanPage() };
  }
  if (clean === '/sma') {
    return { SmaSubjectGrid: await importSmaSubjectGrid() };
  }
  if (/^\/sma\/[^/]+$/.test(clean)) {
    return { SmaSubjectDetailView: await importSmaSubjectDetailView() };
  }
  const drillingMatch = clean.match(/^\/drilling(?:\/([a-z0-9-]+))?$/);
  if (drillingMatch && (!drillingMatch[1] || VALID_DRILLING_SUBTESTS.has(drillingMatch[1]))) {
    return { ActiveDrillingView: await importActiveDrillingView() };
  }
  if (clean === '/about') return { AboutPage: await importAboutPage() };
  if (clean === '/privacy-policy') return { PrivacyPolicyPage: await importPrivacyPolicyPage() };
  if (clean === '/terms') return { TermsPage: await importTermsPage() };
  if (clean === '/contact') return { ContactPage: await importContactPage() };

  return {};
}

interface AppProps {
  initialMaterial?: Material | ThreeZoneMaterial | null;
  initialRangkumanBab?: RangkumanBabData | null;
  initialRangkumanIndex?: RangkumanIndexData | null;
  preloadedComponents?: ResolvedRouteComponents;
}

function deriveSubtestFromMateriId(materiId: string): string {
  const prefix = materiId.split('-')[0]?.toLowerCase() || 'pu';
  const matched = UTBK_SYLLABUS.find((s) => s.code.toLowerCase() === prefix);
  return matched ? matched.code.toLowerCase() : prefix;
}

function RouteLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center py-24 px-4">
      <div className="text-center bg-white dark:bg-[#0c1326] velvet-surface prism-surface rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm px-8 py-10 max-w-md w-full">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}

function LazyBoundary({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteLoadingFallback />}>{children}</Suspense>;
}

function NotFoundView({ theme }: { theme: ThemeId }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Halaman Tidak Ditemukan (404) | SkolAce';
    }
  }, []);

  return (
    <>
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white dark:bg-[#0c1326] velvet-surface prism-surface border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
            404 • Tidak Ditemukan
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Halaman Tidak Tersedia
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Alamat yang Anda tuju tidak ditemukan atau telah dipindahkan ke struktur URL baru.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition shadow-xs"
            >
              Kembali ke Beranda UTBK
            </Link>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </>
  );
}

// -------------------------------------------------------------
// CLIENT-SIDE BACKWARD-COMPATIBILITY REDIRECT FOR LEGACY QUERY PARAMS
// -------------------------------------------------------------
function LegacyQueryRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = location.search;
    if (!search) return;

    const params = new URLSearchParams(search);
    const materi = params.get('materi');
    const subtest = params.get('subtest');
    const subject = params.get('subject');
    const mode = params.get('mode');
    const tab = params.get('tab');
    const drilling = params.get('drilling');

    if (drilling === 'active') {
      const targetSub = subtest ? `/${subtest.toLowerCase()}` : '';
      navigate(`/drilling${targetSub}`, { replace: true });
      return;
    }
    if (materi) {
      const cleanId = materi.toLowerCase();
      const subCode = deriveSubtestFromMateriId(cleanId);
      navigate(`/utbk/${subCode}/${cleanId}`, { replace: true });
      return;
    }
    if (subtest && location.pathname === '/') {
      const tabQuery = tab === 'drilling' ? '?tab=drilling' : '';
      navigate(`/utbk/${subtest.toLowerCase()}${tabQuery}`, { replace: true });
      return;
    }
    if (subject) {
      navigate(`/sma/${subject.toLowerCase()}`, { replace: true });
      return;
    }
    if (mode === 'sma' && location.pathname === '/') {
      navigate('/sma', { replace: true });
      return;
    }
    if (mode === 'utbk' && location.pathname === '/') {
      navigate('/', { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  return null;
}

function LegacySubtestPathRedirect() {
  const { subtestId = 'pu' } = useParams<{ subtestId: string }>();
  const location = useLocation();
  return <Navigate to={`/utbk/${subtestId.toLowerCase()}${location.search}`} replace />;
}

function LegacyMateriPathRedirect() {
  const { materialId = '' } = useParams<{ materialId: string }>();
  const cleanId = materialId.toLowerCase();
  const subCode = deriveSubtestFromMateriId(cleanId);
  return <Navigate to={`/utbk/${subCode}/${cleanId}`} replace />;
}

// -------------------------------------------------------------
// ROUTE VIEW: HOME DASHBOARD (/)
// -------------------------------------------------------------
interface HomeRouteViewProps {
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
}

function HomeRouteView({ theme, onSelectTheme }: HomeRouteViewProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'SkolAce | Platform Belajar & Drilling UTBK-SNBT Bebas Biaya (Rp0)';
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <>
      <TopHeader mode="utbk" theme={theme} onSelectTheme={onSelectTheme} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pt-3 sm:pt-6 pb-24 sm:pb-32 md:pb-36">
        <UtbkSubtestGrid theme={theme} />
      </main>
      <Footer theme={theme} />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SMA DASHBOARD (/sma)
// -------------------------------------------------------------
function SmaHomeRouteView({
  theme,
  onSelectTheme,
  GridComponent,
}: HomeRouteViewProps & { GridComponent: React.ComponentType<any> }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Kurikulum Mata Pelajaran SMA | SkolAce';
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <>
      <TopHeader mode="sma" theme={theme} onSelectTheme={onSelectTheme} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pt-3 sm:pt-6 pb-24 sm:pb-32 md:pb-36">
        <GridComponent theme={theme} />
      </main>
      <Footer theme={theme} />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SMA SUBJECT DETAIL (/sma/:subject)
// -------------------------------------------------------------
function SmaSubjectRouteView({
  theme,
  onSelectTheme,
  DetailComponent,
}: HomeRouteViewProps & { DetailComponent: React.ComponentType<any> }) {
  const { subject = '' } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  const currentSubject = useMemo(() => {
    return (
      SMA_SUBJECTS.find((s) => s.id.toLowerCase() === subject.toLowerCase()) ||
      SMA_SUBJECTS[0]
    );
  }, [subject]);

  useEffect(() => {
    if (typeof document !== 'undefined' && currentSubject) {
      document.title = `${currentSubject.name} - Materi SMA | SkolAce`;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentSubject]);

  return (
    <>
      <main className="flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-5">
        <DetailComponent
          subject={currentSubject}
          theme={theme}
          onSelectTheme={onSelectTheme}
          onBackToHome={() => navigate('/sma')}
          onSelectTopic={() => {}}
        />
      </main>
      <Footer theme={theme} />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SUBTEST DETAIL (/utbk/:subtest)
// -------------------------------------------------------------
interface SubtestRouteViewProps {
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  DetailComponent: React.ComponentType<any>;
  onStartDrilling: (
    subchapterIds: string[],
    questionCount: number,
    timerMins: number | null,
    orderMode?: 'blocking' | 'interleaved'
  ) => Promise<void>;
}

function SubtestRouteView({
  theme,
  onSelectTheme,
  DetailComponent,
  onStartDrilling,
}: SubtestRouteViewProps) {
  const { subtest } = useParams<{ subtest: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSubtest = useMemo(() => {
    return (
      UTBK_SYLLABUS.find(
        (s) =>
          s.code.toLowerCase() === subtest?.toLowerCase() ||
          s.id.toLowerCase() === subtest?.toLowerCase()
      ) || UTBK_SYLLABUS[0]
    );
  }, [subtest]);

  const tabParam = searchParams.get('tab');
  const activeTab: 'materi' | 'drilling' | 'pembahasan' =
    tabParam === 'drilling' ? 'drilling' : tabParam === 'pembahasan' ? 'pembahasan' : 'materi';
  const selectedTopicId = searchParams.get('selected') || searchParams.get('topic') || undefined;

  useEffect(() => {
    if (typeof document !== 'undefined' && currentSubtest) {
      document.title = `${currentSubtest.name || currentSubtest.title} (${currentSubtest.code}) | SkolAce`;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentSubtest]);

  return (
    <>
      <main className="flex-1 w-full px-2.5 sm:px-5 py-2 sm:py-4">
        <DetailComponent
          subtest={currentSubtest}
          activeTab={activeTab}
          initialSelectedTopicId={selectedTopicId}
          theme={theme}
          onSelectTheme={onSelectTheme}
          onTabChange={(newTab: 'materi' | 'drilling' | 'pembahasan') => {
            setSearchParams(newTab === 'materi' ? {} : { tab: newTab });
          }}
          onBackToHome={() => {
            navigate('/');
          }}
          onSelectSubtest={(newCode: string) => {
            navigate(`/utbk/${newCode.toLowerCase()}`);
          }}
          onStartDrilling={onStartDrilling}
        />
      </main>
      {activeTab !== 'drilling' && <Footer theme={theme} />}
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: MATERIAL READER (/utbk/:subtest/:materiId)
// -------------------------------------------------------------
interface MaterialRouteViewProps {
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  ReaderComponent: React.ComponentType<any>;
  initialMaterial?: Material | ThreeZoneMaterial | null;
}

function MaterialRouteView({
  theme,
  onSelectTheme,
  ReaderComponent,
  initialMaterial: propInitialMaterial,
}: MaterialRouteViewProps) {
  const { subtest = '', materiId = '' } = useParams<{ subtest: string; materiId: string }>();
  const navigate = useNavigate();

  const initCandidateRaw = propInitialMaterial || getSsrInitialMaterial();
  const initCandidate: Material | null = useMemo(() => {
    if (!initCandidateRaw) return null;
    if ('metadata' in initCandidateRaw && initCandidateRaw.metadata) {
      return initCandidateRaw as Material;
    }
    if ('kode_subbab' in initCandidateRaw) {
      return adaptThreeZoneMaterial(initCandidateRaw as unknown as ThreeZoneMaterial);
    }
    return null;
  }, [initCandidateRaw]);

  const matchesInitial =
    initCandidate &&
    initCandidate.metadata &&
    initCandidate.metadata.id.toLowerCase() === materiId.toLowerCase();

  const [activeMaterial, setActiveMaterial] = useState<Material | null>(() => {
    if (matchesInitial) return initCandidate;
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(!matchesInitial);

  useEffect(() => {
    if (!materiId) return;

    if (activeMaterial && activeMaterial.metadata.id.toLowerCase() === materiId.toLowerCase()) {
      if (typeof document !== 'undefined') {
        document.title = `${activeMaterial.metadata.subtest} - ${activeMaterial.metadata.title} | SkolAce`;
      }
      return;
    }

    setIsLoading(true);
    fetchMaterialById(materiId)
      .then((data) => {
        setActiveMaterial(data);
        if (typeof document !== 'undefined') {
          document.title = `${data.metadata.subtest} - ${data.metadata.title} | SkolAce`;
        }
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      })
      .catch((err) => {
        console.error('Failed to load material', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [materiId, activeMaterial]);

  const currentSubtest = useMemo(() => {
    const code = (
      activeMaterial?.metadata?.subtest ||
      subtest ||
      deriveSubtestFromMateriId(materiId)
    ).toLowerCase();
    return UTBK_SYLLABUS.find((s) => s.code.toLowerCase() === code) || UTBK_SYLLABUS[0];
  }, [activeMaterial, subtest, materiId]);

  const currentSubtestSubchapters = useMemo(() => {
    return currentSubtest.modules
      ? currentSubtest.modules.flatMap((m) =>
          m.subtopics.map((s) => ({
            id: s.id,
            title: s.title,
            subchapter_num: s.id,
          }))
        )
      : (currentSubtest.chapters || []).flatMap((c) => c.subchapters);
  }, [currentSubtest]);

  const currentMateriIndex = currentSubtestSubchapters.findIndex(
    (s) => s.id.toLowerCase() === materiId.toLowerCase()
  );
  const hasPrev = currentMateriIndex > 0;
  const hasNext =
    currentMateriIndex !== -1 && currentMateriIndex < currentSubtestSubchapters.length - 1;

  const subtestCodeLower = currentSubtest.code.toLowerCase();
  const prevHref = hasPrev
    ? `/utbk/${subtestCodeLower}/${currentSubtestSubchapters[currentMateriIndex - 1].id.toLowerCase()}`
    : undefined;
  const nextHref = hasNext
    ? `/utbk/${subtestCodeLower}/${currentSubtestSubchapters[currentMateriIndex + 1].id.toLowerCase()}`
    : undefined;

  const handleStartDrillingTopic = (subchapterId: string) => {
    navigate(`/utbk/${subtestCodeLower}?tab=drilling&selected=${subchapterId}`);
  };

  return (
    <>
      <main className="flex-1 w-full">
        {isLoading || !activeMaterial ? (
          <div className="py-24 text-center bg-white dark:bg-[#0c1326] velvet-surface prism-surface rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto my-6">
            <div className="inline-block w-9 h-9 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-semibold">
              Menyiapkan naskah materi &amp; rumus...
            </p>
          </div>
        ) : (
          <ReaderComponent
            material={activeMaterial}
            theme={theme}
            onSelectTheme={onSelectTheme}
            prevHref={prevHref}
            nextHref={nextHref}
            onPrevSubchapter={prevHref ? () => navigate(prevHref) : undefined}
            onNextSubchapter={nextHref ? () => navigate(nextHref) : undefined}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onStartDrillingThisTopic={handleStartDrillingTopic}
          />
        )}
      </main>
      <Footer theme={theme} />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: ACTIVE DRILLING SESSION (/drilling & /drilling/:subtest)
// -------------------------------------------------------------
interface DrillingRouteViewProps {
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  DrillingComponent: React.ComponentType<any>;
  drillingQuestions: WorkedExample[];
  setDrillingQuestions: React.Dispatch<React.SetStateAction<WorkedExample[]>>;
  drillingTimerMinutes: number | null;
  drillingSessionId: number;
}

function DrillingRouteView({
  theme,
  onSelectTheme,
  DrillingComponent,
  drillingQuestions,
  setDrillingQuestions,
  drillingTimerMinutes,
  drillingSessionId,
}: DrillingRouteViewProps) {
  const { subtest } = useParams<{ subtest?: string }>();
  const navigate = useNavigate();
  const normalizedSubtest = (subtest ?? 'pu').toLowerCase();
  const isValidSubtest = VALID_DRILLING_SUBTESTS.has(normalizedSubtest);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(
    () => isValidSubtest && drillingQuestions.length === 0
  );

  useEffect(() => {
    setQuestionIndex(0);
  }, [drillingSessionId]);

  useEffect(() => {
    if (!isValidSubtest) return;
    if (typeof document !== 'undefined') {
      document.title = `Sesi Drilling Soal #${questionIndex + 1} | SkolAce`;
    }
  }, [isValidSubtest, questionIndex]);

  useEffect(() => {
    if (!isValidSubtest) return;
    if (drillingQuestions.length === 0) {
      const sub = UTBK_SYLLABUS.find(
        (s) => s.code.toLowerCase() === normalizedSubtest
      );
      if (!sub) return;
      const initialSubIds = sub.modules
        ? sub.modules.flatMap((m) => m.subtopics.map((s) => s.id))
        : (sub.chapters || []).flatMap((c) => c.subchapters.map((s) => s.id));

      setIsLoadingSession(true);
      collectDrillingQuestions(initialSubIds, 10)
        .then((qs) => {
          setDrillingQuestions(qs);
        })
        .catch((err) => {
          console.error('Failed to load drilling questions', err);
        })
        .finally(() => {
          setIsLoadingSession(false);
        });
    }
  }, [isValidSubtest, normalizedSubtest, drillingQuestions.length, setDrillingQuestions]);

  if (!isValidSubtest) {
    return <NotFoundView theme={theme} />;
  }

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-5">
      <DrillingComponent
        key={drillingSessionId}
        questions={drillingQuestions}
        currentQuestionIndex={questionIndex}
        timerMinutes={drillingTimerMinutes}
        primarySubtest={normalizedSubtest.toUpperCase()}
        isLoading={isLoadingSession}
        theme={theme}
        onSelectTheme={onSelectTheme}
        onNavigateQuestion={(newIndex: number) => {
          setQuestionIndex(newIndex);
        }}
        onExitDrilling={() => {
          navigate(`/utbk/${normalizedSubtest}?tab=drilling`);
        }}
        onOpenPembahasanHistory={() => {
          navigate(`/utbk/${normalizedSubtest}?tab=pembahasan`);
        }}
      />
    </main>
  );
}

// -------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------
export default function App({
  initialMaterial,
  initialRangkumanBab,
  initialRangkumanIndex,
  preloadedComponents = {},
}: AppProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [drillingQuestions, setDrillingQuestions] = useState<WorkedExample[]>([]);
  const [drillingTimerMinutes, setDrillingTimerMinutes] = useState<number | null>(15);
  const [drillingSessionId, setDrillingSessionId] = useState<number>(1);

  const [theme, setTheme] = useState<ThemeId>('light');
  const hasLoadedThemeRef = useRef(false);

  useEffect(() => {
    let initial: ThemeId = 'light';
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (isValidTheme(saved)) {
        initial = saved;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initial = 'dark';
      }
    } catch {}
    hasLoadedThemeRef.current = true;
    setTheme(initial);
    applyThemeToDocument(initial);
  }, []);

  useEffect(() => {
    if (!hasLoadedThemeRef.current) return;
    applyThemeToDocument(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const handleSelectTheme = useCallback((nextTheme: ThemeId) => {
    setTheme(nextTheme);
  }, []);

  const handleStartDrilling = async (
    subchapterIds: string[],
    questionCount: number,
    timerMins: number | null,
    orderMode: 'blocking' | 'interleaved' = 'blocking'
  ) => {
    setDrillingTimerMinutes(timerMins);
    const qs = await collectDrillingQuestions(subchapterIds, questionCount, orderMode);
    setDrillingQuestions(qs);
    setDrillingSessionId((id) => id + 1);
    const subtestCode = subchapterIds[0]?.split('-')[0]?.toLowerCase() || 'pu';
    navigate(`/drilling/${subtestCode}`);
  };

  const SubtestComp = preloadedComponents.SubtestDetailView || LazySubtestDetailView;
  const ReaderComp = preloadedComponents.PdfMaterialReader || LazyPdfMaterialReader;
  const DrillingComp = preloadedComponents.ActiveDrillingView || LazyActiveDrillingView;
  const SmaGridComp = preloadedComponents.SmaSubjectGrid || LazySmaSubjectGrid;
  const SmaDetailComp = preloadedComponents.SmaSubjectDetailView || LazySmaSubjectDetailView;
  const RangkumanComp = preloadedComponents.RangkumanPage || LazyRangkumanPage;
  const AboutComp = preloadedComponents.AboutPage || LazyAboutPage;
  const PrivacyComp = preloadedComponents.PrivacyPolicyPage || LazyPrivacyPolicyPage;
  const TermsComp = preloadedComponents.TermsPage || LazyTermsPage;
  const ContactComp = preloadedComponents.ContactPage || LazyContactPage;

  const cleanPathname = (location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
  const drillingPathMatch = cleanPathname.match(/^\/drilling(?:\/([a-z0-9-]+))?$/);
  const isDrillingView =
    drillingPathMatch !== null &&
    (!drillingPathMatch[1] || VALID_DRILLING_SUBTESTS.has(drillingPathMatch[1]));
  const isMateriView =
    /^\/utbk\/[^/]+\/[^/]+/.test(location.pathname) || location.pathname.startsWith('/materi');
  const isRangkumanView = location.pathname.startsWith('/rangkuman');
  const isAmbientThemeView = !isDrillingView && !isMateriView && !isRangkumanView;

  const selectionClass =
    theme === 'velvet'
      ? 'selection:bg-[#FF8A6B] selection:text-[#1E0F17]'
      : 'selection:bg-cyan-500 selection:text-white';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-x-clip app-shell-bg ${selectionClass}`}>
      <LegacyQueryRedirect />

      {isAmbientThemeView ? (
        theme === 'dark' ? (
          <>
            <CosmicNebulaGlow />
            <CosmicStarsBg />
          </>
        ) : theme === 'velvet' ? (
          <VelvetDecorationsBg />
        ) : theme === 'prism' ? (
          <PrismDecorationsBg />
        ) : (
          <NatureDecorationsBg />
        )
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0 non-ambient-backdrop" />
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          {/* 1. Beranda */}
          <Route
            path="/"
            element={<HomeRouteView theme={theme} onSelectTheme={handleSelectTheme} />}
          />

          {/* 2. UTBK Subtest Detail & Material Reader */}
          <Route
            path="/utbk/:subtest"
            element={
              preloadedComponents.SubtestDetailView ? (
                <SubtestRouteView
                  theme={theme}
                  onSelectTheme={handleSelectTheme}
                  DetailComponent={SubtestComp}
                  onStartDrilling={handleStartDrilling}
                />
              ) : (
                <LazyBoundary>
                  <SubtestRouteView
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    DetailComponent={SubtestComp}
                    onStartDrilling={handleStartDrilling}
                  />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/utbk/:subtest/:materiId"
            element={
              preloadedComponents.PdfMaterialReader ? (
                <MaterialRouteView
                  theme={theme}
                  onSelectTheme={handleSelectTheme}
                  ReaderComponent={ReaderComp}
                  initialMaterial={initialMaterial}
                />
              ) : (
                <LazyBoundary>
                  <MaterialRouteView
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    ReaderComponent={ReaderComp}
                    initialMaterial={initialMaterial}
                  />
                </LazyBoundary>
              )
            }
          />

          {/* 3. SMA Curriculum Routes */}
          <Route
            path="/sma"
            element={
              preloadedComponents.SmaSubjectGrid ? (
                <SmaHomeRouteView theme={theme} onSelectTheme={handleSelectTheme} GridComponent={SmaGridComp} />
              ) : (
                <LazyBoundary>
                  <SmaHomeRouteView theme={theme} onSelectTheme={handleSelectTheme} GridComponent={SmaGridComp} />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/sma/:subject"
            element={
              preloadedComponents.SmaSubjectDetailView ? (
                <SmaSubjectRouteView
                  theme={theme}
                  onSelectTheme={handleSelectTheme}
                  DetailComponent={SmaDetailComp}
                />
              ) : (
                <LazyBoundary>
                  <SmaSubjectRouteView
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    DetailComponent={SmaDetailComp}
                  />
                </LazyBoundary>
              )
            }
          />

          {/* 4. Rangkuman Bab / Cheat Sheet */}
          <Route
            path="/rangkuman"
            element={
              preloadedComponents.RangkumanPage ? (
                <>
                  <RangkumanComp
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    initialIndexData={initialRangkumanIndex}
                  />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <RangkumanComp
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    initialIndexData={initialRangkumanIndex}
                  />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/rangkuman/:babId"
            element={
              preloadedComponents.RangkumanPage ? (
                <>
                  <RangkumanComp
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    initialBabData={initialRangkumanBab}
                    initialIndexData={initialRangkumanIndex}
                  />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <RangkumanComp
                    theme={theme}
                    onSelectTheme={handleSelectTheme}
                    initialBabData={initialRangkumanBab}
                    initialIndexData={initialRangkumanIndex}
                  />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />

          {/* 5. Active Drilling (Client-Side SPA) */}
          <Route
            path="/drilling"
            element={
              <LazyBoundary>
                <DrillingRouteView
                  theme={theme}
                  onSelectTheme={handleSelectTheme}
                  DrillingComponent={DrillingComp}
                  drillingQuestions={drillingQuestions}
                  setDrillingQuestions={setDrillingQuestions}
                  drillingTimerMinutes={drillingTimerMinutes}
                  drillingSessionId={drillingSessionId}
                />
              </LazyBoundary>
            }
          />
          <Route
            path="/drilling/:subtest"
            element={
              <LazyBoundary>
                <DrillingRouteView
                  theme={theme}
                  onSelectTheme={handleSelectTheme}
                  DrillingComponent={DrillingComp}
                  drillingQuestions={drillingQuestions}
                  setDrillingQuestions={setDrillingQuestions}
                  drillingTimerMinutes={drillingTimerMinutes}
                  drillingSessionId={drillingSessionId}
                />
              </LazyBoundary>
            }
          />

          {/* 6. Legal & Trust Pages */}
          <Route
            path="/about"
            element={
              preloadedComponents.AboutPage ? (
                <>
                  <AboutComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <AboutComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/privacy-policy"
            element={
              preloadedComponents.PrivacyPolicyPage ? (
                <>
                  <PrivacyComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <PrivacyComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/terms"
            element={
              preloadedComponents.TermsPage ? (
                <>
                  <TermsComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <TermsComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />
          <Route
            path="/contact"
            element={
              preloadedComponents.ContactPage ? (
                <>
                  <ContactComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </>
              ) : (
                <LazyBoundary>
                  <ContactComp theme={theme} onSelectTheme={handleSelectTheme} />
                  <Footer theme={theme} />
                </LazyBoundary>
              )
            }
          />

          {/* 7. Backward-compatible Legacy Path Redirects */}
          <Route path="/subtest/:subtestId" element={<LegacySubtestPathRedirect />} />
          <Route path="/materi/:materialId" element={<LegacyMateriPathRedirect />} />

          {/* 404 Not Found View */}
          <Route path="*" element={<NotFoundView theme={theme} />} />
        </Routes>
      </div>
    </div>
  );
}
