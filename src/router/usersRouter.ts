import { Router } from 'express';
import { param, body } from 'express-validator';
import usersController from '../controllers/usersController';
import { authorize, userAccess, adminAccess } from '../middleware/authMiddleware';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';
import { RequestWithUser } from '../types';
import { Role } from '../database/models/user';

const usersRouter = Router();

usersRouter.use(authorize, userAccess);

usersRouter.param('user', (req, res, next, userId: string) => {
  const { user: authorizedUser } = req as RequestWithUser;

  if (Number(userId) !== authorizedUser?.id && authorizedUser?.role !== Role.admin) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
});

/* AdminOnly */
usersRouter.get('/', adminAccess, usersController.getAll);

/* Admin, Auth */
usersRouter.get(
  '/:user',
  param('user', validationMessage.invalid('userId')).isInt(),
  validate,
  usersController.get,
);

/* Auth */
usersRouter.post(
  '/favourite',
  body('movie_id', validationMessage.required('movie_id')).isInt(),
  validate,
  usersController.setFavourite,
);

export default usersRouter;
