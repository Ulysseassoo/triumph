import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationRepositoryInterface } from "../../../../../application/repositories/NotificationRepositoryInterface";
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { Notification } from '../../../../../domain/entities/notification.entity';

@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repository: Repository<NotificationOrmEntity>,
  ) {}
    create(notification: Notification): Promise<Notification> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Notification | null> {
        throw new Error('Method not implemented.');
    }
    findByUserId(userId: string): Promise<Notification[]> {
        throw new Error('Method not implemented.');
    }
}
