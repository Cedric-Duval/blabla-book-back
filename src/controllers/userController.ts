import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { NotFoundError } from '../errors/customErrors.js';
import { User } from '../models/association.model.js';
import { Library } from '../models/association.model.js';
import { Book } from '../models/association.model.js';

import { userDatasUpdate, userIdSchema } from '../schemas/user.schema.js';

export const userController = {
  async getUserDatas(req, res) {
    try {
      const parsedData = userIdSchema.parse({ id: req.user.id });
      const user = await User.findByPk(parsedData.id, {
        attributes: { exclude: ['password'] },
        include: {
          model: Library,
          include: Book
        }
      });

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }

    res.status(200).json(user);
  },

  async updateUserDatas(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user?.id });
    const updatedDatas = req.body;

    await userDatasUpdate.parseAsync(updatedDatas);


    if (updatedDatas.password) {
      const hashedPassword = await bcrypt.hash(updatedDatas.password, 10);
      updatedDatas.password = hashedPassword;
    }

    const user = await User.findByPk(parsedData.id);

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
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
  },
};