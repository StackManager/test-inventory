import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../../../helpers/index';
import { User } from '../../../models/user';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),

    body('role')
    .trim()
    .isIn(['consultor', 'manager'])
    .withMessage('Role is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use', '');
    }

    const user = User.build({
      email, 
      password,
      role
    });
    await user.save();

    
    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_KEY!
    );
    
    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send({user: user, token: userJwt});
  }
);

export { router as signupRouter };
