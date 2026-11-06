import fs from 'fs';
import path from 'path';

const tracker = JSON.parse(fs.readFileSync('data/curriculum_tracker.json', 'utf8'));

const subtestMeta = {
  PU: { name: 'Penalaran Umum', description: 'Penalaran induktif, deduktif, dan kuantitatif.' },
  PPU: { name: 'Pengetahuan & Pemahaman Umum', description: 'Makna kata, kepaduan paragraf, dan bahasa teks.' },
  PBM: { name: 'Pemahaman Bacaan & Menulis', description: 'Kaidah ejaan EYD V, kalimat efektif, dan kohesi wacana.' },
  PK: { name: 'Pengetahuan Kuantitatif', description: 'Matematika dasar, aljabar, geometri, dan statistika.' },
  LBI: { name: 'Literasi Bahasa Indonesia', description: 'Analisis wacana kritis, inferensi makna, dan evaluasi argumen.' },
  LBE: { name: 'Literasi Bahasa Inggris', description: 'Reading comprehension, text structure, and tone analysis.' },
  PM: { name: 'Penalaran Matematika', description: 'Pemodelan matematis kontekstual dalam skenario nyata.' },
};

const subtestOrder = ['PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBE', 'PM'];

const grouped = {};

for (const code of subtestOrder) {
  grouped[code] = {
    code,
    name: subtestMeta[code].name,
    description: subtestMeta[code].description,
    chaptersMap: new Map()
  };
}

for (const item of tracker.items) {
  const st = grouped[item.subtest];
  if (!st) continue;

  if (!st.chaptersMap.has(item.chapter_num)) {
    st.chaptersMap.set(item.chapter_num, {
      chapter_num: item.chapter_num,
      chapter_title: item.chapter_title,
      subchapters: []
    });
  }

  const ch = st.chaptersMap.get(item.chapter_num);
  ch.subchapters.push({
    id: item.id,
    subchapter_num: item.subchapter_num,
    title: item.title,
    isCompleted: item.material_status === 'done'
  });
}

const finalSyllabus = subtestOrder.map(code => {
  const st = grouped[code];
  return {
    code: st.code,
    name: st.name,
    description: st.description,
    chapters: Array.from(st.chaptersMap.values()).map(ch => ({
      chapter_num: ch.chapter_num,
      chapter_title: ch.chapter_title,
      subchapters: ch.subchapters
    }))
  };
});

const tsContent = `// Auto-generated from data/curriculum_tracker.json
import type { SyllabusSubtestItem } from '../types/material';

export const UTBK_SYLLABUS: SyllabusSubtestItem[] = ${JSON.stringify(finalSyllabus, null, 2)};
`;

fs.writeFileSync('src/lib/syllabusData.ts', tsContent, 'utf8');
console.log('src/lib/syllabusData.ts generated successfully with 7 subtests and 277 sub-materi!');
