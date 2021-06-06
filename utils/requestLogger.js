import { info } from './consoleMsg.js';

export const requestLogger = (req, res, next) => {
  info('***');
  info(`${req.method} request: ${new Date()}`);
  info(`URL: ${req.url}`);
  next();
};
