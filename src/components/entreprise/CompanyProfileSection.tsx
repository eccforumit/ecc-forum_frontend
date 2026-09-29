'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { FiEdit2, FiSave, FiX, FiAlertTriangle } from 'react-icons/fi';
import { useToast } from '@/components/ui/Toaster';
import { QRCodeClient } from '@/components/ui/QRCodeClient';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanyProfile } from '@/hooks/useApi';
import { SectionLoader } from '@/components/ui/LoadingSpinner';

type CompanyDataType = {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
};

type CompanyProfileSectionProps = {
  companyData?: CompanyDataType;
};

export const CompanyProfileSection = ({ companyData: initialData }: CompanyProfileSectionProps) => {
  const { user } = useAuth();
  const { company: fetchedCompany, mutate, isLoading, isError } = useCompanyProfile();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData || {} as CompanyDataType);
  const [showQR, setShowQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
    // Update local state when API data is fetched
  // Using useEffect to update state when data changes
  useEffect(() => {
    if (fetchedCompany) {
      setFormData(fetchedCompany);
    } else if (initialData) {
      setFormData(initialData);
    }
  }, [fetchedCompany, initialData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/company/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Une erreur est survenue lors de la mise à jour');
      }
      
      // Update cache and state
      mutate();
      
      toast({
        title: 'Mise à jour réussie',
        description: 'Vos informations ont été mises à jour avec succès.',
        variant: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      // console.error removed for production
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setFormData(initialData || {} as CompanyDataType);
    setIsEditing(false);
  };

  const handleGenerateQR = () => {
    setShowQR(true);
  };
  if (isLoading) {
    return <SectionLoader />;
  }
  
  // Show error state
  if (isError) {
    return (
      <div className="p-6 mb-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
        <div className="flex items-center">
          <FiAlertTriangle className="w-6 h-6 mr-3 text-red-500" />
          <div>
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300">
              Erreur de chargement
            </h3>
            <p className="mt-1 text-red-700 dark:text-red-300">
              Impossible de charger le profil de l&apos;entreprise. Veuillez réessayer plus tard.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profil de l&apos;entreprise</h2>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FiEdit2 size={18} /> Modifier
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiX size={18} /> Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              variant="primary"
              className="flex items-center gap-2"
              isLoading={isSubmitting}
            >
              <FiSave size={18} /> Enregistrer
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            {formData.logo ? (
              <div className="relative w-48 h-48 mb-4">
                <Image 
                  src={formData.logo} 
                  alt={formData.name} 
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 h-48 w-48 flex items-center justify-center rounded-lg mb-4">
                <span className="text-gray-500 dark:text-gray-400">Aucun logo</span>
              </div>
            )}
            <Button type="button" variant="outline">Télécharger un logo</Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom de l&apos;entreprise</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Site web</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Secteur d&apos;activité</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Taille de l&apos;entreprise</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              >
                <option value="1-10">1-10 employés</option>
                <option value="11-50">11-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-500">201-500 employés</option>
                <option value="501-1000">501-1000 employés</option>
                <option value="1001+">1001+ employés</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Adresse</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email de contact</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone de contact</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description de l&apos;entreprise</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <Image 
                src={formData.logo || '/images/placeholder-logo.png'} 
                alt={formData.name}
                layout="fill"
                objectFit="contain" 
                className="rounded-lg"
              />
            </div>
            <Button 
              onClick={handleGenerateQR}
              variant="outline"
              className="mt-2"
            >
              Générer QR Code
            </Button>
            
            {showQR && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-white border rounded-lg shadow-lg"
              >
                <QRCodeClient 
                  value={`https://forum-ecc.ma/entreprise/${formData.id}`} 
                  size={180} 
                  level="H"
                />
                <p className="text-xs text-center mt-2 text-gray-500">Partagez ce QR Code pour votre stand</p>
              </motion.div>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{formData.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{formData.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Secteur d&apos;activité</h4>
                <p>{formData.industry}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Taille</h4>
                <p>{formData.size}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Site web</h4>
                <a 
                  href={formData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {formData.website}
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse</h4>
                <p>{formData.location}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                <a href={`mailto:${formData.contactEmail}`} className="text-primary hover:underline">
                  {formData.contactEmail}
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</h4>
                <a href={`tel:${formData.contactPhone}`} className="text-primary hover:underline">
                  {formData.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
