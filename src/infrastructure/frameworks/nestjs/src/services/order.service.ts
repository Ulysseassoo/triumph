import { Injectable, Inject } from '@nestjs/common';
import { Order,OrderPiece } from '../../../../../domain/entities/order.entity';
import { OrderRepositoryInterface } from '../../../../../application/repositories/OrderRepositoryInterface';
import { CreateOrderUseCase } from '../../../../../application/usecases/order/CreateOrderUseCase';
import { UpdateOrderUseCase } from '../../../../../application/usecases/order/UpdateOrderUseCase';
import { DeleteOrderUseCase } from '../../../../../application/usecases/order/DeleteOrderUseCase';
import { PieceRepositoryInterface } from '../../../../../application/repositories/PieceRepositoryInterface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepositoryInterface')
    private readonly orderRepository: OrderRepositoryInterface,
    @Inject('OrderRepositoryInterface')
    private readonly pieceRepository: PieceRepositoryInterface
  ) {}

  async create(
    pieces: OrderPiece[],
    orderDate: string,
    deliveryDate: string,
    status: string,
    totalAmount?: number
  ): Promise<Order> {
    const createOrderUseCase = new CreateOrderUseCase(
      this.orderRepository,
      this.pieceRepository
    );

    return await createOrderUseCase.execute({
      pieces,
      orderDate,
      deliveryDate,
      status,
      totalAmount
    });
  }

  async update(
    id: string,
    orderData: Partial<Order>
  ): Promise<Order | null> {
    const updateOrderUseCase = new UpdateOrderUseCase(
      this.orderRepository,
      this.pieceRepository
    );

    return await updateOrderUseCase.execute({
      id,
      ...orderData
    });
  }

  async updatePatch(
    id: string,
    orderData: Partial<Order>
  ): Promise<Order> {
    const updateOrderUseCase = new UpdateOrderUseCase(
      this.orderRepository,
      this.pieceRepository
    );

    return await updateOrderUseCase.execute({
      id,
      ...orderData
    });
  }

  async delete(id: string): Promise<void> {
    const deleteOrderUseCase = new DeleteOrderUseCase(this.orderRepository);
    await deleteOrderUseCase.execute({ id });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }

  async findByStatus(status: string): Promise<Order | null> {
    return await this.orderRepository.findByStatus(status);
  }

  async findByOrderDate(orderDate: string): Promise<Order | null> {
    return await this.orderRepository.findByOrderDate(orderDate);
  }

  async findByDeliveryDate(deliveryDate: string): Promise<Order | null> {
    return await this.orderRepository.findByDeliveryDate(deliveryDate);
  }

  async findByTotalAmount(totalAmount: number): Promise<Order | null> {
    return await this.orderRepository.findByTotalAmount(totalAmount);
  }

  async findAllFilters(criteria: {
    filters?: {
      orderDate?: string;
      deliveryDate?: string;
      status?: string;
      totalAmount?: number;
    };
    pagination?: {
      offset?: number;
      limit?: number;
    };
  }): Promise<Order[]> {
    return await this.orderRepository.findAllFilters(criteria);
  }
}