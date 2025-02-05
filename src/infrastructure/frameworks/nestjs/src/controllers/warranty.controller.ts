import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WarrantyService } from '../services/warranty.service';
import { Warranty } from '../../../../../domain/entities/warranty.entity';

@Controller('warranties')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  async createWarranty(@Body() warranty: Warranty) {
    return await this.warrantyService.createWarranty(warranty);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.warrantyService.findById(id);
  }
}