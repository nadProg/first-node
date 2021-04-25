import path from 'path';
import axios from 'axios';
import express from 'express';
import { promises as fs } from 'fs';

import urlResolve from './utils/urlResolve.js';
import requestLogger from './module/request-logger.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(path.resolve(import.meta.url.substring(8)));

app.set('view engine', 'pug');

app.use(requestLogger);
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/api/users', (req, res) => {
  fs.readFile('./db/users.json')
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end(err.toString().split(',')[0]);
    });
});

app.get('/api/users/:id', (req, res) => {
  res.end('GET /api/users/:' + req.params.id);
});

app.post('/api/users/create', (req, res) => {
  res.end('CREATE /api/users');
});

app.put('/api/users/:id', (req, res) => {
  res.end('PUT /api/users/:' + req.params.id);
});

app.delete('/api/users/:id', (req, res) => {
  res.end('DELETE /api/users/:' + req.params.id);
});

app.get('/', (req, res) => {
  const API_PATH = '/api/users';
  axios
    .get(urlResolve(req, PORT, API_PATH))
    .then((apiResponse) => {
      res.render('index.pug', {
        title: 'Users list',
        users: apiResponse.data,
      });
    })
    .catch((err) => res.status(500).end());
});

app.get('/create', (req, res) => {
  fs.readFile('./db/users.json')
    .then((data) => {
      res.render('create.pug', {
        title: 'Create new user',
      });
    })
    .catch((err) => console.log(err));
});

app.get('*', (req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`.bgGreen.black);
  console.log(process);
});
