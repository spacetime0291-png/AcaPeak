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

/**
 * Full Immersive Background for Light Mode (Alam & Edu Ceria)
 * Equivalent to CosmicStarsBg & CosmicNebulaGlow in Dark Mode.
 * Contains lush pastel foliage vines, cheerful floral blossoms, fluffy pastel clouds,
 * flying educational doodles (paper airplane, storybook, pencil), concentric pastel rainbow waves,
 * floating pastel sparkles, and warm organic ambient blurs.
 */
export const NatureDecorationsBg: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Soft Organic Ambient Glow Clusters */}
      <div className="absolute -top-32 -left-32 w-[540px] h-[540px] rounded-full bg-gradient-to-br from-rose-200/35 via-pink-100/25 to-transparent blur-3xl" />
      <div className="absolute top-1/4 -right-36 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-teal-200/30 via-emerald-100/25 to-transparent blur-3xl" />
      <div className="absolute top-2/3 -left-28 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-amber-200/25 via-orange-100/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-36 right-1/4 w-[540px] h-[540px] rounded-full bg-gradient-to-tl from-sky-200/35 via-indigo-100/20 to-transparent blur-3xl" />

      {/* 2. Full-Screen Decorative SVG Wallpaper */}
      <svg
        className="w-full h-full opacity-85"
        viewBox="0 0 800 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rainbowVineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="paperPlaneTrail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* =================================================================
            A. CONCENTRIC PASTEL RAINBOW WAVES / RIPPLES (Senada Cyber Wave Gelap)
            ================================================================= */}
        {/* Upper-Right Ripple Center (cx: 720, cy: 180) */}
        <g strokeWidth="1.2">
          <ellipse cx="730" cy="180" rx="90" ry="85" stroke="#F472B6" strokeOpacity="0.3" strokeDasharray="6 4" />
          <ellipse cx="730" cy="180" rx="170" ry="160" stroke="#FBBF24" strokeOpacity="0.32" />
          <ellipse cx="730" cy="180" rx="260" ry="245" stroke="#34D399" strokeOpacity="0.28" strokeDasharray="4 4" />
          <ellipse cx="730" cy="180" rx="360" ry="340" stroke="#38BDF8" strokeOpacity="0.28" />
          <ellipse cx="730" cy="180" rx="470" ry="445" stroke="#A78BFA" strokeOpacity="0.24" strokeDasharray="8 6" />
          <ellipse cx="730" cy="180" rx="590" ry="560" stroke="#F472B6" strokeOpacity="0.2" />
        </g>

        {/* Lower-Left Ripple Center (cx: 70, cy: 960) */}
        <g strokeWidth="1.1">
          <ellipse cx="70" cy="960" rx="110" ry="100" stroke="#34D399" strokeOpacity="0.3" />
          <ellipse cx="70" cy="960" rx="200" ry="185" stroke="#38BDF8" strokeOpacity="0.28" strokeDasharray="5 5" />
          <ellipse cx="70" cy="960" rx="310" ry="285" stroke="#FBBF24" strokeOpacity="0.26" />
          <ellipse cx="70" cy="960" rx="440" ry="410" stroke="#F472B6" strokeOpacity="0.22" strokeDasharray="6 6" />
          <ellipse cx="70" cy="960" rx="580" ry="540" stroke="#A78BFA" strokeOpacity="0.18" />
        </g>

        {/* =================================================================
            B. TOP-LEFT LUSH BOTANICAL FOLIAGE & PASTEL BLOSSOMS
            ================================================================= */}
        <g transform="translate(0, 0)">
          {/* Main Vine */}
          <path
            d="M-10 10C50 25 110 80 145 150C170 200 175 260 165 310"
            stroke="url(#rainbowVineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Sprouting Leaves along main vine */}
          <ellipse cx="35" cy="22" rx="12" ry="20" fill="#BBF7D0" transform="rotate(-35 35 22)" opacity="0.9" />
          <ellipse cx="75" cy="50" rx="11" ry="18" fill="#A7F3D0" transform="rotate(-15 75 50)" opacity="0.95" />
          <ellipse cx="115" cy="95" rx="11" ry="17" fill="#6EE7B7" transform="rotate(20 115 95)" opacity="0.9" />
          <ellipse cx="145" cy="148" rx="10" ry="16" fill="#86EFAC" transform="rotate(45 145 148)" opacity="0.85" />
          <ellipse cx="165" cy="205" rx="9" ry="15" fill="#BBF7D0" transform="rotate(65 165 205)" opacity="0.8" />
          <ellipse cx="170" cy="260" rx="8" ry="14" fill="#A7F3D0" transform="rotate(80 170 260)" opacity="0.75" />

          {/* Secondary Delicate Vine */}
          <path
            d="M20 -10C70 45 150 65 220 85"
            stroke="#A7F3D0"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="60" cy="16" rx="14" ry="8" fill="#6EE7B7" transform="rotate(15 60 16)" opacity="0.8" />
          <ellipse cx="120" cy="50" rx="13" ry="7" fill="#BBF7D0" transform="rotate(25 120 50)" opacity="0.85" />
          <ellipse cx="180" cy="72" rx="11" ry="7" fill="#A7F3D0" transform="rotate(20 180 72)" opacity="0.8" />

          {/* Soft Peach/Pink Blossom 1 */}
          <g transform="translate(135, 45)">
            <circle cx="0" cy="-9" r="8" fill="#FECDD3" opacity="0.95" />
            <circle cx="9" cy="-3" r="8" fill="#FECDD3" opacity="0.95" />
            <circle cx="6" cy="8" r="8" fill="#FECDD3" opacity="0.95" />
            <circle cx="-6" cy="7" r="8" fill="#FECDD3" opacity="0.95" />
            <circle cx="-9" cy="-4" r="8" fill="#FECDD3" opacity="0.95" />
            <circle cx="0" cy="0" r="6" fill="#FDE047" />
          </g>

          {/* Soft Lavender Blossom 2 */}
          <g transform="translate(60, 95)">
            <circle cx="0" cy="-7" r="6" fill="#DDD6FE" opacity="0.9" />
            <circle cx="7" cy="-2" r="6" fill="#DDD6FE" opacity="0.9" />
            <circle cx="4" cy="6" r="6" fill="#DDD6FE" opacity="0.9" />
            <circle cx="-5" cy="5" r="6" fill="#DDD6FE" opacity="0.9" />
            <circle cx="-7" cy="-3" r="6" fill="#DDD6FE" opacity="0.9" />
            <circle cx="0" cy="0" r="4.5" fill="#FED7AA" />
          </g>

          {/* Tiny Coral Blossom 3 */}
          <g transform="translate(155, 185)">
            <circle cx="0" cy="-5" r="4.5" fill="#FBCFE8" opacity="0.9" />
            <circle cx="5" cy="-1" r="4.5" fill="#FBCFE8" opacity="0.9" />
            <circle cx="3" cy="5" r="4.5" fill="#FBCFE8" opacity="0.9" />
            <circle cx="-4" cy="4" r="4.5" fill="#FBCFE8" opacity="0.9" />
            <circle cx="-5" cy="-2" r="4.5" fill="#FBCFE8" opacity="0.9" />
            <circle cx="0" cy="0" r="3" fill="#FDE047" />
          </g>
        </g>

        {/* =================================================================
            C. TOP-RIGHT PASTEL CLOUDS & HANGING VINE
            ================================================================= */}
        <g transform="translate(620, 20)">
          {/* Cloud 1 (Soft Lilac) */}
          <path
            d="M120 40C120 30 112 22 102 22C100 22 97 23 95 24C90 15 80 9 70 9C56 9 45 20 45 34C36 35 30 42 30 51C30 61 38 68 48 68H120C129 68 135 60 135 52C135 44 129 40 120 40Z"
            fill="#EDE9FE"
            opacity="0.85"
          />
          {/* Cloud 2 (Soft Sky Blue) */}
          <path
            d="M165 65C165 55 158 47 148 47C146 47 143 48 141 49C136 40 126 34 116 34C102 34 91 45 91 59C82 60 76 67 76 76C76 86 84 93 94 93H165C174 93 180 85 180 77C180 69 174 65 165 65Z"
            fill="#E0F2FE"
            opacity="0.9"
          />

          {/* Hanging Botanical Vine on Right Margin */}
          <path
            d="M160 90C150 140 140 190 155 240C165 280 180 320 170 360"
            stroke="#86EFAC"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="152" cy="115" rx="7" ry="12" fill="#BBF7D0" transform="rotate(-20 152 115)" opacity="0.85" />
          <ellipse cx="145" cy="165" rx="7" ry="13" fill="#A7F3D0" transform="rotate(25 145 165)" opacity="0.9" />
          <ellipse cx="148" cy="215" rx="6" ry="11" fill="#6EE7B7" transform="rotate(-15 148 215)" opacity="0.8" />
          <ellipse cx="165" cy="265" rx="7" ry="12" fill="#BBF7D0" transform="rotate(30 165 265)" opacity="0.85" />
          <ellipse cx="175" cy="315" rx="6" ry="10" fill="#A7F3D0" transform="rotate(-10 175 315)" opacity="0.75" />

          {/* Small Coral Blossom on Vine */}
          <g transform="translate(150, 190)">
            <circle cx="0" cy="-6" r="5" fill="#FECDD3" opacity="0.9" />
            <circle cx="6" cy="-2" r="5" fill="#FECDD3" opacity="0.9" />
            <circle cx="4" cy="5" r="5" fill="#FECDD3" opacity="0.9" />
            <circle cx="-4" cy="4" r="5" fill="#FECDD3" opacity="0.9" />
            <circle cx="-6" cy="-2" r="5" fill="#FECDD3" opacity="0.9" />
            <circle cx="0" cy="0" r="3.5" fill="#FDE047" />
          </g>
        </g>

        {/* =================================================================
            D. FLYING PAPER AIRPLANE WITH LOOP TRAIL (Upper Mid)
            ================================================================= */}
        <g transform="translate(480, 160)">
          {/* Looping Dotted Flight Trail */}
          <path
            d="M-120 70C-70 70 -30 20 20 40C60 55 60 100 10 90C-30 80 10 0 70 -20"
            stroke="url(#paperPlaneTrail)"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Paper Airplane */}
          <g transform="translate(70, -20) rotate(18)">
            <path
              d="M30 0L5 18L14 22L18 30L22 23L30 0Z"
              fill="#BAE6FD"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M14 22L30 0" stroke="#0284C7" strokeWidth="1" />
          </g>
        </g>

        {/* =================================================================
            E. FLOATING OPEN STORYBOOK DOODLE (Mid-Left)
            ================================================================= */}
        <g transform="translate(45, 620) rotate(-10)">
          {/* Left Page */}
          <path
            d="M26 32C17 28 6 28 0 32V9C6 5 17 5 26 9V32Z"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          {/* Right Page */}
          <path
            d="M26 32C35 28 46 28 52 32V9C46 5 35 5 26 9V32Z"
            fill="#FFFBEB"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          {/* Spine ribbon */}
          <path d="M26 9V36" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          {/* Text lines */}
          <path d="M7 16H20M7 21H18M7 26H19" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M32 16H45M32 21H43M32 26H44" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* =================================================================
            F. FLOATING PENCIL DOODLE (Mid-Right)
            ================================================================= */}
        <g transform="translate(710, 680) rotate(40)">
          <rect x="0" y="0" width="8" height="28" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
          {/* Eraser */}
          <rect x="0" y="-8" width="8" height="8" rx="2" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
          {/* Tip */}
          <polygon points="0,28 4,36 8,28" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
          <polygon points="2.5,33 4,36 5.5,33" fill="#1E293B" />
        </g>

        {/* =================================================================
            G. BOTTOM BOTANICAL SPROUTS & POTTED SUCCULENT DOODLE
            ================================================================= */}
        <g transform="translate(60, 1100)">
          <path
            d="M0 60C30 40 70 30 110 35"
            stroke="#86EFAC"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="25" cy="50" rx="9" ry="14" fill="#BBF7D0" transform="rotate(-30 25 50)" opacity="0.85" />
          <ellipse cx="65" cy="38" rx="10" ry="15" fill="#A7F3D0" transform="rotate(-10 65 38)" opacity="0.9" />
          <ellipse cx="105" cy="35" rx="9" ry="13" fill="#6EE7B7" transform="rotate(15 105 35)" opacity="0.8" />
          {/* Flower */}
          <circle cx="115" cy="25" r="6" fill="#FECDD3" />
          <circle cx="115" cy="25" r="3" fill="#FDE047" />
        </g>

        {/* =================================================================
            H. 4-POINT PASTEL SPARKLES & SQUIGGLES (Scattered Throughout)
            ================================================================= */}
        {/* Golden Sparkle 1 */}
        <g transform="translate(360, 90)">
          <path d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#FBBF24" opacity="0.75" />
        </g>
        {/* Pink Sparkle 2 */}
        <g transform="translate(680, 420)">
          <path d="M0 -7L1.8 -1.8L7 0L1.8 1.8L0 7L-1.8 1.8L-7 0L-1.8 -1.8Z" fill="#F472B6" opacity="0.8" />
        </g>
        {/* Sky Blue Sparkle 3 */}
        <g transform="translate(130, 480)">
          <path d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#38BDF8" opacity="0.75" />
        </g>
        {/* Mint Sparkle 4 */}
        <g transform="translate(230, 850)">
          <path d="M0 -7L1.8 -1.8L7 0L1.8 1.8L0 7L-1.8 1.8L-7 0L-1.8 -1.8Z" fill="#34D399" opacity="0.8" />
        </g>
        {/* Golden Sparkle 5 */}
        <g transform="translate(660, 960)">
          <path d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#FBBF24" opacity="0.8" />
        </g>

        {/* Whimsical Ribbon Squiggles */}
        <path
          d="M260 220C280 200 300 240 320 220"
          stroke="#F472B6"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M600 750C620 730 640 770 660 750"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M170 1020C190 1000 210 1040 230 1020"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Floating Pastel Polka Dots */}
        <circle cx="210" cy="140" r="3" fill="#FDE047" opacity="0.7" />
        <circle cx="340" cy="320" r="2.5" fill="#F472B6" opacity="0.6" />
        <circle cx="160" cy="740" r="3.5" fill="#A78BFA" opacity="0.6" />
        <circle cx="620" cy="540" r="2.5" fill="#34D399" opacity="0.65" />
        <circle cx="730" cy="850" r="3" fill="#38BDF8" opacity="0.7" />
        <circle cx="430" cy="1150" r="2.5" fill="#FBBF24" opacity="0.6" />
      </svg>
    </div>
  );
};
