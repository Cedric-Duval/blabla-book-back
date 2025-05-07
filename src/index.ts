import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { router } from './router.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  }),
);

app.use(express.json());

app.use(router);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Blabla Book - listening on port ${port}`);
});
