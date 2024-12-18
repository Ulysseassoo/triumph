import { Order } from "../../../domain/entities/order.entity";
import { OrderOrmEntity } from "../entities/order.orm-entity";

export class OrderMapper {
  static toDomain(ormEntity: OrderOrmEntity): Order {
    return new Order(ormEntity.id, ormEntity.pieces, ormEntity.deliveryDate, ormEntity.orderDate, ormEntity.status, parseInt(ormEntity.totalAmount));
  }

  static toOrmEntity(domainEntity: Order): OrderOrmEntity {
    const ormEntity = new OrderOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.pieces = domainEntity.pieces;
    ormEntity.deliveryDate = domainEntity.deliveryDate;
    ormEntity.orderDate = domainEntity.orderDate;
    ormEntity.status = domainEntity.status;
    ormEntity.totalAmount = domainEntity.totalAmount.toString();
    return ormEntity;
  }
}
