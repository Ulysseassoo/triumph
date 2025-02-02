import { Maintenance } from "../../../domain/entities/maintenance.entity";
import { MaintenanceRepositoryInterface } from "../../repositories/MaintenanceRepositoryInterface";

export class UpdateMaintenance {
    constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}
  
    async execute(id: string, updates: Partial<Maintenance>) {
      await this.maintenanceRepository.update(id, updates);
    }
  }