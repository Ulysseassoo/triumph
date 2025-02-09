import { v4 } from "uuid";
import { SendNotificationUseCase } from "./../notification/SendNotificationUseCase";
import { MaintenanceRepositoryInterface } from "./../../repositories/MaintenanceRepositoryInterface";
import {
  Maintenance,
  MaintenanceType,
} from "./../../../domain/entities/maintenance.entity";
import { MotoRepositoryInterface } from "../../repositories/MotoRepositoryInterface";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { BadRequestException } from "../../exceptions/BadRequestException";

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
      throw new NotFoundException("Moto introuvable");
    }

    if (!moto.isEligibleForMaintenance(kilometrageInterval, tempsInterval)) {
      throw new BadRequestException("La moto n’est pas encore éligible pour un entretien");
    }

    // Calcul de la prochaine date et du prochain kilométrage
    const lastMaintenance = await this.repository.findLatestByMotoId(motoId);

    const plannedDate = new Date();
    plannedDate.setMonth(
      plannedDate.getMonth() + tempsInterval,
      lastMaintenance?.plannedDate.getDate() || new Date().getDate()
    );

    const plannedMileage = (lastMaintenance?.mileage || moto.currentMileage) + kilometrageInterval;

    const maintenance = new Maintenance(
      v4(),
      motoId,
      MaintenanceType.PREVENTIF,
      plannedDate,
      plannedMileage,
      null,
      { mileage: kilometrageInterval, timeInMonths: tempsInterval },
      recommandations,
      40
    );

    const newMaintenance = this.repository.create(maintenance);

    // Envoyer une notification au client
    await this.sendNotificationUseCase.execute({
      clientPartnerId: moto.partner.id,
      message: `Un entretien a été planifié pour votre moto (${moto.model}) à ${plannedMileage}km`,
    });

    return newMaintenance;
  }
}
