import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const libraryCreateSchema = z.object({
  name: z
    .string()
    .max(100, { message: 'Le nom est trop long' })
    .min(1, { message: 'Le nom est requis' })
    .transform((data) => sanitizeHtml(data)),
  user_id: z
    .number({ message: "L'identifiant de l'utilisateur est incorrect" })
    .int(),
});

export const libraryUpdateSchema = z.object({
  name: z
    .string()
    .max(100, { message: 'Le nom est trop long' })
    .min(1, { message: 'Le nom est requis' })
    .transform((data) => sanitizeHtml(data)),
});

export const bookAndLibrarySchema = z.object({
  libraryId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  bookId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
});

export const addBookToLibrarySchema = z.object({
  read: z.boolean(),
});

export const switchBookLibrarySchema = z.object({
  libraryId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  bookId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  newLibraryId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
});
