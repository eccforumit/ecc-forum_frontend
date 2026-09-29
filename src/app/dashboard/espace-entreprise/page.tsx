'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { CVSearchSection } from '@/components/entreprise/CVSearchSection';
// import { QrCodeDownloader } from '@/components/dashboard/QrCodeDownloader';

export default function EspaceEntreprise() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated || !user) {
      router.push('/auth/login/company');
      return;
    }
    
    if (user.user_type !== 'company') {
      router.push('/dashboard/espace-student');
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement de votre espace entreprise...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.user_type !== 'company') {
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom mx-auto"
      >
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Espace Entreprise
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Consultez les CV des candidats et contactez directement les étudiants qui correspondent à vos besoins.
          </p>
        </div>

        {/* QR Code Downloader Section */}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: 20 }}*/}
        {/*  animate={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.6, delay: 0.2 }}*/}
        {/*  className="mb-12"*/}
        {/*>*/}
        {/*  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-3xl mx-auto">*/}
        {/*    <div className="mb-4">*/}
        {/*      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">*/}
        {/*        📥 Télécharger tous les QR Codes ECC*/}
        {/*      </h2>*/}
        {/*      <p className="text-gray-600 dark:text-gray-300">*/}
        {/*        Téléchargez tous les QR codes des étudiants de l&apos;École Centrale Casablanca, */}
        {/*        organisés par cursus et année d&apos;étude.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <QrCodeDownloader buttonVariant="primary" />*/}
        {/*  </div>*/}
        {/*</motion.div>*/}

        {/* CVSearchSection Component */}
        <CVSearchSection />
      </motion.div>
    </div>
  );
}
