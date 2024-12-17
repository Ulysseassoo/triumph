import { MaintenanceOrmEntity } from './../../../../database/entities/maintenance.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceController } from 'src/controllers/maintenance.controller';
import { MaintenanceService } from 'src/services/maintenance.service';
import { MaintenanceRepository } from 'src/repositories/maintenance.repository';
import { AddMaintenanceUseCase } from "../../../../../application/usecases/maintenance/AddMaintenanceUseCase";
import { SendNotificationUseCase } from "../../../../../application/usecases/notification/SendNotificationUseCase";
import { MotoRepository } from "src/repositories/moto.repository";
import { MotoOrmEntity } from "../../../../database/entities/moto.orm-entity";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MaintenanceOrmEntity, MotoOrmEntity])],
  controllers: [MaintenanceController],
  providers: [
    MotoRepository,
    AddMaintenanceUseCase,
    MaintenanceService,
    MaintenanceRepository,
    SendNotificationUseCase,
    {
      provide: 'MaintenanceRepositoryInterface',
      useClass: MaintenanceRepository,
    },
        {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
  ],
  exports: [
    MaintenanceService,
    'MaintenanceRepositoryInterface',
    TypeOrmModule,
  ],
})
export class MaintenanceModule {}
