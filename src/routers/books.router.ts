import { Router } from 'express';
import { bookController } from '../controllers/bookController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapController } from '../middlewares/wrapController';

export const booksRouter = Router();

booksRouter.get('/books',authMiddleware.authorization, wrapController(bookController.getAllBooks));
booksRouter.get('/book/:id', authMiddleware.authorization, wrapController(bookController.getOneBookById));
booksRouter.get('/random-books', wrapController(bookController.getFiveRandomBooks));
