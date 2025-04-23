import { Book, Genre } from './association.model.js';

//test de récupération de tous les livres
//const allBooks = await Book.findAll();
//console.log(JSON.stringify(allBooks, null, 2));

//test de récupération de tous les livres et de leurs genres
const allBooksWithGenre = await Book.findAll({
  include: {
    model: Genre,
    through: { attributes: [] },
  },
});
console.log(JSON.stringify(allBooksWithGenre, null, 2));

//test de récupération de tous les genres
//const allGenres = await Genre.findAll();
//console.log(JSON.stringify(allGenres, null, 2));
