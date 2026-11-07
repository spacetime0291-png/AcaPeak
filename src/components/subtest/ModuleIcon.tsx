import React from 'react';

interface ModuleIconProps {
  moduleId: string;
  className?: string;
}

export const ModuleIcon: React.FC<ModuleIconProps> = ({ moduleId, className = 'w-7 h-7 sm:w-8 sm:h-8' }) => {
  // 1. PK Modules (Matching Image 2 closely!)
  if (moduleId === 'pk-mod-1') {
    // Bilangan, Eksponen & Himpunan: X^n & Venn
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Purple X */}
        <path d="M12 16L24 32M24 16L12 32" stroke="#8B5CF6" strokeWidth="4.5" strokeLinecap="round" />
        {/* Amber power n */}
        <text x="27" y="18" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">n</text>
        {/* Mini Venn circles */}
        <circle cx="31" cy="29" r="6.5" fill="#EF4444" fillOpacity="0.75" />
        <circle cx="37" cy="29" r="6.5" fill="#FBBF24" fillOpacity="0.75" />
      </svg>
    );
  }

  if (moduleId === 'pk-mod-2') {
    // Aljabar, Persamaan & Pertidaksamaan: |x| absolute value & equation
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="12" x2="10" y2="36" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        <path d="M19 18L29 30M29 18L19 30" stroke="#9333EA" strokeWidth="3.8" strokeLinecap="round" />
        <line x1="38" y1="12" x2="38" y2="36" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        {/* <= symbol badge */}
        <g transform="translate(24, 28)">
          <rect width="18" height="12" rx="3" fill="#10B981" />
          <text x="9" y="9.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">≤</text>
        </g>
      </svg>
    );
  }

  if (moduleId === 'pk-mod-3') {
    // Fungsi, Barisan & Matriks: f:x->y & Matrix brackets
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 13H14M9 13V35M9 35H14" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M39 13H34M39 13V35M39 35H34" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
        <text x="24" y="22" fill="#EC4899" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">f(x)</text>
        <path d="M17 29H31M28 26L31 29L28 32" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (moduleId === 'pk-mod-4') {
    // Geometri Datar: Triangle, angles, shapes
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 36L24 12L38 36H10Z" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="24" cy="27" r="5" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M16 36A8 8 0 0 1 18 31" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="12" r="2.5" fill="#EF4444" />
      </svg>
    );
  }

  if (moduleId === 'pk-mod-5') {
    // Geometri Ruang & Koordinat Kartesius: 3D Cube & Cartesian Grid
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cartesian grid */}
        <line x1="8" y1="36" x2="38" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="40" x2="12" y2="10" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        {/* Isometric Cube */}
        <g transform="translate(14, 10)">
          {/* Top face */}
          <polygon points="12,2 22,7 12,12 2,7" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.5" />
          {/* Left face */}
          <polygon points="2,7 12,12 12,22 2,17" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" />
          {/* Right face */}
          <polygon points="12,12 22,7 22,17 12,22" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (moduleId === 'pk-mod-6') {
    // Statistika & Peluang Dasar: Bar Chart & Red Dice
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bar chart */}
        <rect x="8" y="24" width="6" height="14" rx="1.5" fill="#38BDF8" />
        <rect x="17" y="18" width="6" height="20" rx="1.5" fill="#818CF8" />
        <rect x="26" y="28" width="6" height="10" rx="1.5" fill="#34D399" />
        {/* Red Dice */}
        <g transform="translate(26, 8)">
          <rect width="16" height="16" rx="3.5" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx="4.5" cy="4.5" r="1.3" fill="#FFFFFF" />
          <circle cx="11.5" cy="4.5" r="1.3" fill="#FFFFFF" />
          <circle cx="8" cy="8" r="1.3" fill="#FFFFFF" />
          <circle cx="4.5" cy="11.5" r="1.3" fill="#FFFFFF" />
          <circle cx="11.5" cy="11.5" r="1.3" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // 2. PU Modules
  if (moduleId === 'pu-mod-1') {
    // Penalaran Induktif & Evaluasi Argumen: Brain + Logic
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="13" fill="rgba(99, 102, 241, 0.18)" stroke="#818CF8" strokeWidth="2.2" />
        <path d="M16 22C16 19 19 17 22 17C25 17 28 19 28 22C28 24 26 25 24 26V28" stroke="#A5B4FC" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="31" r="1.4" fill="#A5B4FC" />
        <g transform="translate(24, 24)">
          <circle cx="8" cy="8" r="7" fill="#F97316" />
          <path d="M5 8L7 10L11 6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }

  if (moduleId === 'pu-mod-2') {
    // Penalaran Deduktif (Logika Formal): P -> Q syllogism
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="28" rx="6" fill="rgba(168, 85, 247, 0.16)" stroke="#C084FC" strokeWidth="2" />
        <text x="16" y="24" fill="#E9D5FF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">P</text>
        <path d="M22 21H28M26 18L29 21L26 24" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="33" y="24" fill="#E9D5FF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Q</text>
        <line x1="12" y1="28" x2="36" y2="28" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="1.5" />
        <text x="24" y="35" fill="#34D399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">∴ SILOGISME</text>
      </svg>
    );
  }

  if (moduleId === 'pu-mod-3') {
    // Penalaran Kuantitatif: Pola Bilangan, Spasial & Grafik Data
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="28" r="5" fill="rgba(59, 130, 246, 0.25)" stroke="#60A5FA" strokeWidth="1.5" />
        <text x="12" y="31" fill="#93C5FD" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2</text>
        <circle cx="22" cy="28" r="6" fill="rgba(59, 130, 246, 0.35)" stroke="#60A5FA" strokeWidth="1.5" />
        <text x="22" y="31.5" fill="#BFDBFE" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4</text>
        <circle cx="34" cy="28" r="7" fill="rgba(59, 130, 246, 0.45)" stroke="#93C5FD" strokeWidth="1.8" />
        <text x="34" y="32" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
        <path d="M10 18L18 12L26 15L36 8" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36" cy="8" r="2.5" fill="#10B981" />
      </svg>
    );
  }

  // 3. PPU Modules
  if (moduleId === 'ppu-mod-1') {
    // Semantik & Morfologi: Makna Kata & Afiksasi
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="10" width="30" height="28" rx="4" fill="rgba(2, 132, 199, 0.18)" stroke="#00F2FE" strokeWidth="2" />
        <path d="M15 17H27M15 23H33M15 29H24" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
        <g transform="translate(24, 20)">
          <circle cx="10" cy="10" r="7.5" fill="#F59E0B" />
          <text x="10" y="13.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">A=B</text>
        </g>
      </svg>
    );
  }

  if (moduleId === 'ppu-mod-2') {
    // Sintaksis: Frasa, Klausa & Pola Kalimat (S-P-O-K)
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="32" height="14" rx="3" fill="rgba(99, 102, 241, 0.18)" stroke="#818CF8" strokeWidth="1.8" />
        <text x="24" y="22" fill="#E0E7FF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S - P - O - K</text>
        <path d="M16 26V33H22M32 26V33H26" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="35" r="3" fill="#10B981" />
      </svg>
    );
  }

  if (moduleId === 'ppu-mod-3') {
    // Analisis Wacana & Pragmatik: Article & Critical reading
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="28" height="32" rx="3" fill="rgba(148, 163, 184, 0.15)" stroke="#94A3B8" strokeWidth="2" />
        <rect x="14" y="12" width="12" height="8" rx="1.5" fill="rgba(148, 163, 184, 0.3)" />
        <line x1="28" y1="14" x2="34" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="18" x2="34" y2="18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="24" x2="34" y2="24" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="28" x2="34" y2="28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(23, 23)">
          <circle cx="9" cy="9" r="7.5" fill="#3B82F6" />
          <path d="M9 5V8M9 10V11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (moduleId === 'ppu-mod-4') {
    // Kriptografi & Bahasa Panda: Panda face & Cipher lock
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Panda head */}
        <circle cx="24" cy="24" r="14" fill="rgba(248, 250, 252, 0.85)" stroke="#0F172A" strokeWidth="2.5" />
        {/* Ears */}
        <circle cx="13" cy="13" r="4.5" fill="#0F172A" />
        <circle cx="35" cy="13" r="4.5" fill="#0F172A" />
        {/* Eye patches */}
        <ellipse cx="18" cy="22" rx="3.5" ry="4.5" fill="#0F172A" transform="rotate(-15 18 22)" />
        <ellipse cx="30" cy="22" rx="3.5" ry="4.5" fill="#0F172A" transform="rotate(15 30 22)" />
        <circle cx="19" cy="21" r="1.3" fill="#FFFFFF" />
        <circle cx="29" cy="21" r="1.3" fill="#FFFFFF" />
        {/* Nose */}
        <ellipse cx="24" cy="28" rx="2.5" ry="1.8" fill="#0F172A" />
        {/* Lock keyhole badge */}
        <g transform="translate(27, 26)">
          <rect width="14" height="12" rx="3" fill="#F59E0B" />
          <circle cx="7" cy="5" r="1.5" fill="#78350F" />
          <line x1="7" y1="5.5" x2="7" y2="9" stroke="#78350F" strokeWidth="1.2" />
        </g>
      </svg>
    );
  }

  // 4. PBM Modules
  if (moduleId === 'pbm-mod-1') {
    // Kaidah Ejaan & Tata Tulis (EYD V)
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="28" rx="6" fill="rgba(244, 63, 94, 0.18)" stroke="#F43F5E" strokeWidth="2" />
        <text x="18" y="28" fill="#FDA4AF" fontSize="16" fontWeight="bold" fontFamily="serif">A</text>
        <g transform="translate(26, 15)">
          <circle cx="7" cy="7" r="6.5" fill="#F43F5E" />
          <text x="7" y="11" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">!</text>
        </g>
        <circle cx="26" cy="31" r="2" fill="#F43F5E" />
      </svg>
    );
  }

  if (moduleId === 'pbm-mod-2') {
    // Diksi, Kata Baku & Konjungsi
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="28" height="32" rx="4" fill="rgba(168, 85, 247, 0.18)" stroke="#C084FC" strokeWidth="2" />
        <path d="M15 15H25M15 21H31M15 27H23" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(22, 22)">
          <rect width="18" height="14" rx="3.5" fill="#10B981" />
          <path d="M4 7L7 10L14 3" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }

  if (moduleId === 'pbm-mod-3') {
    // Kalimat Efektif & Penyuntingan: Pencil & Editing text
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="28" x2="26" y2="28" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="35" x2="38" y2="35" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        {/* Diagonal Pencil */}
        <g transform="translate(16, 8) rotate(35)">
          <rect x="0" y="0" width="7" height="22" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
          <polygon points="0,22 3.5,28 7,22" fill="#FEF3C7" />
          <polygon points="2,25.5 3.5,28 5,25.5" fill="#1E293B" />
        </g>
      </svg>
    );
  }

  if (moduleId === 'pbm-mod-4') {
    // Konstruksi & Kepaduan Paragraf: Jigsaw Puzzle Paragraph
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="13" height="13" rx="2" fill="#F43F5E" />
        <rect x="25" y="10" width="13" height="13" rx="2" fill="#FB7185" />
        <rect x="10" y="25" width="13" height="13" rx="2" fill="#FDA4AF" />
        <rect x="25" y="25" width="13" height="13" rx="2" fill="#E11D48" />
        <path d="M16 10V14M22 10V14M10 16H14M10 22H14" stroke="#FFE4E6" strokeWidth="1.5" />
      </svg>
    );
  }

  // 5. LBI Modules
  if (moduleId === 'lbi-mod-1') {
    // Pemahaman Tekstual: Indonesian Book & Reading
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="28" rx="4" fill="rgba(255, 255, 255, 0.9)" stroke="#DC2626" strokeWidth="2" />
        <path d="M9 11H39V20H9V11Z" fill="#EF4444" />
        <line x1="14" y1="26" x2="34" y2="26" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="31" x2="26" y2="31" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (moduleId === 'lbi-mod-2') {
    // Penalaran Inferensial: Lightbulb & Insight
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="11" fill="rgba(254, 240, 138, 0.2)" stroke="#F59E0B" strokeWidth="2" />
        <path d="M19 28H29M21 32H27M22 35H26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 13V17M20 19L24 17L28 19" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (moduleId === 'lbi-mod-3') {
    // Evaluasi Kritis: Analytical Balance Scale
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="10" x2="24" y2="38" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="16" x2="36" y2="16" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left pan */}
        <path d="M12 16L8 26H16L12 16Z" fill="rgba(56, 189, 248, 0.25)" stroke="#0284C7" strokeWidth="1.5" />
        {/* Right pan */}
        <path d="M36 16L32 26H40L36 16Z" fill="rgba(249, 115, 22, 0.25)" stroke="#EA580C" strokeWidth="1.5" />
        <circle cx="24" cy="16" r="3" fill="#38BDF8" />
      </svg>
    );
  }

  if (moduleId === 'lbi-mod-4') {
    // Literasi Kontekstual: Scientific/Literary Scroll
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C12 9.79 13.79 8 16 8H34C36.21 8 38 9.79 38 12V34C38 36.21 36.21 38 34 38H16C13.79 38 12 36.21 12 34V12Z" fill="rgba(99, 102, 241, 0.15)" stroke="#818CF8" strokeWidth="2" />
        <line x1="18" y1="16" x2="32" y2="16" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="22" x2="32" y2="22" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="28" x2="26" y2="28" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="31" cy="29" r="3" fill="#10B981" />
      </svg>
    );
  }

  // 6. LBE Modules
  if (moduleId === 'lbe-mod-1') {
    // Global Comprehension: Globe + Document
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="24" r="13" fill="#1E3A8A" />
        <ellipse cx="22" cy="24" rx="6" ry="13" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="9" y1="24" x2="35" y2="24" stroke="#60A5FA" strokeWidth="1.2" />
        <g transform="translate(25, 12)">
          <rect width="16" height="14" rx="3" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="8" y="10" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EN</text>
        </g>
      </svg>
    );
  }

  if (moduleId === 'lbe-mod-2') {
    // Detailed Information: Vocabulary & Reference
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="28" height="28" rx="5" fill="rgba(147, 51, 234, 0.15)" stroke="#A855F7" strokeWidth="2" />
        <text x="18" y="26" fill="#C084FC" fontSize="13" fontWeight="bold" fontFamily="sans-serif">A</text>
        <path d="M24 24L26 21L28 24" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <text x="31" y="26" fill="#C084FC" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Z</text>
        <line x1="14" y1="31" x2="34" y2="31" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (moduleId === 'lbe-mod-3') {
    // Critical Reading: Inference & Author Attitude
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="22" r="11" fill="rgba(99, 102, 241, 0.18)" stroke="#6366F1" strokeWidth="2" />
        <circle cx="17" cy="20" r="1.5" fill="#818CF8" />
        <circle cx="23" cy="20" r="1.5" fill="#818CF8" />
        <path d="M17 25C18.5 27 21.5 27 23 25" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
        <g transform="translate(24, 20)">
          <circle cx="9" cy="9" r="8" fill="#EC4899" />
          <text x="9" y="12.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">💡</text>
        </g>
      </svg>
    );
  }

  if (moduleId === 'lbe-mod-4') {
    // Multi-Text Synthesis: Dual Thread Link
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="16" height="20" rx="3" fill="rgba(2, 132, 199, 0.18)" stroke="#0284C7" strokeWidth="1.8" />
        <rect x="24" y="18" width="16" height="20" rx="3" fill="rgba(245, 158, 11, 0.18)" stroke="#D97706" strokeWidth="1.8" />
        <path d="M19 20H29M24 16V24" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 7. PM Modules
  if (moduleId === 'pm-mod-1') {
    // Numerasi Terapan: Aritmetika Sosial & Proporsi
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="22" r="11" fill="rgba(22, 163, 74, 0.18)" stroke="#16A34A" strokeWidth="2" />
        <text x="20" y="26" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Rp</text>
        <g transform="translate(24, 20)">
          <rect width="16" height="13" rx="3" fill="#F59E0B" />
          <text x="8" y="9.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">%</text>
        </g>
      </svg>
    );
  }

  if (moduleId === 'pm-mod-2') {
    // Pemodelan Aljabar & Barisan Kontekstual: Parabola Curve
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="8" y1="36" x2="38" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="40" x2="12" y2="10" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 34C18 16 30 16 37 34" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="18" r="2.5" fill="#EF4444" />
      </svg>
    );
  }

  if (moduleId === 'pm-mod-3') {
    // Geometri & Pengukuran Terapan: Ruler & Triangle
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 36L10 12L36 36H10Z" fill="rgba(245, 158, 11, 0.18)" stroke="#F59E0B" strokeWidth="2" />
        <line x1="10" y1="18" x2="13" y2="18" stroke="#D97706" strokeWidth="1.5" />
        <line x1="10" y1="24" x2="14" y2="24" stroke="#D97706" strokeWidth="1.5" />
        <line x1="10" y1="30" x2="13" y2="30" stroke="#D97706" strokeWidth="1.5" />
        <line x1="18" y1="36" x2="18" y2="33" stroke="#D97706" strokeWidth="1.5" />
        <line x1="24" y1="36" x2="24" y2="32" stroke="#D97706" strokeWidth="1.5" />
      </svg>
    );
  }

  if (moduleId === 'pm-mod-4') {
    // Analisis Data & Peluang Terapan: Data & Spinner
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" fill="rgba(16, 185, 129, 0.18)" stroke="#10B981" strokeWidth="2" />
        <path d="M24 10V24L34 34" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 24L14 30" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="#EF4444" />
      </svg>
    );
  }

  // Default Fallback Icon
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="28" height="32" rx="4" fill="rgba(99, 102, 241, 0.15)" stroke="#6366F1" strokeWidth="2" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="23" x2="28" y2="23" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="30" x2="24" y2="30" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
