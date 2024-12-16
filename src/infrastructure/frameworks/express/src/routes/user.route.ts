import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();
const userController = new UserController(); 


userRouter.post('/users', userController.createUser.bind(userController));

userRouter.get('/users', userController.getAllUsers.bind(userController));


userRouter.get('/users/:id', userController.getUserById.bind(userController));


userRouter.get('/users/email/:email', userController.getUserByEmail.bind(userController));

userRouter.put('/users/:id', userController.updateUser.bind(userController));

userRouter.patch('/users/:id', userController.patchUser.bind(userController));

userRouter.delete('/users/:id', userController.deleteUser.bind(userController));


userRouter.get('/users/filters', userController.getFilteredUsers.bind(userController));

export default userRouter;
