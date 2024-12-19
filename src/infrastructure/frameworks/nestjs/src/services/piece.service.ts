import { PieceRepositoryInterface } from './../../../../../application/repositories/PieceRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class PieceService {
  constructor(
    @Inject('PieceRepositoryInterface')
    private readonly pieceRepository: PieceRepositoryInterface,
  ) {}
}
