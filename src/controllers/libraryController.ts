import { Sequelize } from 'sequelize';
import { Book, Library } from '../models/association.model.js';
import { LibraryBook } from '../models/library_book.model.js';

export const libaryController = {
  async getLibraryByUserId(req, res) {
    try {
      const user_id = req.params;
      const userLibrary = await Library.findByPk(user_id);
      console.log(JSON.stringify(userLibrary, null, 2));
      res.status(200).json(userLibrary);
    } catch (error) {
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async addBookToLibrary(req, res) {
    try {
      const { libraryId, bookId } = req.params;
      await LibraryBook.create({
        library_id: libraryId,
        book_id: bookId,
        read: false,
      });

      const newLibrary = await Library.findOne({
        where: {
          id: libraryId,
        },
        include: {
          model: Book,
        },
      });

      res.status(200).json(newLibrary);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async editBookStatus(req, res) {
    try {
      const { libraryId, bookId } = req.params;

      const currentLibraryBook = await LibraryBook.findOne({
        where: {
          library_id: libraryId,
          book_id: bookId,
        },
      });

      let bookStatus = currentLibraryBook.read;

      if (bookStatus) {
        bookStatus = false;
      } else {
        bookStatus = true;
      }

      await currentLibraryBook?.update({
        read: bookStatus,
      });

      const currentLibrary = await Library.findOne({
        where: {
          id: libraryId,
        },
        include: {
          model: Book,
        },
      });

      res.status(200).json(currentLibrary);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async deleteBook(req, res) {
    try {
      const { libraryId, bookId } = req.params;
      await LibraryBook.destroy({
        where: {
          library_id: libraryId,
          book_id: bookId,
        },
      });
      res
        .status(200)
        .json({ message: 'Livre correctement supprimé de la bibliothèque' });
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
