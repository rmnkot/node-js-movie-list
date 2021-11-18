import { Response } from 'express';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { RequestWithUser } from '../types';
import { internalErrorResponse } from './helpers';

class UsersController {
  async get(req: RequestWithUser, res: Response) {
    try {
      const {
        params: { user: userId },
      } = req;

      const user = storageService.users.get(userId);

      (user as StorageError).error && res.status(404);

      res.json(user);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async getAll(req: RequestWithUser, res: Response) {
    try {
      const users = storageService.users.getAll();

      res.json(users);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async setFavourite(req: RequestWithUser, res: Response) {
    try {
      const {
        body: { id, name },
        user: authorizedUser,
      } = req;

      const userId = authorizedUser!.id;

      const data = storageService.users.setFavourite(userId, { id, name });

      (data as StorageError).error && res.status(404);

      res.json({ favouriteMovies: data });
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }
}

export default new UsersController();
