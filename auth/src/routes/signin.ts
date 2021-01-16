import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlswares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      currentUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('invalid credentials');
    }

    // Genereate JWT
    const userJwt = jwt.sign(
      {
        id: currentUser.id,
        email: currentUser.email
      },

      process.env.JWT_KEY!
    );
    // Store it in session object
    req.session = {
      jwt: userJwt
    };

    res.send('Hi There!');
  }
);

export { router as signinRouter };
