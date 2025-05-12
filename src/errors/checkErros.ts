import type { Book } from '../models/book.model';
import type { Library } from '../models/library.model';
import type { LibraryBook } from '../models/library_book.model';
import type { User } from '../models/user.model';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from './customErrors';

export function checkFoundLibrary(data: Library | null) {
  if (!data) {
    throw new NotFoundError("Bibliothèque d'utilisateur introuvable", 'URL');
  }
}

export function checkFoundBook(data: Book | null) {
  if (!data) {
    throw new NotFoundError('Livre introuvable', 'URL');
  }
}

export function checkFoundSecret(data: string | undefined) {
  if (!data) {
    throw new NotFoundError("JWT_SECRET n'est pas défini", 'environment');
  }
}

export function checkFoundUser(data: User | null) {
  if (!data) {
    throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
  }
}

export function checkFoundToken(data: string | null) {
  if (!data) {
    throw new UnauthorizedError('Token manquant', 'token');
  }
}

export function checkExistingBook(data: Book | null) {
  if (data) {
    throw new BadRequestError('ISBN déjà repertorié', 'isbn');
  }
}

export function checkExistingBookinLibrary(data: boolean) {
  if (data) {
    throw new BadRequestError('Livre présent dans la bibliothèque', 'isbn');
  }
}

export function checkExistingUser(data: User | null) {
  if (data) {
    throw new BadRequestError('Adresse mail déjà utilisée', 'email');
  }
}

export function checkExistingEmail(data: User | null) {
  if (!data) {
    throw new BadRequestError('Adresse mail invalide', 'email');
  }
}

export function checkExistingPassword(data: boolean) {
  if (!data) {
    throw new BadRequestError('Mot de passe non valide', 'password');
  }
}

export function checkRelationLibraryBook(data: LibraryBook | null) {
  if (!data) {
    throw new NotFoundError('Relation non trouvée', 'URL');
  }
}

export function checkConfirmPassword(newPwd: string, confirmPwd: string) {
  if (newPwd !== confirmPwd) {
    throw new BadRequestError(
      'Les mots de passe ne sont pas identiques',
      'password',
    );
  }
}
