import buildDevLogger from './devLogger';
import buildProdLogger from './prodLogger';

// eslint-disable-next-line import/no-mutable-exports
let logger: any = null;
if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
// error = 0
// warn = 1
// info = 2
// http = 3
// verbose = 4
// debug = 5
// silly = 6
