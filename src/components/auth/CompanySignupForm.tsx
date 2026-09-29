'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormInput } from '@/components/ui/FormInput';
import { FormPasswordInput } from '@/components/ui/FormPasswordInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { FormCheckbox } from '@/components/ui/FormCheckbox';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { CompanySignupFormData } from '@/lib/validations';
import { useFontStyles } from '@/hooks/useFontStyles';

export const CompanySignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fontStyles = useFontStyles();
  const router = useRouter();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CompanySignupFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: CompanySignupFormData) => {
    try {
      setIsLoading(true);
      
      // Import auth service on demand to avoid server-side issues
      const { authService } = await import('@/services/authService');
      
      // Nettoyer le numéro de téléphone (enlever espaces, tirets, parenthèses)
      const cleanedPhone = data.contactPhone.replace(/[\s\-\(\)\.]/g, '');
      
      // Nettoyer les valeurs null/undefined pour les champs optionnels
      const cleanedData = {
        ...data,
        contactPhone: cleanedPhone,
        website: data.website || undefined,
        companySize: data.companySize || undefined,
        companyDescription: data.companyDescription || undefined,
      };
      
      const result = await authService.signupCompany(cleanedData);
      
      if (result.success) {
        // Vérifier si l'email doit être vérifié
        if (result.requires_verification) {
          // Stocker l'email pour la page de vérification
          localStorage.setItem('pendingVerificationEmail', data.contactEmail);
          
          toast({
            title: 'Inscription réussie !',
            description: 'Un email de vérification a été envoyé. Vérifiez votre boîte de réception.',
            variant: 'success',
          });
          
          // Rediriger vers la page de vérification d'email
          setTimeout(() => {
            router.push('/auth/verify-email');
          }, 2000);
          
        } else {
          // Email déjà vérifié ou pas de vérification requise
          toast({
            title: 'Inscription réussie',
            description: 'Votre entreprise a été enregistrée avec succès. Vous allez être redirigé vers votre espace entreprise.',
            variant: 'success',
          });
          
          // Rediriger vers le dashboard
          if (result.user?.id) {
            setTimeout(() => {
              router.push('/dashboard/espace-entreprise');
            }, 2000);
          } else {
            setTimeout(() => {
              router.push('/auth/login/company');
            }, 2000);
          }
        }
      } else {
        throw new Error(result.message || 'Erreur lors de l\'inscription');
      }
      
    } catch (error: unknown) {
      // console.error removed for production
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
      toast({
        title: 'Erreur',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const industryOptions = [
    { value: '', label: 'Sélectionner un secteur d\'activité' },
    { value: 'tech', label: 'Technologies & IT' },
    { value: 'consulting', label: 'Conseil' },
    { value: 'engineering', label: 'Ingénierie' },
    { value: 'finance', label: 'Finance & Banque' },
    { value: 'energy', label: 'Énergie' },
    { value: 'automotive', label: 'Automobile' },
    { value: 'healthcare', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'retail', label: 'Commerce & Distribution' },
    { value: 'other', label: 'Autre' },
  ];

  const companySizeOptions = [
    { value: '', label: 'Sélectionner la taille de l\'entreprise' },
    { value: '1-10', label: '1-10 employés' },
    { value: '11-50', label: '11-50 employés' },
    { value: '51-200', label: '51-200 employés' },
    { value: '201-500', label: '201-500 employés' },
    { value: '501-1000', label: '501-1000 employés' },
    { value: '1000+', label: 'Plus de 1000 employés' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white" style={fontStyles.heading}>
        Inscription Entreprise
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Nom de l'entreprise"
          placeholder="Nom de votre entreprise"
          {...register('companyName', {
            required: 'Nom d\'entreprise requis',
            minLength: { value: 2, message: 'Minimum 2 caractères' },
            maxLength: { value: 150, message: 'Maximum 150 caractères' }
          })}
          error={errors.companyName}
        />
        
        <FormSelect
          label="Secteur d'activité"
          {...register('industry', {
            required: 'Secteur d\'activité requis'
          })}
          error={errors.industry}
          options={industryOptions}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Prénom du contact"
            placeholder="Prénom"
            {...register('contactFirstName')}
            error={errors.contactFirstName}
            autoComplete="given-name"
          />
          
          <FormInput
            label="Nom du contact"
            placeholder="Nom"
            {...register('contactLastName')}
            error={errors.contactLastName}
            autoComplete="family-name"
          />
        </div>
        
        <FormInput
          label="Email du contact"
          placeholder="email@entreprise.com"
          type="email"
          {...register('contactEmail', {
            required: 'Email requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          })}
          error={errors.contactEmail}
          autoComplete="email"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />
        
        <FormInput
          label="Téléphone du contact"
          placeholder="+212XXXXXXXXX"
          type="tel"
          {...register('contactPhone', {
            required: 'Téléphone requis',
            pattern: {
              value: /^\+?[0-9]{7,15}$/,
              message: 'Numéro invalide (7-15 chiffres, ex: +33123456789, +1234567890)'
            }
          })}
          error={errors.contactPhone}
          autoComplete="tel"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
        
        <FormPasswordInput
          label="Mot de passe"
          placeholder="********"
          {...register('password')}
          error={errors.password}
          autoComplete="new-password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        
        <FormPasswordInput
          label="Confirmer le mot de passe"
          placeholder="********"
          {...register('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Site web (optionnel)"
            placeholder="https://www.entreprise.com"
            type="url"
            {...register('website')}
            error={errors.website}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
          />
          
          <FormSelect
            label="Taille de l'entreprise"
            {...register('companySize')}
            error={errors.companySize}
            options={companySizeOptions}
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="companyDescription" 
            className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300"
            style={fontStyles.sans}
          >
            Description de l&apos;entreprise (optionnel)
          </label>
          <textarea
            id="companyDescription"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 
                      dark:bg-gray-800 py-2.5 px-4 
                      text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                      transition duration-200"
            rows={3}
            placeholder="Décrivez brièvement votre entreprise..."
            {...register('companyDescription')}
            style={fontStyles.body}
          ></textarea>
          {errors.companyDescription && (
            <p className="mt-1 text-sm text-red-500" style={fontStyles.body}>
              {errors.companyDescription.message}
            </p>
          )}
        </div>
        
        <FormCheckbox
          label={
            <span>
              J&apos;accepte les{' '}
              <Link href="/conditions" className="text-primary hover:underline">
                conditions d&apos;utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </span>
          }
          {...register('acceptTerms')}
          error={errors.acceptTerms}
        />
        
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
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p style={fontStyles.body}>
            Déjà inscrit ?{' '}
            <Link href="/auth/login/company" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};