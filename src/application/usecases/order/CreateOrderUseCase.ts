import { v4 } from "uuid";
import { OrderRepositoryInterface } from "../../repositories/OrderRepositoryInterface";
import { Order , OrderPiece } from "../../../domain/entities/order.entity";
import { PieceRepositoryInterface } from "../../repositories/PieceRepositoryInterface";


interface CreateOrderProps {
  pieces: OrderPiece[];
  orderDate: string;
  deliveryDate: string;
  status: string;
  totalAmount: number;
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly pieceRepository: PieceRepositoryInterface,
  ) {}

  async execute({
    pieces,
    orderDate,
    deliveryDate,
    status,
    totalAmount
  }: CreateOrderProps): Promise<Order> {
    // await this.validatePiecesAvailability(pieces);

    const order = new Order(
      v4(),
      pieces,
      status,
      orderDate,
      deliveryDate,
      totalAmount
    );

    await this.updatePiecesStock(pieces);

    const newOrder = await this.orderRepository.create(order);

    return newOrder;
  }

  private async validatePiecesAvailability(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (!piece) {
        throw new Error(`Pièce avec l'ID ${orderPiece.id} introuvable`);
      }

      if (piece.quantity < orderPiece.quantity) {
        throw new Error(
          `Stock insuffisant pour la pièce ${piece.name}. Stock disponible: ${piece.quantity}, Quantité demandée: ${orderPiece.quantity}`
        );
      }
    }
  }

  private async updatePiecesStock(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (piece) {
        const newQuantity = piece.quantity - orderPiece.quantity;
        await this.pieceRepository.updatePatch(piece.id, {
          quantity: newQuantity
        });
      }
    }
  }

}