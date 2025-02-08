import { Warranty } from "../../domain/entities/warranty.entity";

export interface WarrantyRepositoryInterface {
  save(warranty: Warranty): Promise<void>;
  findById(id: string): Promise<Warranty | null>;
  findAll(): Promise<Warranty[]>;
}