import { v4 as uuidv4 } from 'uuid';
import { OrderRepositoryInterface } from '../../repositories/OrderRepositoryInterface';
import { PieceRepositoryInterface } from '../../repositories/PieceRepositoryInterface';
import { Order, OrderPiece } from '../../../domain/entities/order.entity';

interface UpdateOrderProps {
  id: string;
  pieces?: OrderPiece[];
  orderDate?: string;
  deliveryDate?: string;
  status?: string;
  totalAmount?: number;
}

export class UpdateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async execute({
    id,
    pieces,
    orderDate,
    deliveryDate,
    status,
    totalAmount
  }: UpdateOrderProps): Promise<Order> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }

    const updateData = {
      ...(pieces && { pieces }),
      ...(orderDate && { orderDate }),
      ...(deliveryDate && { deliveryDate }),
      ...(status && { status }),
      ...(totalAmount && { totalAmount })
    };

    const updatedOrder = await this.orderRepository.update(id, updateData);
    if (!updatedOrder) {
      throw new Error(`Failed to update order ${id}`);
    }

    return updatedOrder;
  }
}