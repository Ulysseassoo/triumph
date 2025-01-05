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

  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  async findById(req: Request): Promise<User | null> {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByEmail(req: Request): Promise<User | null> {
    const { email } = req.params;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByName(req: Request): Promise<User | null> {
    const { name } = req.params;
    const user = await this.userService.findByName(name);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByRole(req: Request): Promise<User[]> {
    const { role } = req.params;
    return await this.userService.findByRole(role);
  }

  async findAllFilters(req: Request): Promise<User[]> {
    const filters = req.query.filters as any;
    const pagination = req.query.pagination as any;

    return await this.userService.findAllFilters({
      filters,
      pagination,
    });
  }
}