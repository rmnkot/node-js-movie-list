import { IncomingMessage } from 'http';
import logger from '../utils/logger';

export const processRequest = async (request: IncomingMessage) => {
  const result = await new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];
    let body: string;

    request
      .on('error', (err) => {
        logger.error(err);
        reject(err);
      })
      .on('data', (chunk: Buffer) => {
        buffer.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(buffer).toString();
        resolve(body);
      });
  });

  return { body: result };
};
