import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const MATERI_DIR = path.join(ROOT_DIR, 'output_materi');
const DETAIL_DIR = path.join(ROOT_DIR, 'output_detail_materi');
const VISUAL_DIR = path.join(ROOT_DIR, 'output_visual_pass3');
const BACKUP_DIR = path.join(ROOT_DIR, 'backup_materi_pass1');
const CONTENT_UTBK_DIR = path.join(ROOT_DIR, 'content', 'utbk');
const PUBLIC_UTBK_DIR = path.join(ROOT_DIR, 'public', 'content', 'utbk');

// Subtest prefixes
const SUBTEST_DIRS = ['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'];

// ============================================================================
// HELPER: Normalisasi Mermaid
// ============================================================================
export function normalizeMermaidCode(code) {
  if (!code) return '';
  // 1. Ubah literal \n ganda (\\n) menjadi newline asli (\n)
  let normalized = code.replace(/\\n/g, '\n');

  // 2. Bungkus label node keputusan {...} yang mengandung karakter < atau > dengan tanda kutip ganda jika belum
  // Contoh: {y > 10?} -> {"y > 10?"}
  // Jangan membungkus jika sudah dibungkus tanda kutip
  normalized = normalized.replace(/\{([^{}\r\n]+)\}/g, (match, inner) => {
    const trimmed = inner.trim();
    if ((trimmed.includes('<') || trimmed.includes('>')) && !(trimmed.startsWith('"') && trimmed.endsWith('"'))) {
      return `{"${trimmed}"}`;
    }
    return match;
  });

  return normalized;
}

// ============================================================================
// HELPER: Validasi SVG
// ============================================================================
export function validateSvgCode(code, slotId, fileName) {
  const warnings = [];
  const trimmed = (code || '').trim();

  if (!trimmed.startsWith('<svg')) {
    warnings.push(`[${fileName}][${slotId}] SVG tidak diawali '<svg'`);
  }
  if (!trimmed.endsWith('</svg>')) {
    warnings.push(`[${fileName}][${slotId}] SVG tidak diakhiri '</svg>'`);
  }
  if (!trimmed.includes('viewBox') && !trimmed.includes('viewbox')) {
    warnings.push(`[${fileName}][${slotId}] SVG tidak memiliki atribut 'viewBox'`);
  }

  // Cek tag berbahaya
  const lower = trimmed.toLowerCase();
  ['<script', '<foreignobject', '<image'].forEach(tag => {
    if (lower.includes(tag)) {
      warnings.push(`[${fileName}][${slotId}] SVG mengandung tag terlarang: ${tag}`);
    }
  });

  return warnings;
}

// ============================================================================
// MAIN MERGE FUNCTION
// ============================================================================
export function runIntegration() {
  console.log('===============================================================');
  console.log('🚀 MEMULAI INTEGRASI PASS-2 (DETAIL MATERI) & PASS-3 (VISUAL)');
  console.log('===============================================================');

  // 1. Backup aman folder materi sebelum modifikasi
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log(`📁 Membuat backup direktori eksisting ke '${BACKUP_DIR}'...`);
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const existingFiles = fs.readdirSync(MATERI_DIR).filter(f => f.endsWith('.json'));
    existingFiles.forEach(f => {
      fs.copyFileSync(path.join(MATERI_DIR, f), path.join(BACKUP_DIR, f));
    });
    console.log(`✅ ${existingFiles.length} file materi berhasil di-backup.`);
  } else {
    console.log(`ℹ️ Direktori backup '${BACKUP_DIR}' sudah ada. Melanjutkan proses...`);
  }

  const matFiles = fs.readdirSync(MATERI_DIR).filter(f => f.endsWith('.json'));
  console.log(`📄 Ditemukan ${matFiles.length} file materi eksisting di '${MATERI_DIR}'.`);

  const detailFiles = fs.existsSync(DETAIL_DIR)
    ? fs.readdirSync(DETAIL_DIR).filter(f => f.endsWith('.json'))
    : [];
  console.log(`📄 Ditemukan ${detailFiles.length} file di '${DETAIL_DIR}'.`);

  const visualFiles = fs.existsSync(VISUAL_DIR)
    ? fs.readdirSync(VISUAL_DIR).filter(f => f.endsWith('.json'))
    : [];
  console.log(`📄 Ditemukan ${visualFiles.length} file di '${VISUAL_DIR}'.`);

  const stats = {
    totalProcessed: 0,
    withDetailMateri: 0,
    visualSlots: {
      total: 0,
      z1: 0,
      dm: 0,
      z2: 0,
      z3: 0,
    },
    warnings: [],
  };

  // In-memory merged objects: { [kode]: materialData }
  const mergedMaterials = {};

  // --------------------------------------------------------------------------
  // LANGKAH 1: INTEGRASI PASS-2 (detail_materi_lengkap)
  // --------------------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  console.log('▶ LANGKAH 1: Mengintegrasikan Pass-2 (detail_materi_lengkap)...');
  console.log('---------------------------------------------------------------');

  for (const fileName of matFiles) {
    const filePath = path.join(MATERI_DIR, fileName);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawContent);

    const kode = fileName.replace('.json', '');
    const detailPath = path.join(DETAIL_DIR, fileName);

    if (fs.existsSync(detailPath)) {
      const rawDetail = fs.readFileSync(detailPath, 'utf8');
      const detailJson = JSON.parse(rawDetail);

      // Tangani jika file membungkusnya di dalam key "detail_materi_lengkap" maupun langsung sebagai root object
      let dm = detailJson.detail_materi_lengkap ? detailJson.detail_materi_lengkap : detailJson;
      // Deep clone to avoid mutation of source
      dm = JSON.parse(JSON.stringify(dm));

      // Pastikan data.zona_1_peta_taktis ada
      if (!data.zona_1_peta_taktis) {
        data.zona_1_peta_taktis = {};
      }

      // Pastikan tepat 1 kelompok di kelompok[] memiliki buka_default: true
      if (Array.isArray(dm.kelompok) && dm.kelompok.length > 0) {
        const trueCount = dm.kelompok.filter(k => k.buka_default === true).length;
        if (trueCount !== 1) {
          dm.kelompok.forEach((k, idx) => {
            k.buka_default = idx === 0;
          });
        }

        // Inisialisasi visual = null pada setiap butir jika belum ada
        dm.kelompok.forEach(k => {
          if (Array.isArray(k.butir)) {
            k.butir.forEach(b => {
              if (b.visual === undefined) {
                b.visual = null;
              }
            });
          }
        });
      }

      // Tambahkan +2 ke estimasi_menit_baca HANYA JIKA sebelumnya detail_materi_lengkap masih kosong/null
      const prevDm = data.zona_1_peta_taktis.detail_materi_lengkap;
      if (!prevDm) {
        const prevEst = typeof data.zona_1_peta_taktis.estimasi_menit_baca === 'number'
          ? data.zona_1_peta_taktis.estimasi_menit_baca
          : 5;
        data.zona_1_peta_taktis.estimasi_menit_baca = prevEst + 2;
      }

      data.zona_1_peta_taktis.detail_materi_lengkap = dm;
      stats.withDetailMateri++;
    } else {
      // Jika BELUM ADA: set data.zona_1_peta_taktis.detail_materi_lengkap = null
      if (!data.zona_1_peta_taktis) {
        data.zona_1_peta_taktis = {};
      }
      data.zona_1_peta_taktis.detail_materi_lengkap = null;
    }

    mergedMaterials[kode] = data;
    stats.totalProcessed++;
  }

  console.log(`✅ Langkah 1 selesai. ${stats.withDetailMateri} dari ${stats.totalProcessed} materi kini memiliki detail_materi_lengkap.`);

  // --------------------------------------------------------------------------
  // LANGKAH 2: INTEGRASI PASS-3 (Visual SVG & Mermaid)
  // --------------------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  console.log('▶ LANGKAH 2: Mengintegrasikan Pass-3 (Visual SVG & Mermaid)...');
  console.log('---------------------------------------------------------------');

  for (const vf of visualFiles) {
    const kode = vf.replace('.json', '');
    const mat = mergedMaterials[kode];

    if (!mat) {
      const warn = `File visual '${vf}' tidak memiliki file materi eksisting '${kode}.json'`;
      stats.warnings.push(warn);
      console.warn(`⚠️ ${warn}`);
      continue;
    }

    const vRaw = fs.readFileSync(path.join(VISUAL_DIR, vf), 'utf8');
    const vData = JSON.parse(vRaw);

    // Tangani baik array slots: [{ slot_id, tipe, kode, caption }] maupun dictionary { "z1": {...} }
    let slotsList = [];
    if (Array.isArray(vData.slots)) {
      slotsList = vData.slots;
    } else if (vData.slots && typeof vData.slots === 'object') {
      slotsList = Object.entries(vData.slots).map(([slotKey, slotObj]) => ({
        slot_id: slotObj.slot_id || slotKey,
        ...slotObj,
      }));
    }

    for (const slot of slotsList) {
      const slotId = slot.slot_id;
      const tipe = slot.tipe;
      let rawCode = slot.kode || '';
      const caption = slot.caption || '';

      if (!slotId || !tipe || !rawCode) {
        stats.warnings.push(`[${vf}] Slot tidak valid atau kode kosong: ${slotId}`);
        continue;
      }

      // Normalisasi Mermaid
      if (tipe === 'mermaid') {
        rawCode = normalizeMermaidCode(rawCode);
      }

      // Validasi SVG
      if (tipe === 'svg') {
        const svgWarns = validateSvgCode(rawCode, slotId, vf);
        if (svgWarns.length > 0) {
          stats.warnings.push(...svgWarns);
        }
      }

      // Bentuk objek visual standar
      const standardVisual = {
        tipe,
        kode: rawCode,
        caption,
      };

      // Injeksi deterministik ke 4 lokasi
      if (slotId === 'z1') {
        if (!mat.zona_1_peta_taktis) mat.zona_1_peta_taktis = {};
        mat.zona_1_peta_taktis.visual = standardVisual;
        stats.visualSlots.z1++;
        stats.visualSlots.total++;
      } else if (/^dm_k(\d+)_b(\d+)$/.test(slotId)) {
        const match = slotId.match(/^dm_k(\d+)_b(\d+)$/);
        const k = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);

        const dm = mat.zona_1_peta_taktis?.detail_materi_lengkap;
        if (dm?.kelompok?.[k]?.butir?.[b]) {
          dm.kelompok[k].butir[b].visual = standardVisual;
          stats.visualSlots.dm++;
          stats.visualSlots.total++;
        } else {
          const warn = `[${vf}] Indeks slot '${slotId}' tidak ditemukan di detail_materi_lengkap (k=${k}, b=${b})`;
          stats.warnings.push(warn);
          console.warn(`⚠️ ${warn}`);
        }
      } else if (/^z2_v(\d+)$/.test(slotId)) {
        const match = slotId.match(/^z2_v(\d+)$/);
        const n = parseInt(match[1], 10);
        const idx = n - 1;

        if (Array.isArray(mat.zona_2_variasi_inti) && mat.zona_2_variasi_inti[idx]) {
          mat.zona_2_variasi_inti[idx].visual = standardVisual;
          stats.visualSlots.z2++;
          stats.visualSlots.total++;
        } else {
          const warn = `[${vf}] Indeks slot '${slotId}' tidak ditemukan di zona_2_variasi_inti (variasi ke-${n})`;
          stats.warnings.push(warn);
          console.warn(`⚠️ ${warn}`);
        }
      } else if (/^z3_s(\d+)$/.test(slotId)) {
        const match = slotId.match(/^z3_s(\d+)$/);
        const n = parseInt(match[1], 10);
        const idx = n - 1;

        if (Array.isArray(mat.zona_3_uji_pemahaman) && mat.zona_3_uji_pemahaman[idx]) {
          mat.zona_3_uji_pemahaman[idx].visual = standardVisual;
          stats.visualSlots.z3++;
          stats.visualSlots.total++;
        } else {
          const warn = `[${vf}] Indeks slot '${slotId}' tidak ditemukan di zona_3_uji_pemahaman (soal ke-${n})`;
          stats.warnings.push(warn);
          console.warn(`⚠️ ${warn}`);
        }
      } else {
        const warn = `[${vf}] Format slot_id tidak dikenali: '${slotId}'`;
        stats.warnings.push(warn);
        console.warn(`⚠️ ${warn}`);
      }
    }
  }

  console.log(`✅ Langkah 2 selesai. Total ${stats.visualSlots.total} slot visual terpasang.`);

  // --------------------------------------------------------------------------
  // LANGKAH 3: SIMPAN FILE & VALIDASI INTEGRITAS
  // --------------------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  console.log('▶ LANGKAH 3: Menyimpan hasil merge ke output_materi, content/utbk, & public/content/utbk...');
  console.log('---------------------------------------------------------------');

  // Pastikan folder subtes ada di content/utbk dan public/content/utbk
  SUBTEST_DIRS.forEach(sub => {
    const d1 = path.join(CONTENT_UTBK_DIR, sub);
    const d2 = path.join(PUBLIC_UTBK_DIR, sub);
    if (!fs.existsSync(d1)) fs.mkdirSync(d1, { recursive: true });
    if (!fs.existsSync(d2)) fs.mkdirSync(d2, { recursive: true });
  });

  for (const [kode, data] of Object.entries(mergedMaterials)) {
    const fileName = `${kode}.json`;
    const jsonStr = JSON.stringify(data, null, 2);

    // Verifikasi JSON parsing
    try {
      JSON.parse(jsonStr);
    } catch (e) {
      throw new Error(`JSON serialization integrity error pada ${fileName}: ${e.message}`);
    }

    // 1. Tulis ke output_materi
    fs.writeFileSync(path.join(MATERI_DIR, fileName), jsonStr, 'utf8');

    // 2. Tulis ke content/utbk/<subtest> dan public/content/utbk/<subtest>
    const prefix = kode.split('-')[0].toLowerCase();
    if (SUBTEST_DIRS.includes(prefix)) {
      fs.writeFileSync(path.join(CONTENT_UTBK_DIR, prefix, fileName), jsonStr, 'utf8');
      fs.writeFileSync(path.join(PUBLIC_UTBK_DIR, prefix, fileName), jsonStr, 'utf8');
    }
  }

  // --------------------------------------------------------------------------
  // CETAK LAPORAN RINGKASAN INTEGRITAS
  // --------------------------------------------------------------------------
  console.log('\n===============================================================');
  console.log('📊 LAPORAN RINGKASAN INTEGRASI DATA (PASS-2 & PASS-3)');
  console.log('===============================================================');
  console.log(`Total File Materi Terproses:               ${stats.totalProcessed}`);
  console.log(`Total Sub-bab Punya detail_materi_lengkap: ${stats.withDetailMateri} / ${stats.totalProcessed}`);
  console.log(`Total Slot Visual Terpasang:               ${stats.visualSlots.total}`);
  console.log(`  - Zona 1 (z1):                           ${stats.visualSlots.z1}`);
  console.log(`  - Detail Materi (dm):                    ${stats.visualSlots.dm}`);
  console.log(`  - Zona 2 Variasi Inti (z2):              ${stats.visualSlots.z2}`);
  console.log(`  - Zona 3 Uji Pemahaman (z3):             ${stats.visualSlots.z3}`);
  console.log(`Total Warnings:                            ${stats.warnings.length}`);
  if (stats.warnings.length > 0) {
    console.log('\nDaftar Warning:');
    stats.warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
  } else {
    console.log('Semua slot terpasang deterministik tanpa peringatan! 🎉');
  }
  console.log('===============================================================\n');

  return stats;
}

// Execute if run directly
if (process.argv[1] && process.argv[1].endsWith('integrate_materials.mjs')) {
  runIntegration();
}
