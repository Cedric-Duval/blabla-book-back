import { Router } from 'express';
import { adminController } from './controllers/adminController.js';
import { authController } from './controllers/authController.js';
import { bookController } from './controllers/bookController.js';
import { libraryController } from './controllers/libraryController.js';
import { userController } from './controllers/userController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { wrapController } from './middlewares/wrapController.js';

export const router = Router();

//BOOKS
router.get('/books', wrapController(bookController.getAllBooks));
router.get('/book/:id', wrapController(bookController.getOneBookById));
router.get('/random-books', wrapController(bookController.getFiveRandomBooks));

//ADMIN
router.post('/admin/book', wrapController(adminController.createBook));
router
  .route('/admin/book/:id')
  .patch(wrapController(adminController.editBook))
  .delete(wrapController(adminController.deleteBook));

//LIBRARIES
router
  .route('/library/:id')
  .get(wrapController(libraryController.getLibraryById))
  .patch(wrapController(libraryController.updateLibraryName))
  .delete(wrapController(libraryController.deleteLibrary));
router
  .route('/library/:libraryId/book/:bookId')
  .post(wrapController(libraryController.addBookToLibrary))
  .patch(
    authMiddleware.authorization,
    wrapController(libraryController.editBookStatus),
  )
  .delete(
    authMiddleware.authorization,
    wrapController(libraryController.deleteBook),
  );

//AUTHENTIFICATION
router.post('/register', wrapController(authController.register));
router.post('/login', wrapController(authController.login));

//AUTH OK (user_id from the token) --------------------------------------------------------------------
//LIBRARIES
router
  .route('/library')
  .get(
    authMiddleware.authorization,
    wrapController(libraryController.getLibrariesWithBooksByUserId),
  )
  .post(
    authMiddleware.authorization,
    wrapController(libraryController.createNewLibrary),
  );

router
  .route('/libraries/books')
  .get(
    authMiddleware.authorization,
    wrapController(libraryController.getLibrariesWithBooksByUserId),
  );

//USER
router
  .route('/user')
  .get(
    authMiddleware.authorization,
    wrapController(userController.getUserDatas),
  )
  .patch(
    authMiddleware.authorization,
    wrapController(userController.updateUserDatas),
  );