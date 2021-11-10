import { IncomingMessage } from 'http';
import logger from '../utils/logger';

export const processRequest = async (request: IncomingMessage) => {
  const body = await new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];

    request
      .on('error', (err) => {
        logger.error(err);
        reject(err);
      })
      .on('data', (chunk: Buffer) => {
        buffer.push(chunk);
      })
      .on('end', () => {
        resolve(Buffer.concat(buffer).toString());
      });
  });

  return { body };
};
