import fs from 'fs';
import path from 'path';

const PLACEHOLDER_PATTERNS = [
  'materi untuk sub-bab ini sedang dipersiapkan',
  'sedang dalam penyusunan',
  'coming soon',
  'placeholder',
];

/**
 * Safely serializes JSON for embedding inside <script id="__PAGE_DATA__" type="application/json">
 * Escapes `<`, `>`, `&`, and Unicode line separators so `</script>` inside content never breaks HTML.
 */
export function safeJsonSerialize(data) {
  if (data === null || data === undefined) return 'null';
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * Checks whether a UTBK material JSON has substantial educational content
 * (not an empty stub or placeholder) so thin pages are excluded from indexing/sitemap.
 */
export function isSubstantialMaterial(raw) {
  if (!raw || typeof raw !== 'object') return false;

  const coreMarkdown = String(
    raw.zona_1_peta_taktis?.konsep_inti_markdown ||
      raw.content?.exam_blueprint_markdown ||
      ''
  ).trim();

  if (coreMarkdown.length < 100) return false;

  const lowerCore = coreMarkdown.toLowerCase();
  if (PLACEHOLDER_PATTERNS.some((p) => lowerCore.includes(p))) {
    return false;
  }

  const hasVariations =
    Array.isArray(raw.zona_2_variasi_inti) && raw.zona_2_variasi_inti.length >= 1;
  const hasQuestions =
    (Array.isArray(raw.zona_3_uji_pemahaman) && raw.zona_3_uji_pemahaman.length >= 1) ||
    (Array.isArray(raw.worked_examples) && raw.worked_examples.length >= 1);

  return hasVariations || hasQuestions;
}

/**
 * Checks whether a Rangkuman Bab JSON has substantial cheat-sheet content.
 */
export function isSubstantialRangkuman(raw) {
  if (!raw || typeof raw !== 'object') return false;
  const subbabList = Array.isArray(raw.daftar_subbab)
    ? raw.daftar_subbab
    : Array.isArray(raw.subbab)
    ? raw.subbab
    : [];
  if (subbabList.length === 0) return false;

  const totalButir = subbabList.reduce((acc, sb) => {
    if (!Array.isArray(sb.kelompok)) return acc;
    return (
      acc +
      sb.kelompok.reduce(
        (gAcc, grp) => gAcc + (Array.isArray(grp.butir) ? grp.butir.length : 0),
        0
      )
    );
  }, 0);

  return totalButir >= 1;
}

/**
 * Resolves and reads a material JSON file from public/content/utbk or content/utbk.
 */
export async function readMaterialJsonAsync(rootDir, subtestCode, matId) {
  const subPrefix = subtestCode.toLowerCase();
  const cleanId = matId.toLowerCase();
  const candidates = [
    path.join(rootDir, 'public/content/utbk', subPrefix, `${cleanId}.json`),
    path.join(rootDir, 'content/utbk', subPrefix, `${cleanId}.json`),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      try {
        const text = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(text);
      } catch {
        // try next candidate
      }
    }
  }
  return null;
}

/**
 * Synchronous variant for sitemap generation.
 */
export function readMaterialJsonSync(rootDir, subtestCode, matId) {
  const subPrefix = subtestCode.toLowerCase();
  const cleanId = matId.toLowerCase();
  const candidates = [
    path.join(rootDir, 'public/content/utbk', subPrefix, `${cleanId}.json`),
    path.join(rootDir, 'content/utbk', subPrefix, `${cleanId}.json`),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        // try next candidate
      }
    }
  }
  return null;
}

/**
 * Reads a Rangkuman Bab JSON asynchronously.
 */
export async function readRangkumanJsonAsync(rootDir, babCode) {
  const cleanBab = babCode.toLowerCase();
  const candidates = [
    path.join(rootDir, 'content/rangkuman', `${cleanBab}.json`),
    path.join(rootDir, 'public/content/rangkuman', `${cleanBab}.json`),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      try {
        const text = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(text);
      } catch {
        // try next candidate
      }
    }
  }
  return null;
}

export function readRangkumanJsonSync(rootDir, babCode) {
  const cleanBab = babCode.toLowerCase();
  const candidates = [
    path.join(rootDir, 'content/rangkuman', `${cleanBab}.json`),
    path.join(rootDir, 'public/content/rangkuman', `${cleanBab}.json`),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        // try next candidate
      }
    }
  }
  return null;
}
