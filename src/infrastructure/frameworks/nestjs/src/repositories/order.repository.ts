import { Injectable } from '@nestjs/common';
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

  async findByTotalAmount(totalAmount: number): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ totalAmount });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw new Error(`Failed to find order by total amount: ${error.message}`);
    }
  }

  async findByStatus(status: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ status });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw new Error(`Failed to find order by status: ${error.message}`);
    }
  }

  async findByOrderDate(orderDate: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ orderDate });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw new Error(`Failed to find order by order date: ${error.message}`);
    }
  }

  async findByDeliveryDate(deliveryDate: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOneBy({ deliveryDate });
      return order ? OrderMapper.toDomainEntity(order) : null;
    } catch (error) {
      throw new Error(`Failed to find order by delivery date: ${error.message}`);
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders.map(order => OrderMapper.toDomainEntity(order));
  }

  async create(order: Order): Promise<Order> {
    try {
      // First validate all pieces stock without updating anything
      await this.validatePiecesStock(order.pieces);
      
      // If validation passes, then process the order
      const processedPieces = await this.processPiecesAndUpdateStock(order.pieces);
      const totalAmount = this.calculateTotalAmount(processedPieces);
      
      const orderToSave = OrderMapper.toOrmEntity(order);
      orderToSave.totalAmount = totalAmount;
      
      const savedOrder = await this.orderRepository.save(orderToSave);
      return OrderMapper.toDomainEntity(savedOrder);
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  private async validatePiecesStock(pieces: OrderPiece[]): Promise<void> {
    await Promise.all(
      pieces.map(async (piece) => {
        const pieceEntity = await this.findAndValidatePiece(piece.id);
        
        if (pieceEntity.quantity < piece.quantity) {
          throw new Error(
            `Not enough stock for piece ${pieceEntity.id}. Available: ${pieceEntity.quantity}, Requested: ${piece.quantity}`
          );
        }
      })
    );
  }

  private async processPiecesAndUpdateStock(
    pieces: OrderPiece[]
  ): Promise<Array<PieceOrmEntity & { orderedQuantity: number }>> {
    return Promise.all(
      pieces.map(async (piece) => {
        const pieceEntity = await this.findAndValidatePiece(piece.id);
        const newQuantity = pieceEntity.quantity - piece.quantity;
        
        await this.pieceService.updatePatch(pieceEntity.id, {
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
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  }
}