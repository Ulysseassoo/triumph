import { Notification } from './../../domain/entities/notification.entity';

export interface NotificationRepositoryInterface {
	create(notification: Notification): Promise<Notification>
	findById(id: string): Promise<Notification | null>
	findByUserId(userId: string): Promise<Notification[]>
}
