'use client';

import React, { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { handleImageError, generateBlurDataURL, FALLBACK_IMAGES } from '@/lib/imageLoader';

interface OptimizedImageProps extends Omit<NextImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackType?: keyof typeof FALLBACK_IMAGES;
  showErrorState?: boolean;
  errorComponent?: React.ReactNode;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackType = 'person',
  showErrorState = false,
  errorComponent,
  placeholder = 'blur',
  blurDataURL,
  quality = 85,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const finalFallbackSrc = fallbackSrc || FALLBACK_IMAGES[fallbackType];
  const finalBlurDataURL = blurDataURL || generateBlurDataURL();

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoading(false);
    handleImageError(event, finalFallbackSrc);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && showErrorState && errorComponent) {
    return <>{errorComponent}</>;
  }

  return (
    <div className="relative">
      <NextImage
        src={hasError ? finalFallbackSrc : src}
        alt={alt}
        placeholder={placeholder}
        blurDataURL={finalBlurDataURL}
        quality={quality}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
    </div>
  );
};

// Export default for easy imports
export default OptimizedImage;