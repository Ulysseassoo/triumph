import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReparationOrmEntity } from '../../../../database/entities/reparation.orm-entity';
import { ReparationRepository } from '../repositories/reparation.repository';
import { ReparationController } from '../controllers/reparation.controller';
import { ReparationService } from '../services/reparation.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ReparationOrmEntity]),
  ],
  controllers: [ReparationController],
  providers: [
    ReparationService,
    ReparationRepository,
    {
      provide: 'ReparationRepositoryInterface',
      useClass: ReparationRepository,
    },
  ],
  exports: [ReparationService, 'ReparationRepositoryInterface', TypeOrmModule],
})
export class ReparationModule {}