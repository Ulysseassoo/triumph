import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrashOrmEntity } from '../../../../database/entities/crash.orm-entity';
import {
  CrashRepositoryInterface,
  CrashFiltersType,
} from '../../../../../application/repositories/CrashRepositoryInterface';
import { Crash } from '../../../../../domain/entities/crash.entity';
import { CrashMapper } from '../../../../database/mappers/crash.mapper';

@Injectable()
export class CrashRepository implements CrashRepositoryInterface {
  constructor(
    @InjectRepository(CrashOrmEntity)
    private readonly crashRepository: Repository<CrashOrmEntity>,
  ) {}

  async findAll(filters?: CrashFiltersType): Promise<Crash[]> {
    const { type, date, location, responsability, consequence, status } =
      filters;
    const { offset = 0, limit = 10 } = filters.pagination;

    try {
      const query: Record<string, unknown> = {};
      if (type) query.type = type;
      if (date) query.date = date;
      if (location) query.location = location;
      if (responsability) query.responsability = responsability;
      if (consequence) query.consequence = consequence;
      if (status) query.status = status;

      const crashes = await this.crashRepository.find({
        where: query,
        skip: offset,
        take: limit,
      });

      return crashes.map((crash) => CrashMapper.toDomainEntity(crash));
    } catch (error) {
      console.error('Error fetching filtered crashes:', error);
      throw new Error(`Failed to fetch crashes: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Crash> {
    try {
      const crash = await this.crashRepository.findOneBy({ id });
      return crash ? CrashMapper.toDomainEntity(crash) : null;
    } catch (error) {
      throw error;
    }
  }

  async create(crash: Crash): Promise<Crash> {
    try {
      const crashOrm = CrashMapper.toOrmEntity(crash);
      const savedCrash = await this.crashRepository.save(crashOrm);
      return CrashMapper.toDomainEntity(savedCrash);
    } catch (error) {
      console.error(`Error creating crash with payloads : ${crash}\n`, error);
      throw new Error(`Failed to create crash: ${error.message}`);
    }
  }

  async update(id: string, crashData: Partial<Crash>): Promise<Crash> {
    try {
      const crash = await this.crashRepository.findOneBy({ id });
      if (!crash) {
        throw new Error(`Crash with ID ${id} not found`);
      }

      const updatedData = CrashMapper.toOrmEntity({
        ...CrashMapper.toDomainEntity(crash),
        ...crashData,
      } as Crash);

      await this.crashRepository.save(updatedData);
      const updatedCrash = await this.crashRepository.findOneBy({ id });
      return CrashMapper.toDomainEntity(updatedCrash);
    } catch (error) {
      console.error('Error updating crash:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.crashRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting crash with id ${id} :`, error);
      throw error;
    }
  }
}
