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
  HttpException
} from '@nestjs/common';
import { PieceService } from '../services/piece.service';
import { Piece } from '../../../../../domain/entities/piece.entity';

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

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('type') type?: string,
    @Query('cost') cost?: number,
    @Query('quantity') quantity?: number,
    @Query('alertLimit') alertLimit?: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Piece[]> {
    try {
      if (name || type || cost || quantity || alertLimit || offset || limit) {
        const criteria = {
          filters: {
            ...(name && { name }),
            ...(type && { type }),
            ...(cost && { cost: Number(cost) }),
            ...(quantity && { quantity: Number(quantity) }),
            ...(alertLimit && { alertLimit: Number(alertLimit) })
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

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Piece> {
    try {
      const piece = await this.pieceService.findByName(name);
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

  @Get('type/:type')
  async findByType(@Param('type') type: string): Promise<Piece> {
    try {
      const piece = await this.pieceService.findByType(type);
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

  @Get('quantity/:quantity')
  async findByQuantity(@Param('quantity') quantity: number): Promise<Piece> {
    try {
      const piece = await this.pieceService.findByQuantity(Number(quantity));
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

  @Get('cost/:cost')
  async findByCost(@Param('cost') cost: number): Promise<Piece> {
    try {
      const piece = await this.pieceService.findByCost(Number(cost));
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

  @Get('alert-limit/:alertLimit')
  async findByAlertLimit(@Param('alertLimit') alertLimit: number): Promise<Piece> {
    try {
      const piece = await this.pieceService.findByAlertLimit(Number(alertLimit));
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