'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { StudentProfile } from '@/types/auth';
import { studentService } from '@/services/studentService';

interface ProfileFormProps {
  profile: StudentProfile | null;
  onSuccess: (updatedProfile: StudentProfile) => void;
  onCancel: () => void;
}

interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone_number?: string;
  school: string;
  school_name?: string;
  major: string;
  school_year: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  profile_image?: FileList;
  cv_file?: FileList;
}

export function ProfileForm({ profile, onSuccess, onCancel }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(profile?.profile_image_url || null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone_number: profile?.phone_number || '',
      school: profile?.school || '',
      school_name: profile?.school_name || '',
      major: profile?.major || '',
      school_year: profile?.school_year || '',
      linkedin_url: profile?.linkedin_url || '',
      github_url: profile?.github_url || '',
      portfolio_url: profile?.portfolio_url || '',
    }
  });

  const selectedSchool = watch('school');
  const selectedMajor = watch('major');

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();

      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'profile_image' && key !== 'cv_file' && typeof value === 'string') {
          formData.append(key, value);
        }
      });

      // Add files if selected
      if (data.profile_image?.[0]) {
        formData.append('profile_image', data.profile_image[0]);
      }
      if (data.cv_file?.[0]) {
        formData.append('cv_file', data.cv_file[0]);
      }      const updatedProfile = await studentService.updateMyProfile(formData);

      // Show success message
      alert('✅ Profil mis à jour avec succès !');

      onSuccess(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  };

  const schoolOptions = [
    { value: 'ECC', label: 'École Centrale Casablanca' },
    { value: 'other', label: 'Autre école' },
  ];

  const majorOptions = selectedSchool === 'ECC'
    ? [
        { value: 'Ingenieur', label: 'Ingénieur' },
        { value: 'Bachelor', label: 'Bachelor' },
      ]
    : [
        { value: 'Ingenieur', label: 'Ingénieur' },
        { value: 'Master', label: 'Master' },
      ];

  const getYearOptions = () => {
    if (selectedSchool === 'ECC') {
      if (selectedMajor === 'Bachelor') {
        return [
          { value: '1', label: '1A' },
          { value: '2', label: '2A' },
          { value: '3', label: '3A' },
          { value: '4', label: '4A' },
          { value: 'Laureat', label: 'Lauréat' },
          { value: 'Futur_diplome', label: 'Futur diplomé' },
        ];
      } else {
        return [
          { value: '1', label: '1A' },
          { value: '2', label: '2A' },
          { value: '3', label: '3A' },
          { value: 'Cesure', label: 'Césure' },
          { value: 'Laureat', label: 'Lauréat' },
          { value: 'Futur_diplome', label: 'Futur diplomé' },
        ];
      }
    } else {
      return [
        { value: '1', label: '1A' },
        { value: '2', label: '2A' },
        { value: '3', label: '3A' },
        { value: 'Laureat', label: 'Lauréat' },
        { value: 'Futur_diplome', label: 'Futur diplomé' },
      ];
    }
  };

  const yearOptions = getYearOptions();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Modifier le profil</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Prénom"
            placeholder="Votre prénom"
            {...register('first_name', { required: 'Prénom requis' })}
            error={errors.first_name}
          />

          <FormInput
            label="Nom"
            placeholder="Votre nom"
            {...register('last_name', { required: 'Nom requis' })}
            error={errors.last_name}
          />
        </div>

        <FormInput
          label="Numéro de téléphone"
          placeholder="+212612345678"
          type="tel"
          {...register('phone_number')}
          error={errors.phone_number}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="École"
            {...register('school', { required: 'École requise' })}
            error={errors.school}
            options={schoolOptions}
          />

          <FormInput
            label="Nom de l'école (si autre)"
            placeholder="Nom de votre école"
            {...register('school_name')}
            error={errors.school_name}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Filière"
            {...register('major', { required: 'Filière requise' })}
            error={errors.major}
            options={majorOptions}
          />

          <FormSelect
            label="Année d'études"
            {...register('school_year', { required: 'Année requise' })}
            error={errors.school_year}
            options={yearOptions}
          />
        </div>

        <FormInput
          label="LinkedIn URL (optionnel)"
          placeholder="https://linkedin.com/in/votrenom"
          type="url"
          {...register('linkedin_url')}
          error={errors.linkedin_url}
        />

        <FormInput
          label="GitHub URL (optionnel)"
          placeholder="https://github.com/votrenom"
          type="url"
          {...register('github_url')}
          error={errors.github_url}
        />

        <FormInput
          label="Portfolio URL (optionnel)"
          placeholder="https://monportfolio.com"
          type="url"
          {...register('portfolio_url')}
          error={errors.portfolio_url}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo de profil (optionnel)</label>
            <input
              type="file"
              accept="image/*"
              {...register('profile_image')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {imagePreview && (
              <div className="mt-3">
                <Image
                  src={imagePreview}
                  alt="Aperçu de la photo de profil"
                  width={128}
                  height={128}
                  className="object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CV (PDF) (optionnel)</label>
            <input
              type="file"
              accept=".pdf"
              {...register('cv_file')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCvFileName(file.name);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {cvFileName && (
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fichier sélectionné : {cvFileName}</span>
              </div>
            )}
            {profile?.cv_file_url && !cvFileName && (
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                CV actuel disponible
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </div>
  );
}