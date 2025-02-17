import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ReparationService } from '../services/reparation.service';
import { JwtAuthGuard } from 'src/guardAuth/jwt.guard';

@Controller('reparations')
export class ReparationController {
  constructor(private readonly reparationService: ReparationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReparation(
    @Body('breakdownId') breakdownId: string,
    @Body('description') description: string,
    @Body('cost') cost: number,
  ) {
    try {
      const reparation = await this.reparationService.createReparation(
        breakdownId,
        description,
        cost,
      );
      return {
        message: 'Reparation created successfully',
        reparation,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create reparation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/breakdowns/:breakdownId')
  async findByBreakdownId(@Param('breakdownId') breakdownId: string) {
    try {
      return await this.reparationService.findByBreakdownId(breakdownId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch reparations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
