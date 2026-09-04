'use client';

import { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'light';
}

export const GradientBackground = ({ 
  children, 
  className = '',
  variant = 'primary' 
}: GradientBackgroundProps) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'primary':
        return 'from-primary/10 via-transparent to-transparent dark:from-primary/5';
      case 'secondary':
        return 'from-secondary/10 via-transparent to-transparent dark:from-secondary/5';
      case 'dark':
        return 'from-gray-900/10 via-transparent to-transparent dark:from-gray-900/20';
      case 'light':
        return 'from-gray-100 via-transparent to-transparent dark:from-gray-800/10';
      default:
        return 'from-primary/10 via-transparent to-transparent';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b opacity-60 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClasses()}`}></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 w-60 h-60 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      {children}
    </div>
  );
};