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

export default function TermsPage() {
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
            alt="Conditions d'Utilisation"
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
                Conditions <GradientText variant="primary">d&apos;Utilisation</GradientText>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90" style={fontStyles.body}>
                Termes et conditions régissant l&apos;utilisation de notre plateforme
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
                    Bienvenue sur la plateforme du Forum ECC organisé par l&apos;École Centrale Casablanca. 
                    En accédant à notre site web et en utilisant nos services, vous acceptez d&apos;être lié par 
                    les présentes conditions d&apos;utilisation.
                  </p>
                  <p>
                    <strong>Date de dernière mise à jour :</strong> 1er octobre 2025
                  </p>
                  <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                    <p className="font-semibold">
                      Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Definitions */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="blue-green">Définitions</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <ul className="space-y-3">
                    <li><strong>&quot;Plateforme&quot; :</strong> Le site web du Forum ECC et tous ses services associés</li>
                    <li><strong>&quot;École&quot; :</strong> L&apos;École Centrale Casablanca</li>
                    <li><strong>&quot;Forum&quot; :</strong> Le Forum ECC - 11ème édition</li>
                    <li><strong>&quot;Utilisateur&quot; :</strong> Toute personne accédant à la plateforme</li>
                    <li><strong>&quot;Participant&quot; :</strong> Étudiant ou professionnel inscrit au forum</li>
                    <li><strong>&quot;Entreprise partenaire&quot; :</strong> Entreprise officiellement inscrite au forum</li>
                  </ul>
                </div>
              </Card>

              {/* Access and Registration */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Accès et Inscription
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Conditions d&apos;accès</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>L&apos;accès à la plateforme est gratuit pour la consultation générale</li>
                    <li>L&apos;inscription au forum peut être soumise à des frais selon votre statut</li>
                    <li>Vous devez être âgé d&apos;au moins 16 ans pour vous inscrire</li>
                    <li>Les informations fournies lors de l&apos;inscription doivent être exactes et complètes</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">Compte utilisateur</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
                    <li>Vous devez notifier immédiatement tout usage non autorisé de votre compte</li>
                    <li>L&apos;École peut suspendre ou supprimer votre compte en cas de violation des conditions</li>
                  </ul>
                </div>
              </Card>

              {/* Usage Rules */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="primary">Règles d&apos;Utilisation</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Utilisation autorisée</h3>
                  <p>Vous pouvez utiliser la plateforme pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Consulter les informations sur le Forum ECC</li>
                    <li>Vous inscrire aux événements et activités</li>
                    <li>Mettre à jour vos informations de profil</li>
                    <li>Télécharger vos documents (CV, lettres de motivation)</li>
                    <li>Communiquer avec les organisateurs et participants</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">Utilisations interdites</h3>
                  <p>Il est strictement interdit de :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Utiliser la plateforme à des fins illégales ou non autorisées</li>
                    <li>Tenter d&apos;accéder aux comptes d&apos;autres utilisateurs</li>
                    <li>Télécharger des virus ou codes malveillants</li>
                    <li>Utiliser des robots ou scripts automatisés</li>
                    <li>Collecter des données personnelles d&apos;autres utilisateurs</li>
                    <li>Publier du contenu offensant, diffamatoire ou inapproprié</li>
                    <li>Violer les droits de propriété intellectuelle</li>
                  </ul>
                </div>
              </Card>

              {/* Intellectual Property */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Propriété Intellectuelle
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    L&apos;ensemble du contenu de la plateforme (textes, images, logos, vidéos, design) est protégé 
                    par les droits de propriété intellectuelle et appartient à l&apos;École Centrale Casablanca ou 
                    à ses partenaires.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Toute reproduction non autorisée est interdite</li>
                    <li>L&apos;utilisation commerciale du contenu est prohibée sans autorisation écrite</li>
                    <li>Les marques et logos sont des marques déposées</li>
                    <li>Vous conservez vos droits sur le contenu que vous téléchargez (CV, documents)</li>
                  </ul>
                </div>
              </Card>

              {/* Responsibilities */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Responsabilités
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Responsabilité de l&apos;utilisateur</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vous êtes responsable de vos actions sur la plateforme</li>
                    <li>Vous garantissez l&apos;exactitude des informations fournies</li>
                    <li>Vous vous engagez à respecter les présentes conditions</li>
                    <li>Vous indemnisez l&apos;École contre tout dommage résultant de votre utilisation</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">Limitation de responsabilité</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>L&apos;École ne garantit pas la disponibilité continue de la plateforme</li>
                    <li>Nous ne sommes pas responsables des dommages indirects</li>
                    <li>La responsabilité est limitée au montant payé pour l&apos;inscription</li>
                    <li>Nous ne contrôlons pas le contenu fourni par les utilisateurs</li>
                  </ul>
                </div>
              </Card>

              {/* Privacy and Data */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="blue-green">Confidentialité et Données</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Le traitement de vos données personnelles est régi par notre 
                    <a href="/privacy" className="text-primary-600 hover:text-primary-800 font-semibold ml-1">
                      Politique de Confidentialité
                    </a>.
                  </p>
                  <div className="bg-secondary/10 p-6 rounded-lg border-l-4 border-secondary">
                    <p className="font-semibold">Points clés :</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Vos données ne sont partagées qu&apos;avec les entreprises participantes au forum</li>
                      <li>Vous pouvez exercer vos droits sur vos données à tout moment</li>
                      <li>Nous utilisons des mesures de sécurité appropriées</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Modifications */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Modifications des Conditions
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    L&apos;École Centrale Casablanca se réserve le droit de modifier ces conditions d&apos;utilisation 
                    à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Les utilisateurs seront informés des modifications importantes par email</li>
                    <li>L&apos;utilisation continue de la plateforme vaut acceptation des nouvelles conditions</li>
                    <li>En cas de désaccord, vous devez cesser d&apos;utiliser la plateforme</li>
                  </ul>
                </div>
              </Card>

              {/* Termination */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  Résiliation
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Par l&apos;utilisateur</h3>
                  <p>
                    Vous pouvez fermer votre compte à tout moment en nous contactant. 
                    La fermeture n&apos;annule pas les obligations déjà contractées.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">Par l&apos;École</h3>
                  <p>
                    Nous pouvons suspendre ou supprimer votre accès en cas de :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violation des présentes conditions</li>
                    <li>Utilisation frauduleuse ou abusive</li>
                    <li>Inactivité prolongée du compte</li>
                  </ul>
                </div>
              </Card>

              {/* Applicable Law */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="primary">Droit Applicable</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Les présentes conditions d&apos;utilisation sont régies par le droit marocain. 
                    Tout litige sera soumis à la compétence exclusive des tribunaux de Casablanca.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <p className="font-semibold">En cas de litige, privilégions la résolution amiable.</p>
                    <p className="mt-2">
                      Contactez-nous d&apos;abord à : 
                      <a href="mailto:forum@centrale-casablanca.ma" className="text-primary-600 hover:text-primary-800 ml-1">
                        legal@forum-ecc.ma
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Contact */}
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={fontStyles.heading}>
                  <GradientText variant="blue-green">Contact</GradientText>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300" style={fontStyles.body}>
                  <p>
                    Pour toute question concernant ces conditions d&apos;utilisation :
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <p><strong>Forum ECC - École Centrale Casablanca</strong></p>
                    <p>Email : <a href="mailto:forum@centrale-casablanca.ma" className="text-primary-600 hover:text-primary-800">forum@centrale-casablanca.ma</a></p>
                    <p>Adresse : Ecole Centrale Casablanca</p>
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
