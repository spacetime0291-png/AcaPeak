import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, 'PROJECT_CONTEXT.md');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < 1024) return `${stats.size} B`;
    return `${(stats.size / 1024).toFixed(1)} KB`;
  } catch {
    return '0 B';
  }
}

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n').length;
  } catch {
    return 0;
  }
}

function scanDirectory(dir, relativeTo = ROOT_DIR) {
  const result = [];
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(relativeTo, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      result.push(...scanDirectory(fullPath, relativeTo));
    } else {
      result.push({
        path: relPath,
        size: getFileSize(fullPath),
        lines: countLines(fullPath),
      });
    }
  }
  return result;
}

function analyzeUtbkContent() {
  const subtests = [
    { code: 'pu', name: 'Penalaran Umum (PU)' },
    { code: 'ppu', name: 'Pengetahuan & Pemahaman Umum (PPU)' },
    { code: 'pbm', name: 'Pemahaman Bacaan & Menulis (PBM)' },
    { code: 'pk', name: 'Pengetahuan Kuantitatif (PK)' },
    { code: 'lbi', name: 'Literasi Bahasa Indonesia (LBI)' },
    { code: 'lbe', name: 'Literasi Bahasa Inggris (LBE)' },
    { code: 'pm', name: 'Penalaran Matematika (PM)' },
  ];

  const summary = {
    totalSubchapters: 0,
    totalVariations: 0,
    totalQuestions: 0,
    subtests: [],
  };

  for (const sub of subtests) {
    const dir = path.join(ROOT_DIR, 'content/utbk', sub.code);
    if (!fs.existsSync(dir)) {
      summary.subtests.push({ ...sub, subchapters: 0, variations: 0, questions: 0, files: [] });
      continue;
    }

    const files = fs.readdirSync(dir).filter(f => f.startsWith(`${sub.code}-`) && f.endsWith('.json'));
    let subQuestions = 0;
    let subVariations = 0;
    const list = [];

    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        const qCount = (data.zona_3_uji_pemahaman ? data.zona_3_uji_pemahaman.length : 0) || (data.worked_examples ? data.worked_examples.length : 0);
        const vCount = (data.zona_2_variasi_inti ? data.zona_2_variasi_inti.length : 0);
        subQuestions += qCount;
        subVariations += vCount;
        list.push({
          id: data.kode_subbab || data.metadata?.id || file.replace('.json', ''),
          title: data.judul_subbab || data.metadata?.title || 'Unknown',
          chapter: data.bab || `${data.metadata?.chapter_num || '?'}. ${data.metadata?.chapter_title || ''}`,
          variations: vCount,
          questions: qCount,
        });
      } catch {
        // skip
      }
    }

    summary.totalSubchapters += files.length;
    summary.totalVariations += subVariations;
    summary.totalQuestions += subQuestions;
    summary.subtests.push({
      ...sub,
      subchapters: files.length,
      variations: subVariations,
      questions: subQuestions,
      files: list,
    });
  }

  return summary;
}

function generateSummary() {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  const utbkContent = analyzeUtbkContent();
  const puSubtest = utbkContent.subtests.find(s => s.code === 'pu') || { subchapters: 0, questions: 0, files: [] };
  const srcFiles = scanDirectory(path.join(ROOT_DIR, 'src'));
  const scriptFiles = scanDirectory(path.join(ROOT_DIR, 'scripts'));

  // Role dictionary for known files
  const fileRoles = {
    'src/App.tsx': 'Central Router & Shell: Clean Path routes (/utbk/:subtest/:materiId, /sma, /rangkuman, /drilling, legal) + legacy query redirect',
    'src/entry-client.tsx': 'React 19 client hydration entry reading #__PAGE_DATA__ synchronously',
    'src/entry-server.tsx': 'SSR entry for static pre-rendering via renderToString',
    'src/index.css': 'Tailwind CSS v4 base configuration & custom design utility classes',
    'src/types/material.ts': 'Core TypeScript interfaces: Material, WorkedExample, SvgVisualization, SubtestItem',
    'src/lib/contentLoader.ts': '0ms #__PAGE_DATA__ synchronous hydration + dynamic JSON fetch & drilling randomizer',
    'src/lib/drillingRotationEngine.ts': 'Deterministic Stratified Rotation Engine: multi-subtest balancing, difficulty wave patterning, BPPP question type quotas, seen tracking, passage grouping',
    'src/lib/syllabusData.ts': 'UTBK Syllabus definition from slim syllabus-light.json: 7 subtests (PU, PPU, PBM, PK, LBI, LBE, PM)',
    'src/lib/smaSyllabusData.ts': 'SMA curriculum syllabus data (Matematika TL, Saintek, Soshum)',
    'src/data/syllabus.ts': 'Legacy / extended UTBK curriculum syllabus items',
    'src/data/syllabus.json': 'Full syllabus metadata used by SSG/SEO build scripts',
    'src/data/syllabus-light.json': 'Slimmed client syllabus metadata (~19.5 KB) for fast initial bundle',
    'src/data/materials/puMaterials.ts': 'Barrel export: re-exports all modular PU subchapters from src/data/materials/pu/',
    'src/data/materials/pu/index.ts': 'Barrel export bundling all individual PU subchapters',
    'src/data/materials/ppuMaterials.ts': 'Barrel export: re-exports all modular PPU subchapters from src/data/materials/ppu/',
    'src/data/materials/ppu/index.ts': 'Barrel export bundling all individual PPU subchapters',
    'src/data/materials/ppu/ppu-01-01.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 1.1 (Makna Leksikal, Gramatikal, Kontekstual)',
    'src/data/materials/ppu/ppu-01-02.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 1.2 (Sinonim, Antonim, Homonim, Polisemi)',
    'src/data/materials/ppu/ppu-01-03.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 1.3 (Hipernim dan Hiponim)',
    'src/data/materials/ppu/ppu-01-04.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 1.4 (Perubahan Makna)',
    'src/data/materials/ppu/ppu-02-01.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 2.1 (Afiksasi dan Maknanya)',
    'src/data/materials/ppu/ppu-02-02.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 2.2 (Kata Ulang dan Kata Majemuk)',
    'src/data/materials/ppu/ppu-02-03.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 2.3 (Jenis dan Konstruksi Frasa)',
    'src/data/materials/ppu/ppu-02-04.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 2.4 (Kelompok Kata dan Pasangan Makna Sebidang)',
    'src/data/materials/ppu/ppu-03-01.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 3.1 (Pola Dasar Kalimat S-P-O-K-Pel)',
    'src/data/materials/ppu/ppu-03-02.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 3.2 (Kalimat Inti dan Transformasi Kalimat)',
    'src/data/materials/ppu/ppu-03-03.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 3.3 (Kalimat Efektif dan Kepaduan Makna)',
    'src/data/materials/ppu/ppu-03-04.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 3.4 (Kalimat Pasif dan Aktif)',
    'src/data/materials/ppu/ppu-04-01.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 4.1 (Ide Pokok dan Gagasan Pendukung)',
    'src/data/materials/ppu/ppu-04-02.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 4.2 (Kepaduan Paragraf Kohesi dan Koherensi)',
    'src/data/materials/ppu/ppu-04-03.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 4.3 (Sikap, Nada, dan Tujuan Penulis)',
    'src/data/materials/ppu/ppu-04-04.ts': 'Modul terisolasi materi & bank soal sub-bab PPU 4.4 (Bahasa Panda Kriptografi Bahasa Buatan)',
    'src/data/materials/pbmMaterials.ts': 'Barrel export: re-exports all modular PBM subchapters from src/data/materials/pbm/',
    'src/data/materials/pbm/index.ts': 'Barrel export bundling all individual PBM subchapters',
    'src/data/materials/pbm/pbm-01-01.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 1.1 (Makna Leksikal, Gramatikal, Kontekstual)',
    'src/data/materials/pbm/pbm-01-02.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 1.2 (Sinonim, Antonim, Homonim, Polisemi)',
    'src/data/materials/pbm/pbm-01-03.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 1.3 (Hipernim dan Hiponim)',
    'src/data/materials/pbm/pbm-01-04.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 1.4 (Perubahan Makna)',
    'src/data/materials/pbm/pbm-02-01.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 2.1 (Afiksasi dan Maknanya)',
    'src/data/materials/pbm/pbm-02-02.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 2.2 (Kata Ulang dan Kata Majemuk)',
    'src/data/materials/pbm/pbm-02-03.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 2.3 (Jenis dan Konstruksi Frasa)',
    'src/data/materials/pbm/pbm-02-04.ts': 'Modul terisolasi materi & bank soal sub-bab PBM 2.4 (Kelompok Kata dan Pasangan Makna Sebidang)',
    'src/components/navigation/TopHeader.tsx': 'Top navigation bar: AppMode toggle (UTBK vs SMA), stats pills, theme toggle',
    'src/components/common/ThemeToggle.tsx': 'Light/Dark mode switcher manipulating document.documentElement and localStorage',
    'src/components/home/UtbkSubtestGrid.tsx': 'Dashboard cards grid displaying 7 UTBK subtests with stats & progress',
    'src/components/home/SmaSubjectGrid.tsx': 'SMA subject grid with category filters (Saintek, Soshum, Umum)',
    'src/components/subtest/SubtestDetailView.tsx': 'Subtest syllabus view with tabs for Materi Modules and Drilling Setup',
    'src/components/subtest/SmaSubjectDetailView.tsx': 'SMA subject chapter & topic explorer view',
    'src/components/subtest/ModuleIcon.tsx': 'Dynamic Lucide icon resolver matching syllabus topics and subjects',
    'src/components/reader/PdfMaterialReader.tsx': 'Formal reader container with sidebar TOC, download/print buttons',
    'src/components/content/MaterialRenderer.tsx': 'Rich content renderer: KaTeX math formulas, interactive questions, zoomable SVGs',
    'src/components/drilling/ActiveDrillingView.tsx': 'Timed drilling quiz engine: question navigator, timer, score calculation & review',
    'src/components/decorations/CosmicDecorations.tsx': 'Ambient stars and glowing cosmic nebula background (Dark mode)',
    'src/components/decorations/NatureDecorations.tsx': 'Botanical foliage ambient background (Light mode)',
    'scripts/copy_assets.mjs': 'Post-build script: mirrors dist assets, generates .nojekyll & 404.html for GitHub Pages',
    'scripts/test_rotation_engine.mjs': 'Unit test suite verifying deterministic stratified rotation engine algorithms, validation, and quotas',
    'scripts/export_materials.mjs': 'Exports TS materials from modular pu/*.ts to JSON files in public & root content',
    'scripts/modularize_pu_materials.mjs': 'Modularization tool: splits monolithic material files into isolated subchapter files',
    'scripts/generate_summary.mjs': 'Auto-generates PROJECT_CONTEXT.md to keep codebase reference always up-to-date',
    'PU-STATE.json': 'Machine state tracker for UTBK PU drilling question batch generation (targets, counts, progress)',
    '.antigravity/rules/pu-rules.md': 'Governance rules directive, KaTeX standards, and blueprint curriculum for PU questions',
    'vite.config.ts': 'Vite 6 build config with Tailwind CSS & React plugins',
  };

  const md = `# PROJECT CONTEXT & CODEBASE SUMMARY
<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->
<!-- Generated by: scripts/generate_summary.mjs | Last Update: ${now} -->

> **Catatan Penggunaan AI:** File ini merangkum seluruh arsitektur, struktur file, data schema, dan aturan proyek dalam format ringkas hemat token. **Baca file ini terlebih dahulu pada sesi chat baru** untuk memahami seluruh konteks codebase tanpa perlu membaca puluhan file satu per satu.

---

## 1. Ringkasan Eksekutif & Tech Stack

| Parameter | Keterangan |
| :--- | :--- |
| **Nama Proyek** | \`${pkg.name}\` (Platform Belajar & Drilling UTBK SNBT + SMA) |
| **Versi** | \`${pkg.version}\` |
| **Framework UI** | React 19.3 + TypeScript ~7.0 + Vite 6.2 |
| **Styling** | Tailwind CSS v4.3 (\`@tailwindcss/vite\`) + Lucide React Icons |
| **Math & Markdown** | \`react-markdown\` v10 + \`remark-math\` + \`rehype-katex\` + \`katex\` (Inline & Display KaTeX) |
| **Database / Backend** | Supabase JS client ready (\`@supabase/supabase-js\`), Static JSON repository |
| **Deployment** | GitHub Pages SPA (\`deploy.yml\`, \`404.html\` client-side routing fallback, \`.nojekyll\`) |
| **Status Bank Soal UTBK** | **${utbkContent.totalSubchapters} Sub-bab** aktif, **${utbkContent.totalVariations} Variasi Inti**, **${utbkContent.totalQuestions} Soal Drilling** HOTS (7 Subtes Lengkap) |

---

## 2. Struktur Direktori & Peran File

\`\`\`text
d:/web/
├── .github/workflows/deploy.yml   # CI/CD GitHub Pages deployment
├── content/utbk/pu/*.json         # Database materi & bank soal format JSON publik
├── public/content/utbk/pu/*.json  # Mirror JSON untuk GitHub Pages runtime fetch
├── scripts/                       # Build, export, asset copy, dan summary generator
├── src/
│   ├── components/                # Komponen modular UI (Reader, Drilling, Home, Nav, Decors)
│   ├── data/                      # Silabus static & preloaded materials bundle (puMaterials.ts)
│   ├── lib/                       # Content loader, UTBK & SMA syllabus metadata
│   ├── types/                     # TypeScript master contracts & interfaces
│   ├── App.tsx                    # Main state machine, router search params & views
│   └── index.css / main.tsx       # Entry styling & ReactDOM mount
├── .antigravity/rules/pu-rules.md  # Governance rules directive & blueprint kurikulum PU
├── PU-STATE.json                   # Machine state tracker target drilling soal
└── PROJECT_CONTEXT.md             # File ini (Rangkuman Token-Efficient untuk AI)
\`\`\`

### Rincian File Source Code (\`src/\` & \`scripts/\`)
| File | Ukuran | Baris | Peran / Deskripsi |
| :--- | :---: | :---: | :--- |
${[...srcFiles, ...scriptFiles].map(f => {
  let role = fileRoles[f.path];
  if (!role && f.path.startsWith('src/data/materials/pu/pu-')) {
    role = 'Modul terisolasi materi & bank soal sub-bab PU';
  }
  if (!role) role = 'Modul pendukung';
  return `| \`${f.path}\` | ${f.size} | ${f.lines} | ${role} |`;
}).join('\n')}

---

## 3. Alur Kerja Aplikasi & Clean Path Routing (\`src/App.tsx\`)

Aplikasi menggunakan **Hybrid SSG + CSR Clean Path Routing** ramah crawler & Cloudflare Static Assets (\`run_worker_first: false\`):
- \`/\` $\\rightarrow$ Dashboard 7 Subtes UTBK SNBT (\`UtbkSubtestGrid\`).
- \`/utbk/:subtest\` $\\rightarrow$ Detail Modul Silabus Subtes (\`SubtestDetailView\`, tab \`materi\` / \`?tab=drilling\`).
- \`/utbk/:subtest/:materiId\` $\\rightarrow$ Halaman Baca Materi Lengkap (\`PdfMaterialReader\` + \`ThreeZoneMaterialViewer\`).
- \`/rangkuman\` & \`/rangkuman/:babId\` $\\rightarrow$ Cheat Sheet Rangkuman per Bab (\`RangkumanPage\`).
- \`/sma\` & \`/sma/:subject\` $\\rightarrow$ Daftar & Detail Mata Pelajaran SMA (\`SmaSubjectGrid\` / \`SmaSubjectDetailView\`).
- \`/drilling\` & \`/drilling/:subtest\` $\\rightarrow$ Mode Latihan Soal Interaktif Client-Side SPA (\`ActiveDrillingView\`, lazy-loaded).
- \`/about\`, \`/contact\`, \`/privacy-policy\`, \`/terms\` $\\rightarrow$ Halaman Legal & Trust Google AdSense.
- **Backward Compatibility**: URL lama berbasis query parameter (\`?materi=\`, \`?subtest=\`, \`?mode=sma\`, \`?subject=\`, \`?drilling=active\`) dan path lama (\`/subtest/:id\`, \`/materi/:id\`) otomatis dialihkan via \`replace\` ke Clean Path baru.

### Mekanisme Pengambilan Konten (\`src/lib/contentLoader.ts\`)
1. **Prioritas 1 (0ms Latency Hydration)**: Membaca tag \`<script id="__PAGE_DATA__" type="application/json">\` (berisi 1 sub-bab aktif dari SSG prerender) secara sinkron saat hydration tanpa network fetch.
2. **Prioritas 2 (Dynamic Fetch)**: Saat navigasi antar halaman, melakukan \`fetch(\`\${BASE_URL}content/utbk/\${subtest}/\${id}.json\`) secara terpisah.
3. **Prioritas 3 (Graceful Fallback)**: Jika file belum tersedia, menampilkan placeholder rapi tanpa crash (halaman thin/placeholder dikecualikan dari prerender & \`sitemap.xml\`).

---

## 4. Master Data Schema & Interfaces (\`src/types/material.ts\`)

### Struktur \`Material\`
\`\`\`typescript
interface Material {
  metadata: {
    id: string;               // e.g. "pu-1-1" / "pu-01-01"
    subtest: SubtestType;     // 'PU' | 'PPU' | 'PBM' | 'PK' | 'LBI' | 'LBE' | 'PM'
    chapter_num: number;
    chapter_title: string;
    subchapter_num: string;   // e.g. "1.1"
    subchapter_title: string;
    title: string;
    required_question_variations: string[];
    requires_svg: boolean;
    updated_at: string;
  };
  content: {
    tactical_overview?: string;
    exam_blueprint_markdown: string; // Markdown materi dengan KaTeX math
    visualizations_svg: SvgVisualization[];
    distractor_traps: string[];
    quick_execution_algorithm?: string[];
  };
  worked_examples: WorkedExample[];
}
\`\`\`

### Struktur \`WorkedExample\` (Soal Drilling Multi-Format)
\`\`\`typescript
type QuestionType =
  | 'standard_mc'          // Pilihan Ganda 5 opsi A-E reguler
  | 'statements_1234'      // PG Asosiatif (1), (2), (3), (4)
  | 'data_sufficiency'     // Kecukupan data Pernyataan (1) & (2)
  | 'mc_complex_table'     // PGK Tabel 2 Kolom (Benar/Salah)
  | 'mc_complex_checkbox'  // PGK Multi-select (>1 jawaban benar)
  | 'short_answer'         // Isian singkat numerik / kata baku
  | string;

interface ComplexStatementItem {
  id: string;
  statement_markdown: string;
  is_true: boolean;
}

interface WorkedExample {
  example_id: string;                  // e.g. "pu-01-01-ex1"
  variation_name: string;              // e.g. "Variasi 1: Simpulan Proporsi Sampel"
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: QuestionType;
  context_markdown?: string | null;    // Teks wacana / stimulus soal
  svg_illustration?: SvgIllustration | null;
  question_markdown: string;           // Pertanyaan spesifik
  options?: { key: string; text_markdown: string }[]; // A, B, C, D, E (opsional untuk non-MC)
  correct_answer?: 'A' | 'B' | 'C' | 'D' | 'E' | string;
  // Format baru BPPP: PGK & Isian Singkat
  complex_statements?: ComplexStatementItem[]; // Baris pernyataan untuk tabel/checkbox
  table_headers?: [string, string];            // Default: ['Benar', 'Salah']
  short_answer_key?: string | number;          // Kunci isian angka / kata baku
  passage_group_id?: string;                   // ID grup wacana bersama
  hint_markdown?: string;
  conceptual_solution_markdown: string; // Pembahasan mendalam
  quick_trick_markdown: string;         // Trik 15-30 detik eliminasi opsi
  why_others_are_wrong_markdown: string;// Analisis jebakan mengapa opsi lain salah
}
\`\`\`

---

## 5. Arsitektur Drilling & Deterministic Stratified Rotation Engine (\`src/lib/drillingRotationEngine.ts\`)

Mesin perakitan sesi latihan soal menggunakan pendekatan **Stratified Rotation** deterministik untuk mereplikasi proporsi ujian asli UTBK-SNBT BPPP:

### 1. Multi-Subtest & Subchapter Round-Robin Balancing
- **Alokasi Kuota Proporsional:** Untuk $N$ total soal dari $k$ subtes terpilih, dialokasikan $\\lfloor N / k \\rfloor$ soal per subtes, dan sisa $N \\pmod k$ didistribusikan merata ke subtes pertama.
- **Bucket Rotation Sub-bab:** Di dalam satu subtes, alokasi soal dirotasi merata ke seluruh \`chapter_num\` dan \`subchapter_num\` terpilih agar materi tidak menumpuk di satu topik saja.
- **Variation Anti-Collision:** Dalam 1 sesi pengerjaan, tidak ada 2 soal dengan \`variation_name\` yang identik kecuali seluruh variasi unik di sub-bab tersebut telah terpilih.
- **Passage Grouping:** Soal yang memiliki \`passage_group_id\` (atau stimulus wacana identik) dikelompokkan secara berurutan berdampingan (maksimal 2–3 soal per wacana) agar pengguna tidak membaca ulang stimulus yang sama secara terpisah-pisah.

### 2. Filter & Wave Rotation Tingkat Kesulitan
- **Strict Difficulty Filter:** Seluruh soal \`difficulty === 'easy'\` otomatis disaring (dibuang). Hanya soal berkategori \`'medium'\` (Sedang, target ~55%) dan \`'hard'\` (HOTS, target ~45%) yang digunakan.
- **Pola Gelombang 5-Soal (Wave Patterning):** Urutan kesulitan dalam blok subtes mengikuti siklus:
  \`[medium, medium, hard, medium, hard]\` (dengan fallback otomatis antar \`medium\` $\\leftrightarrow$ \`hard\` jika stok salah satu tingkat kesulitan habis).

### 3. Matriks Proporsi Tipe Soal Resmi BPPP
Sampling jenis soal menerapkan rasio pakem BPPP per subtes (dengan graceful fallback ke \`standard_mc\` jika tipe soal tertentu belum tersedia):
- **PU & LBI:** 75% Pilihan Ganda (\`standard_mc\`), 25% PGK (\`mc_complex_table\` / \`mc_complex_checkbox\` / \`statements_1234\`), 0% Isian.
- **PPU & LBE:** 85% Pilihan Ganda, 15% PGK, 0% Isian.
- **PBM:** 80% Pilihan Ganda, 15% PGK, 5% Isian Singkat (\`short_answer\`).
- **PK & PM:** 55% Pilihan Ganda, 25% PGK (\`statements_1234\` / \`data_sufficiency\` / \`mc_complex_table\`), 20% Isian Singkat (\`short_answer\`).
- **Non-PG Interleaving:** Soal PGK dan Isian tidak ditumpuk di akhir sesi, melainkan disebar merata di sepanjang barisan soal.

### 4. Pelacak Riwayat Soal (LocalStorage Seen Tracker)
- **Key Storage:** \`utbk_seen_questions_v1\` menyimpan map \`Record<string, number>\` berisi frekuensi pengerjaan per \`example_id\`.
- **Prioritas Unseen:** Soal dengan frekuensi \`seen_count\` terendah selalu diprioritaskan lebih dulu saat sesi dirakit.
- **Manajemen Riwayat:** UI drilling menyediakan indikator real-time rasio *Unseen* vs *Seen* dan tombol **"Reset Riwayat Soal"** untuk mengosongkan histori.

### 5. Mode Urutan Penyajian (Order Mode)
- **🛡️ Blocking per Subtes (Simulasi Asli):** Soal dikelompokkan per subtes secara berurutan sesuai pakem lembar tes UTBK-SNBT resmi.
- **🔀 Interleaved Round-Robin (Drill Campuran):** Soal dirotasi bergantian antar subtes secara round-robin untuk melatih ketangkasan peralihan konteks berpikir.

### 6. Universal Answer Evaluator (\`isAnswerCorrect\`)
Mengevaluasi kebenaran jawaban pengguna secara lintas format:
- \`standard_mc\` / \`statements_1234\` / \`data_sufficiency\`: Kesesuaian kunci opsi A–E (case-insensitive).
- \`short_answer\`: Pencocokan teks ter-normalisasi (\`trim().toLowerCase()\`) dan kesetaraan desimal numerik (misal: \`1,5\` ekuivalen dengan \`1.5\`).
- \`mc_complex_table\`: Memvalidasi seluruh baris pernyataan terhadap kolom target (Benar/Salah).
- \`mc_complex_checkbox\`: Memvalidasi kecocokan himpunan opsi terpilih dengan kunci multi-select.

---

## 6. Inventaris Subtes UTBK & Status Bank Soal

### Ringkasan 7 Subtes Resmi UTBK SNBT
Total Keseluruhan: **${utbkContent.totalSubchapters} Sub-bab**, **${utbkContent.totalVariations} Variasi Pola Inti**, **${utbkContent.totalQuestions} Soal Drilling HOTS**.

| Subtes | Kode | Sub-bab Aktif | Variasi Pola Inti | Soal Drilling HOTS |
| :--- | :---: | :---: | :---: | :---: |
${utbkContent.subtests.map(s => `| **${s.name}** | \`${s.code.toUpperCase()}\` | ${s.subchapters} Sub-bab | ${s.variations} Variasi | ${s.questions} Soal |`).join('\n')}

### Rincian Sub-bab Penalaran Umum (PU) Aktif
| ID | Bab | Judul Sub-bab | Variasi | Jumlah Soal |
| :--- | :--- | :--- | :---: | :---: |
${puSubtest.files.map(f => `| \`${f.id}\` | ${f.chapter} | ${f.title} | ${f.variations} variasi | ${f.questions} soal |`).join('\n')}

---

## 7. Arsitektur Layout 3 Zona & KaTeX Math Rendering Engine

### A. Layout 3 Zona Terstruktur (\`ThreeZoneMaterialViewer.tsx\`)
Tampilan materi belajar dioptimalkan untuk ergonomi visual (lebar maksimal 720px, font scaling responsif, progress tracking persentase):
1. **Zona 1: Peta Taktis & Fondasi Sub-bab**:
   - **Pemantik Logika (Exam Hook)**: Mini-studi kasus 15 detik yang dibungkus dalam kartu kontras elegan dengan aksen garis vertikal (\`border-l-4\`), opsi tebak cepat 2 pilihan, dan umpan balik kilat instan.
   - **Fondasi Konsep Inti**: Ringkasan teori padat, formula esensial, skala kepastian, dan diagram alur SVG adaptif dengan fitur perbesar (zoomable modal).
   - **Radar Jebakan UTBK**: Checklist bias kognitif dan distraktor umum di UTBK.
2. **Zona 2: Katalog Variasi Pola Soal Inti**:
   - Tab navigasi interaktif untuk seluruh variasi pola soal sub-bab.
   - Bedah pola solusi 3 tahap baku: *Formulating* (Terjemahan Cerita), *Employing* (Model Matematika / Logika), dan *Interpreting & Evaluating* (Hitung Taktis & Uji Realitas).
3. **Zona 3: Uji Pemahaman Mandiri**:
   - Soal drilling bertingkat HOTS dengan pembahasan instan dan tombol langsung ke mode drilling intensif.

### B. KaTeX & Math Division Standards
1. **Auto-Promotion \`\\frac\` $\\rightarrow$ \`\\dfrac\`**:
   - Preprocessor runtime \`formatMathContent\` secara otomatis menaikkan semua \`\\frac\` menjadi display fraction (\`\\dfrac\`) agar pembilang dan penyebut berukuran penuh, tidak gepeng, dan memiliki jarak vertikal bebas tabrakan.
2. **KaTeX Baseline & Strut Protection**:
   - \`.katex\` dikunci dengan \`line-height: 1.2 !important\` untuk menjaga akurasi penghitungan strut dan baseline KaTeX.
   - \`.katex .mfrac .frac-line\` menggunakan ketebalan solid \`1.25px\` dengan \`height: 0 !important\` agar tidak memicu pergeseran offset.
   - Mengunci \`transform: none !important\` pada seluruh container \`.vlist\`, \`.mfrac\`, dan span turunannya agar tidak ada CSS warisan yang menggeser posisi pembilang/penyebut.
3. **Optimasi Asset Bundle**:
   - Penghapusan referensi CSS statis ganda dari \`index.html\` menurunkan ukuran file bundle \`assets/index.css\` dari **15,8 MB menjadi 174 kB** (90x lebih cepat dan bebas konflik).

---

## 8. Aturan Wajib Pengembangan untuk AI & Developer

1. **KaTeX & Notasi Matematika**:
   - Seluruh rumus wajib diapit tanda dollar tunggal \`$...$\`.
   - Di dalam string JSON, setiap backslash KaTeX **wajib di-escape ganda** (\`\\\\\`), misal: \`$\\\\frac{a}{b}$\`, \`$\\\\approx$\`, \`$\\\\sim p \\\\lor q$\`.
   - Persen ditulis \`$\\\\92\\\\%$\` atau \`92%\`.
2. **Struktur Modular & Sinkronisasi Dual-File**:
   - Bank soal PU berada di modul mandiri per sub-bab: \`src/data/materials/pu/pu-XX-YY.ts\` (misal: \`pu-01-01.ts\`).
   - Setiap kali mengedit materi/soal, jalankan \`node scripts/export_materials.mjs\` (atau otomatis via \`npm run build\`) untuk mengekspor ke \`public/content/utbk/pu/\` & \`content/utbk/pu/\`.
3. **Batch Generation Rule**:
   - Maksimal generate **5 soal per batch** untuk menjaga kualitas berpikir tingkat tinggi (HOTS) dan ketajaman opsi pengecoh.
4. **Verifikasi Komputasi Bab 03 (Penalaran Kuantitatif)**:
   - Sebelum menyimpan soal angka/kuantitatif, wajib verifikasi komputasi matematika dengan skrip eksekusi (Python / Node) untuk mencegah salah kunci/angka.
5. **Auto-Update Context**:
   - Setiap kali melakukan perubahan struktur file atau menambah soal, jalankan:
     \`\`\`bash
     npm run summary
     \`\`\`
   - Atau biarkan pre-commit hook / watch mode memperbarui file ini secara otomatis.

---

## 9. Perintah Terminal Penting

| Perintah | Deskripsi |
| :--- | :--- |
| \`npm run dev\` | Menjalankan Vite dev server lokal |
| \`npm run build\` | Menjalankan tsc, vite build, dan copy asset GitHub Pages |
| \`npm run summary\` | Memperbarui file \`PROJECT_CONTEXT.md\` secara otomatis |
| \`npm run summary:watch\` | Menjalankan pemantau file otomatis (auto-update setiap save) |
| \`node scripts/export_materials.mjs\` | Mengekspor materi dari TS ke JSON publik |
| \`npm run lint\` | Menjalankan oxlint untuk pengecekan kode cepat |

`;

  fs.writeFileSync(OUTPUT_FILE, md, 'utf8');
  console.log(`[OK] PROJECT_CONTEXT.md successfully updated at ${now}`);
}

// Watch mode handling
if (process.argv.includes('--watch')) {
  console.log('[WATCH] Watching src/, content/, scripts/, and package.json for changes...');
  generateSummary();

  let debounceTimer = null;
  const triggerUpdate = (filename) => {
    if (filename && filename.includes('PROJECT_CONTEXT.md')) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[CHANGE DETECTED: ${filename}] Regenerating PROJECT_CONTEXT.md...`);
      generateSummary();
    }, 500);
  };

  const watchDirs = ['src', 'content', 'scripts'];
  watchDirs.forEach(dir => {
    const fullDir = path.join(ROOT_DIR, dir);
    if (fs.existsSync(fullDir)) {
      fs.watch(fullDir, { recursive: true }, (event, filename) => triggerUpdate(`${dir}/${filename}`));
    }
  });
  fs.watch(path.join(ROOT_DIR, 'package.json'), () => triggerUpdate('package.json'));
} else {
  generateSummary();
}
