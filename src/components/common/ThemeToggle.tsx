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
      className={`relative inline-flex items-center justify-center ${btnPadding} rounded-2xl transition-all duration-300 cursor-pointer select-none active:scale-95 hover:scale-105 ${
        isDark
          ? 'bg-slate-900/80 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:shadow-[0_0_18px_rgba(245,158,11,0.5)]'
          : 'bg-violet-100/90 border border-violet-200/90 text-violet-700 shadow-sm hover:bg-violet-200/80 hover:shadow-violet-200'
      } ${className}`}
      title={isDark ? 'Beralih ke Mode Terang (Alam & Edu Ceria)' : 'Beralih ke Mode Gelap (Kosmik & Cyber)'}
      aria-label="Ganti Tema Tampilan"
    >
      {isDark ? (
        <div className="relative flex items-center justify-center">
          {/* Subtle golden halo glow behind the sun */}
          <span className="absolute w-6 h-6 rounded-full bg-amber-400/25 blur-xs animate-pulse pointer-events-none" />
          <Sun className={`${iconSize} text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] transition-transform duration-300 hover:rotate-45`} />
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          {/* Cute soft lilac cloud accent */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-200/80 pointer-events-none" />
          <Moon className={`${iconSize} text-violet-700 drop-shadow-2xs transition-transform duration-300 hover:-rotate-12`} />
        </div>
      )}
    </button>
  );
};
