import { Router } from 'express';
import { adminController } from './controllers/adminController.js';
import { authController } from './controllers/authController.js';
import { userController } from './controllers/userController.js';
import { bookController } from './controllers/bookController.js';
import { libraryController } from './controllers/libraryController.js';

export const router = Router();

router.get('/random-books', bookController.getFiveRandomBooks);

router.get('/book/:id', bookController.getOneBookById); // Nodemon bugged with Regex expression -> to fix ?

router.get('/books', bookController.getAllBooks);

router.get('/user/:id/libraries', libraryController.getLibrariesByUserId);

router.post('/library', libraryController.createNewLibrary);

router
  .route('/library/:id')
  .get(libraryController.getLibraryById)
  .patch(libraryController.updateLibraryName)
  .delete(libraryController.deleteLibrary);


router.post('/admin/book', adminController.createBook);

router
  .route('/admin/book/:id')
  .patch(adminController.editBook)
  .delete(adminController.deleteBook);

router
  .route('/user')
  .get(userController.getUserDatas)
  .patch(userController.updateUserDatas);

router
  .route('/library/:libraryId/book/:bookId')
  .post(libraryController.addBookToLibrary)
  .patch(libraryController.editBookStatus)
  .delete(libraryController.deleteBook);

router.post('/register', authController.register);

router.post('/login', authController.login);
