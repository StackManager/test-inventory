import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthorizedError } from '../../../helpers';
import { User } from '../../../models/user';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const getUserVerfied = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    
    if (req.params.userId == undefined)
      throw new BadRequestError('User not found', '');

    const user = await User.findById(req.params.userId);
    
    if (!user) 
      throw new BadRequestError('User not found', '');
    
    req.user = user;

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
