import { OrderOrmEntity } from '../entities/order.orm-entity';
import { Repository } from 'typeorm';
import { OrderRepositoryInterface } from '../../../application/repositories/OrderRepositoryInterface';
import { Order } from '../../../domain/entities/order.entity';
import { AppDataSource } from '../../orm/typeorm/data-source';

export class TypeOrmOrderRepository implements OrderRepositoryInterface {
  private readonly repository: Repository<OrderOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(OrderOrmEntity);
  }

  async create(order: Order): Promise<Order> {
    const ormOrder = this.toOrmEntity(order);
    const createdOrder = await this.repository.save(ormOrder);
    return this.toDomainEntity(createdOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOneBy({ id });
    return ormOrder ? this.toDomainEntity(ormOrder) : null;
  }

  async findByTotalAmount(totalAmount: number): Promise<Order | null> {
    const ormOrder = await this.repository.findOneBy({ totalAmount });
    return ormOrder ? this.toDomainEntity(ormOrder) : null;
  }

  async findByStatus(status: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOneBy({ status });
    return ormOrder ? this.toDomainEntity(ormOrder) : null;
  }

  async findByOrderDate(orderDate: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOneBy({ orderDate });
    return ormOrder ? this.toDomainEntity(ormOrder) : null;
  }

  async findByDeliveryDate(deliveryDate: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOneBy({ deliveryDate });
    return ormOrder ? this.toDomainEntity(ormOrder) : null;
  }

  async findAll(): Promise<Order[]> {
    const ormOrders = await this.repository.find();
    return ormOrders.map(this.toDomainEntity);
  }

  async findAllFilters(criteria: object): Promise<Order[]> {
    const ormOrders = await this.repository.find({ where: criteria });
    return ormOrders.map(this.toDomainEntity);
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order> {
    const existingOrder = await this.repository.findOneBy({ id });
    if (!existingOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrmOrder = this.toOrmEntity({ ...this.toDomainEntity(existingOrder), ...orderData });
    const savedOrder = await this.repository.save(updatedOrmOrder);
    return this.toDomainEntity(savedOrder);
  }

  async updatePatch(id: string, orderData: Partial<Order>): Promise<Order> { const existingOrder = await this.repository.findOneBy({ id });
    if (!existingOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    Object.assign(existingOrder, this.toOrmEntity(orderData as Order));
    
    const updatedOrder = await this.repository.save(existingOrder);
    return this.toDomainEntity(updatedOrder);
  }


  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Order with id ${id} not found`);
    }
  }

  private toOrmEntity(order: Order): OrderOrmEntity {
    const ormOrder = new OrderOrmEntity();
    ormOrder.id = order.id;
    ormOrder.pieces = order.pieces;
    ormOrder.status = order.status;
    ormOrder.orderDate = order.orderDate;
    ormOrder.deliveryDate = order.deliveryDate;
    ormOrder.totalAmount = order.totalAmount;
    return ormOrder;
  }

  private toDomainEntity(ormOrder: OrderOrmEntity): Order {
    return new Order(
      ormOrder.id,
      ormOrder.pieces,
      ormOrder.status,
      ormOrder.orderDate,
      ormOrder.deliveryDate,
      ormOrder.totalAmount,
    );
  }
}
