import { Router } from 'express';
import { adminRouter } from './routers/admin.router';
import { authRouter } from './routers/auth.router';
import { booksRouter } from './routers/books.router';
import { librariesRouter } from './routers/libraries.router';
import { userRouter } from './routers/user.router';

export const router = Router();

router.use(booksRouter);
router.use(adminRouter);
router.use(librariesRouter);
router.use(authRouter);
router.use(userRouter);
