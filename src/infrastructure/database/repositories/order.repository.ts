import { Repository } from 'typeorm';
import { OrderRepositoryInterface } from "../../../application/repositories/OrderRepositoryInterface";
import { Order } from "../../../domain/entities/order.entity";
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { AppDataSource } from "../../orm/typeorm/data-source";

export class TypeOrmOrderRepository implements OrderRepositoryInterface {
  private readonly repository: Repository<OrderOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(OrderOrmEntity);
  }

  async findAllFilters(criteria: {
    filters?: {
      orderDate?: string,
      deliveryDate?: string,
      quantity?: number,
      totalAmount?: number,
      status?: string
    },
    pagination?: {
      offset?: number,
      limit?: number
    }
  }): Promise<Order[]> {
    const { filters = {}, pagination = {} } = criteria;
    const { orderDate, deliveryDate, status, totalAmount } = filters;
    const { offset = 0, limit = 10 } = pagination;

    const query = this.repository.createQueryBuilder('order');

    if (orderDate) query.andWhere('order.orderDate = :orderDate', { orderDate });
    if (deliveryDate) query.andWhere('order.deliveryDate = :deliveryDate', { deliveryDate });
    if (status) query.andWhere('order.status = :status', { status });
    if (totalAmount !== undefined) query.andWhere('order.totalAmount = :totalAmount', { totalAmount: totalAmount.toString() });

    query.skip(offset).take(limit);

    const orders = await query.getMany();
    return orders.map(this.toDomainEntity);
  }

  async create(order: Order): Promise<Order> {
    const ormOrder = this.toOrmEntity(order);
    const savedOrder = await this.repository.save(ormOrder);
    return this.toDomainEntity(savedOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { id } });
    return order ? this.toDomainEntity(order) : null;
  }

  async findByStatus(status: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { status } });
    return order ? this.toDomainEntity(order) : null;
  }

  async findByOrderDate(orderDate: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { orderDate } });
    return order ? this.toDomainEntity(order) : null;
  }

  async findByDeliveryDate(deliveryDate: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { deliveryDate } });
    return order ? this.toDomainEntity(order) : null;
  }

  async findByTotalAmount(totalAmount: number): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { totalAmount: totalAmount.toString() } });
    return order ? this.toDomainEntity(order) : null;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders.map(this.toDomainEntity);
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    const existingOrder = await this.repository.findOne({ where: { id } });
    if (!existingOrder) return null;

    const updatedData = {
      ...existingOrder,
      ...orderData,
      totalAmount: orderData.totalAmount ? orderData.totalAmount.toString() : existingOrder.totalAmount
    };

    const savedOrder = await this.repository.save(updatedData);
    return this.toDomainEntity(savedOrder);
  }

  async updatePatch(id: string, orderData: Partial<Order>): Promise<Order | null> {
    const existingOrder = await this.repository.findOne({ where: { id } });
    if (!existingOrder) throw new Error(`Order with ID ${id} not found`);

    const updatedData = {
      ...existingOrder,
      ...orderData,
      totalAmount: orderData.totalAmount ? orderData.totalAmount.toString() : existingOrder.totalAmount
    };

    const savedOrder = await this.repository.save(updatedData);
    return this.toDomainEntity(savedOrder);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toOrmEntity(order: Order): OrderOrmEntity {
    const ormOrder = new OrderOrmEntity();
    ormOrder.id = order.id;
    ormOrder.deliveryDate = order.deliveryDate;
    ormOrder.orderDate = order.orderDate;
    ormOrder.pieces = order.pieces;
    ormOrder.status = order.status;
    ormOrder.totalAmount = order.totalAmount.toString();
    return ormOrder;
  }

  private toDomainEntity(order: OrderOrmEntity): Order {
    return new Order(
        order.id,
        order.pieces,
        order.orderDate,
        order.deliveryDate,
        order.status,
        parseFloat(order.totalAmount)
    );
  }
}
