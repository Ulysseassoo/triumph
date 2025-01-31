import { Notification } from "../../../domain/entities/notification.entity";
import { NotificationRepositoryInterface } from "../../repositories/NotificationRepositoryInterface";
import { PartnerRepositoryInterface } from "../../repositories/PartnerRepositoryInterface";
import { v4 } from "uuid";

interface Props {
  userId?: string;
  message: string;
  clientPartnerId?: string;
}

export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepositoryInterface,
    private readonly partnerRepository: PartnerRepositoryInterface
  ) {}

  async execute({
    userId,
    message,
    clientPartnerId,
  }: Props): Promise<Notification[]> {
    if (!userId && !clientPartnerId) {
      throw new Error("userId or clientPartnerId is required");
    }

	const notifications: Notification[] = [];

    if (clientPartnerId) {
      const users = await this.partnerRepository.findUsersByPartnerId(
        clientPartnerId
      );
      for (const user of users) {
        const notification = new Notification(
          v4(),
          user.id,
          new Date(),
          message
        );
        notifications.push(
          await this.notificationRepository.create(notification)
        );
      }
    } else {
		const notification = new Notification(v4(), userId, new Date(), message);
		notifications.push(await this.notificationRepository.create(notification));
	}

	return notifications;
  }
}
