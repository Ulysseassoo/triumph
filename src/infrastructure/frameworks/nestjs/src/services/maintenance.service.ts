import { AddMaintenanceUseCase } from './../../../../../application/usecases/maintenance/AddMaintenanceUseCase';
import { MaintenanceRepositoryInterface } from './../../../../../application/repositories/MaintenanceRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MotoRepositoryInterface } from '../../../../../application/repositories/MotoRepositoryInterface';
import { SendNotificationUseCase } from '../../../../../application/usecases/notification/SendNotificationUseCase';
import { NotificationRepositoryInterface } from '../../../../../application/repositories/NotificationRepositoryInterface';
import { PartnerRepositoryInterface } from '../../../../../application/repositories/PartnerRepositoryInterface';

@Injectable()
export class MaintenanceService {
  constructor(
    @Inject('MaintenanceRepositoryInterface')
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    @Inject('MotoRepositoryInterface')
    private readonly motoRepository: MotoRepositoryInterface,
    @Inject('NotificationRepositoryInterface')
    private readonly notificationRepository: NotificationRepositoryInterface,
    @Inject('PartnerRepositoryInterface')
    private readonly partnerRepository: PartnerRepositoryInterface,
  ) {}

  async addMaintenance(
    motoId: string,
    kilometrageInterval: number,
    tempsInterval: number,
    recommandations: string,
  ) {
    const sendNotificationUseCase = new SendNotificationUseCase(this.notificationRepository, this.partnerRepository);
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

  async findById(id: string): Promise<Maintenance | null> {
    return await this.maintenanceRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.maintenanceRepository.delete(id);
  }

  async update (maintenance: Maintenance): Promise<Maintenance> {
    return await this.maintenanceRepository.save(maintenance);
  }
}