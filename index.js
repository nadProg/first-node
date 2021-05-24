import colors from 'colors';
import express from 'express';
import { PORT } from './port.js';
import { API_PATH } from './api/path.js';
import { requestLogger } from './utils/requestLogger.js';
import { homeRouter } from './routers/homeRouter.js';
import { apiUsersRouter } from './routers/apiUsersRouter.js';

import { mongoClient } from './mongodb/mongodb.js';

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

app.listen(PORT, () => {
  console.log(colors.bgGreen.black(`Server listening on port ${PORT}...`));
});

mongoClient.connect()
  .then((client) => {
    process.addListener('SIGINT', () => client.close());
    app.locals.collection = client.db('usersdb').collection('users');
  })
  .catch((err) => console.log(colors.bgRed.black(`${err}`)));
