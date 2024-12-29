
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../../../../../domain/entities/user.entity';

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password, passwordValidUntil, isVerified, role } = req.body;

      const user = await this.userService.create(
        name,
        email,
        password,
        passwordValidUntil,
        isVerified,
        role
      );

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to create user'
      });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const userData: Partial<User> = req.body;

      const updatedUser = await this.userService.update(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update user'
      });
    }
  };

  updatePatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const userData: Partial<User> = req.body;

      const updatedUser = await this.userService.updatePatch(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update user'
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete user'
      });
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users'
      });
    }
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to fetch user'
      });
    }
  };

  findByEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.params;
      const user = await this.userService.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to fetch user'
      });
    }
  };

  findByName = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name } = req.params;
      const user = await this.userService.findByName(name);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to fetch user'
      });
    }
  };

  findByRole = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { role } = req.params;
      const users = await this.userService.findByRole(role);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users'
      });
    }
  };

  findAllFilters = async (req: Request, res: Response): Promise<Response> => {
    try {
      const filters = req.query.filters as any;
      const pagination = req.query.pagination as any;
      
      const users = await this.userService.findAllFilters({
        filters,
        pagination
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users'
      });
    }
  };
}