import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../../types/flexbox';
import { RaspberryLogo } from './RaspberryLogo';
import {
  BookOpen,
  Sliders,
  AlertTriangle,
  Gamepad2,
  FileCode2,
  Sparkles,
  LayoutGrid,
  ChevronDown,
  Bot,
  Zap,
} from 'lucide-react';
import { RaspberryIcon } from './RaspberryIcon';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenCheatsheet: () => void;
  isAIOpen: boolean;
  onToggleAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenCheatsheet,
  isAIOpen,
  onToggleAI,
}) => {
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const extraMenuRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        extraMenuRef.current &&
        !extraMenuRef.current.contains(event.target as Node)
      ) {
        setIsExtraOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isExtraActive = activeTab === 'mistakes' || activeTab === 'games';

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/85 backdrop-blur-2xl border-b border-white/[0.08] transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1700px] w-full mx-auto px-2.5 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center min-w-0">
          <RaspberryLogo size="md" />
        </div>

        {/* Central Navigation: 3-Item Capsule Dock + Closely Docked Companion AI Button */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Main 3-Item Capsule Panel */}
          <nav className="relative flex items-center gap-1 bg-white/[0.04] backdrop-blur-2xl p-1.5 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            {/* 1. Теорія */}
            <button
              id="nav-desktop-theory"
              onClick={() => {
                setIsExtraOpen(false);
                onTabChange('theory');
              }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 outline-none ${
                activeTab === 'theory'
                  ? 'text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {activeTab === 'theory' && (
                <motion.div
                  layoutId="desktop-navbar-pill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)] border border-white/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <BookOpen
                className={`w-4 h-4 relative z-10 transition-colors ${
                  activeTab === 'theory' ? 'text-white' : 'text-rose-400'
                }`}
              />
              <span className="relative z-10">Теорія</span>
              {activeTab === 'theory' && (
                <span className="relative z-10 text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono hidden xl:inline backdrop-blur-md">
                  12 властивостей
                </span>
              )}
            </button>

            {/* 2. Редактор */}
            <button
              id="nav-desktop-editor"
              onClick={() => {
                setIsExtraOpen(false);
                onTabChange('editor');
              }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 outline-none ${
                activeTab === 'editor'
                  ? 'text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {activeTab === 'editor' && (
                <motion.div
                  layoutId="desktop-navbar-pill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)] border border-white/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Sliders
                className={`w-4 h-4 relative z-10 transition-colors ${
                  activeTab === 'editor' ? 'text-white' : 'text-rose-400'
                }`}
              />
              <span className="relative z-10">Редактор</span>
              {activeTab === 'editor' && (
                <span className="relative z-10 text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono hidden xl:inline backdrop-blur-md">
                  Live Studio
                </span>
              )}
            </button>

            {/* 3. Додатково (З випадаючим над/під панеллю меню для Помилок та Ігор) */}
            <div className="relative" ref={extraMenuRef}>
              <button
                id="nav-desktop-extra"
                onClick={() => setIsExtraOpen(!isExtraOpen)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 outline-none ${
                  isExtraActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isExtraActive && (
                  <motion.div
                    layoutId="desktop-navbar-pill"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)] border border-white/20"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <LayoutGrid
                  className={`w-4 h-4 relative z-10 transition-colors ${
                    isExtraActive ? 'text-white' : 'text-rose-400'
                  }`}
                />
                <span className="relative z-10">
                  {activeTab === 'mistakes'
                    ? 'Помилки'
                    : activeTab === 'games'
                    ? 'Ігри'
                    : 'Додатково'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                    isExtraOpen ? 'rotate-180 text-white' : isExtraActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Floating Popup Menu positioned gracefully anchored to "Додатково" */}
              <AnimatePresence>
                {isExtraOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute top-full right-0 mt-2.5 w-56 bg-[#0e1322]/95 backdrop-blur-2xl border border-white/[0.12] p-1.5 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(244,63,94,0.15)] z-50 flex flex-col gap-1"
                  >
                    {/* Item A: Помилки */}
                    <button
                      onClick={() => {
                        onTabChange('mistakes');
                        setIsExtraOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        activeTab === 'mistakes'
                          ? 'bg-rose-500/25 text-white border border-rose-500/40'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-100">Помилки</div>
                          <div className="text-[10px] text-slate-400">8 типових багів & фікси</div>
                        </div>
                      </div>
                    </button>

                    {/* Item B: Гра / Тренажери */}
                    <button
                      onClick={() => {
                        onTabChange('games');
                        setIsExtraOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        activeTab === 'games'
                          ? 'bg-rose-500/25 text-white border border-rose-500/40'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Gamepad2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-100">Ігри</div>
                          <div className="text-[10px] text-slate-400">2 інтерактивні тренажери</div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Dedicated Companion AI Capsule Button (Same background, border, size & active highlight) */}
          <div className="bg-white/[0.04] backdrop-blur-2xl p-1.5 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center">
            <button
              id="nav-desktop-ai-sensei"
              onClick={onToggleAI}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 outline-none ${
                isAIOpen
                  ? 'text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="ШІ-наставник Малиновий Сенсей"
            >
              {isAIOpen && (
                <motion.div
                  layoutId="desktop-ai-pill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)] border border-white/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Sparkles
                className={`w-4 h-4 relative z-10 transition-colors ${
                  isAIOpen ? 'text-white' : 'text-rose-400'
                }`}
              />
              <span className="relative z-10">AI Сенсей</span>
            </button>
          </div>
        </div>

        {/* Action Controls: Cheatsheet button & Mobile AI trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Quick Cheatsheet Button */}
          <button
            id="btn-open-cheatsheet"
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.05] hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-400 backdrop-blur-xl transition-all shadow-[0_4px_16px_rgba(0,0,0,0.2)] group active:scale-95 shrink-0"
          >
            <FileCode2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Шпаргалка CSS</span>
            <span className="sm:hidden text-[11px]">Шпаргалка</span>
          </button>

          {/* Mobile AI Direct Button on Header */}
          <button
            onClick={onToggleAI}
            className={`lg:hidden flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-all text-xs font-semibold backdrop-blur-xl shrink-0 active:scale-95 ${
              isAIOpen
                ? 'bg-rose-500 text-white border-white/20 shadow-[0_4px_16px_rgba(244,63,94,0.45)]'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/[0.08]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAIOpen ? 'text-white' : 'text-rose-400'}`} />
            <span className="text-[11px] sm:text-xs">AI Сенсей</span>
          </button>
        </div>
      </div>
    </header>
  );
};
