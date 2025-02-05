import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CorrectiveActionService } from '../services/corrective-action.service';

@Controller('corrective-actions')
export class CorrectiveActionController {
  constructor(
    private readonly correctiveActionService: CorrectiveActionService,
  ) {}

  @Post()
  async createCorrectiveAction(
    @Body('reparationId') reparationId: string,
    @Body('description') description: string,
  ) {
    return await this.correctiveActionService.createCorrectiveAction(
      reparationId,
      description
    );
  }

  @Get('reparation/:reparationId')
  async findByReparationId(@Param('reparationId') reparationId: string) {
    return await this.correctiveActionService.findByReparationId(reparationId);
  }
}
