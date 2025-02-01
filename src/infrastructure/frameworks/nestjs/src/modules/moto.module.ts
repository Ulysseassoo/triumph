import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MotoRepository } from 'src/repositories/moto.repository';
import { MotoService } from 'src/services/moto.service';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { MotoController } from 'src/controllers/moto.controller';
import { CreateMotoUseCase } from '../../../../../application/usecases/moto/CreateMotoUseCase';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MotoOrmEntity])],
  controllers: [MotoController],
  providers: [
    MotoRepository,
    MotoService,
    CreateMotoUseCase,
    {
      provide: 'MotoRepositoryInterface',
      useClass: MotoRepository,
    },
  ],
  exports: [MotoService, 'MotoRepositoryInterface', TypeOrmModule],
})
export class MotoModule {}