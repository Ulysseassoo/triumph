import { Injectable, Inject } from '@nestjs/common';
import { Piece } from '../../../../../domain/entities/piece.entity';
import { PieceRepositoryInterface } from '../../../../../application/repositories/PieceRepositoryInterface';
import { CreatePieceUseCase } from '../../../../../application/usecases/piece/CreatePieceUseCase';
import { UpdatePieceUseCase } from '../../../../../application/usecases/piece/UpdatePieceUseCase';
import { DeletePieceUseCase } from '../../../../../application/usecases/piece/DeletePieceUseCase';

@Injectable()
export class PieceService {
  constructor(
    @Inject('PieceRepositoryInterface')
    private readonly pieceRepository: PieceRepositoryInterface,
  ) {}

  async create(
    name: string,
    type: string,
    cost: number,
    quantity: number,
    alertLimit: number,
  ): Promise<Piece> {
    const createPieceUseCase = new CreatePieceUseCase(this.pieceRepository);
    
    return await createPieceUseCase.execute({
      name,
      type,
      cost,
      quantity,
      alertLimit,
    });
  }

  async update(
    id: string,
    pieceData: Partial<Piece>
  ): Promise<Piece> {
    const updatePieceUseCase = new UpdatePieceUseCase(this.pieceRepository);
    return await updatePieceUseCase.execute({
      id,
      ...pieceData
    });
  }

  async updatePatch(
    id: string,
    pieceData: Partial<Piece>
  ): Promise<Piece> {
    const updatePieceUseCase = new UpdatePieceUseCase(this.pieceRepository);
    return await updatePieceUseCase.execute({
      id,
      ...pieceData
    });
  }

  async delete(id: string): Promise<void> {
    const deletePieceUseCase = new DeletePieceUseCase(this.pieceRepository);
    await deletePieceUseCase.execute({ id });
  }

  async findAll(): Promise<Piece[]> {
    return await this.pieceRepository.findAll();
  }

  async findById(id: string): Promise<Piece> {
    return await this.pieceRepository.findById(id);
  }

  async findAllFilters(criteria: {
    filters?: {
      name?: string;
      type?: string;
      cost?: number;
      quantity?: number;
    };
    pagination?: {
      offset?: number;
      limit?: number;
    };
  }): Promise<Piece[]> {
    return await this.pieceRepository.findAllFilters(criteria);
  }
}