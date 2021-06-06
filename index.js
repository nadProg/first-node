import express from 'express';
import mongoose from 'mongoose';
import {
  info, success, error, warn,
} from './utils/consoleMsg.js';
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
  info('Closing http server...');
  server.close(() => {
    success('Http server closed successfully');

    info('Closing MongoDB connection...');
    mongoose.connection.close(false, () => {
      success('MongoDB connection closed successfully');
      process.exit(0);
    });
  });
};

const start = async () => {
  try {
    await mongoose.connect(MONGO.URI, MONGO.OPTIONS);
    success('MongoDB connection opened successfully');

    server = app.listen(PORT, () => {
      success(`Http server is listening on port ${PORT}...`);
    });

    process.on('SIGTERM', () => {
      warn('SIGTERM signal received');
      shutdown();
    });

    process.on('SIGINT', () => {
      warn('SIGINT signal received');
      shutdown();
    });
  } catch (err) {
    error(`${err}`);
  }
};

start();
