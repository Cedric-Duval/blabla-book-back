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
