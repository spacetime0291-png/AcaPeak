import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeJsonStrings } from './normalize_markdown.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Resolve source and destination directories
const candidateSourceDirs = [
  path.resolve(__dirname, '../../audit materi - Copy/output_rangkuman_final'),
  path.resolve(__dirname, '../output_rangkuman_final'),
  path.resolve('d:/audit materi - Copy/output_rangkuman_final'),
  path.resolve('output_rangkuman_final'),
  path.resolve('d:/web/output_rangkuman_final'),
];

let srcDir = candidateSourceDirs.find((d) => fs.existsSync(d));

if (!srcDir) {
  console.error('❌ Could not find output_rangkuman_final directory!');
  process.exit(1);
}

// Target directories (content/rangkuman and public/content/rangkuman)
const candidateWebRoots = [
  path.resolve(__dirname, '..'),
  path.resolve('d:/web'),
  process.cwd(),
];

let webRoot = candidateWebRoots.find((r) => fs.existsSync(path.join(r, 'package.json')));
if (!webRoot) {
  webRoot = path.resolve(__dirname, '..');
}

const targetContentDir = path.join(webRoot, 'content/rangkuman');
const targetPublicDir = path.join(webRoot, 'public/content/rangkuman');

console.log('🔄 Syncing Rangkuman Files:');
console.log(`📁 Source: ${srcDir}`);
console.log(`📁 Target Content: ${targetContentDir}`);
console.log(`📁 Target Public:  ${targetPublicDir}`);

if (!fs.existsSync(targetContentDir)) {
  fs.mkdirSync(targetContentDir, { recursive: true });
}
if (!fs.existsSync(targetPublicDir)) {
  fs.mkdirSync(targetPublicDir, { recursive: true });
}

// 2. Read and normalize files
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.json'));
console.log(`🔍 Found ${files.length} JSON files in source directory.\n`);

const SUBTEST_ORDER = ['PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBE', 'PM'];

function getSubtestCodeFromKodeBab(kodeBab) {
  const prefix = kodeBab.split('-')[0].toUpperCase();
  return prefix;
}

let totalProcessedBabs = 0;
let totalProcessedSubbabs = 0;
let totalProcessedButir = 0;
let normalizedGroupTitles = 0;

const processedBabs = [];

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Normalization 1: Remove polish_meta if present
  if (rawData.polish_meta) {
    delete rawData.polish_meta;
  }

  // Normalization 2: Validation of required top-level fields
  if (!rawData.kode_bab || !rawData.subtes || !rawData.bab || rawData.estimasi_menit_review === undefined) {
    throw new Error(`Invalid file format in ${file}: missing top-level metadata.`);
  }

  if (!Array.isArray(rawData.daftar_subbab) || rawData.daftar_subbab.length === 0) {
    throw new Error(`Invalid file format in ${file}: daftar_subbab must be a non-empty array.`);
  }

  let babButirCount = 0;

  // Normalization 3: Clean kelompok names and validate subbab
  for (const subbab of rawData.daftar_subbab) {
    if (!subbab.kode_subbab || !subbab.judul_subbab || !subbab.inti_subbab || !subbab.label_kolom) {
      throw new Error(`Invalid subbab format in ${file} (${subbab.kode_subbab}): missing essential fields.`);
    }

    if (!Array.isArray(subbab.kelompok) || subbab.kelompok.length === 0) {
      throw new Error(`Invalid kelompok format in ${file} (${subbab.kode_subbab}): kelompok must be non-empty.`);
    }

    for (const kel of subbab.kelompok) {
      if (!kel.nama_kelompok) {
        throw new Error(`Missing nama_kelompok in ${file} (${subbab.kode_subbab})`);
      }

      // Regex remove leading numbering like "1. ", "2. ", etc.
      const originalName = kel.nama_kelompok;
      const cleanedName = originalName.replace(/^\d+\.\s*/, '').trim();
      if (cleanedName !== originalName) {
        normalizedGroupTitles++;
        kel.nama_kelompok = cleanedName;
      }

      if (!Array.isArray(kel.butir) || kel.butir.length === 0) {
        throw new Error(`Missing butir in ${file} (${subbab.kode_subbab} - ${kel.nama_kelompok})`);
      }

      for (const b of kel.butir) {
        if (!b.judul || !b.teori_singkat || !b.contoh) {
          throw new Error(`Invalid butir in ${file} (${subbab.kode_subbab}): butir must have judul, teori_singkat, and contoh.`);
        }
        babButirCount++;
      }
    }
  }

  // Ensure consistent naming for kode_bab (lowercase)
  rawData.kode_bab = rawData.kode_bab.toLowerCase().trim();
  const cleanFileName = `${rawData.kode_bab}.json`;

  // Normalize literal escaped newlines across all markdown fields
  const normalizedData = normalizeJsonStrings(rawData);

  // Write normalized clean file
  const jsonContent = JSON.stringify(normalizedData, null, 2);
  fs.writeFileSync(path.join(targetContentDir, cleanFileName), jsonContent, 'utf8');
  fs.writeFileSync(path.join(targetPublicDir, cleanFileName), jsonContent, 'utf8');

  totalProcessedBabs++;
  totalProcessedSubbabs += rawData.daftar_subbab.length;
  totalProcessedButir += babButirCount;

  // Prepare index entry
  processedBabs.push({
    kode_bab: rawData.kode_bab,
    bab: rawData.bab,
    nama_bab: rawData.bab, // backwards-compatible alias
    subtes: rawData.subtes,
    subtes_code: getSubtestCodeFromKodeBab(rawData.kode_bab),
    estimasi_menit_review: rawData.estimasi_menit_review,
    jumlah_subbab: rawData.daftar_subbab.length,
    total_butir: babButirCount,
    subbab: rawData.daftar_subbab.map((sb) => ({
      kode_subbab: sb.kode_subbab,
      judul_subbab: sb.judul_subbab,
      klasifikasi_materi: sb.klasifikasi_materi || 'INTI',
      mode_tampilan: sb.mode_tampilan,
    })),
    daftar_subbab: rawData.daftar_subbab.map((sb) => ({
      kode_subbab: sb.kode_subbab,
      judul_subbab: sb.judul_subbab,
      klasifikasi_materi: sb.klasifikasi_materi || 'INTI',
      mode_tampilan: sb.mode_tampilan,
    })),
  });
}

// 3. Group by 7 UTBK Subtests in exact order: PU, PPU, PBM, PK, LBI, LBE, PM
const subtestGroups = [];

for (const code of SUBTEST_ORDER) {
  const babs = processedBabs
    .filter((b) => b.subtes_code === code)
    .sort((a, b) => a.kode_bab.localeCompare(b.kode_bab, undefined, { numeric: true }));

  if (babs.length > 0) {
    subtestGroups.push({
      subtes_id: code,
      subtes: babs[0].subtes,
      daftar_bab: babs,
    });
  }
}

const indexPayload = {
  total_bab: totalProcessedBabs,
  total_subbab: totalProcessedSubbabs,
  total_butir: totalProcessedButir,
  daftar_subtes: subtestGroups,
};

// Write index.json and index_rangkuman.json to both content/rangkuman and public/content/rangkuman
const indexJsonStr = JSON.stringify(indexPayload, null, 2);
fs.writeFileSync(path.join(targetContentDir, 'index.json'), indexJsonStr, 'utf8');
fs.writeFileSync(path.join(targetPublicDir, 'index.json'), indexJsonStr, 'utf8');
fs.writeFileSync(path.join(targetContentDir, 'index_rangkuman.json'), indexJsonStr, 'utf8');
fs.writeFileSync(path.join(targetPublicDir, 'index_rangkuman.json'), indexJsonStr, 'utf8');

console.log('==================================================');
console.log('✅ SYNC & NORMALISASI RANGKUMAN SELESAI');
console.log('==================================================');
console.log(`📚 Total Bab Terintegrasi     : ${totalProcessedBabs}`);
console.log(`📑 Total Sub-bab              : ${totalProcessedSubbabs} (Harus 106)`);
console.log(`💡 Total Poin Teori & Contoh  : ${totalProcessedButir}`);
console.log(`✨ Nama Kelompok Dinormalisasi: ${normalizedGroupTitles}`);
console.log(`🎯 Subtes Terkelompokkan      : ${subtestGroups.map((s) => s.subtes_id).join(' -> ')}`);
console.log('==================================================\n');
