import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from './customErrors.js';

export function checkFoundLibrary(data) {
  if (!data) {
    throw new NotFoundError("Bibliothèque d'utilisateur introuvable", 'URL');
  }
}

export function checkFoundBook(data) {
  if (!data) {
    throw new NotFoundError('Livre introuvable', 'URL');
  }
}

export function checkFoundSecret(data) {
  if (!data) {
    throw new NotFoundError("JWT_SECRET n'est pas défini", 'environment');
  }
}

export function checkFoundUser(data) {
  if (!data) {
    throw new NotFoundError('Utilisateur non trouvé', 'tokenId');
  }
}

export function checkFoundToken(data) {
  if (!data) {
    throw new UnauthorizedError('Token manquant', 'token');
  }
}

export function checkExistingBook(data) {
  if (data) {
    throw new BadRequestError('ISBN déjà repertorié', 'isbn');
  }
}

export function checkExistingBookinLibrary(data) {
  if (data) {
    throw new BadRequestError('Livre présent dans la bibliothèque', 'isbn');
  }
}

export function checkExistingUser(data) {
  if (data) {
    throw new BadRequestError('Adresse mail déjà utilisée', 'email');
  }
}

export function checkExistingEmail(data) {
  if (!data) {
    throw new BadRequestError('Adresse mail invalide', 'email');
  }
}

export function checkExistingPassword(data) {
  if (!data) {
    throw new BadRequestError('Mot de passe non valide', 'password');
  }
}

export function checkRelationLibraryBook(data) {
  if (!data) {
    throw new NotFoundError('Relation non trouvée', 'URL');
  }
}

export function checkConfirmPassword(newPwd, confirmPwd) {
  if (newPwd !== confirmPwd) {
    throw new BadRequestError(
      'Les mots de passe ne sont pas identiques',
      'password',
    );
  }
}
