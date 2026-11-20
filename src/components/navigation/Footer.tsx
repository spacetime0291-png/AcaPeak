import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, FileText, HelpCircle, Info, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-100/90 dark:bg-[#0c1224]/90 border-t border-stone-200/80 dark:border-slate-800 transition-colors py-10 px-4 sm:px-8 mt-auto">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
                SA
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                SkolAce
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-600/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Rp0 Gratis
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Platform belajar dan latihan soal UTBK-SNBT bebas biaya tanpa batas untuk seluruh siswa Indonesia. Menggunakan kurikulum resmi 7 subtes BPPP dengan layout taktis 3 zona dan simulasi adaptif berstandar nasional.
            </p>
          </div>

          {/* Quick Subtests */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Subtes UTBK
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/subtest/pu" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  Penalaran Umum (PU)
                </Link>
              </li>
              <li>
                <Link to="/subtest/pk" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  Pengetahuan Kuantitatif (PK)
                </Link>
              </li>
              <li>
                <Link to="/subtest/pm" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  Penalaran Matematika (PM)
                </Link>
              </li>
              <li>
                <Link to="/subtest/lbi" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  Literasi Bhs. Indonesia (LBI)
                </Link>
              </li>
              <li>
                <Link to="/subtest/lbe" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  Literasi Bhs. Inggris (LBE)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legalities & Help */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Informasi & Legalitas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                  <span>Tentang Kami</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Syarat & Ketentuan</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Kontak & Bantuan</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div className="pt-6 border-t border-stone-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} SkolAce. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> untuk pejuang PTN se-Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
