import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BreakdownService } from '../services/breakdown.service';

@Controller('breakdowns')
export class BreakdownController {
  constructor(private readonly breakdownService: BreakdownService) {}

  @Post()
  async createBreakdown(@Body('motoId') motoId: string, @Body('description') description: string) {
    return await this.breakdownService.createBreakdown(motoId, description);
  }

  @Put(':breakdownId/associate-warranty')
  async associateWarranty(@Param('breakdownId') breakdownId: string, @Body('warrantyId') warrantyId: string) {
    await this.breakdownService.associateWarranty(breakdownId, warrantyId);
    return { message: 'Garantie associée avec succès.' };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.breakdownService.findById(id);
  }

  @Get('moto/:motoId')
  async findByMotoId(@Param('motoId') motoId: string) {
    return await this.breakdownService.findByMotoId(motoId);
  }
}