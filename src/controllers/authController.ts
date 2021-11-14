import { Request, Response } from 'express';
import logger from '../utils/logger';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { generateAccessToken } from '../services/tokenService';
import { UserType } from '../data/fakeDB';

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const candidate = storageService.users.find(email);

      if ((candidate as StorageError).error) {
        const user = storageService.users.create(email, password);

        res.status(201).json(user);
        return;
      }

      res.status(400).json({ result: false, error: 'Email is already in use' });
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };

  login = async (req: Request, res: Response) => {
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
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };
}

export default new AuthController();
