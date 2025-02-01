import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MaintenanceService } from 'src/services/maintenance.service';
import { CreateMaintenanceDto } from 'src/dtos/maintenance.dto';
import { validate } from 'class-validator';

@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceService.findAll();
  }

  @Post()
  async createMaintenance(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    const errors = await validate(createMaintenanceDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ' + errors.toString());
    }

    return await this.maintenanceService.addMaintenance(
      createMaintenanceDto.motoId,
      createMaintenanceDto.kilometrageInterval,
      createMaintenanceDto.tempsInterval,
      createMaintenanceDto.recommandations
    );
  }
}