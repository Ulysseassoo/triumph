import { MaintenanceRepositoryInterface } from './../../../../../application/repositories/MaintenanceRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
@Injectable()
export class MaintenanceService {
  constructor(
    @Inject('MaintenanceRepositoryInterface')
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceRepository.findAll();
  }
}
