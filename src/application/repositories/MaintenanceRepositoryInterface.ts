import { Maintenance } from './../../domain/entities/maintenance.entity';

export interface MaintenanceRepositoryInterface {
  create(maintenance: Maintenance): Promise<Maintenance>;
  findById(id: string): Promise<Maintenance | null>;
  findAll(): Promise<Maintenance[]>;
  update(id: string, maintenance: Partial<Maintenance>): Promise<void>;
  delete(id: string): Promise<void>;
  save: (maintenance: Maintenance) => Promise<Maintenance>;
  findByMotoId(motoId: string): Promise<Maintenance[]>;
}