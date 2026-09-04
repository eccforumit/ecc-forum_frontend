'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useFontStyles } from '@/hooks/useFontStyles';
import { useInfoBar } from '@/contexts/InfoBarContext';

interface InfoBarProps {
  messages?: string[];
  duration?: number;
  className?: string;
}

export const InfoBar = ({ 
  messages = [
    '🚌 Navette: Départ à 7h30 - Technopark -> ECC ',
    '🚌 Navette: Départ à 9h00 - Technopark -> ECC ',
    '🚌 Navette: Retour à 18h30 - Ecc -> Technopark',
  ],
  duration = 30,
  className = '',
}: InfoBarProps) => {
  const { isInfoBarVisible, setInfoBarVisible } = useInfoBar();
  const fontStyles = useFontStyles();

  return (
    <AnimatePresence>
      {isInfoBarVisible && (
        <motion.div
          initial={{ height: 32, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-700 to-primary-600 dark:from-primary-800 dark:to-primary-700 text-white overflow-hidden ${className}`}
        >
          <div className="relative h-8 flex items-center">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: duration,
                  ease: "linear",
                },
              }}
            >
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center">
                  {messages.map((message, msgIndex) => (
                    <span
                      key={`${index}-${msgIndex}`}
                      className="mx-8 text-sm font-medium flex items-center"
                      style={fontStyles.sans}
                    >
                      {message}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
            
            {/* Bouton de fermeture */}
            <button
              onClick={() => setInfoBarVisible(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors z-10"
              aria-label="Fermer la barre d'information"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoBar;
