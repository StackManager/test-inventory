import { sesConnect } from '.';
var nodemailer = require('nodemailer');


interface mail  {
  from: string;
  subject: string;
  html: string;
  to: string[];
  attachments: {
    filename: string;
    content: Buffer | undefined
  }
}

class Mail {

  mailOptions: mail;

  constructor(
    from: string, 
    subject: string, 
    html: string, 
    to: string[], 
    attachment: {
      filename: string, 
      content: Buffer | undefined
    }) 
  {
    this.mailOptions = {
      from: from,
      subject,
      html,
      to: to,
      attachments: attachment
    };
  }

  async send(){

    const transporter = nodemailer.createTransport({
      SES: sesConnect
    });
    
    await transporter.sendMail(this.mailOptions, (err: any, data: any) => {
      //console.log(err, data);
    });
  }
}

export default Mail;