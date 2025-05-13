import type { Request, Response } from 'express';
import { bookController } from '../../controllers/bookController';
import { Book } from '../../models/association.model';

jest.mock('../../models/association.model'); // Mock for book model

describe('bookController.getFiveRandomBooks', () => {
  const fakeBooks = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
    { id: 4, title: 'Book 4' },
    { id: 5, title: 'Book 5' },
  ];

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Book.findAll as jest.Mock).mockResolvedValue(fakeBooks);
  });

  it('devrait appeler Book.findAll avec order et limit à 5', async () => {
    await bookController.getFiveRandomBooks(req, res);
    expect(Book.findAll).toHaveBeenCalledWith({
      order: expect.anything(),
      limit: 5,
    });
  });

  it('devrait répondre avec un statut 200', async () => {
    await bookController.getFiveRandomBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('devrait renvoyer les livres en JSON', async () => {
    await bookController.getFiveRandomBooks(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeBooks);
  });
});
