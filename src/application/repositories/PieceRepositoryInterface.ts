import { Piece } from '../../domain/entities/piece.entity';

export interface PieceRepositoryInterface {
  create(piece: Piece): Promise<Piece>;
  findById(id: string): Promise<Piece | null>;
  findAll(): Promise<Piece[]>;
  findAllFilters(criteria: object): Promise<Piece[]>;
  update(id: string, pieceData: Partial<Piece>): Promise<Piece>;
  updatePatch(id: string, pieceData: Partial<Piece>): Promise<Piece>;
  delete(id: string): Promise<void>;
}
