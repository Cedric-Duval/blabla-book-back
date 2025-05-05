import { Router } from 'express';
import { adminController } from './controllers/adminController.js';
import { authController } from './controllers/authController.js';
import { bookController } from './controllers/bookController.js';
import { libraryController } from './controllers/libraryController.js';
import { userController } from './controllers/userController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

export const router = Router();

//BOOKS
router.get('/books', bookController.getAllBooks);
router.get('/book/:id', bookController.getOneBookById);
router.get('/random-books', bookController.getFiveRandomBooks);

//ADMIN
router.post('/admin/book', adminController.createBook);
router
  .route('/admin/book/:id')
  .patch(adminController.editBook)
  .delete(adminController.deleteBook);

//LIBRARIES
router.get(
  '/user/:id/libraries',
  libraryController.getLibrariesWithoutBooksByUserId,
);
router.get(
  '/user/:id/libraries/books',
  libraryController.getLibrariesWithBooksByUserId,
);
router
  .route('/library/:id')
  .get(libraryController.getLibraryById)
  .patch(libraryController.updateLibraryName)
  .delete(libraryController.deleteLibrary);
router
  .route('/library/:libraryId/book/:bookId')
  .post(libraryController.addBookToLibrary)
  .patch(libraryController.editBookStatus)
  .delete(libraryController.deleteBook);
router.post(
  '/library',
  authMiddleware.authorization,
  libraryController.createNewLibrary,
);

//AUTHENTIFICATION
router.post('/register', authController.register);
router.post('/login', authController.login);

//USER
router
  .route('/user')
  .get(authMiddleware.authorization, userController.getUserDatas)
  .patch(userController.updateUserDatas); // => Issue with updating only one field, password is not hashed.
