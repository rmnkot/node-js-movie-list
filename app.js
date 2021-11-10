const http = require('http');
const logger = require('./logger');
const config = require('./config');

http
  .createServer((req, res) => {
    logger.log('New incoming request', req.url);

    res.writeHeader(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
  })
  .listen(config.APP_PORT, () =>
    logger.info(`Server is listening on port ${config.APP_PORT}. Env is ${config.ENV}.`),
  );
