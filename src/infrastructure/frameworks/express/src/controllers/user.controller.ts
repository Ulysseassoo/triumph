import { Request } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../../../../../domain/entities/user.entity';
import { TypeOrmUserRepository } from 'src/repositories/user.repository';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = new TypeOrmUserRepository();
    this.userService = new UserService(userRepository);
  }

  async create(req: Request): Promise<User | null > {
    const { name, email, password, passwordValidUntil, isVerified, role } = req.body;

    return await this.userService.create(
      name,
      email,
      password,
      passwordValidUntil,
      isVerified,
      role
    );
  }

  async update(req: Request): Promise<User | null> {
    const { id } = req.params;
    const userData: Partial<User> = req.body;
    const updatedUser = await this.userService.update(id, userData);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async updatePatch(req: Request): Promise<User | null> {
    const { id } = req.params;
    const userData: Partial<User> = req.body;

    const updatedUser = await this.userService.updatePatch(id, userData);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(req: Request): Promise<void> {
    const { id } = req.params;
    await this.userService.delete(id);
  }

  async findById(req: Request): Promise<User | null> {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

async findAllFilters(req: Request): Promise<User[]> {
 
    if (Object.keys(req.query).length === 0) {
        return await this.userService.findAll();
    }

    
    const filters: {
        name?: string;
        email?: string;
        role?: string[];
        isVerified?: boolean;
    } = req.query as any;

    const pagination = {
        offset: parseInt(req.query.offset as string) || 0,
        limit: parseInt(req.query.limit as string) || 10,
    };

    return await this.userService.findAllFilters({
        filters,
        pagination,
    });
  }
}