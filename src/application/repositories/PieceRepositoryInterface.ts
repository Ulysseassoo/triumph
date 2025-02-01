import { Piece } from '../../domain/entities/piece.entity';

export interface PieceRepositoryInterface {
  create(piece: Piece): Promise<Piece>;
  findById(id: string): Promise<Piece>;
  findByName(name: string): Promise<Piece>;
  findByType(type: string): Promise<Piece>;
  findByQuantity(quantity: number): Promise<Piece>;
  findByCost(cost: number): Promise<Piece>;
  findByAlertLimit(alertLimit: number): Promise<Piece>;
  findAll(): Promise<Piece[]>;
  findAllFilters(criteria: object): Promise<Piece[]>;
  update(id: string, pieceData: Partial<Piece>): Promise<Piece>;
  updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece>;
  delete(id: string): Promise<void>;
}