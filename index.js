import colors from 'colors';
import express from 'express';
import { PORT } from './port.js';
import { API_PATH } from './api/path.js';
import { DB_PATH } from './db/path.js';
import { requestLogger } from './utils/requestLogger.js';
import { homeRouter } from './routers/homeRouter.js';
import { apiUsersRouter } from './routers/apiUsersRouter.js';
import { db } from './db/db.js';

const app = express();

app.use(requestLogger);

app.use('/', express.static('./static'));

app.set('view engine', 'pug');
app.use(homeRouter);

app.use(API_PATH, apiUsersRouter);

app.get('*', (req, res) => {
  res.status(404).end();
});

db.init(DB_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(colors.bgGreen.black(`Server listening on port ${PORT}...`));
    });
  }).catch((err) => console.log(colors.bgRed.black(`${err}`)));
