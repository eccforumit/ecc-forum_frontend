'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'blue-green';
}

/**
 * A modern text component with gradient effect
 */
export const GradientText = ({ 
  children, 
  className = '',
  variant = 'primary' 
}: GradientTextProps) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'primary':
        return 'from-primary-800 to-primary-900 dark:from-primary-400 dark:to-primary';
      case 'secondary':
        return 'from-secondary-800 to-secondary-900 dark:from-secondary-400 dark:to-secondary';
      case 'blue-green':
        return 'from-primary-800 to-secondary-800 dark:from-primary-400 dark:to-secondary-400';
      default:
        return 'from-primary-800 to-primary-900 dark:from-primary-400 dark:to-primary';
    }
  };

  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getGradientClasses()} ${className}`}>
      {children}
    </span>
  );
};