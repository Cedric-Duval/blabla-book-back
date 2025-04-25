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
};
