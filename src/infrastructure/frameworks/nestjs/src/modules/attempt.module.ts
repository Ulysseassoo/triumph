import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AttemptController } from 'src/controllers/attempt.controller';
import { AttemptService } from 'src/services/attempt.service';
import { AttemptRepository } from 'src/repositories/attempt.repository';
import { AttemptOrmEntity } from '../../../../database/entities/attempt.orm-entity';
import { DriverService } from 'src/services/driver.service';
import { DriverRepository } from 'src/repositories/driver.repository';
import { DriverExperienceService } from 'src/services/driverExperience.service';
import { DriverExperienceRepository } from 'src/repositories/driverExperience.repository';
import { DriverController } from 'src/controllers/driver.controller';
import { DriverExperienceController } from 'src/controllers/driverExperience.controller';
import { DriverExperienceOrmEntity } from '../../../../database/entities/driverExperience.orm-entity';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      AttemptOrmEntity,
      DriverOrmEntity,
      DriverExperienceOrmEntity,
    ]),
  ],
  controllers: [
    AttemptController,
    DriverController,
    DriverExperienceController,
  ],
  providers: [
    AttemptService,
    AttemptRepository,
    DriverService,
    DriverRepository,
    DriverExperienceService,
    DriverExperienceRepository,
    {
      provide: 'AttemptRepositoryInterface',
      useClass: AttemptRepository,
    },
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
    },
    {
      provide: 'DriverExperienceRepositoryInterface',
      useClass: DriverExperienceRepository,
    },
  ],
  exports: [AttemptService, 'AttemptRepositoryInterface', TypeOrmModule],
})
export class AttemptModule {}
