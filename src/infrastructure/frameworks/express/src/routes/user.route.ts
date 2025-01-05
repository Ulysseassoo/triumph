import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/users', async (req, res) => {
  try {
    const result = await userController.create(req, res);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.put('/users/:id', async (req, res) => {
  try {
    const result = await userController.update(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.patch('/users/:id', async (req, res) => {
  try {
    const result = await userController.updatePatch(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const result = await userController.delete(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users', async (req, res) => {
  try {
    const result = await userController.findAll(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users/filter', async (req, res) => {
  try {
    const result = await userController.findAllFilters(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users/:id', async (req, res) => {
  try {
    const result = await userController.findById(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users/email/:email', async (req, res) => {
  try {
    const result = await userController.findByEmail(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users/name/:name', async (req, res) => {
  try {
    const result = await userController.findByName(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

userRouter.get('/users/role/:role', async (req, res) => {
  try {
    const result = await userController.findByRole(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

export default userRouter;