import React, { useState } from 'react';
import {
  NatureRainbowArc,
  PottedPlantDecor,
  LeafCornerDecor,
  DottedCornerDecor,
} from '../decorations/NatureDecorations';
import { CosmicSubtitleSparkle } from '../decorations/CosmicDecorations';

interface UtbkSubtestGridProps {
  theme?: 'light' | 'dark';
  onSelectSubtest: (code: string) => void;
}

// 1. Penalaran Umum (PU): Swirling Cosmic Atom / Orbiting Galaxy (Mockup 1 & 2)
const PuIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="puCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="puGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Elliptical Orbital Ring 1 (Tilted 35 deg) */}
    <ellipse cx="26" cy="26" rx="21" ry="8" stroke="#C084FC" strokeWidth="2.2" transform="rotate(35 26 26)" opacity="0.9" />
    <circle cx="11" cy="15" r="2.2" fill="#FDE047" filter="url(#puGlow)" />

    {/* Elliptical Orbital Ring 2 (Tilted -35 deg) */}
    <ellipse cx="26" cy="26" rx="21" ry="8" stroke="#00F2FE" strokeWidth="2.2" transform="rotate(-35 26 26)" opacity="0.9" />
    <circle cx="41" cy="15" r="2.2" fill="#FFFFFF" filter="url(#puGlow)" />

    {/* Horizontal Orbital Ring 3 */}
    <ellipse cx="26" cy="26" rx="19" ry="7" stroke="#A855F7" strokeWidth="1.8" opacity="0.8" />
    <circle cx="36" cy="31" r="1.8" fill="#38BDF8" />

    {/* Central Glowing Core / Cosmic Star */}
    <circle cx="26" cy="26" r="7.5" fill="url(#puCoreGrad)" filter="url(#puGlow)" />
    <circle cx="24.5" cy="24.5" r="2.5" fill="#FFFFFF" opacity="0.8" />

    {/* Tiny Cosmic Sparkle */}
    <path d="M42 9L43.2 12.8L47 14L43.2 15.2L42 19L40.8 15.2L37 14L40.8 12.8Z" fill="#FDE047" />
  </svg>
);

// 2. Pengetahuan & Pemahaman Umum (PPU): 3D Earth Globe + Golden Magnifying Glass (Mockup 1 & 2)
const PpuIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globeOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Globe Ocean Sphere */}
    <circle cx="22" cy="24" r="14" fill="url(#globeOceanGrad)" />
    
    {/* Earth Continents (Emerald Green) */}
    <path
      d="M14 19C15.5 17 18 16.5 19 18C20 19.5 19 22 17.5 22.5C16 23 13 21.5 14 19Z"
      fill="#10B981"
    />
    <path
      d="M23 13.5C25 13 28 14.5 29 16.5C30 18.5 29 20.5 27 21.5C25 22.5 23 21 22 19C21 17 21 14 23 13.5Z"
      fill="#10B981"
    />
    <path
      d="M17 28.5C18.5 27.5 21 28.5 22 30.5C23 32.5 20.5 35 18.5 35C16.5 35 15.5 30 17 28.5Z"
      fill="#10B981"
    />
    <path
      d="M27 26.5C29 25.5 32 27 33 29.5C33.8 31.5 32 33.5 30 33C28 32.5 25.5 28 27 26.5Z"
      fill="#10B981"
    />

    {/* Latitude & Longitude Thin Lines */}
    <circle cx="22" cy="24" r="14" stroke="#7DD3FC" strokeWidth="1" opacity="0.6" />
    <ellipse cx="22" cy="24" rx="6" ry="14" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
    <line x1="8" y1="24" x2="36" y2="24" stroke="#7DD3FC" strokeWidth="1" opacity="0.6" />

    {/* Golden Magnifying Glass (Tilted 45 Deg) */}
    <g>
      {/* Magnifier Glass Lens (Cyan Glare) */}
      <circle cx="33" cy="27" r="8.5" fill="#E0F2FE" fillOpacity="0.75" />
      <path d="M29 24C30 22 32.5 21.5 34.5 22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

      {/* Gold Metallic Rim */}
      <circle cx="33" cy="27" r="8.5" stroke="url(#goldRimGrad)" strokeWidth="3" />

      {/* Golden Handle with Grip Lines */}
      <line x1="39" y1="33" x2="47" y2="41" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="39" y1="33" x2="47" y2="41" stroke="url(#goldRimGrad)" strokeWidth="2.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 3. Pemahaman Bacaan & Menulis (PBM): Document Sheet with Bold Yellow Lightning (Mockup 1 & 2)
const PbmIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
      <filter id="pbmGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* White Paper Document Card with rounded corners */}
    <rect x="13" y="10" width="26" height="32" rx="4" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
    
    {/* Soft inner fold highlight */}
    <path d="M33 10L39 16H35C33.9 16 33 15.1 33 14V10Z" fill="#E2E8F0" />

    {/* Bold Yellow / Gold Lightning Bolt Striking in Center */}
    <path
      d="M28 15L20 27H26L23 37L32 24H26L28 15Z"
      fill="url(#boltGrad)"
      stroke="#CA8A04"
      strokeWidth="1.2"
      strokeLinejoin="round"
      filter="url(#pbmGlow)"
    />

    {/* Golden Accent Dot */}
    <circle cx="34" cy="36" r="2.2" fill="#FACC15" />
  </svg>
);

// 4. Pengetahuan Kuantitatif (PK): Sleek Blue Calculator with 4 Colored Buttons (Mockup 1 & 2)
const PkIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calcBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Blue Calculator Device Body */}
    <rect x="11" y="9" width="30" height="34" rx="6" fill="url(#calcBodyGrad)" stroke="#60A5FA" strokeWidth="1.5" />
    
    {/* Dark Cyan Digital Display Header */}
    <rect x="15" y="13" width="22" height="7.5" rx="2.5" fill="#0B132B" />
    <text
      x="34"
      y="19"
      fill="#00F2FE"
      fontSize="6"
      fontFamily="monospace"
      fontWeight="bold"
      textAnchor="end"
      letterSpacing="0.8"
    >
      84×2
    </text>

    {/* 4 Colored Function Buttons arranged 2x2 */}
    {/* Top-Left: Golden/Yellow Button (+) */}
    <rect x="15" y="23.5" width="9.5" height="7.5" rx="2" fill="#F59E0B" />
    <path d="M19.75 25.5V29M17.75 27.25H21.75" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    {/* Top-Right: Electric Blue Button (−) */}
    <rect x="27.5" y="23.5" width="9.5" height="7.5" rx="2" fill="#06B6D4" />
    <path d="M30.25 27.25H34.25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    {/* Bottom-Left: Emerald Green Button (×) */}
    <rect x="15" y="33" width="9.5" height="7.5" rx="2" fill="#10B981" />
    <path d="M18 35.25L21.5 38.75M21.5 35.25L18 38.75" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    {/* Bottom-Right: Coral/Orange Button (=) */}
    <rect x="27.5" y="33" width="9.5" height="7.5" rx="2" fill="#F97316" />
    <path d="M30 36H34M30 38H34" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 5. Literasi Bahasa Indonesia (LBI): Buku Merah-Putih dengan Penanda Pita
const LbiIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="32" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    {/* Flag Header (Merah) */}
    <path d="M10 11H42V23H10V11Z" fill="#DC2626" />
    {/* Flag Bottom (Putih) */}
    <path d="M10 23H42V35H10V23Z" fill="#FFFFFF" />
    {/* Spine Red Bookmark */}
    <path d="M23 11V29L26 26.5L29 29V11H23Z" fill="#DC2626" />
    <path d="M23 11V19L26 17.5L29 19V11H23Z" fill="#FFFFFF" />
    {/* Reading text lines */}
    <line x1="14" y1="37" x2="28" y2="37" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14" y1="40" x2="22" y2="40" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 6. Literasi Bahasa Inggris (LBE): Royal Blue Crest & British Motif
const LbeIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(9, 9)">
      <rect x="0" y="0" width="34" height="34" rx="6" fill="#1E3A8A" />
      <line x1="0" y1="0" x2="34" y2="34" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="34" y1="0" x2="0" y2="34" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="0" y1="0" x2="34" y2="34" stroke="#DC2626" strokeWidth="2" />
      <line x1="34" y1="0" x2="0" y2="34" stroke="#DC2626" strokeWidth="2" />
      <rect x="13" y="0" width="8" height="34" fill="#FFFFFF" />
      <rect x="0" y="13" width="34" height="8" fill="#FFFFFF" />
      <rect x="14.5" y="0" width="5" height="34" fill="#DC2626" />
      <rect x="0" y="14.5" width="34" height="5" fill="#DC2626" />
    </g>
    <g transform="translate(26, 26)">
      <rect width="18" height="15" rx="4" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="9" y="10.5" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        EN
      </text>
    </g>
  </svg>
);

// 7. Penalaran Matematika (PM): Geometri Segitiga & Kurva Fungsi
const PmIcon = () => (
  <svg viewBox="0 0 52 52" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 40L10 12L38 40H10Z"
      fill="#ECFDF5"
      stroke="#10B981"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <line x1="10" y1="34" x2="16" y2="34" stroke="#059669" strokeWidth="1.8" />
    <line x1="16" y1="34" x2="16" y2="40" stroke="#059669" strokeWidth="1.8" />
    <path
      d="M14 26C18 24 24 28 32 18"
      stroke="#6366F1"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <circle cx="32" cy="18" r="3" fill="#F59E0B" />
  </svg>
);

interface SubtestThemeConfig {
  code: string;
  name: string;
  category: 'TPS' | 'Literasi';
  icon: React.ReactNode;
  // Dark mode styling
  darkBorderClass: string;
  darkHaloClass: string;
  darkBadgeClass: string;
  darkSquircleClass: string;
  // Light mode styling
  lightBgClass: string;
  lightBadgeClass: string;
  lightSquircleClass: string;
  cornerElement: React.ReactNode;
}

export const UtbkSubtestGrid: React.FC<UtbkSubtestGridProps> = ({ theme = 'light', onSelectSubtest }) => {
  const isDark = theme === 'dark';
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TPS' | 'Literasi'>('ALL');

  const subtests: SubtestThemeConfig[] = [
    {
      code: 'PU',
      name: 'Penalaran Umum',
      category: 'TPS',
      icon: <PuIcon />,
      darkBorderClass: 'neon-border-purple hover:shadow-[0_0_28px_rgba(168,85,247,0.6)]',
      darkHaloClass: 'icon-halo-purple',
      darkBadgeClass: 'bg-slate-900/90 text-purple-300 border border-purple-500/60',
      darkSquircleClass: 'bg-[#181136] border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      lightBgClass: 'pastel-card-pink',
      lightBadgeClass: 'bg-white/95 text-rose-800 border border-rose-200',
      lightSquircleClass: 'bg-rose-100/90 border border-rose-200/80',
      cornerElement: (
        <>
          <LeafCornerDecor position="top-left" />
          <DottedCornerDecor position="bottom-left" />
        </>
      ),
    },
    {
      code: 'PPU',
      name: 'Pengetahuan & Pemahaman Umum',
      category: 'TPS',
      icon: <PpuIcon />,
      darkBorderClass: 'neon-border-cyan hover:shadow-[0_0_28px_rgba(0,242,254,0.6)]',
      darkHaloClass: 'icon-halo-cyan',
      darkBadgeClass: 'bg-slate-900/90 text-cyan-300 border border-cyan-500/60',
      darkSquircleClass: 'bg-[#0a2336] border border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.4)]',
      lightBgClass: 'pastel-card-peach',
      lightBadgeClass: 'bg-white/95 text-amber-800 border border-amber-200',
      lightSquircleClass: 'bg-amber-100/90 border border-amber-200/80',
      cornerElement: (
        <>
          <LeafCornerDecor position="top-left" />
          <PottedPlantDecor position="bottom-right" />
        </>
      ),
    },
    {
      code: 'PBM',
      name: 'Pemahaman Bacaan & Menulis',
      category: 'TPS',
      icon: <PbmIcon />,
      darkBorderClass: 'neon-border-coral hover:shadow-[0_0_28px_rgba(244,63,94,0.6)]',
      darkHaloClass: 'icon-halo-coral',
      darkBadgeClass: 'bg-slate-900/90 text-rose-300 border border-rose-500/60',
      darkSquircleClass: 'bg-[#33111f] border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
      lightBgClass: 'pastel-card-mint',
      lightBadgeClass: 'bg-white/95 text-emerald-800 border border-emerald-200',
      lightSquircleClass: 'bg-emerald-100/90 border border-emerald-200/80',
      cornerElement: (
        <>
          <LeafCornerDecor position="top-left" />
          <PottedPlantDecor position="bottom-left" />
        </>
      ),
    },
    {
      code: 'PK',
      name: 'Pengetahuan Kuantitatif',
      category: 'TPS',
      icon: <PkIcon />,
      darkBorderClass: 'neon-border-blue hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]',
      darkHaloClass: 'icon-halo-blue',
      darkBadgeClass: 'bg-slate-900/90 text-blue-300 border border-blue-500/60',
      darkSquircleClass: 'bg-[#0d1d3d] border border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
      lightBgClass: 'pastel-card-sky',
      lightBadgeClass: 'bg-white/95 text-sky-800 border border-sky-200',
      lightSquircleClass: 'bg-sky-100/90 border border-sky-200/80',
      cornerElement: (
        <>
          <DottedCornerDecor position="top-right" />
          <PottedPlantDecor position="bottom-right" />
        </>
      ),
    },
    {
      code: 'LBI',
      name: 'Literasi Bahasa Indonesia',
      category: 'Literasi',
      icon: <LbiIcon />,
      darkBorderClass: 'neon-border-coral hover:shadow-[0_0_28px_rgba(244,63,94,0.6)]',
      darkHaloClass: 'icon-halo-coral',
      darkBadgeClass: 'bg-slate-900/90 text-rose-300 border border-rose-500/60',
      darkSquircleClass: 'bg-[#2a1322] border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
      lightBgClass: 'pastel-card-pink',
      lightBadgeClass: 'bg-white/95 text-rose-800 border border-rose-200',
      lightSquircleClass: 'bg-rose-100/90 border border-rose-200/80',
      cornerElement: (
        <>
          <LeafCornerDecor position="top-right" />
          <DottedCornerDecor position="bottom-left" />
        </>
      ),
    },
    {
      code: 'LBE',
      name: 'Literasi Bahasa Inggris',
      category: 'Literasi',
      icon: <LbeIcon />,
      darkBorderClass: 'neon-border-purple hover:shadow-[0_0_28px_rgba(168,85,247,0.6)]',
      darkHaloClass: 'icon-halo-purple',
      darkBadgeClass: 'bg-slate-900/90 text-purple-300 border border-purple-500/60',
      darkSquircleClass: 'bg-[#171638] border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      lightBgClass: 'pastel-card-lavender',
      lightBadgeClass: 'bg-white/95 text-purple-800 border border-purple-200',
      lightSquircleClass: 'bg-purple-100/90 border border-purple-200/80',
      cornerElement: (
        <>
          <PottedPlantDecor position="bottom-right" />
        </>
      ),
    },
    {
      code: 'PM',
      name: 'Penalaran Matematika',
      category: 'Literasi',
      icon: <PmIcon />,
      darkBorderClass: 'neon-border-emerald hover:shadow-[0_0_28px_rgba(16,185,129,0.6)]',
      darkHaloClass: 'icon-halo-emerald',
      darkBadgeClass: 'bg-slate-900/90 text-emerald-300 border border-emerald-500/60',
      darkSquircleClass: 'bg-[#0a2920] border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
      lightBgClass: 'pastel-card-mint',
      lightBadgeClass: 'bg-white/95 text-emerald-800 border border-emerald-200',
      lightSquircleClass: 'bg-emerald-100/90 border border-emerald-200/80',
      cornerElement: (
        <>
          <LeafCornerDecor position="top-left" />
          <DottedCornerDecor position="bottom-right" />
        </>
      ),
    },
  ];

  const filteredSubtests = subtests.filter((sub) => {
    if (categoryFilter === 'ALL') return true;
    return sub.category === categoryFilter;
  });

  return (
    <div className="w-full space-y-4 px-2 sm:px-4 md:px-6">
      {/* 1. Category Filter Tabs: Semua | TPS | Literasi & Subtitle (Standalone Row directly on background) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 z-10 relative">
        <div className="flex items-center bg-stone-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setCategoryFilter('ALL')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              categoryFilter === 'ALL'
                ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 text-white dark:text-cyan-100 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_14px_rgba(0,242,254,0.4)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua (7)
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('TPS')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'TPS'
                ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 text-white dark:text-cyan-100 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_14px_rgba(0,242,254,0.4)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🎯 TPS</span>
            <span className="text-xs font-normal opacity-75">(4)</span>
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('Literasi')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'Literasi'
                ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 text-white dark:text-cyan-100 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_14px_rgba(0,242,254,0.4)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>📚 Literasi</span>
            <span className="text-xs font-normal opacity-75">(3)</span>
          </button>
        </div>

        {/* Subtitle with theme ornament: Rainbow Arcs in Light, Sparkle in Dark */}
        <div className="relative flex items-center gap-2">
          {/* Nature Rainbow Arc in Light Mode */}
          <div className="dark:hidden">
            <NatureRainbowArc />
          </div>

          <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-cyan-300/90 flex items-center gap-1.5">
            <span className="hidden dark:inline">
              <CosmicSubtitleSparkle />
            </span>
            <span>27 Modul Terstandar SNBT</span>
          </span>
        </div>
      </div>

      {/* 2. Standalone Cards Grid (2 Kolom Mobile, 3 Kolom Tablet, 4 Kolom Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 z-10 relative">
        {filteredSubtests.map((sub) => {
          // Dark mode: hilangkan gradasi neon & warna terang yang terlalu ramai, gunakan kartu gelap tenang & elegan
          const cardBgClass = isDark
            ? 'bg-[#0d1424] hover:bg-[#111c33] border border-slate-800 hover:border-slate-700 shadow-xs'
            : `${sub.lightBgClass} border border-stone-200/80 shadow-xs`;

          const squircleClass = isDark
            ? 'bg-slate-800/80 border border-slate-700/60 shadow-none'
            : sub.lightSquircleClass;
          const badgeClass = isDark
            ? 'bg-slate-800/80 text-slate-300 border border-slate-700/60'
            : sub.lightBadgeClass;
          const textClass = isDark ? 'text-slate-100' : 'text-slate-900';

          return (
            <button
              key={sub.code}
              type="button"
              onClick={() => onSelectSubtest(sub.code.toLowerCase())}
              className={`w-full flex flex-col items-center justify-between p-3 sm:p-3.5 md:p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer text-center focus:outline-none relative overflow-hidden ${cardBgClass}`}
              aria-label={`Buka Subtes ${sub.name}`}
            >
              {/* Light Mode Decorative Corner SVGs */}
              {!isDark && sub.cornerElement}

              {/* Category / Code Pill */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold shadow-2xs mb-1.5 transition-colors z-10 ${badgeClass}`}
              >
                {sub.code} • {sub.category}
              </span>

              {/* Icon Squircle Container */}
              <div className="relative my-1.5 z-10 flex items-center justify-center">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs mx-auto transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shrink-0 ${squircleClass}`}
                >
                  {sub.icon}
                </div>
              </div>

              {/* Label Nama Subtes Lengkap */}
              <div className="w-full flex-1 flex flex-col items-center justify-start mt-1.5 z-10">
                <span className={`text-xs sm:text-sm md:text-[15px] font-bold ${textClass} text-center leading-snug w-full break-words group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors`}>
                  {sub.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
