import { Sequelize } from 'sequelize';
import { Book } from '../models/association.model.js';

export const bookController = {
  async getFiveRandomBooks(req, res) {
    try {
      const randomBooks = await Book.findAll({
        order: Sequelize.literal('RANDOM()'), //  Randomize order
        limit: 5
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
        order: [
          ['publication_year', 'DESC']
        ]
      });
      console.log(JSON.stringify(allBooks, null, 2));
      res.status(200).json(allBooks);
    } catch (error) {
      console.log(error);
      res.status(500).json('Erreur interne du serveur')
    }
  },

  async getOneBookById(req, res) {
    try {

      const { id } = req.params;
      const oneBook = await Book.findByPk(id);
      console.log(JSON.stringify(oneBook, null, 2));
      res.status(200).json(oneBook);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },


};
