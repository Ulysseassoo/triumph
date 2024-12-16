import { Injectable, Inject } from '@nestjs/common';
import { Order } from '@domain/Entities/Order';
import { OrderRepositoryInterface } from '@application/RepositoryInterfaces/OrderRepositoryInterface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepositoryInterface')
    private readonly orderRepository: OrderRepositoryInterface
  ) {}

  async create(orderData: {
    pieces: object[];
    status: string;
    orderDate: string;
    deliveryDate: string;
    totalAmount?: number;
  }): Promise<Order> {
    const order = new Order(
      null,
      orderData.pieces,
      orderData.status,
      orderData.orderDate,
      orderData.deliveryDate,
      orderData.totalAmount,
    );
    return await this.orderRepository.create(order);
  }

  async findAllFilters(criteria: {
    filters?: {  orderDate?: string; deliveryDate?: string; status?: string; totalAmount?: number; quantity?: number },
    pagination?: { offset?: number; limit?: number }
  }): Promise<Order[]> {
    return await this.orderRepository.findAllFilters(criteria);
  }
  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  async findByStatus(status: string): Promise<Order> {
    return await this.orderRepository.findByStatus(status);
  }
  async findByOrderDate(date: string): Promise<Order> {
    return await this.orderRepository.findByStatus(date);
  }
  async findByDeliveryDate(date: string): Promise<Order> {
    return await this.orderRepository.findByStatus(date);
  }
  async findByTotalAmount(totalAmont: number): Promise<Order> {
    return await this.orderRepository.findByTotalAmount(totalAmont);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order> {
    return await this.orderRepository.update(id, orderData);
  }
  async updatePatch(id: string, orderData: Partial<Order>): Promise<Order> {
    return await this.orderRepository.updatePatch(id, orderData);
  }
  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}