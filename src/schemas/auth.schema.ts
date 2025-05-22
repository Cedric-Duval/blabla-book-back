import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const loginUser = z.object({
  email: z
    .string()
    .email({ message: 'Email invalide.' })
    .transform((data) => sanitizeHtml(data.trim())),
  password: z
    .string()
    .min(1, { message: 'Un mot de passe est requis.' })
    .transform((data) => sanitizeHtml(data.trim())),
});

export const createUser = z.object({
  name: z
    .string()
    .min(1, { message: 'Le nom est requis' })
    .max(100, { message: 'Le nom est trop long' })
    .transform((data) => sanitizeHtml(data)),
  firstname: z
    .string()
    .min(1, { message: 'Le prénom est requis' })
    .max(100, { message: 'Le prénom est trop long' })
    .transform((data) => sanitizeHtml(data)),
  email: z
    .string()
    .email({ message: 'Email invalide' })
    .transform((data) => sanitizeHtml(data.trim())),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/,
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.',
    )
    .transform((data) => sanitizeHtml(data.trim())),
});
