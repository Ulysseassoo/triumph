import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AttemptController } from 'src/controllers/attempt.controller';
import { AttemptService } from 'src/services/attempt.service';
import { AttemptRepository } from 'src/repositories/attempt.repository';
import { AttemptOrmEntity } from '../../../../database/entities/attempt.orm-entity';
import { DriverService } from 'src/services/driver.service';
import { DriverRepository } from 'src/repositories/driver.repository';
import { DriverController } from 'src/controllers/driver.controller';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { MotoController } from 'src/controllers/moto.controller';
import { MotoService } from 'src/services/moto.service';
import { MotoRepository } from 'src/repositories/moto.repository';
import { PartnerOrmEntity } from '../../../../database/entities/partner.orm-entity';
import { PartnerService } from 'src/services/partner.service';
import { PartnerRepository } from 'src/repositories/partner.repository';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      AttemptOrmEntity,
      DriverOrmEntity,
      MotoOrmEntity,
      PartnerOrmEntity,
      UserOrmEntity,
    ]),
  ],
  controllers: [AttemptController, DriverController, MotoController],
  providers: [
    AttemptService,
    AttemptRepository,
    DriverService,
    DriverRepository,
    MotoService,
    MotoRepository,
    PartnerService,
    PartnerRepository,
    {
      provide: 'AttemptRepositoryInterface',
      useClass: AttemptRepository,
    },
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
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
  exports: [AttemptService, 'AttemptRepositoryInterface', TypeOrmModule],
})
export class AttemptModule {}
