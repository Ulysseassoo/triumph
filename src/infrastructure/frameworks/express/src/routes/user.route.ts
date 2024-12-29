import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmUserRepository } from '../repositories/user.repository';

const router = Router();

// Initialize dependencies
const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Create routes
router.post('/users', async (req , res) => {
  try {
    const result = await userController.create(req, res);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error});
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await userController.findAll(req, res);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error});
  }
});

router.get('/users/:id', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
})

router.get('/users/email/:email', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
});

router.get('/users/name/:name', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    } 
});

router.get('/users/role/:role', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
});

router.put('/users/:id', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
});

router.patch('/users/:id',async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
      const users = await userController.findAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error});
    }
});

export default router;
