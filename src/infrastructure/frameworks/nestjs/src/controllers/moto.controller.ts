import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateMotoDto } from 'src/dtos/moto.dto';
import { MotoService } from 'src/services/moto.service';

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
      createMotoDto.status
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
}