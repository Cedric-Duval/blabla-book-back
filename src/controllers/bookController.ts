import { Sequelize } from 'sequelize';
import { checkFoundBook } from '../errors/checkErros';
import { Book, Genre } from '../models/association.model';
import { paramsIdSchema } from '../schemas/params.schema';

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
    res.status(200).json(allBooks);
  },

  async getOneBookById(req, res) {
    const parsedData = paramsIdSchema.parse(req.params);
    const oneBook = await Book.findOne({
      where: { id: parsedData.id },
      include: {
        model: Genre,
      },
    });

    checkFoundBook(oneBook);

    res.status(200).json(oneBook);
  },
};
