import { Book } from './book.model.js';
import { Genre } from './genre.model.js';
import { Library } from './library.model.js';
import { User } from './user.model.js';

//Relation 1 to many User/Library
User.hasMany(Library);
Library.belongsTo(User);

//Relation many to many Book/Library
Library.belongsToMany(Book, {
  through: 'library_book',
  foreignKey: 'library_id',
  otherKey: 'book_id',
});
Book.belongsToMany(Library, {
  through: 'library_book',
  foreignKey: 'book_id',
  otherKey: 'library_id',
});

//Relation many to many Book/Genre
Book.belongsToMany(Genre, {
  through: 'genre_book',
  foreignKey: 'book_id',
  otherKey: 'genre_id',
});
Genre.belongsToMany(Book, {
  through: 'genre_book',
  foreignKey: 'genre_id',
  otherKey: 'book_id',
});

export { Book, Genre, Library, User };
