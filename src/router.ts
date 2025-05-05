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

//AUTHENTIFICATION
router.post('/register', authController.register);
router.post('/login', authController.login);

//AUTH OK (user_id from the token) --------------------------------------------------------------------
//LIBRARIES
router
  .route('/library')
  .get(
    authMiddleware.authorization,
    libraryController.getLibrariesWithBooksByUserId,
  )
  .post(authMiddleware.authorization, libraryController.createNewLibrary);

router
  .route('/libraries/books')
  .get(
    authMiddleware.authorization,
    libraryController.getLibrariesWithBooksByUserId,
  );

//USER
router
  .route('/user')
  .get(authMiddleware.authorization, userController.getUserDatas)
  .patch(authMiddleware.authorization, userController.updateUserDatas);
