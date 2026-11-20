import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://example.my.id').replace(/\/+$/, '');
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

  // 1. Home Page
  urls.push({
    loc: `${SITE_URL}/`,
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0',
  });

  // 2. 7 Subtest Pages
  for (const sub of syllabus) {
    urls.push({
      loc: `${SITE_URL}/subtest/${sub.code.toLowerCase()}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  // 3. 106 Material Pages
  for (const sub of syllabus) {
    if (sub.modules) {
      for (const mod of sub.modules) {
        for (const topic of mod.subtopics) {
          urls.push({
            loc: `${SITE_URL}/materi/${topic.id.toLowerCase()}`,
            lastmod: TODAY,
            changefreq: 'weekly',
            priority: '0.9',
          });
        }
      }
    } else if (sub.chapters) {
      for (const ch of sub.chapters) {
        for (const topic of ch.subchapters) {
          urls.push({
            loc: `${SITE_URL}/materi/${topic.id.toLowerCase()}`,
            lastmod: TODAY,
            changefreq: 'weekly',
            priority: '0.9',
          });
        }
      }
    }
  }

  // 4. 4 Legal Pages
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

  // Generate robots.txt string
  const robotsTxt = [
    '# Robots.txt for SkolAce UTBK-SNBT',
    'User-agent: *',
    'Disallow: /drilling/',
    'Allow: /',
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

  console.log(`✅ Sitemap created with ${urls.length} URLs (Home + 7 Subtests + 106 Materials + 4 Legalities).`);
  console.log(`✅ Robots.txt created with Disallow: /drilling/ rule.`);
}

generateSeoFiles();
