import { Warranty } from "../../domain/entities/warranty.entity";

export interface WarrantyRepositoryInterface {
  save({
    motoId,
    startDate,
    endDate,
  }: {
    motoId: string;
    startDate: string;
    endDate: string;
  }): Promise<Warranty>;
  findById(id: string): Promise<Warranty | null>;
  findAll(): Promise<Warranty[]>;
}