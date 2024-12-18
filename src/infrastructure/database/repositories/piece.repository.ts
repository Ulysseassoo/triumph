import { PieceOrmEntity } from './../entities/piece.orm-entity';
import { Repository } from 'typeorm';
import { PieceRepositoryInterface } from "../../../application/repositories/PieceRepositoryInterface";
import { Piece } from "../../../domain/entities/piece.entity";
import { AppDataSource } from "../../orm/typeorm/data-source";

export class TypeOrmPieceRepository implements PieceRepositoryInterface {
  private readonly repository: Repository<PieceOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(PieceOrmEntity);
  }
  async findById(id: string): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ id });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async create(piece: Piece): Promise<Piece> {
    const ormPiece = this.toOrmEntity(piece);
    const savedOrmPiece = await this.repository.save(ormPiece);
    return this.toDomainEntity(savedOrmPiece);
  }

  async findByName(name: string): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ name });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByType(type: string): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ type });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByQuantity(quantity: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ quantity: quantity.toString() });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }
  async findByCost(cost: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ cost: cost.toString() });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByAlertLimit(alertLimit: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ alertLimit: alertLimit.toString() });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findAllFilters(criteria: object): Promise<Piece[]> {
    const ormPieces = await this.repository.find({
      where: criteria
    });
    return ormPieces.map(this.toDomainEntity);
  }

  async update(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    // Full update
    await this.repository.update(id, this.toOrmEntity(pieceData as Piece));

    const updatedOrmPiece = await this.repository.findOneBy({ id });
    if (!updatedOrmPiece) {
      throw new Error('Piece not found after update');
    }

    return this.toDomainEntity(updatedOrmPiece);
  }

  async updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    // Find existing piece
    const existingOrmPiece = await this.repository.findOneBy({ id });
    if (!existingOrmPiece) {
      throw new Error('Piece not found');
    }

    // Update only the provided fields
    Object.assign(existingOrmPiece, this.toOrmEntity(pieceData as Piece));

    const updatedOrmPiece = await this.repository.save(existingOrmPiece);
    return this.toDomainEntity(updatedOrmPiece);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error('Piece not found');
    }
  }

  async findAll(): Promise<Piece[]> {
    const ormPieces = await this.repository.find();
    return ormPieces.map(this.toDomainEntity);
  }

  private toOrmEntity(piece: Piece): PieceOrmEntity {
    const ormPiece = new PieceOrmEntity();
    ormPiece.id = piece.id;
    ormPiece.alertLimit = piece.alertLimit.toString();
    ormPiece.name = piece.name;
    ormPiece.type = piece.type;
    ormPiece.cost = piece.cost.toString();
    ormPiece.quantity = piece.quantity.toString();
    return ormPiece;
  }
  private toDomainEntity(piece: PieceOrmEntity): Piece {
    return new Piece(
      piece.id,
      piece.name,
      piece.type,
      parseFloat(piece.alertLimit),
      parseFloat(piece.cost),
      parseFloat(piece.quantity)
    );
  }
}
