import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { getCompany } from '../middlewares/company-id';
import { requireManager } from '../../auth/middlewares/require-manager';

const router = express.Router();


router.delete(
  '/:companyId',
  currentUser, 
  requireManager,
  getCompany,
  async (req: Request, res: Response) => {
    
    try {

      await req.company?.remove();
      res.status(200).json({ message: 'Company deleted' });
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SCRD-001');
    
    }
    
  }
);

//Export the module
export { router as companyDelete };