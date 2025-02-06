import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { NotificationController } from 'src/controllers/notification.controller';
import { NotificationService } from 'src/services/notification.service';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { MotoRepository } from '../repositories/moto.repository';
import { PartnerRepository } from '../repositories/partner.repository';
import { PartnerModule } from './partner.module';
import { MotoModule } from './moto.module';
import { MaintenanceModule } from './maintenance.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([NotificationOrmEntity]),
    MotoModule,
    PartnerModule,
    forwardRef(() => MaintenanceModule),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    MaintenanceRepository,
    MotoRepository,
    PartnerRepository,
    {
      provide: 'NotificationRepositoryInterface',
      useClass: NotificationRepository,
    },
    {
      provide: 'MaintenanceRepositoryInterface',
      useClass: MaintenanceRepository,
    },
    {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
    {
      provide: 'PartnerRepositoryInterface',
      useClass: PartnerRepository,
    },
  ],
  exports: [
    NotificationService,
    'NotificationRepositoryInterface',
    TypeOrmModule,
  ],
})
export class NotificationModule {}
