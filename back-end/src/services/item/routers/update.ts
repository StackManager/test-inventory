import express, { Request, Response } from 'express';
import { validateRequest, BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { body } from 'express-validator';
import { getItem } from '../middlewares/item-id';
import { requireManager } from '../../auth/middlewares/require-manager';
import { validateDecimal } from '../../../helpers/validations';

const router = express.Router();

router.put(
  '/:itemId',
  currentUser, 
  requireManager,
  getItem,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('You must supply a name')
      .isLength({ min: 6, max: 50 })
      .withMessage('Check length name, between 6 - 50 characters'),
    
    body('description')
      .trim()
      .notEmpty()
      .withMessage('You must supply a description')
      .isLength({ min: 6, max: 255 })
      .withMessage('Check length description, between 6 - 255 characters'),

    body('price')
      .trim()
      .notEmpty()
      .withMessage('You must supply a price')
      .isDecimal()
      .withMessage('Price must be a decimal number.')
      .custom(value => {
        if (!validateDecimal(value, 2))
          return Promise.reject('Price must have 2 decimal places.')
        return true
      }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    try {
      const { name, description, price} = req.body;
      Object.assign(req.item, {
        name,
        description, 
        price
      });
      await req.item.save();
      res.status(200).json(req.item);
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SIRU-002');
    
    }
    
  }
);

//Export the module
export { router as itemUpdate };