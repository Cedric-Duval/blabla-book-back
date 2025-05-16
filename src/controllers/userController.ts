import type { Response } from 'express';
import { checkConfirmPassword, checkFoundUser } from '../errors/checkErros';
import { User } from '../models/association.model';
import { Library } from '../models/association.model';
import { Book } from '../models/association.model';
import { LibraryBook } from '../models/association.model.js';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema';
import type { IAuthenticatedRequest } from '../types/authenticatedRequest';
import { checkPassword, hashPassword } from '../utils/authUtils';

export const userController = {
  async getUserDatas(req: IAuthenticatedRequest, res: Response) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const user = await User.findByPk(parsedData.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Library,
          include: [Book],
        },
      ],
    });

    checkFoundUser(user);

    res.status(200).json(user);
  },

  async updateUserDatas(req: IAuthenticatedRequest, res: Response) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const updatedData = req.body;

    console.log(updatedData);

    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(([__, value]) => value != null)
    );

    if (filteredData.name != null) {
      await userDatasUpdate.parseAsync(filteredData);
    }
    
    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    await checkPassword(filteredData.currentPassword, user!.password);


    if (filteredData.newPassword) {
      checkConfirmPassword(
        filteredData.newPassword,
        filteredData.confirmPassword,
      );

      const hashedPassword = await hashPassword(filteredData.newPassword);
      filteredData.password = hashedPassword;
    }


    const currentUser = await user!.update(filteredData);
    const { password, ...safeUser } = currentUser.get({ plain: true });

    res.status(200).json(safeUser);
  },

  async deleteUserDatas(req: IAuthenticatedRequest, res: Response) {
    const parsedData = userIdSchema.parse({ id: req.user.id });

    const deleteData = req.body;

    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    const libraries = await Library.findAll({
      where: {
        user_id: parsedData.id,
      },
    });

    await checkPassword(deleteData.currentPassword, user!.password);
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
