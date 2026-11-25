// Consolidated 3-Tier Hierarchy (Subtest -> Module/Unit -> Atomic Subtopics)
// Acuan Silabus Revisi UTBK-SNBT (SNPMB)
import type { SubtestItem } from '../types/material';
import syllabusJson from '../data/syllabus-light.json';

export const UTBK_SYLLABUS: SubtestItem[] = syllabusJson as SubtestItem[];
export const SYLLABUS_DATA = UTBK_SYLLABUS;
export default UTBK_SYLLABUS;
