import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import {
  Routes,
  Route,
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
import { TopHeader } from './components/navigation/TopHeader';
import { Footer } from './components/navigation/Footer';
import { UtbkSubtestGrid } from './components/home/UtbkSubtestGrid';
import { SmaSubjectGrid } from './components/home/SmaSubjectGrid';
import { SubtestDetailView } from './components/subtest/SubtestDetailView';
import { SmaSubjectDetailView } from './components/subtest/SmaSubjectDetailView';
import { PdfMaterialReader } from './components/reader/PdfMaterialReader';
import {
  CosmicNebulaGlow,
  CosmicStarsBg,
  NatureDecorationsBg,
} from './components/decorations/LazyDecorations';

// Lazy-load client-only interactive Drilling engine so initial public pages stay lightweight
const ActiveDrillingView = lazy(() =>
  import('./components/drilling/ActiveDrillingView').then((m) => ({
    default: m.ActiveDrillingView,
  }))
);

// Legal & Rangkuman pages
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { RangkumanPage } from './pages/RangkumanPage';
import type { RangkumanBabData, RangkumanIndexData } from './types/rangkuman';

interface AppProps {
  initialMaterial?: Material | ThreeZoneMaterial | null;
  initialRangkumanBab?: RangkumanBabData | null;
  initialRangkumanIndex?: RangkumanIndexData | null;
}

function deriveSubtestFromMateriId(materiId: string): string {
  const prefix = materiId.split('-')[0]?.toLowerCase() || 'pu';
  const matched = UTBK_SYLLABUS.find((s) => s.code.toLowerCase() === prefix);
  return matched ? matched.code.toLowerCase() : prefix;
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

// Legacy path redirects (/subtest/:id, /materi/:id -> /utbk/...)
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
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function HomeRouteView({ theme, onToggleTheme }: HomeRouteViewProps) {
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
      <TopHeader
        mode="utbk"
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-6">
        <UtbkSubtestGrid theme={theme} />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SMA DASHBOARD (/sma)
// -------------------------------------------------------------
function SmaHomeRouteView({ theme, onToggleTheme }: HomeRouteViewProps) {
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
      <TopHeader
        mode="sma"
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-6">
        <SmaSubjectGrid theme={theme} />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SMA SUBJECT DETAIL (/sma/:subject)
// -------------------------------------------------------------
function SmaSubjectRouteView({ theme, onToggleTheme }: HomeRouteViewProps) {
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
        <SmaSubjectDetailView
          subject={currentSubject}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onBackToHome={() => navigate('/sma')}
          onSelectTopic={() => {}}
        />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SUBTEST DETAIL (/utbk/:subtest)
// -------------------------------------------------------------
interface SubtestRouteViewProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onStartDrilling: (
    subchapterIds: string[],
    questionCount: number,
    timerMins: number | null,
    orderMode?: 'blocking' | 'interleaved'
  ) => Promise<void>;
}

function SubtestRouteView({ theme, onToggleTheme, onStartDrilling }: SubtestRouteViewProps) {
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

  const activeTab = searchParams.get('tab') === 'drilling' ? 'drilling' : 'materi';
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
      <main className="flex-1 w-full px-1 sm:px-3 py-2 sm:py-4">
        <SubtestDetailView
          subtest={currentSubtest}
          activeTab={activeTab}
          initialSelectedTopicId={selectedTopicId}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onTabChange={(newTab) => {
            setSearchParams(newTab === 'drilling' ? { tab: 'drilling' } : {});
          }}
          onBackToHome={() => {
            navigate('/');
          }}
          onSelectSubtest={(newCode) => {
            navigate(`/utbk/${newCode.toLowerCase()}`);
          }}
          onStartDrilling={onStartDrilling}
        />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: MATERIAL READER (/utbk/:subtest/:materiId)
// -------------------------------------------------------------
interface MaterialRouteViewProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  initialMaterial?: Material | ThreeZoneMaterial | null;
}

function MaterialRouteView({
  theme,
  onToggleTheme,
  initialMaterial: propInitialMaterial,
}: MaterialRouteViewProps) {
  const { subtest = '', materiId = '' } = useParams<{ subtest: string; materiId: string }>();
  const navigate = useNavigate();

  // Pick initial material synchronously from prop, SSR injection, or #__PAGE_DATA__
  const ssrMat = getSsrInitialMaterial();
  const initCandidateRaw = propInitialMaterial || ssrMat;
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

  // Derived subtest items for next/prev navigation
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
          <div className="py-24 text-center bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto my-6">
            <div className="inline-block w-9 h-9 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-semibold">
              Menyiapkan naskah materi &amp; rumus...
            </p>
          </div>
        ) : (
          <PdfMaterialReader
            material={activeMaterial}
            theme={theme}
            onToggleTheme={onToggleTheme}
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
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: ACTIVE DRILLING SESSION (/drilling & /drilling/:subtest)
// Client-side SPA only; NO Footer, NO AdSlot (Distraction-free exam simulation)
// -------------------------------------------------------------
interface DrillingRouteViewProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  drillingQuestions: WorkedExample[];
  setDrillingQuestions: React.Dispatch<React.SetStateAction<WorkedExample[]>>;
  drillingTimerMinutes: number | null;
}

function DrillingRouteView({
  theme,
  onToggleTheme,
  drillingQuestions,
  setDrillingQuestions,
  drillingTimerMinutes,
}: DrillingRouteViewProps) {
  const { subtest = 'pu' } = useParams<{ subtest?: string }>();
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `Sesi Drilling Soal #${questionIndex + 1} | SkolAce`;
    }
  }, [questionIndex]);

  // Fallback: If user refreshed directly on /drilling or /drilling/:subtest
  useEffect(() => {
    if (drillingQuestions.length === 0) {
      const sub =
        UTBK_SYLLABUS.find(
          (s) => s.code.toLowerCase() === subtest.toLowerCase()
        ) || UTBK_SYLLABUS[0];
      const initialSubIds = sub.modules
        ? sub.modules.flatMap((m) => m.subtopics.map((s) => s.id))
        : (sub.chapters || []).flatMap((c) => c.subchapters.map((s) => s.id));

      collectDrillingQuestions(initialSubIds, 10).then((qs) => {
        setDrillingQuestions(qs);
      });
    }
  }, [subtest, drillingQuestions.length, setDrillingQuestions]);

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-6">
      <Suspense
        fallback={
          <div className="py-24 text-center bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto my-6">
            <div className="inline-block w-9 h-9 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-semibold">
              Menyiapkan mode latihan soal...
            </p>
          </div>
        }
      >
        <ActiveDrillingView
          questions={drillingQuestions}
          currentQuestionIndex={questionIndex}
          timerMinutes={drillingTimerMinutes}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onNavigateQuestion={(newIndex) => {
            setQuestionIndex(newIndex);
          }}
          onExitDrilling={() => {
            navigate(`/utbk/${subtest.toLowerCase()}?tab=drilling`);
          }}
        />
      </Suspense>
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
}: AppProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Drilling session state
  const [drillingQuestions, setDrillingQuestions] = useState<WorkedExample[]>([]);
  const [drillingTimerMinutes, setDrillingTimerMinutes] = useState<number | null>(15);

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = localStorage.getItem('kognitedu_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('kognitedu_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
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
    const subtestCode = subchapterIds[0]?.split('-')[0]?.toLowerCase() || 'pu';
    navigate(`/drilling/${subtestCode}`);
  };

  const isDrillingView = location.pathname.startsWith('/drilling');
  const isMateriView =
    /^\/utbk\/[^/]+\/[^/]+/.test(location.pathname) || location.pathname.startsWith('/materi');
  const isRangkumanView = location.pathname.startsWith('/rangkuman');
  const isAmbientThemeView = !isDrillingView && !isMateriView && !isRangkumanView;
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen text-slate-900 dark:text-[#f8fafc] flex flex-col selection:bg-cyan-500 selection:text-white font-sans relative overflow-x-clip bg-[#fdfbf7] dark:bg-[#070913]">
      <LegacyQueryRedirect />

      {/* Non-critical ambient decorations loaded lazily after main hydration */}
      {isAmbientThemeView ? (
        isDark ? (
          <>
            <CosmicNebulaGlow />
            <CosmicStarsBg />
          </>
        ) : (
          <NatureDecorationsBg />
        )
      ) : (
        isDark ? (
          <div className="fixed inset-0 pointer-events-none z-0 bg-[#070913]" />
        ) : (
          <div className="fixed inset-0 pointer-events-none z-0 bg-[#fdfbf7]" />
        )
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          {/* 1. Beranda */}
          <Route
            path="/"
            element={<HomeRouteView theme={theme} onToggleTheme={toggleTheme} />}
          />

          {/* 2. UTBK Subtest Detail & Material Reader */}
          <Route
            path="/utbk/:subtest"
            element={
              <SubtestRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                onStartDrilling={handleStartDrilling}
              />
            }
          />
          <Route
            path="/utbk/:subtest/:materiId"
            element={
              <MaterialRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                initialMaterial={initialMaterial}
              />
            }
          />

          {/* 3. SMA Curriculum Routes */}
          <Route
            path="/sma"
            element={<SmaHomeRouteView theme={theme} onToggleTheme={toggleTheme} />}
          />
          <Route
            path="/sma/:subject"
            element={<SmaSubjectRouteView theme={theme} onToggleTheme={toggleTheme} />}
          />

          {/* 4. Rangkuman Bab / Cheat Sheet */}
          <Route
            path="/rangkuman"
            element={
              <>
                <RangkumanPage
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  initialIndexData={initialRangkumanIndex}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/rangkuman/:babId"
            element={
              <>
                <RangkumanPage
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  initialBabData={initialRangkumanBab}
                  initialIndexData={initialRangkumanIndex}
                />
                <Footer />
              </>
            }
          />

          {/* 5. Active Drilling (Client-Side SPA) */}
          <Route
            path="/drilling"
            element={
              <DrillingRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                drillingQuestions={drillingQuestions}
                setDrillingQuestions={setDrillingQuestions}
                drillingTimerMinutes={drillingTimerMinutes}
              />
            }
          />
          <Route
            path="/drilling/:subtest"
            element={
              <DrillingRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                drillingQuestions={drillingQuestions}
                setDrillingQuestions={setDrillingQuestions}
                drillingTimerMinutes={drillingTimerMinutes}
              />
            }
          />

          {/* 6. Legal & Trust Pages */}
          <Route
            path="/about"
            element={
              <>
                <AboutPage theme={theme} onToggleTheme={toggleTheme} />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <PrivacyPolicyPage theme={theme} onToggleTheme={toggleTheme} />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <TermsPage theme={theme} onToggleTheme={toggleTheme} />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <ContactPage theme={theme} onToggleTheme={toggleTheme} />
                <Footer />
              </>
            }
          />

          {/* 7. Backward-compatible Legacy Path Redirects */}
          <Route path="/subtest/:subtestId" element={<LegacySubtestPathRedirect />} />
          <Route path="/materi/:materialId" element={<LegacyMateriPathRedirect />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
