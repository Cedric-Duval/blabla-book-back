import { Book } from './book.model.js';
import { Genre } from './genre.model.js';
import { Library } from './library.model.js';
import { LibraryBook } from './library_book.model.js';
import { User } from './user.model.js';

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

export { Book, Genre, Library, User };
