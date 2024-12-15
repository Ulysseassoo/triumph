import { Maintenance } from './../../domain/entities/maintenance.entity';
export interface MaintenanceRepositoryInterface {
  findAll(): Promise<Maintenance[]>;
}