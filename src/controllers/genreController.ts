import type { Request, Response } from 'express';
import { Genre } from '../models/genre.model';

export const genreController = {
  async getAllGenres(req: Request, res: Response) {
    const allGenres = await Genre.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json(allGenres);
  },
};
