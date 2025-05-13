import { Book, Genre, Library, User } from './association.model';

//*--------------------------------------------------------------------------------------------
//*-----------------------------------------------BOOK-----------------------------------------
//test de récupération de tous les livres - OK
const allBooks = await Book.findAll();
console.log(JSON.stringify(allBooks, null, 2));

//test de récupération de tous les livres et de leurs genres - OK
const allBooksWithGenre = await Book.findAll({
  include: {
    model: Genre,
  },
});
console.log(JSON.stringify(allBooksWithGenre, null, 2));

//test de récupération de tous les livres et de leurs bibliothèques - OK
const allBooksWithLibraries = await Book.findAll({
  include: {
    model: Library,
  },
});
console.log(JSON.stringify(allBooksWithLibraries, null, 2));

//*--------------------------------------------------------------------------------------------
//*-----------------------------------------------GENRE-----------------------------------------
//test de récupération de tous les genres - OK
const allGenres = await Genre.findAll();
console.log(JSON.stringify(allGenres, null, 2));

//test de récupération de tous les genres avec leurs livres associés - OK
const allGenresWithBooks = await Genre.findAll({
  include: {
    model: Book,
  },
});
console.log(JSON.stringify(allGenresWithBooks, null, 2));

//*--------------------------------------------------------------------------------------------
//*-----------------------------------------------USER-----------------------------------------
//test de récupération des users - OK
const allUsers = await User.findAll();
console.log(JSON.stringify(allUsers, null, 2));

//test de récupération de tous les users et de leurs biliothèques - OK
const allUsersWithLibrary = await User.findAll({
  include: {
    model: Library,
  },
});
console.log(JSON.stringify(allUsersWithLibrary, null, 2));

//*-----------------------------------------------------------------------------------------------
//*-----------------------------------------------LIBRARY-----------------------------------------
//test de récupération des bibliothèques - OK
const allLibraries = await User.findAll();
console.log(JSON.stringify(allLibraries, null, 2));

//test de récupération de toutes les bibliothèques et des leurs livres - OK
const allLibrariesWithBooks = await Library.findAll({
  include: {
    model: Book,
  },
});
console.log(JSON.stringify(allLibrariesWithBooks, null, 2));

//test de récupération de toutes les bibliothèques et de leurs users - OK
const allLibrariesWithUsers = await Library.findAll({
  include: {
    model: User,
  },
});
console.log(JSON.stringify(allLibrariesWithUsers, null, 2));
