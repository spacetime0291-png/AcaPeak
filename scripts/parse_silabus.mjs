import fs from 'fs';

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
        currentSubtest = {
          id,
          code,
          title: name,
          name,
          category: num <= 4 ? 'TPS' : 'Literasi',
          description: '',
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

if (process.argv[1] && process.argv[1].endsWith('parse_silabus.mjs')) {
  const result = parseSyllabus();
  console.log('Parsed Subtests Count:', result.length);
  let totalSubtopics = 0;
  result.forEach(s => {
    const subCount = s.modules.reduce((acc, m) => acc + m.subtopics.length, 0);
    totalSubtopics += subCount;
    console.log(`- [${s.code}] ${s.title}: ${s.modules.length} Bab, ${subCount} Sub-bab`);
  });
  console.log('Total Subtopics:', totalSubtopics);
}
