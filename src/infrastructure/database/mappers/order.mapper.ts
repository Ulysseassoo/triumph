import { Order } from "../../../domain/entities/order.entity";
import { OrderOrmEntity } from "../entities/order.orm-entity";
import { PieceMapper } from './piece.mapper';

export class OrderMapper {
  static toOrmEntity(order: Order): OrderOrmEntity {
    const ormOrder = new OrderOrmEntity();

    ormOrder.id = order.id;
    ormOrder.deliveryDate = order.deliveryDate;
    ormOrder.orderDate = order.orderDate;
    ormOrder.status = order.status;
    ormOrder.totalAmount = order.totalAmount;
    ormOrder.pieces = order.pieces
    return ormOrder;
  }
  static toDomainEntity(ormOrder: OrderOrmEntity): Order {
    return new Order(
      ormOrder.id,
      ormOrder.pieces,
      ormOrder.deliveryDate,
      ormOrder.orderDate,
      ormOrder.status,
      ormOrder.totalAmount,
    );
  }
}