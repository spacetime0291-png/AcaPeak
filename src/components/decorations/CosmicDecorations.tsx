import React from 'react';

/**
 * Cosmic constellations, twinkling stars, and shooting star for Dark Mode Home Dashboard
 */
export const CosmicStarsBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Constellations SVG Layer */}
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Constellation 1: Top Left Big Dipper / Cassiopeia-like cluster */}
        <g stroke="rgba(147, 197, 253, 0.25)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="80" y1="90" x2="160" y2="70" />
          <line x1="160" y1="70" x2="230" y2="110" />
          <line x1="230" y1="110" x2="310" y2="90" />
          <line x1="310" y1="90" x2="350" y2="150" />
          <line x1="350" y1="150" x2="270" y2="170" />
          <line x1="270" y1="170" x2="230" y2="110" />
        </g>
        {/* Star Nodes in Constellation 1 */}
        <circle cx="80" cy="90" r="3" fill="#67E8F9" filter="drop-shadow(0 0 4px #00f2fe)" />
        <circle cx="160" cy="70" r="2.5" fill="#FFFFFF" />
        <circle cx="230" cy="110" r="3.5" fill="#A78BFA" filter="drop-shadow(0 0 4px #a855f7)" />
        <circle cx="310" cy="90" r="2.5" fill="#FFFFFF" />
        <circle cx="350" cy="150" r="3" fill="#93C5FD" />
        <circle cx="270" cy="170" r="2.5" fill="#FFFFFF" />

        {/* Constellation 2: Top Right Geometric Star Cluster */}
        <g stroke="rgba(196, 181, 253, 0.2)" strokeWidth="1" strokeDasharray="2 3">
          <line x1="720" y1="80" x2="790" y2="50" />
          <line x1="790" y1="50" x2="880" y2="90" />
          <line x1="880" y1="90" x2="930" y2="160" />
          <line x1="880" y1="90" x2="810" y2="130" />
          <line x1="810" y1="130" x2="720" y2="80" />
        </g>
        {/* Star Nodes in Constellation 2 */}
        <circle cx="720" cy="80" r="3" fill="#E879F9" filter="drop-shadow(0 0 5px #d946ef)" />
        <circle cx="790" cy="50" r="2" fill="#FFFFFF" />
        <circle cx="880" cy="90" r="3.5" fill="#38BDF8" filter="drop-shadow(0 0 4px #00f2fe)" />
        <circle cx="930" cy="160" r="2.5" fill="#FFFFFF" />
        <circle cx="810" cy="130" r="2.5" fill="#FDE047" />

        {/* Diagonal Shooting Star with radiant trail */}
        <g transform="translate(680, 220) rotate(-35)">
          <line x1="0" y1="0" x2="110" y2="0" stroke="url(#shootingStarGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="110" cy="0" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #67e8f9)" />
        </g>

        {/* Gradient for shooting star */}
        <defs>
          <linearGradient id="shootingStarGrad" x1="0" y1="0" x2="110" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="0.7" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Random Twinkling Micro Stars */}
        <circle cx="60" cy="240" r="1.5" fill="#F8FAFC" className="animate-cosmic-twinkle" />
        <circle cx="140" cy="360" r="1.2" fill="#BAE6FD" />
        <circle cx="210" cy="480" r="1.8" fill="#DDD6FE" className="animate-cosmic-twinkle-delay" />
        <circle cx="480" cy="70" r="2" fill="#FDE047" className="animate-cosmic-twinkle" />
        <circle cx="560" cy="190" r="1.2" fill="#F8FAFC" />
        <circle cx="640" cy="380" r="1.6" fill="#67E8F9" className="animate-cosmic-twinkle-delay" />
        <circle cx="890" cy="310" r="1.5" fill="#F472B6" className="animate-cosmic-twinkle" />
        <circle cx="940" cy="490" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * Nebula background glowing color masses
 */
export const CosmicNebulaGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Nebula: Deep Violet/Indigo */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-purple-700/25 via-indigo-900/20 to-transparent blur-3xl" />
      
      {/* Top Right Nebula: Electric Cyan/Blue */}
      <div className="absolute -top-28 -right-28 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-cyan-600/20 via-blue-900/20 to-transparent blur-3xl" />
      
      {/* Mid Right Subtle Nebula: Magenta */}
      <div className="absolute top-1/2 -right-36 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-pink-600/15 via-purple-900/10 to-transparent blur-3xl" />
      
      {/* Bottom Center Nebula: Deep Blue */}
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-800/20 via-indigo-950/15 to-transparent blur-3xl" />
    </div>
  );
};

/**
 * Sparkle icon beside subtitle in Dark Mode
 */
export const CosmicSubtitleSparkle: React.FC = () => {
  return (
    <span className="inline-flex items-center gap-1 text-cyan-400">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block drop-shadow-[0_0_6px_#00f2fe]">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="#00F2FE"
        />
      </svg>
    </span>
  );
};
