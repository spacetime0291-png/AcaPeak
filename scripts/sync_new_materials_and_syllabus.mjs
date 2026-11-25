import fs from 'fs';
import path from 'path';

// 1. Parse syllabus from silabus_revisi_utbk.md
export function parseSyllabus() {
  const content = fs.readFileSync('silabus_revisi_utbk.md', 'utf8');
  const lines = content.split('\n');
  const subtests = [];
  let currentSubtest = null;
  let currentBab = null;
  let currentSubbab = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('### Subtes')) {
      const m = line.match(/### Subtes (\d+):\s+([^(]+)\(([^)]+)\)/);
      if (m) {
        const num = parseInt(m[1], 10);
        const name = m[2].trim();
        const code = m[3].trim().toUpperCase();
        const id = code.toLowerCase();
        
        let desc = '';
        if (code === 'PU') desc = 'Penalaran induktif, deduktif, dan kuantitatif.';
        else if (code === 'PPU') desc = 'Makna kata, morfologi, frasa, sintaksis kalimat, wacana, dan bahasa buatan.';
        else if (code === 'PBM') desc = 'Ejaan, mekanika bahasa, tata kata, tata kalimat, dan kepaduan wacana.';
        else if (code === 'PK') desc = 'Aritmetika, aljabar, geometri, trigonometri, kombinatorika, peluang, dan data.';
        else if (code === 'LBI') desc = 'Pemaknaan teks informatif & argumentatif, analisis lintas teks, sastra, dan teks tematik.';
        else if (code === 'LBE') desc = 'Main idea, specific information, inference, tone, purpose, and comparative texts.';
        else if (code === 'PM') desc = 'Aritmetika sosial & keuangan, aljabar & fungsi, geometri, serta data & peluang.';

        currentSubtest = {
          id,
          code,
          title: name,
          name,
          category: num <= 4 ? 'TPS' : 'Literasi',
          description: desc,
          modules: [],
          chapters: []
        };
        subtests.push(currentSubtest);
        currentBab = null;
      }
    } else if (line.startsWith('#### Bab')) {
      const m = line.match(/#### Bab (\d+):\s+(.+)/);
      if (m && currentSubtest) {
        const babNum = parseInt(m[1], 10);
        const babTitle = m[2].trim();
        currentBab = {
          id: `${currentSubtest.id}-mod-${babNum}`,
          chapter_num: babNum,
          title: babTitle,
          priority: 'High-Yield',
          estimatedMinutes: 45,
          subtopics: [],
          subchapters: []
        };
        currentSubtest.modules.push(currentBab);
        currentSubtest.chapters.push({
          chapter_num: babNum,
          chapter_title: babTitle,
          subchapters: currentBab.subchapters
        });
      }
    } else if (line.trim().startsWith('- **Sub-bab')) {
      const m = line.match(/- \*\*Sub-bab\s+([^:]+):\s+([^*]+)\*\*\s+\(`([^`]+)`\)\s*(?:—\s*_([^_]+)_)?(?:\s*\*\*\[([^\]]+)\]\*\*)?/);
      if (m && currentBab) {
        const subNum = m[1].trim();
        const title = m[2].trim();
        const code = m[3].trim();
        const variationsStr = m[4] ? m[4].trim() : '';
        const classification = m[5] ? m[5].trim() : 'INTI';

        currentSubbab = {
          id: code,
          subchapter_num: subNum,
          title,
          variations_str: variationsStr,
          classification,
          priority: classification === 'INTI' ? 'High-Yield' : 'Core',
          variations: [],
          isCompleted: false
        };
        currentBab.subtopics.push(currentSubbab);
        currentBab.subchapters.push({
          id: code,
          subchapter_num: subNum,
          title,
          classification,
          variations_count: 0,
          isCompleted: false
        });
      }
    } else if (line.match(/^\s+(\d+)\.\s+(.+)/)) {
      const m = line.match(/^\s+(\d+)\.\s+(.+)/);
      if (m && currentSubbab) {
        const vNum = parseInt(m[1], 10);
        const rest = m[2].trim();
        const catMatch = rest.match(/(?:—\s*`\[([^\]]+)\]`)?$/);
        const vTitle = rest.replace(/(?:—\s*`\[([^\]]+)`\s*)?$/, '').trim();
        const vCat = catMatch && catMatch[1] ? catMatch[1] : 'Inti';
        currentSubbab.variations.push({
          num: vNum,
          title: vTitle,
          category: vCat
        });
      }
    }
  }

  // Update variations_count in subchapters
  subtests.forEach(st => {
    st.modules.forEach(m => {
      m.subtopics.forEach(sub => {
        const matchingSub = m.subchapters.find(sc => sc.id === sub.id);
        if (matchingSub) {
          matchingSub.variations_count = sub.variations.length;
        }
      });
    });
  });

  return subtests;
}

// 2. Synchronize materials into public/content/utbk/<subtest> and content/utbk/<subtest>
export function syncMaterials() {
  const subtestDirs = ['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'];
  ['content/utbk', 'public/content/utbk'].forEach(baseDir => {
    subtestDirs.forEach(sub => {
      const dir = path.resolve(baseDir, sub);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  });

  const sourceFiles = fs.readdirSync('output_materi').filter(f => f.endsWith('.json'));
  console.log(`Found ${sourceFiles.length} files in output_materi/`);

  let count = 0;
  for (const file of sourceFiles) {
    const filePath = path.join('output_materi', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Determine subtest code from prefix: e.g. pu-01-01 -> pu
    const prefix = file.split('-')[0].toLowerCase();
    if (!subtestDirs.includes(prefix)) {
      console.warn(`Unknown prefix for file ${file}: ${prefix}`);
      continue;
    }

    ['content/utbk', 'public/content/utbk'].forEach(baseDir => {
      const destPath = path.join(baseDir, prefix, file);
      fs.writeFileSync(destPath, content, 'utf8');
    });
    count++;
  }
  console.log(`Successfully synced ${count} material files to content/utbk/ and public/content/utbk/`);
}

// 3. Write syllabus files
export function writeSyllabusFiles(syllabus) {
  // src/data/syllabus.json
  fs.writeFileSync('src/data/syllabus.json', JSON.stringify(syllabus, null, 2), 'utf8');
  console.log('Written src/data/syllabus.json');

  // src/data/syllabus.ts
  const tsContent = `// Auto-generated syllabus data from silabus_revisi_utbk.md
import type { SubtestItem } from '../types/material';
import syllabusJson from './syllabus.json';

export const SYLLABUS_DATA: SubtestItem[] = syllabusJson as SubtestItem[];
export default SYLLABUS_DATA;
`;
  fs.writeFileSync('src/data/syllabus.ts', tsContent, 'utf8');
  console.log('Written src/data/syllabus.ts');

  // src/data/syllabus-light.json (slim client syllabus without heavy variations/duplicate chapters)
  const slim = syllabus.map((sub) => ({
    id: sub.id,
    code: sub.code,
    title: sub.title,
    name: sub.name,
    category: sub.category,
    description: sub.description,
    modules: (sub.modules || []).map((m) => ({
      id: m.id,
      chapter_num: m.chapter_num,
      title: m.title,
      priority: m.priority,
      estimatedMinutes: m.estimatedMinutes,
      subtopics: (m.subtopics || []).map((t) => ({
        id: t.id,
        subchapter_num: t.subchapter_num,
        title: t.title,
        classification: t.classification,
        priority: t.priority,
      })),
    })),
  }));
  fs.writeFileSync('src/data/syllabus-light.json', JSON.stringify(slim), 'utf8');
  console.log('Written src/data/syllabus-light.json');

  // src/lib/syllabusData.ts
  const libContent = `// Consolidated 3-Tier Hierarchy (Subtest -> Module/Unit -> Atomic Subtopics)
// Acuan Silabus Revisi UTBK-SNBT (SNPMB)
import type { SubtestItem } from '../types/material';
import syllabusJson from '../data/syllabus-light.json';

export const UTBK_SYLLABUS: SubtestItem[] = syllabusJson as SubtestItem[];
export const SYLLABUS_DATA = UTBK_SYLLABUS;
export default UTBK_SYLLABUS;
`;
  fs.writeFileSync('src/lib/syllabusData.ts', libContent, 'utf8');
  console.log('Written src/lib/syllabusData.ts');
}

// Execute
const syllabus = parseSyllabus();
syncMaterials();
writeSyllabusFiles(syllabus);
console.log('All materials and syllabus files successfully synced!');
