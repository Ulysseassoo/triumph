import {  Piece } from "../../../domain/entities/piece.entity";
import { v4 } from "uuid"
import { PieceRepositoryInterface } from "../../repositories/PieceRepositoryInterface";
interface Props {
  name:string,
  type:string,
  cost:number,
  quantity:number,
  alertLimit:number,
  previousQuantity:number,
}

export class CreatePieceUseCase {
  constructor(private readonly pieceRepository: PieceRepositoryInterface) {}

  async execute({ name, type, cost, quantity, alertLimit , previousQuantity}: Props): Promise<Piece | null> {

    const piece = new Piece(
        v4(),
         name,
         type,
         cost,
         quantity,
         alertLimit,
    )


    const newPiece = await this.pieceRepository.create(piece);

    return newPiece;
  }
}
