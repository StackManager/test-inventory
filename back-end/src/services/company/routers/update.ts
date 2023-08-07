import express, { Request, Response } from 'express';
import { Company } from '../../../models/company';
import { validateRequest, BadRequestError } from '../../../helpers/index';
import { currentUser } from '../../auth/middlewares/current-user';
import { getCompany } from '../middlewares/company-id';
import { body } from 'express-validator';
import { requireManager } from '../../auth/middlewares/require-manager';

const router = express.Router();

router.put(
  '/:companyId',
  currentUser, 
  requireManager,
  getCompany,
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
      .custom((value, { req }) => {
        return Company.findOne({nit: parseInt(value)})
           .then((response: any) => {
            if (response == null || req.params?.companyId == response?._id.toString())
              return Promise.resolve();
            return Promise.reject('NIT is registered')
           })
     }),
    body('phone')
      .isMobilePhone('en-US')
      .withMessage('Must provide a valid US phone number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    try {
      const { name, description, address, nit , phone } = req.body;
      Object.assign(req.company, {
        name,
        description,
        nit: parseInt(nit),
        phone,
        address
      });
      await req.company.save();
      res.status(200).json(req.company);
    
    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing went wrong', 'SCRU-002');
    
    }
    
  }
);

//Export the module
export { router as companyUpdate };