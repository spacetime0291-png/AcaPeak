import type {
  Material,
  ThreeZoneMaterial,
  WorkedExample,
  QuestionOption,
  SubtestType,
} from '../types/material';
import { assembleDrillingSession, type OrderMode } from './drillingRotationEngine';
import { UTBK_SYLLABUS } from './syllabusData';

// Storage key for user learning progress
export const PROGRESS_STORAGE_KEY = 'utbk_completed_subchapters';

export function getCompletedSubchapters(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function isSubchapterCompleted(subchapterId: string): boolean {
  return getCompletedSubchapters().has(subchapterId);
}

export function toggleSubchapterCompleted(subchapterId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const set = getCompletedSubchapters();
    let isCompleted = false;
    if (set.has(subchapterId)) {
      set.delete(subchapterId);
      isCompleted = false;
    } else {
      set.add(subchapterId);
      isCompleted = true;
    }
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify([...set]));
    window.dispatchEvent(new CustomEvent('utbk_progress_changed', { detail: { subchapterId, isCompleted } }));
    return isCompleted;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// ADAPT THREE-ZONE MATERIAL TO COMPATIBLE APP SCHEMA
// -------------------------------------------------------------

export function adaptThreeZoneMaterial(data: ThreeZoneMaterial): Material {
  const parts = data.kode_subbab.split('-');
  const subtestCode = parts[0].toUpperCase() as SubtestType;
  const chNum = parseInt(parts[1], 10) || 1;
  const subNum = parseInt(parts[2], 10) || 1;

  const workedExamples: WorkedExample[] = (data.zona_3_uji_pemahaman || []).map((soal, idx) => {
    const options: QuestionOption[] = (soal.opsi_jawaban || []).map((opt) => {
      const match = opt.match(/^([A-E])\.\s*(.+)/s);
      if (match) {
        return { key: match[1], text_markdown: match[2].trim() };
      }
      return { key: String.fromCharCode(65 + idx), text_markdown: opt };
    });

    return {
      example_id: `${data.kode_subbab}-ex${soal.nomor_soal || idx + 1}`,
      variation_name: `Variasi ${Array.isArray(soal.menguji_variasi_ke) ? soal.menguji_variasi_ke.join(', ') : 'Inti'}`,
      difficulty: 'medium',
      question_type: 'standard_mc',
      question_markdown: soal.pertanyaan_markdown,
      options,
      correct_answer: soal.kunci_jawaban,
      conceptual_solution_markdown: soal.bedah_cepat_markdown,
      quick_trick_markdown: '',
      why_others_are_wrong_markdown: '',
    };
  });

  return {
    ...data,
    metadata: {
      id: data.kode_subbab,
      subtest: subtestCode,
      chapter_num: chNum,
      chapter_title: data.bab.replace(/^Bab \d+:\s*/, ''),
      subchapter_num: `${chNum}.${subNum}`,
      subchapter_title: data.judul_subbab,
      title: data.judul_subbab,
      required_question_variations: (data.zona_2_variasi_inti || []).map((v) => v.nama_variasi),
      requires_svg: false,
      updated_at: '2026-11-19',
    },
    content: {
      tactical_overview: data.zona_1_peta_taktis?.konsep_inti_markdown || '',
      exam_blueprint_markdown: data.zona_1_peta_taktis?.konsep_inti_markdown || '',
      visualizations_svg: [],
      distractor_traps: data.zona_1_peta_taktis?.radar_jebakan_utbk || [],
      quick_execution_algorithm: [],
    },
    worked_examples: workedExamples,
  };
}

// -------------------------------------------------------------
// EAGERLY BUNDLED MATERIALS (Vite import.meta.glob for 0ms offline)
// -------------------------------------------------------------

const rawGlob = import.meta.glob('../../content/utbk/**/*.json', { eager: true });
export const PRELOADED_MATERIALS: Record<string, Material> = {};

for (const mod of Object.values(rawGlob)) {
  const jsonContent = (mod as any).default || mod;
  if (jsonContent && jsonContent.kode_subbab) {
    const adapted = adaptThreeZoneMaterial(jsonContent as ThreeZoneMaterial);
    PRELOADED_MATERIALS[jsonContent.kode_subbab] = adapted;
    // Also index normalized forms
    PRELOADED_MATERIALS[jsonContent.kode_subbab.toLowerCase()] = adapted;
  }
}

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
        classification: sub.classification || 'INTI',
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
      classification: (sub as any).classification || 'INTI',
    }))
  );
});

export async function fetchMaterialById(id: string): Promise<Material> {
  const normalizedId = id.toLowerCase().trim();

  // 1. Check preloaded bundle first (0ms latency, works offline & GitHub Pages)
  if (PRELOADED_MATERIALS[normalizedId]) {
    return PRELOADED_MATERIALS[normalizedId];
  }

  const matched = ALL_UTBK_SUBCHAPTERS.find(
    (s) => s.id === id || s.id === normalizedId || s.id.replace('-', '.') === id
  );

  if (matched && PRELOADED_MATERIALS[matched.id]) {
    return PRELOADED_MATERIALS[matched.id];
  }

  // 2. Dynamic fetch from public/content
  const subtestPrefix = (matched ? matched.subtestCode : id.split('-')[0]).toLowerCase();
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const targetUrl = `${baseUrl}content/utbk/${subtestPrefix}/${normalizedId}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      const adapted = adaptThreeZoneMaterial(data as ThreeZoneMaterial);
      PRELOADED_MATERIALS[normalizedId] = adapted;
      return adapted;
    }
  } catch (err) {
    console.warn(`Could not fetch dynamic material for ${id}:`, err);
  }

  // 3. Graceful empty fallback
  const title = matched ? matched.title : `Sub-bab ${id.toUpperCase()}`;
  const subtestCode = matched ? matched.subtestCode : (id.split('-')[0].toUpperCase() as any);
  const chapterNum = matched ? matched.chapterNum : 1;
  const chapterTitle = matched ? matched.chapterTitle : 'Bab Utama';
  const subchapterNum = matched ? matched.subchapter_num : '1.1';

  return {
    kode_subbab: id,
    subtes: subtestCode,
    bab: `Bab ${chapterNum}: ${chapterTitle}`,
    judul_subbab: title,
    klasifikasi_materi: 'INTI',
    zona_1_peta_taktis: {
      estimasi_menit_baca: 1,
      frekuensi_utbk: 'Sedang',
      konsep_inti_markdown: 'Materi untuk sub-bab ini sedang dipersiapkan.',
      radar_jebakan_utbk: [],
    },
    zona_2_variasi_inti: [],
    zona_3_uji_pemahaman: [],
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

// Collect questions using the Deterministic Stratified Rotation Engine
export async function collectDrillingQuestions(
  subchapterIds: string[],
  requestedCount: number,
  orderMode: OrderMode = 'blocking'
): Promise<WorkedExample[]> {
  return assembleDrillingSession({
    subchapterIds,
    requestedCount,
    orderMode,
  });
}

export { assembleDrillingSession } from './drillingRotationEngine';
