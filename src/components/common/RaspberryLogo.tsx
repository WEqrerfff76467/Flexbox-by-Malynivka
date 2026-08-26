import React from 'react';
import malynivkaCatImg from '../../assets/images/malynivka_cat.jpg';

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
  // Increased sizes: bigger container and perfectly round
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {/* Perfectly round, enlarged Raspberry Cat Mascot */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <div className="w-full h-full rounded-full p-1 overflow-hidden shadow-[0_0_22px_rgba(244,63,94,0.45)] border-2 border-rose-500/50 bg-[#0d1222] flex items-center justify-center transition-transform hover:scale-105">
          <img
            src={malynivkaCatImg}
            alt="Flexbox by Malynivka Mascot"
            className="w-full h-full object-cover rounded-full select-none"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div
            className={`font-extrabold tracking-tight text-white flex items-center gap-1 sm:gap-1.5 ${textSizes[size]} whitespace-nowrap`}
          >
            <span>Flexbox</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500">
              by Malynivka
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5 hidden sm:block truncate">
            Інтерактивна школа верстки
          </span>
        </div>
      )}
    </div>
  );
};
