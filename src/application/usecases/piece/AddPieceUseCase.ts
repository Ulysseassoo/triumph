import { Piece } from '../../../Domain/Entities/Piece';
import { PieceRepositoryInterface } from '../../RepositoryInterfaces/PieceRepositoryInterface';

export class AddPieceUseCase {
  constructor(private readonly pieceRepository: PieceRepositoryInterface) {}

  async execute(pieceData: Partial<Piece>): Promise<Piece> {

    if (!pieceData.name || !pieceData.type || !pieceData.quantity || !pieceData.alertLimit || !pieceData.cost) {
      throw new Error('Missing required user fields');
    }

    const piece = new Piece(
        pieceData.id,
        pieceData.name,
        pieceData.type,
        pieceData.quantity,
        pieceData.cost,
        pieceData.alertLimit
    );

    return await this.pieceRepository.create(piece);
  }
}