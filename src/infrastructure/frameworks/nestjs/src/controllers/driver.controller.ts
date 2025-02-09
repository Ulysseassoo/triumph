import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { DriverService } from '../services/driver.service';
import { Driver } from '../../../../../domain/entities/driver.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    {
      firstname,
      lastname,
      birthdate,
      addresse,
      licenses,
      crashes,
      experiences,
      attempts,
    }: Driver,
  ): Promise<Driver> {
    try {
      return await this.driverService.create({
        firstname,
        lastname,
        birthdate,
        addresse,
        licenses,
        experiences,
        crashes,
        attempts,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create driver',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('firstname') firstname?: string,
    @Query('lastname') lastname?: string,
    @Query('birthdate') birthdate?: string,
    @Query('addresse') addresse?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Driver[]> {
    try {
      if (firstname || lastname || birthdate || addresse || offset || limit) {
        const criteria = {
          ...(firstname && { firstname }),
          ...(lastname && { lastname }),
          ...(birthdate && { birthdate }),
          ...(addresse && { addresse }),
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) }),
          },
        };
        return await this.driverService.findAll(criteria);
      }
      return await this.driverService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch drivers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Driver> {
    try {
      const driver = await this.driverService.findById(id);
      if (!driver) {
        throw new HttpException(
          `Driver not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driver;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch driver',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Put(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() driverData: Driver,
  ): Promise<Driver> {
    try {
      const driver = await this.driverService.update(id, driverData);
      if (!driver) {
        throw new HttpException(
          `Driver not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driver;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update driver',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.driverService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete driver with id : ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
