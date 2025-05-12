import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { router } from './router';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  }),
);

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
