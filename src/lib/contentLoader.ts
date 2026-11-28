import type {
  Material,
  ThreeZoneMaterial,
  WorkedExample,
  SubtestType,
} from '../types/material';
import { assembleDrillingSession, type OrderMode } from './drillingRotationEngine';
import { UTBK_SYLLABUS } from './syllabusData';

declare global {
  interface Window {
    __INITIAL_DATA__?: ThreeZoneMaterial | Material | Record<string, unknown>;
  }
}

// Storage key for user learning progress
export const PROGRESS_STORAGE_KEY = 'utbk_completed_subchapters';

export function getCompletedSubchapters(): Set<string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return new Set();
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
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
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
    // Drilling soal now uses exclusively the 4,240-question bank from /content/drilling/
    worked_examples: [],
  };
}

// -------------------------------------------------------------
// SYNCHRONOUS __PAGE_DATA__ HYDRATION & DYNAMIC FETCH CACHE
// Zero monolithic static JSON/glob imports in client JS bundle!
// -------------------------------------------------------------

export const MATERIAL_CACHE: Record<string, Material> = {};

// Aliased for legacy backward compatibility
export const PRELOADED_MATERIALS: Record<string, Material> = MATERIAL_CACHE;

let ssrInjectedMaterial: Material | null = null;
let parsedPageDataCache: unknown = undefined;

/**
 * Synchronously reads embedded <script id="__PAGE_DATA__" type="application/json">
 * (or legacy window.__INITIAL_DATA__) with 0ms latency during hydration.
 */
export function readEmbeddedPageData<T = unknown>(): T | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  if (parsedPageDataCache !== undefined) {
    return parsedPageDataCache as T | null;
  }

  try {
    const scriptEl = document.getElementById('__PAGE_DATA__');
    if (scriptEl && scriptEl.textContent) {
      const parsed = JSON.parse(scriptEl.textContent);
      parsedPageDataCache = parsed;
      return parsed as T;
    }
  } catch (err) {
    console.warn('Failed to parse #__PAGE_DATA__:', err);
  }

  if (window.__INITIAL_DATA__) {
    parsedPageDataCache = window.__INITIAL_DATA__;
    return window.__INITIAL_DATA__ as T;
  }

  parsedPageDataCache = null;
  return null;
}

export function setSsrInitialMaterial(mat: Material | null): void {
  ssrInjectedMaterial = mat;
  if (mat && mat.metadata?.id) {
    const key = mat.metadata.id.toLowerCase();
    MATERIAL_CACHE[key] = mat;
  }
}

export function getSsrInitialMaterial(): Material | null {
  if (ssrInjectedMaterial) return ssrInjectedMaterial;

  // On client hydration, return synchronously cached initial material from __PAGE_DATA__
  const pageData = readEmbeddedPageData<ThreeZoneMaterial | Material>();
  if (pageData && typeof pageData === 'object') {
    const candidate = pageData as unknown as Record<string, unknown>;
    if ('kode_subbab' in candidate || ('metadata' in candidate && candidate.metadata)) {
      const adapted =
        'metadata' in candidate && candidate.metadata
          ? (pageData as Material)
          : adaptThreeZoneMaterial(pageData as ThreeZoneMaterial);
      if (adapted?.metadata?.id) {
        MATERIAL_CACHE[adapted.metadata.id.toLowerCase()] = adapted;
        return adapted;
      }
    }
  }

  return null;
}

/**
 * Synchronously hydrates material cache from #__PAGE_DATA__ before hydrateRoot().
 */
export function hydrateInitialMaterialFromPageData(): Material | null {
  return getSsrInitialMaterial();
}

// Hydrate cache immediately on module load in browser
if (typeof window !== 'undefined') {
  hydrateInitialMaterialFromPageData();
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
      classification: (sub as { classification?: string }).classification || 'INTI',
    }))
  );
});

export async function fetchMaterialById(id: string): Promise<Material> {
  const normalizedId = id.toLowerCase().trim();

  // 1. Check in-memory / synchronously hydrated cache first (0ms latency, zero flash!)
  if (MATERIAL_CACHE[normalizedId]) {
    return MATERIAL_CACHE[normalizedId];
  }

  const embedded = getSsrInitialMaterial();
  if (embedded && embedded.metadata?.id?.toLowerCase() === normalizedId) {
    return embedded;
  }

  const matched = ALL_UTBK_SUBCHAPTERS.find(
    (s) => s.id.toLowerCase() === normalizedId || s.id.replace('-', '.') === id
  );

  if (matched && MATERIAL_CACHE[matched.id.toLowerCase()]) {
    return MATERIAL_CACHE[matched.id.toLowerCase()];
  }

  // 2. Dynamic fetch of standalone sub-chapter JSON on client navigation
  const subtestPrefix = (matched ? matched.subtestCode : id.split('-')[0]).toLowerCase();
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const targetUrl = `${baseUrl}content/utbk/${subtestPrefix}/${normalizedId}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      const adapted = data.metadata
        ? (data as Material)
        : adaptThreeZoneMaterial(data as ThreeZoneMaterial);
      MATERIAL_CACHE[normalizedId] = adapted;
      return adapted;
    }
  } catch (err) {
    console.warn(`Could not fetch dynamic material for ${id}:`, err);
  }

  // 3. Graceful empty fallback
  const title = matched ? matched.title : `Sub-bab ${id.toUpperCase()}`;
  const subtestCode = matched ? matched.subtestCode : (id.split('-')[0].toUpperCase() as SubtestType);
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

export interface DrillingIndexData {
  total_subbab: number;
  total_soal: number;
  total_svg?: number;
  counts_by_subtest?: Record<string, number>;
  counts_by_type?: Record<string, number>;
  subchapters: Record<string, string[]>;
}

const DRILLING_BANK_CACHE: Record<string, WorkedExample[]> = {};
let drillingIndexCache: DrillingIndexData | null = null;
let drillingIndexPromise: Promise<DrillingIndexData | null> | null = null;

function getContentBaseUrl(): string {
  const rawBase = import.meta.env?.BASE_URL || '/';
  return rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
}

export async function fetchDrillingIndex(): Promise<DrillingIndexData | null> {
  if (drillingIndexCache) return drillingIndexCache;
  if (drillingIndexPromise) return drillingIndexPromise;

  drillingIndexPromise = (async () => {
    try {
      const res = await fetch(`${getContentBaseUrl()}content/drilling/index.json`);
      if (res.ok) {
        const data = (await res.json()) as DrillingIndexData;
        drillingIndexCache = data;
        return data;
      }
    } catch (err) {
      console.warn('Could not fetch drilling index:', err);
    } finally {
      drillingIndexPromise = null;
    }
    return null;
  })();

  return drillingIndexPromise;
}

export async function fetchDrillingQuestionsById(subchapterId: string): Promise<WorkedExample[]> {
  const normalizedId = subchapterId.toLowerCase().trim();
  if (DRILLING_BANK_CACHE[normalizedId]) {
    return DRILLING_BANK_CACHE[normalizedId];
  }

  const subtestPrefix = normalizedId.split('-')[0];
  const targetUrl = `${getContentBaseUrl()}content/drilling/${subtestPrefix}/${normalizedId}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      const questions = Array.isArray(data?.questions) ? (data.questions as WorkedExample[]) : [];
      DRILLING_BANK_CACHE[normalizedId] = questions;
      return questions;
    }
  } catch (err) {
    console.warn(`Could not fetch drilling bank for ${subchapterId}:`, err);
  }

  return [];
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
