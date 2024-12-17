import { Body, Controller, Get, Post } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MaintenanceService } from 'src/services/maintenance.service';

@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceService.findAll();
  }

  @Post()
  async createMaintenance(
    @Body('motoId') motoId: string,
    @Body('kilometrageInterval') kilometrageInterval: number,
    @Body('tempsInterval') tempsInterval: number,
    @Body('recommandations') recommandations: string
  ) {
    return await this.maintenanceService.addMaintenance(motoId, kilometrageInterval, tempsInterval, recommandations);
  }
}
