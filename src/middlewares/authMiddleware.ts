import jwt from 'jsonwebtoken';
import { NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { User } from '../models/association.model.js';

export const authMiddleware = {
  async authorization(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Token manquant', 'token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
      }

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedError('Token invalide', 'token');
    }
  },
};
