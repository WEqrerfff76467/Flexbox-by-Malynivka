import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FlexContainerStyle, 
  FlexItemData, 
  FlexDirection, 
  FlexWrap, 
  JustifyContent, 
  AlignItems, 
  AlignContent, 
  AlignSelf 
} from '../../types/flexbox';
import { PRESET_LAYOUTS } from '../../data/presetsData';
import { AxisIndicator } from '../common/AxisIndicator';
import { CodeViewer } from '../common/CodeViewer';
import { RaspberryIcon } from '../common/RaspberryIcon';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Box, 
  Layers, 
  Smartphone, 
  Monitor, 
  Tablet,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Code2
} from 'lucide-react';

export const EditorPage: React.FC = () => {
  // Container State
  const [containerStyle, setContainerStyle] = useState<FlexContainerStyle>({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'normal',
    gap: 16,
    minHeight: 240,
    padding: 16,
  });

  // Items State
  const [items, setItems] = useState<FlexItemData[]>([
    {
      id: 'item-1',
      label: 'Малинка #1',
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      colorPreset: 'rose',
      customText: 'Малина #1',
    },
    {
      id: 'item-2',
      label: 'Малинка #2',
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      colorPreset: 'pink',
      customText: 'Малина #2',
    },
    {
      id: 'item-3',
      label: 'Малинка #3',
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      colorPreset: 'crimson',
      customText: 'Малина #3',
    },
  ]);

  // Selected item for item-level inspection
  const [selectedItemId, setSelectedItemId] = useState<string | null>('item-1');

  // Preview container width simulation
  const [canvasWidthMode, setCanvasWidthMode] = useState<'full' | 'tablet' | 'mobile'>('full');

  // Mobile navigation tab: 'canvas' | 'container' | 'item' | 'code'
  const [mobileTab, setMobileTab] = useState<'canvas' | 'container' | 'item' | 'code'>('canvas');

  // Add Item
  const handleAddItem = () => {
    const newId = `item-${Date.now()}`;
    const colors = ['rose', 'pink', 'crimson', 'amber', 'emerald', 'indigo'];
    const color = colors[items.length % colors.length];

    const newItem: FlexItemData = {
      id: newId,
      label: `Малинка #${items.length + 1}`,
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      colorPreset: color,
      customText: `Малина #${items.length + 1}`,
    };

    setItems([...items, newItem]);
    setSelectedItemId(newId);
  };

  // Remove Item
  const handleRemoveItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (items.length <= 1) return;
    const filtered = items.filter((it) => it.id !== id);
    setItems(filtered);
    if (selectedItemId === id) {
      setSelectedItemId(filtered[0]?.id || null);
    }
  };

  // Update selected item property
  const updateSelectedItem = (key: keyof FlexItemData, value: any) => {
    if (!selectedItemId) return;
    setItems((prev) =>
      prev.map((it) => (it.id === selectedItemId ? { ...it, [key]: value } : it))
    );
  };

  // Load Preset
  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_LAYOUTS.find((p) => p.id === presetId);
    if (preset) {
      setContainerStyle({ ...preset.container });
      setItems([...preset.items]);
      setSelectedItemId(preset.items[0]?.id || null);
    }
  };

  // Reset to default
  const handleReset = () => {
    setContainerStyle({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 16,
      minHeight: 240,
      padding: 16,
    });
    setItems([
      {
        id: 'item-1',
        label: 'Малинка #1',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Малина #1',
      },
      {
        id: 'item-2',
        label: 'Малинка #2',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'pink',
        customText: 'Малина #2',
      },
      {
        id: 'item-3',
        label: 'Малинка #3',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'crimson',
        customText: 'Малина #3',
      },
    ]);
    setSelectedItemId('item-1');
  };

  const selectedItem = items.find((it) => it.id === selectedItemId);

  const getCanvasWidthClass = () => {
    if (canvasWidthMode === 'mobile') return 'max-w-xs';
    if (canvasWidthMode === 'tablet') return 'max-w-md';
    return 'w-full';
  };

  // Reusable Canvas Component to avoid duplicate JSX
  const renderFlexCanvas = (isMini = false) => (
    <div
      className={`transition-all duration-300 w-full ${getCanvasWidthClass()}`}
      style={{
        display: containerStyle.display,
        flexDirection: containerStyle.flexDirection,
        flexWrap: containerStyle.flexWrap,
        justifyContent: containerStyle.justifyContent,
        alignItems: containerStyle.alignItems,
        alignContent: containerStyle.alignContent,
        gap: `${containerStyle.gap}px`,
        minHeight: isMini ? '120px' : '220px',
        padding: `${containerStyle.padding}px`,
        backgroundColor: '#0d111a',
        borderRadius: '16px',
        border: '1px solid rgba(225, 29, 72, 0.3)',
      }}
    >
      {items.map((it) => {
        const isSelected = it.id === selectedItemId;

        return (
          <div
            key={it.id}
            onClick={() => setSelectedItemId(it.id)}
            style={{
              order: it.order,
              flexGrow: it.flexGrow,
              flexShrink: it.flexShrink,
              flexBasis: it.flexBasis,
              alignSelf: it.alignSelf,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className={`cursor-pointer rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center shadow-lg transition-all select-none ${
              isMini ? 'min-w-[65px] min-h-[55px]' : 'min-w-[80px] min-h-[70px]'
            } relative ${
              isSelected
                ? 'bg-gradient-to-br from-amber-500 via-rose-500 to-rose-700 text-white ring-4 ring-amber-400/50 shadow-2xl scale-[1.03] z-10'
                : 'bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 hover:border-rose-500/50 border border-slate-700 text-slate-100'
            }`}
          >
            {isSelected && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shadow">
                ✓
              </span>
            )}
            <div className="mb-0.5 flex items-center justify-center">
              <RaspberryIcon variant={isSelected ? 'gold' : 'rose'} size={isMini ? 'xs' : 'sm'} />
            </div>
            <span className={`font-bold truncate max-w-full ${isMini ? 'text-[10px]' : 'text-xs'}`}>
              {it.customText}
            </span>
            {!isMini && (
              <div className="text-[9px] opacity-75 font-mono flex flex-wrap justify-center gap-1 mt-0.5">
                {it.flexGrow > 0 && <span className="bg-black/30 px-1 rounded">g:{it.flexGrow}</span>}
                {it.alignSelf !== 'auto' && <span className="bg-black/30 px-1 rounded">{it.alignSelf}</span>}
                {it.order !== 0 && <span className="bg-black/30 px-1 rounded">o:{it.order}</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 animate-fadeIn pb-20 lg:pb-10">
      {/* Compact Top Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 glass-panel p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0 backdrop-blur-md">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>Візуальний Flexbox Редактор</span>
              <span className="text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-mono hidden sm:inline backdrop-blur-md">
                Live Studio
              </span>
            </h1>
            <p className="text-[11px] text-slate-300/80 hidden sm:block">
              Налаштовуйте контейнер та кожен елемент із миттєвим CSS експортом
            </p>
          </div>
        </div>

        {/* Presets, Responsive Switcher & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Preset Selector */}
          <select
            id="select-preset"
            onChange={(e) => handleLoadPreset(e.target.value)}
            defaultValue=""
            className="bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 rounded-full px-3.5 py-1.5 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.08] cursor-pointer flex-1 sm:flex-none backdrop-blur-xl transition-all"
          >
            <option value="" disabled className="bg-slate-900 text-slate-300">✨ UI Шаблони...</option>
            {PRESET_LAYOUTS.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                {p.title}
              </option>
            ))}
          </select>

          {/* Viewport Width Emulators with Sliding Capsule */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
            {[
              { id: 'full' as const, icon: Monitor, title: 'Повна ширина (Desktop)' },
              { id: 'tablet' as const, icon: Tablet, title: 'Планшет (Tablet)' },
              { id: 'mobile' as const, icon: Smartphone, title: 'Мобільний екран (Mobile)' },
            ].map(({ id, icon: VIcon, title }) => {
              const isActive = canvasWidthMode === id;
              return (
                <button
                  key={id}
                  onClick={() => setCanvasWidthMode(id)}
                  className={`relative p-1.5 px-2.5 rounded-full text-xs transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={title}
                >
                  {isActive && (
                    <motion.div
                      layoutId="editor-viewport-pill"
                      className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <VIcon className="w-3.5 h-3.5 relative z-10" />
                </button>
              );
            })}
          </div>

          <button
            id="btn-editor-reset"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] backdrop-blur-md transition-all active:scale-95"
            title="Скинути всі налаштування"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Скинути</span>
          </button>
        </div>
      </div>

      {/* Mobile Ergonomic View Switcher (Prevents endless vertical scrolling on phones) */}
      <div className="flex lg:hidden items-center justify-between bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
        {[
          { id: 'canvas' as const, label: 'Полотно', icon: Sparkles },
          { id: 'container' as const, label: 'Контейнер', icon: Box },
          { id: 'item' as const, label: 'Елемент', icon: Layers },
          { id: 'code' as const, label: 'Код', icon: Code2 },
        ].map(({ id, label, icon: TabIcon }) => {
          const isActive = mobileTab === id;
          return (
            <button
              key={id}
              onClick={() => setMobileTab(id)}
              className={`relative flex-1 py-1.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="editor-mobile-tab-pill"
                  className="absolute inset-0 bg-rose-500 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <TabIcon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Controls Panel vs Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Controls Panel (5 cols on desktop, Tab-filtered on mobile) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileTab === 'canvas' || mobileTab === 'code' ? 'hidden lg:block' : 'block'}`}>
          
          {/* CONTAINER CONTROLS */}
          <div className={`glass-panel rounded-3xl p-4 sm:p-5 space-y-4 ${
            mobileTab === 'item' ? 'hidden lg:block' : 'block'
          }`}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Властивості Контейнера
                </h3>
              </div>
              <span className="text-[11px] text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                .malyna-flex
              </span>
            </div>

            {/* flex-direction with Directional Icons and sliding pill */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>flex-direction:</span>
                <span className="text-rose-400 font-mono text-[11px]">{containerStyle.flexDirection}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { dir: 'row' as FlexDirection, label: 'row', icon: ArrowRight },
                  { dir: 'row-reverse' as FlexDirection, label: 'row-rev', icon: ArrowLeft },
                  { dir: 'column' as FlexDirection, label: 'col', icon: ArrowDown },
                  { dir: 'column-reverse' as FlexDirection, label: 'col-rev', icon: ArrowUp },
                ].map(({ dir, label, icon: DirIcon }) => {
                  const isActive = containerStyle.flexDirection === dir;
                  return (
                    <button
                      key={dir}
                      onClick={() => setContainerStyle({ ...containerStyle, flexDirection: dir })}
                      className={`relative py-1.5 px-2 text-xs rounded-full font-mono transition-colors border flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'text-white border-rose-400 font-bold'
                          : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white backdrop-blur-md'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="editor-flex-dir-pill"
                          className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_10px_rgba(244,63,94,0.4)]"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <DirIcon className="w-3 h-3 relative z-10" />
                      <span className="relative z-10">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* justify-content with sliding pill */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>justify-content (головна вісь):</span>
                <span className="text-rose-400 font-mono text-[11px]">{containerStyle.justifyContent}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    'flex-start',
                    'center',
                    'flex-end',
                    'space-between',
                    'space-around',
                    'space-evenly',
                  ] as JustifyContent[]
                ).map((j) => {
                  const isActive = containerStyle.justifyContent === j;
                  return (
                    <button
                      key={j}
                      onClick={() => setContainerStyle({ ...containerStyle, justifyContent: j })}
                      className={`relative py-1.5 px-2 text-[11px] rounded-full font-mono transition-colors border text-center truncate ${
                        isActive
                          ? 'text-white border-rose-400 font-bold'
                          : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white backdrop-blur-md'
                      }`}
                      title={j}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="editor-justify-content-pill"
                          className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{j}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* align-items with sliding pill */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>align-items (поперечна вісь):</span>
                <span className="text-rose-400 font-mono text-[11px]">{containerStyle.alignItems}</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as AlignItems[]).map((a) => {
                  const isActive = containerStyle.alignItems === a;
                  return (
                    <button
                      key={a}
                      onClick={() => setContainerStyle({ ...containerStyle, alignItems: a })}
                      className={`relative py-1.5 px-1.5 text-[11px] rounded-full font-mono transition-colors border text-center truncate ${
                        isActive
                          ? 'text-white border-rose-400 font-bold'
                          : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white backdrop-blur-md'
                      }`}
                      title={a}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="editor-align-items-pill"
                          className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{a}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* flex-wrap & Gap in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* flex-wrap */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>flex-wrap:</span>
                  <span className="text-rose-400 font-mono text-[11px]">{containerStyle.flexWrap}</span>
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['nowrap', 'wrap', 'wrap-reverse'] as FlexWrap[]).map((w) => {
                    const isActive = containerStyle.flexWrap === w;
                    return (
                      <button
                        key={w}
                        onClick={() => setContainerStyle({ ...containerStyle, flexWrap: w })}
                        className={`relative py-1 px-1.5 text-[10px] rounded-full font-mono transition-colors border text-center truncate ${
                          isActive
                            ? 'text-white border-rose-400 font-bold'
                            : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="editor-flex-wrap-pill"
                            className="absolute inset-0 bg-rose-500 rounded-full shadow-sm"
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{w}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gap Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>gap:</span>
                  <span className="text-rose-400 font-mono font-bold text-[11px]">{containerStyle.gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="4"
                  value={containerStyle.gap}
                  onChange={(e) => setContainerStyle({ ...containerStyle, gap: Number(e.target.value) })}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-black/40 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* ITEM LEVEL INSPECTOR */}
          <div className={`glass-panel rounded-3xl p-4 sm:p-5 space-y-4 ${
            mobileTab === 'container' ? 'hidden lg:block' : 'block'
          }`}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Інспектор Елемента
                </h3>
              </div>
              {selectedItem && (
                <span className="text-[10px] text-amber-300 font-mono bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {selectedItem.label}
                </span>
              )}
            </div>

            {/* Item Switcher Pill Bar with sliding indicator */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {items.map((it, idx) => {
                const isSelected = selectedItemId === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => setSelectedItemId(it.id)}
                    className={`relative px-3 py-1.5 text-xs rounded-full font-semibold shrink-0 transition-colors border ${
                      isSelected
                        ? 'text-slate-950 font-bold border-amber-400'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white backdrop-blur-md'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="editor-item-selector-pill"
                        className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">#{idx + 1} {it.customText}</span>
                  </button>
                );
              })}
              <button
                onClick={handleAddItem}
                className="p-1.5 px-2 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/30 transition-all shrink-0 active:scale-95"
                title="Додати елемент"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {selectedItem ? (
              <div className="space-y-3">
                {/* align-self with sliding pill */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>align-self (власне вирівнювання):</span>
                    <span className="text-amber-400 font-mono text-[11px]">{selectedItem.alignSelf}</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                    {(['auto', 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as AlignSelf[]).map((as) => {
                      const isActive = selectedItem.alignSelf === as;
                      return (
                        <button
                          key={as}
                          onClick={() => updateSelectedItem('alignSelf', as)}
                          className={`relative py-1 px-1 text-[10px] rounded-full font-mono transition-colors border text-center truncate ${
                            isActive
                              ? 'text-slate-950 font-bold border-amber-400'
                              : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="editor-item-align-self-pill"
                              className="absolute inset-0 bg-amber-500 rounded-full shadow-sm"
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                            />
                          )}
                          <span className="relative z-10">{as}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* flex-grow & flex-shrink with sliding pills */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>flex-grow:</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedItem.flexGrow}</span>
                    </label>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3].map((g) => {
                        const isActive = selectedItem.flexGrow === g;
                        return (
                          <button
                            key={g}
                            onClick={() => updateSelectedItem('flexGrow', g)}
                            className={`relative flex-1 py-1 text-xs rounded-full font-mono border transition-colors ${
                              isActive
                                ? 'text-slate-950 font-bold border-amber-400'
                                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="editor-item-flex-grow-pill"
                                className="absolute inset-0 bg-amber-500 rounded-full shadow-sm"
                                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              />
                            )}
                            <span className="relative z-10">{g}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>flex-shrink:</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedItem.flexShrink}</span>
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 0].map((s) => {
                        const isActive = selectedItem.flexShrink === s;
                        return (
                          <button
                            key={s}
                            onClick={() => updateSelectedItem('flexShrink', s)}
                            className={`relative flex-1 py-1 text-xs rounded-full font-mono border transition-colors ${
                              isActive
                                ? 'text-slate-950 font-bold border-amber-400'
                                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="editor-item-flex-shrink-pill"
                                className="absolute inset-0 bg-amber-500 rounded-full shadow-sm"
                                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              />
                            )}
                            <span className="relative z-10">{s}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* flex-basis & order with sliding pill */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">flex-basis:</label>
                    <select
                      value={selectedItem.flexBasis}
                      onChange={(e) => updateSelectedItem('flexBasis', e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 rounded-full px-3 py-1.5 focus:outline-none focus:border-amber-400/60 font-mono backdrop-blur-md"
                    >
                      <option value="auto" className="bg-slate-900">auto</option>
                      <option value="0px" className="bg-slate-900">0px</option>
                      <option value="80px" className="bg-slate-900">80px</option>
                      <option value="140px" className="bg-slate-900">140px</option>
                      <option value="33.33%" className="bg-slate-900">33.33%</option>
                      <option value="50%" className="bg-slate-900">50%</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>order:</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedItem.order}</span>
                    </label>
                    <div className="flex items-center gap-1">
                      {[-1, 0, 1, 2].map((ord) => {
                        const isActive = selectedItem.order === ord;
                        return (
                          <button
                            key={ord}
                            onClick={() => updateSelectedItem('order', ord)}
                            className={`relative flex-1 py-1 text-xs rounded-full font-mono border transition-colors ${
                              isActive
                                ? 'text-slate-950 font-bold border-amber-400'
                                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:border-white/20'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="editor-item-order-pill"
                                className="absolute inset-0 bg-amber-500 rounded-full shadow-sm"
                                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              />
                            )}
                            <span className="relative z-10">{ord}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Item Text & Remove */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={selectedItem.customText || ''}
                    onChange={(e) => updateSelectedItem('customText', e.target.value)}
                    placeholder="Назва елемента..."
                    className="flex-1 bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 rounded-full px-4 py-1.5 focus:outline-none focus:border-amber-400/60 backdrop-blur-md"
                  />
                  {items.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(selectedItem.id)}
                      className="p-1.5 px-2.5 rounded-full bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/20 transition-all text-xs active:scale-95"
                      title="Видалити елемент"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Оберіть елемент вище для редагування.</p>
            )}
          </div>
        </div>

        {/* Right Side: Visual Canvas & Code (7 cols on desktop, Tab-filtered on mobile) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'container' || mobileTab === 'item' ? 'hidden lg:block' : 'block'}`}>
          {/* Axis Indicator */}
          <AxisIndicator flexDirection={containerStyle.flexDirection} />

          {/* Live Canvas Card */}
          <div className="glass-panel rounded-3xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-xs sm:text-sm font-bold text-white">Робоче Полотно</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{items.length} ягід</span>
                <button
                  onClick={handleAddItem}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-all border border-rose-500/30 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Малинка</span>
                </button>
              </div>
            </div>

            {/* The Actual Dynamic Flex Stage */}
            <div className="flex justify-center bg-[#06080e]/90 rounded-2xl p-3 sm:p-5 border border-white/[0.08] overflow-hidden min-h-[240px] items-center shadow-inner">
              {renderFlexCanvas(false)}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>💡 Клікніть на будь-яку малинку на полотні, щоб налаштувати її індивідуально</span>
            </div>
          </div>

          {/* Dynamic Code Viewer with BEM / Tailwind / HTML exports */}
          <div className={`${mobileTab === 'canvas' ? 'hidden sm:block' : 'block'}`}>
            <CodeViewer
              containerStyle={containerStyle}
              items={items}
              customTitle="Експорт коду з редактора (BEM CSS / Tailwind / HTML)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
