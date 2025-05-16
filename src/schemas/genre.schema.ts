import { z } from 'zod';

export const genresSchema = z.object({
  genre1: z
    .string()
    .regex(/^[1-9]\d*$/, { message: 'Format de numéro invalide' })
    .transform(Number),
  genre2: z
    .string()
    .regex(/^[1-9]\d*$/, { message: 'Format de numéro invalide' })
    .transform(Number)
    .optional(),
});
