'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GradientText } from '@/components/ui/GradientText';
import { useFontStyles } from '@/hooks/useFontStyles';
import { useState } from 'react';

export const RecapVideoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden" ref={ref}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-white" style={fontStyles.heading}>
              Retour sur la <GradientText variant="blue-green">9ème Édition</GradientText>
            </h2>
            <p className="section-subtitle text-gray-300">
              Revivez les moments forts de la dernière édition du Forum Ecole Centrale Casablanca
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
              {!isVideoPlaying ? (
                  /* Styled placeholder with play button */
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gray-900/60 flex items-center justify-center">
                    <motion.div
                        className="p-4 rounded-full bg-primary/80 cursor-pointer hover:bg-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(0,96,100,0.7)',
                            '0 0 0 20px rgba(0,96,100,0)',
                          ]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5
                        }}
                        onClick={handlePlayClick}
                    >
                      <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>

                    {/* Placeholder background */}
                    <div className="absolute inset-0 bg-gray-800 -z-10"></div>
                  </div>
              ) : (
                  /* YouTube video iframe */
                  <iframe
                      src="https://www.youtube.com/embed/dIJwR1kVzX4?autoplay=1"
                      title="Forum Ecole Centrale Casablanca - 9ème Édition"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  />
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-300 max-w-2xl mx-auto">
                La 9ème édition du Forum ECC a été un véritable succès avec plus de 50 entreprises et 1000 étudiants.
                Découvrez dans cette vidéo les témoignages des participants, les moments d&apos;échanges et les opportunités
                qui ont émergé lors de cet événement exceptionnel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
  );
};