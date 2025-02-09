import { NotificationRepositoryInterface } from './../../../../../application/repositories/NotificationRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendRemindersUseCase } from '../../../../../application/usecases/notification/SendRemindersUseCase';
import { MaintenanceRepositoryInterface } from '../../../../../application/repositories/MaintenanceRepositoryInterface';
import { MotoRepositoryInterface } from '../../../../../application/repositories/MotoRepositoryInterface';
import { PartnerRepositoryInterface } from '../../../../../application/repositories/PartnerRepositoryInterface';
import { Notification } from '../../../../../domain/entities/notification.entity';


@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepositoryInterface')
    private readonly notificationRepository: NotificationRepositoryInterface,
    private readonly mailerService: MailerService,
    @Inject('MaintenanceRepositoryInterface')
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    @Inject('MotoRepositoryInterface')
    private readonly motoRepository: MotoRepositoryInterface,
    @Inject('PartnerRepositoryInterface')
    private readonly partnerRepository: PartnerRepositoryInterface
  ) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async sendAppNotification(userId: string, message: string): Promise<void> {
    console.log(`Notification envoyée à l'utilisateur ${userId} : ${message}`);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return await this.notificationRepository.findByUserId(userId);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const sendRemindersUseCase = new SendRemindersUseCase(this.maintenanceRepository, this.motoRepository, this.notificationRepository, this.partnerRepository)
    await sendRemindersUseCase.execute();
  }
}