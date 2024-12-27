import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepositoryInterface } from '../../../../../application/repositories/OrderRepositoryInterface';
import { Order, OrderPiece } from '../../../../../domain/entities/order.entity';
import { PieceOrmEntity } from './../../../../database/entities/piece.orm-entity';
import { OrderOrmEntity } from './../../../../database/entities/order.orm-entity';
import { PieceRepository } from './piece.repository';
import { OrderMapper } from '../../../../database/mappers/order.mapper';

interface OrderFilters {
  orderDate?: string;
  deliveryDate?: string;
  quantity?: number;
  totalAmount?: number;
  status?: string;
}

interface PaginationOptions {
  offset?: number;
  limit?: number;
}

interface FilterCriteria {
  filters?: OrderFilters;
  pagination?: PaginationOptions;
}

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepository: Repository<OrderOrmEntity>,
    @InjectRepository(PieceOrmEntity)
    private readonly pieceRepository: Repository<PieceOrmEntity>,
    private readonly pieceService: PieceRepository
  ) {}

  async findAllFilters(criteria: FilterCriteria): Promise<Order[]> {
    const { filters = {}, pagination = {} } = criteria;
    const { orderDate, deliveryDate, quantity, totalAmount, status } = filters;
    const { offset = 0, limit = 10 } = pagination;

    try {
      const query: Record<string, unknown> = {};
      if (orderDate) query.orderDate = orderDate;
      if (status) query.status = status;
      if (deliveryDate) query.deliveryDate = deliveryDate;
      if (quantity !== undefined) query.quantity = quantity;
      if (totalAmount !== undefined) query.totalAmount = totalAmount;

      const orders = await this.orderRepository.find({
        where: query,
        skip: offset,
        take: limit
      });
      
      return orders.map(order => OrderMapper.toDomainEntity(order));
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders.map(order => OrderMapper.toDomainEntity(order));
  }

  async create(order: Order): Promise<Order> {
    try {
      const processedPieces = await this.processPiecesAndUpdateStock(order.pieces);
      const totalAmount = this.calculateTotalAmount(processedPieces);

      const orderToSave = OrderMapper.toOrmEntity(order);
      orderToSave.totalAmount = totalAmount;
       // Save previous quantities of pieces
       orderToSave.previousQuantity = order.pieces.map(piece => ({
        id: piece.id,
        quantity: piece.quantity
      }));

      const savedOrder = await this.orderRepository.save(orderToSave);
      return OrderMapper.toDomainEntity(savedOrder);
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }



  private async processPiecesAndUpdateStock(
    pieces: OrderPiece[]
  ): Promise<Array<PieceOrmEntity & { orderedQuantity: number }>> {
    return Promise.all(
      pieces.map(async (piece) => {
        const pieceEntity = await this.findAndValidatePiece(piece.id);
        const newQuantity = pieceEntity.quantity + piece.quantity;

        await this.pieceService.update(pieceEntity.id, {
          quantity: newQuantity
        });

        return {
          ...pieceEntity,
          orderedQuantity: piece.quantity
        };
      })
    );
  }

  private async findAndValidatePiece(pieceId: string): Promise<PieceOrmEntity> {
    const pieceEntity = await this.pieceRepository.findOne({
      where: { id: pieceId }
    });

    if (!pieceEntity) {
      throw new Error(`Piece with ID ${pieceId} not found`);
    }
    
    return pieceEntity;
  }

  private calculateTotalAmount(
    processedPieces: Array<PieceOrmEntity & { orderedQuantity: number }>
  ): number {
    return processedPieces.reduce(
      (total, piece) => total + piece.cost * piece.orderedQuantity,
      0
    );
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  private async restoreAndUpdateStock(
    existingOrder: OrderOrmEntity,
    newPieces: OrderPiece[]
  ): Promise<Array<PieceOrmEntity & { orderedQuantity: number }>> {
    return Promise.all(
      newPieces.map(async (newPiece) => {
        const pieceEntity = await this.findAndValidatePiece(newPiece.id);
        const previousPieceData = existingOrder.previousQuantity.find( p => p.id === newPiece.id);
        const restoredQuantity = pieceEntity.quantity - (previousPieceData?.quantity || 0);
        const newQuantity = restoredQuantity + newPiece.quantity;
        await this.pieceService.update(newPiece.id, {
          quantity: newQuantity
        });

        return {
          ...pieceEntity,
          orderedQuantity: newPiece.quantity
        };
      })
    );
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id },
        relations: ['pieces']
      });

      if (!existingOrder) {
        return null;
      }

      let totalAmount = existingOrder.totalAmount;
      let processedPieces = [];

      if (orderData.pieces) {
        processedPieces = await this.restoreAndUpdateStock(existingOrder, orderData.pieces);
        totalAmount = this.calculateTotalAmount(processedPieces);
        existingOrder.previousQuantity = orderData.pieces.map(piece => ({
          id: piece.id,
          quantity: piece.quantity
        }));
      }

      const updateData = OrderMapper.toOrmEntity({
        ...orderData,
        id,
        totalAmount,
        previousQuantity: existingOrder.previousQuantity
      } as Order);
      await this.orderRepository.save(updateData);
      const updatedOrder = await this.orderRepository.findOneBy({ id });
      return updatedOrder ? OrderMapper.toDomainEntity(updatedOrder) : null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const existingOrder = await this.orderRepository.findOneBy({ id });
      if (!existingOrder) {
        throw new Error(`Order with ID ${id} not found`);
      }
      await this.orderRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  }
}