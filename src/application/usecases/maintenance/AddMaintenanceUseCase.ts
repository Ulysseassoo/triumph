import { v4 } from "uuid";
import { SendNotificationUseCase } from "./../notification/SendNotificationUseCase";
import { MaintenanceRepositoryInterface } from "./../../repositories/MaintenanceRepositoryInterface";
import {
  Maintenance,
  MaintenanceType,
} from "./../../../domain/entities/maintenance.entity";
import { MotoRepositoryInterface } from "../../repositories/MotoRepositoryInterface";

interface Props {
  motoId: string;
  kilometrageInterval: number;
  tempsInterval: number;
  recommandations: string;
}

export class AddMaintenanceUseCase {
  constructor(
    private readonly repository: MaintenanceRepositoryInterface,
    private readonly motoRepository: MotoRepositoryInterface,
    private readonly sendNotificationUseCase: SendNotificationUseCase
  ) {}

  async execute({
    motoId,
    kilometrageInterval,
    tempsInterval,
    recommandations,
  }: Props): Promise<Maintenance | null> {
    const moto = await this.motoRepository.findById(motoId);
    if (!moto) {
      throw new Error("Moto introuvable");
    }

    if (!moto.isEligibleForMaintenance(kilometrageInterval, tempsInterval)) {
      throw new Error("La moto n’est pas encore éligible pour un entretien");
    }
    const maintenance = new Maintenance(
      v4(),
      motoId,
      MaintenanceType.PREVENTIF,
      new Date(),
      moto.currentMileage,
      null,
      { mileage: kilometrageInterval, timeInMonths: tempsInterval },
      recommandations,
      40
    );

    const newMaintenance = this.repository.create(maintenance);

    // Envoyer une notification au client
    await this.sendNotificationUseCase.execute({
      clientPartnerId: moto.clientPartnerId,
      message: `Un entretien a été planifié pour votre moto (${moto.model})`,
    });

    return newMaintenance;
  }
}
