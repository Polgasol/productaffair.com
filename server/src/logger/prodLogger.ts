// eslint-disable-next-line import/no-extraneous-dependencies
import { format, createLogger, transports } from 'winston';

const { timestamp, combine, errors, json } = format;

const buildProdLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};

export default buildProdLogger;
