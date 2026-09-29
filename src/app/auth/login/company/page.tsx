'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CompanyLoginForm } from '@/components/auth/CompanyLoginForm';
import { useFontStyles } from '@/hooks/useFontStyles';
import Header from '@/components/ui/Header';

export default function CompanyLoginPage() {
  const fontStyles = useFontStyles();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="pt-20 md:pt-24 min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
              style={fontStyles.heading}
            >
              Espace Entreprise
            </h1>
            <p 
              className="text-gray-600 dark:text-gray-300"
              style={fontStyles.body}
            >
              Connectez-vous pour gérer votre participation au Forum ECC
            </p>
          </div>
          
          <CompanyLoginForm />
        </div>
      </div>
      
      {/* Right side - Image and info */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <Image 
          src="/images/ecc_d.jpg"
          alt="Corporate meeting" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary-700/90 flex flex-col items-center justify-center p-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-center"
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={fontStyles.heading}
            >
              Recrutez les meilleurs talents.
            </h2>
            <p 
              className="text-lg mb-8"
              style={fontStyles.body}
            >
              Le Forum ECC vous offre l&apos;opportunité unique d&apos;entrer en contact 
              avec les étudiants les plus prometteurs de l&apos;Ecole Centrale Casablanca.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={fontStyles.sans}
                >
                  500+ Étudiants
                </h3>
                <p style={fontStyles.body}>
                  Des talents de haut niveau prêts à rejoindre votre équipe
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={fontStyles.sans}
                >
                  Visibilité Maximale
                </h3>
                <p style={fontStyles.body}>
                  Mettez en valeur votre entreprise et vos opportunités
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}