import React from 'react';

/**
 * Cosmic constellations, concentric orbital wave rings, twinkling stars, 
 * and shooting star for Dark Mode (Kosmik & Cyber)
 */
export const CosmicStarsBg: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full opacity-85"
        viewBox="0 0 800 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Shooting Star Gradient */}
          <linearGradient id="shootingStarTrail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="90%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Glow filter for bright star nodes */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================================
            1. CONCENTRIC ORBITAL WAVE RINGS (Planetary Orbits / Cyber Waves)
            ================================================================= */}
        {/* Upper-Right Orbital Center (cx: 720, cy: 180) */}
        <g stroke="rgba(99, 102, 241, 0.22)" strokeWidth="1.2">
          <ellipse cx="740" cy="160" rx="90" ry="80" strokeDasharray="6 4" />
          <ellipse cx="740" cy="160" rx="170" ry="155" />
          <ellipse cx="740" cy="160" rx="250" ry="230" stroke="rgba(0, 242, 254, 0.18)" strokeDasharray="3 4" />
          <ellipse cx="740" cy="160" rx="340" ry="310" stroke="rgba(168, 85, 247, 0.18)" />
          <ellipse cx="740" cy="160" rx="440" ry="400" />
          <ellipse cx="740" cy="160" rx="560" ry="510" stroke="rgba(99, 102, 241, 0.14)" strokeDasharray="8 6" />
          <ellipse cx="740" cy="160" rx="690" ry="630" stroke="rgba(0, 242, 254, 0.12)" />
        </g>

        {/* Lower-Left Orbital Center (cx: 60, cy: 950) */}
        <g stroke="rgba(168, 85, 247, 0.18)" strokeWidth="1">
          <ellipse cx="60" cy="950" rx="120" ry="105" />
          <ellipse cx="60" cy="950" rx="210" ry="190" stroke="rgba(0, 242, 254, 0.15)" strokeDasharray="4 4" />
          <ellipse cx="60" cy="950" rx="320" ry="290" />
          <ellipse cx="60" cy="950" rx="460" ry="420" stroke="rgba(99, 102, 241, 0.14)" />
          <ellipse cx="60" cy="950" rx="620" ry="570" strokeDasharray="6 6" />
        </g>

        {/* =================================================================
            2. TOP CONSTELLATIONS (Cassiopeia / Geometric Star Cluster)
            ================================================================= */}
        <g stroke="rgba(147, 197, 253, 0.35)" strokeWidth="1.2">
          {/* Main Top Constellation Lines */}
          <line x1="220" y1="90" x2="280" y2="70" />
          <line x1="280" y1="70" x2="340" y2="105" />
          <line x1="340" y1="105" x2="420" y2="85" />
          <line x1="420" y1="85" x2="490" y2="120" />
          <line x1="490" y1="120" x2="450" y2="155" />
          <line x1="450" y1="155" x2="380" y2="140" />
          <line x1="380" y1="140" x2="340" y2="105" />

          {/* Secondary Star Link */}
          <line x1="280" y1="70" x2="320" y2="40" strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.4)" />
          <line x1="420" y1="85" x2="520" y2="75" strokeDasharray="3 3" stroke="rgba(0, 242, 254, 0.4)" />
        </g>

        {/* Constellation Star Vertices */}
        <circle cx="220" cy="90" r="3" fill="#00f2fe" filter="url(#starGlow)" />
        <circle cx="280" cy="70" r="3.5" fill="#ffffff" filter="url(#starGlow)" />
        <circle cx="320" cy="40" r="2.5" fill="#a855f7" />
        <circle cx="340" cy="105" r="4" fill="#67e8f9" filter="url(#starGlow)" />
        <circle cx="380" cy="140" r="2.5" fill="#ffffff" />
        <circle cx="420" cy="85" r="4" fill="#a855f7" filter="url(#starGlow)" />
        <circle cx="450" cy="155" r="3" fill="#38bdf8" />
        <circle cx="490" cy="120" r="3.5" fill="#ffffff" filter="url(#starGlow)" />
        <circle cx="520" cy="75" r="2.5" fill="#00f2fe" />

        {/* =================================================================
            3. RADIANT SHOOTING STAR WITH GOLDEN TRAIL
            ================================================================= */}
        <g transform="translate(560, 360) rotate(-42)">
          {/* Luminous Tail */}
          <line x1="0" y1="0" x2="160" y2="0" stroke="url(#shootingStarTrail)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Shooting Star Head */}
          <circle cx="160" cy="0" r="4" fill="#ffffff" filter="url(#starGlow)" />
          {/* Sparkling Cross on Star Head */}
          <path d="M160 -8L160 8M152 0L168 0" stroke="#fde047" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* =================================================================
            4. 4-POINT SPARKLE STARS (GOLDEN & CYAN)
            ================================================================= */}
        {/* Sparkle 1: Near Shooting Star */}
        <g transform="translate(630, 420)">
          <path d="M0 -7L2 -2L7 0L2 2L0 7L-2 2L-7 0L-2 -2Z" fill="#FDE047" filter="url(#starGlow)" />
        </g>
        {/* Sparkle 2: Near Module Grid */}
        <g transform="translate(680, 390)">
          <path d="M0 -5L1.5 -1.5L5 0L1.5 1.5L0 5L-1.5 1.5L-5 0L-1.5 -1.5Z" fill="#00F2FE" />
        </g>
        {/* Sparkle 3: Left Margin */}
        <g transform="translate(90, 450)">
          <path d="M0 -6L2 -2L6 0L2 2L0 6L-2 2L-6 0L-2 -2Z" fill="#A855F7" filter="url(#starGlow)" />
        </g>
        {/* Sparkle 4: Mid Screen */}
        <g transform="translate(130, 720)">
          <path d="M0 -5L1.5 -1.5L5 0L1.5 1.5L0 5L-1.5 1.5L-5 0L-1.5 -1.5Z" fill="#FDE047" />
        </g>
        {/* Sparkle 5: Bottom Right */}
        <g transform="translate(710, 850)">
          <path d="M0 -7L2 -2L7 0L2 2L0 7L-2 2L-7 0L-2 -2Z" fill="#00F2FE" filter="url(#starGlow)" />
        </g>

        {/* =================================================================
            5. AMBIENT TWINKLING MICRO STARS
            ================================================================= */}
        <circle cx="70" cy="220" r="1.5" fill="#FFFFFF" className="animate-cosmic-twinkle" />
        <circle cx="150" cy="310" r="1.2" fill="#67E8F9" />
        <circle cx="180" cy="490" r="1.8" fill="#DDD6FE" className="animate-cosmic-twinkle-delay" />
        <circle cx="110" cy="620" r="1.4" fill="#FFFFFF" />
        <circle cx="730" cy="260" r="1.8" fill="#FDE047" className="animate-cosmic-twinkle" />
        <circle cx="760" cy="540" r="1.2" fill="#67E8F9" />
        <circle cx="680" cy="670" r="1.5" fill="#FFFFFF" className="animate-cosmic-twinkle-delay" />
        <circle cx="740" cy="780" r="1.3" fill="#A78BFA" />
        <circle cx="260" cy="1120" r="1.6" fill="#00F2FE" className="animate-cosmic-twinkle" />
        <circle cx="580" cy="1150" r="1.4" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * Deep cosmic nebula background glowing color masses
 */
export const CosmicNebulaGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Deep Space Violet Nebula */}
      <div className="absolute -top-36 -left-36 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-purple-800/35 via-indigo-900/25 to-transparent blur-[100px]" />
      
      {/* Top Right Cyan Cyber Nebula */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-cyan-600/25 via-blue-900/25 to-transparent blur-[90px]" />
      
      {/* Mid Right Magenta Accent */}
      <div className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-fuchsia-600/20 via-purple-900/15 to-transparent blur-[100px]" />
      
      {/* Bottom Left Deep Indigo Cluster */}
      <div className="absolute bottom-10 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-700/25 via-purple-950/20 to-transparent blur-[100px]" />
      
      {/* Bottom Center Blue Nebula */}
      <div className="absolute -bottom-36 left-1/3 w-[520px] h-[520px] rounded-full bg-gradient-to-t from-blue-700/20 via-cyan-950/15 to-transparent blur-[100px]" />
    </div>
  );
};

/**
 * Sparkle icon beside subtitle in Dark Mode
 */
export const CosmicSubtitleSparkle: React.FC = () => {
  return (
    <span className="inline-flex items-center gap-1 text-cyan-400">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block drop-shadow-[0_0_8px_#00f2fe]"
      >
        <path
          d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
          fill="#00F2FE"
        />
      </svg>
    </span>
  );
};
