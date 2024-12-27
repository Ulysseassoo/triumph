import { PieceRepositoryInterface } from "../../repositories/PieceRepositoryInterface";

interface DeleteProps {
  id: string;
}

export class DeletePieceUseCase {
  constructor(private readonly pieceRepository: PieceRepositoryInterface) {}

  async execute({ id }: DeleteProps): Promise<void> {
    const existingPiece = await this.pieceRepository.findById(id);

    if (!existingPiece) {
      throw new Error("Piece not found");
    }

    const success = await this.pieceRepository.delete(id);

    return success;
  }
}
