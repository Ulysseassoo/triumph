import { Injectable, Inject } from '@nestjs/common';
import { Driver } from '../../../../../domain/entities/driver.entity';
import {
  DriverRepositoryInterface,
  filtersType,
} from '../../../../../application/repositories/DriverRepositoryInterface';
import {
  CreateDriverUseCase,
  DriverWithoutId,
} from '../../../../../application/usecases/driver/CreateDriverUseCase';
import { UpdateDriverUseCase } from '../../../../../application/usecases/driver/UpdateDriverUseCase';
import { DeleteDriverUseCase } from '../../../../../application/usecases/driver/DeleteDriverUseCase';

@Injectable()
export class DriverService {
  constructor(
    @Inject('DriverRepositoryInterface')
    private readonly driverRepository: DriverRepositoryInterface,
  ) {}

  async create({
    firstname,
    lastname,
    birthdate,
    addresse,
    licenses,
    experiences,
    crashes,
    attempts,
  }: DriverWithoutId): Promise<Driver> {
    const createDriverUseCase = new CreateDriverUseCase(this.driverRepository);

    return await createDriverUseCase.execute({
      firstname,
      lastname,
      birthdate,
      addresse,
      licenses,
      experiences,
      crashes,
      attempts,
    });
  }

  async update(id: string, driverData: Driver): Promise<Driver> {
    const updateDriverUseCase = new UpdateDriverUseCase(this.driverRepository);
    return await updateDriverUseCase.execute({
      id,
      ...driverData,
    });
  }

  async delete(id: string): Promise<void> {
    const deletePieceUseCase = new DeleteDriverUseCase(this.driverRepository);
    await deletePieceUseCase.execute(id);
  }

  async findById(id: string): Promise<Driver> {
    return await this.driverRepository.findById(id);
  }

  async findAll(filters?: filtersType): Promise<Driver[]> {
    return await this.driverRepository.findAll(filters);
  }
}
