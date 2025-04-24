import { Router } from 'express';
import { bookController } from './controllers/bookController.js';

export const router = Router();

router.get('/random-books', bookController.getFiveRandomBooks);
