import { z } from 'zod';

export const createUser = z.object({
  name: z.string().min(1, { message: 'Le nom est requis.' }).max(100),
  firstname: z.string().min(1, { message: 'Le prénom est requis.' }).max(100),
  email: z.string().email({ message: 'Email invalide.' }),
  password: z.string().min(1, { message: 'Un mot de passe est requis.' }),
});
