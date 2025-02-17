import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationRepositoryInterface } from '../../../../../application/repositories/NotificationRepositoryInterface';
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { Notification } from '../../../../../domain/entities/notification.entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { NotificationMapper } from "../../../../database/mappers/notification.mapper";
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repository: Repository<NotificationOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    private readonly mailerService: MailerService,
  ) {}
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }
  async sendAppNotification(userId: string, message: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const notification = this.repository.create({
      user,
      message,
      date: new Date(),
    });

    await this.repository.save(notification);
  }
  async create(notification: Notification): Promise<Notification> {
    const ormEntity = this.repository.create(NotificationMapper.toOrmEntity(notification));
    const savedEntity = await this.repository.save(ormEntity);
    return NotificationMapper.toDomainEntity(savedEntity);
  }
  findById(id: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  async findByUserId(userId: string): Promise<Notification[]> {
    const ormEntities = await this.repository.find({ where: { user: {
      id: userId
    } } });
    return ormEntities.map(NotificationMapper.toDomainEntity);
  }
}
