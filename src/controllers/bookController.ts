import { Book } from '../models/association.model.js';

export const bookController = {
  async getFiveRandomBooks(req, res) {
    try {
      const allBooks = await Book.findAll();
      console.log(JSON.stringify(allBooks, null, 2));
      res.status(200).json(allBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
};
