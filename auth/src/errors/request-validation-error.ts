import { ValidationError } from 'express-validator';

interface CustomError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

export class RequestValidationError extends Error implements CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    const response = this.errors.map(err => {
      return {
        message: err.msg,
        field: err.param
      };
    });
    return response;
  }
}
