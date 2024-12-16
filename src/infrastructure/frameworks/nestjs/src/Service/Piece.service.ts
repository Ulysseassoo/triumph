import { Injectable, Inject } from '@nestjs/common';
import { Piece } from '@domain/Entities/Piece';
import { PieceRepositoryInterface } from '@application/RepositoryInterfaces/PieceRepositoryInterface';

@Injectable()
export class PieceService {
  constructor(
    @Inject('PieceRepositoryInterface')
    private readonly pieceRepository: PieceRepositoryInterface
  ) {}

  async create(pieceData: {
    name: string;
    type: string;
    cost: number;
    quantity: number;
    alertLimit: number;
  }): Promise<Piece> {
    const piece = new Piece(
      null,
      pieceData.name,
      pieceData.type,
      pieceData.cost,
      pieceData.quantity,
      pieceData.alertLimit
    );
    return await this.pieceRepository.create(piece);
  }
  async findAllFilters(criteria: {
    filters?: { name?: string; type?: string; cost?: number; quantity?: number,alertLimit?:number },
    pagination?: { offset?: number; limit?: number }
  }): Promise<Piece[]> {
    return await this.pieceRepository.findAllFilters(criteria);
  }
  async findById(id: string): Promise<Piece> {
    return await this.pieceRepository.findById(id);
  }

  async findByName(name: string): Promise<Piece> {
    return await this.pieceRepository.findByName(name);
  }

  async findByType(type: string): Promise<Piece> {
    return await this.pieceRepository.findByType(type);
  }

  async findByQuantity(quantity: number): Promise<Piece> {
    return await this.pieceRepository.findByQuantity(quantity);
  }
  async findByCost(cost: number): Promise<Piece> {
    return await this.pieceRepository.findByCost(cost);
  }

  async findByAlertLimit(alertLimit: number): Promise<Piece> {
    return await this.pieceRepository.findByAlertLimit(alertLimit);
  }

  async findAll(): Promise<Piece[]> {
    return await this.pieceRepository.findAll();
  }

  async updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    return await this.pieceRepository.updatePatch(id, pieceData);
  }
  async update(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    return await this.pieceRepository.update(id, pieceData);
  }

  async delete(id: string): Promise<void> {
    await this.pieceRepository.delete(id);
  }
}
