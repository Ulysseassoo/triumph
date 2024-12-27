import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PieceOrmEntity } from '../../../../database/entities/piece.orm-entity';
import { PieceRepositoryInterface } from '../../../../../application/repositories/PieceRepositoryInterface';
import { Piece } from '../../../../../domain/entities/piece.entity';
import { PieceMapper } from '../../../../database/mappers/piece.mapper';

interface PieceFilters {
  name?: string;
  type?: string;
  quantity?: number;
  cost?: number;
}

interface PaginationOptions {
  offset?: number;
  limit?: number;
}

interface FilterCriteria {
  filters?: PieceFilters;
  pagination?: PaginationOptions;
}
@Injectable()
export class PieceRepository implements PieceRepositoryInterface {
  constructor(
    @InjectRepository(PieceOrmEntity)
    private readonly pieceRepository: Repository<PieceOrmEntity>
  ) {}

  async findAllFilters(criteria: FilterCriteria): Promise<Piece[]> {
    const { filters = {}, pagination = {} } = criteria;
    const { name, quantity, cost, type } = filters;
    const { offset = 0, limit = 10 } = pagination;

    try {
      const query: Record<string, unknown> = {};
      if (name) query.name = name;
      if (type) query.type = type;
      if (quantity !== undefined) query.quantity = quantity;
      if (cost !== undefined) query.cost = cost;

      const pieces = await this.pieceRepository.find({
        where: query,
        skip: offset,
        take: limit
      });

      return pieces.map(piece => PieceMapper.toDomainEntity(piece));
    } catch (error) {
      console.error('Error fetching filtered pieces:', error);
      throw new Error(`Failed to fetch pieces: ${error.message}`);
    }
  }

  async create(piece: Piece): Promise<Piece> {
    try {
      const ormPiece = PieceMapper.toOrmEntity(piece);
      const savedPiece = await this.pieceRepository.save(ormPiece);
      return PieceMapper.toDomainEntity(savedPiece);
    } catch (error) {
      console.error('Error creating piece:', error);
      throw new Error(`Failed to create piece: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Piece> {
    try {
      const piece = await this.pieceRepository.findOneBy({ id });
      return piece ? PieceMapper.toDomainEntity(piece) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Piece[]> {
    const pieces = await this.pieceRepository.find();
    return pieces.map(piece => PieceMapper.toDomainEntity(piece));
  }

  async update(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    try {
      const existingPiece = await this.pieceRepository.findOneBy({ id });
      if (!existingPiece) {
        throw new Error(`Piece with ID ${id} not found`);
      }

      const updatedData = PieceMapper.toOrmEntity({
        ...PieceMapper.toDomainEntity(existingPiece),
        ...pieceData
      } as Piece);

      await this.pieceRepository.save(updatedData);
      const updatedPiece = await this.pieceRepository.findOneBy({ id });
      return PieceMapper.toDomainEntity(updatedPiece);
    } catch (error) {
      console.error('Error updating piece:', error);
      throw error;
    }
  }


  async delete(id: string): Promise<void> {
    try {
      await this.pieceRepository.delete(id);
    } catch (error) {
      console.error('Error deleting piece:', error);
      throw error;
    }
  }
}