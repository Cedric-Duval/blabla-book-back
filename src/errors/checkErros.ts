import { BadRequestError, NotFoundError } from './customErrors.js';

export function checkFoundLibrary(data) {
  if (!data) {
    throw new NotFoundError("Bibliothèque d'utilisateur introuvable", 'URL');
  }
}

export function checkExistingBookinLibrary(data) {
  if (data) {
    throw new BadRequestError('Livre présent dans la bibliothèque', 'isbn');
  }
}

export function checkRelationLibraryBook(data) {
  if (!data) {
    throw new NotFoundError('Relation non trouvée', 'URL');
  }
}
