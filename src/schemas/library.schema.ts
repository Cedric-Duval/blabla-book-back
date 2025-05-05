import { z } from 'zod';

export const libraryCreateSchema = z.object({
  name: z.string().max(100).min(1, { message: 'Le nom est requis' }),
  user_id: z
    .number({ message: "L'identifiant de l'utilisateur est incorrect" })
    .int(),
});

export const libraryUpdateSchema = z.object({
  name: z.string().max(100).min(1, { message: 'Le nom est requis' }),
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
