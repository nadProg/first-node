import colors from 'colors';

export default (req, res, next) => {
  console.log(`Request: ${new Date()}`.green);
  console.log(`URL: ${req.url}`.yellow);
  console.log(`method: ${req.method}`.yellow);
  console.log(`params:`.yellow);
  console.log(req.params);
  console.log(`query:`.yellow);
  console.log(req.query);
  next();
};
