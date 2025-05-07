import { Sequelize } from 'sequelize';
import { ZodError } from 'zod';
import { NotFoundError } from '../errors/customErrors.js';
import { Book } from '../models/association.model.js';
import { paramsIdSchema } from '../schemas/params.schema.js';

export const bookController = {
  async getFiveRandomBooks(req, res) {
    const randomBooks = await Book.findAll({
      order: Sequelize.literal('RANDOM()'), //  Randomize order
      limit: 5,
    });
    res.status(200).json(randomBooks);
  },

  async getAllBooks(req, res) {
    const allBooks = await Book.findAll({
      order: [['publication_year', 'DESC']],
    });
    console.log(JSON.stringify(allBooks, null, 2));
    res.status(200).json(allBooks);
  },

  async getOneBookById(req, res) {
    const parsedData = paramsIdSchema.parse(req.params);
    const oneBook = await Book.findByPk(parsedData.id);

    if (!oneBook) {
      throw new NotFoundError('Livre introuvable', 'URL');
    }

    res.status(200).json(oneBook);
  },
};
