import path from 'path';
import { default as HTTPError } from 'http-errors';
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import { _root } from '../_root.js';

const { writeFile, readFile, access } = fs;

export const db = {
  path: '',

  async init(localPath) {
    this.path = path.resolve(_root, localPath);
    try {
      await access(this.path);
      console.log('Connected to database successfully'.bgGreen.black);
    } catch (error) {
      if (error.code === 'ENOENT') {
        writeFile(this.path, JSON.stringify([]));
        console.log('Empty database created successfully'.bgGreen.black);
      } else {
        throw new Error(error);
      }
    }
  },

  async findAll() {
    return JSON.parse(await readFile(this.path));
  },

  findIndex(items, id) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new HTTPError(400, 'No such id');

    return index;
  },

  async find(id) {
    const items = await this.findAll();
    const index = this.findIndex(items, id);
    return items[index];
  },

  async create(data) {
    const newItem = {
      ...data,
      id: nanoid(),
    };

    let items = await this.findAll();
    items = items.concat([newItem]);

    return this.updateFile(items);
  },

  async update(newItem) {
    const items = await this.findAll();
    const index = this.findIndex(items, newItem.id);

    items[index] = newItem;

    return this.updateFile(items);
  },

  async delete(id) {
    const items = await this.findAll();
    const index = this.findIndex(items, id);

    items.splice(index, 1);

    return this.updateFile(items);
  },

  async updateFile(items) {
    return writeFile(db.path, JSON.stringify(items));
  },
};
