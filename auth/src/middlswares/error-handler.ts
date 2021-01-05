import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send(err.serializeErrors);
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send(err.serializeErrors);
  }
  res.status(500).send({
    message: err.message
  });
};
