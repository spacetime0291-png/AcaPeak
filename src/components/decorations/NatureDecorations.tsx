import React from 'react';

/**
 * Top Header Banner Illustrations for Light Mode (Alam & Edu Ceria)
 * Contains pastel leaves, soft flowers, flying open book, paper airplane, and pastel clouds.
 */
export const NatureHeaderBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top Left: Lush pastel eucalyptus foliage & soft flowers */}
      <svg
        className="absolute -top-3 -left-3 w-44 sm:w-64 h-36 sm:h-48 opacity-90 transition-opacity"
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Vine 1 */}
        <path
          d="M-10 10C30 20 70 65 95 110"
          stroke="#86EFAC"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Leaves on Vine 1 */}
        <ellipse cx="28" cy="18" rx="10" ry="16" fill="#BBF7D0" transform="rotate(-35 28 18)" opacity="0.85" />
        <ellipse cx="58" cy="42" rx="9" ry="14" fill="#A7F3D0" transform="rotate(-15 58 42)" opacity="0.9" />
        <ellipse cx="80" cy="78" rx="8" ry="13" fill="#6EE7B7" transform="rotate(25 80 78)" opacity="0.8" />
        <ellipse cx="96" cy="112" rx="7" ry="11" fill="#86EFAC" transform="rotate(45 96 112)" opacity="0.75" />

        {/* Soft Vine 2 */}
        <path
          d="M10 -10C45 35 110 50 160 65"
          stroke="#A7F3D0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Leaves on Vine 2 */}
        <ellipse cx="40" cy="12" rx="12" ry="7" fill="#6EE7B7" transform="rotate(15 40 12)" opacity="0.75" />
        <ellipse cx="85" cy="38" rx="11" ry="6" fill="#BBF7D0" transform="rotate(25 85 38)" opacity="0.85" />
        <ellipse cx="130" cy="54" rx="9" ry="6" fill="#A7F3D0" transform="rotate(20 130 54)" opacity="0.8" />

        {/* Soft Peach/Pink Blossom 1 */}
        <g transform="translate(105, 30)">
          <circle cx="0" cy="-7" r="6" fill="#FECDD3" opacity="0.9" />
          <circle cx="7" cy="-2" r="6" fill="#FECDD3" opacity="0.9" />
          <circle cx="4" cy="6" r="6" fill="#FECDD3" opacity="0.9" />
          <circle cx="-5" cy="5" r="6" fill="#FECDD3" opacity="0.9" />
          <circle cx="-7" cy="-3" r="6" fill="#FECDD3" opacity="0.9" />
          <circle cx="0" cy="0" r="4.5" fill="#FDE047" />
        </g>

        {/* Tiny Pink Blossom 2 */}
        <g transform="translate(45, 68)">
          <circle cx="0" cy="-5" r="4" fill="#FBCFE8" opacity="0.9" />
          <circle cx="5" cy="-1" r="4" fill="#FBCFE8" opacity="0.9" />
          <circle cx="3" cy="5" r="4" fill="#FBCFE8" opacity="0.9" />
          <circle cx="-4" cy="4" r="4" fill="#FBCFE8" opacity="0.9" />
          <circle cx="-5" cy="-2" r="4" fill="#FBCFE8" opacity="0.9" />
          <circle cx="0" cy="0" r="3" fill="#FED7AA" />
        </g>
      </svg>

      {/* Middle Top: Flying open book & paper airplane */}
      <svg
        className="hidden md:block absolute top-2 left-1/3 w-36 h-20 opacity-80"
        viewBox="0 0 140 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flying Open Book */}
        <g transform="translate(15, 15) rotate(-12)">
          {/* Left page */}
          <path
            d="M20 25C13 22 5 22 0 25V7C5 4 13 4 20 7V25Z"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          {/* Right page */}
          <path
            d="M20 25C27 22 35 22 40 25V7C35 4 27 4 20 7V25Z"
            fill="#FFFBEB"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          {/* Spine bookmark */}
          <path d="M20 7V28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 12H15M5 16H13" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />
          <path d="M25 12H35M25 16H32" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Paper Airplane with dotted flight trail */}
        <g transform="translate(85, 12)">
          <path
            d="M-20 25C-10 25 -5 15 5 10"
            stroke="#93C5FD"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
          <path
            d="M25 0L5 15L12 18L15 25L18 19L25 0Z"
            fill="#BAE6FD"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M12 18L25 0" stroke="#0284C7" strokeWidth="0.8" />
        </g>
      </svg>

      {/* Top Right: Cute pastel fluffy clouds with soft gradient */}
      <svg
        className="absolute -top-3 -right-3 w-40 sm:w-56 h-28 sm:h-36 opacity-90 transition-opacity"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cloud 1 (Soft Lilac / Pink) */}
        <path
          d="M130 50C130 42 124 35 116 35C114 35 112 36 110 37C106 30 98 25 90 25C79 25 70 34 70 45C63 46 58 52 58 59C58 67 64 73 72 73H130C137 73 142 67 142 60C142 54 137 50 130 50Z"
          fill="#EDE9FE"
          opacity="0.85"
        />
        {/* Cloud 2 (Soft Sky Blue foreground) */}
        <path
          d="M185 70C185 62 179 55 171 55C169 55 167 56 165 57C161 50 153 45 145 45C134 45 125 54 125 65C118 66 113 72 113 79C113 87 119 93 127 93H185C192 93 198 87 198 80C198 74 192 70 185 70Z"
          fill="#E0F2FE"
          opacity="0.9"
        />
        {/* Little floating stars/sparkles in light pastel */}
        <circle cx="80" cy="18" r="2.5" fill="#FDE047" opacity="0.8" />
        <circle cx="150" cy="28" r="2" fill="#F472B6" opacity="0.8" />
        <circle cx="65" cy="85" r="2" fill="#38BDF8" opacity="0.8" />
      </svg>
    </div>
  );
};

/**
 * Whimsical Pastel Rainbow Arc for the Subtitle in Light Mode
 */
export const NatureRainbowArc: React.FC = () => {
  return (
    <svg
      className="absolute -top-4 right-0 w-32 sm:w-48 h-16 pointer-events-none opacity-40 select-none overflow-visible"
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 45C40 10 110 10 150 45"
        stroke="#F472B6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 47C45 18 105 18 142 47"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 49C50 26 100 26 134 49"
        stroke="#34D399"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 51C55 34 95 34 126 51"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Adorable potted succulent/plant for card corners in Light Mode
 */
export const PottedPlantDecor: React.FC<{ position?: 'bottom-left' | 'bottom-right' | 'top-right' }> = ({
  position = 'bottom-right',
}) => {
  const posClass =
    position === 'bottom-right'
      ? '-bottom-1 -right-1'
      : position === 'bottom-left'
      ? '-bottom-1 -left-1'
      : '-top-1 -right-1';

  return (
    <div className={`absolute ${posClass} pointer-events-none select-none z-10 opacity-90 transition-transform duration-200 group-hover:scale-110`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pot */}
        <path d="M12 25L14 36H26L28 25H12Z" fill="#D97706" opacity="0.85" />
        <rect x="11" y="23" width="18" height="3" rx="1.5" fill="#B45309" />
        {/* Leaves */}
        <ellipse cx="20" cy="18" rx="4.5" ry="9" fill="#10B981" />
        <ellipse cx="14" cy="20" rx="3.5" ry="7" fill="#34D399" transform="rotate(-30 14 20)" />
        <ellipse cx="26" cy="20" rx="3.5" ry="7" fill="#34D399" transform="rotate(30 26 20)" />
        <ellipse cx="11" cy="23" rx="2.5" ry="5" fill="#059669" transform="rotate(-60 11 23)" />
        <ellipse cx="29" cy="23" rx="2.5" ry="5" fill="#059669" transform="rotate(60 29 23)" />
      </svg>
    </div>
  );
};

/**
 * Sprouting pastel leaf for card corners in Light Mode
 */
export const LeafCornerDecor: React.FC<{ position?: 'top-left' | 'top-right' }> = ({
  position = 'top-left',
}) => {
  const posClass = position === 'top-left' ? '-top-1 -left-1' : '-top-1 -right-1';
  const flipClass = position === 'top-right' ? '-scale-x-100' : '';

  return (
    <div className={`absolute ${posClass} ${flipClass} pointer-events-none select-none z-10 opacity-80`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 28C6 18 16 12 28 8C20 18 14 24 4 28Z"
          fill="#86EFAC"
          stroke="#4ADE80"
          strokeWidth="1.2"
        />
        <path d="M4 28C12 20 18 15 28 8" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" />
        <path
          d="M8 22C10 16 16 15 22 13C17 19 14 21 8 22Z"
          fill="#BBF7D0"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

/**
 * Cute dotted grid corner accent for cards in Light Mode
 */
export const DottedCornerDecor: React.FC<{ position?: 'bottom-left' | 'top-right' | 'bottom-right' }> = ({
  position = 'bottom-left',
}) => {
  const posClass =
    position === 'bottom-left'
      ? 'bottom-2 left-2'
      : position === 'top-right'
      ? 'top-2 right-2'
      : 'bottom-2 right-2';

  return (
    <div className={`absolute ${posClass} pointer-events-none select-none opacity-40 z-0`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400">
        <circle cx="3" cy="3" r="1.5" />
        <circle cx="10" cy="3" r="1.5" />
        <circle cx="17" cy="3" r="1.5" />
        <circle cx="3" cy="10" r="1.5" />
        <circle cx="10" cy="10" r="1.5" />
        <circle cx="17" cy="10" r="1.5" />
        <circle cx="3" cy="17" r="1.5" />
        <circle cx="10" cy="17" r="1.5" />
        <circle cx="17" cy="17" r="1.5" />
      </svg>
    </div>
  );
};

/**
 * Subtle watermark foliage accent for Focus view top headers in Light Mode (opacity: 0.18 - 0.25)
 */
export const NatureFocusHeaderAccent: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-48 overflow-hidden pointer-events-none select-none z-0 opacity-20">
      <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M40 0C60 20 110 30 160 35" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="65" cy="14" rx="10" ry="6" fill="#34D399" transform="rotate(20 65 14)" />
        <ellipse cx="105" cy="22" rx="9" ry="5" fill="#10B981" transform="rotate(15 105 22)" />
        <ellipse cx="140" cy="30" rx="8" ry="5" fill="#059669" transform="rotate(10 140 30)" />
      </svg>
    </div>
  );
};
