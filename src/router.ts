import { Router } from 'express';
import { adminController } from './controllers/adminController.js';
import { authController } from './controllers/authController.js';
import { bookController } from './controllers/bookController.js';
import { libraryController } from './controllers/libraryController.js';
import { userController } from './controllers/userController.js';

export const router = Router();

//--------------------------------------TESTED ----------------------------------------------------------------

router.get('/books', bookController.getAllBooks);
router.get('/book/:id', bookController.getOneBookById); // Nodemon bugged with Regex expression -> to fix ?
router.get('/random-books', bookController.getFiveRandomBooks);

router.post('/admin/book', adminController.createBook);
router
  .route('/admin/book/:id')
  .patch(adminController.editBook)
  .delete(adminController.deleteBook);

router
  .route('/library/:libraryId/book/:bookId')
  .post(libraryController.addBookToLibrary)
  .patch(libraryController.editBookStatus)
  .delete(libraryController.deleteBook);
router.get(
  '/user/:id/libraries',
  libraryController.getLibrariesWithoutBooksByUserId,
);

router.post('/register', authController.register);
router.post('/login', authController.login);

router
  .route('/user')
  .get(userController.getUserDatas)
  .patch(userController.updateUserDatas); // => Issue with updating only one field, password is not hashed.

//-------------------------------------------------------------------------------------------------------------
//--------------------------------------NOT TESTED ------------------------------------------------------------

router.get(
  '/user/:id/libraries/books',
  libraryController.getLibrariesWithBooksByUserId,
);

router.post('/library', libraryController.createNewLibrary);

router
  .route('/library/:id')
  .get(libraryController.getLibraryById)
  .patch(libraryController.updateLibraryName)
  .delete(libraryController.deleteLibrary);
