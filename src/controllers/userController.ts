import { checkConfirmPassword, checkFoundUser } from '../errors/checkErros';
import { User } from '../models/association.model';
import { Library } from '../models/association.model';
import { Book } from '../models/association.model';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema';
import { checkPassword, hashPassword } from '../utils/authUtils';

export const userController = {
  async getUserDatas(req, res) {
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

  async updateUserDatas(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user?.id });
    const updatedDatas = req.body;

    await userDatasUpdate.parseAsync(updatedDatas);

    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    if (updatedDatas.newPassword) {
      await checkPassword(updatedDatas.currentPassword, user.password);
      checkConfirmPassword(
        updatedDatas.newPassword,
        updatedDatas.confirmPassword,
      );

      const hashedPassword = await hashPassword(updatedDatas.newPassword);
      updatedDatas.password = hashedPassword;
    }

    const currentUser = await user.update(updatedDatas);
    const { password, ...safeUser } = currentUser.get({ plain: true });

    console.log(safeUser);
    res.status(200).json(safeUser);
  },
};
