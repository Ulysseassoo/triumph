import { Piece } from "../../../domain/entities/piece.entity";
import { PieceRepositoryInterface } from "../../repositories/PieceRepositoryInterface";

interface UpdateProps {
  id: string;
  name?: string;
  type?: string;
  cost?: number;
  quantity?: number;
  alertLimit?: number;
  previousQuantity? : number;
}

export class UpdatePieceUseCase {
  constructor(private readonly pieceRepository: PieceRepositoryInterface) {}

  async execute({ id, name, type, cost, quantity, alertLimit,previousQuantity }: UpdateProps): Promise<Piece | null> {
    const existingPiece = await this.pieceRepository.findById(id);

    if (!existingPiece) {
      throw new Error("Piece not found");
    }

    const updatedPiece = {
      ...existingPiece,
      name: name ?? existingPiece.name,
      type: type ?? existingPiece.type,
      cost: cost ?? existingPiece.cost,
      quantity: quantity ?? existingPiece.quantity,
      alertLimit: alertLimit ?? existingPiece.alertLimit,
    };

    const result = await this.pieceRepository.update(id,updatedPiece);

    return result;
  }
}