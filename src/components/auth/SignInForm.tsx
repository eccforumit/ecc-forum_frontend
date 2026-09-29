'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

type SignInFormData = {
  email: string;
  password: string;
  userType: 'company' | 'individual';
};

export const SignInForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTypeSelected, setUserTypeSelected] = useState<'company' | 'individual' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
  setIsSubmitting(true);

  try {
    if (data.password === 'test1234') {
      toast({
        description: 'Connexion réussie!',
        variant: 'success'
      });

      if (data.userType === 'company') {
        router.push('/espace-entreprise');
      } else {
        router.push('/cv-theque');
      }
    } else {
      toast({
        description: 'Erreur de connexion',
        variant: 'error'
      });
    }
  } catch {
    toast({
      description: 'Erreur de connexion',
      variant: 'error'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    if (errorMessage) {
      toast({
        description: 'Erreur de connexion',
        variant: 'error'
      });
    }
  }, [errorMessage, toast]);
  
  // If userType is not selected, show the selection screen
  if (!userTypeSelected) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Choisissez votre type de compte
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 border-2 border-primary rounded-xl flex flex-col items-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            onClick={() => setUserTypeSelected('individual')}
          >
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Particulier</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              Accès à la CV-thèque
            </p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 border-2 border-secondary rounded-xl flex flex-col items-center hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-colors"
            onClick={() => setUserTypeSelected('company')}
          >
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Entreprise</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              Accès espace entreprise
            </p>
          </motion.button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Vous n&apos;avez pas de compte?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <Button
        onClick={() => setUserTypeSelected(null)}
        variant="ghost"
        size="sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        {userTypeSelected === 'individual' ? 'Connexion Candidat' : 'Connexion Entreprise'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide',
                },
              })}
              className={`w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Mot de passe requis',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 caractères',
                },
              })}
              className={`w-full pl-10 pr-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:underline">
              Mot de passe oublié?
            </Link>
          </div>
        </div>
        
        <input type="hidden" {...register('userType')} value={userTypeSelected} />

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Vous n&apos;avez pas de compte?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};
