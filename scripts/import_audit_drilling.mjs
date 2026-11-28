import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const AUDIT_FINAL_JSON_DIR = process.env.AUDIT_DRILLING_JSON_DIR || 'D:/audit drilling/final_json';
const OUTPUT_MATERI_DIR = path.join(ROOT_DIR, 'output_materi');
const ARCHIVE_DIR = path.join(ROOT_DIR, 'archive', 'drilling_soal_lama_315');
const DRILLING_PUBLIC_DIR = path.join(ROOT_DIR, 'public', 'content', 'drilling');
const SYLLABUS_LIGHT_PATH = path.join(ROOT_DIR, 'src', 'data', 'syllabus-light.json');

const SUBTESTS = ['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'];

function buildSyllabusTitleMap() {
  const map = {};
  if (!fs.existsSync(SYLLABUS_LIGHT_PATH)) return map;
  const syllabus = JSON.parse(fs.readFileSync(SYLLABUS_LIGHT_PATH, 'utf8'));
  for (const st of syllabus) {
    for (const mod of st.modules || []) {
      for (const sub of mod.subtopics || []) {
        map[sub.id.toLowerCase()] = {
          title: sub.title,
          subtest: st.code,
          bab: mod.title,
        };
      }
    }
  }
  return map;
}

/**
 * Step 1: Archive all 315 legacy drilling questions currently sourced from zona_3_uji_pemahaman
 */
function archiveCurrentDrillingQuestions() {
  if (!fs.existsSync(OUTPUT_MATERI_DIR)) {
    throw new Error(`Directory not found: ${OUTPUT_MATERI_DIR}`);
  }

  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  const files = fs.readdirSync(OUTPUT_MATERI_DIR).filter((f) => f.endsWith('.json')).sort();

  const archivedItems = [];
  const bySubtest = {};

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(OUTPUT_MATERI_DIR, file), 'utf8'));
    const kode = (raw.kode_subbab || file.replace('.json', '')).toLowerCase();
    const prefix = kode.split('-')[0].toUpperCase();
    const soalList = Array.isArray(raw.zona_3_uji_pemahaman) ? raw.zona_3_uji_pemahaman : [];

    bySubtest[prefix] = (bySubtest[prefix] || 0) + soalList.length;

    for (const soal of soalList) {
      archivedItems.push({
        kode_subbab: kode,
        subtes: raw.subtes,
        bab: raw.bab,
        judul_subbab: raw.judul_subbab,
        legacy_example_id: `${kode}-ex${soal.nomor_soal}`,
        ...soal,
      });
    }
  }

  const manifest = {
    archived_at: new Date().toISOString(),
    source: 'output_materi/*.json (zona_3_uji_pemahaman)',
    total_files: files.length,
    total_questions_archived: archivedItems.length,
    counts_by_subtest: bySubtest,
    note: 'Arsip seluruh data drilling soal lama (315 soal dari zona_3_uji_pemahaman) sebelum beralih sepenuhnya ke bank 4240 soal audit drilling.',
  };

  fs.writeFileSync(
    path.join(ARCHIVE_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ARCHIVE_DIR, 'all_questions_315.json'),
    JSON.stringify({ manifest, questions: archivedItems }, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ARCHIVE_DIR, 'README.md'),
    `# Arsip Data Drilling Soal Lama (315 Soal)\n\n` +
      `- **Tanggal Arsip:** ${manifest.archived_at}\n` +
      `- **Total Soal:** ${archivedItems.length} soal dari ${files.length} sub-bab\n` +
      `- **Sumber Lama:** \`zona_3_uji_pemahaman\` pada \`output_materi/*.json\`\n\n` +
      `Data ini diarsipkan agar mode Drilling UTBK-SNBT hanya menggunakan 4.240 soal tervalidasi dari \`audit drilling\`.\n`,
    'utf8'
  );

  console.log(`✅ Archived ${archivedItems.length} legacy drilling questions to ${ARCHIVE_DIR}`);
  return manifest;
}

/**
 * Parse PGK_TABEL answer key such as:
 * "1. True, 2. False, 3. False, 4. False"
 * or "1. True | 2. False | 3. False | 4. True"
 */
function parseTableAnswerKey(rawKey, pernyataanList) {
  const parts = String(rawKey || '')
    .split(/\s*[|,]\s*(?=\d+\.)|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const byNum = {};
  for (const part of parts) {
    const m = part.match(/^(\d+)\.\s*(.+)$/);
    if (m) {
      byNum[parseInt(m[1], 10)] = m[2].trim();
    }
  }

  return pernyataanList.map((p, idx) => {
    const no = p.no ?? idx + 1;
    const headers = Array.isArray(p.opsi_tersedia) && p.opsi_tersedia.length >= 2
      ? p.opsi_tersedia
      : ['Benar', 'Salah'];
    const col0 = headers[0];
    const answerVal = (byNum[no] || '').trim().toLowerCase();
    const isTrue =
      answerVal === col0.trim().toLowerCase() ||
      answerVal === 'true' ||
      answerVal === 'benar' ||
      answerVal === 'sesuai';

    return {
      id: `s${no}`,
      statement_markdown: p.pernyataan,
      is_true: isTrue,
    };
  });
}

function getQuestionTypeMapping(tipeSoal) {
  switch (tipeSoal) {
    case 'PG_TUNGGAL':
      return { question_type: 'standard_mc', label: 'Pilihan Ganda' };
    case 'PGK_TABEL':
      return { question_type: 'mc_complex_table', label: 'PGK Tabel' };
    case 'PGK_MCMA':
      return { question_type: 'mc_complex_checkbox', label: 'PGK Pilihan Ganda Majemuk' };
    case 'ISIAN_SINGKAT':
      return { question_type: 'short_answer', label: 'Isian Singkat' };
    default:
      return { question_type: 'standard_mc', label: tipeSoal };
  }
}

function convertAuditQuestion(s, meta, syllabusMap) {
  const kode = meta.kode.toLowerCase();
  const subtestCode = kode.split('-')[0].toUpperCase();
  const syl = syllabusMap[kode];
  const cleanSubBabTitle =
    syl?.title ||
    (meta.sub_bab || '').replace(/^Sub-bab\s+[\d.]+:\s*/i, '').trim() ||
    kode.toUpperCase();

  const { question_type, label } = getQuestionTypeMapping(s.tipe_soal);
  const difficulty = s.level_kognitif === 'HOTS' ? 'hard' : 'medium';

  const contextText = (s.stimulus?.teks || '').trim();
  const svgCode = (s.stimulus?.svg || '').trim();
  const cleanPembahasan = (s.pembahasan || '').replace(/\n+---\s*$/, '').trim();

  const base = {
    example_id: s.id_soal,
    variation_name: cleanSubBabTitle,
    subtest_code: subtestCode,
    subchapter_id: kode,
    subchapter_title: cleanSubBabTitle,
    level_kognitif: s.level_kognitif || 'Standar',
    question_type_label: label,
    difficulty,
    question_type,
    context_markdown: contextText || null,
    svg_illustration: svgCode ? { id: `${s.id_soal}-svg`, svg_code: svgCode } : null,
    question_markdown: (s.pertanyaan || '').trim(),
    conceptual_solution_markdown: cleanPembahasan,
  };

  if (s.passage_group_id) {
    base.passage_group_id = s.passage_group_id;
  }

  const opsi = s.opsi_jawaban || {};

  if (s.tipe_soal === 'PG_TUNGGAL') {
    const pilihan = opsi.pilihan || {};
    base.options = Object.entries(pilihan).map(([key, text]) => ({
      key,
      text_markdown: String(text).trim(),
    }));
    base.correct_answer = String(s.kunci_jawaban || '').trim().toUpperCase();
  } else if (s.tipe_soal === 'PGK_MCMA') {
    const pilihan = opsi.pilihan || {};
    base.options = Object.entries(pilihan).map(([key, text]) => ({
      key,
      text_markdown: String(text).trim(),
    }));
    base.correct_answer = String(s.kunci_jawaban || '').trim();
  } else if (s.tipe_soal === 'PGK_TABEL') {
    const perns = Array.isArray(opsi.pernyataan) ? opsi.pernyataan : [];
    const headers =
      perns[0]?.opsi_tersedia && perns[0].opsi_tersedia.length >= 2
        ? [perns[0].opsi_tersedia[0], perns[0].opsi_tersedia[1]]
        : ['Benar', 'Salah'];
    base.table_headers = headers;
    base.complex_statements = parseTableAnswerKey(s.kunci_jawaban, perns);
    base.options = [];
    base.correct_answer = String(s.kunci_jawaban || '').trim();
  } else if (s.tipe_soal === 'ISIAN_SINGKAT') {
    const key = String(s.kunci_jawaban || '').trim();
    base.options = [];
    base.short_answer_key = key;
    base.correct_answer = key;
    if (opsi.petunjuk) {
      base.short_answer_instruction = String(opsi.petunjuk).trim();
    }
  }

  return base;
}

/**
 * Step 2: Import all 4240 questions from D:\audit drilling\final_json
 */
function importAuditDrillingBank() {
  if (!fs.existsSync(AUDIT_FINAL_JSON_DIR)) {
    throw new Error(`Audit drilling folder not found: ${AUDIT_FINAL_JSON_DIR}`);
  }

  const syllabusMap = buildSyllabusTitleMap();

  if (fs.existsSync(DRILLING_PUBLIC_DIR)) {
    fs.rmSync(DRILLING_PUBLIC_DIR, { recursive: true, force: true });
  }
  for (const sub of SUBTESTS) {
    fs.mkdirSync(path.join(DRILLING_PUBLIC_DIR, sub), { recursive: true });
  }

  const files = fs.readdirSync(AUDIT_FINAL_JSON_DIR).filter((f) => f.endsWith('.json')).sort();
  let totalQuestions = 0;
  let totalSvg = 0;
  const subtestTotals = {};
  const subchapterIndex = {};
  const typeCounts = {};

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(AUDIT_FINAL_JSON_DIR, file), 'utf8'));
    const meta = raw.metadata || {};
    const kode = (meta.kode || file.replace('.json', '')).toLowerCase();
    const prefix = kode.split('-')[0].toLowerCase();

    if (!SUBTESTS.includes(prefix)) {
      throw new Error(`Unknown subtest prefix '${prefix}' in ${file}`);
    }

    const daftarSoal = Array.isArray(raw.daftar_soal) ? raw.daftar_soal : [];
    const questions = daftarSoal.map((s) => convertAuditQuestion(s, { ...meta, kode }, syllabusMap));

    for (const q of questions) {
      totalQuestions++;
      typeCounts[q.question_type] = (typeCounts[q.question_type] || 0) + 1;
      if (q.svg_illustration) totalSvg++;
    }

    const upperSub = prefix.toUpperCase();
    subtestTotals[upperSub] = (subtestTotals[upperSub] || 0) + questions.length;
    subchapterIndex[kode] = questions.map((q) => q.example_id);

    const outDoc = {
      kode_subbab: kode,
      subtest: upperSub,
      subchapter_title: syllabusMap[kode]?.title || meta.sub_bab || kode,
      total_soal: questions.length,
      questions,
    };

    const destPath = path.join(DRILLING_PUBLIC_DIR, prefix, `${kode}.json`);
    fs.writeFileSync(destPath, JSON.stringify(outDoc), 'utf8');
  }

  const indexDoc = {
    generated_at: new Date().toISOString(),
    source: 'audit drilling/final_json',
    total_subbab: files.length,
    total_soal: totalQuestions,
    total_svg: totalSvg,
    counts_by_subtest: subtestTotals,
    counts_by_type: typeCounts,
    subchapters: subchapterIndex,
  };

  fs.writeFileSync(
    path.join(DRILLING_PUBLIC_DIR, 'index.json'),
    JSON.stringify(indexDoc),
    'utf8'
  );

  console.log(`✅ Imported ${totalQuestions} audited drilling questions (${files.length} files, ${totalSvg} SVGs) to ${DRILLING_PUBLIC_DIR}`);
  console.log('   Subtest totals:', subtestTotals);
  console.log('   Type counts:', typeCounts);
  return indexDoc;
}

archiveCurrentDrillingQuestions();
importAuditDrillingBank();
