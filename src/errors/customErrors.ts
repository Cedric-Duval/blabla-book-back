export class AppError extends Error {
  statusCode: number;
  field?: string;
  constructor(message: string | undefined, field: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.field = field;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource introuvable', field = 'field') {
    super(message, field, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Requête invalide', field = 'field') {
    super(message, field, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non autorisé', field = 'field') {
    super(message, field, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflit de ressource', field = 'field') {
    super(message, field, 409);
  }
}
