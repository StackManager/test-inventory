import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';
import { ItemCompany } from '../../../models/items';
import { getCompany } from '../../company/middlewares/company-id';
import ItemsPDF from '../utils/ItemsPDF';

//const ArticuloPDFGenerator = require('./articuloPDFGenerator');

const router = express.Router();

router.get(
  '/list/company/:companyId/pdf',
  currentUser, 
  requireAuth,
  getCompany,
  async (req: Request, res: Response) => {
    
    try {
      
      const items = await ItemCompany.find({company: req.params.companyId}).populate('company').exec();
      const pdfGenerator = new ItemsPDF(items);
      const pdfBuffer = await pdfGenerator.generate();
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'attachment; filename=lista-de-articulos.pdf');
      res.send(pdfBuffer);


    } catch (error) {

      //Response BadRequestError
      throw new BadRequestError('Somenthing wents wrong', 'SIRL-001');
    
    }
    
  }
);

//Export the module
export { router as itemGetPDF };