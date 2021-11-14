import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/registration', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;
