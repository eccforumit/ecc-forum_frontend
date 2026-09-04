'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toaster';
import { QRCodeClient } from '@/components/ui/QRCodeClient';
import { useAuth } from '@/contexts/AuthContext';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

type Skill = {
  name: string;
  level: SkillLevel;
};

type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
};

type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

type CVForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  summary: string;
  skills: Skill[];
  workExperiences: WorkExperience[];
  educations: Education[];
  languages: { language: string; level: string }[];
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
};

export const CVForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');

  // Initialize skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('intermediate');

  // Initialize work experiences
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  
  // Initialize education
  const [educations, setEducations] = useState<Education[]>([]);
  
  // Initialize languages
  const [languages, setLanguages] = useState<{ language: string; level: string }[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [newLanguageLevel, setNewLanguageLevel] = useState<string>('Intermédiaire');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CVForm>({
    defaultValues: {
      skills: [],
      workExperiences: [],
      educations: [],
      languages: [],
    }
  });

  // Add a skill
  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, { name: newSkill, level: newSkillLevel }];
      setSkills(updatedSkills);
      setValue('skills', updatedSkills);
      setNewSkill('');
      setNewSkillLevel('intermediate');
    }
  };

  // Remove a skill
  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
    setValue('skills', updatedSkills);
  };

  // Add a work experience
  const addWorkExperience = () => {
    const newWorkExperience: WorkExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    };
    setWorkExperiences([...workExperiences, newWorkExperience]);
    setValue('workExperiences', [...workExperiences, newWorkExperience]);
  };

  // Remove a work experience
  const removeWorkExperience = (index: number) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences.splice(index, 1);
    setWorkExperiences(updatedWorkExperiences);
    setValue('workExperiences', updatedWorkExperiences);
  };

  // Update a work experience
  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index] = {
      ...updatedWorkExperiences[index],
      [field]: value,
    };
    setWorkExperiences(updatedWorkExperiences);
    setValue('workExperiences', updatedWorkExperiences);
  };

  // Add an education
  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    setEducations([...educations, newEducation]);
    setValue('educations', [...educations, newEducation]);
  };

  // Remove an education
  const removeEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    setValue('educations', updatedEducations);
  };

  // Update an education
  const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value,
    };
    setEducations(updatedEducations);
    setValue('educations', updatedEducations);
  };

  // Add a language
  const addLanguage = () => {
    if (newLanguage.trim()) {
      const updatedLanguages = [...languages, { language: newLanguage, level: newLanguageLevel }];
      setLanguages(updatedLanguages);
      setValue('languages', updatedLanguages);
      setNewLanguage('');
      setNewLanguageLevel('Intermédiaire');
    }
  };

  // Remove a language
  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
    setValue('languages', updatedLanguages);
  };

  // Handle form submission
  const onSubmit = async (formData: CVForm) => {
    try {
      setIsSubmitting(true);
      
      // Prepare the complete data for submission
      const completeData = {
        ...formData,
        skills,
        workExperiences,
        educations,
        languages,
  userId: user?.id,
        createdAt: new Date().toISOString(),
      };
      
      // Submit to API
      const response = await fetch('/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Une erreur est survenue lors de la soumission');
      }
        // Show success message
      toast({
        description: 'Votre CV a été enregistré et est maintenant accessible aux recruteurs.',
        variant: 'success'
      });
      
      // Set success state and profile URL for QR code
      setIsSubmitted(true);
      setProfileUrl(result.profileUrl);
      
      // Reset form after successful submission (optional)
      // reset();
      
    } catch (error) {
      // console.error removed for production
        toast({
          description: error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission',
          variant: 'error'
        });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSkillLevelLabel = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      default: return '';
    }
  };

  // Render success screen with QR code if submitted
  if (isSubmitted && profileUrl) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">CV enregistré avec succès !</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Votre CV a été enregistré et est maintenant accessible aux recruteurs.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Partagez votre profil</h3>
          <div className="bg-white p-4 rounded-lg shadow-md inline-block">
            <QRCodeClient 
              value={`${window.location.origin}${profileUrl}`} 
              size={180} 
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Scannez ce QR code pour partager votre profil
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={() => window.open(profileUrl, '_blank')}
          >
            Voir mon profil
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setProfileUrl('');
            }}
          >
            Modifier mon CV
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Créer mon CV
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Personal Information */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', {
                  required: 'Ce champ est requis',
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', {
                  required: 'Ce champ est requis',
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Ce champ est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email invalide',
                  },
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone', {
                  required: 'Ce champ est requis',
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titre professionnel
              </label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Développeur Full Stack"
                {...register('title', {
                  required: 'Ce champ est requis',
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Localisation
              </label>
              <input
                id="location"
                type="text"
                placeholder="Ex: Paris, France"
                {...register('location', {
                  required: 'Ce champ est requis',
                })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Résumé professionnel
            </label>
            <textarea
              id="summary"
              rows={4}
              {...register('summary', {
                required: 'Ce champ est requis',
              })}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.summary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            ></textarea>
            {errors.summary && (
              <p className="mt-1 text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Réseaux sociaux
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site web
              </label>
              <input
                id="website"
                type="url"
                placeholder="https://votre-site.com"
                {...register('website')}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn
              </label>
              <input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/votre-profil"
                {...register('linkedin')}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GitHub
              </label>
              <input
                id="github"
                type="url"
                placeholder="https://github.com/votre-profil"
                {...register('github')}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter
              </label>
              <input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/votre-profil"
                {...register('twitter')}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Compétences
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Ajouter une compétence"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="w-full sm:w-[180px]">
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <Button type="button" variant="secondary" onClick={addSkill}>
              Ajouter
            </Button>
          </div>
          
          <div className="space-y-2">
            {skills.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucune compétence ajoutée
              </p>
            )}
            
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                <div>
                  <span className="font-medium">{skill.name}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({renderSkillLevelLabel(skill.level)})
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Expérience professionnelle
            </h3>
            <Button type="button" variant="primary" onClick={addWorkExperience}>
              Ajouter une expérience
            </Button>
          </div>
          
          <div className="space-y-8">
            {workExperiences.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucune expérience ajoutée
              </p>
            )}
            
            {workExperiences.map((experience, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    Expérience {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Poste
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                      required={!experience.current}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-job-${index}`}
                      checked={experience.current}
                      onChange={(e) => updateWorkExperience(index, 'current', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`current-job-${index}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Emploi actuel
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={experience.description}
                    onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Formation
            </h3>
            <Button type="button" variant="primary" onClick={addEducation}>
              Ajouter une formation
            </Button>
          </div>
          
          <div className="space-y-8">
            {educations.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucune formation ajoutée
              </p>
            )}
            
            {educations.map((education, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    Formation {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Établissement
                    </label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Diplôme
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-education-${index}`}
                      checked={education.current}
                      onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`current-education-${index}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Formation en cours
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Domaine d&apos;études
                  </label>
                  <input
                    type="text"
                    value={education.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={education.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={education.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      disabled={education.current}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                      required={!education.current}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-education-${index}`}
                      checked={education.current}
                      onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`current-education-${index}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Formation en cours
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Langues
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Ajouter une langue"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="w-full sm:w-[180px]">
              <select
                value={newLanguageLevel}
                onChange={(e) => setNewLanguageLevel(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                <option value="Bilingue">Bilingue</option>
                <option value="Langue Maternelle">Langue Maternelle</option>
              </select>
            </div>

            <Button type="button" variant="secondary" onClick={addLanguage}>
              Ajouter
            </Button>
          </div>
          
          <div className="space-y-2">
            {languages.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucune langue ajoutée
              </p>
            )}
            
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                <div>
                  <span className="font-medium">{lang.language}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({lang.level})
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeLanguage(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-8"
            isLoading={isSubmitting}
          >
            Enregistrer mon CV
          </Button>
        </div>
      </form>
    </div>
  );
};
