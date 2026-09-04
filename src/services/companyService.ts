import { api } from '@/lib/api';
import { CompanyProfile, StudentProfile } from '@/types/auth';

type CompanyProfileUpdateInput = {
  company_name?: string;
  industry?: string;
  company_size?: string;
  company_description?: string;
  website?: string;
  address?: string;
  contact_first_name?: string;
  contact_last_name?: string;
  contact_phone?: string;
  logo?: File;
};

const toFormData = (payload: CompanyProfileUpdateInput): FormData => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (value instanceof File) {
      form.append(key, value);
    } else {
      form.append(key, String(value));
    }
  });
  return form;
};

const extractData = (data: unknown): CompanyProfile => {
  if (!data || typeof data !== 'object') {
    throw new Error('Réponse invalide du serveur');
  }
  const payload = (data as { data?: CompanyProfile }).data;
  if (!payload) {
    throw new Error('Profil entreprise introuvable');
  }
  return payload;
};

export interface CompanyStudentProfile extends StudentProfile {
  user_email: string;
  availability?: 'immediate' | 'one_month' | 'three_months' | 'six_months';
  skills?: string[];
  experience?: string[];
  languages?: { language: string; level: string }[];
  favorited?: boolean;
}

export interface StudentSearchFilters {
  search?: string;
  major?: string;
  school?: string;
  school_year?: string;
  skills?: string[];
  page?: number;
  per_page?: number;
  // When true, fetch all pages from the API and return a single aggregated list.
  fetch_all?: boolean;
  availability?: string;
}

export interface StudentSearchResponse {
  success: boolean;
  data: CompanyStudentProfile[];
  message?: string;
  pagination?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export const companyService = {
  async getCompanyProfile(profileId: string): Promise<CompanyProfile> {
    const response = await api.get(`/profiles/company/${profileId}`);
    return extractData(response.data);
  },

  async updateCompanyProfile(profileId: string, payload: CompanyProfileUpdateInput): Promise<CompanyProfile> {
    const hasFile = payload.logo instanceof File;
    const body = hasFile ? toFormData(payload) : payload;
    const headers = hasFile ? { 'Content-Type': 'multipart/form-data' } : undefined;
    const response = await api.post(`/profiles/company/${profileId}?_method=PUT`, body, { headers });
    return extractData(response.data);
  },

  async getStudentProfiles(filters?: StudentSearchFilters): Promise<CompanyStudentProfile[]> {
    const buildParams = (overrides?: { page?: number; per_page?: number }) => {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.major) params.append('major', filters.major);
      if (filters?.school) params.append('school', filters.school);
      if (filters?.school_year) params.append('school_year', filters.school_year);
      if (filters?.skills?.length) params.append('skills', filters.skills.join(','));
      if (filters?.availability) params.append('availability', filters.availability);
      if (overrides?.page) params.append('page', String(overrides.page));
      if (overrides?.per_page) params.append('per_page', String(overrides.per_page));
      return params;
    };

    // If caller asked to fetch all pages, iterate through the pagination and aggregate results
    if (filters?.fetch_all) {
      const aggregated: CompanyStudentProfile[] = [];
      const extractProfilesFrom = (d: unknown): CompanyStudentProfile[] => {
        if (Array.isArray(d)) return d as CompanyStudentProfile[];
        if (d && typeof d === 'object' && 'data' in d) {
          const nested = (d as { data?: unknown }).data;
          if (Array.isArray(nested)) return nested as CompanyStudentProfile[];
        }
        return [];
      };
      // First request to get pagination info
      const firstParams = buildParams({ page: filters.page || 1, per_page: filters.per_page });
      const firstUrl = `/company/students?${firstParams.toString()}`;
      const firstResponse = await api.get<StudentSearchResponse>(firstUrl);

      if (!firstResponse.data.success) {
        throw new Error(firstResponse.data.message || 'Erreur lors de la récupération des profils');
      }

      const firstData = firstResponse.data.data || [];
      aggregated.push(...extractProfilesFrom(firstData));

      const pagination = firstResponse.data.pagination;
      if (pagination && pagination.last_page && pagination.last_page > 1) {
        const lastPage = pagination.last_page;
        // Fetch remaining pages sequentially (could be parallelized if needed)
        for (let p = (filters.page || 1) + 1; p <= lastPage; p++) {
          const params = buildParams({ page: p, per_page: filters.per_page });
          const url = `/company/students?${params.toString()}`;
          const resp = await api.get<StudentSearchResponse>(url);
          if (resp.data.success) {
            const pageData = resp.data.data || [];
            aggregated.push(...extractProfilesFrom(pageData));
          }
        }
      }

      return aggregated.map((profile: CompanyStudentProfile) => ({
        ...profile,
        skills: profile.skills || [],
        experience: profile.experience || [],
        languages: profile.languages || [],
        favorited: profile.favorited || false,
        availability: profile.availability || 'three_months'
      }));
    }

    // Default: single page request (no aggregation)
    const params = buildParams({ page: filters?.page, per_page: filters?.per_page });
    const url = `/company/students?${params.toString()}`;
    const response = await api.get<StudentSearchResponse>(url);

    if (response.data.success) {
      const profilesData = response.data.data;
      const profiles: CompanyStudentProfile[] = Array.isArray(profilesData)
        ? profilesData
        : (profilesData as { data: CompanyStudentProfile[] }).data || [];

      return profiles.map((profile: CompanyStudentProfile) => ({
        ...profile,
        skills: profile.skills || [],
        experience: profile.experience || [],
        languages: profile.languages || [],
        favorited: profile.favorited || false,
        availability: profile.availability || 'three_months'
      }));
    } else {
      throw new Error(response.data.message || 'Erreur lors de la récupération des profils');
    }
  },



  async getStudentCV(studentId: number): Promise<Blob> {
    try {
      const response = await api.get(`/company/student/${studentId}/cv`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      // console.error removed for production
      throw error instanceof Error ? error : new Error('Erreur lors du téléchargement du CV');
    }
  },

  async toggleFavoriteStudent(studentId: number): Promise<boolean> {
    try {
      const response = await api.post<{ success: boolean }>(`/company/student/${studentId}/favorite`);
      return response.data.success;
    } catch (error) {
      // console.error removed for production
      throw error instanceof Error ? error : new Error('Erreur lors de la mise à jour des favoris');
    }
  },

  async getStudentDetails(studentId: number): Promise<CompanyStudentProfile> {
    try {
      const response = await api.get<{ success: boolean; data: CompanyStudentProfile }>(`/company/student/${studentId}`);
      
      if (response.data.success) {
        return {
          ...response.data.data,
          skills: response.data.data.skills || [],
          experience: response.data.data.experience || [],
          languages: response.data.data.languages || [],
        };
      } else {
        throw new Error('Erreur lors de la récupération du profil étudiant');
      }
    } catch (error) {
      // console.error removed for production
      throw error instanceof Error ? error : new Error('Erreur lors de la récupération du profil étudiant');
    }
  }
};
