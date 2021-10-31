import * as http from 'http';
import config from './config';
import logger from './utils/logger';
import createRouter from './router/routs';

http
  .createServer((req, res) => {
    createRouter(req, res);
  })
  .listen(config.APP_PORT, () => {
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}.`);
  });

process.on('uncaughtException', (err, origin) => {
  logger.error(err);
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason);
});
