import { checkExistingBook, checkFoundBook } from '../errors/checkErros';
import { Book, LibraryBook } from '../models/association.model';
import { createBookSchema, editBookSchema } from '../schemas/book.schema';
import { paramsIdSchema } from '../schemas/params.schema';

export const adminController = {
  async createBook(req, res) {
    const parsedData = createBookSchema.parse(req.body);
    const existingBook = await Book.findOne({
      where: { isbn: parsedData.isbn },
    });

    checkExistingBook(existingBook);

    const newBook = await Book.create(parsedData);
    res.status(201).json(newBook);
  },

  async editBook(req, res) {
    const parsedParams = paramsIdSchema.parse(req.params);
    const parsedData = editBookSchema.parse(req.body);
    const currentBook = await Book.findByPk(parsedParams.id);

    checkFoundBook(currentBook);

    await currentBook?.update(parsedData);
    res.status(200).json(currentBook);
  },

  async deleteBook(req, res) {
    const parsedParams = paramsIdSchema.parse(req.params);
    const currentBook = await Book.findByPk(parsedParams.id);

    checkFoundBook(currentBook);

    await LibraryBook.destroy({ where: { book_id: parsedParams.id } });
    await Book.destroy({
      where: {
        id: parsedParams.id,
      },
    });

    res.status(200).json({ message: 'Livre correctement supprimé' });
  },
};
