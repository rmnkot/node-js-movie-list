import { Request, Response } from 'express';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { generateAccessToken } from '../services/tokenService';
import { UserType } from '../data/fakeDB';
import { internalErrorResponse } from './helpers';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const candidate = storageService.users.find(email);

      if ((candidate as StorageError).error) {
        /* Positive case */
        const userId = storageService.users.create(email, password);

        res.status(201).json({ id: userId });
        return;
      }

      res.status(400).json({ error: 'Email is already in use' });
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const candidate = storageService.users.find(email, password);

      if ((candidate as StorageError).error) {
        res.status(404).json(candidate);
        return;
      }

      const { id, role } = candidate as UserType;

      const accessToken = generateAccessToken(id, role);

      res.json({ accessToken });
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }
}

export default new AuthController();
