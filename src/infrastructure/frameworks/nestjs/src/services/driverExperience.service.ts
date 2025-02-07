import { Injectable, Inject } from '@nestjs/common';
import { DriverExperience } from '../../../../../domain/entities/driverExperience.entity';
import {
  DriverExperienceRepositoryInterface,
  DriverExperienceFiltersType,
} from '../../../../../application/repositories/DriverExperienceRepositoryInterface';
import {
  CreateDriverExperienceUseCase,
  DriverExperienceWithoutId,
} from '../../../../../application/usecases/driverExperience/CreateDriverExperienceUseCase';
import { UpdateDriverExperienceUseCase } from '../../../../../application/usecases/driverExperience/UpdateDriverExperienceUseCase';
import { DeleteDriverExperienceUseCase } from '../../../../../application/usecases/driverExperience/DeleteDriverExperienceUseCase';

@Injectable()
export class DriverExperienceService {
  constructor(
    @Inject('DriverExperienceRepositoryInterface')
    private readonly driverExperienceRepository: DriverExperienceRepositoryInterface,
  ) {}

  async create({
    duration,
    type,
    rented,
    professional,
    feedback,
    driver,
  }: DriverExperienceWithoutId): Promise<DriverExperience> {
    const createDriverExperienceUseCase = new CreateDriverExperienceUseCase(
      this.driverExperienceRepository,
    );

    return await createDriverExperienceUseCase.execute({
      duration,
      type,
      rented,
      professional,
      feedback,
      driver,
    });
  }

  async update(
    id: string,
    driverExperienceData: DriverExperience,
  ): Promise<DriverExperience> {
    const updateDriverExperienceUseCase = new UpdateDriverExperienceUseCase(
      this.driverExperienceRepository,
    );
    return await updateDriverExperienceUseCase.execute({
      id,
      ...driverExperienceData,
    });
  }

  async delete(id: string): Promise<void> {
    const deleteDriverExperienceUseCase = new DeleteDriverExperienceUseCase(
      this.driverExperienceRepository,
    );
    await deleteDriverExperienceUseCase.execute(id);
  }

  async findById(id: string): Promise<DriverExperience> {
    return await this.driverExperienceRepository.findById(id);
  }

  async findAll(
    filters?: DriverExperienceFiltersType,
  ): Promise<DriverExperience[]> {
    return await this.driverExperienceRepository.findAll(filters);
  }
}
