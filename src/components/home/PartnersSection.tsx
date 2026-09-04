'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { partnersData, sponsorshipLevels } from '@/data/partnersData';
import { useFontStyles } from '@/hooks/useFontStyles';

export const PartnersSection = () => {
  const fontStyles = useFontStyles();

  // Group partners by category
  const partnersByCategory = partnersData.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, typeof partnersData>);

  return (
    <section id="partners" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white" style={fontStyles.heading}>
            Nos Partenaires
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" style={fontStyles.body}>
            Nous remercions nos partenaires pour leur soutien précieux dans l&apos;organisation du Forum ECC.
          </p>
        </motion.div>

        {/* Display partners by sponsorship level */}
        <div className="space-y-16">
          {sponsorshipLevels.map((level) => {
            const partners = partnersByCategory[level.name] || [];
            
            // Skip if no partners in this category
            if (partners.length === 0) return null;
            
            return (
              <div key={level.name} className="mb-12">
                <div className="text-center mb-8">
                  <h3 
                    className={`inline-block font-bold px-6 py-2 rounded-full ${
                      level.name === 'prestige' 
                        ? 'text-3xl bg-gradient-to-r from-purple-400/20 to-purple-600/20 text-purple-700 dark:from-purple-400/30 dark:to-purple-600/30 dark:text-purple-400' 
                        : level.name === 'gold'
                        ? 'text-2xl bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-700 dark:from-yellow-400/30 dark:to-yellow-600/30 dark:text-yellow-400'
                        : 'text-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-700 dark:from-blue-400/30 dark:to-blue-600/30 dark:text-blue-400'
                    }`}
                    style={fontStyles.sans}
                  >
                    {level.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2" style={fontStyles.body}>
                    {level.description}
                  </p>
                </div>
                
                <div className={`grid gap-8 ${
                  level.name === 'prestige' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : level.name === 'gold'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
                }`}>
                  {partners.map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow ${
                        level.name === 'prestige' 
                          ? 'p-8' 
                          : level.name === 'gold'
                          ? 'p-6'
                          : 'p-4'
                      }`}
                    >
                      <Link 
                        href={partner.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <div className={`relative w-full transition-transform duration-200 hover:scale-105 ${
                          level.name === 'prestige' 
                            ? 'h-32' 
                            : level.name === 'gold'
                            ? 'h-24'
                            : 'h-20'
                        }`}>
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          {/*<Link*/}
          {/*  href="/sponsors"*/}
          {/*  className="inline-flex items-center text-primary hover:underline font-medium"*/}
          {/*  style={fontStyles.sans}*/}
          {/*>*/}
          {/*  Voir tous nos partenaires*/}
          {/*  <svg*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    className="h-4 w-4 ml-2"*/}
          {/*    viewBox="0 0 20 20"*/}
          {/*    fill="currentColor"*/}
          {/*  >*/}
          {/*    <path*/}
          {/*      fillRule="evenodd"*/}
          {/*      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"*/}
          {/*      clipRule="evenodd"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*</Link>*/}
        </div>
      </div>
    </section>
  );
};
