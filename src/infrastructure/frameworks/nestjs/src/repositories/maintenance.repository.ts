import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceRepositoryInterface } from '../../../../../application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceOrmEntity } from '../../../../database/entities/maintenance.orm-entity';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';

@Injectable()
export class MaintenanceRepository implements MaintenanceRepositoryInterface {
  constructor(
    @InjectRepository(MaintenanceOrmEntity)
    private readonly repository: Repository<MaintenanceOrmEntity>,
  ) {}

  async findAll(): Promise<Maintenance[]> {
    const maintenances = await this.repository.find();
    return maintenances;
  }
}
