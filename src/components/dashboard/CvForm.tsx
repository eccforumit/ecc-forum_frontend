'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { StudentCV, cvService } from '@/services/cvService';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CvFormProps {
  existingCv?: StudentCV | null;
  onSuccess: (cv: StudentCV) => void;
  onCancel: () => void;
}

interface CvFormData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: { name: string; level?: string }[];
  work_experiences: {
    title: string;
    company: string;
    location?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
  }[];
  educations: {
    degree: string;
    institution: string;
    location?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
  }[];
  languages: { name: string; level: string }[];
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export function CvForm({ existingCv, onSuccess, onCancel }: CvFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, control, formState: { errors } } = useForm<CvFormData>({
    defaultValues: {
      title: existingCv?.title || '',
      first_name: existingCv?.firstName || '',
      last_name: existingCv?.lastName || '',
      email: existingCv?.email || '',
      phone: existingCv?.phone || '',
      location: '',
      summary: existingCv?.summary || '',
      skills: existingCv?.skills || [{ name: '', level: '' }],
      work_experiences: [{ title: '', company: '', start_date: '', description: '' }],
      educations: [{ degree: '', institution: '', start_date: '' }],
      languages: [{ name: '', level: '' }],
      website: '',
      linkedin: '',
      github: '',
      twitter: '',
    }
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'work_experiences'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'educations'
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'languages'
  });

  const onSubmit = async (data: CvFormData) => {
    setIsLoading(true);
    setError('');

    try {
      let result: StudentCV;
      
      if (existingCv) {
        result = await cvService.updateCV(existingCv.id, data);
      } else {
        result = await cvService.createCV(data);
      }
      
      onSuccess(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'opération');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {existingCv ? 'Modifier le CV' : 'Créer un nouveau CV'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informations personnelles */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Titre du CV"
              placeholder="Ex: Étudiant en Ingénierie"
              {...register('title', { required: 'Titre requis' })}
              error={errors.title}
            />
            
            <FormInput
              label="Email"
              placeholder="votre.email@exemple.com"
              type="email"
              {...register('email', { required: 'Email requis' })}
              error={errors.email}
            />
            
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
            
            <FormInput
              label="Téléphone"
              placeholder="+212612345678"
              {...register('phone')}
              error={errors.phone}
            />
            
            <FormInput
              label="Localisation"
              placeholder="Casablanca, Maroc"
              {...register('location')}
              error={errors.location}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Résumé professionnel</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              rows={4}
              placeholder="Décrivez brièvement votre profil et objectifs..."
              {...register('summary')}
            />
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Compétences</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill({ name: '', level: '' })}
              leftIcon={<FaPlus />}
            >
              Ajouter
            </Button>
          </div>
          
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end mb-3">
              <div className="flex-1">
                <FormInput
                  label="Compétence"
                  placeholder="Ex: React, Python, etc."
                  {...register(`skills.${index}.name`)}
                />
              </div>
              <div className="w-40">
                <FormInput
                  label="Niveau"
                  placeholder="Ex: Débutant, Avancé"
                  {...register(`skills.${index}.level`)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>

        {/* Expériences professionnelles */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Expériences professionnelles</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendExperience({ 
                title: '', 
                company: '', 
                start_date: '', 
                description: '' 
              })}
              leftIcon={<FaPlus />}
            >
              Ajouter
            </Button>
          </div>
          
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg mb-4">
              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Poste"
                  placeholder="Ex: Développeur Stagiaire"
                  {...register(`work_experiences.${index}.title`)}
                />
                
                <FormInput
                  label="Entreprise"
                  placeholder="Nom de l'entreprise"
                  {...register(`work_experiences.${index}.company`)}
                />
                
                <FormInput
                  label="Date de début"
                  type="date"
                  {...register(`work_experiences.${index}.start_date`)}
                />
                
                <FormInput
                  label="Date de fin"
                  type="date"
                  {...register(`work_experiences.${index}.end_date`)}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  rows={3}
                  placeholder="Décrivez vos responsabilités et réalisations..."
                  {...register(`work_experiences.${index}.description`)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Formations */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Formations</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEducation({ 
                degree: '', 
                institution: '', 
                start_date: '' 
              })}
              leftIcon={<FaPlus />}
            >
              Ajouter
            </Button>
          </div>
          
          {educationFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg mb-4">
              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Diplôme"
                  placeholder="Ex: Ingénieur en Informatique"
                  {...register(`educations.${index}.degree`)}
                />
                
                <FormInput
                  label="Établissement"
                  placeholder="Nom de l'école/université"
                  {...register(`educations.${index}.institution`)}
                />
                
                <FormInput
                  label="Date de début"
                  type="date"
                  {...register(`educations.${index}.start_date`)}
                />
                
                <FormInput
                  label="Date de fin"
                  type="date"
                  {...register(`educations.${index}.end_date`)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Langues */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Langues</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendLanguage({ name: '', level: '' })}
              leftIcon={<FaPlus />}
            >
              Ajouter
            </Button>
          </div>
          
          {languageFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end mb-3">
              <div className="flex-1">
                <FormInput
                  label="Langue"
                  placeholder="Ex: Français, Anglais, Arabe"
                  {...register(`languages.${index}.name`)}
                />
              </div>
              <div className="w-40">
                <FormInput
                  label="Niveau"
                  placeholder="Ex: Courant, Natif"
                  {...register(`languages.${index}.level`)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>

        {/* Liens sociaux */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Liens sociaux (optionnel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Site web"
              placeholder="https://monportfolio.com"
              type="url"
              {...register('website')}
            />
            
            <FormInput
              label="LinkedIn"
              placeholder="https://linkedin.com/in/monprofil"
              type="url"
              {...register('linkedin')}
            />
            
            <FormInput
              label="GitHub"
              placeholder="https://github.com/monusername"
              type="url"
              {...register('github')}
            />
            
            <FormInput
              label="Twitter"
              placeholder="https://twitter.com/monusername"
              type="url"
              {...register('twitter')}
            />
          </div>
        </div>

        {/* Boutons d'action */}
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
            {isLoading ? 'Enregistrement...' : (existingCv ? 'Mettre à jour' : 'Créer le CV')}
          </Button>
        </div>
      </form>
    </div>
  );
}