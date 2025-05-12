import {
  checkExistingEmail,
  checkExistingUser,
  checkFoundSecret,
} from '../errors/checkErros';
import { User } from '../models/association.model';
import { createUser, loginUser } from '../schemas/auth.schema';
import { checkPassword, createToken, hashPassword } from '../utils/authUtils';

export const authController = {
  async register(req, res) {
    const parsedData = createUser.parse(req.body);

    const existingUser = await User.findOne({
      where: { email: parsedData.email },
    });

    checkExistingUser(existingUser);

    const hashedPassword = await hashPassword(parsedData.password);

    const newUser = await User.create({
      name: parsedData.name,
      firstname: parsedData.firstname,
      email: parsedData.email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  },

  async login(req, res) {
    const parsedData = loginUser.parse(req.body);

    const currentUser = await User.findOne({
      where: { email: parsedData.email },
    });

    checkExistingEmail(currentUser);
    await checkPassword(parsedData.password, currentUser?.password);
    checkFoundSecret(process.env.JWT_SECRET);

    const token = createToken(currentUser?.id, currentUser?.email);
    res.status(200).json({ token, currentUser });
  },
};
