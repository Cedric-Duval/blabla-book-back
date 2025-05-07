import { Router } from 'express';
import { adminRouter } from './routers/admin.router.js';
import { authRouter } from './routers/auth.router.js';
import { booksRouter } from './routers/books.router.js';
import { librariesRouter } from './routers/libraries.router.js';
import { userRouter } from './routers/user.router.js';

export const router = Router();


router.use(booksRouter);
router.use(adminRouter);
router.use(librariesRouter);
router.use(authRouter);
router.use(userRouter);