import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapController } from '../middlewares/wrapController';

export const adminRouter = Router();

adminRouter.post('/admin/book',authMiddleware.authorization, wrapController(adminController.createBook));
adminRouter.route('/admin/book/:id')
  .patch(authMiddleware.authorization, wrapController(adminController.editBook))
  .delete(authMiddleware.authorization, wrapController(adminController.deleteBook));
