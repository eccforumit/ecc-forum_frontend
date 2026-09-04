'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormInput } from '@/components/ui/FormInput';
import { FormPasswordInput } from '@/components/ui/FormPasswordInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { FormCheckbox } from '@/components/ui/FormCheckbox';
import { FormFileInput } from '@/components/ui/FormFileInput';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { studentSignupSchema } from '@/lib/validations';
import { StudentSignupFormData } from '@/types/auth';
import { useFontStyles } from '@/hooks/useFontStyles';

export const StudentSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fontStyles = useFontStyles();
  const router = useRouter();
  const { toast } = useToast();


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(studentSignupSchema),
    mode: 'onBlur',
  });

  const selectedSchool = watch('school');
  const selectedMajor = watch('major');

  const onSubmit = async (data: StudentSignupFormData) => {
    try {
      setIsLoading(true);

      const { authService } = await import('@/services/authService');

      const result = await authService.signupStudent(data);

      if (result.success) {
        if (result.requires_verification) {
          localStorage.setItem('pendingVerificationEmail', data.email);

          toast({
            title: 'Inscription réussie !',
            description: 'Un email de vérification a été envoyé. Vérifiez votre boîte de réception.',
            variant: 'success',
          });

          setTimeout(() => {
            router.push('/auth/verify-email');
          }, 2000);

        } else {
          toast({
            title: 'Inscription réussie',
            description: 'Votre compte a été créé avec succès. Vous allez être redirigé vers votre espace étudiant.',
            variant: 'success',
          });

          if (result.user?.id) {
            setTimeout(() => {
              router.push('/dashboard/espace-student');
            }, 2000);
          } else {
            setTimeout(() => {
              router.push('/auth/login/student');
            }, 2000);
          }
        }
      } else {
        throw new Error(result.message || 'Erreur lors de l\'inscription');
      }

    } catch (error: unknown) {
      let errorMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';

      if (error instanceof Error) {
        errorMessage = error.message;

        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            const firstError = Object.values(errorData.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0];
            }
          }
        } catch {
        }
      }

      toast({
        title: 'Erreur d\'inscription',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const schoolOptions = [
    { value: '', label: 'Sélectionner une école' },
    { value: 'ECC', label: 'École Centrale Casablanca' },
    { value: 'other', label: 'Autre' },
  ];

  const majorOptions = selectedSchool === 'ECC'
    ? [
        { value: '', label: 'Sélectionner un Cycle' },
        { value: 'Ingenieur', label: 'Cycle Ingénieur' },
        { value: 'Bachelor', label: 'Cycle Bachelor' },
      ]
    : [
        { value: '', label: 'Sélectionner un Cycle' },
        { value: 'Ingenieur', label: 'Cycle Ingénieur' },
        { value: 'Master', label: 'Master' },
      ];

  const getYearOptions = () => {
    if (selectedSchool === 'ECC') {
      if (selectedMajor === 'Bachelor') {
        return [
          { value: '', label: "Sélectionner une année d'étude" },
          { value: '1', label: "1A" },
          { value: '2', label: "2A" },
          { value: '3', label: "3A" },
          { value: '4', label: "4A" },
          { value: 'Laureat', label: "Lauréat" },
          { value: 'Futur_diplome', label: "Futur diplomé" },
        ];
      } else {
        return [
          { value: '', label: "Sélectionner une année d'étude" },
          { value: '1', label: "1A" },
          { value: '2', label: "2A" },
          { value: '3', label: "3A" },
          { value: 'Cesure', label: "Césure" },
          { value: 'Laureat', label: "Lauréat" },
          { value: 'Futur_diplome', label: "Futur diplomé" },
        ];
      }
    } else {
      return [
        { value: '', label: "Sélectionner une année d'étude" },
        { value: '1', label: "1A" },
        { value: '2', label: "2A" },
        { value: '3', label: "3A" },
        { value: 'Laureat', label: "Lauréat" },
        { value: 'Futur_diplome', label: "Futur diplomé" },
      ];
    }
  };

  const yearOptions = getYearOptions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white" style={fontStyles.heading}>
        Inscription Étudiant
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Prénom"
            placeholder="Votre prénom"
            {...register('firstName')}
            error={errors.firstName}
            autoComplete="given-name"
          />

          <FormInput
            label="Nom"
            placeholder="Votre nom"
            {...register('lastName')}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>

        <FormInput
          label="Email"
          placeholder="votre.email@exemple.com"
          type="email"
          {...register('email')}
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

        <FormInput
          label="Téléphone (optionnel)"
          placeholder="+212 6XX XXX XXX"
          type="tel"
          {...register('phoneNumber')}
          error={errors.phoneNumber}
          autoComplete="tel"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />

        <FormFileInput
          label="Photo de profil (optionnel)"
          {...register('profileImage')}
          error={errors.profileImage as FieldError}
          accept="image/*"
          maxSize={2}
          preview={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
              label="École"
              {...register('school')}
              error={errors.school}
              options={schoolOptions}
          />

          <FormSelect
              label="Cursus"
              {...register('major')}
              error={errors.major}
              options={majorOptions}
          />

        </div>
        {watch('school') === 'other' && (
            <FormInput
                label="Ecole si différente de ECC"
                placeholder="Nom de votre école"
                {...register('schoolName')}
                error={errors.schoolName}
            />
        )}
        <FormSelect
          label="Année d'étude"
          {...register('schoolYear')}
          error={errors.schoolYear}
          options={yearOptions}
        />

        <FormCheckbox
          label={
            <span>
              J&apos;accepte les{' '}
              <Link href="/terms" className="text-primary hover:underline">
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
          <p style={fontStyles.body} className="text-gray-600 dark:text-gray-300">
            Déjà inscrit ?{' '}
            <Link href="/auth/login/student" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};