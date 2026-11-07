import React, { useState } from 'react';
import {
  NatureRainbowArc,
  PottedPlantDecor,
  LeafCornerDecor,
  DottedCornerDecor,
} from '../decorations/NatureDecorations';
import { CosmicSubtitleSparkle } from '../decorations/CosmicDecorations';

interface UtbkSubtestGridProps {
  onSelectSubtest: (code: string) => void;
}

// 1. Penalaran Umum (PU): Ungu-Indigo dengan grafik otak/logika & roda gigi ungu-oranye
const PuIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 12C14.79 12 13 13.79 13 16C11.34 16 10 17.34 10 19C10 20.35 10.9 21.5 12.14 21.87C12.05 22.23 12 22.61 12 23C12 24.32 12.57 25.51 13.48 26.33C13.18 27.13 13 27.99 13 28.9C13 31.72 15.28 34 18.1 34C18.74 34 19.35 33.88 19.92 33.66C20.89 35.09 22.48 36 24.3 36C26.12 36 27.71 35.09 28.68 33.66C29.25 33.88 29.86 34 30.5 34C33.32 34 35.6 31.72 35.6 28.9C35.6 27.99 35.42 27.13 35.12 26.33C36.03 25.51 36.6 24.32 36.6 23C36.6 22.61 36.55 22.23 36.46 21.87C37.7 21.5 38.6 20.35 38.6 19C38.6 17.34 37.26 16 35.6 16C35.6 13.79 33.81 12 31.6 12C30.66 12 29.79 12.33 29.1 12.88C28.17 11.72 26.75 11 25.15 11H23.45C21.85 11 20.43 11.72 19.5 12.88C18.81 12.33 17.94 12 17 12Z"
      fill="#8B5CF6"
    />
    <path
      d="M24.3 12V35"
      stroke="#6D28D9"
      strokeWidth="1.6"
      strokeDasharray="2 2"
      strokeLinecap="round"
    />
    <g transform="translate(18, 17)">
      <circle cx="9" cy="9" r="7.5" fill="#F97316" />
      <circle cx="9" cy="9" r="3.5" fill="#FEF3C7" />
      <path
        d="M9 1.5V3M9 15V16.5M1.5 9H3M15 9H16.5M3.7 3.7L4.8 4.8M13.2 13.2L14.3 14.3M3.7 14.3L4.8 13.2M13.2 4.8L14.3 3.7"
        stroke="#EA580C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
    <circle cx="16.5" cy="18" r="1.3" fill="#DDD6FE" />
    <circle cx="16" cy="27" r="1.3" fill="#DDD6FE" />
    <circle cx="31.5" cy="19" r="1.3" fill="#FED7AA" />
  </svg>
);

// 2. Pengetahuan & Pemahaman Umum (PPU): Biru Cerah dengan bola dunia/buku & kaca pembesar
const PpuIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="13" fill="#0284C7" />
    <path
      d="M13 17C14.5 15.5 17 15 18 16.5C19 18 17.5 20.5 16 21C14.5 21.5 12 20 13 17Z"
      fill="#10B981"
    />
    <path
      d="M22 11C24 10.5 27 12 28 14C29 16 28 18 26 19C24 20 22 18.5 21 16.5C20 14.5 20 11.5 22 11Z"
      fill="#10B981"
    />
    <path
      d="M17 26C18.5 25 21 26 22 28C23 30 20.5 32.5 18.5 32.5C16.5 32.5 15.5 27 17 26Z"
      fill="#10B981"
    />
    <path
      d="M26 24C28 23 31 24.5 32 27C33 29.5 30.5 31.5 28.5 31C26.5 30.5 24 25 26 24Z"
      fill="#10B981"
    />
    <circle cx="21" cy="21" r="13" stroke="#38BDF8" strokeWidth="1.2" />
    <ellipse cx="21" cy="21" rx="5.5" ry="13" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2.5 2" />
    <line x1="8" y1="21" x2="34" y2="21" stroke="#38BDF8" strokeWidth="1" />
    <g>
      <circle cx="31" cy="29" r="7.5" fill="#E0F2FE" fillOpacity="0.85" stroke="#F59E0B" strokeWidth="2.8" />
      <path d="M28 26.5C29 25 31 24.5 32.5 25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36.5" y1="34.5" x2="43.5" y2="41.5" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
      <line x1="36.5" y1="34.5" x2="43.5" y2="41.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 3. Pemahaman Bacaan & Menulis (PBM): Merah-Rose dengan buku merah & pena emas
const PbmIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 7)">
      <rect x="2" y="2" width="26" height="32" rx="3" fill="#BE123C" />
      <path d="M2 2H6.5V34H2C0.9 34 0 33.1 0 32V4C0 2.9 0.9 2 2 2Z" fill="#9F1239" />
      <rect x="6.5" y="5" width="19.5" height="26" rx="1.5" fill="#FFF1F2" />
      <line x1="9.5" y1="10" x2="23" y2="10" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="15" x2="21" y2="15" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="20" x2="23" y2="20" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="25" x2="18" y2="25" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />
    </g>
    <g transform="translate(19, 10) rotate(25)">
      <rect x="4" y="0" width="5.5" height="19" rx="1.8" fill="#D97706" />
      <rect x="4" y="13" width="5.5" height="3.5" fill="#FBBF24" />
      <path d="M4 19L6.75 27L9.5 19H4Z" fill="#F59E0B" />
      <line x1="6.75" y1="19" x2="6.75" y2="24" stroke="#78350F" strokeWidth="0.8" />
    </g>
    <circle cx="36" cy="38" r="2.2" fill="#F59E0B" />
  </svg>
);

// 4. Pengetahuan Kuantitatif (PK): Biru-Cyan dengan kalkulator/simbol operasi
const PkIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="6" width="30" height="36" rx="5" fill="#2563EB" />
    <rect x="13" y="10" width="22" height="8.5" rx="2" fill="#0F172A" />
    <text x="32" y="16.5" fill="#38BDF8" fontSize="5.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">
      84×2
    </text>
    <rect x="13" y="21.5" width="9.5" height="7.5" rx="2" fill="#06B6D4" />
    <path d="M17.75 23.5V27M16 25.25H19.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="25.5" y="21.5" width="9.5" height="7.5" rx="2" fill="#F97316" />
    <path d="M28.5 25.25H32" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="13" y="31.5" width="9.5" height="7.5" rx="2" fill="#10B981" />
    <path d="M16 33.5L19.5 37M19.5 33.5L16 37" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="25.5" y="31.5" width="9.5" height="7.5" rx="2" fill="#F59E0B" />
    <path d="M28.5 35.25H32M30.25 33.25V33.35M30.25 37.15V37.25" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 5. Literasi Bahasa Indonesia (LBI): Merah-Putih/Coral dengan buku bendera
const LbiIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="9" width="32" height="30" rx="3.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M9 10H39V22H9V10Z" fill="#DC2626" />
    <path d="M9 22H39V34H9V22Z" fill="#FFFFFF" />
    <rect x="11" y="6" width="26" height="4" rx="1.5" fill="#CBD5E1" />
    <path d="M9 10C7.5 10 6.5 11 6.5 12.5V32.5C6.5 34 7.5 35 9 35V10Z" fill="#B91C1C" />
    <path d="M23 10V27L26 24.5L29 27V10H23Z" fill="#DC2626" />
    <path d="M23 10V18L26 16.5L29 18V10H23Z" fill="#FFFFFF" />
    <line x1="12" y1="26" x2="20" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="30" x2="20" y2="30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 6. Literasi Bahasa Inggris (LBE): Ungu-Biru dengan buku aksen Union Jack
const LbeIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(7, 7)">
      <rect x="0" y="0" width="34" height="34" rx="5" fill="#1E3A8A" />
      <line x1="0" y1="0" x2="34" y2="34" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="34" y1="0" x2="0" y2="34" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="0" y1="0" x2="34" y2="34" stroke="#DC2626" strokeWidth="2" />
      <line x1="34" y1="0" x2="0" y2="34" stroke="#DC2626" strokeWidth="2" />
      <rect x="13" y="0" width="8" height="34" fill="#FFFFFF" />
      <rect x="0" y="13" width="34" height="8" fill="#FFFFFF" />
      <rect x="14.5" y="0" width="5" height="34" fill="#DC2626" />
      <rect x="0" y="14.5" width="34" height="5" fill="#DC2626" />
      <rect x="0" y="0" width="34" height="34" rx="5" stroke="#312E81" strokeWidth="1.5" />
    </g>
    <g transform="translate(25, 26)">
      <rect width="18" height="15" rx="3.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="9" y="10.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        EN
      </text>
    </g>
  </svg>
);

// 7. Penalaran Matematika (PM): Hijau-Emerald dengan penggaris geometri & grafik
const PmIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 38L8 11L35 38H8Z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="1.5"
    />
    <path
      d="M13 34L13 21L26 34H13Z"
      fill="#A7F3D0"
      stroke="#D97706"
      strokeWidth="1"
    />
    <line x1="8" y1="17" x2="10.5" y2="17" stroke="#92400E" strokeWidth="1.2" />
    <line x1="8" y1="23" x2="10.5" y2="23" stroke="#92400E" strokeWidth="1.2" />
    <line x1="8" y1="29" x2="10.5" y2="29" stroke="#92400E" strokeWidth="1.2" />
    <line x1="17" y1="38" x2="17" y2="35.5" stroke="#92400E" strokeWidth="1.2" />
    <line x1="23" y1="38" x2="23" y2="35.5" stroke="#92400E" strokeWidth="1.2" />
    <path
      d="M17 26C21 25 27 17 37 12"
      stroke="#047857"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="23" cy="22" r="2.2" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
    <circle cx="37" cy="12" r="2.8" fill="#047857" stroke="#FFFFFF" strokeWidth="1" />
    <g transform="translate(24, 4)">
      <rect width="18" height="15" rx="3.5" fill="#065F46" />
      <text x="9" y="11" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        √x
      </text>
    </g>
  </svg>
);

interface SubtestThemeConfig {
  code: string;
  name: string;
  category: 'TPS' | 'Literasi';
  icon: React.ReactNode;
  // Dark mode styles
  darkBorderClass: string;
  darkHaloClass: string;
  darkBadgeClass: string;
  // Light mode styles
  lightBgClass: string;
  lightBadgeClass: string;
  lightIconBgClass: string;
  cornerElement: React.ReactNode;
}

export const UtbkSubtestGrid: React.FC<UtbkSubtestGridProps> = ({ onSelectSubtest }) => {
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TPS' | 'Literasi'>('ALL');

  const subtests: SubtestThemeConfig[] = [
    {
      code: 'PU',
      name: 'Penalaran Umum',
      category: 'TPS',
      icon: <PuIcon />,
      darkBorderClass: 'neon-border-purple hover:shadow-[0_0_24px_rgba(168,85,247,0.45)]',
      darkHaloClass: 'icon-halo-purple',
      darkBadgeClass: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
      lightBgClass: 'pastel-card-pink',
      lightBadgeClass: 'bg-white/90 text-rose-800 border-rose-200',
      lightIconBgClass: 'bg-rose-100/90',
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
      darkBorderClass: 'neon-border-cyan hover:shadow-[0_0_24px_rgba(0,242,254,0.45)]',
      darkHaloClass: 'icon-halo-cyan',
      darkBadgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50',
      lightBgClass: 'pastel-card-peach',
      lightBadgeClass: 'bg-white/90 text-amber-800 border-amber-200',
      lightIconBgClass: 'bg-amber-100/90',
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
      darkBorderClass: 'neon-border-coral hover:shadow-[0_0_24px_rgba(244,63,94,0.45)]',
      darkHaloClass: 'icon-halo-coral',
      darkBadgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500/50',
      lightBgClass: 'pastel-card-mint',
      lightBadgeClass: 'bg-white/90 text-emerald-800 border-emerald-200',
      lightIconBgClass: 'bg-emerald-100/90',
      cornerElement: <PottedPlantDecor position="bottom-left" />,
    },
    {
      code: 'PK',
      name: 'Pengetahuan Kuantitatif',
      category: 'TPS',
      icon: <PkIcon />,
      darkBorderClass: 'neon-border-blue hover:shadow-[0_0_24px_rgba(59,130,246,0.45)]',
      darkHaloClass: 'icon-halo-blue',
      darkBadgeClass: 'bg-blue-950/80 text-blue-300 border-blue-500/50',
      lightBgClass: 'pastel-card-sky',
      lightBadgeClass: 'bg-white/90 text-sky-800 border-sky-200',
      lightIconBgClass: 'bg-sky-100/90',
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
      darkBorderClass: 'neon-border-coral hover:shadow-[0_0_24px_rgba(244,63,94,0.45)]',
      darkHaloClass: 'icon-halo-coral',
      darkBadgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500/50',
      lightBgClass: 'pastel-card-pink',
      lightBadgeClass: 'bg-white/90 text-rose-800 border-rose-200',
      lightIconBgClass: 'bg-rose-100/90',
      cornerElement: <LeafCornerDecor position="top-right" />,
    },
    {
      code: 'LBE',
      name: 'Literasi Bahasa Inggris',
      category: 'Literasi',
      icon: <LbeIcon />,
      darkBorderClass: 'neon-border-purple hover:shadow-[0_0_24px_rgba(168,85,247,0.45)]',
      darkHaloClass: 'icon-halo-purple',
      darkBadgeClass: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
      lightBgClass: 'pastel-card-lavender',
      lightBadgeClass: 'bg-white/90 text-purple-800 border-purple-200',
      lightIconBgClass: 'bg-purple-100/90',
      cornerElement: <PottedPlantDecor position="bottom-right" />,
    },
    {
      code: 'PM',
      name: 'Penalaran Matematika',
      category: 'Literasi',
      icon: <PmIcon />,
      darkBorderClass: 'neon-border-emerald hover:shadow-[0_0_24px_rgba(16,185,129,0.45)]',
      darkHaloClass: 'icon-halo-emerald',
      darkBadgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
      lightBgClass: 'pastel-card-mint',
      lightBadgeClass: 'bg-white/90 text-emerald-800 border-emerald-200',
      lightIconBgClass: 'bg-emerald-100/90',
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
    <div className="relative rounded-3xl p-4 sm:p-6 space-y-5 transition-all duration-300 bg-white/70 dark:bg-[#0d1326]/75 border border-stone-200/80 dark:border-cyan-500/20 backdrop-blur-md shadow-sm dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Category Filter Tabs: Semua | TPS | Literasi */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 dark:border-slate-800/80 pb-3.5 z-10">
        <div className="flex items-center bg-stone-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              categoryFilter === 'ALL'
                ? 'bg-blue-600 dark:bg-[#0e244d] text-white dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua (7)
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('TPS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'TPS'
                ? 'bg-blue-600 dark:bg-[#0e244d] text-white dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🎯 TPS</span>
            <span className="text-xs font-normal opacity-75">(4)</span>
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('Literasi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'Literasi'
                ? 'bg-blue-600 dark:bg-[#0e244d] text-white dark:text-cyan-200 dark:border dark:border-cyan-400/60 shadow-xs dark:shadow-[0_0_12px_rgba(0,242,254,0.3)]'
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

      {/* Grid Responsif (2 Kolom Mobile, 3 Kolom Tablet, 4 Kolom Desktop) dengan border-radius: 20px */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 z-10 relative">
        {filteredSubtests.map((sub) => (
          <button
            key={sub.code}
            type="button"
            onClick={() => onSelectSubtest(sub.code.toLowerCase())}
            className={`w-full flex flex-col items-center justify-between p-4 sm:p-5 rounded-[20px] transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer text-center focus:outline-none relative overflow-hidden ${
              // Light mode pastel styles
              `${sub.lightBgClass} dark:bg-[rgba(18,25,48,0.75)] dark:backdrop-blur-md ` +
              // Dark mode neon borders & glows
              `dark:${sub.darkBorderClass} border`
            }`}
            aria-label={`Buka Subtes ${sub.name}`}
          >
            {/* Light Mode Decorative Corner SVGs */}
            <div className="dark:hidden">
              {sub.cornerElement}
            </div>

            {/* Category / Code Pill */}
            <span
              className={`px-3 py-0.5 rounded-full text-[11px] font-bold shadow-2xs border mb-3 transition-colors z-10 ${sub.lightBadgeClass} dark:${sub.darkBadgeClass}`}
            >
              {sub.code} • {sub.category}
            </span>

            {/* 1. Ikon Squircle dengan Glowing Halo di Dark Mode & Soft Squircle di Light Mode */}
            <div className="relative my-1 z-10 flex items-center justify-center">
              {/* Cosmic glowing halo behind the icon in Dark Mode */}
              <div
                className={`hidden dark:block absolute w-24 h-24 rounded-full ${sub.darkHaloClass} blur-md pointer-events-none group-hover:scale-125 transition-transform duration-300`}
              />

              {/* Icon Container */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xs mx-auto transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shrink-0 ${sub.lightIconBgClass} dark:bg-slate-900/80 dark:border dark:border-white/10`}
              >
                {sub.icon}
              </div>
            </div>

            {/* 2. Label Nama Subtes Lengkap Tanpa Terpotong */}
            <div className="w-full flex-1 flex flex-col items-center justify-start mt-3 z-10">
              <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 text-center leading-snug w-full break-words group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                {sub.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
