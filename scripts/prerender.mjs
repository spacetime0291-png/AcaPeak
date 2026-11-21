import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://acapeak.spacetime0291.workers.dev').replace(/\/+$/, '');

function findServerEntry(dir) {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findServerEntry(fullPath);
      if (found) return found;
    } else if (entry.name.startsWith('entry-server') && entry.name.endsWith('.js')) {
      return fullPath;
    }
  }
  return null;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectSeoIntoHtml(templateHtml, appHtml, seo, initialData = null) {
  let html = templateHtml;

  // 1. Inject server-rendered app HTML using replacer function to protect dollar signs ($) in math
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    () => `<div id="root">${appHtml}</div>`
  );

  // 2. Replace title
  if (seo.title) {
    html = html.replace(/<title>.*?<\/title>/i, () => `<title>${escapeHtml(seo.title)}</title>`);
  }

  // 3. Prepare head tags to inject
  const headTags = [];

  // Description
  if (seo.description) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, '');
    headTags.push(`<meta name="description" content="${escapeHtml(seo.description)}" />`);
  }

  // Canonical
  if (seo.canonical) {
    headTags.push(`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`);
  }

  // OpenGraph
  if (seo.title) {
    headTags.push(`<meta property="og:title" content="${escapeHtml(seo.title)}" />`);
  }
  if (seo.description) {
    headTags.push(`<meta property="og:description" content="${escapeHtml(seo.description)}" />`);
  }
  if (seo.canonical) {
    headTags.push(`<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`);
  }
  headTags.push(`<meta property="og:type" content="${escapeHtml(seo.ogType || 'website')}" />`);
  headTags.push(`<meta property="og:site_name" content="SkolAce" />`);
  headTags.push(`<meta property="og:locale" content="id_ID" />`);

  // Twitter
  headTags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (seo.title) {
    headTags.push(`<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`);
  }
  if (seo.description) {
    headTags.push(`<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);
  }

  // JSON-LD Schema
  if (seo.schema) {
    headTags.push(`<script type="application/ld+json">${JSON.stringify(seo.schema)}</script>`);
  }

  // Inject head tags before </head>
  html = html.replace('</head>', () => `  ${headTags.join('\n  ')}\n</head>`);

  // 4. Inject initial data script if present (before closing </body> or entry-client)
  if (initialData) {
    const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};</script>`;
    html = html.replace('</body>', () => `  ${dataScript}\n</body>`);
  }

  return html;
}

async function prerender() {
  console.log('🚀 Starting Native SSG Pre-rendering...');
  console.log(`🌐 Base Site URL: ${SITE_URL}`);

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run client build first.');
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  const serverEntryPath = findServerEntry(path.join(DIST_DIR, 'server'));
  if (!serverEntryPath) {
    throw new Error('Server entry point (entry-server.js) not found in dist/server!');
  }

  console.log(`📦 Loading SSR bundle: ${serverEntryPath}`);
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  // Load syllabus metadata
  const syllabusPath = path.join(ROOT_DIR, 'src/data/syllabus.json');
  const syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf8'));

  let totalRendered = 0;

  // Helper to write static file
  function writeStaticPage(urlPath, pageHtml) {
    const cleanPath = urlPath.replace(/^\/+|\/+$/g, '');
    let targetFile;

    if (!cleanPath) {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else {
      const targetDir = path.join(DIST_DIR, cleanPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      targetFile = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    totalRendered++;
  }

  // -----------------------------------------------------------
  // 1. HOME PAGE (/)
  // -----------------------------------------------------------
  console.log('📄 Pre-rendering Home Page (/) ...');
  const homeRender = render('/');
  const homeSeo = {
    title: 'SkolAce | Platform Belajar & Drilling UTBK-SNBT Bebas Biaya (Rp0)',
    description: 'Platform web persiapan UTBK-SNBT 7 subtes lengkap bebas biaya (Rp0). Ribuan variasi soal HOTS, materi taktis 3 zona, dan simulasi drilling adaptif.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SkolAce',
      url: `${SITE_URL}/`,
      description: 'Platform belajar dan drilling UTBK-SNBT 7 subtes lengkap bebas biaya (Rp0).',
      inLanguage: 'id',
    },
  };
  const homeHtml = injectSeoIntoHtml(templateHtml, homeRender.html, homeSeo);
  writeStaticPage('/', homeHtml);

  // -----------------------------------------------------------
  // 2. 7 SUBTEST PAGES (/subtest/:code)
  // -----------------------------------------------------------
  for (const sub of syllabus) {
    const code = sub.code.toLowerCase();
    const url = `/subtest/${code}`;
    console.log(`📄 Pre-rendering Subtest Page: ${url} ...`);

    const subRender = render(url);
    const subName = sub.title || sub.name || sub.code;
    const subSeo = {
      title: `Silabus & Drilling ${subName} (${sub.code.toUpperCase()}) | SkolAce UTBK-SNBT`,
      description: `Silabus resmi, materi taktis 3 zona, dan bank soal drilling HOTS untuk subtes ${subName} (${sub.code.toUpperCase()}) UTBK-SNBT.`,
      canonical: `${SITE_URL}${url}`,
      ogType: 'website',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `Subtes ${subName} (${sub.code.toUpperCase()})`,
        description: `Modul materi dan latihan soal UTBK-SNBT untuk subtes ${subName}.`,
        provider: {
          '@type': 'Organization',
          name: 'SkolAce',
          url: `${SITE_URL}/`,
        },
        inLanguage: 'id',
      },
    };
    const pageHtml = injectSeoIntoHtml(templateHtml, subRender.html, subSeo);
    writeStaticPage(url, pageHtml);
  }

  // -----------------------------------------------------------
  // 3. 106 MATERIAL PAGES (/materi/:id)
  // -----------------------------------------------------------
  const allSubtopics = [];
  for (const sub of syllabus) {
    const subtestCode = sub.code.toUpperCase();
    if (sub.modules) {
      for (const mod of sub.modules) {
        for (const topic of mod.subtopics) {
          allSubtopics.push({
            id: topic.id,
            title: topic.title,
            subtestCode,
            chapterTitle: mod.title,
          });
        }
      }
    } else if (sub.chapters) {
      for (const ch of sub.chapters) {
        for (const topic of ch.subchapters) {
          allSubtopics.push({
            id: topic.id,
            title: topic.title,
            subtestCode,
            chapterTitle: ch.chapter_title,
          });
        }
      }
    }
  }

  console.log(`📚 Pre-rendering ${allSubtopics.length} Material Pages (/materi/:id) ...`);

  for (const topic of allSubtopics) {
    const matId = topic.id.toLowerCase();
    const subtestPrefix = topic.subtestCode.toLowerCase();
    const url = `/materi/${matId}`;

    // Read material JSON
    let rawMaterial = null;
    const jsonPaths = [
      path.join(ROOT_DIR, 'public/content/utbk', subtestPrefix, `${matId}.json`),
      path.join(ROOT_DIR, 'content/utbk', subtestPrefix, `${matId}.json`),
    ];

    for (const p of jsonPaths) {
      if (fs.existsSync(p)) {
        try {
          rawMaterial = JSON.parse(fs.readFileSync(p, 'utf8'));
          break;
        } catch {}
      }
    }

    const matRender = render(url, { initialMaterial: rawMaterial });
    const matTitle = rawMaterial?.judul_subbab || topic.title;

    const matSeo = {
      title: `${topic.subtestCode} - ${matTitle} | SkolAce UTBK-SNBT`,
      description: `Pelajari materi ${matTitle} (${topic.subtestCode}) untuk UTBK-SNBT. Konsep inti, radar jebakan, trik eliminasi, dan latihan uji pemahaman berstandar BPPP.`,
      canonical: `${SITE_URL}${url}`,
      ogType: 'article',
      schema: {
        '@context': 'https://schema.org',
        '@type': ['Article', 'LearningResource'],
        headline: `Materi UTBK: ${matTitle} (${topic.subtestCode})`,
        description: `Pelajari materi ${matTitle} untuk persiapan tes UTBK-SNBT.`,
        author: {
          '@type': 'Organization',
          name: 'SkolAce',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SkolAce',
        },
        educationalLevel: 'Sekolah Menengah Atas / Persiapan Masuk PTN',
        learningResourceType: 'Exam Preparation Material',
        inLanguage: 'id',
      },
    };

    const pageHtml = injectSeoIntoHtml(templateHtml, matRender.html, matSeo, rawMaterial);
    writeStaticPage(url, pageHtml);
  }

  // -----------------------------------------------------------
  // 4. 4 LEGAL PAGES (/about, /privacy-policy, /terms, /contact)
  // -----------------------------------------------------------
  const legalPages = [
    {
      url: '/about',
      title: 'Tentang Kami | SkolAce UTBK-SNBT',
      description: 'Tentang platform edukasi SkolAce: Belajar dan drilling UTBK-SNBT 7 subtes bebas biaya Rp0 tanpa batas untuk seluruh siswa Indonesia.',
    },
    {
      url: '/privacy-policy',
      title: 'Kebijakan Privasi | SkolAce UTBK-SNBT',
      description: 'Kebijakan privasi SkolAce: Penggunaan cookies, iklan pihak ketiga Google AdSense, dan komitmen keamanan data belajar lokal.',
    },
    {
      url: '/terms',
      title: 'Syarat dan Ketentuan | SkolAce UTBK-SNBT',
      description: 'Syarat dan ketentuan penggunaan platform edukasi independen persiapan UTBK-SNBT SkolAce.',
    },
    {
      url: '/contact',
      title: 'Kontak & Pusat Bantuan | SkolAce UTBK-SNBT',
      description: 'Hubungi tim SkolAce untuk pertanyaan, bantuan teknis, dan pelaporan errata/koreksi soal latihan UTBK-SNBT.',
    },
  ];

  for (const lp of legalPages) {
    console.log(`📄 Pre-rendering Legal Page: ${lp.url} ...`);
    const lpRender = render(lp.url);
    const lpSeo = {
      title: lp.title,
      description: lp.description,
      canonical: `${SITE_URL}${lp.url}`,
      ogType: 'website',
    };
    const pageHtml = injectSeoIntoHtml(templateHtml, lpRender.html, lpSeo);
    writeStaticPage(lp.url, pageHtml);
  }

  // -----------------------------------------------------------
  // 5. 404 & 200 (SPA CATCH-ALL) FALLBACK FOR CLIENT ROUTING & ROOT SYNC
  // -----------------------------------------------------------
  fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
  fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '200.html'));
  fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(ROOT_DIR, '404.html'));

  // -----------------------------------------------------------
  // 6. CLEAN UP dist/server FOLDER
  // -----------------------------------------------------------
  const serverDir = path.join(DIST_DIR, 'server');
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary dist/server directory.');
  }

  console.log(`✅ Native SSG Pre-rendering completed! Total ${totalRendered} static HTML pages generated.`);
}

prerender().catch((err) => {
  console.error('❌ Error during pre-rendering:', err);
  process.exit(1);
});
