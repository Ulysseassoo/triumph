import { AddMaintenanceUseCase } from './../../../../../application/usecases/maintenance/AddMaintenanceUseCase';
import { MaintenanceRepositoryInterface } from './../../../../../application/repositories/MaintenanceRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MotoRepositoryInterface } from '../../../../../application/repositories/MotoRepositoryInterface';
import { SendNotificationUseCase } from '../../../../../application/usecases/notification/SendNotificationUseCase';
import { NotificationRepositoryInterface } from '../../../../../application/repositories/NotificationRepositoryInterface';

@Injectable()
export class MaintenanceService {
  constructor(
    @Inject('MaintenanceRepositoryInterface')
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    @Inject('MotoRepositoryInterface')
    private readonly motoRepository: MotoRepositoryInterface,
    @Inject('NotificationRepositoryInterface')
    private readonly notificationRepository: NotificationRepositoryInterface,
  ) {}

  async addMaintenance(
    motoId: string,
    kilometrageInterval: number,
    tempsInterval: number,
    recommandations: string,
  ) {
    const sendNotificationUseCase = new SendNotificationUseCase(this.notificationRepository);
    const addMaintenanceUseCase = new AddMaintenanceUseCase(this.maintenanceRepository, this.motoRepository, sendNotificationUseCase);
    return await addMaintenanceUseCase.execute({
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
