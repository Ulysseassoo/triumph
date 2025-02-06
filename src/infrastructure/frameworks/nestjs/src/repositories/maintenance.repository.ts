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
  async findById(id: string): Promise<Maintenance | null> {
    const maintenance = await this.repository.findOneBy({ id });
    return maintenance ? MaintenanceMapper.toDomainEntity(maintenance) : null;
  }
  async create(maintenance: Maintenance): Promise<Maintenance> {
    const maintenanceOrmEntity = MaintenanceMapper.toOrmEntity(maintenance);
    const maintenanceCreated = await this.repository.save(maintenanceOrmEntity);
    return MaintenanceMapper.toDomainEntity(maintenanceCreated);
  }
  async update(id: string, maintenance: Partial<Maintenance>): Promise<void> {
    await this.repository.update(id, maintenance);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async save(maintenance: Maintenance): Promise<Maintenance> {
    return await this.repository.save(maintenance);
  }

  async findByMotoId(motoId: string): Promise<Maintenance[]> {
    const maintenances = await this.repository.find({ where: { motoId } });
    return maintenances.map((maintenance) => MaintenanceMapper.toDomainEntity(maintenance));
  }

  async findAll(): Promise<Maintenance[]> {
    const maintenances = await this.repository.find();
    return maintenances.map((maintenance) =>
      MaintenanceMapper.toDomainEntity(maintenance),
    );
  }
}
