import { Router } from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/:user', UsersController.get);
usersRouter.patch('/favourite', UsersController.setFavourite);

export default usersRouter;
