import { z } from 'zod';

export const paramsIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, { message: "Format d'url invalide" })
    .transform(Number),
});
