import { Order } from "../../../domain/entities/order.entity";
import { OrderRepositoryInterface } from "../../repositories/OrderRepositoryInterface";

export class AddOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderData: Partial<Order>): Promise<Order> {
    if (!orderData.pieces || !orderData.orderDate ||!orderData.deliveryDate || !orderData.totalAmount || !orderData.status ) {
      throw new Error("Missing required order fields");
    }

    const order = new Order(
      orderData.id ?? crypto.randomUUID(),
      orderData.pieces,
      orderData.status,
      orderData.orderDate,
      orderData.deliveryDate,
      orderData.totalAmount,
      
    );

    return await this.orderRepository.create(order);
  }
}
