import * as yup from 'yup';

// Messages d'erreur en français
const VALIDATION_FR = {
  required: 'Ce champ est obligatoire',
  email: 'Veuillez saisir une adresse email valide',
  minLength: (min: number) => `Doit contenir au moins ${min} caractères`,
  maxLength: (max: number) => `Ne doit pas dépasser ${max} caractères`,
  passwordMatch: 'Les mots de passe ne correspondent pas',
  phoneNumber: 'Veuillez saisir un numéro de téléphone valide',
  url: 'Veuillez saisir une URL valide',
  numeric: 'Ce champ doit contenir uniquement des chiffres',
  postalCode: 'Veuillez saisir un code postal valide',
  invalidDate: 'Veuillez saisir une date valide',
  invalidName: 'Veuillez saisir un nom valide',
  acceptTerms: 'Vous devez accepter les conditions',
};

// Schéma de validation pour l'inscription d'un étudiant
export const studentSignupSchema = yup.object({
  firstName: yup.string()
    .required(VALIDATION_FR.required)
    .min(2, VALIDATION_FR.minLength(2))
    .max(50, VALIDATION_FR.maxLength(50)),
  lastName: yup.string()
    .required(VALIDATION_FR.required)
    .min(2, VALIDATION_FR.minLength(2))
    .max(50, VALIDATION_FR.maxLength(50)),
  email: yup.string()
    .required(VALIDATION_FR.required)
    .email(VALIDATION_FR.email),
  password: yup.string()
    .required(VALIDATION_FR.required)
    .min(8, VALIDATION_FR.minLength(8))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    ),
  confirmPassword: yup.string()
    .required(VALIDATION_FR.required)
    .oneOf([yup.ref('password')], VALIDATION_FR.passwordMatch),
  phoneNumber: yup.string()
    .matches(/^\+?[0-9]{7,15}$/, 'Numéro de téléphone invalide (7-15 chiffres)')
    .optional()
    .nullable(),
  school: yup.string()
    .required(VALIDATION_FR.required),
  schoolName: yup.string()
    .when('school', {
      is: 'other',
      then: (schema) => schema.required(VALIDATION_FR.required)
        .min(2, VALIDATION_FR.minLength(2))
        .max(50, VALIDATION_FR.maxLength(50)),
      otherwise: (schema) => schema.optional().nullable()
    }),
 schoolYear: yup.string()
    .required(VALIDATION_FR.required),
 major: yup.string()
     .required(VALIDATION_FR.required),
  profileImage: yup.mixed()
    .optional()
    .nullable()
    .test('fileSize', 'La taille de l\'image ne doit pas dépasser 2MB', (value: unknown) => {
      if (!value || !Array.isArray(value) || !value.length) return true; // Optional field
      const file = value[0] as File;
      return file.size <= 2 * 1024 * 1024; // 2MB in bytes
    })
    .test('fileType', 'Seuls les formats JPG, PNG et GIF sont acceptés', (value: unknown) => {
      if (!value || !Array.isArray(value) || !value.length) return true; // Optional field
      const file = value[0] as File;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type);
    }),
  acceptTerms: yup.boolean()
    .oneOf([true], VALIDATION_FR.acceptTerms)
    .required(VALIDATION_FR.acceptTerms),
});

// Schéma de validation pour l'inscription d'une entreprise
export const companySignupSchema = yup.object({
  companyName: yup.string()
    .required(VALIDATION_FR.required)
    .min(2, VALIDATION_FR.minLength(2))
    .max(100, VALIDATION_FR.maxLength(100)),
  industry: yup.string()
    .required(VALIDATION_FR.required),
  contactFirstName: yup.string()
    .required(VALIDATION_FR.required)
    .min(2, VALIDATION_FR.minLength(2))
    .max(50, VALIDATION_FR.maxLength(50)),
  contactLastName: yup.string()
    .required(VALIDATION_FR.required)
    .min(2, VALIDATION_FR.minLength(2))
    .max(50, VALIDATION_FR.maxLength(50)),
  contactEmail: yup.string()
    .required(VALIDATION_FR.required)
    .email(VALIDATION_FR.email),
  contactPhone: yup.string()
    .matches(/^\+?[0-9]{7,15}$/, 'Numéro de téléphone invalide (7-15 chiffres, ex: +33123456789, +1234567890)')
    .required(VALIDATION_FR.required),
  password: yup.string()
    .required(VALIDATION_FR.required)
    .min(8, VALIDATION_FR.minLength(8))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    ),
  confirmPassword: yup.string()
    .required(VALIDATION_FR.required)
    .oneOf([yup.ref('password')], VALIDATION_FR.passwordMatch),
  website: yup.string()
    .url(VALIDATION_FR.url)
    .nullable(),
  companySize: yup.string()
    .required(VALIDATION_FR.required),
  companyDescription: yup.string()
    .max(500, VALIDATION_FR.maxLength(500))
    .nullable(),
  acceptTerms: yup.boolean()
    .oneOf([true], VALIDATION_FR.acceptTerms)
    .required(VALIDATION_FR.acceptTerms),
});

// Schéma de validation pour la connexion
export const loginSchema = yup.object({
  email: yup.string()
    .required(VALIDATION_FR.required)
    .email(VALIDATION_FR.email),
  password: yup.string()
    .required(VALIDATION_FR.required),
  rememberMe: yup.boolean().optional(),
});

// Types basés sur les schémas
export type CompanySignupFormData = yup.InferType<typeof companySignupSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;