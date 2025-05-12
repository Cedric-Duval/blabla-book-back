import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { wrapController } from '../middlewares/wrapController';

export const adminRouter = Router();

adminRouter.post('/admin/book', wrapController(adminController.createBook));
adminRouter.route('/admin/book/:id')
  .patch(wrapController(adminController.editBook))
  .delete(wrapController(adminController.deleteBook));
