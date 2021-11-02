import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize({ colors: { info: 'cyan' }, all: true }),
        format.timestamp(),
        format.simple(),
      ),
    }),
    new transports.File({
      level: 'error',
      filename: 'error.log',
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});

export default logger;
