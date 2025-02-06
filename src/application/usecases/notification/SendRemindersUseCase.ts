import { Moto } from "../../../domain/entities/moto.entity";
import { MaintenanceRepositoryInterface } from "../../repositories/MaintenanceRepositoryInterface";
import { MotoRepositoryInterface } from "../../repositories/MotoRepositoryInterface";
import { NotificationRepositoryInterface } from "../../repositories/NotificationRepositoryInterface";
import { PartnerRepositoryInterface } from "../../repositories/PartnerRepositoryInterface";

export class SendRemindersUseCase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    private readonly motoRepository: MotoRepositoryInterface,
    private readonly notificationRepository: NotificationRepositoryInterface,
    private readonly partnerRepository: PartnerRepositoryInterface
  ) {}

  async execute(): Promise<void> {
    const maintenances = await this.maintenanceRepository.findAll();
    const now = new Date();

    for (const maintenance of maintenances) {
      // Ne pas notifier si l'entretien est déjà réalisé
      if (maintenance.achievedDate !== null) continue;

      const moto = await this.motoRepository.findById(maintenance.motoId);
      if (!moto) continue;

      // Vérifier si l'entretien est dû par date OU kilométrage
      const isDueByDate = maintenance.plannedDate <= now;
      const isDueByMileage = moto.currentMileage >= maintenance.mileage;

      if (isDueByDate || isDueByMileage) {
        const message = this.buildReminderMessage(
          moto.model,
          isDueByDate,
          isDueByMileage
        );

        // Envoyer les notifications
        await this.sendNotifications(moto, message);
      }
    }
  }

  private buildReminderMessage(
    model: string,
    isDueByDate: boolean,
    isDueByMileage: boolean
  ): string {
    let reason = "";
    if (isDueByDate && isDueByMileage) reason = "date et kilométrage atteints";
    else if (isDueByDate) reason = "date planifiée dépassée";
    else reason = "kilométrage atteint";

    return `L'entretien pour la moto ${model} est dû (${reason}).`;
  }

  private async sendNotifications(moto: Moto, message: string) {
    await this.notificationRepository.sendEmail(
      moto.partner.contact_info,
      "Rappel d'entretien",
      message
    );

    const users = await this.partnerRepository.findUsersByPartnerId(
      moto.partner.id
    );
    await Promise.all(
      users.map((user) =>
        this.notificationRepository.sendAppNotification(user.id, message)
      )
    );
  }
}
