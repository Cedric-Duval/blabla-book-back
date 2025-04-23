import { Book } from './book.model.js';

//test de récupération de tous les livres
const allBooks = await Book.findAll();
console.log(JSON.stringify(allBooks, null, 2));
