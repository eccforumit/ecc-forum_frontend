// Modern animation utilities for the website

/**
 * Creates a fade-in animation with directional movement
 */
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.8,
        delay,
      },
    },
  };
};

/**
 * Creates a staggered animation container
 */
export const staggerContainer = (staggerChildren: number = 0.05, delayChildren: number = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Creates a scale-in animation
 */
export const scaleIn = (delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay,
      },
    },
  };
};

/**
 * Creates a slide-in animation
 */
export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

/**
 * Creates a text animation variant
 */
export const textVariant = (delay: number = 0) => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay,
      },
    },
  };
};