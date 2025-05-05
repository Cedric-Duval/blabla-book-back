import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const userDatasUpdate = z
  .object({
    name: z
      .string()
      .max(100, { message: 'Le nom est trop long' })
      .nonempty({ message: 'Le nom est requis' })
      .transform((data) => sanitizeHtml(data)),
    firstname: z
      .string()
      .max(100, { message: 'Le prénom est trop long' })
      .nonempty({ message: 'Le prénom est requis' })
      .transform((data) => sanitizeHtml(data)),
    email: z
      .string()
      .max(100, { message: "L'email est trop long" })
      .nonempty({ message: "L'email est requis" })
      .transform((data) => sanitizeHtml(data.trim())),
    password: z
      .string()
      .nonempty({ message: 'Le mot de passe est requis' })
      .transform((data) => sanitizeHtml(data.trim())),
  })
  .partial();

export const userIdSchema = z.object({
  id: z
    .number({ message: "L'identifiant de l'utilisateur est incorrect" })
    .int({ message: "L'identifiant de l'utilisateur est incorrect" }),
});
