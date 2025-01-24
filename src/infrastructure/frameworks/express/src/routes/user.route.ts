import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user.controller';
import { authConfig } from 'src/config/auth.config';
import { checkAuth, checkRole, AuthRequest } from '../middlewares/auth.middlewares';

const userRouter = express.Router();
const userController = new UserController();


userRouter.post('/users',
  checkAuth(authConfig.accessTokenSecret),
  checkRole(['staff']),
 (async (req: Request, res: Response) => {
  try {
    const result = await userController.create(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Failed to create user',
    });
  }
}));


userRouter.put('/users/:id',
  checkAuth(authConfig.accessTokenSecret),
  (async (req: AuthRequest, res: Response) => {
    try {
      const result = await userController.update(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : 'Failed to update user',
      });
    }
  })
);

userRouter.patch('/users/:id',
  checkAuth(authConfig.accessTokenSecret),
  checkRole(['staff']),
  (async (req: AuthRequest, res: Response) => {
    try {
      const result = await userController.updatePatch(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : 'Failed to update user',
      });
    }
  }) 
);

userRouter.delete('/users/:id',
  checkAuth(authConfig.accessTokenSecret),
  checkRole(['staff']),
  (async (req: AuthRequest, res: Response) => {
    try {
      await userController.delete(req);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete user',
      });
    }
  }) 
);

userRouter.get('/users/:id',
  checkAuth(authConfig.accessTokenSecret),
  checkRole(['staff','client']),
  (async (req: AuthRequest, res: Response) => {
    try {
      const result = await userController.findById(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : 'User not found',
      });
    }
  }) 
);

userRouter.get('/users',
  // checkAuth(authConfig.accessTokenSecret),
  // checkRole(['staff']),
  (async (req: AuthRequest, res: Response) => {
    try {
      const result = await userController.findAllFilters(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users',
        filters: req.query
      });
    }
  }) 
);

export default userRouter;