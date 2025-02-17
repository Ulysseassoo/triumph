import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../../../../application/repositories/UserRepositoryInterface';
import { User } from '../../../../../domain/entities/user.entity';
import { QueryFailedError } from 'typeorm';
import { authConfig } from '../config/auth.config';
import argon2 from '@node-rs/argon2';
import { UserMapper } from '../../../../database/mappers/user.mapper';
import { AppDataSource } from '../../../../orm/typeorm/data-source';

export class TypeOrmUserRepository implements UserRepositoryInterface {
  private userRepository: Repository<UserOrmEntity>;

  constructor() {
    this.userRepository = AppDataSource().getRepository(UserOrmEntity);
  }

  async create(user: User): Promise<User> {
    const queryRunner = AppDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await argon2.hash(user.password, authConfig.hashOptions);
      const userWithHashedPassword = new User(
        user.id,
        user.name,
        user.email,
        hashedPassword,
        user.isVerified,
        user.role
      );
      const userEntity = UserMapper.toOrmEntity(userWithHashedPassword);
      const savedUser = await this.userRepository.save(userEntity);
      await queryRunner.commitTransaction();

      return UserMapper.toDomainEntity(savedUser);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof QueryFailedError) {
        if (error.message.includes('unique constraint')) {
          throw new Error('User with this email already exists');
        }
      }
      throw new Error(`Error creating user: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }
  

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user ? UserMapper.toDomainEntity(user) : null;
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return user ? UserMapper.toDomainEntity(user) : null;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error}`);
    }
  }

  async findByName(name: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ name });
      return user ? UserMapper.toDomainEntity(user) : null;
    } catch (error) {
      throw new Error(`Error finding user by name: ${error}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users.map(user => UserMapper.toDomainEntity(user));
    } catch (error) {
      throw new Error(`Error finding all users: ${error}`);
    }
  }

  async findByRole(role: string): Promise<User[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('user.role = :role', { role })
        .getMany();

      return users.map(user => UserMapper.toDomainEntity(user));
    } catch (error) {
      throw new Error(`Error finding users by role: ${error}`);
    }
  }

  async findAllFilters(criteria: {
    filters?: {
      name?: string;
      email?: string;
      role?: string;
    };
    pagination?: {
      offset?: number;
      limit?: number;
    };
  }): Promise<User[]> {
    try {
      const { filters = {}, pagination = {} } = criteria;
      const { name, email, role } = filters;
      const { offset = 0, limit = 10 } = pagination;

      let queryBuilder = this.userRepository.createQueryBuilder('user');

      if (name) {
        queryBuilder = queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
      }

      if (email) {
        queryBuilder = queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
      }

      if (role) {
        queryBuilder = queryBuilder.andWhere('user.role = :role', { role });
      }

      const users = await queryBuilder
        .skip(offset)
        .take(limit)
        .getMany();

      return users.map(user => UserMapper.toDomainEntity(user));
    } catch (error) {
      throw new Error(`Error finding filtered users: ${error}`);
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const queryRunner = AppDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let hashedPassword: string | undefined;
      if (userData.password) {
        hashedPassword = await argon2.hash(userData.password, authConfig.hashOptions);
      }

      const updateData = {
        ...userData,
        ...(hashedPassword && { password: hashedPassword }),

      };

      await this.userRepository.update(id, updateData);
      const updatedUser = await this.userRepository.findOneBy({ id });

      if (!updatedUser) {
        throw new Error('User not found after update');
      }

      await queryRunner.commitTransaction();
      return UserMapper.toDomainEntity(updatedUser);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error updating user: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updatePatch(id: string, userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneBy({ id });
      if (!existingUser) {
        throw new Error(`User with ID ${id} not found`);
      }

      let hashedPassword: string | undefined;
      if (userData.password) {
        hashedPassword = await argon2.hash(userData.password, authConfig.hashOptions);
      }

      const updateData = {
        ...userData,
        ...(hashedPassword && { password: hashedPassword }),

      };

      await this.userRepository.update(id, updateData);
      const updatedUser = await this.userRepository.findOneBy({ id });

      if (!updatedUser) {
        throw new Error('User not found after patch update');
      }

      return UserMapper.toDomainEntity(updatedUser);
    } catch (error) {
      throw new Error(`Error patching user: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    const queryRunner = AppDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('User not found');
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error deleting user: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }
  async isEmailUnique(email: string): Promise<boolean> {
    try {
      
      const sqlUser = await this.userRepository.findOneBy({ email });

      return !sqlUser;
    } catch (error) {
      throw new Error('Error checking email uniqueness');
    }
  }
  

  async getUserValidate(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.findByEmail(email);
      console.log("🚀 ~ TypeOrmUserRepository ~ getUserValidate ~ user:", user)
      if (!user) {
        throw new Error ('User not found');

      };

      const isPasswordValid = await argon2.verify(user.password, password);
     
      return isPasswordValid ? user : null;
    } catch (error) {
      console.error('User validation error:', error);
      throw new Error ('User validation error');
    }
  }
}