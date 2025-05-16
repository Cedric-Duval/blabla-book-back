import { Router } from "express";
import { genreController } from "../controllers/genreController";
import { wrapController } from "../middlewares/wrapController";

export const genresRouter = Router();

genresRouter.get('/genres', wrapController(genreController.getAllGenres));