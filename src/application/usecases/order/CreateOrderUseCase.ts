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
  previousQuantity: OrderPiece[],
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
    totalAmount,
    previousQuantity
  }: CreateOrderProps): Promise<Order> {

    const order = new Order(
      v4(),
      pieces,
      status,
      orderDate,
      deliveryDate,
      totalAmount,
      previousQuantity
    );

    await this.updatePiecesStock(pieces);

    const newOrder = await this.orderRepository.create(order);

    return newOrder;
  }



  private async updatePiecesStock(pieces: OrderPiece[]): Promise<void> {
    for (const orderPiece of pieces) {
      const piece = await this.pieceRepository.findById(orderPiece.id);
      if (piece) {
        const newQuantity = piece.quantity + orderPiece.quantity;
        await this.pieceRepository.update(piece.id, {
          quantity: newQuantity
        });
      }
    }
  }

}