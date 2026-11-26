export type ThemeId = 'light' | 'dark' | 'velvet' | 'prism';

export const THEME_STORAGE_KEY = 'kognitedu_theme';

export const VALID_THEMES: readonly ThemeId[] = ['light', 'dark', 'velvet', 'prism'] as const;

export function isValidTheme(value: unknown): value is ThemeId {
  return typeof value === 'string' && (VALID_THEMES as readonly string[]).includes(value);
}

export function isDarkTheme(theme: ThemeId): boolean {
  return theme === 'dark' || theme === 'velvet';
}

export interface ThemeOption {
  id: ThemeId;
  name: string;
  subtitle: string;
  isDark: boolean;
  swatches: [string, string, string];
}

export const THEME_OPTIONS: readonly ThemeOption[] = [
  {
    id: 'light',
    name: 'Cerah',
    subtitle: 'Alam & Edu Ceria',
    isDark: false,
    swatches: ['#fdfbf7', '#bbf7d0', '#4f46e5'],
  },
  {
    id: 'dark',
    name: 'Cosmic',
    subtitle: 'Luar Angkasa',
    isDark: true,
    swatches: ['#070913', '#0e1736', '#00f2fe'],
  },
  {
    id: 'velvet',
    name: 'Velvet',
    subtitle: 'Velvet Dusk',
    isDark: true,
    swatches: ['#160c18', '#2b1723', '#ff8a6b'],
  },
  {
    id: 'prism',
    name: 'Prism',
    subtitle: 'Aero Prism',
    isDark: false,
    swatches: ['#dff0fa', '#6ee7b7', '#2563eb'],
  },
] as const;

export function applyThemeToDocument(theme: ThemeId): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (isDarkTheme(theme)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
