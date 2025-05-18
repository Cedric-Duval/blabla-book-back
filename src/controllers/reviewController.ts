import { Request, Response } from 'express';
import { Review, Book, User } from '../models/association.model';
import { checkFoundBook, checkFoundUser, checkExistingReview } from '../errors/checkErros';
import { paramsIdSchema } from '../schemas/params.schema';
import { userIdSchema } from '../schemas/user.schema';
import { reviewSchema } from '../schemas/review.schema';

export const reviewController = {
  async getReviewsForBook(req: Request, res: Response) {
    const parsedBook = paramsIdSchema.parse(req.params);

    const book = await Book.findByPk(parsedBook.id);
    checkFoundBook(book);

    const reviews = await Review.findAll({
      where: { book_id: parsedBook.id },
      include: {
        model: User,
        attributes: ['id', 'firstname', 'name'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reviews);
  },

  async getReviewsFromUser(req: Request, res: Response) {
    const parsedUser = userIdSchema.parse(req.user.id);

    const user = await User.findByPk(parsedUser.id);
    checkFoundUser(user);

    const reviews = await Review.findAll({
      where: { user_id: parsedUser },
      include: {
        model: Book,
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reviews);
  },

  

  async createReview(req: Request, res: Response) {
    const parsedBook = paramsIdSchema.parse(req.params);
    const parsedUser = userIdSchema.parse(req.user.id);
    const parsedData = reviewSchema.parse(req.body);

    const book = await Book.findByPk(parsedBook.id);
    checkFoundBook(book);

    const review = await Review.findOne({
      where: {
        user_id: parsedUser.id,
        book_id: parsedBook.id,
      },
    });
    checkExistingReview(review);

    const newReview = await Review.create({
      content: parsedData.content,
      rating: parsedData.rating,
      user_id: parsedUser.id,
      book_id: parsedBook.id,
    });

    res.status(201).json(newReview);
  },

  async updateReview(req: Request, res: Response) {
    const parsedReview = paramsIdSchema.parse(req.params);
    const parsedUser = userIdSchema.parse(req.user.id);
    const parsedData = reviewSchema.parse(req.body);

    const review = await Review.findByPk(parsedReview.id);
    if (!review || review.user_id !== parsedUser.id) {
      return res.status(403).json({ error: 'Cette review n\'existe pas ou alors vous n\'êtes pas autorisé à la modifier.' });
    }

    review.content = parsedData.content ?? review.content;
    review.rating = parsedData.rating ?? review.rating;
    await review.save();

    res.status(200).json(review);
  },

  async deleteReview(req: Request, res: Response) {
    const parsedReview = paramsIdSchema.parse(req.params);
    const parsedUser = userIdSchema.parse(req.user.id);

    const review = await Review.findByPk(parsedReview.id);
    if (!review || review.user_id !== parsedUser.id) {
      return res.status(403).json({ error: 'Cette review n\'existe pas ou alors vous n\'êtes pas autorisé à la modifier.' });
    }

    await review.destroy();
    res.status(204).send();
  },
};
