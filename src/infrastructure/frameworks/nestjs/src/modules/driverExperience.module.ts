import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DriverExperienceController } from 'src/controllers/driverExperience.controller';
import { DriverController } from 'src/controllers/driver.controller';

import { DriverExperienceService } from 'src/services/driverExperience.service';
import { DriverService } from 'src/services/driver.service';

import { DriverExperienceRepository } from 'src/repositories/driverExperience.repository';
import { DriverRepository } from 'src/repositories/driver.repository';

import { DriverExperienceOrmEntity } from '../../../../database/entities/driverExperience.orm-entity';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DriverExperienceOrmEntity, DriverOrmEntity]),
  ],
  controllers: [DriverExperienceController, DriverController],
  providers: [
    DriverExperienceService,
    DriverService,
    DriverExperienceRepository,
    DriverRepository,
    {
      provide: 'DriverExperienceRepositoryInterface',
      useClass: DriverExperienceRepository,
    },
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
    },
  ],
  exports: [
    DriverExperienceService,
    DriverService,
    'DriverExperienceRepositoryInterface',
    TypeOrmModule,
  ],
})
export class DriverExperienceModule {}
