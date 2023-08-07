import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';
import { getItem } from '../middlewares/item-id';

const router = express.Router();

router.get(
  '/:itemId',
  currentUser, 
  requireAuth,
  getItem,
  async (req: Request, res: Response) => {
    
    try {
      
      res.status(200).json(req.item);
    } catch (error) {
      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SIRR-001');
    
    }
    
  }
);

//Export the module
export { router as itemRead };