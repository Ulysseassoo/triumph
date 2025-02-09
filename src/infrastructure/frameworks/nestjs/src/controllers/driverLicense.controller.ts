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
import { DriverLicense } from '../../../../../domain/entities/driverLicense.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';
import { DriverLicenseService } from 'src/services/driverLicense.service';

@Controller('driver-licenses')
export class DriverLicenseController {
  constructor(private readonly driverLicenseService: DriverLicenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    {
      licenseNumber,
      category,
      expiryDate,
      obtainDate,
      country,
      status,
      driver,
    }: DriverLicense,
  ): Promise<DriverLicense> {
    try {
      return await this.driverLicenseService.create({
        licenseNumber,
        category,
        expiryDate,
        obtainDate,
        country,
        status,
        driver,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create driver license',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('licenseNumber') licenseNumber?: string,
    @Query('category') category?: string,
    @Query('expiryDate') expiryDate?: string,
    @Query('obtainDate') obtainDate?: string,
    @Query('country') country?: string,
    @Query('status') status?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<DriverLicense[]> {
    try {
      if (
        licenseNumber ||
        category ||
        expiryDate ||
        obtainDate ||
        country ||
        status ||
        offset ||
        limit
      ) {
        const criteria = {
          ...(licenseNumber && { licenseNumber }),
          ...(category && { category }),
          ...(expiryDate && { expiryDate }),
          ...(obtainDate && { obtainDate }),
          ...(country && { country }),
          ...(status && { status }),
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) }),
          },
        };
        return await this.driverLicenseService.findAll(criteria);
      }
      return await this.driverLicenseService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch driver licenses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<DriverLicense> {
    try {
      const driverLicense = await this.driverLicenseService.findById(id);
      if (!driverLicense) {
        throw new HttpException(
          `Driver license not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driverLicense;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch driver license',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() driverLicenseData: DriverLicense,
  ): Promise<DriverLicense> {
    try {
      const driverLicense = await this.driverLicenseService.update(
        id,
        driverLicenseData,
      );
      if (!driverLicense) {
        throw new HttpException(
          `Driver license not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return driverLicense;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update driver license',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.driverLicenseService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete driver license with id : ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
