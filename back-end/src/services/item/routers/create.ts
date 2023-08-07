import express, { Request, Response } from 'express';
import { validateRequest, BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { body } from 'express-validator';
import { ItemCompany } from '../../../models/items';
import { Company } from '../../../models/company';
import mongoose from 'mongoose';
import { requireManager } from '../../auth/middlewares/require-manager';
import { validateDecimal } from '../../../helpers/validations';
const router = express.Router();


//TODO: validate the name in the project is unique
router.post(
  '/create',
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


    body('companyId')
      .trim()
      .notEmpty()
      .withMessage('Must provide a valid Company')
      .custom(value => {

        if (!mongoose.Types.ObjectId.isValid(value))
          return Promise.reject('Company not exist')

        return Company.findById(value)
           .then((response) => {
            
              if (response == null)
                return Promise.reject('Company not exist')
           })
     }),

  ],
  validateRequest,
  currentUser, 
  requireManager,
  async (req: Request, res: Response) => {
    
    try {

      //Get body response
      const { name, description, price, companyId} = req.body;

      //Set and save the new project
      const item = new ItemCompany({
        name,
        description, 
        price,
        company: companyId
      });
      await item.save();
      
      //Response project created
      res.status(201).json(item);
    
    } catch (error) {
      console.log(error);
      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SIRC-001');

    
    }
    
  }
);

//Export the module
export { router as itemCreate };