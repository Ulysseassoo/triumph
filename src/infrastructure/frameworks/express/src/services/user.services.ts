import { UserRepositoryInterface } from '../../../../../application/repositories/UserRepositoryInterface';
import { User } from '../../../../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../../../../application/usecases/user/CreateUserUseCase';
import { UpdateUserUseCase } from '../../../../../application/usecases/user/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../../../../application/usecases/user/DeleteUserUseCase';

export class UserService {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
    passwordValidUntil: Date,
    isVerified: boolean,
    role: string[]
  ): Promise<User | null> {
    const createUserUseCase = new CreateUserUseCase(this.userRepository);
    
    return await createUserUseCase.execute({
      name,
      email,
      password,
      passwordValidUntil,
      isVerified,
      role
    });
  }

  async update(
    id: string,
    userData: Partial<User>
  ): Promise<User | null> {
    const updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    return await updateUserUseCase.execute({
      id,
      ...userData
    });
  }

  async updatePatch(
    id: string,
    userData: Partial<User>
  ): Promise<User | null> {
    const updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    return await updateUserUseCase.execute({
      id,
      ...userData
    });
  }

  async delete(id: string): Promise<void> {
    const deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
    await deleteUserUseCase.execute({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findByName(name: string): Promise<User | null> {
    return await this.userRepository.findByName(name);
  }

  async findByRole(role: string): Promise<User[]> {
    return await this.userRepository.findByRole(role);
  }

  async findAllFilters(criteria: {
    filters?: {
      name?: string;
      email?: string;
      role?: string[];
      isVerified?: boolean;
    };
    pagination?: {
      offset?: number;
      limit?: number;
    };
  }): Promise<User[]> {
    return await this.userRepository.findAllFilters(criteria);
  }
}