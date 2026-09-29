'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { useFontStyles } from '@/hooks/useFontStyles';

type UserTypeSelectionProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
};

type UserType = 'student' | 'company';

export function UserTypeSelection({ isOpen, onClose, mode }: UserTypeSelectionProps) {
  const router = useRouter();
  const fontStyles = useFontStyles();

  // Close with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSelection = (userType: UserType) => {
    const path = mode === 'login' 
      ? `/auth/login/${userType}` 
      : `/auth/signup/${userType}`;
    
    // Navigate to the appropriate form without closing the modal
    // This prevents the useEffect in the parent from triggering
    router.push(path);
  };

  const back_home = () =>{
    router.push('/')
  }

  const modeText = mode === 'login' ? 'Connexion' : 'Inscription';

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        />
        <Dialog.Content 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 z-50 animate-scale-in"
        >
          <Dialog.Title 
            className="text-2xl font-bold text-center mb-6 text-black dark:text-white" 
            style={fontStyles.heading}
          >
            {modeText} en tant que
          </Dialog.Title>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              onClick={() => handleSelection('student')}
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-4 relative w-20 h-20">
                <Image 
                  src="/images/student-icon.svg" 
                  alt="Étudiant"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white" style={fontStyles.sans}>Étudiant</h3>
              <p className="text-sm text-gray-900 dark:text-gray-300 mt-2 text-center" style={fontStyles.body}>
                Pour les étudiants à la recherche de stages ou d&apos;emplois
              </p>
            </motion.button>
            
            <motion.button
              onClick={() => handleSelection('company')}
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-4 relative w-20 h-20">
                <Image 
                  src="/images/company-icon.svg" 
                  alt="Entreprise"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white" style={fontStyles.sans}>Entreprise</h3>
              <p className="text-sm text-gray-900 dark:text-gray-300 mt-2 text-center" style={fontStyles.body}>
                Pour les recruteurs qui cherchent des talents
              </p>
            </motion.button>
          </div>
          
          <div className="mt-6 text-center">
            <Dialog.Close asChild>
              <button
               onClick={() => back_home()}
                className="text-gray-800 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                style={fontStyles.sans}
              >
                Annuler
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}