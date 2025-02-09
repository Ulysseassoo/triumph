import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateMotoDto } from 'src/dtos/moto.dto';
import { MotoService } from 'src/services/moto.service';
import { Moto } from '../../../../../domain/entities/moto.entity';
import { JwtAuthGuard } from 'src/guardAuth/jwt.guard';

@Controller('motos')
export class MotoController {
  constructor(private readonly motoService: MotoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMaintenance(@Body() createMotoDto: CreateMotoDto) {
    const errors = await validate(createMotoDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ' + errors.toString());
    }

    return await this.motoService.createMoto(
      createMotoDto.model,
      createMotoDto.clientId,
      createMotoDto.currentMileage,
      createMotoDto.price,
      createMotoDto.status,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/update-mileage')
  async updateMileage(
    @Param('id') motoId: string,
    @Body('mileage') mileage: number,
  ) {
    const moto = this.motoService.updateMileage(motoId, mileage);
    return { message: 'Kilométrage mis à jour avec succès.', data: moto };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Moto[]> {
    return await this.motoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const moto = await this.motoService.findById(id);
    console.log('🚀 ~ MotoController ~ findOne ~ moto:', moto);
    if (!moto) {
      throw new NotFoundException('Moto not found');
    }
    return moto;
  }
}
