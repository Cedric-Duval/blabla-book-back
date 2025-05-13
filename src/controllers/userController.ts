import { checkConfirmPassword, checkFoundUser } from '../errors/checkErros.js';
import { User } from '../models/association.model.js';
import { Library } from '../models/association.model.js';
import { Book } from '../models/association.model.js';
import { userDatasUpdate, userIdSchema } from '../schemas/user.schema.js';
import { checkPassword, hashPassword } from '../utils/authUtils.js';

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
  
    await userDatasUpdate.parseAsync(deleteData);
  
    const user = await User.findByPk(parsedData.id);
    checkFoundUser(user);

    await checkPassword(deleteData.currentPassword, user.password);
    checkConfirmPassword(deleteData.currentPassword, deleteData.confirmPassword);

    await user?.destroy();

    res.status(200).json({ message: 'Votre compte a bien été supprimé. Merci d\'avoir utilisé Blabla Book'});
  },



};

