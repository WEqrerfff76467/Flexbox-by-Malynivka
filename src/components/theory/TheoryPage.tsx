import React, { useState } from 'react';
import { motion } from 'motion/react';
import { THEORY_PROPERTIES } from '../../data/theoryData';
import { TheoryProperty, FlexContainerStyle, FlexItemData } from '../../types/flexbox';
import { AxisIndicator } from '../common/AxisIndicator';
import { CodeViewer } from '../common/CodeViewer';
import { RaspberryIcon } from '../common/RaspberryIcon';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  Box, 
  CheckCircle2, 
  Lightbulb, 
  ChevronRight,
  Play,
  RotateCcw,
  Sliders,
  Search,
  BookMarked
} from 'lucide-react';

export const TheoryPage: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'container' | 'item'>('all');
  const [activePropertyId, setActivePropertyId] = useState<string>(THEORY_PROPERTIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  // Mobile sub-tab: 'sandbox' | 'explanation'
  const [mobileViewTab, setMobileViewTab] = useState<'sandbox' | 'explanation'>('sandbox');

  // Active property live state for the embedded interactive sandbox
  const [activeValues, setActiveValues] = useState<Record<string, string>>({
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'flex-wrap': 'nowrap',
    'align-content': 'normal',
    gap: '16px',
    'align-self': 'auto',
    'flex-grow': '0',
    'flex-shrink': '1',
    'flex-basis': 'auto',
    order: '0',
  });

  const activeProp = THEORY_PROPERTIES.find((p) => p.id === activePropertyId) || THEORY_PROPERTIES[0];

  const filteredProperties = THEORY_PROPERTIES.filter((p) => {
    const matchesTarget = selectedTarget === 'all' || p.target === selectedTarget;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.analogy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTarget && matchesSearch;
  });

  // Calculate live container styles for previewing the active property
  const getPreviewContainerStyle = (): FlexContainerStyle => {
    return {
      display: (activeValues['display'] as 'flex' | 'inline-flex') || 'flex',
      flexDirection: (activeValues['flex-direction'] as any) || 'row',
      flexWrap: (activeValues['flex-wrap'] as any) || 'nowrap',
      justifyContent: (activeValues['justify-content'] as any) || 'flex-start',
      alignItems: (activeValues['align-items'] as any) || 'stretch',
      alignContent: (activeValues['align-content'] as any) || 'normal',
      gap: parseInt(activeValues['gap']) || 16,
      minHeight: 180,
      padding: 16,
    };
  };

  // Preview items with special highlight on Item 2 (The Golden Target Raspberry)
  const getPreviewItems = (): FlexItemData[] => {
    const isItemProperty = activeProp.target === 'item';

    return [
      {
        id: 'p-1',
        label: 'Малинка #1',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Малинка #1',
      },
      {
        id: 'p-2',
        label: 'Малинка #2 (Цільова)',
        order: isItemProperty && activeProp.id === 'order' ? parseInt(activeValues['order']) || 0 : 0,
        flexGrow: isItemProperty && activeProp.id === 'flex-grow' ? parseInt(activeValues['flex-grow']) || 0 : 0,
        flexShrink: isItemProperty && activeProp.id === 'flex-shrink' ? parseInt(activeValues['flex-shrink']) || 1 : 1,
        flexBasis: isItemProperty && activeProp.id === 'flex-basis' ? activeValues['flex-basis'] || 'auto' : 'auto',
        alignSelf: isItemProperty && activeProp.id === 'align-self' ? (activeValues['align-self'] as any) || 'auto' : 'auto',
        colorPreset: 'amber',
        customText: 'Золота Малинка #2 (Цільова)',
      },
      {
        id: 'p-3',
        label: 'Малинка #3',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Малинка #3',
      },
      {
        id: 'p-4',
        label: 'Малинка #4',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Малинка #4',
      },
    ];
  };

  const currentContainerStyle = getPreviewContainerStyle();
  const currentItems = getPreviewItems();

  const handleValueChange = (propertyId: string, val: string) => {
    setActiveValues((prev) => ({
      ...prev,
      [propertyId]: val,
    }));
  };

  const handleResetActive = () => {
    const defaultVal = activeProp.values.find((v) => v.isDefault)?.value || activeProp.values[0].value;
    handleValueChange(activeProp.id, defaultVal);
  };

  return (
    <div className="max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 animate-fadeIn pb-20 lg:pb-10">
      {/* Sleek Compact Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 glass-panel p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0 backdrop-blur-md">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>Теоретичний Довідник</span>
              <span className="text-[11px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                12 властивостей
              </span>
            </h1>
            <p className="text-xs text-slate-300/90 hidden sm:block mt-0.5">
              Опануйте Flexbox з наочними аналогіями, інтерактивними прикладами та готовим кодом
            </p>
          </div>
        </div>

        {/* Filter Switcher & Search */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-xl shrink-0">
            <button
              id="filter-all"
              onClick={() => setSelectedTarget('all')}
              className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                selectedTarget === 'all' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedTarget === 'all' && (
                <motion.div
                  layoutId="theory-filter-pill"
                  className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_12px_rgba(244,63,94,0.4)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Усі ({THEORY_PROPERTIES.length})</span>
            </button>
            <button
              id="filter-container"
              onClick={() => setSelectedTarget('container')}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                selectedTarget === 'container' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedTarget === 'container' && (
                <motion.div
                  layoutId="theory-filter-pill"
                  className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_12px_rgba(244,63,94,0.4)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Box className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Контейнер (7)</span>
            </button>
            <button
              id="filter-item"
              onClick={() => setSelectedTarget('item')}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                selectedTarget === 'item' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedTarget === 'item' && (
                <motion.div
                  layoutId="theory-filter-pill"
                  className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_12px_rgba(244,63,94,0.4)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Layers className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Елементи (5)</span>
            </button>
          </div>

          <div className="relative shrink-0 hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Швидкий пошук..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-full pl-9 pr-3.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.07] w-44 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Quick Property Strip (Mobile & Tablet Navigation, hidden on Desktop/Laptops where left list is present) */}
      <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
        {filteredProperties.map((prop) => {
          const isSelected = prop.id === activePropertyId;
          return (
            <button
              key={prop.id}
              id={`quick-prop-${prop.id}`}
              onClick={() => setActivePropertyId(prop.id)}
              className={`relative px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold shrink-0 transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'text-white border-rose-400/40'
                  : 'bg-white/[0.04] text-slate-300 border-white/[0.08] backdrop-blur-lg hover:border-white/20 hover:text-white'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="theory-quick-prop-pill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              {prop.target === 'container' ? (
                <Box className={`w-3.5 h-3.5 relative z-10 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
              ) : (
                <Layers className={`w-3.5 h-3.5 relative z-10 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
              )}
              <span className="relative z-10">{prop.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Mode Switcher: Sandbox vs Theory (eliminates vertical scroll fatigue on mobile) */}
      <div className="flex sm:hidden items-center justify-between bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
        <button
          onClick={() => setMobileViewTab('sandbox')}
          className={`relative flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors ${
            mobileViewTab === 'sandbox' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {mobileViewTab === 'sandbox' && (
            <motion.div
              layoutId="theory-mobile-tab-pill"
              className="absolute inset-0 bg-rose-500 rounded-full shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <Sliders className="w-3.5 h-3.5 relative z-10" />
          <span className="relative z-10">Інтерактив & Значення</span>
        </button>
        <button
          onClick={() => setMobileViewTab('explanation')}
          className={`relative flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors ${
            mobileViewTab === 'explanation' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {mobileViewTab === 'explanation' && (
            <motion.div
              layoutId="theory-mobile-tab-pill"
              className="absolute inset-0 bg-rose-500 rounded-full shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <BookMarked className="w-3.5 h-3.5 relative z-10" />
          <span className="relative z-10">Аналогія & Код</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Properties List (Desktop Only, Hidden on Small Mobile where Horizontal Strip is used) */}
        <div className="hidden lg:block lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            <span>Властивості Flexbox</span>
            <span className="text-rose-400 font-mono">{filteredProperties.length} знайдено</span>
          </div>

          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredProperties.map((prop) => {
              const isSelected = prop.id === activePropertyId;
              return (
                <button
                  key={prop.id}
                  id={`prop-btn-${prop.id}`}
                  onClick={() => setActivePropertyId(prop.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-950/40 via-[#161c2c] to-slate-900 border-rose-500/60 shadow-[0_4px_20px_rgba(244,63,94,0.2)] backdrop-blur-xl'
                      : 'bg-[#101422]/60 hover:bg-[#151c2e]/80 border-white/[0.06] hover:border-white/[0.12] backdrop-blur-lg'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-rose-300' : 'text-slate-200 group-hover:text-white'}`}>
                        {prop.name}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                          prop.target === 'container'
                            ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                        }`}
                      >
                        {prop.target === 'container' ? 'Контейнер' : 'Елемент'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {prop.summary}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-rose-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Detail & Playground */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 relative overflow-hidden">
            {/* Active Property Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono flex items-center gap-2">
                  <span className="text-rose-400">{activeProp.name}</span>
                </h2>
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                    activeProp.target === 'container'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {activeProp.target === 'container' ? 'Контейнер' : 'Елемент'}
                </span>
              </div>

              <button
                onClick={handleResetActive}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md transition-all active:scale-95"
                title="Скинути на значення за замовчуванням"
              >
                <RotateCcw className="w-3 h-3 text-rose-400" />
                <span>Скинути</span>
              </button>
            </div>

            {/* SANDBOX SECTION (Visible on desktop OR when mobileViewTab is 'sandbox') */}
            <div className={`space-y-4 ${mobileViewTab === 'explanation' ? 'hidden sm:block' : 'block'}`}>
              {/* Dynamic Axis Visualizer */}
              <AxisIndicator
                flexDirection={
                  activeProp.id === 'flex-direction'
                    ? (activeValues['flex-direction'] as any) || 'row'
                    : 'row'
                }
              />

              {/* Value Selector Buttons (Compact Grid) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-rose-400" />
                    <span>Оберіть значення для перевірки:</span>
                  </span>
                  <span className="font-mono text-rose-400 font-bold bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-500/30 text-[11px] backdrop-blur-md">
                    {activeValues[activeProp.id] || activeProp.values[0].value}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {activeProp.values.map((v) => {
                    const isValActive = (activeValues[activeProp.id] || activeProp.values[0].value) === v.value;
                    return (
                      <button
                        key={v.value}
                        id={`val-btn-${v.value}`}
                        onClick={() => handleValueChange(activeProp.id, v.value)}
                        className={`relative py-2 px-3 rounded-full text-xs font-mono font-medium transition-colors text-center truncate border ${
                          isValActive
                            ? 'text-white font-bold border-rose-400/50'
                            : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white backdrop-blur-md'
                        }`}
                        title={v.description}
                      >
                        {isValActive && (
                          <motion.div
                            layoutId={`theory-val-pill-${activeProp.id}`}
                            className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-[0_4px_16px_rgba(244,63,94,0.45)]"
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{v.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Flex Stage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Живий результат:</span>
                  {activeProp.target === 'item' && (
                    <span className="text-amber-400 flex items-center gap-1 font-semibold text-[11px]">
                      <RaspberryIcon variant="gold" size="xs" />
                      <span>Цільова малинка #2</span>
                    </span>
                  )}
                </div>

                <div className="bg-[#06080e]/90 rounded-2xl p-3 sm:p-4 border border-white/[0.08] overflow-hidden min-h-[160px] flex flex-col justify-center shadow-inner">
                  <div
                    style={{
                      display: currentContainerStyle.display,
                      flexDirection: currentContainerStyle.flexDirection,
                      flexWrap: currentContainerStyle.flexWrap,
                      justifyContent: currentContainerStyle.justifyContent,
                      alignItems: currentContainerStyle.alignItems,
                      alignContent: currentContainerStyle.alignContent,
                      gap: `${currentContainerStyle.gap}px`,
                      minHeight: '140px',
                      padding: '12px',
                      backgroundColor: 'rgba(15, 20, 32, 0.75)',
                      borderRadius: '16px',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                    }}
                  >
                    {currentItems.map((it) => {
                      const isTargetItem = it.id === 'p-2';
                      const isItemTargetActive = isTargetItem && activeProp.target === 'item';

                      return (
                        <div
                          key={it.id}
                          style={{
                            order: it.order,
                            flexGrow: it.flexGrow,
                            flexShrink: it.flexShrink,
                            flexBasis: it.flexBasis,
                            alignSelf: it.alignSelf,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          className={`rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-md min-w-[70px] sm:min-w-[85px] min-h-[65px] border transition-all ${
                            isItemTargetActive
                              ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 text-slate-950 font-bold border-amber-300 ring-4 ring-amber-400/50 scale-105 z-10'
                              : isTargetItem
                              ? 'bg-gradient-to-br from-amber-950/80 to-slate-900 border-amber-500/50 text-amber-200'
                              : 'bg-gradient-to-br from-rose-600/90 to-rose-950 text-white font-medium border-rose-400/40 shadow-[0_4px_12px_rgba(244,63,94,0.2)]'
                          }`}
                        >
                          <div className="mb-1 flex items-center justify-center">
                            <RaspberryIcon variant={isTargetItem ? 'gold' : 'rose'} size="sm" />
                          </div>
                          <span className={`text-[11px] font-bold ${isItemTargetActive ? 'text-slate-950' : 'text-white'}`}>
                            {it.label}
                          </span>
                          <div className={`text-[9px] font-mono ${isItemTargetActive ? 'text-slate-900 font-semibold' : 'text-slate-300 opacity-80'}`}>
                            {isItemTargetActive ? `${activeProp.name}: ${activeValues[activeProp.id]}` : `#${it.id.replace('p-', '')}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* THEORY & ANALOGY SECTION (Visible on desktop OR when mobileViewTab is 'explanation') */}
            <div className={`space-y-4 ${mobileViewTab === 'sandbox' ? 'hidden sm:block' : 'block'}`}>
              {/* Real World Analogy */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-[#131929] to-[#101422] border border-rose-500/25 space-y-1.5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>Життєва аналогія:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeProp.analogy}
                </p>
              </div>

              {/* Tips */}
              {activeProp.tips && activeProp.tips.length > 0 && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs backdrop-blur-md">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Порада для розробника: </span>
                    <span className="opacity-90">{activeProp.tips.join(' ')}</span>
                  </div>
                </div>
              )}

              {/* Values Breakdown Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Усі допустимі значення:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProp.values.map((v) => (
                    <div
                      key={v.value}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md space-y-1 hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-rose-300">{v.value}</span>
                        {v.isDefault && (
                          <span className="text-[9px] bg-white/[0.08] text-slate-300 px-2 py-0.5 rounded-full font-mono">
                            default
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300/90 leading-normal">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic CSS Code Viewer */}
            <CodeViewer
              containerStyle={currentContainerStyle}
              items={currentItems}
              customTitle={`Готовий код для властивості ${activeProp.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
