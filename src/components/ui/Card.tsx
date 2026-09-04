'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outline';
  hoverEffect?: boolean;
  delay?: number;
}

/**
 * A modern card component with various styling options
 */
export const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  hoverEffect = true,
  delay = 0
}: CardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700';
      case 'glass':
        return 'backdrop-blur-md bg-white/80 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50';
      case 'outline':
        return 'bg-transparent border-2 border-primary/20 dark:border-primary/30';
      default:
        return 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700';
    }
  };

  const getHoverClasses = () => {
    if (!hoverEffect) return '';
    
    switch (variant) {
      case 'default':
        return 'hover:shadow-xl hover:-translate-y-1';
      case 'glass':
        return 'hover:bg-white/90 dark:hover:bg-black/60 hover:-translate-y-1';
      case 'outline':
        return 'hover:border-primary/40 dark:hover:border-primary/50 hover:-translate-y-1';
      default:
        return 'hover:shadow-xl hover:-translate-y-1';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${getVariantClasses()} ${getHoverClasses()} ${className}`}
    >
      {children}
    </motion.div>
  );
};