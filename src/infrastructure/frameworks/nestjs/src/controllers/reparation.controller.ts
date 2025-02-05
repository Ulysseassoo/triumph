import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReparationService } from '../services/reparation.service';
@Controller('reparations')
export class ReparationController {
  constructor(private readonly reparationService: ReparationService) {}

  @Post()
  async createReparation(
    @Body('breakdownId') breakdownId: string,
    @Body('description') description: string,
    @Body('cost') cost: number,
  ) {
    return await this.reparationService.createReparation(breakdownId, description, cost);
  }

  @Get('breakdown/:breakdownId')
  async findByBreakdownId(@Param('breakdownId') breakdownId: string) {
    return await this.reparationService.findByBreakdownId(breakdownId);
  }
}
