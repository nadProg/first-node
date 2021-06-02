import { User } from '../model/User.js';
import { errorHandler } from '../utils/errorHandler.js';

export const getAllUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.json(users))
    .catch(errorHandler(res));
};

export const getUser = ({ params: { id } }, res) => {
  User
    .findById(id)
    .then((user) => res.json(user))
    .catch(errorHandler(res));
};

export const createUser = ({ body: { age, name } }, res) => {
  User
    .create({ age, name })
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};

export const updateUser = ({ body: { id, age, name } }, res) => {
  User
    .findByIdAndUpdate(id, { age, name })
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};

export const deleteUser = ({ body: { id } }, res) => {
  User
    .findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};
