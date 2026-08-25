import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TabType } from './types/flexbox';
import { Header } from './components/common/Header';
import { BottomPillNav } from './components/common/BottomPillNav';
import { TheoryPage } from './components/theory/TheoryPage';
import { EditorPage } from './components/editor/EditorPage';
import { MistakesPage } from './components/mistakes/MistakesPage';
import { GamesPage } from './components/games/GamesPage';
import { CheatSheetModal } from './components/cheatsheet/CheatSheetModal';
import { RaspberrySenseiModal } from './components/ai/RaspberrySenseiModal';
import { RaspberryLogo } from './components/common/RaspberryLogo';
import { RaspberryIcon } from './components/common/RaspberryIcon';
import { Sparkles, Bot } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Apple-style calming ambient mesh / glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-[10%] w-[550px] h-[550px] bg-indigo-600/8 rounded-full blur-[150px]" />
        <div className="absolute -bottom-[10%] left-10 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        isAIOpen={isAIOpen}
        onToggleAI={() => setIsAIOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {activeTab === 'theory' && <TheoryPage />}
        {activeTab === 'editor' && <EditorPage />}
        {activeTab === 'mistakes' && <MistakesPage />}
        {activeTab === 'games' && <GamesPage />}
      </main>

      {/* Apple-style Floating Bottom Pill Bar for Mobile & Compact Screens */}
      <BottomPillNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAIOpen={isAIOpen}
        onToggleAI={() => setIsAIOpen((prev) => !prev)}
      />

      {/* Quick Cheatsheet Modal */}
      <CheatSheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* AI Sensei Modal */}
      <RaspberrySenseiModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      {/* Desktop & Mobile Glass Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#090d16]/80 backdrop-blur-2xl py-6 sm:py-8 px-3 sm:px-4 lg:px-6 mt-8 sm:mt-12 pb-28 lg:pb-8">
        <div className="max-w-[1700px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center justify-center md:justify-start">
            <RaspberryLogo size="sm" />
          </div>

          {/* Quick Footer Capsule Navigation (visible on md+ screens to avoid mobile clutter) */}
          <div className="hidden md:flex items-center gap-2 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-medium text-slate-300">
              {(['theory', 'editor', 'mistakes', 'games'] as TabType[]).map((tab) => {
                const labelMap: Record<TabType, string> = {
                  theory: 'Теорія',
                  editor: 'Редактор',
                  mistakes: 'Помилки',
                  games: 'Ігри',
                };
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="footer-nav-pill"
                        className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_10px_rgba(244,63,94,0.4)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{labelMap[tab]}</span>
                  </button>
                );
              })}
              <button
                onClick={() => setIsCheatsheetOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-rose-300 hover:text-white hover:bg-rose-500/20 font-semibold transition-all border border-rose-500/30"
              >
                Шпаргалка CSS
              </button>
            </div>

            {/* Footer AI Quick Trigger */}
            <button
              onClick={() => setIsAIOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isAIOpen
                  ? 'bg-rose-500 text-white border-white/20 shadow-[0_2px_10px_rgba(244,63,94,0.4)]'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAIOpen ? 'text-white' : 'text-rose-400'}`} />
              <span>AI Сенсей</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 text-center">
            <span>Зроблено з любов'ю до веброзробки</span>
            <RaspberryIcon size="sm" variant="rose" />
          </div>
        </div>
      </footer>
    </div>
  );
}
