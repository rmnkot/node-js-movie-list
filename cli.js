const logger = require('./logger');

const optionsTemplate = `Options list:
  --help:    |list of all available options
  -e:        |environment variable < -e development/production >
`;
const errorMessage = 'Invalid option';
const envMessage =
  'Please, provide either "development" or "production" as an environment value';

const envList = ['development', 'production'];

class Cli {
  _cliArgs;
  _flag;
  _value;
  env;

  constructor() {
    this._cliArgs = process.argv.slice(2);
    this._flag = this._cliArgs[0];
    this._value = this._cliArgs[1];
    this._init();
  }

  _processOptions = () => {
    const optionsMap = {
      '--help': () => {
        logger.warn(optionsTemplate);
        process.exit(1);
      },
      '-e': (value) => {
        if (!envList.includes(value)) {
          logger.warn(envMessage);
          process.exit(1);
        }
        this.env = value;
      },
    };

    optionsMap[this._flag](this._value);
  };

  _init = () => {
    try {
      this._flag && this._processOptions();
    } catch {
      logger.error(errorMessage);
      logger.warn(optionsTemplate);
      process.exit(1);
    }
  };
}

module.exports = new Cli();
