import fs from 'fs';
import path from 'path';

const trackerPath = path.resolve('data/curriculum_tracker.json');
const rawData = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));

const subtestOrder = ['PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBE', 'PM'];

// Map to hold consolidated topics preserving order
const consolidatedMap = new Map();

for (const item of rawData.items) {
  const subtestCode = item.subtest;
  const subchapterNum = item.subchapter_num;
  const key = `${subtestCode.toLowerCase()}-${subchapterNum}`;

  if (!consolidatedMap.has(key)) {
    consolidatedMap.set(key, {
      id: key,
      subtest: subtestCode,
      chapter_num: item.chapter_num,
      chapter_title: item.chapter_title,
      subchapter_num: subchapterNum,
      subchapter_title: item.subchapter_title,
      title: item.subchapter_title,
      required_question_variations: [],
      requires_svg: false,
      material_status: 'pending',
      output_path: `/content/utbk/${subtestCode.toLowerCase()}/${key}.json`
    });
  }

  const consolidated = consolidatedMap.get(key);
  if (item.requires_svg) {
    consolidated.requires_svg = true;
  }

  // Append micro points into required_question_variations
  if (Array.isArray(item.micro_syllabus_scope)) {
    for (const point of item.micro_syllabus_scope) {
      if (!consolidated.required_question_variations.includes(point)) {
        consolidated.required_question_variations.push(point);
      }
    }
  }
}

const consolidatedItems = Array.from(consolidatedMap.values());

fs.writeFileSync(trackerPath, JSON.stringify({ items: consolidatedItems }, null, 2), 'utf8');

console.log(`Successfully consolidated tracker into ${consolidatedItems.length} topics.`);
const counts = {};
consolidatedItems.forEach(i => counts[i.subtest] = (counts[i.subtest]||0) + 1);
console.log('Subtest breakdown:', counts);
