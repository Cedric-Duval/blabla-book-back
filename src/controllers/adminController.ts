import { z } from 'zod';
import { ZodError } from 'zod';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { Book, LibraryBook } from '../models/association.model.js';
import { createBookSchema, editBookSchema } from '../schemas/book.schema.js';
import { paramsIdSchema } from '../schemas/params.schema.js';

export const adminController = {
  async createBook(req, res) {
    const parsedData = createBookSchema.parse(req.body);
    const existingBook = await Book.findOne({
      where: { isbn: parsedData.isbn },
    });

    if (existingBook) {
      throw new BadRequestError('ISBN déjà repertorié', 'isbn');
    }

    const newBook = await Book.create(parsedData);
    res.status(201).json(newBook);
  },

  async editBook(req, res) {
    const parsedParams = paramsIdSchema.parse(req.params);
    const parsedData = editBookSchema.parse(req.body);
    const currentBook = await Book.findByPk(parsedParams.id);

    if (!currentBook) {
      throw new NotFoundError('Livre introuvable', 'URL');
    }

    await currentBook.update(parsedData);
    res.status(200).json(currentBook);
  },

  async deleteBook(req, res) {
    const parsedParams = paramsIdSchema.parse(req.params);
    const currentBook = await Book.findByPk(parsedParams.id);

    if (!currentBook) {
      throw new NotFoundError('Livre introuvable', 'URL');
    }

    await LibraryBook.destroy({ where: { book_id: parsedParams.id } });
    await Book.destroy({
      where: {
        id: parsedParams.id,
      },
    });

    res.status(200).json({ message: 'Livre correctement supprimé' });
  },
};
