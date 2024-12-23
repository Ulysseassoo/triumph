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
    private readonly pieceRepository: PieceRepositoryInterface,
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

    if (pieces) {
      await this.restoreOldStock(existingOrder.pieces);
      await this.validateNewPiecesAvailability(pieces);
      await this.updatePiecesStock(pieces);
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

  private async validateNewPiecesAvailability(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (!piece) {
        throw new Error(`Piece with ID ${orderPiece.id} not found`);
      }

      if (piece.quantity === 0) {
        throw new Error(`Piece ${piece.name} is out of stock`);
      }

      if (piece.quantity < orderPiece.quantity) {
        throw new Error(
          `Insufficient stock for piece ${piece.name}. Available: ${piece.quantity}, Requested: ${orderPiece.quantity}`
        );
      }
    }
  }

  private async restoreOldStock(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (piece) {
        const restoredQuantity = piece.quantity + orderPiece.quantity;
        await this.pieceRepository.updatePatch(piece.id, {
          quantity: restoredQuantity
        });
      }
    }
  }

  private async updatePiecesStock(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (piece) {
        const newQuantity = piece.quantity - orderPiece.quantity;
        if (newQuantity < 0) {
          throw new Error(
            `Update would result in negative stock for piece ${piece.name}`
          );
        }
        await this.pieceRepository.updatePatch(piece.id, {
          quantity: newQuantity
        });
      }
    }
  }
}