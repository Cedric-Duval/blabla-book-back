import { z } from 'zod';

export const userDatasUpdate = z
  .object({
    name: z.string().max(100).nonempty({ message: 'Le nom est requis' }),
    firstname: z
      .string()
      .max(100)
      .nonempty({ message: 'Le prénom est requis' }),
    email: z.string().max(100).nonempty({ message: "L'email est requis" }),
    password: z.string().nonempty({ message: 'Le mot de passe est requis' }),
  })
  .partial();

export const userIdSchema = z.object({
  id: z
    .number({ message: "L'identifiant de l'utilisateur est incorrect" })
    .int({ message: "L'identifiant de l'utilisateur est incorrect" }),
});
