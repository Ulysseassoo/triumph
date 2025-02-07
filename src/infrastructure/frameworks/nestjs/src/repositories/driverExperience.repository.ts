import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverExperienceOrmEntity } from '../../../../database/entities/driverExperience.orm-entity';
import {
  DriverExperienceRepositoryInterface,
  DriverExperienceFiltersType,
} from '../../../../../application/repositories/DriverExperienceRepositoryInterface';
import { DriverExperience } from '../../../../../domain/entities/driverExperience.entity';
import { DriverExperienceMapper } from '../../../../database/mappers/driverExperience.mapper';

@Injectable()
export class DriverExperienceRepository
  implements DriverExperienceRepositoryInterface
{
  constructor(
    @InjectRepository(DriverExperienceOrmEntity)
    private readonly driverExperienceRepository: Repository<DriverExperienceOrmEntity>,
  ) {}

  async findAll(
    filters?: DriverExperienceFiltersType,
  ): Promise<DriverExperience[]> {
    const { duration, type, rented, professional, feedback } = filters;
    const { offset = 0, limit = 10 } = filters.pagination;

    try {
      const query: Record<string, unknown> = {};
      if (duration) query.duration = duration;
      if (type) query.type = type;
      if (rented) query.rented = rented;
      if (professional) query.professional = professional;
      if (feedback) query.feedback = feedback;

      const driverExperiences = await this.driverExperienceRepository.find({
        where: query,
        skip: offset,
        take: limit,
      });

      return driverExperiences.map((driverExperience) =>
        DriverExperienceMapper.toDomainEntity(driverExperience),
      );
    } catch (error) {
      console.error('Error fetching filtered driver experiences:', error);
      throw new Error(`Failed to fetch driver experiences: ${error.message}`);
    }
  }

  async findById(id: string): Promise<DriverExperience | null> {
    try {
      const driverExperience = await this.driverExperienceRepository.findOneBy({
        id,
      });
      return driverExperience
        ? DriverExperienceMapper.toDomainEntity(driverExperience)
        : null;
    } catch (error) {
      throw error;
    }
  }

  async create(driverExperience: DriverExperience): Promise<DriverExperience> {
    try {
      const driverExperienceOrm =
        DriverExperienceMapper.toOrmEntity(driverExperience);
      const savedDriverExperience =
        await this.driverExperienceRepository.save(driverExperienceOrm);
      return DriverExperienceMapper.toDomainEntity(savedDriverExperience);
    } catch (error) {
      console.error(
        `Error creating driver experience with payloads: ${driverExperience}\n`,
        error,
      );
      throw new Error(`Failed to create driver experience: ${error.message}`);
    }
  }

  async update(
    id: string,
    driverExperienceData: Partial<DriverExperience>,
  ): Promise<DriverExperience> {
    try {
      const driverExperience = await this.driverExperienceRepository.findOneBy({
        id,
      });
      if (!driverExperience) {
        throw new Error(`DriverExperience with ID ${id} not found`);
      }

      const updatedData = DriverExperienceMapper.toOrmEntity({
        ...DriverExperienceMapper.toDomainEntity(driverExperience),
        ...driverExperienceData,
      } as DriverExperience);

      await this.driverExperienceRepository.save(updatedData);
      const updatedDriverExperience =
        await this.driverExperienceRepository.findOneBy({ id });
      return DriverExperienceMapper.toDomainEntity(updatedDriverExperience);
    } catch (error) {
      console.error('Error updating driver experience:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.driverExperienceRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting driver experience with id ${id}:`, error);
      throw error;
    }
  }
}
