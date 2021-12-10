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

      const user = await storageService.users.get(Number(userId));

      (user as StorageError).error && res.status(404);

      res.json(user);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async getAll(req: RequestWithUser, res: Response) {
    try {
      const users = await storageService.users.getAll();

      res.json(users);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async setFavourite(req: RequestWithUser, res: Response) {
    try {
      const {
        body: { movie_id },
        user: authorizedUser,
      } = req;

      const userId = authorizedUser!.id;

      const data = await storageService.users.setFavourite(userId, movie_id);

      (data as StorageError).error && res.status(400);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }
}

export default new UsersController();
