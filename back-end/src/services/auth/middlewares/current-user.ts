import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  const authHeader = req.session?.jwt || req.headers.authorization || undefined;

  if (!authHeader) {
    return next();
  }

  try {
    
    const payload = jwt.verify(
      authHeader,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
    
  } catch (err) {
    req.currentUser = undefined;
  }

  next();
};
