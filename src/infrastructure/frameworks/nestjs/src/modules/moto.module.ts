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

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MotoOrmEntity]), PartnerModule],
  controllers: [MotoController],
  providers: [
    MotoRepository,
    MotoService,
    CreateMotoUseCase,
    PartnerRepository,
    {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
    {
      provide: "PartnerRepositoryInterface",
      useClass: PartnerRepository
    }
  ],
  exports: [MotoService, 'MotoRepositoryInterface', TypeOrmModule],
})
export class MotoModule {}