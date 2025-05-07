import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { wrapController } from '../middlewares/wrapController.js';

export const authRouter = Router();

authRouter.post('/register', wrapController(authController.register));
authRouter.post('/login', wrapController(authController.login));
