import { NextFunction, Response } from 'express';
import { StorageError } from '../services/storageService/types';
import storageService from '../services/storageService';
import { verifyAccessToken } from '../services/tokenService';
import { RequestWithUser } from '../types';
import { Role, UserType } from '../data/fakeDB';

export const authorize = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next();
    return;
  }

  const authToken = authorization.split(' ')[1];

  const userPayload = verifyAccessToken(authToken);

  if (!userPayload) {
    res.status(422).json({ error: 'Invalid authorization token' });
    return;
  }

  const user = storageService.users.get(userPayload.id);

  if (!(user as StorageError).error) {
    req.user = user as UserType;
  }

  next();
};

export const adminAccess = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user?.role !== Role.admin) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  next();
};

export const userAccess = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
};
