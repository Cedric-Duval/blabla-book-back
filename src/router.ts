import { Router } from 'express';
import { adminController } from './controllers/adminController.js';
import { bookController } from './controllers/bookController.js';
import { libraryController } from './controllers/libraryController.js';

export const router = Router();

router.get('/random-books', bookController.getFiveRandomBooks);

router.get('/book/:id', bookController.getOneBookById); // Nodemon bugged with Regex expression -> to fix ?

router.get('/books', bookController.getAllBooks);

router.get('/libraries', libraryController.getLibrariesByUserId);

router.post('/library', libraryController.createNewLibrary);
router.get('/library/:id', libraryController.getLibraryById);
router.patch('/library/:id', libraryController.updateLibraryName);
router.delete('/library/:id', libraryController.deleteLibrary);

router.post('/admin/book', adminController.createBook);


router
  .route('/admin/book/:id')
  .patch(adminController.editBook)
  .delete(adminController.deleteBook);

router
  .route('/library/:libraryId/book/:bookId')
  .post(libaryController.addBookToLibrary)
  .patch(libaryController.editBookStatus)
  .delete(libaryController.deleteBook);
