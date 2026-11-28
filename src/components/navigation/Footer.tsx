import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, HelpCircle, Info, Heart } from 'lucide-react';
import type { ThemeId } from '../../lib/theme';

interface FooterProps {
  theme?: ThemeId;
}

export const Footer: React.FC<FooterProps> = ({ theme = 'light' }) => {
  const isVelvet = theme === 'velvet';
  const isPrism = theme === 'prism';

  const footerClass = isVelvet
    ? 'bg-[#1B0F1B]/92 border-[#EB8A78]/20 text-[#C9A9B0]'
    : isPrism
    ? 'bg-white/65 backdrop-blur-md border-white/80 text-slate-600'
    : 'bg-stone-100/90 dark:bg-[#0c1224]/90 border-stone-200/80 dark:border-slate-800';

  const logoClass = isVelvet
    ? 'bg-[#3A1F31] text-[#FBF1F2] border border-[#EB8A78]/35'
    : isPrism
    ? 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white'
    : 'bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-500 text-white';

  const linkHoverClass = isVelvet
    ? 'hover:text-[#FF8A6B]'
    : isPrism
    ? 'hover:text-blue-600'
    : 'hover:text-indigo-600 dark:hover:text-cyan-400';

  const headingClass = isVelvet
    ? 'text-[#FBF1F2]'
    : 'text-slate-800 dark:text-slate-200';

  const bodyTextClass = isVelvet
    ? 'text-[#C9A9B0]'
    : 'text-slate-600 dark:text-slate-400';

  return (
    <footer className={`w-full border-t transition-colors py-10 px-4 sm:px-8 mt-auto ${footerClass}`}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shadow-sm ${logoClass}`}>
                SA
              </div>
              <span className={`font-bold text-lg tracking-tight ${isVelvet ? 'text-[#FBF1F2]' : 'text-slate-900 dark:text-white'}`}>
                SkolAce
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-md ${bodyTextClass}`}>
              Platform edukasi independen persiapan UTBK-SNBT bebas biaya (Rp0) untuk seluruh pelajar Indonesia. Menyediakan 106 sub-bab materi 3 zona, 27 rangkuman bab, dan 4.240 soal drilling adaptif.
            </p>
          </div>

          {/* Quick Subtests */}
          <div className="space-y-2.5">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${headingClass}`}>
              Subtes UTBK
            </h4>
            <ul className={`space-y-1.5 text-xs ${bodyTextClass}`}>
              <li>
                <Link to="/utbk/pu" className={`${linkHoverClass} transition-colors`}>
                  Penalaran Umum (PU)
                </Link>
              </li>
              <li>
                <Link to="/utbk/ppu" className={`${linkHoverClass} transition-colors`}>
                  Pengetahuan &amp; Pemahaman Umum (PPU)
                </Link>
              </li>
              <li>
                <Link to="/utbk/pbm" className={`${linkHoverClass} transition-colors`}>
                  Pemahaman Bacaan &amp; Menulis (PBM)
                </Link>
              </li>
              <li>
                <Link to="/utbk/pk" className={`${linkHoverClass} transition-colors`}>
                  Pengetahuan Kuantitatif (PK)
                </Link>
              </li>
              <li>
                <Link to="/utbk/lbi" className={`${linkHoverClass} transition-colors`}>
                  Literasi Bhs. Indonesia (LBI)
                </Link>
              </li>
              <li>
                <Link to="/utbk/lbe" className={`${linkHoverClass} transition-colors`}>
                  Literasi Bhs. Inggris (LBE)
                </Link>
              </li>
              <li>
                <Link to="/utbk/pm" className={`${linkHoverClass} transition-colors`}>
                  Penalaran Matematika (PM)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legalities & Help */}
          <div className="space-y-2.5">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${headingClass}`}>
              Informasi & Legalitas
            </h4>
            <ul className={`space-y-1.5 text-xs ${bodyTextClass}`}>
              <li>
                <Link to="/about" className={`flex items-center gap-1.5 ${linkHoverClass} transition-colors`}>
                  <Info className="w-3.5 h-3.5" />
                  <span>Tentang Kami</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className={`flex items-center gap-1.5 ${linkHoverClass} transition-colors`}>
                  <Shield className="w-3.5 h-3.5" />
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`flex items-center gap-1.5 ${linkHoverClass} transition-colors`}>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Syarat & Ketentuan</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`flex items-center gap-1.5 ${linkHoverClass} transition-colors`}>
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Kontak & Bantuan</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isVelvet
              ? 'border-[#EB8A78]/20 text-[#C9A9B0]'
              : isPrism
              ? 'border-white/70 text-slate-500'
              : 'border-stone-200/60 dark:border-slate-800/80 text-slate-500 dark:text-slate-500'
          }`}
        >
          <p>© {new Date().getFullYear()} SkolAce. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> untuk pejuang PTN se-Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
