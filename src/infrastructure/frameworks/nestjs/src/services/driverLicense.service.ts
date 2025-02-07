import { Injectable, Inject } from '@nestjs/common';
import { DriverLicense } from '../../../../../domain/entities/driverLicense.entity';
import {
  DriverLicenseRepositoryInterface,
  DriverLicenseFiltersType,
} from '../../../../../application/repositories/DriverLicenseRepositoryInterface';
import {
  CreateDriverLicenseUseCase,
  DriverLicenseWithoutId,
} from '../../../../../application/usecases/driverLicense/CreateDriverLicenseUseCase';
import { UpdateDriverLicenseUseCase } from '../../../../../application/usecases/driverLicense/UpdateDriverLicenseUseCase';
import { DeleteDriverLicenseUseCase } from '../../../../../application/usecases/driverLicense/DeleteDriverLicenseUseCase';

@Injectable()
export class DriverLicenseService {
  constructor(
    @Inject('DriverLicenseRepositoryInterface')
    private readonly driverLicenseRepository: DriverLicenseRepositoryInterface,
  ) {}

  async create({
    licenseNumber,
    category,
    expiryDate,
    obtainDate,
    country,
    status,
    driver,
  }: DriverLicenseWithoutId): Promise<DriverLicense> {
    const createDriverLicenseUseCase = new CreateDriverLicenseUseCase(
      this.driverLicenseRepository,
    );

    return await createDriverLicenseUseCase.execute({
      licenseNumber,
      category,
      expiryDate,
      obtainDate,
      country,
      status,
      driver,
    });
  }

  async update(
    id: string,
    driverLicenseData: DriverLicense,
  ): Promise<DriverLicense> {
    const updateDriverLicenseUseCase = new UpdateDriverLicenseUseCase(
      this.driverLicenseRepository,
    );
    return await updateDriverLicenseUseCase.execute({
      id,
      ...driverLicenseData,
    });
  }

  async delete(id: string): Promise<void> {
    const deleteDriverLicenseUseCase = new DeleteDriverLicenseUseCase(
      this.driverLicenseRepository,
    );
    await deleteDriverLicenseUseCase.execute(id);
  }

  async findById(id: string): Promise<DriverLicense> {
    return await this.driverLicenseRepository.findById(id);
  }

  async findAll(filters?: DriverLicenseFiltersType): Promise<DriverLicense[]> {
    return await this.driverLicenseRepository.findAll(filters);
  }
}
