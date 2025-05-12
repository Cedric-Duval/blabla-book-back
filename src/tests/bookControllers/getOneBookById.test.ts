import type { Request, Response } from 'express';
import { bookController } from '../../controllers/bookController';
import * as errorUtils from '../../errors/checkErros';
import { Book, Genre } from '../../models/association.model';

jest.mock('../../models/association.model');

describe('bookController.getOneBookById', () => {
  const fakeBook = {
    id: 1,
    title: 'Test Book',
    Genres: [{ id: 1, name: 'Science Fiction' }],
  };

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      params: { id: '1' },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Book.findOne as jest.Mock).mockResolvedValue(fakeBook);
    jest.spyOn(errorUtils, 'checkFoundBook').mockImplementation(() => {});
  });

  it('devrait appeler Book.findOne avec le bon id et include', async () => {
    await bookController.getOneBookById(req, res);
    expect(Book.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        model: Genre,
      },
    });
  });

  it('devrait appeler checkFoundBook avec le résultat', async () => {
    const spy = jest.spyOn(errorUtils, 'checkFoundBook');
    await bookController.getOneBookById(req, res);
    expect(spy).toHaveBeenCalledWith(fakeBook);
  });

  it('devrait répondre avec un statut 200', async () => {
    await bookController.getOneBookById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('devrait renvoyer le livre en JSON', async () => {
    await bookController.getOneBookById(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeBook);
  });
});
