import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { wrapController } from '../middlewares/wrapController.js';

export const adminRouter = Router();

adminRouter.post('/admin/book', wrapController(adminController.createBook));
adminRouter.route('/admin/book/:id')
  .patch(wrapController(adminController.editBook))
  .delete(wrapController(adminController.deleteBook));
