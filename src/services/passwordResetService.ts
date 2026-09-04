import { api } from '@/lib/api';

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  uid: string;
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export const passwordResetService = {
  /**
   * Demande de réinitialisation de mot de passe
   */
  requestReset: async (data: PasswordResetRequest): Promise<ApiResponse> => {
    try {
      const response = await api.post('/auth/password/forgot', data);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  /**
   * Confirmation de réinitialisation de mot de passe
   */
  confirmReset: async (data: PasswordResetConfirm): Promise<ApiResponse> => {
    try {
      const response = await api.post('/auth/password/reset', data);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },
};