import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DriverController } from 'src/controllers/driver.controller';
import { DriverService } from 'src/services/driver.service';
import { DriverRepository } from 'src/repositories/driver.repository';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import { DriverLicenseController } from 'src/controllers/driverLicense.controller';
import { DriverExperienceController } from 'src/controllers/driverExperience.controller';
import { CrashController } from 'src/controllers/crash.controller';
import { DriverLicenseService } from 'src/services/driverLicense.service';
import { DriverLicenseRepository } from 'src/repositories/driverLicense.repository';
import { DriverExperienceService } from 'src/services/driverExperience.service';
import { DriverExperienceRepository } from 'src/repositories/driverExperience.repository';
import { CrashService } from 'src/services/crash.service';
import { CrashRepository } from 'src/repositories/crash.repository';
import { DriverLicenseOrmEntity } from '../../../../database/entities/driverLicense.orm-entity';
import { DriverExperienceOrmEntity } from '../../../../database/entities/driverExperience.orm-entity';
import { CrashOrmEntity } from '../../../../database/entities/crash.orm-entity';
import { AttemptOrmEntity } from '../../../../database/entities/attempt.orm-entity';
import { AttemptController } from 'src/controllers/attempt.controller';
import { AttemptService } from 'src/services/attempt.service';
import { AttemptRepository } from 'src/repositories/attempt.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      DriverOrmEntity,
      DriverLicenseOrmEntity,
      DriverExperienceOrmEntity,
      CrashOrmEntity,
      AttemptOrmEntity,
    ]),
  ],
  controllers: [
    DriverController,
    DriverLicenseController,
    DriverExperienceController,
    CrashController,
    AttemptController,
  ],
  providers: [
    DriverService,
    DriverRepository,
    DriverLicenseService,
    DriverLicenseRepository,
    DriverExperienceService,
    DriverExperienceRepository,
    AttemptService,
    AttemptRepository,
    CrashService,
    CrashRepository,
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
    },
    {
      provide: 'DriverLicenseRepositoryInterface',
      useClass: DriverLicenseRepository,
    },
    {
      provide: 'DriverExperienceRepositoryInterface',
      useClass: DriverExperienceRepository,
    },
    {
      provide: 'CrashRepositoryInterface',
      useClass: CrashRepository,
    },
    {
      provide: 'AttemptRepositoryInterface',
      useClass: AttemptRepository,
    },
  ],
  exports: [DriverService, 'DriverRepositoryInterface', TypeOrmModule],
})
export class DriverModule {}
