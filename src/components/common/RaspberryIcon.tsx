import React, { useId } from 'react';

export interface RaspberryIconProps {
  variant?: 'pink' | 'rose' | 'gold' | 'amber' | 'dark' | 'white' | 'emerald';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

export const RaspberryIcon: React.FC<RaspberryIconProps> = ({
  variant = 'rose',
  size = 'md',
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');

  const sizeClasses: Record<string, string> = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const isNumericSize = typeof size === 'number';
  const sizeStyle = isNumericSize ? { width: `${size}px`, height: `${size}px` } : undefined;
  const sizeClass = !isNumericSize ? sizeClasses[size] || 'w-5 h-5' : '';

  // Gradient configurations for different raspberry colors
  const isGold = variant === 'gold' || variant === 'amber';
  const isDark = variant === 'dark';
  const isWhite = variant === 'white';
  const isEmerald = variant === 'emerald';

  const berryGradStops = isGold ? (
    <>
      <stop offset="0%" stopColor="#fef08a" />
      <stop offset="35%" stopColor="#f59e0b" />
      <stop offset="100%" stopColor="#b45309" />
    </>
  ) : isDark ? (
    <>
      <stop offset="0%" stopColor="#64748b" />
      <stop offset="50%" stopColor="#334155" />
      <stop offset="100%" stopColor="#0f172a" />
    </>
  ) : isWhite ? (
    <>
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="50%" stopColor="#e2e8f0" />
      <stop offset="100%" stopColor="#94a3b8" />
    </>
  ) : isEmerald ? (
    <>
      <stop offset="0%" stopColor="#6ee7b7" />
      <stop offset="40%" stopColor="#10b981" />
      <stop offset="100%" stopColor="#047857" />
    </>
  ) : (
    <>
      <stop offset="0%" stopColor="#fb7185" />
      <stop offset="40%" stopColor="#e11d48" />
      <stop offset="100%" stopColor="#881337" />
    </>
  );

  const glowColor = isGold ? 'rgba(245, 158, 11, 0.4)' : isEmerald ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none select-none ${sizeClass} ${className}`}
      style={sizeStyle}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {berryGradStops}
          </linearGradient>
          <linearGradient id={`lg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <radialGradient id={`sh-${uid}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Green calyx / leaves at top of raspberry */}
        <path
          d="M 50 25 C 44 8 28 10 22 17 C 28 25 40 24 50 25 Z"
          fill={`url(#lg-${uid})`}
        />
        <path
          d="M 50 25 C 56 8 72 10 78 17 C 72 25 60 24 50 25 Z"
          fill={`url(#lg-${uid})`}
        />
        <path
          d="M 50 25 C 50 10 47 6 50 2 C 53 6 53 15 50 25 Z"
          stroke="#166534"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Cluster of raspberry drupelets */}
        {/* Row 1 */}
        <circle cx="37" cy="38" r="11" fill={`url(#bg-${uid})`} />
        <circle cx="37" cy="38" r="11" fill={`url(#sh-${uid})`} />
        <circle cx="63" cy="38" r="11" fill={`url(#bg-${uid})`} />
        <circle cx="63" cy="38" r="11" fill={`url(#sh-${uid})`} />

        {/* Row 2 center */}
        <circle cx="50" cy="42" r="12" fill={`url(#bg-${uid})`} />
        <circle cx="50" cy="42" r="12" fill={`url(#sh-${uid})`} />

        {/* Row 2 sides */}
        <circle cx="26" cy="53" r="11.5" fill={`url(#bg-${uid})`} />
        <circle cx="26" cy="53" r="11.5" fill={`url(#sh-${uid})`} />
        <circle cx="74" cy="53" r="11.5" fill={`url(#bg-${uid})`} />
        <circle cx="74" cy="53" r="11.5" fill={`url(#sh-${uid})`} />

        {/* Row 3 inner */}
        <circle cx="38" cy="58" r="12" fill={`url(#bg-${uid})`} />
        <circle cx="38" cy="58" r="12" fill={`url(#sh-${uid})`} />
        <circle cx="62" cy="58" r="12" fill={`url(#bg-${uid})`} />
        <circle cx="62" cy="58" r="12" fill={`url(#sh-${uid})`} />

        {/* Row 4 lower */}
        <circle cx="32" cy="72" r="11" fill={`url(#bg-${uid})`} />
        <circle cx="32" cy="72" r="11" fill={`url(#sh-${uid})`} />
        <circle cx="68" cy="72" r="11" fill={`url(#bg-${uid})`} />
        <circle cx="68" cy="72" r="11" fill={`url(#sh-${uid})`} />
        <circle cx="50" cy="70" r="12.5" fill={`url(#bg-${uid})`} />
        <circle cx="50" cy="70" r="12.5" fill={`url(#sh-${uid})`} />

        {/* Bottom tip */}
        <circle cx="41" cy="84" r="9.5" fill={`url(#bg-${uid})`} />
        <circle cx="41" cy="84" r="9.5" fill={`url(#sh-${uid})`} />
        <circle cx="59" cy="84" r="9.5" fill={`url(#bg-${uid})`} />
        <circle cx="59" cy="84" r="9.5" fill={`url(#sh-${uid})`} />
        <circle cx="50" cy="88" r="8" fill={`url(#bg-${uid})`} />
      </svg>
    </span>
  );
};
