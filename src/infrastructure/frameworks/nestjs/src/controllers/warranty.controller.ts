import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { WarrantyService } from '../services/warranty.service';
import { Warranty } from '../../../../../domain/entities/warranty.entity';
import { CreateWarrantyDto } from 'src/dtos/warranty.dto';
import { validate } from 'class-validator';

@Controller('warranties')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  async createWarranty(@Body() createWarrantyDto: CreateWarrantyDto) {
    try {
      const errors = await validate(createWarrantyDto);
      if (errors.length > 0) {
        throw new BadRequestException(
          'Validation failed: ' + errors.toString(),
        );
      }
      const createdWarranty =
        await this.warrantyService.createWarranty(createWarrantyDto);

        return createdWarranty;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create warranty',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Warranty[]> {
    return await this.warrantyService.findAll();
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
