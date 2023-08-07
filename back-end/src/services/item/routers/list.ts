import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';
import { ItemCompany } from '../../../models/items';
import { getCompany } from '../../company/middlewares/company-id';

const router = express.Router();

router.get(
  '/list/company/:companyId',
  currentUser, 
  requireAuth,
  getCompany,
  async (req: Request, res: Response) => {
    
    try {
      
      const items = await ItemCompany.find({company: req.params.companyId});
      res.status(200).json(items);
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing wents wrong', 'SIRL-001');
    
    }
    
  }
);

//Export the module
export { router as itemList };