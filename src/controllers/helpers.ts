import { Response } from 'express';
import logger from '../utils/logger';

export const internalErrorResponse = (error: unknown, res: Response) => {
  logger.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};
