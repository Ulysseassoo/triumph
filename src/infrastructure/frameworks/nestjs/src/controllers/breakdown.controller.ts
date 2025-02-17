import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BreakdownService } from '../services/breakdown.service';
import { Breakdown } from '../../../../../domain/entities/breakdown.entity';
import { JwtAuthGuard } from 'src/guardAuth/jwt.guard';

@Controller('breakdowns')
export class BreakdownController {
  constructor(private readonly breakdownService: BreakdownService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBreakdown(
    @Body('motoId') motoId: string,
    @Body('description') description: string,
  ) {
    try {
      const breakdown = await this.breakdownService.createBreakdown(
        motoId,
        description,
      );
      return {
        message: 'Breakdown created successfully',
        breakdown,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create breakdown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':breakdownId/associate-warranty')
  async associateWarranty(
    @Param('breakdownId') breakdownId: string,
    @Body('warrantyId') warrantyId: string,
  ) {
    try {
      await this.breakdownService.associateWarranty(breakdownId, warrantyId);
      return { message: 'Warranty associated successfully.' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to associate warranty',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Breakdown[]> {
    return await this.breakdownService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const breakdown = await this.breakdownService.findById(id);
      if (!breakdown) {
        throw new HttpException('Breakdown not found', HttpStatus.NOT_FOUND);
      }
      return breakdown;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch breakdown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('moto/:motoId')
  async findByMotoId(@Param('motoId') motoId: string) {
    try {
      return await this.breakdownService.findByMotoId(motoId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch breakdowns',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
