'use client';

import { StudentProfile } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

class StudentService {
  private getAuthHeaders(includeJson = true): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    if (includeJson) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  }

  async getMyProfile(): Promise<StudentProfile> {
    const response = await fetch(`${API_BASE_URL}/me/profile`, {
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<{ data: StudentProfile }>(response);
    if (result.data) {
      return result.data;
    }
    throw new Error('Profil non trouvé');
  }

  async updateMyProfile(data: Partial<StudentProfile> | FormData): Promise<StudentProfile> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetch(`${API_BASE_URL}/me/profile`, {
      method: 'POST',
      headers: this.getAuthHeaders(!isFormData),
      body: isFormData ? data : JSON.stringify(data)
    });

    const result = await this.handleResponse<{ data: StudentProfile }>(response);
    if (result.data) {
      return result.data;
    }
    throw new Error('Échec de la mise à jour du profil');
  }

  async getStudentProfile(id: string): Promise<StudentProfile> {
    const response = await fetch(`${API_BASE_URL}/profiles/student/${id}`, {
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<{ data: StudentProfile }>(response);
    if (result.data) {
      return result.data;
    }
    throw new Error('Profil étudiant non trouvé');
  }

  async updateStudentProfile(id: string, data: Partial<StudentProfile> | FormData): Promise<StudentProfile> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetch(`${API_BASE_URL}/profiles/student/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(!isFormData),
      body: isFormData ? data : JSON.stringify(data)
    });

    const result = await this.handleResponse<{ data: StudentProfile }>(response);
    if (result.data) {
      return result.data;
    }
    throw new Error('Échec de la mise à jour du profil');
  }

  async uploadCV(payload: FormData | Record<string, unknown>): Promise<{ data: unknown }> {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/cv`, {
      method: 'POST',
      headers: this.getAuthHeaders(!isFormData),
      body: isFormData ? payload : JSON.stringify(payload)
    });

    return this.handleResponse<{ data: unknown }>(response);
  }

  async getAllStudents(): Promise<StudentProfile[]> {
    const response = await fetch(`${API_BASE_URL}/cv`, {
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<{ data: { student_profile?: StudentProfile }[] }>(response);
    return Array.isArray(result.data)
      ? result.data
          .map((item) => item.student_profile)
          .filter((profile): profile is StudentProfile => Boolean(profile))
      : [];
  }
}

export const studentService = new StudentService();