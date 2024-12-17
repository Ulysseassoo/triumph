import { Maintenance } from './../../domain/entities/maintenance.entity';

export interface MaintenanceRepositoryInterface {
  create(maintenance: Maintenance): Promise<Maintenance>;
  findById(id: string): Promise<Maintenance | null>;
  findByMotoId(motoId: string): Promise<Maintenance[]>;
  findAll(): Promise<Maintenance[]>;
  save(entretien: Maintenance): Promise<void>;
  delete(id: string): Promise<void>;
  findAllDue(date: Date, mileage: number): Promise<Maintenance[]>;
  updateMileage(id: number, mileage: number): Promise<void>;
}