import express from 'express';
import { authController } from '../controllers/auth.controller';

const authRouter = express.Router();

// authRouter.post('/auth/register', authController.register.bind(authController));
// authRouter.post('/auth/login', authController.login.bind(authController));
// authRouter.post('/auth/refresh-token', authController.refreshToken.bind(authController));

export default authRouter;