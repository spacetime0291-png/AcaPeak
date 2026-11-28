import type { WorkedExample } from '../types/material';

export const DRILLING_HISTORY_STORAGE_KEY = 'skolace_drilling_history_v1';
export const DRILLING_HISTORY_CHANGED_EVENT = 'skolace_drilling_history_changed';
const MAX_HISTORY_SESSIONS = 40;

export interface DrillingSessionItem {
  question: WorkedExample;
  userAnswer: unknown;
  isCorrect: boolean;
  originalIndex: number;
}

export interface DrillingSessionRecord {
  id: string;
  createdAt: string;
  primarySubtest: string;
  subtests: string[];
  totalConfigured: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  durationSeconds: number;
  timerMinutes: number | null;
  items: DrillingSessionItem[];
}

function isBrowserStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function dispatchHistoryChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DRILLING_HISTORY_CHANGED_EVENT));
  }
}

export function getDrillingHistory(): DrillingSessionRecord[] {
  if (!isBrowserStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(DRILLING_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s): s is DrillingSessionRecord =>
        Boolean(s) &&
        typeof s === 'object' &&
        typeof s.id === 'string' &&
        Array.isArray(s.items) &&
        s.items.length > 0
    );
  } catch (err) {
    console.warn('Failed to parse drilling session history:', err);
    return [];
  }
}

export function saveDrillingSession(session: DrillingSessionRecord): boolean {
  if (!isBrowserStorageAvailable() || session.items.length === 0) return false;

  const existing = getDrillingHistory().filter((s) => s.id !== session.id);
  let nextList = [session, ...existing].slice(0, MAX_HISTORY_SESSIONS);

  while (nextList.length > 0) {
    try {
      window.localStorage.setItem(DRILLING_HISTORY_STORAGE_KEY, JSON.stringify(nextList));
      dispatchHistoryChanged();
      return true;
    } catch {
      // Trim oldest sessions if storage quota is exceeded
      if (nextList.length === 1) break;
      nextList = nextList.slice(0, nextList.length - 1);
    }
  }
  return false;
}

export function deleteDrillingSession(sessionId: string): void {
  if (!isBrowserStorageAvailable()) return;
  try {
    const next = getDrillingHistory().filter((s) => s.id !== sessionId);
    window.localStorage.setItem(DRILLING_HISTORY_STORAGE_KEY, JSON.stringify(next));
    dispatchHistoryChanged();
  } catch (err) {
    console.warn('Failed to delete drilling session:', err);
  }
}

export function clearDrillingHistory(subtestCode?: string): void {
  if (!isBrowserStorageAvailable()) return;
  try {
    if (!subtestCode) {
      window.localStorage.removeItem(DRILLING_HISTORY_STORAGE_KEY);
    } else {
      const upper = subtestCode.toUpperCase();
      const remaining = getDrillingHistory().filter(
        (s) => s.primarySubtest.toUpperCase() !== upper && !s.subtests.includes(upper)
      );
      window.localStorage.setItem(DRILLING_HISTORY_STORAGE_KEY, JSON.stringify(remaining));
    }
    dispatchHistoryChanged();
  } catch (err) {
    console.warn('Failed to clear drilling history:', err);
  }
}

export function formatSessionTimestamp(iso: string): string {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function formatSessionDuration(totalSecs: number): string {
  const safe = Math.max(0, Math.floor(totalSecs));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
