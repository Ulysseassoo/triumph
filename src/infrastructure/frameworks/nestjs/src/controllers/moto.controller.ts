import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateMotoDto } from 'src/dtos/moto.dto';
import { MotoService } from 'src/services/moto.service';
import { Moto } from '../../../../../domain/entities/moto.entity';

@Controller('motos')
export class MotoController {
  constructor(private readonly motoService: MotoService) {}

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

  @Post(':id/update-mileage')
  async updateMileage(
    @Param('id') motoId: string,
    @Body('mileage') mileage: number,
  ) {
    const moto = this.motoService.updateMileage(motoId, mileage);
    return { message: 'Kilométrage mis à jour avec succès.', data: moto };
  }

  @Get()
  async findAll(): Promise<Moto[]> {
    return await this.motoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const moto = await this.motoService.findById(id);
    console.log("🚀 ~ MotoController ~ findOne ~ moto:", moto)
    if (!moto) {
      throw new NotFoundException('Moto not found');
    }
    return moto;
  }
}
