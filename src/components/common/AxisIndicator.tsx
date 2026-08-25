import React from 'react';
import { FlexDirection } from '../../types/flexbox';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface AxisIndicatorProps {
  flexDirection: FlexDirection;
  compact?: boolean;
}

export const AxisIndicator: React.FC<AxisIndicatorProps> = ({
  flexDirection,
  compact = false,
}) => {
  const isRow = flexDirection === 'row' || flexDirection === 'row-reverse';
  const isReverse = flexDirection === 'row-reverse' || flexDirection === 'column-reverse';

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs shadow-sm ${compact ? 'text-[11px] py-2' : ''}`}>
      {/* Main Axis Badge */}
      <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse" />
          <span className="text-slate-300 font-semibold text-[11px] sm:text-xs">Головна вісь:</span>
        </div>
        <div className="flex items-center gap-1 bg-rose-500/15 text-rose-300 border border-rose-500/25 px-2 sm:px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium backdrop-blur-md shrink-0">
          {isRow ? (
            <>
              <span>{isReverse ? 'Справа наліво' : 'Зліва направо'}</span>
              <ArrowRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${isReverse ? 'rotate-180' : ''}`} />
            </>
          ) : (
            <>
              <span>{isReverse ? 'Знизу вгору' : 'Зверху вниз'}</span>
              <ArrowDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${isReverse ? 'rotate-180' : ''}`} />
            </>
          )}
        </div>
        <span className="text-slate-400 text-[10px] hidden lg:inline font-mono">justify-content</span>
      </div>

      <div className="w-px h-4 bg-white/10 hidden sm:block" />

      {/* Cross Axis Badge */}
      <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
          <span className="text-slate-300 font-semibold text-[11px] sm:text-xs">Поперечна вісь:</span>
        </div>
        <div className="flex items-center gap-1 bg-sky-500/15 text-sky-300 border border-sky-500/25 px-2 sm:px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium backdrop-blur-md shrink-0">
          {isRow ? (
            <>
              <span>Вертикальна</span>
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </>
          ) : (
            <>
              <span>Горизонтальна</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </>
          )}
        </div>
        <span className="text-slate-400 text-[10px] hidden lg:inline font-mono">align-items</span>
      </div>
    </div>
  );
};
