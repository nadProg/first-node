import { error } from './consoleMsg.js';

export const errorHandler = (res) => (err) => {
  error(`${err}`.bgRed.black);

  const code = err.statusCode;
  if (code >= 400 && code < 500) {
    res.status(code).end(err.message);
  } else {
    res.status(500).end();
  }
};
