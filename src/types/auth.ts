export interface User {
  id: number;
  email: string;
  user_type: 'student' | 'company' | 'admin';
  is_email_verified: boolean;
  created_at: string;
  student_profile?: StudentProfile;
  company_profile?: CompanyProfile;
}

export interface StudentProfile {
  id: number;
  user_email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number?: string;
  profile_image?: string;
  profile_image_url?: string;
  school: string;
  school_name?: string;
  school_display: string;
  major: string;
  school_year: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  cv_file?: string;
  cv_file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfile {
  id: number;
  user_email: string;
  company_name: string;
  industry: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_full_name: string;
  contact_phone: string;
  website?: string;
  company_size?: string;
  company_description?: string;
  logo?: string;
  logo_url?: string;
  address?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  errors?: Record<string, string[]>;
  email_sent?: boolean;
  requires_verification?: boolean;
  email_verification_required?: boolean;
  user_email?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface StudentSignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string | null;
  profileImage?: unknown;
  school: string;
  schoolName?: string | null;
  major: string;
  schoolYear: string;
  acceptTerms: boolean;
}

export interface CompanySignupFormData {
  companyName: string;
  industry: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  password: string;
  confirmPassword: string;
  website?: string;
  companySize?: string;
  companyDescription?: string;
  acceptTerms: boolean;
}

export interface StudentRegistrationData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_image?: File;
  school: string;
  school_name?: string;
  major: string;
  school_year: string;
  accept_terms: boolean;
}

export interface CompanyRegistrationData {
  email: string;
  password: string;
  confirm_password: string;
  company_name: string;
  industry: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_phone: string;
  logo?: File;
  website?: string;
  company_size?: string;
  company_description?: string;
  accept_terms: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// CV Document Types
export interface CvDocument {
  id: number;
  student_profile_id: number;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: CvSkill[];
  work_experiences: WorkExperience[];
  educations: Education[];
  languages: Language[];
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  profile_slug: string;
  profile_url: string;
  qr_code_url?: string;
  created_at: string;
  updated_at: string;
  student_profile?: StudentProfile;
}

export interface CvSkill {
  name: string;
  level?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CvFormData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: CvSkill[];
  work_experiences: WorkExperience[];
  educations: Education[];
  languages: Language[];
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}