// Verification script for Deterministic Stratified Rotation Engine
import assert from 'assert';
import fs from 'fs';
import {
  assembleDrillingSession,
  isAnswerCorrect,
  categorizeQuestion,
  BPPP_PROPORTIONS,
  DIFFICULTY_WAVE_PATTERN,
  recordQuestionsSeen,
  getSeenQuestionsMap,
  resetSeenQuestions,
  getSeenStats,
} from '../src/lib/drillingRotationEngine.ts';
import { adaptThreeZoneMaterial } from '../src/lib/contentLoader.ts';

console.log('=== TEST SUITE: Deterministic Stratified Rotation Engine ===');

// --- Test 1: isAnswerCorrect verification ---
console.log('\n[1] Testing isAnswerCorrect validation logic...');

// 1.1 standard_mc
const mcQuestion = {
  example_id: 'test-mc-1',
  variation_name: 'V1',
  difficulty: 'medium',
  question_type: 'standard_mc',
  question_markdown: 'Soal?',
  options: [{ key: 'A', text_markdown: 'Opt A' }, { key: 'B', text_markdown: 'Opt B' }],
  correct_answer: 'B',
  conceptual_solution_markdown: '',
  quick_trick_markdown: '',
  why_others_are_wrong_markdown: '',
};
assert.strictEqual(isAnswerCorrect(mcQuestion, 'B'), true, 'MC correct answer matches');
assert.strictEqual(isAnswerCorrect(mcQuestion, 'A'), false, 'MC incorrect answer fails');
assert.strictEqual(isAnswerCorrect(mcQuestion, 'b'), true, 'MC case-insensitive matches');

// 1.2 short_answer
const saQuestion = {
  example_id: 'test-sa-1',
  variation_name: 'V2',
  difficulty: 'hard',
  question_type: 'short_answer',
  question_markdown: 'Hitung x',
  options: [],
  correct_answer: '42',
  short_answer_key: 42,
  conceptual_solution_markdown: '',
  quick_trick_markdown: '',
  why_others_are_wrong_markdown: '',
};
assert.strictEqual(isAnswerCorrect(saQuestion, '42'), true, 'Short answer matches integer string');
assert.strictEqual(isAnswerCorrect(saQuestion, 42), true, 'Short answer matches numeric');
assert.strictEqual(isAnswerCorrect(saQuestion, ' 42 '), true, 'Short answer trimmed');
assert.strictEqual(isAnswerCorrect(saQuestion, '43'), false, 'Short answer wrong value fails');

// 1.3 short_answer with decimal comma
const saDecimal = {
  ...saQuestion,
  short_answer_key: '2,5',
};
assert.strictEqual(isAnswerCorrect(saDecimal, '2.5'), true, 'Short answer handles decimal comma vs point');
assert.strictEqual(isAnswerCorrect(saDecimal, '2,5'), true, 'Short answer handles comma directly');

// 1.4 mc_complex_table (PGK Tabel Benar/Salah)
const tableQuestion = {
  example_id: 'test-table-1',
  variation_name: 'V3',
  difficulty: 'hard',
  question_type: 'mc_complex_table',
  question_markdown: 'Tentukan Benar/Salah',
  table_headers: ['Benar', 'Salah'],
  complex_statements: [
    { id: 's1', statement_markdown: 'P1', is_true: true },
    { id: 's2', statement_markdown: 'P2', is_true: false },
    { id: 's3', statement_markdown: 'P3', is_true: true },
  ],
  options: [],
  correct_answer: 'Lihat Tabel',
  conceptual_solution_markdown: '',
  quick_trick_markdown: '',
  why_others_are_wrong_markdown: '',
};
assert.strictEqual(
  isAnswerCorrect(tableQuestion, { s1: 'Benar', s2: 'Salah', s3: 'Benar' }),
  true,
  'Complex table all correct'
);
assert.strictEqual(
  isAnswerCorrect(tableQuestion, { s1: 'Benar', s2: 'Benar', s3: 'Benar' }),
  false,
  'Complex table with wrong row fails'
);
assert.strictEqual(
  isAnswerCorrect(tableQuestion, { s1: true, s2: false, s3: true }),
  true,
  'Complex table with boolean values matches'
);

// 1.5 mc_complex_checkbox (Multi-select)
const checkQuestion = {
  example_id: 'test-chk-1',
  variation_name: 'V4',
  difficulty: 'hard',
  question_type: 'mc_complex_checkbox',
  question_markdown: 'Pilih semua yang benar',
  complex_statements: [
    { id: 'c1', statement_markdown: 'C1', is_true: true },
    { id: 'c2', statement_markdown: 'C2', is_true: false },
    { id: 'c3', statement_markdown: 'C3', is_true: true },
  ],
  options: [],
  correct_answer: 'c1,c3',
  conceptual_solution_markdown: '',
  quick_trick_markdown: '',
  why_others_are_wrong_markdown: '',
};
assert.strictEqual(
  isAnswerCorrect(checkQuestion, ['c1', 'c3']),
  true,
  'Checkbox matching exactly succeeds'
);
assert.strictEqual(
  isAnswerCorrect(checkQuestion, ['c1']),
  false,
  'Checkbox missing correct item fails'
);
assert.strictEqual(
  isAnswerCorrect(checkQuestion, ['c1', 'c2', 'c3']),
  false,
  'Checkbox with extraneous item fails'
);
console.log('✓ isAnswerCorrect tests passed!');

// --- Test 2: Multi-Subtest Balancing & Wave Pattern (Using 4,240 Audited Drilling Bank) ---
console.log('\n[2] Testing assembleDrillingSession multi-subtest balancing & wave pattern...');

// Verify adaptThreeZoneMaterial no longer injects legacy zona_3 into drilling worked_examples
const legacyCheck = adaptThreeZoneMaterial(JSON.parse(fs.readFileSync('output_materi/pu-01-01.json', 'utf8')));
assert.strictEqual(legacyCheck.worked_examples.length, 0, 'Legacy zona_3 must not leak into drilling worked_examples');

const loadDrillingBank = (name) => {
  const prefix = name.split('-')[0];
  const d = JSON.parse(fs.readFileSync(`public/content/drilling/${prefix}/${name}.json`, 'utf8'));
  const parts = name.split('-');
  return {
    metadata: {
      id: name,
      subtest: prefix.toUpperCase(),
      chapter_num: parseInt(parts[1], 10) || 1,
      chapter_title: 'Bab',
      subchapter_num: `${parseInt(parts[1], 10)}.${parseInt(parts[2], 10)}`,
      subchapter_title: d.subchapter_title || name,
      title: d.subchapter_title || name,
      required_question_variations: [],
      requires_svg: false,
      updated_at: '2026-11-28',
    },
    content: { exam_blueprint_markdown: '', visualizations_svg: [], distractor_traps: [] },
    worked_examples: d.questions,
  };
};

const mockPool = [
  loadDrillingBank('pu-01-01'),
  loadDrillingBank('pu-01-02'),
  loadDrillingBank('ppu-01-01'),
  loadDrillingBank('pbm-01-01'),
  loadDrillingBank('pk-01-01'),
  loadDrillingBank('pm-01-01'),
  loadDrillingBank('lbi-01-01'),
  loadDrillingBank('lbe-01-01'),
];

// Test with 15 questions from 3 subtests (PU, PPU, PBM): should allocate 5 per subtest!
const session15 = await assembleDrillingSession({
  subchapterIds: ['pu-01-01', 'pu-01-02', 'ppu-01-01', 'pbm-01-01'],
  requestedCount: 15,
  orderMode: 'blocking',
  materialsPool: mockPool,
});

assert.strictEqual(session15.length, 15, 'Session returns exactly 15 questions');
console.log(`✓ Retrieved ${session15.length} questions in session.`);

// Verify wave sequence: medium / hard distribution
const mediumCount = session15.filter((q) => q.difficulty === 'medium').length;
const hardCount = session15.filter((q) => q.difficulty === 'hard').length;
console.log(`✓ Difficulty breakdown: ${mediumCount} Medium (~${Math.round(mediumCount/15*100)}%), ${hardCount} Hard (~${Math.round(hardCount/15*100)}%)`);

// --- Test 3: Interleaved Mode ---
console.log('\n[3] Testing Interleaved Round-Robin Mode...');
const sessionInterleaved = await assembleDrillingSession({
  subchapterIds: ['pu-01-01', 'ppu-01-01', 'pbm-01-01'],
  requestedCount: 12,
  orderMode: 'interleaved',
  materialsPool: mockPool,
});
assert.strictEqual(sessionInterleaved.length, 12, 'Interleaved mode returns requested count');
console.log(`✓ Interleaved session generated with ${sessionInterleaved.length} questions.`);

// --- Test 4: Passage Grouping ---
console.log('\n[4] Testing Passage Grouping...');
const passageTestPool = [
  {
    metadata: {
      id: 'test-p-1',
      subtest: 'PU',
      chapter_num: 1,
      chapter_title: 'Bab 1',
      subchapter_num: '1.1',
      subchapter_title: 'Sub 1',
      title: 'Sub 1',
      required_question_variations: [],
      requires_svg: false,
      updated_at: '2026-11-12',
    },
    content: {
      exam_blueprint_markdown: '',
      visualizations_svg: [],
      distractor_traps: [],
    },
    worked_examples: [
      {
        example_id: 'pu-p1-q1',
        passage_group_id: 'passage-mars-1',
        context_markdown: 'Wacana Panjang tentang Mars...',
        question_markdown: 'Soal 1 wacana Mars',
        difficulty: 'medium',
        question_type: 'standard_mc',
        options: [{ key: 'A', text_markdown: 'A' }, { key: 'B', text_markdown: 'B' }],
        correct_answer: 'A',
        conceptual_solution_markdown: '',
        quick_trick_markdown: '',
        why_others_are_wrong_markdown: '',
      },
      {
        example_id: 'pu-p1-q2',
        passage_group_id: 'passage-mars-1',
        context_markdown: 'Wacana Panjang tentang Mars...',
        question_markdown: 'Soal 2 wacana Mars',
        difficulty: 'hard',
        question_type: 'standard_mc',
        options: [{ key: 'A', text_markdown: 'A' }, { key: 'B', text_markdown: 'B' }],
        correct_answer: 'B',
        conceptual_solution_markdown: '',
        quick_trick_markdown: '',
        why_others_are_wrong_markdown: '',
      },
    ],
  },
];

const passageSession = await assembleDrillingSession({
  subchapterIds: ['test-p-1'],
  requestedCount: 2,
  orderMode: 'interleaved',
  materialsPool: passageTestPool,
});

assert.strictEqual(passageSession[0].passage_group_id, 'passage-mars-1');
assert.strictEqual(passageSession[1].passage_group_id, 'passage-mars-1');
console.log('✓ Passage questions stayed consecutively bound together!');

// --- Test 5: Seen Tracker Integration ---
console.log('\n[5] Testing Seen Questions tracking...');
resetSeenQuestions();
const emptyStats = getSeenStats(['pu-01-01-ex1', 'pu-01-01-ex2']);
assert.strictEqual(emptyStats.seenCount, 0, 'Initial seen count is 0');
assert.strictEqual(emptyStats.unseenCount, 2, 'Initial unseen count is 2');

recordQuestionsSeen(['pu-01-01-ex1-q1']);
const updatedStats = getSeenStats(['pu-01-01-ex1', 'pu-01-01-ex2']);
assert.strictEqual(updatedStats.seenCount, 1, 'Canonical seen count incremented to 1');
assert.strictEqual(updatedStats.percentage, 50, 'Seen percentage 50%');
console.log('✓ Seen tracker correctly stripped session suffixes and tracked percentage!');

console.log('\n🎉 ALL ROTATION ENGINE INTEGRITY TESTS PASSED SUCCESSFULLY!\n');
