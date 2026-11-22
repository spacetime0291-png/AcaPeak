import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { SubtestDetailView } from './components/subtest/SubtestDetailView';
import { PdfMaterialReader } from './components/reader/PdfMaterialReader';
import { ActiveDrillingView } from './components/drilling/ActiveDrillingView';
import { CosmicNebulaGlow, CosmicStarsBg } from './components/decorations/CosmicDecorations';
import { NatureDecorationsBg } from './components/decorations/NatureDecorations';

// Legal pages
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';

interface AppProps {
  initialMaterial?: Material | ThreeZoneMaterial | null;
}

// -------------------------------------------------------------
// CLIENT-SIDE FALLBACK REDIRECT FOR LEGACY QUERY PARAMETERS
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
    const tab = params.get('tab');
    const drilling = params.get('drilling');

    if (drilling === 'active') {
      navigate(`/drilling/${(subtest || 'pu').toLowerCase()}`, { replace: true });
      return;
    }
    if (materi) {
      navigate(`/materi/${materi.toLowerCase()}`, { replace: true });
      return;
    }
    if (subtest) {
      const tabQuery = tab === 'drilling' ? '?tab=drilling' : '';
      navigate(`/subtest/${subtest.toLowerCase()}${tabQuery}`, { replace: true });
      return;
    }
  }, [location.search, navigate]);

  return null;
}

// -------------------------------------------------------------
// ROUTE VIEW: HOME DASHBOARD (/)
// -------------------------------------------------------------
interface HomeRouteViewProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function HomeRouteView({ theme, onToggleTheme }: HomeRouteViewProps) {
  const navigate = useNavigate();

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
        onModeChange={() => {}}
        onSelectUtbkMaterial={(_code, materialId) => {
          navigate(`/materi/${materialId}`);
        }}
        onSelectSmaSubject={() => {}}
      />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-6">
        <UtbkSubtestGrid
          theme={theme}
          onSelectSubtest={(subtestCode) => {
            navigate(`/subtest/${subtestCode.toLowerCase()}`);
          }}
        />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: SUBTEST DETAIL (/subtest/:subtestId)
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
  const { subtestId } = useParams<{ subtestId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSubtest = useMemo(() => {
    return (
      UTBK_SYLLABUS.find(
        (s) =>
          s.code.toLowerCase() === subtestId?.toLowerCase() ||
          s.id.toLowerCase() === subtestId?.toLowerCase()
      ) || UTBK_SYLLABUS[0]
    );
  }, [subtestId]);

  const activeTab = searchParams.get('tab') === 'drilling' ? 'drilling' : 'materi';
  const selectedTopicId = searchParams.get('selected') || searchParams.get('topic') || undefined;

  useEffect(() => {
    if (typeof document !== 'undefined' && currentSubtest) {
      document.title = `${currentSubtest.name} (${currentSubtest.code}) | SkolAce`;
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
            setSearchParams({ tab: newTab });
          }}
          onBackToHome={() => {
            navigate('/');
          }}
          onSelectSubtest={(newCode) => {
            navigate(`/subtest/${newCode.toLowerCase()}`);
          }}
          onSelectMaterial={(materialId) => {
            navigate(`/materi/${materialId}`);
          }}
          onStartDrilling={onStartDrilling}
        />
      </main>
      <Footer />
    </>
  );
}

// -------------------------------------------------------------
// ROUTE VIEW: MATERIAL READER (/materi/:materialId)
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
  const { materialId = '' } = useParams<{ materialId: string }>();
  const navigate = useNavigate();

  // Pick initial material from prop, SSR injection, or window.__INITIAL_DATA__
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
    initCandidate.metadata.id.toLowerCase() === materialId.toLowerCase();

  const [activeMaterial, setActiveMaterial] = useState<Material | null>(() => {
    if (matchesInitial) return initCandidate;
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(!matchesInitial);

  useEffect(() => {
    if (!materialId) return;

    if (activeMaterial && activeMaterial.metadata.id.toLowerCase() === materialId.toLowerCase()) {
      if (typeof document !== 'undefined') {
        document.title = `${activeMaterial.metadata.subtest} - ${activeMaterial.metadata.title} | SkolAce`;
      }
      return;
    }

    setIsLoading(true);
    fetchMaterialById(materialId)
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
  }, [materialId, activeMaterial]);

  // Derived subtest items for next/prev navigation
  const currentSubtest = useMemo(() => {
    if (!activeMaterial) return UTBK_SYLLABUS[0];
    const code = activeMaterial.metadata.subtest.toLowerCase();
    return UTBK_SYLLABUS.find((s) => s.code.toLowerCase() === code) || UTBK_SYLLABUS[0];
  }, [activeMaterial]);

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
    (s) => s.id.toLowerCase() === materialId.toLowerCase()
  );
  const hasPrev = currentMateriIndex > 0;
  const hasNext =
    currentMateriIndex !== -1 && currentMateriIndex < currentSubtestSubchapters.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      navigate(`/materi/${currentSubtestSubchapters[currentMateriIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      navigate(`/materi/${currentSubtestSubchapters[currentMateriIndex + 1].id}`);
    }
  };

  const handleStartDrillingTopic = (subchapterId: string) => {
    const code = activeMaterial
      ? activeMaterial.metadata.subtest.toLowerCase()
      : 'pu';
    navigate(`/subtest/${code}?tab=drilling&selected=${subchapterId}`);
  };

  return (
    <>
      <main className="flex-1 w-full">
        {isLoading || !activeMaterial ? (
          <div className="py-24 text-center bg-white dark:bg-[#0c1326] rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto my-6">
            <div className="inline-block w-9 h-9 border-4 border-indigo-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-semibold">
              Menyiapkan naskah materi & rumus...
            </p>
          </div>
        ) : (
          <PdfMaterialReader
            material={activeMaterial}
            theme={theme}
            onToggleTheme={onToggleTheme}
            onBackToSubtest={() => {
              navigate(`/subtest/${activeMaterial.metadata.subtest.toLowerCase()}`);
            }}
            onPrevSubchapter={handlePrev}
            onNextSubchapter={handleNext}
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
// ROUTE VIEW: ACTIVE DRILLING SESSION (/drilling/:subtestId)
// NO Footer, NO AdSlot (Distraction-free exam simulation)
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
  const { subtestId = 'pu' } = useParams<{ subtestId: string }>();
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `Sesi Drilling Soal #${questionIndex + 1} | SkolAce`;
    }
  }, [questionIndex]);

  // Fallback: If user refreshed directly on /drilling/:subtestId
  useEffect(() => {
    if (drillingQuestions.length === 0) {
      const sub =
        UTBK_SYLLABUS.find(
          (s) => s.code.toLowerCase() === subtestId.toLowerCase()
        ) || UTBK_SYLLABUS[0];
      const initialSubIds = sub.modules
        ? sub.modules.flatMap((m) => m.subtopics.map((s) => s.id))
        : (sub.chapters || []).flatMap((c) => c.subchapters.map((s) => s.id));

      collectDrillingQuestions(initialSubIds, 10).then((qs) => {
        setDrillingQuestions(qs);
      });
    }
  }, [subtestId, drillingQuestions.length, setDrillingQuestions]);

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-6">
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
          navigate(`/subtest/${subtestId.toLowerCase()}?tab=drilling`);
        }}
      />
    </main>
  );
}

// -------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------
export default function App({ initialMaterial }: AppProps) {
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
    // Determine subtest target
    const subtestCode = subchapterIds[0]?.split('-')[0]?.toLowerCase() || 'pu';
    navigate(`/drilling/${subtestCode}`);
  };

  const isDrillingView = location.pathname.startsWith('/drilling');
  const isMateriView = location.pathname.startsWith('/materi');
  const isAmbientThemeView = !isDrillingView && !isMateriView;
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen text-slate-900 dark:text-[#f8fafc] flex flex-col selection:bg-cyan-500 selection:text-white font-sans relative overflow-x-clip bg-[#fdfbf7] dark:bg-[#070913]">
      <LegacyQueryRedirect />

      {/* Visual Ambient Backgrounds */}
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

          {/* 2. Subtest Detail */}
          <Route
            path="/subtest/:subtestId"
            element={
              <SubtestRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                onStartDrilling={handleStartDrilling}
              />
            }
          />

          {/* 3. Baca Materi */}
          <Route
            path="/materi/:materialId"
            element={
              <MaterialRouteView
                theme={theme}
                onToggleTheme={toggleTheme}
                initialMaterial={initialMaterial}
              />
            }
          />

          {/* 4. Active Drilling */}
          <Route
            path="/drilling/:subtestId"
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

          {/* 5. Legal Pages */}
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

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
