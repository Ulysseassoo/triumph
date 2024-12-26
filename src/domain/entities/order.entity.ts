export interface OrderPiece {
    id: string;
    quantity: number;
  }
  
  export class Order {
    public constructor(
      public readonly id: string,
      public readonly pieces: OrderPiece[],
      public readonly orderDate: string,
      public readonly deliveryDate: string,
      public readonly status: string,
      public readonly totalAmount: number,
      public readonly previousQuantity: OrderPiece[],
    ) {}
  }