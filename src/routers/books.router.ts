import { Router } from 'express';
import { bookController } from '../controllers/bookController.js';
import { wrapController } from '../middlewares/wrapController.js';

export const booksRouter = Router();

booksRouter.get('/books', wrapController(bookController.getAllBooks));
booksRouter.get('/book/:id', wrapController(bookController.getOneBookById));
booksRouter.get('/random-books', wrapController(bookController.getFiveRandomBooks));
