import React from 'react';

interface RaspberryLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const RaspberryLogo: React.FC<RaspberryLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom Raspberry SVG with depth, gloss and leaves */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]">
          <defs>
            <linearGradient id="malynaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <radialGradient id="berryShine" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9f1239" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Green leaves on top */}
          <path
            d="M 50 25 C 45 10 32 12 25 18 C 30 26 42 24 50 25 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M 50 25 C 55 10 68 12 75 18 C 70 26 58 24 50 25 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M 50 25 C 50 8 48 5 50 2 C 52 5 52 14 50 25 Z"
            stroke="#166534"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Raspberry Drupelets (cluster of berries) */}
          {/* Top row */}
          <circle cx="37" cy="38" r="11" fill="url(#malynaGrad)" />
          <circle cx="37" cy="38" r="11" fill="url(#berryShine)" />
          
          <circle cx="63" cy="38" r="11" fill="url(#malynaGrad)" />
          <circle cx="63" cy="38" r="11" fill="url(#berryShine)" />

          {/* Middle top */}
          <circle cx="50" cy="42" r="12" fill="url(#malynaGrad)" />
          <circle cx="50" cy="42" r="12" fill="url(#berryShine)" />

          {/* Middle tier left & right */}
          <circle cx="26" cy="53" r="11.5" fill="url(#malynaGrad)" />
          <circle cx="26" cy="53" r="11.5" fill="url(#berryShine)" />

          <circle cx="74" cy="53" r="11.5" fill="url(#malynaGrad)" />
          <circle cx="74" cy="53" r="11.5" fill="url(#berryShine)" />

          {/* Middle tier inner */}
          <circle cx="38" cy="58" r="12" fill="url(#malynaGrad)" />
          <circle cx="38" cy="58" r="12" fill="url(#berryShine)" />

          <circle cx="62" cy="58" r="12" fill="url(#malynaGrad)" />
          <circle cx="62" cy="58" r="12" fill="url(#berryShine)" />

          {/* Lower tier */}
          <circle cx="32" cy="72" r="11" fill="url(#malynaGrad)" />
          <circle cx="32" cy="72" r="11" fill="url(#berryShine)" />

          <circle cx="68" cy="72" r="11" fill="url(#malynaGrad)" />
          <circle cx="68" cy="72" r="11" fill="url(#berryShine)" />

          <circle cx="50" cy="70" r="12.5" fill="url(#malynaGrad)" />
          <circle cx="50" cy="70" r="12.5" fill="url(#berryShine)" />

          {/* Bottom berry tip */}
          <circle cx="41" cy="84" r="9.5" fill="url(#malynaGrad)" />
          <circle cx="41" cy="84" r="9.5" fill="url(#berryShine)" />

          <circle cx="59" cy="84" r="9.5" fill="url(#malynaGrad)" />
          <circle cx="59" cy="84" r="9.5" fill="url(#berryShine)" />

          <circle cx="50" cy="88" r="8" fill="url(#malynaGrad)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight text-white flex items-center gap-1.5 ${textSizes[size]}`}>
            <span>Flexbox</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500">
              by Malynivka
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
            Інтерактивна школа верстки
          </span>
        </div>
      )}
    </div>
  );
};
