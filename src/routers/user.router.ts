import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapController } from '../middlewares/wrapController';

export const userRouter = Router();

userRouter.route('/user')
  .get(authMiddleware.authorization, wrapController(userController.getUserDatas))
  .patch(authMiddleware.authorization, wrapController(userController.updateUserDatas));
