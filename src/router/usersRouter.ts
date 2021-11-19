import { Router } from 'express';
import { param } from 'express-validator';
import usersController from '../controllers/usersController';
import { authorize, userAccess, adminAccess } from '../middleware/authMiddleware';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';
import { Role } from '../data/fakeDB';
import { RequestWithUser } from '../types';

const usersRouter = Router();

usersRouter.use(authorize, userAccess);

usersRouter.param('user', (req, res, next, userId) => {
  const { user: authorizedUser } = req as RequestWithUser;

  if (userId !== authorizedUser?.id && authorizedUser?.role !== Role.admin) {
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
  param('user', validationMessage.invalid('userId')).isUUID(4),
  validate,
  usersController.get,
);

/* Auth */
usersRouter.patch('/favourite', usersController.setFavourite);

export default usersRouter;
