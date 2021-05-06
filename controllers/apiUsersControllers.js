import { db } from '../db/db.js';
import { errorHandler } from '../utils/errorHandler.js';

export const getAllUsers = (req, res) => {
  db.findAll()
    .then((users) => res.json(users))
    .catch(errorHandler(res));
};

export const getUser = ({ params: { id } }, res) => {
  db.find(id)
    .then((user) => res.json(user))
    .catch(errorHandler(res));
};

export const createUser = ({ body }, res) => {
  db.create({ ...body })
    .then(() => res.status(201).end())
    .catch(errorHandler(res));
};

export const updateUser = ({ body }, res) => {
  db.update({ ...body })
    .then(() => res.status(201).end())
    .catch(errorHandler(res));
};

export const deleteUser = ({ body: { id } }, res) => {
  db.delete(id)
    .then(() => res.status(201).end())
    .catch(errorHandler(res));
};
