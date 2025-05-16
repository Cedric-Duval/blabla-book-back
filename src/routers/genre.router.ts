import { Router } from "express";
import { genreController } from "../controllers/genreController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { wrapController } from "../middlewares/wrapController";

export const genresRouter = Router();

genresRouter.get('/genres', authMiddleware.authorization, wrapController(genreController.getAllGenres));