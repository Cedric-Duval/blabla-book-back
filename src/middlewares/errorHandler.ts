import { ZodError } from 'zod';
import { AppError } from '../errors/customErrors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ errors: zodErrors });
  }

  if (err instanceof AppError) {
    const customErrors = [{ field: err.field, error: err.message }];
    return res.status(err.statusCode).json({ errors: customErrors });
  }

  console.error('Erreur inconnue :', err);
  return res.status(500).json({ error: 'Erreur interne du serveur' });
};
