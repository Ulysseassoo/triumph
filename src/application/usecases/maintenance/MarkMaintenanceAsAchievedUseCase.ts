import { Piece } from "../../../domain/entities/piece.entity";
import { MaintenanceRepositoryInterface } from "./../../repositories/MaintenanceRepositoryInterface";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { Maintenance } from "../../../domain/entities/maintenance.entity";
import { v4 } from "uuid";


export class MarkMaintenanceAchieved {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface
  ) {}

  async execute(
    id: string,
    achievedDate: Date,
    cost: number,
    pieces: Piece[],
    recommandations: string
  ): Promise<void> {
    const maintenance = await this.maintenanceRepository.findById(id);
    if (!maintenance) {
      throw new NotFoundException("Entretien non trouvé");
    }

    maintenance.markAsAchieved(achievedDate, cost, pieces, recommandations);
    await this.maintenanceRepository.save(maintenance);

    const nextMaintenance = new Maintenance(
      v4(),
      maintenance.motoId,
      maintenance.maintenanceType,
      maintenance.calculateNextMaintenanceDate(maintenance.mileage),
      maintenance.mileage + maintenance.maintenanceInterval.mileage,
      null,
      maintenance.maintenanceInterval,
    );

    await this.maintenanceRepository.save(nextMaintenance);
  }
}
