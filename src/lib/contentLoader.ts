import type { Material, WorkedExample } from '../types/material';
import { UTBK_SYLLABUS } from './syllabusData';
import {
  MATERIAL_PU_01_01,
  MATERIAL_PU_01_02,
  MATERIAL_PU_01_03,
  MATERIAL_PU_02_01,
  MATERIAL_PU_02_02,
  MATERIAL_PU_02_03,
  MATERIAL_PU_02_04,
} from '../data/materials/puMaterials';

export const PRELOADED_MATERIALS: Record<string, Material> = {
  'pu-1-1': MATERIAL_PU_01_01,
  'pu-01-01': MATERIAL_PU_01_01,
  'pu-1.1': MATERIAL_PU_01_01,
  'pu-1-2': MATERIAL_PU_01_02,
  'pu-01-02': MATERIAL_PU_01_02,
  'pu-1.2': MATERIAL_PU_01_02,
  'pu-1-3': MATERIAL_PU_01_03,
  'pu-01-03': MATERIAL_PU_01_03,
  'pu-1.3': MATERIAL_PU_01_03,
  'pu-2-1': MATERIAL_PU_02_01,
  'pu-02-01': MATERIAL_PU_02_01,
  'pu-2.1': MATERIAL_PU_02_01,
  'pu-2-2': MATERIAL_PU_02_02,
  'pu-02-02': MATERIAL_PU_02_02,
  'pu-2.2': MATERIAL_PU_02_02,
  'pu-2-3': MATERIAL_PU_02_03,
  'pu-02-03': MATERIAL_PU_02_03,
  'pu-2.3': MATERIAL_PU_02_03,
  'pu-2-4': MATERIAL_PU_02_04,
  'pu-02-04': MATERIAL_PU_02_04,
  'pu-2.4': MATERIAL_PU_02_04,
};

// Flatten all UTBK subchapters for metadata lookup
export const ALL_UTBK_SUBCHAPTERS = UTBK_SYLLABUS.flatMap((subtest) => {
  if (subtest.modules) {
    return subtest.modules.flatMap((mod, modIdx) =>
      mod.subtopics.map((sub, subIdx) => ({
        id: sub.id,
        subchapter_num: `${modIdx + 1}.${subIdx + 1}`,
        title: sub.title,
        subtestCode: subtest.code,
        subtestName: subtest.title || subtest.name || subtest.code,
        chapterNum: modIdx + 1,
        chapterTitle: mod.title,
      }))
    );
  }
  return (subtest.chapters || []).flatMap((chapter) =>
    chapter.subchapters.map((sub) => ({
      ...sub,
      subtestCode: subtest.code,
      subtestName: subtest.title || subtest.name || subtest.code,
      chapterNum: chapter.chapter_num,
      chapterTitle: chapter.chapter_title,
    }))
  );
});

export async function fetchMaterialById(id: string): Promise<Material> {
  const normalizedId = id.replace('.', '-');
  const matched = ALL_UTBK_SUBCHAPTERS.find(
    (s) => s.id === id || s.id === normalizedId || s.id.replace('-', '.') === id
  );

  // Check preloaded bundle first (0ms latency, works offline & GitHub Pages)
  if (PRELOADED_MATERIALS[id]) {
    return PRELOADED_MATERIALS[id];
  }
  if (PRELOADED_MATERIALS[normalizedId]) {
    return PRELOADED_MATERIALS[normalizedId];
  }
  if (matched && PRELOADED_MATERIALS[matched.id]) {
    return PRELOADED_MATERIALS[matched.id];
  }

  const subtestPrefix = (matched ? matched.subtestCode : id.split('-')[0]).toLowerCase();
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const targetUrl = `${baseUrl}content/utbk/${subtestPrefix}/${id}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      if (!matched || data.metadata?.title === matched.title) {
        return data as Material;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch dynamic material for ${id}:`, err);
  }

  // Graceful empty fallback when material content is not yet available
  const title = matched ? matched.title : `Sub-bab ${id.toUpperCase()}`;
  const subtestCode = matched ? matched.subtestCode : (id.split('-')[0].toUpperCase() as any);
  const chapterNum = matched ? matched.chapterNum : 1;
  const chapterTitle = matched ? matched.chapterTitle : 'Bab Utama';
  const subchapterNum = matched ? matched.subchapter_num : '1.1';

  return {
    metadata: {
      id,
      subtest: subtestCode,
      chapter_num: chapterNum,
      chapter_title: chapterTitle,
      subchapter_num: subchapterNum,
      subchapter_title: title,
      title,
      required_question_variations: [],
      requires_svg: false,
      updated_at: new Date().toISOString().split('T')[0],
    },
    content: {
      tactical_overview: '',
      exam_blueprint_markdown: '',
      visualizations_svg: [],
      distractor_traps: [],
      quick_execution_algorithm: [],
    },
    worked_examples: [],
  };
}

// Collect questions from multiple subchapters for drilling
export async function collectDrillingQuestions(
  subchapterIds: string[],
  requestedCount: number
): Promise<WorkedExample[]> {
  const allCollected: WorkedExample[] = [];

  for (const id of subchapterIds) {
    try {
      const mat = await fetchMaterialById(id);
      if (mat && mat.worked_examples && mat.worked_examples.length > 0) {
        allCollected.push(...mat.worked_examples);
      }
    } catch (e) {
      console.warn(`Error loading questions for ${id}`, e);
    }
  }

  // If no questions are available for the selected subchapters, return empty array
  if (allCollected.length === 0) {
    return [];
  }

  // Shuffle questions randomly
  const shuffled = [...allCollected].sort(() => 0.5 - Math.random());

  // If we have fewer than requested, cycle to fill requested count
  const result: WorkedExample[] = [];
  let index = 0;
  while (result.length < requestedCount && shuffled.length > 0) {
    const item = shuffled[index % shuffled.length];
    result.push({
      ...item,
      example_id: `${item.example_id}-q${result.length + 1}`,
    });
    index++;
  }

  return result.slice(0, requestedCount);
}
