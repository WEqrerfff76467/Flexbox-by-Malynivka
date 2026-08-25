import React, { useState } from 'react';
import { X, Search, Check, Copy, Sparkles, BookOpen } from 'lucide-react';
import { RaspberryLogo } from '../common/RaspberryLogo';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickRules = [
    {
      prop: 'display: flex | inline-flex',
      desc: 'Вмикає flex-контекст. За замовчуванням елементи шикуються в рядок (row).',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'flex-direction: row | row-reverse | column | column-reverse',
      desc: 'Встановлює головну вісь. row = горизонталь, column = вертикаль.',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly',
      desc: 'Вирівнює елементи вздовж ГОЛОВНОЇ осі (Main Axis).',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'align-items: stretch | flex-start | center | flex-end | baseline',
      desc: 'Вирівнює елементи вздовж ПОПЕРЕЧНОЇ осі (Cross Axis) всередині рядка.',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'flex-wrap: nowrap | wrap | wrap-reverse',
      desc: 'Дозволяє перенесення на новий рядок при нестачі місця.',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'gap: 16px; (row-gap / column-gap)',
      desc: 'Чисті відступи між елементами без зовнішніх полів.',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'align-content: stretch | center | flex-start | space-between',
      desc: 'Вирівнює ЦІЛІ РЯДКИ при багаторядковій сітці (flex-wrap: wrap).',
      target: 'Батьківський контейнер',
    },
    {
      prop: 'align-self: auto | flex-start | center | flex-end | stretch',
      desc: 'Індивідуальне вирівнювання конкретного flex-елемента.',
      target: 'Окремий елемент (Item)',
    },
    {
      prop: 'flex-grow: 0 | 1 | 2',
      desc: 'Коефіцієнт жадібності до вільного простору (default: 0).',
      target: 'Окремий елемент (Item)',
    },
    {
      prop: 'flex-shrink: 1 | 0',
      desc: 'Коефіцієнт стискання при дефіциті місця (0 = ніколи не стискатися!).',
      target: 'Окремий елемент (Item)',
    },
    {
      prop: 'flex-basis: auto | 200px | 0',
      desc: 'Початковий базовий розмір елемента перед розрахунком grow/shrink.',
      target: 'Окремий елемент (Item)',
    },
    {
      prop: 'order: 0 | 1 | -1',
      desc: 'Змінює візуальний порядок відображення (-1 = на самий початок).',
      target: 'Окремий елемент (Item)',
    },
  ];

  const filteredRules = quickRules.filter(
    (r) =>
      r.prop.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.target.toLowerCase().includes(search.toLowerCase())
  );

  const copyRule = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <RaspberryLogo size="sm" showText={false} />
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="truncate">Шпаргалка CSS Flexbox</span>
                <span className="text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono hidden sm:inline">
                  Malynivka
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300/80 truncate">12 властивостей та синтаксис</p>
            </div>
          </div>
          <button
            id="btn-close-cheatsheet"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-white/[0.08] bg-black/20">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук властивості (justify, align-self, gap)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/60 focus:bg-white/[0.08] backdrop-blur-md transition-all"
            />
          </div>
        </div>

        {/* List of Rules */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1">
          {filteredRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-rose-500/40 rounded-2xl transition-all group backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <code className="text-xs sm:text-sm font-bold text-rose-300 font-mono bg-rose-500/15 px-2 sm:px-2.5 py-0.5 rounded-full border border-rose-500/20 break-all sm:break-normal">
                      {rule.prop}
                    </code>
                    <span className="text-[9px] sm:text-[10px] text-slate-300/80 bg-white/[0.06] border border-white/[0.06] px-2 py-0.5 rounded-full">
                      {rule.target}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">{rule.desc}</p>
                </div>
                <button
                  onClick={() => copyRule(rule.prop)}
                  className="shrink-0 p-1.5 sm:p-2 sm:px-3 rounded-full bg-white/[0.04] hover:bg-rose-500 text-slate-300 hover:text-white border border-white/[0.08] transition-all text-xs flex items-center gap-1 active:scale-95"
                  title="Скопіювати рядок"
                >
                  {copiedText === rule.prop ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-semibold hidden sm:inline">Скопійовано!</span>
                    </>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* BEM Cheatsheet section */}
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 backdrop-blur-md">
            <h4 className="text-xs sm:text-sm font-bold text-rose-300 flex items-center gap-1.5 mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              Золоте правило BEM у Flexbox:
            </h4>
            <pre className="text-[11px] sm:text-xs font-mono text-slate-300 bg-black/40 p-2.5 sm:p-3 rounded-xl border border-white/[0.06] overflow-x-auto">
{`.card-list { display: flex; gap: 16px; }               /* Блок */
.card-list__item { flex: 1; }                          /* Елемент */
.card-list__item--featured { align-self: flex-start; } /* Модифікатор */`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
          <span className="truncate pr-2 text-[11px]">Клікніть іконку для копіювання</span>
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all shadow-[0_2px_10px_rgba(244,63,94,0.4)] active:scale-95 text-xs shrink-0"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};
