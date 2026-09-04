'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/GradientText';
import { Card } from '@/components/ui/Card';
import { useFontStyles } from '@/hooks/useFontStyles';

// Note: Metadata is handled by the parent layout for client components
// For server components, you could export metadata directly

export default function PrivacyPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const fontStyles = useFontStyles();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about.jpg"
            alt="Politique de Confidentialité"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
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
                Politique de <GradientText variant="primary">Confidentialité</GradientText>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90" style={fontStyles.body}>
                Protection et utilisation de vos données personnelles
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden" ref={ref}>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-12">
              
              {/* Introduction */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Introduction
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    L&apos;École Centrale Casablanca et le Forum ECC s&apos;engagent à protéger votre vie privée et vos données personnelles. 
                    Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations 
                    que vous nous fournissez lors de votre inscription au Forum ECC - 11ème édition.
                  </p>
                  <p>
                    <strong>Date de dernière mise à jour :</strong> 1er octobre 2025
                  </p>
                </div>
              </Card>

              {/* Data Collection */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="blue-green">Collecte des Données</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Nous collectons les informations suivantes via nos formulaires d&apos;inscription :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Informations personnelles : nom, prénom, adresse e-mail, numéro de téléphone</li>
                    <li>Informations professionnelles : poste, entreprise, secteur d&apos;activité</li>
                    <li>Informations académiques (pour les étudiants) : niveau d&apos;études, spécialisation</li>
                    <li>CV et documents de candidature</li>
                    <li>Préférences et centres d&apos;intérêt professionnels</li>
                  </ul>
                </div>
              </Card>
              {/* Data Usage */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Utilisation des Données
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Vos données personnelles sont utilisées exclusivement dans les buts suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Organisation et gestion du Forum ECC - 11ème édition</li>
                    <li>Mise en relation avec les entreprises participantes au forum</li>
                    <li>Communication d&apos;informations relatives à l&apos;événement</li>
                    <li>Création de la CVthèque accessible aux entreprises partenaires</li>
                    <li>Amélioration de nos services et événements futurs</li>
                  </ul>
                </div>
              </Card>

              {/* Data Sharing */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="primary">Partage des Données</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                    <p className="font-semibold text-primary-800 dark:text-primary-300 mb-2">
                      Engagement Principal
                    </p>
                    <p>
                      <strong>Vos informations personnelles ne sont partagées qu&apos;avec les entreprises 
                      officiellement inscrites et participantes à la 11ème édition du Forum ECC.</strong>
                    </p>
                  </div>
                  <p>
                    Plus spécifiquement :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Aucune donnée n&apos;est vendue à des tiers</li>
                    <li>Aucun partage avec des entreprises non-participantes au forum</li>
                    <li>Aucune transmission à des fins commerciales externes</li>
                    <li>Les entreprises partenaires s&apos;engagent à utiliser vos données uniquement dans le cadre du recrutement</li>
                    <li>Accès limité aux données strictement nécessaires pour les processus de sélection</li>
                  </ul>
                </div>
              </Card>

              {/* Data Security */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Sécurité des Données
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Nous mettons en place des mesures de sécurité appropriées pour protéger vos données :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chiffrement des données lors de la transmission</li>
                    <li>Accès restreint aux données par mot de passe</li>
                    <li>Stockage sécurisé sur des serveurs protégés</li>
                    <li>Surveillance régulière des accès aux données</li>
                    <li>Formation du personnel sur la protection des données</li>
                  </ul>
                </div>
              </Card>

              {/* Rights */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Vos Droits
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Conformément à la législation en vigueur, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Droit d&apos;accès :</strong> consulter les données que nous détenons sur vous</li>
                    <li><strong>Droit de rectification :</strong> corriger les informations inexactes</li>
                    <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                    <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                    <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                  </ul>
                  <div className="bg-secondary/10 p-6 rounded-lg border-l-4 border-secondary mt-6">
                    <p className="font-semibold">
                      Pour exercer ces droits, contactez-nous à : 
                      <a href="mailto:forum@centrale-casablanca.ma" className="text-secondary-600 hover:text-secondary-800 ml-1">
                        forum@centrale-casablanca.ma
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Retention */}
              {/*<Card variant="default" className="p-8">*/}
              {/*  <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>*/}
              {/*    Conservation des Données*/}
              {/*  </h2>*/}
              {/*  <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>*/}
              {/*    <p>*/}
              {/*      Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles */}
              {/*      elles ont été collectées :*/}
              {/*    </p>*/}
              {/*    <ul className="list-disc pl-6 space-y-2">*/}
              {/*      <li>Données d'inscription : 2 ans après la fin du forum</li>*/}
              {/*      <li>CVthèque : 1 an après la fin du forum (sauf opposition de votre part)</li>*/}
              {/*      <li>Communications : 6 mois après la fin du forum</li>*/}
              {/*    </ul>*/}
              {/*  </div>*/}
              {/*</Card>*/}

              {/* Contact */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="blue-green">Contact</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <p><strong>Forum ECC - École Centrale Casablanca</strong></p>
                    <p>Email : <a href="mailto:forum@centrale-casablanca.ma" className="text-primary-600 hover:text-primary-800">Forum@centrale-casablanca.ma</a></p>
                    <p>École Centrale Casablanca, Bouskoura</p>
                  </div>
                </div>
              </Card>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
