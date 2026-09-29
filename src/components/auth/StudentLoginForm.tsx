'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormInput } from '@/components/ui/FormInput';
import { FormPasswordInput } from '@/components/ui/FormPasswordInput';
import { FormCheckbox } from '@/components/ui/FormCheckbox';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { LoginFormData } from '@/types/auth';
import { useFontStyles } from '@/hooks/useFontStyles';
import { useAuth } from '@/contexts/AuthContext';

export const StudentLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fontStyles = useFontStyles();
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const { authService } = await import('@/services/authService');
      const result = await authService.login({
        email: data.email,
        password: data.password,
        remember_me: data.rememberMe || false
      });

      if (result.success && result.token && result.user) {
        // Vérifier que l'utilisateur est bien un étudiant
        if (result.user.user_type !== 'student') {
          toast({
            title: 'Accès refusé',
            description: 'Seuls les comptes étudiants peuvent se connecter ici. Veuillez utiliser la connexion entreprise.',
            variant: 'destructive',
          });
          return;
        }

        login(result.token, result.user);

        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue sur votre espace étudiant',
          variant: 'success',
        });

        router.push('/dashboard/espace-student');
      } else if (result.email_verification_required) {
        // Utilisateur non vérifié - rediriger vers vérification
        if (result.user_email) {
          localStorage.setItem('pendingVerificationEmail', result.user_email);
        }
        
        toast({
          title: 'Vérification requise',
          description: 'Vous devez vérifier votre email avant de vous connecter.',
          variant: 'destructive',
        });
        
        // Rediriger vers la page de vérification
        setTimeout(() => {
          router.push('/auth/verify-email');
        }, 2000);
      } else {
        throw new Error(result.message || 'Erreur de connexion');
      }

    } catch (error: unknown) {
      // console.error removed for production

      let errorMessage = 'Email ou mot de passe incorrect';
      let shouldRedirectToVerification = false;
      let userEmail = '';

      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          errorMessage = errorData.message || errorMessage;
          
          // Vérifier si c'est un problème de vérification d'email
          if (errorData.email_verification_required) {
            shouldRedirectToVerification = true;
            userEmail = errorData.user_email || data.email;
          }
        } catch {
          errorMessage = error.message;
        }
      }

      if (shouldRedirectToVerification) {
        // Stocker l'email et rediriger vers vérification
        localStorage.setItem('pendingVerificationEmail', userEmail);
        
        toast({
          title: 'Vérification requise',
          description: 'Vous devez vérifier votre email avant de vous connecter.',
          variant: 'destructive',
        });
        
        setTimeout(() => {
          router.push('/auth/verify-email');
        }, 2000);
      } else {
        toast({
          title: 'Erreur de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white" style={fontStyles.heading}>
        Connexion Étudiant
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email étudiant"
          placeholder="votre.email@etudiant.com"
          type="email"
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide',
            },
          })}
          error={errors.email}
          autoComplete="email"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />
        
        <FormPasswordInput
          label="Mot de passe"
          placeholder="********"
          {...register('password', {
            required: 'Mot de passe requis',
            minLength: {
              value: 6,
              message: 'Le mot de passe doit contenir au moins 6 caractères',
            },
          })}
          error={errors.password}
          autoComplete="current-password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        
        <div className="flex items-center justify-between">
          <FormCheckbox
            label="Se souvenir de moi"
            {...register('rememberMe')}
          />
          
          <Link 
            href="/auth/reset-password" 
            className="text-sm text-primary hover:underline"
            style={fontStyles.sans}
          >
            Mot de passe oublié ?
          </Link>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p style={fontStyles.body} className="text-gray-600 dark:text-gray-300">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup/student" className="text-primary hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};