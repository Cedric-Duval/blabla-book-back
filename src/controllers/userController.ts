import { Sequelize } from 'sequelize';
import { ZodError } from 'zod';
import { User } from '../models/association.model.js';
import { userDatasUpdate } from '../schemas/user.schema.js';

export const userController = {
  async getUserDatas(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        return res.status(404).json('Utilisateur non trouvé');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async updateUserDatas(req, res) {
    try {
      const id = req.user.id; // Get the user_id through JWT auth middleware (not done yet)
      const updatedDatas = req.body;
      await userDatasUpdate.parseAsync(updatedDatas);
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json('Utilisateur non trouvé');
      }
      await user.update(updatedDatas);
      res.status(200).json('Informations mises à jour avec succès');
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json('Format des données non valide');
      }
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
