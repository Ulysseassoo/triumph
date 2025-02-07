import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DriverController } from 'src/controllers/driver.controller';
import { DriverLicenseController } from 'src/controllers/driverLicense.controller';

import { DriverService } from 'src/services/driver.service';
import { DriverLicenseService } from 'src/services/driverLicense.service';

import { DriverRepository } from 'src/repositories/driver.repository';
import { DriverLicenseRepository } from 'src/repositories/driverLicense.repository';

import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import { DriverLicenseOrmEntity } from '../../../../database/entities/driverLicense.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DriverOrmEntity, DriverLicenseOrmEntity]),
  ],
  controllers: [DriverController, DriverLicenseController],
  providers: [
    DriverService,
    DriverLicenseService,
    DriverRepository,
    DriverLicenseRepository,
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
    },
    {
      provide: 'DriverLicenseRepositoryInterface',
      useClass: DriverLicenseRepository,
    },
  ],
  exports: [
    DriverService,
    DriverLicenseService,
    'DriverRepositoryInterface',
    'DriverLicenseRepositoryInterface',
    TypeOrmModule,
  ],
})
export class DriverModule {}
