import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import { PORT } from './port.js';
import { API_PATH } from './api/path.js';
import { requestLogger } from './utils/requestLogger.js';
import { homeRouter } from './routers/homeRouter.js';
import { apiUsersRouter } from './routers/apiUsersRouter.js';

import * as MONGO from './mongodb/mongo.js';

const app = express();

app.enable('trust proxy');

app.use(requestLogger);

app.use('/', express.static('./static'));

app.set('view engine', 'pug');
app.use(homeRouter);

app.use(API_PATH, apiUsersRouter);

app.get('*', (req, res) => {
  res.status(404).end();
});

let server;

const shutdown = () => {
  console.log(colors.bgWhite.black('Closing http server...'));
  server.close(() => {
    console.log(colors.bgWhite.black('Http server closed successfully'));

    mongoose.connection.close(false, () => {
      console.log(colors.bgWhite.black('MongoDB connection closed successfully'));
      process.exit(0);
    });
  });
};

const start = async () => {
  try {
    await mongoose.connect(MONGO.URI, MONGO.OPTIONS);
    console.log(colors.bgGreen.black('MongoDB connection opened successfully'));

    server = app.listen(PORT, () => {
      console.log(colors.bgGreen.black(`Http server is listening on port ${PORT}...`));
    });

    process.on('SIGTERM', () => {
      console.info('SIGTERM signal received');
      shutdown();
    });

    process.on('SIGINT', () => {
      console.info('SIGINT signal received');
      shutdown();
    });
  } catch (err) {
    console.log(colors.bgRed.black(`${err}`));
  }
};

start();
