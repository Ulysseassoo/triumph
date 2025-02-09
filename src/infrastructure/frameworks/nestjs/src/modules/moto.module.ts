import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MotoRepository } from 'src/repositories/moto.repository';
import { PartnerRepository } from 'src/repositories/partner.repository';
import { MotoService } from 'src/services/moto.service';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { MotoController } from 'src/controllers/moto.controller';
import { CreateMotoUseCase } from '../../../../../application/usecases/moto/CreateMotoUseCase';
import { PartnerModule } from './partner.module';
import { AttemptRepository } from 'src/repositories/attempt.repository';
import { AttemptService } from 'src/services/attempt.service';
import { AttemptOrmEntity } from '../../../../database/entities/attempt.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MotoOrmEntity, AttemptOrmEntity]),
    PartnerModule,
  ],
  controllers: [MotoController],
  providers: [
    MotoRepository,
    MotoService,
    CreateMotoUseCase,
    PartnerRepository,
    AttemptService,
    AttemptRepository,
    {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
    {
      provide: 'PartnerRepositoryInterface',
      useClass: PartnerRepository,
    },
    {
      provide: 'AttemptRepositoryInterface',
      useClass: AttemptRepository,
    },
  ],
  exports: [MotoService, 'MotoRepositoryInterface', TypeOrmModule],
})
export class MotoModule {}
