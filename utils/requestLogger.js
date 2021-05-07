import colors from 'colors';

export const requestLogger = (req, res, next) => {
  console.log(colors.green(`${req.method} request: ${new Date()}`));
  console.log(colors.yellow(`URL: ${req.url}`));
  next();
};
