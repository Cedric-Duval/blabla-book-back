import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { checkFoundUser } from '../errors/checkErros';
import { UnauthorizedError } from '../errors/customErrors';
import { User } from '../models/association.model';

export const authMiddleware = {
  async authorization(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Token manquant', 'token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findByPk(decoded.id);

      checkFoundUser(user);

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedError('Token invalide', 'token');
    }
  },
};
