import bcrypt from 'bcrypt';
import { z } from 'zod';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { User } from '../models/association.model.js';
import { createUser, loginUser } from '../schemas/auth.schema.js';
import { checkPassword, createToken } from '../utils/authUtils.js';

export const authController = {
  async register(req, res) {
    try {
      const parsedData = createUser.parse(req.body);

      const existingUser = await User.findOne({
        where: { email: parsedData.email },
      });

      if (existingUser) {
        return res.status(400).json({
          errors: [
            {
              field: 'email',
              message: 'Cette adresse mail est déjà utilisée',
            },
          ],
        });
      }

      const hashedPassword = await bcrypt.hash(parsedData.password, 10);
      const newUser = await User.create({
        name: parsedData.name,
        firstname: parsedData.firstname,
        email: parsedData.email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        return res.status(400).json({ errors: zodErrors });
      }

      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },

  async login(req, res) {
    const parsedData = loginUser.parse(req.body);

    const currentUser = await User.findOne({
      where: { email: parsedData.email },
    });

    if (!currentUser) {
      throw new BadRequestError('Adress mail invalide', 'email');
    }

    if (!(await checkPassword(parsedData.password, currentUser.password))) {
      throw new BadRequestError('Mot de passe invalide', 'password');
    }

    if (!process.env.JWT_SECRET) {
      throw new NotFoundError("JWT_SECRET n'est pas défini", 'environment');
    }

    const token = createToken(currentUser.id, currentUser.email);

    res.status(200).json({ token, currentUser });
  },
};
