import React, { useState } from 'react';
import { Package, Box } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/hero-boxes.jpg',
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFailedCompletely, setIsFailedCompletely] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // If prop changes, reset
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsFailedCompletely(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsFailedCompletely(true);
      setIsLoaded(true);
    }
  };

  if (isFailedCompletely) {
    return (
      <div className={`relative overflow-hidden bg-[#172228] border border-white/10 flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <div className="w-12 h-12 rounded-xl bg-[#202D34] border border-[#F28B35]/30 flex items-center justify-center text-[#F28B35] mb-2">
          <Box className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold text-[#F4F6F5] uppercase tracking-wider line-clamp-1">{alt}</span>
        <span className="text-[10px] text-[#A6B2B7] mt-1">Hanvision Enterprises Corrugated Specification</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#172228] animate-pulse flex items-center justify-center">
          <Package className="w-6 h-6 text-[#F28B35]/40" />
        </div>
      )}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

