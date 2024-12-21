import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepositoryInterface } from '../../../../../application/repositories/OrderRepositoryInterface';
import { Order } from '../../../../../domain/entities/order.entity';
import { PieceOrmEntity } from './../../../../database/entities/piece.orm-entity';
import { OrderOrmEntity } from './../../../../database/entities/order.orm-entity';
import { PieceRepository } from './piece.repository';
import { OrderMapper } from '../../../../database/mappers/order.mapper';


@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepository: Repository<OrderOrmEntity>,
    @InjectRepository(PieceOrmEntity)
    private readonly pieceRepository: Repository<PieceOrmEntity>,
    private readonly pieceService: PieceRepository
  ) {}

  async findAllFilters(criteria: any): Promise<Order[]> {
    const { filters = {}, pagination = {} } = criteria;
    const { orderDate, deliveryDate, quantity, totalAmount, status } = filters;
    const { offset = 0, limit = 10 } = pagination;

    try {
      const query: Record<string, any> = {};
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

  async create(order: Order): Promise<Order> {
    try {
      const processedPieces = await this.processPiecesAndUpdateStock(order.pieces as Array<{ id: string; quantity: number }>);
      const totalAmount = this.calculateTotalAmount(processedPieces);
      
      const orderToSave = OrderMapper.toOrmEntity(order);
      orderToSave.totalAmount = totalAmount;
      
      const savedOrder = await this.orderRepository.save(orderToSave);
      return OrderMapper.toDomainEntity(savedOrder);
    } catch (error) {
      await this.handleErrorAndRollback(order.pieces as Array<{ id: string; quantity: number }>);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  private async processPiecesAndUpdateStock(
    pieces: Array<{ id: string; quantity: number }>
  ): Promise<Array<PieceOrmEntity & { orderedQuantity: number }>> {
    return Promise.all(
      pieces.map(async (piece) => {
        const pieceEntity = await this.findAndValidatePiece(piece.id);
        await this.validateAndUpdateStock(pieceEntity, piece.quantity);
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

  private async validateAndUpdateStock(
    pieceEntity: PieceOrmEntity,
    requestedQuantity: number
  ): Promise<void> {
    const currentStock = pieceEntity.quantity;
  
    if (currentStock < requestedQuantity) {
      throw new Error(
        `Not enough stock for piece ${pieceEntity.id}. Available: ${currentStock}, Requested: ${requestedQuantity}`
      );
    }
  
    const newQuantity = currentStock - requestedQuantity;
  
    await this.pieceService.updatePatch(pieceEntity.id, {
      quantity: newQuantity
    });
  }

  private calculateTotalAmount(
    processedPieces: Array<PieceOrmEntity & { orderedQuantity: number }>
  ): number {
    return processedPieces.reduce(
      (total, piece) => total + piece.cost * piece.orderedQuantity,
      0
    );
  }

  private async handleErrorAndRollback(
    pieces: Array<{ id: string; quantity: number }>
  ): Promise<void> {
    try {
      await Promise.all(
        pieces.map(async (piece) => {
          const pieceEntity = await this.pieceRepository.findOne({
            where: { id: piece.id }
          });
  
          if (pieceEntity) {
            const currentStock = pieceEntity.quantity;
            const newQuantity = currentStock + piece.quantity;
  
            await this.pieceService.updatePatch(piece.id, {
              quantity: newQuantity
            });
          }
        })
      );
    } catch (rollbackError) {
      throw new Error(`Rollback failed: ${rollbackError.message}`);
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ status });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByOrderDate(orderDate: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ orderDate });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByDeliveryDate(deliveryDate: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ deliveryDate });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByTotalAmount(totalAmount: number): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ totalAmount });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders.map(order => OrderMapper.toDomainEntity(order));
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    try {
      const existingOrder = await this.orderRepository.findOneBy({ id });
      if (!existingOrder) {
        throw new Error(`Order with ID ${id} not found`);
      }

      const updatedOrder = { ...existingOrder, ...OrderMapper.toOrmEntity(orderData as Order) };
      await this.orderRepository.save(updatedOrder);
      
      return OrderMapper.toDomainEntity(updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  async updatePatch(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const existingOrder = await this.orderRepository.findOneBy({ id });
      if (!existingOrder) {
        throw new Error(`Order with ID ${id} not found`);
      }
  
      const updatedData = {
        ...existingOrder,
        ...OrderMapper.toOrmEntity(orderData as Order)
      };
  
      const savedOrder = await this.orderRepository.save(updatedData);
      return OrderMapper.toDomainEntity(savedOrder);
    } catch (error) {
      throw new Error(`Failed to patch order: ${error.message}`);
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
      throw error;
    }
  }
}