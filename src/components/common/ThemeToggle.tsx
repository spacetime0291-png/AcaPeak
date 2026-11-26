import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, Diamond, Check, ChevronDown } from 'lucide-react';
import { THEME_OPTIONS, type ThemeId } from '../../lib/theme';

export interface ThemeToggleProps {
  theme: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
  onToggle?: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onSelectTheme,
  onToggle,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';
  const btnPadding = size === 'sm' ? 'px-2 py-1.5 gap-1' : 'px-2.5 py-2 gap-1.5';

  const triggerStyle = (() => {
    switch (theme) {
      case 'dark':
        return 'bg-slate-900/85 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.28)] hover:shadow-[0_0_16px_rgba(245,158,11,0.45)]';
      case 'velvet':
        return 'bg-[#2B1723]/90 border border-[#F5B041]/45 text-[#F5B041] shadow-[0_2px_12px_rgba(255,138,107,0.2)] hover:border-[#FF8A6B]/70';
      case 'prism':
        return 'bg-white/75 backdrop-blur-md border border-white/85 text-sky-700 shadow-xs hover:bg-white/90 hover:border-sky-300/70';
      case 'light':
      default:
        return 'bg-violet-100/90 border border-violet-200/90 text-violet-700 shadow-xs hover:bg-violet-200/80';
    }
  })();

  const activeOption = THEME_OPTIONS.find((opt) => opt.id === theme) || THEME_OPTIONS[0];

  const renderTriggerIcon = () => {
    switch (theme) {
      case 'dark':
        return (
          <div className="relative flex items-center justify-center">
            <span className="absolute w-5 h-5 rounded-full bg-amber-400/20 blur-xs pointer-events-none" />
            <Sparkles className={`${iconSize} text-amber-300`} />
          </div>
        );
      case 'velvet':
        return <Moon className={`${iconSize} text-[#F5B041] fill-[#F5B041]/25`} />;
      case 'prism':
        return <Diamond className={`${iconSize} text-sky-600`} />;
      case 'light':
      default:
        return <Sun className={`${iconSize} text-amber-500`} />;
    }
  };

  const popoverPanelClass = (() => {
    switch (theme) {
      case 'velvet':
        return 'bg-[#23121E]/95 border-[#EB8A78]/35 text-[#FBF1F2] shadow-[0_14px_34px_rgba(10,4,8,0.65)]';
      case 'dark':
        return 'bg-[#0c1326]/95 border-cyan-500/30 text-slate-100 shadow-[0_14px_34px_rgba(0,0,0,0.65)]';
      case 'prism':
        return 'bg-white/90 border-white/90 text-slate-900 shadow-[0_14px_34px_rgba(15,23,42,0.14)]';
      case 'light':
      default:
        return 'bg-white border-stone-200 text-slate-900 shadow-xl';
    }
  })();

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative inline-flex items-center justify-center ${btnPadding} rounded-2xl transition-all duration-200 cursor-pointer select-none active:scale-95 ${triggerStyle}`}
        title={`Tema aktif: ${activeOption.name} (${activeOption.subtitle})`}
        aria-label="Pilih Tema Tampilan"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {renderTriggerIcon()}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-75 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Pilihan Tema SkolAce"
          className={`absolute right-0 top-full mt-2 w-52 sm:w-56 rounded-2xl border backdrop-blur-xl p-1.5 z-[80] animate-subtopic-slide ${popoverPanelClass}`}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider opacity-60">
            Pilih Tema (4)
          </div>
          <div className="space-y-1">
            {THEME_OPTIONS.map((option) => {
              const isSelected = option.id === theme;

              const itemClass = (() => {
                if (isSelected) {
                  if (theme === 'velvet') {
                    return 'bg-[#FF8A6B]/20 border-[#FF8A6B]/55 text-[#FBF1F2]';
                  }
                  if (theme === 'dark') {
                    return 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200';
                  }
                  if (theme === 'prism') {
                    return 'bg-sky-500/15 border-sky-400/60 text-sky-950';
                  }
                  return 'bg-indigo-50 border-indigo-200 text-indigo-950';
                }
                if (theme === 'velvet') {
                  return 'border-transparent hover:bg-[#3A1D2E]/80 text-[#EBD6DC]';
                }
                if (theme === 'dark') {
                  return 'border-transparent hover:bg-slate-800/80 text-slate-300';
                }
                if (theme === 'prism') {
                  return 'border-transparent hover:bg-sky-50/80 text-slate-700';
                }
                return 'border-transparent hover:bg-stone-100 text-slate-700';
              })();

              const checkClass = (() => {
                if (theme === 'velvet') return 'text-[#FF8A6B]';
                if (theme === 'dark') return 'text-cyan-400';
                if (theme === 'prism') return 'text-blue-600';
                return 'text-indigo-600';
              })();

              return (
                <button
                  key={option.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => {
                    if (onSelectTheme) {
                      onSelectTheme(option.id);
                    } else {
                      onToggle?.();
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl border text-left transition-colors cursor-pointer ${itemClass}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Representative 3-tone Swatch Circle */}
                    <span
                      className="w-6 h-6 rounded-full shrink-0 border border-black/15 dark:border-white/20 shadow-2xs flex items-center justify-center overflow-hidden relative"
                      style={{
                        background: `linear-gradient(135deg, ${option.swatches[0]} 0%, ${option.swatches[1]} 55%, ${option.swatches[2]} 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/40"
                        style={{ backgroundColor: option.swatches[2] }}
                      />
                    </span>

                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight truncate">
                        {option.name}
                      </div>
                      <div className="text-[10px] opacity-70 truncate">
                        {option.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className={`w-4 h-4 shrink-0 ${checkClass}`} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
