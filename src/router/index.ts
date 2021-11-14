import { Router } from 'express';
import authRouter from './authRouter';
import usersRouter from './usersRouter';
import moviesRouter from './moviesRouter';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/movies', moviesRouter);

export default rootRouter;
