import { Request, Response } from 'express';
import logger from '../utils/logger';

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      res.send('Register');
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      res.send('Login');
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  };
}

export default new AuthController();
