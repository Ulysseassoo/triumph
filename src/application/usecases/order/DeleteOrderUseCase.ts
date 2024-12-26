import { OrderRepositoryInterface } from "../../repositories/OrderRepositoryInterface";

interface DeleteProps {
  id: string;
}

export class DeleteOrderUseCase {
  constructor(private readonly OrderRepository: OrderRepositoryInterface) {}

  async execute({ id }: DeleteProps): Promise<void> {
    const existingOrder = await this.OrderRepository.findById(id);

    if (!existingOrder) {
      throw new Error("Order not found");
    }
     await this.OrderRepository.delete(id);
  }
}
