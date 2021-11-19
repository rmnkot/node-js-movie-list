import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';

const authRouter = Router();

authRouter.post(
  '/registration',
  body('email', validationMessage.invalid('email')).isEmail(),
  body('password', validationMessage.minLength('password', { min: 5 })).isLength({
    min: 5,
  }),
  validate,
  authController.register,
);

authRouter.post(
  '/login',
  body('email', validationMessage.required('email')).notEmpty(),
  body('password', validationMessage.required('password')).notEmpty(),
  validate,
  authController.login,
);

export default authRouter;
