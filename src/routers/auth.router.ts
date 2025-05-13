import { Router } from 'express';
import { authController } from '../controllers/authController';
import { wrapController } from '../middlewares/wrapController';

export const authRouter = Router();

authRouter.post('/register', wrapController(authController.register));
authRouter.post('/login', wrapController(authController.login));
