import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import {
  safeJsonSerialize,
  isSubstantialMaterial,
  isSubstantialRangkuman,
  readMaterialJsonAsync,
  readRangkumanJsonAsync,
} from './lib/contentValidator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://acapeak.spacetime0291.workers.dev'
).replace(/\/+$/, '');
const ADSENSE_CLIENT_ID = (process.env.VITE_ADSENSE_CLIENT_ID || '').trim();
const HAS_LIVE_ADSENSE =
  ADSENSE_CLIENT_ID.startsWith('ca-pub-') &&
  !ADSENSE_CLIENT_ID.includes('XXXX') &&
  !ADSENSE_CLIENT_ID.includes('000000');
const BATCH_SIZE = 16;

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
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripMarkdownSnippet(md, maxLen = 155) {
  if (!md) return '';
  const cleaned = String(md)
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/[#>*_`[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen - 3).trim()}...`;
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

  // Robots directive
  headTags.push(
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />`
  );

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

  // JSON-LD Schema (safe serialized)
  if (seo.schema) {
    headTags.push(
      `<script type="application/ld+json">${safeJsonSerialize(seo.schema)}</script>`
    );
  }

  // Optional Google AdSense global verification / Auto Ads <head> script when configured
  if (HAS_LIVE_ADSENSE && !seo.noindex) {
    headTags.push(
      `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        ADSENSE_CLIENT_ID
      )}" crossorigin="anonymous"></script>`
    );
  }

  // Inject KaTeX / lazy route stylesheets only on pages that render math/markdown
  if (Array.isArray(seo.extraStylesheets) && seo.extraStylesheets.length > 0) {
    for (const cssHref of seo.extraStylesheets) {
      if (!html.includes(cssHref)) {
        headTags.push(`<link rel="stylesheet" crossorigin href="${escapeHtml(cssHref)}" />`);
      }
    }
  }

  // Inject head tags before </head>
  html = html.replace('</head>', () => `  ${headTags.join('\n  ')}\n</head>`);

  // 4. Inject ONLY active page data as <script id="__PAGE_DATA__" type="application/json">
  if (initialData !== null && initialData !== undefined) {
    const dataScript = `<script id="__PAGE_DATA__" type="application/json">${safeJsonSerialize(initialData)}</script>`;
    html = html.replace('</body>', () => `  ${dataScript}\n</body>`);
  }

  return html;
}

function parseSmaSubjectsMetadata() {
  const smaPath = path.join(ROOT_DIR, 'src/lib/smaSyllabusData.ts');
  if (!fs.existsSync(smaPath)) return [];
  const src = fs.readFileSync(smaPath, 'utf8');
  const results = [];
  const regex = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(src)) !== null) {
    results.push({ id: match[1], name: match[2] });
  }
  return results;
}

async function runInBatches(items, batchSize, workerFn) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(workerFn));
  }
}

async function prerender() {
  const startTime = Date.now();
  console.log('🚀 Starting Native SSG Pre-rendering...');
  console.log(`🌐 Base Site URL: ${SITE_URL}`);

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run client build first.');
  }
  const templateHtml = await fs.promises.readFile(templatePath, 'utf8');

  // Discover lazy CSS stylesheets (e.g. KaTeX CSS) not included in main templateHtml
  const assetsDir = path.join(DIST_DIR, 'assets');
  const mathCssFiles = fs.existsSync(assetsDir)
    ? fs
        .readdirSync(assetsDir)
        .filter((f) => f.endsWith('.css') && !templateHtml.includes(`/assets/${f}`))
        .map((f) => `/assets/${f}`)
    : [];

  const serverEntryPath = findServerEntry(path.join(DIST_DIR, 'server'));
  if (!serverEntryPath) {
    throw new Error('Server entry point (entry-server.js) not found in dist/server!');
  }

  console.log(`📦 Loading SSR bundle: ${serverEntryPath}`);
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  // Load syllabus metadata
  const syllabusPath = path.join(ROOT_DIR, 'src/data/syllabus.json');
  const syllabus = JSON.parse(await fs.promises.readFile(syllabusPath, 'utf8'));

  let totalRendered = 0;
  let skippedThinCount = 0;

  async function writeStaticPage(urlPath, pageHtml) {
    const cleanPath = urlPath.replace(/^\/+|\/+$/g, '');
    let targetFile;

    if (!cleanPath) {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else {
      const targetDir = path.join(DIST_DIR, cleanPath);
      await fs.promises.mkdir(targetDir, { recursive: true });
      targetFile = path.join(targetDir, 'index.html');
    }

    await fs.promises.writeFile(targetFile, pageHtml, 'utf8');
    totalRendered++;
  }

  // -----------------------------------------------------------
  // 1. HOME PAGE (/)
  // -----------------------------------------------------------
  console.log('📄 Pre-rendering Home Page (/) ...');
  const homeRender = await render('/');
  const homeSeo = {
    title: 'SkolAce | Platform Belajar & Drilling UTBK-SNBT Bebas Biaya (Rp0)',
    description:
      'Platform web persiapan UTBK-SNBT 7 subtes lengkap bebas biaya (Rp0). Materi taktis 3 zona, cheat sheet per bab, dan simulasi drilling adaptif berstandar BPPP.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SkolAce',
      url: `${SITE_URL}/`,
      description:
        'Platform belajar dan drilling UTBK-SNBT 7 subtes lengkap bebas biaya (Rp0).',
      publisher: {
        '@type': 'Organization',
        name: 'Tim Penyusun Kurikulum SkolAce',
        url: `${SITE_URL}/about`,
      },
      inLanguage: 'id',
    },
  };
  await writeStaticPage('/', injectSeoIntoHtml(templateHtml, homeRender.html, homeSeo));

  // -----------------------------------------------------------
  // 2. 7 UTBK SUBTEST PAGES (/utbk/:subtest)
  // -----------------------------------------------------------
  await runInBatches(syllabus, BATCH_SIZE, async (sub) => {
    const code = sub.code.toLowerCase();
    const url = `/utbk/${code}`;
    const subName = sub.title || sub.name || sub.code;
    const subRender = await render(url);
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
          name: 'Tim Penyusun Kurikulum SkolAce',
          url: `${SITE_URL}/about`,
        },
        inLanguage: 'id',
      },
    };
    await writeStaticPage(url, injectSeoIntoHtml(templateHtml, subRender.html, subSeo));
  });
  console.log(`📄 Pre-rendered ${syllabus.length} Subtest Pages (/utbk/:subtest).`);

  // -----------------------------------------------------------
  // 3. MATERIAL PAGES (/utbk/:subtest/:materiId) - Anti-Thin Content Filtered & Batched
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

  console.log(
    `📚 Pre-rendering Material Pages (/utbk/:subtest/:materiId) in batches of ${BATCH_SIZE} ...`
  );

  await runInBatches(allSubtopics, BATCH_SIZE, async (topic) => {
    const matId = topic.id.toLowerCase();
    const subtestPrefix = topic.subtestCode.toLowerCase();
    const url = `/utbk/${subtestPrefix}/${matId}`;

    const rawMaterial = await readMaterialJsonAsync(ROOT_DIR, subtestPrefix, matId);

    // Anti-Thin Content Guard: Only pre-render & index substantial materials
    if (!isSubstantialMaterial(rawMaterial)) {
      skippedThinCount++;
      return;
    }

    const matRender = await render(url, { initialMaterial: rawMaterial });
    const matTitle = rawMaterial.judul_subbab || topic.title;
    const chapterTitle = rawMaterial.bab || topic.chapterTitle;
    const coreSnippet = stripMarkdownSnippet(
      rawMaterial.zona_1_peta_taktis?.konsep_inti_markdown,
      110
    );

    const matSeo = {
      title: `${matTitle} (${chapterTitle}) — ${topic.subtestCode} | SkolAce UTBK-SNBT`,
      description: coreSnippet
        ? `${matTitle} (${topic.subtestCode} - ${chapterTitle}): ${coreSnippet}`
        : `Pelajari materi ${matTitle} pada ${chapterTitle} (${topic.subtestCode}) UTBK-SNBT lengkap dengan konsep inti, variasi pola soal, dan uji pemahaman.`,
      canonical: `${SITE_URL}${url}`,
      ogType: 'article',
      extraStylesheets: mathCssFiles,
      schema: {
        '@context': 'https://schema.org',
        '@type': ['Article', 'LearningResource'],
        headline: `${matTitle} — ${chapterTitle} (${topic.subtestCode})`,
        name: `${matTitle} | ${topic.subtestCode} UTBK-SNBT`,
        description: `Panduan belajar taktis 3 zona untuk sub-bab ${matTitle} (${chapterTitle}) subtes ${topic.subtestCode} UTBK-SNBT.`,
        url: `${SITE_URL}${url}`,
        datePublished: '2026-11-19',
        dateModified: '2026-11-25',
        author: {
          '@type': 'Organization',
          name: 'Tim Penyusun Kurikulum SkolAce',
          url: `${SITE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SkolAce',
          url: `${SITE_URL}/`,
        },
        about: {
          '@type': 'Thing',
          name: `${chapterTitle} - ${matTitle}`,
        },
        educationalLevel: 'SMA / Persiapan UTBK-SNBT',
        learningResourceType: 'Study Guide & Practice Problems',
        inLanguage: 'id',
      },
    };

    // Embed ONLY the 1 active sub-chapter JSON in <script id="__PAGE_DATA__">
    const pageHtml = injectSeoIntoHtml(templateHtml, matRender.html, matSeo, rawMaterial);
    await writeStaticPage(url, pageHtml);
  });

  console.log(
    `✅ Pre-rendered ${allSubtopics.length - skippedThinCount} substantial material pages (skipped ${skippedThinCount} thin/empty).`
  );

  // -----------------------------------------------------------
  // 4. RANGKUMAN BAB / CHEAT SHEET PAGES (/rangkuman, /rangkuman/:babId)
  // -----------------------------------------------------------
  const rangkumanIndexPaths = [
    path.join(ROOT_DIR, 'content/rangkuman/index.json'),
    path.join(ROOT_DIR, 'content/rangkuman/index_rangkuman.json'),
  ];
  const rangkumanIndexPath = rangkumanIndexPaths.find((p) => fs.existsSync(p));
  if (rangkumanIndexPath) {
    try {
      const rangkumanIndex = JSON.parse(await fs.promises.readFile(rangkumanIndexPath, 'utf8'));
      console.log('📑 Pre-rendering Rangkuman Index Page (/rangkuman) ...');
      const rIdxRender = await render('/rangkuman', { initialRangkumanIndex: rangkumanIndex });
      const rIdxSeo = {
        title: 'Cheat Sheet & Rangkuman Cepat UTBK-SNBT per Bab | SkolAce',
        description:
          'Lembar rangkuman padat dan rumus cepat UTBK-SNBT 7 subtes lengkap. Format 1 Teori = 1 Contoh untuk review cepat 5 menit sebelum drilling.',
        canonical: `${SITE_URL}/rangkuman`,
        ogType: 'website',
      };
      await writeStaticPage(
        '/rangkuman',
        injectSeoIntoHtml(templateHtml, rIdxRender.html, rIdxSeo, {
          indexData: rangkumanIndex,
        })
      );

      const allBabs = rangkumanIndex.daftar_subtes.flatMap((st) =>
        st.daftar_bab.map((b) => ({ ...b, subtes: st.subtes }))
      );

      console.log(
        `📑 Pre-rendering ${allBabs.length} Rangkuman Bab Pages (/rangkuman/:babId) in batches of ${BATCH_SIZE} ...`
      );
      await runInBatches(allBabs, BATCH_SIZE, async (b) => {
        const babCode = b.kode_bab.toLowerCase();
        const babUrl = `/rangkuman/${babCode}`;
        const rawBab = await readRangkumanJsonAsync(ROOT_DIR, babCode);

        if (!isSubstantialRangkuman(rawBab)) {
          return;
        }

        const bRender = await render(babUrl, {
          initialRangkumanBab: rawBab,
          initialRangkumanIndex: rangkumanIndex,
        });
        const babTitle = b.bab || b.nama_bab || b.kode_bab.toUpperCase();
        const bSeo = {
          title: `Cheat Sheet ${babTitle} (${b.kode_bab.toUpperCase()}) | SkolAce UTBK-SNBT`,
          description: `Lembar cheat sheet rangkuman padat ${babTitle} (${b.kode_bab.toUpperCase()}). 1 Teori Singkat = 1 Contoh Nyata berstandar UTBK-SNBT.`,
          canonical: `${SITE_URL}${babUrl}`,
          ogType: 'article',
          extraStylesheets: mathCssFiles,
          schema: {
            '@context': 'https://schema.org',
            '@type': ['Article', 'LearningResource'],
            headline: `Cheat Sheet ${babTitle} (${b.kode_bab.toUpperCase()})`,
            description: `Rangkuman cepat materi dan rumus ${babTitle} untuk persiapan UTBK-SNBT.`,
            url: `${SITE_URL}${babUrl}`,
            datePublished: '2026-11-22',
            dateModified: '2026-11-25',
            author: {
              '@type': 'Organization',
              name: 'Tim Penyusun Kurikulum SkolAce',
              url: `${SITE_URL}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'SkolAce',
              url: `${SITE_URL}/`,
            },
            educationalLevel: 'SMA / Persiapan UTBK-SNBT',
            learningResourceType: 'Cheat Sheet',
            inLanguage: 'id',
          },
        };
        await writeStaticPage(
          babUrl,
          injectSeoIntoHtml(templateHtml, bRender.html, bSeo, {
            babData: rawBab,
            indexData: rangkumanIndex,
          })
        );
      });
    } catch (e) {
      console.warn('⚠️ Could not pre-render rangkuman pages:', e);
    }
  }

  // -----------------------------------------------------------
  // 5. SMA ROUTES (/sma, /sma/:subject) — Marked noindex until full articles are populated
  // -----------------------------------------------------------
  const smaSubjects = parseSmaSubjectsMetadata();
  const smaHomeRender = await render('/sma');
  await writeStaticPage(
    '/sma',
    injectSeoIntoHtml(templateHtml, smaHomeRender.html, {
      title: 'Kurikulum Mata Pelajaran SMA | SkolAce',
      description: 'Daftar kurikulum mata pelajaran SMA (MIPA, IPS, dan Umum) di SkolAce.',
      canonical: `${SITE_URL}/sma`,
      ogType: 'website',
      noindex: true,
    })
  );

  await runInBatches(smaSubjects, BATCH_SIZE, async (subj) => {
    const url = `/sma/${subj.id}`;
    const sRender = await render(url);
    await writeStaticPage(
      url,
      injectSeoIntoHtml(templateHtml, sRender.html, {
        title: `${subj.name} — Kurikulum SMA | SkolAce`,
        description: `Silabus bab dan topik mata pelajaran ${subj.name} SMA di SkolAce.`,
        canonical: `${SITE_URL}${url}`,
        ogType: 'website',
        noindex: true,
      })
    );
  });

  // -----------------------------------------------------------
  // 6. 4 LEGAL & TRUST PAGES (/about, /privacy-policy, /terms, /contact)
  // -----------------------------------------------------------
  const legalPages = [
    {
      url: '/about',
      title: 'Tentang Kami | SkolAce UTBK-SNBT',
      description:
        'Tentang platform edukasi SkolAce: Belajar dan drilling UTBK-SNBT 7 subtes bebas biaya Rp0 tanpa batas untuk seluruh siswa Indonesia.',
    },
    {
      url: '/privacy-policy',
      title: 'Kebijakan Privasi | SkolAce UTBK-SNBT',
      description:
        'Kebijakan privasi SkolAce: Penggunaan cookies, iklan pihak ketiga Google AdSense, dan komitmen keamanan data belajar lokal.',
    },
    {
      url: '/terms',
      title: 'Syarat dan Ketentuan | SkolAce UTBK-SNBT',
      description:
        'Syarat dan ketentuan penggunaan platform edukasi independen persiapan UTBK-SNBT SkolAce.',
    },
    {
      url: '/contact',
      title: 'Kontak & Pusat Bantuan | SkolAce UTBK-SNBT',
      description:
        'Hubungi tim SkolAce untuk pertanyaan, bantuan teknis, dan pelaporan errata/koreksi soal latihan UTBK-SNBT.',
    },
  ];

  await Promise.all(
    legalPages.map(async (lp) => {
      const lpRender = await render(lp.url);
      const lpSeo = {
        title: lp.title,
        description: lp.description,
        canonical: `${SITE_URL}${lp.url}`,
        ogType: 'website',
      };
      await writeStaticPage(lp.url, injectSeoIntoHtml(templateHtml, lpRender.html, lpSeo));
    })
  );

  // -----------------------------------------------------------
  // 7. 404 & 200 (SPA CATCH-ALL) FALLBACK FOR CLIENT ROUTING
  // -----------------------------------------------------------
  const homeHtml = await fs.promises.readFile(path.join(DIST_DIR, 'index.html'), 'utf8');
  const spaFallbackHtml = homeHtml.replace(
    /<meta name="robots" content="index, follow" \/>/i,
    '<meta name="robots" content="noindex, follow" />'
  );
  await fs.promises.writeFile(path.join(DIST_DIR, '404.html'), spaFallbackHtml, 'utf8');
  await fs.promises.writeFile(path.join(DIST_DIR, '200.html'), spaFallbackHtml, 'utf8');
  await fs.promises.writeFile(path.join(ROOT_DIR, '404.html'), spaFallbackHtml, 'utf8');

  // -----------------------------------------------------------
  // 8. CLEAN UP dist/server FOLDER
  // -----------------------------------------------------------
  const serverDir = path.join(DIST_DIR, 'server');
  if (fs.existsSync(serverDir)) {
    await fs.promises.rm(serverDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary dist/server directory.');
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(
    `✅ Native SSG Pre-rendering completed in ${elapsed}s! Total ${totalRendered} static HTML pages generated.`
  );
}

prerender().catch((err) => {
  console.error('❌ Error during pre-rendering:', err);
  process.exit(1);
});
