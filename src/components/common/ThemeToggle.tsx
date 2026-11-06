import React from 'react';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const btnPadding = size === 'sm' ? 'p-1.5' : 'p-2 sm:p-2.5';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex items-center justify-center ${btnPadding} rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700/90 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 select-none ${className}`}
      title={isDark ? 'Beralih ke Mode Terang (Cahaya)' : 'Beralih ke Mode Gelap (Malam)'}
      aria-label="Ganti Tema Tampilan"
    >
      {isDark ? (
        <Sun className={`${iconSize} text-amber-400 transition-transform duration-300 hover:rotate-45`} />
      ) : (
        <Moon className={`${iconSize} text-indigo-600 transition-transform duration-300 hover:-rotate-12`} />
      )}
    </button>
  );
};
