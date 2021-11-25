import { Request, Response } from 'express';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { generateAccessToken } from '../services/tokenService';
import { internalErrorResponse } from './helpers';
import { User } from '../database/models/user';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userId = await storageService.users.create(email, password);

      if ((userId as StorageError).error) {
        res.status(400);
      } else {
        res.status(201);
      }

      res.json(userId);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const candidate = await storageService.users.find(email, password);

      if ((candidate as StorageError).error) {
        res.status((candidate as StorageError).status!).json(candidate);
        return;
      }

      const { id, role } = candidate as User;

      const accessToken = generateAccessToken(id, role);

      res.json({ accessToken });
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }
}

export default new AuthController();
