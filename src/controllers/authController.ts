import bcrypt from 'bcrypt';
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

      const allUsers = await User.findAll();
      console.log(JSON.stringify(allUsers, null, 2));
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
