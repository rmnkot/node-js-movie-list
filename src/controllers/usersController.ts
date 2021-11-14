import { Request, Response } from 'express';
import logger from '../utils/logger';

class UsersController {
  get = async (req: Request, res: Response) => {
    try {
      res.send('Get user');
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
