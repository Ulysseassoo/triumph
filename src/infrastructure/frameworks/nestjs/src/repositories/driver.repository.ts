import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import {
  DriverRepositoryInterface,
  filtersType,
} from '../../../../../application/repositories/DriverRepositoryInterface';
import { Driver } from '../../../../../domain/entities/driver.entity';
import { DriverMapper } from '../../../../database/mappers/driver.mapper';

@Injectable()
export class DriverRepository implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(DriverOrmEntity)
    private readonly driverRepository: Repository<DriverOrmEntity>,
  ) {}

  async findAll(filters?: filtersType): Promise<Driver[]> {
    try {
      const query: Record<string, unknown> = {};
      if (filters?.firstname) query.firstname = filters.firstname;
      if (filters?.lastname) query.lastname = filters.lastname;
      if (filters?.birthdate) query.birthdate = filters.birthdate;
      if (filters?.addresse) query.addresse = filters.addresse;

      const drivers = await this.driverRepository.find({
        where: query,
        skip: filters?.pagination?.offset ?? 0,
        take: filters?.pagination?.limit ?? 100,
      });

      return drivers.map((driver) => DriverMapper.toDomainEntity(driver));
    } catch (error) {
      console.error('Error fetching filtered drivers:', error);
      throw new Error(`Failed to fetch drivers: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Driver> {
    try {
      const driver = await this.driverRepository.findOne({
        where: { id },
        relations: ['experiences', 'licenses'],
      });
      return driver ? DriverMapper.toDomainEntity(driver) : null;
    } catch (error) {
      throw error;
    }
  }

  async create(driver: Driver): Promise<Driver> {
    try {
      const driverOrm = DriverMapper.toOrmEntity(driver);
      const savedDriver = await this.driverRepository.save(driverOrm);
      return DriverMapper.toDomainEntity(savedDriver);
    } catch (error) {
      console.error(`Error creating driver with payloads : ${driver}\n`, error);
      throw new Error(`Failed to create driver: ${error.message}`);
    }
  }

  async update(id: string, driverData: Partial<Driver>): Promise<Driver> {
    try {
      const driver = await this.driverRepository.findOneBy({ id });
      if (!driver) {
        throw new Error(`Driver with ID ${id} not found`);
      }

      const updatedData = DriverMapper.toOrmEntity({
        ...DriverMapper.toDomainEntity(driver),
        ...driverData,
      } as Driver);

      await this.driverRepository.save(updatedData);
      const updatedDriver = await this.driverRepository.findOneBy({ id });
      return DriverMapper.toDomainEntity(updatedDriver);
    } catch (error) {
      console.error('Error updating piece:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.driverRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting driver with id ${id} :`, error);
      throw error;
    }
  }
}
