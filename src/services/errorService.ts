import { ServerResponse } from 'http';
import logger from '../utils/logger';

export const createValidationError = (
  res: ServerResponse,
  path: string,
  message: string,
) => {
  logger.error(`path: ${path}, message: ${message}`);
  res.writeHead(422, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: { path, message } }));
};

export const createNotFoundError = (res: ServerResponse) => {
  logger.error('Not Found: 404');
  res.statusCode = 404;
  res.end();
};
