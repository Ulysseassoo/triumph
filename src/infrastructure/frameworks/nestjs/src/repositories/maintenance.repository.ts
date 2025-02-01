import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceRepositoryInterface } from '../../../../../application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceOrmEntity } from '../../../../database/entities/maintenance.orm-entity';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MaintenanceMapper } from '../../../../database/mappers/maintenance.mapper';

@Injectable()
export class MaintenanceRepository implements MaintenanceRepositoryInterface {
  constructor(
    @InjectRepository(MaintenanceOrmEntity)
    private readonly repository: Repository<MaintenanceOrmEntity>,
  ) {}
  create(maintenance: Maintenance): Promise<Maintenance> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Maintenance | null> {
    throw new Error('Method not implemented.');
  }
  findByMotoId(motoId: string): Promise<Maintenance[]> {
    throw new Error('Method not implemented.');
  }
  save(entretien: Maintenance): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllDue(date: Date, mileage: number): Promise<Maintenance[]> {
    throw new Error('Method not implemented.');
  }
  updateMileage(id: number, mileage: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Maintenance[]> {
    const maintenances = await this.repository.find();
    return maintenances.map((maintenance) => MaintenanceMapper.toDomainEntity(maintenance));
  }
}