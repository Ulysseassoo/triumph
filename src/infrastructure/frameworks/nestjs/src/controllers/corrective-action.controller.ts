import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      const correctiveAction = await this.correctiveActionService.createCorrectiveAction(
        reparationId,
        description,
      );
      return {
        message: 'Corrective action created successfully',
        correctiveAction,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create corrective action',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('reparation/:reparationId')
  async findByReparationId(@Param('reparationId') reparationId: string) {
    try {
      return await this.correctiveActionService.findByReparationId(reparationId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch corrective actions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}