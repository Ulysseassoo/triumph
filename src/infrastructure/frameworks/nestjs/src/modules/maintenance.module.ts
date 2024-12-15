import { MaintenanceOrmEntity } from './../../../../database/entities/maintenance.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceController } from 'src/controllers/maintenance.controller';
import { MaintenanceService } from 'src/services/maintenance.service';
import { MaintenanceRepository } from 'src/repositories/maintenance.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MaintenanceOrmEntity])],
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    MaintenanceRepository,
    {
      provide: 'MaintenanceRepositoryInterface',
      useClass: MaintenanceRepository,
    },
  ],
  exports: [
    MaintenanceService,
    'MaintenanceRepositoryInterface',
    TypeOrmModule,
  ],
})
export class MaintenanceModule {}
