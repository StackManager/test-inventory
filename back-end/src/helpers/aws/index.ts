import { SES } from 'aws-sdk';

export const sesConnect = new SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  correctClockSkew: true
});