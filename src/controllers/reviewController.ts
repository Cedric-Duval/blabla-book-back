import { Request, Response } from 'express';
import { Review, Book, User } from '../models/association.model';
import { checkFoundBook, checkFoundUser, checkExistingReview } from '../errors/checkErros';

export const reviewController = {
  async getReviewsForBook(req: Request, res: Response) {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);
    checkFoundBook(book);

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      include: {
        model: User,
        attributes: ['id', 'firstname', 'name'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reviews);
  },

  async getReviewsFromUser(req: Request, res: Response) {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    checkFoundUser(user);

    const reviews = await Review.findAll({
      where: { user_id: userId },
      include: {
        model: Book,
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reviews);
  },

  

  async createReview(req: Request, res: Response) {
    const { bookId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    checkFoundBook(book);

    const review = await Review.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });
    checkExistingReview(review);

    const newReview = await Review.create({
      content,
      rating,
      user_id: userId,
      book_id: bookId,
    });

    res.status(201).json(newReview);
  },

  async updateReview(req: Request, res: Response) {
    const { id } = req.params;
    const { content, rating } = req.body;

    const review = await Review.findByPk(id);
    if (!review || review.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Cette review n\'existe pas ou alors vous n\'êtes pas autorisé à la modifier.' });
    }

    review.content = content ?? review.content;
    review.rating = rating ?? review.rating;
    await review.save();

    res.status(200).json(review);
  },

  async deleteReview(req: Request, res: Response) {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review || review.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Cette review n\'existe pas ou alors vous n\'êtes pas autorisé à la modifier.' });
    }

    await review.destroy();
    res.status(204).send();
  },
};
