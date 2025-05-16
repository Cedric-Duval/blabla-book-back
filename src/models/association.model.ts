import { Book } from './book.model';
import { Genre } from './genre.model';
import { Library } from './library.model';
import { LibraryBook } from './library_book.model';
import { User } from './user.model';
import { Review } from './review.model';

//Relation 1 to many User/Library
User.hasMany(Library, {
  foreignKey: 'user_id',
});
Library.belongsTo(User, {
  foreignKey: 'user_id',
});

//Relation many to many Library/Book
Library.belongsToMany(Book, {
  through: LibraryBook,
  foreignKey: 'library_id',
  otherKey: 'book_id',
});
Book.belongsToMany(Library, {
  through: LibraryBook,
  foreignKey: 'book_id',
  otherKey: 'library_id',
});

//Relation many to many Genre/Book
Book.belongsToMany(Genre, {
  through: 'genre_book',
  foreignKey: 'book_id',
  otherKey: 'genre_id',
  timestamps: false,
});
Genre.belongsToMany(Book, {
  through: 'genre_book',
  foreignKey: 'genre_id',
  otherKey: 'book_id',
  timestamps: false,
});

//Relation one to many User/Review
User.hasMany(Review, { 
  foreignKey: 'user_id', 
  onDelete: 'CASCADE' 
});
Review.belongsTo(User, { 
  foreignKey: 'user_id' 
});

//Relation one to many Book/Reviews
Book.hasMany(Review, { 
  foreignKey: 'book_id', 
  onDelete: 'CASCADE' 
});
Review.belongsTo(Book, { 
  foreignKey: 'book_id' 
});

export { Book, Genre, Library, LibraryBook, User, Review };
