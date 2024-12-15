import { Controller, Get } from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MaintenanceService } from 'src/services/maintenance.service';

@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceService.findAll();
  }
}
