import type { Response } from 'express';
import { checkExistingBook, checkFoundBook } from '../errors/checkErros';
import { UnauthorizedError } from '../errors/customErrors';
import { Book, LibraryBook, User } from '../models/association.model';
import { createBookSchema, editBookSchema } from '../schemas/book.schema';
import { paramsIdSchema } from '../schemas/params.schema';
import { userIdSchema } from '../schemas/user.schema';
import type { IAuthenticatedRequest } from '../types/authenticatedRequest';

export const adminController = {
  async createBook(req: IAuthenticatedRequest, res: Response) {
    const parsedUser = userIdSchema.parse({ id: req.user.id });

    const user = await User.findByPk(parsedUser.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user?.admin) {
      throw new UnauthorizedError('Role admin manquant', 'admin');
    }

    const parsedData = createBookSchema.parse(req.body);
    const existingBook = await Book.findOne({
      where: { isbn: parsedData.isbn },
    });

    checkExistingBook(existingBook);

    const newBook = await Book.create(parsedData);
    res.status(201).json(newBook);
  },

  async editBook(req: IAuthenticatedRequest, res: Response) {
    const parsedUser = userIdSchema.parse({ id: req.user.id });

    const user = await User.findByPk(parsedUser.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user?.admin) {
      throw new UnauthorizedError('Role admin manquant', 'admin');
    }

    const parsedParams = paramsIdSchema.parse(req.params);
    const parsedData = editBookSchema.parse(req.body);
    const currentBook = await Book.findByPk(parsedParams.id);

    checkFoundBook(currentBook);

    await currentBook?.update(parsedData);
    res.status(200).json(currentBook);
  },

  async deleteBook(req: IAuthenticatedRequest, res: Response) {
    const parsedUser = userIdSchema.parse({ id: req.user.id });

    const user = await User.findByPk(parsedUser.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user?.admin) {
      throw new UnauthorizedError('Role admin manquant', 'admin');
    }

    const parsedParams = paramsIdSchema.parse(req.params);
    const currentBook = await Book.findByPk(parsedParams.id);

    checkFoundBook(currentBook);

    await currentBook?.setGenres([]);
    await LibraryBook.destroy({ where: { book_id: parsedParams.id } });
    await Book.destroy({
      where: {
        id: parsedParams.id,
      },
    });

    res.status(200).json({ message: 'Livre correctement supprimé' });
  },
};
