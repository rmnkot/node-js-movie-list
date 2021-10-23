const Cli = require('./cli');

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'development';

module.exports = {
  APP_PORT: process.env.APP_PORT || DEFAULT_PORT,
  ENV: Cli.env || DEFAULT_ENV,
};
