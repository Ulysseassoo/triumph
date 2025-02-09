import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttemptOrmEntity } from '../../../../database/entities/attempt.orm-entity';
import {
  AttemptRepositoryInterface,
  AttemptFiltersType,
} from '../../../../../application/repositories/AttemptRepositoryInterface';
import { Attempt } from '../../../../../domain/entities/attempt.entity';
import { AttemptMapper } from '../../../../database/mappers/attempt.mapper';

@Injectable()
export class AttemptRepository implements AttemptRepositoryInterface {
  constructor(
    @InjectRepository(AttemptOrmEntity)
    private readonly attemptRepository: Repository<AttemptOrmEntity>,
  ) {}

  async findAll(filters?: AttemptFiltersType): Promise<Attempt[]> {
    try {
      const query: Record<string, unknown> = {};
      if (filters?.startDate) query.startDate = filters.startDate;
      if (filters?.endDate) query.endDate = filters?.endDate;
      if (filters?.startKilometer)
        query.startKilometer = filters?.startKilometer;
      if (filters?.endKilometer) query.endKilometer = filters?.endKilometer;
      if (filters?.status) query.status = filters?.status;

      const attempts = await this.attemptRepository.find({
        where: query,
        skip: filters?.pagination?.offset ?? 0,
        take: filters?.pagination?.limit ?? 10,
        relations: ['moto', 'driver', 'moto.maintenances'],
      });

      return attempts.map((attempt) => AttemptMapper.toDomainEntity(attempt));
    } catch (error) {
      console.error('Error fetching filtered attempts:', error);
      throw new Error(`Failed to fetch attempts: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Attempt> {
    try {
      const attempt = await this.attemptRepository.findOne({
        where: {
          id,
        },
        relations: ['moto', 'driver', 'moto.maintenances'],
      });
      return attempt ? AttemptMapper.toDomainEntity(attempt) : null;
    } catch (error) {
      throw error;
    }
  }

  async create(attempt: Attempt): Promise<Attempt> {
    try {
      const attemptOrm = AttemptMapper.toOrmEntity(attempt);
      const savedAttempt = await this.attemptRepository.save(attemptOrm);
      return AttemptMapper.toDomainEntity(savedAttempt);
    } catch (error) {
      console.error(
        `Error creating attempt with payloads : ${attempt}\n`,
        error,
      );
      throw new Error(`Failed to create attempt: ${error.message}`);
    }
  }

  async update(id: string, attemptData: Partial<Attempt>): Promise<Attempt> {
    try {
      const attempt = await this.attemptRepository.findOneBy({ id });
      if (!attempt) {
        throw new Error(`attempt with ID ${id} not found`);
      }

      const updatedData = AttemptMapper.toOrmEntity({
        ...AttemptMapper.toDomainEntity(attempt),
        ...attemptData,
      } as Attempt);

      await this.attemptRepository.save(updatedData);
      const updatedAttempt = await this.attemptRepository.findOneBy({ id });
      return AttemptMapper.toDomainEntity(updatedAttempt);
    } catch (error) {
      console.error('Error updating piece:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.attemptRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting attempt with id ${id} :`, error);
      throw error;
    }
  }
}
