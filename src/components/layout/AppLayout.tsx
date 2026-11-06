import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  BookOpen,
  Zap,
  AlertTriangle,
  HelpCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import type { SyllabusSubtestItem } from '../../types/material';

export interface AppLayoutProps {
  children: React.ReactNode;
  activeSubtest?: string;
  activeTitle?: string;
  syllabus: SyllabusSubtestItem[];
  currentMaterialId: string;
  onSelectMaterial: (materialId: string) => void;
  onPrevMaterial?: () => void;
  onNextMaterial?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  workedExamplesCount?: number;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeSubtest = 'PK',
  activeTitle = 'Sudut, Garis Sejajar, dan Sifat Segitiga',
  syllabus,
  currentMaterialId,
  onSelectMaterial,
  onPrevMaterial,
  onNextMaterial,
  hasPrev = false,
  hasNext = true,
  workedExamplesCount = 3,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Smooth scroll handler for TOC anchors
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileTocOpen(false);
  };

  // Syllabus list component (reusable between desktop sidebar & mobile drawer)
  const SyllabusContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Brand & Platform Tagline */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-xs">
            U
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-900 leading-tight">
              UTBK-SNBT Portal
            </h1>
            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Akses Gratis • Biaya Rp0
            </p>
          </div>
        </div>
      </div>

      {/* Subtests & Syllabus Chapters */}
      <div className="flex-1 p-3 space-y-4">
        {syllabus.map((subtest) => {
          const isCurrentSubtest = subtest.code === activeSubtest;

          return (
            <div key={subtest.code} className="space-y-1.5">
              {/* Subtest Header */}
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  isCurrentSubtest
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-200/80'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>{subtest.code} - {subtest.name}</span>
                </div>
              </div>

              {/* Modules & Subtopics */}
              <div className="pl-2 space-y-2 mt-1">
                {(subtest.modules || []).map((mod, modIdx) => (
                  <div key={mod.id} className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 px-2.5 py-1">
                      Modul {modIdx + 1}: {mod.title}
                    </div>

                    <div className="space-y-0.5">
                      {mod.subtopics.map((sub, sIdx) => {
                        const isActive = sub.id === currentMaterialId;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              onSelectMaterial(sub.id);
                              setIsDrawerOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between group ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="pr-2 break-words whitespace-normal leading-snug flex-1">
                              {modIdx + 1}.{sIdx + 1} {sub.title}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isActive
                                  ? 'bg-white'
                                  : sub.isCompleted
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-300 group-hover:bg-indigo-400'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200 text-center bg-slate-50/80">
        <p className="text-[11px] text-slate-500">
          ⚡ Latency Rendah • Mobile-First
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* ========================================================
          MOBILE & TABLET: STICKY TOP NAVBAR (h-14)
          ======================================================== */}
      <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-1 text-slate-700 hover:bg-slate-100 rounded-lg transition active:scale-95"
            aria-label="Buka Silabus Materi"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>

          {/* Subtest badge */}
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800 shrink-0">
            {activeSubtest}
          </span>

          {/* Active Material Title */}
          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
            {activeTitle}
          </span>
        </div>

        {/* Quick jump to TOC on mobile */}
        <button
          type="button"
          onClick={() => setIsMobileTocOpen(true)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg shrink-0 transition"
          aria-label="Daftar Isi Halaman"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
      </header>

      {/* ========================================================
          MOBILE SLIDE-OVER SYLLABUS DRAWER (with Backdrop Blur)
          ======================================================== */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Silabus UTBK-SNBT
              </span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <SyllabusContent />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MOBILE TOC MODAL / BOTTOM SHEET
          ======================================================== */}
      {isMobileTocOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileTocOpen(false)}
          />
          <div className="relative bg-white rounded-t-2xl shadow-2xl p-4 max-h-[75vh] overflow-y-auto z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <ListOrdered className="w-4 h-4 text-indigo-600" />
                <span>Daftar Isi & Lompat Bagian</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => scrollToAnchor('konsep-materi')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 font-medium text-slate-800"
              >
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Konsep Inti & Pembahasan Teori</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor('visualisasi-konsep')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 font-medium text-slate-800"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Visualisasi Geometri & Diagram</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor('rumus-cepat')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 font-medium text-slate-800"
              >
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ringkasan Rumus & Formula Kilat</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor('jebakan-umum')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 font-medium text-slate-800"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Jebakan Umum Peserta UTBK</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor('contoh-soal')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 font-medium text-slate-800"
              >
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Contoh Soal Terbimbing ({workedExamplesCount} Soal)</span>
              </button>
              {Array.from({ length: workedExamplesCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToAnchor(`contoh-soal-${i + 1}`)}
                  className="w-full text-left pl-8 pr-2.5 py-1.5 rounded-lg hover:bg-indigo-50 text-xs text-indigo-700 font-medium"
                >
                  → Lompat ke Contoh Soal #{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP & RESPONSIVE MAIN LAYOUT (lg:grid lg:grid-cols-12)
          ======================================================== */}
      <div className="flex-1 w-full max-w-7xl mx-auto lg:grid lg:grid-cols-12 min-h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar (3 kolom / w-72 fixed) */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-slate-200 bg-white sticky top-0 h-screen overflow-y-auto">
          <SyllabusContent />
        </aside>

        {/* Main Content Area (6-7 kolom, max-w-3xl mx-auto agar mata tidak lelah) */}
        <main className="lg:col-span-9 xl:col-span-6 px-4 sm:px-6 md:px-8 py-6 pb-24 lg:pb-12 max-w-3xl mx-auto w-full">
          {children}
        </main>

        {/* Right Sidebar / On-Page TOC (2-3 kolom, hidden xl:block) */}
        <aside className="hidden xl:block xl:col-span-3 border-l border-slate-200/80 bg-white/50 p-5 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Daftar Isi Halaman Ini
              </h3>
              <nav className="space-y-1 text-xs">
                <button
                  type="button"
                  onClick={() => scrollToAnchor('konsep-materi')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition font-medium flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Konsep Inti</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('visualisasi-konsep')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition font-medium flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Visualisasi Geometri</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('rumus-cepat')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-amber-700 transition font-medium flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rumus & Trik Cepat</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('jebakan-umum')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-rose-700 transition font-medium flex items-center gap-2"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Jebakan Umum</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('contoh-soal')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition font-medium flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Contoh Soal ({workedExamplesCount})</span>
                </button>
                {Array.from({ length: workedExamplesCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToAnchor(`contoh-soal-${i + 1}`)}
                    className="w-full text-left pl-6 py-1 rounded text-[11px] text-slate-500 hover:text-indigo-600 transition"
                  >
                    • Contoh #{i + 1}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Navigation: Next & Prev for Desktop */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 mb-2">Navigasi Materi</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onPrevMaterial}
                  disabled={!hasPrev}
                  className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" /> Sebelumnya
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onNextMaterial}
                  disabled={!hasNext}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Serverless & zero-cost architectural badge */}
            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 leading-relaxed">
              <span className="font-bold">💡 Biaya Server Rp0</span>
              <p className="text-slate-600 mt-1">
                Aplikasi ini dikompilasi static & terdistribusi di edge network untuk kecepatan maksimal tanpa biaya operasional.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* ========================================================
          MOBILE & TABLET: BOTTOM STICKY NAVIGATION BAR (h-14)
          fixed bottom-0 left-0 right-0 h-14 bg-white border-t lg:hidden
          ======================================================== */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 lg:hidden flex items-center justify-between px-3">
        <button
          type="button"
          onClick={onPrevMaterial}
          disabled={!hasPrev}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileTocOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 active:scale-95 transition"
        >
          <ListOrdered className="w-4 h-4" />
          <span>Lompat Bagian</span>
        </button>

        <button
          type="button"
          onClick={onNextMaterial}
          disabled={!hasNext}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition shadow-xs"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
