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

function analyzePuContent() {
  const puDir = path.join(ROOT_DIR, 'content/utbk/pu');
  if (!fs.existsSync(puDir)) return { subchapters: 0, questions: 0, files: [] };

  const files = fs.readdirSync(puDir).filter(f => f.startsWith('pu-') && f.endsWith('.json'));
  // Unique subchapters (filter out unpadded duplicates if any)
  const paddedFiles = files.filter(f => /^pu-\d{2}-\d{2}\.json$/.test(f));
  const activeFiles = paddedFiles.length > 0 ? paddedFiles : files;

  let totalQuestions = 0;
  const list = [];

  for (const file of activeFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(puDir, file), 'utf8'));
      const qCount = data.worked_examples ? data.worked_examples.length : 0;
      totalQuestions += qCount;
      list.push({
        id: data.metadata?.id || file.replace('.json', ''),
        title: data.metadata?.title || 'Unknown',
        chapter: `${data.metadata?.chapter_num || '?'}. ${data.metadata?.chapter_title || ''}`,
        questions: qCount,
      });
    } catch {
      // skip
    }
  }

  return {
    subchapters: activeFiles.length,
    questions: totalQuestions,
    files: list,
  };
}

function generateSummary() {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  const puContent = analyzePuContent();
  const srcFiles = scanDirectory(path.join(ROOT_DIR, 'src'));
  const scriptFiles = scanDirectory(path.join(ROOT_DIR, 'scripts'));

  // Role dictionary for known files
  const fileRoles = {
    'src/App.tsx': 'Central SPA Controller: search-param routing, theme state, active material & drilling state',
    'src/main.tsx': 'React 19 bootstrap entry point mounting root App',
    'src/index.css': 'Tailwind CSS v4 base configuration & custom design utility classes',
    'src/types/material.ts': 'Core TypeScript interfaces: Material, WorkedExample, SvgVisualization, SubtestItem',
    'src/lib/contentLoader.ts': 'Dynamic/Preloaded content fetcher with 0ms preloaded fallback & drilling randomizer',
    'src/lib/syllabusData.ts': 'UTBK Syllabus definition: 7 subtests (PU, PPU, PBM, PK, LBI, LBE, PM) with modules',
    'src/lib/smaSyllabusData.ts': 'SMA curriculum syllabus data (Matematika TL, Saintek, Soshum)',
    'src/data/syllabus.ts': 'Legacy / extended UTBK curriculum syllabus items',
    'src/data/syllabus.json': 'JSON mirror of syllabus data',
    'src/data/materials/puMaterials.ts': 'Preloaded monolithic bundle of PU materials & questions for 0ms offline latency',
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
    'scripts/export_materials.mjs': 'Exports TS materials from puMaterials.ts to JSON files in public & root content',
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
| **Status Bank Soal PU** | **${puContent.subchapters} Sub-bab** aktif, **${puContent.questions} Soal Drilling** ber-HOTS tinggi |

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
  const role = fileRoles[f.path] || 'Modul pendukung';
  return `| \`${f.path}\` | ${f.size} | ${f.lines} | ${role} |`;
}).join('\n')}

---

## 3. Alur Kerja Aplikasi & State Routing (\`src/App.tsx\`)

Aplikasi menggunakan **Client-Side Search Params Routing** tanpa refresh halaman, ramah GitHub Pages:
- \`?mode=utbk\` (Default) $\\rightarrow$ Dashboard 7 Subtes UTBK SNBT (\`UtbkSubtestGrid\`).
- \`?mode=sma\` $\\rightarrow$ Dashboard Pelajaran SMA (\`SmaSubjectGrid\`).
- \`?subtest=pu&tab=materi\` $\\rightarrow$ Detail Modul Silabus Subtes (\`SubtestDetailView\`).
- \`?subtest=pu&tab=drilling\` $\\rightarrow$ Konfigurasi Sesi Latihan Soal.
- \`?materi=pu-01-01\` $\\rightarrow$ Halaman Baca Materi Lengkap (\`PdfMaterialReader\` + \`MaterialRenderer\`).
- \`?drilling=active&subtest=pu&no=1\` $\\rightarrow$ Mode Latihan Soal Interaktif (\`ActiveDrillingView\`).
- \`?subject=matematika-tl\` $\\rightarrow$ Eksplorasi Materi SMA (\`SmaSubjectDetailView\`).

### Mekanisme Pengambilan Konten (\`src/lib/contentLoader.ts\`)
1. **Prioritas 1 (0ms Latency)**: Cek \`PRELOADED_MATERIALS\` dari \`src/data/materials/puMaterials.ts\`. Langsung instan tanpa network request.
2. **Prioritas 2 (Dynamic Fetch)**: Jika tidak ada di preload, lakukan \`fetch(\`\${BASE_URL}content/utbk/\${subtest}/\${id}.json\`).
3. **Prioritas 3 (Graceful Fallback)**: Jika file belum tersedia, tampilkan placeholder rapi tanpa crash.

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

### Struktur \`WorkedExample\` (Soal Drilling)
\`\`\`typescript
interface WorkedExample {
  example_id: string;                  // e.g. "pu-01-01-ex1"
  variation_name: string;              // e.g. "Variasi 1: Simpulan Proporsi Sampel"
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: 'standard_mc' | 'statements_1234' | 'data_sufficiency' | string;
  context_markdown?: string | null;    // Teks wacana / stimulus soal
  svg_illustration?: SvgIllustration | null;
  question_markdown: string;           // Pertanyaan spesifik
  options: { key: string; text_markdown: string }[]; // A, B, C, D, E
  correct_answer: 'A' | 'B' | 'C' | 'D' | 'E';
  hint_markdown?: string;
  conceptual_solution_markdown: string; // Pembahasan mendalam
  quick_trick_markdown: string;         // Trik 15-30 detik eliminasi opsi
  why_others_are_wrong_markdown: string;// Analisis jebakan mengapa opsi lain salah
}
\`\`\`

---

## 5. Inventaris Subtes UTBK & Status Bank Soal

### 7 Subtes Resmi UTBK SNBT
1. **PU (Penalaran Umum)**: Induktif, Deduktif, Kuantitatif $\\rightarrow$ *${puContent.subchapters} Sub-bab aktif, ${puContent.questions} Soal terdaftar*.
2. **PPU (Pengetahuan & Pemahaman Umum)**
3. **PBM (Pemahaman Bacaan & Menulis)**
4. **PK (Pengetahuan Kuantitatif)**
5. **LBI (Literasi Bahasa Indonesia)**
6. **LBE (Literasi Bahasa Inggris)**
7. **PM (Penalaran Matematika)**

### Rincian Sub-bab PU Aktif Saat Ini
| ID | Bab | Judul Sub-bab | Jumlah Soal |
| :--- | :--- | :--- | :---: |
${puContent.files.map(f => `| \`${f.id}\` | ${f.chapter} | ${f.title} | ${f.questions} soal |`).join('\n')}

---

## 6. Aturan Wajib Pengembangan untuk AI & Developer

1. **KaTeX & Notasi Matematika**:
   - Seluruh rumus wajib diapit tanda dollar tunggal \`$...$\`.
   - Di dalam string JSON, setiap backslash KaTeX **wajib di-escape ganda** (\`\\\\\`), misal: \`$\\\\frac{a}{b}$\`, \`$\\\\approx$\`, \`$\\\\sim p \\\\lor q$\`.
   - Persen ditulis \`$\\\\92\\\\%$\` atau \`92%\`.
2. **Sinkronisasi Dual-File**:
   - Bank soal PU berada di dua lokasi: \`content/utbk/pu/pu-XX-YY.json\` & \`src/data/materials/puMaterials.ts\`.
   - Jalankan \`node scripts/export_materials.mjs\` jika mengubah \`puMaterials.ts\`.
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

## 7. Perintah Terminal Penting

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
