import express from 'express';
import config from './config';
import logger from './utils/logger';
import rootRouter from './router';
import { sequelize } from './database/models';

const app = express();

app.use(express.json());

app.use('/api/v1', rootRouter);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(`Connection has been established successfully.`);

    app.listen(config.APP_PORT, () => {
      logger.info(
        `Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}.`,
      );
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();

process.on('uncaughtException', (err, origin) => {
  logger.error(err);
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason);
});
