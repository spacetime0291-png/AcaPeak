import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { MaterialRenderer } from './components/content/MaterialRenderer';
import { UTBK_SYLLABUS } from './lib/syllabusData';
import type { Material } from './types/material';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';

// Pre-bundled ready tactical playbooks for 0-latency instant rendering
import pu11Data from '../public/content/utbk/pu/pu-1.1.json';
import pu12Data from '../public/content/utbk/pu/pu-1.2.json';
import pk31Data from '../public/content/utbk/pk/pk-3.1.json';

const PRELOADED_MATERIALS: Record<string, Material> = {
  'pu-1.1': pu11Data as unknown as Material,
  'pu-1.2': pu12Data as unknown as Material,
  'pk-3.1': pk31Data as unknown as Material,
};

export default function App() {
  const [currentMaterialId, setCurrentMaterialId] = useState<string>('pu-1.1');
  const [material, setMaterial] = useState<Material>(PRELOADED_MATERIALS['pu-1.1']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Flatten all subchapters for easy prev/next navigation
  const allSubchapters = UTBK_SYLLABUS.flatMap((subtest) =>
    subtest.chapters.flatMap((chapter) =>
      chapter.subchapters.map((sub) => ({
        ...sub,
        subtestCode: subtest.code,
        chapterNum: chapter.chapter_num,
        chapterTitle: chapter.chapter_title,
      }))
    )
  );

  const currentIndex = allSubchapters.findIndex((s) => s.id === currentMaterialId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allSubchapters.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      handleSelectMaterial(allSubchapters[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      handleSelectMaterial(allSubchapters[currentIndex + 1].id);
    }
  };

  const handleSelectMaterial = async (id: string) => {
    setCurrentMaterialId(id);
    setIsLoading(true);
    setLoadError(null);

    // 1. Instant check in preloaded dictionary
    if (PRELOADED_MATERIALS[id]) {
      setMaterial(PRELOADED_MATERIALS[id]);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Fetch from public/content/ with adaptive BASE_URL
    const subtestPrefix = id.split('-')[0].toLowerCase();
    const rawBase = import.meta.env.BASE_URL || '/';
    const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
    const targetUrl = `${baseUrl}content/utbk/${subtestPrefix}/${id}.json`;

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`Modul [${id}] dalam status antrean pembuatan playbook.`);
      }
      const data = await response.json();
      setMaterial(data);
    } catch (err: any) {
      setLoadError(err.message || 'Materi sedang disiapkan.');
      const matched = allSubchapters.find((s) => s.id === id);
      if (matched) {
        setMaterial({
          metadata: {
            id: matched.id,
            subtest: matched.subtestCode as any,
            chapter_num: matched.chapterNum,
            chapter_title: matched.chapterTitle,
            subchapter_num: matched.subchapter_num,
            subchapter_title: matched.title,
            title: matched.title,
            required_question_variations: [
              `Penguasaan variasi soal tipe utama ${matched.title}`,
              'Deteksi jebakan opsi pengecoh khas UTBK-SNBT',
              'Algoritma penyelesaian cepat 30-45 detik per soal',
            ],
            requires_svg: false,
            updated_at: new Date().toISOString().split('T')[0],
          },
          content: {
            tactical_overview: `Topik ${matched.title} (${matched.subtestCode}) sedang dalam pipeline penulisan Playbook Variasi Soal.`,
            exam_blueprint_markdown: `### 📌 Modul Dalam Antrean Pembuatan Playbook\n\nModul **${matched.title}** (${matched.subtestCode} - Bab ${matched.chapterNum}) saat ini berstatus antrean (*pending*) pada kurikulum 96 topik UTBK.\n\nSilakan pilih salah satu dari **Modul Siap Uji Coba** di atas untuk melihat format Playbook taktis dengan KaTeX, visualisasi SVG, dan bedah opsi pengecoh lengkap:`,
            visualizations_svg: [],
            distractor_traps: [
              'Jebakan 1: Overgeneralisasi atau klaim mutlak dari data parsial.',
              'Jebakan 2: Terkecoh pada opsi jawaban yang tampak benar tetapi tidak menjawab pertanyaan inti.',
            ],
            quick_execution_algorithm: [
              'Langkah 1: Identifikasi kata kunci pertanyaan.',
              'Langkah 2: Eliminasi opsi pengecoh yang mengandung klaim ekstrem.',
              'Langkah 3: Terapkan rumus kilat atau aturan logika utama.',
            ],
          },
          worked_examples: [],
        });
      }
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (material?.metadata?.title) {
      document.title = `${material.metadata.subtest} ${material.metadata.subchapter_num} - ${material.metadata.title} | UTBK Playbook`;
    }
  }, [material]);

  return (
    <AppLayout
      activeSubtest={material.metadata.subtest}
      activeTitle={material.metadata.title}
      syllabus={UTBK_SYLLABUS}
      currentMaterialId={currentMaterialId}
      onSelectMaterial={handleSelectMaterial}
      onPrevMaterial={handlePrev}
      onNextMaterial={handleNext}
      hasPrev={hasPrev}
      hasNext={hasNext}
      workedExamplesCount={material.worked_examples.length}
    >
      {/* Quick Access Live Demos Banner */}
      <div className="mb-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-indigo-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Modul Siap Uji Coba (Standar Playbook Baru)
            </span>
          </div>
          <span className="text-[11px] text-slate-300 font-medium">
            20% Cheatsheet Taktis • 80% Bedah Variasi Soal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleSelectMaterial('pu-1.1')}
            className={`p-3 rounded-xl text-left transition flex items-start gap-2.5 cursor-pointer ${
              currentMaterialId === 'pu-1.1'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-900/60 hover:bg-indigo-800/80 text-white border border-indigo-700/40'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${currentMaterialId === 'pu-1.1' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 text-indigo-300">
                Penalaran Umum (PU 1.1)
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                Kesesuaian Teks (5 Variasi + Kualitas Simpulan)
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMaterial('pu-1.2')}
            className={`p-3 rounded-xl text-left transition flex items-start gap-2.5 cursor-pointer ${
              currentMaterialId === 'pu-1.2'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-900/60 hover:bg-indigo-800/80 text-white border border-indigo-700/40'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${currentMaterialId === 'pu-1.2' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 text-indigo-300">
                Penalaran Umum (PU 1.2)
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                Evaluasi Argumen (5 Variasi + Asumsi Implisit)
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMaterial('pk-3.1')}
            className={`p-3 rounded-xl text-left transition flex items-start gap-2.5 cursor-pointer ${
              currentMaterialId === 'pk-3.1'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-900/60 hover:bg-indigo-800/80 text-white border border-indigo-700/40'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${currentMaterialId === 'pk-3.1' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 text-indigo-300">
                Pengetahuan Kuantitatif (PK 3.1)
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                Hubungan Garis & Sudut (4 Variasi + Kecukupan Data)
              </div>
            </div>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 text-center bg-white rounded-2xl border border-slate-200">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-slate-600 font-medium">Memuat playbook soal...</p>
        </div>
      ) : (
        <>
          {loadError && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{loadError} Anda dapat menguji modul siap pakai melalui tombol cepat di atas.</span>
            </div>
          )}
          <MaterialRenderer
            material={material}
            onAnswerSubmit={(exampleId, answer, isCorrect) => {
              console.log(`[UTBK Playbook Log] ID: ${exampleId}, Jawaban: ${answer}, Benar: ${isCorrect}`);
            }}
          />
        </>
      )}
    </AppLayout>
  );
}
