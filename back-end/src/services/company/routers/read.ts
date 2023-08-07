import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { getCompany } from '../middlewares/company-id';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';

const router = express.Router();

router.get(
  '/:companyId',
  currentUser, 
  requireAuth,
  getCompany,
  async (req: Request, res: Response) => {
    
    try {
      
      res.status(200).json(req.company);
    } catch (error) {
      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SCRR-001');
    
    }
    
  }
);

//Export the module
export { router as companyRead };