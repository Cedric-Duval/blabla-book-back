import { Sequelize } from "sequelize";
import { Book, Library, LibraryBook, User } from '../models/association.model.js'
import { libraryCreateSchema, libraryUpdateSchema } from "../schemas/library.schema.js";
import { ZodError } from "zod";


export const libraryController = {


    //Get all the libraries from the user
    async getLibrariesByUserId(req, res) {
        try {
            const { id } = req.user.id; // Get the user_id through JWT auth middleware (not done yet)
            const userLibraries = await Library.findAll({
                where: { user_id: id }
            });
            console.log(JSON.stringify(userLibraries, null, 2));
            res.status(200).json(userLibraries);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

    //Get a single library from its ID
    async getLibraryById(req, res) {
        try {
            const { id } = req.params;
            const userLibrary = await Library.findByPk(id, {
                include: {
                    model: Book
                }
            });
            console.log(JSON.stringify(userLibrary, null, 2));
            res.status(200).json(userLibrary);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

    async createNewLibrary(req, res) {
        try {
            const inputData = req.body;
            inputData.user_id = req.user.id; // Get the user_id through JWT auth middleware (not done yet)
            await libraryCreateSchema.parseAsync(inputData);
            const newLibrary = await Library.create(inputData);
            res.status(201).json(newLibrary);
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json('Format des données non valide');
            }
            res.status(500).json('Erreur interne du serveur');
        }
    },

    async updateLibraryName(req, res) {
        try {
            const { id } = req.params;
            const inputData = req.body;
            await libraryUpdateSchema.parseAsync(inputData);
            const userLibrary = await Library.findByPk(id);
            if(!userLibrary) {
                return res.status(404).json('Bibliothèque non trouvée');
            }
            await userLibrary.update(inputData);
            res.status(200).json(userLibrary);
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json('Format des données non valide');
            }
            res.status(500).json('Erreur interne du serveur');
        }
    },

    async deleteLibrary(req, res) {
        try {
            const { id } = req.params;
            const userLibrary = await Library.findByPk(id);
            if(!userLibrary) {
                return res.status(404).json('Bibliothèque non trouvée');
            }
            //Check if the user is the owner of the library ?
            await userLibrary.destroy();
            res.status(200).json('Bibliothèque supprimée avec succès')
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
