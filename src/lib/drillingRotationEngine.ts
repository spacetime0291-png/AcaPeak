import type {
  WorkedExample,
  Material,
} from '../types/material';
import { fetchMaterialById } from './contentLoader';

export const SEEN_STORAGE_KEY = 'utbk_seen_questions_v1';

// -------------------------------------------------------------
// LOCAL STORAGE SEEN QUESTIONS TRACKER
// -------------------------------------------------------------

export function getSeenQuestionsMap(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(SEEN_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, number>;
    }
  } catch (e) {
    console.warn('Failed to read seen questions from localStorage', e);
  }
  return {};
}

export function recordQuestionsSeen(exampleIds: string[]): void {
  if (typeof window === 'undefined' || !exampleIds || exampleIds.length === 0) return;
  try {
    const current = getSeenQuestionsMap();
    for (const rawId of exampleIds) {
      // Normalize ID by stripping session suffixes like -q1 or -repeat1
      const canonicalId = rawId.replace(/-(q|repeat)\d+$/i, '');
      current[canonicalId] = (current[canonicalId] || 0) + 1;
    }
    window.localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to record seen questions to localStorage', e);
  }
}

export function resetSeenQuestions(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SEEN_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to reset seen questions in localStorage', e);
  }
}

export function getSeenStats(questionIds: string[]): {
  seenCount: number;
  totalCount: number;
  unseenCount: number;
  percentage: number;
} {
  const seenMap = getSeenQuestionsMap();
  const totalCount = questionIds.length;
  if (totalCount === 0) {
    return { seenCount: 0, totalCount: 0, unseenCount: 0, percentage: 0 };
  }

  let seenCount = 0;
  for (const id of questionIds) {
    const canonicalId = id.replace(/-(q|repeat)\d+$/i, '');
    if ((seenMap[canonicalId] || 0) > 0) {
      seenCount++;
    }
  }

  const unseenCount = totalCount - seenCount;
  const percentage = Math.round((seenCount / totalCount) * 100);
  return { seenCount, totalCount, unseenCount, percentage };
}

// -------------------------------------------------------------
// TARGET BPPP PROPORTIONS PER SUBTEST
// -------------------------------------------------------------

export interface SubtestProportions {
  standardMc: number;
  pgk: number;
  shortAnswer: number;
}

export const BPPP_PROPORTIONS: Record<string, SubtestProportions> = {
  PU: { standardMc: 0.75, pgk: 0.25, shortAnswer: 0.0 },
  LBI: { standardMc: 0.75, pgk: 0.25, shortAnswer: 0.0 },
  PPU: { standardMc: 0.85, pgk: 0.15, shortAnswer: 0.0 },
  LBE: { standardMc: 0.85, pgk: 0.15, shortAnswer: 0.0 },
  PBM: { standardMc: 0.8, pgk: 0.15, shortAnswer: 0.05 },
  PK: { standardMc: 0.55, pgk: 0.25, shortAnswer: 0.2 },
  PM: { standardMc: 0.55, pgk: 0.25, shortAnswer: 0.2 },
};

// Wave rotation pattern cycle of 5 questions: [medium, medium, hard, medium, hard]
export const DIFFICULTY_WAVE_PATTERN: ('medium' | 'hard')[] = [
  'medium',
  'medium',
  'hard',
  'medium',
  'hard',
];

export type QuestionCategory = 'standard_mc' | 'pgk' | 'short_answer';

export function categorizeQuestion(q: WorkedExample): QuestionCategory {
  if (q.question_type === 'short_answer') {
    return 'short_answer';
  }
  if (
    q.question_type === 'mc_complex_table' ||
    q.question_type === 'mc_complex_checkbox' ||
    q.question_type === 'statements_1234' ||
    q.question_type === 'data_sufficiency' ||
    q.question_type === 'table_evaluation'
  ) {
    return 'pgk';
  }
  return 'standard_mc';
}

// -------------------------------------------------------------
// ANSWER VALIDATION HELPER (Used by ActiveDrillingView & Reader)
// -------------------------------------------------------------

export function isAnswerCorrect(question: WorkedExample, rawUserAnswer: any): boolean {
  if (rawUserAnswer === undefined || rawUserAnswer === null || rawUserAnswer === '') {
    return false;
  }

  // 1. Short Answer (isian singkat angka / kata baku)
  if (question.question_type === 'short_answer') {
    const key = question.short_answer_key !== undefined
      ? question.short_answer_key
      : question.correct_answer;
    if (key === undefined || key === null) return false;

    const normUser = String(rawUserAnswer).trim().toLowerCase().replace(/\s+/g, '');
    const normKey = String(key).trim().toLowerCase().replace(/\s+/g, '');

    // Direct string match
    if (normUser === normKey) return true;

    // Numerical equivalency check (e.g. 1.5 vs 1,5 or 12 vs 12.0)
    const numUser = parseFloat(normUser.replace(',', '.'));
    const numKey = parseFloat(normKey.replace(',', '.'));
    if (!Number.isNaN(numUser) && !Number.isNaN(numKey) && numUser === numKey) {
      return true;
    }
    return false;
  }

  // 2. PGK Complex Table (Tabel 2 Kolom Benar/Salah)
  if (question.question_type === 'mc_complex_table' && question.complex_statements && question.complex_statements.length > 0) {
    // User answer is a map: Record<statementId, 'Benar' | 'Salah' | boolean>
    if (typeof rawUserAnswer !== 'object') return false;
    const ansMap = rawUserAnswer as Record<string, any>;
    const defaultHeaders = question.table_headers || ['Benar', 'Salah'];
    const col0Label = defaultHeaders[0].toLowerCase();
    const col1Label = defaultHeaders[1].toLowerCase();

    for (const stmt of question.complex_statements) {
      const userChoice = ansMap[stmt.id];
      if (userChoice === undefined || userChoice === null) return false;

      let isUserTrue = false;
      if (typeof userChoice === 'boolean') {
        isUserTrue = userChoice;
      } else {
        const strChoice = String(userChoice).trim().toLowerCase();
        if (strChoice === 'true' || strChoice === 'col0' || strChoice === col0Label || strChoice === 'benar') {
          isUserTrue = true;
        } else if (strChoice === 'false' || strChoice === 'col1' || strChoice === col1Label || strChoice === 'salah') {
          isUserTrue = false;
        } else {
          return false;
        }
      }

      if (isUserTrue !== stmt.is_true) {
        return false;
      }
    }
    return true;
  }

  // 3. PGK Complex Checkbox (Multi-select)
  if (question.question_type === 'mc_complex_checkbox') {
    // Expected correct keys from complex_statements or options
    let correctKeys: string[] = [];
    if (question.complex_statements && question.complex_statements.length > 0) {
      correctKeys = question.complex_statements
        .filter((s) => s.is_true)
        .map((s) => s.id);
    } else if (question.options && question.options.length > 0) {
      const keyStr = String(question.correct_answer || '');
      correctKeys = keyStr.split(/[,;\s]+/).map((k) => k.trim()).filter(Boolean);
    }

    let userKeys: string[] = [];
    if (Array.isArray(rawUserAnswer)) {
      userKeys = rawUserAnswer.map((k) => String(k).trim()).filter(Boolean);
    } else if (typeof rawUserAnswer === 'string') {
      userKeys = rawUserAnswer.split(/[,;\s]+/).map((k) => k.trim()).filter(Boolean);
    } else if (typeof rawUserAnswer === 'object') {
      userKeys = Object.entries(rawUserAnswer)
        .filter(([_, v]) => Boolean(v))
        .map(([k]) => k);
    }

    if (correctKeys.length === 0 || userKeys.length === 0) return false;
    if (correctKeys.length !== userKeys.length) return false;

    const correctSet = new Set(correctKeys);
    return userKeys.every((k) => correctSet.has(k));
  }

  // 4. Standard Multiple Choice (A-E), statements_1234, data_sufficiency
  return String(rawUserAnswer).trim().toUpperCase() === String(question.correct_answer || '').trim().toUpperCase();
}

// -------------------------------------------------------------
// DETERMINISTIC STRATIFIED ROTATION ENGINE
// -------------------------------------------------------------

export type OrderMode = 'blocking' | 'interleaved';

export interface AssembleDrillingOptions {
  subchapterIds: string[];
  requestedCount: number;
  orderMode?: OrderMode; // Default: 'blocking' (Simulasi Asli BPPP)
  materialsPool?: Material[]; // Optional injected materials for testing or 0ms lookup
}

interface EnrichedQuestion {
  question: WorkedExample;
  subtestCode: string;
  chapterNum: number;
  subchapterNum: string;
  subchapterId: string;
  seenCount: number;
  category: QuestionCategory;
  passageKey?: string;
}

export async function assembleDrillingSession(
  options: AssembleDrillingOptions
): Promise<WorkedExample[]> {
  const {
    subchapterIds,
    requestedCount,
    orderMode = 'blocking',
    materialsPool,
  } = options;

  if (!subchapterIds || subchapterIds.length === 0 || requestedCount <= 0) {
    return [];
  }

  const seenMap = getSeenQuestionsMap();

  // 1. Load materials for all selected subchapters
  const materials: Material[] = [];
  if (materialsPool && materialsPool.length > 0) {
    materials.push(...materialsPool);
  } else {
    for (const subId of subchapterIds) {
      try {
        const mat = await fetchMaterialById(subId);
        if (mat) materials.push(mat);
      } catch (err) {
        console.warn(`Could not load material ${subId} for rotation engine:`, err);
      }
    }
  }

  // 2. Extract and enrich all candidate questions
  const allCandidates: EnrichedQuestion[] = [];
  for (const mat of materials) {
    const meta = mat.metadata;
    const subtestCode = (meta.subtest || 'PU').toUpperCase();
    const chapterNum = meta.chapter_num || 1;
    const subchapterNum = meta.subchapter_num || '1.1';
    const subchapterId = meta.id;

    for (const q of mat.worked_examples || []) {
      const canonicalId = q.example_id.replace(/-(q|repeat)\d+$/i, '');
      const seenCount = seenMap[canonicalId] || 0;
      const category = categorizeQuestion(q);

      // Identify passage key for grouping
      let passageKey: string | undefined = undefined;
      if (q.passage_group_id) {
        passageKey = `${subtestCode}::group::${q.passage_group_id}`;
      } else if (q.context_markdown && q.context_markdown.trim().length > 30) {
        // Normalize context for identical passage text
        const snippet = q.context_markdown.trim().slice(0, 100).replace(/\s+/g, ' ');
        passageKey = `${subtestCode}::ctx::${snippet}`;
      }

      allCandidates.push({
        question: q,
        subtestCode,
        chapterNum,
        subchapterNum,
        subchapterId,
        seenCount,
        category,
        passageKey,
      });
    }
  }

  if (allCandidates.length === 0) {
    return [];
  }

  // 3. Strict Filtering on Difficulty: Reject 'easy' unless no 'medium'/'hard' exists
  let eligiblePool = allCandidates.filter(
    (c) => c.question.difficulty === 'medium' || c.question.difficulty === 'hard'
  );
  if (eligiblePool.length === 0) {
    // Graceful fallback to avoid empty test if bank only has unrated/easy
    eligiblePool = allCandidates;
  }

  // 4. Multi-Subtest Quota Balancing
  // Determine distinct subtests in the selected subchapters
  const subtestCodes = Array.from(new Set(eligiblePool.map((c) => c.subtestCode)));
  const k = subtestCodes.length;
  const baseQuota = Math.floor(requestedCount / k);
  const remainder = requestedCount % k;

  // Build quota map per subtest
  const subtestQuotas: Record<string, number> = {};
  subtestCodes.forEach((code, idx) => {
    subtestQuotas[code] = baseQuota + (idx < remainder ? 1 : 0);
  });

  // Group candidates by subtest
  const candidatesBySubtest: Record<string, EnrichedQuestion[]> = {};
  for (const c of eligiblePool) {
    if (!candidatesBySubtest[c.subtestCode]) {
      candidatesBySubtest[c.subtestCode] = [];
    }
    candidatesBySubtest[c.subtestCode].push(c);
  }

  // 5. Assemble questions per subtest
  const assembledBySubtest: Record<string, WorkedExample[]> = {};

  for (const code of subtestCodes) {
    const quota = subtestQuotas[code] || 0;
    if (quota <= 0) {
      assembledBySubtest[code] = [];
      continue;
    }

    const subtestPool = candidatesBySubtest[code] || [];
    assembledBySubtest[code] = assembleSubtestBlock(subtestPool, quota, code);
  }

  // 6. Order Mode Arrangement
  let finalQuestions: WorkedExample[] = [];

  if (orderMode === 'blocking' || subtestCodes.length === 1) {
    // Blocking per Subtest (Simulasi Asli BPPP)
    for (const code of subtestCodes) {
      finalQuestions.push(...(assembledBySubtest[code] || []));
    }
  } else {
    // Interleaved Round-Robin (Drill Campuran lintas subtes)
    const queues: Record<string, WorkedExample[]> = {};
    for (const code of subtestCodes) {
      queues[code] = [...(assembledBySubtest[code] || [])];
    }

    let hasMore = true;
    while (hasMore && finalQuestions.length < requestedCount) {
      hasMore = false;
      for (const code of subtestCodes) {
        const queue = queues[code];
        if (queue && queue.length > 0) {
          const first = queue.shift()!;
          finalQuestions.push(first);
          hasMore = true;

          // If this question had a passage companion right after it, take it together!
          if (queue.length > 0) {
            const nextQ = queue[0];
            const isCompanion =
              (first.passage_group_id && first.passage_group_id === nextQ.passage_group_id) ||
              (first.context_markdown && first.context_markdown === nextQ.context_markdown);
            if (isCompanion) {
              finalQuestions.push(queue.shift()!);
            }
          }
        }
      }
    }
  }

  // 7. Ensure requestedCount is met (cycle if unique bank pool is smaller than requested)
  if (finalQuestions.length < requestedCount && eligiblePool.length > 0) {
    let cycleIdx = 0;
    while (finalQuestions.length < requestedCount) {
      const baseItem = eligiblePool[cycleIdx % eligiblePool.length].question;
      finalQuestions.push({
        ...baseItem,
        example_id: `${baseItem.example_id}-repeat${finalQuestions.length + 1}`,
      });
      cycleIdx++;
    }
  }

  return finalQuestions.slice(0, requestedCount);
}

// -------------------------------------------------------------
// INTERNAL SUBTEST BLOCK ASSEMBLER
// -------------------------------------------------------------

function assembleSubtestBlock(
  candidates: EnrichedQuestion[],
  targetCount: number,
  subtestCode: string
): WorkedExample[] {
  if (candidates.length === 0 || targetCount <= 0) return [];

  // Identify distinct subchapters in this subtest
  const subchapterMap: Record<string, EnrichedQuestion[]> = {};
  for (const c of candidates) {
    if (!subchapterMap[c.subchapterId]) {
      subchapterMap[c.subchapterId] = [];
    }
    subchapterMap[c.subchapterId].push(c);
  }
  const subchapterIds = Object.keys(subchapterMap);

  // Target question type quotas for this subtest
  const props = BPPP_PROPORTIONS[subtestCode] || { standardMc: 0.75, pgk: 0.25, shortAnswer: 0.0 };
  const targetPgkCount = Math.round(targetCount * props.pgk);
  const targetShortCount = Math.round(targetCount * props.shortAnswer);
  const targetNonPgCount = targetPgkCount + targetShortCount;

  // Track used question IDs and variation names across this subtest
  const usedExampleIds = new Set<string>();
  const usedVariationsBySubchapter: Record<string, Set<string>> = {};
  for (const sId of subchapterIds) {
    usedVariationsBySubchapter[sId] = new Set();
  }

  // Helper to pick the best candidate from a subchapter
  function pickCandidateFromSubchapter(
    subId: string,
    desiredDifficulty: 'medium' | 'hard',
    desiredCategory?: QuestionCategory
  ): EnrichedQuestion | null {
    const list = subchapterMap[subId] || [];
    const available = list.filter((c) => !usedExampleIds.has(c.question.example_id));
    if (available.length === 0) return null;

    // Filter by desired category if specified, fallback to any available
    let categoryFiltered = desiredCategory
      ? available.filter((c) => c.category === desiredCategory)
      : available;
    if (categoryFiltered.length === 0) {
      categoryFiltered = available; // graceful fallback
    }

    // Filter by desired difficulty, fallback to opposite ('medium' <-> 'hard')
    let diffFiltered = categoryFiltered.filter((c) => c.question.difficulty === desiredDifficulty);
    if (diffFiltered.length === 0) {
      const fallbackDiff = desiredDifficulty === 'medium' ? 'hard' : 'medium';
      diffFiltered = categoryFiltered.filter((c) => c.question.difficulty === fallbackDiff);
      if (diffFiltered.length === 0) {
        diffFiltered = categoryFiltered;
      }
    }

    // Variation Anti-Collision: prefer questions whose variation_name has not been picked
    const usedVars = usedVariationsBySubchapter[subId];
    const unseenVariations = diffFiltered.filter((c) => !usedVars.has(c.question.variation_name));
    const poolToScore = unseenVariations.length > 0 ? unseenVariations : diffFiltered;

    // Prioritize lowest seen_count
    poolToScore.sort((a, b) => a.seenCount - b.seenCount);
    return poolToScore[0] || null;
  }

  // Plan the question types and difficulties along the wave
  const chosenQuestions: WorkedExample[] = [];
  let subIndexPointer = 0;

  // Interleave non-PG questions evenly across targetCount
  const nonPgSlots = new Set<number>();
  if (targetNonPgCount > 0) {
    const step = targetCount / targetNonPgCount;
    for (let i = 0; i < targetNonPgCount; i++) {
      const slotIndex = Math.min(targetCount - 1, Math.floor((i + 0.5) * step));
      nonPgSlots.add(slotIndex);
    }
  }

  // Distribute PGK vs Short Answer among the non-PG slots
  const nonPgSlotArray = Array.from(nonPgSlots).sort((a, b) => a - b);
  const targetCategoryBySlot: Record<number, QuestionCategory> = {};
  nonPgSlotArray.forEach((slot, idx) => {
    if (idx < targetShortCount) {
      targetCategoryBySlot[slot] = 'short_answer';
    } else {
      targetCategoryBySlot[slot] = 'pgk';
    }
  });

  // Track passage groups that were already picked to keep companion questions adjacent
  const passageCompanionsQueue: EnrichedQuestion[] = [];

  for (let slot = 0; slot < targetCount; slot++) {
    // 1. If we have a companion question from the same passage waiting, use it immediately!
    if (passageCompanionsQueue.length > 0) {
      const companion = passageCompanionsQueue.shift()!;
      usedExampleIds.add(companion.question.example_id);
      usedVariationsBySubchapter[companion.subchapterId]?.add(companion.question.variation_name);
      chosenQuestions.push(companion.question);
      continue;
    }

    // 2. Wave pattern difficulty
    const targetDifficulty = DIFFICULTY_WAVE_PATTERN[slot % DIFFICULTY_WAVE_PATTERN.length];
    const targetCategory = targetCategoryBySlot[slot] || 'standard_mc';

    // 3. Bucket rotation across subchapters
    let picked: EnrichedQuestion | null = null;
    const initialPointer = subIndexPointer;

    for (let step = 0; step < subchapterIds.length; step++) {
      const currentSubId = subchapterIds[(initialPointer + step) % subchapterIds.length];
      picked = pickCandidateFromSubchapter(currentSubId, targetDifficulty, targetCategory);
      if (picked) {
        subIndexPointer = (initialPointer + step + 1) % subchapterIds.length;
        break;
      }
    }

    // Fallback if targetCategory wasn't found anywhere: try any category
    if (!picked) {
      for (let step = 0; step < subchapterIds.length; step++) {
        const currentSubId = subchapterIds[(initialPointer + step) % subchapterIds.length];
        picked = pickCandidateFromSubchapter(currentSubId, targetDifficulty);
        if (picked) {
          subIndexPointer = (initialPointer + step + 1) % subchapterIds.length;
          break;
        }
      }
    }

    if (picked) {
      usedExampleIds.add(picked.question.example_id);
      usedVariationsBySubchapter[picked.subchapterId]?.add(picked.question.variation_name);
      chosenQuestions.push(picked.question);

      // Check for Passage Grouping companions (up to 2 additional questions)
      if (picked.passageKey) {
        const pKey = picked.passageKey;
        const companions = candidates.filter(
          (c) =>
            c.passageKey === pKey &&
            !usedExampleIds.has(c.question.example_id) &&
            !passageCompanionsQueue.some((q) => q.question.example_id === c.question.example_id)
        );
        // Take at most 2 companions (so total questions per passage <= 3)
        for (const comp of companions.slice(0, 2)) {
          if (chosenQuestions.length + passageCompanionsQueue.length < targetCount) {
            passageCompanionsQueue.push(comp);
          }
        }
      }
    } else {
      // If we completely run out of unused candidates in this subtest, break to allow top-level cycling
      break;
    }
  }

  return chosenQuestions;
}
