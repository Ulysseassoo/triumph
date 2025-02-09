import { Breakdown } from "../../domain/entities/breakdown.entity";

export interface BreakdownRepositoryInterface {
  save(breakdown: Breakdown): Promise<void>;
  findById(id: string): Promise<Breakdown | null>;
  findByMotoId(motoId: string): Promise<Breakdown[]>;
  findAll(): Promise<Breakdown[]>;
}