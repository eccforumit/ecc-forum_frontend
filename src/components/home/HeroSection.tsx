'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { textVariant } from '@/lib/animation';
import { useFontStyles } from '@/hooks/useFontStyles';

const slides = [
  {
    id: 1,
    imageUrl: '/images/hero-1.jpg',
    title: 'Forum École Centrale Casablanca',
    subtitle: 'Le plus grand salon de recrutement de l\'année',
    description: 'Rencontrez les meilleures entreprises du Maroc et découvrez des opportunités professionnelles uniques',
  },
  {
    id: 2,
    imageUrl: '/images/hero-2.jpg',
    title: 'Boostez votre carrière',
    subtitle: 'Développez votre réseau professionnel',
    description: 'Échangez avec des professionnels, découvrez les dernières tendances du marché et trouvez votre stage ou emploi idéal',
  },
  {
    id: 3,
    imageUrl: '/images/hero-3.JPG',
    title: 'Espace Entreprises',
    subtitle: 'Les meilleures opportunités de recrutement',
    description: 'Profitez d\'un accès privilégié aux talents les plus prometteurs et développez votre visibilité auprès des étudiants',
  },
  {
    id: 4,
    imageUrl: '/images/ecc_b.jpg',
    title: 'Construisez votre avenir',
    subtitle: 'Carrière',
    description: 'Préparez votre carrière professionnelle',
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fontStyles = useFontStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-section relative h-screen min-h-[100dvh] sm:h-screen w-full overflow-hidden pt-24">
      {/* Slider */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 10 : 0,
          }}
          transition={{ duration: 1 }}
        >
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 z-10" />
          
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover object-center w-full h-full"
              priority={index === 0}
              sizes="100vw"
              quality={90}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 z-10">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container-custom mx-auto px-4">
              <motion.div
                initial="hidden"
                animate={currentSlide === index ? "show" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="max-w-3xl text-white"
              >
                <motion.h2 
                  variants={textVariant(0.1)}
                  className="text-xs sm:text-sm md:text-lg font-semibold mb-2 text-primary-200 tracking-wide uppercase font-sans"
                  style={fontStyles.sans}
                >
                  {slide.subtitle}
                </motion.h2>
                <motion.h1 
                  variants={textVariant(0.2)}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
                  style={{
                    ...fontStyles.heading,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  variants={textVariant(0.3)}
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl"
                  style={fontStyles.body}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  variants={textVariant(0.35)}
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 sm:mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-primary-200">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    14 octobre 2026
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-200">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    École Centrale Casablanca, Bouskoura
                  </span>
                </motion.div>
                <motion.div
                  variants={textVariant(0.4)}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link href="/auth/signup">
                    <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                      S&apos;inscrire
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Button>
                  </Link>
                  <Link href="/#a-propos">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                      En savoir plus
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Slider Navigation */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex justify-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-primary w-6 sm:w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
