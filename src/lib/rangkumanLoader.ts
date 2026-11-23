import type { RangkumanBabData, RangkumanIndexData } from '../types/rangkuman';

const RANGKUMAN_CACHE: Record<string, RangkumanBabData> = {};
let cachedIndex: RangkumanIndexData | null = null;

// Lazy glob import for Vite bundling
const lazyRangkumanModules = typeof import.meta.glob === 'function'
  ? import.meta.glob('../../content/rangkuman/*.json')
  : {};

export async function fetchRangkumanByBabId(babId: string): Promise<RangkumanBabData> {
  const normalizedId = babId.toLowerCase().trim();

  // 1. Check in-memory cache
  if (RANGKUMAN_CACHE[normalizedId]) {
    return RANGKUMAN_CACHE[normalizedId];
  }

  // 2. Try Vite dynamic module loader
  const globKeys = Object.keys(lazyRangkumanModules);
  const matchedKey = globKeys.find(
    (k) => k.toLowerCase().endsWith(`/${normalizedId}.json`)
  );

  if (matchedKey && typeof lazyRangkumanModules[matchedKey] === 'function') {
    try {
      const loader = lazyRangkumanModules[matchedKey];
      const mod = (await loader()) as any;
      const data = (mod.default || mod) as RangkumanBabData;
      if (data && data.kode_bab) {
        RANGKUMAN_CACHE[normalizedId] = data;
        return data;
      }
    } catch (err) {
      console.warn(`Dynamic glob load failed for rangkuman ${babId}:`, err);
    }
  }

  // 3. Runtime Fetch Fallback
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
