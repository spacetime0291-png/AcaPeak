import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  isSubstantialMaterial,
  isSubstantialRangkuman,
  readMaterialJsonSync,
  readRangkumanJsonSync,
} from './lib/contentValidator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://acapeak.spacetime0291.workers.dev'
).replace(/\/+$/, '');
const TODAY = new Date().toISOString().split('T')[0];

function generateSeoFiles() {
  console.log('🗺️  Generating Sitemap.xml and Robots.txt...');
  console.log(`🌐 Base Site URL: ${SITE_URL}`);

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const syllabusPath = path.join(ROOT_DIR, 'src/data/syllabus.json');
  const syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf8'));

  const urls = [];
  let materialCount = 0;
  let skippedThinCount = 0;
  let rangkumanCount = 0;

  // 1. Home Page
  urls.push({
    loc: `${SITE_URL}/`,
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0',
  });

  // 2. 7 UTBK Subtest Pages (/utbk/:subtest)
  for (const sub of syllabus) {
    urls.push({
      loc: `${SITE_URL}/utbk/${sub.code.toLowerCase()}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  // 3. Substantial Material Pages (/utbk/:subtest/:materiId) - Anti-Thin Content Filter
  for (const sub of syllabus) {
    const subCode = sub.code.toLowerCase();
    const topics = sub.modules
      ? sub.modules.flatMap((mod) => mod.subtopics)
      : (sub.chapters || []).flatMap((ch) => ch.subchapters);

    for (const topic of topics) {
      const matId = topic.id.toLowerCase();
      const rawMaterial = readMaterialJsonSync(ROOT_DIR, subCode, matId);
      if (!isSubstantialMaterial(rawMaterial)) {
        skippedThinCount++;
        continue;
      }

      urls.push({
        loc: `${SITE_URL}/utbk/${subCode}/${matId}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.9',
      });
      materialCount++;
    }
  }

  // 4. Substantial Rangkuman & Cheat Sheet Pages
  const rangkumanIndexPaths = [
    path.join(ROOT_DIR, 'content/rangkuman/index.json'),
    path.join(ROOT_DIR, 'content/rangkuman/index_rangkuman.json'),
  ];
  const rangkumanIndexPath = rangkumanIndexPaths.find((p) => fs.existsSync(p));
  if (rangkumanIndexPath) {
    try {
      const rangkumanIndex = JSON.parse(fs.readFileSync(rangkumanIndexPath, 'utf8'));
      urls.push({
        loc: `${SITE_URL}/rangkuman`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.8',
      });
      const allBabs = rangkumanIndex.daftar_subtes.flatMap((st) => st.daftar_bab);
      for (const b of allBabs) {
        const babCode = b.kode_bab.toLowerCase();
        const rawBab = readRangkumanJsonSync(ROOT_DIR, babCode);
        if (!isSubstantialRangkuman(rawBab)) {
          continue;
        }
        urls.push({
          loc: `${SITE_URL}/rangkuman/${babCode}`,
          lastmod: TODAY,
          changefreq: 'weekly',
          priority: '0.85',
        });
        rangkumanCount++;
      }
    } catch {}
  }

  // 5. 4 Legal Pages
  const legalRoutes = ['/about', '/privacy-policy', '/terms', '/contact'];
  for (const route of legalRoutes) {
    urls.push({
      loc: `${SITE_URL}${route}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.5',
    });
  }

  // Generate sitemap XML string
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    ),
    '</urlset>',
  ].join('\n');

  // Generate robots.txt string allowing Googlebot & Mediapartners-Google
  const robotsTxt = [
    '# Robots.txt for SkolAce UTBK-SNBT',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /drilling',
    '',
    'User-agent: Mediapartners-Google',
    'Allow: /',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /drilling',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join('\n');

  // Write to dist/
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

  // Mirror to public/ as well for dev and git tracking
  if (fs.existsSync(PUBLIC_DIR)) {
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
  }

  console.log(
    `✅ Sitemap created with ${urls.length} URLs (Home + ${syllabus.length} Subtests + ${materialCount} Materials + ${rangkumanCount} Rangkuman + 4 Legalities; skipped ${skippedThinCount} thin).`
  );
  console.log('✅ Robots.txt created allowing Googlebot & Mediapartners-Google.');
}

generateSeoFiles();
