import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { requireManager } from '../../auth/middlewares/require-manager';
import { getItem } from '../middlewares/item-id';


const router = express.Router();

router.delete(
  '/:itemId',
  currentUser, 
  requireManager,
  getItem,
  async (req: Request, res: Response) => {
    
    try {

      await req.item?.remove();
      res.status(200).json({ message: 'Item deleted' });
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SIRD-001');
    
    }
    
  }
);

//Export the module
export { router as itemDelete };