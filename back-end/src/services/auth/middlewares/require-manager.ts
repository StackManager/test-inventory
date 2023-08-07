import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../../helpers/errors/not-authorized-error';

export const requireManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser?.role != "manager") {
    throw new NotAuthorizedError();
  }

  next();
};