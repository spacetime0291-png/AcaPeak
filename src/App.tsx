import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { MaterialRenderer } from './components/content/MaterialRenderer';
import { UTBK_SYLLABUS } from './lib/syllabusData';
import type { Material } from './types/material';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';

// Pre-bundled ready materials for 0-latency instant rendering
import pu111Data from '../public/content/utbk/pu/pu-1.1.1.json';
import pu112Data from '../public/content/utbk/pu/pu-1.1.2.json';
import pu113Data from '../public/content/utbk/pu/pu-1.1.3.json';
import pk311Data from '../public/content/utbk/pk/pk-3.1.1.json';

const PRELOADED_MATERIALS: Record<string, Material> = {
  'pu-1.1.1': pu111Data as unknown as Material,
  'pu-1.1.2': pu112Data as unknown as Material,
  'pu-1.1.3': pu113Data as unknown as Material,
  'pk-3.1.1': pk311Data as unknown as Material,
};

export default function App() {
  const [currentMaterialId, setCurrentMaterialId] = useState<string>('pu-1.1.1');
  const [material, setMaterial] = useState<Material>(PRELOADED_MATERIALS['pu-1.1.1']);
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
        throw new Error(`Modul [${id}] dalam status antrean pembuatan.`);
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
            micro_syllabus_covered: [
              `Penguasaan konsep terstruktur untuk topik ${matched.title}`,
              'Latihan soal terbimbing model UTBK-SNBT terbaru',
              'Strategi eliminasi cepat dan trik matematika/logika',
            ],
            requires_svg: false,
            updated_at: new Date().toISOString().split('T')[0],
          },
          content: {
            concept_markdown: `### 📌 Modul Dalam Antrean Pembuatan\n\nMateri untuk **${matched.title}** (${matched.subtestCode} - Bab ${matched.chapterNum}: *${matched.chapterTitle}*) saat ini berstatus antrean (*pending*) pada pipeline kurikulum 277 sub-materi.\n\nSilakan pilih salah satu dari **4 Modul Siap Baca** di bagian atas untuk melihat format interaktif penuh dengan KaTeX, visualisasi SVG, dan 3 variasi contoh soal terbimbing.`,
            visualizations_svg: [],
            formulas_and_quick_tricks: [
              'Tips Belajar: Kuasai konsep dasar dan pola soal sebelum menghafal trik cepat.',
              'Manajemen Waktu: Rata-rata alokasi waktu per soal di UTBK adalah 50–90 detik.',
            ],
            common_pitfalls: [
              'Membaca teks stimulus terlalu lama tanpa memindai pertanyaan inti terlebih dahulu.',
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
      document.title = `${material.metadata.subtest} ${material.metadata.subchapter_num} - ${material.metadata.title} | UTBK Portal`;
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
      <div className="mb-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-indigo-700/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Modul Siap Baca (Interaktif Penuh)
            </span>
          </div>
          <span className="text-[11px] text-slate-300 font-medium">
            277 Sub-materi Terdaftar • Biaya Rp0
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleSelectMaterial('pu-1.1.1')}
            className={`p-2.5 rounded-xl text-left transition flex items-start gap-2.5 ${
              currentMaterialId === 'pu-1.1.1'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-800/60 hover:bg-indigo-700/70 text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentMaterialId === 'pu-1.1.1' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">PU 1.1.1</div>
              <div className="text-xs truncate">Mekanisme Generalisasi</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMaterial('pu-1.1.2')}
            className={`p-2.5 rounded-xl text-left transition flex items-start gap-2.5 ${
              currentMaterialId === 'pu-1.1.2'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-800/60 hover:bg-indigo-700/70 text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentMaterialId === 'pu-1.1.2' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">PU 1.1.2</div>
              <div className="text-xs truncate">Jenis Generalisasi</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMaterial('pu-1.1.3')}
            className={`p-2.5 rounded-xl text-left transition flex items-start gap-2.5 ${
              currentMaterialId === 'pu-1.1.3'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-800/60 hover:bg-indigo-700/70 text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentMaterialId === 'pu-1.1.3' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">PU 1.1.3</div>
              <div className="text-xs truncate">Validitas & Anomali</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMaterial('pk-3.1.1')}
            className={`p-2.5 rounded-xl text-left transition flex items-start gap-2.5 ${
              currentMaterialId === 'pk-3.1.1'
                ? 'bg-white text-indigo-950 font-bold shadow-sm ring-2 ring-emerald-400'
                : 'bg-indigo-800/60 hover:bg-indigo-700/70 text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentMaterialId === 'pk-3.1.1' ? 'text-indigo-600' : 'text-emerald-400'}`} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">PK 3.1.1</div>
              <div className="text-xs truncate">Garis Sejajar & Sudut</div>
            </div>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 text-center bg-white rounded-2xl border border-slate-200">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-slate-600 font-medium">Memuat materi modul...</p>
        </div>
      ) : (
        <>
          {loadError && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{loadError} Anda dapat menguji modul lain melalui tombol cepat di atas.</span>
            </div>
          )}
          <MaterialRenderer
            material={material}
            onAnswerSubmit={(exampleId, answer, isCorrect) => {
              console.log(`[UTBK Answer Log] ID: ${exampleId}, Jawaban: ${answer}, Benar: ${isCorrect}`);
            }}
          />
        </>
      )}
    </AppLayout>
  );
}
