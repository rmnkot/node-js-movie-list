import { Request, Response } from 'express';
import logger from '../utils/logger';
import storageService from '../services/storageService';

class UsersController {
  get = async (req: Request, res: Response) => {
    try {
      res.send('Get user');
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const users = storageService.users.getAll();

      res.json(users);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };

  setFavourite = async (req: Request, res: Response) => {
    try {
      res.send('Set favourite');
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };
}

export default new UsersController();
