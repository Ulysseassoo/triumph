import { Piece } from "../../../domain/entities/piece.entity";
import { PieceOrmEntity } from "../entities/piece.orm-entity";

export class PieceMapper {
  static toDomain(ormEntity: PieceOrmEntity): Piece {
    return new Piece(ormEntity.id, ormEntity.name, ormEntity.type, parseInt(ormEntity.quantity),  parseInt(ormEntity.cost),  parseInt(ormEntity.alertLimit));
  }
 
  name
  type
  quantity
  cos
  alertLimit
  static toOrmEntity(domainEntity: Piece): PieceOrmEntity {
    const ormEntity = new PieceOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.type = domainEntity.type;
    ormEntity.quantity = domainEntity.quantity.toString();
    ormEntity.cost = domainEntity.cost.toString();
    ormEntity.alertLimit = domainEntity.alertLimit.toString();
    return ormEntity;
  }
}