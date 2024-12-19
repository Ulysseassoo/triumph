import { Order } from "../../../domain/entities/order.entity";
import { OrderRepositoryInterface } from "../../repositories/OrderRepositoryInterface";

interface OrderFilterOptions {
  orderDate?: string;
  deliveryDate?: string,
  totalAmount?: number;
  status?: string;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export class ListOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(
    filterOptions: OrderFilterOptions = {},
    paginationOptions: PaginationOptions = {}
  ): Promise<{
    data: Order[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { orderDate, deliveryDate, totalAmount, status } = filterOptions;
    const { page = 1, limit = 10 } = paginationOptions;
    const offset = (page - 1) * limit;

    const orders = await this.orderRepository.findAllFilters({
      filters: {  orderDate, deliveryDate , totalAmount,status },
      pagination: { offset, limit }
    });

    return {
      data: orders,
      total: orders.length,
      page,
      limit
    };
  }
}