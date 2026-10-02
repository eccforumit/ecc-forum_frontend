'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/GradientText';
import { useFontStyles } from '@/hooks/useFontStyles';
import { CheckCircle } from 'lucide-react';

interface TimelineItem {
  id: number;
  time: string;
  title: string;
  description?: string;
}

export const TimelineSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      time: '8h - 9h',
      title:
        "Accueil des entreprises, installation au niveau des stands et café d'accueil.",
    },
    {
      id: 2,
      time: '9h - 09h15',
      title:
        'Mot du comité organisateur du Forum et de la Direction Générale (Amphithéâtre 1).',
    },
    {
      id: 3,
      time: '9h15 - 9h30',
      title:
        "Mot de Monsieur le Ministre de l'Industrie et du Commerce, Ryad MEZZOUR.",
    },
    {
      id: 4,
      time: '9h30 - 10h',
      title: 'Inauguration des stands et tour du Ministre.',
    },
    {
      id: 5,
      time: '10h00 - 13h',
      title: 'Tour des stands.',
    },
    {
      id: 6,
      time: '13h - 14h',
      title: 'Pause déjeuner.',
    },
    {
      id: 7,
      time: '14h10 - 15h30',
      title: 'Ateliers et présentations (Amphithéâtre 1).',
      description:
        'Atelier 1 : Groupe Attijari Wafa Bank\nAtelier 2 : Schiele Maroc\nAtelier 3 : BMCI Groupe BNP Paribas',
    },
    {
      id: 8,
      time: '15h30 - 17h30',
      title: 'Tour des stands.',
    },
    {
      id: 9,
      time: '17h30 - 18h',
      title: 'Cérémonie de clôture.',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-72 h-72 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <h2 className="section-title" style={fontStyles.heading}>
            <span className="text-gray-900 dark:text-white">
              Programme de la
            </span>{' '}
            <GradientText variant="blue-green">Journée</GradientText>
          </h2>

          <p className="section-subtitle" style={fontStyles.body}>
            Découvrez le déroulement complet de notre événement
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line - Desktop centered, Mobile left */}
          <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-700 dark:from-primary-700 dark:via-primary-500 dark:to-primary-300"></div>

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative flex items-center ${
                  index % 2 === 0
                    ? 'md:justify-start'
                    : 'md:justify-end'
                }`}
              >
                {/* Content box */}
                <div
                  className={`w-full md:w-5/12 pl-16 md:pl-0 ${
                    index % 2 === 0
                      ? 'md:pr-12 md:text-right'
                      : 'md:pl-12 md:text-left'
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 md:p-6 border border-gray-100 dark:border-gray-700">
                    <div
                      className={`text-primary-700 dark:text-primary-400 font-bold text-base md:text-lg mb-1.5 md:mb-2 text-left ${
                        index % 2 === 0
                          ? 'md:text-right'
                          : 'md:text-left'
                      }`}
                      style={fontStyles.heading}
                    >
                      {item.time}
                    </div>

                    <h3
                      className={`text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1.5 md:mb-2 text-left ${
                        index % 2 === 0
                          ? 'md:text-right'
                          : 'md:text-left'
                      }`}
                      style={fontStyles.heading}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p
                        className={`text-gray-600 dark:text-gray-300 text-xs md:text-sm whitespace-pre-line text-left ${
                          index % 2 === 0
                            ? 'md:text-right'
                            : 'md:text-left'
                        }`}
                        style={fontStyles.body}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Center checkpoint with checkmark - Desktop centered, Mobile left */}
                <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10 transition-all duration-300">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 flex items-center justify-center shadow-lg">
                      {/* Checkmark */}
                      <CheckCircle className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};