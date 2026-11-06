import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { MaterialRenderer } from './components/content/MaterialRenderer';
import { UTBK_SYLLABUS } from './lib/syllabusData';
import type { Material } from './types/material';

// Default material data to ensure immediate initial render with 0 latency
import defaultPkMaterial from '../public/content/utbk/pk/pk-3.1.1.json';

export default function App() {
  const [currentMaterialId, setCurrentMaterialId] = useState<string>('pk-3.1.1');
  const [material, setMaterial] = useState<Material>(defaultPkMaterial as unknown as Material);
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

    // If it's the bundled pk-3.1.1, restore immediately
    if (id === 'pk-3.1.1') {
      setMaterial(defaultPkMaterial as unknown as Material);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Try fetching from public/content/
    const subtestPrefix = id.split('-')[0].toLowerCase();
    const targetUrl = `/content/utbk/${subtestPrefix}/${id}.json`;

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`Materi [${id}] belum tersedia (${response.status})`);
      }
      const data = await response.json();
      setMaterial(data);
    } catch (err: any) {
      setLoadError(err.message || 'Gagal memuat materi.');
      // For demonstration of switching when other materials aren't created yet, synthesize preview template
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
              `Penguasaan konsep dasar ${matched.title}`,
              'Latihan soal model UTBK terbaru & eliminasi opsi cepat',
            ],
            requires_svg: false,
            updated_at: new Date().toISOString().split('T')[0],
          },
          content: {
            concept_markdown: `Materi untuk **${matched.title}** (${matched.subtestCode} Bab ${matched.chapterNum}) sedang dalam proses penyusunan tim kurikulum.\n\nSilakan jelajahi modul **PK-3.1.1 (Sudut, Garis Sejajar, dan Sifat Segitiga)** untuk melihat format interaktif lengkap dengan rumus KaTeX, diagram SVG responsif, dan contoh soal terbimbing.`,
            visualizations_svg: [],
            formulas_and_quick_tricks: [
              'Formula Kilat: Selalu kerjakan soal mudah terlebih dahulu untuk mengamankan poin IRT dasar.',
            ],
            common_pitfalls: [
              'Terlalu lama terpaku pada satu soal yang rumit.',
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
    // Sync document title with current material
    if (material?.metadata?.title) {
      document.title = `${material.metadata.subtest} ${material.metadata.subchapter_num} - ${material.metadata.title} | UTBK-SNBT Portal`;
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
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Memuat materi UTBK...</p>
        </div>
      ) : (
        <>
          {loadError && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
              ℹ️ Catatan: {loadError} Menampilkan pratinjau modul.
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
