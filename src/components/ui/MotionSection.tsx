'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * A section component with built-in animations for smoother page transitions
 */
export const MotionSection = ({ 
  children, 
  className = '', 
  delay = 0,
  id
}: MotionSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};