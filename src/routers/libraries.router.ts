import { Router } from 'express';
import { libraryController } from '../controllers/libraryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapController } from '../middlewares/wrapController';

export const librariesRouter = Router();

librariesRouter.route('/library/:id')
  .get(authMiddleware.authorization, wrapController(libraryController.getLibraryById))
  .patch(authMiddleware.authorization, wrapController(libraryController.updateLibraryName))
  .delete(authMiddleware.authorization, wrapController(libraryController.deleteLibrary));

librariesRouter.route('/library/:libraryId/book/:bookId')
  .post(authMiddleware.authorization, wrapController(libraryController.addBookToLibrary))
  .patch(authMiddleware.authorization, wrapController(libraryController.editBookStatus))
  .delete(authMiddleware.authorization, wrapController(libraryController.deleteBook));

librariesRouter.route('/library')
  .get(authMiddleware.authorization, wrapController(libraryController.getLibrariesWithBooksByUserId))
  .post(authMiddleware.authorization, wrapController(libraryController.createNewLibrary));

librariesRouter.route('/libraries/books')
  .get(authMiddleware.authorization, wrapController(libraryController.getLibrariesWithBooksByUserId));

librariesRouter.route('/library/:libraryId/book/:bookId/newLibrary/:newLibraryId')
  .patch(authMiddleware.authorization, wrapController(libraryController.switchBookLibrary));