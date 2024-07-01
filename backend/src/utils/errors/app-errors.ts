import HTTPStatusCode from "./errors-status-code";
import ErrorCode from "./errors-code";

export class BaseError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(statusCode: number, errorCode: string, description: string) {
    super(description);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// 500 Internal Error
export class APIError extends BaseError {
  constructor(description = "API ERROR") {
    super(
      HTTPStatusCode.InternalServerError,
      ErrorCode.InternalServerError,
      description
    );
  }
}

// 400 Validation Error
export class ValidationError extends BaseError {
  constructor(description = "BAD REQUEST") {
    super(HTTPStatusCode.BadRequest, ErrorCode.BadRequest, description);
  }
}

// 403 Authorize error
export class AuthorizeError extends BaseError {
  constructor(description = "ACCESS DENIED") {
    super(HTTPStatusCode.Unauthorized, ErrorCode.Unauthorized, description);
  }
}

// 404 Not Found
export class NotFoundError extends BaseError {
  constructor(description = "NOT FOUND") {
    super(HTTPStatusCode.NotFound, ErrorCode.NotFound, description);
  }
}

export class ConflictError extends BaseError {
  constructor(description = "Already exists") {
    super(HTTPStatusCode.Conflict, ErrorCode.Conflict, description);
  }
}
