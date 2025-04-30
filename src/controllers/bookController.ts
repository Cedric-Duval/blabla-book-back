import { Sequelize } from 'sequelize';
import { ZodError } from 'zod';
import { Book } from '../models/association.model.js';
import { paramsIdSchema } from '../schemas/paramsId.schema.js';

export const bookController = {
  async getFiveRandomBooks(req, res) {
    try {
      const randomBooks = await Book.findAll({
        order: Sequelize.literal('RANDOM()'), //  Randomize order
        limit: 5,
      });
      console.log(JSON.stringify(randomBooks, null, 2));
      res.status(200).json(randomBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async getAllBooks(req, res) {
    try {
      const allBooks = await Book.findAll({
        order: [['publication_year', 'DESC']],
      });
      console.log(JSON.stringify(allBooks, null, 2));
      res.status(200).json(allBooks);
    } catch (error) {
      console.log(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async getOneBookById(req, res) {
    try {
      const parsedData = paramsIdSchema.parse(req.params);
      const oneBook = await Book.findByPk(parsedData.id);

      if (!oneBook) {
        return res.status(404).json({ error: 'Livre introuvable' });
      }

      res.status(200).json(oneBook);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Format d'url invalide" });
      }
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
