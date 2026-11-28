import React from 'react';

/**
 * Velvet Dusk Header Banner (Merah Gelap / Plum-Burgundy)
 * Thin crescent moon, soft mauve layered clouds, and delicate floating petals.
 */
export const VelvetHeaderBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top Right: Crescent Moon + Soft Mauve Clouds + Petals */}
      <svg
        className="absolute -top-2 right-2 sm:right-6 w-64 sm:w-80 h-28 sm:h-32 opacity-90"
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="velvetMoonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5B041" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF8A6B" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="velvetCloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D3B56" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B1D2E" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="velvetCloudGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#864863" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A2338" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Soft Mauve Cloud 1 (Background) */}
        <path
          d="M175 68C175 60 169 53 161 53C159 53 156 54 154 55C150 47 141 42 132 42C120 42 110 52 110 64C103 65 97 71 97 79C97 87 104 94 113 94H175C183 94 189 87 189 79C189 72 183 68 175 68Z"
          fill="url(#velvetCloudGrad1)"
        />

        {/* Soft Mauve Cloud 2 (Foreground Right) */}
        <path
          d="M308 76C308 66 300 58 290 58C287 58 284 59 282 60C277 50 266 44 255 44C240 44 228 56 228 71C219 72 212 79 212 88C212 98 220 106 230 106H308C316 106 322 98 322 90C322 82 316 76 308 76Z"
          fill="url(#velvetCloudGrad2)"
        />

        {/* Thin Crescent Moon Outline */}
        <path
          d="M196 14C185 16 177 26 177 38C177 51 188 62 201 62C207 62 213 59 217 55C211 58 204 58 198 54C189 49 186 38 190 29C192 23 194 18 196 14Z"
          stroke="url(#velvetMoonStroke)"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle 4-Point Warm Stars */}
        <path d="M138 22L139.5 26.5L144 28L139.5 29.5L138 34L136.5 29.5L132 28L136.5 26.5Z" fill="#FFBE98" opacity="0.5" />
        <path d="M236 26L237 29L240 30L237 31L236 34L235 31L232 30L235 29Z" fill="#F5B041" opacity="0.45" />
        <circle cx="105" cy="30" r="1.4" fill="#F4A5AE" opacity="0.45" />
        <circle cx="255" cy="18" r="1.2" fill="#FFBE98" opacity="0.4" />

        {/* Delicate Floating Petal */}
        <path
          d="M84 48C89 45 95 48 94 54C93 58 87 58 84 54C82 52 82 49 84 48Z"
          fill="#FF8A6B"
          opacity="0.28"
        />
      </svg>

      {/* Top Left: Very faint petal & arc */}
      <svg
        className="hidden sm:block absolute -top-2 -left-2 w-40 h-24 opacity-40"
        viewBox="0 0 160 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-5 55C28 45 58 25 82 -5"
          stroke="#C9A9B0"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <path
          d="M28 24C34 21 40 24 39 30C38 34 32 34 28 30C26 28 26 25 28 24Z"
          fill="#EB8A78"
          opacity="0.35"
        />
      </svg>
    </div>
  );
};

/**
 * Subtle Header Watermark for Focus / Reader / Detail Views in Velvet Dusk
 */
export const VelvetFocusHeaderAccent: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-48 overflow-hidden pointer-events-none select-none z-0 opacity-15">
      <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M116 14C109 16 104 22 104 29C104 37 111 44 119 44C123 44 126 42 129 40C125 42 120 41 117 39C111 36 109 29 112 23C113 19 115 16 116 14Z"
          stroke="#F5B041"
          strokeWidth="1.3"
        />
        <path d="M72 48C88 46 112 52 142 66" stroke="#EB8A78" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="86" cy="49" rx="6" ry="3.5" fill="#FF8A6B" fillOpacity="0.45" transform="rotate(-15 86 49)" />
        <ellipse cx="136" cy="22" rx="4" ry="2.2" fill="#F4A5AE" fillOpacity="0.4" transform="rotate(28 136 22)" />
      </svg>
    </div>
  );
};

/**
 * Full-Screen Ambient Background for Velvet Dusk (Plum-Burgundy Warm Night)
 */
export const VelvetDecorationsBg: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Subtle Warm Burgundy/Plum Ambient Glows */}
      <div className="absolute -top-36 -left-36 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#521e3b]/30 via-[#2b1024]/20 to-transparent blur-[100px]" />
      <div className="absolute -top-24 -right-28 w-[460px] h-[460px] rounded-full bg-gradient-to-bl from-[#6e2d3f]/25 via-[#311326]/20 to-transparent blur-[95px]" />
      <div className="absolute bottom-10 -left-28 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#4b1a36]/25 via-[#240e1f]/15 to-transparent blur-[100px]" />
      <div className="absolute -bottom-32 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#70303b]/20 via-[#2a1122]/15 to-transparent blur-[100px]" />

      {/* Faint Scattered Petals, Crescent Orbits & Micro-Stars */}
      <svg
        className="w-full h-full opacity-55"
        viewBox="0 0 800 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle Orbital Arcs */}
        <g stroke="rgba(235, 138, 120, 0.12)" strokeWidth="1">
          <ellipse cx="720" cy="140" rx="180" ry="165" strokeDasharray="5 6" />
          <ellipse cx="720" cy="140" rx="310" ry="290" />
          <ellipse cx="80" cy="960" rx="220" ry="200" strokeDasharray="4 6" />
          <ellipse cx="80" cy="960" rx="370" ry="340" />
        </g>

        {/* Scattered Thin Petals */}
        <g fill="#FF8A6B" fillOpacity="0.22">
          <path d="M32 390C39 385 48 390 46 398C44 404 35 404 31 398C29 395 30 391 32 390Z" transform="rotate(-18 38 395)" />
          <path d="M752 440C759 435 768 440 766 448C764 454 755 454 751 448C749 445 750 441 752 440Z" transform="rotate(24 758 445)" />
          <path d="M560 355C566 351 574 355 572 362C570 367 562 367 559 362C557 359 558 356 560 355Z" transform="rotate(-32 565 359)" />
          <path d="M22 690C28 686 36 690 34 697C32 702 24 702 21 697C19 694 20 691 22 690Z" transform="rotate(15 27 694)" />
          <path d="M768 740C775 735 783 740 781 748C779 753 771 753 767 748C765 745 766 741 768 740Z" transform="rotate(-22 774 744)" />
          <path d="M120 1080C127 1075 135 1080 133 1088C131 1093 123 1093 119 1088C117 1085 118 1081 120 1080Z" transform="rotate(30 126 1084)" />
        </g>

        {/* Very Faint 4-Point Warm Stars */}
        <g fill="#FFBE98" fillOpacity="0.3">
          <path d="M70 250L71.8 255.2L77 257L71.8 258.8L70 264L68.2 258.8L63 257L68.2 255.2Z" />
          <path d="M725 320L726.5 324.5L731 326L726.5 327.5L725 332L723.5 327.5L719 326L723.5 324.5Z" />
          <path d="M695 890L696.8 895.2L702 897L696.8 898.8L695 904L693.2 898.8L688 897L693.2 895.2Z" />
          <path d="M95 820L96.5 824.5L101 826L96.5 827.5L95 832L93.5 827.5L89 826L93.5 824.5Z" />
        </g>

        {/* Micro Dots */}
        <circle cx="140" cy="180" r="1.3" fill="#F5B041" opacity="0.3" />
        <circle cx="640" cy="240" r="1.4" fill="#FFBE98" opacity="0.28" />
        <circle cx="740" cy="590" r="1.2" fill="#F4A5AE" opacity="0.3" />
        <circle cx="60" cy="560" r="1.4" fill="#FFBE98" opacity="0.26" />
        <circle cx="480" cy="1130" r="1.4" fill="#F5B041" opacity="0.25" />
      </svg>
    </div>
  );
};

/**
 * Minimalist Corner Leaf/Petal & Dot-Grid Accent for Velvet Subtest Cards
 */
export const VelvetCardCornerDecor: React.FC<{ variant?: 'leaf-dots' | 'leaf-lotus' | 'dots-lotus' }> = ({
  variant = 'leaf-dots',
}) => {
  return (
    <>
      {/* Top-Left / Top-Right Subtle Coral Leaf Vein */}
      {(variant === 'leaf-dots' || variant === 'leaf-lotus') && (
        <div className="absolute top-1.5 left-1.5 pointer-events-none select-none opacity-65 z-0">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22C7 13 14 7 23 4C18 14 12 19 4 22Z" fill="#783442" fillOpacity="0.85" stroke="#EB8A78" strokeOpacity="0.65" strokeWidth="1" />
            <path d="M4 22C10 15 16 10 23 4" stroke="#FF8A6B" strokeOpacity="0.7" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Subtle Dot-Grid */}
      {(variant === 'leaf-dots' || variant === 'dots-lotus') && (
        <div className={`absolute ${variant === 'dots-lotus' ? 'top-2.5 right-2.5' : 'bottom-2.5 left-2.5'} pointer-events-none select-none opacity-30 z-0`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#C9A9B0">
            <circle cx="4" cy="4" r="1.4" />
            <circle cx="11" cy="4" r="1.4" />
            <circle cx="18" cy="4" r="1.4" />
            <circle cx="4" cy="11" r="1.4" />
            <circle cx="11" cy="11" r="1.4" />
            <circle cx="18" cy="11" r="1.4" />
            <circle cx="4" cy="18" r="1.4" />
            <circle cx="11" cy="18" r="1.4" />
            <circle cx="18" cy="18" r="1.4" />
          </svg>
        </div>
      )}

      {/* Bottom-Right Delicate 3-Petal Blossom */}
      {(variant === 'leaf-lotus' || variant === 'dots-lotus') && (
        <div className="absolute bottom-1.5 right-1.5 pointer-events-none select-none opacity-60 z-0">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="14" cy="13" rx="3.2" ry="7.5" fill="#D95370" fillOpacity="0.85" />
            <ellipse cx="9.5" cy="15.5" rx="2.8" ry="6" fill="#EB8A78" fillOpacity="0.7" transform="rotate(-32 9.5 15.5)" />
            <ellipse cx="18.5" cy="15.5" rx="2.8" ry="6" fill="#EB8A78" fillOpacity="0.7" transform="rotate(32 18.5 15.5)" />
          </svg>
        </div>
      )}
    </>
  );
};
