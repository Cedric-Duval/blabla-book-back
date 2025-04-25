import { Router } from 'express';
import { bookController } from './controllers/bookController.js';
import { libaryController } from './controllers/libraryController.js';

export const router = Router();

router.get('/random-books', bookController.getFiveRandomBooks);

router.get('/book/:id', bookController.getOneBookById); // Nodemon bugged with Regex expression -> to fix ?

router.get('/books', bookController.getAllBooks);

router.get('/library/:id');
