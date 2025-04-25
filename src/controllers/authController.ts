import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/association.model.js';

export const authController = {
  async register(req, res) {
    try {
      const { name, firstname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        firstname: firstname,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur inconnu' });
    }

    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.status(200).json({ token, user });
  },
};
