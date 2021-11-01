import * as http from 'http';
import config from './config';
import logger from './utils/logger';
import Router from './router';
import { createMovieService } from './services/movieService';
import { createAuthService } from './services/authService';

http
  .createServer((req, res) => {
    new Router(req, res)
      .createRout('/login', createAuthService)
      .createRout('/movies', createMovieService)
      .serve();
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
