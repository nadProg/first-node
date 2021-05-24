import mongodb from 'mongodb';
import { errorHandler } from '../utils/errorHandler.js';

const { ObjectID } = mongodb;

export const getAllUsers = ({ app: { locals: { collection } } }, res) => {
  collection
    .find()
    .toArray()
    .then((users) => res.json(users))
    .catch(errorHandler(res));
};

export const getUser = ({ params: { id }, app: { locals: { collection } } }, res) => {
  collection
    .findOne({ _id: new ObjectID(id) })
    .then((user) => res.json(user))
    .catch(errorHandler(res));
};

export const createUser = ({ body: { age, name }, app: { locals: { collection } } }, res) => {
  collection
    .insertOne({ age, name })
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};

export const updateUser = ({ body: { id, age, name }, app: { locals: { collection } } }, res) => {
  collection
    .findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { age, name } })
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};

export const deleteUser = ({ body: { id }, app: { locals: { collection } } }, res) => {
  collection
    .deleteOne({ _id: new ObjectID(id) })
    .then(() => res.status(204).end())
    .catch(errorHandler(res));
};
