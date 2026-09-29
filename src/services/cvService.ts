import { api } from '@/lib/api';

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
const backendBase = apiBase.replace(/\/api$/, '');

export interface StudentCV {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string | null;
  title?: string | null;
  summary?: string | null;
  school?: string | null;
  schoolYear?: string | null;
  major?: string | null;
  profileImageUrl?: string | null;
  profileUrl?: string | null;
  qrCodeUrl?: string | null;
  skills: { name: string; level: string }[];
  createdAt: string;
}

export interface CVSearchFilters {
  keyword?: string;
  school?: string;
  major?: string;
  skill?: string;
  perPage?: number;
}

export interface CVSearchResponse {
  cvs: StudentCV[];
  total: number;
  page: number;
  pages: number;
}

const mapCv = (item: Record<string, unknown>): StudentCV => {
  const studentProfile = (item.student_profile as Record<string, unknown> | undefined) ?? {};
  const firstName = typeof item.first_name === 'string' ? item.first_name : '';
  const lastName = typeof item.last_name === 'string' ? item.last_name : '';
  const title = typeof item.title === 'string' ? item.title : undefined;
  const fullName = `${firstName} ${lastName}`.trim() || title || 'Profil étudiant';
  const email = typeof item.email === 'string' ? item.email : '';
  const phone = typeof item.phone === 'string' ? item.phone : null;
  const summary = typeof item.summary === 'string' ? item.summary : null;
  const skills = Array.isArray(item.skills) ? item.skills.filter((skill): skill is { name: string; level: string } => typeof skill === 'object' && skill !== null && 'name' in skill && 'level' in skill) : [];
  const profileSlug = typeof item.profile_slug === 'string' ? item.profile_slug : String(item.id ?? fullName);
  const profilePath = typeof item.profile_url === 'string' ? item.profile_url : undefined;
  const qrCodePath = typeof item.qr_code_url === 'string' ? item.qr_code_url : undefined;
  const createdAt = typeof item.created_at === 'string' ? item.created_at : new Date().toISOString();
  const school = typeof studentProfile.school === 'string' ? studentProfile.school : null;
  const schoolYear = typeof studentProfile.school_year === 'string' ? studentProfile.school_year : null;
  const major = typeof studentProfile.major === 'string' ? studentProfile.major : null;
  const profileImageUrl = typeof studentProfile.profile_image_url === 'string' ? studentProfile.profile_image_url : null;
  const profileUrl = profilePath ? `${backendBase}${profilePath}` : undefined;
  return {
    id: profileSlug,
    firstName,
    lastName,
    name: fullName,
    email,
    phone,
    title: title ?? null,
    summary,
    school,
    schoolYear,
    major,
    profileImageUrl,
    profileUrl,
    qrCodeUrl: qrCodePath ? `${backendBase}${qrCodePath}` : null,
    skills,
    createdAt,
  };
};

export const cvService = {
  searchCVs: async (filters?: CVSearchFilters, page: number = 1): Promise<CVSearchResponse> => {
    const params: Record<string, string | number> = { page };
    if (filters?.keyword) params.keyword = filters.keyword;
    if (filters?.school) params.school = filters.school;
    if (filters?.major) params.major = filters.major;
    if (filters?.skill) params.skill = filters.skill;
    if (filters?.perPage) params.per_page = filters.perPage;

    const response = await api.get('/cv', { params });
    const payload = response.data ?? {};
    const items = Array.isArray(payload.data) ? payload.data.map(mapCv) : [];
    const meta = payload.meta ?? {};
    return {
      cvs: items,
      total: meta.total ?? items.length,
      page: meta.current_page ?? page,
      pages: meta.last_page ?? 1,
    };
  },

  downloadCV: async (slug: string): Promise<string> => {
    const response = await api.get(`/cv/${slug}`);
    const item = response.data?.data;
    if (!item) {
      throw new Error('CV introuvable');
    }
    const profileUrl = item.profile_url ? `${backendBase}${item.profile_url}` : undefined;
    if (!profileUrl) {
      throw new Error('Aucun lien disponible pour ce CV');
    }
    return profileUrl;
  },

  getCVDetails: async (slug: string): Promise<StudentCV> => {
    const response = await api.get(`/cv/${slug}`);
    const item = response.data?.data;
    if (!item) {
      throw new Error('Impossible de charger les détails du CV');
    }
    return mapCv(item);
  },

  // CRUD Operations for CV
  createCV: async (cvData: {
    title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    location?: string;
    summary?: string;
    skills?: { name: string; level?: string }[];
    work_experiences?: { 
      title: string; 
      company: string; 
      location?: string;
      start_date: string; 
      end_date?: string; 
      is_current?: boolean;
      description?: string;
    }[];
    educations?: {
      degree: string;
      institution: string;
      location?: string;
      start_date: string;
      end_date?: string;
      is_current?: boolean;
      description?: string;
    }[];
    languages?: { name: string; level: string }[];
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  }): Promise<StudentCV> => {
    const response = await api.post('/cv', cvData);
    const item = response.data?.data;
    if (!item) {
      throw new Error('Erreur lors de la création du CV');
    }
    return mapCv(item);
  },

  updateCV: async (slug: string, cvData: Partial<{
    title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    location?: string;
    summary?: string;
    skills?: { name: string; level?: string }[];
    work_experiences?: { 
      title: string; 
      company: string; 
      location?: string;
      start_date: string; 
      end_date?: string; 
      is_current?: boolean;
      description?: string;
    }[];
    educations?: {
      degree: string;
      institution: string;
      location?: string;
      start_date: string;
      end_date?: string;
      is_current?: boolean;
      description?: string;
    }[];
    languages?: { name: string; level: string }[];
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  }>): Promise<StudentCV> => {
    const response = await api.patch(`/cv/${slug}`, cvData);
    const item = response.data?.data;
    if (!item) {
      throw new Error('Erreur lors de la mise à jour du CV');
    }
    return mapCv(item);
  },

  generateQRCode: (profileUrl: string): string => {
    const fullUrl = `${window.location.origin}${profileUrl}`;
    // Using QR-Server.com as a simple QR code generator
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullUrl)}`;
  },

  getMyCV: async (): Promise<StudentCV | null> => {
    try {
      const response = await cvService.searchCVs({}, 1);
      return response.cvs.length > 0 ? response.cvs[0] : null;
    } catch {
      return null;
    }
  },
};