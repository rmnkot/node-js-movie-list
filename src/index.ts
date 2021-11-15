import express from 'express';
import config from './config';
import logger from './utils/logger';
import router from './router/router';

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(config.APP_PORT, () => {
  logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}.`);
});

process.on('uncaughtException', (err, origin) => {
  logger.error(err);
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason);
});
