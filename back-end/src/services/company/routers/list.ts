import express, { Request, Response } from 'express';
import { Company } from '../../../models/company';
import { BadRequestError } from '../../../helpers/index';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';

const router = express.Router();

router.get(
  '/list',
  currentUser, 
  requireAuth,
  async (req: Request, res: Response) => {
    
    try {

      const companies = await Company.find();
      res.status(200).json(companies);
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing wents wrong', 'SCRL-001');
    
    }
    
  }
);

//Export the module
export { router as companyList };