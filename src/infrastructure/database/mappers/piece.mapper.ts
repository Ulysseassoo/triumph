import { PieceOrmEntity } from './../entities/piece.orm-entity';
import { Piece } from '../../../domain/entities/piece.entity';

export class PieceMapper {
  static toOrmEntity(piece: Piece): PieceOrmEntity {
    const ormPiece = new PieceOrmEntity();
    ormPiece.id = piece.id;
    ormPiece.name = piece.name;
    ormPiece.type = piece.type;
    ormPiece.cost = piece.cost;
    ormPiece.quantity = piece.quantity;
    ormPiece.alertLimit = piece.alertLimit;
    return ormPiece;
  }

  static toDomainEntity(ormPiece: PieceOrmEntity): Piece {
    return new Piece(
      ormPiece.id,
      ormPiece.name,
      ormPiece.type,
      ormPiece.cost,
      ormPiece.quantity,
      ormPiece.alertLimit
    );
  }
}