import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { UserRepositoryInterface } from '../../../../../application/repositories/UserRepositoryInterface';
import { User } from '../../../../../domain/entities/user.entity';
import { UserMapper } from '../../../../database/mappers/user.mapper';

export class TypeOrmUserRepository implements UserRepositoryInterface {
  constructor(
    private readonly userRepository: Repository<UserOrmEntity>
  ) {}

  async create(user: User): Promise<User> {
    const ormUser = UserMapper.toOrmEntity(user);
    const savedUser = await this.userRepository.save(ormUser);
    return UserMapper.toDomainEntity(savedUser);
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne({ where: { id } });
    return ormUser ? UserMapper.toDomainEntity(ormUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne({ where: { email } });
    return ormUser ? UserMapper.toDomainEntity(ormUser) : null;
  }

  async findByName(name: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne({ where: { name } });
    return ormUser ? UserMapper.toDomainEntity(ormUser) : null;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.userRepository.find();
    return ormUsers.map(UserMapper.toDomainEntity);
  }

  async findByRole(role: string): Promise<User[]> {
    const ormUsers = await this.userRepository.find({
      where: { role: role }
    });
    return ormUsers.map(UserMapper.toDomainEntity);
  }

  async findAllFilters(criteria: object): Promise<User[]> {
    const ormUsers = await this.userRepository.find({
      where: criteria
    });
    return ormUsers.map(UserMapper.toDomainEntity);
  }

  async updatePatch(id: string, pieceData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, pieceData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    return UserMapper.toDomainEntity(updatedUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, UserMapper.toOrmEntity(userData as User));
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    return UserMapper.toDomainEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}