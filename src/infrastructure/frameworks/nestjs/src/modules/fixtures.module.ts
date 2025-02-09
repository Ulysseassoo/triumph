import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixturesService } from '../services/fixtures.service';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { MaintenanceModule } from './maintenance.module';
import { PieceModule } from './piece.module';
import { MotoModule } from './moto.module';
import { PartnerModule } from './partner.module';
import { OrderModule } from './order.module';
import { WarrantyModule } from './warranty.module';
import { BreakdownModule } from './breakdown.module';
import { ReparationModule } from './reparation.module';
import { CorrectiveActionModule } from './corrective-action.module';
import { NotificationModule } from './notification.module';
import { DriverModule } from './driver.module';
import { AttemptModule } from './attempt.module';
import { CrashModule } from './crash.module';
import { DriverExperienceModule } from './driverExperience.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotoOrmEntity, UserOrmEntity]),
    MaintenanceModule,
    PieceModule,
    MotoModule,
    PartnerModule,
    OrderModule,
    WarrantyModule,
    BreakdownModule,
    ReparationModule,
    CorrectiveActionModule,
    NotificationModule,
    DriverModule,
    AttemptModule,
    CrashModule,
    DriverExperienceModule,
  ],
  providers: [FixturesService],
  exports: [FixturesService],
})
export class FixturesModule {}
