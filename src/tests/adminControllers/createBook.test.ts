import { adminController } from '../../controllers/adminController';
import { bookController } from '../../controllers/bookController';
import * as errorUtils from '../../errors/checkErros';
import { Book, Genre } from '../../models/association.model';

jest.mock('../../models/association.model');

describe('adminController.createBook', () => {
  const newBookData = {
    title: 'Nouveau livre',
    author: 'Auteur',
    isbn: '1234567890',
    summary: 'test',
    image:
      'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/34/5a/0d/875060/1507-1/tsp20240921073242/Harry-potter-a-l-ecole-des-sorciers.jpg',
    pages: 2,
    editor: 'Moi',
    publication_year: 1994,
  };

  const createdBook = {
    id: 1,
    ...newBookData,
  };

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: newBookData,
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  (Book.findOne as jest.Mock).mockResolvedValue(null);
  (Book.create as jest.Mock).mockResolvedValue(createdBook);

  it("devrait appeler Book.findOne avec l'ISBN", async () => {
    await adminController.createBook(req, res);
    expect(Book.findOne).toHaveBeenCalledWith({
      where: { isbn: newBookData.isbn },
    });
  });

  it('devrait appeler checkExistingBook avec null', async () => {
    const spy = jest.spyOn(errorUtils, 'checkExistingBook');

    await adminController.createBook(req, res);

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('devrait créer un livre et renvoyer un statut 201', async () => {
    await adminController.createBook(req, res);

    expect(Book.create).toHaveBeenCalledWith(newBookData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdBook);
  });
});
