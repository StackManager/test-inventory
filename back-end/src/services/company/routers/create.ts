import express, { Request, Response } from 'express';
import { Company } from '../../../models/company';
import { validateRequest, BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { body } from 'express-validator';
import { requireManager } from '../../auth/middlewares/require-manager';
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
    
    body('address')
      .trim()
      .notEmpty()
      .withMessage('You must supply a address')
      .isLength({ min: 6, max: 255 })
      .withMessage('Check length address, between 6 - 255 characters'),

    body('nit')
      .isNumeric()
      .withMessage('Must provide a valid NIT')
      .isLength({ min: 9, max: 9 })
      .withMessage('Check length name, 9 characters')
      .custom(value => {
        return Company.findOne({nit: parseInt(value)})
           .then((response) => {
              if (response)
                return Promise.reject('NIT is registered')
           })
     }),

    body('phone')
      .isMobilePhone('en-US')
      .withMessage('Must provide a valid US phone number'),
  ],
  validateRequest,
  currentUser, 
  requireManager,
  async (req: Request, res: Response) => {
    
    try {

      //Get body response
      const { name, description, address, nit , phone } = req.body;

      //Set and save the new project
      const company = new Company({
        name,
        description, 
        nit: parseInt(nit),
        phone,
        address
      });
      await company.save();
      
      //Response project created
      res.status(201).json(company);
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SCRC-001');

    
    }
    
  }
);

//Export the module
export { router as companyCreate };