import { MaintenanceRepositoryInterface } from "../../repositories/MaintenanceRepositoryInterface";

export class FindMaintenanceUseCase {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}

  async execute(id: string) {
    return await this.maintenanceRepository.findById(id);
  }
}