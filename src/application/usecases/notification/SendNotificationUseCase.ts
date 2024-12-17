import { Notification } from "../../../domain/entities/notification.entity"
import { NotificationRepositoryInterface } from "../../repositories/NotificationRepositoryInterface"
import { v4 } from "uuid"

export class SendNotificationUseCase {
	constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

	async execute(userId: string, message: string): Promise<Notification> {
		const notification = new Notification(v4(), userId, new Date(), message)

		return await this.notificationRepository.create(notification)
	}
}
