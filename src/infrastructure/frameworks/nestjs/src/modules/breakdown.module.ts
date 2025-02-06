import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BreakdownOrmEntity } from '../../../../database/entities/breakdown.orm-entity';
import { BreakdownRepository } from '../repositories/breakdown.repository';
import { BreakdownController } from '../controllers/breakdown.controller';
import { BreakdownService } from '../services/breakdown.service';
import { WarrantyRepository } from 'src/repositories/warranty.repository';
import { CreateBreakdownUseCase } from '../../../../../application/usecases/breakdown/CreateBreakdownUseCase';
import { AssociateWarrantyUseCase } from '../../../../../application/usecases/warranty/AssociateWarrantyUseCase';
import { WarrantyModule } from './warranty.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BreakdownOrmEntity]),
    WarrantyModule,
  ],
  controllers: [BreakdownController],
  providers: [
    BreakdownService,
    BreakdownRepository,
    CreateBreakdownUseCase,
    AssociateWarrantyUseCase,
    WarrantyRepository,
    {
      provide: 'BreakdownRepositoryInterface',
      useClass: BreakdownRepository,
    },
    {
      provide: 'WarrantyRepositoryInterface',
      useClass: WarrantyRepository,
    },
  ],
  exports: [BreakdownService, 'BreakdownRepositoryInterface', TypeOrmModule],
})
export class BreakdownModule {}
