import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { NotFoundError } from '../errors/customErrors.js';
import { User } from '../models/association.model.js';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema.js';

export const userController = {
  async getUserDatas(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const user = await User.findByPk(parsedData.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
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

    const currentUser = await user.update(updatedDatas);
    const { password, ...safeUser } = currentUser.get({ plain: true });

    res.status(200).json(safeUser);
  },
};
