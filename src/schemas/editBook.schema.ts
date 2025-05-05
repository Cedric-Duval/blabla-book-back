import { z } from 'zod';

export const editBookSchema = z
  .object({
    isbn: z
      .string()
      .regex(/^[1-9]\d*$/)
      .min(9, "L'ISBN est requis")
      .max(13, "L'ISBN ne peut pas dépasser 13 chiffres"),
    title: z.string().min(1, 'Le titre est requis'),
    author: z.string().min(1, "L'auteur est requis"),
    summary: z.string().min(1, 'Le résumé est requis'),
    image: z.string().url("L'URL de l'image est invalide"),
    pages: z.number().int().positive().min(1, 'Le nombre de pages est requis'),
    editor: z.string().min(1, "L'éditeur est requis"),
    publication_year: z
      .number()
      .int()
      .min(1, 'La date est requise')
      .max(
        new Date().getFullYear(),
        "La date ne peut être supérieure à l'année en cours",
      ),
  })
  .partial();
