'use client';

import Image from 'next/image';

interface ThemeAwareLogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export const ThemeAwareLogo = ({ 
  width = 60, 
  height = 60, 
  className = "", 
  alt = "Forum ECC Logo" 
}: ThemeAwareLogoProps) => {
  return (
    <div className="relative">
      {/* Light theme logo */}
      <Image
        src="/images/logo_normal.png"
        alt={alt}
        width={width}
        height={height}
        className={`${className} block dark:hidden`}
      />
      {/* Dark theme logo */}
      <Image
        src="/images/logo_forum.png"
        alt={alt}
        width={width}
        height={height}
        className={`${className} hidden dark:block`}
      />
    </div>
  );
};