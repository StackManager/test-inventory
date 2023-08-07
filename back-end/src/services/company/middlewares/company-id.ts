import { Request, Response, NextFunction } from 'express';
import { Company } from '../../../models/company';
import { BadRequestError, NotAuthorizedError } from '../../../helpers';
import mongoose from 'mongoose';


declare global {
  namespace Express {
    interface Request {
      company?: any;
    }
  }
}

export async function getCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    if (req.params.companyId == undefined || !mongoose.Types.ObjectId.isValid(req.params.companyId))
      throw new BadRequestError('Company not found', 'CMGP-001');

    const company = await Company.findById(req.params.companyId);

    if (!company) 
      throw new BadRequestError('Company not found', 'CMGP-002');
    
    req.company = company;

    next();
  } catch (error) {
    throw new BadRequestError('Company not found', 'CMGP-003');
  }
}