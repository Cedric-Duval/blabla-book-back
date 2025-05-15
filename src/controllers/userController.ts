import type { Request, Response } from 'express';
import { checkConfirmPassword, checkFoundUser } from '../errors/checkErros';
import { User } from '../models/association.model';
import { Library } from '../models/association.model';
import { Book } from '../models/association.model';
import { LibraryBook } from '../models/association.model.js';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema';
import { checkPassword, hashPassword } from '../utils/authUtils';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const userController = {
  async getUserDatas(req: AuthenticatedRequest, res: Response) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const user = await User.findByPk(parsedData.id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Library,
        include: Book,
      },
    });

    checkFoundUser(user);

    res.status(200).json(user);
  },

  async updateUserDatas(req: AuthenticatedRequest, res: Response) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const updatedDatas = req.body;

    if (updatedDatas.name != null) {
      await userDatasUpdate.parseAsync(updatedDatas);
    }

    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    console.log(user);

    await checkPassword(updatedDatas.currentPassword, user.password);

    if (updatedDatas.newPassword) {
      checkConfirmPassword(
        updatedDatas.newPassword,
        updatedDatas.confirmPassword,
      );

      const hashedPassword = await hashPassword(updatedDatas.newPassword);
      updatedDatas.password = hashedPassword;
    }

    const currentUser = await user.update(updatedDatas);
    const { password, ...safeUser } = currentUser.get({ plain: true });

    res.status(200).json(safeUser);
  },

  async deleteUserDatas(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user?.id });

    const deleteData = req.body;

    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    const libraries = await Library.findAll({
      where: {
        user_id: parsedData.id,
      },
    });

    await checkPassword(deleteData.currentPassword, user.password);
    checkConfirmPassword(
      deleteData.currentPassword,
      deleteData.confirmPassword,
    );

    for (const library of libraries) {
      await LibraryBook.destroy({ where: { library_id: library.id } });
      await library.destroy();
    }

    //await Promise.all(libraries.map(library => library.destroy())); => Suppression en parallèle

    await user?.destroy();

    res.status(200).json({
      message:
        "Votre compte a bien été supprimé. Merci d'avoir utilisé Blabla Book",
    });
  },
};
