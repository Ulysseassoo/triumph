import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PieceRepositoryInterface } from "../../../../../application/repositories/PieceRepositoryInterface";
import { PieceOrmEntity } from '../../../../database/entities/piece.orm-entity';
import { Piece } from '../../../../../domain/entities/piece.entity';

@Injectable()
export class PieceRepository implements PieceRepositoryInterface {
  constructor(
    @InjectRepository(PieceOrmEntity)
    private readonly repository: Repository<PieceOrmEntity>,
  ) {}
    create(piece: Piece): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findByName(name: string): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findByType(type: string): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findByQuantity(quantity: number): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findByCost(cost: number): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findByAlertLimit(alertLimit: number): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Piece[]> {
        throw new Error('Method not implemented.');
    }
    findAllFilters(criteria: object): Promise<Piece[]> {
        throw new Error('Method not implemented.');
    }
    update(id: string, pieceData: Partial<Piece>): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
