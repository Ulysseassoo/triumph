import { 
  Controller, 
  Get, 
  Post, 
  Patch,
  Put,
  Delete,
  Body, 
  Param, 
  Query,
  HttpStatus,
  HttpException,
  UseGuards
} from '@nestjs/common';
import { PieceService } from '../services/piece.service';
import { Piece } from '../../../../../domain/entities/piece.entity';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';
import { Roles } from '../role.decorator';

@Controller('pieces')
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}

  @Post()
  async create(@Body() createPieceDto: {
    name: string;
    type: string;
    cost: number;
    quantity: number;
    alertLimit: number;
  }): Promise<Piece> {
    try {
      return await this.pieceService.create(
        createPieceDto.name,
        createPieceDto.type,
        createPieceDto.cost,
        createPieceDto.quantity,
        createPieceDto.alertLimit
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create piece',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @UseGuards(JwtAuthGuard)
  @Roles('staff')
  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('type') type?: string,
    @Query('cost') cost?: number,
    @Query('quantity') quantity?: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Piece[]> {
    try {
      if (name || type || cost || quantity || offset || limit) {
        const criteria = {
          filters: {
            ...(name && { name }),
            ...(type && { type }),
            ...(cost && { cost: Number(cost) }),
            ...(quantity && { quantity: Number(quantity) })
          },
          pagination: {
            ...(offset && { offset: Number(offset) }),
            ...(limit && { limit: Number(limit) })
          }
        };
        return await this.pieceService.findAllFilters(criteria);
      }
      return await this.pieceService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch pieces',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Piece> {
    try {
      const piece = await this.pieceService.findById(id);
      if (!piece) {
        throw new HttpException('Piece not found', HttpStatus.NOT_FOUND);
      }
      return piece;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch piece',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async updatePatch(
    @Param('id') id: string,
    @Body() updatePieceDto: Partial<Piece>
  ): Promise<Piece> {
    try {
      const piece = await this.pieceService.updatePatch(id, updatePieceDto);
      if (!piece) {
        throw new HttpException('Piece not found', HttpStatus.NOT_FOUND);
      }
      return piece;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update piece',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePieceDto: Partial<Piece>
  ): Promise<Piece> {
    try {
      const piece = await this.pieceService.update(id, updatePieceDto);
      if (!piece) {
        throw new HttpException('Piece not found', HttpStatus.NOT_FOUND);
      }
      return piece;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update piece',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.pieceService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete piece',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}