import type { RangkumanBabData, RangkumanIndexData } from '../types/rangkuman';
import { readEmbeddedPageData } from './contentLoader';

const RANGKUMAN_CACHE: Record<string, RangkumanBabData> = {};
let cachedIndex: RangkumanIndexData | null = null;

interface EmbeddedRangkumanPayload {
  babData?: RangkumanBabData | null;
  indexData?: RangkumanIndexData | null;
}

/**
 * Synchronously reads pre-rendered Rangkuman payload from #__PAGE_DATA__
 * to avoid extra network fetch during initial hydration.
 */
export function getInitialRangkumanFromPageData(): EmbeddedRangkumanPayload {
  const raw = readEmbeddedPageData<Record<string, unknown>>();
  if (!raw || typeof raw !== 'object') return {};

  if ('babData' in raw || 'indexData' in raw) {
    const payload = raw as EmbeddedRangkumanPayload;
    if (payload.babData?.kode_bab) {
      RANGKUMAN_CACHE[payload.babData.kode_bab.toLowerCase()] = payload.babData;
    }
    if (payload.indexData?.daftar_subtes) {
      cachedIndex = payload.indexData;
    }
    return payload;
  }

  if ('kode_bab' in raw && typeof raw.kode_bab === 'string') {
    const bab = raw as unknown as RangkumanBabData;
    RANGKUMAN_CACHE[bab.kode_bab.toLowerCase()] = bab;
    return { babData: bab };
  }

  if ('daftar_subtes' in raw && Array.isArray(raw.daftar_subtes)) {
    const idx = raw as unknown as RangkumanIndexData;
    cachedIndex = idx;
    return { indexData: idx };
  }

  return {};
}

export async function fetchRangkumanByBabId(babId: string): Promise<RangkumanBabData> {
  const normalizedId = babId.toLowerCase().trim();

  // 1. Check in-memory / hydrated cache first (0ms latency)
  if (RANGKUMAN_CACHE[normalizedId]) {
    return RANGKUMAN_CACHE[normalizedId];
  }

  const hydrated = getInitialRangkumanFromPageData();
  if (hydrated.babData?.kode_bab?.toLowerCase() === normalizedId) {
    return hydrated.babData;
  }

  // 2. Runtime Fetch of standalone rangkuman JSON
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const targetUrl = `${baseUrl}content/rangkuman/${normalizedId}.json`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = (await res.json()) as RangkumanBabData;
      RANGKUMAN_CACHE[normalizedId] = data;
      return data;
    }
  } catch (err) {
    console.warn(`Fetch failed for rangkuman ${babId}:`, err);
  }

  throw new Error(`Data rangkuman untuk bab ${babId} tidak ditemukan.`);
}

export async function fetchRangkumanIndex(): Promise<RangkumanIndexData> {
  if (cachedIndex) return cachedIndex;

  const hydrated = getInitialRangkumanFromPageData();
  if (hydrated.indexData) return hydrated.indexData;

  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // Try index.json first, then index_rangkuman.json
  const candidateUrls = [
    `${baseUrl}content/rangkuman/index.json`,
    `${baseUrl}content/rangkuman/index_rangkuman.json`,
  ];

  for (const targetUrl of candidateUrls) {
    try {
      const res = await fetch(targetUrl);
      if (res.ok) {
        const data = (await res.json()) as RangkumanIndexData;
        if (data && data.daftar_subtes) {
          cachedIndex = data;
          return data;
        }
      }
    } catch {}
  }

  // Fallback empty index
  return { total_bab: 0, total_subbab: 0, total_butir: 0, daftar_subtes: [] };
}
