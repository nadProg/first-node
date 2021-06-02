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

mongoose.connect(MONGO.URI, MONGO.OPTIONS)
  .then(() => {
    console.log(colors.bgGreen.black('MongoDB conntected successfully'));

    app.listen(PORT, () => {
      console.log(colors.bgGreen.black(`Server listening on port ${PORT}...`));
    });
  })
  .catch((err) => console.log(colors.bgRed.black(`${err}`)));
