import { OrderOrmEntity } from './../../../../database/entities/order.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderRepository } from '../repositories/order.repository';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { PieceModule } from './piece.module';
import { PieceRepository } from '../repositories/piece.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OrderOrmEntity]),
    PieceModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    PieceRepository,
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: 'PieceRepositoryInterface',
      useClass: PieceRepository,
    },
  ],
  exports: [OrderService, 'OrderRepositoryInterface', TypeOrmModule],
})
export class OrderModule {}
