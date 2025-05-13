import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { wrapController } from '../middlewares/wrapController.js';

export const userRouter = Router();

userRouter.route('/user')
  .get(authMiddleware.authorization, wrapController(userController.getUserDatas))
  .patch(authMiddleware.authorization, wrapController(userController.updateUserDatas))
  .delete(authMiddleware.authorization, wrapController(userController.deleteUserDatas));
