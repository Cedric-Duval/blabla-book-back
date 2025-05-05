import { ZodError } from 'zod';
import { z } from 'zod';
import { Book, Library, LibraryBook } from '../models/association.model.js';
import {
  bookAndLibrarySchema,
  libraryCreateSchema,
  libraryUpdateSchema,
} from '../schemas/library.schema.js';
import { paramsIdSchema } from '../schemas/paramsId.schema.js';

export const libraryController = {
  //Get all the libraries from the user
  async getLibrariesWithoutBooksByUserId(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params); // Get the user_id through JWT auth middleware (not done yet), req.user.id
      const userLibraries = await Library.findAll({
        where: { user_id: parsedData.id },
      });

      console.log(userLibraries);
      if (!userLibraries[0]) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }

      res.status(200).json(userLibraries);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  //Get all the libraries from the user
  async getLibrariesWithBooksByUserId(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params); // Get the user_id through JWT auth middleware (not done yet), req.user.id
      const userLibraries = await Library.findAll({
        where: { user_id: parsedData.id },
        include: {
          model: Book,
        },
      });

      if (!userLibraries[0]) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }

      res.status(200).json(userLibraries);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  //Get a single library from its ID
  async getLibraryById(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params);
      const userLibrary = await Library.findByPk(parsedData.id, {
        include: {
          model: Book,
        },
      });

      if (!userLibrary) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }

      console.log(JSON.stringify(userLibrary, null, 2));
      res.status(200).json(userLibrary);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async createNewLibrary(req, res) {
    try {
      const inputData = req.body;
      inputData.user_id = req.user?.id || 1; // Get the user_id through JWT auth middleware (not done yet)
      await libraryCreateSchema.parseAsync(inputData);
      const newLibrary = await Library.create(inputData);
      res.status(201).json(newLibrary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        return res.status(400).json({ errors: zodErrors });
      }

      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async updateLibraryName(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params);
      const inputData = req.body;
      await libraryUpdateSchema.parseAsync(inputData);
      const userLibrary = await Library.findByPk(parsedData.id);

      if (!userLibrary) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }

      await userLibrary.update(inputData);
      res.status(200).json(userLibrary);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json('Format des données non valide');
      }
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async deleteLibrary(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params);
      const userLibrary = await Library.findByPk(parsedData.id);

      if (!userLibrary) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }
      //Check if the user is the owner of the library ?

      await LibraryBook.destroy({ where: { library_id: parsedData.id } });
      await userLibrary.destroy();

      res.status(200).json('Bibliothèque supprimée avec succès');
    } catch (error) {
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async addBookToLibrary(req, res) {
    try {
      const parsedData = bookAndLibrarySchema.parse(req.params);

      const currentLibrary = await Library.findOne({
        where: {
          id: parsedData.libraryId,
        },
        include: {
          model: Book,
        },
      });

      if (!currentLibrary) {
        return res
          .status(404)
          .json({ error: "Bibliothèque d'utilisateur introuvable" });
      }

      const existingBook = currentLibrary.Books.find(
        (book) => book.id === parsedData.bookId,
      );

      if (existingBook) {
        return res
          .status(404)
          .json({ error: 'Le livre est déjà présent dans la bibliothèque' });
      }

      await LibraryBook.create({
        library_id: parsedData.libraryId,
        book_id: parsedData.bookId,
        read: false,
      });

      const newLibrary = await Library.findOne({
        where: {
          id: parsedData.libraryId,
        },
        include: {
          model: Book,
        },
      });

      res.status(200).json(newLibrary);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async editBookStatus(req, res) {
    try {
      const parsedData = bookAndLibrarySchema.parse(req.params);

      const currentLibraryBook = await LibraryBook.findOne({
        where: {
          library_id: parsedData.libraryId,
          book_id: parsedData.bookId,
        },
      });

      if (!currentLibraryBook) {
        return res
          .status(404)
          .json({ error: 'Relation bibliothèque/livre non trouvée' });
      }

      await currentLibraryBook.update({
        read: !currentLibraryBook.read,
      });

      const currentLibrary = await Library.findOne({
        where: {
          id: parsedData.libraryId,
        },
        include: {
          model: Book,
        },
      });

      res.status(200).json(currentLibrary);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async deleteBook(req, res) {
    try {
      const parsedData = bookAndLibrarySchema.parse(req.params);

      //Check if the user is the owner of the library ?
      //And check if this is an existing association ?

      await LibraryBook.destroy({
        where: {
          library_id: parsedData.libraryId,
          book_id: parsedData.bookId,
        },
      });
      res
        .status(200)
        .json({ message: 'Livre correctement supprimé de la bibliothèque' });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
