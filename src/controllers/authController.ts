import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/association.model.js';
import { createUser, loginUser } from '../schemas/auth.schema.js';

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
    try {
      const parsedData = loginUser.parse(req.body);

      const currentUser = await User.findOne({
        where: { email: parsedData.email },
      });

      if (!currentUser) {
        return res.status(400).json({
          errors: [
            {
              field: 'email',
              message: 'Aucun adresse mail correspondante.',
            },
          ],
        });
      }

      const validatedPassword = await bcrypt.compare(
        parsedData.password,
        currentUser.password,
      );

      if (!validatedPassword) {
        return res.status(400).json({
          errors: [
            {
              field: 'password',
              message: 'Mot de passe invalide.',
            },
          ],
        });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
      }

      const token = jwt.sign(
        { id: currentUser.id, email: currentUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      res.status(200).json({ token, currentUser });
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
};
