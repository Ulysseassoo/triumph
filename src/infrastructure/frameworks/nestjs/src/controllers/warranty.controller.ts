import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { WarrantyService } from '../services/warranty.service';
import { Warranty } from '../../../../../domain/entities/warranty.entity';

@Controller('warranties')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  async createWarranty(@Body() warranty: Warranty) {
    try {
      const createdWarranty = await this.warrantyService.createWarranty(warranty);
      return {
        message: 'Warranty created successfully',
        warranty: createdWarranty,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create warranty',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const warranty = await this.warrantyService.findById(id);
      if (!warranty) {
        throw new HttpException('Warranty not found', HttpStatus.NOT_FOUND);
      }
      return warranty;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch warranty',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}