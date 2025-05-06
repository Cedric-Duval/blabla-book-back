import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ errors: zodErrors });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erreur interne du serveur' });
};
