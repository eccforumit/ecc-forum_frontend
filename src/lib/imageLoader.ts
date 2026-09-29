/**
 * Custom image loader with fallback support for Vercel deployment
 */

export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // For external URLs, return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // For local images, ensure proper path handling
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Add quality parameter if specified
  if (quality) {
    return `${cleanSrc}?w=${width}&q=${quality}`;
  }
  
  return `${cleanSrc}?w=${width}`;
};

/**
 * Generate a base64 placeholder for images
 */
export const generateBlurDataURL = (width: number = 100, height: number = 100): string => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
  </svg>`;
  
  // Use btoa for browser compatibility instead of Buffer
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(svg) : Buffer.from(svg).toString('base64')}`;
};

/**
 * Handle image loading errors with fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = '/images/placeholder-person.jpg'
) => {
  const target = event.currentTarget;
  if (target.src !== fallbackSrc) {
    // console.warn removed for production
    target.src = fallbackSrc;
  }
};

/**
 * Common fallback images
 */
export const FALLBACK_IMAGES = {
  person: '/images/placeholder-person.jpg',
  logo: '/images/placeholder-logo.png',
  hero: '/images/hero-1.jpg',
  company: '/images/company-icon.svg',
  student: '/images/student-icon.svg',
} as const;

/**
 * Image validation utility
 */
export const validateImagePath = (imagePath: string): boolean => {
  // Basic validation for image paths
  const imageExtensions = /\.(jpg|jpeg|png|gif|svg|webp|JPG|JPEG|PNG|GIF|SVG|WEBP)$/i;
  return imageExtensions.test(imagePath);
};
