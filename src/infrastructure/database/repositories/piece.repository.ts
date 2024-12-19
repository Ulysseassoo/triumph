import { PieceOrmEntity } from '../entities/piece.orm-entity';
import { Repository } from 'typeorm';
import { PieceRepositoryInterface } from "../../../application/repositories/PieceRepositoryInterface";
import { Piece } from "../../../domain/entities/piece.entity";
import { AppDataSource } from "../../orm/typeorm/data-source";


export class TypeOrmPieceRepository implements PieceRepositoryInterface {
  private readonly repository: Repository<PieceOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(PieceOrmEntity);
  }
  async findByType(type: string): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ type });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByQuantity(quantity: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ quantity });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByCost(cost: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ cost });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findByAlertLimit(alertLimit: number): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ alertLimit });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async create(piece: Piece): Promise<Piece> {
    const ormPiece = this.toOrmEntity(piece);
    const createdPiece = await this.repository.save(ormPiece);
    return this.toDomainEntity(createdPiece);
  }

 

  async findByName(name: string): Promise<Piece> {
    const ormPiece = await this.repository.findOneBy({ name });
    if (!ormPiece) {
      throw new Error(`Piece with name ${name} not found`);
    }
    return this.toDomainEntity(ormPiece);
  }

  

  async findAllFilters(criteria: object): Promise<Piece[]> {
    const ormPieces = await this.repository.find({
      where: criteria
    });
    return ormPieces.map(this.toDomainEntity);
  }

  async updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    const existingPiece = await this.repository.findOneBy({ id });
    if (!existingPiece) {
      throw new Error(`Piece with id ${id} not found`);
    }
    Object.assign(existingPiece, this.toOrmEntity(pieceData as Piece));
    
    const updatedPiece = await this.repository.save(existingPiece);
    return this.toDomainEntity(updatedPiece);
  }

  async update(id: string, pieceData: Partial<Piece>): Promise<Piece> {
    const existingPiece = await this.repository.findOneBy({ id });
    if (!existingPiece) {
      throw new Error(`Piece with id ${id} not found`);
    }

    // Update all fields
    const updatedOrmPiece = this.toOrmEntity({ ...this.toDomainEntity(existingPiece), ...pieceData });
    const savedPiece = await this.repository.save(updatedOrmPiece);
    return this.toDomainEntity(savedPiece);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Piece with id ${id} not found`);
    }
  }

  async save(piece: Piece): Promise<Piece> {
    const ormPiece = this.toOrmEntity(piece);
    const savedOrmPiece = await this.repository.save(ormPiece);
    return this.toDomainEntity(savedOrmPiece);
  }

  async findById(id: string): Promise<Piece | null> {
    const ormPiece = await this.repository.findOneBy({ id });
    return ormPiece ? this.toDomainEntity(ormPiece) : null;
  }

  async findAll(): Promise<Piece[]> {
    const ormPieces = await this.repository.find();
    return ormPieces.map(this.toDomainEntity);
  }

  private toOrmEntity(piece: Piece): PieceOrmEntity {
    const ormPiece = new PieceOrmEntity();
    ormPiece.id = piece.id;
    ormPiece.name = piece.name;
    ormPiece.cost = piece.cost;
    ormPiece.alertLimit = piece.alertLimit;
    ormPiece.quantity = piece.quantity;
    ormPiece.type = piece.type;
    return ormPiece;
  }

  private toDomainEntity(piece: PieceOrmEntity): Piece {
    return new Piece(
      piece.id,
      piece.name,
      piece.type,
      piece.quantity,
      piece.cost,
      piece.alertLimit,
    );
  }
}