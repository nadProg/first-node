import express from 'express';
import { index, form } from '../controllers/homeControllers.js';

const homeRouter = express.Router();

homeRouter.get('/', index);
homeRouter.get('/form/:method?/:id?', form);

export { homeRouter };
