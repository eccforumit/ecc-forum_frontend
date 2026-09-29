'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FiCalendar, FiMapPin, FiPlus, FiEdit2, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOpportunities } from '@/hooks/useApi';
import { SectionLoader } from '@/components/ui/LoadingSpinner';

// Mock data for opportunities
const initialOpportunities: Opportunity[] = [];

type Opportunity = {
  id: string;
  title: string;
  type: 'stage' | 'emploi' | 'alternance';
  location: string;
  remote: boolean;
  duration?: string;
  description: string;
  requirements: string[];
  createdAt: Date;
  deadline: Date;
};

type OpportunityFormData = {
  title: string;
  type: 'stage' | 'emploi' | 'alternance';
  location: string;
  remote: boolean;
  duration?: string;
  description: string;
  requirements: string[];
  deadline?: string; // String for form input
};

export const OpportunitiesSection = () => {
  const { user } = useAuth();
  const companyId = user?.id?.toString();
  
  // Use our custom hook for data fetching
  const { 
    opportunities: fetchedOpportunities, 
    isLoading, 
    isError, 
    mutate 
  } = useOpportunities(companyId);
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOpportunityId, setEditingOpportunityId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
    // Update local state when data is fetched
  useEffect(() => {
    if (fetchedOpportunities) {
      const secured = fetchedOpportunities.map((o: Record<string, unknown>) => ({
        ...o,
        deadline: o.deadline ? new Date(o.deadline as string) : new Date(),
        requirements: Array.isArray(o.requirements) ? o.requirements : [],
      }));
      setOpportunities(secured);
    }
  }, [fetchedOpportunities]);

  
  const [formData, setFormData] = useState<Partial<OpportunityFormData>>({
    title: '',
    type: 'emploi',
    location: '',
    remote: false,
    duration: '',
    description: '',
    requirements: [''],
    deadline: undefined,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };
  
  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...(formData.requirements || [])];
    updatedRequirements[index] = value;
    setFormData({ ...formData, requirements: updatedRequirements });
  };
  
  const addRequirementField = () => {
    setFormData({ ...formData, requirements: [...(formData.requirements || []), ''] });
  };
  
  const removeRequirementField = (index: number) => {
    const updatedRequirements = [...(formData.requirements || [])];
    updatedRequirements.splice(index, 1);
    setFormData({ ...formData, requirements: updatedRequirements });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Convert form data to opportunity data with proper types
      const opportunityData = {
        ...formData,
        requirements: formData.requirements?.filter(r => r !== '') || [],
        deadline: formData.deadline ? new Date(formData.deadline) : new Date(),
      };

      if (editingOpportunityId) {
        // Update existing opportunity
        const response = await fetch(`/api/opportunities/${editingOpportunityId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(opportunityData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Une erreur est survenue lors de la mise à jour');
        }
        
        // Update local state and refetch data
        mutate();
          toast.success('L\'offre a été mise à jour avec succès.');
      } else {
        // Create new opportunity
        const response = await fetch('/api/opportunities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...opportunityData,
            companyId,
          }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Une erreur est survenue lors de la création');
        }
        
        // Add new opportunity to local state and refetch data
        setOpportunities([...opportunities, result.data]);
        mutate();
          toast.success('La nouvelle offre a été créée avec succès.');
      }
      
      resetForm();
    } catch (error) {
      // console.error removed for production
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      type: 'emploi',
      location: '',
      remote: false,
      duration: '',
      description: '',
      requirements: [''],
      deadline: undefined,
    });
    setShowAddForm(false);
    setEditingOpportunityId(null);
  };
  
  const handleEdit = (opportunity: Opportunity) => {
    setFormData({
      ...opportunity,
      deadline: opportunity.deadline ? opportunity.deadline.toISOString().split('T')[0] : '',
    });
    setEditingOpportunityId(opportunity.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      try {
        const response = await fetch(`/api/opportunities/${id}`, {
          method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Une erreur est survenue lors de la suppression');
        }
        
        // Update local state and refetch data
        setOpportunities(opportunities.filter(opp => opp.id !== id));
        mutate();

        toast.success('L\'offre a été supprimée avec succès.');

      } catch (error) {
        // console.error removed for production
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
      }
    }
  };
    return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Offres d&apos;emploi et stages</h2>
        {!showAddForm && !isLoading && (
          <Button 
            onClick={() => setShowAddForm(true)}
            variant="primary"
            leftIcon={<FiPlus size={18} />}
          >
            Ajouter une offre
          </Button>
        )}
      </div>
      
      {/* Error state */}
      {isError && (
        <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
          <div className="flex items-center">
            <FiAlertTriangle className="w-5 h-5 mr-3 text-red-500" />
            <p className="text-red-700 dark:text-red-300">
              Impossible de charger les offres. Veuillez réessayer plus tard.
            </p>
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && <SectionLoader />}
      
      {showAddForm ? (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingOpportunityId ? 'Modifier l\'offre' : 'Nouvelle offre'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre de l&apos;offre</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Type d&apos;offre</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  required
                >
                  <option value="emploi">Emploi</option>
                  <option value="stage">Stage</option>
                  <option value="alternance">Alternance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Lieu</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 h-full pt-6">
                <input
                  type="checkbox"
                  name="remote"
                  id="remote"
                  checked={formData.remote}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remote" className="text-sm font-medium">Possibilité de télétravail</label>
              </div>
              
              {(formData.type === 'stage' || formData.type === 'alternance') && (
                <div>
                  <label className="block text-sm font-medium mb-1">Durée</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Ex: 6 mois"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Date limite de candidature</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description du poste</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Prérequis et compétences</label>
              {formData.requirements?.map((requirement, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    placeholder="Ex: Maîtrise de React.js"
                  />
                  <Button
                      onClick={() => removeRequirementField(index)}
                      variant="ghost"
                      className="px-3 text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <FiTrash2 size={18} />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                onClick={addRequirementField}
                variant="outline"
                className="mt-2"
              >
                + Ajouter un prérequis
              </Button>
            </div>



            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                onClick={resetForm}
                variant="outline"
              >
                Annuler
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                {editingOpportunityId ? 'Mettre à jour' : 'Publier l\'offre'}
              </Button>
            </div>
          </form>
        </motion.div>
      ) : null}
      
      {opportunities.length > 0 ? (
        <div className="space-y-6">
          {opportunities.map((opportunity) => (
            <div 
              key={opportunity.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleEdit(opportunity)}
                    variant="outline"
                    className="p-2"
                  >
                    <FiEdit2 size={16} />
                  </Button>
                  <Button
                      onClick={() => handleDelete(opportunity.id)}
                      variant="ghost"
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <FiTrash2 size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 mb-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  opportunity.type === 'emploi' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                    : opportunity.type === 'stage'
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                }`}>
                  {opportunity.type === 'emploi' 
                    ? 'Emploi' 
                    : opportunity.type === 'stage' 
                    ? 'Stage' 
                    : 'Alternance'}
                </span>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  <FiMapPin className="mr-1" size={12} />
                  {opportunity.location}
                  {opportunity.remote && ' (télétravail possible)'}
                </span>
                
                {opportunity.duration && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    Durée: {opportunity.duration}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {opportunity.description}
              </p>
              
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Compétences requises:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                  {Array.isArray(opportunity.requirements) &&
                    opportunity.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FiCalendar className="mr-1" size={14} />
                <span>
                  Date limite: {opportunity.deadline 
                    ? new Date(opportunity.deadline).toLocaleDateString() 
                    : 'Non définie'}
                </span>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Vous n&apos;avez pas encore publié d&apos;offres d&apos;emploi ou de stage.</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            variant="outline"
            className="mt-4"
          >
            Créer ma première offre
          </Button>
        </div>
      )}
    </motion.section>
  );
};
