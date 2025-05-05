import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const commonBookSchema = {
  isbn: z
    .string()
    .regex(/^[1-9]\d*$/)
    .max(100)
    .min(9, "L'ISBN est requis")
    .transform((data) => sanitizeHtml(data.trim())),
  title: z
    .string()
    .min(1, 'Le titre est requis')
    .transform((data) => sanitizeHtml(data)),
  author: z
    .string()
    .min(1, "L'auteur est requis")
    .transform((data) => sanitizeHtml(data)),
  summary: z
    .string()
    .min(1, 'Le résumé est requis')
    .transform((data) => sanitizeHtml(data)),
  image: z
    .string()
    .url("L'URL de l'image est invalide")
    .transform((data) => sanitizeHtml(data.trim())),
  pages: z.number().int().positive().min(1, 'Le nombre de pages est requis'),
  editor: z
    .string()
    .min(1, "L'éditeur est requis")
    .transform((data) => sanitizeHtml(data)),
  publication_year: z
    .number()
    .int()
    .min(1, 'La date est requise')
    .max(
      new Date().getFullYear(),
      "La date ne peut être supérieur à l'année en cours",
    ),
};

export const createBookSchema = z.object(commonBookSchema);

export const editBookSchema = z.object(commonBookSchema).partial();
