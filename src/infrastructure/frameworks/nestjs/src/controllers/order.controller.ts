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
  HttpException,
  UseGuards
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../../../../../domain/entities/order.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
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
