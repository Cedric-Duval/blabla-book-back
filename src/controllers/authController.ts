import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { User } from '../models/association.model.js';
import { createUser, loginUser } from '../schemas/auth.schema.js';
import {
  checkPassword,
  createToken,
  hashPassword,
} from '../utils/authUtils.js';

export const authController = {
  async register(req, res) {
    const parsedData = createUser.parse(req.body);

    const existingUser = await User.findOne({
      where: { email: parsedData.email },
    });

    if (existingUser) {
      throw new BadRequestError('Adresse mail déjà utilisée', 'email');
    }

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

    if (!currentUser) {
      throw new BadRequestError('Adresse mail invalide', 'email');
    }

    if (!(await checkPassword(parsedData.password, currentUser.password))) {
      throw new BadRequestError('Mot de passe invalide', 'password');
    }

    if (!process.env.JWT_SECRET) {
      throw new NotFoundError("JWT_SECRET n'est pas défini", 'environment');
    }

    const token = createToken(currentUser.id, currentUser.email);

    res.status(200).json({ token, currentUser });
  },
};
