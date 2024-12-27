import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PieceOrmEntity } from '../../../../database/entities/piece.orm-entity';
import { PieceRepository } from 'src/repositories/piece.repository';
import { PieceController } from 'src/controllers/piece.controller';
import { PieceService } from 'src/services/piece.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PieceOrmEntity]),
  ],
  controllers: [PieceController],
  providers: [
    PieceService,
    PieceRepository,
    {
      provide: 'PieceRepositoryInterface',
      useClass: PieceRepository,
    },
  ],
  exports: [PieceService, 'PieceRepositoryInterface', TypeOrmModule],
})
export class PieceModule {}