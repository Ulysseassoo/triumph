import { Order } from '../../domain/entities/order.entity';

export interface OrderRepositoryInterface {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByTotalAmount(totalAmount: number): Promise<Order | null>;
  findByStatus(status: string): Promise<Order | null>;
  findByOrderDate(status: string): Promise<Order | null>;
  findByDeliveryDate(status: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findAllFilters(criteria: object): Promise<Order[]>;
  update(id: string, orderData: Partial<Order>): Promise<Order | null>;
  updatePatch(id: string, orderData: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<void>;

}
