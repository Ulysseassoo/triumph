import { NotificationOrmEntity } from './../entities/notification.orm-entity';
import { Notification } from '../../../domain/entities/notification.entity';

export class NotificationMapper {
  static toOrmEntity(notification: Notification): NotificationOrmEntity {
    const ormNotification = new NotificationOrmEntity();
    ormNotification.id = notification.id;
    ormNotification.message = notification.message;
    ormNotification.isRead = notification.isRead;
    ormNotification.date = notification.date;
    ormNotification.user = { id: notification.userId } as any;
    return ormNotification;
  }

  static toDomainEntity(ormNotification: NotificationOrmEntity): Notification {
    return new Notification(
      ormNotification.id,
      ormNotification.user.id,
      ormNotification.date,
      ormNotification.message,
      ormNotification.isRead,
    );
  }
}