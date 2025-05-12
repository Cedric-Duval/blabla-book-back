import type { Request, Response } from 'express';
import { bookController } from '../../controllers/bookController';
import { Book } from '../../models/association.model';

jest.mock('../../models/association.model'); // Mock for book model

describe('bookController.getAllBooks', () => {
  const fakeBooks = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
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

  it('devrai renvoyer tous les livres en JSON', async () => {
    await bookController.getAllBooks(req, res);
    expect(res.json).toHaveBeenCalledWith(fakeBooks);
  });

  it('devrait répondre avec un statut 200', async () => {
    await bookController.getAllBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("devrait appeler le controller avec un ordre décroissant d'année de publication", async () => {
    await bookController.getAllBooks(req, res);
    expect(Book.findAll).toHaveBeenCalledWith({
      order: [['publication_year', 'DESC']],
    });
  });
});
