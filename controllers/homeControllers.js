import axios from 'axios';
import apiUrlResolve from '../api/urlResolve.js';
// import { API_PATH } from '../api/path.js';
import { errorHandler } from '../utils/errorHandler.js';

export const index = (req, res) => {
  axios
    .get(apiUrlResolve(req))
    .then((apiResponse) => res.render('index.pug', {
      title: 'User list',
      users: apiResponse.data,
    }))
    .catch(errorHandler(res));
};

export const form = (req, res) => {
  const action = apiUrlResolve(req);
  const { id, method } = req.params;

  new Promise((resolve) => {
    if (id) {
      return axios
        .get(`${action}/${id}`)
        .then(({ data }) => resolve(data));
    }

    return resolve({});
  }).then((user) => res.render('form.pug', {
    title: 'Edit form',
    method,
    action,
    ...user,
  })).catch(errorHandler(res));
};
