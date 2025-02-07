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
import { DriverExperience } from '../../../../../domain/entities/driverExperience.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';
import { DriverExperienceService } from 'src/services/driverExperience.service';

@Controller('driverExperiences')
export class DriverExperienceController {
  constructor(
    private readonly driverExperienceService: DriverExperienceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    {
      duration,
      type,
      rented,
      professional,
      feedback,
      driver,
    }: DriverExperience,
  ): Promise<DriverExperience> {
    try {
      return await this.driverExperienceService.create({
        duration,
        type,
        rented,
        professional,
        feedback,
        driver,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create driver experience',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('duration') duration?: string,
    @Query('type') type?: string,
    @Query('rented') rented?: boolean,
    @Query('professional') professional?: boolean,
    @Query('feedback') feedback?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<DriverExperience[]> {
    try {
      if (
        duration ||
        type ||
        rented ||
        professional ||
        feedback ||
        offset ||
        limit
      ) {
        const criteria = {
          ...(duration && { duration }),
          ...(type && { type }),
          ...(rented && { rented }),
          ...(professional && { professional }),
          ...(feedback && { feedback }),
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) }),
          },
        };
        return await this.driverExperienceService.findAll(criteria);
      }
      return await this.driverExperienceService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch driver experiences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<DriverExperience> {
    try {
      const driverExperience = await this.driverExperienceService.findById(id);
      if (!driverExperience) {
        throw new HttpException(
          `DriverExperience not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driverExperience;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch driver experience',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Put(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() driverExperienceData: DriverExperience,
  ): Promise<DriverExperience> {
    try {
      const driverExperience = await this.driverExperienceService.update(
        id,
        driverExperienceData,
      );
      if (!driverExperience) {
        throw new HttpException(
          `DriverExperience not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driverExperience;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update driver experience',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.driverExperienceService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete driver experience with id : ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
