import { Sequelize } from 'sequelize';
import { Book } from '../models/association.model.js';

export const adminController = {
  async createBook(req, res) {
    try {
      const inputDatas = req.body;
      const newBook = await Book.create(inputDatas);
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

  async editBook(req, res) {
    try {
      const id = req.params.id;
      const inputDatas = req.body;

      const currentBook = await Book.findByPk(id);
      await currentBook?.update(inputDatas);

      res.status(200).json(currentBook);
    } catch (error) {
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
