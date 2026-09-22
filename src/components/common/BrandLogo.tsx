import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Industrial geometric corrugated box fluting logo icon */}
      <div className={`relative ${iconSizes[size]} bg-[#172228] border border-[#202D34] rounded-lg p-1.5 flex items-center justify-center shadow-inner group-hover:border-[#F28B35]/40 transition-colors`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer box fold silhouette */}
          <path
            d="M5 10L18 3L31 10V26L18 33L5 26V10Z"
            stroke="#F28B35"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Top lid fold line */}
          <path
            d="M5 10L18 17L31 10"
            stroke="rgba(244, 246, 245, 0.4)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Center vertical crease */}
          <path
            d="M18 17V33"
            stroke="rgba(244, 246, 245, 0.4)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Corrugation flute waves forming letter H */}
          <path
            d="M11 15V24M25 15V24M11 19.5H25"
            stroke="#F4F6F5"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Industrial orange accent node */}
          <circle cx="18" cy="17" r="2.2" fill="#F28B35" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-[#F4F6F5] ${titleSizes[size]}`}>
            HANVISION
          </span>
          <span className={`font-semibold tracking-wider text-[#F28B35] ${size === 'lg' ? 'text-xl' : 'text-sm'}`}>
            ENTERPRISES
          </span>
        </div>
        {showTagline && size !== 'sm' && (
          <span className="text-[10px] tracking-widest uppercase font-medium text-[#A6B2B7] -mt-0.5">
            Corrugated Packaging • Visakhapatnam
          </span>
        )}
      </div>
    </div>
  );
};
