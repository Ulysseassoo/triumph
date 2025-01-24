import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { checkAuth, checkRole } from '../middlewares/auth.middlewares';
import { authConfig } from 'src/config/auth.config';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/auth/register', async (req, res) => {
  try {
    const result = await authController.register(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Failed to register user',
    });
  }
});

authRouter.post('/auth/login', async (req, res) => {
  try {
    const result = await authController.login(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : 'Failed to login',
    });
  }
});

authRouter.post('/auth/refresh-token',
  checkRole(['staff','client']),
  async (req, res) => {
  try {
    const result = await authController.refreshToken(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : 'Failed to refresh token',
    });
  }
});


export default authRouter;