import { MaintenanceOrmEntity } from './../../../../database/entities/maintenance.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceController } from '../controllers/maintenance.controller';
import { MaintenanceService } from 'src/services/maintenance.service';
import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { AddMaintenanceUseCase } from '../../../../../application/usecases/maintenance/AddMaintenanceUseCase';
import { SendNotificationUseCase } from '../../../../../application/usecases/notification/SendNotificationUseCase';
import { MotoRepository } from '../repositories/moto.repository';
import { MotoModule } from './moto.module';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MaintenanceOrmEntity]),
    MotoModule,
    NotificationModule,
  ],
  controllers: [MaintenanceController],
  providers: [
    MotoRepository,
    AddMaintenanceUseCase,
    MaintenanceService,
    MaintenanceRepository,
    SendNotificationUseCase,
    NotificationRepository,
    {
      provide: 'MaintenanceRepositoryInterface',
      useClass: MaintenanceRepository,
    },
    {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
    {
      provide: 'NotificationRepositoryInterface',
      useClass: NotificationRepository,
    },
  ],
  exports: [
    MaintenanceService,
    'MaintenanceRepositoryInterface',
    TypeOrmModule,
  ],
})
export class MaintenanceModule {}
