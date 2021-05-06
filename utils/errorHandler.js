export const errorHandler = (res) => (err) => {
  console.log(`${err}`.bgRed.black);
  res.status(500).end(err.toString().split(',')[0]);
};