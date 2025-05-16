import { Router } from 'express';
import { reviewController } from '../controllers/reviewController.ts';
import { authMiddleware } from '../middlewares/authMiddleware';
import { wrapController } from '../middlewares/wrapController';

export const reviewRouter = Router();

// Authenticated : Get all the reviews from a book and create a review
reviewRouter
  .route('/book/:bookId/reviews')
  .get(authMiddleware.authorization, wrapController(reviewController.getReviewsForBook))
  .post(authMiddleware.authorization, wrapController(reviewController.createReview));

// Authenticated: Update/delete a user's review
reviewRouter
  .route('/review/:id')
  .patch(authMiddleware.authorization, wrapController(reviewController.updateReview))
  .delete(authMiddleware.authorization, wrapController(reviewController.deleteReview));