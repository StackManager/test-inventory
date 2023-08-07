import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../helpers/index';
import { requireAuth } from '../../auth/middlewares/require-auth';
import { currentUser } from '../../auth/middlewares/current-user';
import { ItemCompany } from '../../../models/items';
import { getCompany } from '../../company/middlewares/company-id';
import ItemsPDF from '../utils/ItemsPDF';
import Mail from '../../../helpers/aws/Mail';


const router = express.Router();

router.get(
  '/list/company/:companyId/pdf/email',
  currentUser, 
  requireAuth,
  getCompany,
  async (req: Request, res: Response) => {
    
    try {
      
      // Send the email with the PDF attachment
      const items = await ItemCompany.find({company: req.params.companyId}).populate('company').exec();
      const pdfGenerator = new ItemsPDF(items);
      const pdfBuffer = await pdfGenerator.generate();
      const mail = new Mail(
        "managerstack.oficial@gmail.com",
        "List Items",
        "<p>This email contains a list with items</p>",
        ["managerstack.oficial@gmail.com"],
        { 
          filename: "attachment.pdf", 
          content: pdfBuffer 
        }
      );
      mail.send();      
      res.status(200).json({ message: 'Email sent successfully'});


    } catch (error) {
      console.log(error);
      //Response BadRequestError
      throw new BadRequestError('Somenthing wents wrong', 'SIRL-001');
    
    }
  }
);

//Export the module
export { router as itemEmailPDF };


/**

import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';
import PDFDocument from 'pdfkit';
import { Table } from 'pdfkit-table';

const router = express.Router();

router.post('/send-email', async (req: Request, res: Response) => {
  // Get the list of items from the request
  const items = req.body.items;

  // Create a new PDF document
  const doc = new PDFDocument();

  // Create a new table and set its properties
  const table = new Table(doc, { bottomMargin: 30 });
  table
    .addColumns(['Item', 'Quantity'])
    .addBody(
      items.map((item, index) => {
        return [`${index + 1}. ${item.name}`, item.quantity];
      })
    );

  // Pipe the PDF document to a buffer
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    doc.on('error', (error) => {
      reject(error);
    });
    table.draw();
    doc.end();
  });

  // Create a new SES instance
  const ses = new AWS.SES({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Create a new SES sendEmail request
  const params = {
    Destination: {
      ToAddresses: [process.env.TO_EMAIL_ADDRESS],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: 'This is a test email.',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'This is a test email.',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: process.env.FROM_EMAIL_ADDRESS,
    ReplyToAddresses: [process.env.REPLY_TO_EMAIL_ADDRESS],
    Content: {
      Data: buffer.toString('base64'),
      Charset: 'UTF-8',
    },
    ContentDisposition: 'attachment',
    ContentType: 'application/pdf',
    Filename: 'items.pdf',
  };

  try {
    // Send the email with the PDF attachment
    await ses.sendEmail(params).promise();

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;


 */