import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../../types/flexbox';
import {
  BookOpen,
  Sliders,
  AlertTriangle,
  Gamepad2,
  LayoutGrid,
  Sparkles,
  Bot,
} from 'lucide-react';

interface BottomPillNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isAIOpen: boolean;
  onToggleAI: () => void;
}

export const BottomPillNav: React.FC<BottomPillNavProps> = ({
  activeTab,
  onTabChange,
  isAIOpen,
  onToggleAI,
}) => {
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExtraOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isExtraActive = activeTab === 'mistakes' || activeTab === 'games';

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden px-3 max-w-sm w-full flex items-center justify-center gap-2">
      {/* 3-Item Capsule Dock Navigation */}
      <div className="flex-1 bg-[#0f1422]/90 backdrop-blur-2xl border border-white/[0.12] p-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between gap-1 relative">
        {/* 1. Теорія */}
        <button
          id="pill-nav-theory"
          onClick={() => {
            setIsExtraOpen(false);
            onTabChange('theory');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-colors duration-200 relative outline-none ${
            activeTab === 'theory'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {activeTab === 'theory' && (
            <motion.div
              layoutId="mobile-bottom-nav-pill"
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.6)] border border-white/20"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <BookOpen
            className={`w-4 h-4 mb-0.5 relative z-10 transition-colors ${
              activeTab === 'theory' ? 'text-white' : 'text-rose-400/80'
            }`}
          />
          <span className="text-[10px] tracking-tight font-medium relative z-10">
            Теорія
          </span>
        </button>

        {/* 2. Редактор */}
        <button
          id="pill-nav-editor"
          onClick={() => {
            setIsExtraOpen(false);
            onTabChange('editor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-colors duration-200 relative outline-none ${
            activeTab === 'editor'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {activeTab === 'editor' && (
            <motion.div
              layoutId="mobile-bottom-nav-pill"
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.6)] border border-white/20"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <Sliders
            className={`w-4 h-4 mb-0.5 relative z-10 transition-colors ${
              activeTab === 'editor' ? 'text-white' : 'text-rose-400/80'
            }`}
          />
          <span className="text-[10px] tracking-tight font-medium relative z-10">
            Редактор
          </span>
        </button>

        {/* 3. Додатково (Зі спливаючим меню над панеллю) */}
        <div className="flex-1 relative" ref={menuRef}>
          <button
            id="pill-nav-extra"
            onClick={() => setIsExtraOpen(!isExtraOpen)}
            className={`w-full flex flex-col items-center justify-center py-2 px-1 rounded-full transition-colors duration-200 relative outline-none ${
              isExtraActive
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isExtraActive && (
              <motion.div
                layoutId="mobile-bottom-nav-pill"
                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.6)] border border-white/20"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <LayoutGrid
              className={`w-4 h-4 mb-0.5 relative z-10 transition-colors ${
                isExtraActive ? 'text-white' : 'text-rose-400/80'
              }`}
            />
            <span className="text-[10px] tracking-tight font-medium relative z-10">
              {activeTab === 'mistakes'
                ? 'Помилки'
                : activeTab === 'games'
                ? 'Ігри'
                : 'Додатково'}
            </span>
          </button>

          {/* Floating Popup Over the Capsule */}
          <AnimatePresence>
            {isExtraOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="absolute bottom-full right-0 mb-3 w-48 bg-[#0f1424]/95 backdrop-blur-2xl border border-white/[0.15] p-1.5 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(244,63,94,0.25)] flex flex-col gap-1 z-50"
              >
                <div className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-rose-400 border-b border-white/[0.08]">
                  Додаткові модулі
                </div>

                {/* Sub-item 1: Помилки */}
                <button
                  onClick={() => {
                    onTabChange('mistakes');
                    setIsExtraOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 'mistakes'
                      ? 'bg-rose-500/25 text-white border border-rose-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Помилки & Фікси</span>
                </button>

                {/* Sub-item 2: Ігри */}
                <button
                  onClick={() => {
                    onTabChange('games');
                    setIsExtraOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 'games'
                      ? 'bg-rose-500/25 text-white border border-rose-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-indigo-400" />
                  <span>Ігри & Тренажери</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Separate Matching AI Circle Button (Same capsule background, border, size & active highlight) */}
      <div className="bg-[#0f1422]/90 backdrop-blur-2xl border border-white/[0.12] p-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
        <button
          id="pill-nav-ai"
          onClick={onToggleAI}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-colors duration-200 relative outline-none ${
            isAIOpen
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Чат з Малиновим Сенсеєм"
        >
          {isAIOpen && (
            <motion.div
              layoutId="mobile-ai-pill"
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.6)] border border-white/20"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <Sparkles
            className={`w-4 h-4 mb-0.5 relative z-10 transition-colors ${
              isAIOpen ? 'text-white' : 'text-rose-400/80'
            }`}
          />
          <span className="text-[10px] tracking-tight font-medium relative z-10">
            AI
          </span>
        </button>
      </div>
    </div>
  );
};
