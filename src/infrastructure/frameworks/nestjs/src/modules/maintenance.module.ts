import { MaintenanceOrmEntity } from './../../../../database/entities/maintenance.orm-entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceController } from '../controllers/maintenance.controller';
import { MaintenanceService } from 'src/services/maintenance.service';
import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { AddMaintenanceUseCase } from '../../../../../application/usecases/maintenance/AddMaintenanceUseCase';
import { SendNotificationUseCase } from '../../../../../application/usecases/notification/SendNotificationUseCase';
import { MotoRepository } from '../repositories/moto.repository';
import { MotoModule } from './moto.module';
import { PartnerModule } from './partner.module';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { NotificationModule } from './notification.module';
import { PartnerRepository } from 'src/repositories/partner.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MaintenanceOrmEntity]),
    MotoModule,
    forwardRef(() => NotificationModule),
    PartnerModule,
  ],
  controllers: [MaintenanceController],
  providers: [
    MotoRepository,
    AddMaintenanceUseCase,
    MaintenanceService,
    MaintenanceRepository,
    SendNotificationUseCase,
    NotificationRepository,
    PartnerRepository,
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
    {
      provide: 'PartnerRepositoryInterface',
      useClass: PartnerRepository,
    },
  ],
  exports: [
    MaintenanceService,
    'MaintenanceRepositoryInterface',
    TypeOrmModule,
  ],
})
export class MaintenanceModule {}