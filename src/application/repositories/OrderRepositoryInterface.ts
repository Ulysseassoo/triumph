import { Order } from '../../domain/entities/order.entity';

export interface OrderRepositoryInterface {
  create(order: Order): Promise<Order>;
  findById(id: string):Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findAllFilters(criteria: object): Promise<Order[]>;
  update(id: string, orderData: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;

}