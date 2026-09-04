'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/GradientText';
import { Card } from '@/components/ui/Card';
import { useFontStyles } from '@/hooks/useFontStyles';
import Link from 'next/link';

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();
  const testimonials = [

    {
      name: "M. JALAL CHARAF",
      title: "DIRECTEUR GÉNÉRAL DE L'ÉCOLE CENTRALE CASABLANCA",
      image: "/images/about/JC.png",
      quote: "Le monde du travail est marqué par des mutations profondes : digitalisation accélérée, montée en puissance de l'intelligence artificielle, prise en compte des effets du changement climatique dans les stratégies d'entreprises, nouvelles formes d'organisation du travail, nouveau rapport à la vie professionnelle. Consciente de ce monde en perpétuelle évolution, l'École Centrale Casablanca (ECC) s'engage, depuis sa création, pour accompagner ces transformations. Elle a pour ambition de former les acteurs de demain qui contribueront au changement et au développement du Maroc et de l'Afrique."
    },
    {
      name: "M. HERVE MARTINEZ",
      title: "DIRECTEUR GÉNÉRAL ADJOINT DE L'ÉCOLE CENTRALE CASABLANCA",
      image: "/images/about/HM.png",
      quote: "Le Forum Entreprises est le rendez-vous phare et incontournable de l'ECC. Organisé chaque année par l'Association étudiante ECC-Entreprises, ce Forum est l'occasion pour les élèves d'échanger avec les acteurs socio-économiques. Bien plus qu'un espace de rencontres, le Forum Entreprises incarne la volonté de l'École Centrale Casablanca de s'ouvrir davantage au monde professionnel, de renforcer les liens entre formations et exigences du marché du travail."
    },
    {
      name: "M. RYAD MEZZOUR",
      title: "MINISTRE DE L'INDUSTRIE ET DU COMMERCE",
      image: "/images/about/ryad-mezzour.jpg",
      quote: "Je suis très fier des résultats et de la réussite de cet établissement qui est parvenu, en seulement quelques années, à se positionner parmi les meilleures écoles d'ingénieurs du Maroc. Grâce à leur profil adapté aux besoins des entreprises, les ingénieurs formés à l'ECC participent à la création de valeur et à la transformation du Maroc et de l'Afrique."
    }
  ];

  const services = [
    {
      id: "01",
      title: "CVthèque",
      color: "text-blue-300",
      description: "Les entreprises participant au Forum ayant souscrit aux packs incluent la CVthèque permettant d&apos;accéder aux CVs des élèves, les consulter et les sélectionner en ligne."
    },
    {
      id: "02",
      title: "Table ronde et ateliers",
      color: "text-yellow-400",
      description: "Des ateliers et des sessions thématiques. Ces tables rondes et ces ateliers interactifs lors du FORUM, offrent des contenus personnalisés et des perspectives précieuses. Ces ateliers dynamiques et engageants promettent d'être uniques et enrichissants pour votre parcours professionnel."
    },
    {
      id: "03",
      title: "Entretiens privés",
      color: "text-teal-500",
      description: "Des entretiens privés entre représentants d&apos;entreprise dans les locaux de l'école, offrant une occasion unique pour des échanges personnalisés entre les participants et les recruteurs. Ces sessions individuelles permettront aux candidats de se démarquer et de discuter de leurs aspirations et qualifications directement avec les employeurs, facilitant ainsi des opportunités de carrière sur mesure."
    },
    {
      id: "04",
      title: "Médiatisation",
      color: "text-blue-900",
      description: "Une visibilité exceptionnelle est garantie grâce à une couverture médiatique complète avant, pendant et après l'événement, idéale pour être largement diffusée sur les réseaux sociaux."
    },
    {
      id: "05",
      title: "Élève parrain / marraine",
      color: "text-gray-700",
      description: "Chaque participant est accompagné par un ou deux étudiants parrains ou marraines, en fonction du pack choisi, qui les guident et les assistent tout au long de l'événement, dans leur installation et leur déplacement vers les activités programmées."
    },
    {
      id: "06",
      title: "Pitch",
      color: "text-indigo-600",
      description: "Dans un amphithéâtre équipé, les participants auront l&apos;opportunité de présenter leurs entreprises aux élèves en faisant découvrir leurs projets et idées lors de ce pitch."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about.jpg"
            alt="Forum ECC Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={fontStyles.heading}>
                À propos du <GradientText variant="primary">Forum ECC</GradientText>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90" style={fontStyles.body}>
                Découvrez l&apos;École Centrale Casablanca et son forum annuel, un lieu d&apos;échange entre étudiants et professionnels
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Description */}
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="section-title" style={fontStyles.heading}>
              L&apos;<GradientText variant="blue-green">École Centrale Casablanca</GradientText>
            </h2>
            <p className="section-subtitle" style={fontStyles.body}>
              La première école d&apos;ingénieur généraliste du Maroc, intégrée au prestigieux réseau international des écoles Centrales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Excellence académique et innovation pédagogique
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  L&apos;École Centrale Casablanca (ECC) est la première école d&apos;ingénieur généraliste du Maroc.
                </p>
                <p>
                  Elle est intégrée au prestigieux réseau international des Écoles Centrale qui comporte
                  des campus en France, en Chine, en Inde et bientôt en Amérique latine.
                </p>
                <p>
                  L&apos;approche pédagogique novatrice de l&apos;École vise à former des ingénieurs de haut niveau
                  scientifique, dotés d&apos;une expertise pluridisciplinaire, d&apos;une ouverture et d&apos;une
                  expérience internationale.
                </p>
                <p>
                  L&apos;ambition de l&apos;ECC est de préparer les élèves aux métiers de demain afin qu&apos;ils répondent toujours
                  mieux aux attentes et besoins des entreprises et de la société.
                </p>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                    src="/images/hero-1.jpg"
                    alt="École Centrale Casablanca"
                    fill
                    className="object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
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
              <span className="text-gray-800">Messages des </span><GradientText variant="blue-green">Directeurs</GradientText>
            </h2>
            <p className="section-subtitle" style={fontStyles.body}>
              Découvrez les visions des dirigeants de l&apos;École Centrale Casablanca sur l&apos;avenir de l&apos;ingénierie
            </p>
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                  className={index % 2 === 1 ? 'order-2 lg:order-1' : ''}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                >
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  className={index % 2 === 1 ? 'order-1 lg:order-2' : ''}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {testimonial.title}
                  </p>
                  <blockquote className="text-lg italic mb-6 text-gray-600 dark:text-gray-300 border-l-4 border-primary pl-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  {/*<p className="text-gray-600 dark:text-gray-300">*/}
                  {/*  {testimonial.description}*/}
                  {/*</p>*/}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Message */}
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="section-title" style={fontStyles.heading}>
              <span className="text-gray-800">  Mot du </span> <GradientText variant="blue-green">Comité Organisateur</GradientText>
            </h2>
            <p className="section-subtitle" style={fontStyles.body}>
              L&apos;engagement étudiant au cœur de l&apos;organisation du Forum ECC
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/images/about/team.png"
                  alt="Comité Organisateur"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Une 11ème édition d&apos;exception
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Le bureau organisateur de l&apos;ECC Forum Entreprises sera honoré de vous accueillir le 14 octobre 2026 pour cette 11ème édition.
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Organisé chaque année, cet événement représente une plateforme d&apos;échanges unique créant
                un écosystème propice à l&apos;innovation, à la co-création de solutions et à une insertion
                professionnelle plus fluide et pertinente.
              </p>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                À l&apos;École Centrale Casablanca, nous sommes convaincus que l&apos;engagement mutuel entre les
                étudiants et les entreprises, fondé sur des échanges constructifs et une collaboration continue, constitue
                un pilier fondamental pour façonner l&apos;avenir.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center shadow-md">
                  <span className="text-primary font-bold text-lg">11</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Éditions organisées</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
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
              <span className="text-gray-800">Nos</span> <GradientText variant="blue-green">Services</GradientText>
            </h2>
            <p className="section-subtitle" style={fontStyles.body}>
              Découvrez les services proposés lors du Forum ECC pour maximiser votre expérience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.id}
                variant="default"
                delay={0.2 + index * 0.1}
                className="p-6"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center shadow-md mr-4">
                    <span className="text-primary font-bold text-2xl">{service.id}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                      {service.title}
                    </h4>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={fontStyles.heading}>
              Rejoignez-nous au Forum ECC 2026
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90" style={fontStyles.body}>
              Rendez-vous le 14 octobre 2026 à l&apos;École Centrale Casablanca. Une occasion unique de rencontrer les futurs ingénieurs et les entreprises leaders de demain.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/auth/signup">
              S&apos;inscrire au Forum
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}