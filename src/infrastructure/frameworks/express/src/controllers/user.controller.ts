// src/infrastructure/controllers/user.controller.ts
import { Request, Response } from 'express';
import { TypeOrmUserRepository } from '@infrastructure/database/repositories/user.repository';
import { User } from '@domain/entities/user.entity';

export class UserController {
    private userRepository: TypeOrmUserRepository;

    constructor() {
        this.userRepository = new TypeOrmUserRepository();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: User = req.body;
            const newUser = await this.userRepository.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const user = await this.userRepository.findByEmail(email);
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            const user = await this.userRepository.findByName(name);
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsersByRole(req: Request, res: Response): Promise<void> {
        try {
            const { role } = req.params;
            const users = await this.userRepository.findByRole(role);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getFilteredUsers(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, role, offset, limit } = req.query;
            const users = await this.userRepository.findAllFilters({
                filters: { name: name as string, email: email as string, role: role as string },
                pagination: { 
                    offset: offset ? parseInt(offset as string) : undefined, 
                    limit: limit ? parseInt(limit as string) : undefined 
                }
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData: Partial<User> = req.body;
            const updatedUser = await this.userRepository.update(id, userData);
            updatedUser ? res.json(updatedUser) : res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async patchUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData: Partial<User> = req.body;
            const updatedUser = await this.userRepository.updatePatch(id, userData);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.userRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userRepository.findById(id);
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userRepository.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async validateUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.getUserValidate(email, password);
            user 
                ? res.json({ message: 'User validated successfully', user }) 
                : res.status(401).json({ message: 'Invalid credentials' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}