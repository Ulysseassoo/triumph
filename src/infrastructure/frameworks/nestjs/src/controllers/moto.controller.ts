import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
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
}