'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { motion } from 'framer-motion';

type IndividualFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

type CompanyFormData = {
  companyName: string;
  companyId: string;
  email: string;
  password: string;
  confirmPassword: string;
  industry: string;
};

export const SignUpForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTypeSelected, setUserTypeSelected] = useState<'company' | 'individual' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCompanyPassword, setShowCompanyPassword] = useState(false);
  const [showCompanyConfirmPassword, setShowCompanyConfirmPassword] = useState(false);
  const router = useRouter();
  
  const {
    register: registerIndividual,
    handleSubmit: handleSubmitIndividual,
    formState: { errors: errorsIndividual },
    watch: watchIndividual
  } = useForm<IndividualFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  });

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
    watch: watchCompany
  } = useForm<CompanyFormData>({
    defaultValues: {
      companyName: '',
      companyId: '',
      email: '',
      password: '',
      confirmPassword: '',
      industry: ''
    }
  });
  
  const companyPassword = watchCompany('password');

  const onSubmitIndividual = async () => {
    setIsSubmitting(true);
    
    try {
      // Here you would normally call an API to register the user
      // console.log removed for production
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        description: 'Inscription réussie! Vous pouvez maintenant vous connecter.',
        variant: 'success'
      });
      
      // Redirect to sign-in page after successful registration
      router.push('/auth/signin');
    } catch {
      toast({
        description: 'Erreur lors de l\'inscription. Veuillez réessayer.',
        variant: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitCompany = async () => {
    setIsSubmitting(true);
    
    try {
      // Here you would normally call an API to register the company
      // console.log removed for production
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        description: 'Inscription réussie! Vous pouvez maintenant vous connecter.',
        variant: 'success'
      });
      
      // Redirect to sign-in page after successful registration
      router.push('/auth/signin');
    } catch {
      toast({
        description: 'Erreur lors de l\'inscription. Veuillez réessayer.',
        variant: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Accès candidat
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
              Accès entreprise
            </p>
          </motion.button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Individual Registration Form
  if (userTypeSelected === 'individual') {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <button
          onClick={() => setUserTypeSelected(null)}
          className="mb-4 text-primary flex items-center hover:underline"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Retour
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Inscription Candidat
        </h2>

        <form onSubmit={handleSubmitIndividual(onSubmitIndividual)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                {...registerIndividual('firstName', { required: 'Ce champ est requis' })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errorsIndividual.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errorsIndividual.firstName && (
                <p className="mt-1 text-sm text-red-500">{errorsIndividual.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                {...registerIndividual('lastName', { required: 'Ce champ est requis' })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errorsIndividual.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errorsIndividual.lastName && (
                <p className="mt-1 text-sm text-red-500">{errorsIndividual.lastName.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...registerIndividual('email', {
                required: 'Email requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide',
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errorsIndividual.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            {errorsIndividual.email && (
              <p className="mt-1 text-sm text-red-500">{errorsIndividual.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              {...registerIndividual('phone', { required: 'Ce champ est requis' })}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errorsIndividual.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            {errorsIndividual.phone && (
              <p className="mt-1 text-sm text-red-500">{errorsIndividual.phone.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...registerIndividual('password', {
                  required: 'Mot de passe requis',
                  minLength: {
                    value: 6,
                    message: 'Le mot de passe doit contenir au moins 6 caractères',
                  },
                })}
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errorsIndividual.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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
            {errorsIndividual.password && (
              <p className="mt-1 text-sm text-red-500">{errorsIndividual.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...registerIndividual('confirmPassword', {
                  required: 'Mot de passe requis',
                  validate: (value) =>
                    value === watchIndividual('password') || 'Les mots de passe ne correspondent pas',
                })}
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errorsIndividual.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errorsIndividual.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errorsIndividual.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            S&apos;inscrire
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <button
        onClick={() => setUserTypeSelected(null)}
        className="mb-4 text-primary flex items-center hover:underline"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Retour
      </button>
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Inscription Entreprise
      </h2>
      <form onSubmit={handleSubmitCompany(onSubmitCompany)} className="space-y-5">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom de l&apos;entreprise
          </label>
          <input
            id="companyName"
            type="text"
            {...registerCompany('companyName', {
              required: 'Ce champ est requis',
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
              errorsCompany.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
          {errorsCompany.companyName && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.companyName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Numéro SIRET / SIREN
          </label>
          <input
            id="companyId"
            type="text"
            {...registerCompany('companyId', {
              required: 'Ce champ est requis',
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
              errorsCompany.companyId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
          {errorsCompany.companyId && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.companyId.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Secteur d&apos;activité
          </label>
          <select
            id="industry"
            {...registerCompany('industry', {
              required: 'Ce champ est requis',
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
              errorsCompany.industry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          >
            <option value="">Sélectionnez un secteur</option>
            <option value="tech">Technologie</option>
            <option value="finance">Finance</option>
            <option value="health">Santé</option>
            <option value="edu">Éducation</option>
            <option value="energy">Énergie</option>
            <option value="manufacturing">Industrie</option>
            <option value="retail">Commerce</option>
            <option value="telecom">Télécommunication</option>
            <option value="transport">Transport</option>
            <option value="other">Autre</option>
          </select>
          {errorsCompany.industry && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.industry.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...registerCompany('email', {
              required: 'Email requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide',
              },
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
              errorsCompany.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
          {errorsCompany.email && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <input
              id="password"
              type={showCompanyPassword ? 'text' : 'password'}
              {...registerCompany('password', {
                required: 'Mot de passe requis',
                minLength: {
                  value: 8,
                  message: 'Le mot de passe doit contenir au moins 8 caractères',
                },
              })}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errorsCompany.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowCompanyPassword(!showCompanyPassword)}
            >
              {showCompanyPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errorsCompany.password && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showCompanyConfirmPassword ? 'text' : 'password'}
              {...registerCompany('confirmPassword', {
                required: 'Ce champ est requis',
                validate: (value) =>
                  value === companyPassword || 'Les mots de passe ne correspondent pas',
              })}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errorsCompany.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowCompanyConfirmPassword(!showCompanyConfirmPassword)}
            >
              {showCompanyConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errorsCompany.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errorsCompany.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            J&apos;accepte les{' '}
            <Link href="/terms" className="text-primary hover:underline">
              conditions d&apos;utilisation
            </Link>{' '}
            et la{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
          </label>
        </div>
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            S&apos;inscrire
          </Button>
        </div>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};
