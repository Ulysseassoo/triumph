import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WarrantyOrmEntity } from '../../../../database/entities/warranty.orm-entity';
import { WarrantyRepository } from '../repositories/warranty.repository';
import { WarrantyController } from '../controllers/warranty.controller';
import { WarrantyService } from '../services/warranty.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([WarrantyOrmEntity]),
  ],
  controllers: [WarrantyController],
  providers: [
    WarrantyService,
    WarrantyRepository,
    {
      provide: 'WarrantyRepositoryInterface',
      useClass: WarrantyRepository,
    },
  ],
  exports: [WarrantyService, 'WarrantyRepositoryInterface', TypeOrmModule],
})
export class WarrantyModule {}