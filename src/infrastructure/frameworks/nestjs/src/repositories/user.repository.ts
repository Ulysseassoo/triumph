import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../../../../application/repositories/UserRepositoryInterface';
import { User } from '../../../../../domain/entities/user.entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { UserMapper } from '../../../../database/mappers/user.mapper';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>
  ) {}
  async findAllFilters(criteria: object): Promise<User[]> {
    try {
      const ormUsers = await this.userRepository.find({
        where: criteria,
      });
      return ormUsers.map(UserMapper.toDomainEntity);
    } catch (error) {
      console.error('Error finding users with filters:', error);
      throw error;
    }
  }

  async updatePatch(id: string, pieceData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneBy({ id });
      if (!existingUser) {
        throw new Error('User not found');
      }

      const ormPieceData = Object.keys(pieceData).reduce((acc, key) => {
        if (pieceData[key] !== undefined) {
          acc[key] = pieceData[key];
        }
        return acc;
      }, {});

      await this.userRepository.update(id, ormPieceData);

      const updatedUser = await this.userRepository.findOneBy({ id });
      if (!updatedUser) {
        throw new Error('Failed to retrieve updated user');
      }

      return UserMapper.toDomainEntity(updatedUser);
    } catch (error) {
      console.error('Error patching user:', error);
      throw error;
    }
  }

  async getUserValidate(email: string, password: string): Promise<User | null> {
    try {
      
      
      const ormUser = await this.userRepository.findOne({
        where: {
          email: email,
          password: password 
          
        }
      });

      if (!ormUser) {
        return null;
      }

      return UserMapper.toDomainEntity(ormUser);
    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const ormUser = UserMapper.toOrmEntity(user);
      const savedUser = await this.userRepository.save(ormUser);
      return UserMapper.toDomainEntity(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const ormUser = await this.userRepository.findOneBy({ id });
      return ormUser ? UserMapper.toDomainEntity(ormUser) : null;
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const ormUser = await this.userRepository.findOneBy({ email });
      return ormUser ? UserMapper.toDomainEntity(ormUser) : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const ormUsers = await this.userRepository.find();
      return ormUsers.map(UserMapper.toDomainEntity);
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      await this.userRepository.update(id, userData);
      const updatedUser = await this.userRepository.findOneBy({ id });
      return updatedUser ? UserMapper.toDomainEntity(updatedUser) : null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}