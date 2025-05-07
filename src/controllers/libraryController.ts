import {
  checkExistingBookinLibrary,
  checkFoundLibrary,
  checkRelationLibraryBook,
} from '../errors/checkErros.js';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { Book, Library, LibraryBook } from '../models/association.model.js';
import {
  addBookToLibrarySchema,
  bookAndLibrarySchema,
  libraryCreateSchema,
  libraryUpdateSchema,
} from '../schemas/library.schema.js';
import { paramsIdSchema } from '../schemas/params.schema.js';
import { userIdSchema } from '../schemas/user.schema.js';

export const libraryController = {
  //Get all the libraries from the user
  async getLibrariesWithoutBooksByUserId(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const userLibraries = await Library.findAll({
      where: { user_id: parsedData.id },
    });

    checkFoundLibrary(userLibraries[0]);

    res.status(200).json(userLibraries);
  },

  //Get all the libraries from the user
  async getLibrariesWithBooksByUserId(req, res) {
    const parsedData = userIdSchema.parse({ id: req.user.id });
    const userLibraries = await Library.findAll({
      where: { user_id: parsedData.id },
      include: {
        model: Book,
      },
    });

    checkFoundLibrary(userLibraries[0]);

    res.status(200).json(userLibraries);
  },

  //Get a single library from its ID
  async getLibraryById(req, res) {
    const parsedData = paramsIdSchema.parse(req.params);
    const userLibrary = await Library.findByPk(parsedData.id, {
      include: {
        model: Book,
      },
    });

    checkFoundLibrary(userLibrary);

    res.status(200).json(userLibrary);
  },

  async createNewLibrary(req, res) {
    const inputData = req.body;
    inputData.user_id = req.user?.id;

    await libraryCreateSchema.parseAsync(inputData);
    const newLibrary = await Library.create(inputData);
    res.status(201).json(newLibrary);
  },

  async updateLibraryName(req, res) {
    const parsedData = paramsIdSchema.parse(req.params);
    const inputData = req.body;
    await libraryUpdateSchema.parseAsync(inputData);
    const userLibrary = await Library.findByPk(parsedData.id);

    checkFoundLibrary(userLibrary);

    await userLibrary?.update(inputData);
    res.status(200).json(userLibrary);
  },

  async deleteLibrary(req, res) {
    const parsedData = paramsIdSchema.parse(req.params);
    const userLibrary = await Library.findByPk(parsedData.id);

    checkFoundLibrary(userLibrary);

    // TODO Check if the user is the owner of the library ?

    await LibraryBook.destroy({ where: { library_id: parsedData.id } });
    await userLibrary?.destroy();

    res.status(200).json({ message: 'Bibliothèque supprimée avec succès' });
  },

  async addBookToLibrary(req, res) {
    const parsedId = bookAndLibrarySchema.parse(req.params);
    const parsedData = addBookToLibrarySchema.parse(req.body);

    const currentLibrary = await Library.findOne({
      where: {
        id: parsedId.libraryId,
      },
      include: {
        model: Book,
      },
    });

    checkFoundLibrary(currentLibrary);

    const existingBook = currentLibrary.Books.find(
      (book) => book.id === parsedId.bookId,
    );

    checkExistingBookinLibrary(existingBook);

    await LibraryBook.create({
      library_id: parsedId.libraryId,
      book_id: parsedId.bookId,
      read: parsedData.read,
    });

    const newLibrary = await Library.findOne({
      where: {
        id: parsedId.libraryId,
      },
      include: {
        model: Book,
      },
    });

    res.status(200).json(newLibrary);
  },

  async editBookStatus(req, res) {
    const parsedId = userIdSchema.parse({ id: req.user.id });
    const parsedData = bookAndLibrarySchema.parse(req.params);

    const currentLibraryBook = await LibraryBook.findOne({
      where: {
        library_id: parsedData.libraryId,
        book_id: parsedData.bookId,
      },
    });

    checkRelationLibraryBook(currentLibraryBook);

    await currentLibraryBook?.update({
      read: !currentLibraryBook.read,
    });

    const currentLibrary = await Library.findAll({
      where: { user_id: parsedId.id },
      include: {
        model: Book,
      },
    });

    res.status(200).json(currentLibrary);
  },

  async deleteBook(req, res) {
    const parsedData = bookAndLibrarySchema.parse(req.params);
    const parsedId = userIdSchema.parse({ id: req.user.id });

    // TODO Check if the user is the owner of the library ?
    //TODO And check if this is an existing association ?

    await LibraryBook.destroy({
      where: {
        library_id: parsedData.libraryId,
        book_id: parsedData.bookId,
      },
    });

    const userLibraries = await Library.findAll({
      where: { user_id: parsedId.id },
      include: {
        model: Book,
      },
    });

    res.status(200).json(userLibraries);
  },
};
