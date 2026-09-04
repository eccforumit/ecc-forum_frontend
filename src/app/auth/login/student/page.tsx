'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StudentLoginForm } from '@/components/auth/StudentLoginForm';
import { useFontStyles } from '@/hooks/useFontStyles';
import Header from '@/components/ui/Header';

export default function StudentLoginPage() {
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
              Bienvenue, étudiant !
            </h1>
            <p 
              className="text-gray-600 dark:text-gray-300"
              style={fontStyles.body}
            >
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>
          
          <StudentLoginForm />
        </div>
      </div>
      
      {/* Right side - Image and info */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <Image 
          src="/images/ecc_c.jpg"
          alt="Students in a campus" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-700/90 flex flex-col items-center justify-center p-10 text-white">
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
              Trouvez votre stage idéal au Forum ECC
            </h2>
            <p 
              className="text-lg mb-8"
              style={fontStyles.body}
            >
              Le Forum ECC vous connecte avec les meilleures entreprises 
              à la recherche de talents comme vous. Accédez à des offres 
              exclusives et lancez votre carrière.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={fontStyles.sans}
                >
                  50+ Entreprises
                </h3>
                <p style={fontStyles.body}>
                  Des entreprises de premier plan à la recherche de talents
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={fontStyles.sans}
                >
                  200+ Offres
                </h3>
                <p style={fontStyles.body}>
                  Des opportunités dans tous les domaines d&apos;ingénierie
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