'use client';

import { 
  AuthResponse, 
  LoginCredentials, 
  StudentSignupFormData, 
  CompanySignupFormData,
  StudentRegistrationData,
  CompanyRegistrationData,
  User
} from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.sinamfor.com/api';

class AuthService {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      // Pour les erreurs de vérification email, on retourne les données directement
      if (response.status === 403 && data.email_verification_required) {
        return data as T;
      }
      
      throw new Error(JSON.stringify({
        success: false,
        message: data.message || 'Une erreur est survenue',
        errors: data.errors || {},
        email_verification_required: data.email_verification_required || false,
        user_email: data.user_email || ''
      }));
    }

    return data;
  }

  private transformStudentFormData(data: StudentSignupFormData): StudentRegistrationData | FormData {
    if (data.profileImage && data.profileImage instanceof FileList && data.profileImage.length > 0) {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirm_password', data.confirmPassword);
      formData.append('first_name', data.firstName);
      formData.append('last_name', data.lastName);
      formData.append('phone_number', data.phoneNumber || '');
      formData.append('school', data.school);
      formData.append('school_name', data.schoolName || '');
      formData.append('major', data.major);
      formData.append('school_year', data.schoolYear);
      formData.append('accept_terms', 'true');
      formData.append('profile_image', data.profileImage[0]);
      return formData;
    }

    return {
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber || '',
      school: data.school,
      school_name: data.schoolName || '',
      major: data.major,
      school_year: data.schoolYear,
      accept_terms: true
    };
  }

  private transformCompanyFormData(data: CompanySignupFormData): CompanyRegistrationData {
    return {
      email: data.contactEmail,
      password: data.password,
      confirm_password: data.confirmPassword,
      company_name: data.companyName,
      industry: data.industry,
      contact_first_name: data.contactFirstName,
      contact_last_name: data.contactLastName,
      contact_phone: data.contactPhone,
      website: data.website || '',
      company_size: data.companySize || '',
      company_description: data.companyDescription || '',
      accept_terms: true
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async signupStudent(data: StudentSignupFormData | FormData): Promise<AuthResponse> {
    let body: FormData | string;
    const headers: HeadersInit = {
      Accept: 'application/json'
    };

    if (data instanceof FormData) {
      // Si c'est déjà FormData, l'utiliser directement
      body = data;
      // Ne pas définir Content-Type pour FormData (le navigateur le fait automatiquement avec boundary)
    } else {
      const transformedData = this.transformStudentFormData(data);
      if (transformedData instanceof FormData) {
        body = transformedData;
        // Ne pas définir Content-Type pour FormData
      } else {
        body = JSON.stringify(transformedData);
        headers['Content-Type'] = 'application/json';
      }
    }

    const response = await fetch(`${API_BASE_URL}/auth/student/register`, {
      method: 'POST',
      headers,
      body
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async signupCompany(data: CompanySignupFormData): Promise<AuthResponse> {
    const transformedData = this.transformCompanyFormData(data);
    
    const response = await fetch(`${API_BASE_URL}/auth/company/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(transformedData)
    });

    return this.handleResponse<AuthResponse>(response);
  }

  async getCurrentUser(): Promise<{ success: boolean; user?: User; message?: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });

    return this.handleResponse<{ success: boolean; user?: User; message?: string }>(response);
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders()
        });

        const result = await this.handleResponse<{ success: boolean; message: string }>(response);
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          localStorage.removeItem('userEmail');
        }

        return result;
      } catch (error) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          localStorage.removeItem('userEmail');
        }
        throw error;
      }
    }

    return { success: true, message: 'Déconnexion locale effectuée' };
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  getUserType(): 'student' | 'company' | 'admin' | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userType') as 'student' | 'company' | 'admin' | null;
  }
}

export const authService = new AuthService();