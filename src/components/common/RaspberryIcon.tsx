import React from 'react';

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
  const sizeClasses: Record<string, string> = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const isNumericSize = typeof size === 'number';
  const sizeStyle = isNumericSize ? { width: `${size}px`, height: `${size}px` } : undefined;
  const sizeClass = !isNumericSize ? sizeClasses[size] || 'w-6 h-6' : '';

  const getGradientId = () => {
    switch (variant) {
      case 'gold':
      case 'amber':
        return 'amber-grad';
      case 'emerald':
        return 'emerald-grad';
      case 'pink':
        return 'pink-grad';
      case 'white':
        return 'white-grad';
      case 'dark':
        return 'dark-grad';
      case 'rose':
      default:
        return 'rose-grad';
    }
  };

  const isGold = variant === 'gold' || variant === 'amber';
  const isEmerald = variant === 'emerald';
  const isWhite = variant === 'white';

  const glowColor = isGold
    ? 'rgba(245, 158, 11, 0.4)'
    : isEmerald
    ? 'rgba(16, 185, 129, 0.4)'
    : isWhite
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(244, 63, 94, 0.4)';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none select-none transition-transform duration-200 ${sizeClass} ${className}`}
      style={sizeStyle}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
      >
        <defs>
          {/* Default Raspberry Rose Gradient */}
          <linearGradient id="rose-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* Pink Gradient */}
          <linearGradient id="pink-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>

          {/* Gold / Amber Gradient */}
          <linearGradient id="amber-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Emerald Gradient */}
          <linearGradient id="emerald-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* White / Platinum Gradient */}
          <linearGradient id="white-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Dark / Charcoal Gradient */}
          <linearGradient id="dark-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Leaf Green Gradient */}
          <linearGradient id="leaf-grad" x1="8" y1="2" x2="24" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>

        {/* Green Leaves at Top */}
        <path
          d="M16 8C13 4 8 5 8 5C8 5 10 9 14 9L16 8Z"
          fill="url(#leaf-grad)"
        />
        <path
          d="M16 8C19 4 24 5 24 5C24 5 22 9 18 9L16 8Z"
          fill="url(#leaf-grad)"
        />
        <path
          d="M15 9C15 6 16 3 16 3C16 3 17 6 17 9H15Z"
          fill="#86EFAC"
        />

        {/* Raspberry Berry Drupelets (Cluster Circles) */}
        {/* Top Row */}
        <circle cx="11.5" cy="12.5" r="3.2" fill={`url(#${getGradientId()})`} />
        <circle cx="16" cy="11.5" r="3.4" fill={`url(#${getGradientId()})`} />
        <circle cx="20.5" cy="12.5" r="3.2" fill={`url(#${getGradientId()})`} />

        {/* Middle Row */}
        <circle cx="9" cy="17" r="3.3" fill={`url(#${getGradientId()})`} />
        <circle cx="13.5" cy="16.5" r="3.4" fill={`url(#${getGradientId()})`} />
        <circle cx="18.5" cy="16.5" r="3.4" fill={`url(#${getGradientId()})`} />
        <circle cx="23" cy="17" r="3.3" fill={`url(#${getGradientId()})`} />

        {/* Lower Row */}
        <circle cx="11" cy="21.5" r="3.2" fill={`url(#${getGradientId()})`} />
        <circle cx="16" cy="21.5" r="3.3" fill={`url(#${getGradientId()})`} />
        <circle cx="21" cy="21.5" r="3.2" fill={`url(#${getGradientId()})`} />

        {/* Bottom Tip */}
        <circle cx="13.5" cy="25.5" r="2.8" fill={`url(#${getGradientId()})`} />
        <circle cx="18.5" cy="25.5" r="2.8" fill={`url(#${getGradientId()})`} />
        <circle cx="16" cy="27.5" r="2.2" fill={`url(#${getGradientId()})`} />

        {/* Subtle Highlights for Berry Texture */}
        <circle cx="15.2" cy="10.5" r="0.9" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="10.8" cy="11.5" r="0.8" fill="#FFFFFF" fillOpacity="0.5" />
        <circle cx="12.8" cy="15.5" r="0.9" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="17.8" cy="15.5" r="0.9" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="15.2" cy="20.5" r="0.8" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    </span>
  );
};
