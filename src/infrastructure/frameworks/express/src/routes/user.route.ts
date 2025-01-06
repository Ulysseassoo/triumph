import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/users', async (req, res) => {
  try {
    const result = await userController.create(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Failed to create user',
    });
  }
});

userRouter.put('/users/:id', async (req, res) => {
  try {
    const result = await userController.update(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'Failed to update user',
    });
  }
});

userRouter.patch('/users/:id', async (req, res) => {
  try {
    const result = await userController.updatePatch(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'Failed to update user',
    });
  }
});

userRouter.delete('/users/:id', async (req, res) => {
  try {
    await userController.delete(req);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Failed to delete user',
    });
  }
});

userRouter.get('/users/:id', async (req, res) => {
  try {
    const result = await userController.findById(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'User not found',
    });
  }
});


export default userRouter;
