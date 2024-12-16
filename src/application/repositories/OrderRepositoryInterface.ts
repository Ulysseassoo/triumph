import { Order } from '../../domain/entities/order.entity';

export interface OrderRepositoryInterface {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  findByTotalAmount(totalAmount: number): Promise<Order>;
  findByStatus(status: string): Promise<Order>;
  findByOrderDate(status: string): Promise<Order>;
  findByDeliveryDate(status: string): Promise<Order>;
  findAll(): Promise<Order[]>;
  findAllFilters(criteria: object): Promise<Order[]>;
  update(id: string, orderData: Partial<Order>): Promise<Order>;
  updatePatch(id: string, orderData: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;

}