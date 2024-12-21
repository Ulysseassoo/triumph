import { Injectable, Inject } from '@nestjs/common';
// import { Piece } from '../../../../../domain/entities/piece.entity';
import { PieceRepositoryInterface } from '../../../../../application/repositories/PieceRepositoryInterface';
// import { CreatePieceUseCase } from '../../../../../application/usecases/piece/CreatePieceUseCase';
// import { UpdatePieceUseCase } from '../../../../../application/usecases/piece/UpdatePieceUseCase';
// import { DeletePieceUseCase } from '../../../../../application/usecases/piece/DeletePieceUseCase';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PieceRepositoryInterface')
    private readonly pieceRepository: PieceRepositoryInterface,
  ) {}

}