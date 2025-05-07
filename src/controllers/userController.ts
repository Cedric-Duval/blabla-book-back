import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { User, Library, Book } from '../models/association.model.js';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema.js';

export const userController = {
  async getUserDatas(req, res) {
    try {
      const parsedData = userIdSchema.parse({ id: req.user?.id });
      const user = await User.findByPk(parsedData.id, {
        attributes: { exclude: ['password'] },
        include: {
          model: Library,
          include: Book
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },

  async updateUserDatas(req, res) {
    try {
      const parsedData = userIdSchema.parse({ id: req.user?.id || 1 }); // Get the user_id through JWT auth middleware (not done yet)
      const updatedDatas = req.body;

      console.log(updatedDatas);

      await userDatasUpdate.parseAsync(updatedDatas);

      if (updatedDatas.password) {
        const hashedPassword = await bcrypt.hash(updatedDatas.password, 10);
        updatedDatas.password = hashedPassword;
      }

      const user = await User.findByPk(parsedData.id);

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const isMatch = await bcrypt.compare(updatedDatas.currentPassword, user.dataValues.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe non valide'});
      }

      if (updatedDatas.newPassword !== updatedDatas.confirmPassword) {
        return res.status(400).json({ message: 'Les mots de passe ne sont pas identiques'});
      }

      const newHashPassword = await bcrypt.hash(updatedDatas.newPassword, 10);

      const newUpdatedDatas = {
        name: updatedDatas.name,
        firstname: updatedDatas.firstname,
        email: updatedDatas.email,
        password: newHashPassword
      }

      const currentUser = await user.update(newUpdatedDatas);
      const { password, ...safeUser } = currentUser.get({ plain: true });

      res.status(200).json(safeUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Format des données non valide' });
      }
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },
};