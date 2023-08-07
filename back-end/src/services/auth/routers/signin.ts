import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../../../helpers/index';
import { User } from '../../../models/user';
import { validateRequest, BadRequestError } from '../../../helpers/index';

const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    const { email, password } = req.body;

    const userSession = await User.findOne({ email });
    
    if (!userSession) {
      throw new BadRequestError('Invalid credentials', '');
    }

    const passwordsMatch = await Password.compare(
      userSession.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials', '');
    }

    // Generate JWT
    const userJwt = jwt.sign({
        id: userSession.id,
        email: userSession.email,
        role: userSession.role
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send({user: userSession, token: userJwt});
  }
);

export { router as signinRouter };