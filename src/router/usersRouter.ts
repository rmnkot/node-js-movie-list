import { Router } from 'express';
import usersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:user', usersController.get);
usersRouter.patch('/favourite', usersController.setFavourite);

export default usersRouter;
