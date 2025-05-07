import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const commonBookSchema = {
  isbn: z
    .string()
    .regex(/^[1-9]\d*$/)
    .max(100, { message: "L'ISBN est trop long" })
    .min(9, { message: "L'ISBN est requis" })
    .transform((data) => sanitizeHtml(data.trim())),
  title: z
    .string()
    .min(1, { message: 'Le titre est requis' })
    .transform((data) => sanitizeHtml(data)),
  author: z
    .string()
    .min(1, { message: "L'auteur est requis" })
    .transform((data) => sanitizeHtml(data)),
  summary: z
    .string()
    .min(1, { message: 'Le résumé est requis' })
    .transform((data) => sanitizeHtml(data)),
  image: z
    .string()
    .url({ message: "L'URL de l'image est invalide" })
    .transform((data) => sanitizeHtml(data.trim())),
  pages: z
    .number()
    .int()
    .positive()
    .min(1, { message: 'Le nombre de pages est requis' }),
  editor: z
    .string()
    .max(100, { message: "L'éditeur est trop long" })
    .min(1, { message: "L'éditeur est requis" })
    .transform((data) => sanitizeHtml(data)),
  publication_year: z
    .number()
    .int()
    .min(1, { message: 'La date est requise' })
    .max(new Date().getFullYear(), {
      message: "La date ne peut être supérieur à l'année en cours",
    }),
};

export const createBookSchema = z.object(commonBookSchema);

export const editBookSchema = z.object(commonBookSchema).partial();
