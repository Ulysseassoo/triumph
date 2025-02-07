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
import { Crash } from '../../../../../domain/entities/crash.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';
import { CrashService } from 'src/services/crash.service';

@Controller('crashes')
export class CrashController {
  constructor(private readonly crashService: CrashService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    {
      type,
      date,
      location,
      responsability,
      consequence,
      status,
      description,
      driver,
      moto,
    }: Crash,
  ): Promise<Crash> {
    try {
      return await this.crashService.create({
        type,
        date,
        location,
        description,
        responsability,
        consequence,
        status,
        driver,
        moto,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create crash',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('date') date?: string,
    @Query('location') location?: string,
    @Query('description') description?: string,
    @Query('responsability') responsability?: string,
    @Query('consequence') consequence?: string,
    @Query('status') status?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Crash[]> {
    try {
      if (
        type ||
        date ||
        location ||
        description ||
        responsability ||
        consequence ||
        status ||
        offset ||
        limit
      ) {
        const criteria = {
          ...(type && { type }),
          ...(date && { date }),
          ...(location && { location }),
          ...(description && { description }),
          ...(responsability && { responsability }),
          ...(consequence && { consequence }),
          ...(status && { status }),
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) }),
          },
        };
        return await this.crashService.findAll(criteria);
      }
      return await this.crashService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch crashes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Crash> {
    try {
      const crash = await this.crashService.findById(id);
      if (!crash) {
        throw new HttpException(
          `Crash not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return crash;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch crash',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Put(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() crashData: Crash,
  ): Promise<Crash> {
    try {
      const crash = await this.crashService.update(id, crashData);
      if (!crash) {
        throw new HttpException(
          `Crash not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return crash;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update crash',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.crashService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete crash with id : ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
