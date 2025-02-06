import { Reparation } from "../../domain/entities/reparation.entity";


export interface ReparationRepositoryInterface {
  save(reparation: Reparation): Promise<void>;
  findByBreakdownId(breakdownId: string): Promise<Reparation[]>;
}