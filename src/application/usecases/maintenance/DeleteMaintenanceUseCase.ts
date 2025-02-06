import { MaintenanceRepositoryInterface } from "../../repositories/MaintenanceRepositoryInterface";

export class DeleteMaintenance {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}

  async execute(id: string) {
    await this.maintenanceRepository.delete(id);
  }
}
