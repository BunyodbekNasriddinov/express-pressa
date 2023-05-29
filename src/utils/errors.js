export class AuthorizationError extends Error {
  constructor(status, message) {
    super();
    this.name = "AuthorizationError";
    this.status = status;
    this.message = message;
  }
}
export class NotFoundError extends Error {
  constructor(status, message) {
    super();
    this.name = "NotFoundError";
    this.status = status;
    this.message = message;
  }
}

export class BadRequestError extends Error {
  constructor(status, message) {
    super();
    this.name = "BadRequestError";
    this.status = status;
    this.message = message;
  }
}

export class ForbiddenError extends Error {
  constructor(status, message) {
    super();
    this.name = "ForbiddenError";
    this.status = status;
    this.message = message;
  }
}

export class InternalServerError extends Error {
  constructor(status, message = "InternalServerError") {
    super();
    this.name = "InternalServerError";
    this.status = status;
    this.message = message;
  }
}
