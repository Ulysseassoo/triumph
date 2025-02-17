import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Maintenance } from '../../../../../domain/entities/maintenance.entity';
import { MaintenanceService } from 'src/services/maintenance.service';
import {
  AchieveMaintenanceDto,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from 'src/dtos/maintenance.dto';
import { validate } from 'class-validator';
import { NotFoundException as CustomNotFoundException } from '../../../../../application/exceptions/NotFoundException';
import { BadRequestException as CustomBadRequestException } from '../../../../../application/exceptions/BadRequestException';
import { JwtAuthGuard } from 'src/guardAuth/jwt.guard';

@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const maintenance = await this.maintenanceService.findById(id);
    if (!maintenance) {
      throw new NotFoundException('Maintenance not found');
    }
    return maintenance;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    const existingMaintenance = await this.maintenanceService.findById(id);
    if (!existingMaintenance) {
      throw new NotFoundException('Maintenance not found');
    }

    if (updateMaintenanceDto.recommandations !== undefined) {
      existingMaintenance.recommandations =
        updateMaintenanceDto.recommandations;
    }

    if (updateMaintenanceDto.kilometrageInterval !== undefined) {
      existingMaintenance.maintenanceInterval.mileage =
        updateMaintenanceDto.kilometrageInterval;
    }

    if (updateMaintenanceDto.tempsInterval !== undefined) {
      existingMaintenance.maintenanceInterval.timeInMonths =
        updateMaintenanceDto.tempsInterval;
    }

    return await this.maintenanceService.update(existingMaintenance);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const existingMaintenance = await this.maintenanceService.findById(id);
    if (!existingMaintenance) {
      throw new NotFoundException('Maintenance not found');
    }
    return await this.maintenanceService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMaintenance(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    const errors = await validate(createMaintenanceDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ' + errors.toString());
    }

    try {
      return await this.maintenanceService.addMaintenance(
        createMaintenanceDto.motoId,
        createMaintenanceDto.kilometrageInterval,
        createMaintenanceDto.tempsInterval,
        createMaintenanceDto.recommandations,
      );
    } catch (error) {
      console.log(
        '🚀 ~ MaintenanceController ~ createMaintenance ~ error:',
        error,
      );
      if (error instanceof CustomNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof CustomBadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/achieved')
  async markAsAchieved(
    @Param('id') id: string,
    @Body() achieveMaintenanceDto: AchieveMaintenanceDto,
  ) {
    const { achievedDate, cost, pieces, recommandations } =
      achieveMaintenanceDto;
    await this.maintenanceService.markAsAchieved(
      id,
      achievedDate,
      cost,
      pieces,
      recommandations,
    );
    return {
      message: 'Entretien marqué comme réalisé et prochain entretien planifié.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/motos/:motoId/history')
  async getHistory(@Param('motoId') motoId: string) {
    return await this.maintenanceService.findByMotoId(motoId);
  }
}
