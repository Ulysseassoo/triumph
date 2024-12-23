import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpStatus, 
  HttpException 
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../../../../../domain/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: {
    pieces: { id: string; quantity: number }[];
    orderDate: string;
    deliveryDate: string;
    status: string;
    totalAmount?: number;
  }): Promise<Order> {
    try {
      return await this.orderService.create(
        createOrderDto.pieces,
        createOrderDto.orderDate,
        createOrderDto.deliveryDate,
        createOrderDto.status,
        createOrderDto.totalAmount
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('orderDate') orderDate?: string,
    @Query('deliveryDate') deliveryDate?: string,
    @Query('totalAmount') totalAmount?: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Order[]> {
    try {
      if (orderDate || status || deliveryDate || totalAmount  || offset || limit) {
        const criteria = {
          filters: {
            ...(status && { status }),
            ...(orderDate && { orderDate }),
            ...(deliveryDate && { deliveryDate }),
            ...(totalAmount && { quantity: Number(totalAmount) }),

          },
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) })
          }
        };
        return await this.orderService.findAllFilters(criteria);
      }
      return await this.orderService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch pieces',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Order> {
    try {
      const order = await this.orderService.findById(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<Order>
  ): Promise<Order> {
    try {
      const order = await this.orderService.updatePatch(id, updateOrderDto);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<Order>
  ): Promise<Order> {
    try {
      const order = await this.orderService.update(id, updateOrderDto);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.orderService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
