import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverLicenseOrmEntity } from '../../../../database/entities/driverLicense.orm-entity';
import {
  DriverLicenseRepositoryInterface,
  DriverLicenseFiltersType,
} from '../../../../../application/repositories/DriverLicenseRepositoryInterface';
import { DriverLicense } from '../../../../../domain/entities/driverLicense.entity';
import { DriverLicenseMapper } from '../../../../database/mappers/driverLicense.mapper';

@Injectable()
export class DriverLicenseRepository
  implements DriverLicenseRepositoryInterface
{
  constructor(
    @InjectRepository(DriverLicenseOrmEntity)
    private readonly driverLicenseRepository: Repository<DriverLicenseOrmEntity>,
  ) {}

  async findAll(filters?: DriverLicenseFiltersType): Promise<DriverLicense[]> {
    const { licenseNumber, category, expiryDate, country } = filters;
    const { offset = 0, limit = 10 } = filters.pagination;

    try {
      const query: Record<string, unknown> = {};
      if (licenseNumber) query.licenseNumber = licenseNumber;
      if (category) query.category = category;
      if (expiryDate) query.expiryDate = expiryDate;
      if (country) query.country = country;

      const driverLicenses = await this.driverLicenseRepository.find({
        where: query,
        skip: offset,
        take: limit,
      });

      return driverLicenses.map((driverLicense) =>
        DriverLicenseMapper.toDomainEntity(driverLicense),
      );
    } catch (error) {
      console.error('Error fetching filtered driver licenses:', error);
      throw new Error(`Failed to fetch driver licenses: ${error.message}`);
    }
  }

  async findById(id: string): Promise<DriverLicense> {
    try {
      const driverLicense = await this.driverLicenseRepository.findOneBy({
        id,
      });
      return driverLicense
        ? DriverLicenseMapper.toDomainEntity(driverLicense)
        : null;
    } catch (error) {
      throw error;
    }
  }

  async create(driverLicense: DriverLicense): Promise<DriverLicense> {
    try {
      const driverLicenseOrm = DriverLicenseMapper.toOrmEntity(driverLicense);
      const savedDriverLicense =
        await this.driverLicenseRepository.save(driverLicenseOrm);
      return DriverLicenseMapper.toDomainEntity(savedDriverLicense);
    } catch (error) {
      console.error(
        `Error creating driver license with payloads: ${driverLicense}\n`,
        error,
      );
      throw new Error(`Failed to create driver license: ${error.message}`);
    }
  }

  async update(
    id: string,
    driverLicenseData: Partial<DriverLicense>,
  ): Promise<DriverLicense> {
    try {
      const driverLicense = await this.driverLicenseRepository.findOneBy({
        id,
      });
      if (!driverLicense) {
        throw new Error(`Driver license with ID ${id} not found`);
      }

      const updatedData = DriverLicenseMapper.toOrmEntity({
        ...DriverLicenseMapper.toDomainEntity(driverLicense),
        ...driverLicenseData,
      } as DriverLicense);

      await this.driverLicenseRepository.save(updatedData);
      const updatedDriverLicense = await this.driverLicenseRepository.findOneBy(
        { id },
      );
      return DriverLicenseMapper.toDomainEntity(updatedDriverLicense);
    } catch (error) {
      console.error('Error updating driver license:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.driverLicenseRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting driver license with id ${id}:`, error);
      throw error;
    }
  }
}
