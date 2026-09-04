/**
 * Deployment image validation utility
 * Helps identify image loading issues in production
 */

interface ImageValidationResult {
  path: string;
  exists: boolean;
  error?: string;
}

/**
 * Check if images exist (client-side)
 */
export const validateImagesClient = async (imagePaths: string[]): Promise<ImageValidationResult[]> => {
  const results: ImageValidationResult[] = [];
  
  for (const path of imagePaths) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      results.push({
        path,
        exists: response.ok,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      });
    } catch {
      results.push({
        path,
        exists: false,
        error: 'Unknown error',
      });
    }
  }
  
  return results;
};

/**
 * Common image paths used in the application
 */
export const CRITICAL_IMAGES = [
  // Hero images
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.JPG',
  '/images/hero-4.jpg',
  
  // About images
  '/images/about/ab1.JPG',
  '/images/about/ab2.JPG',
  
  // Logos
  '/images/logo_forum.png',
  '/images/logo_normal.png',
  
  // Placeholders
  '/images/placeholder-person.jpg',
  '/images/placeholder-logo.png',
  
  // Icons
  '/images/company-icon.svg',
  '/images/student-icon.svg',
] as const;

/**
 * Log image validation results in development
 */
export const logImageValidation = (results: ImageValidationResult[]) => {
  if (process.env.NODE_ENV === 'development') {
    const failedImages = results.filter(r => !r.exists);
    
    if (failedImages.length > 0) {
      console.group('🖼️ Image Loading Issues Detected');
      failedImages.forEach(() => {
      });
      console.groupEnd();
    }
  }
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = () => {
  if (typeof window !== 'undefined') {
    CRITICAL_IMAGES.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
};