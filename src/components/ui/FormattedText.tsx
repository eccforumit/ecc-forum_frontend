'use client';

import { ReactNode } from 'react';

interface FormattedTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  type?: 'heading' | 'body' | 'sans';
  className?: string;
}

/**
 * A component that applies consistent typography with our custom fonts
 */
export const FormattedText = ({ 
  children, 
  as = 'p',
  type = 'body', 
  className = '' 
}: FormattedTextProps) => {
  const getFontStyle = () => {
    switch (type) {
      case 'heading':
        return { fontFamily: 'var(--font-heading)' };
      case 'body':
        return { fontFamily: 'var(--font-body)' };
      case 'sans':
        return { fontFamily: 'var(--font-sans)' };
      default:
        return { fontFamily: 'var(--font-body)' };
    }
  };

  const getClassNames = () => {
    let baseClasses = '';

    switch (as) {
      case 'h1':
        baseClasses = 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight';
        break;
      case 'h2':
        baseClasses = 'text-3xl md:text-4xl font-bold leading-tight';
        break;
      case 'h3':
        baseClasses = 'text-2xl md:text-3xl font-bold leading-tight';
        break;
      case 'h4':
        baseClasses = 'text-xl md:text-2xl font-semibold leading-tight';
        break;
      case 'h5':
        baseClasses = 'text-lg md:text-xl font-semibold';
        break;
      case 'h6':
        baseClasses = 'text-base md:text-lg font-semibold';
        break;
      case 'p':
        baseClasses = 'text-base leading-relaxed';
        break;
      default:
        baseClasses = '';
    }

    return `${baseClasses} ${className}`;
  };

  const Component = as;
  
  return (
    <Component className={getClassNames()} style={getFontStyle()}>
      {children}
    </Component>
  );
};