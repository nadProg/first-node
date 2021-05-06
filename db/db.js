import path from 'path';
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import { _root } from '../_root.js';

const { writeFile, readFile, access } = fs;

export const db = {
  path: '',

  async init(localPath) {
    this.path = path.resolve(_root, localPath);
    return access(this.path).then(() => console.log('Database initialized successfully'.bgGreen.black));
  },

  async findAll() {
    return readFile(this.path)
      .then((data) => JSON.parse(data));
  },

  async find(id) {
    return readFile(this.path)
      .then((data) => JSON.parse(data))
      .then((items) => items.find((item) => item.id === id));
  },

  async create(data) {
    const newItem = {
      ...data,
      id: nanoid(),
    };

    return readFile(this.path)
      .then((data) => JSON.parse(data))
      .then((items) => items.concat([newItem]))
      .then((items) => writeFile(db.path, JSON.stringify(items)));
  },

  async update(newItem) {
    return readFile(this.path)
      .then((data) => JSON.parse(data))
      .then((items) => items.map((item) => (item.id === newItem.id ? newItem : item)))
      .then((items) => writeFile(db.path, JSON.stringify(items)));
  },

  async delete(id) {
    return readFile(db.path)
      .then((data) => JSON.parse(data))
      .then((items) => items.filter((item) => item.id !== id))
      .then((items) => writeFile(db.path, JSON.stringify(items)));
  },
};
