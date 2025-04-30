import { Sequelize } from 'sequelize';
import { z } from 'zod';
import { Book } from '../models/association.model.js';
import { createBookSchema } from '../schemas/createBook.schema.js';
import { editBookSchema } from '../schemas/editBook.schema.js';
import { paramsIdSchema } from '../schemas/paramsId.schema.js';

export const adminController = {
  async createBook(req, res) {
    try {
      const parsedData = createBookSchema.parse(req.body);
      console.log(parsedData);

      const existingBook = await Book.findOne({
        where: { isbn: parsedData.isbn },
      });

      if (existingBook) {
        return res.status(400).json({
          errors: [
            {
              field: 'isbn',
              message: 'Cet ISBN est déjà repertorié dans la base de données',
            },
          ],
        });
      }

      const newBook = await Book.create(parsedData);
      res.status(201).json(newBook);
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

  async editBook(req, res) {
    try {
      const parsedParams = paramsIdSchema.parse(req.params);
      const parsedData = editBookSchema.parse(req.body);

      const currentBook = await Book.findByPk(parsedParams.id);

      if (!currentBook) {
        return res.status(404).json({ error: 'Livre introuvable' });
      }

      await currentBook.update(parsedData);

      res.status(200).json(currentBook);
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

  async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await Book.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Livre correctement supprimé' });
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
