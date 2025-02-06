import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationRepositoryInterface } from '../../../../../application/repositories/NotificationRepositoryInterface';
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { Notification } from '../../../../../domain/entities/notification.entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { NotificationMapper } from "../../../../database/mappers/notification.mapper";
@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repository: Repository<NotificationOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}
  sendEmail(to: string, subject: string, text: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendAppNotification(userId: string, message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  create(notification: Notification): Promise<Notification> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  async findByUserId(userId: string): Promise<Notification[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const ormEntities = await this.repository.find({ where: { user } });
    return ormEntities.map(NotificationMapper.toDomainEntity);
  }
}
