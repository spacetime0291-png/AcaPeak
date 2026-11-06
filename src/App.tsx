import { useState, useEffect, useCallback } from 'react';
import { UTBK_SYLLABUS } from './lib/syllabusData';
import { SMA_SUBJECTS } from './lib/smaSyllabusData';
import {
  fetchMaterialById,
  collectDrillingQuestions,
} from './lib/contentLoader';
import type { Material, WorkedExample } from './types/material';
import { TopHeader } from './components/navigation/TopHeader';
import type { AppMode } from './components/navigation/TopHeader';
import { UtbkSubtestGrid } from './components/home/UtbkSubtestGrid';
import { SmaSubjectGrid } from './components/home/SmaSubjectGrid';
import { SubtestDetailView } from './components/subtest/SubtestDetailView';
import { SmaSubjectDetailView } from './components/subtest/SmaSubjectDetailView';
import { PdfMaterialReader } from './components/reader/PdfMaterialReader';
import { ActiveDrillingView } from './components/drilling/ActiveDrillingView';

interface AppRouteState {
  view: 'home' | 'subtest' | 'materi' | 'drilling' | 'sma-subject';
  mode: AppMode;
  subtestCode?: string;
  tab?: 'materi' | 'drilling';
  materiId?: string;
  drillingQuestionIndex?: number;
  smaSubjectId?: string;
}

export default function App() {
  // Parse initial route from URL search params
  const parseRouteFromUrl = (): AppRouteState => {
    if (typeof window === 'undefined') return { view: 'home', mode: 'utbk' };
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') === 'sma' ? 'sma' : 'utbk';
    const materi = params.get('materi');
    const subtest = params.get('subtest');
    const tab = params.get('tab') === 'drilling' ? 'drilling' : 'materi';
    const drilling = params.get('drilling');
    const questionNo = parseInt(params.get('no') || '1', 10);
    const subject = params.get('subject') || params.get('mapel');

    if (drilling === 'active') {
      return {
        view: 'drilling',
        mode,
        subtestCode: subtest || 'pu',
        drillingQuestionIndex: Math.max(0, questionNo - 1),
      };
    }

    if (materi) {
      const code = subtest || materi.split('-')[0].toLowerCase();
      return {
        view: 'materi',
        mode: 'utbk',
        subtestCode: code,
        materiId: materi,
      };
    }

    if (subject) {
      return {
        view: 'sma-subject',
        mode: 'sma',
        smaSubjectId: subject,
      };
    }

    if (subtest) {
      return {
        view: 'subtest',
        mode: 'utbk',
        subtestCode: subtest.toLowerCase(),
        tab,
      };
    }

    return {
      view: 'home',
      mode,
    };
  };

  const [route, setRoute] = useState<AppRouteState>(parseRouteFromUrl);

  // Active Material data for PDF Reader
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false);

  // Active Drilling session states
  const [drillingQuestions, setDrillingQuestions] = useState<WorkedExample[]>([]);
  const [drillingTimerMinutes, setDrillingTimerMinutes] = useState<number | null>(15);

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('kognitedu_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kognitedu_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Sync route changes to Browser URL (History API) and auto-scroll instant to top
  const navigateTo = useCallback((newRoute: AppRouteState, replace = false) => {
    const params = new URLSearchParams();

    if (newRoute.mode === 'sma') {
      params.set('mode', 'sma');
    }

    if (newRoute.view === 'subtest' && newRoute.subtestCode) {
      params.set('subtest', newRoute.subtestCode.toLowerCase());
      if (newRoute.tab) params.set('tab', newRoute.tab);
    } else if (newRoute.view === 'materi' && newRoute.materiId) {
      if (newRoute.subtestCode) params.set('subtest', newRoute.subtestCode.toLowerCase());
      params.set('materi', newRoute.materiId);
    } else if (newRoute.view === 'drilling') {
      params.set('drilling', 'active');
      params.set('no', String((newRoute.drillingQuestionIndex || 0) + 1));
      if (newRoute.subtestCode) params.set('subtest', newRoute.subtestCode.toLowerCase());
    } else if (newRoute.view === 'sma-subject' && newRoute.smaSubjectId) {
      params.set('mode', 'sma');
      params.set('subject', newRoute.smaSubjectId);
    }

    const query = params.toString() ? `?${params.toString()}` : window.location.pathname;
    if (replace) {
      window.history.replaceState({}, '', query);
    } else {
      window.history.pushState({}, '', query);
    }

    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromUrl();
      setRoute(parsed);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch material when route.view is 'materi'
  useEffect(() => {
    if (route.view === 'materi' && route.materiId) {
      setIsMaterialLoading(true);
      fetchMaterialById(route.materiId)
        .then((data) => {
          setActiveMaterial(data);
          document.title = `${data.metadata.subtest} - ${data.metadata.title} | Portal Edukasi`;
        })
        .catch((err) => {
          console.error('Failed to load material', err);
        })
        .finally(() => {
          setIsMaterialLoading(false);
        });
    } else if (route.view === 'subtest') {
      const sub = UTBK_SYLLABUS.find(
        (s) => s.code.toLowerCase() === route.subtestCode?.toLowerCase()
      );
      if (sub) {
        document.title = `${sub.name} (${sub.code}) | Portal Edukasi UTBK`;
      }
    } else if (route.view === 'drilling') {
      document.title = `Sesi Drilling Soal #${(route.drillingQuestionIndex || 0) + 1} | Portal Edukasi`;
    } else {
      document.title = 'Portal Belajar UTBK-SNBT & Materi SMA | Bebas Biaya (Rp0)';
    }
  }, [route.view, route.materiId, route.subtestCode, route.drillingQuestionIndex]);

  // Fallback initialize drilling questions if user refreshed while on /?drilling=active
  useEffect(() => {
    if (route.view === 'drilling' && drillingQuestions.length === 0) {
      const targetSubtest = route.subtestCode || 'pu';
      const sub = UTBK_SYLLABUS.find(
        (s) => s.code.toLowerCase() === targetSubtest.toLowerCase()
      ) || UTBK_SYLLABUS[0];
      const initialSubIds = sub.modules
        ? sub.modules.flatMap((m) => m.subtopics.map((s) => s.id))
        : (sub.chapters || []).flatMap((c) => c.subchapters.map((s) => s.id));
      collectDrillingQuestions(initialSubIds, 10).then((qs) => {
        setDrillingQuestions(qs);
      });
    }
  }, [route.view, route.subtestCode, drillingQuestions.length]);

  // Derived current subtest item
  const currentSubtest = UTBK_SYLLABUS.find(
    (s) => s.code.toLowerCase() === route.subtestCode?.toLowerCase() || s.id.toLowerCase() === route.subtestCode?.toLowerCase()
  ) || UTBK_SYLLABUS[0];

  // Derived current SMA subject item
  const currentSmaSubject = SMA_SUBJECTS.find(
    (s) => s.id === route.smaSubjectId
  ) || SMA_SUBJECTS[0];

  // Flattened subchapters for the active subtest to support prev / next in reader
  const currentSubtestSubchapters = currentSubtest.modules
    ? currentSubtest.modules.flatMap((m) =>
        m.subtopics.map((s) => ({
          id: s.id,
          title: s.title,
          subchapter_num: s.id,
        }))
      )
    : (currentSubtest.chapters || []).flatMap((c) => c.subchapters);
  const currentMateriIndex = currentSubtestSubchapters.findIndex(
    (s) => s.id === route.materiId
  );
  const hasPrevMateri = currentMateriIndex > 0;
  const hasNextMateri = currentMateriIndex !== -1 && currentMateriIndex < currentSubtestSubchapters.length - 1;

  // Handlers
  const handlePrevMateri = () => {
    if (hasPrevMateri) {
      const prevId = currentSubtestSubchapters[currentMateriIndex - 1].id;
      navigateTo({
        ...route,
        view: 'materi',
        materiId: prevId,
      });
    }
  };

  const handleNextMateri = () => {
    if (hasNextMateri) {
      const nextId = currentSubtestSubchapters[currentMateriIndex + 1].id;
      navigateTo({
        ...route,
        view: 'materi',
        materiId: nextId,
      });
    }
  };

  const handleStartDrilling = async (
    subchapterIds: string[],
    questionCount: number,
    timerMins: number | null
  ) => {
    setDrillingTimerMinutes(timerMins);
    const qs = await collectDrillingQuestions(subchapterIds, questionCount);
    setDrillingQuestions(qs);
    navigateTo({
      view: 'drilling',
      mode: route.mode,
      subtestCode: route.subtestCode || 'pu',
      drillingQuestionIndex: 0,
    });
  };

  const handleStartDrillingSingleTopic = (subchapterId: string) => {
    handleStartDrilling([subchapterId], 10, 15);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden transition-colors duration-250">
      {/* Decorative Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full bg-gradient-to-br from-blue-400/25 via-indigo-500/15 to-transparent dark:from-blue-600/15 dark:via-indigo-800/10 dark:to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-gradient-to-bl from-violet-400/25 via-purple-500/15 to-transparent dark:from-purple-600/15 dark:via-violet-800/10 dark:to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-96 sm:w-[520px] h-96 sm:h-[520px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-emerald-400/15 to-transparent dark:from-cyan-600/10 dark:via-emerald-700/10 dark:to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. TOP HEADER & MODE SWITCHER (HANYA MUNCUL DI BERANDA '/') */}
        {route.view === 'home' && (
          <TopHeader
            mode={route.mode}
            theme={theme}
            onToggleTheme={toggleTheme}
            onModeChange={(newMode) => {
              navigateTo({ view: 'home', mode: newMode });
            }}
            onSelectUtbkMaterial={(subtestCode, materialId) => {
              navigateTo({
                view: 'materi',
                mode: 'utbk',
                subtestCode,
                materiId: materialId,
              });
            }}
            onSelectSmaSubject={(subjectId) => {
              navigateTo({
                view: 'sma-subject',
                mode: 'sma',
                smaSubjectId: subjectId,
              });
            }}
          />
        )}

        {/* Main Content Area */}
        <main className={route.view === 'subtest' ? 'flex-1 w-full' : 'flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-2.5 sm:py-6'}>
          {/* VIEW 1: HOME DASHBOARD */}
          {route.view === 'home' && (
            <div className="space-y-4">
              {/* Mode UTBK-SNBT: Grid 7 Subtes UTBK */}
              {route.mode === 'utbk' && (
                <UtbkSubtestGrid
                  onSelectSubtest={(subtestCode) => {
                    navigateTo({
                      view: 'subtest',
                      mode: 'utbk',
                      subtestCode,
                      tab: 'materi',
                    });
                  }}
                />
              )}

              {/* Mode Materi SMA: Grid Mapel SMA */}
              {route.mode === 'sma' && (
                <SmaSubjectGrid
                  onSelectSubject={(subjectId) => {
                    navigateTo({
                      view: 'sma-subject',
                      mode: 'sma',
                      smaSubjectId: subjectId,
                    });
                  }}
                />
              )}
            </div>
          )}

          {/* VIEW 2: SUBTEST DETAIL (2 TABS: "MATERI" & "DRILLING") */}
          {route.view === 'subtest' && currentSubtest && (
            <SubtestDetailView
              subtest={currentSubtest}
              activeTab={route.tab || 'materi'}
              theme={theme}
              onToggleTheme={toggleTheme}
              onTabChange={(newTab) => {
                navigateTo(
                  {
                    ...route,
                    tab: newTab,
                  },
                  true
                );
              }}
              onBackToHome={() => {
                navigateTo({ view: 'home', mode: 'utbk' });
              }}
              onSelectSubtest={(newCode) => {
                navigateTo({
                  view: 'subtest',
                  mode: 'utbk',
                  subtestCode: newCode.toLowerCase(),
                  tab: route.tab || 'materi',
                });
              }}
              onSelectMaterial={(materialId) => {
                navigateTo({
                  view: 'materi',
                  mode: 'utbk',
                  subtestCode: currentSubtest.code.toLowerCase(),
                  materiId: materialId,
                });
              }}
              onStartDrilling={handleStartDrilling}
            />
          )}

          {/* VIEW 3: SMA SUBJECT DETAIL */}
          {route.view === 'sma-subject' && currentSmaSubject && (
            <SmaSubjectDetailView
              subject={currentSmaSubject}
              theme={theme}
              onToggleTheme={toggleTheme}
              onBackToHome={() => {
                navigateTo({ view: 'home', mode: 'sma' });
              }}
              onSelectTopic={(topicId) => {
                navigateTo({
                  view: 'materi',
                  mode: 'sma',
                  subtestCode: currentSmaSubject.id,
                  materiId: topicId,
                });
              }}
            />
          )}

          {/* VIEW 4: PDF-STYLE ACADEMIC MATERIAL READER */}
          {route.view === 'materi' && (
            <div>
              {isMaterialLoading || !activeMaterial ? (
                <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto">
                  <div className="inline-block w-9 h-9 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-semibold">
                    Menyiapkan naskah materi & rumus...
                  </p>
                </div>
              ) : (
                <PdfMaterialReader
                  material={activeMaterial}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  onBackToSubtest={() => {
                    navigateTo({
                      view: 'subtest',
                      mode: 'utbk',
                      subtestCode: activeMaterial.metadata.subtest.toLowerCase(),
                      tab: 'materi',
                    });
                  }}
                  onPrevSubchapter={handlePrevMateri}
                  onNextSubchapter={handleNextMateri}
                  hasPrev={hasPrevMateri}
                  hasNext={hasNextMateri}
                  onStartDrillingThisTopic={handleStartDrillingSingleTopic}
                />
              )}
            </div>
          )}

          {/* VIEW 5: ACTIVE DRILLING SESSION */}
          {route.view === 'drilling' && (
            <ActiveDrillingView
              questions={drillingQuestions}
              currentQuestionIndex={route.drillingQuestionIndex || 0}
              timerMinutes={drillingTimerMinutes}
              theme={theme}
              onToggleTheme={toggleTheme}
              onNavigateQuestion={(newIndex) => {
                navigateTo(
                  {
                    ...route,
                    drillingQuestionIndex: newIndex,
                  },
                  false
                );
              }}
              onExitDrilling={() => {
                navigateTo({
                  view: 'subtest',
                  mode: 'utbk',
                  subtestCode: route.subtestCode || 'pu',
                  tab: 'drilling',
                });
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
