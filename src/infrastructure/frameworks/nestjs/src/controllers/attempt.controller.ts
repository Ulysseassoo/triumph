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
import { AttemptService } from '../services/attempt.service';
import { Attempt } from '../../../../../domain/entities/attempt.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';

@Controller('attempts')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Post()
  async create(
    @Body()
    {
      startDate,
      endDate,
      startKilometer,
      endKilometer,
      status,
      driver,
      moto,
    }: Attempt,
  ): Promise<Attempt> {
    try {
      return await this.attemptService.create({
        startDate,
        endDate,
        startKilometer,
        endKilometer,
        status,
        driver,
        moto,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('startKilometer') startKilometer?: number,
    @Query('endKilometer') endKilometer?: number,
    @Query('status') status?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Attempt[]> {
    try {
      if (
        startDate ||
        endDate ||
        startKilometer ||
        endKilometer ||
        status ||
        offset ||
        limit
      ) {
        const criteria = {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(startKilometer && { startKilometer: Number(startKilometer) }),
          ...(endKilometer && { endKilometer: Number(endKilometer) }),
          ...(status && { status }),
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) }),
          },
        };
        return await this.attemptService.findAll(criteria);
      }
      return await this.attemptService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch attempts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Attempt> {
    try {
      const attempt = await this.attemptService.findById(id);
      if (!attempt) {
        throw new HttpException(
          `Attempt not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return attempt;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Put(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() attemptData: Attempt,
  ): Promise<Attempt> {
    try {
      const attempt = await this.attemptService.update(id, attemptData);
      if (!attempt) {
        throw new HttpException(
          `Attempt not found with id : ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return attempt;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.attemptService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete attempt with id : ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
