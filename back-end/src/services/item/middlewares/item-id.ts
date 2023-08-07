import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../helpers';
import mongoose from 'mongoose';
import { ItemCompany } from '../../../models/items';


declare global {
  namespace Express {
    interface Request {
      item?: any;
    }
  }
}

export async function getItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    if (req.params.itemId == undefined || !mongoose.Types.ObjectId.isValid(req.params.itemId))
      throw new BadRequestError('Item not found', 'IMGI-001');

    const item = await ItemCompany.findById(req.params.itemId);

    if (!item) 
      throw new BadRequestError('Item not found', 'IMGI-002');
    
    req.item = item;

    next();
  } catch (error) {
    throw new BadRequestError('Item not found', 'IMGI-003');
  }
}