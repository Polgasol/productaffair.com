// eslint-disable-next-line import/no-extraneous-dependencies
import { format, createLogger, transports } from 'winston';

const { timestamp, combine, printf, errors } = format;

const buildDevLogger = () => {
  // format ng log kung may kulay, ano ninformations to display sa printf.
  // eslint-disable-next-line no-shadow
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [new transports.Console()],
  });
};

export default buildDevLogger;
