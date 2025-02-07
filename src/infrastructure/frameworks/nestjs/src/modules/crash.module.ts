import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CrashController } from 'src/controllers/crash.controller';
import { CrashService } from 'src/services/crash.service';
import { CrashRepository } from 'src/repositories/crash.repository';
import { CrashOrmEntity } from '../../../../database/entities/crash.orm-entity';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { DriverService } from 'src/services/driver.service';
import { DriverRepository } from 'src/repositories/driver.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CrashOrmEntity, DriverOrmEntity, MotoOrmEntity]),
  ],
  controllers: [CrashController],
  providers: [
    CrashService,
    CrashRepository,
    DriverService,
    DriverRepository,
    {
      provide: 'CrashRepositoryInterface',
      useClass: CrashRepository,
    },
    {
      provide: 'DriverRepositoryInterface',
      useClass: DriverRepository,
    },
  ],
  exports: [CrashService, 'CrashRepositoryInterface', TypeOrmModule],
})
export class CrashModule {}
