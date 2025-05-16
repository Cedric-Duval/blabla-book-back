import type { Response } from 'express';
import { checkExistingBook, checkFoundBook } from '../errors/checkErros';
import { UnauthorizedError } from '../errors/customErrors';
import { Book, Genre, LibraryBook, User } from '../models/association.model';
import { createBookSchema, editBookSchema } from '../schemas/book.schema';
import { genresSchema } from '../schemas/genre.schema';
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

    const parsedGenres = genresSchema.parse({
      genre1: req.body.genre1,
      genre2: req.body.genre2,
    });

    const newBook = await Book.create(parsedData);

    console.log('-------test');
    console.log(newBook);
    console.log('-------test2');
    console.log(parsedGenres.genre1);

    if (parsedGenres.genre2 && parsedGenres.genre2 !== parsedGenres.genre1) {
      await newBook.setGenres([parsedGenres.genre1, parsedGenres.genre2]);
    } else {
      await newBook.setGenres([parsedGenres.genre1]);
    }

    const bookWithGenres = await Book.findByPk(newBook.id, {
      include: Genre,
    });

    console.log('-------test3');
    console.log(JSON.stringify(bookWithGenres, null, 2));

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
