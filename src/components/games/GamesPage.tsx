import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GameLevel, QuizQuestion } from '../../types/flexbox';
import { GAME_LEVELS, BASE_QUIZ_TEMPLATES, generateRandomQuizQuestion } from '../../data/gamesData';
import { AxisIndicator } from '../common/AxisIndicator';
import { RaspberryIcon } from '../common/RaspberryIcon';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Trophy, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Play, 
  Flame, 
  Lightbulb, 
  Shuffle, 
  Clock, 
  Award,
  RotateCcw,
  Rocket
} from 'lucide-react';

export const GamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'baskets' | 'quiz'>('baskets');

  // ================= GAME 1: RASPBERRY IN BASKET STATE =================
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel: GameLevel = GAME_LEVELS[currentLevelIdx] || GAME_LEVELS[0];

  // User's chosen CSS properties (selected in UI before launch)
  const [userCss, setUserCss] = useState<{
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    gap?: number;
  }>({});

  // Applied CSS currently active on the visual stage (starts at initialContainerStyle)
  const [appliedCss, setAppliedCss] = useState<{
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    flexWrap?: string;
    gap?: number;
  }>({});

  const [levelStatus, setLevelStatus] = useState<'idle' | 'launching' | 'success' | 'fail'>('idle');
  const [isLaunched, setIsLaunched] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('malynivka_completed_levels');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reset user CSS and applied stage position when level changes
  useEffect(() => {
    setUserCss({});
    setAppliedCss(currentLevel.initialContainerStyle || {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    });
    setLevelStatus('idle');
    setIsLaunched(false);
    setShowHint(false);
  }, [currentLevelIdx]);

  // Handle selecting a CSS property in the buttons
  const handleSelectProperty = (key: string, val: string) => {
    setUserCss((prev) => ({ ...prev, [key]: val }));
    // If it was already launched or tested, return berries back to the starting line
    if (isLaunched || levelStatus !== 'idle') {
      setIsLaunched(false);
      setLevelStatus('idle');
      setAppliedCss(currentLevel.initialContainerStyle || {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      });
    }
  };

  // Reset berries manually to starting point
  const handleResetToStart = () => {
    setIsLaunched(false);
    setLevelStatus('idle');
    setAppliedCss(currentLevel.initialContainerStyle || {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    });
  };

  // Check victory condition and launch the raspberry
  const handleCheckCode = () => {
    setIsLaunched(true);
    setLevelStatus('launching');

    // Apply the user's selected styles to the stage container
    const targetStyles = {
      ...currentLevel.initialContainerStyle,
      ...userCss,
    };
    setAppliedCss(targetStyles);

    const sol = currentLevel.solution;
    let isCorrect = true;

    if (sol.justifyContent && (userCss.justifyContent || currentLevel.initialContainerStyle.justifyContent) !== sol.justifyContent) {
      isCorrect = false;
    }
    if (sol.alignItems && (userCss.alignItems || currentLevel.initialContainerStyle.alignItems) !== sol.alignItems) {
      isCorrect = false;
    }
    if (sol.flexDirection && (userCss.flexDirection || currentLevel.initialContainerStyle.flexDirection) !== sol.flexDirection) {
      isCorrect = false;
    }

    // Delay evaluation to allow the launch flight animation to complete
    setTimeout(() => {
      if (isCorrect) {
        setLevelStatus('success');
        // Confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#fda4af', '#f43f5e', '#fb7185', '#38bdf8'],
        });

        if (!completedLevels.includes(currentLevel.id)) {
          const nextCompleted = [...completedLevels, currentLevel.id];
          setCompletedLevels(nextCompleted);
          try {
            localStorage.setItem('malynivka_completed_levels', JSON.stringify(nextCompleted));
          } catch {
            // Ignore
          }
        }
      } else {
        setLevelStatus('fail');
      }
    }, 550);
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < GAME_LEVELS.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
    }
  };

  // ================= GAME 2: INFINITE RANDOM QUIZ STATE =================
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizBestStreak, setQuizBestStreak] = useState(0);
  const [quizSeed, setQuizSeed] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const getRandomQuiz = (): QuizQuestion => {
    const idx = (quizSeed * 7 + 3) % BASE_QUIZ_TEMPLATES.length;
    return BASE_QUIZ_TEMPLATES[idx] || BASE_QUIZ_TEMPLATES[0];
  };

  const currentQuiz = getRandomQuiz();

  const handleSelectQuizOption = (optionIndex: number) => {
    if (quizAnswered) return;
    setSelectedOption(optionIndex);
    setQuizAnswered(true);

    if (optionIndex === currentQuiz.correctIndex) {
      const newStreak = quizStreak + 1;
      setQuizStreak(newStreak);
      if (newStreak > quizBestStreak) {
        setQuizBestStreak(newStreak);
      }
      setQuizScore((prev) => prev + 10 + (newStreak - 1) * 2);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });
    } else {
      setQuizStreak(0);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSeed((prev) => prev + 1);
    setSelectedOption(null);
    setQuizAnswered(false);
  };

  return (
    <div className="max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 animate-fadeIn pb-20 lg:pb-10">
      {/* Header & Game Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 glass-panel p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0 backdrop-blur-md">
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>Практичний Ігровий Тренажер</span>
            </h1>
            <p className="text-[11px] text-slate-300/80 hidden sm:block">
              Закріплюйте знання Flexbox на практиці: грайте в рівні або тренуйте інтуїцію в квізі
            </p>
          </div>
        </div>

        {/* Top Game Mode Selector with Sliding Capsule */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
          {[
            {
              id: 'baskets' as const,
              label: '🧺 Малина в кошик',
              badge: `${completedLevels.length}/${GAME_LEVELS.length}`,
              hasBadge: true,
            },
            {
              id: 'quiz' as const,
              label: 'Квіз',
              icon: Trophy,
              streak: quizStreak > 0 ? `🔥${quizStreak}` : null,
              hasBadge: false,
            },
          ].map((mode) => {
            const isActive = activeGame === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveGame(mode.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="games-mode-pill"
                    className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_10px_rgba(244,63,94,0.4)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                {mode.icon && <mode.icon className="w-3.5 h-3.5 relative z-10" />}
                <span className="relative z-10">{mode.label}</span>
                {mode.hasBadge && (
                  <span className="relative z-10 text-[10px] bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded-full font-mono border border-rose-500/20">
                    {mode.badge}
                  </span>
                )}
                {mode.streak && <span className="relative z-10 text-[10px] text-amber-300 font-mono">{mode.streak}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GAME 1: RASPBERRY IN BASKET (МАЛИНА В КОШИК) */}
      {/* ========================================================================= */}
      {activeGame === 'baskets' && (
        <div className="space-y-4">
          {/* Horizontal Level Progress Ribbon with Sliding Indicator */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {GAME_LEVELS.map((lvl, idx) => {
              const isCompleted = completedLevels.includes(lvl.id);
              const isCurrent = idx === currentLevelIdx;

              return (
                <button
                  key={lvl.id}
                  id={`lvl-btn-${lvl.id}`}
                  onClick={() => setCurrentLevelIdx(idx)}
                  className={`relative px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold shrink-0 transition-colors flex items-center gap-1.5 backdrop-blur-md active:scale-95 ${
                    isCurrent
                      ? 'text-white border-rose-400'
                      : isCompleted
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                      : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="games-level-pill"
                      className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_10px_rgba(244,63,94,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">Рівень {lvl.id}</span>
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400 relative z-10" />}
                </button>
              );
            })}
          </div>

          {/* Arena & Controls Grid: (On mobile, Arena appears clearly with instant launch controls) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Game Interactive Arena (7 cols on desktop, Top on mobile for instant visibility) */}
            <div className="lg:col-span-7 space-y-3 order-1 lg:order-2">
              <AxisIndicator flexDirection={((isLaunched ? appliedCss.flexDirection : (userCss.flexDirection || currentLevel.initialContainerStyle.flexDirection)) as any) || 'row'} />

              {/* The Game Box */}
              <div className="glass-panel rounded-3xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">Ігрове поле Малинівки:</span>
                  <div className="flex items-center gap-2">
                    {levelStatus === 'idle' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 font-mono text-[10px]">
                        🎯 На старті
                      </span>
                    )}
                    {levelStatus === 'launching' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] animate-pulse">
                        🚀 Політ ягід...
                      </span>
                    )}
                    {levelStatus === 'success' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold">
                        ✅ Влучання в кошик!
                      </span>
                    )}
                    {levelStatus === 'fail' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold">
                        💥 Промах повз кошик!
                      </span>
                    )}
                  </div>
                </div>

                {/* The Stage with Target Baskets and Dynamic Raspberry Items */}
                <div className="relative bg-[#06080e]/90 rounded-2xl border border-white/[0.08] min-h-[220px] h-[220px] sm:h-[260px] overflow-hidden p-4 flex flex-col justify-center shadow-inner">
                  {/* Target Baskets (Destination Targets) */}
                  <div
                    className="absolute inset-0 p-4 pointer-events-none flex"
                    style={{
                      justifyContent: currentLevel.targetBaskets[0]?.positionStyles.justifyContent,
                      alignItems: currentLevel.targetBaskets[0]?.positionStyles.alignItems,
                      flexDirection: currentLevel.targetBaskets[0]?.positionStyles.flexDirection || 'row',
                    }}
                  >
                    {currentLevel.items.map((it, idx) => (
                      <div
                        key={`basket-${idx}`}
                        className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl border-2 border-dashed border-rose-400/60 bg-rose-500/10 flex flex-col items-center justify-center text-center m-1 animate-pulse"
                      >
                        <span className="text-[10px] sm:text-xs font-bold text-rose-300 font-mono">🧺 Кошик</span>
                      </div>
                    ))}
                  </div>

                  {/* Controlled Raspberries (Flexbox container driven by appliedCss only when launched) */}
                  <div
                    className="w-full h-full flex transition-all duration-700 ease-out relative z-10"
                    style={{
                      display: 'flex',
                      flexDirection: (appliedCss.flexDirection as any) || currentLevel.initialContainerStyle.flexDirection || 'row',
                      justifyContent: (appliedCss.justifyContent as any) || currentLevel.initialContainerStyle.justifyContent || 'flex-start',
                      alignItems: (appliedCss.alignItems as any) || currentLevel.initialContainerStyle.alignItems || 'center',
                    }}
                  >
                    {currentLevel.items.map((it) => (
                      <div
                        key={it.id}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-700 m-1 ${
                          levelStatus === 'success'
                            ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 scale-110 ring-4 ring-emerald-300/80 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                            : levelStatus === 'fail'
                            ? 'bg-gradient-to-tr from-rose-900 to-red-950 border border-rose-500 ring-4 ring-rose-500/60 shadow-[0_0_20px_rgba(225,29,72,0.4)]'
                            : levelStatus === 'launching'
                            ? 'bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-700 ring-4 ring-rose-400/80 scale-105 shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                            : 'bg-gradient-to-tr from-slate-900 via-rose-950 to-slate-900 border border-rose-500/40 ring-2 ring-rose-500/30'
                        }`}
                      >
                        <RaspberryIcon
                          variant={
                            levelStatus === 'success'
                              ? 'emerald'
                              : it.type === 'goldberry'
                              ? 'gold'
                              : it.type === 'blackberry'
                              ? 'dark'
                              : 'rose'
                          }
                          size={28}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>🧺 Мета: перемістити малинку в кошик</span>
                  <span className="text-rose-400 font-mono font-bold">Рівень {currentLevel.id}/{GAME_LEVELS.length}</span>
                </div>
              </div>
            </div>

            {/* Level Controls & Task (5 cols on desktop, Bottom on mobile) */}
            <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
              <div className="glass-panel rounded-3xl p-4 sm:p-5 space-y-4">
                
                {/* Level Title and Hint */}
                <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                        Рівень {currentLevel.id}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {currentLevel.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300/90 mt-1 leading-relaxed">
                      {currentLevel.instruction}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-white/[0.08] transition-colors shrink-0"
                    title="Підказка"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                </div>

                {/* Hint Panel */}
                {showHint && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-fadeIn backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Підказка: </span>
                      <span>{currentLevel.hint}</span>
                    </div>
                  </div>
                )}

                {/* Interactive CSS Properties Selection Controls */}
                <div className="space-y-3">
                  {/* justify-content */}
                  {currentLevel.requiredProperties.includes('justifyContent') && (
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                        <span>justify-content:</span>
                        <span className="text-rose-400 font-bold">{userCss.justifyContent || currentLevel.initialContainerStyle.justifyContent || 'flex-start'}</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(
                          (val) => {
                            const isSelected = (userCss.justifyContent || currentLevel.initialContainerStyle.justifyContent) === val;
                            return (
                              <button
                                key={val}
                                onClick={() => handleSelectProperty('justifyContent', val)}
                                className={`relative py-1.5 px-1.5 text-[10px] font-mono rounded-full border transition-colors truncate text-center ${
                                  isSelected
                                    ? 'text-white border-rose-400 font-bold'
                                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                                }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId="game-justify-pill"
                                    className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                  />
                                )}
                                <span className="relative z-10">{val}</span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {/* align-items */}
                  {currentLevel.requiredProperties.includes('alignItems') && (
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                        <span>align-items:</span>
                        <span className="text-rose-400 font-bold">{userCss.alignItems || currentLevel.initialContainerStyle.alignItems || 'flex-start'}</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {['flex-start', 'center', 'flex-end', 'stretch'].map((val) => {
                          const isSelected = (userCss.alignItems || currentLevel.initialContainerStyle.alignItems) === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleSelectProperty('alignItems', val)}
                              className={`relative py-1.5 px-1.5 text-[10px] font-mono rounded-full border transition-colors truncate text-center ${
                                isSelected
                                  ? 'text-white border-rose-400 font-bold'
                                  : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="game-align-items-pill"
                                  className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                />
                              )}
                              <span className="relative z-10">{val}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* flex-direction */}
                  {currentLevel.requiredProperties.includes('flexDirection') && (
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                        <span>flex-direction:</span>
                        <span className="text-rose-400 font-bold">{userCss.flexDirection || currentLevel.initialContainerStyle.flexDirection || 'row'}</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['row', 'column'].map((val) => {
                          const isSelected = (userCss.flexDirection || currentLevel.initialContainerStyle.flexDirection) === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleSelectProperty('flexDirection', val)}
                              className={`relative py-1.5 px-2 text-xs font-mono rounded-full border transition-colors text-center ${
                                isSelected
                                  ? 'text-white border-rose-400 font-bold'
                                  : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="game-flex-dir-pill"
                                  className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                />
                              )}
                              <span className="relative z-10">{val}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Launch Button & Controls */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-check-basket-level"
                      onClick={handleCheckCode}
                      disabled={levelStatus === 'launching'}
                      className="flex-1 py-2.5 px-5 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      {levelStatus === 'launching' ? (
                        <>
                          <Rocket className="w-4 h-4 animate-bounce" />
                          <span>Політ ягід...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>Запустити в кошик 🚀</span>
                        </>
                      )}
                    </button>

                    {isLaunched && (
                      <button
                        onClick={handleResetToStart}
                        title="Повернути у вихідне положення"
                        className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-center shrink-0 active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Status Banner */}
                  {levelStatus === 'success' && (
                    <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-2 animate-fadeIn backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Ідеально! Малина в кошику! 🎉</span>
                      </div>
                      {currentLevelIdx < GAME_LEVELS.length - 1 && (
                        <button
                          onClick={handleNextLevel}
                          className="px-3.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow shrink-0 active:scale-95"
                        >
                          <span>Далі</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {levelStatus === 'fail' && (
                    <div className="p-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between gap-2 animate-shake backdrop-blur-md">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>Промах! Змініть властивості та запустіть знову.</span>
                      </div>
                      <button
                        onClick={handleResetToStart}
                        className="px-2.5 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 rounded-full font-bold text-[10px] shrink-0"
                      >
                        На старт
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 2: INFINITE RANDOM QUIZ (НЕЗКІНЧЕННИЙ КВІЗ) */}
      {/* ========================================================================= */}
      {activeGame === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 glass-panel p-3.5 rounded-3xl text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Бали</span>
              <div className="text-lg sm:text-xl font-extrabold text-white font-mono">{quizScore}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Серія</span>
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono">🔥 {quizStreak}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>Рекорд</span>
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-rose-300 font-mono">{quizBestStreak}</div>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-4 relative overflow-hidden">
            {/* Question Header */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Питання #{quizSeed}
                </span>
                <button
                  onClick={handleNextQuizQuestion}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  title="Згенерувати інше питання"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Інше питання</span>
                </button>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                {currentQuiz.question}
              </h2>
            </div>

            {/* Optional Code Snippet */}
            {currentQuiz.codeSnippet && (
              <pre className="text-xs font-mono text-rose-200 bg-black/40 p-3 rounded-2xl border border-white/[0.08] overflow-x-auto">
                <code>{currentQuiz.codeSnippet}</code>
              </pre>
            )}

            {/* Options List */}
            <div className="space-y-2">
              {currentQuiz.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuiz.correctIndex;

                let btnStyle = 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] text-slate-200';

                if (quizAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-medium ring-2 ring-rose-500/30';
                  } else {
                    btnStyle = 'bg-black/20 border-white/[0.04] text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-opt-${idx}`}
                    disabled={quizAnswered}
                    onClick={() => handleSelectQuizOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group active:scale-[0.99] backdrop-blur-md ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-white/[0.08]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm">{option}</span>
                    </div>

                    {quizAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {quizAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Question Button */}
            {quizAnswered && (
              <div className="space-y-3 pt-1 animate-fadeIn">
                <div className={`p-3.5 rounded-2xl border backdrop-blur-md ${
                  selectedOption === currentQuiz.correctIndex
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
                }`}>
                  <div className="font-bold text-xs mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQuiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Правильно! (+{10 + (quizStreak - 1) * 2} балів)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Пояснення:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentQuiz.explanation}
                  </p>
                </div>

                <button
                  id="btn-next-quiz"
                  onClick={handleNextQuizQuestion}
                  className="w-full py-2.5 px-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Наступне питання</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
