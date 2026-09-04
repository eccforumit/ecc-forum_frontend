'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StudentSignupForm } from '@/components/auth/StudentSignupForm';
import { useFontStyles } from '@/hooks/useFontStyles';
import Header from '@/components/ui/Header';

export default function StudentSignupPage() {
  const fontStyles = useFontStyles();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="pt-20 md:pt-24 min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image and info */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <Image 
          src="/images/ecc_a.jpg"
          alt="Students in a campus" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-primary/80 flex flex-col items-center justify-center p-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md"
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={fontStyles.heading}
            >
              Rejoignez la communauté du Forum ECC
            </h2>
            {/*<p */}
            {/*  className="text-lg mb-8"*/}
            {/*  style={fontStyles.body}*/}
            {/*>*/}
            {/*  En vous inscrivant, vous pourrez :*/}
            {/*</p>*/}
            
            {/*<ul className="space-y-4">*/}
            {/*  <li className="flex items-start">*/}
            {/*    <svg className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />*/}
            {/*    </svg>*/}
            {/*    <span style={fontStyles.body}>Postuler aux offres de stage et d&apos;emploi</span>*/}
            {/*  </li>*/}
            {/*  <li className="flex items-start">*/}
            {/*    <svg className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />*/}
            {/*    </svg>*/}
            {/*    <span style={fontStyles.body}>Créer et partager votre CV avec les recruteurs</span>*/}
            {/*  </li>*/}
            {/*  <li className="flex items-start">*/}
            {/*    <svg className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />*/}
            {/*    </svg>*/}
            {/*    <span style={fontStyles.body}>Recevoir des notifications pour les événements</span>*/}
            {/*  </li>*/}
            {/*  <li className="flex items-start">*/}
            {/*    <svg className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />*/}
            {/*    </svg>*/}
            {/*    <span style={fontStyles.body}>Planifier des entretiens avec les entreprises</span>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
              style={fontStyles.heading}
            >
              Créer votre compte étudiant
            </h1>
            <p 
              className="text-gray-600 dark:text-gray-300"
              style={fontStyles.body}
            >
              Inscrivez-vous pour accéder à toutes les opportunités du Forum ECC
            </p>
          </div>
          
          <StudentSignupForm />
        </div>
      </div>
      </div>
    </div>
  );
}