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
    totalDetailButir: 0,
    subtests: [],
  };

  for (const sub of subtests) {
    const dir = path.join(ROOT_DIR, 'content/utbk', sub.code);
    if (!fs.existsSync(dir)) {
      summary.subtests.push({
        ...sub,
        subchapters: 0,
        variations: 0,
        questions: 0,
        detailButir: 0,
        files: [],
      });
      continue;
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(`${sub.code}-`) && f.endsWith('.json'))
      .sort();
    let subQuestions = 0;
    let subVariations = 0;
    let subDetailButir = 0;
    const list = [];

    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        const qCount =
          (data.zona_3_uji_pemahaman ? data.zona_3_uji_pemahaman.length : 0) ||
          (data.worked_examples ? data.worked_examples.length : 0);
        const vCount = data.zona_2_variasi_inti ? data.zona_2_variasi_inti.length : 0;
        const dCount = (data.zona_1_peta_taktis?.detail_materi_lengkap?.kelompok || []).reduce(
          (acc, k) => acc + (Array.isArray(k.butir) ? k.butir.length : 0),
          0
        );
        subQuestions += qCount;
        subVariations += vCount;
        subDetailButir += dCount;
        list.push({
          id: data.kode_subbab || data.metadata?.id || file.replace('.json', ''),
          title: data.judul_subbab || data.metadata?.title || 'Unknown',
          chapter:
            data.bab || `${data.metadata?.chapter_num || '?'}. ${data.metadata?.chapter_title || ''}`,
          klasifikasi: data.klasifikasi_materi || 'INTI',
          frekuensi: data.zona_1_peta_taktis?.frekuensi_utbk || '-',
          variations: vCount,
          questions: qCount,
          detailButir: dCount,
        });
      } catch {
        // skip invalid file
      }
    }

    summary.totalSubchapters += files.length;
    summary.totalVariations += subVariations;
    summary.totalQuestions += subQuestions;
    summary.totalDetailButir += subDetailButir;
    summary.subtests.push({
      ...sub,
      subchapters: files.length,
      variations: subVariations,
      questions: subQuestions,
      detailButir: subDetailButir,
      files: list,
    });
  }

  return summary;
}

function analyzeRangkumanContent() {
  const indexCandidates = [
    path.join(ROOT_DIR, 'content/rangkuman/index.json'),
    path.join(ROOT_DIR, 'content/rangkuman/index_rangkuman.json'),
  ];
  const indexPath = indexCandidates.find((p) => fs.existsSync(p));
  if (!indexPath) {
    return { totalBab: 0, totalSubbab: 0, totalButir: 0, babs: [] };
  }

  try {
    const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const babs = [];
    for (const st of idx.daftar_subtes || []) {
      for (const b of st.daftar_bab || []) {
        babs.push({
          kode_bab: b.kode_bab,
          subtes: st.subtes,
          bab: b.bab || b.nama_bab || b.kode_bab,
          jumlah_subbab: b.jumlah_subbab || (b.subbab ? b.subbab.length : 0),
          jumlah_butir: b.total_butir ?? b.jumlah_butir ?? 0,
          estimasi_menit: b.estimasi_menit_review || 5,
        });
      }
    }
    return {
      totalBab: idx.total_bab || babs.length,
      totalSubbab: idx.total_subbab || 0,
      totalButir: idx.total_butir || 0,
      babs,
    };
  } catch {
    return { totalBab: 0, totalSubbab: 0, totalButir: 0, babs: [] };
  }
}

function analyzeSmaContent() {
  const smaPath = path.join(ROOT_DIR, 'src/lib/smaSyllabusData.ts');
  if (!fs.existsSync(smaPath)) return [];
  try {
    const src = fs.readFileSync(smaPath, 'utf8');
    const blocks = src.split(/\n\s*\{\s*\n\s*id:\s*'/).slice(1);
    return blocks.map((blk) => {
      const id = (blk.match(/^([^']+)'/) || [])[1] || '';
      const name = (blk.match(/name:\s*'([^']+)'/) || [])[1] || '';
      const category = (blk.match(/category:\s*'([^']+)'/) || [])[1] || '';
      const readyCount = (blk.match(/status:\s*'ready'/g) || []).length;
      const upcomingCount = (blk.match(/status:\s*'upcoming'/g) || []).length;
      return { id, name, category, readyCount, upcomingCount };
    });
  } catch {
    return [];
  }
}

function inspectBuildMetrics() {
  const distDir = path.join(ROOT_DIR, 'dist');
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(distDir) || !fs.existsSync(assetsDir)) return null;

  try {
    const assets = fs.readdirSync(assetsDir);
    const findSize = (regex) => {
      const match = assets.find((f) => regex.test(f));
      return match ? `${match} (${getFileSize(path.join(assetsDir, match))})` : '-';
    };
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    const sitemapUrls = fs.existsSync(sitemapPath)
      ? (fs.readFileSync(sitemapPath, 'utf8').match(/<url>/g) || []).length
      : 0;

    return {
      indexHtml: getFileSize(path.join(distDir, 'index.html')),
      entryJs: findSize(/^index-.*\.js$/),
      entryCss: findSize(/^index-.*\.css$/),
      vendorReact: findSize(/^vendor-react-.*\.js$/),
      vendorMarkdownJs: findSize(/^vendor-markdown-.*\.js$/),
      vendorMarkdownCss: findSize(/^vendor-markdown-.*\.css$/),
      vendorIcons: findSize(/^vendor-icons-.*\.js$/),
      pdfReaderChunk: findSize(/^PdfMaterialReader-.*\.js$/),
      subtestDetailChunk: findSize(/^SubtestDetailView-.*\.js$/),
      rangkumanChunk: findSize(/^RangkumanPage-.*\.js$/),
      drillingChunk: findSize(/^ActiveDrillingView-.*\.js$/),
      sitemapUrls,
    };
  } catch {
    return null;
  }
}

function generateSummary() {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  const utbkContent = analyzeUtbkContent();
  const rangkumanContent = analyzeRangkumanContent();
  const smaSubjects = analyzeSmaContent();
  const buildMetrics = inspectBuildMetrics();
  const srcFiles = scanDirectory(path.join(ROOT_DIR, 'src'));
  const scriptFiles = scanDirectory(path.join(ROOT_DIR, 'scripts'));
  const publicFiles = scanDirectory(path.join(ROOT_DIR, 'public')).filter(
    (f) => !f.path.startsWith('public/content/')
  );

  let wranglerInfo = {};
  try {
    wranglerInfo = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'wrangler.jsonc'), 'utf8'));
  } catch {}

  const fileRoles = {
    'src/App.tsx':
      'Central Router & Shell: Clean Path routes (/utbk/:subtest/:materiId, /sma, /rangkuman, /drilling, legal), lazy route splitting, legacy query/path redirects, 404 view',
    'src/entry-client.tsx':
      'React 19 client hydration entry: synchronous #__PAGE_DATA__ reader + single active route chunk preload before hydrateRoot',
    'src/entry-server.tsx':
      'Stateless async SSR renderer resolving active route chunk + synchronous renderToString for flat static HTML',
    'src/worker.ts':
      'Cloudflare Worker fallback: 301 legacy redirects (/subtest/*, /materi/*), 200 SPA fallback for /drilling*, true HTTP 404 for unknown paths',
    'src/index.css': 'Tailwind CSS v4 config, theme tokens, and KaTeX baseline/strut protection rules',
    'src/types/material.ts':
      'Master TypeScript interfaces: ThreeZoneMaterial, Material, WorkedExample, VisualData, SubtestItem',
    'src/types/rangkuman.ts': 'TypeScript contracts for Rangkuman Bab & Cheat Sheet data',
    'src/lib/contentLoader.ts':
      '0ms #__PAGE_DATA__ synchronous hydration + dynamic JSON fetch per subchapter & progress localStorage',
    'src/lib/rangkumanLoader.ts':
      '0ms #__PAGE_DATA__ hydration + dynamic fetch for Rangkuman Bab & Index JSON',
    'src/lib/drillingRotationEngine.ts':
      'Deterministic Stratified Rotation Engine: multi-subtest balancing, difficulty wave patterning, BPPP quotas, seen tracking, passage grouping',
    'src/lib/syllabusData.ts':
      'UTBK syllabus definition importing slim syllabus-light.json (7 subtests)',
    'src/lib/smaSyllabusData.ts': 'SMA curriculum syllabus metadata (8 subjects)',
    'src/lib/featureFlags.ts': 'Feature toggles (e.g. ENABLE_SMA_MODE)',
    'src/data/syllabus.json': 'Full UTBK syllabus JSON used by SSG & SEO build scripts',
    'src/data/syllabus-light.json': 'Slim client syllabus metadata (~19.5 KB) for fast initial bundle',
    'src/components/common/AdSlot.tsx':
      'Google AdSense unit wrapper: hidden before VITE_ADSENSE_CLIENT_ID is set, CLS=0 min-height & idle/interaction-deferred script init when active',
    'src/components/common/ThemeToggle.tsx':
      'Light/Dark mode switcher persisting to localStorage (kognitedu_theme)',
    'src/components/navigation/TopHeader.tsx':
      'Sticky header with crawler-friendly <Link> brand/mode navigation & live subchapter search',
    'src/components/navigation/Footer.tsx':
      'Sitewide footer linking all 7 UTBK subtests (/utbk/*) and 4 legal pages',
    'src/components/home/UtbkSubtestGrid.tsx':
      'Home 7-subtest dashboard grid using <Link to="/utbk/..."> cards',
    'src/components/home/SmaSubjectGrid.tsx':
      'SMA subject grid with category/grade filters & <Link to="/sma/..."> cards',
    'src/components/subtest/SubtestDetailView.tsx':
      'Subtest syllabus explorer (Materi & Drilling Setup tabs) with <Link> navigation',
    'src/components/subtest/SmaSubjectDetailView.tsx': 'SMA subject chapter & topic explorer view',
    'src/components/subtest/ModuleIcon.tsx': 'Custom SVG & Lucide icon resolver per UTBK module',
    'src/components/reader/PdfMaterialReader.tsx':
      'Reader shell with sticky progress bar, font scaler (85%-140%), focus mode & Rangkuman link',
    'src/components/content/ThreeZoneMaterialViewer.tsx':
      '3-Zone material viewer with memoized KaTeX/Markdown renderers & prev/next <Link> navigation',
    'src/components/content/DetailMateriAccordion.tsx':
      'Unified responsive single-DOM 3-column table / mobile card accordion (memoized)',
    'src/components/content/VisualRenderer.tsx':
      'SVG sanitizer (DOMPurify) & dynamically imported Mermaid diagram renderer',
    'src/components/drilling/ActiveDrillingView.tsx':
      'Client-side timed drilling quiz simulator supporting PG, PGK & Isian Singkat',
    'src/components/decorations/LazyDecorations.tsx':
      'Post-hydration lazy Suspense wrappers for non-critical Cosmic & Nature SVG backgrounds',
    'src/components/decorations/CosmicDecorations.tsx': 'Dark mode ambient cosmic SVG ornaments',
    'src/components/decorations/NatureDecorations.tsx': 'Light mode ambient botanical SVG ornaments',
    'src/pages/RangkumanPage.tsx':
      'Cheat Sheet & Rangkuman Cepat viewer with memoized KaTeX, content-visibility, active recall blur, and rAF scroll progress',
    'src/pages/AboutPage.tsx': 'About page with 7-subtest scope & E-E-A-T editorial verification standard',
    'src/pages/ContactPage.tsx': 'Contact page with official support/errata emails, interactive form & FAQ',
    'src/pages/PrivacyPolicyPage.tsx': 'Privacy Policy with localStorage & Google AdSense cookie disclosures',
    'src/pages/TermsPage.tsx': 'Terms of Service & independent educational non-affiliation disclaimer',
    'scripts/build.mjs': 'Master build orchestrator: content validation/sync -> tsc -b -> vite build (SSG + SEO)',
    'scripts/prerender.mjs':
      'Concurrent batch SSG renderer (batch 16), anti-thin filter, __PAGE_DATA__ injector, E-E-A-T JSON-LD & conditional KaTeX CSS',
    'scripts/generate_seo_files.mjs':
      'Generates anti-thin filtered sitemap.xml & robots.txt (Googlebot + Mediapartners-Google)',
    'scripts/lib/contentValidator.mjs':
      'Shared XSS-safe JSON serializer & substantial content validator for UTBK & Rangkuman',
    'scripts/copy_assets.mjs': 'Mirrors dist assets and generates .nojekyll & 404.html fallback',
    'scripts/generate_summary.mjs': 'Auto-generates this PROJECT_CONTEXT.md dossier',
    'scripts/run_rotation_test.mjs': 'Bundles and executes rotation engine unit tests via esbuild',
    'scripts/test_rotation_engine.mjs': 'Unit test suite for deterministic stratified rotation engine',
    'public/ads.txt': 'Authorized Digital Sellers template ready for AdSense Publisher ID',
    'public/robots.txt': 'Crawler rules allowing Googlebot & Mediapartners-Google, disallowing /drilling',
    'public/_headers': 'Cloudflare edge cache & security headers (/assets immutable, /content SWR, HTML revalidate)',
    'wrangler.jsonc': 'Cloudflare Workers Static Assets config (run_worker_first: false, not_found_handling: none)',
    'vite.config.ts': 'Vite 6 config with vendor-react/vendor-markdown/vendor-icons chunking & integrated SSG plugin',
  };

  const md = `# PROJECT CONTEXT & CODEBASE ARCHITECTURE DOSSIER
<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->
<!-- Generated by: scripts/generate_summary.mjs | Last Update: ${now} -->

> **Catatan Penggunaan AI & Gemini Chat:** File ini adalah *single source of truth* yang merangkum seluruh arsitektur teknis web, strategi performa SSG/hydration, konfigurasi Cloudflare Edge, kesiapan Google AdSense 2026, skema data, serta inventaris lengkap **${utbkContent.totalSubchapters} Sub-bab UTBK**, **${rangkumanContent.totalBab} Rangkuman Bab**, dan **${smaSubjects.length} Mapel SMA**. Analisis sistem secara menyeluruh dapat dilakukan langsung dari file ini.

---

## 1. Ringkasan Eksekutif & Tech Stack

| Parameter | Keterangan |
| :--- | :--- |
| **Nama Proyek** | \`${pkg.name}\` — **SkolAce** (Platform Belajar & Drilling UTBK-SNBT + SMA Bebas Biaya Rp0) |
| **Versi** | \`${pkg.version}\` |
| **Framework UI** | React 19.3 + TypeScript ~7.0 + Vite 6.2 + React Router v7 |
| **Styling** | Tailwind CSS v4.3 (\`@tailwindcss/vite\`) + Lucide React Icons |
| **Math & Markdown** | \`react-markdown\` v10 + \`remark-math\` + \`remark-gfm\` + \`rehype-katex\` + \`katex\` (\`output: 'html'\`) |
| **Visualisasi** | Inline SVG ter-sanitasi (\`dompurify\`) + Dynamic \`mermaid\` (lazy-loaded hanya saat diagram ada) |
| **Arsitektur Rendering** | **Hybrid SSG + CSR**: Pre-render HTML statis untuk seluruh halaman publik + Client SPA untuk \`/drilling\` |
| **Hosting & Edge CDN** | Cloudflare Workers Static Assets (\`wrangler.jsonc\`: \`run_worker_first: false\`, \`not_found_handling: none\`) + \`src/worker.ts\` |
| **Base URL Saat Ini** | \`https://acapeak.spacetime0291.workers.dev\` *(overridable via env \`SITE_URL\` saat custom domain dibeli)* |
| **Status Konten UTBK** | **${utbkContent.totalSubchapters} Sub-bab** aktif, **${utbkContent.totalVariations} Variasi Inti**, **${utbkContent.totalDetailButir} Butir Detail Materi**, **${utbkContent.totalQuestions} Soal Drilling HOTS** (7 Subtes) |
| **Status Cheat Sheet** | **${rangkumanContent.totalBab} Rangkuman Bab** (${rangkumanContent.totalSubbab} sub-bab, ${rangkumanContent.totalButir} butir padat format *1 Teori = 1 Contoh*) |

---

## 2. Arsitektur Sistem Web, Routing & Cloudflare Edge

### A. Peta Rute Clean Path (\`src/App.tsx\`)
Seluruh navigasi publik menggunakan tag \`<a href="...">\` (\`react-router-dom\` \`<Link>\`) sehingga seluruh konten dapat di-crawl Googlebot maksimal dalam **2–3 klik dari Beranda**:
- \`/\` $\\rightarrow$ Beranda / Dashboard 7 Subtes UTBK-SNBT (\`UtbkSubtestGrid\`, eager-loaded).
- \`/utbk/:subtest\` $\\rightarrow$ Detail Silabus Subtes & Setup Drilling (\`SubtestDetailView\`, tab \`materi\` / \`?tab=drilling\`).
- \`/utbk/:subtest/:materiId\` $\\rightarrow$ Halaman Baca Materi Lengkap 3 Zona (\`PdfMaterialReader\` + \`ThreeZoneMaterialViewer\`).
- \`/rangkuman\` & \`/rangkuman/:babId\` $\\rightarrow$ Katalog & Lembar Cheat Sheet per Bab (\`RangkumanPage\`).
- \`/sma\` & \`/sma/:subject\` $\\rightarrow$ Halaman Kurikulum SMA (\`SmaSubjectGrid\` / \`SmaSubjectDetailView\`, diberi \`noindex, follow\` hingga naskah lengkap terisi).
- \`/drilling\` & \`/drilling/:subtest\` $\\rightarrow$ Mode Simulasi Latihan Soal Interaktif (Client-side SPA, \`Disallow: /drilling\` di \`robots.txt\`).
- \`/about\`, \`/contact\`, \`/privacy-policy\`, \`/terms\` $\\rightarrow$ Halaman Legal, Editorial E-E-A-T, & Trust AdSense.
- **Backward Compatibility:**
  - Query param lama (\`?materi=\`, \`?subtest=\`, \`?mode=\`, \`?subject=\`, \`?drilling=active\`) otomatis di-redirect client-side via \`LegacyQueryRedirect\` (\`replace: true\`).
  - Path lama (\`/subtest/:id\`, \`/materi/:id\`) di-redirect \`301\` langsung di Edge Worker (\`src/worker.ts\`) maupun client fallback.

### B. Strategi Cloudflare Workers Static Assets & Eliminasi Soft 404
- **\`wrangler.jsonc\`:**
  - \`"directory": "./dist"\`, \`"run_worker_first": ${wranglerInfo?.assets?.run_worker_first ?? false}\`, \`"html_handling": "${wranglerInfo?.assets?.html_handling ?? 'auto-trailing-slash'}"\`, \`"not_found_handling": "${wranglerInfo?.assets?.not_found_handling ?? 'none'}"\`.
  - Karena \`run_worker_first: false\`, seluruh aset statis di \`dist/\` (155 halaman HTML, CSS, JS, JSON, SVG, \`sitemap.xml\`, \`robots.txt\`, \`ads.txt\`) dilayani langsung oleh **Edge CDN Cloudflare** tanpa mengurangi kuota 100.000 request Worker/hari.
- **\`src/worker.ts\` (Hanya menangani rute non-statis):**
  1. \`301\` redirect untuk \`/subtest/*\` dan \`/materi/*\` ke Clean Path \`/utbk/*\`.
  2. Menyajikan \`/200.html\` (\`status: 200\`, \`X-Robots-Tag: noindex, follow\`) untuk rute SPA \`/drilling\` & \`/drilling/:subtest\`.
  3. Menyajikan \`/404.html\` dengan status **HTTP \`404 Not Found\`** asli untuk URL tak dikenal (menghilangkan masalah *Soft 404* di Search Console & AdSense).
- **Caching Headers (\`public/_headers\`):**
  - \`/assets/*\`: \`public, max-age=31536000, immutable\`
  - \`/content/*\`: \`public, max-age=86400, stale-while-revalidate=604800\`
  - \`/*.html\`: \`public, max-age=0, must-revalidate\` + \`X-Content-Type-Options: nosniff\`, \`X-Frame-Options: SAMEORIGIN\`, \`Referrer-Policy: strict-origin-when-cross-origin\`.

---

## 3. Arsitektur Performa, Bundle Splitting & Anti-Lag

1. **Zero Double-Payload & 0ms Hydration (\`#__PAGE_DATA__\`):**
   - \`scripts/prerender.mjs\` menyisipkan **hanya 1 JSON sub-bab aktif** (atau 1 bab rangkuman) ke dalam \`<script id="__PAGE_DATA__" type="application/json">...</script>\` dengan escaping aman (\`<\`, \`>\`, \`&\`, \`\\u2028\`, \`\\u2029\`).
   - \`src/lib/contentLoader.ts\` & \`src/lib/rangkumanLoader.ts\` membaca \`#__PAGE_DATA__\` secara sinkron saat inisialisasi client (0 ms latency, 0 network fetch ulang). Navigasi ke sub-bab lain baru memicu \`fetch('/content/utbk/...')\`.
   - Tidak ada impor statis \`puMaterials.ts\` maupun \`import.meta.glob\` pada JSON materi/rangkuman; silabus client memakai \`src/data/syllabus-light.json\` (19.5 KB vs 208 KB penuh).
2. **Route-Level Code Splitting + Flat Synchronous SSR:**
   - \`src/App.tsx\` membungkus seluruh rute sekunder (\`SubtestDetailView\`, \`PdfMaterialReader\`, \`RangkumanPage\`, \`ActiveDrillingView\`, SMA, Legal) dengan \`React.lazy()\`.
   - \`src/entry-client.tsx\` & \`src/entry-server.tsx\` memanggil \`resolveRouteComponents(pathname)\` untuk memuat **hanya 1 chunk rute aktif** sebelum \`hydrateRoot\` / \`renderToString\`. Hasilnya: HTML statis tetap rata/flat (tanpa \`<template id="B:0">\` atau \`<div hidden id="S:0">\`), sementara halaman \`/\` **tidak mengunduh** \`vendor-markdown\` (KaTeX + Remark + Rehype) maupun CSS KaTeX.
   - \`scripts/prerender.mjs\` menyuntikkan stylesheet KaTeX hanya pada rute materi dan rangkuman agar bebas FOUC.
3. **Eliminasi Lag UI, Scroll & Re-render React:**
   - **Single Responsive DOM (\`DetailMateriAccordion.tsx\`):** Menghapus duplikasi pohon DOM Desktop+Mobile; satu markup adaptif (\`grid-cols-1\` di mobile $\\rightarrow$ \`md:grid-cols-[38%_34%_28%]\` di desktop), memangkas jumlah node DOM & KaTeX hingga ~40–50% pada bab berat.
   - **Memoized Markdown & KaTeX (\`ThreeZoneMaterialViewer.tsx\`, \`RangkumanPage.tsx\`):** Konstanta \`REMARK_PLUGINS\`, \`KATEX_REHYPE_PLUGINS\`, dan objek \`components\` ditempatkan di scope modul dengan pembungkus \`React.memo\`, sehingga klik jawaban kuis atau ganti tab tidak mem-parse ulang seluruh KaTeX di halaman.
   - **Zero-Re-render Scroll Progress (\`RangkumanPage.tsx\`):** Listener \`scroll\` memperbarui \`progressTextRef\` dan \`progressBarFillRef\` via \`requestAnimationFrame\` tanpa \`setState\`, ditambah \`content-visibility: auto\` pada \`.rangkuman-card\`.
   - **Lazy Non-Critical Assets:** \`LazyDecorations.tsx\` menunda SVG dekoratif hingga setelah hydration; \`VisualRenderer.tsx\` melakukan \`await import('mermaid')\` dinamis di \`useEffect\`; Google Fonts di \`index.html\` dimuat non-blocking (\`media="print" onload="this.media='all'"\`).
${buildMetrics ? `
### Metrik Hasil Build Terbaru (\`dist/\`)
| Aset / Halaman | Ukuran Terverifikasi | Keterangan |
| :--- | :--- | :--- |
| \`dist/index.html\` (Beranda \`/\`) | **${buildMetrics.indexHtml}** | Pre-rendered flat HTML; bebas \`vendor-markdown\` & bebas KaTeX CSS |
| Entry JS (\`assets/index-*.js\`) | **${buildMetrics.entryJs}** | Hanya mengimpor \`vendor-react\` & \`vendor-icons\` |
| \`vendor-react\` chunk | **${buildMetrics.vendorReact}** | React 19, ReactDOM, React Router |
| \`vendor-icons\` chunk | **${buildMetrics.vendorIcons}** | Lucide icons |
| \`vendor-markdown\` chunk (Lazy) | **${buildMetrics.vendorMarkdownJs}** / CSS **${buildMetrics.vendorMarkdownCss}** | Hanya dimuat di \`/utbk/:subtest/:materiId\`, \`/rangkuman*\`, \`/drilling*\` |
| \`PdfMaterialReader\` / \`SubtestDetailView\` / \`RangkumanPage\` | **${buildMetrics.pdfReaderChunk}** / **${buildMetrics.subtestDetailChunk}** / **${buildMetrics.rangkumanChunk}** | Lazy per rute |
| \`ActiveDrillingView\` chunk | **${buildMetrics.drillingChunk}** | Client-only SPA chunk |
| Total URL terindeks \`sitemap.xml\` | **${buildMetrics.sitemapUrls} URL** | Home + 7 Subtes + ${utbkContent.totalSubchapters} Materi + ${rangkumanContent.totalBab + 1} Rangkuman + 4 Legal |
` : ''}
---

## 4. Kesiapan Teknis Google AdSense 2026 & Roadmap Custom Domain

### Status Kepatuhan Saat Ini
- **Anti-Thin Content Filter (\`scripts/lib/contentValidator.mjs\`):** Hanya materi substansial (markdown inti $\\ge 100$ karakter non-placeholder serta memiliki variasi pola atau soal uji) yang di-prerender dan masuk \`sitemap.xml\`. Halaman SMA (\`/sma*\`) dan fallback (\`404.html\`, \`200.html\`) diberi \`noindex, follow\`.
- **\`AdSlot.tsx\` Pre-Approval Guard & CLS=0:** Saat \`VITE_ADSENSE_CLIENT_ID\` atau \`VITE_ADSENSE_SLOTS_ENABLED=true\` belum aktif, \`AdSlot\` mengembalikan \`null\` (sehingga tahap review AdSense bisa menyuntikkan script \`<head>\` tanpa memunculkan kotak iklan kosong). Saat aktif, \`AdSlot\` mereservasi tinggi \`min-h-[100px]\`/\`min-h-[250px]\`, label \`Iklan • Advertisement\`, dan menunda inisialisasi script AdSense via \`requestIdleCallback\` / fallback 1500ms / interaksi pengguna pertama.
- **\`public/robots.txt\`:** Secara eksplisit mengizinkan \`Googlebot\` dan \`Mediapartners-Google\` (\`Allow: /\`), hanya memblokir \`/drilling\`.
- **Kebersihan Script Pihak Ketiga:** Service worker jaringan iklan eksternal (\`sw.js\`) telah dihapus permanen dari repositori dan build.
- **E-E-A-T & Legal Pages:** \`AboutPage\` (mencakup Standar Editorial & Verifikasi Kurikulum), \`ContactPage\` (surel resmi \`support@skolace.my.id\`, \`errata@skolace.my.id\`, formulir laporan cepat, FAQ), \`PrivacyPolicyPage\` (disclosure cookie Google & link opt-out), \`TermsPage\`, serta JSON-LD \`Article\`/\`LearningResource\` dengan \`Tim Penyusun Kurikulum SkolAce\`.

### Langkah Akhir Saat Custom Domain Dibeli (Siap Submit AdSense)
1. Hubungkan Custom Domain (mis. \`skolace.my.id\`) ke project Cloudflare Workers (\`acapeak\`).
2. Jalankan build dengan environment variable domain final:
   \`SITE_URL=https://skolace.my.id npm run build\` (otomatis memperbarui \`canonical\`, \`og:url\`, JSON-LD, \`sitemap.xml\`, dan \`robots.txt\`).
3. Daftar ke Google AdSense menggunakan custom domain tersebut, lalu:
   - Isi \`public/ads.txt\` dengan baris aktif \`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\`.
   - Set environment variable \`VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX\` pada Cloudflare build agar \`scripts/prerender.mjs\` menyisipkan script verifikasi \`adsbygoogle.js\` di \`<head>\` dan mengaktifkan komponen \`AdSlot\` ber-reservasi CLS=0 setelah disetujui.

---

## 5. Struktur Direktori & Peran File

\`\`\`text
d:/web/
├── .github/workflows/             # CI/CD deployment workflows
├── content/
│   ├── utbk/{pu,ppu,pbm,pk,lbi,lbe,pm}/*.json  # 106 file materi & soal UTBK 3-zona
│   └── rangkuman/*.json                        # 27 file cheat sheet bab + index.json
├── public/
│   ├── content/                   # Mirror JSON untuk runtime fetch
│   ├── _headers                   # Cloudflare caching & security headers
│   ├── ads.txt                    # Template Authorized Digital Sellers AdSense
│   ├── robots.txt                 # Rules Googlebot & Mediapartners-Google
│   └── sitemap.xml                # Auto-generated anti-thin XML sitemap
├── scripts/
│   ├── lib/contentValidator.mjs   # Validator anti-thin content & safeJsonSerialize
│   ├── build.mjs                  # Pipeline: content sync/verify -> tsc -> vite build (SSG + SEO)
│   ├── prerender.mjs              # Batch concurrent SSG renderer & #__PAGE_DATA__ injector
│   ├── generate_seo_files.mjs     # Generator sitemap.xml & robots.txt
│   ├── copy_assets.mjs            # Helper fallback asset mirror
│   ├── run_rotation_test.mjs      # Runner test rotasi soal
│   ├── test_rotation_engine.mjs   # Unit test engine rotasi deterministik
│   └── generate_summary.mjs       # Generator PROJECT_CONTEXT.md ini
├── src/
│   ├── components/                # UI modular (common, content, decorations, drilling, home, navigation, reader, subtest)
│   ├── data/                      # syllabus.json & syllabus-light.json (19.5 KB)
│   ├── lib/                       # contentLoader, rangkumanLoader, drillingRotationEngine, syllabusData, smaSyllabusData
│   ├── pages/                     # RangkumanPage, AboutPage, ContactPage, PrivacyPolicyPage, TermsPage
│   ├── types/                     # material.ts & rangkuman.ts
│   ├── App.tsx                    # Central Clean Path Router + Legacy Redirects + Lazy Routes
│   ├── entry-client.tsx           # Client hydration (#__PAGE_DATA__ + single route preload)
│   ├── entry-server.tsx           # Pure stateless SSR render()
│   └── worker.ts                  # Cloudflare Worker fallback (301 legacy, 200 /drilling, true 404)
├── wrangler.jsonc                 # Cloudflare Workers Static Assets (run_worker_first: false)
├── vite.config.ts                 # Vite 6 + manualChunks + integrated SSG plugin
└── PROJECT_CONTEXT.md             # File ringkasan lengkap ini
\`\`\`

### Rincian File Source Code & Konfigurasi
| File | Ukuran | Baris | Peran / Deskripsi |
| :--- | :---: | :---: | :--- |
${[...srcFiles, ...scriptFiles, ...publicFiles]
  .map((f) => `| \`${f.path}\` | ${f.size} | ${f.lines} | ${fileRoles[f.path] || 'Modul pendukung'} |`)
  .join('\n')}

---

## 6. Master Data Schema & Interfaces (\`src/types/material.ts\` & \`rangkuman.ts\`)

### Struktur Utama \`ThreeZoneMaterial\` (Format JSON \`content/utbk/*/*.json\`)
\`\`\`typescript
interface ThreeZoneMaterial {
  kode_subbab: string;          // e.g. "pu-01-01"
  subtes: string;               // e.g. "Subtes 1: Penalaran Umum (PU)"
  bab: string;                  // e.g. "Bab 1: Penalaran Induktif"
  judul_subbab: string;
  klasifikasi_materi: 'INTI' | 'PENGAYAAN';
  zona_1_peta_taktis: {
    estimasi_menit_baca: number;
    frekuensi_utbk: string;
    exam_hook?: { pertanyaan_pemantik: string; opsi_cepat: string[]; jawaban_benar_index: number; penjelasan_kilat: string };
    konsep_inti_markdown: string;
    detail_materi_lengkap?: DetailMateriLengkap | null; // Zona 1B Accordion
    radar_jebakan_utbk: string[];
    visual?: VisualData | null; // tipe: 'svg' | 'mermaid'
  };
  zona_2_variasi_inti: {
    nomor_variasi: number;
    nama_variasi: string;
    kategori_variasi: string;
    stimulus_mini: string;
    bedah_pola_markdown: string;
    kunci_pembeda: string;
    visual?: VisualData | null;
  }[];
  zona_3_uji_pemahaman: {
    nomor_soal: number;
    menguji_variasi_ke: number[];
    tipe_soal_utbk: string;
    pertanyaan_markdown: string;
    opsi_jawaban: string[];
    kunci_jawaban: string;
    bedah_cepat_markdown: string;
    visual?: VisualData | null;
  }[];
}
\`\`\`

### Struktur \`WorkedExample\` (Adaptor Drilling Multi-Format BPPP)
- Tipe soal yang didukung: \`standard_mc\` (PG 5 opsi A–E), \`statements_1234\`, \`data_sufficiency\`, \`mc_complex_table\` (PGK Tabel Benar/Salah), \`mc_complex_checkbox\` (PGK Multi-select), dan \`short_answer\` (Isian singkat numerik/teks).
- Evaluasi jawaban lintas format ditangani oleh \`isAnswerCorrect\` di \`src/lib/drillingRotationEngine.ts\`.

---

## 7. Arsitektur Drilling & Deterministic Stratified Rotation Engine (\`src/lib/drillingRotationEngine.ts\`)

Mesin perakitan sesi latihan soal mereplikasi proporsi resmi UTBK-SNBT BPPP:
1. **Multi-Subtest & Subchapter Round-Robin Balancing:** Kuota $\\lfloor N / k \\rfloor$ per subtes dengan rotasi merata antar bab/sub-bab, *variation anti-collision*, serta pengelompokan wacana (\`passage_group_id\`).
2. **Difficulty Filter & 5-Item Wave Patterning:** Menyaring \`easy\`, hanya memakai \`medium\` (~55%) dan \`hard\` (~45%) dengan siklus gelombang \`[medium, medium, hard, medium, hard]\`.
3. **Matriks Proporsi BPPP per Subtes:**
   - **PU & LBI:** 75% PG, 25% PGK, 0% Isian.
   - **PPU & LBE:** 85% PG, 15% PGK, 0% Isian.
   - **PBM:** 80% PG, 15% PGK, 5% Isian Singkat.
   - **PK & PM:** 55% PG, 25% PGK, 20% Isian Singkat.
4. **Seen Tracker & Order Modes:** \`utbk_seen_questions_v1\` di \`localStorage\` memprioritaskan soal *unseen*; mendukung mode **Blocking per Subtes** dan **Interleaved Round-Robin**.

---

## 8. Inventaris Lengkap Seluruh Materi Web

### A. Ringkasan 7 Subtes Resmi UTBK-SNBT
Total: **${utbkContent.totalSubchapters} Sub-bab**, **${utbkContent.totalVariations} Variasi Inti**, **${utbkContent.totalDetailButir} Butir Detail Materi**, **${utbkContent.totalQuestions} Soal Uji/Drilling**.

| Subtes | Kode | Sub-bab | Variasi Pola | Detail Butir | Soal HOTS |
| :--- | :---: | :---: | :---: | :---: | :---: |
${utbkContent.subtests
  .map(
    (s) =>
      `| **${s.name}** | \`${s.code.toUpperCase()}\` | ${s.subchapters} | ${s.variations} | ${s.detailButir} | ${s.questions} |`
  )
  .join('\n')}

### B. Rincian Lengkap ${utbkContent.totalSubchapters} Sub-bab UTBK-SNBT
${utbkContent.subtests
  .map(
    (s) => `#### ${s.name} (\`/utbk/${s.code}\`)
| ID | Bab | Judul Sub-bab | Klasifikasi | Variasi | Butir | Soal |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
${s.files
  .map(
    (f) =>
      `| \`${f.id}\` | ${f.chapter} | ${f.title} | ${f.klasifikasi} | ${f.variations} | ${f.detailButir} | ${f.questions} |`
  )
  .join('\n')}`
  )
  .join('\n\n')}

### C. Inventaris ${rangkumanContent.totalBab} Rangkuman Bab / Cheat Sheet (\`/rangkuman/:babId\`)
| Kode Bab | Subtes | Judul Bab | Sub-bab | Butir | Estimasi |
| :--- | :--- | :--- | :---: | :---: | :---: |
${rangkumanContent.babs
  .map(
    (b) =>
      `| \`${b.kode_bab}\` | ${b.subtes} | ${b.bab} | ${b.jumlah_subbab} | ${b.jumlah_butir} | ${b.estimasi_menit} mnt |`
  )
  .join('\n')}

### D. Kurikulum Mata Pelajaran SMA (\`/sma/:subject\` — \`ENABLE_SMA_MODE = false\`, \`noindex\`)
| ID | Mata Pelajaran | Kategori | Topik Siap | Topik Mendatang |
| :--- | :--- | :---: | :---: | :---: |
${smaSubjects
  .map((s) => `| \`${s.id}\` | ${s.name} | ${s.category.toUpperCase()} | ${s.readyCount} | ${s.upcomingCount} |`)
  .join('\n')}

---

## 9. Standar KaTeX & Aturan Wajib Pengembangan

1. **Standar KaTeX (\`src/index.css\` & runtime preprocessor):**
   - Auto-promotion \`\\frac\` $\\rightarrow$ \`\\dfrac\` pada renderer Markdown agar pecahan tampil besar dan tidak bertabrakan.
   - \`.katex\` dikunci \`line-height: 1.2 !important\`, \`.frac-line\` \`1.25px\` dengan \`height: 0 !important\`, dan \`transform: none !important\` pada \`.vlist\` / \`.mfrac\`.
   - Seluruh rumus dalam JSON memakai tanda dollar tunggal \`$...$\` dengan backslash ter-escape ganda (\`\\\\\`).
2. **Aturan Modifikasi:**
   - Jangan ubah logika \`src/lib/drillingRotationEngine.ts\` maupun aturan KaTeX baseline/strut protection di \`src/index.css\`.
   - Verifikasi komputasi soal kuantitatif (PU/PK/PM) sebelum menyimpan JSON.
   - Setiap kali menambah atau mengubah struktur/materi, jalankan \`npm run build\` dan \`npm run summary\`.

---

## 10. Perintah Operasional & Environment Variables

| Perintah / Variabel | Deskripsi |
| :--- | :--- |
| \`npm run dev\` | Menjalankan Vite dev server lokal |
| \`npm run build\` | Validasi & sync \`content/\` -> \`tsc -b\` -> Vite client/SSR build + batch SSG prerender + SEO sitemap/robots |
| \`npm run test:rotation\` | Menjalankan 5 unit test Deterministic Stratified Rotation Engine |
| \`npm run summary\` | Memperbarui file \`PROJECT_CONTEXT.md\` ini secara otomatis |
| \`SITE_URL=https://domainanda.com\` | Env build-time untuk canonical, OpenGraph, JSON-LD, \`sitemap.xml\`, dan \`robots.txt\` |
| \`VITE_ADSENSE_CLIENT_ID=ca-pub-...\` | Env build-time untuk menyisipkan script verifikasi \`adsbygoogle.js\` di \`<head>\` (halaman terindeks) |
| \`VITE_ADSENSE_SLOTS_ENABLED=true\` | Env build-time (setelah disetujui AdSense) untuk mengaktifkan unit \`<AdSlot />\` di konten materi |
| \`VITE_CONTACT_FORM_ENDPOINT=...\` | Env build-time opsional untuk pengiriman POST JSON formulir halaman \`/contact\` |
| \`VITE_CF_BEACON_TOKEN=...\` | Env build-time opsional untuk menyisipkan skrip Cloudflare Web Analytics bebas cookie |
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
  watchDirs.forEach((dir) => {
    const fullDir = path.join(ROOT_DIR, dir);
    if (fs.existsSync(fullDir)) {
      fs.watch(fullDir, { recursive: true }, (_event, filename) =>
        triggerUpdate(`${dir}/${filename}`)
      );
    }
  });
  fs.watch(path.join(ROOT_DIR, 'package.json'), () => triggerUpdate('package.json'));
} else {
  generateSummary();
}
