'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
// import { Button } from '@/components/ui/Button';
// import Link from 'next/link';
import { GradientText } from '@/components/ui/GradientText';
import { Card } from '@/components/ui/Card';
import { useFontStyles } from '@/hooks/useFontStyles';

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();

  const features = [
    {
      id: 1,
      title: 'Proposer',
      description: 'des opportunités d’emplois et\n' +
          'de stages attractives à de futurs ingénieurs\n' +
          'aux parcours et profils diversifiés.',
      icon: '/icons/idea.png',
    },
    {
      id: 2,
      title: 'Tisser',
      description: 'des liens durables en favorisant\n' +
          'l’échange entre les professionnels de votre\n' +
          'entreprise et les élèves centraliens.',
      icon: '/icons/handshake.png',
    },
    {
      id: 3,
      title: 'Promouvoir',
      description: 'votre marque, tout en\n' +
          'augmentant sa visibilité auprès des meilleurs\n' +
          'talents de demain.',
      icon: '/icons/megaphone.png',
    },
    {
      id: 4,
      title: 'Recruter',
      description: 'gagner du temps en évitant le\n' +
          'processus habituel de publication d’annonces,\n' +
          'de tri des candidatures et d’organisation\n' +
          'de rendez-vous.',
      icon: '/icons/recruitment.png',
    },
  ];

  return (
    <section id="a-propos" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-72 h-72 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-title" style={fontStyles.heading}>
            <span className="text-gray-900 dark:text-white">À propos du</span> <GradientText variant="blue-green">Forum ECC</GradientText>
          </h2>
          <p className="section-subtitle" style={fontStyles.body}>
            Une opportunité unique de rencontre entre les étudiants et les professionnels dans un cadre dynamique et innovant.
          </p>
        </motion.div>

        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/about/ab1.JPG"
                alt="Forum ECC" 
                fill
                className="object-cover object-center"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // console.error removed for production
                  e.currentTarget.src = '/images/placeholder-logo.png';
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Le plus prestigieux des forums école-entreprise au Maroc

            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Organisé par les étudiants de l&apos;École Centrale Casablanca, le Forum ECC est devenu un rendez-vous incontournable pour les entreprises à la recherche de talents et pour les étudiants souhaitant lancer leur carrière professionnelle.
            </p>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Chaque année, plus d&apos;une quinzaine entreprises nationales et internationales et plus de 500 étudiants participent à cet événement unique, créant un environnement propice au networking et aux opportunités professionnelles.
            </p>
            {/*<Link href="/espace-entreprise">*/}
            {/*  <Button variant="primary">*/}
            {/*    Découvrir l&apos;espace entreprise*/}
            {/*  </Button>*/}
            {/*</Link>*/}
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Une plateforme d&apos;opportunités pour tous
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Le Forum ECC n&apos;est pas seulement un événement de recrutement, c&apos;est aussi un lieu d&apos;échange et d&apos;apprentissage où les participants peuvent développer leur réseau professionnel, découvrir les dernières tendances du marché et affiner leur projet de carrière.
            </p>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Que vous soyez étudiant à la recherche d&apos;un stage ou d&apos;un premier emploi, ou une entreprise souhaitant recruter les talents de demain, le Forum ECC vous offre une plateforme adaptée à vos besoins.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <span className="text-primary-800 dark:text-primary font-bold">25+</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Entreprises</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
                  <span className="text-secondary-800 dark:text-secondary font-bold">1500+</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Étudiants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <span className="text-amber-600 font-bold">5+</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Startups</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center">
                  <span className="text-rose-600 font-bold">9</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Éditions</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/about/ab2.JPG"
                alt="Forum ECC Networking" 
                fill
                className="object-cover object-center"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // console.error removed for production
                  e.currentTarget.src = '/images/placeholder-logo.png';
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <motion.h3
            className="text-2xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Pourquoi
            participer
            à ce forum?
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                variant="default"
                delay={0.2 + index * 0.1}
                className="p-6"
              >
                <div className="mb-4 h-16 w-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="relative h-8 w-8">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
