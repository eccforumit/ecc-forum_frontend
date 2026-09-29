/**
 * Custom hook to easily get font family style objects for different text types
 */
export function useFontStyles() {
  return {
    /**
     * Primary sans-serif font style (Montserrat)
     */
    sans: { 
      fontFamily: 'var(--font-sans)'
    },
    
    /**
     * Body text font style (Verdana)
     */
    body: { 
      fontFamily: 'var(--font-body)'
    },
    
    /**
     * Heading font style (Montserrat)
     */
    heading: { 
      fontFamily: 'var(--font-heading)'
    },
    
    /**
     * Class names for each font type
     */
    classes: {
      sans: 'font-sans',
      body: 'font-body',
      heading: 'font-heading'
    }
  };
}