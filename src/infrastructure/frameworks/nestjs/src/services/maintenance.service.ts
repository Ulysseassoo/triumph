import { AddMaintenanceUseCase } from './../../../../../application/usecases/maintenance/AddMaintenanceUseCase';
import { MaintenanceRepositoryInterface } from './../../../../../application/repositories/MaintenanceRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @Inject('MaintenanceRepositoryInterface')
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    private readonly addMaintenanceUseCase: AddMaintenanceUseCase,
  ) {}

  async addMaintenance(
    motoId: string,
    kilometrageInterval: number,
    tempsInterval: number,
    recommandations: string,
  ) {
    return await this.addMaintenanceUseCase.execute({
      motoId,
      kilometrageInterval,
      tempsInterval,
      recommandations,
    });
  }

  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceRepository.findAll();
  }
}
