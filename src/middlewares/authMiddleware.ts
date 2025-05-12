import jwt from 'jsonwebtoken';
import { checkFoundToken, checkFoundUser } from '../errors/checkErros';
import { NotFoundError, UnauthorizedError } from '../errors/customErrors';
import { User } from '../models/association.model';

export const authMiddleware = {
  async authorization(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    checkFoundToken(token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      checkFoundUser(user);

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedError('Token invalide', 'token');
    }
  },
};
