import * as http from 'http';
import config from './config';
import logger from './logger';

http
  .createServer((req, res) => {
    logger.log('New incoming request', req.url);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
  })
  .listen(config.APP_PORT, () => {
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}.`);
  });
