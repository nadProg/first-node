import express from 'express';
import multer from 'multer';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/apiUsersControllers.js';

const apiUsersRouter = express.Router();

apiUsersRouter.use(multer().none());

apiUsersRouter.get('/', getAllUsers);
apiUsersRouter.get('/:id', getUser);
apiUsersRouter.post('/', createUser);
apiUsersRouter.put('/', updateUser);
apiUsersRouter.delete('/', deleteUser);

export { apiUsersRouter };
