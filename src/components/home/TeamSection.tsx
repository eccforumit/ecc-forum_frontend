'use client';

// import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GradientText } from '@/components/ui/GradientText';
import { Card } from '@/components/ui/Card';
import { useFontStyles } from '@/hooks/useFontStyles';

// Bureau Exécutif 2026 — 11e édition du Forum ECC Entreprises
// Photos à déposer dans /public/images/team/ (voir la clé `image` de chaque membre).
// À défaut, /images/placeholder-person.jpg est affiché automatiquement.
const teamMembers = [
  {
    id: 1,
    name: 'Saad RAIS',
    position: 'Président',
    image: '/images/team/saad-rais.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 2,
    name: 'Hajar SKENDOUL',
    position: 'Vice-présidente',
    image: '/images/team/hajar-skendoul.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 3,
    name: 'Ikram MAAYZOU',
    position: 'Secrétaire Générale',
    image: '/images/team/ikram-maayzou.jpg',
    linkedin: '#',
    mail: '#'
  },
   {
    id: 4,
    name: 'Solange ILINGA',
    position: 'IT',
    image: '/images/team/solange-ilinga.jpg',
    linkedin: '#',
    mail: '#'
  },
   {
    id: 5,
    name: 'Ahmed ZHIRI',
    position: 'IT',
    image: '/images/team/ahmed-zhiri.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 6,
    name: 'Mohamed Zayd KASIMI',
    position: 'Trésorier',
    image: '/images/team/zayd-kasimi.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 7,
    name: 'Fatima EL MACHRAFI',
    position: 'Prospectrice',
    image: '/images/team/fatima-elmachrafi.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 8,
    name: 'Douae HARRAK',
    position: 'Prospectrice',
    image: '/images/team/douae-harrak.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 9,
    name: 'Zhour MESKOUR',
    position: 'Prospectrice',
    image: '/images/team/zhour-meskour.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 10,
    name: 'Taha SADIKI',
    position: 'Prospecteur',
    image: '/images/team/taha-sadiki.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 11,
    name: 'Mohamed Amine SABIRI',
    position: 'Analyste',
    image: '/images/team/amine-sabiri.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 12,
    name: 'Mohamed CHAKIR',
    position: 'Analyste',
    image: '/images/team/mohamed-chakir.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 13,
    name: 'Mariam KRISSE',
    position: 'Analyste',
    image: '/images/team/mariam-krisse.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 14,
    name: 'Ranya ADIOUANE',
    position: 'Coordinatrice',
    image: '/images/team/ranya-adiouane.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 15,
    name: 'Lina ASSABANE',
    position: 'Coordinatrice',
    image: '/images/team/lina-assabane.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 16,
    name: 'Aya KHABIR',
    position: 'Logistique',
    image: '/images/team/aya-khabir.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 17,
    name: 'Douae TOUIYATE',
    position: 'Logistique',
    image: '/images/team/douae-touiyate.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 18,
    name: 'Fatima-Ezzahra ELKACHTAOUI',
    position: 'Logistique',
    image: '/images/team/fatima-ezzahra-elkachtaoui.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 19,
    name: 'Omar OUAJIF',
    position: 'Communication',
    image: '/images/team/omar-ouajif.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 20,
    name: 'Nada HASSAR',
    position: 'Communication',
    image: '/images/team/nada-hassar.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 21,
    name: 'Laila EL ARARI',
    position: 'Design',
    image: '/images/team/laila-elarari.jpg',
    linkedin: '#',
    mail: '#'
  },
  {
    id: 22,
    name: 'Wissal AIT ALI',
    position: 'Design',
    image: '/images/team/wissal-aitali.jpg',
    linkedin: '#',
    mail: '#'
  },
];

export const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();

  return (
    <section id="equipe" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" style={fontStyles.heading}><span className="text-gray-900 dark:text-white">Notre</span> <GradientText variant="blue-green">Équipe</GradientText></h2>
          <p className="section-subtitle" style={fontStyles.body}>
            Découvrez les étudiants passionnés qui travaillent sans relâche pour faire du Forum ECC un événement exceptionnel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="team-swiper pt-10 pb-16"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <Card 
                  variant="default" 
                  className="overflow-hidden"
                  delay={0.1}
                >
                  <div className="relative h-56 sm:h-64 md:h-72 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      quality={80}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      onError={(e) => {
                        // console.error removed for production
                        e.currentTarget.src = '/images/placeholder-person.jpg';
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white" style={fontStyles.heading}>
                      {member.name}
                    </h3>
                    <p className="text-primary-800 dark:text-primary mt-1 font-medium" style={fontStyles.sans}>{member.position}</p>
                    <div className={`flex justify-center gap-3 mt-4 ${member.linkedin === '#' && member.mail === '#' ? 'hidden' : ''}`}>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-500 hover:text-primary-800 dark:hover:text-primary transition-colors ${member.linkedin === '#' ? 'hidden' : ''}`}
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      {/*<a*/}
                      {/*  href="#"*/}
                      {/*  className="text-gray-500 hover:text-primary transition-colors"*/}
                      {/*  aria-label="Twitter"*/}
                      {/*>*/}
                      {/*  <svg*/}
                      {/*    className="h-5 w-5"*/}
                      {/*    fill="currentColor"*/}
                      {/*    viewBox="0 0 24 24"*/}
                      {/*    aria-hidden="true"*/}
                      {/*  >*/}
                      {/*    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />*/}
                      {/*  </svg>*/}
                      {/*</a>*/}
                      <a
                        href={member.mail}
                        className={`text-gray-500 hover:text-primary-800 dark:hover:text-primary transition-colors ${member.mail === '#' ? 'hidden' : ''}`}
                        aria-label={`Envoyer un email à ${member.name}`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};
