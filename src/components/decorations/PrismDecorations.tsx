import React from 'react';

/**
 * Aero Prism Header Banner (Gradasi Modern / Anti-Silau)
 * Crisp, faint abstract wave contours without clutter.
 */
export const PrismHeaderBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.14]">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 110C220 55 440 155 680 90C900 30 1060 110 1200 65"
          stroke="#0284C7"
          strokeWidth="1.5"
        />
        <path
          d="M0 135C240 85 480 175 720 115C930 62 1080 135 1200 95"
          stroke="#0D9488"
          strokeWidth="1.2"
        />
        <path
          d="M780 10C880 75 1020 35 1200 115"
          stroke="#2563EB"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
      </svg>
    </div>
  );
};

/**
 * Subtle Header Watermark for Focus / Reader / Detail Views in Aero Prism
 */
export const PrismFocusHeaderAccent: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-56 overflow-hidden pointer-events-none select-none z-0 opacity-[0.12]">
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M20 70C65 30 125 65 195 18" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 75C95 42 145 72 200 34" stroke="#0D9488" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="170" cy="20" r="2" fill="#2563EB" />
        <circle cx="182" cy="20" r="2" fill="#2563EB" />
        <circle cx="170" cy="30" r="2" fill="#2563EB" />
        <circle cx="182" cy="30" r="2" fill="#2563EB" />
      </svg>
    </div>
  );
};

/**
 * Full-Screen Light Geometric Contour Waves & Edge Dot-Grid for Aero Prism (6%–10% opacity)
 */
export const PrismDecorationsBg: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full opacity-[0.09]"
        viewBox="0 0 800 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Smooth Abstract Contour Waves (Right & Top-Right) */}
        <g stroke="#0284C7" strokeWidth="1.4">
          <path d="M520 -20C570 110 730 140 830 220" />
          <path d="M470 -20C540 145 710 175 830 275" />
          <path d="M420 -20C510 180 690 210 830 330" />
          <path d="M580 560C670 620 740 710 830 750" />
          <path d="M540 600C650 675 730 770 830 815" />
        </g>

        {/* Smooth Abstract Contour Waves (Left & Lower-Left) */}
        <g stroke="#0D9488" strokeWidth="1.3">
          <path d="M-30 280C80 330 140 420 65 530" />
          <path d="M-30 325C105 385 165 480 85 595" />
          <path d="M-30 840C110 880 190 990 140 1120" />
          <path d="M-30 890C130 935 225 1045 180 1180" />
        </g>

        {/* Thin Geometric Edge Dot-Grids */}
        <g fill="#1E293B">
          {/* Top-Left Edge Dot Grid */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle key={`tl-${row}-${col}`} cx={24 + col * 11} cy={190 + row * 11} r="1.6" />
            ))
          )}
          {/* Bottom-Right Edge Dot Grid */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle key={`br-${row}-${col}`} cx={735 + col * 11} cy={980 + row * 11} r="1.6" />
            ))
          )}
        </g>
      </svg>
    </div>
  );
};

/**
 * Minimalist Corner Dot-Grid / Geometric Accent for Aero Prism Subtest Cards
 */
export const PrismCardCornerDecor: React.FC<{ variant?: 'dots-bl' | 'dots-tr' }> = ({
  variant = 'dots-bl',
}) => {
  const posClass = variant === 'dots-tr' ? 'top-2.5 right-2.5' : 'bottom-2.5 left-2.5';
  return (
    <div className={`absolute ${posClass} pointer-events-none select-none opacity-25 z-0`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#475569">
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
  );
};
