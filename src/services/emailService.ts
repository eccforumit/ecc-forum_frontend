import { api } from '@/lib/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Envoie un email de contact via l'API backend
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Augmenter le timeout pour cette requête spécifique (30 secondes)
    const response = await api.post('/contact/send', formData, {
      timeout: 30000,
    });
    
    if (response.data.success) {
      // console.log removed for production
      return true;
    }
    
    // console.error removed for production
    return false;
  } catch (error: unknown) {
    // console.error removed for production
    
    // Gestion des erreurs de validation
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { errors?: Record<string, string[]>; message?: string } } };
      
      if (axiosError.response?.status === 422) {
        const errors = axiosError.response.data?.errors;
        if (errors) {
          const errorMessages = Object.values(errors).flat().join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }
      }
      
      // Gestion des autres erreurs
      if (axiosError.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }
    }
    
    throw new Error('Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.');
  }
};

/**
 * Vérifie le statut du service de contact
 */
export const checkContactServiceStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get('/contact/status');
    return response.data.status === 'ok';
  } catch {
    return false;
  }
};

/**
 * Initialise le service de contact
 */
export const initializeContactService = async (): Promise<void> => {
  const isAvailable = await checkContactServiceStatus();
  
  if (isAvailable) {
    // console.log removed for production
  } else {
    // console.warn removed for production
  }
};